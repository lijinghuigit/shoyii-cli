<template>
	<view class="PublicTitle" :class="index==0?'CaseTitle':''">
		<text class="title sy_title_primary">{{title}}</text>
		<text class='tip sy_title_primary' @tap="more(index)">{{$t('index.Moremenu')}}</text>
	</view>
</template>

<script>
	import {getSurgicalparam} from '@/utill/api/surgical/getSurgical.js' 
	export default{
		props:{
			index:{
				type:String,
				default:'',
			},
			title:{
				type:String,
				default:'',
			}
		},
		methods:{
			more(index){
				if(index==0){ //病例管理
					uni.switchTab({
						url:'/pages/Tabbar/case'
					})
				}else if(index==1){//手术方法库更多
				// #ifdef APP-PLUS||H5
					uni.switchTab({
						url:'/pages/Tabbar/surgicalData'
					})
				// #endif
					// #ifdef MP-WEIXIN
					// 调进入方法库列表的接口
					getSurgicalparam({
						start:1,
						length:6,
					}).then(res=>{
						if(res.data.code==2){
							uni.showToast({
								title:'无更多数据',
								icon:'none'
							})
						}else{
							uni.navigateTo({
								url:'/pages/surgicalListParam/surgicalListParam'
							})
						}
					})
					// #endif
				}else if(index==2){//公开模型库库更多
					uni.navigateTo({
						url:'/pages/publicModel/publicModel'
					})
				}else if(index==3){ //树蚁商城
					// console.log('数以商城')
				}else if(index==4){//设备管理
					uni.navigateTo({
						url:'/pages/deviceManage/deviceManage'
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.PublicTitle{
		padding: 30rpx 0 28rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.title{
			color:#000000 ;
			font-size: 30rpx;
			font-family: PingFang-SC-Bold;
			font-weight:bold ;
			// padding: 10rpx 0;
		}
		.tip{
			font-size: 28rpx;
			font-family: PingFang-SC-Regular;
			font-weight: 400;
			// padding: 10rpx 10rpx;
		}
	}
	/* #ifdef MP-WEIXIN */
	.CaseTitle{
		padding-top: 0;
	}
	/* #endif */
</style>
