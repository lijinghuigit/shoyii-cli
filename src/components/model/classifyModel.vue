<template>
	<view class="">
		<view class="classifyItems sy_block" v-for="(item,index) in publicData" :key='index'>
			<view class="classifyTitle">
				<text class="typeName sy_title_primary">{{item.modelLibTypeName}}</text>
				<u-rate :current="filterData(item.collectionFlag)" :count='count' @change="saveModel($event,item.id)" active-color="#FFCB20" inactive-color="#888888"  size='40' gutter="20"></u-rate>
			</view>
			<view class="items sy_border_bt" :hover-class="themeType=='dark'?'sy_hover_bg':'bgColor'" v-if="item.modelLibs.length!=0" 
			@click="checkModel(item.id,item.modelLibTypeName,item.collectionFlag,item.downloadBoolean)">
				<view class="items_list" v-for="(s_item,s_index) in item.modelLibs" :key='s_index'>
					<view class="imgpic sy_border">
						<u-image v-if="s_item.previewImage?Object.keys(s_item.previewImage).length>0:false" height="100%"
						 mode="scaleToFill" :src="s_item.previewImage[s_item.fileModelImgId.split(',')[0]]">
							<template v-slot:loading>
								<uni-icons type="spinner-cycle"></uni-icons>
							</template>
							<template v-slot:error>
								<view style="font-size: 24rpx;color: #000000;">加载失败</view>
							</template>
						</u-image>
						<u-image v-else height="100%" mode="aspectFit" :src="defaultImg">
						</u-image>
					</view>
					<view class="items_content" style="">
						<text class="model_text sy_title_primary">{{s_item.modelName||'无数据'}}</text>
						<text class="description model_text">{{timeStamp(s_item.createTime)}}</text>
					</view>
				</view>
			</view>
			<view class="" v-else>
				<u-empty text="数据为空" mode="data"></u-empty>
			</view>
			<view class="checkAll" @click="checkModel(item.id,item.modelLibTypeName,item.collectionFlag,item.downloadBoolean)" 
			v-if="item.modelLibs.length!=0">
				<view class="left_info" style="">
					<view class="Uname" v-if="item.modelLibs.length!=0">
						<u-image width="40" height="40" mode="" shape="circle" :src="item.modelLibs[0].avatarLinks">
							<template v-slot:loading>
								<uni-icons type="spinner-cycle"></uni-icons>
							</template>
							<template v-slot:error>
								<view style="font-size: 24rpx;color: #000000;">error</view>
							</template>
						</u-image>
						<text class="docName">{{item.modelLibs[0].doctorName}}</text>
					</view>
					<view class="Uname" v-else>
						<u-image width="40" height="40" shape="circle" :src="defaultImg">
						</u-image>
						<text class="docName">暂无数据</text>
					</view>
				</view>
				<view class="">
					<u-tag :text="filterdownload(item.downloadBoolean)" :type="filterStatus(item.downloadBoolean)" size='mini'/>
				</view>
			</view>
		</view>
	</view>
		
</template>
<script>
	import {handlecollect} from '@/utill/api/model/getModel.js'
	export default{	
		data(){
			return{
				count:1,
				collectionFlag:0,//默认无收藏
				defaultImg:uni.getStorageSync('uploadLogo'),
			}
		},
		emits:['checkModelemit','refreshEmit'],
		props:{
			publicData:{
				type:Array,
				default:()=>{
					return[]
				}
			},
			current:{
				type:Number,
				default:null
			}
		},
		methods:{
			filterData(value){
				if(value){
					return 1
				}else{
					return 0
				}
			},
			filterdownload(value){
				if(value){//存在，可下载
					return '可下载'
				}else{//不存在，仅能观看
					return '仅观看'
				}
			},
			filterStatus(value){
				if(value){//存在，可下载
					return 'success'
				}else{//不存在，仅能观看
					return 'info'
				}
			},
			// 收藏模型
			saveModel(e,id){
				// #ifdef H5
				uni.showToast({
					title:'网页端操作无效',
					icon:'none'
				})
				return
				// #endif
				// #ifndef H5
				if(!this.$store.getters['user/hasLogin']){
					uni.showToast({
						title:'未登录，不能操作',
						icon:'none'
					})
					return
				}
				let addFlag;
				if(e==0){//取消收藏
					addFlag=false
				}else{//为1 收藏
					addFlag=true
				}
				handlecollect({
					addFlag:addFlag,
					modelTypeId:id
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						// 刷新数据
						this.$emit('refreshEmit',this.current)
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
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			// 进入该分类下的所有模型
			checkModel(classifyId,modelLibTypeName,collectionFlag,isdownload){
				this.$emit('checkModelemit',{classifyId,modelLibTypeName,collectionFlag,isdownload,current:this.current})				
			}
		}
	}
</script>

<style scoped lang="scss">
	.classifyItems{
		padding:20rpx;background-color: #FFFFFF;
		margin-bottom: 20rpx;
		.classifyTitle{
			color: #000000;
			font-family: PingFang-SC-Bold;
			font-size: 30rpx;
			font-weight: bold;
			display: flex;
			justify-content: space-between;
			padding-bottom: 28rpx;
			.typeName{
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}
		}
		.items{
			padding-top: 30rpx;padding-bottom: 30rpx;border-top: 1px solid #EEEEEE;border-bottom: 1px solid #EEEEEE;
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
			.items_list:nth-child(2){
				padding: 10rpx 0;
			}
		}
		.checkAll{
			display: flex;justify-content: space-between;align-items: center;
			font-size: 24rpx;padding-top: 24rpx;
			.left_info{
				flex: 1;overflow: hidden;
				.Uname{
					display: flex;align-items: center;
					.docName{
						flex: 1;
						white-space: nowrap;
						overflow: hidden;text-overflow: ellipsis;
						margin-left: 10rpx;
					}
				}
			}
			
		}
		.bgColor{
			background-color: $uni-bg-color-grey;
		}
	}
</style>
