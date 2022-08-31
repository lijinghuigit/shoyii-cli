<template>
	<view :data-theme='themeType' class="container">
		<u-navbar :is-back="false" title="" class='navbar'
		:border-bottom="themeType=='dark'?false:true"
		:background="themeType=='dark'?{background: '#3A3A3A'}:{background: '#ffffff'}">
			<view class="slot-wrap" style="width: 100%;">
				<view v-if="searchBool" style="width: 100%;padding: 0 30rpx;display: flex;justify-content: space-between;align-items: center;">
					<view class="left" @click="back">
						<u-icon name="arrow-left" :color="themeType=='dark'?'#8f8f8f':'#333333'" size="40"></u-icon>
					</view>	
					<view class="center sy_tip" style="color: #000000;font-size: 30rpx;font-weight: bold;font-family: PingFang-SC-Bold;">
						<text>公开模型</text>
					</view> 
					<view class="right" @click="searchshow">
						<u-icon name="search" :color="themeType=='dark'?'#8f8f8f':'#333333'" size="40" style="margin-right: 20rpx;"></u-icon>
					</view> 
				</view>  
				<view class="" v-else style="padding: 0 30rpx;">
					<u-search @search='search' @custom='cancelSearch' placeholder="输入模型分类名称" v-model="searchContent" shape="round" 
					:bg-color="themeType=='dark'?'#1B1C1E':'#ffffff'" :border-color="themeType=='dark'?'#3A3A3A':'#EEEEEE'" height='64' 
					:clearabled="true" :show-action="true" action-text="取消" :animation="true"
					:action-style="themeType=='dark'?{color:'#8f8f8f'}:{color:'#000'}"></u-search>
				</view> 
			</view>   
		</u-navbar>
		<view class="sy_block" style="padding: 8rpx 30rpx;background-color: #FFFFFF;margin-bottom: 20rpx;">
			<u-tabs-swiper ref="tabs" @change="tabsChange" :list="modellist" :current="current" 
			:active-item-style="themeType=='dark'?{color:'#ddd',fontSize:'30rpx'}:activeItemStyle"
			:bg-color="themeType=='dark'?'#3A3A3A':'#ffffff'"
			active-color="#69CDFF" :inactive-color="themeType=='dark'?'#8f8f8f':'#333333'" font-size="30" :is-scroll="false"></u-tabs-swiper>
		</view>
		<view class="sections" style="">
			<swiper class="swiper" style="height: 100%;flex: 1;" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<!-- <swiper-item class="swiper-item" style="" v-for="(items,indexs) in publicData" :key='indexs'>
					<scroll-view scroll-y class="scroll-Y" @scrolltolower='scrolltolower(indexs)' style="height: 100%;">
						 <classify-model :publicData='publicData[swiperCurrent].data' :current='indexs'></classify-model>
						 <view class="bottomTip">
						 	<load-more :loadtext='publicData[swiperCurrent].loadtextAll'></load-more>
						 </view>
						 <u-empty class="empty" text="暂无更多数据" mode="list" v-if="publicData[swiperCurrent].show"></u-empty>
					</scroll-view>
				</swiper-item> -->
				<swiper-item class="swiper-item" style="">
					<scroll-view scroll-y class="scroll-Y" @scrolltolower='scrolltolower(0)' style="height: 100%;">
						 <classify-model :publicData='publicData[0].data' :current='0' @refreshEmit='refrshData' @checkModelemit='checkModel'></classify-model>
						 <view class="bottomTip">
						 	<load-more :loadtext='publicData[0].loadtextAll'></load-more>
						 </view>
						 <u-empty class="empty" text="暂无更多数据" mode="list" v-if="publicData[0].show"></u-empty>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item" style="">
					<scroll-view scroll-y class="scroll-Y" @scrolltolower='scrolltolower(1)' style="height: 100%;">
						 <classify-model :publicData='publicData[1].data' :current='1' @refreshEmit='refrshData' @checkModelemit='checkModel'></classify-model>
						 <view class="bottomTip">
						 	<load-more :loadtext='publicData[1].loadtextAll'></load-more>
						 </view>
						 <u-empty class="empty" text="暂无更多数据" mode="list" v-if="publicData[1].show"></u-empty>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item" style="">
					<scroll-view scroll-y class="scroll-Y" @scrolltolower='scrolltolower(2)' style="height: 100%;">
						 <classify-model :publicData='publicData[2].data' :current='2' @refreshEmit='refrshData' @checkModelemit='checkModel'></classify-model>
						 <view class="bottomTip">
						 	<load-more :loadtext='publicData[2].loadtextAll'></load-more>
						 </view>
						 <u-empty class="empty" text="暂无更多数据" mode="list" v-if="publicData[2].show"></u-empty>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item" style="">
					<scroll-view scroll-y class="scroll-Y" @scrolltolower='scrolltolower(3)' style="height: 100%;">
						 <classify-model :publicData='publicData[3].data' :current='3' @refreshEmit='refrshData' @checkModelemit='checkModel'></classify-model>
						 <view class="bottomTip">
						 	<load-more :loadtext='publicData[3].loadtextAll'></load-more>
						 </view>
						  <u-empty class="empty" text="暂无更多数据" mode="list" v-if="publicData[3].show"></u-empty>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<u-no-network></u-no-network>
	</view>
