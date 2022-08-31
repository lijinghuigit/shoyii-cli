<template>
	<view>
		<v-tabs class='tabMenu' v-model="current" :scroll="false" :tabs="tabs" fontSize='24rpx' bgColor="#ffffff" :fixed="fixedBool" color="#000000" :pills='pills' lineColor="" activeColor="#86B0D4" @change="changeTab">	
		</v-tabs>
		<view class="date">
			<view>
				<uni-icons type="paperplane"></uni-icons>
				<view class="start" @click="start">
					<text>{{startDate}}</text>
				</view>
				<text>至</text>
				<view class="start" @click="start">
					<text>{{endDate}}</text>
				</view>
			</view>
		</view>
		<view class="container-tabs__list" style="height: 100%;">
			<swiper class="swiperBox" :current="swiperCurrent" @change="change" :style="{height:scrollHeight+'px'}">
				<swiper-item class="swiper-item" v-for="(sItem, sIndex) in list" :key="sIndex">
					<scroll-view class="scroll-Y" scroll-y="false" lower-threshold='10px' @scrolltolower='scrollbottom' style="height: 100%;">
						<view style="">
							<case-list v-for="(item,index) in sItem.caselist" :key='index' :casecode="item.caseHistoryNo" :Uname='item.name' :Caseid=item.caseHistoryId :content='item.title' :imgUrl='item.previewImage'></case-list>
						</view>
						<view class="bottomTip">
							<load-more :loadtext='loadtextAll'></load-more>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<u-calendar active-bg-color='#86B0D4' v-model="showstart" @change="changestart" :mode="mode"></u-calendar>
		<u-no-network></u-no-network>
	</view>
</template>

