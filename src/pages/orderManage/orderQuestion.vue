<template>
	<view class="Questions" :data-theme='themeType'>
		<u-input v-model="value" type="textarea" :custom-style="themeType=='dark'?{color:'#8f8f8f'}:{color:'#000'}"
		placeholder='请输入问题详细内容' :border="border" :height="height" :auto-height="autoHeight" />
		<view v-if="secondSwitch" style="padding: 20rpx 0;">
			<u-input v-model="secondPwd" placeholder='请输入二级密码,才能提交' :border='true' type='password' :password-icon='true'
			 :custom-style="themeType=='dark'?{color:'#8f8f8f'}:{color:'#000'}"	/>
		</view>
		<view class="btn" @click="submit">
			<button style="background-color: #86B0D4;color: #FFFFFF;" type="default">提交</button>
		</view>
	</view>
</template>

<script>
	import {ensureService} from '@/utill/api/order/order.js'
	export default{
		data(){
			return{
				value: '',//问题反馈
				border: true,
				height: 200,
				autoHeight: true,
				orderNo:'',
				secondPwd:'',//二级密码
			}
		},
		computed:{
			secondSwitch(){// 是否设置二级密码,默认是有二级密码
				return this.$store.getters['user/info'].secondSwitch
			}
		},
		methods:{
			submit(){
				if(this.secondSwitch){// 需要输入二级密码
					if(!this.secondPwd){
						uni.showToast({
							title:'二级密码不能为空',
							icon:'none'
						})
						return
					}
				}
				if(!this.value){
					uni.showToast({
						title:'问题不能为空',
						icon:'none'
					})
					return;
				}
				this.feedback()
			},
			feedback(){
				ensureService({
					confirmStatus:false,
					feedback:this.value,
					secondLevelPassword:this.secondPwd,//二级密码
					orderNo:this.orderNo
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						uni.showToast({
							title:res.data.msg
						})
						uni.navigateBack({//提交成功，返回详情页面
							delta:1
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
			console.log(options.orderNo)
			this.orderNo=options.orderNo
		},
		onReady() {
			this.amendNavigator()
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #FFFFFF;
		/* #ifdef H5 */
		height: 100%;
		/* #endif */
	}
	.Questions{
		padding: 0 30rpx;
		width: 100%;
		/* #ifdef H5 */
		min-height: 100%;
		/* #endif */
		/* #ifndef H5 */
		min-height: 100vh;
		/* #endif */
	}
	.btn{
		width: 100%;
		position: fixed;
		bottom: 20rpx;
		left: 0;
		right: 0;
		padding: 0 30rpx;
	}
</style>
