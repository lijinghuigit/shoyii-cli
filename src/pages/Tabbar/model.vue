<template>
	<view class="allModel" :data-theme='themeType'>
		<!-- #ifndef MP-WEIXIN -->
		<u-navbar :is-back="false" title="" :background="themeType=='dark'?{backgroundColor:'#3A3A3A'}:{background: '#ffffff'}"
		:border-bottom="themeType=='dark'?false:true">
			<view class="slot-wrap" style="width: 100%;padding: 0 30rpx;display: flex;align-items: center;">
				<view class="" style="flex: 1;">
					<u-search @search='search' @custom='search' @clear='clear' placeholder="输入分类名称"
					 v-model="searchContent" shape="round"  :bg-color="themeType=='dark'?'#1B1C1E':'#F8F8F8'" placeholder-color='#666666' 
					 clearabled show-action action-text="搜索" animation></u-search>
				</view>
				<uni-icons type="chat" color='#999' size='26' @click="help" style="margin-left: 30rpx;"></uni-icons>
			</view>
		</u-navbar>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<mini-nav @help='help'
		 :statusBarHeight='statusBarHeight' :widthLength='widthLength' 
		 :miniObject='miniObject' 
		 @search='minisearchConfirm' @clear='clear' style="z-index: 100;"
		 ></mini-nav>
		<!-- #endif -->
		<view class="section">
			<view class="addBtn sy_block" @tap="plusClassify">
				<text>添加分类</text>
			</view>
			<view style="margin-top: 20rpx;">
				<view class="classifyItems sy_block" v-for="(item,index) in modelData" :key='item.id'  @click="enterType(item)">
					<view class="classifyTitle">
						<text class="type-name sy_title_primary">{{item.modelLibTypeName}}</text>
						<view class="">
							<u-tag :text="handleShare(item.share)" :type="handleStatus(item.share)" size='mini' mode="plain"/>
						</view>
					</view>
					<view class="items sy_border_top" v-if="item.modelLibs.length!=0" :hover-class="themeType=='dark'?'sy_hover_bg':'bgColor'">
						<view class="items_list" v-for="(s_item,s_index) in item.modelLibs" :key='s_item.id'>
							<view class="imgpic sy_border">
								<u-image height="100%" mode="scaleToFill" :src="s_item.fristImgFileId?s_item.previewImage[s_item.fristImgFileId]:'/static/image/shoyiiLogo.png'">
									<template v-slot:loading>
										<uni-icons type="spinner-cycle"></uni-icons>
									</template>
									<template v-slot:error>
										<view style="">
											<image style="width: auto;" class="imgpic"
											src="/static/image/shoyiiLogo.png" mode=""></image>
										</view>
									</template>
								</u-image>
							</view>
							<view class="items_content">
								<text class="model_text sy_title_primary">{{s_item.modelName}}</text>
								<text class="description model_text">{{timeStamp(s_item.createTime)}}</text>
							</view>
						</view>
					</view>
					<view class="" v-else>
						<u-empty text="数据为空" mode="data"></u-empty>
					</view>
				</view>
			</view>
		</view>
		<view class="bottomTip">
			<load-more :loadtext='loadtextAll'></load-more>
		</view>
		<!-- 新增分类 -->
		<u-modal v-model="addshow" width='650' title="新增分类" confirm-color='#000000' mask-close-able
		negative-top='140rpx' :show-cancel-button='true' ref="uModal" @confirm="addConfirm">
			<view class="" style="padding: 60rpx 30rpx;display: flex;justify-content: space-between;">
				<u-input v-model="addTypeName" type="text" :border="true" placeholder='输入分类名称' style="width: 100%;"/>
			</view>
		</u-modal>
		<!-- empty -->
		<u-empty text="无数据" src='/static/svg/model_device.svg' icon-size='200' :show="modelData.length==0"></u-empty>
		<u-no-network></u-no-network>
	</view>
