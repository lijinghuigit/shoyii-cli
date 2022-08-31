<template>
	<view class="docInfor sy_block sy_border_bottom">
		<image lazy-load v-if="doctorInfor.avatarLinks" :src=doctorInfor.avatarLinks mode="" @click="enterDocDetail(doctorId)"></image>
		<image lazy-load v-else :src='defaultImg' mode=""></image>
		<view class="docInfor_content" style="">
			<view class="" style="display: flex;justify-content: space-between;">
				<text class="docname sy_title_deep">{{docName}}</text>
				<text class="infor">{{timeStamp(Time)}}</text>
			</view>
			<view class="infor" style="">
				<text>{{doctorInfor.departmentName}}</text>
				<text class="line">|</text>
				<text>{{doctorInfor.hospital}}</text>
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
			doctorId:{
				type:Number,
				default:null
			},
			docName:{
				type:String,
				default:''
			},
			Time:{
				// type:Number,
				// default:null
				// type:String,
				// default:''
			},
			doctorInfor:{
				type:Object,
				default:()=>{
					return{
					}
				}
			},
		},
		methods:{
			enterDocDetail(id){
				console.log(id)
				// #ifndef H5
				if(id==this.$store.getters['user/info'].doctorId){//表示医生是自己，进入自己主页
					uni.switchTab({
						url:'/pages/Tabbar/mine'
					})
				}else{//进入别人主页
					uni.navigateTo({
						url:'/pages/otherDoctor/otherDoctor?doctorId='+id
					})
				}
				// #endif
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
	.docInfor_content{
		flex: 1;display: flex;flex-direction: column;justify-content: space-between;
	}
	/* #ifdef MP-WEIXIN */
		.docInfor image {
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			border: 1px solid #F0EFEF;
			margin-right: 23rpx;
		}
	/* #endif */
	.docInfor uni-image{
		width: 100rpx;
		height: 100rpx;
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
		line-height: 40rpx;
		color: #8F8F8F;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		word-wrap: break-word;
		word-break: break-all;
	}
</style>
