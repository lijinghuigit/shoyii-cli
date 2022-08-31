<template>
	<!-- 这个导航组件应用于小程序端病例列表，模型列表。修改个人信息部分 -->
	<view class="">
		<!-- 小程序胶囊的占位 -->
		<view :style="{height:statusBarHeight+44+'px'}">
		</view>
		<view class="header" :style="{height:statusBarHeight+44+'px'}" >
			<view class="statusBar" :style="{height:statusBarHeight+'px'}"></view>  <!--状态栏占位 -->
			<view class="info" :style="{height:44+'px',width:widthLength+'rpx'}">
				<u-search @search='search' @custom='search' @clear='clear' 
				:placeholder="miniObject.placeHolder=='case'?'输入病例名称':'输入分类名称'"
				 v-model="searchContent" shape="round" bg-color='#F8F8F8' placeholder-color='#666666' 
				 clearabled :show-action='false' animation></u-search>
				<view class="navItem">
					<uni-icons type="chat" color='#999' size='28' @click='help'></uni-icons>
				</view>
			</view> 
		</view> 
	</view>
</template>

<script>
	export default{
		data(){
			return{
				searchContent:'',
			}
		},
		props:{
			statusBarHeight:{//状态栏高度
				type:Number,
				default:null
			},
			widthLength:{//导航栏宽度（不包含胶囊宽度）
				type:Number,
				default:null
			},
			miniObject:{
				type:Object,
				default:()=>{
					return {}
				}
			},
			Navobject:{//导航栏内容
				type:Object,
				default:()=>{
					return{}
				}
			},
			Tabtitle:{//模型库的右侧文字
				type:String,
				default:''
			},
		},
		emits:['help','search','clear'],
		methods:{
			help(){
				this.$emit('help')
			},
			search(){
				this.$emit('search',this.searchContent)
			},
			clear(){
				this.$emit('clear')
			}
		}
	}
</script>

<style scoped>
	.header {
	   position: fixed;
	   top: 0;
	   left: 0;
	   right: 0;
	}  
	.info {  
		display: flex;
	    height: 44px;  
		padding: 0 30rpx;
		flex-direction: row;
	    justify-content: space-between;  
	    align-items: center;  
		background-color: #ffffff;
	} 
	 .navItem{
		 flex: 1; 
		 text-align: center;
	 }
	 .left{
		 font-size: 26rpx;color: #666;
	 }
	 .center{
		 font-size: 30rpx;text-align: center;font-weight: bold;
	 }
</style>
