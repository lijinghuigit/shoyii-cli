<template>
	<view class="about">
		<!-- 用于公众号菜单 公司简介项 -->
		<uni-nav-bar leftIcon='back' :title="Navtitle" fixed @clickLeft='back' :dark="false" statusBar backgroundColor="#F8F8F8"/>
		<view class="wrap">
			<u-tabs-swiper ref="uTabs" :list="menu" :current="current" @change="tabsChange" font-size='24' active-color='#86B0D4' :is-scroll="false"
			swiperWidth="750"></u-tabs-swiper>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item">
					<scroll-view enable-flex scroll-y style="height:100%;width: 100%;">
						<u-parse :html="aboutUsData.aboutUs"></u-parse>
						<video class="video" :src="videoUrl" show-mute-btn="true" controls poster='' muted="true" danmu-btn="true" enable-danmu="true" page-gesture="true">
						</video>						
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view enable-flex scroll-y style="height:100%;width: 100%;">
						<timeline>
							<timelineItem :leftTime='item.historyYear' color="#86B0D4" v-for="(item,index) in courseData" :key='index'>
								<view class="tripItem">
									<view class="title">{{item.title}}</view>
									<view class="tips">{{item.content}}</view>
								</view>
							</timelineItem>
						</timeline>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import {aboutUs,course} from './api/aboutUs.js'
	import timeline from './components/chenbin-timeline/timeLine.vue'
	import timelineItem from './components/chenbin-timeline/timelineItem.vue'
	import {reactive,toRefs,ref} from 'vue'
	import {
	    onLoad,
	} from "@dcloudio/uni-app";
	export default{
		components:{
			timeline,
			timelineItem
		},
		setup(props,context){
			const uTabs = ref(null)
			let state=reactive({
				Navtitle:'公司简介',
				menu:[
					{name:"关于我们"},
					{name:"我们的历程"}
				],
				current:0,
				swiperCurrent:0,
				aboutUsData:{},
				courseData:[],
				videoUrl:"",
			})
			const back=()=>{
				// #ifdef H5
				uni.showToast({
					title:'无效',
					icon:'none'
				})
				// #endif
				// #ifndef H5
				uni.navigateBack({
					delta:1
				})
				// #endif
			}
			const tabsChange=(index)=>{
				state.swiperCurrent = index;
			}
			// swiper-item左右移动，通知tabs的滑块跟随移动
			const transition=(e)=>{
				let dx = e.detail.dx;
				// this.$refs.uTabs.setDx(dx);
				uTabs.value.setDx(dx);
			}
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			const animationfinish=(e)=>{
				let current = e.detail.current;
				// this.$refs.uTabs.setFinishCurrent(current);
				uTabs.value.setFinishCurrent(current);
				state.swiperCurrent = current;
				state.current = current;
				if(current==0){
					state.Navtitle='关于我们'
				}else{
					state.Navtitle='我们的历程'
				}
			}
			
			const aboutOur=()=>{
				aboutUs({}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						state.aboutUsData=res.data.object
						state.videoUrl=state.aboutUsData.loadLink[state.aboutUsData.showVideo]
						console.log(state.aboutUsData)
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
					}
				}).catch(err=>{
					uni.showToast({
						title:'数据错误',
						icon:'none'
					})
				})
			}
			// 我们的历程
			const ourCourse=()=>{
				course({}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						state.courseData=res.data.object
						console.log(state.courseData)
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
			onLoad(()=> {
				aboutOur()
				ourCourse()
			})
			return {
				...toRefs(state),
				uTabs,
				back,
				tabsChange,
				transition,
				animationfinish
			}
		}
	}
</script>

<style scoped>
	.about{
		display: flex;
		flex-direction: column;
		height: 100vh;
	}
	.wrap{
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	.swiper-box{
		flex: 1;
		padding: 0 30rpx;
	}
	.swiper-item{
		height: 100%;
	}
	.tripItem {
		padding: 0px 5px;
		box-sizing: border-box;
		background:rgba(255,255,255,1);
	}
	.title {
		font-size:16px;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:600;
		line-height: 16px;
		margin-bottom: 10px;
		color:#86B0D4;
	}
	.tips {
		font-size:14px;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		line-height: 20px;
		color: #333333;
	}
	.video{
		width: 100%;
	}
</style>
