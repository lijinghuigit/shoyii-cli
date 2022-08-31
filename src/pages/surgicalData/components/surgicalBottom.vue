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
					{icon:'iconzhuanfa',title:'转发'},
					// #endif	
				],
			}
		},
		emits:['vrshow','Jsshow','share'],
		methods:{
			show(index){
				console.log(index)
				if(index==0){//xr显示
				// #ifdef H5
					uni.showToast({
						title:'网页端不能显示',
						icon:'none'
					})
					return;
				// #endif
				// #ifndef H5
				  this.$emit('vrshow')
				// #endif
				}else if(index==1){//三维显示
					this.$emit('Jsshow')
				}else if(index==2){//转发
					// #ifdef APP-PLUS
						this.$emit('share')
					// #endif
					// #ifdef H5
						uni.showToast({
							title:'网页端不能分享',
							icon:'none'
						})
					// #endif
				}
			}
		}
	}
</script>

<style scoped>
	.footer{
		height:110rpx;
		border-top:1px solid #EEEEEE;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;
		background: #FFFFFF;
		/* background-color: red; */
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

	.poplist{
		padding: 0 30rpx;
		height: 715rpx;
		background: #FFFFFF;
		/* display: flex;
		flex-direction: column; */
	}
	.poplist .content{
		color:#333333;
		font-size: 30rpx;
	}
	.poplist .content_item{
		border-bottom: 1px solid #EEEEEE;
		text-indent: 10rpx;
		padding: 25rpx 0;
	}
	.poplist .content_item uni-text{
		display: block;
	}
	.pop_header{
		border-bottom: 1px solid #EEEEEE;
		padding: 10rpx 0;
	}
	/* #ifndef APP-NVUE */
	.pop_header ::v-deep .segmented-control__item--text{
		border-bottom-width: 0;
	}
	/* #endif */
	.classifyItem{
		/* flex: 1; */
		height: 610rpx;
		/* overflow: auto; */
	}
	.textColor{
		color: #86B0D4;
	}
</style>
