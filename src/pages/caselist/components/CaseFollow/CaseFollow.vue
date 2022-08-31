<template>
	<view class="">
		<!-- 医生信息 -->
		<view class="sy_block" v-if="casefollow.length!=0">
			<view class="follow sy_block" v-for="(item,index) in casefollow" :key='item.followUpId'>
				<view class="title sy_border_bottom">
					<view class="sy_title_deep">
						<text>术后随访记录</text>
						<text>{{index+1}}</text>
					</view>
					<view class="sy_title_primary" style="text-align: right;color: #8f8f8f;font-weight: 100;">
						<text>{{changeDate(item.addTime)}}</text>
					</view>
				</view>
				<view class="content sy_title_primary">
					<view class="">
						<text v-if="item.content">{{item.content}}</text>
					</view>
					<rich-text v-if="item.followUpText" :nodes="item.followUpText" selectable='true'></rich-text>
					<view class="" v-if="item.pictureModelIds&&item.pictureModelIds.split(',').length>0">
						<image v-for="(s_item,s_index) in item.pictureModelIds.split(',')" :key="s_item"
						:src="item.previewMap[s_item].fileDownloadUrl" mode="aspectFill" class="follow_image"></image>
					</view>
					<view class="video" v-if="item.videoModelIds&&item.videoModelIds.split(',').length>0">
						<!-- #ifndef APP-PLUS -->
						<video v-for="(s_item,s_index) in item.videoModelIds.split(',')" :key="s_item"
						:src="item.previewMap[s_item].fileDownloadUrl" show-mute-btn="true" controls poster='' 
						muted="true" danmu-btn="true" enable-danmu="true" page-gesture="true">
						</video>
						<!-- #endif -->
						<!-- #ifdef APP-PLUS -->
						<view class="videoTags">
							<u-tag v-for="(s_item,s_index) in item.videoModelIds.split(',')" :key="s_item"
							 :text="item.previewMap[s_item].name" type="success" 
							 @click="videoPlay(item.previewMap[s_item].fileDownloadUrl)" 
							 class='tag'/>
						</view>
						<!-- #endif -->
					</view>
				</view>
			</view>
		</view>
		<view class="noData sy_block" v-else>
			<text>未上传数据</text>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			casefollow:{
				type:Array,
				default:()=>{
					return[]
				}
			}
		},
		data(){
			return {
				subvideoNVue:{}
			}
		},
		methods:{
			videoPlay(url){
				// 通过 id 获取 nvue 子窗体
				this.subvideoNVue = uni.getSubNVueById('video')
				// 打开 nvue 子窗体  
				this.subvideoNVue.show('zoom-out', 300, function(){  
				    // 打开后进行一些操作...  
				    uni.$emit('video-popup', {  
				        url: url
				    }); 
				}); 
			}
		},
		mounted() {
			// console.log(this.casefollow)
			// uni.$on('video-popupClose',data=>{
			// 	// 关闭 nvue 子窗体  
			// 	this.subvideoNVue.hide('fade-out', 300)
			// })
		},
		destroyed() {
			uni.$off('video-popup')
		}
	}
</script>

<style scoped>
	.follow{
		margin-top: 20rpx;
		background-color: #FFFFFF;
		padding: 0 30rpx;
		
	}
	.title{
		color: #242424;
		font-size: 28rpx;
		font-weight: Bold;
		font-family: PingFang-SC-Bold;
		padding: 20rpx 0;
		border-bottom: 1px solid #F0F0F0;
		display: flex;justify-content: space-between;align-items: center;
	}
	.content{
		color: #000000;
		font-size: 28rpx;
		padding: 20rpx 0;
		font-family: PingFang-SC-Regular;
	}
	.follow_image{
		width: 190rpx;
		height: 190rpx;
		background-color: #FFFFFF;
		margin: 10rpx;
		border: 1px solid #eee;
	}
	.video{
		text-align: center;
		margin-top: 20rpx;
		width: 100%;
	}
	.noData{
		background-color: #FFFFFF;
		padding: 20rpx 30rpx;
		margin-top: 20rpx;
	}
	.videoTags{
		text-align: left;
	}
	.tag{
		margin:10rpx 20rpx;
	}
</style>
