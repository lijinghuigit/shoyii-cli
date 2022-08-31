// import {mapMutations} from 'vuex';
const myMixin = {
	data(){
		return {
			shareUrl:'',//3js与页面统一的路径,或分享的3js和整个病例的url
			surfacePic:uni.getStorageSync('uploadLogo'),//分享的封面图
			shareTitle:'标题',
			shareContent:'介绍',
			hrefQq:'',//qq分享链接
		}
	},
  methods: {
 //    ...mapMutations({
	// 	setUserInfor:'user/login'
	// }),
	// loginSuccess(result){
	// 	console.log(result)
	// 	this.setUserInfor(result)
	// }
	shareWeixinMixin(){
		// console.log(this.shareTitle,this.shareUrl,this.shareContent,this.surfacePic)
		uni.share({
			provider:'weixin',
			title:this.shareTitle,
			type:0,
			href: this.shareUrl,
			summary:this.shareContent,
			scene:'WXSceneSession',
			imageUrl: this.surfacePic,
			success(e) {
				uni.showToast({
					title:'分享成功',
					icon:'none'
				})
				console.log(e)
			},
			fail(e) {
				uni.showToast({
					title:'分享失败',
					icon:'none'
				})
				console.log(e)
			}
		})
	},
	shareFriendMixin(){
		// console.log(this.shareTitle,this.shareUrl,this.shareContent,this.surfacePic)
		uni.share({
			provider:'weixin',
			title:this.shareTitle,
			type:0,
			href: this.shareUrl,
			summary:this.shareContent,
			scene:'WXSceneTimeline',
			imageUrl: this.surfacePic,
			success(e) {
				uni.showToast({
					title:'分享成功',
					icon:'none'
				})
				console.log(e)
			},
			fail(e) {
				uni.showToast({
					title:'分享失败',
					icon:'none'
				})
			}
		})
	},
	shareQqMixin(){
		// console.log(this.shareTitle,this.hrefQq,this.shareContent,this.surfacePic)
		uni.share({
			provider:'qq',
			type:'2',
			title:this.shareTitle,
			imageUrl:this.surfacePic,
			href:this.hrefQq,
			summary:this.shareContent,
			success(e) {
				uni.showToast({
					title:'分享成功',
					icon:'none'
				})
				console.log(e)
			},
			fail(e) {
				uni.showToast({
					title:'分享失败',
					icon:'none'
				})
				console.log(e)
			}
		})
	}
  }
}
export default myMixin