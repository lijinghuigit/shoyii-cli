<template>
	<view class="amendName" :data-theme='themeType'>
		<view class="title sy_title_deep">
			<text>修改群聊名称</text>
		</view>
		<view class="amend sy_border_bt">
			<image class="image" src="../../static/image/shoyiilogo.png" mode="aspectFit"></image>
			<u-input class="Name" :focus='true' v-model="groupName" maxlength='20' type="text" :border="false" placeholder='' height='80'
			:custom-style="themeType=='dark'?{color:'#8f8f8f'}:{color:'#000'}"/>
		</view>
		<view class="complete">
			<u-button size="medium" :disabled='disabled' :type='type' @click="complete">完成</u-button>
		</view>
	</view>
</template>

<script>
	import {createGroup} from '@/utill/api/connect/connect.js'
	export default {
		data() {
			return {
				fieldStyle:{
					background:'#ffffff'
				},
				groupName:'',
				disabled:true,
				type:'default',
			}
		},
		watch:{
			'groupName':function(val){
				console.log(val)
				console.log(this.groupName)
				if(val==this.originName){
					this.disabled=true
					this.type='default'
				}else{
					this.disabled=false
					this.type='success'
				}
			}
		},
		methods: {
			complete(){
				console.log('dianji')
				console.log(this.groupName)
				var cmsUserGroups={}
				cmsUserGroups.id=this.groupId
				cmsUserGroups.name=this.groupName
				if(!this.groupName){
					uni.showToast({
						title:'名称不能为空',
						icon:'none'
					})
					return;
				}
				console.log(cmsUserGroups)
				createGroup({
					cmsUserGroups:cmsUserGroups,//群组id及name
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						uni.navigateTo({
							url:'/pages/shoyiiChat/index'
						})
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
			this.groupName=options.groupName
			this.originName=options.groupName//用于做监听
			this.groupId=options.groupId
		},
		onReady() {
			this.amendNavigator()
		}
	}
</script>

<style scoped lang="scss">
	page{
		/* #ifdef H5 */
		height: 100%;
		/* #endif */
	}
	.amendName{
		padding: 80rpx 30rpx 20rpx;
		width: 100%;
		/* #ifdef H5 */
		min-height: 100%; 
		/* #endif */
		/* #ifndef H5 */
		min-height: 100vh;
		/* #endif */
		.title{
			font-size:36rpx;
			font-weight: bold;
			text-align: center;
			padding-bottom: 20rpx;
		}
		.amend{
			display: flex;
			justify-content: space-between;
			border: 1px solid #EEEEEE;
			border-left: none;
			border-right: none;
			padding: 10rpx 0;
			.image{
				width: 80rpx;
				height: 80rpx;
				margin-right: 10rpx;
			}
			.Name{
				flex: 1;
			}
		}
		.complete{
			padding: 80rpx 0 0;
			text-align: center;
		}
	}
	
</style>
