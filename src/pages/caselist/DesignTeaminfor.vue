<template>
	<view class="">
		<!-- 团队信息 -->
		<view class="Teaminfor">
			<view class="left">
				<view class="title" style="line-height: 58rpx;">
					<text>{{Infor.deptName}}</text>
				</view>
				<view class="item1" style="">
					<text class="label">联系电话：</text>
					<text class="content">{{Infor.leaderPhone||'未填写'}}</text>
				</view>
				<view class="item1" style="">
					<text class="label">所属单位：</text>
					<text class="content">{{Infor.companyName||'未填写'}}</text>
				</view>
				<view class="item1" style="">
					<text class="label">单位地址：</text>
					<text class="content">{{Infor.companyAddress||'未填写'}}</text>
				</view>
			</view>
			<view class="right">
				<image class="image" :src="Infor.deptLogoPicUrl?Infor.deptLogoPicUrl:'/static/image/shoyiilogo.png'" mode="aspectFit"></image>
			</view>
		</view>
		<view class="TeamImage" v-if="Infor.deptUploadPicsUrl">
			<scroll-view enable-flex scroll-x="true" class="scroll-X" v-if="Object.values(Infor.deptUploadPicsUrl).length>0">
				<view v-for="(item,index) in Infor.deptUploadPicsUrl" :key='item' class="items">
					<image :src="item?item:'/static/image/shoyiilogo.png'" mode="aspectFit" class="image"></image>
				</view>
			</scroll-view>
		</view>
		<view class="introduce" v-if="Infor.companyIntroduction">
			<text>简介</text>
			<u-read-more :toggle="true" show-height="200" color='#69CDFF'>
				<view class="detail">
					<text>{{Infor.companyIntroduction}}</text>
				</view>
			</u-read-more>
		</view>
		<view class="surgical">
			<view class="title">
				<text>方法库</text>
			</view>
			<scroll-view enable-flex scroll-x="true" class="scroll-X">
				<view v-for="(item,index) in surgical" :key='item.surgicalPlanId' class="items" @click="enterSurgical(item.surgicalPlanId)">
					<view class="">
						<image :src="item.previewList.length>0&&item.previewList[0].fileDownloadUrl?item.previewList[0].fileDownloadUrl:'/static/image/shoyiilogo.png'" mode="aspectFit" class="image"></image>
					</view>
					<view class="detail">
						<text class="line">{{item.surgicalPlanName||'未填写'}}</text>
						<view class="line content">
							<text>{{item.title||'未填写'}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="video" v-if="Infor.deptUploadVideoUrl">
			<view class="items" v-for="(item,index) in Infor.deptUploadVideoUrl" :key='item'>
				<video :src="item" controls :muted='true'></video>
			</view>
		</view>
	</view>
</template>

<script>
	import {getTeamInfor} from './api/help.js'
	import {getSurgical} from '@/utill/api/surgical/getSurgical.js' 
	export default{
		data(){
			return{
				Infor:{},
				surgical:[],//方法库数据
			}
		},
		methods:{
			getTeamInfor(id){
				console.log(id)
				getTeamInfor({
					id
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						this.Infor=res.data.object
						uni.setNavigationBarTitle({
							title:res.data.object.deptName
						})
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			// 查询手术方法库
			surgicalList(id){
				getSurgical({
					adminId:id
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						this.surgical=res.data.object.list
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			enterSurgical(id){
				uni.navigateTo({
					url:'/pages/surgicalData/surgicalDetail?id='+id,
					animationType:'pop-in'
				})
			}
		},
		onLoad(options) {
			console.log(options)
			this.getTeamInfor(options.deptId)
			this.surgicalList(options.leaderId)
		}
	}
</script>

<style scoped lang="scss">
	page{
		width: 100%;
		height: 100%;
	}
	.Teaminfor{
		display: flex;justify-content: space-between;background-color: #FFFFFF;padding: 20rpx 30rpx;
		margin-bottom: 20rpx;
		.left{
			color:#000000;
			font-size: 26rpx;
			font-family: PingFang-SC-Medium;
			font-bold:500;
			margin-right: 20rpx;
			.title{
				font-size: 30rpx;
				font-family: PingFang-SC-Bold;
				font-weight:bold;
			}
			.item1{
				line-height: 58rpx;
				.label{
					color: #8F8F8F;
				}
			}
		}
		.right{
			.image{
				width: 140rpx;height: 140rpx;border: 1px solid #DDDDDD;
			}
		}
	}
	.TeamImage{
		margin-bottom: 20rpx;background-color: #FFFFFF;padding: 20rpx 30rpx;
		.scroll-X{
			white-space: nowrap;width: 100%;
			.items{
				display: inline-block;margin-right: 10rpx;
				.image{
					width: 240rpx;height: 150rpx;border: 1px solid #DDDDDD;
				}
				
			}
		}
	}
	.introduce{
		padding: 10rpx 30rpx;background-color: #FFFFFF;color: #8F8F8F;font-size: 24rpx;
		.detail{
			margin-top: 10rpx;
			color: #000000;font-size: 26rpx;font-weight: 500;
		}
	}
	.surgical{
		margin: 20rpx 0;
		padding: 20rpx 0;
		.title{
			font-size: 30rpx;
			font-weight: bold;
			padding:0 30rpx 20rpx;
		}
		.scroll-X{
			white-space: nowrap;
			width: 100%;
			.items{
				display: inline-block;
				margin-right: 10rpx;
				background-color: #FFFFFF;
				border: 1px solid #DDDDDD;
				text-align: center;
				.image{
					width: 240rpx;height: 150rpx;
				}
				.detail{
					padding: 10rpx 10rpx;border-top: 1px solid #DDDDDD;
					.line{
						width: 240rpx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;
						overflow: hidden;
						font-size: 30rpx;
						font-weight: bold;
						font-family: PingFang-SC-Bold;
						color: #000000;
					}
					.content{
						font-size: 24rpx;
						font-weight: 500;
						font-family: PingFang-SC-Medium;
						color: #8F8F8F;
					}
				}
			}
		}
	
	}
	.video{
		padding: 30rpx;
		background-color: #FFFFFF;
		text-align: center;
		.items{
			background-color: $uni-bg-color-grey;
			margin-bottom: 10rpx;
		}
	}
</style>
