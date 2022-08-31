<template>
	<view>
		<u-swiper @click="clickDot" :list="list" name="image" class="picHeight" bg-color='#ffffff' img-mode='aspectFit' :title-style='titleStyle' :title="true" :circular='false' :autoplay="false"></u-swiper>
	<!-- <image src="./image/five.png"></image> -->
	</view>
</template>
<script>
	export default {
		data() {
			return {
				list: [{
					  image: '/static/app-plus/image/one.png',
					 },
					 {
					  image: '/static/app-plus/image/two.png',
					 },
					 {
					  image: '/static/app-plus/image/three.png',
					 },
					 {
					  image: '/static/app-plus/image/four.png',
					 },
					 {
					  image: '/static/app-plus/image/five.png',
					  title: '马上体验'
					 }
				],
				titleStyle:{
					 textAlign:'center',
					 color:'#86B0D4',
					 fontSize:'18px',
					 fontWeight:'bold'
				}
			}
		},
		methods: {
			clickDot(e){
			    console.log(e)
				if(e=='4'){
					uni.reLaunch({
						url:'/pages/Tabbar/index',
						animationDuration:100
					})
				}
			}
		},
		onLoad() {
			// 设置为true
			uni.setStorageSync('first_flag', true);
		}
	}
</script>

<style scoped>
	/* #ifndef APP-NVUE */
	.picHeight ::v-deep uni-swiper{
	   height: calc(100vh)!important;
	}
	/* #endif */
	
	
</style>
