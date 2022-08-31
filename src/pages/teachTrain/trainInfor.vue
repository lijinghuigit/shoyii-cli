<template>
	<view class="traininfor" :data-theme='themeType'>
		<view class="time sy_title_primary">
			<text>学习时长：</text>
			<text>{{infor.learnTime.period}}</text>
		</view>
		<view class="sy_title_primary">
			<view class="content" v-for="(item,index) in infor.trainerContent" :key='index'>
				<view class="Alltitle" v-if="item.point">
					<text>{{item.point}}</text>
				</view>
				<view class="main">
					<view class="dot" v-if="item.content"></view>
					<view class="" style="flex: 1;">
						<text class="title" @click='checkDetail(item.include)' :class="item.include?'underline':''">{{item.content}}</text>
						<text class="subtitle" v-if="item.include">（包含实际操作辅助教学）</text>
					</view>
				</view>
				<view class="tip" v-if="item.ps">
					<text>{{item.ps}}</text>
				</view>
			</view>
		</view>
		<view class="Give sy_title_primary">
			<view class="left">
				<view class="dot"></view>
				<text class="title">赠送：</text>
			</view>
			<view class="right">
				<view class="givedata">
					<text>{{infor.gift}}</text>
				</view>
			</view>
		</view>
		<u-modal style="position: relative;" :mask-close-able='true' v-model="show" :content="detailContent" :show-title='false' :show-cancel-button='false' :show-confirm-button='false'>
			<view class="modalContent">
				<view class="content">
					<text>{{detailContent}}</text>
				</view>
			</view>
			<view class="icon" @click='close' style="position: absolute;top: 0;right: 0;">
				<u-icon name="close"></u-icon>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import {getTraindata} from '@/utill/api/train/train.js'
	export default{
		data(){
			return{
				content:[],
				show:false,
				detailContent:'',
				infor:{
					learnTime:{}
				},
				datainfor:[],
			}
		},
		methods:{
			checkDetail(data){
				if(data){
					this.detailContent=data
					this.show=true
				}		
			},
			close(){
				this.show=false
			}, 
			getData(index){
				if(index==0){//初级
					this.infor=this.datainfor[0] 
				}else if(index==1){//中级
					this.infor=this.datainfor[1] 
				}else if(index==2){//高级
					this.infor=this.datainfor[2] 
				}else{//专业
					this.infor=this.datainfor[3] 
				}
				console.log(this.infor)
			}
		},
		onLoad(options) {
			console.log(options.tabindex)
			getTraindata({}).then(res=>{
				console.log(res.data);
				this.datainfor=res.data.object
				console.log(this.datainfor);
				this.getData(options.tabindex)
			}).catch(err=>{
				console.log(err)
			})
		},
		onReady() {
			this.amendNavigator()
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #FFFFFF;
		font-family: PingFang-SC-Regular;
		color: #000000;
		font-size: 28rpx;
		height: 100%;
	}
	.traininfor{
		width: 100%;
		/* #ifdef H5 */
		min-height: 100%;
		/* #endif */
		/* #ifndef H5 */
		min-height: 100vh;
		/* #endif */
		padding:0 30rpx;
		.time{
			padding: 30rpx 0;
		}
		.dot{
			width: 14rpx;
			height: 14rpx;
			border-radius: 50%;
			background-color: #777777;
			margin-right: 10rpx;
		}
		.content{
			padding: 10rpx 0;
			.Alltitle{
				font-weight: bold;
				padding: 10rpx 0;
			}
			.main{
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				.underline{
					border-bottom: 1px solid #000000;
				}
				.subtitle{
					color: #666666;
				}
			}
			.tip{
				margin-left: 24rpx;
				color: #666666;
			}
		}
		.Give{
			display: flex;
			align-items: flex-start;
			flex-wrap: wrap;
			padding: 20rpx 0 30rpx;
			.dot{
				background-color: #7DCCEC;
			}
			.left{
				display: flex;align-items: center;
				.title{
					margin-right: 10rpx;
				}
			}
			.right{
				flex: 1;
			}
			.givedata{
				flex: 1;
			}
		}
	}
	.modalContent{
		padding: 30rpx;
		position: relative;
	}
</style>
