<template>
	<view :data-theme='themeType' class="addContainer">
		<u-navbar back-icon-name='close'  back-icon-size='36' :is-back='true' title="添加设备" 
		:back-icon-color="themeType=='dark'?'#ffffff':'#000000'"
		:title-color="themeType=='dark'?'#ffffff':'#000000'" back-icon-color=''
		:background="themeType=='dark'?{backgroundColor:'#000'}:{backgroundColor:'#ffffff'}"
		:border-bottom="themeType=='dark'?false:true">
		</u-navbar>
		<view class="content">
			<view class="device">
				<view class="label sy_title_primary">
					<text class="tip" style="margin-right: 20rpx;"></text>
					<text>设备名称：</text>
				</view>
				<u-input v-model="deviceName" placeholder='最多输入六个字符' :type="type" maxlength='6' 
				:custom-style="themeType=='dark'?{color:'#8f8f8f'}:{color:'#000'}"	
				:border="border" :height="height" :auto-height="autoHeight" />
			</view>
			<!-- 设备分组 -->
			<view class="device">
				<view class="label sy_title_primary">
					<text class="tip">*</text>
					<text>设备分组：</text>
				</view>
				<view class="type" @click="selectGroups">
					<text :style="{color:groupsNamecolor}" class="sy_title_primary">{{groupsName}}</text>
					<uni-icons :type="typeicon" class="sy_title_primary"></uni-icons>
				</view>
			</view>
			<view class="device">
				<view class="label sy_title_primary">
					<text class="tip">*</text>
					<text >设备类型：</text>
				</view>
				<view class="type" @click="selectType">
					<text :style="{color:deviceTypecolor}" class="sy_title_primary">{{deviceType}}</text>
					<uni-icons :type="typeicon" class='sy_title_primary'></uni-icons>
				</view> 
			</view>
			<view class="device">
				<view class="label sy_title_primary">
					<text class="tip">*</text>
					<text>设备标识 (设备号)：</text>
				</view>
				<u-input v-model="deviceMark" placeholder='输入设备号' :type="type" :border="border" :height="height" 
				:custom-style="themeType=='dark'?{color:'#8f8f8f'}:{color:'#000'}" :auto-height="autoHeight" />
			</view>
			<view class="device" style="align-items: flex-start;">
				<view class="label sy_title_primary">
					<text class="tip" style="margin-right: 20rpx;"></text>
					<text>设备权限：</text>
				</view>
				<u-checkbox-group :wrap='true' style="flex: 1;">
					<u-checkbox 
						shape="square"
						active-color='#69CDFF'
						@change="checkboxChange" 
						v-model="item.checked" 
						v-for="(item, index) in operation" :key="index" 
						:name="item.name"
					>{{item.name}}</u-checkbox>
				</u-checkbox-group>
			</view>
		</view>	
		<view class="btn sy_block">
			<button type="default" @click="sure">确定</button>
		</view>
		<u-select v-model="show" title='选择设备类型'  mode="single-column" @confirm="confirm" :list="list" cancel-color='#000000' confirm-color='#000000'></u-select>
		<u-select v-model="groupsshow" title='选择分组名称' value-name='id' label-name='name' @confirm="confirmGroups" mode="single-column" :list="listgroups" cancel-color='#000000' confirm-color='#000000'></u-select>
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
				type: 'text',
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
				operateBoolean:false,
				groupsNamecolor:'#8F8F8F',
				deviceTypecolor:'#8F8F8F'
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
			// 确定分组
			confirmGroups(e){
				console.log(e)
				this.groupsId=e[0].value
				this.groupsName=e[0].label
				this.groupsNamecolor='#000000'
			},
			// 选择设备类型
			selectType(){
				this.show=true
			},
			// 确认设备类型
			confirm(e){
				console.log(e)
				this.deviceType=e[0].label
				this.deviceTypecolor='#000000'
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
				if(options.scan){//扫码过来的数据(scan作为标识，避免与其他页面数据过来冲突)
					this.deviceMark=options.deviceCode
					this.groupsName=options.groupsName
					this.groupsId=options.groupId
				}
				if(options.others){//标识others,表示从设备分组中过来的数据，与扫码区分
					this.groupsName=options.groupsName
					this.groupsId=options.groupId
				}
			}
			this.getGroupsName()
		}
	}
</script>

<style scoped>
	page{
		background-color: #FFFFFF;
		/* #ifdef H5 */
		height: 100%;
		/* #endif */
	}
	.addContainer{
		width: 100%;
		/* #ifdef H5 */
		min-height: 100%;
		/* #endif */
		/* #ifndef H5 */
		min-height: 100vh;
		/* #endif */
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
		color: #000000;
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
		background-color: #69CDFF;
		color: #FFFFFF;
	}
	/* #ifdef MP-WEIXIN */
	.btn button{
		background-color: #69CDFF;
		color: #FFFFFF;
	}
	/* #endif */
	/* #ifndef APP-NVUE */
	.device ::v-deep .u-input__textarea{
		line-height: 56rpx;
	}
	.device ::v-deep .u-input--border{
		border-color:#EEEEEE!important;
	}
	/* #endif */
	
	
</style>
