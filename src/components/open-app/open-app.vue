<template>
	<view class="">
		<u-sticky>
			<view class="openApps">
				<view class="openLeft">
					<image class='image' src="/static/image/shoyiilogo.png" mode=""></image>
					<text class="text">树蚁医疗</text>
				</view>
				<view class="">
					<u-button v-if="wechatAuthorize" type="success" shape="square" size="mini" @click='openApp'>立即打开</u-button>
					<view class="">
						<wx-open-launch-app
						  id="launch-btn"
						  appid="wxdbe07c2bfb651890"
						  :extinfo="extinfo"
						  @ready='ready'
						  @launch='launch'
						  @error='error'
						>
							<script type="text/wxtag-template">
								<style>.btn {color: #FFFFFF;background-color: #19be6b;box-sizing: border-box;
								text-align: center;padding: 4px 12px;border: none;border-radius: 4px;
								width: 200rpx;font-size: 16px;}</style>
								<button class="btn" >App内查看</button>
							</script>
						</wx-open-launch-app>
					</view>
				</view>
			</view>
		</u-sticky>
	</view>
</template>

<script> 
	// #ifdef H5
	// var wx = require('jweixin-module')
	import * as wx from 'jweixin-module'; 
	// const wx = window['wx']
	// #endif
	export default {
		name:"openApp",
		data() {
			return {
				plateform:'android',
				wechatAuthorize:true,//在微信端是否显示立即打开功能,默认是展示
				extinfo:{},//传递的数据
			}
		},
		props:{
			newsId:{//新闻id
				type:String,
				default:''
			},
			modelId:{//模型id
				// type:String,
				// default:''
			},
			classifyId:{// 模型的分类id
				
			},
			caseId:{//病例id
				type:String,
				default:''
			},
			myModelId:{// 我的模型库id
				type:String,
				default:''
			}
		},
		methods:{
			ready(e){
				console.log(e)
				this.wechatAuthorize=false
			},
			launch(e){
				console.log(e)
				// alert(2,e)
			},
			error(e){
				console.log(e)
				uni.showToast({
					title:e.errMsg,
					icon:'none'
				})
				this.openApp()
			},
			openApp(){
				if(this.plateform=='android'){
					 // 存在直接打开，不存在判断是微信浏览器，普通浏览器
					 // location.href ='shoyiimedical://'
					 if(this.newsId){
						location.href ='shoyiimedical://?newsId='+this.newsId
					 }else if(this.modelId){
						location.href ='shoyiimedical://?modelId='+this.modelId
					 }
					 let en = navigator.userAgent.toLowerCase()
					 // 匹配en中是否含有MicroMessenger字符串
					 if (en.match(/MicroMessenger/i) == 'micromessenger') {//微信浏览器
						 setTimeout(()=>{
							 location.href='https://a.app.qq.com/o/simple.jsp?pkgname=uni.UNIAF91735'
						 },1000)
					 }
					 if(en.match(/MicroMessenger/i) != 'micromessenger'){//普通浏览器
						 setTimeout(()=>{
							 location.href='https://app-1258143571.cos.ap-guangzhou.myqcloud.com/app/shoyii-doctor.apk'
						 },1000)
					 }
				}else if(this.plateform=='ios'){//ios,进AppStore查看
					let en = navigator.userAgent.toLowerCase()
					// 匹配en中是否含有MicroMessenger字符串
					if (en.match(/MicroMessenger/i) == 'micromessenger') {//微信浏览器
							uni.showToast({
								title:'请前往APP Store搜索 树蚁医疗',
								icon:'none',
								duration: 3000
							})
					}
					if(en.match(/MicroMessenger/i) != 'micromessenger'){//普通浏览器
						location.href='https://apps.apple.com/cn/app/%E6%A0%91%E8%9A%81%E5%8C%BB%E7%96%97/id1569553374'
					}
				}else{
					uni.showToast({
						title:'请前往手机端打开',
						icon:'none'
					}) 
				}
			},
			getTelType(){
				uni.getSystemInfo({
					success:(res) => {
						console.log(res)
						this.plateform=res.platform
						console.log(this.plateform)
					},
					fail: (e) => {
						console.log(e)
					}
				})
			}
		},
		created() {
			this.getTelType() 
			// #ifdef H5
			let en = navigator.userAgent.toLowerCase()
			// 匹配en中是否含有MicroMessenger字符串
			if (en.match(/MicroMessenger/i) == 'micromessenger') {//微信浏览器
				let url='/pages/news/newsDetail?id='+this.newsId
				if(this.newsId){// 新闻
					this.extinfo=`?newsId=${this.newsId}`
					url='/pages/news/newsDetail?id='+this.newsId
				}else if(this.modelId){// 公开模型
					this.extinfo=`?modelId=${this.modelId}`
					// 页面校验需要完整页面，但跳转可以不用加分类id
					url='/pages/publicModel/modelDetail?modelId='+this.modelId+'&classifyId='+this.classifyId
				}else if(this.caseId){//病例id
					this.extinfo=`?caseId=${this.caseId}`
					url='/pages/caselist/caselistdetail?id='+this.caseId
				}else if(this.myModelId){// 模型id
					this.extinfo=`?myModelId=${this.myModelId}`
					url='/pages/model/MyDetail?modelId='+this.myModelId
				}
				//在公众号中进行页面校验 (只有在微信浏览器中进行校验)
				uni.request({
					url: 'https://wxgzh.shoyii.com/newsdetail',
					method: 'GET',
					data: {
						url:url
					},
					success: res => {
						// console.log(res)
						wx.config({
							debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印
							appId: 'wxa3dc77fda65fd3cc', // 必填，公众号的唯一标识
							timestamp:res.data.timestamp , // 必填，生成签名的时间戳
							nonceStr: res.data.noncestr, // 必填，生成签名的随机串
							signature: res.data.signature,// 必填，签名
							jsApiList: ["onMenuShareAppMessage", "onMenuShareTimeline"], // 必填，需要使用的JS接口列表
							openTagList: ['wx-open-launch-app'] // 可选
						});
						wx.ready((e)=>{
							console.log(e)
							wx.checkJsApi({
								jsApiList: [
								'onMenuShareTimeline',
								'onMenuShareAppMessage',], // 需要检测的JS接口列表
								success: (res)=> {
								// 以键值对的形式返回，可用的api值true，不可用为false
								// 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
									console.log(res)
								},
								fail:function(err){
									console.log(err)
								}
							});
						})
					},
				});				 
			}
			// #endif
		}
	}
</script>

<style scoped lang="scss">
	.openApps{
		background-color: #FFFFFF;
		padding: 10rpx 30rpx;border-bottom:1px solid #EEEEEE ;
		display: flex;justify-content: space-between;align-items: center;
		.openLeft{
			display: flex;align-items: center;
			.image{
				width: 80rpx;height: 80rpx;margin-right: 20rpx;
			}
			.text{
				font-size: 36rpx;font-style: italic;
			}
		}
	}
	
</style>
