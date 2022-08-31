<template>
	<view :data-theme='themeType'>
		<!-- 顶部导航 -->
		<index-bar :isDot='isDot' @isDotemit='isDotemit'></index-bar>
		<!-- #ifdef MP-WEIXIN -->
		<!-- 公众号的关注，只适用于扫小程序码时展示 -->
		<official-account></official-account> 
		<!-- #endif -->  
		<!-- 功能测试  -->
		<!-- <index-test></index-test> -->
		<!-- <button @click="add">{{myCount}}</button> -->
		<!-- <navigator url="/pages/aboutUs/aboutUs">aboutus事实上</navigator> -->
		<!-- <navigator url="/pages/PersonalInfor/auditInfor">aboutus事实上</navigator> -->
		<!-- banner --> 
		<view class="banner">  
			<u-swiper :list="bannerList" name="image" height='390' img-mode='aspectFit' :bg-color="themeType=='dark'?'#3A3A3A':'#f3f4f6'"></u-swiper>
		</view>
		<view class="Index">
			<!-- menu -->
			<view class="mulityMenu sy_main">
				<view :animation="animationData" class="indexMenu sy_block">
					<index-menu/> 
				</view>   
			</view>  
			<!-- 病历管理 -->
			<module-title :title="$t('index.caseManage')" index='0' style="padding-top: 0;" />
			<index-caselist :caselist="caselist" :hasLogin='hasLogin' 
			@menuClick='menuClick' @login='login' :casecurrent='casecurrent' />
			<!-- 设备管理 -->
			<module-title :title="$t('index.deviceManage')" index='4' style="padding-top: 50rpx;" />
			<index-device :deviceData='deviceData' :hasLogin='hasLogin' @login='login' />
			<!-- 手术方法库 --> 
			<!-- #ifdef MP-WEIXIN -->
			<module-title :title="$t('index.Surgical')" index='1' />
			<index-surgical :surgicalListAll='surgicalListAll' :hasLogin='hasLogin'
				:surgicalitems='surgicalitems'
				:isScroll='isScroll'
				:current="current"
				:typeicon='typeicon'
				@onClickItem='onClickItem'
				@login='login' 
				@StrenchMore='StrenchMore'/>
			<!-- #endif -->
			<!-- 树蚁新闻 -->
			<index-news :newsItems='newsData[NewstabIndex].data' :NewstabIndex='NewstabIndex' @newsMore='newsMenu' />
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<!-- 广告组件 -->
		<!-- <view class="ad-view">
			<uni-ad adpid="1091310966" class="uni-ad" ref="uniAd"></uni-ad>
		</view> -->
		 <!-- #endif -->
		<!-- #ifdef APP-PLUS -->
		<view class="ad-view">
			<ad adpid="1571325386"></ad>
		</view>
		<!-- #endif -->
		 <!-- 网络错误 -->
		<u-no-network image='/static/svg/network.svg'></u-no-network>
	</view>
