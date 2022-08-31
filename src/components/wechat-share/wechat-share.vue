<template>
	<view class="">
		<u-popup v-model="shareshow" mode="bottom" border-radius="14" @open="open" @close='close'>
			<view style="padding: 30rpx 30rpx;" class="sy_block">
				<text>分享到:</text>
				<view class="" style="display: flex;justify-content: space-around;padding: 30rpx 0;">
					<view v-if="ifThird.ifweixin" style="display: flex;flex-direction: column;line-height: 60rpx;align-items: center;" @click="shareWeixin">
						<!-- #ifdef H5 -->
						<svg class="icon" aria-hidden="true">
						  <use xlink:href='#iconweixin'></use>
						</svg>
						<!-- #endif -->
						<!-- #ifdef APP-PLUS -->
						<image lazy-load src="../../static/image/wechat.png" mode="" style="width: 60rpx; height: 60rpx;"></image>
						<!-- #endif -->
						<text>微信</text>
					</view>
					<view v-if="ifThird.ifweixin" style="display: flex;flex-direction: column;line-height: 60rpx;align-items: center;" @click="shareFriend">
						<!-- #ifdef H5 -->
						<svg class="icon" aria-hidden="true">
						  <use xlink:href='#iconpengyouquan' size='40'></use>
						</svg>
						<!-- #endif -->
						<!-- #ifdef APP-PLUS -->
						<image lazy-load src="../../static/image/friend.png" mode="" style="width: 60rpx; height: 60rpx;"></image>
						<!-- #endif -->
						<text>朋友圈</text>
					</view>
					<view v-if="ifThird.ifqq" style="display: flex;flex-direction: column;line-height: 60rpx;align-items: center;" @click="shareQq">
						<!-- #ifdef H5 -->
						<svg class="icon" aria-hidden="true">
						  <use xlink:href='#iconpengyouquan' size='40'></use>
						</svg>
						<!-- #endif -->
						<!-- #ifdef APP-PLUS -->
						<image lazy-load src="../../static/image/QQ.png" mode="" style="width: 60rpx; height: 60rpx;"></image>
						<!-- #endif -->
						<text>QQ</text>
					</view>
				</view>
				<view class="" style="text-align: center;">
					<text @click="cancelshare">取消</text>
				</view>
			</view>
		</u-popup>
	</view>
</template>
<script>
	export default{
		data(){
			return{
				shareshow:false,
				ifThird:{
					ifweixin:true,
					ifqq:true
				}
			}
		},
		emits:['shareWeixin','shareFriend','shareQq','cancelshare'],
		methods:{
			open(){
				this.shareshow=true
			},
			close(){
				this.shareshow=false
			},
			// 分享到微信聊天列表
			shareWeixin(){
				this.$emit('shareWeixin')
			},
			// 分享微信朋友圈
			shareFriend(){
				this.$emit('shareFriend')
			},
			shareQq(){
				this.$emit('shareQq')
			},
			// 取消分享
			cancelshare(){
				this.$emit('cancelshare')
			},
		},
		created() {
			console.log(this.ifThird)
			if(!getApp().globalData.ifThird.ifweixin){
				this.ifThird.ifweixin=false
			}
			if(!getApp().globalData.ifThird.ifqq){
				this.ifThird.ifqq=false
			}
		}
	}
</script>

<style scoped lang='scss'>
	.icon{
	  width: 1em;
	  height: 1em; 
	  font-size: 48rpx;
	  vertical-align: -0.15em;
	  fill: currentColor;
	  overflow: hidden;
	}
</style>
