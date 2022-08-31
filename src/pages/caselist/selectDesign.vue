<template>
	<view class="selectDesign" :data-theme='themeType'>
		<view class="" @click="getMore">
			<u-notice-bar mode="horizontal" :list="noticetip" type="error" speed='80' :more-icon='true'
			style='pointer-events:none;'
			></u-notice-bar>
		</view>
		<view class="department">
			<view class="title" style="display: flex;align-items: center;justify-content: space-between;">
				<text class="titleTip sy_title_deep">科室选择：</text>
				<view class="Printmaterial" @click="selectDepartment">
					<text class="content sy_title_deep">{{departmentText.name}}</text>
					<uni-icons type="arrowdown" :color="themeType=='dark'?'#fff':'rgb(51, 51, 51)'"></uni-icons>
				</view>
			</view>
			<!-- 其他的设计服务的选择 -->
			<view class="selectService">
				<!-- 服务选择 -->
				<view class="" style="display: flex;justify-content: space-between;align-items: center;">
					<view style="display: flex;flex-direction: column;">
						<u-checkbox
							@change="change(0,serviceList,serviceList.threeDimensionalReconstructionServicePrices,$event)"
							v-if="serviceList.threeDimensionalReconstructionServicePrices"
							style="padding: 0 10rpx;"
							v-model="checkedService.threeRebuild" 
							:disabled="checkedService.threeRebuild_disabled"
							active-color="#69CDFF"
						>精准三维重建</u-checkbox>
						<u-checkbox
							v-if="serviceList.modelServiceList&&serviceList.modelServiceList.length!=0"
							@change="change(2,serviceList,serviceList.modelServiceList[0].price,$event)"
							style="padding: 0 10rpx;"
							v-model="checkedService.modelPrint" 
							active-color="#69CDFF"
						>模型打印</u-checkbox>
					</view>
					<view class="" style="display: flex;flex-direction: column;">
						<u-checkbox
							@change="change(1,serviceList,serviceList.surgicalDesignServicePrices,$event)"
							v-if="serviceList.surgicalDesignServicePrices"
							style="padding: 0 10rpx;"
							v-model="checkedService.threeDesign" 
							:disabled="checkedService.threeDesign_disabled"
							active-color="#69CDFF"
						>手术三维设计</u-checkbox>
						<u-checkbox
							v-if="serviceList.guidePlateServiceList&&serviceList.guidePlateServiceList.length!=0"
							@change="change(3,serviceList,serviceList.guidePlateServiceList[0].price,$event)"
							style="padding: 0 10rpx;"
							v-model="checkedService.guideMake" 
							active-color="#69CDFF"
						>导板制备</u-checkbox>
					</view>
				</view>
				<!-- 软组织必须是价格存在 -->
				<view class="sy_title_deep" v-if="serviceList.softTissueServicePrice"
				style="display: flex;align-items: center;justify-content: space-between;margin: 10rpx 0;">
					<text>软组织</text>
					<!-- 三维重建为false，则禁用 -->
					<u-switch v-model="checkedService.softTissue"
					size='40'
					@change="change(4,serviceList,serviceList.softTissueServicePrice,$event)"
					active-color="#53D180" inactive-color='#999' active-value='1' inactive-value='0'></u-switch>
				</view>
				<!-- 材料打印 -->
				<view class="">
					<view class="" style="display: flex;justify-content: space-between;align-items: center;padding: 10rpx 0;" 
					v-if="checkedService.modelPrint">
						<text class="titleTip sy_title_deep">模型材料：</text>
						<view class="Printmaterial" @click="materialShow(1,true)">
							<text class="content sy_title_deep">{{modelmaterial.content}}</text>
							<uni-icons type="arrowdown" :color="themeType=='dark'?'#fff':'rgb(51, 51, 51)'"></uni-icons>
						</view>
					</view>
					<view class="" style="display: flex;justify-content: space-between;align-items: center;padding: 10rpx 0;" 
					v-if="checkedService.guideMake">
						<text class="titleTip sy_title_deep">导板材料：</text>
						<view class="Printmaterial" @click="materialShow(2,true)">
							<text class="content sy_title_deep">{{Guidematerial.content}}</text>
							<uni-icons type="arrowdown" :color="themeType=='dark'?'#fff':'rgb(51, 51, 51)'"></uni-icons>
						</view>
					</view>
				</view>
			</view>
			<!-- 预估价 -->
			<view class="sy_title_deep" style="font-weight: bold;">
				<text>预计价格:</text>
				<text style="color: #FD3130;font-size: 30rpx;margin-left: 20rpx;">
				{{`￥${$store.getters['createorder/totalPrice']}`}}
				</text>
			</view>
			<!-- 额外的设计要求 -->
			<view class="Extradesign">
				<view class="tip sy_title_deep">
					<text>设计特别要求说明：</text>
				</view>
				<u-input v-model="checkedService.Extradesign" type="textarea" :border="true"
				:custom-style="themeType=='dark'?{color:'#8f8f8f'}:{color:'#000'}"/>
			</view>
		</view>
		<!-- 提交或取消订单 -->
		<view class="buttons" style="position: fixed;bottom:80rpx;width: 100%;text-align: center;">
			<button class="btn amendbtn" @click='cancel'>取消</button>
			<button class="btn" @click='commitOrder'>提交</button>
		</view>
		<!-- 获取打印材料的弹窗 -->
		<u-select v-model="Sheetshow" :list="materialList" @confirm='selectMaterial'></u-select>
		
		<u-modal v-model="nextshow" @confirm='d_confirm' @cancel='d_cancel' :show-title='false' :show-cancel-button='true'>
			<view class="slot-content" style="text-align: center;">
				<view class="title" style="padding: 20rpx 0;border-bottom: 1px solid #F8F8F8;">
					<text>树蚁辅助确认</text>
				</view>
				<view class="content">
					<text>服务内容：</text> 
					<text class="d_items" v-if="checkedService.threeRebuild">精细三维重建</text>
					<text class="d_items" v-if="checkedService.threeDesign">手术三维设计</text>
					<view class="" style="padding: 20rpx 0;">
						<text class="d_items" v-if="modelmaterial.id">{{`模型打印(${modelmaterial.content})`}}</text>
						<text class="d_items" v-if="Guidematerial.id">{{`导板制备(${Guidematerial.content})`}}</text>
					</view>
					<text class="d_items" v-if="checkedService.softTissue">软组织</text>
				</view>
			</view>
		</u-modal>
		<u-popup v-model="pwdshow" mode="center" :mask='false' :closeable='true'>
			<view style="background-color: #FFFFFF;border: 1px solid #999;padding: 60rpx 30rpx;">
				<view class="" style="padding: 30rpx 0;">
					<u-field
						:password='true'
						v-model="secondPwd"
						label="密码"
						placeholder="请填写二级密码"
					>
					</u-field>
				</view>
				<view class="" style="display: flex;justify-content: space-between;padding: 30rpx 0 0;">
					<u-button size="medium" @click="cancelPwd">取消</u-button>
					<u-button type="primary" size="medium" @click="surePwd">确定</u-button>
				</view>
			</view>
		</u-popup>
		<u-modal v-model="noticeshow" :show-confirm-button='false' :show-title='false' mask-close-able>
			<view class="slot-content" style="text-align: center;">
				<view class="title" style="padding: 20rpx 0;border-bottom: 1px solid #F8F8F8;">
					<text>上传ct文件可通过以下方式</text>
				</view>
				<view class="concatbox">
					<u-subsection :list="list" :current="curNow" @change='changetype'></u-subsection>
					<view class="" v-if="curNow==0">
						<view class="item" @click="copyOrder('CT@shouyii.com')">
							<text>CT@shouyii.com(推荐)</text>
							<text class="iconfont iconfuzhi1 icon"></text>
						</view>
						<view class="item" @click="copyOrder('dhuanwen123@aliyun.com')">
							<text>dhuanwen123@aliyun.com</text>
							<text class="iconfont iconfuzhi1 icon"></text>
						</view>
					</view>
					<view class="" v-if="curNow==1">
						<view class="item">
							<text>19157432399(推荐)</text>
							<u-icon name="phone" color='#69CDFF' @click="callphone(19157432399)" class='icon'></u-icon>
						</view>
						<view class="item">
							<text>18819813869</text>
							<u-icon name="phone" color='#69CDFF' @click="callphone(18819813869)" class='icon'></u-icon>
						</view>
					</view>
				</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import {help,getDepartments} from './api/help.js'
	import {getorderPrice} from '@/utill/api/order/order.js'
	export default{
		data(){
			return{
				noticeshow:false,
				noticetip:['上传ct文件，请通过邮箱（CT@shouyii.com或dhuanwen123@aliyun.com）上传或电话（18819813869或19157432399）联系我们'],
				list: [
					{
						name: '邮箱上传'
					}, 
					{
						name: '电话联系'
					}
				],
				curNow: 0,
				checkedService:{
					threeRebuild:false,//三维重建
					threeRebuild_disabled:false,//是否禁用
					threeDesign:false,//三维设计
					threeDesign_disabled:false,//是否禁用
					modelPrint:false,//模型打印
					guideMake:false,//导板制造
					softTissue:false,//软组织
					Extradesign:'',//额外的设计要求
				},
				pwdshow:false,//密码框
				secondPwd:'',//密码
				caseData:{},//从病例传过来的信息（是否有二级密码，病例id）
				serviceList:{
					guidePlateServiceList:[],//导板价格，id
					modelServiceList:[]//模型price,id
				},//服务内容		
				nextshow:false,//下一步时的弹窗
				Sheetshow:false,//popup的弹窗
				materialList: [],//下拉框中的数据，包含科室/材料
				Guidematerial:{
					content:'选择导板材料',
					id:null,
					price:0
				},
				modelmaterial:{
					content:'选择模型材料',
					id:null,
					price:0
				},
				materialType:null,//用于判断是那种打印类型的材料，从而获取对应的数据
				tabindex:'',//服务类型
			}
		},
		computed:{
			departmentText(){
				// console.log(this.$store.getters['user/info'].departmentName)
				return {
					name:this.$store.getters['user/info'].departmentName?this.$store.getters['user/info'].departmentName:'请选择科室',
					id:this.$store.getters['user/info'].departmentId?this.$store.getters['user/info'].departmentId:'',
				}
			},
		},
		methods:{
			getMore(){
				this.noticeshow=true
			},
			changetype(e){
				this.curNow=e
			},
			copyOrder(data){
				uni.setClipboardData({
				    data: data,
				    success: function () {
				        console.log('success');
				    }
				});
			},
			callphone(data){
				console.log(data)
				uni.makePhoneCall({
					phoneNumber: data
				});
			},
			change(index,data,price,e){//如果是材料，price为材料第一项价格，其他则分别是服务类型的价格
				// console.log(index,price,e)
				switch (index){
					case 0://三维重建
						if(e.value){//选择
							this.$store.commit('createorder/addPrice',[{type:'1',price}])
						}else{//未选择
							this.$store.commit('createorder/reducePrice',[{type:'1',price}])
						}
					break;
					case 1://三维设计
						if(e.value){//选择
							this.$store.commit('createorder/addPrice',[
								{type:'1',price:data.threeDimensionalReconstructionServicePrices},//三维重建价格
								{type:'3',price},
							])							
							this.checkedService.threeRebuild=true,
							this.checkedService.threeRebuild_disabled=true							
						}else{//未选择
							this.$store.commit('createorder/reducePrice',[
								{type:'1',price:data.threeDimensionalReconstructionServicePrices},
								{type:'3',price},
							])
							if(!this.checkedService.modelPrint){//没有选择模型打印								
								this.checkedService.threeRebuild=false,
								this.checkedService.threeRebuild_disabled=false							
							}
						}
					break;
					case 2://模板打印
						// console.log(e.value)
						if(!e.value){
							// 取消选择模型打印,删除已选材料的价格
							console.log(this.modelmaterial)//所选择的模型材料数据
							this.$store.commit('createorder/reducePrice',[
								{type:'1',price:data.threeDimensionalReconstructionServicePrices},//三维重建价格
								{type:'6',price:this.modelmaterial.price},//所选的模型的材料价格，不一定是默认项
							])
							//没有选择导板或没有选择手术设计
							if(!this.checkedService.guideMake||!this.checkedService.threeDesign){//
								this.checkedService.threeRebuild=false,
								this.checkedService.threeRebuild_disabled=false								
							}
							if(this.checkedService.threeDesign){
								this.checkedService.threeRebuild=true,
								this.checkedService.threeRebuild_disabled=true		
							}
							if(this.checkedService.guideMake){
								this.checkedService.threeRebuild=true,
								this.checkedService.threeRebuild_disabled=true		
							}
							// 取消选择模型后,材料数据恢复为空，并减去所选材料的价格
							this.modelmaterial={
								content:'选择模型材料',
								id:null,
								price:0
							}
						}else{
							console.log(this.checkedService.guideMake)
							// 加金额在用户选择材料之后							
							this.checkedService.threeRebuild=true
							this.checkedService.threeRebuild_disabled=true
							this.checkedService.modelPrint=true
							// 获取模板材料（在该函数里，会进行一次默认材料价格的累加，所以不用在change里添加）
							this.materialShow(1,false)
						}
					break;
					case 3://导板制备
						// console.log(e.value)
						if(!e.value){
							// 取消所选材料的价格，不一定是默认的材料啊
							console.log(this.Guidematerial)//所选择的导板材料数据
							this.$store.commit('createorder/reducePrice',[
								{type:'1',price:data.threeDimensionalReconstructionServicePrices},//三维重建价格
								{type:'3',price:data.surgicalDesignServicePrices},//手术设计
								{type:'4',price:this.Guidematerial.price},
							])
							if(this.checkedService.modelPrint){//是否选择模型
								this.checkedService.threeDesign=false,
								this.checkedService.threeDesign_disabled=false
							}else{
								this.checkedService.threeRebuild=false,
								this.checkedService.threeRebuild_disabled=false,
								this.checkedService.threeDesign=false,
								this.checkedService.threeDesign_disabled=false
							}
							// 取消导板选择后，材料未空，并进行该材料价格的删减
							this.Guidematerial={
								content:'选择导板材料',
								id:null,
								price:0
							}
						}else{
							console.log(this.checkedService.modelPrint)
							// 材料价格累加在确认材料中进行
							this.checkedService.threeRebuild=true,
							this.checkedService.threeDesign=true,
							this.checkedService.threeRebuild_disabled=true,
							this.checkedService.threeDesign_disabled=true,
							this.checkedService.guideMake=true
							// 获取导板材料，会在该函数中进行导板默认材料价格的累加，所以change中不用操作
							this.materialShow(2,false)
						}
					break;
					case 4://软组织
						// if(!this.checkedService.threeRebuild){//如果三维重建没选择，则软组织被禁用
						// 	uni.showToast({
						// 		title:'精准三维重建必选',
						// 		icon:'none'
						// 	})
						// 	// this.checkedService.softTissue=false
						// 	return
						// }
						if(e=='1'){//选择
							this.$store.commit('createorder/addPrice',[{type:'unique',price}])//软组织没有type类型，所以自定义为唯一的
						}else{//未选择
							this.$store.commit('createorder/reducePrice',[{type:'unique',price}])
						}
					break;
					default:
					break;
				}
			},
			//选择科室
			selectDepartment(){
				// 获取科室（根据科室，获取该科室对应的服务及所有材料的价格）
				getDepartments({
					// authority:'doctor'
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						var data=res.data.object
						var data1=JSON.parse(JSON.stringify(data).replace(/"diseaseCategoryName"/g,'"label"').replace(/"diseaseCategoryId"/g,'"value"').replace(/"price"/g,'"extra"'))//extra代替价格
						this.materialList=data1//所有科室的数据
						console.log(data1)
						this.materialType=0//科室为0，用于科室与材料select区分
						this.Sheetshow=true
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
			materialShow(index,showBool){
				console.log(this.serviceList)
				// var printType;
				if(index==1){//模型材料
					this.materialType=index
					// printType='1'
					// 模型材料的价格，name,id
					var data=this.serviceList.modelServiceList
					console.log(this.serviceList.modelServiceList)
					this.materialList=JSON.parse(JSON.stringify(data).replace(/"name"/g,'"label"').replace(/"baseMaterialsId"/g,'"value"').replace(/"price"/g,'"extra"'))//extra代替价格				
					console.log(this.materialList)
					if(!showBool){//不弹窗，默认选择模型第一项材料
						this.modelmaterial={
							content:this.materialList[0].label,
							id:this.materialList[0].value,
							price:this.materialList[0].extra
						}
						// 存储所选的模型材料价格
						this.$store.commit('createorder/materialPrice',{type:'model',price:this.materialList[0].extra})
						// 初始化时，也要进行模型默认材料价格的计算（加）
						this.$store.commit('createorder/addPrice',[//包含模型的材料和三维重建价格
							{type:'1',price:this.serviceList.threeDimensionalReconstructionServicePrices},//三维重建价格
							{type:'6',price:this.materialList[0].extra},//默认模型材料的价格
						])
					}
				}else if(index==2){//获取导板材料
					this.materialType=index
					// printType='2'
					// 导板材料的价格，name,id
					var data=this.serviceList.guidePlateServiceList
					console.log(this.serviceList.guidePlateServiceList)
					this.materialList=JSON.parse(JSON.stringify(data).replace(/"name"/g,'"label"').replace(/"baseMaterialsId"/g,'"value"').replace(/"price"/g,'"extra"'))
					console.log(this.materialList)
					if(!showBool){//不弹窗，默认选择导板第一项材料
						this.Guidematerial={
							content:this.materialList[0].label,
							id:this.materialList[0].value,
							price:this.materialList[0].extra
						}
						// 存储所选导板材料的价格
						this.$store.commit('createorder/materialPrice',{type:'guide',price:this.materialList[0].extra})
						// 初始化时，也要进行导板默认材料价格的计算（加）
						this.$store.commit('createorder/addPrice',[//包含三维重建价格，手术设计，导板材料
							{type:'1',price:this.serviceList.threeDimensionalReconstructionServicePrices},//三维重建价格
							{type:'3',price:this.serviceList.surgicalDesignServicePrices},//手术设计
							{type:'4',price:this.materialList[0].extra},//默认导板材料价格
						])
					}
				}
				// console.log(this.materialList)
				if(showBool){//初始化，默认选择材料，不用弹窗
					this.Sheetshow=true
				}
			},
			// 选择科室/材料
			selectMaterial(e){
				// console.log(this.materialList)
				// console.log(e)
				switch (this.materialType){
					case 0://科室确定
						this.departmentText.name=e[0].label
						this.departmentText.id=e[0].value
						console.log(this.departmentText)
						this.getService(e[0].value)
					break;
					case 1://模型打印
						this.modelmaterial={
							content:e[0].label,
							id:e[0].value,
							price:e[0].extra
						}
						// 存储所选模型材料的价格
						this.$store.commit('createorder/materialPrice',{type:'model',price:e[0].extra})
						// 选择模型的那个材料就提交该价格（add）; 减去价格则在change为取消时，减去价格
						this.$store.commit('createorder/addPrice',[//包含模型的材料和三维重建价格
							{type:'1',price:this.serviceList.threeDimensionalReconstructionServicePrices},//三维重建价格
							{type:'6',price:e[0].extra},
						])	
					break;
					case 2://导板打印
						this.Guidematerial={
							content:e[0].label,
							id:e[0].value,
							price:e[0].extra
						}
						// 存储所选导板材料的价格
						this.$store.commit('createorder/materialPrice',{type:'guide',price:e[0].extra})
						// 选择导板的那个材料就提交该价格（add）; 减去价格则在导板的change为取消时，减去价格
						this.$store.commit('createorder/addPrice',[//包含三维重建价格，手术设计，导板材料
							{type:'1',price:this.serviceList.threeDimensionalReconstructionServicePrices},//三维重建价格
							{type:'3',price:this.serviceList.surgicalDesignServicePrices},//手术设计
							{type:'4',price:e[0].extra},
						])
					break;
					default:						
					break;
				}
			},
			getService(id){
				// 根据科室获取服务价格
				getorderPrice({
					diseaseCategoryId:id
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						// 如果科室下的数据为空，清除原有的所有数据
						if(res.data.object.length!=0){
							this.serviceList=res.data.object[0]
							// 将该科室下对应的数据保存，主要是材料价格
							this.$store.commit('createorder/Allprice',this.serviceList)
							// 科室切换时,清除数据
							this.tabindex=''
							this.checkedService={
								threeRebuild:false,//三维重建
								threeRebuild_disabled:false,//是否禁用
								threeDesign:false,//三维设计
								threeDesign_disabled:false,//是否禁用
								modelPrint:false,//模型打印
								guideMake:false,//导板制造
								softTissue:false,//软组织
								Extradesign:'',//额外的设计要求
							}
							this.Guidematerial={
								content:'选择导板材料',
								id:null,
								price:0
							}
							this.modelmaterial={
								content:'选择模型材料',
								id:null,
								price:0
							}
							this.materialList=[]//下拉框中数据
							// 清除价格相关的数据
							this.$store.commit('createorder/clearData')
						}else{//清空数据
							this.serviceList={
								guidePlateServiceList:[],//导板价格，id
								modelServiceList:[],//模型price,id},
							}
							// 清除vuex中的所有数据及最终下单时的参数
							this.tabindex=''
							this.checkedService={
								threeRebuild:false,//三维重建
								threeRebuild_disabled:false,//是否禁用
								threeDesign:false,//三维设计
								threeDesign_disabled:false,//是否禁用
								modelPrint:false,//模型打印
								guideMake:false,//导板制造
								softTissue:false,//软组织
								Extradesign:'',//额外的设计要求
							}
							this.Guidematerial={
								content:'选择导板材料',
								id:null,
								price:0
							}
							this.modelmaterial={
								content:'选择模型材料',
								id:null,
								price:0
							}
							this.materialList=[]//下拉框中数据
							// 清除价格相关的数据
							this.$store.commit('createorder/clearData')
						}
						console.log(this.serviceList)
						
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
			// 取消选择服务
			cancel(){
				// 清空所有数据
				this.$store.commit('createorder/clearData')
				uni.navigateBack({
					delta:1
				})
			},
			// 提交订单
			commitOrder(){
				// 每次提交先清空
				this.tabindex=''
				// console.log(this.$store.state.createorder.typeArray)
				console.log(this.checkedService)
				console.log(this.modelmaterial)
				console.log(this.Guidematerial)
				if (this.checkedService.threeRebuild){//选了三维重建
					this.tabindex='1'
				}
				if (this.checkedService.threeDesign){//选了手术三维设计
					this.tabindex='1,3'
				}
				if (this.checkedService.modelPrint){//选了模型打印
					this.tabindex='1,6'
				}
				if (this.checkedService.guideMake){//选了导板制备
					this.tabindex='1,3,4'
				}
				if(this.checkedService.modelPrint&&this.checkedService.threeDesign){
					this.tabindex='1,3,6'
				}
				if(this.checkedService.modelPrint&&this.checkedService.guideMake){
					this.tabindex='1,3,4,6'
				}
				console.log(this.tabindex)
				if(!this.tabindex){
					if(this.checkedService.softTissue){//只选了软组织
						uni.showToast({
							title:'不能只选软组织，请添加其他服务',
							icon:'none'
						})
						return
					}
					uni.showToast({
						title:'所选服务不能为空',
						icon:'none'
					})
					return
				}
				// return
				if(this.caseData.pwdBool){//有设置二级密码
					console.log('zz')
					this.pwdshow=true //输入密码
					return;
				}else{
					this.nextshow=true
				}
			},
			// 最终的确定
			d_confirm(){
				console.log('查看数据')
				let computerAidedDesignDTO={
					type:this.tabindex,//所选的服务类型
					computerAidedDesignOrder:{
						softTissueBoolean:this.checkedService.softTissue
					},
					// 模型材料相关
					modelOrder: {
					    materialsId:this.modelmaterial.id
					},
					// 导板
					guidePlateOrder:{
						materialsId:this.Guidematerial.id
					},
				}
				var data={
					assistExt:computerAidedDesignDTO,
					casedata:this.caseData,
					orderExplain:this.checkedService.Extradesign,
					departmentId:this.departmentText.id,//科室id
					estimatePrice:this.$store.getters['createorder/totalPrice'],//预估价
				}
				console.log(data)
				// 完成下单
				this.completeOrder(data)
				// uni.navigateTo({
				// 	url:'/pages/caselist/selectTeam?data='+encodeURIComponent(JSON.stringify(data))
				// })
			},
			// 协助密码取消
			cancelPwd(){
				this.pwdshow=false
			},
			// 协助密码确定
			surePwd(){
				if(!this.secondPwd){
					uni.showToast({
						title:'密码不能为空',
						icon:'none'
					})
					return;
				}else{
					this.pwdshow=false
				}
				this.nextshow=true
			},
			completeOrder(data){
				console.log(data)
				console.log(this.secondPwd)
				help({
					caseHistoryId:data.casedata.caseHistoryId,
					computerAidedDesignDTO:data.assistExt,//寻求帮助参数
					diseaseCategoryId:data.departmentId,//科室id
					estimatedPrice:data.estimatePrice,//预估价
					secondLevelPassword:this.secondPwd, //二级密码
					orderExplain:data.orderExplain,//订单描述
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
						// this.pwdshow=false
						uni.redirectTo({//关闭当前页面
							url:'/pages/caselist/caselistdetail?id='+data.casedata.caseHistoryId
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
			},
			d_cancel(){
				this.nextshow=false
			},
		},
		onLoad(options) {
			// console.log(options)
			var data=JSON.parse(decodeURIComponent(options.data))
			console.log(data)
			this.caseData=data
			// console.log(this.departmentText)
			this.getService(this.departmentText.id)
		},
		onReady() {
			this.amendNavigator()
		}
	}
</script>

<style lang="scss">
	page{
		/* #ifdef H5 */
		height: 100%;
		/* #endif */
	}
	.selectDesign{
		width: 100%;
		/* #ifdef H5 */
		min-height: 100%;
		/* #endif */
		/* #ifndef H5 */
		min-height: 100vh;
		/* #endif */
	}
	.depart_tag{
		width: 230rpx;
	}
	.newamendselect {
		margin-bottom: 10rpx;
	} 
	page{
		background-color: #FFFFFF;
	}
	.tabMenu{
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 26rpx;
		font-family: PingFang-SC-Regular;
		padding: 30rpx 30rpx;
		.button{
			border: 1px solid #EEEEEE;
			background-color: #EEEEEE;
			border-radius: 30rpx;
			color: #666666;
			text-align: center;
			padding: 10rpx 20rpx;
		}
		.hoverbtn{
			background-color: #FFFFFF;
			border-color:#69CDFF;
			color: #69CDFF;
		}
	}
	.tip{
		padding: 0 30rpx;
		color: #FF993F;
	}
	.department{
		padding: 0 30rpx;
		.title{
			padding: 30rpx 0 0;
		}
		.departMenu{
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
		}
	}
	.selectService{
		padding: 20rpx 0;
		.checkbox{
			line-height: 52rpx;
			color: #8F8F8F;
			font-size: 24rpx;
			display: flex;
			flex-direction: column;
			width: 100%;
			.checkbox-group{
				width: 100%;
				display: flex;
				.checkItem{
					width: 100%;
					display: flex;
					justify-content: space-between;
				}
			}
		}
		.switch{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-top: 20rpx;
		}
	}
	.Extradesign{
		.tip{
			padding: 20rpx 0;
			color: #000000;
		}
	}
	.buttons{
		display: flex;justify-content: space-between;
		text-align: center;
		margin-top: 60rpx;
		.btn{
			background-color: #69CDFF;
			color: #FFFFFF;
			width: 330rpx;
			height: 88rpx;
			line-height: 88rpx;
			font-size: 30rpx;
			font-weight: bold;
			font-family: PingFang-SC-Bold;
		}
		.amendbtn{
			background-color: #FFFFFF;
			color: #FF8787;
			border: 1px solid #CCCCCC;
		}
	}
	.departmentBool{
		padding: 20rpx 30rpx;
		.title{
			font-weight: bold;
			font-family: PingFang-SC-Bold;
			font-size: 30rpx;
			text-align: center;
			padding: 20rpx 0;
		}
		.alreadyMenu{
			padding: 20rpx 0;
			display: flex;
			// justify-content: space-between;
			align-items: center;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
			width: 100%;
		}
		.AllData{
			.items{
				padding: 20rpx 0;
			}
			.btn{
				position: fixed;
				bottom: 0;
				display: flex;
				border-top: 1px solid #EEEEEE;
				width: 100%;
				.btn1{
					width: 50%;
					height: 88rpx;
					line-height: 88rpx;
					text-align: center;
					box-sizing: border-box;
					font-size: 28rpx;
					font-family: PingFang-SC-Bold;
					font-weight: bold;
				}
				.cancel{
					border-right: 1px solid #EEEEEE; 
					color: #FF5860;
				}
				.sure{
					color: #69CDFF;
				}
			}
		}
	}
	.bgColors{
		font-size: 28rpx;
		color: #69CDFF;
		font-weight: bold;
	}
	.NobgColor{
		color: #000000;
		font-weight: 400;
	}
	.ClassBg{
		background-color: #CCCCCC;
		border: 1px solid #CCCCCC;
	}
	.NoClassBg{
		background-color: #FFFFFF;
		border: 1px solid #808080;
	}
	.d_items{
		padding: 0 10rpx;
	}
	.Printmaterial{
		border-radius: 10rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20rpx;
		color: #8F8F8F;
		width: 230rpx;
		border: 1px solid #AAAAAA;
		.content{
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			font-size:30rpx;
			color: #606266;
		}
	}
	.concatbox{
		.item{
			padding: 30rpx 0;
			.icon{
				margin-left: 20rpx;
			}
		}
	}
</style>
