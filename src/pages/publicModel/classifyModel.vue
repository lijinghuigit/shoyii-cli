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
				classifyName:"????????????",
				count:1,
				collectionFlag:false,//????????????
				classifyData:[],
				tips:'',//???????????????
				status:'info',//??????
				MyModel:1,//?????????????????????????????????????????????????????????????????????
				loadtextAll:'',//????????????,
				page:1,
				totalPage:null,//????????????
				classifyId:'',//??????id
				current:0,//?????????????????????
			}
		},
		emits:['changeSave'],
		methods:{
			showAd() {
				//this.$refs.uniAd.show(); // uni??????bug, ???????????????????????????
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
			// ?????????????????????
			saveModel(e){
				// #ifdef H5
				uni.showToast({
					title:'?????????????????????',
					icon:'none'
				})
				return
				// #endif
				// #ifndef H5
				var addFlag;
				if(e==0){//????????????
					addFlag=false
				}else{//???1 ??????
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
						this.totalPage=res.data.object.pages//?????????
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
		// ???????????????
		onReachBottom(){
			console.log(this.page)
			console.log(this.totalPage)
			if(this.page > this.totalPage) return this.loadtextAll = 'nomore';
			this.loadtextAll = 'loading';
			this.getData(this.classifyId,this.page,'mark')
		},
		onLoad(options) {
			console.log(options, '????????????')
			this.current=options.current//?????????????????????
			this.classifyName=options.modelLibTypeName
			this.collectionFlag=options.isCollect//????????????
			if(options.isdownload=='true'){
				this.tips='?????????'
				this.status='success'
			}else{
				this.tips='?????????'
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
