<template>
	<view :data-theme='themeType' class="container">
		<view class="title" style="">
			<!-- #ifdef APP-PLUS||H5 -->
			<u-image width="152rpx" height="106rpx" style="margin: 10px auto;" mode="aspectFit" :src="defaultImg"></u-image>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<view class="" style="width: 100%;">
				<image lazy-load :src="defaultImg" mode="" style="width: 152rpx;height: 106rpx;margin: 10px auto;"></image>
			</view>
			<!-- #endif -->
			<text class="tip sy_title_deep" style="">ShoYii医生PC端登录确认</text>
		</view>
		<view class="btn" style="">
			<u-button class="loginBtn" @click="PcLogin" :custom-style="customStyle">登录</u-button>
			<text @click="cancelLogin" class="cancelLogin sy_title_primary">取消登录</text>
		</view>
	</view>
</template>

<script>
	import {doctorScan} from '@/utill/api/login/doctorScan.js'
	export default {
		data() {
			return {
				customStyle:{
					backgroundColor: '#86b0d4',
					color: '#FFFFFF'
				},
				uuid:'',
				defaultImg:uni.getStorageSync('uploadLogo')
			}
		},
		methods: {
			PcLogin(){
				doctorScan({
					uuid:this.uuid,
					token:this.$store.getters['user/info'].token,
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
						uni.switchTab({
							url:'/pages/Tabbar/mine',
							"animationType":'slide-in-bottom'
						})
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
					}
			    })
			},
			cancelLogin(){
				uni.switchTab({
					url:'/pages/Tabbar/mine',
					"animationType":'slide-in-bottom'
				})
			}
		},
		onLoad(options) {
			this.uuid=options.uuid
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
	.title{
		position: fixed;text-align: center;top: 35%;left: 0;right: 0;
		.tip{
			font-size: 36rpx;letter-spacing: 1px;font-weight: bold;
		}
	}
	.btn{
		text-align: center;position: fixed;bottom: 50px;width: 100%;
		/* #ifdef MP-WEIXIN */
		display: flex;
		flex-direction: column;
		align-items: center;
		/* #endif */
		.loginBtn{
			width: 50%;margin-bottom: 10px;
		}
	}

	
</style>
