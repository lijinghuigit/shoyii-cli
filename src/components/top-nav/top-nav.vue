<template>
	<u-navbar :is-back="false" title=""
	:border-bottom='false'
	:background="background"
	>
		<view class="nav-slot-wrap" style="">
			<view class="nav-left" style="">
				 <uni-icons type="chat" color='#999' size="24" class="arrowLeft" @click='help'></uni-icons>
			</view>
			<view class="nav-center" style="">
				<slot></slot>
				<!-- <uni-transition :mode-class="['fade','zoom-out']" :duration=300 :show="!searchShow">
					<view class="searchInput" @click="search" style="background-color: #FFFFFF;">
						<u-search placeholder="输入方法库相关信息" :disabled='true' placeholder-color='#999' :show-action="false" shape="round" search-icon-color='#999' color='#f8f8f8' bg-color='#ffffff' border-color='#EEEEEE' height='64'></u-search>
					</view>
				</uni-transition> -->
			</view>
			<view class="nav-right" style="" @click="clearUp()" v-if="modelBool">
				{{tabTitle}}
			</view>
			<view class="nav-section nav-right" style="" @click="notice()" v-if="surgicalBool">
				<text class="iconfont iconxiaoxi" @click="notice"></text>
			</view>
		</view>
	</u-navbar>
</template>

<script>
	import {reactive,toRefs} from 'vue'
	export default{
		props:{
			tabTitle:{
				type:String,
				default:'',
			},
			modelBool:{//模型库右侧
				type:Boolean,
				default:false
			},
			surgicalBool:{//方法库右侧
				type:Boolean,
				default:false
			},
			searchShow:{// 方法库搜索框
				type:Boolean,
				default:false
			}
		},
		emits:['help','clearUp','notice'],
		setup(props, { emit }){
			// const {tabTitle}=toRefs(props)
			// console.log(tabTitle.value)
			let state=reactive({
				background:{
					backgroundColor:'#fff'
				}
			})
			const clearUp=()=>{
				emit('clearUp')
			}
			const help=()=>{
				emit('help')
			}
			const notice=()=>{
				emit('notice')
			}
			return {
				...toRefs(state),
				clearUp,
				help,
				notice
			}
		}
	}
</script>

<style scoped lang="scss">
	.nav-slot-wrap{
		width: 100%;padding: 0 30rpx;display: flex;justify-content: center;align-items: center;
		.nav-left{
			text-align: left;
			padding-right: 20rpx;
		}
		.nav-center{
			text-align: center;font-size: 30rpx;font-weight: bold;
			flex: 1;
		}
		.nav-right{
			text-align: right;font-size: 28rpx;padding-left: 20rpx;
		}
		.iconxiaoxi{
			font-size:34rpx;
		}
	}
</style>
