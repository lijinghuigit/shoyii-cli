<template>
	<view class="center" :data-theme='themeType'>
		<u-navbar class="navBar" :is-back="false"  title="" title-color="#000000" 
		:border-bottom="themeType=='dark'?false:true"
		:background="themeType=='dark'?{backgroundColor: '#3A3A3A',}:background" :border='false'>
			  <template v-slot:right>
				    <view class="u-nav-slot" >
						<!-- #ifdef APP-PLUS -->
						<view class="" style='margin-right: 40rpx;' @click="changeTheme1">
							<uni-icons custom-prefix="iconfont icontaiyang-copy" size="24" v-if="themeType=='dark'" color="#8f8f8f"
							></uni-icons>
							<uni-icons custom-prefix="iconfont iconyejianmoshishenyemoshiyueliang" size="24" color='#8f8f8f' v-else></uni-icons>
						</view>
						<!-- #endif -->
						<text class="iconfont iconsaoyisao sy_tip" @click="scan"></text>
						<text class='iconfont iconliaotian1 sy_tip' @click='chat'></text>
				    </view> 
			  </template>
		</u-navbar> 
		<view class="logo sy_block" :hover-class="!login ? 'logo-hover':''">
			<image lazy-load @click="previewPic(uerInfo.avatarUrl)" class="logo-img" :src="login ? uerInfo.avatarUrl :avatarUrl"></image>
			<view class="logo-title" v-if="!login" @click="goLogin">
				<text class="uer-name sy_title_primary">您未登录</text>
				<text class="go-login navigat-arrow" >&#xe65e;</text>
			</view>
			<view class="logo-title" v-else @click="amendInfor">
				<view class="logoName">
					<text class="uer-name sy_title_primary">{{uerInfo.name||'未填写'}}</text>
					<view class="docInfor">
						<text class="text1">{{uerInfo.department||'未填写'}}</text>
						<text class="text2">|</text>				
						<text class="text3">{{uerInfo.hospital||'未填写'}}</text>
					</view>
				</view>
				<text class="go-login navigat-arrow sy_title_primary" >&#xe65e;</text>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item sy_block sy_border_bottom" @click='enterPage(index)' v-for="(item,index) in listTop" :key='index' 
			:hover-class="themeType=='dark'?'sy_hover_bg':'bgColor'">
				<!-- <text class="iconfont list-icon" :class="item.icon"></text> -->
				<!-- <svg class="list-icon" aria-hidden="true">
				  <use :xlink:href="'#'+item.icon"></use>
				</svg> -->
				<image :src="themeType=='dark'?item.dark_url:item.url" mode="" class="image_icon"></image>
				<text class="list-text sy_title_primary">{{item.title}}</text>
				<text class="navigat-arrow sy_title_primary">&#xe65e;</text>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item sy_block sy_border_bottom" @click='enterPageBottom(index)' v-for="(item,index) in listBottom" :key='index' 
			:hover-class="themeType=='dark'?'sy_hover_bg':'bgColor'">
				<image :src="themeType=='dark'?item.dark_url:item.url" mode="scaleToFill" class="image_icon"></image>
				<text class="list-text sy_title_primary">{{item.title}}</text>
				<text class="navigat-arrow sy_title_primary">&#xe65e;</text>
			</view>
		</view>
		<button class="exitBtn btn sy_block" v-if="login" @click="switchLogin">{{$t('mine.exchange')}}</button>
		<button class="exitBtn sy_block" v-if="login" @click="exitLogin">{{$t('mine.exit')}}</button>
	</view>
</template>

