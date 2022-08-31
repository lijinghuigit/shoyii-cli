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
				<u-tag text="请选择设计部位" type="info" @click="selectFirst"/>
			</view>
			<!-- 已经选择的部位展示 -->
			<view class="departMenu" style="display: flex;flex-direction: column;">
			</view>
			<!-- 设计服务的选择 -->
			<view class="selectService">
				<!-- 导板和器械的选择 -->
				<uni-transition class="checkbox" :mode-class="['fade']" :show="this.tabindex==2" >
					<text>是否需要导板器械设计？（可多选）</text>
					<u-checkbox-group class="checkbox-group">
						<view class="checkItem" v-for="(item, index) in listcheck" :key="index">
							{{item.name}}
							<u-checkbox 
								shape="circle"
								active-color="#86B0D4"
								@change="checkboxChange" 
								v-model="item.checked" 
								:name="item.name"
							></u-checkbox>  
						</view>
					</u-checkbox-group>
				</uni-transition>
			</view>
			<!-- 设计要求 -->
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
		<!-- 部位弹窗 -->
		<u-popup v-model="departmentShow" mode='bottom' :mask-close-able='true'>
			<view class="departmentBool">
				<view class="title">
					<text>请选择设计部位</text>
				</view>
				<view class="AllData" style="height: 800rpx;">
					<xiaolu-tree v-slot:default="{item}" :trees="tree" :searchIf='false' v-if="tree.length>0" :parent="true" :checkList="checkList" :props="prop" @sendValue="selectconfirm" :isCheck="true">
						<view style="margin-left: 20rpx;">
							<view class="content-item">
								<view class="word">{{item.name}}</view>
							</view>
						</view>
					</xiaolu-tree>
					<!-- 确定btn -->
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
	</view>
</template>

<script>
	// user: true，代表它是用户，没有下一级的，此时的user必须传true，否则全选会出问题
	// user：默认是false , False的时候是有下一级的，
	import {casePrice,getdepartment} from './api/casePrice.js'
	import xiaoluTree from "@/components/xiaolu-tree/tree.vue"
	export default{
		components: {xiaoluTree},
		data(){
			return{
				menu:['精准三维重建','精准测量、诊断','手术三维设计'],
				tabindex:0,
				checked:false,//是否重建软组织
				listcheck: [ //导板或器械的设计
					{
						name: '导板',
						checked: false,
					},
					{
						name: '器械',
						checked: false,
					},
				],
				guideBool:false,//选择了导板
				instrumentBool:false,//选择了器械
				Extradesign:'',//额外的设计要求
				departmentShow:false,//选择部位的弹窗
				firstData:[],//第一级数据
				allData:[],//所有部位的数据
				tree:[],
				checkList:[],
				prop:{
					label: 'name',
					children: 'children',
					multiple:true,
					checkStrictly:true,
				},
				departMentId:[],//所选部位的id
			}
		},
		methods:{
			changeTab(index){
				this.tabindex=index
			},
			// 增加部位，弹窗
			selectFirst(){
				console.log(this.allData) //部位数据
				console.log(this.firstData) //前两层数据
				this.allData.forEach(item=>{
					this.firstData.forEach(item1=>{
						item1.children.forEach(item1=>{
							item1.position.forEach(item2=>{
								if(item2==item.id){
									item1.children.push(item)
								}
							})
						})
					})
				})
				console.log(this.firstData)
				this.firstData.forEach(item=>{
					if(item.children.length!=0){
						item.user=false
						item.children.forEach(item1=>{
							if(item1.children.length!=0){
								item1.user=false
							}else{
								item1.user=true
							}
						})
					}else{
						item.user=true
					}
				})
				console.log(this.firstData)
				this.tree=this.firstData
				console.log(this.tree)
				this.departmentShow=true
			},
			// 选择导板和器械
			checkboxChange(e){
				console.log(e)
				if(e.name=='导板'){
					this.guideBool=e.value
				}
				if(e.name=='器械'){
					this.instrumentBool=e.value
				}
			},
			// 选择的部位
			selectconfirm(val){
				console.log(val)
				this.checkList=val
			},
			// 确定选择的部位
			surepop(){
				var data=[]
				this.checkList.forEach(item=>{
					data.push(item.id)
				})
				console.log(data)
				console.log(data.length)
				this.departMentId=Array.from(new Set(data))
				console.log(this.departMentId)
				console.log(this.departMentId.length)
				this.departmentShow=false
			},
			// 取消选择的部位
			cancelpop(){
				this.departmentShow=false
			},
			// 取消选择服务
			cancel(){
				
			},
			// 下一步
			next(){
				
			},
			getAllDepartment(){
				casePrice({}).then(res=>{
					console.log(res)
					this.allData=res.data.object
					this.allData.forEach(item=>{
						item.user=true
					})
					console.log(this.allData)
				}).catch(err=>{
					console.log(err)
				})
			},
			// 获取基础部位的数据
			getdepartment(){
				// 获取基础部位的数据
				getdepartment({}).then(res=>{
					if(res.data.code==0){
						this.firstData=res.data.object
						console.log(this.firstData)
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
		onLoad() {
			// 获取所有部位的数据
			this.getAllDepartment()
			this.getdepartment()
		}
	}
</script>

<style lang="scss">
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
		color: #007AFF;
	}
	.department{
		padding: 0 30rpx;
		.title{
			padding: 30rpx 0;
		}
		.departMenu{
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			.tag{
				padding: 20rpx 10rpx 0;
			}
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
	.bgColor{
		font-size: 28rpx;
		color: #69CDFF;
		font-weight: bold;
	}
	.NobgColor{
		color: #000000;
		font-weight: 400;
	}
</style>
