<template>
	<view class="classifycase" :data-theme='themeType'>
		<uni-nav-bar title="" leftIcon='back'
		class='navbar'
		fixed statusBar
		leftWidth='30rpx' rightWidth='30rpx'
		@clickLeft='back'
		:border="themeType=='dark'?false:true"
		:dark="themeType=='dark'?true:false">
			<!-- #ifdef MP-WEIXIN -->
			<view class="serachbox" :style="{'padding-right': paddingRight+'rpx'}">
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
			<view class="serachbox">
			<!-- #endif -->
				<uni-search-bar @confirm="search" class='search'
				v-model="searchValue" radius='20'
				@clear='clear'
				:bgColor="themeType=='dark'?'#1B1C1E':'rgb(248, 248, 248)'"
				placeholder='输入手术方法'>
				</uni-search-bar>
			</view>
		</uni-nav-bar>
		<view class="header_top sy_block sy_border_none">
			<u-dropdown ref="uDropdown" @open="open" @close="close" active-color="#86B0D4">
				<u-dropdown-item :title="item.title" v-for="(item,index1) in menu" :key='index1'>
					<view class="slot-content sy_block">
						<scroll-view scroll-y="true" style="height: 294rpx;">
							<view :class="boolean==item.id?'selectedClass':''" class="subContent sy_title_primary" @click="selectedContent(item)" v-for="(item,index2) in menuData" :key='index2'>
								<text>{{item.name}}</text>
							</view>
						</scroll-view>
						<view class="btn sy_block">
							<u-button type="primary" size="default" shape="square" class="surebtn" @click="closeDropdown">确定</u-button>
						</view>
					</view>
				</u-dropdown-item>
			</u-dropdown>
		</view>
		<scroll-view
		refresher-enabled="true" :refresher-triggered='triggered'
		:scroll-top="scrollTop" scroll-y="true" 
		@scroll='scroll' class="scrollContent" 
		@refresherrefresh='handlerefresh'
		@refresherrestore="onRestore"
		refresher-default-style="black"
		@scrolltolower='scrolltolower'>
			<view v-for="(item,index2) in caseList" :key="item.caseHistoryId">
				<case-list :casecode="item.caseHistoryNo" 
				:Uname='item.name' :Caseid='item.caseHistoryId' 
				:content='item.title' :imgUrl='item.previewImage'
				:classifycase='true'>
				</case-list>
			</view>
			<view class="bottomTip">
				<load-more :loadtext='loadtextAll'></load-more>
			</view>
			<view v-if="old.scrollTop>'2000'" @click="goTop" class="backTop">
			    <u-icon name="arrow-upward" size='30'></u-icon>
			</view>
		</scroll-view>
		<u-empty class="empty" text="无数据" src='/static/svg/model_device.svg' icon-size='200'
		 :show="caseList.length==0"></u-empty>
		<u-no-network></u-no-network>
	</view>
</template>

