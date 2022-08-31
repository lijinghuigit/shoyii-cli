<template>
	<view class="">
		<u-popup v-model="caseShow" mode="bottom" @open="open" @cancel='cancel'>
			<scroll-view scroll-y="true" class="scrollY sy_block" @scrolltolower='scrolltolower'>
				<view class="title sy_border_bottom" v-for="(item,index) in caseList" :key='index'>
					<view class="label" @click.prevent="enterDetail(item.caseHistoryId)">
						<case-list style="width: 100%" :casecode="item.caseHistoryNo" :Uname='item.name' :Caseid=item.caseHistoryId :content='item.title' :imgUrl="item.previewImage?item.previewImage:'/static/image/shoyiilogo.png'"></case-list>
						<view  @click.stop="select(item.caseHistoryId)">
							<radio :checked="item.caseHistoryId==radioId" color='#86B0D4' style="transform:scale(0.7)"/>
						</view>
					</view>					
				</view>
				<u-loadmore :status="status" />
			</scroll-view>
			<view class="sy_block sy_border_top" style="display: flex;padding: 30rpx 0;border-top: 1px solid #EEEEEE;">
				<text style="flex: 1;text-align: center;" @click="vrcancel">取消</text>
				<text style="flex: 1;text-align: center;" @click='vrcanfirm'>发送</text>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {sendMessage} from '@/utill/api/connect/connect.js'
	import CaseList from '@/components/CaseList/CaseList.vue'
	export default{
		components:{
			CaseList
		},
		data(){
			return{
				status:'loadmore',
				caseShow:false,
				radioId:null,
			}
		},
		computed:{
			userId(){
				return this.$store.getters['user/info'].doctorId
			}
		},
		props:{
			caseList:{
				type:Array,
				default:()=>{
					return[]
				}
			},
			otherId:{
				type:String,
				default:''
			},
			page:{
				type:Number,
				default:null
			},
			total:{
				type:Number,
				default:null
			},
			type:{//聊天类型
				type:String,
				default:'D'
			},
			chatId:{
				type:String,
				default:''
			}
		},
		emits:['addcasePage','caserefleshData'],
		methods:{
			scrolltolower(){//底部
				console.log(this.page)
				console.log(this.total)
				if(this.page > this.total) return this.status = 'nomore';
				this.status = 'loading';
				this.$emit('addcasePage') //增加1
			},
			select(id){
				console.log(id)
				this.radioId=id
			},
			enterDetail(id){
				uni.navigateTo({
					url:'/pages/caselist/caselistdetail?id='+id,
					animationType:'pop-in'
				})
			},
			open(){
				this.caseShow=true
			},
			cancel(){
				this.caseShow=false
			},
			// 取消发送
			vrcancel(){
				this.caseShow=false
			},
			// 发送消息
			vrcanfirm(){
				console.log(this.radioId)
				if(!this.radioId){
					uni.showToast({
						title:'选中病例',
						icon:'none'
					})
					return;
				}
				console.log(this.otherId)
				console.log(this.type)
				// 要区分群组还是私聊
				var msg={
					chatId:this.chatId,
					sendUserType:'D',
					sendUserId:this.userId,
					receiveUserType:this.type,
					receiveUserId:this.otherId,
					msgType:'5',//病例
					msgContent:this.radioId
				}
				console.log(msg)
				this.$store.dispatch('socket/WEBSOCKET_SEND',JSON.stringify(msg))
				this.caseShow=false
				this.$emit('caserefleshData') //进行页面的滚动
			}
		}
	}
</script>

<style scoped lang="scss">
	.scrollY{
		overflow: auto;
		max-height: 1000rpx;
		.title{
			padding: 20rpx;
			border-bottom: 1px solid #F8F8F8;
			.label{
				display: flex;
				justify-content: space-between;
				align-items: center;
				line-height: 80rpx;
				font-size: 30rpx;
				color: #000000;
				.surgicalName{
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}
			}
		}
	}
	
</style>
