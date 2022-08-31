<template>
	<view class="timelineItem">
		<view class="timeItem">
			<view class="leftTime">
				{{leftTime}}
			</view>
			<view class="line">
				<view class="out" :style="{background: color == '' ? '' : color}">
					<view class="inner" :style="{background: color == '' ? '' : color}"></view>
				</view>
			</view>
			<view class="rightContent">
				<slot></slot>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		props:{
			leftTime:{
				type:String,
				default:''
			},
			color:{
				type:String,
				default:''
			}
		},
		data(){
			return {
				
			}
		}
	}
</script>

<style scoped lang="less">
	.timelineItem {
		.timeItem {
			display: flex;
			.leftTime {
				// width: 100px;
				padding: 0 15px;
				padding-left: 0px;
				font-size:14px;
				font-family:PingFangSC-Medium,PingFang SC;
				font-weight:500;
				color:#86B0D4;
				// margin-right: 10rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.line {
				width: 1px;
				background:#86B0D4;
				position: relative;
				.out {
					position: absolute;
					top: 0;
					left: 50%;
					transform: translateX(-50%);
					display: flex;
					justify-content: center;
					align-items: center;
					width: 28rpx;
					height: 28rpx;
					background : rgba(236,104,23,0.6);
					border-radius: 50%;
					.inner {
						width: 18rpx;
						height: 18rpx;
						background : rgba(236,104,23,1);
						border-radius: 50%;
					}
				}
			}
			.rightContent {
				flex: 1;
				padding: 0 10rpx 40rpx;
				margin-left: 20rpx;
				min-height: 50rpx;
			}
		}
	}
</style>
