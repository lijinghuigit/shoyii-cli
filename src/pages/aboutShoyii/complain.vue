<template>
	<view class="container" :data-theme='themeType'>
		<view class="">
			<view class="title sy_title_primary">
				<text>问题与意见反馈</text>
			</view>
			<view class="content">
				<u-input v-model="content" height='260' type="textarea" :border="true" placeholder='请输入10字以上问题与意见描述'
				:custom-style="themeType=='dark'?{color:'#8f8f8f'}:{color:'#000'}"/>
			</view>
		</view>
		<view class="">
			<view class="title sy_title_primary">
				<text>图片（选填）</text>
			</view>
			<view class="content">
				<u-upload :file-list="fileList" :action="action" name='files' @on-remove='onRemove' :header='header' max-count="3" @on-error="onErrors" @on-success="onSuccess" @on-uploaded="onUploaded" upload-text='上传图片'></u-upload>
			</view>
		</view>
		<view class="">
			<view class="title sy_title_primary">
				<text>联系电话（选填）</text>
			</view>
			<view class="content">
				<u-input v-model="telephone" type="textarea" :border="true" placeholder='请填写您的联系电话'
				:custom-style="themeType=='dark'?{color:'#8f8f8f'}:{color:'#000'}"/>
			</view>
		</view>
		<view class="btn" @click="submit">
			<button style="background-color: #86B0D4;color: #FFFFFF;" type="default">提交</button>
		</view>
	</view> 
</template>

<script>
	import {doctorScan} from '@/utill/api/login/doctorScan.js'
	import {feedback} from './api/feedback.js'
	import {delOrderPicture} from '@/utill/api/order/order.js'
	import {getInfor} from '@/utill/api/personalInfor/getInfor.js'
	export default{ 
		data(){
			return{
				content:'',
				telephone:'',
				action:this.$uploadUrl+'/cosFile/uploadImages',
				fileList:[],
				doctorId:'',
				nickName:'',
			}
		},
		computed:{
			header(){
				return {
					"token":this.$store.getters['user/info'].token
				}
			}
		},
		methods:{
			// 回调参数中的lists参数，为目前组件内的所有图片数组，index为当前操作的图片的索引，name为通过props传递的index参数
			onRemove(index, lists, name){
				delOrderPicture({
					id:this.pictrueId[index].toString()
				}).then(res=>{
					console.log(res)
					if(res.data.code!=0){
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
					}
				}).catch(err=>{
					console.log(err)
				})
				this.pictrueId=[]
				lists.forEach(val=>{
					console.log(val)
					this.pictrueId.push(val.response.object[0]) 
				})
				console.log(this.pictrueId)
			},
			onErrors(res, index, lists, name){
				console.log(res)
				uni.showToast({
					title:res.data.msg
				})
			},
			onSuccess(data, index, lists, name){
				// data为服务器返回的数据，name为通过props传递的index参数
				console.log(data)
				console.log(index)
				console.log(lists)
			},
			onUploaded(lists, name){//所有图片上传完毕触发
				// 可以通过此事件，将lists参数获取，提交给后端使用，name为通过props传递的index参数
				console.log(lists)
				this.pictrueId=[]
				lists.forEach(val=>{
					console.log(val)
					this.pictrueId.push(val.response.object[0]) 
				})
				console.log(this.pictrueId)
			},
			submit(){
				if(!this.content){
					uni.showToast({
						title:'请输入问题或意见',
						icon:'none'
					})
					return;
				}
				if(this.pictrueId){
					this.pictrueId=this.pictrueId.toString()
				}else{
					this.pictrueId=''
				}
				feedback({
					userId:this.doctorId,
					person:this.nickName,
					content:this.content,
					picture:this.pictrueId,//字符串形式
					telephone:this.telephone
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						uni.switchTab({
							url:'/pages/Tabbar/mine'
						})
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
					}
				}).catch(err=>{
					console.log(err)
					uni.showToast({
						title:'err',
						icon:'none'
					})
				})
				
			},
			getuserInfor(){
				getInfor({}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						var data=res.data.object
						this.doctorId=data.doctorId
						this.nickName=data.name
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
		onLoad(){
			if(this.$store.getters['user/info'].token){
				this.getuserInfor()
			}
		},
		onReady() {
			this.amendNavigator()
		}
	}
</script>

<style scoped lang="scss">
	.container{
		width: 100%;
		/* #ifdef H5 */
		min-height: 100%;
		/* #endif */
		/* #ifndef H5 */
		min-height: 100vh;
		/* #endif */
	}
	.title{
		color: #333333;
		font-size: 28rpx;
		padding: 30rpx 30rpx;
	}
	.content{
		background-color: #FFFFFF;
	}
	.btn{
		width: 100%;
		position: fixed;
		bottom: 20rpx;
		left: 0;
		right: 0;
		padding: 0 30rpx;
	}
</style>
