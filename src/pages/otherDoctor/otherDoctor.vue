<template>
	<view class="otherdoctor" :data-theme='themeType'>
		<otherDocInfor :doctorInfor='doctorInfor'></otherDocInfor>
		<view class="listMenu">
			<uni-segmented-control :current="current" :values="surgicalitems" @clickItem="onClickItem" style-type="text" active-color="#86B0D4"></uni-segmented-control>
		</view>
		<view class="section">
			<scroll-view style="height: 100%;" scroll-y="true" refresher-enabled='true' refresher-background='#86B0D4' :refresher-threshold='80' :refresher-triggered='triggered' @refresherrefresh='fresh' @refresherrestore='store'>
				<view v-if="current==0">
					<otherDocSurgical :surgicalData='surgicalData'></otherDocSurgical>
				</view>
				<view v-if="current==1">
					<otherDocModel :publicData='publicData'></otherDocModel>
				</view>
			</scroll-view>
		</view>
		<u-no-network></u-no-network>
	</view>
</template>
<script>
	import otherDocInfor from './components/otherDocInfor'
	import otherDocModel from './components/otherDocModel'
	import otherDocSurgical from './components/otherDocSurgical'
	import {getPublicModel} from '@/utill/api/model/getModel.js'
	import {getSurgical} from '@/utill/api/surgical/getSurgical.js'
	import {getOtherInfor} from './api/getOtherDoc.js'
	export default {
		components:{
			otherDocInfor,
			otherDocModel,
			otherDocSurgical,
		},
		data() {
			return {
				doctorInfor:{},
				current: 0,//默认手术方法库
				surgicalitems:['方法库','公开模型'],
				publicData:[],//公开模型数据
				surgicalData:[
					{previewList:[]}
				],//方法库数据
				otherDocId:'',
				triggered:true,//true 表示下拉刷新已经被触发，false 表示下拉刷新未被触发
			}
		},
		methods: {
			onClickItem(e){
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
				if(this.current==0){//方法库
					if(this.surgicalData.length==0){
						this.getSurgicalData(this.otherDocId)
					}
				}else if(this.current==1){//模型库
					if(this.publicData.length==0){
						this.getPublicModel(this.otherDocId)
					}
				}
			},
			getSurgicalData(id){
				console.log(id)
				getSurgical({
					// start:this.page,
					// length:this.size,
					doctorId:id,
				}).then(res=>{
					console.log(res)
					uni.hideLoading()
					if(res.data.code==0){
						this.triggered = false;//刷新关闭
						this.surgicalData=res.data.object.list
					}else if(res.data.code==-1){
						setTimeout(()=>{
							this.triggered = false;//刷新关闭
						},3000)
						uni.showModal({
							title:'未登录',
							content:'用户未登录',
							confirmText:'前去登录',
							success(e){
								console.log(e)
								if(e.confirm){//点击确定
									uni.navigateTo({
										url:'/pages/login/tellogin?pages='+'/pages/Tabbar/surgicalData'+'&pagetype='+1,
										animationType:'pop-in'
									})
								}	
							},
						})
					}
				}).catch(err=>{
					this.triggered = false;//刷新关闭
					console.log(err)
					uni.showToast({
						title:'数据错误',
						icon:'none',
					})
				})
			},
			getPublicModel(id){
				uni.showLoading({
					title:'加载中'
				})
				getPublicModel({
					doctorId:id
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						this.triggered = false;//刷新关闭
						uni.hideLoading()
						this.publicData=res.data.object.list
					}
				}).catch(err=>{
					this.triggered = false;//刷新关闭
					uni.hideLoading()
					uni.showToast({
						title:'err',
						icon:'none'
					})
					console.log(err)
				})
			},
			getOtherDoc(id){
				getOtherInfor({
					doctorId:id
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						this.doctorInfor=res.data.object
					}else{
						
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			fresh(e){//下拉刷新被触发
				if(this.current==0){//方法库
					this.getSurgicalData(this.otherDocId)
				}else if(this.current==1){//模型库
					this.getPublicModel(this.otherDocId)
				}	
			},
			store(e){//下拉刷新被复位
				 this.triggered = 'restore'; // 需要重置
				 console.log("onRestore");
			},
		},
		onLoad(options) {
			console.log(options.doctorId)
			this.otherDocId=options.doctorId
			this.getPublicModel(options.doctorId)
			this.getSurgicalData(options.doctorId)
			this.getOtherDoc(options.doctorId)
		},
		onReady() {
			this.amendNavigator()
		}
	}
</script>

<style scoped lang="scss">
	page{
		width: 100%;
		height: 100%;
	}
	.otherdoctor{
		width: 100%;
		/* #ifdef H5 */
		height: 100%;
		/* #endif */
		/* #ifndef H5 */
		height: 100vh;
		/* #endif */
		display: flex;
		flex-direction: column;
	}
	.listMenu{
		padding: 0 30rpx;
		background-color: #FFFFFF;
	}
	.section{
		padding: 0 30rpx 30rpx;
		overflow: auto;
		flex: 1;
	}
</style>
