<template>
	<view class="footer sy_block sy_border_top">
		<view class="showTitle">
			<view class="vrshow sy_title_primary" v-for="(item,index) in boottomList" :key='index' @click="show(index)">
				<view class="">
					<text class="iconfont" :class="item.icon"></text>
				</view>
				<text>
					{{item.title}}
				</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				// 底部导航
				boottomList:[
					{icon:'iconshebeiguanli',title:'XR显示'},
					{icon:'iconsanweixianshi',title:'三维显示'},
					// #ifdef APP-PLUS
					{icon:'iconzhuanfa',title:'病例转发'},
					// #endif
				],
			}
		},
		emits:['vrshow','enterJs','caseshare'],
		methods:{
			show(index){
				console.log(index)
				if(index==0){//xr显示
					console.log('xr显示')
					// #ifdef H5
					uni.showToast({
						title:'网页端不能操作',
						icon:'none'
					})
					// #endif
					// #ifndef H5
					this.$emit('vrshow')
					// #endif
				}else if(index==1){//三维显示
					this.$emit('enterJs')
				}else if(index==2){//转发
					this.$emit('caseshare')
				}
			},
		},
	}
</script>

<style scoped>
	.footer{
		height:55px;
		border-top:2rpx solid #EEEEEE;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;
		background: #FFFFFF;
	}
	.showTitle{
		display: flex;
		width: 100%;
		height: 80rpx; 
	}
	.vrshow{
		flex: 1;
		color: #000000;
		font-size: 20rpx;
		text-align: center;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.vrshow .iconfont{
		font-size: 36rpx;
	}
</style>
