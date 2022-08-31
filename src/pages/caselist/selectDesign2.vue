<template>
	<view class="">
		<view class="tabMenu">
			<view class="button" @click='changeTab(index)' v-for="(item,index) in menu" :key='index' :class="index==tabindex?'hoverbtn':''">
				<text>{{item}}</text>
			</view>
		</view>
		<view class="tip">
			<text>*推荐CT片尽量为2mm及以上精度</text>
		</view>
		<!-- 选择的部位 -->
		<view class="department">
			<view class="title">
				<text class="titleTip">请选择设计部位（可多选）：</text>
				<u-tag text="请选择设计部位" type="info" style="font-size: 28rpx;" @click="selectFirst"/>
			</view>
			<!-- 已经选择的部位展示 -->
			<view class="departMenu" style="display: flex;flex-direction: column;">
				<view v-for="(item,index) in EndData" :key='index' @click.stop="enterDetail(item)"
				 style="margin-top: 20rpx;text-align: center;padding: 10rpx 0;display:flex;">
					<view class="" style="display: flex;align-items: flex-start;width: 100%;">
						<text style="margin-right: 10rpx;">{{index}}.</text>
						<view class="" style="border-bottom: 1px solid #808080;flex: 1;display: flex;align-items: center;">
							<view class="" v-for="(item1,index1) in item" :key='index1' style="flex:1;text-align: left;">
								<text>{{item1.first.name}}</text><text style="margin: 0 10rpx;">-</text>
								<text v-for="(item2,index2) in item1.third" :key='index2'>{{item2.name}}<text>、</text></text>
							</view>
							<view class="icon" style="margin-left: 10rpx;" @click.stop="deleteItems(item)">
								<u-icon name="close"></u-icon>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 其他的设计服务的选择 -->
			<view class="selectService">
				<!-- 模型设计 -->
				<view class="" style="display: flex;">
					<u-checkbox
						@change="changeModel"
						style="padding: 0 10rpx;"
						v-model="modelPrint" 
						active-color="#69CDFF"
					>模型打印</u-checkbox>
					<view class="Printmaterial" @click="materialShow(1)" v-if="modelPrint">
						<text class="content">{{modelmaterial.content}}</text>
						<uni-icons type="arrowdown"></uni-icons>
					</view>
				</view>
				<!-- 导板和器械的选择 -->
				<view class="checkbox" style="" v-show="tabindex==2">
					<view class="">
						<text>额外服务（可多选）：</text>
					</view>
					<view class="">
						<!-- 导板设计 -->
						<view class="" style="display: flex;">
							<u-checkbox
								@change="changeGuide"
								style="padding: 0 10rpx;"
								v-model="guideBool" 
								active-color="#69CDFF"
							>导板设计</u-checkbox>
							<u-checkbox
								@change="changeGuidePrint"
								style="padding: 0 10rpx;"
								v-model="guidePrint" 
								:disabled="guideBool?false:true"
								active-color="#69CDFF"
							>导板打印</u-checkbox>
							<view class="Printmaterial" @click="materialShow(2)" v-if="guidePrint">
								<text class="content">{{Guidematerial.content}}</text>
								<uni-icons type="arrowdown"></uni-icons>
							</view>
						</view>
						<!-- 假体设计 -->
						<view class="" style="display: flex;">
							<u-checkbox
								@change="changeFake"
								style="padding: 0 10rpx;"
								v-model="fakeBool" 
								active-color="#69CDFF"
							>假体设计</u-checkbox>
							<u-checkbox
								@change='chageFakePrint'
								style="padding: 0 10rpx;"
								v-model="fakePrint" 
								:disabled="fakeBool?false:true"
								active-color="#69CDFF"
							>假体打印</u-checkbox>
							<view class="Printmaterial" @click="materialShow(3)" v-if="fakePrint">
								<text class="content">{{Fakematerial.content}}</text>
								<uni-icons type="arrowdown"></uni-icons>
							</view>
						</view>
						<!-- 器械设计 -->
						<view class="" style="display: flex;">
							<u-checkbox
								style="padding: 0 10rpx;"
								v-model="instrumentBool"
								 active-color="#69CDFF"
							>器械设计</u-checkbox>
						</view>
					</view>
				</view>
				<!-- 重建软组织的选择 -->
				<view class="switch">
					<text>是否是粉碎性骨折</text>
					<u-switch v-model="smashchecked" active-color="#86B0D4" inactive-color="#CCCCCC" size='30'></u-switch>
				</view>
				<view class="switch">
					<text>重建处是否有假体存在</text>
					<u-switch v-model="fakechecked" active-color="#86B0D4" inactive-color="#CCCCCC" size='30'></u-switch>
				</view>
			</view>
			<!-- 额外的设计要求 -->
			<view class="Extradesign">
				<view class="tip">
					<text>设计特别要求说明：</text>
				</view>
				<u-input v-model="Extradesign" type="textarea" :border="true" />
			</view>
		</view>
		<!-- 提交或取消订单 -->
		<view class="buttons" style="">
			<button class="btn amendbtn" @click='cancel'>取消</button>
			<button class="btn" @click='next'>下一步</button>
		</view>
		<!-- 获取打印材料的弹窗 -->
		<u-select v-model="Sheetshow" :list="materialList" @confirm='selectMaterial'></u-select>
		<!-- 部位弹窗 -->
		<u-popup v-model="departmentShow" mode='bottom' :mask-close-able='false'>
			<view class="departmentBool">
				<view class="title">
					<text>请选择设计部位</text>
				</view>
				<!-- 已经选择部位 -->
				<view class="alreadyMenu">
					<scroll-view scroll-x>
						<view style="display: flex;">
							<view style="display: flex;padding: 0 10rpx;" v-if="bool==0?true:false" :class="ClassBool==0?'bgColors':'NobgColor'">
								<text>基本部位</text>
							</view>
							<!-- 第1级数据 -->
							<view style="padding: 0 10rpx;" v-if="bool==1?true:false" @click="tabMenuTitle(0)" :class="ClassBool==0?'bgColors':'NobgColor'">
								<text>{{FirstTitle.name}}</text>
							</view>
							<!-- 第2级数据 -->
							<view style="padding: 0 10rpx;" v-if="bool==1?true:false" :class="ClassBool==1?'bgColors':'NobgColor'">
								<text style="padding: 0 10rpx;" v-for="(item,index) in secondTitle" :key='index' @click="tabMenuTitle(1)">{{item.name}}</text>
							</view>
							<!-- 第三级数据 -->
							<view style="padding: 0 10rpx;">
								<view class="" v-if="bool==1?true:false" :class="ClassBool==2?'bgColors':'NobgColor'">
									<text style="padding: 0 10rpx;" v-for="(item,index) in thirdTitle" :key='item.id' @click="tabMenuTitle(2)" >{{item.name}}</text>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
				<!-- 要选择的数据 -->
				<view class="AllData" >
					<scroll-view enable-flex scroll-y="true" style="height: 800rpx;">
						<view class="" v-if="!Allbool">
							<!-- 第一级数据 -->
							<view class="firstOne" v-if="bool==0?true:false">
								<view class="">
									<view style="display: flex;align-items: center;" class="items" v-for="(item,index) in basicData" :key='item.id' @click="getSecondData(item.id,item.name,item.disabled)">
										<view :class="item.disabled?'ClassBg':'NoClassBg'" style="margin-right: 20rpx;width: 36rpx;height: 36rpx;border-radius: 50%;">
										</view>
										<text>{{item.name}}</text>
									</view>
								</view>
							</view>
							<!-- 第二级数据 -->
							<view style="padding: 10rpx 0;" v-if="bool==1?true:false">
								<u-checkbox 
									@change="allchecked"
									v-model="ifchecked" 
									active-color='#69CDFF'
								>全选</u-checkbox>
							</view>
							<view class="secondTwo" v-if="bool==1?true:false">
								<view class="items">
									<view style="display: flex;flex-direction: column;">
										<u-checkbox 
										    active-color='#69CDFF'
											@change="getThirdData($event,item)"
											v-for="(item,index) in departmentData" :key="item.id" 
											:disabled="item.disabled"
											v-model="item.checked" 
											:name="item.id"
										><view class="">
											<view class="">
												<text>{{item.name}}</text>
											</view>
											<view class="thirdThree" style="">
												<!-- 第三级数据 -->
												<view class="" style="display: flex;flex-wrap: wrap;">
													<view style="margin-right: 10rpx;font-size: 24rpx;color: #8F8F8F;"  v-for="(item,index) in item.children" :key='item.id'>
														<text>{{item.name}}</text>
													</view>
												</view>
											</view>
										</view>
										</u-checkbox>
									</view>
									<view style="padding: 10rpx 0;" @click="tabMenuTitle(2)">
										<u-icon name="plus" style="margin-right: 10rpx;"></u-icon>
										<text>自定义</text>
									</view>
								</view>
							</view>
						</view>
						<!-- 所有数据 -->
						<view class="allThird" v-if="Allbool">
							<view class="items" style="display: flex;flex-wrap: wrap;">
								<view style="padding: 0 10rpx;">
									<u-checkbox-group @change="selectAll">
										<u-checkbox  
										   @change="singleDepart"
										    v-for="(item,index) in ClassifyData" :key="item.id" 
											v-model="item.checked" 
											:name="item.id"
											active-color='#69CDFF'
										>{{item.name}}</u-checkbox>
									</u-checkbox-group>
								</view>
							</view>
						</view>
						<view style="height: 88rpx;">
						</view>
					</scroll-view>
					<view class="btn">
						<view class="btn1 cancel" @click="cancelpop">
							<text>取消</text>
						</view>
						<view class="btn1 sure" @click="surepop">
							<text>确定</text>
						</view>
					</view>
				</view>
			</view>
		</u-popup>
		<!-- 修改的弹窗 -->
		<u-popup v-model="amendShow" mode='bottom' :mask-close-able='false'>
			<view class="departmentBool">
				<view class="title">
					<text>请选择设计部位</text>
				</view>
				<!-- 已经选择部位 -->
				<view class="alreadyMenu">
					<scroll-view scroll-x="true" enable-flex>
						<view style="display: flex;padding: 0 10rpx;color: #69CDFF;" >
							<text>基本部位</text>
						</view>
					</scroll-view>
				</view>
				<!-- 要选择的数据 -->
				<scroll-view enable-flex scroll-y="true" class="AllData" style="height: 800rpx;">
					<!-- 所有数据 -->
					<view class="allThird">
						<view class="items" style="display: flex;flex-wrap: wrap;">
							<view style="padding: 0 10rpx;">
								<u-checkbox-group @change="amendAll">
									<u-checkbox  
									    v-for="(item,index) in ClassifyData" :key="item.id" 
										v-model="item.checked" 
										:name="item.id"
										active-color='#69CDFF'
									>{{item.name}}</u-checkbox>
								</u-checkbox-group>
							</view>
						</view>
					</view>
					<view class="btn">
						<view class="btn1 cancel" @click="cancelamend">
							<text>取消</text>
						</view>
						<view class="btn1 sure" @click="sureamend">
							<text>确定</text>
						</view>
					</view>
				</scroll-view>
			</view>
		</u-popup>
		<u-modal v-model="delshow" :show-cancel-button='true' content='是否删除' @confirm='delconfirm' @cancel='delcancel'></u-modal>
		<u-modal v-model="nextshow" @confirm='d_confirm' @cancel='d_cancel' :show-title='false' :show-cancel-button='true'>
			<view class="slot-content" style="text-align: center;">
				<view class="title" style="padding: 20rpx 0;border-bottom: 1px solid #F8F8F8;">
					<text>树蚁辅助确认</text>
				</view>
				<view class="content">
					<text>服务内容：</text> 
					<text class="d_items" v-if="tabindex=='0'">精细三维重建</text>
					<text class="d_items" v-if="tabindex=='1'">精准测量，诊断</text>
					<text class="d_items" v-if="tabindex=='2'">手术三维设计</text>
					<view class="" style="padding: 20rpx 0;color: #CCCCCC;">
						<view class="departMenu" style="display: flex;flex-direction: column;">
							<view v-for="(item,index) in EndData" :key='index' style="text-align: center;">
								<view class="" v-for="(item1,index1) in item" :key='index1'>
									<text v-for="(item2,index2) in item1.third" :key='index2'>{{item2.name}}<text>、</text></text>
								</view>
							</view>
						</view>
						<text class="d_items" v-if="fakechecked">重建假体</text>
						<text class="d_items" v-if="smashchecked">重建粉碎性骨折</text>
						<text class="d_items" v-if="modelmaterial.id">模型打印</text>
						<text class="d_items" v-if="guideBool">导板设计</text>
						<text class="d_items" v-if="Guidematerial.id">导板打印</text>
						<text class="d_items" v-if="fakeBool">假体设计</text>
						<text class="d_items" v-if="Fakematerial.id">假体打印</text>
						<text class="d_items" v-if="instrumentBool">器械设计</text>
					</view>
				</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import {casePrice,getdepartment} from './api/casePrice.js'
	import {getMaterial} from './api/help.js'
	export default{
		data(){
			return{
				menu:['精准三维重建','精准测量、诊断','手术三维设计'],
				tabindex:0,
				smashchecked:false,//是否存在粉碎性骨折
				fakechecked:false,//重建处是否有假体存在
				modelPrint:false,//模型打印
				guideBool:false,//导板设计
				guidePrint:false,//导板打印
				instrumentBool:false,//器械设计
				fakeBool:false,//假体设计
				fakePrint:false,//假体打印
				Extradesign:'',//额外的设计要求
				departmentShow:false,//选择部位的弹窗
				basicData:[],//第一级数据
				partData:[],//所有部位的数据
				departmentData:[],//科室的数据和对应的每个部位数据
				bool:0,
				// 用于做顶部的menu
				FirstTitle:{name:'',id:''},//顶部第一级的数据
				secondTitle:[],//顶部第二级的数据
				thirdTitle:[],//顶部第三级的数据
				ClassBool:0,//所有部位的展示
				AllId:[],//最终选择的所有部位id
				ClassifyData:[],//每个一级部位对应的id
				showData:[],//选中之后的所有展示数据
				Allbool:false,//是否展示所有部位的数据
				EndData:[],// 每一次最终的选取数据
				EndId:[],// 每一次最终的选取数据id
				amendShow:false,//修改的弹窗
				endingId:[],//提交给后端的id,原来是传部位id，后又修改为传第一级及对应的部位id，因此endingId不传后端，只用来判断是否有选择部位
				endingData:[],//最终提交给后端的第一级及对应的第三级数据id
				caseData:{},//从病例传过来的信息（是否有二级密码，病例id）
				Index:'',////用于确定this.EndData的下标，便于修改部位时，对原数据进行处理
				amendData:[],//用于传递再次修改时的勾选框
				delshow:false,//删除时的弹窗提醒
				delIndex:'',//删除时的下标
				nextshow:false,//下一步时的弹窗
				ifchecked:false,//是否全选
				Sheetshow:false,//打印材料的弹窗
				materialList: [
				],
				Guidematerial:{
					content:'选择导板材料',
					id:null
				},
				Fakematerial:{
					content:'选择假体材料',
					id:null
				},
				modelmaterial:{
					content:'选择模型材料',
					id:null
				},
				materialType:null,//用于判断是那种打印类型的材料，从而获取对应的数据
			}
		},
		methods:{
			materialShow(index){
				var printType;
				if(index==1){//模型材料
					this.materialType=index
					printType='1'
				}else if(index==2){//获取导板材料
					this.materialType=index
					printType='2'
				}else if(index==3){//假体材料
					this.materialType=index
					printType='3'
				}
				getMaterial({
					printType
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						var data=res.data.object
						data.forEach(item=>{
							delete(item.density)
							delete(item.technology)
						})
						console.log(data)
						var data1=JSON.parse(JSON.stringify(data).replace(/"name"/g,'"label"').replace(/"id"/g,'"value"'))
						this.materialList=data1
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
			// 选择选中的材料
			selectMaterial(e){
				switch (this.materialType){
					case 1://模型打印
						this.modelmaterial.content=e[0].label
						this.modelmaterial.id=e[0].value
					break;
					case 2://导板打印
						this.Guidematerial.content=e[0].label
						this.Guidematerial.id=e[0].value
					break;
					case 3://假体打印
						this.Fakematerial.content=e[0].label
						this.Fakematerial.id=e[0].value
					break;
					default://模型打印
						this.modelmaterial.content=e[0].label
						this.modelmaterial.id=e[0].value
					break;
				}
			},
			allchecked(e){
				this.ifchecked=e.value
				var cc=[];
				if(e.value){//全选
					this.departmentData.forEach(item=>{
						item.checked=true
					})
					// 选择全选后，是将科室下的部位全部选中，而不是头部对应下的所有部位，因为数据存在问题
					this.basicData.forEach(item=>{
						if(item.id==this.FirstTitle.id){
							// cc.push(item.position) //position数据在所有部位的数据存在没有情况
							item.children.forEach(item1=>{
								console.log(item1)
								cc.push(item1.position)
							})
						}
					})
					cc=cc.flat() //多维数组拉平为一维数组
					console.log(cc)
					cc=Array.from(new Set(cc)) //去重，id重复叠加
					this.thirdTitle=[]
					this.partData.forEach(item=>{
						cc.forEach(item1=>{
							if(item1==item.id){
								this.thirdTitle.push(item)
							}
						})
					})
					console.log(this.thirdTitle)
				}else{//全不选
					this.departmentData.forEach(item=>{
						item.checked=false
					})
					this.thirdTitle=[]
					cc=[]
				}
				console.log(cc)
				this.AllId=cc
				console.log(this.AllId)
				console.log(this.thirdTitle)
			},
			// 点击弹出修改的弹窗
			enterDetail(data){
				console.log(this.EndData)
				console.log(data)
				console.log(data[0].third)
				this.amendData=[]
				data[0].third.map(item=>{
					this.amendData.push(item.id)
				})
				console.log(this.amendData)
				this.amendShow=true
				this.basicData.forEach(item=>{//直接进入该头部分类的数据中
					if(item.id==data[0].first.id){
						item.position.forEach(item1=>{
							this.partData.forEach(item2=>{
								if(item1==item2.id){
									this.ClassifyData.push(item2) //该一级分类下对应的所有部位数据
								}
							})
						})
					}
				})
				console.log(this.ClassifyData)
				this.ClassifyData.forEach(item=>{ //将已经选中了的数据勾选
					data[0].third.forEach(item1=>{
						if(item.id==item1.id){
							item.checked=true
						}
					})
				})
				this.ClassifyData=Array.from(new Set(this.ClassifyData))
				console.log(this.ClassifyData)
				this.EndData.forEach((items,index)=>{//用于确定this.EndData的下标，方便后续数据处理
					// console.log(items)
					if(items[0].first.id==data[0].first.id){
						this.Index=index
					}
				})
				console.log(this.Index)
				console.log(this.EndData)
				// console.log(this.EndId)
				// console.log(this.EndId[this.Index])
			},
			// 修改窗口的选择框
			amendAll(e){
				// 选择的所有id
				console.log(e)
				this.amendData=e
				console.log(this.amendData)
			},
			// 修改弹窗的取消
			cancelamend(){
				this.amendShow=false
				//必须要清空，否则 再次弹窗，会重复添加数据
				this.ClassifyData=[]
				this.Index=''//下标要清空
			},
			// 修改弹窗的确定
			sureamend(){
				// 将以下内容放到最后完成一步
				console.log(this.Index)
				console.log(this.EndData)
				// console.log(this.EndData[this.Index])
				console.log(this.amendData)
				var data=[]
				console.log(this.partData)
				this.partData.forEach(item=>{
					this.amendData.forEach(item1=>{
						if(item1==item.id){
							data.push(item)
						}
					})
				})
				console.log(data)
				this.EndData[this.Index][0].third=data
				console.log(this.EndData)
				console.log(this.EndId[this.Index])
				console.log(this.amendData)
				this.EndId[this.Index]=this.amendData //将选中的所有id赋值
				console.log(this.EndId[this.Index])
				console.log(this.EndData)
				console.log(this.EndId)
				this.amendShow=false
				//必须要清空，否则 再次弹窗，会重复添加数据
				this.ClassifyData=[]
				this.Index=''//下标要清空
			},
			// 删除已经选择了的数据
			deleteItems(data){
				console.log(data)
				console.log(this.EndData)
				console.log(this.EndId)
				this.delIndex=''
				this.EndData.forEach((items,index)=>{//用于确定this.EndData的下标，方便后续数据处理
					console.log(items)
					if(items[0].first.id==data[0].first.id){
						this.delIndex=index
					}
				})
				this.delshow=true
			},
			delconfirm(){
				this.EndData.splice(this.delIndex,1)
				this.EndId.splice(this.delIndex,1)
				// console.log(this.EndData)
				// console.log(this.EndId)
				this.delshow=false
			},
			delcancel(){
				this.delshow=false
			},
			changeTab(index){
				this.tabindex=index
			},
			// 增加部位
			selectFirst(){
				this.departmentShow=true
				// console.log(this.basicData)
				console.log(this.EndData)
			},
			// 点击头部,展示第二级数据
			getSecondData(id,name,disabled){
				if(disabled){
					uni.showToast({
						title:'已经选择了，不能再选择',
						icon:'none'
					})
					return;
				}
				this.FirstTitle={id,name}
				this.bool=1
				console.log(this.basicData)
				console.log(this.partData)
				this.basicData.forEach(item=>{//将科室数据放置在departmentData中
					if(item.id==id){
						this.departmentData=item.children
						item.position.forEach(item1=>{
							this.partData.forEach(item2=>{
								if(item1==item2.id){
									this.ClassifyData.push(item2) //该一级分类下对应的所有部位数据
								}
							})
						})
						this.departmentData.forEach(item3=>{//将二级对应的第三级数据放到子级
							item3.position.forEach(item4=>{
								this.partData.forEach(item5=>{
									if(item5.id==item4){
										item3.children.push(item5)
									}
								})
							})
						})
					}
				})
				console.log(this.ClassifyData)//要去重
			},
			// 点击科室，选择出三级的部位
			getThirdData(e,data){
				this.ClassBool=1
				if(e.value){//选中状态增加数据
					console.log(data)
					this.secondTitle.push(data) 
					console.log(this.secondTitle)
					data.position.forEach(item=>{//将科室对应的部位提取出来
						this.partData.forEach(item1=>{
							if(item==item1.id){
								this.thirdTitle.push(item1)
							}
						})
					})
				}else{//取消
					console.log(this.secondTitle)
					this.secondTitle.forEach((item,index)=>{
						if(item.id==e.name){
							this.secondTitle.splice(index,1)
						}
					})
					data.children.forEach(item=>{
						this.thirdTitle.forEach((item1,index)=>{
							if(item==item1){
								item.checked=false
								this.thirdTitle.splice(index,1)
							}
						})
					})
				}
				this.AllId=[]
				// this.thirdTitle要去重
				console.log(this.thirdTitle)
				let deWeightThree = () => {
				    let map = new Map();
				    for (let item of this.thirdTitle) {
				        if (!map.has(item.id)) {
				            map.set(item.id, item);
				        }
				    }
				    return [...map.values()];
				}
				let newArr3 = deWeightThree();
				console.log(newArr3)
				this.thirdTitle=newArr3
				this.thirdTitle.forEach(item=>{
					this.AllId.push(item.id)
				})
				console.log(this.AllId) //所有部位的id
				this.AllId=Array.from(new Set(this.AllId))
				console.log(this.AllId) //所有部位的id
				// 用于选择科室时，判断是否勾选全选框
				this.basicData.forEach(item=>{
					if(item.id==this.FirstTitle.id){
						if(this.secondTitle.length==item.children.length){//全选
							this.ifchecked=true
						}else{
							this.ifchecked=false
						}
					}
				})
			},
			// 点击顶部的选项，展示不同的级别数据
			tabMenuTitle(index){
				console.log('--------------',index)
				this.bool=1
				if(index==0){//展示第一级对应的选项
					this.Allbool=false
				}else if(index==1){//展示第二级对应的选项
					this.ClassBool=1
					this.Allbool=false
				}else if(index==2){
					this.ClassBool=2
					this.Allbool=true
					console.log(this.thirdTitle)
					console.log(this.ClassifyData)
					this.ClassifyData.forEach(item=>{
						this.thirdTitle.forEach(item1=>{
							if(item.id==item1.id){
								item.checked=true
							}
						})
					})	
					this.ClassifyData=Array.from(new Set(this.ClassifyData))
				}
			},
			singleDepart(e){
				console.log(e)
			},
			selectAll(e){
				// 选择的所有id
				console.log(e)
				this.AllId=e
				console.log(this.AllId)
				console.log(this.thirdTitle)
				var aa=[]
				this.AllId.forEach(item=>{
					this.ClassifyData.forEach((item1,index)=>{
						if(item1.id==item){
							aa.push(item1)
						}
					})	
				})
				console.log(aa)
				this.thirdTitle=aa//顶部的第三部位
				console.log(this.thirdTitle)
				console.log(this.ClassifyData)
				// console.log(this.departmentData)
				this.departmentData.forEach((item,index)=>{
					let status = item.position.every(item =>{
					　　  return　this.AllId.indexOf(item) >= 0
					})
					if(status){
						item.checked=true
						item.disabled=false
					}else{
						item.checked=false
						// 包含一部分的，需要禁用
						item.disabled=true //不全包含的话，不用禁用
						// this.departmentData.splice(index,1)
					}
					console.log(status)
					console.log(item.position)
					console.log(this.AllId)
					if(item.position.some(r => this.AllId.indexOf(r) >= 0)){
					  console.log('true')
						// item.disabled=true
					} else{//两个数组完全没有交际
					  console.log('false')
					  item.disabled=false// 完全乜有包含则不禁用
					}
				})	
				console.log(this.secondTitle.length)
				if(this.secondTitle.length!=0){
					this.secondTitle.forEach((items,index)=>{
						console.log(item)
						if(!items.checked){
							this.secondTitle.splice(index,1)
						}
					})
				}
				// 　let status = 数组1.every(item =>{
				// 　　   return　数组2.indexOf(item.id) >= 0
				// 　　})
				// 如果status 返回 true ; 则=>【数组1】里面的元素在【数组2】里面都有
				// 如果status 返回 false ; 则=>【数组1】里面的元素在【数组2】不完全有，甚至一个都没有
			},
			// 确定选择的部位
			surepop(){
				this.showData.push({
					first:this.FirstTitle,
					third:this.thirdTitle
				})
				console.log(this.FirstTitle)
				console.log(this.showData)
				console.log(this.AllId)
				this.EndId.push(this.AllId) //最终的id，要保存起来
				this.EndData.push(this.showData)// 每一次最终的选取数据
				this.departmentShow=false
				console.log(this.basicData)
				this.basicData.forEach(item=>{
					if(item.id==this.FirstTitle.id){
						item.disabled=true
					}
				})
				console.log(this.EndId)
				console.log(this.EndData)
				// //状态重置，否则再次弹窗，会渲染之前的数据
				this.bool=0 
				// console.log(this.departmentData)
				this.departmentData=[]
				this.FirstTitle={name:'',id:''}
				this.secondTitle=[],//顶部第二级的数据
				this.thirdTitle=[],//顶部第三级的数据
				this.ClassBool=0,//所有部位的展示
				this.AllId=[],//最终选择的所有部位id
				this.ClassifyData=[],//每个一级部位对应的id
				this.showData=[],//选中之后的所有展示数据
				this.Allbool=false//是否展示所有部位的数据
				this.ifchecked=false//部位确定后，将全选改为false
			},
			// 取消选择的部位
			cancelpop(){
				this.departmentShow=false
			},
			// 模型选择
			changeModel(e){
				if(!e.value){
					// 模型设计不选择，则材料选择为空
					this.modelmaterial.content=''
					this.modelmaterial.id=null
				}
			},
			// 导板设计选择
			changeGuide(e){
				if(!e.value){
					this.guidePrint=false
					// 导板设计不选择，则材料选择为空
					this.Guidematerial.content=''
					this.Guidematerial.id=null
				}
			},
			// 导板打印选择
			changeGuidePrint(e){
				if(!e.value){
					// 导板设计不选择，则材料选择为空
					this.Guidematerial.content=''
					this.Guidematerial.id=null
				}
			},
			// 假体设计
			changeFake(e){
				if(!e.value){
					this.fakePrint=false
					// 假体设计不选择，则材料选择为空
					this.Fakematerial.content=''
					this.Fakematerial.id=null
				}
			},
			// 假体打印
			chageFakePrint(e){
				if(!e.value){
					// 假体设计不选择，则材料选择为空
					this.Fakematerial.content=''
					this.Fakematerial.id=null
				}
			},
			// 取消选择服务
			cancel(){
				uni.navigateBack({
					delta:1
				})
			},
			// 下一步
			next(){
				console.log(this.fakechecked)
				console.log(this.smashchecked)
				console.log(this.modelmaterial.id)
				console.log(this.guideBool)
				console.log(this.Guidematerial.id)
				console.log(this.Fakematerial.id)
				console.log(this.fakeBool)
				// console.log(this.EndId)//包含第三级数据
				// console.log(this.EndData)//包含第一级和对应的第三级数据
				var aa=this.EndData
				// console.log(aa)
				var oneAndthree={}//用于存放第一级部位及对应的第三级部位id
				aa.forEach(item=>{
					var one_three=[]//用于存放第一级对应的第三级部位id
					// item[0].first.id 第一级id
					// item[0].third 第三级所有部位id,数组
					item[0].third.forEach(items=>{
						one_three.push(items.id)
					})
					oneAndthree={
						parentId:item[0].first.id,
						assistDesignIds:one_three
					}
					this.endingData.push(oneAndthree)
				})
				console.log(this.endingData)
				this.endingId=[],//每次默认是空，否则从设计团队返回之后，再修改，将元数据叠加
				// this.endingData=[]//每次默认是空，否则从设计团队返回之后，再修改，将元数据叠加
				this.EndId.forEach(item=>{
					item.forEach(item1=>{
						this.endingId.push(item1)
					})
				})
				console.log(this.endingId)
				this.endingId=Array.from(new Set(this.endingId)) //去重，避免从设计团队返回时，id重复叠加
				console.log(this.endingData)//也要去重
				console.log(this.endingId)
				if(this.endingId.length==0){
					uni.showToast({
						title:'部位不能为空',
						icon:'none'
					})
					return
				}
				this.nextshow=true
			},
			// 最终的确定
			d_confirm(){
				console.log(this.endingId)
				console.log('查看数据')
				console.log(this.endingData)
				console.log(this.tabindex+1)
				var computerAidedDesignDTO={
					computerAidedDesignOrder:{
						productType:this.tabindex+1,
						smashFractureBoolean:this.smashchecked,//是否重建粉碎性骨折
						prosthesisBoolean:this.fakechecked,//是否重建假体
						position:this.endingData,// 第一级及对应的部位id
						// assistDesignIds:this.endingId,// 所有部位的id
					},
					// 模型材料相关
					modelOrder: {
					    materialsId:this.modelmaterial.id
					},
					// 导板
					guidePlateOrder:{
						designBoolean:this.guideBool,
						materialsId:this.Guidematerial.id
					},
					// 假体
					prosthesisOrder:{
						designBoolean:this.fakeBool,
						materialsId:this.Fakematerial.id
					},
					instrumentOrder:{
						designBoolean:this.instrumentBool,
					},
				}
				var data={
					assistExt:computerAidedDesignDTO,
					casedata:this.caseData,
					orderExplain:this.Extradesign
				}
				this.endingData=[]//要清空，避免数据重复
				uni.navigateTo({
					url:'/pages/caselist/selectTeam?data='+encodeURIComponent(JSON.stringify(data))
				})
			},
			d_cancel(){
				this.nextshow=false
				this.endingData=[]//要清空，避免数据重复
			},
			// 获取所有部位的数据
			getAllDepartment(){
				casePrice({}).then(res=>{
					console.log(res)
					this.partData=res.data.object
					this.partData.forEach(item=>{
						item.checked=false
					})
					this.partData=JSON.parse(JSON.stringify(this.partData))
					console.log(this.partData)
				}).catch(err=>{
					console.log(err)
				})
			},
			// 获取基础部位和科室的数据
			getdepartment(){
				getdepartment({}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						this.basicData=res.data.object
						console.log(this.basicData)
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
		onLoad(options) {
			console.log(options)
			var data=JSON.parse(decodeURIComponent(options.data))
			console.log(data)
			this.caseData=data
			// 获取所有部位的数据
			this.getAllDepartment()
			this.getdepartment()
		}
	}
</script>

<style scoped lang="scss">
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
		border: 1px solid #666;
		border-radius: 10rpx;
		flex: 1;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20rpx;
		color: #8F8F8F;
		width: 35%;
		.content{
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			font-size:30rpx;
			color: #606266;
		}
	}
</style>
