<template>
	<view class="">
		<!-- 手术设计介绍 -->
		<view class="introduce sy_block sy_border_bottom" v-if="arrData.diseaseCategoryName||arrData.materials||arrData.title">
			<view class="example-body sy_border_bottom sy_block">
				<text>手术设计介绍</text>
			</view>
			<view class="content">
				<view class="text1" v-if="arrData.diseaseCategoryName">
					<text>病种类别：</text>
					<text v-if="arrData.diseaseCategoryName">{{arrData.diseaseCategoryName}}</text>
					<text v-else>暂无数据</text>
				</view>
				<view class="text1" v-if="arrData.materials">
					<text>材料应用：</text>
					<text v-if="arrData.materials">{{arrData.materials.name}}</text>
					<text v-else>暂无数据</text>
				</view>
				<view class="text1" v-if="arrData.title">
					<text>方法说明：</text>
					<text v-if="arrData.title">{{arrData.title}}</text>
					<text v-else>暂无数据</text>
				</view>
			</view>
		</view>
		<!--  数字化3D打印导板-->
		<view class="introduce sy_block sy_border_bottom" v-if="guideEmpty">
			<view class="example-body sy_border_bottom sy_block">
				<text>数字化3D打印导板</text>
			</view>
			<view class="content">
				<view v-for="(item,index) in arrData.threeDGuideList" :key='index'>
					<view class="title">
						<view class="indexDot"></view>
						<view class="number sy_title_primary" v-if="item.name">
							<text>{{item.name}}</text>
						</view>
					</view>
					<view class="sy_title_primary" v-if="item.detailedDescription">
						<text>描述：</text>
						<text>{{item.detailedDescription}}</text>
					</view>
					<view class="imgpic" v-if="item.stlPicture">
						<u-lazy-load class="imgitems" v-for="(itemImage,index1) in item.previewImage" :key='index1' :image="itemImage" @tap="PreviewPic(index1,item.previewImage)" height="210rpx" img-mode="aspectFit">
							
						</u-lazy-load>
					</view>
				</view>
			</view>
		</view>
		<!-- 数字化3d打印器械 -->
		<view class="introduce sy_block sy_border_bottom" v-if="instruEmpty">
			<view class="example-body sy_border_bottom sy_block">
				<text>数字化3D打印器械</text>
			</view>
			<view class="content">
				<view v-for="(item,index) in arrData.threeDInstrumentList" :key='index'>
					<view class="title">
						<view class="indexDot"></view>
						<view class="number sy_title_primary" v-if="item.name">
							<text>{{item.name}}</text>
						</view>
					</view>
					<view class="sy_title_primary" v-if="item.detailedDescription">
						<text>描述：</text>
						<text>{{item.detailedDescription}}</text>
					</view>
					<view class="imgpic" v-if="item.stlPicture">
						<u-lazy-load class="imgitems" v-for="(itemImage,index1) in item.previewImage" :key='index1' :image="itemImage" @tap="PreviewPic(index1,item.previewImage)" style="width: 210rpx;padding-bottom: 30rpx;background-color: #FFFFFF;" height="210rpx" img-mode="aspectFit">
							
						</u-lazy-load>
					</view>
				</view>
			</view>
		</view>
		<!-- 手术方法步骤 -->
		<view class="introduce sy_block sy_border_bottom" v-if="surgicalStepsEmpty">
			<view class="example-body sy_border_bottom sy_block">
				<text>手术方法步骤</text>
			</view>
			<view class="content">
				<view v-for="(item,index) in arrData.surgicalDesignStepsList" :key='index'>
					<view class="title">
						<view class="indexDot"></view>
						<view class="number sy_title_primary" v-if="item.name">
							<text>{{item.name}}</text>
						</view>
					</view>
					<view class="sy_title_primary" v-if="item.detailedDescription">
						<text>描述：</text>
						<text>{{item.detailedDescription}}</text>
					</view>
					<view class="imgpic" v-if="item.stlPicture">
						<u-lazy-load class="imgitems" v-for="(itemImage,index1) in item.previewImage" :key='index1' :image="itemImage" @tap="PreviewPic(index1,item.previewImage)" style="width: 210rpx;padding-bottom: 30rpx;background-color: #FFFFFF;" height="210rpx" img-mode="aspectFit">
							
						</u-lazy-load>
					</view>
				</view>
			</view>
		</view>
		<!-- 术前情况 -->
		<view class="introduce sy_block sy_border_bottom" v-if="preOperateEmpty">
			<view class="example-body sy_border_bottom sy_block">
				<text>术前情况</text>
			</view>
			<view class="content">
				<view v-for="(item,index) in arrData.preoperativeConditionList" :key='index'>
					<view class="title">
						<view class="indexDot"></view>
						<view class="number sy_title_primary" v-if="item.name">
							<text>{{item.name}}</text>
						</view>
					</view>
					<view class="sy_title_primary" v-if="item.detailedDescription">
						<text>描述：</text>
						<text>{{item.detailedDescription}}</text>
					</view>
					<view class="imgpic" v-if="item.stlPicture">
						<u-lazy-load class="imgitems" v-for="(itemImage,index1) in item.previewImage" :key='index1' :image="itemImage" @tap="PreviewPic(index1,item.previewImage)" style="width: 210rpx;padding-bottom: 30rpx;background-color: #FFFFFF;" height="210rpx" img-mode="aspectFit">
							
						</u-lazy-load>
						<!-- <view class="imgitems" v-for="(itemImage,index1) in item.previewImage" :key='index1'>
							<u-image height="100%" :src="itemImage" mode="aspectFit" @tap="PreviewPic(index1,item.previewImage)">
								<uni-icons type="spinner-cycle" slot="loading"></uni-icons>
								<view slot="error" style="font-size: 24rpx;">加载失败</view>
							</u-image>
						</view> -->
					</view>
				</view>
			</view>
		</view>
		<!-- 术后情况 -->
		<view class="introduce sy_block sy_border_bottom" v-if="beforeOperateEmpty">
			<view class="example-body sy_border_bottom sy_block">
				<text>术后情况</text>
			</view>
			<view class="content">
				<view v-for="(item,index) in arrData.postoperativeSituationList" :key='index'>
					<view class="title">
						<view class="indexDot"></view>
						<view class="number sy_title_primary" v-if="item.name">
							<text>{{item.name}}</text>
						</view>
					</view>
					<view class="sy_title_primary" v-if="item.detailedDescription">
						<text>描述：</text>
						<text>{{item.detailedDescription}}</text>
					</view>
					<view class="imgpic" v-if="item.stlPicture">
						<u-lazy-load class="imgitems" v-for="(itemImage,index1) in item.previewImage" :key='index1' :image="itemImage" @tap="PreviewPic(index1,item.previewImage)" style="width: 210rpx;padding-bottom: 30rpx;background-color: #FFFFFF;" height="210rpx" img-mode="aspectFit">
							
						</u-lazy-load>
					</view>
				</view>
			</view>
		</view>
		<!-- word -->
		<view class="introduce sy_block sy_border_bottom" v-if="arrData.wordPdfIds||arrData.pptPdfIds">
			<view class="example-body sy_border_bottom sy_block">
				<text>补充文件</text>
			</view>
			<view class="content">
				<view class="tag-view" style="padding: 20rpx 0;" v-if="arrData.wordPdfIds">
					<uni-tag text="点击预览word" @tap="previewword(arrData.loadLink[arrData.wordPdfIds].fileDownloadUrl)" />
				</view>
				<view class="tag-view" v-if="arrData.pptPdfIds">
					<uni-tag  text="点击预览ppt" @tap="previewppt(arrData.loadLink[arrData.pptPdfIds].fileDownloadUrl)" />
				</view>
			</view>
		</view>
		<!-- 视频描述 -->
		<view class="introduce sy_block sy_border_bottom" v-if="arrData.videoModelIds&&arrData.videoModelIds.split(',').length>0">
			<view class="example-body sy_border_bottom sy_block">
				<text>视频描述</text>
			</view>
			<view class="content" style="text-align: center;">	
				 <!-- #ifdef APP-PLUS -->
				 <view class="" style="text-align: left;">
				 	<u-tag v-for="(s_item,s_index) in arrData.videoModelIds.split(',')" :key="s_item"
				 	 :text="arrData.loadLink[s_item].name" type="success" 
				 	 @click="videoPlay(arrData.loadLink[s_item].fileDownloadUrl)" 
				 	 class='tag'/>
				 </view>
				 <!-- #endif -->
				 <!-- #ifndef APP-PLUS -->
				<video style="width: 100%;" v-for="(s_item,s_index) in arrData.videoModelIds.split(',')"
				:key='s_item'
				:src="(arrData.loadLink[s_item]).fileDownloadUrl"
				 show-mute-btn="true" controls poster='' muted="true" danmu-btn="true" 
				 enable-danmu="true" page-gesture="true"></video>
				 <!-- #endif -->
			</view>
		</view>
	</view>
