<template>
	<view class="loginSure" :data-theme='themeType'>
		<login-top @close="close" @register="register"></login-top>
		<view class="login-main">
			<view class="">
				<view class="title_tip">
					<text class="title sy_title_deep">输入验证码</text>
					<view class="tip sy_title_primary">
						<text>短信验证码已发送至</text>
						<text class="areaCode">{{`+${areaCode}`}}</text>
						<text class="telephone">{{phone}}</text>
					</view>
				</view>
				<view class="tel_login">
					<u-message-input maxlength='4' :focus="true" :breathe="true" @finish="finish"></u-message-input>
					<view class="" style="text-align: center;margin: 20rpx 0;"
					 @click.stop="getCode()">
						<text :style="styleObject">{{getCodeText}}</text>
					</view>
				</view>
				<!-- <view class="login-tip">
					<text>倒计时结束后可重新获取验证码</text>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import {loginsendCode} from '@/utill/api/login/loginsendCode.js'
	import {loginCode} from '@/utill/api/login/loginCode.js'
	import loginTip from '@/utill/tools/loginTip.js'
	export default{
		data(){
			return{
				getCodeText: '获取验证码',
				areaCode:"+86",
				phone:'',
				styleObject: {
					color: '#8F8F8F',
					fontSize:'24rpx'
				},
				Timer:'',//定时器
				disabled:true,
			}
		},
		methods:{
			// 关闭注册登陆页面
			close(){
				uni.navigateBack({
					delta:1,
				})
			},
			register(){
				uni.navigateTo({
					url:"/pages/register/register"
				})
			},
			// 验证码输入完毕，直接登录
			finish(e){
				console.log('输入结束，当前值为：' + e);
				loginCode({
					telephone:this.phone,
					smsVerCode:e
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						// 消除定时器
						clearInterval(this.Timer)
						// uni.report('codeLogin',{//验证码登陆统计上报
						// 	telephone:this.phone,
						// })
						console.log(typeof(res.data.object))
						console.log(Array.isArray(res.data.object))
						console.log(res.data.object, '验证码登陆返回数据')
						if(Array.isArray(res.data.object)){
							uni.navigateTo({
								url:'/pages/login/accountLogin?data='+encodeURIComponent(JSON.stringify(res.data.object))
							})
						}else{//直接登录
							loginTip(res,this.$store.state.PagesUrl,this.$store.state.PagesType)
						}
					}else{
						// 登录失败。验证码清空
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
					}
				}).catch(err=>{
					// 消除定时器
					// clearInterval(this.Timer)
					console.log(err)
				})
			},
			// 再次获取验证码
			getCode(){
				if(this.disabled){//禁用
					uni.showToast({
						title:'倒计时结束后再获取',
						icon:'none'
					})
					return
				}
				loginsendCode({
					telephone:this.phone
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						this.setTimer()
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
			setTimer() {
				let holdTime = 59,//5
				_this = this;
				_this.getCodeText = "60s后重新获取"
				_this.Timer = setInterval(() => {
					if (holdTime <=0) {
						_this.disabled = false;//可以获取验证码
						_this.styleObject={
							color:"#69CDFF",
							fontWeight:'bold'
						}
						_this.getCodeText = "重新获取验证码"
						clearInterval(_this.Timer);
						return;
					}
					_this.getCodeText =`${holdTime}s后重新获取`
					holdTime--;
				}, 1000)
			},
		},
		onLoad(options) {
			setTimeout(()=>{
				this.setTimer()
			},1000)
			this.phone=options.phone
			this.areaCode=options.area
		},
		onUnload() {
			clearInterval(this.Timer)
		}
	}
</script>
	
<style scoped>
	page{
		height: 100%;
	}
	.loginSure{
		padding: 0 30rpx;
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
		padding: 0 70rpx;
		padding-top: 260rpx;
	}
	.tel_login{
		/* display: flex;
		align-items: center;
		justify-content: space-between; */
		padding: 20rpx 0;
		margin-top: 50rpx;
	}
	.tel_login .uni-icons{
		margin: 0 16rpx;
	}
	.title_tip {
		font-family: PingFang-SC-Medium;
		letter-spacing: 2rpx;
	}
	.title_tip .title{
		color: #000000;
		font-size: 42rpx;
		font-weight: 600;
	}
	.title_tip .tip{
		font-size: 24rpx;
		margin-top: 30rpx;
		color: #333333;
		font-weight: 500;
	}
	.areaCode{
		margin: 0 10rpx;
	}
	.login-tip{
		color: #69CDFF;
		font-size: 24rpx;
		text-align: center;
		margin-bottom: 45rpx;
	}
</style>
