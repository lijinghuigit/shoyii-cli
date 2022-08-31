<template>
	<view class="bindTel" :data-theme='themeType'>
		<u-field
			class="sy_block"
			v-model="password"
			label="设置密码"
			placeholder="请输入密码"
			:error-message="errorMessage"
			:password='true'
		>
		</u-field>
		<u-field
			class="sy_block"
			v-model="surepassword"
			label="确认密码"
			placeholder="再次确认密码"
			:error-message="errorMessageCode"
			:password='true'
		>
		</u-field>
		<view class="" style="padding: 0 30rpx;">
			<u-button :custom-style="customStyle" @click="sure">确认</u-button>
		</view>
	</view>
</template>

<script>
	import {amendPwd} from './api/forgetPwd.js'
	export default{
		data(){
			return{
				errorMessage:'',
				errorMessageCode:'',
				customStyle: {
					marginTop: '20px', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
					color: '#ffffff',
					background: '#86B0D4'
				},
				password:'',
				surepassword:'',
				telephone:'',
			}
		},
		methods:{
			sure(){
				if(!this.telephone){
					uni.showToast({
						title:'手机号不能为空',
						icon:'none'
					})
					return;
				}
				if(!this.password){
					this.errorMessage='密码不能为空'
					return;
				}
				if(!this.surepassword){
					this.errorMessageCode='请输入确认密码'
					return;
				}
				if(this.password!=this.surepassword){
					this.errorMessageCode='密码设置不一致'
					return;
				}
				amendPwd({
					areaCode:'86',
					telephone:this.telephone,
					password:this.surepassword
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){//设置完之后，要重新登陆啊
						uni.navigateTo({
							url:'/pages/login/pwdLogin?telephone='+this.telephone
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
		onLoad(options) {
			console.log(options.telephone)
			this.telephone=options.telephone
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
	.bindTel{
		padding-top: 40rpx;
		width: 100%;
		/* #ifdef H5 */
		min-height: 100%; 
		/* #endif */
		/* #ifndef H5 */
		min-height: 100vh;
		/* #endif */
	}
</style>