</template>

<script>
	import classifyModel from '@/components/model/classifyModel.vue'
	import {getPublicModel} from '@/utill/api/model/getModel.js'
	export default {
		components:{
			classifyModel
		},
		data() {
			return {
				searchBool:true,
				publicData:[
					{data:[],page:1,Totalpage:null,loadtextAll:'',show:false},
					{data:[],page:1,Totalpage:null,loadtextAll:'',show:false},
					{data:[],page:1,Totalpage:null,loadtextAll:'',show:false},
					{data:[],page:1,Totalpage:null,loadtextAll:'',show:false},
				],
				searchContent:'',
				modellist:[
					{
						name: '全部'
					}, {
						name: '仅观看'
					}, {
						name: '可下载'
					},{
						name: '收藏夹'
					}
				],
				current:0,
				activeItemStyle:{
					color:'#000',
					fontSize:'30rpx'
				},
				swiperCurrent:0
			}
		},
		watch:{
			current(newValue,oldValue){
				console.log(newValue,oldValue)
				if(newValue!==oldValue){
					this.publicData[newValue].page=1
					this.getData(newValue,1)
				}
			}
		},
		methods: {
			checkModel(data){
				uni.navigateTo({
					url:'/pages/publicModel/classifyModel?classifyId='+data.classifyId+'&modelLibTypeName='+data.modelLibTypeName+'&isCollect='+data.collectionFlag+'&isdownload='+data.isdownload+'&current='+data.current,
					events:{
						changeSave:(data)=>{
							console.log(data)
							this.publicData[data.current].page=1
							this.getData(data.current,1)
						}
					}
				})
			},
			refrshData(data){
				console.log(data)
				this.getData(data,1)
			},
			searchshow(){
				this.searchBool=false
			},
			cancelSearch(){
				this.searchBool=true
			},
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			notice(){
				console.log('notice')
			},
			search(){
				if(!this.searchContent){
					uni.showToast({
						title:'搜索内容不能为空',
						icon:'none'
					})
					return
				}
				getPublicModel({
					modelTypeName:this.searchContent
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						if(res.data.object.list.length==0){
							uni.showToast({
								title:'数据为空',
								icon:'none'
							})
						}else{
							this.publicData[0].data=res.data.object.list
						}
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
					}
				}).catch(err=>{
					uni.showToast({
						title:'err',
						icon:'none'
					})
					console.log(err)
				})
			},
			tabsChange(index){
				console.log(index)
				this.swiperCurrent = index;
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.tabs.setDx(dx);
			},
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			scrolltolower(e){
				console.log(e)
				this.publicData[e].loadtextAll=='加载中...'
				if(this.publicData[e].page>=this.publicData[e].Totalpage){
					return 	this.publicData[e].loadtextAll='没有更多数据';
				}
				this.publicData[e].page++
				this.getData(e,this.publicData[e].page,'mark')
			},
			getData(swiperCurrent,page,mark){
				var timer = setTimeout(function() {
					uni.showLoading({
					  title: '数据加载中...',
					})
				}, 2000)
				// 0,全部;1,仅观看;2,可下载;3,收藏夹;
				getPublicModel({
					category:swiperCurrent,
					pageNum:page,
					pageSize:4
				}).then(res=>{
					console.log(res)
					clearTimeout(timer)
					uni.hideLoading()
					if(res.data.code==0){
						if(res.data.object.list.length==0){
							this.publicData[swiperCurrent].show=true
						}else{
							this.publicData[swiperCurrent].show=false
						}
						if(mark){
							this.publicData[swiperCurrent].data=this.publicData[swiperCurrent].data.concat(res.data.object.list)
						}else{
							this.publicData[swiperCurrent].data=res.data.object.list
						}
						this.publicData[swiperCurrent].Totalpage=res.data.object.pages//总页数
					}
				}).catch(err=>{
					clearTimeout(timer)
					uni.hideLoading()
					uni.showToast({
						title:'err',
						icon:'none'
					})
					console.log(err)
				})
			},
		},
		onLoad() {
			this.getData(0,1)
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
	.header_top{
		background-color: #FFFFFF;
		width: 100%;
		z-index: 99999;
	}
	/* #ifndef APP-NVUE */
	.header_top ::v-deep .uni-searchbar__box{
		justify-content: flex-start!important;
	}
	.header_top ::v-deep .uni-searchbar{
		padding-left: 30rpx;
		padding-right: 30rpx;
	}
	/* #ifdef MP-WEIXIN */
	.navbar ::v-deep .u-line-1 {
		display: none!important;
	}
	/* #endif */
	/* #endif */
	
	.sections{
		padding: 0 30rpx;
		margin-top: 20rpx;
		flex: 1;
		/* #ifdef H5 */
			height: calc(100vh - 88rpx - 104rpx);
		/* #endif */
		/* #ifdef APP-PLUS|| MP-WEIXIN */
			height: calc(100vh - 88rpx - 104rpx - 88rpx);
		/* #endif */
		overflow-y: auto;
		overflow-x: hidden;
		-webkit-overflow-scrolling: touch;
	}
	.bottomTip{
		color: #86B0D4;
		text-align: center;
		margin: 10rpx 0;
		font-size: 28rpx;
	}
</style>
