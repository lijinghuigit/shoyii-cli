<template>
	<view :data-theme="appTheme">
		<!-- 顶部导航 -->
		<index-bar :isDot='isDot' @isDotemit='isDotemit'></index-bar>
		<!-- #ifdef MP-WEIXIN -->
		<!-- 公众号的关注，只适用于扫小程序码时展示 -->
		<official-account></official-account>
		<!-- #endif -->
		<!-- 功能测试 -->
		<!-- <index-test></index-test> -->
		<!-- <button type="default" @click="changeTheme({appbg:'AppBlack'})">更改颜色</button> -->
		<!-- banner -->
		<view class="banner">
			<u-swiper :list="bannerList" name="image" height='390' img-mode='aspectFit' bg-color='#f3f4f6'></u-swiper>
		</view>
		<view class="Index">
			<!-- menu -->
			<view class="mulityMenu">
				<view :animation="animationData" class="indexMenu">
					<index-menu></index-menu>
				</view>
			</view>
			<!-- 病历管理 -->
			<module-title :title="$t('index.caseManage')" index='0' style="padding-top: 0;"></module-title>
			<index-caselist :caselist="caselist" :hasLogin='hasLogin' @menuClick='menuClick' @login='login' :casecurrent='casecurrent'></index-caselist>
			<!-- 设备管理 -->
			<module-title :title="$t('index.deviceManage')" index='4' style="padding-top: 50rpx;"></module-title>
			<index-device :deviceData='deviceData' :hasLogin='hasLogin' @login='login'></index-device>
			<!-- 手术方法库 -->
			<!-- #ifdef MP-WEIXIN -->
			<module-title :title="$t('index.Surgical')" index='1'></module-title>
			<index-surgical :surgicalListAll='surgicalListAll' :hasLogin='hasLogin'
				:surgicalitems='surgicalitems'
				:isScroll='isScroll'
				:current="current"
				:typeicon='typeicon'
				@onClickItem='onClickItem'
				 @login='login'
				 @StrenchMore='StrenchMore'>
			</index-surgical>
			<!-- #endif -->
			<!-- 树蚁新闻 -->
			<index-news :newsItems='newsData[NewstabIndex].data' :NewstabIndex='NewstabIndex' @newsMore='newsMore'></index-news>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<!-- 广告组件 -->
		<!-- <view class="ad-view">
			 <uni-ad adpid="1091310966" class="uni-ad" ref="uniAd"></uni-ad>
		</view> -->
		 <!-- #endif -->
		 <!-- 网络错误 -->
		<u-no-network></u-no-network>
	</view>
