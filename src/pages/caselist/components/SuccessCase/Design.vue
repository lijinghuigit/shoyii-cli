<template>
	<view class="successDesign">
		<view style="height: 90rpx;">
			<view class="toptitle" @click="ThreeSelect">
				<text></text>
				<text v-if="designData.title">{{designData.title||'未填写'}}</text>
				<view class="changeSwitch">
					<text class="iconfont iconqiehuan" style="margin-right: 20rpx;"></text>
					<text>切换</text>
				</view>
			</view>
		</view>
		<swiper class="swiperBox" v-if="designData.previewUrl" :indicator-dots="true" :autoplay="Imageplay" :interval="3000" :duration="1000" indicator-color="#333333" indicator-active-color="#ffffff" circular="true">
			<swiper-item  @click='PreviewPic(designData.previewUrl)' v-for="(item,index) in designData.previewUrl" :key='index'>
				<view class="swiper-item">
					<image lazy-load :src='item' mode="aspectFit"></image>
					<!-- 图片对应的名称 -->
					<view class="matchPic">
						<!-- #ifdef APP-PLUS -->
					<!-- 	<view class="matchTitle" v-if="designData.id" @click.stop="shareModel">
							<text class='iconfont iconzhuanfa' style="margin-right: 20rpx;"></text>
							<text>转发模型</text>
						</view> -->
						<!-- #endif -->
					</view>
				</view>
			</swiper-item>	
		</swiper>
		<swiper class="swiperBox" v-else :indicator-dots="true" :autoplay="Imageplay" :interval="3000" :duration="1000" indicator-color="#333333" indicator-active-color="#ffffff" circular="true">
			<swiper-item>
				<view class="swiper-item">
					<movable-area class="movable">
						<image lazy-load :src='defaultImg' mode="aspectFit"></image>
						<!-- 图片对应的名称 -->
						<movable-view direction="all" class="matchPic">
							<!-- <text class="iconTip"></text> -->
							<!-- #ifdef APP-PLUS -->
							<!-- <view class="matchTitle" v-if="designData.id"  @click.stop="shareModel">
								<text>转发模型</text>
							</view> -->
							<!-- #endif -->
						</movable-view>
					</movable-area>
				</view>
			</swiper-item>	
		</swiper>
		<!-- 手术设计的popup -->
		<view class="popUpBox">
			<uni-popup id="popupShare" ref="popupShare" type="share">
				<view class="poplist">
					<view class="pop_header">
						<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type='text' activeColor="#86B0D4"></uni-segmented-control>
					</view>
					<view class="content">
						 <view v-if="current === 0">
							<scroll-view enable-flex scroll-y="true" class="classifyItem">
								<view class="content_item" v-for="(item,index) in matchData" :key='index'>
									<text @click="changePic(item,item.id)" :class="item.id==boolIndex?'textColor':''">{{item.title}}</text>
								</view>
							</scroll-view>
						</view>
						<view v-if="current === 1">
							<scroll-view enable-flex scroll-y="true" class="classifyItem">
								<view class="content_item" v-for="(item,index) in guideData" :key='index'>
									<text @click="changePic(item,item.id)" :class="item.id==boolIndex?'textColor':''">{{item.title}}</text>
								</view>
							</scroll-view>
						</view>
						<view v-if="current === 2">
							<scroll-view enable-flex scroll-y="true" class="classifyItem">
								<view class="content_item" v-for="(item,index) in instrumentData" :key='index'>
									<text @click="changePic(item,item.id)" :class="item.id==boolIndex?'textColor':''">{{item.title}}</text>
								</view>
							</scroll-view>
						</view>
						<view v-if="current === 3">
							<scroll-view enable-flex scroll-y="true" class="classifyItem">
								<view class="content_item" v-for="(item,index) in inplantData" :key='index'>
									<text @click="changePic(item,item.id)" :class="item.id==boolIndex?'textColor':''">{{item.title}}</text>
								</view>
							</scroll-view>
						</view>
					</view>
				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				Imageplay:true,
				boolIndex:0,//底部选中的index
				current:0,
				items: ['匹配情况','导板','器械','植入体'],
				defaultImg:uni.getStorageSync('uploadLogo')
			}
		},
		props:{
			matchData:{
				type:Array,
				default:()=>{
					return[]
				}
			},
			guideData:{
				type:Array,
				default:()=>{
					return[]
				}
			},
			instrumentData:{
				type:Array,
				default:()=>{
					return[]
				}
			},
			inplantData:{
				type:Array,
				default:()=>{
					return[]
				}
			},
			designData:{
				type:Object,
				default:()=>{
					return{}
				}
			},	
		},
		emits:['successdesign'],
		methods:{
			ThreeSelect(){
				this.$refs.popupShare.open()
			},
			onClickItem(e){
				this.current=e.currentIndex
			},
			// 点击title,更换图片
			changePic(item,id){
				console.log(item)
				console.log(id)
				this.boolIndex=id
				this.changeemit(item)
			},
			changeemit(item,count){
				console.log(item)
				this.$refs.popupShare.close()
				this.$emit('successdesign',{designData:item})//替换轮播图
			},
			PreviewPic(data){
				console.log(data)
			},
		}
	}
</script>

<style scoped lang="scss">
	@import "@/common/css/caseCommon.css";
	/* #ifndef APP-NVUE */
	.pop_header ::v-deep .segmented-control__item--text{
		border-bottom-width: 0;
	}
	/* #endif */
	
</style>
