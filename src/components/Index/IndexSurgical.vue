<template>
	<view class="">
		<view class="segmentedMenu">
			<u-tabs :list="surgicalitems" :is-scroll="isScroll" :current="current"
			 @change="onClickItem($event,surgicalitems)" 
			bar-height='10' bar-width='100' active-color="#86B0D4" inactive-color='#000'></u-tabs>
		</view>
		<view class="classes" v-if="hasLogin">
			<surgical-list style='width: 100%;' v-for='(item,index) in surgicalListAll' :key='index' :Surgicalid="item.surgicalPlanId" :docName='item.doctorName' :time='item.createTime' :imgUrl='item.previewList[0].fileDownloadUrl' :content='item.title' :content_title="item.surgicalPlanName" :doctor="item.doctor"></surgical-list>
		</view>
		<view class="devicelogin" v-else>
			<u-tag @click="login" text="点击登录,查看更多数据" mode="light" color="#ffffff" border-color='#86B0D4' bg-color='#86B0D4'/>
		</view>
		<view class="StrenchMore" v-if="hasLogin&&surgicalListAll.length!=0" @click="StrenchMore()" hover-class="hover-bgColor">
			<uni-icons :type="typeicon" size='20'></uni-icons>
		</view>
	</view>
</template>

<script>
	import SurgicalList from '@/components/surgical/SurgicalList.vue'
	export default {
		components:{
			SurgicalList,
		},
		emits:['login','StrenchMore','onClickItem'],
		props:{
			surgicalitems:{
				type:Array,
				default:()=>{
					return []
				}
			},
			isScroll:{
				type:Boolean,
				default:false
			},
			current:{
				type:Number,
				default:0
			},
			hasLogin:{
				type:Boolean,
				default:false
			},
			surgicalListAll:{
				type:Array,
				default:()=>{
					return []
				}
			},
			typeicon:{
				type:String,
				default:"arrowdown"
			}
		},
		methods:{
			login(){
				this.$emit('login')
			},
			StrenchMore(){
				this.$emit('StrenchMore')
			},
			onClickItem(e,data){
				this.$emit('onClickItem',{e,data})
			},
		}
	}
</script>

<style scoped lang="scss">
	.devicelogin{
		display: flex;
		flex-wrap: wrap;
		background-color: #FFFFFF;
		border-radius: 15rpx;
		justify-content: center;
		padding: 20rpx 0;
	}
	.classes{
		display: flex;
		flex-wrap: wrap;
		background-color: #FFFFFF;
		padding-top: 24rpx;
		border-radius: 15rpx;
		justify-content: center;
	}
	.StrenchMore{
		background: #FFFFFF;
		text-align: center;
		padding: 10rpx 0;
		border-bottom-left-radius: 29rpx;
		border-bottom-right-radius: 29rpx;
	}
	/* 手术方法库 */
	.segmentedMenu{
		width: auto;
		background-color: #FFFFFF;
		border-top-right-radius: 29rpx;
		border-top-left-radius: 29rpx;
		padding: 20rpx 30rpx 0;
	}
</style>
