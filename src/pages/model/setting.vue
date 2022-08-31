<template>
	<view class="settings" :data-theme='themeType'>
		<view class="item sy_block">
			<text style="">分类名称</text>
			<view class="text" @click="editType">
				<text>{{classifyInfor.modelLibTypeName}}</text>
				<uni-icons type="forward" style="margin-left: 20rpx;" class='sy_title_primary'></uni-icons>
			</view>
		</view>
		<view class="item sy_block">
			<text style="">公开分类</text>
			<u-switch v-model="classifyInfor.share" active-color="#53D180" @change='changeShare'></u-switch>
		</view>
		<view class="item sy_block">
			<text style="">允许下载</text>
			<u-switch v-model="classifyInfor.downloadBoolean" active-color="#53D180" @change='changeDownload'></u-switch>
		</view>
		<view>
			<view class="item delete sy_block" @click="deleteType">
				<text style="color: #FF5860;font-size: 24rpx;">删除该分类</text>
			</view>
		</view>
		<!-- 编辑 -->
		<u-modal v-model="editTypeName" :mask-close-able=true width='720' title="修改分类名称" :show-cancel-button='true' confirm-color='#000000' negative-top='140rpx' ref="uModal" @confirm="confirm">
			<view class="" style="padding: 60rpx 30rpx;display: flex;justify-content: space-between;">
				<u-input v-model="classifyName" type="text" :border="true" style="width: 100%;"/>
			</view>
		</u-modal>
		<!-- 删除分类 -->
		<u-modal v-model="deleteshow" content="确定删除该分类" title='删除' confirm-color='#FD3130'
		@confirm='deleconfirm' :mask-close-able="true" show-cancel-button></u-modal>
	</view>
</template>

<script>
	import {onLoad,onReady} from '@dcloudio/uni-app'
	import {reactive,toRefs,getCurrentInstance} from 'vue'
	import {editClassify,deleteClassify,editModelType} from '@/utill/api/model/getModel.js'
	export default{
		 emits:['editModel','editModelData'],
		 setup(){
			const { proxy } = getCurrentInstance(); 
			const state=reactive({
				classifyInfor:{},//分类的相关信息
				editTypeName:false,//修改分类名称的弹窗
				classifyName:'',//分类名称
				deleteshow:false,//删除分类弹窗
			})
			const editType=()=>{
				state.editTypeName=true
			}
			const confirm=()=>{
				if(state.classifyName==state.classifyInfor.modelLibTypeName){
					uni.showToast({
						title:'该名称已经存在',
						icon:'none'
					})
					return
				}
				editModelType({
					ownId:state.classifyInfor.ownId,
					id:state.classifyInfor.id,
					modelLibTypeName:state.classifyName
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						state.classifyInfor.modelLibTypeName=state.classifyName
						proxy.getOpenerEventChannel().emit('editModel',{
							downloadBoolean:state.classifyInfor.downloadBoolean,
							share:state.classifyInfor.share,
							id:state.classifyInfor.id,//模型分类id
							modelLibTypeName:state.classifyName,//模型分类名称	
						})
						uni.$emit('editModelData',{updataBool:true})//触发model列表的数据更新
					}
					uni.showToast({
						title:res.data.msg,
						icon:'none'
					})
					
				}).catch(err=>{
					console.log(err)
				})
			}
			const changeShare=(e)=>{
				edit(state.classifyInfor.downloadBoolean,e)//是否可公开
			}
			const changeDownload=(e)=>{
				edit(e,state.classifyInfor.share)//是否可下载
			}
			const edit=(downloadBoolean,shareBoolean)=>{
				editClassify({
					id:state.classifyInfor.id,//模型分类id	
					modelLibTypeName:state.classifyInfor.modelLibTypeName,//模型分类名称	
					ownId:state.classifyInfor.ownId,//医生id	
					downloadBoolean:downloadBoolean,
					share:shareBoolean
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						proxy.getOpenerEventChannel().emit('editModel',{
							downloadBoolean:downloadBoolean,
							share:shareBoolean,
							id:state.classifyInfor.id,//模型分类id
							modelLibTypeName:state.classifyInfor.modelLibTypeName,//模型分类名称	
						})
						uni.$emit('editModelData',{updataBool:true})//触发model列表的数据更新
					}
					uni.showToast({
						title:res.data.msg,
						icon:'none'
					})
				}).catch(err=>{
					console.log(err)
				})
			}
			const deleteType=()=>{
				state.deleteshow=true
			}
			const deleconfirm=()=>{
				deleteClassify({
					id:state.classifyInfor.id,//模型分类id
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						uni.switchTab({
							url:'/pages/Tabbar/model'
						})
						uni.$emit('editModelData',{updataBool:true})//触发model列表的数据更新
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
			onLoad((options)=>{
				console.log(options)
				// console.log(JSON.parse(decodeURIComponent(options.data)))
				state.classifyInfor=JSON.parse(decodeURIComponent(options.data))
				state.classifyName=state.classifyInfor.modelLibTypeName
			})
			onReady(()=>{
				proxy.amendNavigator()
			})
			return {
				...toRefs(state),
				changeShare,
				changeDownload,
				editType,
				deleteType,
				deleconfirm,
				confirm
			}
			
		 }
		
	}
</script>

<style scoped lang="scss">
	.settings{
		width: 100%;
		/* #ifdef H5 */
		min-height: 100%;
		/* #endif */
		/* #ifndef H5 */
		min-height: 100vh;
		/* #endif */
		padding: 10rpx 30rpx 0;
	}
	.item{
		height: 90rpx;line-height: 90rpx;
		background-color: #FFFFFF;margin-top: 20rpx;padding: 0 20rpx;
		display: flex;align-items: center;justify-content: space-between;color: #000000;font-size: 28rpx;
		.text{
			display: flex;align-items: center;color: #666666;
		}
	}
	.delete{
		justify-content: center;position: fixed;bottom:40rpx;left: 0;right: 0;margin:0 30rpx;
	}
</style>
