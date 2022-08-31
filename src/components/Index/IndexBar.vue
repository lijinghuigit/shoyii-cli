<template>
	<u-navbar :is-back="false" :background="themeType=='dark'?darkBg:background"
	:border-bottom="themeType=='dark'?false:true" class='title'> 
		<template v-slot:default>	
			<view class="slot-wrap">
				<view class="leftTitle sy_title_primary">
					<text @click="getWeather">{{$t('tabbar.index')}}</text>
				</view>
				<view class="" style="display: flex;justify-content: space-between;align-items: center;">
					<uni-icons type="notification" :color="themeType=='dark'?'#8f8f8f':'#999'" size='26' @click="notice"></uni-icons>
					<view @click="Enterchat" class="chatIcon" style="margin-left: 30rpx;">
						<u-badge :is-dot="true" type="error" v-if="isDot"></u-badge>
						<uni-icons type="chat" :color="themeType=='dark'?'#8f8f8f':'#999'" size='26'></uni-icons>
					</view>
				</view>
			</view>
		</template>
	</u-navbar>
</template>

<script>
	export default{
		name:'IndexBar',
		props:{
			isDot:{
				type:Boolean,
				default:false
			}
		},
		emits:['isDotemit'],
		data(){
			return {
				background: {
					backgroundColor: '#ffffff',
				},
				darkBg:{
					backgroundColor: '#3A3A3A',
				},
				addressName:'首页',
			}
		},
		methods:{
			Enterchat(){
				if(this.$store.getters['user/hasLogin']){
					uni.hideTabBarRedDot({
						index:0,
						complete(e) {
							console.log('红点消失')
						}
					})
					this.$emit('isDotemit',false)
					uni.navigateTo({
						url:'/pages/shoyiiChat/index'
					})
				}else{
					uni.showToast({
						title:'未登录',
						icon:'none'
					})
				}
			},
			notice(){
				uni.navigateTo({
					url:'/pages/notice/notice'
				})
			},
			getWeather(){
				// uni.navigateTo({ //高德小程序jdk
				// 	url:'/pages/weather/weather'
				// })
				// uni.navigateTo({ //高德小程序jdk
				// 	url:'/pages/map/map'
				// })
				// uni.navigateTo({//list页面渲染
				// 	url:'/pages/NavTest/NavTest'
				// })
				// uni.navigateTo({//echarts图标渲染
				// 	url:'/pages/map/echarts'
				// })
				// uni.navigateTo({//echarts图标渲染
				// 	url:'/pages/map/echarts'
				// })
				// uni.navigateTo({
				// 	url:'/pages/contactUs/contactUs'
				// })
				// uni.navigateTo({
				// 	url:'/pages/errpage/errpage'
				// })
				// uni.navigateTo({//支付宝支付
				// 	url:'/pages/aboutUs/aboutUs'
				// })
			},
		},
		mounted() {
				
		}
	}
</script>

<style scoped lang="scss">
	.slot-wrap{
		padding: 0 30rpx;width: 100%;display: flex;align-items: center;justify-content: space-between;
		.leftTitle{
			font-size: 36rpx;font-weight: bold;font-family: PingFang-SC-Bold;
		}
		.iconxiaoxi{
			font-size: 40rpx;
		}
		.u-line-1 {
			display: none;
		}
	}
</style>
