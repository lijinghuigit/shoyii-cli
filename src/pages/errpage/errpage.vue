<template>
	<!-- 页面上推 -->
	<view class="all">
		<view class="header">
			<text>我是header</text>
		</view>
		<scroll-view enable-flex class="section" :scroll-into-view="chatIndex"  :scroll-with-animation="true" :scroll-y="true" upper-threshold="50">
			<view class="section-item" :style="{paddingBottom:scrollHeight+'px'}">
				<view v-for="(item,index) in datalist" :key='index' :id="'chatIndex'+item.id" style="padding: 100rpx 0;border: 1px solid red;">
					<text>{{item.text}}</text>
				</view>
			</view>
		</scroll-view>
		<view class="footer">
			  <view style="padding: 30rpx 0;background-color: #07C160;" class='sendBtn' @click="lift">
				<text>抬升</text>
			  </view> 
			<view class="emjio" :class="{displaynone:boolean}" style="padding:100px 0;background-color: #007AFF;">
			</view>
		</view>	
	</view>
	
</template>

<script>

	
	export default {
		data() {
			return{
				datalist:[
					{text:1,id:0},{text:2,id:1},{text:3,id:2},
					{text:4,id:3},{text:5,id:4},{text:6,id:5},
					{text:7,id:6},{text:8,id:7},{text:9,id:8},
				],
				scrollHeight:60,
				boolean:true,
				chatIndex:'',
			}
		},
		methods:{
			lift(){
				this.boolean=!this.boolean
				setTimeout(()=>{
					this.getheight()
				},300)
			},
			pagebottom(){
				this.chatIndex=''
				let lastIndex = this.datalist.length - 1
				if(lastIndex < 0) return;
				this.$nextTick(function(){
					this.chatIndex = 'chatIndex'+this.datalist[lastIndex].id
				})
				console.log(this.chatIndex)
			},
			getheight(){
				let _this = this;
				uni.getSystemInfo({
					success(res) {
						let titleH=uni.createSelectorQuery().select(".footer"); //想要获取的高度的元素名（class/id）
						titleH.boundingClientRect(data=>{//添加节点的布局位置的查询请求
							console.log(data)
							_this.scrollHeight=data.height  //计算高度：元素高度=窗口高度-元素距离顶部的距离（data.top）
							_this.pagebottom()
						}).exec()
					}
				})
			},
		},
		onLoad() {
			setTimeout(()=>{
				this.pagebottom()
			},300)
		},	
	}
</script>

<style lang="scss" scoped>
	page{
		width: 100%;
		height: 100%;
	}
	.all{
		width: 100%;
		/* #ifdef H5 */
		height: 100%;
		/* #endif */
		/* #ifndef H5 */
		height: 100vh;
		// height: 100%;
		/* #endif */
		display: flex;
		flex-direction: column;
	}
	.section{
		overflow: auto;
		height: 100%;
		width: 100%; 
		flex: 1;
	}
	.footer{
		padding: 10rpx 0 20rpx;
		background-color: #fff;
		width: 100%;
		position: fixed;
		bottom: 0;
		z-index: 100;
			.sendBtn{
				width: 120rpx;
				height: 70rpx;
				margin-left: 20rpx;
				border-radius: 36rpx;
				background-color: #7DCCEC;
				color: #FFFFFF;
				display: flex;
				align-items: center;
				justify-content: center;
			}
	}
	.displaynone{
		display: none;
	}
</style>