<script>
	import {getCaselist} from '@/utill/api/case/getCaselist.js'
	import {CaseList} from '@/components/CaseList/CaseList'
	export default {
		components:{
			CaseList
		},
		data() {
			return {
				loadtextAll:'',//病例的底部提示
				pills:false,
				fixedBool:true,
				current: 0,
				tabs: ['全部','我的病例','协助病例', '未发布', '已发布','已完成'],
				swiperCurrent: 0,//默认是全部
				list:[
					{caselist:[]},
					{caselist:[]},
					{caselist:[]},
					{caselist:[]},
					{caselist:[]},
					{caselist:[]},
				],
				page:1,
				size:6,
				total:1,//总页数默认为1，后端没有数据返回的是0
				mark:0,//用来表示是初始化加载数据，还是加载下一页数据
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				startDate:'开始日期',
				endDate:"结束日期",
				mode: 'range',
				showstart:false,
				scrollHeight:0,
			}
		},
		methods: {
			start(){
				this.showstart=true
			},
			changestart(e){
				console.log(e)
				// this.startDate=e.startDate.replace(/-/g,"/")
				// this.endDate=e.endDate.replace(/-/g,"/")
				this.startDate=e.startDate
				this.endDate=e.endDate
				// 搜索接口
				console.log(this.current)
				if(this.current==0){//全部病例
					this.getData(0,this.current,'ALL','ALL',this.startDate,this.endDate)
				}else if(this.current==1){//主治病例
					this.getData(0,this.current,'ALL','ZZ',this.startDate,this.endDate)
				}else if(this.current==2){//协助病例
					this.getData(0,this.current,'ALL','XZ',this.startDate,this.endDate)
				}else if(this.current==3){//未发布病例
					this.getData(0,this.current,'WFB','ALL',this.startDate,this.endDate)
				}else if(this.current==4){//已发布病例
					this.getData(0,this.current,'YFB','ALL',this.startDate,this.endDate)
				}else if(this.current==5){//已完成病例
					this.getData(0,this.current,'YWC','ALL',this.startDate,this.endDate)
				}
			},
			// 上拉加载
			loadmore(index){
				console.log(this.page)
				console.log(this.total)
				if(this.page>this.total){//加载的页数大于等于总页数时，停止加载数据
					return 	this.loadtextAll='没有更多数据';
				}
				this.mark=1
				console.log(index)
				if(index==0){//全部病例
					this.getData(1,index,'ALL','ALL','','')
				}else if(index==1){//主治病例
					this.getData(1,index,'ALL','ZZ','','')
				}else if(index==2){//协助病例
					this.getData(1,index,'ALL','XZ','','')
				}else if(index==3){//未发布病例
					this.getData(1,index,'WFB','ALL','','')
				}else if(index==4){//已发布病例
					this.getData(1,index,'YFB','ALL','','')
				}else if(index==5){//已完成病例
					this.getData(1,index,'YWC','ALL','','')
				}
			},
			//滑动获取数据
			change(e){
				  this.current = e.detail.current
				  console.log(this.current)
				  this.swiperCurrent = e.detail.current
				  // 填充数据
				  this.page=1
				  this.size=6
				  this.total=1
				  this.loadtextAll=''
				  if(this.current==0){//全部病例
				  	this.getData(0,this.current,'ALL','ALL','','')
				  }else if(this.current==1){//主治病例
					this.getData(0,this.current,'ALL','ZZ','','')
				  }else if(this.current==2){//协助病例
				  	this.getData(0,this.current,'ALL','XZ','','')
				  }else if(this.current==3){//未发布病例
				  	this.getData(0,this.current,'WFB','ALL','','')
				  }else if(this.current==4){//已发布病例
				  	this.getData(0,this.current,'YFB','ALL','','')
				  }else if(this.current==5){//已完成病例
				  	this.getData(0,this.current,'YWC','ALL','','')
				  }
			},
			// 获取病例数据
			getCaseData(mark,index,status,identity,startTime,endTime){
				console.log(mark)
				// uni.showLoading({
				// 	title:'加载中'
				// })
				getCaselist({
					status:status,
					identity:identity,
					type:'ALL',//现在默认全是all
					page:this.page,
					size:this.size,
					startTime:startTime,
					endTime:endTime,
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						console.log(res.data.object.list)
						// uni.hideLoading()
						console.log(res.data.object.pages)
						this.total=res.data.object.pages//总页数
						this.page++//页数增加一页
						if(res.data.object.list.length==0){
							this.loadtextAll='没有更多数据'
						}
						res.data.object.list.filter(item=>{
							if(!item.previewImage){
								item.previewImage=uni.getStorageSync('uploadLogo')
							}
							if(!item.name||item.name==''){
								item.name='未填写'
							}
							if(!item.title||item.title==''){
								item.title='未填写'
							}
						})
						console.log(mark)
						if(mark==1){//初始化加载数据
							this.list[index].caselist=this.list[index].caselist.concat(res.data.object.list) 
						}else {
							this.list[index].caselist=res.data.object.list
						}
						
					}else{
						// uni.hideLoading()
						uni.showModal({
							title:'未登录',
							content:'用户未登录',
							confirmText:'前去登录',
							success(e){
								console.log(e)
								if(e.confirm){//点击确定
									uni.navigateTo({
										url:'/pages/login/tellogin?pages='+'/pages/Tabbar/index'+'&pagetype='+1,
										animationType:'pop-in'
									})
								}	
							},	
						})
					}
				})
			},
			// 获取数据
			getData(mark,index,status,identity,startTime,endTime){
				if(!this.checkAudit()){
					console.log(index)
					// if(this.list[index].caselist.length<=0){//加上 这个，上拉加载则不会执行
						this.getCaseData(mark,index,status,identity,startTime,endTime)//0表示初始化加载数据
					// }
				}
			},
			// 点击获取数据
			changeTab(index) {//点击获取数据，每次index的变动，都会触发change事件
				this.loadtextAll=''//更换menu时，底部tip默认为'';
				this.swiperCurrent = index
			},
			// 滚动到底部事件
			scrollbottom(){
				this.loadtextAll='加载中...'
				this.loadmore(this.swiperCurrent)//获取更多数据
			},
		},
		onLoad() {
			
		},
		onShow() {
			if(this.checkLogin('/pages/caselist/caselist',1)){//token 存在
				if(this.list[0].caselist.length<=0||this.DataStatus){
					// 第一个参数:mark,two:menu的下标，three:status(病例状态)，
					// four:identify(医生的身份，分为主治与协助);five为起始时间，six为截止时间	
					this.page=1
					this.size=6
					// 获取病例数据
					this.getData(0,0,'ALL','ALL','','')//默认是全部病例
				}
			}
		},
		onReady() {
			let _this = this;
			uni.getSystemInfo({
				success(res) {
					console.log(res)
					console.log(res.screenHeight)
					let wHeight=res.windowHeight //windoHeight为窗口高度，主要使用的是这个
					let titleH=uni.createSelectorQuery().select(".swiperBox"); //想要获取高度的元素名（class/id）
					titleH.boundingClientRect(data=>{
						_this.scrollHeight=wHeight-data.top  //计算高度：元素高度=窗口高度-元素距离顶部的距离（data.top）
					}).exec()
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
	.date{
		padding: 0 30rpx;
		margin: 20rpx 0;
	}
	/* #ifdef MP-WEIXIN */
	.date view{
		height: 80rpx;
		line-height: 80rpx;
		background-color: #FFFFFF;
		color: #909090;
		font-size: 26rpx;
		display: flex;
		justify-content: space-around;
	}
	/* #endif */
	.date uni-view{
		height: 80rpx;
		line-height: 80rpx;
		background-color: #FFFFFF;
		color: #909090;
		font-size: 26rpx;
		display: flex;
		justify-content: space-around;
	}
	.date .start{
		width: 40%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.news_content{
		padding: 20rpx 20rpx;
	}
	.v-order-item {
		background-color: #fff;
		box-shadow: 0px 0px 10rpx rgba(0, 0, 0, 0.1);
		border-radius: 10rpx;
		padding: 30rpx;
		margin-bottom: 30rpx;
	}
	.bottomTip{
		color: #86B0D4;
		text-align: center;
		margin: 10rpx 0;
		font-size: 28rpx;
	}
</style>
