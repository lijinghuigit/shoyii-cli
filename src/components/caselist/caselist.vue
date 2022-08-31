<template>
	<view class="box">
		<view class="list sy_block sy_border" @tap="enterDetail(Caseid)" hover-class="bgColor">
			<view class="surgical_image">
				<image lazy-load :src="imgUrl?imgUrl:'/static/image/shoyiilogo.png'" mode="aspectFit" class="sy_border"></image>
			</view>
			<view class="content">
				<text class="content_titlename sy_title_deep">{{Uname||'未填写'}}</text>
				<view>
					<text class="content_item sy_title_primary">{{casecode||'无数据'}}</text>
				</view>
				<view>
					<text class="content_item sy_title_primary">{{content||'未填写'}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			Caseid:{
				type:Number,
				default:null,
			},
			casecode:{
				type:String,
				default:'',
			},
			imgUrl:{
				type:String,
				default:'',
			},
			Uname:{
				type:String,
				default:'',
			},
			content:{
				type:String,
				default:'',
			},
			classifycase:{//从经典案例中进入病例详情，不展示订单，menu等相关数据
				type:Boolean,
				default:false
			}
		},
		methods:{
			enterDetail(id){
				uni.navigateTo({
					url:'/pages/caselist/caselistdetail?id='+id+'&classifycase='+this.classifycase,
					animationType:'pop-in'
				})
			}
		}
	}
</script>

<style scoped>
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
		height: 214rpx;
		border: 1px solid #EEEEEE;
		border-radius: 10rpx;
		/* background: #F8F8F8;	 */
		/* border: 1px solid #EEEEEE; */
	}
	.content{
		flex:1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 214rpx;
		/* height: 100%; */
		/* overflow: hidden; */
		margin-top: 0;
		/* padding: 0 30rpx; */
	}
	.content .content_titlename{
		color: #000000;
		font-size: 30rpx;
		font-weight: bold;
		font-family: PingFang-SC-Bold;
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
		margin: 20rpx 0 16rpx;
	}
	
</style>
