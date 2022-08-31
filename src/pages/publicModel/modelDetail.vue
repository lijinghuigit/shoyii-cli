<template>
	<view class="container" :data-theme='themeType'>
		<uni-nav-bar leftIcon='back' :title="Navtitle" fixed @clickLeft='back' :dark="themeType=='dark'?true:false" 
		statusBar :border="themeType=='dark'?false:true"/>
		<!-- #ifdef H5 -->
		<!-- h5打开app -->
		<!-- <open-app :modelId='modelId' :classifyId='classifyId'></open-app> -->
		<!-- h5打开小程序 -->
		<open-miniparam :pubModelId='modelId' :classifyId='classifyId'></open-miniparam>
		<!-- #endif -->
		<publicModel :modelData='modelData' @shareModel='shareJs'></publicModel>
		<view class="Model">
			<view class="modelTitle">
				<text>其他模型</text>
			</view>
			<!-- #ifdef H5 -->
			 <!-- h5广告 -->
			<!-- <view class="ad-view">
				<ad adpid="1189059878" adpid-widescreen="300"></ad>
			</view>	 -->
			 <!-- #endif -->
			<view class="" v-if="otherData.length!=0">
				<scroll-view class="otherModel" scroll-x="true">
					<view class="items sy_block" v-for="(item,index) in otherData" :key='index' @click="enterDetail(item.id)">
						<view class="sy_border" style="border: 1px solid #EEEEEE;">
							<u-image v-if="item.fristImgFileId" width="100%" height="316rpx" :src="item.previewImage[item.fristImgFileId]" mode="aspectFit">
							</u-image>
							<u-image v-else width="100%" height="316rpx" :src="defaultLogo" mode="aspectFit">
							</u-image>
						</view>
						<view class="title sy_title_primary">
							<text>{{item.modelName||'无数据'}}</text>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="" v-else>
				<u-empty text="无数据" mode="data"></u-empty>
			</view>
		</view>
		<view class="emptyDiv">
		</view>
		<view class="footer sy_block sy_border_top">
			<modelBottom style="width: 100%;" @show='show'></modelBottom>
		</view>
		<!-- vr弹窗显示 -->
		<vr-show ref='SonVrshow' :deviceGroup='deviceGroup' :threeDmodelId='modelData.fileModelId' threeDmodelName='ModelLib'></vr-show>
		<!-- 微信的分享 popup -->
		<wechat-share ref='sonWechatShare' @shareQq='shareQq' @shareWeixin='shareWeixin' @shareFriend='shareFriend' @cancelshare='cancelshare'></wechat-share>
		<u-no-network></u-no-network>
	</view>
</template>

