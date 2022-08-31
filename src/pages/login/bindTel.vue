<template>
	<view class="container" :data-theme='themeType'>
		<view class="bindTel">
			<u-field
				class="sy_block"
				v-model="mobile"
				label="手机号"
				placeholder="请填写手机号"
				icon="phone"
			>
			</u-field>
			<u-field
				class="sy_block"
				v-model="code"
				label="验证码"
				icon="photo"
				placeholder="请填写验证码"
			>
				<template v-slot:right>
					<u-button size="mini" @click="getCode">{{codeText}}</u-button>
				</template>
			</u-field>
			<u-verification-code ref="uCode" @change="codeChange" :seconds="seconds"></u-verification-code>
			<view class="" style="padding: 0 30rpx;">
				<u-button :custom-style="customStyle" @click="bindTel">绑定</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {wechatcode} from '@/utill/api/register/wechatcode.js'
	import {wechatBind} from '@/utill/api/login/wechatBind.js'
	import {wechatLogin} from '@/utill/api/login/wechatLogin.js'
	import loginTip from '@/utill/tools/loginTip.js'
	export default{
		data(){
			return{
				mobile:'',
				code:'',
				errorMessage: '',
				codeText: '发送验证码',
				customStyle: {
					marginTop: '20px', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
					color: '#ffffff',
					background: '#86B0D4'
				},
				seconds:60,
				openId:'',
			}
		},
		methods:{
			codeChange(text) {
				this.codeText = text;
			},
			// 获取验证码
			getCode(){
				if(this.mobile==''){
					uni.showToast({
						title: '手机号码不能为空',
						icon: "none"
					});
					return;
				}
				if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.mobile))) {
					uni.showToast({
						title: '请填写正确手机号码',
						icon: "none"
					});
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
						wechatcode({
							areaCode:'86',
							telephone:this.mobile
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
			bindTel(){
				if(!this.mobile){
					uni.showToast({
						title: '手机号码不能为空',
						icon: "none"
					});
					return;
				}
				if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.mobile))) {
					uni.showToast({
						title: '请填写正确手机号码',
						icon: "none"
					});
					return;
				}
				if(!this.code){
					uni.showToast({
						title: '验证码不能为空',
						icon: "none"
					});
					return;
				}
				uni.showLoading({
					title:'登录中'
				})
				wechatBind({
					areaCode:'86',
					telephone:this.mobile,
					smsVerCode:this.code,
					openId:this.openId
				}).then(res=>{
					uni.hideLoading()
					console.log(res)
					if(res.data.code==0){//已经绑定可手机号，根据不同的审核状态，判断是否看到页面
						if(Array.isArray(res.data.object)){
							uni.navigateTo({
								url:'/pages/login/accountLogin?data='+encodeURIComponent(JSON.stringify(res.data.object))
							})
						}else{//直接登录
							loginTip(res,this.$store.state.PagesUrl,this.$store.state.PagesType)
						}
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
			},
		},
		onLoad(options) {
			this.openId=JSON.parse(decodeURIComponent(options.openId))
			console.log(this.openId)
		},
		onReady() {
			this.amendNavigator()
		}
	}
</script>

<style scoped>
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