</template>
<script>
	import {getMyModel,editClassify} from '@/utill/api/model/getModel.js'
	import modellist from '@/components/model/modellist.vue'
	import {mapGetters,mapState,useStore} from 'vuex'
	import {reactive,toRefs,computed,getCurrentInstance} from 'vue'
	import {onShow,onLoad,onReachBottom,onUnload,onPullDownRefresh} from '@dcloudio/uni-app'
	var stopTimer=null;
	export default {
		components:{
			modellist,
		},
		setup(props,context){
			const { proxy } = getCurrentInstance(); 
			const store=useStore()
			const state = reactive({
				miniObject:{
					placeHolder:'Mymodel'
				},
				searchContent:'',
				statusBarHeight: '', //状态栏高度
				menuButtonInfo:{},
				modelData:[],//模型库数据
				page:1,
				totalPages:null,//总页数
				loadtextAll:'',//底部提示,
				addshow:false,//新增分类的弹窗
				addTypeName:'',//新增的分类名称
			})
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
				searchContent(state.searchContent)
			}
			const minisearchConfirm=(e)=>{
				if(!e){
					uni.showToast({
						title:'搜索内容不能为空',
						icon:'none'
					})
					return
				}
				searchContent(e)
			}
			const searchContent=(content)=>{
				getMyModel({
					modelTypeName:content
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						state.modelData=res.data.object.list
					}
				}).catch(err=>{
					console.log(err)
				})
			}
			// 点击搜索框清除按钮，重新获取数据
			const clear=()=>{
				state.page=1
				state.totalPages=null,//总页数
				getData(1)
			}
			const DataStatus=computed(()=>{
				return store.getters.DataStatus
			})
			const handleShare=(value)=>{
				if(value){//存在，已公开
					return '已公开'
				}else{//不存在，未公开
					return '未公开'
				}
			}
			const handleStatus=(value)=>{
				if(value){//存在，已公开
					return 'success'
				}else{//不存在，未公开
					return 'info'
				}
			}
			const getData=(page,bool)=>{//bool用于做监听事件的触发，以不同的方式更新数据
				if(!proxy.checkAudit()){//审核通过后获取数据
					getMyModel({
						pageNum:page,
						pageSize:4
					}).then(res=>{
						console.log(res)
						if(res.data.code==0){
							if(bool){
								state.modelData=res.data.object.list
							}else{
								state.modelData=[...state.modelData,...res.data.object.list] 
							}
							console.log(state.modelData)
							state.totalPages=res.data.object.pages
							state.page++
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
			}
			// #ifdef MP-WEIXIN
			const widthLength=computed(()=>{
				return 750 - state.menuButtonInfo.width*2
			})
			// #endif
			// 进入分类的列表
			const enterType=(data)=>{
				console.log('123456')
				var data={
					id:data.id,//分类id
					modelLibTypeName:data.modelLibTypeName,//分类名称
					share:data.share,//该分类是否公开
					downloadBoolean:data.downloadBoolean ,//是否下载，
					ownId:data.ownId//医生id
				}
				uni.navigateTo({
					url:'/pages/model/myClassify?data='+encodeURIComponent(JSON.stringify(data)),
				})
			}
			const plusClassify=()=>{
				console.log('haha')
				// #ifndef H5
				state.addshow=true
				// #endif
				// #ifdef H5
				uni.showToast({
					title:'网页端不能操作',
					icon:'none'
				})
				// #endif
			}
			// 新增分类名称的确定
			const addConfirm=()=>{
				console.log(state.addTypeName,store.getters['user/info'].doctorId)
				editClassify({
					modelLibTypeName:state.addTypeName,//模型分类名称	
					ownId:store.getters['user/info'].doctorId,//医生id	
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){//刷新数据
						state.page=1,
						state.totalPages=null,//总页数
						getData(1,'emitBool')
					}
					uni.showToast({
						title:res.data.msg,
						icon:'none'
					})
				}).catch(err=>{
					console.log(err)
				})
			}
			onShow(()=>{
				if(proxy.checkLogin('/pages/Tabbar/model',1)){//token 存在
					if(state.modelData.length==0||DataStatus.value){//有没有数据去加载
						getData(1)//初始化时，加载所有的数据
					}
				}else{
					if(state.modelData.length!=0){
						state.modelData=[]
					}
				}
			})
			onLoad(()=>{
				uni.$on('editModelData',function(value){
					if(value.updataBool){
						console.log('触发')
						state.page=1,
						state.totalPages=null,//总页数
						getData(1,'emitBool')
					}
				})
				uni.$on('refreshModel',function(value){
					console.log('监听',value)
					state.page=1,
					state.totalPages=null,//总页数
					getData(1,'emitBool')
				})
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
			onUnload(()=>{
				uni.$off('editModelData', ()=>{})
				clearTimeout(stopTimer)
			})
			onReachBottom(()=>{
				console.log(state.page)
				console.log(state.totalPages)
				if(state.page > state.totalPages) return state.loadtextAll = 'nomore';
				state.loadtextAll = 'loading';
				getData(state.page)
			})
			// 下拉刷新
			onPullDownRefresh(()=>{
				state.page=1,
				state.totalPages=null,//总页数
				getData(1,'emitBool')
				stopTimer=setTimeout(function () {
					uni.stopPullDownRefresh();//停止刷新，这边可以进行数据的更新
				}, 2000);
			})
			return {
				...toRefs(state),
				store,
				help,
				search,
				clear,
				DataStatus,
				getData,
				handleShare,
				handleStatus,
				enterType,
				plusClassify,
				addConfirm,
				minisearchConfirm,
				// #ifdef MP-WEIXIN
				widthLength
				// #endif
			}
		}
	}
</script>
<style lang="scss">
	page{
		/* #ifdef H5 */
		display: flex;
		/* #endif */
	}
	.allModel{
		width: 100%;
		/* #ifdef H5 */
		min-height: 100%; 
		/* #endif */
		/* #ifndef H5 */
		min-height: 100vh;
		/* #endif */
	}
	.section{
		padding: 0 30rpx;
		.addBtn{
			margin-top: 20rpx;height: 80rpx;line-height: 80rpx;
			font-size:28rpx;color: #000000;text-align: center;background-color: #FFFFFF;
			border-radius: 15rpx;
		}
	}
	.classifyItems{
		padding:20rpx;background-color: #FFFFFF;
		margin-bottom: 20rpx;
		border-radius: 15rpx;
		.classifyTitle{
			color: #000000;
			font-family: PingFang-SC-Bold;
			font-size: 30rpx;
			font-weight: bold;
			display: flex;
			justify-content: space-between;
			padding-bottom: 28rpx;
			.type-name{
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
				flex: 1;
			}
		}
		.items{
			padding-top: 30rpx;border-top: 1px solid #EEEEEE;
			.items_list{
				display: flex;
				.imgpic{
					min-width: 156rpx;height: 148rpx;border: 1px solid #EEEEEE;border-radius: 10rpx;
				}
				.items_content{
					flex: 1;padding-left: 20rpx;display: flex;flex-direction: column;justify-content: center;
					.model_text{
						display: -webkit-box;
						-webkit-box-orient: vertical;
						overflow: hidden;
						word-wrap: break-word;
						word-break: break-all;
						text-overflow: ellipsis;
					}
					uni-text:nth-child(1){
						color: #000000;font-size: 30rpx;line-height: 60rpx;
						-webkit-line-clamp: 2;
					}
					.description{
						color: #8F8F8F;font-size: 24rpx;line-height: 36rpx;
						-webkit-line-clamp:1;
					}
				}
			}
			.items_list{
				padding: 10rpx 0;
			}
		}
		.bgColor{
			background-color: $uni-bg-color-grey;
		}
	}
	.bottomTip{
		color: #86B0D4;
		text-align: center;
		margin: 10rpx 0;
		font-size: 28rpx;
	}
</style>
