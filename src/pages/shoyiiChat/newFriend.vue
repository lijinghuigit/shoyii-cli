<template>
	<view class="container" :data-theme='themeType'>
		<u-navbar class="navbar" :is-back="false" title="" :background="themeType=='dark'?{backgroundColor: '#3A3A3A'}:background"
		:border-bottom="themeType=='dark'?false:true">
			<view class="slot-wrap" v-if="add">
				<u-icon name="arrow-left" size='40' color='#999' @click='back'></u-icon>
				<text style="font-size: 32rpx;color: #999;">新的朋友</text>
				<text @click='addFriend' class="sy_title_primary">添加朋友</text>
			</view>
			<view class="slot-wrap"  v-else style="">
				<view class="" style="width: 100%;display: flex;justify-content: space-between;align-items: center;">
					<u-search @search='search' :clearabled="true" 
					:bg-color="themeType=='dark'?'#1B1C1E':'#ffffff'" :border-color="themeType=='dark'?'#3A3A3A':'#EEEEEE'"
					:show-action="false" action-text="搜索" :animation="true" shape="round" placeholder="手机号/名称/医院" 
					v-model="searchFriends"></u-search>
					<text @click="cancel" class="sy_title_primary">取消</text>
				</view>
			</view>
		</u-navbar>
		 <uni-list v-for="(item,index) in newList" :key='index'>
			<uni-list-item class='chat sy_block' :title="item.anotherUserName" :note="item.content?item.content:'请求添加你为朋友'" :thumb="item.anotherUserProfile?item.anotherUserProfile:'/static/image/person.png'"
		     thumb-size="lg">
				<template v-slot:footer>
					<text v-if="item.isFriend==1">已添加</text>
					<view class="add" v-if='item.isFriend==0' @click='agree(item)'>
						<text>同意</text> 
					</view>
					<text v-if="item.isFriend==2">已过期</text>
				 </template>
			 </uni-list-item>
		</uni-list>
	</view>
</template>
<script>
	import {getFriendQuest,searchFriends,agreeQuest} from '@/utill/api/connect/connect.js'
	export default{
		data(){
			return{
				background:{
					backgroundColor: '#f8f8f8',
				},
				add:true,
				searchFriends:'',
				newList:[],
			}
		},
		computed:{
			userId(){
				return this.$store.getters['user/info'].doctorId
			}
		},
		methods:{
			back(){ //返回聊天首页
				uni.navigateBack({
					delta:1
				})
			},
			addFriend(){
				this.add=false
			},
			// 搜索好友
			search(){
				searchFriends({
					value:this.searchFriends,
					userId:this.userId,
					userType:'D'
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						if(res.data.object.length==0){
							uni.showToast({
								title:'暂无数据',
								icon:'none'
							})
						}else{
							uni.navigateTo({
								url:'/pages/shoyiiChat/searchInfor?data='+encodeURIComponent(JSON.stringify(res.data.object[0]))
							})
						}
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
			cancel(){
				this.add=true
			},
			friendQuest(){
				getFriendQuest({
					userId:this.userId,
					userType:'D'
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						this.newList=res.data.object
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			agree(item){
				//同意之后，刷新好友列表数据
				agreeQuest({
					id:item.id,
					userId:item.userId,
					userType:item.userType,
					anotherUserId:item.anotherUserId,
					anotherUserType:item.anotherUserType,
					isFriend:'1'
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						this.friendQuest()
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
					}
				}).then(err=>{
					console.log(err)
				})
			},
		},
		onLoad() {
			this.friendQuest()
		}
	}
</script>

<style scoped lang="scss">
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
	.chat ::v-deep .uni-list-item__content-title{
		color: #999;
		font-weight: 500;
	}
	.slot-wrap{
		width: 100%;
		padding: 0 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.add{
		padding:0 20rpx;
		height: 60rpx;
		display: flex;
		align-items: center;
		background-color: #7DCCEC;
		color: #fff;
	}
	/* #ifdef MP-WEIXIN */
	.navbar ::v-deep .u-line-1{
		display: none!important;
	}
	/* #endif */
	
</style>
