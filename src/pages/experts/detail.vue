<template>
	<view class="">
		<view class="item">
			<u-image @click="preview(0,infor.previewImage[infor.avatar])" width="150" height="156rpx" class="image" :src="infor.avatar?infor.previewImage[infor.avatar]:'/static/image/shoyiilogo.png'"></u-image>
			<view class="content">
				<text class="name">{{infor.name}}</text>
				<view class="infor">
					<text>{{infor.diseaseCategoryName}}</text>
					<text style="margin: 0 8rpx;color: #8F8F8F;">|</text>
					<text>{{infor.position}}</text>
				</view>
				<text class="introduce">{{infor.hospital}}</text>
			</view>
		</view>
		<view class="detail">
			<text class="title">专家介绍：</text>
			<scroll-view scroll-x="true" class="scroll-X">
				<view class="" v-if="infor.picture&&infor.picture.split(',').length>0">
					<view v-for="(item,index) in infor.picture.split(',')" :key='index' class="pic" @click="preview(index,infor.previewImage[item])">
						<u-image width="160" height="160rpx" class="image" :src="infor.picture?infor.previewImage[item]:'/static/image/shoyiilogo.png'"></u-image>
					</view>
				</view>
			</scroll-view>
			<text class="introduce">{{infor.introduce}}</text>
		</view>
	</view>
</template>

<script>
	import {expertsinfor} from '@/utill/api/experts'
	import preview from '@/utill/tools/previewImage.js'
	export default{
		data(){
			return {
				infor:{}
			}
		},
		methods:{
			expertsinfor(id){
				expertsinfor({
					id
				}).then(({data})=>{
					console.log(data)
					if(data.code==0){
						this.infor=data.object
						uni.setNavigationBarTitle({
							title:`${data.object.name}详情 `
						})
					}else{
						uni.showToast({
							title:data.msg,
							icon:'none',
						})
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			preview(index,data){
				preview.preview(index,data)
			}
		},
		onLoad(options) {
			this.expertsinfor(options.id)
		}
	}
</script>

<style scoped lang="scss">
	.item{
		margin-top: 30rpx;
		background-color: #FFFFFF;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		padding:30rpx 50rpx;
		.image{
			border: 1px solid #F8F8F8;
		}
		.content{
			flex: 1;
			margin-left: 20rpx;
			color: #000000;
			font-size: 24rpx;
			font-weight: bold;
			font-family: SourceHanSansCN-Regular;
			.name{
				font-size: 28rpx;
			}
			.infor{
				display: flex;
				align-items: center;
				margin: 30rpx 0;
				color: #8F8F8F;
				font-weight:400;
			}
			.introduce{
				color: #8F8F8F;
				font-weight:400;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
				word-wrap: break-word;
				word-break: break-all;
			}
		}
	}
	.detail{
		background-color: #FFFFFF;
		padding: 20rpx 30rpx;
		margin-top: 20rpx;
		font-size: 24rpx;
		.title{
			color: #333333;
		}
		.scroll-X{
			white-space: nowrap;width: 100%;
			margin: 20rpx 0;
			.pic{
				margin-right: 20rpx;
				display: inline-block;
			}
		}
		.introduce{
			color: #000000;
			font-weight: bold;
			word-wrap: break-word;
			word-break: break-all;
		}
		
	}
</style>