<script> 
	import {doctorScan} from '@/utill/api/login/doctorScan.js'
	import {getInfor} from '@/utill/api/personalInfor/getInfor.js'
	import {reactive,toRefs,getCurrentInstance,computed} from 'vue'
	import {useStore} from 'vuex'
	import {onLoad,onShow} from '@dcloudio/uni-app'
	var loginRes;
	export default {
		setup(props,context){
			const { proxy } = getCurrentInstance()
			const store=useStore()
			const state=reactive({
				login: computed(()=>store.getters['user/hasLogin']),
				avatarUrl: "../../static/image/person.png",
				// uerInfo: computed(()=>store.getters['user/info']),
				uerInfo:{},
				background: {
					backgroundColor: '#f8f8f8',
				},
				listTop:[
					{url:'/static/svg/surgical.svg',dark_url:'/static/svg/methods_dark.svg',title:'我的方法库'},
					{url:'/static/svg/order.svg',dark_url:'/static/svg/order_dark.svg',title:'我的订单管理'},
					{url:'/static/svg/devicemanage.svg',dark_url:'/static/svg/device_dark.svg',title:'我的设备管理'},
				],
				listBottom:[
					{url:'/static/svg/account.svg',dark_url:'/static/svg/account_dark.svg',title:'账号安全'},
					{url:'/static/svg/general.svg',dark_url:'/static/svg/general_dark.svg',title:'通用'},
					{url:'/static/svg/aboutshoyii.svg',dark_url:'/static/svg/about_dark.svg',title:'关于树蚁'},
				],
				phone:'',//用于进入账号安全页面
			})
			// 扫一扫
			const scan=()=>{
				uni.scanCode({
					success(e) {
						console.log(e)
						console.log(e.errMsg)
						if(e.errMsg=='scanCode:ok'){
							console.log(JSON.parse(e.result))
							var uuid=JSON.parse(e.result).loginScanUUID
							console.log(uuid)
							if(!store.getters['user/hasLogin']){
								// #ifdef APP-PLUS
								uni.showToast({
									title:'请先登录APP',
									icon:'none',
									duration:2000
								})
								// #endif
								// #ifdef MP-WEIXIN
								uni.showToast({
									title:'请先登录小程序',
									icon:'none',
									duration:2000
								})
								// #endif
								return
							}
							if(!uuid){
								uni.showToast({
									title:'扫码失败',
									icon:'none'
								})
								return
							}
							// 跳转登陆
							uni.navigateTo({
								url:'/pages/doctorLogin/doctorLogin?uuid='+uuid,
								animationType:'slide-in-top'
							})
						}else{//扫码失败
							uni.showToast({
								title:'fail',
								icon:'none'
							})
						}
					},
					fail(e){
						uni.showToast({
							title:'fail',
							icon:'none'
						})
					},
				})
			}
			const chat=()=>{
				if(state.login){
					uni.navigateTo({
						url:'/pages/shoyiiChat/index'
					})	
				}else{
					uni.showToast({
						title:'未登录',
						icon:'none'
					})
				}
			}
			const changeTheme1=()=>{
				console.log(proxy.themeType)
				if(proxy.themeType=='dark'){
					proxy.changeTheme({themetype:'light'})
				}else{
					proxy.changeTheme({themetype:'dark'})
				}
			}
			// 预览头像
			const previewPic=(avatarUrl)=>{
				console.log(avatarUrl)
				if(!avatarUrl){
					return
				}
				var Allarr=[]
				Allarr.push(avatarUrl)
				console.log(Allarr)
				uni.previewImage({
					current:0,//预览的第一张图，可以使index，可以是路径
					urls:Allarr,//必须是数组
					indicator:'number',
					loop:true,
					success(e){
						console.log(e)
					}
				})
			}
			// 登录
			const goLogin=()=>{
				// console.log(!this.login)
				if (!state.login) {//false未登录
					uni.navigateTo({
						url:"/pages/login/tellogin?pages="+'/pages/Tabbar/mine'+'&pagetype='+1,
						animationType:'pop-in',
						success(e){},
						fail(error) {}
					})
				}
			}
			// 修改个人资料
			const amendInfor=()=>{
				uni.navigateTo({
					url:'/pages/PersonalInfor/PersonalInfor'
				})
			}
			// 我的设备管理
			const enterPage=(index)=>{
				if(index==0){//我的手术方法库
					uni.navigateTo({
						url:'/pages/surgicalData/Mysurgical'
					})
				}
				if(index==1){//我的订单管理
					uni.navigateTo({
						url:'/pages/orderManage/orderManage'
					})
				}
				if(index==2){//我的设备管理
					uni.navigateTo({
						url:'/pages/deviceManage/deviceManage'
					})
				}	
			}
			const enterPageBottom=(index)=>{
				if(index==0){//账号安全
					if(state.login){
						uni.navigateTo({
							url:'/pages/AccoutSecurity/AccoutSecurity?phone='+state.phone
						})
					}else{
						uni.navigateTo({
							url:'/pages/login/tellogin'
						})
						return
					}
				}else if(index==1){//通用
					uni.navigateTo({
						url:'/pages/GeneralSetting/GeneralSetting'
					})
				}else if(index==2){//关于树蚁
					uni.navigateTo({
						url:'/pages/aboutShoyii/aboutShoyii'
					})
				}
			}
			// 切换账号
			const switchLogin=()=>{
				uni.navigateTo({
					url:'/pages/login/tellogin',
					success(e) {
						console.log('切换账号')
					}
				})
			}
			// 退出登录
			const exitLogin=()=>{
				proxy.$myRequest({
					url:'/login/loginOut'
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						// 除了first_flag,全部清除
						store.commit('user/logout')
						// uni.clearStorageSync();//清除所有缓存，清除缓存时要注意openid，这个也是要清除的
						// 微信的退出登录
						// #ifdef APP-PLUS
						// 如果通过5+api登录，则需要退出登录
						// plus.oauth.getServices(function(services){
						// 	console.log(services)
						// 	if(services.length!=0){
						// 		services.forEach(item=>{
						// 			if(item.id=='weixin'){
						// 				item.logout(function(e){
						// 					console.log(e)
						// 				}, function(e){
						// 					console.log(e)
						// 				});
						// 			}
						// 		})
						// 	}
						// })
						// #endif
						// 关闭socket
						store.commit('socket/SOCKET_CLOSE')
					}else{
						uni.showToast({
							title:res.data.object,
							icon:'none'
						})
					}
				}).catch(err=>{
					console.log(err)
				})
			}
			onShow(()=>{
				if(store.getters['user/hasLogin']){//已登录存在
					getInfor({}).then(res=>{
						console.log(res)
						if(res.data.code==0){
							var data=res.data.object
							state.phone=data.telephone
							state.uerInfo={
								name:data.name,
								hospital:data.hospital,
								department:data.departmentName,
								avatarUrl:data.avatarLinks||state.avatarUrl
							}
						}else{
							uni.showToast({
								title:res.data.msg,
								icon:'none'
							})
						}
					}).catch(err=>{ 
						console.log(err)
					})
				}
			})
			return {
				...toRefs(state),
				store,
				scan,
				chat,
				previewPic,
				goLogin,
				amendInfor,
				enterPage,
				enterPageBottom,
				switchLogin,
				exitLogin,
				changeTheme1
			}
		},
	
	}
