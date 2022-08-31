<template>
	<view class="Model" :data-theme='themeType'>
		<u-navbar :is-back="false" title="" class='navbar'
		:border-bottom="themeType=='dark'?false:true"
		:background="themeType=='dark'?{background: '#3A3A3A'}:{background: '#ffffff'}">
			<view class="slot-wrap" style="width: 100%;">
				<view style="width: 100%;padding: 0 30rpx;display: flex;justify-content: space-between;align-items: center;">
					<view class="left" style="display: flex;align-items: center;">
						<u-icon @click="back" name="arrow-left" :color="themeType=='dark'?'#8f8f8f':'#333333'" size="40"></u-icon>
						<text style="margin: 0 20rpx;color: #000000;font-size: 30rpx;font-weight: bold;" class="sy_title_primary">
							{{classifyName}}
						</text>
						<u-tag :text="tips" :type="status" size="mini"/>
					</view>	
					<view class="center" style="">
						<u-rate :current="filterData(collectionFlag)" :count='count' 
						@change="saveModel($event)" 
						active-color="#FFCB20" inactive-color="#888888"  size='40' gutter="20"></u-rate>
					</view>
				</view>
			</view>
		</u-navbar> 
		<modellist v-for='(item,index) in classifyData.slice(0,4)' :key='item.id' :items='item' :MyModel='MyModel'></modellist>
		<!-- #ifdef APP-PLUS -->
		<view class="ad-view">
		     <ad adpid="1457343843"></ad>
		</view>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<!-- <view class="ad-view">
			 <uni-ad adpid="1091310966" class="uni-ad" ref="uniAd"></uni-ad>
		</view> -->
		<!-- #endif -->
		<modellist v-for='(item,index) in classifyData.slice(4,10)' :key='item.id' :items='item' :MyModel='MyModel'></modellist>
		<!-- #ifdef APP-PLUS -->
		<view class="ad-view" v-if="classifyData.length>9">
		     <ad adpid="1457343843"></ad>
		</view>
		<!-- #endif -->
		<modellist v-for='(item,index) in classifyData.slice(10)' :key='item.id' :items='item' :MyModel='MyModel'></modellist>
		<view class="bottomTip">
			<load-more :loadtext='loadtextAll'></load-more>
		</view>
	</view>
</template>

<script>
	import {getClassifyModel,handlecollect} from '@/utill/api/model/getModel.js'
	import modellist from '@/components/model/modellist.vue'
	export default{
		components:{
			modellist
		},
		data(){
			return{
				classifyName:"分类名称",
				count:1,
				collectionFlag:false,//是否收藏
				classifyData:[],
				tips:'',//是否可下载
				status:'info',//状态
				MyModel:1,//用于区分我的模型库和公开模型库进入详情页的不同
				loadtextAll:'',//底部提示,
				page:1,
				totalPage:null,//所有页面
				classifyId:'',//分类id
				current:0,//确定是那个分类
			}
		},
		emits:['changeSave'],
		methods:{
			showAd() {
				//this.$refs.uniAd.show(); // uni框架bug, 暂时使用下面的方式
				this._ad = this.selectComponent('.uni-ad')
				this._ad.show()
			},
			filterData(value){
				if(value=='true'){
					return 1
				}else{
					return 0
				}
			},
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			// 取消或保存收藏
			saveModel(e){
				// #ifdef H5
				uni.showToast({
					title:'网页端操作无效',
					icon:'none'
				})
				return
				// #endif
				// #ifndef H5
				var addFlag;
				if(e==0){//取消收藏
					addFlag=false
				}else{//为1 收藏
					addFlag=true
				}
				handlecollect({
					addFlag:addFlag,
					modelTypeId:this.classifyId
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						this.getOpenerEventChannel().emit('changeSave',{current:this.current})
					}
					uni.showToast({
						title:res.data.msg,
						icon:'none'
					})
				}).catch(err=>{
					console.log(err)
					uni.showToast({
						title:'err',
						icon:'none'
					})
				})
				// #endif
			},
			getData(id,page,mark){
				getClassifyModel({
					pageNum:page,
					pageSize:6,
					modelCategory:id,
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						this.totalPage=res.data.object.pages//总页数
						this.page++
						console.log(mark)
						if(mark){
							this.classifyData=this.classifyData.concat(res.data.object.list)
						}else{
							this.classifyData=res.data.object.list
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
			}
		},
		// 滚动到底部
		onReachBottom(){
			console.log(this.page)
			console.log(this.totalPage)
			if(this.page > this.totalPage) return this.loadtextAll = 'nomore';
			this.loadtextAll = 'loading';
			this.getData(this.classifyId,this.page,'mark')
		},
		onLoad(options) {
			console.log(options, '路由参数')
			this.current=options.current//确定是哪个分类
			this.classifyName=options.modelLibTypeName
			this.collectionFlag=options.isCollect//是否收藏
			if(options.isdownload=='true'){
				this.tips='可下载'
				this.status='success'
			}else{
				this.tips='仅观看'
				this.status='info'
			}
			this.classifyId=options.classifyId
			this.getData(options.classifyId,1)
			// #ifdef MP-WEIXIN
			// this.showAd()
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
	.Model{
		padding-bottom: 30rpx;
		width: 100%;
		/* #ifdef H5 */
		min-height: 100%; 
		/* #endif */
		/* #ifndef H5 */
		min-height: 100vh;
		/* #endif */
	}
	.bottomTip{
		color: #86B0D4;
		text-align: center;
		margin: 10rpx 0;
		font-size: 28rpx;
	}
	/* #ifdef MP-WEIXIN */
	.navbar ::v-deep .u-line-1 {
		display: none!important;
	}
	/* #endif */
</style>
