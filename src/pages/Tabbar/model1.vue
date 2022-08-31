<template>
	<view class="allModel">
		<!-- #ifndef MP-WEIXIN -->
		<u-navbar :is-back="false" title="">
			<view class="slot-wrap" style="width: 100%;padding: 0 30rpx;display: flex;align-items: center;">
				<view class="" style="flex: 1;">
					<u-search @search='search' @custom='search' placeholder="模型相关信息" v-model="searchContent" shape="round" border-color='#EEEEEE' :clearabled="true" :show-action="true" action-text="搜索" :animation="true"></u-search>
				</view>
				<uni-icons type="chat" color='#999' size='26' @click="help" style="margin-left: 30rpx;"></uni-icons>
			</view>
		</u-navbar>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<mini-nav  @help='help' @clearUp='clearUp' :statusBarHeight='statusBarHeight' :widthLength='widthLength' :Tabtitle='Tabtitle' :Navobject='Navobject'></mini-nav>
		<!-- #endif -->
		<!-- <view class="" style="padding: 10rpx 30rpx;background-color: #FFFFFF;">
			<u-search @search='search' @custom='search' placeholder="模型相关信息" v-model="searchContent" shape="round" border-color='#EEEEEE' height='64' :clearabled="true" :show-action="true" action-text="搜索" :animation="true"></u-search>
		</view> -->
		<view class="tab">
			<view class="allMenu" @click="clickMenu(null)" :class="boolean==null?'borderColor':''">
				<text>全部</text>
			</view>
			<view class="menu">
				<view class="menuItems" v-for="(item,index) in tabs" :key='index' @click="clickMenu(item.id)" :class="boolean==item.id?'borderColor':''">
					<text>{{item.modelLibTypeName}}</text>
				</view>
			</view>
			<view class="rightMenu">
				<text style="color: #EEEEEE;">|</text>
				<text @click="editClassiify">编辑分类</text>
			</view>
		</view>
		<view class="section">
			<view v-for='(item,index) in classifyData' :key='index' style="padding-top: 30rpx;">
				<view class="" style="padding: 0 30rpx;font-size: 30rpx;color: #000000;font-family: PingFang-SC-Bold;font-weight: bold;">
					<text>{{item.title}}</text>
				</view>	
				<view class="content" v-for='(s_item,s_index) in item.modelLibs' :key='s_index' style="">
					<view class="" v-if="checkShow">
						<u-checkbox
							active-color="#86B0D4"
							shape="circle"
							@change="singlecheck($event,s_item.id)" 
							v-model="s_item.checked" 
							:name="s_item.id"
						></u-checkbox>
					</view>
					<modellist style="flex: 1;" :MyModel='MyModel' :items="s_item"></modellist>
				</view>
			</view>
			<view :style="{height: emptyHeight+'rpx'}">
			</view>
			<view class="">
				<u-empty class="empty" text="无数据" mode="data" :show="emptyShow"></u-empty>
			</view>
		</view>
		<view class="bottonFunction" v-if="clearShow" style="">
			<view>
				<u-checkbox
					class="checkBox"
					active-color="#86B0D4"
					shape="circle"
					@change="checkboxChange($event)" 
					v-model="checked" 
				>全选</u-checkbox>
			</view>
			<view class="" style="display: flex;justify-content: space-between;flex: 1;">
				<u-button shape="circle" class="customStyle color3" :hair-line='false' @click="addModel">导入分类</u-button>
				<u-button shape="circle" class="customStyle color3" :hair-line='false' @click="batchOpenModel">选择公开模型</u-button>
			</view>
		</view>
		<u-modal v-model="addclassify" width='720' title="添加分类" confirm-color='#000000' negative-top='140rpx' :show-cancel-button='true' ref="uModal" @confirm="confirm" @cancel="cancel">
			<view class="" style="padding: 60rpx 30rpx;">
				<u-input v-model="addvalue" type="text" :border="true"/>
			</view>
		</u-modal>
		<u-modal v-model="addshow" width='650' title="模型分类" confirm-color='#000000' negative-top='140rpx' :show-cancel-button='true' ref="uModal" @confirm="classifyconfirm" @cancel="classifycancel">
			<view class="slot-content">
				<scroll-view scroll-y="true" style="max-height:360rpx ;height: 100%;">
					<u-radio-group class="radioGroup" active-color='#86B0D4'>
						<view class="radioItem" style="" v-for="(item, index) in tabs" :key="index" >
							{{item.modelLibTypeName}}
							<u-radio
								icon-size='30'
								@change="radiochange($event,item.id)"
								:name="item.modelLibTypeName"
							>
							</u-radio>
						</view>
					</u-radio-group>
				</scroll-view>
			</view>
		</u-modal>
		<!-- 编辑分类 -->
		<u-modal v-model="editclassify" :mask-close-able=true width='720' title="编辑分类" :show-confirm-button='false' confirm-color='#000000' negative-top='140rpx' ref="uModal" @confirm="confirm" @cancel="cancel">
			<view class="" style="padding: 60rpx 30rpx;display: flex;justify-content: space-between;">
				<u-input v-model="classifyName" type="text" :disabled='disabled' :border="Inputborder"/>
				<view class="" style="display: flex;align-items: center;margin-left: 20rpx;">
					<u-button :custom-style="customStyle" size="mini" @click="delType">删除</u-button>
					<u-button :custom-style="customStyleEdit" size="mini" v-if="editBool" @click="editType">修改</u-button>
					<u-button :custom-style="customStyleEdit" size="mini" v-else @click="completeType">完成</u-button>
				</view>
			</view>
			<view class="" style="text-align: center;padding: 30rpx 0;border-top: 1px solid #EEEEEE;">
				<text @click="addType">添加分类</text>
			</view>
		</u-modal>		
		<u-no-network></u-no-network>
	</view>