</template>

<script>
	import previewFiles from '@/utill/tools/previewFiles.js'
	import previewImage from '@/utill/tools/previewImage.js'
	export default{
		props:{
			arrData:{
				type:Object,
				default:()=>{
					return{}
				}
			}
		},
		computed:{
			// 导板无数据，则不显示
			guideEmpty(){
				return this.filterData(this.arrData.threeDGuideList)
			},
			// 器械
			instruEmpty(){
				return this.filterData(this.arrData.threeDInstrumentList)
			},
			// 手术方法步骤
			surgicalStepsEmpty(){
				return this.filterData(this.arrData.surgicalDesignStepsList)
			},
			// 术前情况
			preOperateEmpty(){
				return this.filterData(this.arrData.preoperativeConditionList)
			},
			// 术后情况
			beforeOperateEmpty(){
				return this.filterData(this.arrData.postoperativeSituationList)
			},
		},
		methods:{
			videoPlay(url){
				let subvideoNVue = uni.getSubNVueById('video')
				subvideoNVue.show('zoom-out', 300, function(){  
				    uni.$emit('video-popup', {  
				        url: url
				    }); 
				}); 
			},
			filterData(data){
				if(data){
					if(data[0].stlPicture.indexOf(",")==-1){
						if(data[0].stlPicture){//有可能是空字符串
							if(JSON.parse(data[0].stlPicture).length!=0||data[0].name){
								return true
							}else{
								return false
							}
						}else{
							return false
						}
						
					}else{
						return true
					}
				}else{
					return false
				}
			},
			// 预览图片
			PreviewPic(index,data){
				console.log(index)
				console.log(data)
				previewImage.previewImage(index,data)
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
			console.log(this.arrData)
		},
		destroyed() {
			uni.$off('video-popup')
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
			.title{
				display: flex;
				align-items: center;
				.indexDot{
					margin-right: 20rpx;
					width: 16rpx;
					height: 16rpx;
					background: #86B0D4;
					border-radius: 50%;
				}
				.number{
					color: #000000;font-size: 28rpx;
				}
			}
			.imgpic{
				display: flex;
				justify-content: flex-start;
				align-items: center;
				flex-wrap: wrap;
				.imgitems{
					width: 210rpx;background-color: #FFFFFF;
					margin: 10rpx 10rpx;
					padding-bottom: 0px!important;
					border: 1px solid #EEEEEE;
				}  
			}
			/* #ifdef MP-WEIXIN */
			.imgitems ::v-deep image{
				background-color: #FFFFFF!important;
			}
			/* #endif */	
		}
		.text1 uni-text:nth-child(1){
			color: #8F8F8F;
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
