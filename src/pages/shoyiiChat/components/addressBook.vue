<template>
	<view class="">
		<uni-list :border="true">
			<!-- 新朋友请求认证 -->
			<uni-list-item class='chat sy_block' thumbSize='lg' :badgeText='request' :showBadge='true' :extraIcon='extraIcon' :showExtraIcon='true' title="新的朋友" clickable  @click="newFriends" ></uni-list-item>
			<uni-list-item class='chat sy_block' thumbSize='lg' :showBadge='true' :extraIcon='groupIcon' :showExtraIcon='true' title="添加群聊" clickable  @click="addGroup" ></uni-list-item>
			<u-index-list :scrollTop="scrollTop" :indexList='indexList'>
				<view @longtap='longpress(item)' v-for="(item,index) in addressList" :key='index'>
					<u-index-anchor :index="item.alphaMark"/>
					<view v-for="(s_item,s_index) in item.child" :key='s_index'>
						<uni-list-chat class='chat sy_block' @click="enterChat(s_item)" clickable :title="s_item.anotherUserName" 
						:avatar="s_item.anotherUserProfile?s_item.anotherUserProfile:'/static/image/person.png'"
						:style="{'--color':themeType=='dark'?'#eee':''}">
						</uni-list-chat>
					</view> 
				</view> 
			</u-index-list>
		</uni-list>
		<u-modal v-model="show" title='删除联系人' @confirm='delContact' confirm-color='red' :title-style="{color: '#000',fontWeight:'bold'}" confirm-text='删除' :show-cancel-button='true'>
			<view class="slot-content">
				<view class="">
					将联系人<text>"{{contactName}}"</text>删除，将同时删除与该联系人的聊天记录
				</view>
			</view>
		</u-modal>
	</view>
</template>
<script>
	import {deleteFriends} from '@/utill/api/connect/connect.js'
	export default{
		data(){
			return{
				scrollTop:0,
				extraIcon:{
					color: '#4cd964',size: '34',type: 'personadd-filled'
				},
				groupIcon:{
					color: '#4cd964',size: '34',type: 'chatboxes-filled'
				},
				show:false,
				content:'是否删除',
				contactName:'',
				dataInfor:{},//删除联系人获取的数据
			}
		},
		props:{
			addressList:{
				type:Array,
				default:()=>{
					return[]
				}
			},
			indexList:{
				type:Array,
				default:()=>{
					return[]
				}
			},
			request:{
				type:String,
				default:'',
			}
		},
		emits:['contactrefresh'],
		methods:{
			newFriends(){//进入朋友请求页面
				uni.navigateTo({
					url:'/pages/shoyiiChat/newFriend'
				})
			},
			addGroup(){
				uni.navigateTo({
					url:'/pages/shoyiiChat/inviteOther'
				})
			},
			// 进入聊天页面
			enterChat(item){//其他人id,name,群组或者私聊
				console.log(item)
				uni.navigateTo({
					url:'/pages/shoyiiChat/chatWindow?id='+item.anotherUserId+'&chatId='+item.chatId+'&otherName='+item.anotherUserName+'&type='+item.anotherUserType
				})
			},
			// 长按删除好友
			longpress(item){
				console.log(item)
				var data=item.child[0]
				this.dataInfor=data
				console.log(this.dataInfor)
				this.contactName=data.anotherUserName
				this.show=true
			},
			// 删除联系人
			delContact(){
				deleteFriends({
					userId:this.dataInfor.userId,
					userType:this.dataInfor.userType,
					anotherUserId:this.dataInfor.anotherUserId,
					anotherUserType:this.dataInfor.anotherUserType,
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						this.$emit('contactrefresh')//刷新通讯录
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
		onPageScroll(e) {
			console.log(e.scrollTop)
			this.scrollTop = e.scrollTop;
		}
		
	}
</script>

<style scoped>
	.chat ::v-deep .uni-list-item__content-title{
		color: #999;
		font-weight: 500;
	}
	.chat ::v-deep .uni-list-chat__content-title{
		color: var(--color);
		font-weight: 500;
	}
	.slot-content {
		font-size: 28rpx;
		color: $u-content-color;
		padding-left: 30rpx;
		padding: 20rpx 20rpx;
		text-align: center;
	}
</style>