</template>
<script>
	import {querydevice} from '@/utill/api/DeviceGroup/querydevice.js'
	import IndexMenu from '@/components/Index/IndexMenu.vue'
	import ModuleTitle from '@/components/Index/ModuleTitle.vue'
	import IndexCaselist from '@/components/Index/IndexCaselist.vue'
	import IndexBar from '@/components/Index/IndexBar.vue'
	import IndexDevice from '@/components/Index/IndexDevice.vue'
	import IndexSurgical from '@/components/Index/IndexSurgical.vue'
	import IndexNews from '@/components/Index/IndexNews.vue'
	// import IndexTest from '@/components/Index/IndexTest.vue'
	// import {useGetters} from '@/hooks/useGetters.js'
	// import {useActions} from '@/hooks/useActions.js'
	import {reactive,toRefs,watch,computed,getCurrentInstance} from 'vue'
	import {useStore} from 'vuex'
	import {onLoad,onShow,onPullDownRefresh,onUnload,onReachBottom,onShareAppMessage,onTabItemTap } from '@dcloudio/uni-app'
	import useBanner from '@/hooks/useBanner'
	import useNews from '@/hooks/useNews.js'
	import useCase from '@/hooks/useCase.js'
	import useSurgical from '@/hooks/useSurgical.js'
	import univerifyLogin from '@/utill/tools/univerifyLogin.js'
	// pinia的测试
	// import piniaStore from '@/hooks/pinia.js'
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
		setup(props,context){
			// 封装pinia的hooks
			// const {count,myCount,addcount} =piniaStore()
			// const add=()=>{
			// 	addcount()
			// }
			// banner的hooks
			const {getBannerList,bannerList}=useBanner()//轮播图
			// 病例的hooks
			const {caselist,casecurrent,getCaseData,menuClick}=useCase()
			// news的hooks
			const {newsData,NewstabIndex,newsMenu}=useNews()
			// 手术方法库的hooks
			const {surgicalitems,current,isScroll,surgicalListAll,typeicon,SurgicalMenu,onClickItem,StrenchMore} = useSurgical()
			const { proxy } = getCurrentInstance()
			const store=useStore()
			// const storeGetters = useGetters('user',['info'])
			let state=reactive({
				// 刷新动画
				animationData: {},  
				// 设备数据 
				deviceData:[],
				isDot:false,
				tabClick:false,//双击底部bar
				// 可以使用封装的hook
				// info:useGetters('user',['info']),//user/info
				userId:computed(()=>{
					return store.getters['user/info'].doctorId
				}),
				DataStatus:computed(()=>{
					return store.getters['DataStatus']
				}),
				hasLogin:computed(()=>{
					return store.getters['user/hasLogin'] //用于判断是否需要显示登陆btn
				}),
				socketData:computed(()=>{
					// console.log(store)
					return store.state.socket.socketData 
				}),
			}) 
			// 展示小程序广告
			const showAd=()=>{
				//this.$refs.uniAd.show(); // uni框架bug, 暂时使用下面的方式
				// this._ad = this.selectComponent('.uni-ad');
				// this._ad.show();
			}
			// 底部bar红点
			const isDotemit=e=>{
				state.isDot=e
			}
			const login=()=>{//登录btn
				// #ifdef APP-PLUS
				univerifyLogin(false,true)
				// #endif
				// #ifndef APP-PLUS
				uni.navigateTo({
					url:'/pages/login/tellogin?pages='+'/pages/Tabbar/index'+'&pagetype='+1,
					animationType:'pop-in'
				})
				// #endif
			}
			// 设备管理
			const getdevice=()=>{
				querydevice({}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						state.deviceData=res.data.object
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
					}
				})
			}
			// 刷新页面的动画
			const reflesh=()=>{
				var animation = uni.createAnimation({
					duration: 1000,
					timingFunction: 'linear',
				})
				state.animation = animation
				animation.opacity(0).translateY(-100).step({ duration: 1000 })
				state.animationData = animation.export()
				animationTimer=setTimeout(function() {
				  animation.opacity(1).translateY(0).step()
				  state.animationData = animation.export()
				}.bind(proxy), 1000)
			}
			onLoad(()=>{
				console.log('onload',store.state.socket.is_open_socket,state.userId)
				// console.log(count.value)
				// console.log(counter.increment)
				// console.log(storeGetters.info.value)
				// console.log(state.hasLogin,state.userId)
				// #ifndef MP-WEIXIN
				// 首页连接socket
				// 当用户第一次启动app时，first_flag为false，进入引导页；从引导页出来到首页，重新触发onLoad事件；
				if(!state.hasLogin&&uni.getStorageSync('first_flag')){//先登录，才能创建;且引导页为true
					uni.navigateTo({//启动app，未登录先需要登录,且不做引导页的判断，可能跟引导页发生冲突
						url:'/pages/login/tellogin'
					})
					return;
				}
				// #endif
				// 小程序退出后，再进入会有缓存，不会触发onload事件；
					// 应用每次重加载时都会进行判断重连；如果从后台切回来，不会触发onload，在应用的onshow中进行重连；
					if(!store.state.socket.socketTask){
						if(!store.state.socket.is_open_socket&&state.userId){ //socket已关且userId存在
							store.state.socket.timerheart&&clearInterval(store.state.socket.timerheart)
							store.dispatch('socket/WEBSOCKET_INIT',state.userId)
						}
					}
				// #ifdef MP-WEIXIN 
				// if(state.hasLogin){
				//   showAd() //微信banner广告
				// }  
				// #endif
			})  
			onShow(()=>{
				console.log(store.state.socket.is_open_socket,state.userId)
				if(state.hasLogin){//登录才获取数据
					if(caselist.value.length==0||state.DataStatus){ //默认是未发布的病例为0时，再加载数据
						getCaseData('ZZ','')//默认是我的（主治）病例数据
					}
					if(state.deviceData.length==0||state.DataStatus){
						getdevice()
					}		
				}
				// 这个是不需要登录就展示的	
				if(bannerList.value.length==0){
					getBannerList()
				}
			})
			// 刷新加载数据
			onPullDownRefresh(()=>{
				console.log('refresh');
				reflesh()//动画效果
				getCaseData('ZZ','')
				// #ifdef MP-WEIXIN
				// 微信端的方法库
				// showAd()
				SurgicalMenu()
				// #endif
				getdevice()
				getBannerList()
				stopTimer=setTimeout(function () {
					uni.stopPullDownRefresh();//停止刷新，这边可以进行数据的更新
				}, 1000);
			})
			// 双击tabbar
			onTabItemTap((e)=>{// tab 点击时执行，此处直接接收单击事件 
				// console.log(e)
				if (state.tabClick) { 
					// 200ms 内再次点击 数据处理
					reflesh()
				} 
				state.tabClick = true 
				dbclickTimer=setTimeout(() => { 
					state.tabClick = false // 200ms 内没有第二次点击，就当作单击 
				}, 200) 
			})
			onUnload(()=>{
				clearTimeout(dbclickTimer)
				clearTimeout(animationTimer)
				clearTimeout(stopTimer)
			})
			onReachBottom(()=>{
				// 小程序端获取方法库
				// 微信端
				// #ifdef MP-WEIXIN
				if(state.hasLogin&&(surgicalListAll.value.length==0||state.DataStatus)){//当手术方法的数据为0时，每次再加载数据，如果有数据，就不加载
					SurgicalMenu()
				}
				// #endif
				// 获取新闻
				if(newsData.value[0].data.length==0){
					newsMenu(0)//默认是案例
				}
			})
			// 分享朋友
			// #ifdef MP-WEIXIN
			onShareAppMessage((res)=>{
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
			})
			// #endif
			// 监听socketData是否有聊天数据，从而tabbar展示红点
			watch(() => state.socketData,
				(newValue,oldValue)=>{
					console.log(newValue)
					// socket监听
					if(newValue=='head'||newValue==''){//心跳回复或为空，不做处理
						return
					}else if(newValue!='head'){
						state.isDot=true
						uni.showTabBarRedDot({ //红点
						   index:0,
						   complete(e) {
								console.log(e)
						   }
						})
					}
				},
			)
			return {
				...toRefs(state),
				// 轮播图
				bannerList,
				// 病例
				caselist,casecurrent,menuClick,
				// 方法库
				//#ifdef MP-WEIXIN
				surgicalitems,current,isScroll,surgicalListAll,typeicon,StrenchMore,onClickItem,
				//#endif
				// 新闻
				newsMenu,newsData,NewstabIndex,
				isDotemit,
				login, 
				// count,add,myCount
				// ...storeGetters
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
