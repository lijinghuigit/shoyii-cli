<template>
	<view class="showTitle">
		<view class="vrshow sy_title_primary" v-for="(item,index) in boottomList" :key='index' @click="show(index)">
			<view class="sy_title_primary">
				<text class="iconfont" :class="item.icon"></text>
			</view>
			<text>
				{{item.title}}
			</text>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				boottomList:[
					{icon:'iconshebeiguanli',title:'XR显示'},
					{icon:'iconsanweixianshi',title:'三维显示'},
					// #ifdef APP-PLUS
					{icon:'iconzhuanfa',title:'转发'},
					// #endif
				],
			}
		},
		emits:['show'],
		methods:{
			show(index){
				if(index==0){//XR显示
				// #ifdef H5
					uni.showToast({
						title:'网页端不能展示',
						icon:'none'
					})
					return;
				// #endif
				// #ifdef APP-PLUS
				   this.$emit('show',0)
				// #endif
				// #ifdef MP-WEIXIN
				this.$emit('show',0)
				// #endif
				}else if(index==1){//三维显示
					this.$emit('show',1)
				}else if(index==2){//转发
				// #ifdef APP-PLUS
					this.$emit('show',2)
				// #endif
				// #ifdef H5
					uni.showToast({
						title:'网页端不能分享',
						icon:'none'
					})
				// #endif				
				}
			}
		},
	}
</script>

<style scoped lang="scss">
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
