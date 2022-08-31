<template>
	<view class="box">
		<!-- #ifdef MP-WEIXIN -->
		<view class="" style="padding: 8rpx 30rpx;background-color: #FFFFFF;">
			<u-search @search='search' @custom='search' placeholder="手术方法相关信息" v-model="searchContent" shape="round" bg-color='#ffffff' border-color='#EEEEEE' height='64' :clearabled="true" :show-action="true" action-text="搜索" :animation="true"></u-search>
		</view>
		<!-- #endif -->
		 <view class="Searchrecord" v-if="surgicalListAll.length==0">
			 <view class="title">
			 	<text>历史搜索</text>
			 	<uni-icons type="trash" size="13" @click="deleteRecord"></uni-icons>
			 </view>
		 	<view class="record">
				<uni-tag v-for="(item,index) in recordData" :key='index' :text=item.name @click='searchRecord(item.id)'></uni-tag>
		 	</view>
		 </view>
		 <scroll-view scroll-y="true" class="scroll_content" v-else  @scrolltolower='scrolltolower'>
			<surgical-list v-for='(item,index3) in surgicalListAll' :key='index3' :Surgicalid="item.surgicalPlanId" :docName='item.doctorName' :time='item.createTime' :imgUrl='item.previewList[0].fileDownloadUrl' :content='item.title' :content_title="item.surgicalPlanName" :doctor='item.doctor'></surgical-list>
			<view class="bottomTip">
				<load-more :loadtext='loadtextAll'></load-more>
			</view>
		 </scroll-view>
	</view>
</template>
<script>
	import {getSurgical} from '@/utill/api/surgical/getSurgical.js'
	 import SurgicalList from '@/components/surgical/SurgicalList.vue'
	export default {
		components:{
			SurgicalList
		},
		data() {
			return {
				searchContent:'',
				recordData:[
					// {name:'特发性',id:1},
					// {name:'特发性脊柱',id:2},
					// {name:'特发性脊柱侧弯畸形矫正手术',id:3},
					// {name:'特发性脊',id:4}
				],
				surgicalListAll:[],//全部手术方法数据
				loadtextAll:'',//全部手术方法的底部提示
				page:1,
				size:6,
				total:1,//总页数默认为1，后端没有数据返回的是0
				mark:0,
			}
		},
		methods: {
			deleteRecord(){
				console.log('delete')
			},
			getdata(mark){
				console.log(this.searchContent)
				if(!this.searchContent){
					uni.showToast({
						title:'请输入搜索内容',
						icon:'none'
					})
					return
				}
				getSurgical({
					start:this.page,
					length:this.size,
					value:this.searchContent
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						this.total=res.data.object.pages//总页数
						this.page++//页数增加一页
						if(res.data.object.list.length==0){
							uni.showToast({
								title:'无数据',
								icon:'none'
							})
							this.surgicalListAll=[]
						}else{
							if(mark=='1'){//加载更多的操作
								this.surgicalListAll=this.surgicalListAll.concat(res.data.object.list) 
							}else{//初始化操作
								this.surgicalListAll=res.data.object.list
							}
						}
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
			scrolltolower(e){
				this.loadtextAll='加载中...'
				this.loadmore()//获取更多数据
			},
			loadmore(){
				if(this.page>this.total){//加载的页数大于等于总页数时，停止加载数据
					return 	this.loadtextAll='没有更多数据';
				}
				this.mark=1
				this.getdata(this.mark)//id用于区分选中的子菜单对应的数据
			},
			// #ifdef MP-WEIXIN
			search(){
				this.getdata(0)
			}
			// #endif
			
		},
		// #ifdef APP-PLUS||H5
		// 监听原生标题栏按钮点击事件，参数为Object
		onNavigationBarButtonTap(e){
			this.getdata(0)
			// 搜索按钮进行的搜索
		},
		// 监听原生标题栏搜索输入框点击事件
		onNavigationBarSearchInputClicked(e){
			console.log(e)
		},
		// 监听原生标题栏搜索输入框搜索事件，用户点击软键盘上的“搜索”按钮时触发。
		onNavigationBarSearchInputConfirmed(e){
			console.log(e.text)
			this.getdata(0)
		},
		// 监听原生标题栏搜索输入框输入内容变化事件	
		onNavigationBarSearchInputChanged(e){
			console.log(e)
			this.searchContent=e.text//动态监听内容，赋值进行搜索
		},
		// #endif
	}
</script>

<style>
.box{
	/* background-color: #F0F0F0; */
}
/* #ifndef APP-NVUE */
.box ::v-deep .uni-navbar__content{
	padding-bottom: 20rpx;
	padding-top: 20rpx;
	border-bottom: none;
	background-color: #FFFFFF;
}
.box ::v-deep .uni-navbar__header-btns-left{
	width: 50rpx;
}
/* #endif */
.searchBar{
	width: 100%;
	display: flex;
	align-items: center;
}
.searchBar .uni-searchbar{
	padding: 0;
}
.searchRight{
	color: #909090;
	font-size: 30rpx;
}
.Searchrecord{
	padding: 0 30rpx;
	padding-top: 30rpx;
	
}
.title{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-bottom: 30rpx;
	color: #343434;
	font-size: 30rpx;
	font-weight: bold;
	font-family: PingFang-SC-Bold;
	
}
.title .uni-icons{
	font-weight: 100;
}
.record{
	display: flex;
	flex-wrap: wrap;
}
/* #ifndef APP-NVUE */
.record ::v-deep .uni-tag-text{
	color: #666666;
}
/* #endif */
.record .uni-tag{
	border-radius: 10rpx;
	margin-right: 20rpx;
	margin-bottom: 20rpx;
}
.scroll_content{
	 margin-top: 20rpx;
	 height: 100vh;
	/* 自定义的导航栏 */
	/* #ifdef APP-PLUS */
		
		/* height: calc(100vh); */
	/* #endif */
	/* #ifdef H5 */
		/* height: calc(100vh); */
	/* #endif */
	overflow-y: auto;
	/* #ifdef MP-WEIXIN */
	 /* height: calc(100vh); */
	/* #endif */
}
.bottomTip{
	color: #86B0D4;
	text-align: center;
	margin: 10rpx 0;
	font-size: 28rpx;
}
</style>
