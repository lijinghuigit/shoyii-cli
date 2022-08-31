<template>
	<view :data-theme='themeType' class="container">
		<view class="top-logo">
			<view class="image">
				<u-image width="100%" height="300rpx" :src="src"></u-image>
			</view>
			<view class="version sy_title_primary">
				<text>版本：{{version}}</text>
			</view>
		</view>
		<!-- #ifdef APP-PLUS || H5 -->
		<view class="center-list-item sy_block sy_border_bottom" @click='updataApp()'>
			<text class="list-text sy_title_primary">检测更新</text>
			<uni-icons type="arrowright" size="34rpx" :color="themeType=='dark'?'#8f8f8f':'#333333'"></uni-icons>
		</view>
		<!-- #endif -->
		<view class="center-list-item sy_block sy_border_bottom" @click='enterPage(index)' 
		v-for="(item,index) in menu" :key='index' hover-class="bgColor">
			<text class="list-text sy_title_primary">{{item.title}}</text>
			<uni-icons type="arrowright" size="34rpx" :color="themeType=='dark'?'#8f8f8f':'#333333'"></uni-icons>
		</view>
		<view class="componyMark">
			<view class="tip">
				<text @click="userAgree(0)">用户协议</text>
				<text class="space">|</text>
				<text @click="userAgree(1)">隐私政策</text>
			</view>
			<text>广州诺曼数字化医疗科技有限公司 版权所有</text>
		</view>
		<wechat-share ref='sonWechatShare' @shareQq='shareQq' @shareWeixin='shareWeixin' @shareFriend='shareFriend' @cancelshare='cancelshare'></wechat-share>
		<!-- 客服的弹窗 -->
		<u-modal v-model="contactShow" title='联系方式' :show-cancel-button='true' :show-confirm-button='false' cancel-text='关闭' :mask-close-able='true'>
			<view class="slot-content">
				<u-subsection :list="list" :current="curNow" active-color="#69CDFF" @change="sectionChange"></u-subsection>
				<view class="content">
					<!-- 微信添加 -->
					<view class="wechat" v-if="curNow==0">
						<!-- <view class="" @click="addWechat">
							<text>复制到微信</text>
						</view> -->
						<view class="items" @click="addWechat">
							<text>点击进入客服</text>
						</view>
					</view>
					<!-- 拨打电话 -->
					<view v-if="curNow==1" class="wechat">
						<view class="items" @click="callPhone">
							<text>点击拨打电话</text>
						</view>
					</view>
				</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import update from '@/utill/tools/update/checkUpdate.js'
	import {reactive,toRefs,ref,getCurrentInstance} from 'vue'
	import {onLoad,onReady} from '@dcloudio/uni-app'
	import share from '@/hooks/useShare.js'
	export default {
		setup(props,context){
			const { proxy } = getCurrentInstance(); 
			let sonWechatShare=ref(null)
			const {shareChat,shareTimeline,shareQqChat} =share()
			let state=reactive({
				src:uni.getStorageSync('uploadLogo'),
				menu:[
					{title:'功能介绍'},
					{title:'投诉'},
					// #ifdef APP-PLUS
					{title:'分享ShoYii'},
					{title:'小程序'},
					{title:'去评分'},
					// #endif
					{title:'联系客服'}
				],
				version:'1.0.0',
				contactShow:false,
				list: [
					{
						name: '微信客服'
					}, 
					{
						name: '拨打电话'
					}
				],
				curNow: 0
			})
			const sectionChange=(index)=>{
				console.log(index)
				state.curNow = index;
			}
			// 添加微信
			const addWechat=()=>{
				// #ifdef H5
				uni.setClipboardData({
				    data: '树蚁科技',
					success: (e) => {
						console.log(e)
					},
					complete:(e)=> {
						console.log(e)
					}
				});
				// #endif
				// #ifdef APP-PLUS
				// 进入微信客服
				var sweixin = null;
				plus.share.getServices(function(res){
					var sweixin = null;  
					for(var i=0;i<res.length;i++){  
						var t = res[i];  
						if(t.id == 'weixin'){  
							sweixin = t;  
						}  
					}  
					console.log(sweixin)
					sweixin?sweixin.openCustomerServiceChat({
							corpid:'ww3c862994b46ac04a', //微信客服ID,企业id。
							url:'https://work.weixin.qq.com/kfid/kfc07321f0b00f3d24a',//微信客服的页面路径
					},res=>console.log(res),err=>console.log(err)):plus.nativeUI.alert('当前环境不支持微信操作!');
				},function(res){  
					console.log(res)
					console.log(JSON.stringify(res));  
				});
				// 跳转到微信，复制微信公众号
				// var isExit=plus.runtime.isApplicationExist({
				// 	pname:'com.tencent.mm',
				// 	action:'weixin://'
				// });
				// uni.setClipboardData({
				//     data: '树蚁科技',
				// 	success: (e) => {
				// 		console.log(isExit)
				// 		if(isExit){
				// 			plus.runtime.launchApplication({
				// 				name: '微信',  
				// 				 pname: 'com.tencent.mm',  
				// 				 scheme: 'weixin://'  
				// 			}, (Error)=>{console.log(Error)} );  
				// 		}else{
				// 			uni.showToast({
				// 				title:'检测到手机上未安装微信',
				// 				icon:'none'
				// 			})
				// 		}
				// 	},
				// 	complete:(e)=> {
				// 		console.log(e)
				// 	}
				// });
				// #endif
				// #ifdef MP-WEIXIN
				wx.openCustomerServiceChat({
					extInfo:{
						url:'https://work.weixin.qq.com/kfid/kfc07321f0b00f3d24a',
					},
					corpId:'ww3c862994b46ac04a',
					complete(res) {
						console.log(res)
						// res.errCode==0 成功
					},
				})
				// #endif
			}
			// 拨打电话
			const callPhone=()=>{
				uni.makePhoneCall({
				    phoneNumber: '020-89883433',
					complete:(e)=>{
						console.log(e)
					}
				});
			}
			const updataApp=()=>{
				// #ifdef APP-PLUS
				plus.runtime.getProperty(plus.runtime.appid,(infor)=>{
					proxy.$myRequest({
						url:'/App/getDoctorAppLatestEdition',
					}).then(res=>{
					 console.log(res)
					 if(res.data.code==0){
						 var type=res.data.object.updateType//更新方式，1是整包更新 2是资源热更新
						 if(type=='1'){
							 var url=res.data.object.latestPkgDownloadUrl
						 }else{
							 var url=res.data.object.updateUrl//热更新
						 }
						 console.log(type,url)
						 if(infor.version<res.data.object.codeVersion){
							 uni.showModal({
								title:'新版发布',
								content:'发现重要版本，请马上升级',
								cancelText:'取消更新',
								confirmText:'确定更新',
								success(e){
									console.log(e)
									if(e.confirm){//确定下载	
									  update.update(type,url) //下载
									}
								},
								fail(e){
									console.log(e)
								}
							 })
						 }else{//最新版本
							uni.showToast({
								title:'当前为最新版本',
								icon:'none'
							}) 
						 }
					 }
					}).catch(err=>{
						console.log(err)
					})
				})
				// #endif
				// #ifdef H5
				uni.showToast({
					title:'暂无新版本',
					icon:'none'
				})
				// #endif
			}
			const enterPage=(index)=>{
				if(index==0){//功能介绍
					uni.navigateTo({
						url:'/pages/aboutShoyii/introduce'
					})
				}else if(index==1){//投诉
					uni.navigateTo({
						url:'/pages/aboutShoyii/complain'
					})
				}
				// #ifdef APP-PLUS
				else if(index==2){//分享shoyii
					sonWechatShare.value.open()
				}else if(index==3){//进入小程序
					plus.share.getServices(function(res){  
						console.log(res)
						var sweixin = null;  
						for(var i=0;i<res.length;i++){  
							var t = res[i];  
							if(t.id == 'weixin'){  
								sweixin = t;  
							}  
						}  
						if(sweixin){  
							sweixin.launchMiniProgram({  
								id: 'gh_088556d792b9',  
								path:"/pages/Tabbar/index",
								type: 0   
							});  
						}  
					},function(res){  
						console.log(res)
						console.log(JSON.stringify(res));  
					});
				}else if(index==4){//评分
					plus.runtime.openURL("market://details?id=" + 'uni.UNIAF91735') 
					// var Uri = plus.android.importClass("android.net.Uri");  
					// var uri = Uri.parse("market://details?id=" + 'uni.UNIAF91735' );  
					// var Intent = plus.android.importClass('android.content.Intent');  
					// var intent = new Intent(Intent.ACTION_VIEW, uri);  
					// var main = plus.android.runtimeMainActivity();  
					// main.startActivity(intent);  
				}else if(index==5){//客服
					state.contactShow=true
				}
				// #endif
				else if(index==2){
					state.contactShow=true
				}
			}
			const shareWeixin=()=>{
				let href=proxy.$onlineUrl+'pages/download/download'
				shareChat(href)
			}
			const shareFriend=()=>{
				let href=proxy.$onlineUrl+'pages/download/download'
				shareTimeline(href)
			}
			const shareQq=()=>{
				let href='https://mobile.shoyii.com/#/'+'pages/download/download'
				shareQqChat(href)
			}
			const cancelshare=()=>{
				sonWechatShare.value.close()
			}
			const userAgree=(index)=>{
				if(index==0){//用户协议
					uni.navigateTo({
						url:'/pages/aboutShoyii/userAgree'
					})
				}else if(index==1){//隐私政策
					uni.navigateTo({
						url:'/pages/aboutShoyii/privacyPolicy'
					})
				}
			}
			onLoad(()=>{
				// #ifdef APP-PLUS
					plus.runtime.getProperty(plus.runtime.appid,(infor)=>{
						console.log(infor.version);
						state.version=infor.version
					})
				// #endif 
				// #ifdef MP-WEIXIN
				　　const accountInfo = wx.getAccountInfoSync();
				    // console.log(accountInfo)//miniProgram {appId: "wx347cba31a8aac486" envVersion: "develop"version: ""}
				　　state.version = accountInfo.miniProgram.version // 小程序 版本号
				// #endif
			})
			onReady(()=>{
				proxy.amendNavigator()
			})
			return {
				...toRefs(state),
				sonWechatShare,
				sectionChange,
				addWechat,
				callPhone,
				updataApp,
				enterPage,
				shareWeixin,
				shareFriend,
				shareQq,
				cancelshare,
				userAgree
			}
		},
	}
