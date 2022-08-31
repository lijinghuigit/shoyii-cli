<template>
	<view class="">
		<!-- 病例介绍 -->
		<view class="introduce">
			<view class="example-body">
				<text>病例介绍</text>
			</view>
			<view class="content">
				<view class="text1">
					<text>病历号：</text>
					<text>{{patientCode}}</text>
				</view>
				<view class="text1">
					<text>患者姓名：</text>
					<text>{{patientName||'暂无数据'}}</text>
				</view>
			</view>
		</view>
		<!-- 十二项 -->
		<view class="introduce">
			<view class="example-body">
					<text>诊断信息</text>
			</view>
			<view class="content">
				<view class="text1">
					<text>{{twelveItems.diagnosticMessage||'暂无数据'}}</text>
				</view>
			</view>
		</view>
		<view class="introduce">
			<view class="example-body">
					<text>主诉</text>
			</view>
			<view class="content">
				<view class="text1">
					<text>{{twelveItems.complain||'暂无数据'}}</text>
				</view>
			</view>
		</view>
		<view class="introduce">
			<view class="example-body">
					<text>现病史</text>
			</view>
			<view class="content">
				<view class="text1">
					<text>{{twelveItems.historyPresentIllness||'暂无数据'}}</text>
				</view>
			</view>
		</view>
		<view class="introduce">
			<view class="example-body">
					<text>既往史</text>
			</view>
			<view class="content">
				<view class="text1">
					<text>{{twelveItems.previousHistory||'暂无数据'}}</text>
				</view>
			</view>
		</view>
		<view class="introduce">
			<view class="example-body">
					<text>过敏史</text>
			</view>
			<view class="content">
				<view class="text1">
					<text>{{twelveItems.allergicHistory||'暂无数据'}}</text>
				</view>
			</view>
		</view>
		<view class="introduce">
			<view class="example-body">
					<text>个人史</text>
			</view>
			<view class="content">
				<view class="text1">
					<text>{{twelveItems.personalHistory||'暂无数据'}}</text>
				</view>
			</view>
		</view>
		<view class="introduce">
			<view class="example-body">
					<text>体格检查</text>
			</view>
			<view class="content">
				<view class="text1">
					<text>{{twelveItems.healthCheckup||'暂无数据'}}</text>
				</view>
			</view>
		</view>
		<view class="introduce">
			<view class="example-body">
					<text>化验检查</text>
			</view>
			<view class="content">
				<view class="text1">
					<text>{{twelveItems.laboratoryExamination||'暂无数据'}}</text>
				</view>
			</view>
		</view>
		<view class="introduce">
			<view class="example-body">
					<text>特殊检查：CT,B超，X线片</text>
			</view>
			<view class="content">
				<view class="text1">
					<text>{{twelveItems.specialInspection||'暂无数据'}}</text>
				</view>
			</view>
		</view>
		<view class="introduce">
			<view class="example-body">
					<text>疾病诊断</text>
			</view>
			<view class="content">
				<view class="text1">
					<text>{{twelveItems.diseaseDiagnosis||'暂无数据'}}</text>
				</view>
			</view>
		</view>
		<view class="introduce">
			<view class="example-body">
					<text>鉴别诊断</text>
			</view>
			<view class="content">
				<view class="text1">
					<text>{{twelveItems.antidiastole||'暂无数据'}}</text>
				</view>
			</view>
		</view>
		<view class="introduce">
			<view class="example-body">
					<text>建议治疗方案</text>
			</view>
			<view class="content">
				<view class="text1">
					<text>{{twelveItems.recommendedTreatment||'暂无数据'}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		props:{
			// 病例介绍
			twelveItems:{
				type:Object,
				default:()=>{
					return{
						diagnosticMessage:'',//诊断信息
						complain:'',//主诉
						historyPresentIllness:'',//现病史
						previousHistory:'',//既往史
						allergicHistory:'',//过敏史
						personalHistory:'',//个人史
						healthCheckup:'',//体格检查
						laboratoryExamination:'',//化验检查
						specialInspection:'',//特殊检查
						diseaseDiagnosis:'',//疾病诊断
						antidiastole:'',//鉴别诊断
						recommendedTreatment:'',//建议治疗方案
					}
				}
			},
			// 就诊历史
			patientName:{
				type:String,
				default:''
			},
			patientCode:{
				type:Number,
				default:null
			}
		},
	}
</script>

<style scoped>
	@import "@/common/css/twelveItem.css";
</style>
