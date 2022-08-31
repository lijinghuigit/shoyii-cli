<template>
	<view :data-theme='themeType' class="container">
		<u-row gutter="16" class='headerRow sy_block'>
			<u-col span="3">
				<view class="case image">
					<image lazy-load style="width: 100%;height: 100rpx;" :src="infor.anotherUserProfile?infor.anotherUserProfile:'/static/image/person.png'" mode="aspectFit"></image>
				</view>
			</u-col>
			<u-col span="9">
				<view class="case">
					<view class="name sy_title_deep">
						<text>{{infor.anotherUserName||'暂无数据'}}</text>
					</view>
					<view class="address sy_title_primary">
						<text>地区：</text>
						<text>{{infor.hospital||'暂无数据'}}</text>
					</view>
				</view>
			</u-col>
		</u-row>
		<button type="default" v-if="tipshow" class="btn sy_block" @click="addFriends">添加好友</button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				infor:{},
				tipshow:true
			}
		},
		computed:{
			id(){
				return this.$store.getters['user/info'].doctorId
			}
		},
		methods:{
			//添加好友
			addFriends(){
				uni.navigateTo({
					url:'/pages/shoyiiChat/addFriends?sendId='+this.id+'&receiveId='+this.infor.anotherUserId+'&receiveType='+this.infor.anotherUserType
				})
			}
		},
		onLoad(options) {
			console.log(options)
			this.infor=JSON.parse(decodeURIComponent(options.data))
			console.log(this.infor)
			if(this.infor.isFriend=='1'){
				this.tipshow=false
			}
		},
		onReady() {
			this.amendNavigator()
		}
	}
</script>

<style scoped lang='scss'>
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
	.headerRow{
		background-color: #FFFFFF;
		padding: 30rpx 0;
		.case{
			color: #000;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			.name {
				font-size: 36rpx;
				font-weight: bold;
			}
			.address{
				color: #666666;
				font-size: 24rpx;
			}
		}
	}
	/* #ifdef MP-WEIXIN */
	.headerRow ::v-deep .u-row{
		background-color: #FFFFFF;
		padding: 30rpx 0;
	}
	/* #endif */
	
	.btn{
		background-color: #FFFFFF;
		color: #86B0D4;
		margin: 30rpx 0;
		border: none;
	}
	
</style>
