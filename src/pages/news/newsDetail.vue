<template>
	<view class="box" :data-theme='themeType'>
		<!-- #ifdef H5 -->	
		<!-- <open-app :newsId='newid'></open-app> -->
		<open-miniparam :newsId='newid'></open-miniparam>
		<!-- #endif -->
		<view class="content sy_block">
			<u-parse :html="newsDetail.text"></u-parse>
		</view>
		<!-- #ifdef APP-PLUS -->
		<view class="ad-view">
		    <ad adpid="1627128007"></ad>
		</view>
		 <!-- #endif -->
		<wechat-share ref='sonWechatShare' @shareWeixin='shareWeixin' @shareFriend='shareFriend' @shareQq='shareQq' @cancelshare='cancelshare'></wechat-share>
		<!-- #ifdef H5 -->
		 <!-- h5广告 vue3不支持-->
		<!-- <view class="ad-view">
		    <ad adpid="1250017270"></ad>
		</view>	 -->
		 <!-- #endif -->
	</view>
</template>
<script>
	import mixin from '@/mixin/mixin.js'
	export default {
		mixins:[mixin],
		data() {
			return {
				newsDetail:'',
				newid:'',
			}
		},
		methods: {
			shareWeixin(){
				this.shareWeixinMixin()
			},
			shareFriend(){
				this.shareFriendMixin()
			},
			shareQq(){
				this.hrefQq=this.$onlineUrl+'pages/news/newsDetail'+'?id='+this.newid;
				this.shareQqMixin()
			},
			cancelshare(){
				this.$refs.sonWechatShare.close()
			}
		},
		onLoad(options) {
			console.log(options)
			this.newid=options.id
			this.shareUrl=this.$onlineUrl+'pages/news/newsDetail'+'?id='+this.newid,
			this.$myRequest({
				url:'/news/getNewsDetails',
				data:{
					newsId:options.id
				}
			}).then(res=>{
				console.log(res)
				this.newsDetail=res.data.object
				this.shareTitle=this.newsDetail.title?this.newsDetail.title:'标题'
				this.shareContent=this.newsDetail.synopsis?this.newsDetail.synopsis:'内容'
				this.surfacePic=this.newsDetail.pictureUrl?this.newsDetail.pictureUrl:'/static/image/shoyiilogo.png'
				uni.setNavigationBarTitle({
					title:res.data.object.title
				})
			}).catch(err=>{
				console.log(err)
			})
		},
		onNavigationBarButtonTap(e){
			console.log(e)
			// 分享
			if(e.type=='share'){
				this.$refs.sonWechatShare.open()
			}
		},
		// #ifdef MP-WEIXIN
		onShareAppMessage: function (res) {
		    if (res.from === 'button') {//定义了share 才是button
		      // 来自页面内转发按钮
		    }else{//menu为原生胶囊转发
				return {
				  title: this.newsDetail.title,
				  path: this.$onlineUrl+'pages/news/newsDetail'+'?id='+this.newid,
				}
			}
		},
		// #endif
		onReady() {
			this.amendNavigator()
		}
	}
</script>
<style>
	.content{
		padding: 30rpx 15rpx;
	}
	
</style>
