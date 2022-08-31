<template>
	<movable-area style="width: 100%;height: 100%;">
	<view class="caseAll" :data-theme='themeType'>
		<!-- 标题栏 -->
		<view class="status-contents">
		    <view class="status top-view"></view>
			  <!-- #ifdef MP-WEIXIN -->
			 <view class="navTitle" :style="{width:widthLength+'rpx'}">
			  	<view class="left" @click="back">
			  		<uni-icons type="arrowleft" size="20" :color="themeType=='dark'?'#fff':'#343434'"></uni-icons>
			  		<text class="title sy_title_deep">详情</text>
			  	</view>
			  </view>
			  <!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
			<view class="navTitle">
				<view class="left" @click="back">
					<uni-icons type="arrowleft" size="20" :color="themeType=='dark'?'#fff':'#343434'"></uni-icons>
					<text class="title sy_title_deep">详情</text>
				</view>
			</view>
			<!-- #endif -->
		</view>
		<view class="wrap">
			<u-tabs-swiper v-if="reShow"
			:bg-color="themeType=='dark'?'#1B1C1E':'#ffffff'"
			ref="uTabs" :current="current" @change="changeTab(tabs,$event)" :list="tabs" :bold='false'
			:inactive-color="themeType=='dark'?'#8f8f8f':'#303133'"
			:is-scroll="false" font-size='24' :show-bar='false' active-color='#86B0D4'></u-tabs-swiper>
			<swiper class="swiper-box" :current="swiperCurrent" 
			 @transition="transition" @animationfinish="animationfinish(tabs,$event)">
				<swiper-item class="swiper-item"
				v-for="(item,index) in tabs" :key='item.name'>
					<!-- 电子病例 -->
					<scroll-view style="height: 100%;width: 100%;" scroll-y enable-flex
					v-show="item.id=='electric'">
						<!--stl数据的title，三维模型数据 -->
						<electric-model :electricData='electricData' :dataList='list.threeDModel' @shareModel='share' @electricData='electricDataSon'></electric-model>
						<!-- 医生信息 -->
						<casedoctor-infor :casedocinfor='casedocinfor' />
						<!-- 经典案例不展示订单相关数据 -->
						<create-service v-if="classifycase=='false'" @help='help' @ensureOrder='ensureOrder' :orderData='orderData'></create-service>
						<view class='section'>
							<!-- 电子病例的十二项的数据，以及就诊历史 -->
							<electric-infor :caseData='list' :caseHistory='list.medicalRecordsData' :medicalHistories='list.medicalHistories'></electric-infor>
						</view>
					</scroll-view>
					<!-- 树蚁设计 -->
					<!-- <view class="" v-for="(s_item,s_index) in list.caseAidedDesignContentList" :key='s_index'> -->
					<scroll-view style="height: 100%;width: 100%;" scroll-y
					v-show="item.id==`ShoYii${index}`">
						<view class="" v-for="(s_item,s_index) in ShoYiiData" :key='s_item.id'>
							<view class="" v-show="item.id==s_item.id">
								<!-- <text>{{item.id}}--{{index}}</text> -->
								<view class='section'>
									<case-design :shoyiiData='s_item' :shoyiiObject="shoyiiObject"
									 @shareModel='share' @shoyiidata='shoyiidataSon'></case-design>
								</view>
							</view>
						</view>
					</scroll-view>	
					<!-- </view> -->		
					<!-- 手术设计 -->					
					<scroll-view style="height: 100%;width: 100%;" scroll-y enable-flex
					v-show="item.id=='surgicalDesign'">
						<design-model :surcigalDesignData='surcigalDesignData' @shareModel='share' @designData='designDataSon'></design-model>
						<view class='section'>
							<!-- 医生信息 -->
							<casedoctor-infor :casedocinfor='casedocinfor' />
							<create-service v-if="classifycase=='false'" @help='help' @ensureOrder='ensureOrder' :orderData='orderData'></create-service>
							<design-infor :designData='surcigalDesignData.DesignData'></design-infor>
							<case-files :files='surcigalDesignData.files'></case-files>
						</view>
					</scroll-view>				
					<!-- 效果预测 -->
					<scroll-view style="height: 100%;width: 100%;" scroll-y enable-flex
					v-show="item.id=='predict'">
						<view class='section'>
							<case-predict :predictData='predictData' @shareModel='share' @predictData='predictDataSon'></case-predict>
						</view>
					</scroll-view>
					<!-- 术后随访 -->
					<scroll-view style="height: 100%;width: 100%;" scroll-y enable-flex
					v-show="item.id=='follow'">
						<view class='section'>
							<casedoctor-infor :casedocinfor='casedocinfor'></casedoctor-infor>
							<create-service v-if="classifycase=='false'" @help='help' @ensureOrder='ensureOrder' :orderData='orderData'></create-service>
							<case-follow :casefollow='followUpData'></case-follow>
						</view>
					</scroll-view>
					<!-- 手术方法 -->
					<scroll-view style="height: 100%;width: 100%;" scroll-y enable-flex
					v-if="classifycase=='true'">
						<!-- 手术方法的所有数据  三维图形的title ,图片，各种匹配情况 -->
						<methods-model :surgical='surgical' :methodJsId='methodJsId' @shareModel='share' 
						@methodsData='methodsDataSon'></methods-model>
						<view class='section'>
							<!-- 医生信息 -->
							<casedoctor-infor :casedocinfor='casedocinfor' />
							<!-- <create-service @help='help' @ensureOrder='ensureOrder' :orderData='orderData'></create-service> -->
							<!-- 十二项数据 -->
							<twelve-items :arrData='surgical'></twelve-items>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 底部 -->
		<view class="">
			<!-- 分别是顶部menu的下标，底部三维数据，3js的stlid ,术后随访不用底部bottom-->
			<case-bottom v-if="middleIndex!='follow'" @caseshare='share' @vrshow='vrshow' @enterJs='enterJs'></case-bottom>
		</view>
		<!-- 分享的popup -->
		<wechat-share ref='sonWechatShare' @shareWeixin='shareWeixin' @shareFriend='shareFriend' @shareQq='shareQq'
		 @cancelshare='cancelshare'>
		</wechat-share>
		<!-- vrshow展示 -->
		<vr-show ref='SonVrshow' :deviceGroup='deviceGroup' :threeDmodelId='threeModelId.toString()'
		 :threeDmodelName='threeModelName'></vr-show>
	</view>
	
	<view class="chat" v-if="userInfor.accountOwner!=10&&classifycase=='false'">
		<movable-view direction='all' style="opacity: 0.8;">
			<view @click="EnterGroup" class="chatIcon">
				<text v-if="list.relativeGroupId">进入讨论组</text>
				<text v-else>创建讨论组</text>
				<u-badge v-if='badgeShow' size="default" :is-dot="true" type="error">
				</u-badge>
			</view>
		</movable-view>
	</view>
	
	</movable-area>
