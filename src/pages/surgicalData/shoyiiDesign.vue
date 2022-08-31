<template>
	<view class="">
		<view style="height: 90rpx;">
			<view class="toptitle" @click="ThreeSelect">
				<text></text>
				<text v-if="shoyiiObject.shoyiititle">{{shoyiiObject.shoyiititle||'未填写'}}</text>
				<view class="changeSwitch">
					<text class="iconfont iconqiehuan" style="margin-right: 20rpx;"></text>
					<text>切换</text>
				</view>
			</view>
		</view>
		<swiper class="swiperBox" v-if="shoyiiObject.shoyiithreemodel?Object.values(shoyiiObject.shoyiithreemodel).length>0:false" :indicator-dots="true" :autoplay="Imageplay" :interval="3000" :duration="1000" indicator-color="#333333" indicator-active-color="#ffffff" circular="true">
			<swiper-item v-for="(item,index) in shoyiiObject.shoyiithreemodel" :key='index'>
				<view class="swiper-item">
					<movable-area class="movable">
						<!-- #ifdef APP-PLUS -->
						<u-lazy-load class='image' :image="item?item:'/static/image/shoyiilogo.png'" img-mode='aspectFit' height='420rpx'></u-lazy-load>
						<!-- #endif -->
						<!-- #ifndef APP-PLUS -->
						<image lazy-load :src="item?item:'/static/image/shoyiilogo.png'" mode="aspectFit"></image>
						<!-- #endif -->
						<!-- 图片对应的名称 -->
						<movable-view direction="all" class="matchPic">
							<view class="matchTitle" v-if="shoyiiObject.shoyiiId" @click.stop="enterJs">
								<!-- <text class='iconfont iconzhuanfa' style="margin-right: 20rpx;"></text> -->
								<text>查看模型</text>
							</view>
						</movable-view>
					</movable-area>
				</view>
			</swiper-item>	
		</swiper>
		<swiper class="swiperBox" v-else :indicator-dots="true" :autoplay="Imageplay" :interval="3000" :duration="1000" indicator-color="#333333" indicator-active-color="#ffffff" circular="true">
			<swiper-item>
				<view class="swiper-item">
					<movable-area class="movable">
						<u-lazy-load class='image' image="/static/image/shoyiilogo.png" img-mode='aspectFit' height='420rpx'></u-lazy-load>
						<!-- 图片对应的名称 -->
						<movable-view direction="all" class="matchPic">
							<view class="matchTitle" v-if="shoyiiObject.shoyiiId" @click.stop="enterJs">
								<!-- <text class='iconfont iconzhuanfa' style="margin-right: 20rpx;"></text> -->
								<text>查看模型</text>
							</view>
						</movable-view>
					</movable-area>
				</view>
			</swiper-item>	
		</swiper>
		<view class="items">
			<view class="" v-if="shoyiiData.surgicalDesignDescription&&shoyiiData.surgicalDesignDescription.length>0">
				<view class="subtitle">
					<text>设计情况说明</text>
				</view>
				<!-- 手术设计说明 -->
				<view v-for="(item,index) in shoyiiData.surgicalDesignDescription" :key='item.id' style="margin: 20rpx 0;">
					<view class="subtitle" style="border: none;" v-if="item.title">
						<text>{{item.title}}</text>
					</view>
					<view class="content" v-for="(item1,index1) in item.descriptionDTOS" :key='index1'>
						<view class="description" v-if="item1.description">
							<text>{{index1+1}}</text><text>、</text>
							<text>{{item1.description}}</text>
						</view>
						<view class="imgpic" v-if="item1.picture">
							<image class="imgitems" v-for="(s_item,s_index) in item1.picture.split(',')" :key='s_index' :src="item.previewImage[s_item]" mode="aspectFit"  @click="PreviewPic(item.previewImage,item1.picture,s_index)"></image>
						</view>	
					</view>
				</view>
			</view>
			<!-- 效果预测说明 -->
			<view class="" v-if="shoyiiData.effectPredictionDescription">
				<view class="subtitle">
					<text>预测结果</text>
				</view>
				<view style="margin: 20rpx 0;">
					<text>{{shoyiiData.effectPredictionDescription}}</text>
				</view>
			</view>
		</view>
		<!-- <view class="test" style="height: 110rpx;"></view>
		<view class="" style="position: fixed;bottom: 0;width: 100%;">
			<caseBottom @caseshare='share' @vrshow='vrshow' @enterJs='enterJs' ifShare='false'></caseBottom>
		</view> -->
		<!-- 三维文件的popup -->
		<uni-popup id="popupShare" ref="popupShare" type="share">
			<view class="poplist">
				<view class="pop_header">
					<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type='text' activeColor="#86B0D4"></uni-segmented-control>
				</view>
				<view class="content">
					<scroll-view scroll-y="true" class="classifyItem">
						<view class="" v-if="current==0">
							<view class="content_item" v-for="(item,index) in shoyiiData.threeDModel" :key='index'>
								<text @click="threePic(0,item)" :class="item.id==designIndex?'textColor':''">{{item.title}}</text>
							</view>
						</view>
						<!-- 手术设计 -->
						<view class="" v-if="current==1">
							<view class="pop_header">
								<uni-segmented-control :current="s_current" :values="s_items" @clickItem="s_onClickItem" style-type='text' activeColor="#86B0D4"></uni-segmented-control>
							</view>
							<view class="content">
								<!-- 匹配情况 -->
								<view class="" v-if="s_current==0">
									<view class="content_item" v-for="(item,index) in shoyiiData.matching" :key='index'>
										<text @click="designPic(item,'Matching')" :class="item.id==designIndex?'textColor':''">{{item.name}}</text>
									</view>
								</view>
								<!-- 导板 -->
								<view class="" v-if="s_current==1">
									<view class="content_item" v-for="(item,index) in shoyiiData.guides" :key='index'>
										<text @click="designPic(item,'GuidePlate')" :class="item.id==designIndex?'textColor':''">{{item.name}}</text>
									</view>
								</view>
								<!-- 器械 -->
								<view class="" v-if="s_current==2">
									<view class="content_item" v-for="(item,index) in shoyiiData.instrument" :key='index'>
										<text @click="designPic(item,'Instrument')" :class="item.id==designIndex?'textColor':''">{{item.name}}</text>
									</view>
								</view>
								<!-- 植入体 -->
								<view class="" v-if="s_current==3">
									<view class="content_item" v-for="(item,index) in shoyiiData.implants" :key='index'>
										<text @click="designPic(item,'Implant')" :class="item.id==designIndex?'textColor':''">{{item.name}}</text>
									</view>
								</view>
							</view>
						</view>
						<!-- 效果预测 -->
						<view class="" v-if="current==2">
							<view class="content_item" v-for="(item,index) in shoyiiData.effectPredictions" :key='index'>
								<text @click="threePic(2,item)" :class="item.id==designIndex?'textColor':''">{{item.name}}</text>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import getFileExtension from '@/utill/tools/filesuffix.js'
	import {getShoyiiDetail} from '@/utill/api/surgical/getSurgical.js'
	// import CaseBottom from '../caselist/components/CaseBottom.vue'
	export default{
		components:{
			// CaseBottom
		},
		data(){
			return{
				Imageplay:true,
				items:['三维重建','手术设计','效果预测'],
				current:0,
				s_current:0,
				s_items:['匹配情况','导板','器械','植入体'],
				designIndex:null,
				shoyiiData:{},
				// 顶部title
				shoyiiObject:{
					shoyiiId:null,////用于电子病例的3js分享
					shoyiithreemodel:{},//用于电子病历的三维数据显示,默认是第一组的
					shoyiistlId:'',//stl的id，默认是第一组数据
					shoyiititle:'',//用于电子病历的三维数据标题
					shoyiilabel:'',//用于进入3js
				},
			}
		},
		methods:{
			ThreeSelect(){
				this.$refs.popupShare.open()
			},
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			},
			// 选中底部menu,切换图片与标题
			threePic(i,data){
				console.log(data)
				console.log(data.id)
				this.designIndex=data.id
				if(i==0){//三维文件
					this.shoyiiObject={
						shoyiiId:data.id,////用于电子病例的3js分享
						shoyiithreemodel:data.previewImage,//用于电子病历的三维数据显示,默认是第一组的
						shoyiistlId:data.stlFileModelId,//stl的id，默认是第一组数据
						shoyiititle:data.title,//用于电子病历的三维数据标题
						shoyiilabel:data.label
					}
				}else if(i==2){//效果预测
					this.shoyiiObject={
						shoyiiId:data.id,////用于电子病例的3js分享
						shoyiithreemodel:data.stlPictureUrl,//用于电子病历的三维数据显示,默认是第一组的
						shoyiistlId:data.stlModelIds,//stl的id，默认是第一组数据
						shoyiititle:data.name,//用于电子病历的三维数据标题
						shoyiilabel:data.label
					}
				}
				this.$refs.popupShare.close()
			},
			designPic(data,label){//label为匹配情况，导板、器械，植入体等的标识
				this.designIndex=data.id
				this.shoyiiObject={
					shoyiiId:data.id,////用于电子病例的3js分享
					shoyiithreemodel:data.stlPictureUrl,//用于电子病历的三维数据显示,默认是第一组的
					shoyiistlId:data.stlModelIds,//stl的id，默认是第一组数据
					shoyiititle:data.name,//用于电子病历的三维数据标题
					shoyiilabel:data.label
				}
				this.$refs.popupShare.close()
			},
			s_onClickItem(e){
				if (this.s_current !== e.currentIndex) {
					this.s_current = e.currentIndex;
				}
			},
			// 分享三维模型数据
			shareModel(){
				// this.$emit('shareModel',{modelid:0})
			},
			// 进入报告详情
			enterReport(name,url){
				console.log(name)
				console.log(url)
				var type =getFileExtension(name)
				console.log(type)
				if(type=='pdf'){
					uni.navigateTo({
						url:'/pages/previewPdf/previewPdf?pdfUrl='+encodeURIComponent(url),
						animationType:'pop-in'
					})
				}else{//其他文本类型
				// #ifndef H5
					uni.showLoading({
						title:'打开中',
						icon:'none'
					})
					uni.downloadFile({
						url:url,
						success(res){
							console.log(res)
							if (res.statusCode === 200) {
								console.log('下载成功');
								uni.hideLoading()
									//打开文档查看
								uni.openDocument({
									filePath: res.tempFilePath,
									success: function(res) {
										console.log('打开文档成功');
									}
								});
							}else{
								uni.hideLoading()
								console.log('下载失败');
							}
						},
						fail(err){
							uni.hideLoading()
							console.log(err)
						}
					})
				// #endif
				// #ifdef H5
				uni.showToast({
					title:'网页端不可浏览',
					icon:'none'
				})
				// #endif
				}
			},
			// 预览图片
			PreviewPic(data,url,index){
				console.log(data)
				console.log(url)
				console.log(index)
				var picData=[]
				url.split(',').forEach(item=>{
					picData.push(data[item])
				})
				uni.previewImage({
					current:index,
					urls:picData,
					complete(e) {
						console.log(e)
					},
				})
			},
			// 获取树蚁设计
			getShoyii(id){
				getShoyiiDetail({
					id:id,
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						var data=res.data.object
						this.shoyiiData=data
						if(data.threeDModel.length!=0){
							this.shoyiiObject={ //默认获取的是三维重建的数据
								shoyiiId:data.threeDModel[0].id,////用于电子病例的3js分享
								shoyiithreemodel:data.threeDModel[0].previewImage,//用于电子病历的三维数据显示,默认是第一组的
								shoyiistlId:data.threeDModel[0].stlFileModelId,//stl的id，默认是第一组数据
								shoyiititle:data.threeDModel[0].title,//用于电子病历的三维数据标题
								shoyiilabel:'ThreeDModel',//用于进入3js,默认是三维重建
							}
						}
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:'none',
						})
					}
				}).catch(err=>{
					console.log(err)
				})	
			},
			share(){
				console.log('share')
			},
			vrshow(){
				console.log('vrshow')
			},
			enterJs(){
				var modelIdType='majorTableId'
				var token=this.$store.getters['user/info'].token
				var modelType=this.shoyiiObject.shoyiilabel
				if(this.shoyiiObject.shoyiilabel=='CaseHistoryEffectPrediction'){//效果预测
					var modelIdType='id'
					var token=''
				}
				var jstitle=(this.shoyiiObject.shoyiititle?'树蚁设计-'+this.shoyiiObject.shoyiititle:'树蚁设计')
					// 三维模型的url
					// 病例caseId暂缺
				this.shareUrl=this.$JslineUrl+'&caseHistoryId='+'&userType=D'+'&token='+token+'&modelType='+modelType+'&titlename='+jstitle+'&'+modelIdType+'='+this.shoyiiObject.shoyiiId
				uni.navigateTo({
					url:'/pages/ThreejsShow/ThreejsShow?baseUrl='+encodeURIComponent(this.shareUrl),
					animationType:'pop-in'
				})
			}
		},
		onLoad(options) {
			this.getShoyii(options.caseId)
			uni.setNavigationBarTitle({
				title:options.title?options.title:'树蚁设计'
			})
		}
	}
