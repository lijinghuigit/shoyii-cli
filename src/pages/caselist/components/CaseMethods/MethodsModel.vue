<template>
	<view class="sugicaldetail sy_block">
		<view style="height: 90rpx;">
			<view class="toptitle sy_block sy_border_bt" @click="ThreeSelect">
				<text></text>
				<text>{{surgical.titleName||'未填写'}}</text>
				<view class="changeSwitch">
					<text class="iconfont iconqiehuan" style="margin-right: 20rpx;"></text>
					<text>切换</text>
				</view>
			</view>
		</view>
		<swiper class="swiperBox" v-if="surgical.methodsBanner&&surgical.methodsBanner.length!=0" 
		:indicator-dots="true" :autoplay="Imageplay" :interval="3000" :duration="1000" indicator-color="#333333" indicator-active-color="#ffffff" circular="true">
			<swiper-item  @click='PreviewPic(index,surgical.methodsBanner)' v-for="(item,index) in surgical.methodsBanner" :key='index'>
				<view class="swiper-item">
					<!-- #ifdef APP-PLUS -->
					<u-lazy-load class='image sy_block' :image="item" img-mode='aspectFit' height='420rpx'></u-lazy-load>
					<!-- #endif -->
					<!-- #ifndef APP-PLUS -->
					<image lazy-load :src='item' mode="aspectFit" class="sy_block"></image>
					<!-- #endif -->
					<!-- 图片对应的名称 -->
					<view class="matchPic">
						<!-- #ifdef APP-PLUS -->
						<view class="matchTitle"  @click.stop="shareModel" v-if="methodJsId">
							<text class='iconfont iconzhuanfa' style="margin-right: 20rpx;"></text>
							<text>转发模型</text>
						</view>
						<!-- #endif -->
					</view>
				</view>
			</swiper-item>	
		</swiper>
		<view class="swiperBox" v-else>
			<view class="swiper-item">
				<image lazy-load :src='defaultImg' mode="aspectFit" class="sy_block"></image>
				<!-- 图片对应的名称 -->
				<view class="matchPic">
					<!-- #ifdef APP-PLUS -->
					<view class="matchTitle"  @click.stop="shareModel" v-if="methodJsId">
						<text class='iconfont iconzhuanfa' style="margin-right: 20rpx;"></text>
						<text>转发模型</text>
					</view>
					<!-- #endif -->
				</view>
			</view>
		</view>	
		<uni-popup id="popupShare" ref="popupShare" type="share">
			<view class="poplist">
				<view class="pop_header">
					<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type='text' activeColor="#86B0D4"></uni-segmented-control>
				</view>
				<view class="content">
					 <view>
						<scroll-view enable-flex scroll-y="true" class="classifyItem">
							<view v-show="current === 0">
								<scroll-view enable-flex scroll-y="true" class="classifyItem">
									<view class="content_item" v-for="(item,index) in surgical.Alllist" :key='index'>
										<text @click="changePicAll(item.id)" :class="item.id==boolIndexAll?'textColor':''">{{item.name||'暂无数据'}}</text>
									</view>
								</scroll-view>
							</view>
							<view v-show="current === 1">
								<scroll-view enable-flex scroll-y="true" class="classifyItem">
									<view class="content_item" v-for="(item,index) in surgical.Guidelist" :key='index'>
										<text @click="changePicGuide(item.id)" :class="item.id==boolIndexGuide?'textColor':''">{{item.name||'暂无数据'}}</text>
									</view>
								</scroll-view>
							</view>
							<view v-show="current === 2">
								<scroll-view enable-flex scroll-y="true" class="classifyItem">
									<view class="content_item" v-for="(item,index) in surgical.Instrumentlist" :key='index'>
										<text @click="changePicInstru(item.id)" :class="item.id==boolIndexInstru?'textColor':''">{{item.name||'暂无数据'}}</text>
									</view>
								</scroll-view>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import methodsPreview from '@/utill/tools/previewImage.js'
	export default{
		data(){
			return{
				Imageplay:true,//轮播图是否自动切换,true自动切换
				current:0,
				items: ['匹配情况','导板','器械'],
				boolIndexAll:0,
				boolIndexGuide:0,
				boolIndexInstru:0,
				methodsId:'',
				bannerList:[],
				defaultImg:uni.getStorageSync('uploadLogo'),
			}
		},
		emits:['shareModel','methodsData'],
		methods:{
			// 分享三维模型数据
			shareModel(){
				this.$emit('shareModel',{modelid:0})
			},
			ThreeSelect(){
				this.$refs.popupShare.open()
			},
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			},
			changeData(data,id,count){
				// console.log(data)//分别对应的导板，器械和匹配情况的数据
				var a=data.filter(item=>{
					if(item.id==id){
						return item
					}
				})
				this.methodsId=a[0].id//点击title，所获得对应的methodsId；用于进入3js页面
				var titleName=a[0].name
				if(a[0].stlPictureModelIds){
					var b=a[0].stlPictureModelIds.split(',')
					var indexArr=b.map(item=>{//遍历出匹配的下标
						return Object.keys(this.surgical.previewImage).indexOf(item)
					})
					var newArr=[]
					indexArr.filter(item=>{
						newArr.push(Object.values(this.surgical.previewImage)[item])
					})
					this.bannerList=newArr
				}else{
					this.bannerList=[]
				}
				this.$emit('methodsData',{bannerList:this.bannerList,methodsId:this.methodsId,methodJsId:a[0].stlModelIds,titleName:titleName,count:count})//替换轮播图
				this.$refs.popupShare.close()
			},
			// 点击title,更换图片
			changePicAll(id){
				console.log(id)
				this.boolIndexAll=id
				this.boolIndexGuide=''
				this.boolIndexInstru=''
				this.changeData(this.surgical.Alllist,id,0)//0表示匹配情况
			},
			changePicGuide(id){
				this.boolIndexGuide=id
				this.boolIndexInstru=''
				this.boolIndexAll=''
				this.changeData(this.surgical.Guidelist,id,1)//1表示导板
			},
			changePicInstru(id){
				this.boolIndexInstru=id
				this.boolIndexAll=''
				this.boolIndexGuide=''
				this.changeData(this.surgical.Instrumentlist,id,2)//2表示器械
			},
			// 预览图片
			PreviewPic(index,data){
				console.log(index)//从0开始
				console.log(data)
				methodsPreview.methodsPreview(index,data)
			},
		},
		props:{
			surgical:{
				type:Object,
				default:()=>{
					return{}
				}
			},
			methodJsId:'',//3js的stl id
		},
	}
</script>

<style scoped>
	@import "@/common/css/caseCommon.css";
</style>
