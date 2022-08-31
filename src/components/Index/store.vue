<template>
	<view class="store">
		<scroll-view class="storelist" enable-flex scroll-x="true">
			<view class="dataList" v-for="(item,index) in shoyiiStore" :key='index'>
				<image lazy-load class="image" :src="item.url" mode="aspectFit"></image>
				<view class="textOne">
					<text>{{item.title}}</text>
				</view>
				<view class="textTwo">
					<text>{{item.amount}}</text>
					<uni-icons type="more-filled" @click="storeDetail"></uni-icons>
				</view>
			</view>
		</scroll-view>
	</view>
</template>
<script>
	export default{
		props:{
			shoyiiStore:{
				type:Array,
				default:()=>{
					return[]
				}
			}
		},
		methods:{
			storeDetail(){}
		}
		
	}
</script>

<style scoped lang="scss">
	.store{
		display: flex;
		flex-wrap: wrap;
		border-radius: 15rpx;
		justify-content: center;
		padding: 20rpx 0;
		.storelist{
			margin-top: 0;
			white-space: nowrap;
			width: 100%;
			.dataList{
				margin-right: 40rpx;
				width: 50%;
				border: 1px solid #EEEEEE;
				border-radius: 15rpx;
				padding-bottom: 20rpx;
				display: inline-block;
				border-radius: 10rpx;
				background-color: #FFFFFF;
				text-align: left;
				.textOne{
					margin: 20rpx 0;
					white-space:nowrap;
					overflow:hidden;
					text-overflow:ellipsis;
				}
				.textTwo{
					white-space:nowrap;
					overflow:hidden;
					text-overflow:ellipsis;
				}
				.image{
					width: 100%;
					max-height: 344rpx;
					height: 344rpx;
					border-bottom: 1px solid #EEEEEE;
				}
				uni-view{
					color: #000000;
					font-size: 28rpx;
					font-family: PingFang-SC-Regular;
					text-indent: 24rpx;
				}
			}
		}
	}
</style>
