<template>
	<view class="login" :data-theme='themeType'>
		<login-top @close="close" @register="register"></login-top>
		<view class="login-main">
			<view class="">
				<view class="title_tip sy_title_deep">
					<text>短信登录</text>
				</view>
				<view class="tel_login">
					<view @click="areaCode" style="color: #000000;">
						<text>{{areacode}}</text>
						<uni-icons type="arrowdown" color="#333"></uni-icons>
					</view>
					<!-- #ifndef MP-WEIXIN -->
					<u-line color="#8f8f8f" direction='col' margin='0 20rpx' style='wxline'/>
					<!-- #endif -->
					<!-- #ifdef MP-WEIXIN -->
					<view style="width: 1px;height:100%;background:#8f8f8f;margin: 0 20rpx;">|</view>
					<!-- #endif -->
					<input type="number" maxlength="11" v-model="phone" placeholder="请输入手机号码" style="color: #8F8F8F;"
					/>
				</view>
				<button type="default" hover-class="button-hover" class="getcodeBtn" 
				@click.stop="getCode()" :class="boolean?'bgColor':''"
				>获取验证码</button>
				<view class="password_login sy_title_deep">
					<text @click='pwdLogin'>密码登录</text>
				</view>
			</view> 
		</view>
		<!-- #ifdef APP-PLUS||H5 -->
		<view class="login-footer">
			<view :class="textTip?'animation-text':''" style="text-align: center;padding-bottom: 20px;">
				<u-checkbox 
					class="readprivacy"
					v-model="readchecked" 
					name="我已阅读并同意"
				>我已阅读并同意</u-checkbox>
				<text style="color: #86B0D4;" @click.stop="userAgree">《用户协议》</text>
				<text>和</text> 
				<text style="color: #86B0D4;" @click.stop="userPravicy">《隐私政策》</text>
			</view>
			<view class="footer-tip flex">其他登录方式</view>
			<view class="footer-other flex">
				<view class="other-list" v-if="ifThird.ifweixin">
					<image lazy-load src="../../static/image/wechat.png" mode="aspectFill" @click="login_weixin()"></image>
				</view>
				<view class="other-list">
					<image lazy-load src="../../static/image/telephone.png" mode="aspectFill" @click="telephoneLogin()"></image>
				</view>
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
			<view class="" style="position: fixed;bottom: 100rpx;left: 0;width: 100%;padding: 0 70rpx;">
				<u-button :custom-style="customStyle" @click="paramLogin">微信用户快捷登录</u-button>
			</view>
			<u-modal v-model="wechatshow" :show-title='false' :show-confirm-button='false'>
				<view class="slot-content" style="padding: 40rpx 0;">
					<view class="" style="text-align: center;">
						<uni-icons type="weixin" size="40" color="#04be13"></uni-icons>
					</view>
					<view class="" style="padding: 40rpx 0;text-align: center;">
						<text>微信授权注册后完成登录</text>
					</view>
					<view class="" style="padding: 0 30rpx;">
						<button :custom-style="btncustomStyle" style="font-size:15px;height: 100rpx;line-height: 100rpx;color: #FFFFFF;background-color:#04be13 ;" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" withCredentials="true">授权登录</button>
						<view class="" style="text-align: center;padding: 15px 0 0px;font-size: 12px;">
							<text @click="cancelLogin" style="">暂不登录</text>
						</view>
					</view>
				</view>
			</u-modal>
			<u-modal v-model="getUserInfo" :show-title='false' :show-confirm-button='false'>
				<view class="slot-content" style="padding: 40rpx 0;">
				<view class="" style="text-align: center;">
					<uni-icons type="weixin" size="40" color="#04be13"></uni-icons>
				</view>
				<view class="" style="padding: 40rpx 0;text-align: center;">
					<text>微信授权获取用户信息</text>
				</view>
				<view class="" style="padding: 0 30rpx;">
					<!-- <button :custom-style="btncustomStyle" style="font-size:15px;height: 100rpx;line-height: 100rpx;color: #FFFFFF;background-color:#04be13 ;" @getuserinfo="getUserInfor" withCredentials="true">授权</button> -->
					<button :custom-style="btncustomStyle" style="font-size:15px;height: 100rpx;line-height: 100rpx;color: #FFFFFF;background-color:#04be13 ;" @click="getUserInfor">授权</button>
					<view class="" style="text-align: center;padding: 15px 0 0px;font-size: 12px;">
						<text @click="canceluserInfor" style="">暂不授权</text>
					</view>
				</view>
			</view>
		    </u-modal>
		<!-- #endif -->
	</view>
