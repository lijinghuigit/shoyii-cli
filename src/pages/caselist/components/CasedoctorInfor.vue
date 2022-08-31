<template>
	<view class="">
		<view class="docInfor sy_block sy_border_bottom" v-for="(item,index) in casedocinfor" :key=index>
			<image lazy-load :src="item.doctorVO.avatarLinks" mode="" @click="enterDocDetail(item.doctorId)"></image>
			<view class="docInfor_content">
				<view class="" style="display: flex;justify-content: space-between;">
					<text class="docname sy_title_deep">{{item.doctorVO.name}}</text>
					<view class="infor">
						<text>{{timeStamp(item.startTime)}}</text>
					</view>
				</view>
				<view class="infor">
					<text>{{item.doctorVO.departmentName}}</text>
					<text class="line">|</text>
					<text>{{item.doctorVO.hospital}}</text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default{
		props:{
			casedocinfor:{
				type:Array,
				default:()=>{
					return[]
				}
			},
		},
		methods:{
			enterDocDetail(id){
				// #ifndef H5
				if(id==this.$store.getters['user/info'].doctorId){//表示医生是自己，进入自己主页
					uni.switchTab({
						url:'/pages/Tabbar/mine'
					})
				}else{//进入别人主页
					console.log('进入别人主页')
					uni.navigateTo({
						url:'/pages/otherDoctor/otherDoctor?doctorId='+id
					})
				}
				// #endif
			}
		},
	}
</script>

<style scoped lang="scss">
	.docInfor{
		display: flex;
		padding: 30rpx;
		align-items: center;
		border-bottom: 1px solid #F0EFEF;
		background-color: #FFFFFF;
	}
	/* #ifdef MP-WEIXIN */
	.docInfor image{
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
	.docInfor_content{
		flex: 1;display: flex;flex-direction: column;justify-content: space-between;
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
