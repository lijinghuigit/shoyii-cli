<template>
	<view class="container" :data-theme='themeType'>
		<view class="list-item sy_block" v-for="(item,index) in list.slice(0,6)" :key='item.id' @click="enterDetail(item.id)" hover-class="bgColor">
			<view class="" style="position: relative;">
				<u-image class='' width="100rpx" height="100rpx" :src="item.previewImage[item.targetIcon]" mode='aspectFit'>
					<template v-slot:error>
						<view style="font-size: 24rpx;">
							<u-image width="100rpx" height="100rpx"  src="/static/image/person.png" mode="aspectFit"></u-image>
						</view>
					</template>
				</u-image>
				<u-badge v-if="item.messageContent.isRead==0?true:false" size="mini" type="error" :is-dot="true" :is-center='true'></u-badge>
			</view>
			<view class="item-content">
				<view class="item-middle">
					<view class="text">
						<text v-if='item.messageContent.title'>{{item.messageContent.title}}</text>
					</view>
					<view class="text">
						<text>{{item.messageContent.content}}</text>
					</view>
				</view>
				<view class="item-right">
					<text>{{timeStamp(item.messageContent.createTime)}}</text>
				</view>
			</view>
		</view>
		<!-- #ifdef APP-PLUS -->
		<view class="" v-if="list.length>6">
			<view class="ad-view">
				 <ad adpid="1542457411"></ad>
			</view>
		</view>
		<!-- #endif -->
		<view class="list-item sy_block" v-for="(item,index) in list.slice(6)" :key='item.id' @click="enterDetail(item.id)" hover-class="bgColor">
			<view class="" style="position: relative;">
				<u-image class='' width="100rpx" height="100rpx" :src="item.previewImage[item.targetIcon]" mode='aspectFit'>
					<template v-slot:error>
						<view style="font-size: 24rpx;">
							<u-image width="100rpx" height="100rpx"  src="/static/image/person.png" mode="aspectFit"></u-image>
						</view>
					</template>
				</u-image>
				<u-badge v-if="item.messageContent.isRead==0?true:false" size="mini" type="error" :is-dot="true" :is-center='true'></u-badge>
			</view>
			<view class="item-content">
				<view class="item-middle">
					<view class="text">
						<text v-if='item.messageContent.title'>{{item.messageContent.title}}</text>
					</view>
					<view class="text">
						<text>{{item.messageContent.content}}</text>
					</view>
				</view>
				<view class="item-right">
					<text>{{timeStamp(item.messageContent.createTime)}}</text>
				</view>
			</view>
		</view>
		<!-- #ifdef APP-PLUS -->
		<view class="" v-if="list.length>12">
			<view class="ad-view">
				 <ad adpid="1627128007"></ad>
			</view>
		</view>
		<!-- #endif -->
		<u-back-top :scroll-top="scrollTop" top="1000"></u-back-top>
		<u-loadmore :status="status" />
		<u-empty class="empty" text="暂无更多消息" src='/static/svg/notice.svg' icon-size='200'
		 v-if="list.length==0"></u-empty>
	</view>
</template>
<script>
	import {getNotice} from './api/notice.js'
	export default {
		data() {
			return {
				status:'loadmore',
				list:[],
				page:1,
				size:10,
				total:0,
				mark:0,//第一次加载还是多次加载数据
				scrollTop:0,
			}
		},
		methods: {
			enterDetail(id){
				uni.navigateTo({
					url:'/pages/notice/noticeDetail?id='+id
				})
				console.log(this.list)
				this.list.forEach((item,index)=>{
					if(id==item.id){
						this.list[index].messageContent.isRead=1//点击之后，更改Wie消息已读状态
					}
				})
			},
			getNotice(mark,page){
				getNotice({
					pageNum:page,
					pageSize:this.size,
					// massageType:""
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						this.total=res.data.object.pages
						console.log(mark)
						if(mark==0){
							this.list=res.data.object.list
						}else if(mark==1){
							this.list=this.list.concat(res.data.object.list)
						}
						console.log(this.list)
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
					}
				}).catch(err=>{
					console.log(err)
				})
			},
		},
		onReachBottom() {
			console.log(this.page)
			console.log(this.total)
			if(this.page >= this.total) return this.status = 'nomore';
			this.status = 'loading';
			this.page++;
			this.mark=1
			this.getNotice(this.mark,this.page)
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onLoad() {
			this.getNotice(0,1)
		},
		onReady() {
			this.amendNavigator()
		}
	}
</script>

<style scoped lang="scss">
	// .noticeLogo{
	// 	position: fixed;
	// 	 top:0;
	// 	 right:0;
	// 	 bottom:0;
	// 	 left:0;
	// 	 margin:auto;
	// }
	page{
		/* #ifdef H5 */
		height: 100%;
		/* #endif */
	}
	.container{
		width: 100%;
		/* #ifdef H5 */
		min-height: 100%; 
		/* #endif */
		/* #ifndef H5 */
		min-height: 100vh;
		/* #endif */
	}
	.list-item{
		display: flex;
		align-items: center;
		padding: 20rpx 30rpx;
		background-color: #FFFFFF;
		margin-bottom: 20rpx;
	}
	.item-middle{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.text{
			line-height: 50rpx;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 1;
			overflow: hidden;
		}
	}
	.item-content{
		padding-left: 20rpx;
		flex: 1;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		.item-right{
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 1;
			overflow: hidden;
			line-height: 50rpx;
			color: gray;
			font-size: 24rpx;
		}
	}
	.bgColor{
		background-color: $uni-bg-color-grey;
	}
</style>
