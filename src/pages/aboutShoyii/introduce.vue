<template>
	<view class="" :data-theme='themeType'>
		<u-collapse arrow-color='#999' :arrow='false'>
			<u-collapse-item class="item sy_block sy_border_bottom" title="" v-for="(item,index) in updateItem" :key="index">
				<template  class="" v-slot:title>
					<view class="content">
						<text class="sy_title_primary">{{item.title}}</text>
						<text class="time">{{timeStamp(item.createTime)}}</text>
					</view>
				</template>
				<view class="" style="">
					<text>{{item.content}}</text>
				</view>
			</u-collapse-item>
		</u-collapse>
		<u-loadmore :status="status"/>
	</view>
</template>

<script>
	import {updateLog} from './api/updateLog.js'
	import {reactive,toRefs,getCurrentInstance} from 'vue'
	import {onLoad,onReady} from '@dcloudio/uni-app'
	export default{
		setup(){
			const { proxy } = getCurrentInstance(); 
			let state=reactive({
				updateItem:[],
				status:'nomore',
				page:1,
				size:12,
				total:0,
				mark:0,//第一次加载还是多次加载数据
			})
			const updateLogs=(mark,page)=>{
				updateLog({
					pageNum:page,
					pageSize:state.size
				}).then(res=>{
					console.log(res)
					if(res.data.object.list.length==0){//无数据
						state.status='nomore'
						return
					}
					state.total=res.data.object.pages
					if(mark==0){
						state.updateItem=res.data.object.list
					}else if(mark==1){
						state.updateItem=state.updateItem.concat(res.data.object.list)
					}
				}).catch(err=>{
					console.log(err)
				})
			}
			const onReachBottom=()=>{
				if(state.page >= state.total) return state.status = 'nomore';;
				state.status = 'loading';
				state.page++;
				state.mark=1
				updateLogs(state.mark,state.page)
			}
			onLoad(()=>{
				updateLogs(0,1)
			})
			onReady(()=>{
				proxy.amendNavigator()
			})
			return {
				...toRefs(state),
				onReachBottom
			}
			
		}

	}
</script>

<style scoped>
	.item{
		/* #ifndef MP-WEIXIN */
		padding: 0 30rpx;
		/* #endif */
		border-bottom: 1px solid #F8F8F8;
		background-color: #FFFFFF;
	}
	/* #ifdef MP-WEIXIN */
	.item ::v-deep .u-collapse-item{
		background-color: #FFFFFF;
		padding: 0 30rpx;
	}
	/* #endif */	
	.content{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		color: #000000;
		font-size: 30rpx;
		line-height: 40rpx;
	}
	.time{
		color: #666666;
		font-size: 24rpx;
	}
</style>
