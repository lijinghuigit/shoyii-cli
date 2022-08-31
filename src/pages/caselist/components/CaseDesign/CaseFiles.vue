<template>
	<view class="">
		<!-- word,ppt 等文件展示-->
		<view class="introduce sy_block sy_border_bottom" v-if="files.wordPdfIds||files.pptPdfIds">
			<view class="example-body sy_block sy_border_bottom">
				<text>补充文件</text>
			</view>
			<view class="content">
				<view class="tag-view" style="padding: 20rpx 0;" v-if="files.wordPdfIds">
					<uni-tag text="点击预览word" @click="previewword(files.loadLink[files.wordPdfIds].fileDownloadUrl)" />
				</view>
				<view class="tag-view" v-if="files.pptPdfIds">
					<uni-tag  text="点击预览ppt" @click="previewppt(files.loadLink[files.pptPdfIds].fileDownloadUrl)" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import previewFiles from '@/utill/tools/previewFiles.js'
	export default{
		props:{
			files:{
				type:Object,
				default:()=>{
					return{}
				}
			}
		},
		methods:{
			// 预览word
			previewword(url){
				previewFiles(url)
			},
			// 预览ppt
			previewppt(url){
				previewFiles(url)
			},
		}
	}
</script>

<style scoped lang="scss">
	.introduce{
		padding:0 30rpx;
		padding-bottom: 20rpx;
		border-bottom: 1px solid #F0EFEF;
		color: #000000;
		font-size: 28rpx;
		background-color: #FFFFFF;
		margin-top: 20rpx;
		.content{
			line-height: 50rpx;
			padding-top: 10rpx;
		}
	}
	.example-body {
		flex-direction: row;
		flex-wrap: wrap;
		font-size: 28rpx;
		background-color: #ffffff;
		color: #232323;
		font-family: PingFang-SC-Bold;
		font-weight: bold;
		padding: 20rpx 0;
		border-bottom: 1px solid #F0F0F0;
	}
	/* #ifndef APP-NVUE */
	.tag-view ::v-deep .uni-tag--default{
		background: #E9F3FC;
		color: #80AED5!important;
	}
	/* #endif */
	
</style>
