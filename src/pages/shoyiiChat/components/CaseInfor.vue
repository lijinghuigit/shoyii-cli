<template>
	<view class="caseheader">
		<view class="header" justify="center" v-show="caseid&&caseshow">
			<u-row gutter="16" class='headerRow sy_block' @click='enterCase(caselist.caseHistoryId)'>
				<u-col span="3">
					<view class="caseimage sy_border">
						<u-image v-if='caselist.previewImage' width="100rpx" height="100rpx" :show-error='false' :src="caselist.previewImage" mode="aspectFit"></u-image>
						<u-image v-else width="100rpx" height="100rpx" src="/static/image/shoyiilogo.png" mode="aspectFit"></u-image>		
					</view>
				</u-col>
				<u-col span="4">
					<view class="case">
						<view class="content sy_title_primary" >
							<text class="item">病历名称：</text>
							<text class="item">{{caselist.name}}</text>
						</view>
						<view class="content sy_title_primary">
							<text class="item">简介：</text>
							<text class="item">{{caselist.title}}</text>
						</view>
					</view>
				</u-col>
				<u-col span="5">
					<view class="case">
						<view class="content sy_title_primary">
							<text class="item">病历号：</text>
							<text class="item">{{caselist.caseHistoryNo}}</text>
						</view>
						<view class="content sy_title_primary">
							<text class="item">创建时间：</text>
							<text class="item">{{timeStamp(caselist.createTime)}}</text>
						</view>
					</view>
				</u-col>
			</u-row>
		</view> 
	</view>
</template>

<script>
	export default{
		props:{
			caselist:{
				type:Object,
				default:()=>{
					return {}
				}
			},
			caseid:{
				type:String,
				default:''
			},
			caseshow:{
				type:Boolean,
				default:true
			}
		},
		methods:{
			// 群组的病例详情
			enterCase(id){
				uni.navigateTo({
					url:'/pages/caselist/caselistdetail?id='+id,
					animationType:'pop-in'
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.header{
		padding: 0 30rpx;
		height: auto;
		margin-top: 20rpx;
		/* #ifdef MP-WEIXIN */
		background-color: #FFFFFF;
		/* #endif */
		.headerRow{
			background-color: #FFFFFF;
			.caseimage{
				border: 1px solid #F8F8F8;
				display: flex;
				justify-content: center;
				.u-image{
					text-align: center;
					max-height: 140rpx;
				}
			}
			.case {
				height: 140rpx;
				border-radius: 8rpx;
				display: flex;
				align-items: flex-start;
				flex-direction: column;
				justify-content: space-around;
				color: #333333;
				font-family: PingFang-SC-Regular;
				font-size: 24rpx;
				font-weight: 400;
				.content{
					text-overflow: ellipsis;
					width: 100%;
					white-space: nowrap;
					overflow: hidden;
					.item{
						white-space: nowrap;
					}
				}
			}
		}
	}
</style>