<script>
	import {getclassifycase} from './api/casePrice.js'
	import {getSurgicalMenu} from '@/utill/api/surgical/getSurgical.js' 
	import CaseList from '@/components/CaseList/CaseList.vue'
	export default {
		components:{
			CaseList
		},
		data(){
			return {
				menuButtonInfo:{},
				searchValue:'',
				// 下拉菜单
				boolean:0,//选中子菜单
				menu:[//默认菜单
					{title:'科室'},
					{title:'部位'},
					{title:'子部位'},
				],
				menuData:[],//下拉出来的子菜单
				index:'',//顶部子菜单的index，对应menu中的index
				id:'',//选中的子菜单的id，用于获取下一级菜单数据
				officeId:'',
				sectionId:'',
				sonsectionId:'',
				methodsId:'',
				// 列表
				scrollTop:0,
				old: {
					scrollTop: 0
				},
				triggered:true,
				caseList:[],
				page:1,
				total:1,//总页数默认为1，后端没有数据返回的是0
				mark:0,//用于进行加载更多的操作,用于进行数据的contact,是0则只加载第一页数据，为1，则进行数据的叠加
				loadtextAll:'',//全部手术方法的底部提示
			}
		},
		methods:{
			search(){
				this.page=1
				this.getCase(this.searchValue,'',0)
			},
			// 点击清除恢复元数据
			clear(){
				this.page=1
				this.getCase('','',0)//
			},
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			//点击默认菜单中选型
			open(index) {
				this.index=index
				console.log(index)//根据index，去调用接口，获取内容数据
				// 展开某个下来菜单时，先关闭原来的其他菜单的高亮
				// 同时内部会自动给当前展开项进行高亮
				this.$refs.uDropdown.highlight();
				// this.menuData 根据不同的index，获取不同的数据
				if(index==0){//科室的数据
					this.getTitle(0)//获取科室数据，默认是0或者不传
				}
				// 部位数据
				if(index==1){
					if(!this.officeId){//如果没选中一级子菜单，则数据为空
						uni.showToast({
							title:'请选择科室',
							icon:'none'
						})
						this.menuData=''
						return
					}
					this.getTitle(this.officeId)
				}
				// 子部位数据
				if(index==2){//如果没选中二级子菜单，则数据为空	
					if(!this.sectionId){//如果没选中一级子菜单，则数据为空
						uni.showToast({
							title:'请选择部位',
							icon:'none'
						})
						this.menuData=''
						return
					}
					this.getTitle(this.sectionId)
				}
			},
			// 获取子菜单内容
			getTitle(id){
				getSurgicalMenu({
					parentId:id
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						this.menuData=res.data.object
					}else{
						uni.showModal({
							title:'未登录',
							content:'用户未登录',
							confirmText:'前去登录',
							success(e){
								console.log(e)
								if(e.confirm){//点击确定
									uni.navigateTo({
										url:'/pages/login/tellogin?pages='+'/pages/Tabbar/surgicalData'+'&pagetype='+1,
										animationType:'pop-in'
									})
								}	
							},
						})
					}
				})
			},
			// 选中的菜单内容
			selectedContent(data){
				console.log(data)
				this.boolean=data.id
				// 将选中的值赋值给菜单
				this.menu[this.index].title=data.name
				// 在这块要赋值id
				this.id=data.id//将每一级的id赋值给id，选择哪个给哪个
				if(this.index==0){
					this.officeId=data.id
					this.menu[1].title='部位'
					this.menu[2].title='子部位'
					this.sectionId=''
					this.sonsectionId=''
					this.methodsId=''
				}
				if(this.index==1){
					this.sectionId=data.id
					this.menu[2].title='子部位'
					this.sonsectionId=''
					this.methodsId=''
				}
				if(this.index==2){
					this.sonsectionId=data.id
					this.methodsId=''
				}
				if(this.index==3){
					this.methodsId=data.id
				}
				console.log(this.index)
			},
			closeDropdown() {//dropdown，自定义关闭按钮
				// 关闭子菜单
				this.$refs.uDropdown.close();
				// console.log(this.index)
				// 确定之后,进行搜索
				// console.log(this.id)
				this.page=1
				// 根据手术方法库id获取经典案例
				this.getCase('',this.id,0)
			},
			close(index) {//dropdown 下拉菜单被关闭时触发,点击蒙泰窗也会触发，不做搜索
				// 关闭的时候，给当前项加上高亮
				// 也可以通过监听dropdown-item的@change事件进行处理
				this.$refs.uDropdown.highlight(index);
			},
			scroll(e){
				this.old.scrollTop = e.detail.scrollTop
			},
			// 下拉刷新
			handlerefresh(){
				this.page=1//page重置为1
				this.getCase('','',0) //重新刷新数据
				setTimeout(() => {
					this.triggered = false; 
				}, 1000)
			},
			onRestore() {
				this.triggered = 'restore'; // 需要重置
			},
			scrolltolower(e){
				this.loadtextAll='加载中...'
				this.loadmore()//获取更多数据
			},
			// 上拉加载
			loadmore(){
				console.log(this.page,this.total)
				if(this.page>this.total){//加载的页数大于等于总页数时，停止加载数据
					return 	this.loadtextAll='没有更多数据';
				}
				this.mark=1
				this.getCase('',this.id)//id用于区分选中的子菜单对应的数据
			},
			getCase(value,id,mark){//搜索内容，分类id,重置数据
				getclassifycase({
					start:this.page,
					length:6,
					surgicalPlanTypeId:id,
					value:value//股份
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						this.total=res.data.object.pages//总页数
						this.page++//页数增加一页
						if(res.data.object.list.length==0){
							this.loadtextAll='没有更多数据';
						}
						if(mark==0){
							this.caseList=res.data.object.list
						}else{
							this.caseList=[...this.caseList,...res.data.object.list]
						}
						console.log(this.caseList)
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
			// 返回顶部
			goTop(e){
				 this.scrollTop = this.old.scrollTop
				 this.$nextTick(function() {
					this.scrollTop = 0
				 });
			},
		},
		computed:{
			// #ifdef MP-WEIXIN
			paddingRight(){
				return this.menuButtonInfo.width*2
			},
			// #endif
		},
		onLoad() {
			this.getCase('','')
			// #ifdef MP-WEIXIN
			this.menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			// console.log(this.menuButtonInfo)
			// #endif
		}
	}
</script>

<style scoped lang="scss">
	page{
		/* #ifdef H5 */
		height: 100%;
		/* #endif */
	}
	.classifycase{
		background-color: #F0F0F0;
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
	.navbar{
		display: flex;
		align-items: center;
	}
	.serachbox{
		width: 100%;display: flex;align-items: center;
		.search {
			width: 100%;
			padding: 0;
		}
	}
	.search ::v-deep .uni-searchbar__box{
		justify-content: flex-start!important;
		height: 60rpx!important;
	}
	.search ::v-deep .uni-searchbar__cancel{
		line-height: 60rpx!important;
	}
	/* #ifdef MP-WEIXIN */
	.search ::v-deep .uni-searchbar{
		padding: 0!important;
	}
	/* #endif */
	.header_top{
		background-color: #FFFFFF;
		width: 100%;
		border-bottom: 1px solid #F8F8F8;
		// margin-bottom: 20rpx;
		.slot-content{
			background-color: #F8F8F8;
			.subContent {
				text-align: center;
				font-size: 28rpx;
				color: #000000;
				padding: 20rpx 0;
			}
			.selectedClass{
				background-color: #E8E8E8;
				font-weight: bold;
				font-family: PingFang-SC-Bold;
			}
			.btn{
				padding: 20rpx 30rpx;
				background-color: #FFFFFF;
				.surebtn{
					background-color: #86B0D4;
					width: 100%;
				}
			}
		}	
	}
	.scrollContent{
		flex: 1;
		overflow: auto;
		/* #ifndef MP-ALIPAY */
		flex-direction: column;
		/* #endif */
		width: 750rpx;
		.bottomTip{
			color: #86B0D4;
			text-align: center;
			margin: 10rpx 0;
			font-size: 28rpx;
		}
	}
	/* #ifndef APP-NVUE */
	.scrollContent ::v-deep .uni-scroll-view-content{
		padding-top: 20rpx;
	}
	/* #endif */
	.backTop{
		opacity: .8;border-radius: 50%;width:80rpx ;height: 80rpx;display: flex;align-items: center;justify-content: center;
		position: fixed;right: 8%;bottom: 15%;padding: 0 10px;background-color: #86B0D4;
	}
</style>