<template>
	<view class="" style="flex: 1;display: flex;flex-wrap: wrap;">
		<view class="item" v-for="(item,index) in menu" :key='index'>
			<view class="icon">
				<text @click="$emit('sendItem',index+1)" :class="item.icon" class="iconfont"></text>
			</view> 
			<text class="tip sy_content">{{item.title}}</text>
		</view>
	</view> 
</template>

<script>
	export default{
		emits:['sendItem'],
		data(){
			 return {
				 menu:[
				 	{title:'相册',icon:'icontupian'},
				 	{title:'拍摄',icon:'iconxiangji1'},
				 	{title:'文件',icon:'iconwenjian'},
				 	{title:'方法库',icon:'iconshoushufangfa'},
				 	{title:'病例',icon:'iconfasongbingli'},
				 ],
			 }
		},
	}
</script>

<style scoped lang="scss">
	.item{
		width: 25%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		/* #ifndef APP-PLUS */
		margin: 20rpx 0;
		/* #endif */
		/* #ifdef APP-PLUS */
		margin:50rpx 0;
		/* #endif */
		.iconfont{
			font-size: 48rpx;
		}
		.icon{
			background-color: #FFFFFF;
			width: 70rpx;
			height: 70rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #000000;
			border-radius: 20rpx;
			margin-bottom: 10rpx;
		}
		.tip{
			font-size: 24rpx;
			color: #666;
		}
	}
</style>