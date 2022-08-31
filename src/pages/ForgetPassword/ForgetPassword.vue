<template>
	<view :data-theme='themeType' class="container">
		<view class="bindTel">
			<u-field
				class="sy_block"
				v-model="mobile"
				label="手机号"
				placeholder="请填写手机号"
				icon="phone"
				:error-message="errorMessage"
			>
			</u-field>
			<u-field
				class="sy_block"
				v-model="code"
				label="验证码"
				icon="photo"
				placeholder="请填写验证码"
				:error-message="errorMessageCode"
			>
			<template v-slot:right>
				<u-button size="mini" @click="getCode">{{codeText}}</u-button>
			</template>
			</u-field>
			<u-verification-code ref="uCode" @change="codeChange" :seconds="seconds"></u-verification-code>
			<view class="" style="padding: 0 30rpx;">
				<u-button :custom-style="customStyle" @click="nextStep">下一步</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {getcode,vertifyCode} from './api/forgetPwd.js'
	export default {
		data() {
			return {
				mobile:'',
				code:'',
				errorMessage: '',//手机号的提示
				errorMessageCode:'',//验证码的提示
				codeText: '发送验证码',
				customStyle: {
					marginTop: '20px', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
					color: '#ffffff',
					background: '#86B0D4'
				},
				seconds:60,
			}
		},
		methods: {
			getCode(){
				if(this.mobile==''){
					this.errorMessage='手机号码不能为空'
					return;
				}
				if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.mobile))) {
					this.errorMessage='请填写正确手机号码'
					return;
				}
				if(this.$refs.uCode.canGetCode) {
					uni.showLoading({
						title: '正在获取验证码'
					})
					setTimeout(() => {
						uni.hideLoading();
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
						// 调发送验证码接口
						getcode({
							areaCode:'86',
							telNum:this.mobile,
						}).then(res=>{
							console.log(res)
							if(res.data.code==0){
								uni.showToast({
									title: res.data.msg,
									icon: "none"
								});
							}else{
								uni.showToast({
									title: res.data.msg,
									icon: "none"
								});
							}
						}).catch(err=>{
							console.log(err)
						})
					}, 500);
				}else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			codeChange(text) {
				this.codeText = text;
			},
			// 下一步
			nextStep(){
				if(!this.mobile){
					this.errorMessage='手机号码不能为空'
					return;
				}
				if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.mobile))) {
					this.errorMessage='请填写正确手机号码'
					return;
				}
				if(!this.code){
					this.errorMessageCode='验证码不能为空'
					return;
				}
				vertifyCode({
					areaCode:'86',
					telephone:this.mobile,
					smsVerCode:this.code,
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						// 进入设置密码的页面
						uni.navigateTo({
							url:'/pages/ForgetPassword/SetPassword?telephone='+this.mobile
						})
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
		},
		onReady() {
			this.amendNavigator()
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
		background-color: #FFFFFF;
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
	.bindTel{
		padding-top: 40rpx;
	}
</style>
