<template>
	<view class="">
		<view class="casecontent sy_block">
			<view class="segmentedMenu casemenu sy_main" style="padding: 0 60rpx;">
				<u-tabs-swiper class='sy_main' ref="tabs" :list="items" :current='casecurrent' @change="menuClick" gutter='10' font-size='28' 
				:active-item-style="themeType=='dark'?activeDarkItemStyle:activeItemStyle" height='60' active-color='#69CDFF'
				:inactive-color="themeType=='dark'?'#ddd':''"
				:is-scroll="false"></u-tabs-swiper>
			</view>
			<view v-show="hasLogin">
				<scroll-view class="contentlist" scroll-x v-if="caselist.length==0?false:true">
					<view v-for="(item,index) in caselist" :key='item.caseHistoryId' 
					@click="enterDetail(item.caseHistoryId)" 
					class="dataList">
						<!-- #ifndef MP-WEIXIN -->
						<!-- aspectFill -->
						<u-lazy-load class='image sy_block sy_border' :image="item.previewImage" img-mode='aspectFit' height='280rpx'></u-lazy-load>
						<!-- #endif -->
						<!-- #ifdef MP-WEIXIN -->
						<image lazy-load class='image' :src="item.previewImage" mode="aspectFit"></image> 
						<!-- #endif -->
						<view class="textOne sy_title_primary">
							<text style="white-space: nowrap;">{{item.name}}</text>
						</view>
						<view class="textTwo sy_content">
							<text>病历号：</text>
							<text>{{item.caseHistoryNo}}</text>
						</view> 
					</view> 
				</scroll-view>
				<scroll-view class="contentlist" v-else scroll-left='0'>
					<u-tag text="暂无数据" mode="light" color="#ffffff" border-color='#86B0D4' bg-color='#86B0D4'/>
				</scroll-view>
			</view>
			<view class="loginStyle" v-if="!hasLogin">
				<u-tag @click="login" text="点击登录,查看更多数据" mode="light" color="#ffffff" border-color='#86B0D4' bg-color='#86B0D4'/>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data(){
			return {
				// 病例menu
				items: [
					{
						name: '我的病例'
					}, {
						name: '待确定'
					}, {
						name: '未付款',
					}
				],
				activeItemStyle:{
					color:'#000',
					fontSize:'30rpx',
				},
				activeDarkItemStyle:{
					color:'#ddd',
					fontSize:'30rpx',
				}
			}
		},
		props:{
			caselist:{
				type:Array,
				default:()=>{
					return []
				}
			},
			casecurrent:{
				type:Number,
				default:0
			},
			hasLogin:{
				type:Boolean,
				default:false
			}
		},
		emits:['menuClick','login'],
		methods:{
			enterDetail(id){
				console.log(id)
				uni.navigateTo({
					url:'/pages/caselist/caselistdetail?id='+id,
					animationType:'pop-in'
				})
			},
			login(){
				this.$emit('login')
			},
			menuClick(e){
				if(!this.hasLogin){
					uni.showToast({
						title:'未登录',
						icon:'none'
					})
					return
				}
				this.$emit('menuClick',e)
			}
		},
		mounted() {
		}
	}
</script>

<style scoped lang="scss">
	.dataList{
		margin-right: 20rpx;
		width: 256rpx!important;
		border: none!important;
		border-radius: 15rpx;
		padding-bottom: 20rpx;
		display: inline-block;
		border-radius: 10rpx;
		.image{
			width: 100%;
			height: 280rpx;
			max-height: 280rpx;
			border: 1px solid #EEEEEE;
			border-radius: 20rpx;
			background-color: #FFFFFF;
		}
		.textOne{
			margin: 20rpx 0;
			white-space:nowrap;
			overflow:hidden;
			text-overflow:ellipsis;
			text-align: left;
			/* #ifdef MP-WEIXIN */
			text-indent: 10rpx;
			/* #endif */
		}
		.textTwo{
			white-space:nowrap;
			overflow:hidden;
			text-overflow:ellipsis;
			font-size: 24rpx;
			/* #ifdef MP-WEIXIN */
			text-align: left;
			text-indent: 10rpx;
			/* #endif */
		}
	}
	.dataList uni-view{
		color: #000000;
		font-size: 28rpx;
		font-family: PingFang-SC-Regular;
		text-align: left;
	}
	.segmentedMenu{
		width: 100%;
		background-color: #FFFFFF;
		border-top-right-radius: 29rpx;
		border-top-left-radius: 29rpx;
	}
	/* 病例管理 */
	.casecontent{
		background-color: #FFFFFF;
		padding: 30rpx 18rpx;
		border-radius: 29rpx;
		.contentlist{
			white-space: nowrap;
			width: 100%;
			margin-top: 20rpx;
			text-align: center;
		}
		.casemenu{
			width: auto;
		}
		/* 登录btn */
		.loginStyle{
			text-align: center;
			padding-top: 20rpx;
		}
	}
</style>
