<template>
	<view class="container" :data-theme='themeType'>
		<view class="">
			<view class="title sy_title_deep">
				<text>投诉内容(必填)</text>
			</view>
			<view class="content">
				<u-input v-model="content" height='260' type="textarea" :border="true" placeholder='请输入具体的投诉内容'/>
			</view>
		</view>
		<view class="">
			<view class="title sy_title_deep">
				<text>图片证据（必填,最多上传9张）</text>
			</view>
			<view class="content">
				<u-upload :file-list="fileList" :action="action" name='files' @on-remove='onRemove' :header='header' max-count="9" @on-error="onErrors" @on-success="onSuccess" @on-uploaded="onUploaded" upload-text='上传图片'></u-upload>
			</view>
		</view>
		<view class="btn" @click="submit">
			<button style="background-color: #86B0D4;color: #FFFFFF;" type="default">提交</button>
		</view>
	</view>
</template>

<script>
	import {Chatcomplaint,delPicture} from '@/utill/api/connect/connect.js'
	export default{
		data(){
			return{
				content:'',
				action:this.$uploadUrl+'/cosFile/uploadImages',//上传图片接口
				fileList:[],
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
				delPicture({
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
				if(!this.pictrueId){
					uni.showToast({
						title:'图片不能为空',
						icon:'none'
					})
					return;
				}
				// 上传数据
				Chatcomplaint({
					content:this.content,
					msgDetailId:'',
					imgFileId:this.pictrueId.toString(),
					type:'0'
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
			console.log(options.id)
		},
		onReady() {
			this.amendNavigator()
		}
	}
</script>

<style scoped>
	page{
		/* #ifdef H5 */
		height: 100%;
		/* #endif */
	}
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
