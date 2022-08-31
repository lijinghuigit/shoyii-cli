<template>
	<view class="price">
		<view class="title">
			<text>部位费用</text>
		</view>
		<u-collapse style="padding: 0 30rpx;" class="collapse">
			<u-collapse-item :title="item.name" v-for="(item, index) in priceData.assistDesign" :key="index">
				<view class="" v-for="(item1,index1) in item.position" :key='index1' style="padding: 10rpx 0;">
					<text>{{item1.name}}</text><text style="margin:0 20rpx;">:</text>
					<text>￥</text><text>{{item1.retailPrice}}</text>
				</view>
			</u-collapse-item>
		</u-collapse>
		<view class="title">
			<text>其他项目费用</text>
		</view>
		<view class="items" v-if="priceData.guidePlateDesignCost">
			<text>导板设计：</text>
			<text>￥</text><text>{{priceData.guidePlateDesignCost}}</text>
		</view>
		<view class="items" v-if="priceData.guidePlatePrintCost">
			<text>导板打印：</text>
			<text>￥</text><text>{{priceData.guidePlatePrintCost}}</text>
		</view>
		<view class="items" v-if="priceData.instrumentDesignCost">
			<text>器械设计：</text>
			<text>￥</text><text>{{priceData.instrumentDesignCost}}</text>
		</view>
		<view class="items" v-if="priceData.prosthesisDesignCost">
			<text>假体设计：</text>
			<text>￥</text><text>{{priceData.prosthesisDesignCost}}</text>
		</view>
		<!-- <view class="items" v-if="priceData.prosthesisDesignCost">
			<text>假体打印：</text>
			<text>￥</text><text>{{priceData.prosthesisDesignCost}}</text>
		</view> -->
		<view class="items" v-if="priceData.smashFractureCost">
			<text>重建粉碎性骨折：</text>
			<text>￥</text><text>{{priceData.smashFractureCost}}</text>
		</view>
		<view class="items" v-if="priceData.prosthesisCost">
			<text>重建假体：</text>
			<text>￥</text><text>{{priceData.prosthesisCost}}</text>
		</view>
		<view class="items" v-if="priceData.serviceFee">
			<text>服务费用：</text>
			<text>￥</text><text>{{priceData.serviceFee}}</text>
		</view>
		<view class="items_material" v-if="priceData.guidePlateMaterialName||priceData.modelMaterialName||priceData.prosthesisMaterialName">
			<text style="font-weight: bold;">材料单价（g）：</text>
			<!-- 导板材料 -->
			<view class="item_content" v-if="priceData.guidePlateMaterialName">
				<text>导板打印-</text><text style="">{{priceData.guidePlateMaterialName}}</text><text>：</text>
				<text>￥</text><text>{{priceData.guidePlatePrintPrice}}</text>
			</view>
			<!-- 模型材料 -->
			<view class="item_content" v-if="priceData.modelMaterialName">
				<text>模型打印-</text><text>{{priceData.modelMaterialName}}</text><text>：</text>
				<text>￥</text><text>{{priceData.modelPrintPrice}}</text>
			</view>
			<!-- 假体材料 -->
			<view class="item_content" v-if="priceData.prosthesisMaterialName">
				<text>假体打印-</text><text>{{priceData.prosthesisMaterialName}}</text><text>：</text>
				<text>￥</text><text>{{priceData.prosthesisPrintPrice}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {getPrice} from './api/help.js'
	export default {
		data(){
			return{
				priceData:[]
			}
		},
		methods:{
			getPrice(data){
				getPrice(
					data
				).then(res=>{
					console.log(res)
					if(res.data.code==0){
						this.priceData=res.data.object
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
					}
				}).catch(err=>{
					console.log(err)
				})
			}
		},
		onLoad(options) {
			console.log(options)
			console.log(JSON.parse(decodeURIComponent(options.data)))
			var data=JSON.parse(decodeURIComponent(options.data))
			this.getPrice(data)
		}
	}
</script>

<style scoped lang="scss">
	.price{
		background-color: #FFFFFF;
		.title{
			background-color:$uni-bg-color-grey;
			padding: 20rpx 30rpx;
			font-size: 30rpx;
			font-weight: bold;
		}
		.items{
			padding: 0 30rpx;
			height: 80rpx;
			line-height: 80rpx;
		}
	}
	/* #ifdef MP-WEIXIN */
	.collapse ::v-deep .u-collapse-item{
		padding: 0 30rpx!important;
	}
	/* #endif */
	
	.items_material{
		background-color: #FFFFFF;
		padding: 0 30rpx;
		.item_content{
			height: 80rpx;
			line-height: 80rpx;
		}
	}
</style>