<script>
	import {querydevice} from '@/utill/api/DeviceGroup/querydevice.js'
	import {getModelDetail,getClassifyModel} from '@/utill/api/model/getModel.js'
	import publicModel from '@/components/model/publicModel.vue'
	import modelBottom from '@/components/model/modelBottom.vue'
	import getPageRoute from '@/utill/tools/getRoute.js'
	import mixin from '@/mixin/mixin.js'
	export default{
		mixins:[mixin],
		components:{
			modelBottom,
			publicModel
		},
		data(){
			return{
				Navtitle:'模型库详情',
				modelData:{},
				otherData:[],//其他模型
				modelId:'',//用于点击其他模型时进行的操作
				classifyId:'',
				deviceGroup:[],//设备组的数据
				pageUrl:'',//页面路由
				paramterOne:'',//页面参数1
				paramterTwo:'',//页面参数2
				defaultLogo:uni.getStorageSync('uploadLogo')
			}
		},
		onReady: function (e) {
			// #ifdef APP-PLUS
			this.adOption = {
				adpid: '1338429612' // 
			};
			// 创建广告实例
			this.createInterstitialAd();
			// #endif
		},
		methods:{
			createInterstitialAd(){
				var interstitialAd = this.interstitialAd = uni.createInterstitialAd(this.adOption);
				interstitialAd.onLoad(() => {
				  console.log("插屏 广告加载成功");
				});
				interstitialAd.onClose(() => {
				  // 用户点击了关闭或返回键(仅Android有返回键)
				  console.log("插屏 广告关闭");
				});
				interstitialAd.onError((err) => {
				  console.log("插屏 广告加载失败");
				});
			},
			back(){
				// #ifdef H5
				uni.showToast({
					title:'网页端无效',
					icon:'none'
				})
				// #endif
				// #ifdef APP-PLUS
					uni.navigateBack({
						delta:1
					})
				// #endif
				// #ifdef MP-WEIXIN
				uni.navigateBack({
					delta:1
				})
				// #endif
			},
			// 分享三维模型到微信
			shareJs(){
				if(this.modelData.modelName){
					this.shareTitle=this.modelData.modelName+'的模型'
				}
				this.shareContent='所属分类:'+this.modelData.modelCategoryName+'\n'+'创立人:'+this.modelData.ownerName
				if(this.modelData.previewImage){
					this.surfacePic=Object.values(this.modelData.previewImage)[0] 
				}
				this.shareUrl=this.$JslineUrl+'&userType=D'+'&token='+'&modelType=模型库'+'&titlename='+this.modelData.modelName+'&fileId='+this.modelData.fileModelId
				// #ifdef APP-PLUS
				this.$refs.sonWechatShare.open()
				// #endif
				// #ifdef H5
				uni.showToast({
					title:'网页端不能操作',
					icon:'none'
				})
				// #endif
			},
			show(index){
				console.log(index)
				switch (index){
					case 0: //xr显示
						if(!this.modelData.fileModelId){
							uni.showToast({
								title:'文件不存在',
								icon:'none'
							})
							return;
						}
						// 查询所有的设备组
						querydevice({}).then(res=>{
							console.log(res)
							if(res.data.code==0){
								this.deviceGroup=res.data.object
								this.$refs.SonVrshow.open()//调用子组件的打开方法，props传值，点击mask时会报错
							}else{
								uni.showToast({
									title:res.data.msg,
									icon:'none'
								})
							}
						}).catch(err=>{
							console.log(err)
						})
					break;
					case 1://三维显示
						console.log(this.modelData)
						if(!this.modelData.fileModelId){
							uni.showToast({
								title:'文件不存在',
								icon:'none'
							})
							return;
						}
						var modelUrl=this.$JslineUrl+'&userType=D'+'&token='+'&modelType=模型库'+'&titlename='+this.modelData.modelName+'&majorTableId='+this.modelData.id
						uni.navigateTo({
							url:'/pages/ThreejsShow/ThreejsShow?baseUrl='+encodeURIComponent(modelUrl),
							animationType:'pop-in'
						})
					break;
					case 2://转发
						this.$refs.sonWechatShare.open()//popup展示
						this.shareUrl=this.$onlineUrl+this.pageUrl+'?modelId='+this.paramterOne+'&classifyId='+this.paramterTwo
						 console.log(this.shareUrl)
						 if(this.modelData.modelName){
							 this.shareTitle=this.modelData.modelName
						 }
						 this.shareContent='所属分类:'+this.modelData.modelCategoryName+'\n'+'创立人:'+this.modelData.ownerName
						 if(this.modelData.previewImage){
							 this.surfacePic=Object.values(this.modelData.previewImage)[0] 
						 }
					break;
					default:
					break;
				}
			},
			cancelshare(){
				this.$refs.sonWechatShare.close()
			},
			// 分享微信
			shareWeixin(){
				uni.share({
					provider:'weixin',
					title:this.shareTitle,
					type:0,
					href: this.shareUrl,
					summary:this.shareContent,
					scene:'WXSceneSession',
					imageUrl:this.surfacePic,
					success:(e)=> {
						uni.showToast({
							title:'分享成功',
							icon:'none'
						})
						this.createInterstitialAd();
						this.interstitialAd.show().then(() => {
						  console.log('广告展示')
						});
						console.log(e)	
					},
					fail(e) {
						uni.showToast({
							title:'分享失败',
							icon:'none'
						})
						console.log(e)
					}
				})
			},
			// 分享朋友圈
			shareFriend(){
				this.shareFriendMixin()
			},
			shareQq(){
				this.hrefQq=this.shareUrl
				console.log(this.hrefQq)
				this.shareQqMixin()
			},
			enterDetail(modelId){
				console.log(modelId)
				this.modelId=modelId
				// 查一遍详情
				this.getDetail(modelId)
				// 查一遍该分类下的数据
				this.otherModel()
			},
			// 查询该分类下的模型数据
			otherModel(){
				// 查询之前先清空之前的数据
				this.otherData=[]
				getClassifyModel({
					pageNum:1,
					pageSize:'',
					modelCategory:this.classifyId,
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						res.data.object.list.filter(item=>{
							if(item.id!=this.modelId){
								this.otherData.push(item)
							}
						})
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
			// 查询模型详情
			getDetail(id){
				getModelDetail({
					id:id
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						this.Navtitle=res.data.object.modelName
						// uni.setNavigationBarTitle({
						// 	title:res.data.object.modelName
						// })
						this.modelData=res.data.object
						this.paramterOne=id//参数1，模型id
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
		},
		onLoad(options) {
			console.log(options)
			this.modelId=options.modelId
			if(options.classifyId){
				this.classifyId=options.classifyId
				this.otherModel()
			}
			this.getDetail(options.modelId)
			var data=getPageRoute('modelId','classifyId')
			this.pageUrl=data[0]
			this.paramterOne=data[1]//模型id
			this.paramterTwo=data[2]// 分类id
		},
		onNavigationBarButtonTap(e){
			console.log(e)		
		},
		onBackPress(e) {
			// console.log(e)
			// h5页面不需要返回首页
			// #ifdef H5
				return true
			// #endif
		},
		onShareAppMessage: function (res) {
			console.log(res)
		    if (res.from === 'button') {//定义了share 才是button
		      // 来自页面内转发按钮
			  
		    }else{//menu为原生胶囊转发
				console.log(this.paramterOne)
				console.log(this.paramterTwo)
				return {
				  title: this.Navtitle,
				  path: '/'+this.pageUrl+'?modelId='+this.paramterOne+'&classifyId='+this.paramterTwo
				}
			}
		},
		// 小程序分享到朋友圈
		onShareTimeline(){
			return{
				title:this.Navtitle,
				query:'modelId='+this.paramterOne+'&classifyId='+this.paramterTwo
			}
		}
	}
</script>

<style scoped lang="scss">
	.Model{
		padding: 0 30rpx;
		margin-bottom: 40rpx;
		.modelTitle{
			color: #232323;
			font-size:28rpx ;
			font-weight: bold;
			font-family: PingFang-SC-Bold;
			padding: 30rpx 0;
		}
		.otherModel{
			display: flex;
			width: 100%;
			white-space: nowrap;
			.items{
				width: 50%;
				display: inline-block;
				margin-right:20rpx;
				background-color: #FFFFFF;
				.title{
					white-space:nowrap;
					overflow:hidden;
					text-overflow:ellipsis;
					padding: 22rpx 0;
					color: #000;
					font-size: 24rpx;
				}
			}
		}
	}
	.emptyDiv{
		height: 110rpx;
		width: 100%;
	}
	.footer{
		height:110rpx;
		border-top:1px solid #EEEEEE;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;
		background: #FFFFFF;
		// background-color: red;
		position: fixed;
		width: 100%;
		bottom: calc(var(--window-bottom))
	}
	
</style>
