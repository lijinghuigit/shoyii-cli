<template>
	<view class="" style="position: fixed;bottom: 120rpx;left: 0;right: 0;z-index: 100;text-align: center;">
		<u-button v-if="wechatAuthorize" shape="square" type="success" size="mini" :custom-style="customStyle" @click="openApp">APP内打开</u-button>
		<wx-open-launch-weapp
		  id="launch-btn"
		  username="gh_088556d792b9"
		  :path="minipath"
		  @ready='ready'
		  @launch='launch'
		  @error='error'
		>
		<!-- #ifndef VUE3 -->
		<script type="text/wxtag-template">
		    <style>.wxbtn {color: #FFFFFF;background-color: #19be6b;box-sizing: border-box;
		    text-align: center;padding: 6px 16px;border: none;border-radius: 20px;
		    width: 100px;font-size: 16px;}</style>
		    <button class="wxbtn">小程序内打开</button>
		</script>
		<!-- #endif -->
		<!-- #ifdef VUE3 -->
		<view v-is="'script'" type="text/wxtag-template">
			<view class="">
				<div style="color: #FFFFFF;background-color: #19be6b;
				text-align: center;border-radius: 10px;
				width: 150px;height: 50px;line-height: 50px;
				font-size: 16px;">小程序内打开</div>
			</view>
		</view>
		<!-- #endif -->
		</wx-open-launch-weapp>
	</view>
</template>

<script>
	// #ifdef H5
	// #ifndef VUE3
	var wx = require('jweixin-module')
	// #endif
	// #ifdef VUE3
	import wx from 'weixin-js-sdk'
	// #endif
	// #endif
	export default {
		name:"openminiparam",
		data() {
			return {
				minipath:'',
				customStyle:{
					paddingTop:'20rpx',
					paddingBottom:"20rpx",
					borderRadius:'20rpx',
				},
				wechatAuthorize:false,//在浏览器端显示立即打开,默认是隐藏
			};
		},
		props:{
			pubModelId:{ //公开模型id
				type:String,
				default:''
			},
			classifyId:{// 公开模型分类id
				type:String,
				default:''
			},
			newsId:{// 新闻
				type:String,
				default:''
			},
			// 手术方法库
			surgicalId:{
				type:String,
				default:''
			}
		},
		methods:{
			ready(e){ //这个执行后，标签才能展示
				console.log(e)
			},
			launch(e){
				console.log(e)
			},
			error(e){
				console.log(e)
				uni.showToast({
					title:'error',
					icon:'none'
				})
			},
			wechatMiniparam(){
				let url=''
				if(this.pubModelId){//我的模型库详情
					url=`/pages/publicModel/modelDetail?modelId=${this.pubModelId}&classifyId=${this.classifyId}`
				}else if(this.newsId){// 新闻详情
					url='/pages/news/newsDetail?id='+this.newsId
				}else if(this.surgicalId){
					url='/pages/surgicalData/surgicalDetail?id='+this.surgicalId
				}
				this.minipath=url
				uni.request({
					url: 'https://wxgzh.shoyii.com/newsdetail',
					method: 'GET',
					data: {
						url:url
					},
					success: res => {
						wx.config({
							debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印
							appId: 'wxa3dc77fda65fd3cc', // 必填，公众号的唯一标识
							timestamp:res.data.timestamp , // 必填，生成签名的时间戳
							nonceStr: res.data.noncestr, // 必填，生成签名的随机串
							signature: res.data.signature,// 必填，签名
							jsApiList: ["onMenuShareAppMessage", "onMenuShareTimeline"], // 必填，需要使用的JS接口列表
							openTagList: ['wx-open-launch-weapp'] // 可选
						});						
						wx.ready((e)=>{
							console.log(e)
						})
					},
					fail: () => {},
					complete: () => {}
				});
			},
			openApp(){
				uni.getSystemInfo({
					success:(res) => {
						if(res.platform=='android'){
							if(this.newsId){
								location.href ='shoyiimedical://?newsId='+this.newsId
							}else if(this.pubModelId){//公开模型的id
								location.href ='shoyiimedical://?modelId='+this.pubModelId
							}
							setTimeout(()=>{
								location.href='https://app-1258143571.cos.ap-guangzhou.myqcloud.com/app/shoyii-doctor.apk'
							},1000)
						}else if(res.platform=='ios'){
							location.href='https://apps.apple.com/cn/app/%E6%A0%91%E8%9A%81%E5%8C%BB%E7%96%97/id1569553374'
						}else{
							uni.showToast({
								title:'请前往手机端打开',
								icon:'none'
							}) 
						}
					},
					fail: (e) => {
						console.log(e)
					}
				})
			}
		},
		created() {
			// #ifdef H5
			let en = navigator.userAgent.toLowerCase()
			// 匹配en中是否含有MicroMessenger字符串
			if (en.match(/MicroMessenger/i) == 'micromessenger') {//微信浏览器
				this.wechatMiniparam()
			}else{//非微信浏览器
				this.wechatAuthorize=true	
			}
			// #endif
		}
	}
</script>

<style>

</style>
