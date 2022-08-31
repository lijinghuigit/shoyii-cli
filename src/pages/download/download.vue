<template>
	<view >
		<uni-nav-bar leftIcon='back' title="树蚁App下载" fixed @clickLeft='back' :dark='false' statusBar/>
		<view class="download" style="padding: 0 30rpx;">
			<view class="" style="padding: 70rpx 30rpx;">
				<view class="image" style="width: 146rpx;height:210rpx;margin: 0 auto;text-align: center;">
					<u-image mode='aspectFit' width="100%" height="210rpx" :src="src" style="margin-bottom: 16rpx;"></u-image>
					<text style="color: #0000000;font-weight: bold;font-size: 30rpx;">树蚁医疗</text>
				</view>
				<view class="" style="text-align: center;margin-top: 70rpx;">
					<text>版本：{{version}}</text>
				</view>
			</view>
			<view class="" style="margin-bottom: 20rpx;">
				<view class="" v-if="isAndroid">
					<view class="" @click="downloadApp" style="margin: 0 auto 30rpx;width:80%;height:60px;padding: 5px 0;border-radius: 10px;display: flex;align-items: center;justify-content: center;border: 1px solid #65B6FF;">
						<text style="font-size:30rpx;color: #000000;font-size: 15px;font-weight: bold;">浏览器下载</text>
					</view>
					<view v-if="isWeixin" @click="downloadAppWechat" style="margin: 0 auto;width:80%;height:60px;padding: 5px 0;border-radius: 10px;display: flex;align-items: center;justify-content: center;border: 1px solid #65B6FF;">
						<text style="font-size:30rpx;color: #000000;font-size: 15px;font-weight: bold;">应用宝下载</text>
					</view>
				</view>
				<view class="" @click="iosDownload" v-else style="margin: 0 auto 30rpx;width:80%;height:60px;padding: 5px 0;border-radius: 10px;display: flex;align-items: center;justify-content: center;border: 1px solid #65B6FF;">
					<text style="font-size:30rpx;color: #000000;font-size: 15px;font-weight: bold;">下载ios版</text>
				</view>
			</view>
		</view>
		<u-mask :show="showTip" :mask-click-able='false' :custom-style="{background: 'rgba(149, 149, 149)'}">
			<view class="warp">
				 <view class="rect" style="position: fixed;right: 50px;top:112px;letter-spacing: 2px;">
					 <view class="" style="display: flex;align-items: center;position: relative;">
					 	<text style="font-size: 15px;color: #FFFFFF;">点击右上角</text>
						<view class="" style="background-color: #FFFFFF;margin: 0 4px;text-align: center;padding: 0 4px;">
							<uni-icons type="more-filled"></uni-icons>
						</view>
					 	<text style="font-size: 15px;color: #FFFFFF;">按钮,</text>
						<image lazy-load src="../../static/image/arrow.png" mode="" style="width: 144rpx;height: 173rpx;position: absolute;left: 100px;bottom: 25px;"></image>
					 </view>
					 <text style="font-size: 15px;color: #FFFFFF;">选择浏览器打开</text>
				 </view>
			</view>
		</u-mask>
	</view>
</template>

<script>
	import {myRequest} from '@/utill/http/request.js'
	export default {
		data() {
			return {
				src:uni.getStorageSync('uploadLogo'),
				version:'1.1.31',
				showTip:false,//遮盖层是否展示
				isWeixin:false,//是否是在微信环境
				isAndroid:true,
			}
		},
		methods: {
			back(){
				// #ifdef H5
				uni.showToast({
					title:'无效',
					icon:'none'
				})
				// #endif
				// #ifdef APP-PLUS||MP-WEIXIN
				uni.navigateBack({
					delta:1
				})
				// #endif
			},
			downloadApp(){
				if(this.isWeixin){
					this.showTip=true	
				}else{
					this.showTip=false
					location.href='https://app-1258143571.cos.ap-guangzhou.myqcloud.com/app/shoyii-doctor.apk'
				}
			},
			// 应用宝下载
			downloadAppWechat(){
				location.href='https://a.app.qq.com/o/simple.jsp?pkgname=uni.UNIAF91735'
			},
			// ios下载打开应用市场
			iosDownload(){
				location.href='https://apps.apple.com/cn/app/%E6%A0%91%E8%9A%81%E5%8C%BB%E7%96%97/id1569553374'
			},
			isWx(){
				uni.getSystemInfo({
					success:(res) => {
						console.log(res)
						//检测当前平台，如果是安卓则启动安卓更新  
						if (res.platform == "android") {
							this.isAndroid=true
							let en = navigator.userAgent.toLowerCase()
							// 匹配en中是否含有MicroMessenger字符串
							if (en.match(/MicroMessenger/i) == 'micromessenger') {//微信
								this.isWeixin=true
							}
							if(en.match(/MicroMessenger/i) != 'micromessenger'){
								this.isWeixin=false
								location.href='https://app-1258143571.cos.ap-guangzhou.myqcloud.com/app/shoyii-doctor.apk'
							}
						}else if(res.platform == "ios"){
							this.isAndroid=false
						}else{
							uni.showToast({
								title:'请在手机端访问',
								icon:'none'
							})
						}
					}
				}) 
			}, 
			getVersion(){
				myRequest({
					url:'/App/getDoctorAppLatestEdition',
				}).then(res=>{
					console.log(res)
					this.version=res.data.object.codeVersion
				}).catch(err=>{
					console.log(err)
				})
			}
		},
		onLoad() {
			// #ifdef H5
			   this.isWx()
			// #endif
			// 获取版本号
			this.getVersion()
		},
	}
</script>

<style scoped lang="scss">
	.status-contents{
	    height: calc(var(--status-bar-height) + 88rpx);  
	}  
	.top-view{
	    width: 100%;  
	    position: fixed;  
	    top:0;  
	} 
	 .status{
	     height:var(--status-bar-height);  
	 }
	 .title{
	 	 width: 100%;  
	 	 position: fixed;  
	 	 top: var(--status-bar-height);  
		 height: 88rpx;
		 background-color: #fff;
		 line-height: 88rpx;
		 text-align: center;
		 display: flex;
		 justify-content: space-between;
		 padding: 0 30rpx;
	 }
</style>
