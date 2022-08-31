<template>
	<view class="group" :data-theme='themeType'>
		<view class="section sy_block" v-if="groupId">
			<view class="tip">
				<text class="sy_title_deep">聊天成员</text>
			</view>
			<view class="member-item" style="">
				<view class="list" @click="enterMember(item.id)" v-for="(item,index) in memberList" :key='index'>
					<view class="image" style="">
						<u-image width="100%" height="80rpx" :src="item.avatarLink" mode="aspectFit">
							<template v-slot:error>
								<view style="">
									<u-image width='80rpx' height='80rpx' src='/static/image/person.png' mode="aspectFit"></u-image>
								</view>
							</template>
						</u-image>
					</view>
					<text class="Membername">{{item.name}}</text>
				</view>
				<!-- 医生不能拉人进群 -->
				<view class="list" @click="addOther" style="" v-if="memberId">
					<u-icon name="plus" size='60' color='#999'></u-icon>
				</view>
			</view>
			<view class="complaint sy_block sy_border_top" :hover-class="themeType=='dark'?'sy_hover_bg':'bgcolor'" @click="complaint">
				<text>投诉</text>
				<u-icon name="arrow-right" size="30"></u-icon>
			</view>
			<view class="complaint sy_block sy_border_top" :hover-class="themeType=='dark'?'sy_hover_bg':'bgcolor'" @click="amendName">
				<text>群聊名称</text>
				<text class="groupName">{{groupName}}</text>
				<u-icon name="arrow-right" size="30"></u-icon>
			</view>
		</view>
		<!-- 私聊的投诉 -->
		<view v-else class="complaint sy_block sy_border_top" :hover-class="themeType=='dark'?'sy_hover_bg':'bgcolor'" @click="complaint">
			<text>投诉</text>
			<u-icon name="arrow-right" size="30"></u-icon>
		</view>
	</view>
</template>

<script>
	import {getGroupMember} from '@/utill/api/connect/connect.js'
	export default{
		data(){
			return{
				memberList:[],
				groupId:'',
				groupName:'',
				memberId:''
			}
		},
		computed:{
			userId(){
				return this.$store.getters['user/info'].doctorId
			}
		},
		methods:{
			// 添加其他人
			addOther(){
				console.log(this.groupId)
				uni.navigateTo({
					url:'/pages/shoyiiChat/inviteOther?groupId='+this.groupId
				})
			},
			// 获取成员
			Getmember(){
				getGroupMember({
					groupId:this.groupId
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						this.memberList=res.data.object.groupNumber
						uni.setNavigationBarTitle({//显示群组名称
							title:res.data.object.name
						})
						this.groupName=res.data.object.name
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
			enterMember(id){
				console.log(id)
			},
			// 投诉
			complaint(){
				if(this.memberId){
					uni.navigateTo({
						url:'/pages/shoyiiChat/complaint?id='+this.memberId
					})
				}else{
					uni.navigateTo({
						url:'/pages/shoyiiChat/complaint?id='+this.groupId
					})
				}
				
			},
			// 修改群聊名称
			amendName(){
				uni.navigateTo({
					url:'/pages/shoyiiChat/amendName?groupName='+this.groupName+'&groupId='+this.groupId
				})
			},
		},
		onLoad(options) {
			console.log(options)
			if(options.groupId){//群组的id
				this.groupId=options.groupId
				this.Getmember()
			}else{//私聊id
				this.memberId=options.memberId
				uni.setNavigationBarTitle({//显示群组名称
					title:options.navTitle
				})
			}
		},
		onReady() {
			this.amendNavigator()
		}
	}
</script>

<style scoped lang="scss">
	page{
		width: 100%;
		height: 100%;
	}
	.group{
		width: 100%;
		/* #ifdef H5 */
		min-height:100%;
		/* #endif */
		/* #ifndef H5 */
		min-height: 100vh;
		/* #endif */
		display: flex;
		flex-direction: column;
		.header{
			padding: 0 30rpx;
		}
	}
	.section{
		flex: 1;
		height: 100%;
		overflow: auto;
		background-color: #FFFFFF;
		.tip{
			padding: 30rpx 30rpx;
			color: #000000;
			font-weight: bold;
			font-size: 36rpx;
		}
		.member-item{
			padding: 0 30rpx 20rpx;
			display: flex;flex-wrap: wrap;justify-content: flex-start;
			.list{
				width: 20%;
				display: flex;flex-direction: column;
				align-items: center;justify-content: center;
				padding: 10rpx 0;
				margin: 10rpx 0;
				.image{
					box-shadow:0 0 5px 1px #efefef ;
					border-radius: 6rpx;
					width: 80rpx;height: 80rpx;
				}
				.Membername{
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					overflow: hidden;
					word-wrap: break-word;
					word-break: break-all;
				}
			}
		}	
	}
	.complaint{
		display: flex;
		justify-content: space-between;
		padding: 30rpx 30rpx;
		font-size: 30rpx;
		border-top:1px solid #f8f8f8;
		background: #FFFFFF;
	}
	.groupName{
		width: 70%;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		color: #8F8F8F;
		text-align: right;
	}
	.bgcolor{
		background-color: #f8f8f8;
	}
</style>
