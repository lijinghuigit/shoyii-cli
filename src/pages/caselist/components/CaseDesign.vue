<template>
	<view class="">
		<view style="height: 90rpx;">
			<view class="toptitle sy_block sy_border_bt" @click="ThreeSelect">
				<text></text>
				<text v-if="shoyiiObject.shoyiititle">{{shoyiiObject.shoyiititle||'未填写'}}</text>
				<view class="changeSwitch">
					<text class="iconfont iconqiehuan" style="margin-right: 20rpx;"></text>
					<text>切换</text>
				</view>
			</view>
		</view>
		<swiper class="swiperBox" v-if="Object.values(shoyiiObject.shoyiithreemodel).length>0" :indicator-dots="true" :autoplay="Imageplay" :interval="3000" :duration="1000" indicator-color="#333333" indicator-active-color="#ffffff" circular="true">
			<swiper-item v-for="(item,index) in shoyiiObject.shoyiithreemodel" :key='index'>
				<view class="swiper-item">
					<!-- #ifdef APP-PLUS -->
					<u-lazy-load class='image sy_block' :image="item?item:'/static/image/shoyiilogo.png'" img-mode='aspectFit' height='420rpx'></u-lazy-load>
					<!-- #endif -->
					<!-- #ifndef APP-PLUS -->
					<image lazy-load :src="item?item:'/static/image/shoyiilogo.png'" mode="aspectFit" class='sy_block'></image>
					<!-- #endif -->
					<!-- 图片对应的名称 -->
					<view class="matchPic">
						<!-- #ifdef APP-PLUS -->
						<view class="matchTitle" v-if="shoyiiObject.shoyiistlId" @click.stop="shareModel">
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
				<u-lazy-load class='image sy_block' image="/static/image/shoyiilogo.png" img-mode='aspectFit' height='420rpx'></u-lazy-load>
				<!-- 图片对应的名称 -->
				<view class="matchPic">
					<!-- #ifdef APP-PLUS -->
					<view class="matchTitle" v-if="shoyiiObject.shoyiistlId" @click.stop="shareModel">
						<text class='iconfont iconzhuanfa' style="margin-right: 20rpx;"></text>
						<text>转发模型</text>
					</view>
					<!-- #endif -->
				</view>
			</view>
		</view>
		<!-- 设计团队信息 -->
		<view class="docInfor sy_block sy_border_bottom">
			<image lazy-load :src='shoyiiData.designerIcon' mode="" />
			<view class="docInfor_content">
				<view class="" style="display: flex;justify-content: space-between;">
					<text class="docname sy_title_deep">{{shoyiiData.designerTeamName}}</text>
					<view class="infor">
						<text>{{timeStamp(shoyiiData.createTime)}}</text>
					</view>
				</view>
				<view class="infor">
					<text>负责人：</text>
					<text>{{shoyiiData.designerName}}</text>
				</view>
			</view>
		</view>
		<!--  -->
		<!-- 设计报告 -->
		<view class="items sy_block" v-if="shoyiiData.designReportFileUrl&&Object.keys(shoyiiData.designReportFileUrl).length>0">
			<view class="subtitle sy_title_deep sy_border_bottom">
				<text>设计报告</text>
			</view>
			<view @click="enterReport(item.name,item.fileDownloadUrl)" v-for="(item,index) in shoyiiData.designReportFileUrl" :key='item.id' style="margin: 20rpx 0;">
				<text class="Htitle sy_title_primary">{{item.name}}</text>
			</view>
		</view>
		<!-- 手术方法 -->
		<view class="surgicalLink sy_block"
		v-if="shoyiiData.referenceSurgicalPlan"
		@click="enterSurgical(shoyiiData.referenceSurgicalPlan.surgicalPlanId)">
			<view class="content sy_title_primary">
				<text class="label">手术方法:</text>
				<text>{{shoyiiData.referenceSurgicalPlan.surgicalPlanName||'未命名'}}</text>
			</view>
			<uni-icons type="forward" size="22" :color="themeType=='dark'?'#8f8f8f':'#333333'"></uni-icons>
		</view>
		<view class="items sy_block">
			<view class="" v-if="shoyiiData.surgicalDesignDescription&&shoyiiData.surgicalDesignDescription.length>0">
				<view class="subtitle sy_title_deep sy_border_bottom">
					<text>设计情况说明</text>
				</view>
				<!-- 手术设计说明 -->
				<view v-for="(item,index) in shoyiiData.surgicalDesignDescription" :key='item.id' style="margin: 20rpx 0;">
					<view class="subtitle sy_title_primary" style="border: none;" v-if="item.title">
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
				<view class="subtitle sy_title_deep sy_border_bottom">
					<text>预测结果</text>
				</view>
				<view style="margin: 20rpx 0;">
					<text>{{shoyiiData.effectPredictionDescription}}</text>
				</view>
			</view>
		</view>
		<!-- 三维文件的popup -->
		<view class="popUpBox">
			<uni-popup id="popupShare" ref="popupShare" type="share">
				<view class="poplist">
					<view class="pop_header">
						<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type='text' activeColor="#86B0D4"></uni-segmented-control>
					</view>
					<view class="content">
						<scroll-view enable-flex scroll-y="true" class="classifyItem">
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
	</view>
</template>

<script>
	import getFileExtension from '@/utill/tools/filesuffix.js'
	export default{
		props:{
			shoyiiData:{
				type:Object,
				default:()=>{
					return {}
				}
			},
			//顶部title
			shoyiiObject:{
				type:Object,
				default:()=>{
					return {}
				}
			},
		},
		data(){
			return{
				Imageplay:true,
				items:['三维重建','手术设计','效果预测'],
				current:0,
				s_current:0,
				s_items:['匹配情况','导板','器械','植入体'],
				designIndex:null,
			}
		},
		emits:['shoyiidata'],
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
				if(i==0){//三维文件(电子病例)
					this.$emit('shoyiidata',{index:'electric',data,label:'ThreeDModel'})//改变轮播图父组件的值
				}else if(i==2){//效果预测
					this.$emit('shoyiidata',{index:'predict',data,label:'CaseHistoryEffectPrediction'})//改变轮播图父组件的值
				}
				this.$refs.popupShare.close()
			},
			designPic(data,label){//label为匹配情况，导板、器械，植入体等的标识
				this.designIndex=data.id
				this.$emit('shoyiidata',{index:'surgicalDesign',data,label})//改变轮播图父组件的值
				this.$refs.popupShare.close()
			},
			s_onClickItem(e){
				if (this.s_current !== e.currentIndex) {
					this.s_current = e.currentIndex;
				}
			},
			// 分享三维模型数据
			shareModel(){
				this.$emit('shareModel',{modelid:0})
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
			// 进入手术方法库详情
			enterSurgical(id){
				uni.navigateTo({
					url:'/pages/surgicalData/surgicalDetail?id='+id
				})
			}
		},
		created() {
			// console.log(this.shoyiiObject)
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
	// 手术方法
	.surgicalLink{
		height: 90rpx;line-height: 90rpx;background-color: #FFFFFF;margin: 20rpx 0;padding: 0 30rpx;
		display: flex;justify-content: space-between;align-items: center;
		.content{
			color: #000000;font-weight: 500;font-size: 28rpx;
			overflow: hidden;white-space: nowrap;text-overflow: ellipsis;margin-right: 20rpx;
			.label{
				white-space: nowrap;margin-right: 20rpx;
			}
		}
	}
</style>
