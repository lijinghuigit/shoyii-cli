<template>
	<view class="all">
		 <!-- <uni-list>
			<uni-list :border="true"> -->
				 <!-- 显示圆形头像 -->
				<!-- <uni-list-chat :avatar-circle="true" title="app" avatar="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png" note="您收到一条新的消息" time="2020-02-02 20:20" ></uni-list-chat> -->
				 <!-- 右侧带角标 -->
				 <!-- <uni-list-chat title="app" avatar="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png" note="您收到一条新的消息" time="2020-02-02 20:20" badge-text="12"></uni-list-chat> -->
				 <!-- 头像显示圆点 -->
				 <!-- <uni-list-chat title="app" avatar="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png" note="您收到一条新的消息" time="2020-02-02 20:20" badge-positon="left" badge-text="dot"></uni-list-chat> -->
				 <!-- 头像显示角标 -->
				 <!-- <uni-list-chat title="app" avatar="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png" note="您收到一条新的消息" time="2020-02-02 20:20" badge-positon="left" badge-text="99"></uni-list-chat> -->
				 <!-- 显示多头像 -->
				 <!-- <uni-list-chat title="app" :avatar-list="avatarList" note="您收到一条新的消息" time="2020-02-02 20:20" badge-positon="left" badge-text="dot"></uni-list-chat> -->
				 <!-- 自定义右侧内容 -->
				 <!-- <uni-list-chat title="app" :avatar-list="avatarList" note="您收到一条新的消息" time="2020-02-02 20:20" badge-positon="left" badge-text="dot">
					 <view class="chat-custom-right">
						 <text class="chat-custom-text">刚刚</text> -->
						 <!-- 需要使用 uni-icons 请自行引入 -->
						<!-- <uni-icons type="star-filled" color="#999" size="18"></uni-icons>
					 </view>
				 </uni-list-chat>
			</uni-list>
		  </uni-list> -->
			<view class="container u-skeleton">
				<view class="userinfo">
					<block>
						<!--u-skeleton-circle 绘制圆形-->
						<image class="userinfo-avatar u-skeleton-circle" :src="userInfo.avatarUrl"></image>
						<!--u-skeleton-fillet 绘制圆角矩形-->
						<text class="u-skeleton-fillet">{{userInfo.nickName}}</text>
					</block>
				</view>
				<view style="margin: 20px 0">
					<view v-for="(item,index) in lists" :key="index" class="lists">
						<!--u-skeleton-rect 绘制矩形-->
						<text class="u-skeleton-rect">{{item}}</text>
					</view>
				</view>
			</view>
			<u-skeleton :loading="loading" :animation="true" bgColor="#FFF" el-color="#86B0D4"></u-skeleton>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				avatarList: [{
					url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png'
				}, {
					url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png'
				}, {
					url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png'
				}],
				userInfo: {
					avatarUrl: 'https://qlogo2.store.qq.com/qzone/1416956117/1416956117/100?1531323520',
					nickName: 'uView'
				},
				lists: [
					'君不见，黄河之水天上来，奔流到海不复回。君不见，高堂明镜悲白发，朝如青丝暮成雪。',
					'人生得意须尽欢，莫使金樽空对月',
					'天生我材必有用，千金散尽还复来',
				],
				loading: true, // 是否显示骨架屏组件
			}
		},
		methods:{
			 
		},
		onLoad() {
			setTimeout(() => {
				this.loading = false;
			}, 2000)
		}
	}
</script>

<style lang="scss">
	.chat-custom-right {
	    flex: 1;
	    /* #ifndef APP-NVUE */
	    display: flex;
	    /* #endif */
	    flex-direction: column;
	    justify-content: space-between;
	    align-items: flex-end;
	}
	.chat-custom-text {
	    font-size: 12px;
	    color: #999;
	}
</style>
