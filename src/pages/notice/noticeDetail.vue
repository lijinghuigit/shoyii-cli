<template>
	<view class="container" style="padding: 0 30rpx;" :data-theme='themeType'>
		{{content}}
		<timeline>
			<timelineItem class='step' :leftTime='time(item.createTime)' color="#86B0D4" v-for="(item,index) in detailList" :key='index'>
				<view class="tripItem">
					<view class="title">{{item.title}}</view>
					<view class="tips sy_title_primary">{{item.content}}</view>
				</view>
			</timelineItem>
		</timeline>
	</view>
</template>

<script>
	import {getNoticeDetail} from './api/notice.js'
	import timeline from './components/chenbin-timeline/timeLine.vue'
	import timelineItem from './components/chenbin-timeline/timelineItem.vue'
	export default {
		components:{
			timeline,
			timelineItem
		},
		data(){
			return{
				content:'',
				detailList:[],
			}
		},
		methods:{
			getNoticeDetail(id){
				getNoticeDetail({
					id:id
				}).then(res=>{
					console.log(res)
					this.detailList=res.data.object
					uni.setNavigationBarTitle({
						title:res.data.object[0].title
					})	
				}).catch(err=>{
					console.log(err)
				})
			}
		},
		onLoad(options) {
			console.log(options)
			if(options.data){//通知栏消息
				var data=JSON.parse(options.data)
				console.log(data)
				console.log(JSON.parse(data.payload))
				var aa=JSON.parse(data.payload)
				console.log(aa.id)
				this.getNoticeDetail(aa.id)
				// this.content=data.content
				// uni.setNavigationBarTitle({
				// 	title:data.title
				// })	
			}else if(options.id){//消息页面过来的
				this.getNoticeDetail(options.id)
			}
		},
		onReady() {
			this.amendNavigator() 
		}
	}
</script>

<style scoped lang="scss">
	page{
		/* #ifdef H5 */
		height: 100%;
		/* #endif */
	}
	.container{
		width: 100%;
		/* #ifdef H5 */
		min-height: 100%;
		/* #endif */
		/* #ifndef H5 */
		min-height: 100vh;
		/* #endif */
	}
	.tripItem {
		padding: 0px 5px;
		box-sizing: border-box;
	}
	.title {
		// font-size:16px;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:600;
		margin-bottom: 10px;
		color:#86B0D4;
	}
	.tips {
		font-size:14px;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		line-height: 50rpx;
		color: #333333;
	}
	/* #ifndef VUE3 */
	.step /deep/ .leftTime{
		white-space: normal!important;
		width: 30%;
	}
	/* #endif */
	
</style>
