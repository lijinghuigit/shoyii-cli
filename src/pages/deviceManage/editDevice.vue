<template>
	<view>
		<u-navbar back-icon-name='close' :is-back='true' title="修改设备" title-color='#000000' back-icon-color=''>
		</u-navbar>
		<view class="content">
			<view class="device">
				<view class="label">
					<text class="tip" style="margin-right: 20rpx;"></text>
					<text>设备名称：</text>
				</view>
				<u-input v-model="deviceName" placeholder='' :type="type" :border="border" :height="height" :auto-height="autoHeight" />
			</view>
			<!-- 设备分组 -->
			<view class="device">
				<view class="label">
					<text class="tip">*</text>
					<text>设备分组：</text>
				</view>
				<view class="type" @click="selectGroups">
					<text>{{groupsName}}</text>
					<uni-icons :type="typeicon"></uni-icons>
				</view>
			</view>
			<view class="device">
				<view class="label">
					<text class="tip">*</text>
					<text>设备类型：</text>
				</view>
				<view class="type" @click="selectType">
					<text>{{deviceType}}</text>
					<uni-icons :type="typeicon"></uni-icons>
				</view>
			</view>
			<view class="device">
				<view class="label">
					<text class="tip">*</text>
					<text>设备标识 (设备号)：</text>
				</view>
				<u-input v-model="deviceMark" placeholder='' :type="type" :border="border" :height="height" :auto-height="autoHeight" />
			</view>
			<view class="device">
				<view class="label">
					<text class="tip">*</text>
					<text>设备权限：</text>
				</view>
				<u-checkbox-group>
					<u-checkbox 
						shape="circle"
						active-color='#86B0D4'
						@change="checkboxChange" 
						v-model="item.checked" 
						v-for="(item, index) in operation" :key="index" 
						:name="item.name"
					>{{item.name}}</u-checkbox>
				</u-checkbox-group>
			</view>
		</view>	
		<view class="btn">
			<button type="default" @click="sure">确定</button>
		</view>
		<u-select v-model="show" title='选择设备类型'  mode="single-column" @cancel='cancel'  @confirm="confirm" :list="list" cancel-color='#000000' confirm-color='#000000'></u-select>
		<u-select v-model="groupsshow" title='选择分组名称' value-name='id' label-name='name'  mode="single-column" @cancel='cancelGroups'  @confirm="confirmGroups" :list="listgroups" cancel-color='#000000' confirm-color='#000000'></u-select>
	</view>
</template>

<script>
	import {querydevice} from '@/utill/api/DeviceGroup/querydevice.js'
	import {addDevice} from './api/addDevice.js'
	export default {
		data() {
			return {
				deviceName:'',
				deviceMark:'',
				groupsName:'选择分组名称',//分组名称
				deviceType:"选择设备类型",
				type: 'textarea',
				border: true,
				height: 56,
				autoHeight: true,
				show:false,//设备类型的select
				groupsshow:false,//分组名称的select
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
				listgroups:[],//分组名称列表
				groupsId:'',//分组名称的id
				typeicon:'arrowdown',
				operation: [//设备权限
					{
						name: '查看权',
						checked: false,
						disabled: false
					},
					{
						name: '操作权',
						checked: false,
						disabled: false
					},
				],
				checkBoolean:false,
				operateBoolean:false
			}
		},
		methods: {
			// 选中某个复选框时，由checkbox时触发
			checkboxChange(e) {
				console.log(e);
				if(e.name=='查看权'){
					this.checkBoolean=e.value
				}
				if(e.name=='操作权'){
					this.operateBoolean=e.value
				}
			},
			// 查询分组名称
			getGroupsName(){
				querydevice({}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						this.listgroups=res.data.object
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
			// 选择设备分组
			selectGroups(){
				this.groupsshow=true
			},
			// 取消分组
			cancelGroups(){},
			// 确定分组
			confirmGroups(e){
				console.log(e)
				this.groupsId=e[0].value
				this.groupsName=e[0].label
			},
			// 选择设备类型
			selectType(){
				this.show=true
			},
			// 确认设备类型
			confirm(e){
				console.log(e)
				this.deviceType=e[0].label
			},
			// 取消设备选择类型
			cancel(e){
				console.log(e)
			},
			// 添加设备确定
			sure(){
				console.log(this.checkBoolean)
				console.log(this.operateBoolean)
				if(this.deviceType=='选择设备类型'){
					uni.showToast({
						title:'设备类型不能为空',
						icon:'none'
					})
					return;
				}
				if(!this.deviceMark){
					uni.showToast({
						title:'设备标识不能为空',
						icon:'none'
					})
					return;
				}
				addDevice({
					deviceName:this.deviceName,//设备名称
					groupId:this.groupsId,//设备组的id
					deviceIdentity:this.deviceType,//设备类型
					deviceMark:this.deviceMark,//设备标识
					deviceRead:this.checkBoolean,// 查看权
					deviceControl:this.operateBoolean,//操作权
				})
				.then(res=>{
					console.log(res)
					if(res.data.code==0){
						uni.navigateTo({
							url:'/pages/deviceManage/deviceManage'
						})
						// 进入该分组的详情里
						// uni.navigateTo({
						// 	url:'/pages/deviceManage/groupDevices?groupId='+this.groupsId+'&Uname='+this.groupsName
						// })
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
					}
				}).catch(err=>{
					console.log(err)
				})
			}
		},
		onLoad(options) {
			// 初始化获取分组名称
			console.log(options)
			if(Object.keys(options).length!=0){
				this.groupsName=options.groupsName
				this.groupsId=options.groupId
			}
			this.getGroupsName()
		}
	}
</script>

<style scoped>
	page{
		background-color: #FFFFFF;
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
		width: 170rpx;
		display: flex;
		align-items: center;
	}
	.tip{
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
	.btn{
		padding: 20rpx 30rpx;
		background-color: #FFFFFF;
		position: fixed;
		bottom: 20rpx;
		width: 100%;
	}
	.btn uni-button{
		background-color: #86B0D4;
		color: #FFFFFF;
	}
</style>
