<template>
	<view class="docInfor sy_block">
		<image lazy-load v-if="doctorInfor.avatarLinks" :src=doctorInfor.avatarLinks mode="" @click="Preview(doctorInfor.avatarLinks)"></image>
		<image lazy-load v-else :src='defaultImg' mode=""></image>
		<view class="docInfor_content" style="flex: 1;display: flex;justify-content: space-between;">
			<view class="">
				<text class="docname sy_title_deep">{{doctorInfor.name}}</text>
				<view class="infor">
					<text>{{doctorInfor.departmentName}}</text>
					<text class="line">|</text>
					<text>{{doctorInfor.hospital}}</text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				defaultImg:uni.getStorageSync('uploadLogo')
			};
		},
		props:{
			doctorInfor:{
				type:Object,
				default:()=>{
					return{
					}
				}
			},
		},
		methods:{
			Preview(src){
				console.log(src)
				var array=[]
				array.push(src)
				console.log(array)
				 uni.previewImage({
					urls: array,
					longPressActions: {
						success: function(data) {	
						},
						fail: function(err) {
							uni.showToast({
								title:'预览错误',
								icon:'none'
							})
						}
					}
				});
			}
		}
	}
</script>

<style scoped>
	.docInfor{
		display: flex;
		padding: 30rpx 30rpx;
		align-items: center;
		border-bottom: 1px solid #F0EFEF;
		background-color: #FFFFFF;
	}
	/* #ifdef MP-WEIXIN */
		.docInfor image {
			width: 126rpx;
			height: 126rpx;
			border-radius: 50%;
			border: 1px solid #F0EFEF;
			margin-right: 23rpx;
		}
	/* #endif */
	.docInfor uni-image{
		width: 126rpx;
		height: 126rpx;
		border-radius: 50%;
		border: 1px solid #F0EFEF;
		margin-right: 23rpx;
	}
	.docInfor .docname{
		font-size: 28rpx;
		color: #000000;
	}
	.infor .line{
		margin: 0 10rpx;
	}
	.docInfor .infor{
		font-size: 24rpx;
		line-height:40rpx;
		color: #8F8F8F;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
		word-wrap: break-word;
		word-break: break-all;
	}
</style>
