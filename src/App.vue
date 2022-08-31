<script>
// #ifdef APP-PLUS
// 是否展示引导页
import guidePage from '@/utill/tools/guidePage.js'
// 检查版本更新
import update from '@/utill/tools/update/checkUpdate.js'
import push from '@/utill/tools/push.js'
import prelogin from '@/utill/tools/prelogin.js'
// 检测是否存在微信,qq等应用
import thirdParty from '@/utill/tools/thirdParty.js'
import getargs from '@/utill/tools/getargs.js'
// #endif
// #ifdef H5
import './common/js/iconfont.js'
// #endif
import loginStatus from '@/utill/tools/loginStatus.js'
export default { 
	globalData: {  
		preloginStatus: true,
		ifThird:{
			ifweixin:true,//是否存在第三方的数据
			ifqq:true,
		}
	},  
	onLaunch: function() {
		// #ifndef H5
		if(!uni.getStorageSync('uploadLogo')){//本地没有存储图片，就用shoyii默认的
			uni.setStorageSync('uploadLogo','/static/image/shoyiilogo.png')
		}
		// #endif
		// #ifdef H5
		uni.setStorageSync('uploadLogo','/static/image/shoyiilogo.png')
		// #endif
		// 用于判断登陆状态是否过期(检测服务端token是否过期)
		loginStatus()
		// #ifdef APP-PLUS
		guidePage()//引导页的判断
		//app关闭默认的启动 方法关闭启动图。但是这个时间不能太晚，6s 超时后依旧会主动关闭。
		if(uni.getStorageSync('first_flag')){//引导页已经展示过了
			setTimeout(()=>{
				plus.navigator.closeSplashscreen();
			},200)
		}else{
			setTimeout(()=>{//避免闪屏出来
				plus.navigator.closeSplashscreen();
			},1500)
		}
		// 检查更新
		update.checkUpdate()
		// 推送通知
		push()
		// 一键登录预登录状态
		prelogin()
		// 是否存在微信，qq等应用
		thirdParty()
		// #endif
	},
	onShow: function() {
		console.log('App Show');
		// #ifdef APP-PLUS
		getargs()
		// #endif
		// console.log(this.$store.getters['user/info'].doctorId)
		// socket 的连接，用户从后台切换前台时，进行重连，id存在，意味着已登录
		// console.log(this.$store.state.socket.is_open_socket)
		// 连接失败，且id存在，进行重连，从后台切回来的时候所做；
		if(!this.$store.state.socket.socketTask){
			if(!this.$store.state.socket.is_open_socket&&this.$store.getters['user/info'].doctorId){
				this.$store.state.socket.timerheart&&clearInterval(this.$store.state.socket.timerheart)
				this.$store.dispatch('socket/WEBSOCKET_INIT',this.$store.getters['user/info'].doctorId) //初始化，创建socket
			} 
		}
	}, 
	onHide: function() {
		// console.log('App Hide');
		// #ifdef APP-PLUS
		// plus.nativeUI.toast("树蚁医生切换到后台运行")
		// #endif
	},
	onPageNotFound (){
		uni.navigateTo({
			url:'/pages/errpage/404'
		})
	}
};
</script>
<style lang="scss">
	/* #ifndef APP-NVUE */
	page{
		background-color: #F8F8F8; 
	}
	/* #endif */
	@import '@/common/css/dark.scss';
	/* #ifndef APP-PLUS-NVUE */
	@import "./uni_modules/vk-uview-ui/index.scss";
	/* #endif */
	// vantweap组件库
	/* #ifdef MP-WEIXIN */
		// @import "@/wxcomponents/vant/dist/common/index.wxss";
	/* #endif */
	/* #ifndef APP-PLUS-NVUE */
	@import "@/common/css/iconfont.css";
	@import "@/common/css/base.css";
	/* #endif */
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
</style>
