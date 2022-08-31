<template>
	<view style="" :data-theme='themeType' class="container">
		<u-time-line>
			<u-time-line-item nodeTop="2"
			v-for="(item,index) in logisticList" :key='index'>
				<!-- 此处自定义了左边内容，用一个图标替代 -->
				<!-- v-if="item.opStatus" -->
				<template v-slot:node v-if="item.opStatus">
					<!-- 最新的数据及存在节点状态 -->
					<view class="u-node" :style="{background:index==0&&item.opStatus?'#19be6b':'#ddd'}">
						<u-icon name="pushpin-fill" :color="themeType=='dark'?'#8f8f8f':'#fff'" :size="24"></u-icon>
					</view>
				</template>
				<template v-slot:content>
					<view>
						<view class="u-order-title sy_title_deep" v-if="item.opStatus">{{item.opStatus}}</view>
						<view class="u-order-desc">
							<text v-if="item.acceptAddress">【{{item.acceptAddress}}】</text>
							<text>{{item.remark}}</text> 
						</view>
						<view class="u-order-time">{{item.acceptTime}}</view>
					</view>
				</template>
			</u-time-line-item>
		</u-time-line>
	</view>
</template>

<script>
	import {getlogisticInfo} from '@/utill/api/order/order.js'
	export default{
		data(){
			return{
				logisticList:[]
			}
		},
		methods:{
			getLogistics(orderNo){
				getlogisticInfo({
					orderNo
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						let data=res.data.object
						this.logisticList=data.reverse()
						// console.log(this.logisticList)
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
			console.log(options)
			// options.orderNo='20210706162002489757966'
			this.getLogistics(options.orderNo)
		},
		onReady() {
			this.amendNavigator()
		}
	}
</script>

<style scoped>
	.container{
		padding: 0 30rpx;
		width: 100%;
		/* #ifdef H5 */
		min-height: 100%; 
		/* #endif */
		/* #ifndef H5 */
		min-height: 100vh;
		/* #endif */
	}
	.u-node {
		width: 44rpx;
		height: 44rpx;
		border-radius: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #d0d0d0;
	}	
	.u-order-title {
		color: #333333;
		font-weight: bold;
		font-size: 32rpx;
	}
	
	.u-order-desc {
		color: rgb(150, 150, 150);
		font-size: 28rpx;
		margin-bottom: 6rpx;
	}
	
	.u-order-time {
		color: rgb(200, 200, 200);
		font-size: 26rpx;
	}
</style>
