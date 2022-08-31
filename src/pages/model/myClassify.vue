<template>
	<view class="myClassify" :data-theme='themeType'>
		<u-navbar :is-back="false" title="" :background="themeType=='dark'?{ background: '#1B1C1E' }:{ background: '#ffffff' }"
		:border-bottom="themeType=='dark'?false:true">
			<view class="slot-wrap" style="width: 100%;">
				<view style="width: 100%;padding: 0 30rpx;display: flex;justify-content: space-between;align-items: center;">
					<view class="left" style="display: flex;align-items: center;">
						<u-icon @click="back" name="arrow-left" :color="themeType=='dark'?'#ffffff':'#333333'" size="40"></u-icon>
						<text style="margin: 0 20rpx;color: #000000;font-size: 30rpx;font-weight: bold;" class="sy_title_deep">{{classifyName}}</text>
						<u-tag :text="tips" :type="status" size="mini"/>
					</view>	
					<view class="center" @click="setting(classifyInfor)">
						<uni-icons type="gear" size="22" :color="themeType=='dark'?'#fff':'#333333'"></uni-icons>
					</view>
				</view>
			</view>
		</u-navbar>
		<view class="" style="padding: 0 30rpx;">
			<modellist v-for="(item,index) in classifyData" :key='item.id' :items='item' :MyModel='0'/>
		</view>
		<view class="bottomTip">
			<load-more :loadtext='loadtextAll'></load-more>
		</view>
	</view>
</template>

<script>
	import modellist from '@/components/model/modellist.vue'
	import {getMyclassify} from '@/utill/api/model/getModel.js'
	import {onLoad,onReachBottom} from '@dcloudio/uni-app'
	import {reactive,toRefs,ref,getCurrentInstance} from 'vue'
	export default{
		components:{
			modellist,
		},
		setup(){
			const { proxy } = getCurrentInstance(); 
			let state=reactive({
				classifyData:[],
				classifyName:'分类名称',
				tips:'',//是否公开
				status:'info',
				classifyId:'',//分类的id
				loadtextAll:'',//底部提示,
				page:1,
				totalPage:null,//所有页面
			})
			let classifyInfor=ref({})//分类的相关信息
			const back=()=>{
				uni.navigateBack({
					delta:1
				})
			}
			const setting=(data)=>{
				// #ifndef H5
				console.log(data)
				uni.navigateTo({
					url:'/pages/model/setting?&data='+encodeURIComponent(JSON.stringify(data)),
					events:{
						editModel:function(emitData){
							console.log(emitData)
							//更新数据，修改了下载或者公开,或者分类名称了
							classifyInfor.value={//修改从model过来的数据
								share:emitData.share,
								downloadBoolean:emitData.downloadBoolean,
								modelLibTypeName:emitData.modelLibTypeName,//模型分类名称	
								id:emitData.id//模型分类id
							}
							console.log(classifyInfor.value)
							if(emitData.share){
								state.tips='公开'
								state.status='success'
							}else{
								state.tips='未公开'
								state.status='info'
							}
							state.classifyName=emitData.modelLibTypeName
						}
					},
				})
				// #endif
				// #ifdef H5
				uni.showToast({
					title:'网页端不能操作',
					icon:'none'
				})
				// #endif
			}
			const getData=(page)=>{
				getMyclassify({
					pageNum:page,
					pageSize:5,
					modelCategory:state.classifyId
				}).then(res=>{
					// console.log(res)
					if(res.data.code==0){
						state.classifyData=[...state.classifyData,...res.data.object.list]
						// console.log(state.classifyData.length)
						state.totalPage=res.data.object.pages
						state.page++
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
				classifyInfor.value=JSON.parse(decodeURIComponent(options.data))
				console.log(classifyInfor.value)
				state.classifyName=classifyInfor.value.modelLibTypeName
				state.classifyId=classifyInfor.value.id
				if(classifyInfor.value.share){
					state.tips='公开'
					state.status='success'
				}else{
					state.tips='未公开'
					state.status='info'
				}
				getData(1)
			})
			onReachBottom(()=>{
				console.log(state.page)
				console.log(state.totalPage)
				if(state.page > state.totalPage) return state.loadtextAll = 'nomore';
				state.loadtextAll = 'loading';
				getData(state.page)
			})
			return {
				...toRefs(state),
				classifyInfor,
				back,
				setting
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		/* #ifdef H5 */
		height: 100%;
		/* #endif */
	}
	.myClassify{
		width: 100%;
		/* #ifdef H5 */
		min-height: 100%;
		/* #endif */
		/* #ifndef H5 */
		min-height: 100vh;
		/* #endif */
	}
	.bottomTip{
		color: #86B0D4;
		text-align: center;
		margin: 10rpx 0;
		font-size: 28rpx;
	}
</style>
