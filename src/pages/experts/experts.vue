<template>
	<view class="experts" style="">
		<view class="item" v-for="(item,index) in list" :key='item.id' @click="enterDetail(item.id)">
			<u-image width="180" height="186rpx" class="image" :src="item.avatar?item.previewImage[item.avatar]:'/static/image/shoyiilogo.png'"></u-image>
			<view class="content">
				<text class="name">{{item.name}}</text>
				<view class="infor">
					<text>{{item.position}}</text>
					<text style="margin: 0 8rpx;color: #000000;">|</text>
					<text>{{item.hospital}}</text>
				</view>
				<text class="introduce">{{item.introduce}}</text>
			</view>
		</view>
		<u-loadmore :status="status" />
	</view>
</template>

<script>
	import {expertslist} from '@/utill/api/experts/index.js'
	export default {
		data() {
			return {
				list:[],
				pages:1,// 总页数
				page:1,// 默认是1
				status:'loadmore',
			}	
		},
		methods: {
			getExperts(page){
				expertslist({
					page:page,
					size:6
				}).then(({data})=>{
					console.log(data)
					if(data.code==0){
						this.list=[...this.list,...data.object.list]
						this.pages=data.object.pages //总页数
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			enterDetail(id){
				uni.navigateTo({
					url:'/pages/experts/detail?id='+id
				})
			}
		},
		onLoad() {
			this.getExperts(1)
		},
		onReachBottom(){
			if(this.page>=this.pages) return this.status = 'nomore';
			this.status = 'loading';
			this.page++;
			this.getExperts(this.page)
		}
	}
</script>

<style scoped lang="scss">
	.experts{
		padding:0 30rpx;
		.item{
			margin-top: 30rpx;
			background-color: #FFFFFF;
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			padding:20rpx;
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
	}
	
</style>
