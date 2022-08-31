<template>
	<view class="" v-if="successData.length!=0" style="margin: 20rpx 0;padding: 0 30rpx;">
		<text class="successTitle sy_title_primary">成功案例</text>
		<scroll-view class="otherModel" scroll-x="true">
			<view class="items" v-for="(item,index) in successData" :key='index' @click="enterDetail(item.caseId)">
				<view class="" style="border: 1px solid #EEEEEE;">
					<u-image v-if="item.electronicPreviewUrl" width="100%" height="316rpx" :src="item.electronicPreviewUrl" mode="aspectFit">
					</u-image>
					<u-image v-else width="100%" height="316rpx" :src="defaultImg" mode="aspectFit">
					</u-image>
				</view>
				<view class="title sy_title_deep" style="display: flex;align-items: center;">
					<u-image v-if="item.doctorHeadPortrait" width="36rpx" height="36rpx" :src="item.doctorHeadPortrait" mode="aspectFit">
					</u-image>
					<u-image v-else :src="defaultImg" mode="aspectFit" width='36rpx' height='36rpx'>
					</u-image>
					<text style="margin-left: 16rpx;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">{{item.doctorName||'无数据'}}</text>
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
				defaultImg:uni.getStorageSync('uploadLogo')
			}
		},
		props:{
			successData:{
				type:Array,
				default:()=>{
					return[]
				}
			}
		},
		methods:{
			enterDetail(id){
				console.log(id)
				uni.navigateTo({
					url:'/pages/caselist/successCaseDetail?caseId='+id
				})
				
			}
		},
		
	}
</script>

<style scoped lang="scss">
	.successTitle{
		color: #232323;font-size: 28rpx;font-weight: bold;font-family: PingFang-SC-Bold;margin-bottom: 20rpx;
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
