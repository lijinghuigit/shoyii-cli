<template>
	<view class="scroller">
		<scroll-view scroll-y class="emoj_box">
			<block v-for="(item,index) in emojiList" :key="index">
				<text @click="setEmoj(item,index)" class="emoj_box_img">{{item}}</text>
			</block>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		emits:['setEmoj'],
		props: {
			emojiList: {
				type: Array,
				default:()=>{
					return []
				}
			}
		},
		methods:{
			setEmoj(item,index){
				this.$nextTick(() =>{
					this.$emit('setEmoj',item,index)
				})
			}
		}
	}
</script>

<style scoped>
	.scroller {
		height: 100%;
	}

	.emoj_box {
		height: 100%;
	}
	.emoj_box /deep/ .uni-scroll-view-content{
		display: flex!important;
		flex-wrap: wrap!important;
	}
	.emoj_box_img {
		font-size: 45rpx;
		width: 83rpx;
		height: 83rpx;
		text-align: center;
		line-height: 83rpx;
	}
</style>
