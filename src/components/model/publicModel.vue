<template>
	<view class="sy_block">
		<view class="" style="position: relative;">
			<swiper v-if="modelData.previewImage&&Object.keys(modelData.previewImage).length!=0" :indicator-dots="true" :autoplay="Imageplay" 
			:interval="3000" :duration="1000" indicator-color="#333333" indicator-active-color="#ffffff" circular="true">
				<swiper-item v-for="(item,index) in modelData.previewImage" :key='index'>
					<view class="swiper-item" @tap='PreviewPic(modelData.previewImage,index)'>
						<!-- #ifdef APP-PLUS -->
						<u-lazy-load class='image sy_block' :image="item" img-mode='aspectFit' height='420rpx'></u-lazy-load>
						<!-- #endif -->
						<!-- #ifndef APP-PLUS -->
						<image lazy-load class='image sy_block' :src='item' mode="aspectFit"></image>
						<!-- #endif -->
					</view>
				</swiper-item>	
			</swiper>
			<view v-else>
				<view class="swiper-item">
					<image lazy-load class="image sy_block" :src='src' mode="aspectFit"></image>
				</view>
			</view>
			<!-- 只有app端转发 -->
			<!-- #ifdef APP-PLUS -->
			<view class="matchTitle" v-if="modelData.fileModelId" @tap.stop="shareModel" style="">
				<text class='iconfont iconzhuanfa' style="margin-right: 20rpx;"></text>
				<text>转发模型</text>
			</view>
			<!-- #endif -->
		</view>
		<view class="docInfor sy_block sy_border_bottom">
			<u-image width="100rpx" height="100rpx" style="margin-right: 23rpx;" shape="circle" :src="modelData.avatarLinks" @click="enterDocDetail(modelData.ownId)">
				<template v-slot:error>
					<view style="font-size: 24rpx;">err</view>
				</template>
				<template v-slot:loading>
					<uni-icons type="spinner-cycle"></uni-icons>
				</template>
			</u-image>
			<view class="docInfor_content" style="">
				<view style="display: flex;justify-content: space-between;">
					<text class="docname sy_title_deep">{{modelData.ownerName||'无数据'}}</text>
					<view class="infor">
						<text>{{timeStamp(modelData.createTime)}}</text>
					</view>
				</view>
				<view class="infor">
					<text class="">{{modelData.departmentName||'无数据'}}</text>
					<text class="line">|</text>
					<text>{{modelData.ownerUnit||'无数据'}}</text>
				</view>
			</view>
		</view>
		<view class="introduce sy_block">
			<view class="title sy_title_deep sy_border_bottom">
				<text>模型介绍</text>
			</view>
			<view class="content">
				<u-read-more :toggle="true" :show-height="200" text-indent ='0' color='#86B0D4' ref="uReadMore">
					<!-- #ifdef MP-WEIXIN -->
					<text class="sy_title_primary">{{modelData.description}}</text>
					<!-- #endif -->
					<!-- #ifndef MP-WEIXIN -->
					<!-- <u-parse :html="modelData.description" @load="parseLoaded"></u-parse> -->
					<text class="sy_title_primary" v-html="modelData.description" decode></text>
					<!-- #endif -->
				</u-read-more>
			</view>
		</view>
	</view>
</template>

<script>
	import previewImage from '@/utill/tools/previewImage.js'
	export default{
		data(){
			return{
				Imageplay:true,
				src:uni.getStorageSync('uploadLogo'),
				customStyle:{
					backgroundColor:'#000000',
					color:'#fff',
					border:'none'
				}
			}
		},
		props:{
			modelData:{
				type:Object,
				default:()=>{
					return {}
				}
			}
		},
		emits:['shareModel'],
		methods:{
			shareModel(){
				// console.log('分享3js')
				this.$emit('shareModel',{modelid:0})
			},
			parseLoaded() {
				this.$refs.uReadMore.init();
			},
			PreviewPic(item,index){
				previewImage.previewImage(index,item)
			},
			enterDocDetail(id){
				// #ifndef H5
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
				// #endif
			}
		},
	}
</script>

<style scoped lang="scss">
	.swiper-item .image{
		width: 100%;
		height: 420rpx;
		background: #FFFFFF;
	}
	/* #ifdef MP-WEIXIN */
	swiper{
		height: 420rpx!important;
	}
	/* #endif */
	uni-swiper{
		height: 420rpx!important;
	}
	.docInfor{
		display: flex;
		padding: 30rpx;
		align-items: center;
		border-bottom: 1px solid #F0EFEF;
		background-color: #FFFFFF;
		.docInfor_content{
			flex: 1;display: flex;flex-direction: column;justify-content: space-between;
		}
		.docname{
			font-size: 28rpx;
			color: #000000;
		}
		.infor{
			font-size: 24rpx;
			line-height: 40rpx;
			color: #8F8F8F;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
			word-wrap: break-word;
			word-break: break-all;
			.line{
				margin: 0 10rpx;
			}
		}
	}
	.introduce{
		font-size: 28rpx;
		background-color: #FFFFFF;
		padding: 0 30rpx;
		margin-top: 20rpx;
		.title{
			color: #232323;
			font-family: PingFang-SC-Bold;
			font-weight: bold;
			padding: 20rpx 0;
			border-bottom: 1px solid #EEEEEE;
		}
		.content{
			padding: 26rpx 0;
			color: #000000;
		}
	}
	/* 移动框 */
	.matchPic{
		position: relative;
		display: flex;
		align-items: center;
	}
	 .matchTitle{
		position: absolute;right: 20rpx;bottom: 20rpx;
		padding: 13rpx 21rpx;
		background: #000000;
		color: #FFFFFF;
		border-radius: 24rpx;
		text-align: center;
		line-height: 50rpx;
		opacity: .5;
	}
	.matchPic .iconTip{
		display: block;
		width: 14rpx;
		height: 14rpx;
		border: 4rpx solid #000000;
		border-radius: 50%;
		background: #FFFFFF;
		margin-right: 14rpx;
	}
</style>
