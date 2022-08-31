<template>
	<view class="account" :data-theme='themeType'>
		<view class="top">
			<view class="accountlist sy_block sy_border_bottom" v-for="(item,index) in accountList" :key='index' @click="selectAccount(item.username,item.telephone)">
				<view class="left">
					<image lazy-load style="width: 100rpx;height: 100rpx;" :src="item.avatarLinks?item.avatarLinks:'/static/image/person.png'" mode="aspectFill"></image>
					<view class="content" style="">
						<text class="title" style="font-size: 30rpx;">{{item.username}}</text>
						<text class="title sy_title_primary" style="font-size: 24rpx;color: #666;">{{item.name}}</text>
					</view>
				</view>
				<view class="" v-if="item.username==boolAccount?true:false" style="padding: 0 20rpx;">
					<u-icon size="40" name="checkbox-mark" color="#86B0D4"></u-icon>
				</view>
			</view>
		</view>
		<view class="loginBtn">
			<u-button class="btn" type="primary" @click="login">登录</u-button>
		</view>
	</view>
</template>

<script>
	import {passwordLogin} from '@/utill/api/login/passwordLogin.js'
	import {loginCode} from '@/utill/api/login/loginCode.js'
	import loginTip from '@/utill/tools/loginTip.js'
	export default{
		data(){
			return{
				accountList:[],
				boolAccount:'',
				mark:'',//密码登陆的标识
				phone:'',//手机号
			}
		},
		methods:{
			selectAccount(username,phone){
				this.boolAccount=username
				this.phone=phone
				console.log('切换', username,phone)
			},
			login(){
				console.log(this.mark)
				if(this.mark){ //密码登陆
					passwordLogin({
						telephone:this.phone,
						username: this.boolAccount,
					}).then(res=>{
						console.log(res)
						// loginTip(res,this.$store.state.PagesUrl,this.$store.state.PagesType)
					}).catch(err=>{
						console.log(err)
					})
				}else{
					loginCode({
						username:this.boolAccount,
					}).then(res=>{
						console.log(res)
						if(res.data.code==0){
							loginTip(res,this.$store.state.PagesUrl,this.$store.state.PagesType)
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
		},
		onLoad(options) {
			console.log(options)
			this.accountList=JSON.parse(decodeURIComponent(options.data))
			this.boolAccount=this.accountList[0].username //默认是第一个账号
			this.phone=this.accountList[0].telephone//默认是第一个账号
			if(options.mark){
				this.mark=options.mark
			}
			console.log(this.mark)
		},
		onReady() {
			this.amendNavigator()
		}
	}
</script>

<style scoped lang="scss">
	page{
		height: 100%;
		width: 100%;
	}
	.account{
		display: flex;flex-direction: column;
		width: 100%;
		/* #ifdef H5 */
		height:100%;
		/* #endif */
		/* #ifndef H5 */
		height: 100vh;
		/* #endif */
		.top{
			flex: 1;
			height: 100%;
			overflow: auto;
			.accountlist{
				border-bottom: 1px solid #F8F8F8;
				display: flex;
				align-items: center;
				background-color: #FFFFFF;padding: 10rpx 30rpx;
				.left{
					flex: 1;display: flex;align-items: center;
					.content{
						margin-left: 20rpx;display: flex;flex-direction: column;justify-content: center;
						.title{
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 1;
							overflow: hidden;
							word-wrap: break-word;
							word-break: break-all;
							padding: 5rpx 0;
						}
					}
				}
			}
		}
	}
	
	.loginBtn{
		padding: 40rpx 80rpx;
		.btn{
			background-color: #86B0D4;
		}
	}
	
	
</style>
