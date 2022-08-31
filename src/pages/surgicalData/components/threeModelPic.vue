<template>
	<view class="sy_main">
		<view style="height: 90rpx;">
			<view class="toptitle sy_block sy_border_none" @click="ThreeSelect">
				<text></text>
				<text>{{titleName||'未填写'}}</text>
				<view class="changeSwitch">
					<text class="iconfont iconqiehuan" style="margin-right: 20rpx;"></text>
					<text>切换</text>
				</view>
			</view>
		</view>
		<swiper v-if="bannerList.length!=0" :indicator-dots="true" :autoplay="Imageplay" :interval="3000" 
		:duration="1000" indicator-color="#333333" indicator-active-color="#ffffff" circular="true">
			<swiper-item @click='PreviewPic(index,bannerList)' v-for="(item,index) in bannerList" :key='index'>
				<view class="swiper-item sy_block">
					<movable-area class="movable">
						<!-- #ifdef APP-PLUS -->
						<u-lazy-load class='image sy_block' :image="item" img-mode='aspectFit' height='420rpx'></u-lazy-load>
						<!-- #endif -->
						<!-- #ifndef APP-PLUS -->
						<image lazy-load class='image sy_block' :src='item' mode="aspectFit"></image>
						<!-- #endif -->
					</movable-area>
				</view>
			</swiper-item>	
		</swiper>
		<view v-else>
			<view class="swiper-item">
				<image lazy-load :src='defaultImg' mode="aspectFit" class="sy_block"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import methodsPreview from '@/utill/tools/previewImage.js'
	export default{
		data(){
			return{
				Imageplay:true,//轮播图是否自动切换,true自动切换
				defaultImg:uni.getStorageSync('uploadLogo')
			}
		},
		props:{
			titleName:{
				type:String,
				default:""
			},
			arrData:{
				type:Object,
				default:()=>{
					return{}
				}
			},
			bannerList:{
				type:Array,
				default:()=>{
					return[]
				}
			}
		},
		emits:['threeSelect'],
		methods:{
			// 预览图片
			PreviewPic(index,data){
				methodsPreview.methodsPreview(index,data)
			},
			// 三维图形选择
			ThreeSelect(){
				this.$emit('threeSelect')
			}
		},
	}
</script>

<style scoped>
	@import "@/common/css/caseCommon.css";
	/* #ifdef MP-WEIXIN */
	swiper{
		height: 420rpx!important;
	}
	/* #endif */
</style>
