<template>
	<view class="">
		<view class="Newstitle">
			<view>
				<text @click="newsMore(0)" :class="NewstabIndex===0?'newClass':'oldClass'" class="sy_title_primary">{{$t('index.ShoYiiCase')}}</text>
				<text style="margin: 0 20rpx;color: #666666;">|</text>
				<text @click="newsMore(1)" :class="NewstabIndex===1?'newClass':'oldClass'" class="sy_title_primary">{{$t('index.ShoYiiGuide')}}</text>
			</view>
			<view @click="newsMore(2)" class="sy_title_primary">
				<text>{{$t('index.Moremenu')}}</text>
			</view>
		</view>
		<view class="newsContent sy_block">
			<view class="items" v-for="(item,index) in newsItems" :key='item.newsId' @click="enterNews(item)" 
			:hover-class="themeType=='dark'?'sy_hover_bg':'hover-bgColor'" >
				<view class="left">
					<view>
						<text class="title sy_title_primary">{{item.title}}</text>
					</view>
					<view class="content sy_content">
						<text>{{item.synopsis}}</text>
					</view>
					<view class="time sy_tip" style="font-size: 20rpx;">
						<text>{{timeStamp(item.newstime)}}</text>
					</view>
				</view>
				<view class="right sy_border">
					<image :src="item.pictureUrl?item.pictureUrl:'/static/image/shoyiilogo.png'" mode="scaleToFill" style="width: 150rpx;height: 150rpx;"></image>
				</view>
			</view>
			<view @click="newsMore(3)" class="btn sy_border_top">
				<text>{{$t('index.Moremenu')}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		emits:['newsMore'],
		props:{
			newsItems:{
				type:Array,
				default:()=>{
					return []
				}
			},
			NewstabIndex:{
				type:Number,
				default:0
			}
		},
		methods:{
			enterNews(data){
				if(data.caseLink){
					// #ifdef APP-PLUS||MP-WEIXIN
					uni.navigateTo({
						url:'/pages/ThreejsShow/ThreejsShow?baseUrl='+encodeURIComponent(data.caseLink),
						animationType:'pop-in'
					})
					// #endif
					// #ifdef H5
					location.href=data.caseLink
					// #endif
				}else{
					uni.navigateTo({
						url:'/pages/news/newsDetail?id='+data.newsId,
						animationType:'pop-in'
					})
				}
			},
			newsMore(index){
				console.log('index',index)
				this.$emit('newsMore',index)
			},
		},
	}
</script>

<style scoped lang="scss">
	.Newstitle{
		display: flex;justify-content: space-between;margin: 50rpx 0 30rpx;
		.newClass{
			font-size: 30rpx;
			font-weight: bold;
		}
		.oldClass{
			font-size: 28rpx;color: #000000;
		}
	}
	.newsContent{
		background-color: #FFFFFF;padding: 15rpx 0;border-radius: 29rpx;
		.items{
			padding:15rpx 18rpx;display: flex;justify-content: space-between;align-items: center;
			.left{
				font-size: 24rpx;color: #8F8F8F;flex: 1;margin-right: 20rpx;
				.title{
					color: #000000;text-overflow: ellipsis;font-size: 28rpx;
					display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;
				}
				.content{
					margin: 20rpx 0;text-overflow: ellipsis;display: -webkit-box;
					-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;
				}
			}
			.right{
				border: 1px solid #F8F8F8;
			}
		}
		.btn{
			height: 60rpx;line-height: 60rpx;text-align: center;color: #8F8F8F;
			border-top: 1px solid #F8F8F8;
		}
	}
</style>
