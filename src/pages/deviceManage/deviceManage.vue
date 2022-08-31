<template>
	<!-- 设备管理 -->
	<view class="device" :data-theme='themeType'>
		<view class="tip" v-if="deviceData.length!=0">
			<text>向左滑动可删除组别</text>
		</view>
		<view class="content">
			<uni-swipe-action class="list">
				<uni-swipe-action-item @click='click($event,item.id)' @change="swipeChange($event, item.id)" :right-options="operations" v-for="(item, index) in deviceData" :key="index">
				   <groups-list class="deviceList" :devices='item.devices' :Uname='item.name' :Deviceid='item.id'></groups-list>
				</uni-swipe-action-item>
			</uni-swipe-action>
		</view>
		<view class="btn">
			<u-button type="primary" class="button addgroup" @click="addGrounps">添加分组</u-button>
			<u-button type="primary" class="button adddevice" @click="addDevice">添加设备</u-button>
		</view>
		<u-modal v-model="delshow" class="editModal" confirm-color='#FD3130' negative-top='140rpx' :show-title='false' :show-cancel-button='true' @cancel="delcancel" @confirm="delconfirm" ref="uModal">
			<view class="slot-content sy_block">
				<text>是否删除该分组</text>
			</view>
		</u-modal>
		<u-modal v-model="addGrounpShow" class="editModal" negative-top='140rpx' confirm-color='#69CDFF' :show-title='false' :show-cancel-button='true' @cancel="grounpCancel" @confirm="grounpConfirm" ref="uModal">
			<view class="slot-content">
				<u-input class="input" height='96' v-model="grounpsName" :type="type" :border="border" placeholder="输入分组名称"/>
			</view>
		</u-modal>
		<u-empty class="empty" text="去添加设备数据" src='/static/svg/model_device.svg' icon-size='200'
		 :show="deviceData.length==0"></u-empty>
		<u-no-network></u-no-network>
	</view>
</template>

<script>
	import {addgroups} from './api/devicegroup.js'
	import {querydevice} from '@/utill/api/DeviceGroup/querydevice.js'
	import {deltegroups} from './api/deltegroups.js'
	export default {
		data() {
			return {
				// 设备数据
				deviceData:[],
				operations:[
					{
						text: '删除',
						style: {
							backgroundColor: '#dd524d',
						}
					},
				],
				delshow:false,//删除分组的模态框
				addGrounpShow:false,//添加分组内容
				grounpsName:'',//分组名称
				type: 'text',
				border:true,
				groupId:'',//分组id
			}
		},
		methods: {
			click(e,id){
				// console.log(e)
				// index为功能键的按钮index
				// console.log(id)//用作删除用
				this.groupId=id
				this.delshow = true;//删除功能键弹出
			},
			swipeChange(e,index){},
			// 添加分组
			addGrounps(){
				this.addGrounpShow=true
			},
			// 添加设备(在分组页面，直接添加设备是要加入分组名称的，groups为标识)
			addDevice(){
				uni.navigateTo({
					url:'/pages/deviceManage/addDevice'
				})
			},
			// 删除分组
			delconfirm(){
				deltegroups({
					groupId:this.groupId
				}).then(res=>{
					console.log(res)
					// 删除完之后,在渲染
					if(res.data.code==0){
						this.getDeviceData()
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
			// 删除取消
			delcancel(){},
			// 新建分组取消
			grounpCancel(){},
			// 获取设备分组及相关信息
			getDeviceData(){
				var timer = setTimeout(function() {
					uni.showLoading({
					  title: '数据加载中...',
					})
				}, 2000)
				querydevice({}).then(res=>{
					console.log(res)
					clearTimeout(timer)
					uni.hideLoading()
					if(res.data.code==0){
						this.deviceData=res.data.object
					}else{
						clearTimeout(timer)
						uni.hideLoading()
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
					}
				}).catch(err=>{
					clearTimeout(timer)
					uni.hideLoading()
					console.log(err)
				})
			},
			// 分组确定(新建分组)
			grounpConfirm(){
				if(!this.grounpsName){
					uni.showToast({
						title:'组名不能为空',
						icon:'none'
					})
					return
				}
				addgroups({
					id:'',
					name:this.grounpsName,
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						this.getDeviceData()
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
		onShow() {
			this.getDeviceData()
		},
		onReady() {
			this.amendNavigator()
		}
	}
</script>

<style lang="scss">
	page{
		background-color: $uni-bg-color-grey;
		width: 100%;
		height: 100%;
	}
	.device{
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		width: 100%;
		/* #ifdef H5 */
		height:100%;
		/* #endif */
		/* #ifndef H5 */
		height: 100vh;
		/* #endif */
		display: flex;
		flex-direction: column;
		.tip{
			color: #8F8F8F;
			font-size: 24rpx;
			padding: 20rpx 30rpx;
		}
		.content{
			flex: 1;
			height: 100%;
			overflow: auto;
			-webkit-overflow-scrolling: touch;
			/* #ifndef MP-WEIXIN */
			.deviceList{
				width: 100%;
				background: #FFFFFF;
				border-radius: 10rpx;
				padding: 30rpx 30rpx;
				border-bottom: 1px solid #F8F8F8;
			}
			/* #endif */
		}
		.btn{
			width: 100%;
			display: flex;
			justify-content: space-around;
			// background-color: #FFFFFF;
			padding: 20rpx 0;
			.button {
				background-color: #69CDFF;
				border-radius: 15rpx;
				width: 40%;
			}
			/* #ifdef MP-WEIXIN */
			.button ::v-deep .u-btn{
				background-color: #69CDFF;
			} 
			.addgroup ::v-deep .u-btn{
				background-color: #FFFFFF;
				color:#69CDFF;
				border: 1px solid #69CDFF;
				border-top-right-radius: 0;
				border-bottom-right-radius: 0;
			} 
			/* #endif */
			.addgroup{
				background-color: #FFFFFF;
				color:#69CDFF;
				border: 1px solid #69CDFF;
			}
		}
		/* #ifndef APP-NVUE */
		.editModal ::v-deep .u-model__footer__button{
			border-left: 1px solid #F0EFEF!important;
		}
		/* #endif */
		.slot-content{
			text-align: center;
			padding: 60rpx 0;
			.input{
				width: 80%;
				margin: 0 auto;
			}
		}
	}
	
</style>
