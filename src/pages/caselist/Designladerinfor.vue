<template>
	<view class="">
		<view class="Teaminfor">
			<view class="left">
				<image class="image" :src="Infor.avatarUrl?Infor.avatarUrl:'/static/image/shoyiilogo.png'" mode="aspectFit"></image>
			</view>
			<view class="right">
				<view class="title tip">
					<text>{{Infor.leaderRealName}}</text>
				</view>
				<view class="tip">
					<text>{{Infor.deptName}}</text><text style="margin: 0 10rpx;">|</text><text>{{Infor.leaderPhone}}</text>
				</view>
			</view>
		</view>
		<view class="TeamImage" v-if="Infor.leaderUploadPicsUrl">
			<scroll-view enable-flex scroll-x="true" class="scroll-X" v-if="Object.keys(Infor.leaderUploadPicsUrl).length>0">
				<view v-for="(item,index) in Infor.leaderUploadPicsUrl" :key='item' class="items">
					<image :src="item?item:'/static/image/shoyiilogo.png'" mode="aspectFit" class="image"></image>
				</view>
			</scroll-view>
		</view>
		<view class="introduce" v-if="Infor.leaderDecription">
			<text>简介</text>
			<view class="detail">
				<text>{{Infor.leaderDecription}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {getTeamLeader} from './api/help.js'
	export default{
		data(){
			return{
				Infor:{},
			}
		},
		methods:{
			getTeamLeader(id){
				console.log(id)
				getTeamLeader({
					id
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						this.Infor=res.data.object
						uni.setNavigationBarTitle({
							title:res.data.object.leaderRealName
						})
					}
				}).catch(err=>{
					console.log(err)
				})
			}
		},
		onLoad(options) {
			console.log(options)
			this.getTeamLeader(options.deptId)
		}
	}
</script>

<style scoped lang="scss">
	page{
		width: 100%;
		height: 100%;
	}
	.Teaminfor{
		display: flex;justify-content: space-between;align-items: center;
		background-color: #FFFFFF;padding: 20rpx 30rpx;
		margin-bottom: 20rpx;
		.left{
			margin-right: 40rpx;
			.image{
				width:128rpx;height: 128rpx;border: 1px solid #DDDDDD;border-radius: 50%;
			}
		}
		.right{
			color:#000000;
			font-size: 26rpx;
			font-family: PingFang-SC-Medium;
			font-bold:500;
			flex: 1;
			.title{
				font-size: 30rpx;
				font-family: PingFang-SC-Bold;
				font-weight:bold;
			}
			.tip{
				line-height: 58rpx;
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
