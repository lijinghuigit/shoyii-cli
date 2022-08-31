<template>
	<view class="">
		<u-popup v-model="groupshow" mode="bottom" @open="open" @cancel='cancel'>
			<view class="groups">
				<view class="modeltitle">
					<text>选择分组设备</text>
				</view>
				<view class="services" v-for="(item,index) in deviceGroup" :key="item.id" >
					<label class="label" @click="select(item.id,item)">
						<view>{{item.name}}</view>
						<view>
							<radio :checked="item.id===radioId" color='#86B0D4' style="transform:scale(0.7)"/>
						</view>
					</label>
					<uni-transition :mode-class="['zoom-in']" :show="item.id==radioId?true:false">
						<scroll-view scroll-y="true" class="serviceradio">
							<view class="items" v-for="(s_item,s_index) in devices" :key='s_item.id'>
								<view class="servicetitle">
									<text>{{s_item.deviceName}}</text>
									<view>
										<u-checkbox
											size='28rpx'
											label-size='28rpx'
											style="margin-right: 20rpx;"
											@change="selectread($event,s_item,radioId)" 
											v-model="s_item.deviceRead" 
											active-color="#86B0D4"
										>查看权</u-checkbox>
										<u-checkbox
											size='28rpx'
											label-size='28rpx'
											@change="selectoperate($event,s_item,radioId)" 
											v-model="s_item.deviceControl" 
											active-color="#86B0D4"
										>操作权</u-checkbox>
									</view>
								</view>
								<view class="servicetitle type">
									<view class="" style="margin-right: 60rpx;">
										<text>类型：</text>
										<text>{{s_item.deviceIdentity}}</text>
									</view>
									<view class="" style="flex: 1;">
										<text>标识：</text>
										<text>{{s_item.deviceMark}}</text>
									</view>
								</view>
							</view>
						</scroll-view>
					</uni-transition>
				</view>	
				<view class="" style="display: flex;padding: 30rpx 0;border-top: 1px solid #EEEEEE;">
					<text style="flex: 1;text-align: center;" @tap="vrcancel">取消</text>
					<text style="flex: 1;text-align: center;" @tap='vrcanfirm'>确定</text>
				</view>
			</view>
		</u-popup>
	</view>
</template>
<script>
	import {vrGroup} from '@/utill/api/DeviceGroup/vrGroup.js'
	import {editDevice} from '@/utill/api/DeviceGroup/editDevice.js'
	export default{
		data(){
			return{		
				devices:[],//每个分组对应下的设备数据
				radioId:null,//选中的选择框，是否显示该分组下的设备
				groupId:'',//选中的组别id
				readBool:false,
				operateBool:false,
				groupshow:false,
			}
		},
		props:{
			// 设备组的数据
			deviceGroup:{
				type:Array,
				default:()=>{
					return[]
				}
			},
			threeDmodelId:{
				type:String,
				default:''
			},
			threeDmodelName:{
				type:String,
				default:''
			}
		},
		methods:{
			open(){
				this.groupshow=true
			},
			cancel(){
				this.groupshow=false
			},
			// 选择分组
			select(id,item){
				console.log(id)
				this.radioId=id
				this.groupId=id//赋值分组id
				console.log(item.devices)
				if(item.devices){
					this.devices=item.devices
				}else{
					this.devices=[]
				}
			},
			// 查看权的选择
			selectread(e,item,groupId){
				console.log(e.value)//true or false
				console.log(item)//对应的具体某个设备的信息
				console.log(groupId)//分组id
				this.readBool=e.value
				this.amendAuthority(item,groupId,this.readBool,item.deviceControl)
			},
			// 操作权的选择
			selectoperate(e,item,groupId){
				console.log(e.value)
				console.log(item)
				console.log(groupId)
				this.operateBool=e.value
				this.amendAuthority(item,groupId,item.deviceRead,this.operateBool)
			},
			// 权限的修改
			amendAuthority(item,groupId,checkread,checkoperate){
				console.log(item)
				console.log(groupId)
				console.log(checkread)
				console.log(checkoperate)
				this.groupId=groupId
				editDevice({
					id:item.id,
					deviceName:item.deviceName,//设备名称
					groupId:groupId,//设备组的id
					deviceIdentity:item.deviceIdentity,//设备类型
					deviceRead:checkread,// 查看权
					deviceControl:checkoperate,//操作权
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						// this.getDeviceData(this.groupId)
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
			vrcancel(){//父组件传子组件关闭弹窗
				this.groupshow=false
			},
			// 确定是确定选择了某个分组,跟修改该分组的设备权限无关
			vrcanfirm(){
				console.log(this.groupId)
				console.log(this.threeDmodelId)
				console.log(this.threeDmodelName)
				if(!this.groupId){
					uni.showToast({
						title:'设备分组选择不能为空',
						icon:'none'
					})
					return;
				}
				// 设备组选择
				vrGroup({
					groupId:this.groupId,
					majorTableId:this.threeDmodelId,//导板或器械的id
					majorTableName:this.threeDmodelName,//专指模型库
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
						this.groupshow=false
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
	}
</script>

<style scoped lang="scss">
	.groups{
		padding: 40rpx;
		padding-bottom: 0;
		.modeltitle{
			text-align: center;
			color: #000000;
			font-weight: bold;
			font-family: PingFang-SC-Bold;
			font-size: 30rpx;
		}
		.services{
			border-bottom: 1px solid #EEEEEE;
			.label{
				display: flex;
				justify-content: space-between;
				align-items: center;
				line-height: 80rpx;
				font-size: 30rpx;
				color: #000000;
			}
			.serviceradio{
				// padding: 20rpx 0;
				max-height: 600rpx;
				overflow-y: scroll;
				.items{
					padding: 20rpx 0;
				}
				.servicetitle{
					display: flex;
					justify-content: space-between;align-items: center;
					color: #333333;
					font-size: 28rpx;
					line-height: 40rpx;
				}
				.type{
					font-size: 26rpx;
					color: #666666;
				}
			}
			
		}
	}
</style>
