<template>
	<view>
		<view class="docInfor">
			<image lazy-load :src='docInfor.avatarLinks' mode="" @click="enterDocDetail(docInfor.doctorId)"></image>
			<view class="docInfor_content">
				<view class="">
					<text class="docname">{{docInfor.name}}</text>
					<view class="infor">
						<text>{{docInfor.department}}</text>
						<text class="line">|</text>
						<text>{{docInfor.hospital}}</text>
					</view>
				</view>
				<view class="infor">
					<text>{{timeStamp(createTime)}}</text>
				</view>
			</view>
		</view>
		<!-- word,ppt 等文件展示-->
		<view class="introduce" v-if="files">
			<view class="example-body">
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
			createTime:{
				// type:Number,
				// default:null
				// type:String,
				// default:''
			},
			docInfor:{
				type:Object,
				default:()=>{
					return{}
				}
			},
			files:{
				type:Object,
				default:()=>{
					return{}
				}
			}
		},
		methods:{
			enterDocDetail(id){
				console.log(id)
				if(id==this.$store.getters['user/info'].doctorId){//表示医生是自己，进入自己主页
					uni.switchTab({
						url:'/pages/Tabbar/mine'
					})
				}else{//进入别人主页
					console.log('进入别人主页')
					uni.navigateTo({
						url:'/pages/otherDoctor/otherDoctor?doctorId='+id
					})
				}
			},
			// 预览word
			previewword(url){
				previewFiles(url)
			},
			// 预览ppt
			previewppt(url){
				previewFiles(url)
			},
		},
		created() {
			console.log(this.casedocinfor)
		}
	}
</script>

<style scoped lang="scss">
	.docInfor{
		display: flex;
		padding: 30rpx;
		align-items: flex-start;
		border-bottom: 1px solid #F0EFEF;
		background-color: #FFFFFF;
	}
	/* #ifdef MP-WEIXIN */
	.docInfor image{
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		border: 1px solid #F0EFEF;
		margin-right: 23rpx;
	}
	/* #endif */
	.docInfor uni-image{
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		border: 1px solid #F0EFEF;
		margin-right: 23rpx;
	}
	.docInfor .docname{
		font-size: 28rpx;
		color: #000000;
	}
	.docInfor_content{
		flex: 1;display: flex;justify-content: space-between;
	}
	.infor .line{
		margin: 0 10rpx;
	}
	.docInfor .infor{
		font-size: 24rpx;
		line-height: 70rpx;
		color: #8F8F8F;
	}
	
</style>