</template>
<script> 
	import {loginsendCode} from '@/utill/api/login/loginsendCode.js'
	import {wechatLogin} from '@/utill/api/login/wechatLogin.js'
	import {getLoginStatus} from '@/utill/api/login/getLoginStatus.js'
	import {miniBind,miniGetuserInfor} from '@/utill/api/login/miniBind.js'
	import loginTip from '@/utill/tools/loginTip.js'
	import univerifyLogin from '@/utill/tools/univerifyLogin.js'
	export default {
		data() {
			return {
				textTip:false,//隐私协议的抖动
				readchecked:false,
				boolean:false,//获取验证码背景色
				customStyle: {
					color: '#86B0D4'
				},
				btncustomStyle:{
					fontSize:'15px'
				},
				phone: "",
				areacode:'+86',
				wechatshow:false,//微信获取手机号的授权弹窗
				sessionkey:'',//用户不存在情况下,返回的状态,用于获取用户手机号时传给后端
				getUserInfo:false,//获取用户授权信息的弹窗
				unionId:null,
				openId:null,
				ifThird:{
					ifweixin:true,
				}
			}
		},
		onReady() {
			// #ifdef APP-PLUS
			if(getApp().globalData.preloginStatus){//预登录成功，就可以调用一键登录了
				this.telephoneLogin()
			}
			// 是否存在微信
			if(!getApp().globalData.ifThird.ifweixin){
				this.ifThird.ifweixin=false
			}
			// #endif
		},
		onLoad(options) {
			console.log(options)//获取到想进入的页面数据
			// 将这个数据存在在vuex中
			this.$store.commit('savePages',options)
			console.log(this.$store.state.PagesUrl)
			console.log(this.$store.state.PagesType)
		},
		watch:{
			phone(newValue,oldValue){
				if ((/^1(3|4|5|6|7|8|9)\d{9}$/.test(newValue))) {
					this.boolean=true
					// 手机号验证成功，自动发送验证码进入新页面
					this.getCode()
				}else{
					this.boolean=false
				}
			}
		},
		methods: {
			// 本地手机号一键登录
			telephoneLogin(){
				univerifyLogin()
			}, 
			// 关闭注册登陆页面
			close(){
				uni.navigateBack({
					delta:1
				})
			},
			register(){
				uni.navigateTo({
					url:"/pages/register/register"
				})
			},
			// 进入获取区号页面
			areaCode(){
				uni.showToast({
					title:'当前仅支持大陆区号',
					icon:'none'
				})
				// uni.navigateTo({
				// 	url:"",
				// })
			},
			// 密码登陆
			pwdLogin(){
				uni.navigateTo({
					url:"/pages/login/pwdLogin?telephone="+this.phone,
					animationType:"pop-in"
				})
			},
			getCode() {
				if(this.phone==''){
					uni.showToast({
						title: '手机号码不能为空',
						icon: "none"
					});
					return;
				}
				// if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone))) {
				// 	uni.showToast({
				// 		title: '请填写正确手机号码',
				// 		icon: "none"
				// 	});
				// 	return;
				// }
				if(this.$u.test.mobile(this.phone)==false){
					uni.showToast({
						title: '请填写正确手机号码',
						icon: "none"
					});
					return;
				}
				// #ifndef MP-WEIXIN
				if(!this.readchecked){//没有勾选
					uni.showToast({
						title:'请同意用户协议及隐私政策',
						icon:'none'
					})
					this.textTip=true//隐私协议提示
					setTimeout(()=>{
						this.textTip=false
					},1000)
					return;
				}
				this.textTip=false
				// #endif
				loginsendCode({
					telephone:this.phone
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						uni.navigateTo({
							url:"/pages/login/telloginitem?phone="+this.phone+'&'+'area=' + '86',
							animationType:"slide-in-top",
						})
					}else{
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						});
					}
					// 验证码发送成功，则进入登陆页面				
				}).catch(err=>{
					console.log(err)
				})
			},
			//微信登录
			login_weixin() {
				if(!this.readchecked){//没有勾选
					uni.showToast({
						title:'请同意用户协议及隐私政策',
						icon:'none'
					})
					return;
				}
				var aweixin=null;
				// // 当前环境支持的所有授权登录对象
				// var auths = {};
				// // 获取登录授权认证服务列表，单独保存微信登录授权对象
				// // 5+APP在plusready事件中调用，uni-app在vue页面的onLoad中调用
				var _this=this
				plus.oauth.getServices(function(services){
					console.log(services)
					services.forEach((item)=>{
						if(item.id=='weixin'){
							aweixin = item;
						}
					})
					if(!aweixin){//没有取得微信登陆的服务
						uni.showToast({
							title:'当前环境不支持微信登录',
							icon:'none'
						})
						return;
					}
					if(!aweixin.authResult){//是否登录认证过
						aweixin.authorize((e)=>{
							// aweixin.login(function(e){
							// 	console.log(e)
							// }, function(e){
							// 	plus.nativeUI.alert("登录认证失败: "+JSON.stringify(e));
							// } );
							// return;
							console.log(e) //为什么授权两次 //返回的code可以上传服务器获取数据
							if(!e.code){//用户如果拒绝，则不存在code
								uni.showToast({
									title:'用户已拒绝',
									icon:'none'
								})
							}
							uni.showLoading({
								title:'加载中'
							})
							// 调取后端登录接口
							wechatLogin({
								code:e.code
							}).then(res=>{
								uni.hideLoading()
								console.log(res)
								if(res.data.code==0){//已经绑定可手机号，根据不同的审核状态，判断是否看到页面
									if(Array.isArray(res.data.object)){
										uni.navigateTo({
											url:'/pages/login/accountLogin?data='+encodeURIComponent(JSON.stringify(res.data.object))
										})
									}else{//直接登录
										loginTip(res,_this.$store.state.PagesUrl,_this.$store.state.PagesType)
									}
								}else if(res.data.code==11){
									uni.showToast({
										title:res.data.msg,
										icon:'none'
									})
									return
								}else if(res.data.code==10){//没有绑定手机号，属于新用户,跳转到绑定手机号页面,需要将微信数据传送过来
									uni.hideLoading()
									uni.navigateTo({
										url:'/pages/login/bindTel?openId='+encodeURIComponent(JSON.stringify(res.data.object)),
										animationType:'pop-in',
									})
								}else{
									uni.showToast({
										title:res.data.msg,
										icon:'none'
									})
								}
							}).catch(err=>{
								uni.hideLoading()
								console.log(err)
							})
						},(e)=>{
							console.log(JSON.stringify(e))
							uni.showToast({
								title:'用户取消授权',
								icon:'none'
							})
						},{scope:'snsapi_userinfo',state:'authorize',appid:'wxdbe07c2bfb651890'})
						// ios 需要添加以上参数，否则会走authorize的错误回调，Android目前不受影响
					}else{
						console.log('已经登录过了')
						uni.showToast({
							title:'请使用其他登录方式',
							icon:'none'
						})
						aweixin.getUserInfo(function(e){
							console.log(e.target.userInfo)
						},function(err){
							console.log(err)
						})
					}
				}, function(e){
					console.log(e)
					uni.showToast({
						title:'获取登录授权服务列表失败',
						icon:'none'
					})
				});
				// 通常登录前需要先调用authorize方法进行授权
			},
			// #ifdef MP-WEIXIN
			// 获取用户手机号
			getPhoneNumber (e) {//同意之后，才能使用
				console.log('一键登陆')
				console.log(e)
				if(e.detail.errMsg=="getPhoneNumber:ok"){//用户接受授权
					console.log(e.detail.errMsg)
					console.log(e.detail.iv)
					console.log(e.detail.encryptedData)
					miniBind({
						code:this.sessionkey,
						encryptedData:e.detail.encryptedData,
						iv:e.detail.iv
					}).then(res=>{
						console.log(res)
						if(res.data.code==0){//用户授权成功后,需要再进行个人信息的授权
							if(Array.isArray(res.data.object)){
								uni.navigateTo({
									url:'/pages/login/accountLogin?data='+encodeURIComponent(JSON.stringify(res.data.object))
								})
							}else{//直接登录
								loginTip(res,this.$store.state.PagesUrl,this.$store.state.PagesType)
							}
						}else{//
							uni.showToast({
								title:res.data.msg,
								icon:'none'
							})
						}
					}).catch(err=>{
						console.log(err)
					})
				}else{//用户取消授权,则注册失败,返回一键登陆的页面
					this.wechatshow=false
				}
			},
			// 暂不登录
			cancelLogin(){
				this.wechatshow=false
			},
			// 获取用户信息取消授权
			canceluserInfor(){
				this.getUserInfo=false
			},
			// 用户信息授权
			getUserInfor(){
				var _this=this
				wx.getUserProfile({
					desc:'个人信息页面展示',
					success(e){
						console.log(e)
						if(e.errMsg=="getUserProfile:ok"){
							console.log(_this.sessionkey)
							miniGetuserInfor({
								code:_this.sessionkey,
								wxUser:{
									openId:_this.openId,
									unionId:_this.unionId,
									sex:e.userInfo.gender,
									nickName:e.userInfo.nickName,
									headImgUrl:e.userInfo.avatarUrl,
									country:e.userInfo.country,
									province:e.userInfo.province,
									city:e.userInfo.city,
									language:e.userInfo.language,
									subscribe:'',
									subscribetime:'',
								},
							}).then(res=>{ 
								console.log(res)
								if(res.data.code==0){//用户授权成功后,需要再进行手机号的授权
									_this.getUserInfo=false
									_this.wechatshow=true 
								}else{//
									uni.showToast({
										title:res.data.msg,
										icon:'none'
									})
								} 
							}).catch(err=>{
								console.log(err)
							})
						}else{//用户取消授权
							_this.getUserInfo=false
						}
					},
					fail(err){
						console.log(err)
					}
				})
			},
			// 小程序的登陆
			paramLogin(){
				uni.login({
					success:(e)=> {//发送code到后端,换取登陆状态
						console.log(e)
						console.log(e.code) 
						uni.showLoading({
							title:'加载中'
						})
						getLoginStatus({
							jsCode:e.code
						}).then(res=>{
							uni.hideLoading()
							console.log(res)
							if(res.data.code==0){//用户存在,并且登录成功
								if(Array.isArray(res.data.object)){
									uni.navigateTo({
										url:'/pages/login/accountLogin?data='+encodeURIComponent(JSON.stringify(res.data.object))
									})
								}else{//直接登录
									loginTip(res,this.$store.state.PagesUrl,this.$store.state.PagesType)
								}
							}else if(res.data.code==10){//用户未绑定,弹窗,用户进行手机号码的获取,并将返回的状态同微信参数返回给后端
								this.sessionkey=res.data.object.code
								this.unionId=res.data.object.unionId
								this.openId=res.data.object.openId
								this.getUserInfo=true
							}else if(res.data.code==40029){//code失效,
								uni.showToast({
									title:'请重新授权登录',
									icon:'none'
								})   
							}
							else{//其他情况 
								uni.showToast({
									title:res.data.msg,
									icon:'none'
								})
							}
						}).catch(err=>{
							uni.hideLoading()
							console.log(err)
						})
					},
					fail(err) {
						console.log(err)
						console.log('err')
					}
				})
			},
			// #endif
			// 用户协议
			userAgree(){
				uni.navigateTo({
					url:'/pages/aboutShoyii/userAgree'
				})
			},
			// 隐私政策
			userPravicy(){
				uni.navigateTo({
					url:'/pages/aboutShoyii/privacyPolicy'
				})
			},
		}
	}
