<template>
	<view class="box">
		<view class="list sy_block sy_border" style="flex: 1;position: relative;" @tap="enterDetail()" 
		:hover-class="themeType=='dark'?'sy_hover_bg':'bgColor'">
			<view class="surgical_image">
				<!-- #ifdef APP-PLUS||H5 -->
				<u-image v-if="items.previewImage" width="100%" height="214rpx" mode="scaleToFill" :src="items.previewImage[items.fristImgFileId]">
					<template v-slot:loading>
						<uni-icons type="spinner-cycle"></uni-icons>
					</template>
					<template v-slot:error>
						<image :src="defaultImg" mode="aspectFit"></image>
					</template>
				</u-image>
				<u-image v-else width="100%" height="214rpx" :src="defaultImg">
				</u-image>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<image lazy-load v-if="items.previewImage" :src="items.previewImage[items.fristImgFileId]" mode="aspectFit" style="height: 214rpx;"></image>
				<image lazy-load v-else style="height: 214rpx;" :src="defaultImg" mode="aspectFit"></image>
				<!-- #endif -->
			</view>
			<view class="content">
				<view>
					<text class="content_titlename sy_title_primary">{{items.modelName}}</text>
					<view class="content_items">
						<text>{{timeStamp(items.createTime)}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				defaultImg:uni.getStorageSync('uploadLogo')
			};
		},
		props:{
			items:{
				type:Object,
				default:()=>{
					return{}
				}
			},
			MyModel:{
				type:Number,
				default:null,
			}
		},
		methods:{
			enterDetail(){
				if(this.MyModel==0){//进入我的模型库详情
					uni.navigateTo({
						url:'/pages/model/MyDetail?modelId='+this.items.id
					})
				}else{//进入公开模型库详情
					uni.navigateTo({
						url:'/pages/publicModel/modelDetail?modelId='+this.items.id+'&classifyId='+this.items.modelCategory
					})
				}
			},
		},
	}
</script>

<style scoped lang="scss">
	.box{
		margin-top: 30rpx;
		width: 100%;
		display: flex;
		align-items: center;
	}
	.list{
		display: flex;
		width: 100%;
		align-items: flex-start;
		padding: 18rpx 12rpx;
		background-color: #FFFFFF;
		border: 1px solid #EEEEEE;
		border-radius: 10rpx;
	}
	.bgColor{
		background-color: $uni-bg-color-grey;
	}
	.surgical_image{
		height: 214rpx;
		width: 226rpx;
		margin-right: 21rpx;
	}
	.surgical_image image{
		width: 100%;
		min-width: 226rpx;
		height: 214rpx;	
		border: 1px solid #EEEEEE;
	}
	.content{
		flex:1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-height: 214rpx;
		overflow: hidden;
		margin-top: 0;
		padding: 0 10rpx;
	}
	.content .content_titlename{
		color: #000000;
		font-size: 30rpx;
		font-weight: bold;
		font-family: PingFang-SC-Bold;
		/* margin-bottom: 22rpx; */
		/* line-height: 24rpx; */
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
	}
	.content .content_items{
		color: #8F8F8F;
		font-family: PingFang-SC-Regular;
		font-size: 24rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
		line-height: 30rpx;
		margin: 22rpx 0 30rpx;
		word-wrap: break-word;
		word-break: break-all;
	}
	.title{
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
		color: #000000;
		font-size: 24rpx;
		font-family: PingFang-SC-Regular;
	}
	.title .time{
		color: #909090;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
	}
	.title_top{
		display: flex;
		align-items: center;
	}
	.title_top .docName{
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
	}
	.title_top image{
		width: 36rpx;
		height: 36rpx;
		border-radius: 50%;
		margin-right: 7px;
		display: block;
	}
	
</style>
