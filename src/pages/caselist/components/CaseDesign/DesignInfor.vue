<template>
	<view class="design">
		<view class="introduce sy_block sy_border_bottom" v-for="(item,index) in designData.surgicalDesignDescriptionVOList" :key='index'>
			<view class="example-body sy_block sy_border_bottom" v-if="item.title">
				<text>{{item.title}}</text>
			</view>
			<view class="content" >
				<view v-for="(items,indexs) in item.descriptionDTOS" :key='indexs'>
					<view class="title">
						<view class="indexDot"></view>
						<view class="number" v-if="items.description">
							<text>{{items.description}}</text>
						</view>
					</view>
					<view class="imgpic" v-if="items.picture">
						<image class="imgitems" v-for="(itemImage,index1) in items.picture.split(',')" :key='index1' :src="filterData(designData,itemImage)" mode="aspectFit" @click="PreviewPic(designData,itemImage,items.picture)"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			designData:{
				type:Object,
				default:()=>{
					return{}
				}
			}
		},
		methods:{
			filterData(data,index){
				console.log(index)
				var datas=data.loadLink[index]
				for(var item in data.loadLink){ 
					if(item==index){
						return data.loadLink[index].fileDownloadUrl
					}
				 } 
			},
			PreviewPic(data,index,picture){
				console.log(data.loadLink[index].fileDownloadUrl)
				var datas=[]
				datas.push(data.loadLink[index].fileDownloadUrl)
				uni.previewImage({
					current:0,
					urls:datas,
					complete(e) {
						console.log(e)
					},
				})
			}
		},
		created() {
			console.log(this.designData)
		}
	}
</script>

<style scoped lang="scss">
	.introduce{
		padding:0 30rpx;
		padding-bottom: 20rpx;
		border-bottom: 1px solid #F0EFEF;
		color: #000000;
		font-size: 28rpx;
		background-color: #FFFFFF;
		margin-top: 20rpx;
		.content{
			line-height: 50rpx;
			padding-top: 10rpx;
			.title{
				display: flex;
				align-items: center;
				.indexDot{
					margin-right: 20rpx;
					width: 16rpx;
					height: 16rpx;
					background: #86B0D4;
					border-radius: 50%;
				}
				.number{
					color: #000000;font-size: 28rpx;
				}
			}
			.imgpic{
				display: flex;
				justify-content: flex-start;
				align-items: center;
				flex-wrap: wrap;
				.imgitems{
					width: 210rpx;background-color: #FFFFFF;
					margin: 10rpx 10rpx;
					padding-bottom: 0px!important;
					border: 1px solid #EEEEEE;
					height: 210rpx;
				}  
			}
			/* #ifdef MP-WEIXIN */
			.imgitems ::v-deep image{
				background-color: #FFFFFF!important;
			}
			/* #endif */
			
		}
		.text1 uni-text:nth-child(1){
			color: #8F8F8F;
		}
	}
	.example-body {
		flex-direction: row;
		flex-wrap: wrap;
		font-size: 28rpx;
		background-color: #ffffff;
		color: #232323;
		font-family: PingFang-SC-Bold;
		font-weight: bold;
		padding: 20rpx 0;
		border-bottom: 1px solid #F0F0F0;
	}
	/* #ifndef VUE3 */
	.tag-view ::v-deep .uni-tag--default{
		background: #E9F3FC;
		color: #80AED5!important;
	}
	/* #endif */
	
</style>
