<template>
	<view class="allGroup" :data-theme='themeType'>
		<u-navbar class="navBar" :is-back="false"  title="" title-color="#000000" 
		:background="themeType=='dark'?{backgroundColor:'#3A3A3A'}:background"
		:border-bottom="themeType=='dark'?false:true">
			<view class="slot-wrap">
				<uni-icons type="arrowleft" size="22" :color="themeType=='dark'?'#8f8f8f':'#333333'" @click="back"></uni-icons>
				<text class="sy_title_primary">{{groupName||'未填写'}}</text>
				<view class="icon">
					<view class="scan" @click="scan">
						<uni-icons type="scan" size="22" :color="themeType=='dark'?'#8f8f8f':'#333333'"></uni-icons>
					</view>
				</view>
			</view> 
		</u-navbar>
		<view class="tip sy_title_primary">
			<text>可通过点击下方按钮或者右上角“扫一扫”添加设备。</text>
		</view>
		<view class="deviceList">
			<view class="wrap sy_block" style="" v-for="(item,index) in devicesData" :key='index'>
				<view class="item sy_title_primary" style="display: flex;">
					<text class="item_name">设备名称：</text>
					<text class="device_status">{{item.deviceName}}</text>
				</view>
				<view class="item sy_title_primary">
					<text class="item_name">设备类型：</text>
					<text>{{item.deviceIdentity}}</text>
				</view>
				<view class="item sy_title_primary" style="display: flex;">
					<text class="item_name">设备标识：</text>
					<text class="device_status">{{item.deviceMark}}</text>
				</view>
				<view class="item sy_title_primary">
					<text class="item_name">设备状态：</text>
					<text :style="{color:statusColor}">{{changeStatus(item.deviceStatus)}}</text>
				</view>
				<view class="item sy_title_primary">
					<text class="item_name">绑定时间：</text>
					<text>{{timeStamp(item.bindingTime)}}</text>
				</view>
				<view class="item sy_title_primary">
					<text class="item_name">设备权限：</text>
					<text v-if="item.deviceControl" :class="item.deviceControl?'gap':''"> 操作权 </text>
					<text v-if="item.deviceRead"> 查看权 </text>
					<text v-if="!item.deviceRead&&!item.deviceControl"> 未进行权限操作 </text>
				</view>
				<view class="operation sy_border_top ">
					<text @click="deleteDevice(item.id)">删除</text>
					<text class="sy_title_primary">|</text>
					<text @click="editDevice(item.id)" class="sy_title_primary">编辑</text>
				</view>
			</view>
		</view>
		<view class="btn">
			<button class="button" type="default" @click="addDevice">添加设备</button>
		</view>
		<!-- 删除设备模态框 -->
		<u-modal v-model="delshow" class="editModal" confirm-color='#FD3130' negative-top='140rpx' :show-title='false' :show-cancel-button='true' @cancel="delcancel" @confirm="delconfirm" ref="uModal">
			<view class="slot-content">
				<text>确定删除该设备</text>
			</view>
		</u-modal>
		<!-- 编辑模态框 -->
		<u-modal v-model="editshow" class="editModal" width='720' confirm-color='#69CDFF' negative-top='140rpx' :show-title='false' :show-cancel-button='true' @cancel="editcancel" @confirm="editconfirm" ref="uModal">
			<view class="slot-content">
				<view class="content">
					<view class="device">
						<view class="label">
							<text>设备名称：</text>
						</view>
						<u-input v-model="deviceName" placeholder-style='#8F8F8F' placeholder='' 
						:type="type" :border="border" :height="height" :auto-height="autoHeight" />
					</view>
					<!-- 设备分组 -->
					<view class="device">
						<view class="label">
							<text>设备分组：</text>
						</view>
						<view class="type" @click="selectGroups">
							<text>{{groupsName}}</text>
							<uni-icons :type="typeicon"></uni-icons>
						</view>
					</view>
					<view class="device">
						<view class="label">
							<text>设备类型：</text>
						</view>
						<view class="type" @click="selectType">
							<text>{{deviceIdentity}}</text>
							<uni-icons :type="typeicon"></uni-icons>
						</view>
					</view>
					<view class="device">
						<view class="label">
							<text>设备标识 (设备号)：</text>
						</view>
						<u-input :disabled=true v-model="deviceMark" placeholder='' :type="type" :border="border" :height="height" :auto-height="autoHeight" />
					</view>
					<view class="device">
						<view class="label">
							<text>设备权限：</text>
						</view>
						<u-checkbox 
							style="margin-right: 20rpx;"
							@change="selectread" 
							v-model="checkread" 
							shape="circle"
							active-color="#69CDFF"
						>查看权</u-checkbox>
						<u-checkbox
							@change="selectoperate" 
							v-model="checkoperate" 
							shape="circle"
							active-color="#69CDFF"
						>操作权</u-checkbox>
					</view>
				</view>	
			</view>
		</u-modal>
		<u-select v-model="show" title='选择设备类型'  mode="single-column"  @confirm="confirmType" :list="list" cancel-color='#000000' confirm-color='#000000'></u-select>
		<u-select v-model="groupsshow" title='选择分组名称' value-name='id' label-name='name'  mode="single-column" @confirm="confirmGroups" :list="listgroups" cancel-color='#000000' confirm-color='#000000'></u-select>
	</view>
