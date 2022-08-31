<template>
		<view class="">
			<view class="classifyItems sy_block" v-for="(item,index) in publicData" :key='index'>
				<view class="classifyTitle">
					<text class="sy_title_deep">{{item.modelLibTypeName}}</text>
					<view class="Uname sy_title_deep" v-if="item.modelLibs.length!=0">
						<u-image width="40" height="40" style="margin-right: 10rpx;" mode="" shape="circle" :src="item.modelLibs[0].avatarLinks">
							<template v-slot:loading>
								<uni-icons type="spinner-cycle"></uni-icons>
							</template>
							<template v-slot:error>
								<view style="font-size: 24rpx;color: #000000;">加载失败</view>
							</template>
						</u-image>
						<text>{{item.modelLibs[0].doctorName}}</text>
					</view>
					<view class="Uname" v-else>
						<u-image width="40" height="40" style="margin-right: 10rpx;" mode="" shape="circle" :src="defaultImg">
						</u-image>
						<text>暂无数据</text>
					</view>
				</view>
				<view class="items sy_border_bt" v-if="item.modelLibs.length!=0">
					<view class="items_list" v-for="(s_item,s_index) in item.modelLibs" :key='s_index' @click="enterDetail(s_item.id,item.id)" :class="boolean==s_item.id?'bgColor':''">
						<view class="imgpic sy_border">
							<u-image v-if="s_item.previewImage" height="100%" mode="aspectFit" :src="s_item.previewImage[s_item.fileModelImgId.split(',')[0]]">
								<template v-slot:loading>
									<uni-icons type="spinner-cycle"></uni-icons>
								</template>
								<template v-slot:error>
									<view style="font-size: 24rpx;color: #000000;">加载失败</view>
								</template>
							</u-image>
							<u-image v-else height="100%" mode="aspectFit" :src="defaultImg">
							</u-image>
						</view>
						<view class="items_content " style="">
							<text class="sy_title_deep">{{s_item.modelName||'无数据'}}</text>
							<text>{{s_item.description}}</text>
						</view>
					</view>
				</view>
				<view class="" v-else>
					<u-empty text="数据为空" mode="data"></u-empty>
				</view>
				<view class="checkAll" v-if="item.modelLibs.length!=0"  @click="checkModel(item.id,item.modelLibTypeName)">
					<text>查看全部</text>
				</view>
			</view>
		</view>
</template>
<script>
	export default{	
		data(){
			return{
				boolean:'',
				defaultImg:uni.getStorageSync('uploadLogo')
			}
		},
		props:{
			publicData:{
				type:Array,
				default:()=>{
					return[]
				}
			}
		},
		methods:{
			// 进入模型详情
			enterDetail(modelId,classifyId){
				console.log(modelId)
				this.boolean=modelId
				uni.navigateTo({
					url:'/pages/publicModel/modelDetail?modelId='+modelId+'&classifyId='+classifyId
				})
			},
			// 查询分类下的模型
			checkModel(classifyId,modelLibTypeName){
				console.log(classifyId)
				uni.navigateTo({
					url:'/pages/publicModel/classifyModel?classifyId='+classifyId+'&modelLibTypeName='+modelLibTypeName
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.classifyItems{
		padding:20rpx;background-color: #FFFFFF;margin-top: 30rpx;
		.classifyTitle{
			color: #000000;
			font-family: PingFang-SC-Bold;
			font-size: 30rpx;
			font-weight: bold;
			display: flex;
			justify-content: space-between;
			padding-bottom: 28rpx;
			.Uname{
				font-size: 26rpx;
				font-family: PingFang-SC-Regular;
				font-weight: 400;
				display: flex;
				align-items: center;
			}
		}
		.items{
			padding-top: 30rpx;padding-bottom: 30rpx;border-top: 1px solid #EEEEEE;border-bottom: 1px solid #EEEEEE;
			.items_list{
				display: flex;
				.imgpic{
					min-width: 156rpx;height: 148rpx;border: 1px solid #EEEEEE;border-radius: 10rpx;
				}
				.items_content{
					flex: 1;padding-left: 20rpx;display: flex;flex-direction: column;justify-content: center;
					uni-text:nth-child(1){
						color: #000000;font-size: 30rpx;line-height: 60rpx;
					}
					uni-text:nth-child(2){
						color: #8F8F8F;font-size: 24rpx;line-height: 36rpx;display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp:2;
						overflow: hidden;
						word-wrap: break-word;
						word-break: break-all;
					}
				}
			}
			.items_list:nth-child(1){
				padding-bottom: 10rpx;
			}
			.items_list:nth-child(2){
				padding-top: 10rpx;
			}
		}
		.checkAll{
			font-size: 24rpx;padding-top: 24rpx;text-align: center;
		}
		.bgColor{
			background-color: $uni-bg-color-grey;
		}
	}
	
</style>
