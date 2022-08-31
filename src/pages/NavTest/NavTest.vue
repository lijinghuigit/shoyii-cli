<template>
	<view>
		<view class="status-contents">  
		    <view class="status top-view"></view>  
			<view class="title" style="height: 88px;background-color: #007AFF;">
				<text>我是导航栏啊</text>
			</view>
		</view>
		<view class="">
			<!-- <scroll-view scroll-y="true" class="scroll"> -->
			<view class="scroll">
				<view class="test" style="">
					
				</view>
				<view class="test" style="">
					
				</view>
				<view class="test" style="">
					
				</view>
			</view>
			<!-- </scroll-view> -->
		</view>
		<view class="footer">
			<text>底部数据测试</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped> 
	.status-contents{  
	    height: calc(var(--status-bar-height) + 88px);  
	}  
	.top-view{  
	    width: 100%;  
	    position: fixed;  
	    top:0;  
	}  
	.status{  
	    height:var(--status-bar-height);  
	}
	.title{
		 width: 100%;  
		 position: fixed;  
		 top: var(--status-bar-height);  
	}
	.scroll{
		height: calc(100vh - 110rpx - var(--status-bar-height) - 88px);
		overflow: auto;
	}
	.test{
		height: 300px;border: 2px solid red;
	}
	.footer{
		width: 100%;
		position: fixed;
		bottom: 0;
		height: 110rpx;
		line-height: 110rpx;
		text-align: center;
		background-color: #07C160;
	}
</style>
