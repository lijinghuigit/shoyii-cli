<template>
	<view class="surgical" :data-theme='themeType'>
		<uni-nav-bar @clickLeft='back' @clickRight='notice' left-icon="arrowleft" 
		class="navbar"
		right-icon='notification' title="我的方法库" fixed statusBar :dark="themeType=='dark'?true:false"
		:border="themeType=='dark'?false:true"/>
		<scroll-view scroll-y="true" class="content" @scrolltolower='scrolltolower'>
			<MysurgicalList v-for='(item,index3) in MysurgicalList' :key='index3' :Mysurgicalid="item.surgicalPlanId" :docName='item.doctorName' :time='item.createTime' :imgUrl='item.previewList[0].fileDownloadUrl' :content='item.title' :content_title="item.surgicalPlanName" :doctor="item.doctor"></MysurgicalList>
			<view class="bottomTip">
				<load-more :loadtext='loadtextAll'></load-more>
			</view>
			<u-back-top :scroll-top="scrollTop" top="1000"></u-back-top>
			<u-empty class="empty" text="暂无更多数据" src='/static/svg/case_surgical.svg' icon-size='200'
			v-if="show"></u-empty>
		</scroll-view>
		<u-no-network></u-no-network>
	</view>
</template>

<script>
	import {getMySurgical} from '@/utill/api/surgical/getSurgical.js' 
	import MysurgicalList from './components/MysurgicalList.vue'
	export default{
			components:{
				MysurgicalList
			},
			data(){
				return{
					loadtextAll:'',//全部手术方法的底部提示
					MysurgicalList:[],
					scrollTop: 0,
					page:1,
					size:6,
					total:1,//总页数默认为1，后端没有数据返回的是0
					mark:0,//用于进行加载更多的操作,用于进行数据的contact,是0则只加载第一页数据，为1，则进行数据的叠加
					id:'',
					show:false,
				}
			},
			methods:{
				back(){
					uni.navigateBack({
						delta:1
					})
				},
				notice(){
					uni.navigateTo({
						url:'/pages/notice/notice'
					})
				},
				// 返回顶部
				onPageScroll(e) {
					this.scrollTop = e.scrollTop;
				},
				// 获取我的手术方法库
				MySurgical(mark,id){
					console.log(id)
					var timer = setTimeout(function() {
						uni.showLoading({
						  title: '数据加载中...',
						})
					}, 2000)
					var _this=this
					getMySurgical({
						start:this.page,
						length:this.size,
						surgicalPlanTypeId:id
					}).then(res=>{
						clearTimeout(timer)
						uni.hideLoading()
						console.log(res)
						if(res.data.code==0){
							this.total=res.data.object.pages//总页数
							console.log(res.data.object.pages)
							this.page++//页数增加一页
							var data=res.data.object.list
							res.data.object.list.filter(item=>{
								if(!item.doctor){
									item.doctor.avatarLinks=uni.getStorageSync('uploadLogo')
								}
								if(!item.previewList[0]){
									item.previewList.push({
										fileDownloadUrl:uni.getStorageSync('uploadLogo')
									})
								}
							})
							console.log(res.data.object.list)
							if(res.data.object.list.length==0){
								if(mark=='0'){
									_this.show=true
								}else{
									this.loadtextAll='没有更多数据';
								}	
							}
							if(mark=='1'){//加载更多的操作
								this.MysurgicalList=this.MysurgicalList.concat(res.data.object.list) 
							}else{//初始化操作
								this.MysurgicalList=res.data.object.list
							}
							console.log(this.MysurgicalList)
						}else{
						uni.hideLoading()//关闭加载提示
						uni.showModal({
							title:'未登录',
							content:'用户未登录',
							confirmText:'前去登录',
							success(e){
								console.log(e)
								if(e.confirm){//点击确定
									uni.navigateTo({
										url:'/pages/login/tellogin?pages='+'/pages/surgicalData/Mysurgical'+'&pagetype='+2,
										animationType:'pop-in'
									})
								}	
							},
							fail(e) {
								console.log(e)
							}	
						})
					}
					}).catch(err=>{
						clearTimeout(timer)
						uni.hideLoading()
						console.log(err)
					})
				},
				scrolltolower(){
					console.log('触底啦')
					this.loadtextAll='加载中...'
					this.loadmore()//获取更多数据
				},
				// 上拉加载
				loadmore(){
					if(this.page>this.total){//加载的页数大于等于总页数时，停止加载数据
						return 	this.loadtextAll='没有更多数据';
					}
					this.mark=1
					this.MySurgical(this.mark,this.id)//id用于区分选中的子菜单对应的数据
				},
			},
			onLoad(options) {
				console.log(options)
				// 调用我的手术方法库
				this.MySurgical(0,'')
			}
	}
</script>

<style scoped>
	/* #ifndef APP-NVUE */
	.navbar ::v-deep .uni-nav-bar-text{
		font-size: 30rpx;
		font-weight: bold;
	}
	/* #endif */
	.empty{
		position:fixed;
		 top:0;
		 right:0;
		 bottom:0;
		 left:0;
		 margin:auto;
	}
	.surgical{
		background-color: #F0F0F0;
		width: 100%;
		/* #ifdef H5 */
		min-height: 100%; 
		/* #endif */
		/* #ifndef H5 */
		min-height: 100vh;
		/* #endif */
	}
	.content{
		padding-top: 20rpx;
		/*  #ifdef  H5 */
		   height: calc(100vh - 90rpx - 20rpx);
		/*  #endif  */
		/*  #ifdef  APP-PLUS */
		   height: calc(100vh - 90rpx - 88rpx - 20rpx);
		/*  #endif  */
		overflow-y: auto;
		 /* height: calc(100vh - 90rpx - 184rpx - 88rpx); */
	}
	.bottomTip{
		color: #86B0D4;
		text-align: center;
		margin: 10rpx 0;
		font-size: 28rpx;
	}
</style>
