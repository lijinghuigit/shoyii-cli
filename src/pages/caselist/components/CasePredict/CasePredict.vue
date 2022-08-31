<template>
	<view class="predict">
		<view style="height: 90rpx;">
			<view class="toptitle sy_block sy_border_bt" @click="ThreeSelect">
				<text></text>
				<text>{{predictData.predictName||'未填写'}}</text>
				<view class="changeSwitch">
					<text class="iconfont iconqiehuan" style="margin-right: 20rpx;"></text>
					<text>切换</text>
				</view>
			</view>
		</view>
		<!-- banner图 -->
		<swiper class="swiperBox" v-if="predictData.casePredictbanner.length!=0" :indicator-dots="true" :autoplay="Imageplay" :interval="3000" :duration="1000" indicator-color="#333333" indicator-active-color="#ffffff" circular="true">
			<swiper-item  @click='PreviewPic(index,predictData.casePredictbanner)' v-for="(item,index) in predictData.casePredictbanner" :key='index'>
				<view class="swiper-item">
						<!-- #ifdef APP-PLUS -->
						<u-lazy-load class='image sy_block' :image="item" img-mode='aspectFit' height='420rpx'></u-lazy-load>
						<!-- #endif -->
						<!-- #ifndef APP-PLUS -->
						<image :src='item' mode="aspectFit" class='sy_block'></image>
						<!-- #endif -->
						<!-- 图片对应的名称 -->
						<view class="matchPic">
							<!-- <text class="iconTip"></text> -->
							<!-- #ifdef APP-PLUS -->
							<view class="matchTitle" v-if="predictData.predictStlId" @click.stop="shareModel">
								<text class='iconfont iconzhuanfa' style="margin-right: 20rpx;"></text>
								<text>转发模型</text>
							</view>
							<!-- #endif -->
						</view>
				</view>
			</swiper-item>	
		</swiper>
		<view class="swiperBox" v-else>
			<view class="swiper-item">
				<image :src='defaultImg' mode="aspectFit" class='sy_block'></image>
				<view class="matchPic">
					<!-- #ifdef APP-PLUS -->
					<view class="matchTitle" v-if="predictData.predictStlId"  @click.stop="shareModel">
						<text>转发模型</text>
					</view>
					<!-- #endif -->
				</view>
			</view>
		</view>
		<!-- 术后随访数据 -->
		<view class="follow sy_block" v-for="(item,index) in predictData.casePredict" :key='index'>
			<view class="title sy_title_primary sy_border_bottom">
				<text>效果预测</text>
				<text>{{index+1}}</text>
			</view>
			<view class="content sy_title_primary">
				<text>{{item.name||'暂无数据'}}</text>
			</view>
		</view>
		<uni-popup id="popupShare" ref="popupShare" type="share">
			<view class="poplist">
				<view class="pop_header">
					<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type='text' activeColor="#86B0D4"></uni-segmented-control>
				</view>
				<view class="content">
					 <view>
						<scroll-view enable-flex scroll-y="true" class="classifyItem">
							<view class="content_item" v-for="(item,index) in predictData.casePredict" :key='index'>
								<text @click="changePic(index,item)" :class="index==boolIndex?'textColor':''">{{item.name||'未填写'}}</text>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import casePredictView from '@/utill/tools/previewImage.js'
	export default{
		data(){
			return{
				Imageplay:true,
				current:0,
				items: ['效果预测'],
				boolIndex:0,//底部选中的index
				defaultImg:uni.getStorageSync('uploadLogo')
			}
		},
		props:{
			predictData:{
				type:Object,
				default:()=>{
					return {}
				}
			}
		},
		emits:['shareModel','predictData'],
		methods:{
			shareModel(){
				this.$emit('shareModel',{modelid:0})
			},
			ThreeSelect(){
				this.$refs.popupShare.open()
			},
			PreviewPic(index,data){
				casePredictView.casePredictView(index,data)
			},
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			},
			// 选中底部menu,切换图片与标题
			changePic(index,item){
				this.boolIndex=index
				console.log(item)
				if(!item.id){
					var predictData=[]
					this.$emit('predictData',{predictData:predictData,name:item.name,predictId:item.id,predictStlId:item.stlModelIds})//改变轮播图父组件的值
					
					return;
				}
				var predictData=[]
				predictData=Object.values(item.stlPictureUrl)
				console.log(predictData)
				this.$emit('predictData',{predictData:predictData,name:item.name,predictId:item.id,predictStlId:item.stlModelIds})//改变轮播图父组件的值
				this.$refs.popupShare.close()
			},
		},
		created() {
			console.log(this.predictData.casePredictbanner)
		}
	}
</script>

<style scoped>
	@import "@/common/css/caseCommon.css";
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
	}
	.content{
		color: #000000;
		font-size: 28rpx;
		padding: 20rpx 0;
		font-family: PingFang-SC-Regular;
	}
	/* #ifndef APP-NVUE */
	.pop_header ::v-deep .segmented-control__item--text{
		border-bottom-width: 0;
	}
	/* #endif */
	
</style>