</template>

<script>
	import {getClassifyType,getClassifyList,addClassify,batchModel,batchshareModel,deleteModelType,editModelType} from '@/utill/api/model/getModel.js'
	import modellist from '@/components/model/modellist.vue'
	import {mapGetters,mapState,useStore} from 'vuex'
	import {reactive,toRefs,computed,getCurrentInstance} from 'vue'
	import {onShow,onLoad} from '@dcloudio/uni-app'
	export default {
		components:{
			modellist,
		},
		setup(props,context){
			const { proxy } = getCurrentInstance(); 
			const store=useStore()
			const state = reactive({
				Navobject:{
					left:'帮助',
					center:'模型库',
					right:'model'
				},
				clearShow:false,//整理与完成的切换
				Tabtitle:'整理',
				emptyHeight:30,//底部占位
				boolean:null,//分类的展示，默认是全部
				tabs: [],//所有分类
				// 修改分类的按钮样式
				customStyle: {
					marginRight: '40rpx', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
					color: '#FD3130',
				},
				customStyleEdit:{
					color:'#000000'
				},
				Inputborder:false,//修改分类时的输入框，默认没有边框
				disabled:true,//修改分类时的输入框，默认禁用
				classifyData:[],//该分类下的所有模型数据
				addclassify:false,//新增分类弹窗
				addvalue: '',//添加分类的输入框
				MyModel:0,//用于区分是进入我的模型库详情还是公开模型库详情，0是进入我的模型库详情
				emptyShow:false,//无数据时的组件
				checkShow:false,//是否展示模型的选择按钮
				checked:false,//全选按钮
				classifyId:'',//分类的id
				classifyName:'',//分类的名称
				addshow:false,//导入其他分类的弹窗
				selectClassifyId:'',//选择的某一个分类的id
				editclassify:false,//编辑分类的弹窗
				editBool:true,//修改与完成功能替换
				searchContent:'',
				statusBarHeight: '', //状态栏高度
				menuButtonInfo:{}
			})
			// 选择每一个模型数据
			const singlecheck=(e,id)=>{
				if(e.value==true){
					var model=store.state.modelIds
					console.log(model)
					model += id+','
					console.log(model)
					store.commit('saveModelIds',model)
				}else{
					var aa=store.state.modelIds
					var aa=aa.split(',')
					aa.forEach((item,index)=>{
						if(item==id){
							aa.splice(index,1)
						}
					})
					console.log(aa)
					var cc=aa.join(',')
					store.commit('saveModelIds',cc)
				}
				console.log(store.state.modelIds)
				var str=''
				state.classifyData.forEach((item,index)=>{
					item.modelLibs.forEach((s_item,s_index)=>{
						str += s_item.id+','
					})
				})
				var dd=str.split(',')
				var aa=store.state.modelIds.split(',')
				console.log(aa)//因为有逗号，所以比原有数据多1个
				if(aa.length==dd.length){
					console.log('全选啦')
					state.checked=true
				}else{
					state.checked=false
				}
			}
			const help=()=>{
				if(store.getters['user/hasLogin']){
					uni.navigateTo({
						url:'/pages/shoyiiChat/index'
					})
				}else{
					uni.showToast({
						title:'未登录',
						icon:'none'
					})
				}
			}
			const search=()=>{
				console.log(state.searchContent)
				if(!state.searchContent){
					uni.showToast({
						title:'搜索内容不能为空',
						icon:'none'
					})
					return
				}
				getClassifyList({
					modelName:state.searchContent
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						if(res.data.object.length==0){
							state.emptyShow=true
						}else{
							state.emptyShow=false
						}
						state.classifyData=res.data.object
					}
				}).catch(err=>{
					console.log(err)
				})
			}
			// 整理
			const clearUp=()=>{
				state.clearShow=!state.clearShow
				if(state.clearShow){
					state.emptyHeight=110
					state.Tabtitle='完成'
					state.checkShow=true
				}else{
					state.checked=false
					state.emptyHeight=30
					state.Tabtitle='整理'
					state.checkShow=false
					//清空选择的模型
					store.commit('saveModelIds','')
					state.classifyData.forEach((item,index)=>{
						item.modelLibs.forEach((s_item,s_index)=>{
							// this.$set(s_item,'checked',false)//全部模型数据被选择
							s_item.checked=false
						})
					})
					console.log(state)
					state.checked=false//全选也是false
				}
			}
			// 删除分类
			const delType=()=>{
				deleteModelType({
					id:state.classifyId
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
						// 编辑窗口关闭
						state.editclassify=false
						// 重新渲染分类数据
						getClassify()
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
			// 修改分类
			const editType=()=>{
				state.Inputborder=true//输入框的边框出现
				state.disabled=false//禁用消失
				state.editBool=false//修改按钮替换成完成按钮
			}
			// 修改分类后的完成功能
			const completeType=()=>{
				editModelType({
					ownId:store.getters['user/info'].doctorId,
					id:state.classifyId,
					modelLibTypeName:state.classifyName
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						uni.showToast({
							title:res.data.msg,
						})
						state.Inputborder=false
						state.disabled=true
						state.editBool=true
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
			// 添加分类
			const addType=()=>{
				// 关闭原弹窗
				state.editclassify=false
				// 打开新窗口
				state.addclassify=true
			}
			// 全选按钮的选择
			const checkboxChange=(e)=>{
				state.checked=e.value
				if(state.checked){//全选
					var str=''
					state.classifyData.forEach((item,index)=>{
						item.modelLibs.forEach((s_item,s_index)=>{
							str += s_item.id+','
							// this.$set(s_item,'checked',true)//全部模型数据被选择
							s_item.checked=true
						})
					})
					console.log(state.classifyData)
					store.commit('saveModelIds',str)
				}else{//全不选
					state.classifyData.forEach((item,index)=>{
						item.modelLibs.forEach((s_item,s_index)=>{
							// this.$set(s_item,'checked',false)//全部模型数据不被选择
							s_item.checked=false
						})
					})
					console.log(state.classifyData)
					//清空选择的模型
					store.commit('saveModelIds','')
				}				
			}
			// 获取分类对应的数据
			const clickMenu=(id)=>{
				console.log(id)
				// 点击不同分类要清除选中的模型数据
				store.commit('saveModelIds','')
				// 全选按钮失效
				state.checked=false
				state.boolean=id
				state.classifyId=id//赋值分类id
				getData(id)//获取分类下的模型数据
			}
			// 获取所有的分类
			const getClassify=()=>{
				getClassifyType({}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						state.tabs=res.data.object
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
			// 获取分类下的数据
			const getData=(id)=>{
				// #ifdef MP-WEIXIN
				if(id===null){
					id=''
				}
				// #endif
				console.log(id)
				var timer = setTimeout(function() {
					uni.showLoading({
					  title: '数据加载中...',
					})
				}, 2000)
				getClassifyList({
					modelCategory:id
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						clearTimeout(timer)
						uni.hideLoading()
						if(res.data.object.length==0){
							state.emptyShow=true
						}else{
							state.emptyShow=false
						}
						state.classifyData=res.data.object
						state.classifyData.forEach(item=>{//添加checked属性，因为小程序中有bug
							item.modelLibs.forEach(s_item=>{
								// this.$set(s_item,'checked',false)
								s_item.checked=false
							})
						})
						console.log(state.classifyData)
					}
				}).catch(err=>{
					clearTimeout(timer)
					uni.hideLoading()
					console.log(err)
				})
			}
			// 编辑分类
			const editClassiify=()=>{
				console.log(state.classifyId)
				if(!state.classifyId){
					uni.showToast({
						title:'请选择分类',
						icon:'none'
					})
					return;
				}
				state.tabs.forEach(item=>{
					if(item.id==state.classifyId){
						state.classifyName=item.modelLibTypeName
					}
				})
				state.editclassify=true
			}
			// 新增分类的确定
			const confirm=()=>{
				console.log(state.addvalue)
				addClassify({
					modelLibTypeName:state.addvalue,
					ownId:store.getters['user/info'].doctorId
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						getClassify()
					}else{
						uni.showToast({
							title:res.data.code
						})
					}
				}).catch(err=>{
					console.log(err)
				})
			}
			// 新增分类的取消
			const cancel=()=>{}
			// 导入分类，分类之间的模型批量转换
			const addModel=()=>{
				console.log(store.state.modelIds)//要去除最后一个逗号
				if (store.state.modelIds.length > 0) {
					store.commit('saveModelIds',store.state.modelIds.substr(0, store.state.modelIds.length - 1))
					console.log(store.state.modelIds)//要去除最后一个逗号
					state.addshow=true
				}else{
					uni.showToast({
						title:'至少选择一个模型',
						icon:'none'
					})
					return;
				}
			}
			// 选择分类的复选框
			const radiochange=(e,id)=>{
				state.selectClassifyId=id
			}
			// 选择分类的确定
			const classifyconfirm=()=>{
				console.log(state.selectClassifyId)
				if(!state.selectClassifyId){
					uni.showToast({
						title:'请选择分类',
						icon:'none'
					})
					return;
				}
				batchModel({
					modelIds:store.state.modelIds,
					modelCategory:state.selectClassifyId,
				}).then(res=>{
					// 完成之后，清除选择的数据
					store.commit('saveModelIds','')
					clearUp()
					console.log(res)
					if(res.data.code==0){
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
					}
				}).catch(err=>{
					store.commit('saveModelIds','')
					clearUp()
					console.log(err)
				})
			}
			// 选择分类的取消
			const classifycancel=()=>{
				//清空选择的模型，否则会将原始数据与新数据叠加
				store.commit('saveModelIds','')
				state.classifyData.forEach((item,index)=>{
					item.modelLibs.forEach((s_item,s_index)=>{
						// this.$set(s_item,'checked',false)//全部模型数据被选择
						s_item.checked=false
					})
				})
				state.checked=false//全选也是false
			}
			// 批量公开模型
			const batchOpenModel=()=>{
				console.log(store.state.modelIds)
				 if (store.state.modelIds.length > 0) {
					store.commit('saveModelIds',store.state.modelIds.substr(0, store.state.modelIds.length-1));
				 }else{
					uni.showToast({
						title:'至少选择一个模型公开',
						icon:'none'
					})
					return;
				 }
				// console.log(this.$store.state.modelIds)
				// 选择完之后,一定要进行原有的store清除，不然会混乱
				batchshareModel({
					ids:store.state.modelIds,
					share:true
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
						// 完成之后,要清除该数据
						store.commit('saveModelIds','')
						clearUp()
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
						store.commit('saveModelIds','')
						clearUp()
					}
				}).catch(err=>{
					store.commit('saveModelIds','')
					clearUp()
					console.log(err)
				})
			}
			const DataStatus=computed(()=>{
				return store.getters.DataStatus
			})
			// #ifdef MP-WEIXIN
			const widthLength=computed(()=>{
				return 750 - state.menuButtonInfo.width*2
			})
			// #endif
			onShow(()=>{
				var res=proxy.checkLogin('/pages/Tabbar/model',1)
				if(res){//token 存在
					console.log(DataStatus.value)
					if(state.classifyData.length==0||DataStatus.value){//到底有没有数据去加载
						getData(null)//初始化时，加载所有的数据
					}
					if(state.tabs.length==0){
						// 查询所有的分类类型
						getClassify()
					}
				}else{
					return;
				}
			})
			onLoad(()=>{
				uni.getSystemInfo({  //获取状态栏高度
					success: function(res) {  
						state.statusBarHeight = res.statusBarHeight;  
						console.log(state.statusBarHeight);  
					}  
				});
				// #ifdef MP-WEIXIN
				state.menuButtonInfo = uni.getMenuButtonBoundingClientRect()
				console.log(state.menuButtonInfo)//胶囊信息
				// #endif
			})
			
			return {
				...toRefs(state),
				store,
				singlecheck,
				help,
				search,
				clearUp,
				delType,
				editType,
				completeType,
				addType,
				checkboxChange,
				clickMenu,
				getClassify,
				getData,
				editClassiify,
				confirm,
				cancel,
				addModel,
				radiochange,
				classifyconfirm,
				classifycancel,
				batchOpenModel,
				auditconfirm,
				auditcancel,
				DataStatus,
				// #ifdef MP-WEIXIN
				widthLength
				// #endif
			}
		}
	}
</script>
<style lang="scss" scoped>
	page{
		position: relative;
		width: 100%;
		height: 100%;
	}
	.allModel{
		width: 100%;
		/* #ifdef H5 */
		height:100%;
		/* #endif */
		/* #ifndef H5 */
		height: 100vh;
		/* #endif */
		display: flex;
		flex-direction: column;
	}
	.tab{
		display: flex;justify-content: space-between;align-items: center;background-color: #FFFFFF;
		padding: 0 30rpx;
		.allMenu{
			font-size: 24rpx;
			padding: 0 10rpx;
		}
		.menu{
			flex: 1;display: flex;justify-content: flex-start;overflow-x: auto;height: 88rpx;line-height: 88rpx;
			padding: 0 20rpx;
			-webkit-overflow-scrolling: touch;
			.menuItems{
				flex-shrink: 0;padding: 0 20rpx;
				font-size: 24rpx;
			}
		}
		.rightMenu{
			width:150rpx;height: 88rpx;line-height: 88rpx;color: #000000;
			padding: 0 10rpx;
			font-size: 24rpx;
			display: flex;align-items: center;justify-content: space-between;
		}
	}
	.borderColor{
		color: #86B0D4;
	}	
	.section{
		flex: 1;
		height: 100%;
		overflow: auto;
		-webkit-overflow-scrolling: touch;
		.content{
			padding: 0 30rpx;display: flex;align-items: center;
			-webkit-overflow-scrolling: touch;
		}
	}
	/* #ifdef MP-WEIXIN */
	.checkBox ::v-deep .u-checkbox{
		width: 130rpx!important;
	}
	.customStyle ::v-deep .u-size-default{
		height: 60rpx!important;
	}
	/* #endif */
	/* #ifdef MP-WEIXIN */
	.customStyle {
		border: none!important;
	}
	/* #endif */
	.customStyle{
		height: 60rpx;
		// width: 170rpx;
		background-color: #F8F8F8;
		padding: 10rpx 40rpx;
		font-size: 24rpx;	
		color: #FD3130;
		border: 1px solid #BBBBBB;
	}
	.color3{
		color: #000000;
	}
	.slot-content{
		padding: 40rpx 40rpx;
		height: 100%;
	}
	.radioGroup{
		// padding-bottom: 10rpx;
		padding: 10rpx 0;
		// height: 360rpx;
		overflow: auto;
		width: 100%;
	}
	.radioItem{
		width: 100%;
		display: flex;
		justify-content: space-between;
		line-height: 56rpx;
		color: #000000;
		font-size: 28rpx;
		font-family:PingFang-SC-Regular;
	}
	.bottonFunction{
		display: flex;align-items: center;justify-content: space-between;padding: 0 30rpx;height: 110rpx;
		background-color: #F8F8F8;border-top: 1px solid #EEEEEE;width: 100%;
		position: absolute;
		bottom:0rpx;
		// 或者
		// position: fixed;
		// bottom:calc(var(--window-bottom) )
	}
</style>
