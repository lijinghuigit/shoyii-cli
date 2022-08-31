<template>
	<view class="container" @click.prevent="Noadd" :data-theme='themeType'>
		<u-navbar class="navbar" :is-back="false" title="" :background="themeType=='dark'?{backgroundColor: '#3A3A3A',}:background"
		:border-bottom="themeType=='dark'?false:true">
			<view class="slot-wrap">
				<u-icon name="arrow-left" size='40' color='#999' @click='back'></u-icon>
				<text style="font-size: 32rpx;color: #999;">{{navTitle}}</text>
				<view class="" style="position: relative;">
					<view class="" @click.stop='adds()'>
						<u-icon name="plus-circle" size='40' color='#999'></u-icon>
					</view>
					<view class="angle" v-if="add"></view>
					<view class="addBoolean" v-if="add">
						<view class="list" hover-class="addCover" @click="addFriends">
							<u-icon name="account" class="icon" size="36"></u-icon>
							<text>添加好友</text>
						</view> 
						<view class="list" hover-class="addCover" @click="addGroup">
							<u-icon name="chat-fill" class="icon" size="36"></u-icon>
							<text>添加群聊</text>
						</view>
					</view>
				</view>
			</view>
		</u-navbar>
		<view class="section">
			<view class="" v-if="current==3">
				<chatlist :chatlist='chatlist' @refreshChat='refreshChat'></chatlist>
			</view>
			<view class="" v-if="current==0">
				<chatlist :chatlist='privateList' @refreshChat='refreshChat'></chatlist>
			</view>
			<view class="" v-if="current==1">
				<groupChat :caseGroup='caseGrouplist' :otherGroup='otherGrouplist' @refreshChat='refreshChat'></groupChat>
			</view>
			<view class="" v-if="current==2">
				<address-book :request='request' :addressList='alphaData' :indexList='indexList' @contactrefresh='contactrefresh'></address-book>
			</view>
		</view>
		<view class="footer sy_block">
			<view class="item" style="position: relative;" @click="tabbar(3)" :class="current==3?'selectClass':''">
				<u-badge type="error" count='0'></u-badge>
				<u-icon  size="40" name="chat"></u-icon>
				<text>全部</text>   
			</view>
			<view class="item" style="position: relative;" @click="tabbar(0)" :class="current==0?'selectClass':''">
				<u-badge type="error" :count='privatecount' :offset='privateoffset'></u-badge>
				<text class="iconfont iconsiliao" style="font-size: 40rpx;"></text>
				<text>私聊</text>
			</view>
			<view class="item" style="position: relative;" @click="tabbar(1)" :class="current==1?'selectClass':''">
				<u-badge type="error" :count='publiccount' :offset='publicoffset'></u-badge>
				<text class="iconfont iconqunliao" style="font-size: 40rpx;"></text>
				<text>群聊</text>
			</view>
			<view class="item" style="position: relative;" @click="tabbar(2)" :class="current==2?'selectClass':''">
				<text class="iconfont icontongxunlu1" style="font-size: 40rpx;"></text>
				<text>通讯录</text>
			</view>
		</view>
	</view>
</template>

