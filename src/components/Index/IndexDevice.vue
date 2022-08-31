<template>
	<view class="">
		<!-- #ifndef MP-WEIXIN -->
		<view class="device" v-show="hasLogin" @touchend.passive='handleTouchEnd' @touchmove.passive='handleTouchMove' @touchstart.passive='handleTouchStart' :style="{'transform':coverTransform,'transition': coveTransition}">
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<view class="device" v-if="hasLogin" @touchend.passive='handleTouchEnd' @touchmove.passive='handleTouchMove' @touchstart.passive='handleTouchStart' :style="{'transform':coverTransform,'transition': coveTransition}">
		<!-- #endif -->
			<scroll-view v-if="deviceData.length!=0" scroll-x="true" lower-threshold='10' class="scrollX">
				<view v-for="(item,index) in deviceData" :key='item.id' :style="{marginRight:deviceData.length-1==index?'0rpx':'20rpx',width:deviceFilter}" 
				@click="enterDevice(item.id,item.name)" hover-class="hover-bgColor" class="items sy_block">
					<view class="Name sy_title_deep">
						<text style="white-space: nowrap;">{{item.name}}</text>
					</view>
					<view class="Count sy_content">
						<text>设备数量：</text>
						<text v-if="item.devices">{{item.devices.length}}</text>
						<text v-else>0</text>
					</view>
				</view>
			</scroll-view>
			<scroll-view scroll-x="true" style="text-align: center;" v-else>
				<u-tag text="暂无数据" mode="light" color="#ffffff" border-color='#86B0D4' bg-color='#86B0D4'/>
			</scroll-view>
		</view>
		<view class="devicelogin sy_block" v-if="!hasLogin">
			<u-tag @click="login" text="点击登录,查看更多数据" mode="light" color="#ffffff" border-color='#86B0D4' bg-color='#86B0D4'/>
		</view>
	</view>
</template>

<script>
	let startX = 0; // 手指起始的坐标
	let moveX = 0; // 手指移动的坐标
	let moveDistance = 0; // 手指移动的距离
	export default{
		props:{
			hasLogin:{
				type:Boolean,
				default:false
			},
			deviceData:{
				type:Array,
				default:()=>{
					return []
				}
			}
		},
		emits:['login'],
		computed:{
			deviceFilter(){
				if(this.deviceData.length==1){
					return '100%'
				}else if(this.deviceData.length==2){
					return '50%'
				}else{
					return '216rpx'
				}
			},
		},
		data(){
			return{
				coverTransform:'translateX(0)',
				coveTransition:'',
			}
		},
		methods:{
			handleTouchStart(event){
				this.coveTransition=''
				startX = event.touches[0].clientX;
			},
			handleTouchMove(event){
			  moveX = event.touches[0].clientX;
			  moveDistance = moveX - startX;
			  // console.log(moveDistance)
			  if(moveDistance >= 0){
			    return;
			  }
			  if(moveDistance <= -375){
			    moveDistance = -80;
			  }
			  // 动态更新coverTransform的状态值
			  this.coverTransform=`translateX(${moveDistance}rpx)`
			},
			handleTouchEnd(e){
				this.coverTransform=`translateX(0rpx)`,
				this.coveTransition= 'transform 1s linear'
			},
			enterDevice(id,name){
				uni.navigateTo({
					url:'/pages/deviceManage/groupDevices?groupId='+id+'&Uname='+name
				})
			},
			login(){//登录页面
				this.$emit('login')
			},
		}
	}
</script>

<style scoped lang="scss">
	.device{
		display: flex;
		.scrollX{
			white-space: nowrap;width: 100%;margin-top: 20rpx;font-size: 24rpx;color: #8F8F8F;
			.items{
				padding: 36rpx 20rpx;border-radius: 20rpx;text-align: left;background-color: #FFFFFF;display: inline-block;
				.Name{
					text-overflow: ellipsis;white-space: nowrap;overflow: hidden;
					word-wrap: break-word;
					word-break: break-all;
					margin-bottom: 40rpx;font-size: 28rpx;color: #000000;
				}
				.Count{
					text-overflow: ellipsis;white-space: nowrap;overflow: hidden;
				}
			}
		}
	}
	.devicelogin{
		display: flex;
		flex-wrap: wrap;
		background-color: #FFFFFF;
		border-radius: 15rpx;
		justify-content: center;
		padding: 20rpx 0;
	}
</style>