</template>

<script>
	import {deleteDevice} from './api/deleteDevice.js'
	import {getgroupDevice} from './api/getgroupDevice.js'
	import {editDevice} from '@/utill/api/DeviceGroup/editDevice.js'
	import {querydevice} from '@/utill/api/DeviceGroup/querydevice.js'
	export default{
		data(){
			return{
				name:'查看权',
				background: {
					backgroundColor: '#ffffff',
				},
				groupName:'',
				devicesData:[],
				groupId:'',//设备的分组id
				deviceId:'',//设别的id
				delshow:false,//删除设备
				editshow:false,//修改设备
				deviceName:'',//名称
				groupsName:'',//编辑的分组名
				deviceIdentity:'',//类型
				deviceMark:'',//标识
				checkread:false,
				checkoperate:false,
				// input 输入
				type: 'textarea',
				border: true,
				height: 56,
				autoHeight: true,
				typeicon:'arrowdown',
				show:false,//设备类型
				list: [//设备类型数据
					{
						value: '1',
						label: 'MR'
					},
					{
						value: '2',
						label: 'VR'
					},
					{
						value: '3',
						label: 'AR'
					}
				],
				// 分组数据
				groupsshow:false,
				listgroups:[],//分组名称列表
				groupsId:'',
				statusColor:'#000',//设备状态是否在线样式
			}
		},
		methods:{
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			// 扫码
			scan(){	
				var _this=this
				uni.scanCode({
					success(e) {	
						uni.navigateTo({
							url:'/pages/deviceManage/addDevice?deviceCode='+e.result+'&groupId='+_this.groupId+'&groupsName='+_this.groupName+'&scan='+'scan',
							animationType:'pop-in'
						})	
					},
					fail(err) {
						uni.showToast({
							title:err,
							icon:'none',
							duration:2000
						})
					}
				})
			},
			// 删除设备
			deleteDevice(id){
				this.delshow=true
				this.deviceId=id
			},
			// 删除确定
			delconfirm(){
				deleteDevice({
					deviceId:this.deviceId,//设备id
					groupId:this.groupId//该设备组别id
				}).then(res=>{
					console.log(res)
					// 删除完之后,在渲染该分组里的数据
					if(res.data.code==0){
						this.getDeviceData(this.groupId)
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
			// 删除设别取消
			delcancel(){},
			selectread(e){
				this.checkread=e.value
				// console.log(this.checkread)
			},
			selectoperate(e){
				this.checkoperate=e.value
				// console.log(this.checkoperate)
			},
			// 选择分组数据
			selectGroups(){
				querydevice({}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						this.listgroups=res.data.object
						this.groupsshow=true
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
			// 确定分组
			confirmGroups(e){
				console.log(e)
				this.groupsId=e[0].value
				this.groupsName=e[0].label
			},
			// 选择类型
			selectType(){
				this.show=true
			},
			// 确认设备类型
			confirmType(e){
				console.log(e)
				this.deviceIdentity=e[0].label
			},
			// 编辑
			editDevice(id){
				this.editshow=true
				this.deviceId=id
				this.devicesData.filter((item)=>{
					if(item.id==id){
						this.deviceName=item.deviceName
						this.groupsName=this.groupName
						this.deviceIdentity=item.deviceIdentity
						this.deviceMark=item.deviceMark
						this.checkread=item.deviceRead
						this.checkoperate=item.deviceControl
					}
				})
			},
			editconfirm(){
				editDevice({
					id:this.deviceId,
					deviceName:this.deviceName,//设备名称
					groupId:this.groupsId,//设备组的id
					deviceIdentity:this.deviceIdentity,//设备类型
					deviceRead:this.checkread,// 查看权
					deviceControl:this.checkoperate,//操作权
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						this.getDeviceData(this.groupId)
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
			editcancel(){},
			// 添加（在分组详情中加入设备是不需要加入分组名称的，默认就是该分组名称）
			addDevice(){
				uni.navigateTo({
					// url:'/pages/deviceManage/deviceManage'
					url:'/pages/deviceManage/addDevice?groupsName='+this.groupName+'&groupId='+this.groupId+'&others='+'others'
				})
			},
			getDeviceData(id){
				var timer = setTimeout(function() {
					uni.showLoading({
					  title: '数据加载中...',
					})
				}, 2000)
				getgroupDevice({
					groupId:id
				}).then(res=>{
					console.log(res)
					clearTimeout(timer)
					uni.hideLoading()
					if(res.data.code==0){
						this.devicesData=res.data.object
					}else{
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
			// 设备状态转变
			changeStatus(data){
				if(data==0){
					this.statusColor='#FF5860'
					return '离线'
				}else{
					this.statusColor='#69CDFF'
					return '在线'
				}
			},
		},
		onLoad(option) {
			console.log(option)
			this.groupId=option.groupId
			this.groupsId=option.groupId
			this.groupName=option.Uname
			this.getDeviceData(option.groupId)
		}
	}
</script>

<style scoped>
	page{
		width: 100%;
		height: 100%;
	}
	.allGroup{
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
	.slot-wrap {
		display: flex;
		align-items: center;
		justify-content: space-between;
		/* 如果让slot内容占满整个导航栏的宽度 */
		flex: 1;
		/* 如果让slot内容与导航栏左右有空隙 */
		padding: 0 30rpx;
	}
	.slot-wrap uni-text:nth-child(2){
		color: #000000;
		font-family: PingFang-SC-Bold;
		font-size: 30rpx;
		font-weight: bold;
	}
	/* #ifdef MP-WEIXIN */
	.navBar ::v-deep .u-line-1 {
		display: none!important;
	}
	/* #endif */
	
	.slot-wrap .icon{
		display: flex;
	}
	.tip{
		padding: 30rpx 30rpx;
		color: #000000;
		font-size: 24rpx;
	}
	.deviceList{
		padding: 0 30rpx;
		flex: 1;
		height: 100%;
		overflow: auto;
		-webkit-overflow-scrolling: touch;
	}
	.wrap{
		background-color: #FFFFFF;
		padding: 0 30rpx;
		margin-bottom: 30rpx;
	}
	.wrap .item{
		height: 60rpx;
		line-height: 60rpx;
		color: #000000;
		font-size: 28rpx;
	}
	.gap{
		margin-right: 20rpx;
	}
	.item_name{
		margin-right: 30rpx;
	}
	.device_status{
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		flex: 1;
	}
	.operation{
		display: flex;
		justify-content: space-between;height: 80rpx;line-height:80rpx;
		border-top: 1px solid #EEEEEE;
		color: #999999;
	}
	/* #ifdef MP-WEIXIN */
	.operation text:nth-child(1){
		width: 50%;
		text-align: center;
	}
	.operation text:nth-child(2){
		color: #EEEEEE;
	}
	.operation text:nth-child(3){
		color: #000000;
		width: 50%;
		text-align: center;
	}
	/* #endif */
	.operation uni-text:nth-child(1){
		width: 50%;
		text-align: center;
	}
	.operation uni-text:nth-child(2){
		color: #EEEEEE;
	}
	.operation uni-text:nth-child(3){
		color: #000000;
		width: 50%;
		text-align: center;
	}
	.btn{
		padding: 20rpx 30rpx;
		width: 100%;
	}
	.btn .button{
		background-color: #69CDFF;
		color: #FFFFFF;
	}
	.slot-content{
		text-align: center;
		padding: 60rpx 0;
	}
	.editModal ::v-deep .u-model__footer__button{
		border-left: 1px solid #F0EFEF!important;
	}
	.content{
		padding-top: 36rpx;
	}
	.device{
		padding: 0 30rpx;
		display: flex;
		align-items: center;
		margin-top: 20rpx;
	}
	.device .label{
		margin-right: 20rpx;
		/* width: 170rpx; */
		display: flex;
		align-items: center;
	}
	.tips{
		margin-right:10rpx;
		color: #86B0D4;
	}
	.type{
		height: 76rpx;
		border: 1px solid #EEEEEE;
		line-height: 76rpx;
		flex: 1;
		display: flex;
		justify-content: space-between;
		padding: 0 20rpx;
		color: #8F8F8F;
	}
	/* #ifndef APP-NVUE */
	.device ::v-deep uni-textarea{
		line-height: 56rpx!important;
	}
	.device ::v-deep .u-input__textarea{
		color: #8F8F8F;
	}
	/* #endif */
	/* #ifdef MP-WEIXIN */
	.device ::v-deep u-input{
		flex: 1;
	}
	/* #endif */
</style>
