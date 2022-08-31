<template>
	<view class="box">
		<view class="list sy_block sy_border" @click="enterDetail(Mysurgicalid)" hover-class="bgColor">
			<view class="surgical_image">
				<image lazy-load :src="imgUrl" mode="aspectFit" @error="imageError" @load='load' class="sy_border"></image>
			</view>
			<view class="content">
				<view>
					<text class="content_titlename sy_title_primary">{{content_title}}</text>
					<view class="content_item sy_title_primary">
						<text>{{content}}</text>
					</view>
				</view>
				<view class="title">
					<view class="title_top sy_title_primary">
						<image lazy-load v-if="doctor.avatarLinks" :src="doctor.avatarLinks" mode=""></image>
						<text>{{docName}}</text>
					</view>
					<view class="time">
						<text>{{timeStamp(time)}}</text>
					</view>	
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			Mysurgicalid:{
				type:Number,
				default:null,
			},
			doctor:{
				type:Object,
				default:()=>{
					return{}
				}
			},
			docName:{
				type:String,
				default:'',
			},
			time:{
				// type:Number,
				// default:null,
				// type:String,
				// default:''
			},
			imgUrl:{
				type:String,
				default:'',
			},
			content_title:{
				type:String,
				default:'',
			},
			content:{
				type:String,
				default:'',
			}
		},
		methods:{
			imageError(e){
				console.log(e.detail)
			},
			load(e){
				console.log(e.detail)
			},
			enterDetail(id){
				console.log(id)
				uni.navigateTo({
					url:'/pages/surgicalData/surgicalDetail?id='+id,
					animationType:'pop-in'
				})
			}
		}
	}
</script>

<style>
	.box{
		padding: 0 30rpx;
		margin-bottom: 10rpx;
		width: 100%;
	}
	.list{
		display: flex;
		align-items: flex-start;
		padding: 18rpx 12rpx;
		background-color: #FFFFFF;
		border: 1px solid #EEEEEE;
		border-radius: 10rpx;
	}
	.bgColor{
		background-color: #F8F8F8;
	}
	.surgical_image{
		height: 214rpx;
		width: 226rpx;
		margin-right: 21rpx;
	}
	.surgical_image image{
		width: 100%;
		min-width: 226rpx;
		height: 214rpx;
		/* background: #adabff;	 */
		border: 1px solid #EEEEEE;
	}
	.content{
		flex:1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 214rpx;
		overflow: hidden;
		margin-top: 0;
		padding: 0 10rpx;
	}
	.content .content_titlename{
		color: #000000;
		font-size: 30rpx;
		font-weight: bold;
		font-family: PingFang-SC-Bold;
		/* margin-bottom: 22rpx; */
		/* line-height: 24rpx; */
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
	}
	.content .content_item{
		color: #000000;
		font-family: PingFang-SC-Regular;
		font-size: 24rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
		line-height: 30rpx;
		margin: 22rpx 0 30rpx;

	}
	.title{
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
		color: #000000;
		font-size: 24rpx;
		font-family: PingFang-SC-Regular;
	}
	.title .time{
		color: #909090;
	}
	.title_top{
		display: flex;
		align-items: center;
	}
	.title_top image{
		width: 36rpx;
		height: 36rpx;
		border-radius: 50%;
		margin-right: 7px;
		display: block;
	}
	
</style>