</script>

<style scoped lang="scss">
	page{
		/* #ifdef H5 */
		height: 100%;
		/* #endif */
	}
	.container{
		width: 100%;
		/* #ifdef H5 */
		min-height: 100%;
		/* #endif */
		/* #ifndef H5 */
		min-height: 100vh;
		/* #endif */
	}
	.top-logo{
		padding: 70rpx 30rpx;
		.image{
			width: 300rpx;height:300rpx;margin: 0 auto;
			border-radius: 16rpx;
		}
		.version{
			text-align: center;margin-top: 30rpx;
		}
	}
	.center-list-item {
		box-sizing: border-box;
		padding: 30rpx 30rpx;
		border-bottom: 1px solid #EEEEEE;
		align-items: center;
		background-color: #FFFFFF;
		display: flex;
		justify-content: space-between;
		.list-text {
			font-size: 30rpx;
			color: #000000;
			font-family: PingFang-SC-Regular;
			flex: 1;
			text-align: left;
		}
	}
	.bgColor{
		background-color: #F8F8F8;
	}
	.componyMark{
		position: fixed;
		bottom: 20px;
		left: 0;
		right: 0;
		text-align: center;
		color: gray;
		font-size: 28rpx;
		.tip{
			padding: 10rpx 0;
			color: #50BCF2;
			font-size: 24rpx;
			.space{
				margin: 0 20rpx;color: #DDDDDD;
			}
		}
	}
	.slot-content{
		margin-top: 20rpx;
		.content{
			padding: 30rpx;
			.wechat{
				display: flex;justify-content: center;align-items: center;
				.items{
					background-color: #69CDFF;color: #FFFFFF;margin-right: 30rpx;padding: 10rpx 20rpx;
				}
			}
		}
	}
</style>
