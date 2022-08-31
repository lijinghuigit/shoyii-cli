<template>
	<view class="container" :data-theme='themeType'>
		<view class="bindTel">
			<u-field
				class="sy_block"
				v-model="Oldpwd"
				label="原始密码:"
				placeholder="请填写原始密码"
				:password='true'
				:error-message="OlderrorMessage"
			>
			</u-field>
			<u-field
				class="sy_block"
				v-model="Newpwd"
				label="新密码:"
				placeholder="请填写新密码"
				:password='true'
				:error-message="NewerrorMessage"
			>
			</u-field>
			<u-field
				class="sy_block"
				v-model="Surepwd"
				label="确认密码:"
				placeholder="请确认新密码"
				:password='true'
				:error-message="SureerrorMessage"
			>
			</u-field>
			<view class="" style="padding: 0 30rpx;">
				<u-button :custom-style="customStyle" @click="sure">确定</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {amendPwd} from './api/secondPwd.js'
	export default{
		data(){
			return{
				customStyle: {
					marginTop: '20px', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
					color: '#ffffff',
					background: '#86B0D4'
				},
				OlderrorMessage:'',
				NewerrorMessage:'',
				SureerrorMessage:'',
				Oldpwd:'',
				Newpwd:'',
				Surepwd:'',
			}
		},
		methods:{
			sure(){
				if(this.Oldpwd==''){
					this.OlderrorMessage='原始密码不能为空'
					return;
				}
				if(this.Newpwd==''){
					this.NewerrorMessage='新密码不能为空'
					return;
				}
				if(this.Surepwd==''){
					this.SureerrorMessage='确认密码不能为空'
					return;
				}
				if(this.Newpwd!=this.Surepwd){
					this.SureerrorMessage='确认密码与新密码不一致'
					return;
				}
				amendPwd({
					password:this.Oldpwd,//旧密码
					newPassword:this.Surepwd//新密码
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						uni.showToast({
							title:res.data.msg
						})
						uni.switchTab({
							url:'/pages/Tabbar/mine'
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

<style scoped lang="scss">
	page{
		height: 100%;
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