</script>

<style scoped lang="scss">
	@import "@/common/css/caseCommon.css";
	/* #ifndef APP-NVUE */
	.pop_header ::v-deep .segmented-control__item--text{
		border-bottom-width: 0;
	} 
	/* #endif */
	.docInfor{
		display: flex;
		padding: 30rpx;
		align-items: center;
		border-bottom: 1px solid #F0EFEF;
		background-color: #FFFFFF;
	}
	/* #ifdef MP-WEIXIN */
	.docInfor image{
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		border: 1px solid #F0EFEF;
		margin-right: 23rpx;
	}
	/* #endif */
	.docInfor uni-image{
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		border: 1px solid #F0EFEF;
		margin-right: 23rpx;
	}
	.docInfor .docname{
		font-size: 28rpx;
		color: #000000;
	}
	.docInfor_content{
		flex: 1;display: flex;flex-direction: column;justify-content: space-between;
	}
	.infor .line{
		margin: 0 10rpx;
	}
	.docInfor .infor{
		font-size: 24rpx;
		line-height: 40rpx;
		color: #8F8F8F;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		word-wrap: break-word;
		word-break: break-all;
	}
	.items{
		font-size: 28rpx;
		color: #000000;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		margin: 20rpx 0;
		background-color: #FFFFFF;padding: 20rpx 30rpx;
		.Htitle{
			border-bottom: 1px solid;
			color: #000000;
		}
		.subtitle{
			border-bottom: 1px solid #F0EFEF;padding-bottom: 20rpx;
			font-weight: bold;font-family: PingFang-SC-Bold;font-size:28rpx ;
			color: #232323;
		}
		.content{
			padding: 10rpx 0;
			.description{
				margin-bottom: 10rpx;
			}
		}
		
	}
	.imgpic{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
		.imgitems{
			width: 210rpx;background-color: #FFFFFF;
			margin: 10rpx 10rpx;
			padding-bottom: 0px!important;
			border: 1px solid #EEEEEE;
			height: 210rpx;
		}  
	}
	/* #ifdef MP-WEIXIN */
	.imgitems ::v-deep image{
		background-color: #FFFFFF!important;
	}
	/* #endif */
	.orderDesign{
		background-color: #9AE37E;
		color: #FFFFFF;
		padding: 30rpx 0;
		text-align: center;
		border-radius: 30rpx;
	}
</style>
