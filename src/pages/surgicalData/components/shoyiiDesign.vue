<template>
	<view class="" v-if="shoyiiData.length!=0" style="margin: 20rpx 0;padding: 0 30rpx;">
		<view class="title" style="display: flex;justify-content: space-between;align-items: center;margin-bottom: 20rpx;">
			<text class="successTitle sy_title_primary">树蚁设计</text>
			<view class="" @click="switchChange()" style="display: flex;align-items: center;">
				<view class="iconss">
					<uni-icons type="reload" size="16" style="margin-right: 10rpx;" class="sy_title_primary"></uni-icons>
				</view>
				<text style="color: #000000;" class="sy_title_primary">换一批</text>
			</view>
		</view>
		<scroll-view class="otherModel" scroll-x="true">
			<view class="items sy_block" v-for="(item,index) in shoyiiData" :key='index' @click="enterDetail(item.id,item.title)">
				<view class="" style="">
					<u-image width="100%" height="316rpx" :src="item.coverImage?item.coverImage:defaultImg" mode="aspectFit">
					</u-image>
				</view>
				<view class="title sy_title_deep" style="display: flex;align-items: center;">
					<text style="margin-left: 16rpx;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">{{item.title||'无数据'}}</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {getSuccessDetail} from '@/utill/api/surgical/getSurgical.js'
	export default{
		data(){
			return{
				defaultImg:uni.getStorageSync('uploadLogo'),
			}
		},
		props:{
			shoyiiData:{
				type:Array,
				default:()=>{
					return[]
				}
			}
		},
		emits:['shoyiiDesign'],
		methods:{
			// 换一批数据
			switchChange(){
				this.$emit('shoyiiDesign')
			},
			enterDetail(id,title){
				console.log(id)
				//进入树蚁设计
				uni.navigateTo({
					url:'/pages/surgicalData/shoyiiDesign?caseId='+id+'&title='+title
				})
			}
		},
		created() {
			console.log(this.shoyiiData)
		}
	}
</script>s

<style scoped lang="scss">
	.successTitle{
		color: #232323;font-size: 28rpx;font-weight: bold;font-family: PingFang-SC-Bold;
	}
	.otherModel{
		display: flex;
		width: 100%;
		white-space: nowrap;
		margin-top: 20rpx;
		.items{
			width: 40%;
			display: inline-block;
			margin-right:20rpx;
			background-color: #FFFFFF;
			border-radius: 20rpx;
			.title{
				white-space:nowrap;
				overflow:hidden;
				text-overflow:ellipsis;
				padding: 22rpx 0;
				color: #000;
				font-size: 24rpx;
			}
		}
	}
</style>