</template>
<script>
	import {getBanner} from '@/utill/api/Index/banner.js'
	import {getSurgical,getSurgicalparam,getSurgicalMenu} from '@/utill/api/surgical/getSurgical.js' 
	import {getCaselist} from '@/utill/api/case/getCaselist.js' 
	import {querydevice} from '@/utill/api/DeviceGroup/querydevice.js'
	import {getNewsList} from '@/utill/api/news/news.js'
	import IndexMenu from '@/components/Index/IndexMenu.vue'
	import ModuleTitle from '@/components/Index/ModuleTitle.vue'
	import IndexCaselist from '@/components/Index/IndexCaselist.vue'
	import IndexBar from '@/components/Index/IndexBar.vue'
	import IndexDevice from '@/components/Index/IndexDevice.vue'
	import IndexSurgical from '@/components/Index/IndexSurgical.vue'
	import IndexNews from '@/components/Index/IndexNews.vue'
	// import IndexTest from '@/components/Index/IndexTest.vue'
	import {mapGetters,mapMutations,mapState} from 'vuex' 
	let dbclickTimer=null,
	animationTimer=null,
	stopTimer=null;
	export default {
		components:{
			IndexMenu,
			ModuleTitle,
			IndexCaselist,
			IndexBar,
			IndexDevice,
			IndexSurgical,
			IndexNews,
			// IndexTest
		},
		data() {
			return {
				// banner
				bannerList:[],//轮播图
				// 刷新动画
				animationData: {},
				// 手术方法库menu
				surgicalListAll:[],//全部的手术方法数据
				surgicalitems:[],
				current: 0,//默认为第一个
				isScroll:false,// 是否可以滚动，默认不滚动。>3 可滚动
				size:2,//手术方法的每页数据
				total:'',//手术方法的总数
				typeicon:'arrowdown',
				// 病例相关数据
				casecurrent:0,
				caselist:[],//全部病例数据
				// 设备数据
				deviceData:[],
				isDot:false,
				tabClick:false,//双击底部bar
				// 新闻模块
				NewstabIndex:0,
				newsData:[
					{data:[],page:1,Totalpage:null},//案例
					{data:[],page:1,Totalpage:null}//指南
				],
			}
		},
		watch:{
			size(newValue,oldValue){
				if(newValue==4){
					this.typeicon='arrowup'
				}else{
					this.typeicon='arrowdown'
				}
			},
			'socketData': function(val) {
				console.log(val)
				if(val=='head'){//心跳回复
					return
				}
				this.isDot=true
				uni.showTabBarRedDot({ //红点
				   index:0,
				   complete(e) {
						console.log(e)
				   }
				})
			},
		},
		computed:{
			...mapGetters({
				appTheme:'theme/appTheme',
				DataStatus:'DataStatus',
				// userInfo: 'user/info',
				hasLogin: 'user/hasLogin',//用于判断是否需要显示登陆btn
			}),
			// ...mapGetters (['appTheme','DataStatus']),
			...mapState({
				socketData:state => state.socket.socketData,
				user:state => state.user
			}),
			userId(){
				return this.$store.getters['user/info'].doctorId
			}
		},
		methods: {
			showAd() {
				//this.$refs.uniAd.show(); // uni框架bug, 暂时使用下面的方式
				// this._ad = this.selectComponent('.uni-ad');
				// this._ad.show();
		    },
			// 新闻导航
			newsMore(index){
				if(index==0){//案例
					this.NewstabIndex=0
					this.newsData[0].page=1
					this.getNews('4',1)
				}else if(index==1){//说明
					this.NewstabIndex=1
					this.newsData[1].page=1
					this.getNews('1',1)
				}else if(index==2){//进入列表
					uni.navigateTo({
						url:'/pages/news/news?id='+''
					})
					return;
				}else if(index==3){//展开更多
					if(this.NewstabIndex==0){
						if(this.newsData[0].page<=this.newsData[0].Totalpage){
							this.getNews('4',this.newsData[0].page,'mark')
						}else{
							uni.showToast({
								title:'无更多数据',
								icon:'none'
							})
						}
					}else if(this.NewstabIndex==1){
						if(this.newsData[1].page<=this.newsData[1].Totalpage){
							this.getNews('1',this.newsData[1].page,'mark')
						}else{
							uni.showToast({
								title:'无更多数据',
								icon:'none'
							})
						}
					}
				}
			},
			// 获取新闻数据
			getNews(newsId,page,mark){
				getNewsList({
					page:page,
					size:4,
					categoryId:newsId
				}).then(res=>{
					if(res.data.code==0){
						if(newsId=='4'){//案例
							this.newsData[0].page++ //页数添加
							if(mark){
								this.newsData[0].data=this.newsData[0].data.concat(res.data.object.list)
							}else{
								this.newsData[0].data=res.data.object.list
							}
							// this.newsData[0].data=[...this.newsData[0].data,...res.data.object.list]
							this.newsData[0].Totalpage=res.data.object.pages //总页数
							// console.log(this.newsData[0].data)
						}else if(newsId=='1'){//说明
							this.newsData[1].page++//页数添加
							if(mark){
								this.newsData[1].data=this.newsData[1].data.concat(res.data.object.list)
							}else{
								this.newsData[1].data=res.data.object.list
							}
							// this.newsData[1].data=[...this.newsData[1].data,...res.data.object.list]
							this.newsData[1].Totalpage=res.data.object.pages// 总页数
						}
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
					}
				}).catch(err=>{
					uni.hideLoading()
					console.log(err)
				})
			},
			// 底部bar红点
			isDotemit(e){
				this.isDot=e
			},
			...mapMutations(['theme/changeTheme']),
			// 获取轮播图
			getBannerList(){
				getBanner({}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						this.bannerList=res.data.object
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			// 病例menu
			menuClick(e){
				if (this.casecurrent !== e) {
					this.casecurrent = e;
				}
				console.log(this.casecurrent)//默认是0 
				if(this.casecurrent==0){//我的病例
					this.getCaseData('ZZ',"")
				}else if(this.casecurrent==1){//待确定
					this.getCaseData('ALL','701')//先默认是已发布
				}else if(this.casecurrent==2){//未付款
					this.getCaseData('ALL','901')	
				}
			},
			login(){//登录btn
				uni.navigateTo({
					url:'/pages/login/tellogin?pages='+'/pages/Tabbar/index'+'&pagetype='+1,
					animationType:'pop-in'
				})
			},
			// 设备管理
			getdevice(){
				querydevice({}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						this.deviceData=res.data.object
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
					}
				})
			},
			// 获取方法库部位
			getSurgicalMenu(){
				getSurgicalMenu({
					parentId:1,//默认是1，
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						this.surgicalitems=res.data.object
						if(res.data.object.length>3){
							this.isScroll=true //可滚动
						}
						this.getSurcialData(res.data.object[0].id)
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			// 方法库底部更多
			StrenchMore(){
				if(this.typeicon=='arrowdown'){//展开
					if(this.size<this.total&&this.size<4){
						this.size+=2
						this.getSurcialData(this.surgicalitems[this.current].id)
					}
				}else{//收回
					this.size=2
					this.getSurcialData(this.surgicalitems[this.current].id)
				}
			},
			// 手术方法库menu
			onClickItem(value){//e,data
				const {e,data}=value
				this.size=2
				this.typeicon='arrowdown'
				// 样式调整
				if (this.current !== e) {
					this.current = e;
				}
				this.getSurcialData(data[e].id)
			},
			// 获取手术方法数据
			getSurcialData(id){
				console.log(id)
				// #ifdef APP-PLUS||H5
				var _this=this
				getSurgical({
					start:1,
					length:this.size,
					surgicalPlanTypeId:id
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						this.total=res.data.object.pages
						res.data.object.list.filter(item=>{
							if(!item.doctor){
								// item.doctor.avatarLinks=uni.getStorageSync('uploadLogo')
							}
							if(!item.previewList[0]){
								item.previewList.push({
									fileDownloadUrl:uni.getStorageSync('uploadLogo')
								})
							}
						})
						this.surgicalListAll=res.data.object.list
					}else{
						uni.hideLoading()//关闭加载提示
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
					}
				})
				// #endif
				// #ifdef MP-WEIXIN
				var _this=this
				getSurgicalparam({
					start:1,
					length:this.size,
					surgicalPlanTypeId:id
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						this.total=res.data.object.total
						res.data.object.list.filter(item=>{
							if(!item.doctor){
								// item.doctor.avatarLinks=uni.getStorageSync('uploadLogo')
							}
							if(!item.previewList[0]){
								item.previewList.push({
									fileDownloadUrl:uni.getStorageSync('uploadLogo')
								})
							}
						})
						this.surgicalListAll=res.data.object.list
						console.log(this.surgicalListAll)
					}else if(res.data.code==2){
						
					}else{
						uni.hideLoading()//关闭加载提示
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
					}
				})
				// #endif
			},
			// 获取病例数据
			getCaseData(identify,status){
				console.log(identify,status)
				getCaselist({
					status:'ALL',
					identity:identify,
					type:'ALL',
					page:1,
					size:6,
					otherStatus:status
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						res.data.object.list.filter(item=>{
							if(!item.previewImage){
								item.previewImage=uni.getStorageSync('uploadLogo')
							}
							if(!item.name||item.name==''){
								item.name='未填写'
							}
						})
						this.caselist=res.data.object.list
						console.log(this.caselist)
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
					}
				})
			},
			// 刷新页面的动画
			reflesh(){
				var animation = uni.createAnimation({
					duration: 1000,
					timingFunction: 'linear',
				})
				this.animation = animation
				animation.opacity(0).translateY(-100).step({ duration: 1000 })
				this.animationData = animation.export()
				animationTimer=setTimeout(function() {
				  animation.opacity(1).translateY(0).step()
				  this.animationData = animation.export()
				}.bind(this), 1000)
			 },
		},
		// 初始化加载数据
		onLoad(options) {
			// this.$store.commit('user/hasLogin',true) //更改全局状态
			// #ifndef MP-WEIXIN
			// 首页连接socket
			// 当用户第一次启动app时，first_flag为false，进入引导页；从引导页出来到首页，重新触发onLoad事件；
			if(!this.$store.getters['user/hasLogin']&&uni.getStorageSync('first_flag')){//先登录，才能创建;且引导页为true
				uni.navigateTo({//启动app，未登录先需要登录,且不做引导页的判断，可能跟引导页发生冲突
					url:'/pages/login/tellogin'
				})
				return;
			}else if(!this.$store.state.socket.is_open_socket&&this.userId){ //socket已关
				this.$store.dispatch('socket/WEBSOCKET_INIT',this.userId)
			}
			// #endif	
			// #ifdef MP-WEIXIN
			// if(this.$store.getters['user/hasLogin']){
			// 	this.showAd() //微信banner广告
			// }
			// #endif
		},
		onShow() {
			console.log(this.DataStatus)
			if(this.$store.getters['user/hasLogin']){//登录才获取数据
				if(this.caselist.length==0||this.DataStatus){ //默认是未发布的病例为0时，再加载数据
					this.getCaseData('ZZ','')//默认是我的（主治）病例数据
				}
				if(this.deviceData.length==0||this.DataStatus){
					this.getdevice()
				}		
			}
			// 这个是不需要登录就展示的	
			if(this.bannerList.length==0){
				this.getBannerList()
			}
			// #ifdef MP-WEIXIN
			// 小程序退出后，再进入会有缓存，不会触发onload事件
			if(!this.$store.state.socket.is_open_socket&&this.userId){ //socket已关且userId存在
				this.$store.dispatch('socket/WEBSOCKET_INIT',this.userId)
			}
			// #endif
		},
		// 刷新加载数据
		onPullDownRefresh (){
			console.log('refresh');
			this.reflesh()//动画效果
			this.getCaseData('ZZ','')
			// #ifdef MP-WEIXIN
			// this.showAd()
			this.getSurgicalMenu()
			// #endif
			this.getdevice()
			this.getBannerList()
			stopTimer=setTimeout(function () {
				uni.stopPullDownRefresh();//停止刷新，这边可以进行数据的更新
			}, 1000);
		},
		// 分享朋友
		// #ifdef MP-WEIXIN
		onShareAppMessage: function (res) {
		    if (res.from === 'button') {//定义了share 才是button
		      // 来自页面内转发按钮
			  // return {
				 //  title: '自定义btn分享',
				 //  path: '/pages/Tabbar/index'
			  // }
		    }else{//menu为原生胶囊转发
				return {
				  title: '树蚁医疗',
				  path: '/pages/Tabbar/index'
				}
			}
		},
		// #endif
		// 双击tabbar
		onTabItemTap(e) { // tab 点击时执行，此处直接接收单击事件 
			console.log(e) 
			if (this.tabClick) { 
				// 200ms 内再次点击 数据处理
				this.reflesh()
			} 
			this.tabClick = true 
			dbclickTimer=setTimeout(() => { 
				this.tabClick = false // 200ms 内没有第二次点击，就当作单击 
			}, 200) 
		},
		onUnload() {
			clearTimeout(dbclickTimer)
			clearTimeout(animationTimer)
			clearTimeout(stopTimer)
		},
		onReachBottom(){
			// 小程序端获取方法库
			// #ifdef MP-WEIXIN
			if(this.$store.getters['user/hasLogin']&&(this.surgicalListAll.length==0||this.DataStatus)){//当手术方法的数据为0时，每次再加载数据，如果有数据，就不加载
				this.getSurgicalMenu()
			}
			// #endif
			// 获取新闻
			if(this.newsData[0].data.length==0){
				this.getNews('4',1) //默认是案例
			}
		}
	}
</script>
<style scoped lang="scss">
	/* 首页 */
	.Index{
		padding: 0 30rpx 32rpx;
		/* banner */
		.banner{
			border: 1px solid #EEEEEE;
		}
		.mulityMenu{
			height: 304rpx;
			background-color: $uni-bg-color-grey;
			position: relative;
		}
		/* index-menu */
		.indexMenu{
			padding: 16rpx 24rpx;
			background-color: $uni-bg-color;
			border-radius: 29rpx;
			height: 304rpx;
			position: absolute;left: 0;right: 0;bottom: 52rpx;
		}	
	}
</style>