</template>

<script>
	// 医生信息
	import CasedoctorInfor from './components/CasedoctorInfor.vue'
	// 电子病例
	import ElectricInfor from './components/CaseElectric/ElectricInfor.vue'
	import ElectricModel from './components/CaseElectric/ElectricModel.vue'
	// 订单相关
	import CreateService from './components/CreateService.vue'	
	// 手术方法
	import TwelveItems from '@/components/surgical/TwelveItems.vue'
	import MethodsModel from './components/CaseMethods/MethodsModel.vue'
	// 手术设计
	import DesignModel from './components/CaseDesign/DesignModel.vue'
	import DesignInfor from './components/CaseDesign/DesignInfor.vue'
	import CaseFiles from './components/CaseDesign/CaseFiles.vue'
	// 效果预测
	import CasePredict from './components/CasePredict/CasePredict.vue'
	// 术后随访
	import CaseFollow from './components/CaseFollow/CaseFollow.vue'
	// 树蚁设计
	import CaseDesign from './components/CaseDesign.vue'
	// 底部tab
	import CaseBottom from './components/CaseBottom.vue'
	// 病例详情
	import {getcasedetail} from '@/utill/api/case/getcasedetail.js'
	// 下单
	import {help} from './api/help.js'
	// 手术方法详情
	import {getSurgicalDetail} from '@/utill/api/surgical/getSurgical.js'
	// 设备查询
	import {querydevice} from '@/utill/api/DeviceGroup/querydevice.js'
	// 查询病例相关的订单信息
	import {getCaseOrder} from '@/utill/api/order/order.js'
	// 创建群组
	import {createCaseGroup} from '@/utill/api/connect/connect.js'
	import {mapState} from 'vuex'
	// 时间转换
	import moment from 'moment'
	// 当前页面路径和id
	import getPageRoute from '@/utill/tools/getRoute.js'
	// 第三方分享
	import mixin from '@/mixin/mixin.js'
	export default {
		mixins:[mixin],
		components:{
			// 病例底部
			CaseBottom,
			// 主治医生信息
			CasedoctorInfor,
			// 电子病例十二项数据
			ElectricInfor,
			// 电子病例的模型数据
			ElectricModel,
			// 手术方法
			TwelveItems,
			MethodsModel,
			// 手术设计
			DesignInfor,
			DesignModel,
			CaseFiles,
			// 效果预测
			CasePredict,
			// 术后随访
			CaseFollow,
			// 生成订单服务
			CreateService,
			// 树蚁设计
			CaseDesign
		},
		data() {
			return {
				badgeShow:false,
				menuButtonInfo:{},//小程序胶囊位置
				// 顶部导航
				current: 0,
				reShow:false,//tab初始化为false，数据加载之后重新渲染
				tabs: [
					{name: '电子病例',id:'electric'}, 
					{name: '手术设计',id:'surgicalDesign'},
					{name: '效果预测',id:'predict'},
					{name: '术后随访',id:'follow'},
				],
				middleIndex:'electric',//中间变量，用于具体的menu,从而处理相应数据
				swiperCurrent: 0,//默认是第一项，swiper
				list:{},//病例数据
				casedocinfor:[],//主治医生的信息
				assitDoc:[],//协助医生数据
				id:'',//病例详情的id
				// 电子病例的数据
				electricData:{
					threeModeltitle:'',//轮播图顶部的title
					threemodel:{},//这个是轮播图对应的模型数据
					stlId:'',//用于判断是否进入3js
					electricId:null,//这个是电子病例的3js文件的id;跟stlid要区分开，用于进入3js及vr设备
				},
				// 手术方法的数据	
				surgical:{
					threeDGuideList:[
						{stlPicture:'[]'}
					],
					threeDInstrumentList:[
						{stlPicture:'[]'}
					],
					surgicalDesignStepsList:[
						{stlPicture:'[]'}
					],
					preoperativeConditionList:[
						{stlPicture:'[]'}
					],
					postoperativeSituationList:[
						{stlPicture:'[]'}
					],
					titleName:'',//手术方法的title
					methodsBanner:[],//手术方法轮播图
					Alllist:[],//匹配情况
					Guidelist:[],//导板数据
					Instrumentlist:[],//器械数据
				},
				surgicalMethodsId:null,//用于获取vr设备
				methodJsId:'',//stl的id，不是文件的id，跟电子病例等其他区分来，用于进入3js；
				// 手术设计
				surcigalDesignData:{
					matching:[],//匹配情况
					DesignGuid:[],//导板数据
					DesignInstrument:[],//器械数据
					DesignData:{},//所有的手术设计数据
					titleDesign:'',//三维数据title
					DesignBanner:{},//三维图形数据
					designStlId:'',//判断能否进入3js及展示3js btn
					files:{},//ppt,word 的文件
					designId:null,//这个是手术设计的3js文件的id;用于vr和进入3js
				},
				// 效果预测的数据
				predictData:{
					casePredict:[],
					casePredictbanner:[],//效果预测的轮播图
					predictName:'',
					predictId:null,
					predictStlId:'',
				},
				// 术后随访
				followUpData:[],
				// vr相关
				deviceGroup:[],//设备分组的数据
				threeModelId:'',//用于vr设备的选择
				threeModelName:'',//用于vr设备的name
				methodsType:'Matching',//手术方法选择的是导板还是器械,默认是匹配情况
				designType:'Matching',//手术设计选择的导板还是器械还是匹配情况
				JsmodelId:'',//用于进行3js分享
				shareTitle:'病例',//微信分享的标题
				jstitle:'病例',//3js的title；
				orderData:[],//订单数据
				shoyiiObject:{//树蚁设计，每期都替换
					shoyiiId:null,//vr激活，及判断是否进行激活
					shoyiithreemodel:{},//用于电子病历的三维数据显示,默认是第一组的
					shoyiistlId:'',//stl的id，默认是第一组数据，用于判断是否进入3js，但进入3js是通过shoyiiId
					shoyiititle:'',//用于电子病历的三维数据标题
					shoyiilabel:'',//用于进入3js
				},//包含id,stlid,title,banner
				ShoYiiData:[],//树蚁设计n期
				classifycase:'false',//从经典案例的判断，展示手术方法
			}
		},
		watch:{
			current(newValue,oldValue){
				// app端，menu每次切换，刷新数据时，可能存在手术方法白屏
				if(this.classifycase=='true'){//是经典案例，展示手术方法
					this.getData(this.middleIndex,this.id,'true')
				}else{
					this.getData(this.middleIndex,this.id)
				}
			},
			'socketData': function(val) {
				if(val=='head'){//心跳回复
					return
				}
				this.badgeShow=true
			}
		},
		methods:{
			// 进入群聊
			EnterGroup(){
				this.badgeShow=false
				if(this.list.relativeGroupId){//存在，则直接进入群组中
					uni.navigateTo({ //病例id,病例号，聊天类型
						// id是病例id,otherName 是群组名称，type是所属类型,id是群组id
						url:'/pages/shoyiiChat/chatWindow?caseId='+this.id+'&id='+this.list.relativeGroupId+'&otherName='+this.list.caseHistoryNo+'&type=GROUP'
					})
				}else{//创建群组
					if(this.list.attendingDoctors.length==0||this.list.attendingDoctors[0].doctorId!=this.$store.getters['user/info'].doctorId){
						uni.showToast({
							title:'非主治医生不能创建群组',
							icon:'none'
						})
						return;
					}
					createCaseGroup({
						name:this.list.caseHistoryNo,
						caseHistoryId:this.id
					}).then(res=>{
						console.log(res)
						if(res.data.code==0){//群组创建成功
							uni.navigateTo({ //病例id,病例号 res.data.object是群组id,聊天类型type
								url:'/pages/shoyiiChat/chatWindow?caseId='+this.id+'&id='+res.data.object+'&otherName='+this.list.caseHistoryNo+'&type=GROUP'
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
			// 转发分享按钮(调起分享的弹窗及处理url，title，根据e存在分享3js，不存在，分享整个病例)
			share(e){
				// #ifndef MP-WEIXIN
				if(this.casedocinfor.length>0&&this.casedocinfor[0].doctorVO){
					if(this.list.name&&this.list.caseHistoryNo){
						// 病例的详情拼接
						this.shareContent='患者姓名：'+this.list.name+'\n'+'病历医生:'+this.casedocinfor[0].doctorVO.name+'\n'+'病历号:'+this.list.caseHistoryNo
					}else if(this.list.name){
						// 病例的详情拼接
						this.shareContent='患者姓名：'+this.list.name+'\n'+'病历医生:'+this.casedocinfor[0].doctorVO.name
					}else if(this.list.caseHistoryNo){
						// 病例的详情拼接
						this.shareContent='病历医生:'+this.casedocinfor[0].doctorVO.name+'\n'+'病历号:'+this.list.caseHistoryNo
					}else{
						// 病例的详情拼接
						this.shareContent='病例详情'
					}
				}else{
					this.shareContent='病例详情'
				}
				// #endif
				 // #ifdef APP-PLUS
				 // 分享弹窗
				this.$refs.sonWechatShare.open()
				 // #endif
				 // 进入3js以及分享3js
				this.ThreeJs(this.middleIndex,e)
			},
			ThreeJs(index,e){
				console.log(index)
				switch (index){
					case 'electric'://电子病例（这块传的是三维文件的id）
						this.JsmodelId=this.electricData.electricId//这个是3js文件的id;跟具体的stlid要区分开
						var modelType='ThreeDModel'//3js的参数
						var modelIdType='majorTableId'//3js的参数
						var token=this.$store.getters['user/info'].token
						// 转发出去的标题（三维模型title）
						this.jstitle=(this.electricData.threeModeltitle?'电子病例-'+this.electricData.threeModeltitle:'电子病例')
						if(this.electricData.threemodel&&this.electricData.threemodel.previewImage&&Object.keys(this.electricData.threemodel.previewImage).length>0){
							 //轮播图存在(转发出的图片，图片第一张)
							 this.surfacePic=Object.values(this.electricData.threemodel.previewImage)[0]
						}else{
							 this.surfacePic=uni.getStorageSync('uploadLogo')
						}
					break;
					case 'surgicalMethod'://手术方法
						console.log(this.methodJsId)
						this.JsmodelId=this.methodJsId//点击的stl的id，不是文件的id了，和三维重建，模型库等要区分 开
						var modelType=''
						var modelIdType='fileId'
						var token=''
						this.jstitle=(this.surgical.titleName?'手术方法-'+this.surgical.titleName:'手术方法')
						console.log(this.jstitle)
						if(this.surgical.methodsBanner.length>0){
							this.surfacePic=this.surgical.methodsBanner[0]
						}else{
							this.surfacePic=uni.getStorageSync('uploadLogo')
						}
					break;
					case 'surgicalDesign'://手术设计
						console.log(this.surcigalDesignData)
						console.log(this.surcigalDesignData.designStlId)
						this.JsmodelId=this.surcigalDesignData.designId
						var modelIdType='majorTableId'
						var token=this.$store.getters['user/info'].token
						//要具体区分导板，器械，匹配情况
						var modelType=this.designType
						this.jstitle=(this.surcigalDesignData.titleDesign?'手术设计-'+this.surcigalDesignData.titleDesign:'手术设计')
						if(Object.values(this.surcigalDesignData.DesignBanner).length>0){
							this.surfacePic=Object.values(this.surcigalDesignData.DesignBanner)[0]
						}else{
							this.surfacePic=uni.getStorageSync('uploadLogo')
						}
					break;
					case 'predict'://效果预测
						var modelType='CaseHistoryEffectPrediction'
						var modelIdType='majorTableId'
						var token=''
						console.log(this.predictData.predictId)
						this.JsmodelId=this.predictData.predictId
						this.jstitle=(this.predictData.predictName?'效果预测-'+this.predictData.predictName:'效果预测')
						if(this.predictData.casePredictbanner.length>0){
							this.surfacePic=this.predictData.casePredictbanner[0].fileDownloadUrl
						}else{
							 this.surfacePic=uni.getStorageSync('uploadLogo')
						}
					break;	
					default:
						if(index.indexOf('ShoYii')>-1){//树蚁设计
							console.log(this.shoyiiObject.shoyiistlId)
							var modelIdType='majorTableId'
							var token=this.$store.getters['user/info'].token
							var modelType=this.shoyiiObject.shoyiilabel
							if(this.shoyiiObject.shoyiilabel=='CaseHistoryEffectPrediction'){//效果预测
								var modelIdType='id'
								var token=''
							}
							this.JsmodelId=this.shoyiiObject.shoyiiId
							this.jstitle=(this.shoyiiObject.shoyiititle?'树蚁设计-'+this.shoyiiObject.shoyiititle:'树蚁设计')
							if(Object.keys(this.shoyiiObject.shoyiithreemodel).length!=0){
								this.surfacePic=Object.values(this.shoyiiObject.shoyiithreemodel)[0]
								console.log(this.surfacePic)
							}else{
								 this.surfacePic=uni.getStorageSync('uploadLogo')
							}
						}
					break; 
				}
				if(e){//e存在，分享三维模型
					this.shareTitle=this.jstitle
					// 三维模型的url
					this.shareUrl=this.$JslineUrl+'&caseHistoryId='+this.id+'&userType=D'+'&token='+token+'&modelType='+modelType+'&titlename='+this.shareTitle+'&'+modelIdType+'='+this.JsmodelId
				}else{//e不存在，分享的是病例
					if(this.list.name){
					   this.shareTitle=this.list.name+'的病例'//病例标题是患者姓名的病例
					}else{
					  this.shareTitle='未命名的病例'//病例标题是患者姓名的病例
					}
					// 病例的url
					this.shareUrl=this.$onlineUrl+this.pageUrl+'?id='+this.paramter
				}
				console.log(this.shareUrl)
				console.log(this.shareTitle)
			},
			cancelshare(){
				this.$refs.sonWechatShare.close()
			},
			// 分享到微信聊天
			shareWeixin(){
				this.shareWeixinMixin()
			},
			// 分享到朋友圈
			shareFriend(){
				this.shareFriendMixin()
			},
			shareQq(){
				this.hrefQq=this.shareUrl
				this.shareQqMixin()
			},
			vrshow(){
				console.log('------触发')
				switch (this.middleIndex){
					case 'electric'://电子病例
						if(!this.electricData.electricId){
							uni.showToast({
								title:'无相关文件',
								icon:'none'
							})
							return;
						}else{
							this.threeModelName='ThreeDModel'//电子病例，这个固定
							this.threeModelId=this.electricData.electricId//电子病历的stlid
						}
					break;
					case 'surgicalMethod'://手术方法
						if(!this.surgicalMethodsId){
							uni.showToast({
								title:'无相关文件',
								icon:'none'
							})
							return;
						}else{
							console.log(this.methodsType)
							this.threeModelName=this.methodsType//导板，器械还是匹配情况
							this.threeModelId=this.surgicalMethodsId//手术方法的id
						}
					break;
					case 'surgicalDesign'://手术设计
						if(!this.surcigalDesignData.designId){
							uni.showToast({
								title:'无相关文件',
								icon:'none'
							})
							return;
						}else{
							this.threeModelName=this.designType//导板，器械还是匹配情况
							this.threeModelId=this.surcigalDesignData.designId//手术设计的stlid
						}
					break;
					case 'predict'://效果预测
						if(!this.predictData.predictId){
							uni.showToast({
								title:'无相关文件',
								icon:'none'
							})
							return;
						}else{
							this.threeModelName='CaseHistoryEffectPrediction'//效果预测
							this.threeModelId=this.predictData.predictId
						}
					break;
					default:
						if(this.middleIndex.indexOf('ShoYii')>-1){//树蚁设计
							if(!this.shoyiiObject.shoyiiId){
								uni.showToast({
									title:'无相关文件',
									icon:'none'
								})
								return;
							}else{
								this.threeModelName=this.shoyiiObject.shoyiilabel//导板，器械还是匹配情况
								this.threeModelId=this.shoyiiObject.shoyiiId//树蚁设计的id
							}
						}
					break;
				}
				console.log(this.threeModelName,this.threeModelId)
				 // 查询所有的设备组
				querydevice({}).then(res=>{
				 	console.log(res)
				 	if(res.data.code==0){
				 		this.deviceGroup=res.data.object
						this.$refs.SonVrshow.open()
				 	}else{
				 		uni.showToast({
				 			title:res.data.msg,
				 			icon:'none'
				 		})
				 	}
				}).catch(err=>{
				 	console.log(err)
				})
			},
			// 进入3js
			enterJs(){
				switch (this.middleIndex){
					case 'electric':
						console.log(this.electricData.stlId)
						if(!this.electricData.stlId){
							uni.showToast({
								title:'无相关文件',
								icon:'none'
							})
							return;
						}
					break;
					case 'surgicalMethod':
						if(!this.methodJsId){
							uni.showToast({
								title:'无相关文件',
								icon:'none'
							})
							return;
						}
						console.log(this.methodJsId)
					break;
					case 'surgicalDesign':
						if(!this.surcigalDesignData.designStlId){
							uni.showToast({
								title:'无相关文件',
								icon:'none'
							})
							return;
						}
					break;
					case 'predict':
						console.log(this.predictData.predictStlId)
						if(!this.predictData.predictStlId){
							uni.showToast({
								title:'无相关文件',
								icon:'none'
							})
							return;
						}
					break;
					default:
						if(this.middleIndex.indexOf('ShoYii')>-1){//树蚁设计
							if(!this.shoyiiObject.shoyiistlId){
								uni.showToast({
									title:'无相关文件',
									icon:'none'
								})
								return;
							}
						}
					break;
				}
				this.ThreeJs(this.middleIndex,'e')
				console.log(this.shareUrl)
				uni.navigateTo({
					url:'/pages/ThreejsShow/ThreejsShow?baseUrl='+encodeURIComponent(this.shareUrl),
					animationType:'pop-in'
				})
			},
			// 返回
			back(){
				// #ifdef APP-PLUS ||MP-WEIXIN
				var length=getCurrentPages().length-1
				var page1=getCurrentPages()[length-1].route
				if(page1=='pages/caselist/selectDesign'){//从设计团队过来
					uni.switchTab({
						url:'/pages/Tabbar/case'
					})
				}else{
					uni.navigateBack({
						delta:1
					})
				}
				// #endif
				// #ifdef H5
					var length=getCurrentPages().length-1
					// console.log(getCurrentPages()[length-1])
					if(getCurrentPages()[length-1]){
						var page1=getCurrentPages()[length-1].route
						// console.log(page1)
						if(page1=='pages/orderManage/orderDetail'){//从账单过来的，可以返回去
							uni.navigateBack({
								delta:1
							})
						}else{//其他情况是无效的
							uni.showToast({
								title:'网页端无效',
								icon:'none'
							})
						}
					}else{
						uni.showToast({
							title:'网页端无效',
							icon:'none'
						})
					}
				// #endif
			},
			// 寻求帮助弹窗
			help(){
				// let aa={
				// 	caseHistoryId:this.id,
				// 	pwdBool:this.userInfor.secondSwitch
				// }
				// uni.navigateTo({
				// 	url:'/pages/caselist/selectDesign?data='+encodeURIComponent(JSON.stringify(aa))
				// })
				// return
				// #ifdef H5
				uni.showToast({
					title:'网页端不能申请树蚁辅助',
					icon:'none'
				})
				return;
				// #endif
				// #ifndef H5
				if(this.assitDoc.length!=0&&this.assitDoc[0].identity=='XZ'){//协助病例不能帮助
					uni.showToast({
						title:'协助病例不能申请树蚁辅助',
						icon:'none'
					})
					return
				}
				//寻求帮助
				let data={
					caseHistoryId:this.id,
					pwdBool:this.userInfor.secondSwitch
				}
				uni.navigateTo({
					url:'/pages/caselist/selectDesign?data='+encodeURIComponent(JSON.stringify(data))
				})
				// #endif
			},
			// 订单确认服务
			ensureOrder(){
				this.getCaseOrder(this.id)
			},
			// 点击获取数据
			changeTab(data,index) {//点击获取数据，每次index的变动，都会触发change事件
				console.log(index)
				this.loadtextAll=''//更换menu时，底部tip默认为'';
				this.swiperCurrent = index
				this.middleIndex=data[index].id
				console.log(this.middleIndex)
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(data,e){
				let current = e.detail.current;
				console.log(current)
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
				this.middleIndex=data[current].id
			},
			// object匹配数据
			changeData(data,id){
				console.log(data)//对应的是匹配情况的数据
				var a=data.filter(item=>{
					if(item.id==id){
						return item
					}
				})
				this.methodJsId=a[0].stlModelIds
				console.log(this.methodJsId)
				if(a[0].stlPictureModelIds){
					var b=a[0].stlPictureModelIds.split(',')
					var indexArr=b.map(item=>{//遍历出匹配的下标
						return Object.keys(this.surgical.previewImage).indexOf(item)
					})
					var newArr=[]
					indexArr.filter(item=>{
						newArr.push(Object.values(this.surgical.previewImage)[item])
					})
					this.surgical.methodsBanner=newArr
					console.log(this.surgical.methodsBanner)
				}	
			},
			getData(index,id,boolean){//boolean为true，加载手术方法数据
				getcasedetail({
					caseHistoryId:id
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						var data=res.data.object
						this.list=data
						this.casedocinfor=data.attendingDoctors//数组，主治医生有多个？？
						if(data.assistDoctors.length!=0){
							this.assitDoc=data.assistDoctors//协助医生
						}
						// 获取手术方法的数据
						if(boolean=='true'&&data.video){//video 是个id
							getSurgicalDetail({//获取数据方法的数据
								surgicalPlanId:data.video,
							}).then(res=>{
								console.log(res)
								var surgicalData=res.data.object
								this.surgical=surgicalData
								if(surgicalData.surgicalPlanMatchingVOS&&surgicalData.surgicalPlanMatchingVOS.length!=0){
									this.surgicalMethodsId=surgicalData.surgicalPlanMatchingVOS[0].id
									this.surgical.titleName=surgicalData.surgicalPlanMatchingVOS[0].name
									// 获取匹配情况的第一条banner数据，在所有的banner中筛选出匹配情况对应的banner图
									this.changeData(surgicalData.surgicalPlanMatchingVOS,surgicalData.surgicalPlanMatchingVOS[0].id)
								}
								this.surgical.Alllist=surgicalData.surgicalPlanMatchingVOS//匹配情况
								this.surgical.Guidelist=surgicalData.guideVOS//导板匹配情况
								this.surgical.Instrumentlist=surgicalData.instrumentVOS//器械匹配情况
							})
						}
						console.log(index)
						switch (index){
							case 'electric':// 电子病例相关
								if(data.threeDModel.length!=0){
									this.electricData.electricId=data.threeDModel[0].id//用于电子病例的3js分享
									this.electricData.stlId=data.threeDModel[0].stlFileModelId//stl的id，默认是第一组数据
									this.electricData.threemodel=data.threeDModel[0]//用于电子病历的三维数据显示,默认是第一组的
									this.electricData.threeModeltitle=data.threeDModel[0].title//用于电子病历的三维数据标题
								}
								var token=this.$store.getters['user/info'].token
								this.jstitle=(this.electricData.threeModeltitle?'电子病例-'+this.electricData.threeModeltitle:'电子病例')
								this.shareUrl=this.$JslineUrl+'&caseHistoryId='+this.id+'&userType=D'+'&token='+token+'&modelType=ThreeDModel'+'&titlename='+this.jstitle+'&majorTableId='+this.electricData.electricId
							break;
							case 'surgicalDesign':// 手术设计
								this.surcigalDesignData.DesignData=data//所有的病例里的数据（器械，导板，匹配情况全部分开）
								if(data.matching&&data.matching.length!=0){
									this.surcigalDesignData.matching=data.matching//匹配情况的数据
									this.surcigalDesignData.titleDesign=data.matching[0].name
									this.surcigalDesignData.designId=data.matching[0].id//匹配情况的对象的id,区别于stl的id
									this.surcigalDesignData.designStlId=data.matching[0].stlModelIds//stl的id,默认是第一个
									this.surcigalDesignData.DesignBanner=data.matching[0].stlPictureUrl//默认是匹配情况的第一条数据
								}
								if(data.guides&&data.guides.length!=0){//导板数据
									this.surcigalDesignData.DesignGuid=data.guides
								}
								if(data.instrument&&data.instrument.length!=0){//器械数据
									this.surcigalDesignData.DesignInstrument=data.instrument
								}
								if(data.surgicalDesignContentDTO){
									this.surcigalDesignData.files=data.surgicalDesignContentDTO//ppt,word 的文件
								}
								console.log(this.surcigalDesignData)
							break;
							case 'predict'://效果预测
								this.predictData.casePredictbanner=[]//每次切换都设置为空
								this.predictData.casePredict=data.caseHistoryEffectPredictions
								if(data.caseHistoryEffectPredictions&&data.caseHistoryEffectPredictions.length!=0){
									this.predictData.predictName=data.caseHistoryEffectPredictions[0].name
									this.predictData.predictId=data.caseHistoryEffectPredictions[0].id
									this.predictData.predictStlId=data.caseHistoryEffectPredictions[0].stlModelIds
									console.log(this.predictData.casePredict)
									this.predictData.casePredictbanner=Object.values(this.predictData.casePredict[0].stlPictureUrl) 
									console.log(this.predictData.casePredictbanner)//效果预测的轮播图
								}
							break;
							case 'follow'://术后随访
								this.followUpData=data.followUps
								console.log(this.followUpData)
							break;
							default:
								if(index.indexOf('ShoYii')>-1){//树蚁设计
									console.log(data)
									var newData=data.caseAidedDesignContentList
									if(data.caseAidedDesignContentList&&data.caseAidedDesignContentList.length!=0){
										// 根据树蚁设计时间排序，从低到高，即从1-n期
										newData.sort((a,b)=>{
											return moment(b.createTime).format('x')>moment(a.createTime).format('x')?-1:1
										})
										console.log(newData)
										// 树蚁设计添加n期标识，id:ShoYii${index+1}
										newData.forEach((item,index)=>{
											console.log(index)
											// 编译器扩展运算符报错
											newData[index]={...item,...{id:`ShoYii${index+1}`}}
										})
										console.log(newData)
										this.ShoYiiData=newData
										console.log(this.ShoYiiData)
										// 获取ShoYii后边的字符，用于判断是n期树蚁设计									
										var clipIndex=index.substr(6,index.length)
										console.log(clipIndex)
										// 默认是三维模型
										if(data.caseAidedDesignContentList&&data.caseAidedDesignContentList[0].threeDModel.length>0){
											this.shoyiiObject={ //默认获取的是三维重建的数据
												shoyiiId:data.caseAidedDesignContentList[clipIndex-1].threeDModel[0].id,
												shoyiithreemodel:data.caseAidedDesignContentList[clipIndex-1].threeDModel[0].previewImage,
												shoyiistlId:data.caseAidedDesignContentList[clipIndex-1].threeDModel[0].stlFileModelId,//stl的id，默认是第一组数据
												shoyiititle:data.caseAidedDesignContentList[clipIndex-1].threeDModel[0].title,
												shoyiilabel:'ThreeDModel',//用于进入3js,默认是三维重建
											}
										}
										console.log('-------------------------')
										console.log(this.shoyiiObject)
									}																
								}
							break;
						}
					}else {
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			// 用于获取订单相关的数据
			getCaseOrder(id){
				getCaseOrder({
					caseHistoryId:id
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						if(res.data.object[0].statusCode!='101'){//未下单状态不用显示订单数据
							this.orderData=res.data.object
						}
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			// 事件的监听
			// 手术设计
			designDataSon(data){
				console.log(data)
				this.surcigalDesignData.DesignBanner=data.DesignBanner//轮播图上的三维数据
				this.surcigalDesignData.designStlId=data.designStlId
				this.surcigalDesignData.titleDesign=data.titleDesign
				this.surcigalDesignData.designId=data.designId//获取的整个导板或器械或匹配情况id
				console.log(data.count)
				switch (data.count){
					case 0:
					 this.designType='Matching'
					break;
					case 1:
					 this.designType='GuidePlate'
					break;
					case 2:
					 this.designType='Instrument'
					break;
					default:
					break;
				}
			},
			//监听到电子病例更换的数据
			electricDataSon(data){
				console.log('123')
				console.log(data)
				this.electricData.threemodel=data//轮播图上的三维数据
				this.electricData.threeModeltitle=data.title//轮播图上的三维数据标题
				this.electricData.stlId=data.stlFileModelId//轮播图上的三维数据的stlid
				this.electricData.electricId=data.id//这个是3js文件的id;跟stlid要区分开
			},
			// 手术方法
			methodsDataSon(data){
				// console.log(data)
				// console.log(data.methodsId)
				this.surgical.methodsBanner=data.bannerList//轮播图上的三维数据
				this.surgicalMethodsId=data.methodsId//用于vr设备
				this.surgical.titleName=data.titleName
				this.methodJsId=data.methodJsId//用于进入3js
				console.log(data.methodJsId)
				switch (data.count){
					case 0:
					 this.methodsType='Matching'
					break;
					case 1:
					 this.methodsType='GuidePlate'
					break;
					case 2:
					 this.methodsType='Instrument'
					break;
					default:
					break;
				}
			},
			// 效果预测
			predictDataSon(data){
				console.log(data)
				this.predictData.casePredictbanner=data.predictData//轮播图上的三维数据
				this.predictData.predictName=data.name//轮播图上的三维数据标题
				this.predictData.predictId=data.predictId
				this.predictData.predictStlId=data.predictStlId
			},
			// 树蚁设计
			shoyiidataSon(data){
				console.log(data) 
				if(data.index=='electric'){//三维文件
					this.shoyiiObject={
						shoyiiId:data.data.id,////用于电子病例的3js分享
						shoyiithreemodel:data.data.previewImage,//用于电子病历的三维数据显示,默认是第一组的
						shoyiistlId:data.data.stlFileModelId,//stl的id，默认是第一组数据
						shoyiititle:data.data.title,//用于电子病历的三维数据标题
						shoyiilabel:data.label
					}
				}else if(data.index=='surgicalDesign'){//设计
					console.log(data)
					this.shoyiiObject={
						shoyiiId:data.data.id,////用于电子病例的3js分享
						shoyiithreemodel:data.data.stlPictureUrl,//用于电子病历的三维数据显示,默认是第一组的
						shoyiistlId:data.data.stlModelIds,//stl的id，默认是第一组数据
						shoyiititle:data.data.name,//用于电子病历的三维数据标题
						shoyiilabel:data.label
					}
				}else if(data.index=='predict'){//预测
					this.shoyiiObject={
						shoyiiId:data.data.id,////用于电子病例的3js分享
						shoyiithreemodel:data.data.stlPictureUrl,//用于电子病历的三维数据显示,默认是第一组的
						shoyiistlId:data.data.stlModelIds,//stl的id，默认是第一组数据
						shoyiititle:data.data.name,//用于电子病历的三维数据标题
						shoyiilabel:data.label
					}
				}
				console.log(this.shoyiiObject)
			},
			// 动态获取菜单
			async getMenu(id){
				await getcasedetail({
					caseHistoryId:id
				}).then(res=>{
					console.log('first------------')
					console.log(res)
					if(res.data.code==0){
						var data=res.data.object
						// 树蚁多期，插入menu
						if(data.caseAidedDesignContentList&&data.caseAidedDesignContentList.length!=0){
							for(let i=1;i<=data.caseAidedDesignContentList.length;i++){
								this.tabs.splice(i,0,{name:`树蚁设计(${i}期)`,id:`ShoYii${i}`})
							}
						}
						// tab组件初始化时缓存，v-if重新渲染
						this.reShow=true
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
						this.reShow=true
					}
				})
			},
			// 新增menu
			addMenu(){
				// 经典案例中，有手术方法
				this.tabs.splice(1,0,{name:'手术方法',id:'surgicalMethod'})
				this.reShow=true
			},
		},
		computed:{
			// #ifdef MP-WEIXIN
			widthLength(){
				return 750 - this.menuButtonInfo.width*2
			},
			// #endif
			...mapState({
				socketData:state=>state.socket.socketData
			}),
			userInfor(){//账户类型(accountOwner,);是否设置二级密码 secondSwitch
				return this.$store.getters['user/info']
			},
		},
		async onLoad(options) {
			console.log(options.id)
			this.id=options.id//病例id
			if(options.classifycase&&options.classifycase=='true'){//从经典案例过来
				this.classifycase=options.classifycase
				console.log('经典案例')
				// 新增手术方法menu
				this.addMenu()
				// 获取病例信息
				if(!this.checkAudit()){//审核状态通过
					// 获取病例数据
					this.getData('electric',options.id,options.classifycase)
				}
			}else{
				console.log('案例详情')
				// 根据设计信息，添加树蚁设计menu
				await this.getMenu(options.id)
				console.log('xxxxxxxxxxxxxxxxxxx')
				// 判断是否有辅助设计
				if(!this.checkAudit()){//审核状态通过
					// 获取病例数据
					this.getData('electric',options.id)
					// 获取订单相关的数据
					this.getCaseOrder(options.id)
				}
			}
			var data=getPageRoute('id')
			this.pageUrl=data[0]
			this.paramter=data[1]
			// #ifdef MP-WEIXIN
			// 小程序胶囊位置
			this.menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			// #endif
		},
		onBackPress(e) {
			console.log(e)
			if(e.from=='backbutton'){
				// #ifdef APP-PLUS
				var length=getCurrentPages().length-1
				var page1=getCurrentPages()[length-1].route
				// console.log(page1)
				if(page1=='pages/caselist/selectDesign'){//从设计团队过来
					uni.switchTab({
						url:'/pages/Tabbar/case'
					})
					return true
				}else{
					uni.navigateBack({
						delta:1
					})
					return true
				}
				// #endif
			}
		},
	}
</script>

<style scoped lang="scss">
	.status-contents{
	    height: calc(var(--status-bar-height) + 88rpx); 
	}  
	.top-view{  
	    width: 100%;  
	    position: fixed;  
	    top:0;  
	}  
	.status{  
	    height:var(--status-bar-height);  
	}
	.navTitle{
		 width: 100%;  
		 position: fixed;  
		 top: var(--status-bar-height);  
		 height: 88rpx;padding: 0 20rpx;
		 display: flex;align-items: center;
	}
	.left{
		font-size: 30rpx;
		display: flex;
		align-items: center;
		flex:1;
		.title{
			color: #000000;
			font-family: PingFang-SC-Bold;
			font-weight: bold;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 1;
			overflow: hidden;
		}
	}
	.caseAll{
		display: flex;
		flex-direction: column;
		height: 100vh;
	}
	.wrap {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	.swiper-box {
		flex: 1;
	}
	.swiper-item {
		height: 100%;
	}
	.chat{
		position: fixed;bottom: 20%;right: 20%;
		.chatIcon{
			color: #fff;position: relative;display: flex;align-items: center;justify-content: center;
			width: 150rpx;height: 150rpx;border-radius: 50%;background-color: #007AFF;
		}
	}
</style>