<script>
	import chatlist from './components/chatlist.vue'
	import addressBook from './components/addressBook.vue'
	import {findchatList,getAddress,getFriendQuest} from '@/utill/api/connect/connect.js'
	import {mapGetters,mapState} from 'vuex'
	import groupChat from './components/groupChat.vue'
	export default{
		components:{
			chatlist,
			addressBook,
			groupChat
		},
		data(){
			return{
				add:false,
				navTitle:'聊天列表',
				current:3,
				background:{
					backgroundColor: '#f8f8f8',
				},
				chatlist:[],
				privateList:[],//私聊数据
				publicList:[],//群聊数据
				addressList:[],
				caseGrouplist:[],//病例群组
				otherGrouplist:[],//自由群组
				privatecount:0,//私聊未读消息
				publiccount:0,//群聊未读消息
				privateoffset:[-3,0],
				publicoffset:[-3,0],
				request:'',
				arr:[],
				indexList:[],//通讯录索引列表
				// pageNum:1,// 聊天列表页数
				// pagelist:[],// 每次查询出的列表总数，用于分页
				// allLoadMore:'more'
			} 
		},
		computed:{
			...mapState({
				socketData:state => state.socket.socketData,
			}),
			alphaData(){
				return this.arr.sort(function(a,b){
					console.log(a['alphaMark'].localeCompare(b['alphaMark']))
				  	return a['alphaMark'].localeCompare(b['alphaMark'])
				}) 
			},
			userId(){
				return this.$store.getters['user/info'].doctorId
			}
		},
		watch:{
			'socketData':{
				handler:function(val) {
					console.log(val)
					if(val=='head'){//心跳回复
					}else if(val.friend_request){//请求的通知
						console.log(val.friend_request)
						this.friendQuest()
					}else{
						var receiveData=val.chatMsgDetail
						console.log(receiveData)
						if(receiveData.groupId){//群聊消息
							this.publicList.forEach(item=>{
								if(item.anotherUserId==receiveData.groupId){
									item.chatMsgDetail.content=receiveData.content
									item.sendTime=receiveData.sendTime
									this.publiccount++;//底部bar
									item.readCount++;//列表处
								}
							})    
						}else{//私聊消息
							this.privateList.forEach(item=>{
								if(item.anotherUserId==receiveData.userId&&item.anotherUserType==receiveData.userType){
									item.chatMsgDetail.content=receiveData.content
									item.sendTime=receiveData.sendTime
									this.privatecount++;//底部bar
									item.readCount++;//列表处
								}
							})
						}
					}
				},
				deep:true
			},
		},
		methods:{
			Noadd(){
				this.add=false
			},
			// 添加好友
			addFriends(){
				uni.navigateTo({
					url:'/pages/shoyiiChat/search'
				})
			},
			// 添加群聊
			addGroup(){
				uni.navigateTo({
					url:'/pages/shoyiiChat/inviteOther'
				})
			},
			friendQuest(){
				getFriendQuest({
					userId:this.userId,
					userType:'D'
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						res.data.object.forEach(item=>{
							if(item.isFriend==0){//有待添加的消息
								this.request++;
							}
						})
						this.request=String(this.request)
						console.log(this.request)
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			back(){//返回首页
				var page =getCurrentPages()[0].route;
				console.log(page)
				if(page){
					uni.switchTab({
						url:'/'+page
					})
				}else{
					uni.switchTab({
						url:'/pages/Tabbar/index'
					})
				}
			},
			// 底部bar切换
			tabbar(index){
				this.current=index
				if(index==0){
					this.navTitle='私聊'
				}else if(index==1){
					this.navTitle='群聊'
				}else if(index==3){
					this.navTitle='全部'
				}else{
					// 获取通讯录
					this.navTitle='通讯录'
				}
			},
			// 查询聊天列表
			findlist(){
				findchatList({
					userType:'D',
					userId:this.userId
				}).then(res=>{
					 console.log(res)
					 if(res.data.code==0){
						 // this.pagelist=res.data.object
						 this.chatlist=res.data.object
						 var privatetotal=0;
						 var publictotal=0;
						 this.publicList=[] //数据清空
						 this.privateList=[]
						 this.caseGrouplist=[]
						 this.otherGrouplist=[]
						 this.chatlist.forEach(item=>{
							 if(item.anotherUserType=="GROUP"){//群组
								if(item.readCount){
									publictotal+=item.readCount
								}
								 this.publicList.push(item)
							 }else{
								 if(item.readCount){
								 	privatetotal+=item.readCount
								 }
								 this.privateList.push(item)
							 }
						 })
						 this.chatlist = this.chatlist.sort(function(a, b) {
						     return b.chatMsgDetail.sendTime - a.chatMsgDetail.sendTime;
						 })
						 this.publicList = this.publicList.sort(function(a, b) {
						     return b.chatMsgDetail.sendTime - a.chatMsgDetail.sendTime;
						 })
						 this.publicList.forEach(item=>{
							  if(item.caseHistoryId){//病例群组
							  	this.caseGrouplist.push(item)
							  }else{//自由群组
							  	this.otherGrouplist.push(item)
							  }
						  })
						 this.privateList = this.privateList.sort(function(a, b) {
						     return b.chatMsgDetail.sendTime - a.chatMsgDetail.sendTime;
						 })
						 this.privatecount=privatetotal
						 this.publiccount=publictotal
						 // 私聊消息未读
						 switch (true){
							 case this.privatecount<=0: //消息全部都已读，修改状态
								//首页聊天入口处消息修改
								this.$store.commit('socket/connectData',false)
							 break;
							 case this.privatecount<10:
								this.privateoffset=[-3,0]
							 break;
							 case 10 <= this.privatecount < 99:
								this.privateoffset=[-3,-5]
							 break;
							 default:
								this.privateoffset=[-3,-10]
							 break;
						 }
						 // 群聊消息未读
						 switch (true){
							 case this.publiccount<=0: //消息全部都已读，修改状态
								//首页聊天入口处消息修改
								// this.$store.commit('socket/connectData',false)
							 break;
							 case this.publiccount<10:
								this.publicoffset=[-3,0] 
							 break;
							 case 10 <= this.publiccount < 99:
								this.publicoffset=[-3,-5]
							 break;
							 default:
								this.publicoffset=[-5,-10]
							 break;
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
			// 转换通讯录数据格式
			checkSameData(resData){
				let dataInfo = {};
				resData.forEach((item, index) => {
					let { alphaMark } = item;
					if (!dataInfo[alphaMark]) {
						dataInfo[alphaMark] = {
							alphaMark,			
							child: []
						}
					}
					dataInfo[alphaMark].child.push(item);
				});
				console.log(dataInfo)
				let list = Object.values(dataInfo); // list 转换成功的数据
				this.arr=list
				list.forEach(item=>{
					return this.indexList.push(item.alphaMark)
				})
			},
			// 查询通讯录
			getaddressList(){
				// var timer = setTimeout(function() {
				// 	uni.showLoading({
				// 	  title: '数据加载中...',
				// 	})
				// }, 2000)
				getAddress({
					userId:this.userId,
					groupId:0
				}).then(res=>{
					// if(timer){
					// 	clearTimeout(timer)
					// 	uni.hideLoading()
					// }
					console.log(res)
					if(res.data.code==0){
						if(res.data.object.length==0){
							console.log('列表为空')
						}else{
							this.addressList=res.data.object
							// 转换数据格式
							this.checkSameData(this.addressList)
						}
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
					}
				}).catch(err=>{
					// if(timer){
					// 	clearTimeout(timer)
					// 	uni.hideLoading()
					// }
					console.log(err)
				})
			},
			adds(){
				this.add=!this.add
			},
			// 删除联系人之后,数据刷新
			contactrefresh(){
				this.getaddressList()//通讯录数据
				this.friendQuest()//好友请求刷新
				this.findlist()//聊天列表更新
			},
			// 删除聊天列表之后,数据刷新
			refreshChat(){
				this.findlist()
			},
		},
		onShow(){
			// 获取聊天列表
			this.findlist()
		}, 
		onLoad() {
			// 获取通讯录
			this.getaddressList()
			// 查询请求
			this.friendQuest()
		},
		// 监听手机上的物理返回键
		// #ifdef APP-PLUS
		onBackPress(e){
			var page =getCurrentPages()[0].route;
			uni.switchTab({
				url:'/'+page
			})
			return true
		},
		// #endif	 
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height: 100%;
		background-color: #fff;
	}
	.slot-wrap{
		width: 100%;
		padding: 0 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.container{
		width: 100%;
		/* #ifdef H5 */
		height:100%;
		/* #endif */
		/* #ifndef H5 */
		height: 100vh;
		/* #endif */
		display: flex;
		flex-direction: column;
	}
	.section{
		flex: 1;
		height: 100%;
		overflow: auto;
	}
	.footer{
		display: flex;
		justify-content: space-around;
		background-color: #FFFFFF;
		.selectClass{
			color: #7DCCEC;
		}
		.item{
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 10rpx 20rpx;
		}
	}
	/* #ifdef MP-WEIXIN */
	.navbar ::v-deep .u-line-1{
		display: none!important;
	}
	/* #endif */
	
	.angle{
		position: absolute;right: 0;top: 70rpx;width: 0;height: 0;border-right:10px solid transparent;
		border-left:10px solid transparent;
		border-bottom:10px solid #000;opacity: .5;
	}
	.addBoolean{
		font-size: 30rpx;z-index: 10;width: 300rpx;position: absolute;top:88rpx;right:0;
		padding: 0rpx;background-color: #000000;opacity: .5;
		.list{
			text-align: center;padding: 30rpx 40rpx;color: #FFFFFF;
			border-bottom: 1px solid #8F8F8F;
			letter-spacing: 2px;
			.icon{
				margin-right: 30rpx;
			}
		}
		.addCover{
			background-color: #8F8F8F;
		}
	}
</style>
