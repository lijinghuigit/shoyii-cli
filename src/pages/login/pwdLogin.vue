<template>
	<view :data-theme='themeType' class="container">
		<view class="login-main">
			<view class="login-logo">
			</view>
			<view class="">
				<view class="title_tip sy_title_deep">
					<text>密码登录</text>
				</view>
				<view class="tel_login">
					<input type="text" v-model="phone" placeholder="手机号/账号"/>
					<input type="password" v-model="password" placeholder="密码"/>
					<view class="forget_pwd">
						<checkbox-group name="" @change="selectPwd">
							<label class="label sy_title_primary">
								<checkbox :checked="remeberPwd" style="transform:scale(0.7)" color='#86B0D4'/>
								<text>记住密码</text>
							</label>
						</checkbox-group>
						<text @click="forgetpwd" class="sy_title_primary">忘记密码？找回密码</text>
					</view>
				</view>
				<button type="default" hover-class="button-hover" class="pwdlogin" @click.stop="pwdlogin">登录</button>
			</view>
		</view>
		<view class="footer">
			<checkbox-group name="" @change="select"
			:class="textTip?'animation-text':''">
				<label class="label">
					<checkbox :checked="check" style="transform:scale(0.7)" color='#86B0D4'/>
					<text>我已阅读并同意</text>
					<text class="user" @click.stop="userAgree">《用户协议》</text>
					<text>和</text>
					<text class="secret" @click.stop="userPravicy">《隐私政策》</text>
				</label>
			</checkbox-group>
		</view>
	</view>
</template>

<script>
	import {passwordLogin} from '@/utill/api/login/passwordLogin.js'
	import loginTip from '@/utill/tools/loginTip.js'
	export default {
		data() {
			return {
				textTip:false,
				phone:"",
				password:'',
				check:false,
				remeberPwd:false,
			}
		},
		methods: {
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
			// 密码登陆
			pwdlogin(){
				if(this.phone==''){
					uni.showToast({
						title: '手机号或账号不能为空',
						icon: "none"
					});
					return;
				}
				if(this.password==''){
					uni.showToast({
						title: '密码不能为空',
						icon: "none"
					});
					return;
				}
				// 还存在账号登陆
				// if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone))) {
				// 	uni.showToast({
				// 		title: '请填写正确手机号码',
				// 		icon: "none"
				// 	});
				// 	return;
				// }
				if(!this.check){
					uni.showToast({
						title: '请同意用户协议',
						icon: "none"
					});
					this.textTip=true//隐私协议提示
					setTimeout(()=>{
						this.textTip=false
					},1000)
					return;
				}
				this.textTip=false
				uni.showLoading({
				    title: '登录中...'
				});
				passwordLogin({
					telephone:this.phone,
					password:this.password,
				}).then(res=>{
					// uni.report('passwordLogin',{//密码登陆统计上报
					// 	telephone:this.phone,
					// })
					console.log(this.remeberPwd)
					uni.setStorageSync('phone',this.phone)
					if(this.remeberPwd){//为true，则存储密码
						uni.setStorageSync('password',this.password)//存储密码
					}else{//为false，清除密码
						  uni.removeStorageSync('password');
					}
					console.log(res)
					if(res.data.code==0){
						uni.hideLoading();
						console.log(typeof(res.data.object)) //=>object
						console.log(Array.isArray(res.data.object))
						if(Array.isArray(res.data.object)){//进入账号登录
							uni.navigateTo({
								url:'/pages/login/accountLogin?data='+encodeURIComponent(JSON.stringify(res.data.object))+'&mark=pwdlogin'
							})
						}else{//直接登录
							loginTip(res,this.$store.state.PagesUrl,this.$store.state.PagesType)
						}
					}else{
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						});
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			// 忘记密码
			forgetpwd(){
				uni.navigateTo({
					url:'/pages/ForgetPassword/ForgetPassword'
				})
			},
			// 选择记住密码
			selectPwd(){
				this.remeberPwd=!this.remeberPwd
			},
			// 同意隐私政策
			select(e){
				this.check=!this.check
			},
		},
		onHide() {
			clearInterval(this.Timer)//页面隐藏时，清除定时器
		},
		onLoad(options) {
			console.log(this.$store.state.PagesUrl)//从那个页面过来的路径
			console.log(options)
			if(options.password){//从注册页面过来
				this.phone=options.telephone
				this.password=options.password
			}else{//从手机验证码登陆页面过来或者从忘记密码页面过来的
				this.phone=options.telephone
			}
			console.log(uni.getStorageSync('password'))
			this.phone=uni.getStorageSync('phone')
			if(uni.getStorageSync('password')){//密码存在，则显示记住密码
				this.password=uni.getStorageSync('password')
				this.remeberPwd=true
			}else{//密码存在，则显示记住密码
				this.remeberPwd=false
				this.password=''
			}
		},
		onReady() {
			this.amendNavigator()
		}
	}
</script>

<style scoped>
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
	.login-main {
		flex: 1;
		padding: 0 45rpx;
	}
	.login-logo {
		width: 248rpx;
		padding-bottom: 50rpx;
		/* margin: 50rpx auto 0 auto; */
	}
	.login-logo image{
		width: 100%;
		height: 100%;
	}	
	.title_tip{
		color: #000000;
		font-size: 42rpx;
		font-weight: 600;
		margin-bottom: 50rpx;
	}
	.tel_login input{ 
		height: 80rpx;
		line-height: 80rpx;
		background-color: #F4F4F4;
		border: 1px solid #F4F4F4;
		padding: 0 30rpx;
		margin-bottom: 30rpx;
		border-radius: 16rpx;
		color: #8F8F8F;
		font-size: 32rpx;
	}
	.pwdlogin{
		width: 660rpx;
		height: 80rpx;
		line-height: 80rpx;
		margin: 44rpx auto;
		color: #FFFFFF;
		background: #A4E1FF;
		border: 1px solid transparent;
		border-radius: 40rpx;
	}
	.pwdlogin::after{
		border: none;
	}
	.button-hover{
		color: #FFFFFF;
		background: #69CDFF;
	}
	.forget_pwd{
		color: #333333;
		font-size: 24rpx;
		text-align: right;
		margin-top: 24rpx;
		border-radius: 10rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.footer{
		display: flex;
		justify-content: center;
		color: #909090;
		font-size: 28rpx;
		position: fixed;
		bottom: 60rpx;
		left: 0;
		right: 0;
	}
	.footer .user{
		color: #86B0D4;
	}
	.footer .secret{
		color: #86B0D4;
	}
	.footer .uni-label-pointer{
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: center;
	}
	/* #ifdef MP-WEIXIN */
	.footer .label{
		width: 100%;
		display: flex;
		align-items: center;
	}
	.label{
		display: flex;
		align-items: center;
	}
	/* #endif */
</style>
