<template>
	<view class="">
		<u-popup v-model="surgicalShow" mode="bottom" @open="open" @cancel='cancel'>
			<scroll-view scroll-y="true" class="scrollY sy_block" @scrolltolower='scrolltolower'>
				<view class="title sy_border_bottom" v-for="(item,index) in surgical" :key='index'>
					<view class="label" @click.prevent="enterDetail(item.surgicalPlanId)">
						<surgical-list :Surgicalid="item.surgicalPlanId" :docName='item.doctorName' :time='item.createTime' :imgUrl='filterUrl(item)' :content='item.title' :content_title="item.surgicalPlanName" :doctor='item.doctor'></surgical-list>
						<view @click.stop="select(item.surgicalPlanId)">
							<radio :checked="item.surgicalPlanId==radioId" color='#86B0D4' style="transform:scale(0.7)"/>
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
	import SurgicalList from '@/components/surgical/SurgicalList.vue'
	export default{
		components:{
			SurgicalList
		},
		data(){
			return{
				status:'loadmore',
				surgicalShow:false,
				radioId:null,
			}
		},
		computed:{
			userId(){
				return this.$store.getters['user/info'].doctorId
			}
		},
		props:{
			surgical:{
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
		emits:['addPage','refleshData'],
		methods:{
			filterUrl(data){
				if(data.previewList&&data.previewList.length!=0){
					return data.previewList[0].fileDownloadUrl
				}else{
					return '/static/image/shoyiilogo.png'
				}
			},
			scrolltolower(){//底部
				console.log(this.page)
				console.log(this.total)
				if(this.page > this.total) return this.status = 'nomore';
				this.status = 'loading';
				this.$emit('addPage') //增加1
			},
			select(id){
				console.log(id)
				this.radioId=id
			},
			enterDetail(id){
				uni.navigateTo({
					url:'/pages/surgicalData/surgicalDetail?id='+id
				})
			},
			open(){
				this.surgicalShow=true
			},
			cancel(){
				this.surgicalShow=false
			},
			// 取消发送
			vrcancel(){
				this.surgicalShow=false
			},
			// 发送消息
			vrcanfirm(){
				console.log(this.radioId)
				if(!this.radioId){
					uni.showToast({
						title:'选中方法库',
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
					msgType:'3',
					msgContent:this.radioId
				}
				console.log(msg)
				this.$store.dispatch('socket/WEBSOCKET_SEND',JSON.stringify(msg))
				this.surgicalShow=false
				this.$emit('refleshData') //进行页面的滚动
			}
		}
	}
</script>

<style scoped lang="scss">
	.scrollY{
		overflow: auto;
		max-height: 1000rpx;
		.title{
			padding:20rpx;
			border-bottom: 1px solid #F8F8F8;
			.label{
				display: flex;
				justify-content: space-between;
				align-items: center;
				// line-height: 80rpx;
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
