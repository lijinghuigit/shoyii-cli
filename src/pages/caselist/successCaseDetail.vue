<template>
	<view class="">
		<v-tabs class='tabMenu' v-model="current" :scroll="false" :tabs="list" fontSize='24rpx' bgColor="#ffffff" :fixed="fixedBool" color="#000000" :pills='pills' lineColor='#86B0D4' activeColor="#86B0D4" @change="tabsChange">
		</v-tabs>
		<scroll-view scroll-y="true" enable-flex>
			<!-- 电子病例 -->
			<view class="" v-if="current==0">
				<!-- 三维数据 -->
				<electric :bannerList='bannerList' :threemodel='threemodel' @successelectric='successelectric'></electric>
				<!-- 医生信息 -->
				<docinfor :docInfor='docInfor' :Creatime='Creatime'></docinfor>
				<view class='section'>
					<!-- 电子病例的十二项的数据，以及就诊历史 -->
					<successtwelve-item :twelveItems='twelveItems' :patientName='patientName' :patientCode='patientCode'></successtwelve-item>
				</view>
			</view>
			<!-- 手术设计 -->
			<view class="" v-if="current==1">
				<!-- 三维数据 -->
				<design @successdesign='successdesign' :designData='designData' :matchData='matchData' :guideData='guideData' :instrumentData='instrumentData' :inplantData='inplantData'></design>
				<!-- 医生信息 -->
				<docinfor :docInfor='docInfor' :Creatime='Creatime' :files='files'></docinfor>
			</view>
		</scroll-view>	
	</view>
</template>

<script>
	import {getSuccessDetail} from '@/utill/api/surgical/getSurgical.js'
	import Electric from './components/SuccessCase/Electric.vue'
	import Docinfor from './components/SuccessCase/Docinfor.vue'
	import ElectricInfor from './components/CaseElectric/ElectricInfor.vue'
	import SuccesstwelveItem from './components/SuccessCase/SuccesstwelveItem.vue'
	import Design from './components/SuccessCase/Design.vue'
	export default{
		components:{
			// 成功案例的电子病例
			Electric,
			Docinfor,
			ElectricInfor,
			SuccesstwelveItem,
			Design
		},
		data(){
			return{
				fixedBool:true,
				pills:false,
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				list: ['电子病例','手术设计'],
				threemodel:[],
				bannerList:{},
				docInfor:{},
				electricData:[],
				surgicalDesign:[],
				Creatime:null,
				twelveItems:{},//十二项数据
				patientName:'',//病人姓名
				patientCode:null,//病历号
				matchData:[],//手术设计的匹配情况,只取第一个
				guideData:[],
				instrumentData:[],
				inplantData:[],
				designTitle:'',
				designData:{},//设计的三维数据
				files:{},//ppt,word 的文件
			}
		},
		methods:{
			// tabs通知swiper切换
			tabsChange(index) {
				console.log(index)
				this.current=index
			},
			// scroll-view到底部加载更多
			onreachBottom() {
				console.log('加载到底部')
			},
			//监听到电子病例更换的数据
			successelectric(data){
				console.log(data)
				this.bannerList=data//轮播图上的三维数据
			},
			//监听到电子病例更换的数据
			successdesign(data){
				console.log(data)
				this.designData=data.designData//轮播图上的三维数据
			}
		},
		onLoad(options) {
			console.log(options)
			getSuccessDetail({
				caseId:options.caseId
				// caseId:19
			}).then(res=>{
				console.log(res)
				if(res.data.code==0){
					var data=res.data.object
					this.bannerList=data.diagnosisModelList[0]
					this.threemodel=data.diagnosisModelList
					this.docInfor=data.doctorVO
					this.Creatime=data.createTime
					this.twelveItems=data.medicalRecords
					this.patientCode=data.caseHistoryId
					this.patientName=data.patientName
					this.guideData=data.guideList
					this.instrumentData=data.instrumentList
					this.inplantData=data.implantList
					this.matchData=data.surgicalPlanMatchingList
					this.designData=data.surgicalPlanMatchingList[0]//默认是匹配情况的数据
					if(data.surgicalDesignContentDTO){
						this.files=data.surgicalDesignContentDTO//ppt,word 的文件
					}
				}
			}).catch(err=>{
				console.log(err)
			})
		}
	}
</script>

<style>
</style>