</script>
<style lang="scss" scoped>
	.bgColor{
		background-color: #69CDFF!important;
		color: #FFFFFF!important;
	}
	.login {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		height: 100%;
		display: flex;
		flex-direction: column;
		padding: 0 30rpx;
	}
	.login-main {
		padding: 0 70rpx;
		margin-top: 260rpx;
	}
	.title_tip{
		color: #000000;
		font-size: 42rpx;
		font-weight: 600;
	}
	.tel_login{
		display: flex;
		align-items: center;		
		margin-top: 70rpx;
		padding: 20rpx 20rpx;
		background-color: #F4F4F4;
		color: #F4F4F4;
		border: 1px solid #F4F4F4;
		border-radius: 15rpx;
		height: 80rpx;
		line-height: 80rpx;
	}
	.tel_login .uni-icons{
		margin: 0 16rpx;
	}
	.getcodeBtn{
		background: #A4E1FF;
		color: #FFFFFF;
		margin-top: 45rpx;
		font-size: 32rpx;
		border-radius: 40rpx;
		height: 80rpx;
		line-height: 80rpx;
	}
	.getcodeBtn::after{
		border: none;
	}
	.button-hover{
		color: #FFFFFF;
		background: #53c3fb!important;
	}
	.password_login{
		text-align: center;
		padding: 60rpx 0;
		color: #666666;
		font-size: 28rpx;
	}
	.flex{
		display: flex;
	}
	/* #ifndef APP-NVUE */
	.readprivacy ::v-deep .u-checkbox__label{
		margin-right: 0;
	}
	/* #endif */
	
	.login-footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		left: 0;
		padding: 0 60rpx;
		.footer-tip {
			align-items: center;
			font-size: 24rpx;
			color: #999999;
			text-align: center;
			&:before {
				flex: 1;
				content: '';
				height: 2rpx;
				background: #D0D0D0;
				margin-right: 30rpx;
			}
			&:after {
				margin-left: 30rpx;
				flex: 1;
				content: '';
				height: 2rpx;
				background: #D0D0D0;
			}
		}
		.footer-other {
			padding: 40rpx 0 100rpx 0;
			justify-content: center;
			.other-list {
				width: 80rpx;
				height: 80rpx;
				margin: 0 75rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	
</style>