</script>

<style scoped lang="scss">
	@font-face {
		font-family: texticons;
		font-weight: normal;
		font-style: normal;
		src: url('https://at.alicdn.com/t/font_984210_5cs13ndgqsn.ttf') format('truetype');
	}
	/* #ifdef MP-WEIXIN */
	.navBar ::v-deep .u-line-1 {
		display: none!important;
	}
	/* #endif */
	.u-nav-slot{
		display:flex;align-items: center;
	}
	.iconsaoyisao{
		font-size:38rpx;
		color:#333;
	}
	.iconliaotian1{
		margin:0 40rpx 0 40rpx;
		font-size:42rpx;color:#333;
	}
	page,view {
		display: flex;
	}
	page {
		background-color: #f8f8f8; 
		/* #ifdef H5 */
		min-height: 100%;
		/* #endif */
	}
	.center {
		flex-direction: column;
		/* #ifdef APP-PLUS */
		height: 100vh;
		/* #endif */
	}
	.logo {
		width: 750rpx;
		height: 186rpx;
		padding: 30rpx;
		box-sizing: border-box;
		background-color: #f8f8f8;
		flex-direction: row;
		align-items: center;
	}
	.logo-hover {
		opacity: 0.8;
	}
	.logo-img {
		width: 126rpx;
		height: 126rpx;
		border-radius: 126rpx;
	}
	.logo-title {
		flex: 1;
		align-items: center;
		justify-content: space-between;
		flex-direction: row;
		margin-left: 20rpx;	
	}
	.logoName{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.docInfor{
		font-size: 24rpx;
		display: flex;
	}
	.docInfor .text1{
		flex: 1;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
		word-wrap: break-word;
		word-break: break-all;
	}
	.docInfor .text2{
		margin: 0 10rpx;
	}
	.docInfor .text3{
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		width: 200px;
	}
	.uer-name {
		height: 60rpx;
		line-height: 60rpx;
		font-size: 30rpx;
		font-weight: bold;
		font-family: PingFang-SC-Bold;
		color: #000000;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
		word-wrap: break-word;
		word-break: break-all;
	}
	.go-login .navigat-arrow {
		font-size: 30rpx;
		color: #000000;
	}
	.center-list {
		background-color: #FFFFFF;
		margin-top: 20rpx;
		width: 750rpx;
		flex-direction: column;
	}
	.center-list-item {
		box-sizing: border-box;
		flex-direction: row;
		padding: 40rpx 30rpx;
		border-bottom: 1px solid #EEEEEE;
		align-items: center;
	}
	.list-icon {
		width: 40rpx;
		height: 40rpx;
		/* font-size: 34rpx;
		color: #343434;
		/* text-align: center;
		font-family: texticons; */
		margin-right: 20rpx;
	}
	.image_icon{
		width: 40rpx;
		height: 40rpx;
		margin-right: 20rpx;
	}
	.list-text {
		font-size: 30rpx;
		color: #000000;
		font-family: PingFang-SC-Regular;
		flex: 1;
		text-align: left;
	}
	.navigat-arrow {
		font-size: 34rpx;
		color: #333333;
		text-align: right;
		font-family: texticons;
	}
	.exitBtn{
		margin-bottom: 20rpx;
		width: 100%;
		font-size: 28rpx;
		background-color: #FFFFFF;
		height: 84rpx;
		line-height: 84rpx;
	}
	.btn{
		margin-top: 20rpx;
	}
	.bgColor{
		background-color: $uni-bg-color-grey;
	}
</style>