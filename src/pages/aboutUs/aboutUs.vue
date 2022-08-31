<template>
	<!-- <view class=""> -->
		<!-- <uni-combox label="所在城市" :candidates="candidates" placeholder="请选择所在城市" v-model="city"
		></uni-combox> -->
		<!-- flex布局横向滚动 -->
		<!-- <view style="width: 100%; display: flex;
		    overflow-x: auto;" >
				<view v-for="(item,index) in 9" :key='index' style="width: 130px;height: 44px;line-height: 44px;
				background-color: #07C160;padding: 0 20rpx;text-align: center;white-space: nowrap; flex-shrink: 0;
		">A</view>
		</view> -->
		<!-- <scroll-view scroll-x style="white-space: nowrap;width: 100%;">
			<view style="display: inline-block;" v-for="(items,indexs) in 4" :key='indexs'>
				<view v-for="(item,index) in 5" :key='index' style="
					width: 130px;height: 44px;line-height: 44px;
					background-color: #07C160;
				">A</view>
			</view>
		</scroll-view> -->	
		<!-- <view class="" @click="aaa" style="height: 100px;background-color: aqua;">
			<text>asaadsaad</text>
		</view> -->
		<!-- <u-sticky> -->
			<!-- <view class="openApps">
				<view class="openLeft">
					<image class='image' src="/static/image/shoyiilogo.png" mode=""></image>
					<text class="text">树蚁医疗</text>
				</view>
				<view class="">
					<u-button v-if="wechatAuthorize" type="success" shape="square" size="mini" @click='openApp'>立即打开</u-button>
					<view class="">
						<wx-open-launch-app
						  id="launch-btn"
						  appid="wxdbe07c2bfb651890"
						  :extinfo="extinfo"
						  @ready='ready'
						  @launch='launch'
						  @error='error'
						>
							<script type="text/wxtag-template">
								<style>.btn {color: #FFFFFF;background-color: #19be6b;box-sizing: border-box;
								text-align: center;padding: 4px 12px;border: none;border-radius: 4px;
								width: 200rpx;font-size: 16px;}</style>
								<button class="btn" >App内查看</button>
							</script>
						</wx-open-launch-app>
					</view>
					
				</view>
			</view> -->
		<!-- </u-sticky> -->
		<!-- <view class="" style="position: fixed;bottom: 80rpx;left: 0;right: 0;z-index: 100;text-align: center;"> -->
			<!-- <u-button shape="square" type="success" size="mini" :custom-style="customStyle">APP内打开</u-button> -->
		<!-- 	<wx-open-launch-weapp
			  id="launch-btn"
			  username="gh_088556d792b9"
			  :path="minipath"
			  @ready='ready'
			  @launch='launch'
			  @error='error'
			>
			 <script type="text/wxtag-template">
			    <style>.wxbtn {color: #FFFFFF;background-color: #19be6b;box-sizing: border-box;
			    text-align: center;padding: 6px 16px;border: none;border-radius: 20px;
			    width: 200rpx;font-size: 16px;}</style>
			    <button class="wxbtn">小程序内打开</button>
			  </script>
			</wx-open-launch-weapp>
		</view> -->
		
		<!-- ------------------------------------------------------- -->
		<!-- <button type="default" @click="Alipayment">支付宝支付</button>
		<button type="default" @click="enterChat">进入微信客服</button> -->
		<!-- #ifdef MP-WEIXIN -->
		<!-- <button type="default" @click="getfail">获取发票信息</button>
		<button type="default" @click="selectfail">选择用户已有的发票</button> -->
		<!-- <button type="default" @click="getmDNS">搜索局域网下的 mDNS 服务</button> -->
		<!-- <button type="default" @click="searchbool">搜索蓝牙</button> -->
		<!-- #endif -->
		<!-- <button type="default" @click="downloadwgt">wgt下载</button>
		<button type="default" @click="getcache">获取缓存</button>
		<button type="default" @click="clern">清除缓存</button>
		<view @click="wechatLogin">微信登录</view>
		<view @click="loginout">退出登录</view>
		<button type="default" @click="webpayment">Native支付</button>
		<button type="default" @click="HFivement">H5支付</button>
		<button type="default" @click='create'>生成二维码</button>
		<button type="default" @click="Alinativepayment">支付宝native支付</button>
		<button type="default" @click="asyncTest">同步测试</button>
		<button type="default" @click="asyncPay">支付同步测试</button>
		<view class="" style="text-align: center;"> -->
			<!-- <tki-qrcode
			cid="qrcode1" 
			ref="qrcode" 
			:val="val" 
			:size="sizes" 
			:unit="unit" 
			:background="backgrounds" 
			:foreground="foreground" 
			:pdground="pdground" 
			:icon="icon" 
			:iconSize="iconsize" 
			:lv="lv" :onval="onval" 
			:loadMake="loadMake" 
			:usingComponents="true"
			@result="qrR" /> -->
			<!-- <tki-qrcode
			cid="qrcode1" 
			ref="qrcode" 
			:val="val" 
			:size="sizes" 
			:unit="unit" 
			:icon="icon"
			:onval=true 
			:loadMake="loadMake" 
			:usingComponents="true"
			@result="qrR" />
		</view>
		<button type="default" @click="checkOrder">查询订单</button>
		<button @click="retireTotal">退款</button>
		<button type="default" @click="downloadnotify">下载文件</button>
		<button type="default" @click="shareCard">分享卡片</button> -->
	<!-- </view> -->
	<!-- <view class="aboutUs"> -->
		<!-- <button type="default" @click="payment">支付</button> -->
		<!-- <button type="default" @click="download">下载文件</button> -->
	<!-- 	<button type="default" @click="cancel">取消</button>
		<button type="default" @click="open">打开文件</button> -->
		<!-- <view class="">
			<u-upload :file-list="fileList" :action="action" name='files' :before-upload="beforeUpload" :header='header' max-count="3" @on-error="onErrors" @on-change="onChange" @on-success="onSuccess" :on-uploaded="onUploaded" upload-text='上传图片'></u-upload>
		</view> -->
		
		<!-- <view class="header">
			<text>header</text>
		</view>
		<view class="content">
			<view style="height: 500px;background-color: red;">
				<text>content1</text>
			</view>
			<view style="height: 500px;background-color: red;">
				<text>content2</text>
			</view>
		</view>
		<view class="footer">
			<text>footer</text>
		</view> -->
		
	<!-- </view> -->
	<!-- <view class="all">
		<view class="header">
			<u-dropdown>
				<u-dropdown-item v-model="value1" title="距离" :options="options1"></u-dropdown-item>
				<u-dropdown-item v-model="value2" title="温度" :options="options2"></u-dropdown-item>
			</u-dropdown>
		</view>
		<view class="section">
			<view class="item">
				<text>section</text>
			</view>
			<view class="item">
				<text>section</text>
			</view>
			<view class="item">
				<text>section</text>
			</view>
			<view class="item">
				<text>section</text>
			</view>
		</view>

	</view> -->
	<!-- <view class="" style="display: flex;flex-direction: column;height: 100%;"> -->
		<!-- <button @tap="test($event,'999')">test</button> -->
		<!-- <button @tap="$u.throttle(()=>testaa($event,'999'),2000)">testaa</button> -->
		<!-- <view style="width: 100%;height: 20px;" @click="test">
			<text>header</text>
		</view>
		<view class="" style="flex: 1;height: 100%;overflow: auto;"> -->
			<!-- :style="{height:scrollHeight+'px'}" -->
			<!-- <scroll-view scroll-y="true" class="scrollContent" style="height: 100%;max-height: 100%;"
			@scrolltolower='toupper'>
				<view class="item">
					<text>section</text>
				</view>
				<view class="item">
					<text>section</text>
				</view>
				<view class="item">
					<text>section</text>
				</view>
				<view class="item">
					<text>section</text>
				</view>
			</scroll-view>
		</view>
		<view class="" style="height: 20px;">
			<text>footer</text>
		</view>
	</view> -->
	<!-- <view class="">
		<u-index-list :scrollTop="scrollTop" @select='select'>
			<view v-for="(item, index) in indexList" :key="index">
				<u-index-anchor :index="item.alphaMark" />
				<view class="list-cell">
					列表1
				</view>
				<view class="list-cell">
					列表2
				</view>
				<view class="list-cell">
					列表3
				</view>
			</view>
		</u-index-list>
	</view> -->
	<view class="">
		<!-- <canvas style="width: 300px; height: 400px;" canvas-id="firstCanvas" id="firstCanvas"  @error="canvasIdErrorCallback"></canvas> -->
		<uni-combox label="所在城市" :candidates="candidates" placeholder="请选择所在城市" v-model="city"
		></uni-combox>
	</view>
</template>

<script>
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	import NotifiUtil from '@/js_sdk/swfq-notification-progress/notification/notification.js'
	import {getInfor} from '@/utill/api/personalInfor/getInfor.js'
	import {getOpenid} from '@/utill/api/order/order.js'
	// #ifdef H5
	// var wx = require('jweixin-module')
	// console.log(wx)
	// #endif
	import candidates from  "@/mock/hospital.json"
	export default {
		components:{
			tkiQrcode
		},
		data() {
			return {
				candidates:candidates,//candidates
				city: '',
				// 随意填充一些模拟数据，以撑开元素，供骨架组件查询和模拟块状数据
				userInfo: {
					avatarUrl: 'https://qlogo2.store.qq.com/qzone/1416956117/1416956117/100?1531323520',
					nickName: 'uView'
				},
				lists: [
					'君不见，黄河之水天上来，奔流到海不复回。君不见，高堂明镜悲白发，朝如青丝暮成雪。',
					'人生得意须尽欢，莫使金樽空对月',
					'天生我材必有用，千金散尽还复来',
				],
				loading: true, // 是否显示骨架屏组件
				customStyle:{
					paddingTop:'20rpx',
					paddingBottom:"20rpx",
					borderRadius:'20rpx',
				},
				minipath:'',
				Orderno:'',
				scrollTop: 0,
				// indexList: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U",
				// 	"V", "W", "X", "Y", "Z"
				// ],
				indexList:[
					{alphaMark:"A"},{alphaMark:"B"},{alphaMark:"C"},{alphaMark:"D"},
					{alphaMark:"E"},{alphaMark:"F"},{alphaMark:"G"},{alphaMark:"H"},
					{alphaMark:"I"},{alphaMark:"J"},{alphaMark:"K"},{alphaMark:"L"},
					{alphaMark:"M"},{alphaMark:"N"},{alphaMark:"O"},{alphaMark:"P"},
					{alphaMark:"Q"},{alphaMark:"R"},{alphaMark:"S"},{alphaMark:"T"},
					{alphaMark:"U"},{alphaMark:"V"},{alphaMark:"W"},{alphaMark:"X"},
					{alphaMark:"Y"},{alphaMark:"Z"}
				],
				value1: 1,
				value2: 2,
				options1: [{
						label: '默认排序',
						value: 1,
					},
					{
						label: '距离优先',
						value: 2,
					},
					{
						label: '价格优先',
						value: 3,
					}
				],
				options2: [{
						label: '去冰',
						value: 1,
					},
					{
						label: '加冰',
						value: 2,
					},
				],			
				url:'',
				aboutData:{},
				downloadTask:'',
				action:'http://192.168.31.141:8083/fileHandle/uploadSTLPicture',
				header:{
					 "token":this.$store.getters['user/info'].token
				},
				fileList:[],
				scrollHeight:0,
				serviceList:[],
				// 二维码
				val: '无效码，请重新生成', // 要生成的二维码值
				sizes: 200, // 二维码大小
				unit: 'px', // 单位
				backgrounds: '#000000', // 背景色
				foreground: '#ffffff', // 前景色
				pdground: '#86B0D4', // 角标色
				icon: '/static/image/shoyiilogo.png', // 二维码图标
				iconsize: 80, // 二维码图标大小
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: false, // val值变化时自动重新生成二维码
				loadMake: false, // 组件加载完成后自动生成二维码
				src: '', // 二维码生成后的图片地址或base64
				address:'',
				code:'',
				wechatAuthorize:true,//在微信端是否显示立即打开功能,默认是展示
				extinfo:{},//传递的数据
				newsid:163
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods: {
			canvasIdErrorCallback: function (e) {
				console.error(e.detail.errMsg)
			},
			test(){
				uni.report('title','首页')
			},
			// testaa(e,number){
			// 	console.log('test',e,number)
			// },
			// test(e,number){
			// 	this.$u.debounce(()=>this.ccc(e,number),500) //ok
			// }, 
			// loadash函数
			// test:_.throttle(function(e,number){
			// 	this.ccc(e,number)
			// },2000), 
			// 自定义函数
			// ccc(e,number){
			// 	console.log('test',e,number)
			// },
			toupper(e){
				console.log('ee')
			},
			gethospital(){
				uni.request({
				    // url: 'https://shoyii-open-1258143571.cos.ap-guangzhou.myqcloud.com/dev/hospitalNameList.json',
					url:'/proxy-hostpital/dev/hospitalNameList.json'
					// url:'/proxy-ju/simpleWeather/query?key=ee5196d94da3c6db148fd58239357e8a',
					// data:{
					// 	city:'广州'
					// }
				}).then((res) => { 
					console.log(res)
				}).catch((err) => {
					// 此处的 err 参数，与使用默认方式调用时 fail 回调中的 err 参数一致
					console.log(err)
				})
			},
			aaa(){
				// 通过 id 获取 nvue 子窗体
				const subNVue = uni.getSubNVueById('video')
				console.log(subNVue)
				// 打开 nvue 子窗体  
				subNVue.show('slide-in-left', 300, function(){  
				    // 打开后进行一些操作...  
				    //   nuj
					console.log('show')
				}); 
			},
			// 选中某个单选框时，由radio时触发
					radioChange(e) {
						// console.log(e);
					},
					// 选中任一radio时，由radio-group触发
					radioGroupChange(e) {
						// console.log(e);
					},
			shareCard(){
				uni.share({
					provider:'weixin',
					title:'网页端启动app',
					type:0,
					href: 'https://mobile.shoyii.com/#/pages/aboutus/aboutus',
					summary:'微信端打开APP',
					scene:'WXSceneSession',
					imageUrl: '/static/image/shoyiilogo.png',
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
			ready(e){ //这个执行后，标签才能展示
				console.log(e)
				alert(1)
				// this.wechatAuthorize=false
			},
			launch(e){
				console.log(e)
				alert(2,e)
			},
			error(e){
				console.log(e)
				alert(3)
				// this.wechatAuthorize=false
			},
			openApp(){
				uni.showToast({
					title:'非微信端按钮',
					icon:'none'
				})
			},
			wechatApp(){
				uni.request({
					url: 'https://wxgzh.shoyii.com/newsdetail',
					// url: 'http://xusrhc.natappfree.cc/newsdetail',
					method: 'GET',
					data: {
						url:'/pages/aboutus/aboutus'
					},
					success: res => {
						// console.log(res)
						// wx.config({
						// 	debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印
						// 	appId: 'wxa3dc77fda65fd3cc', // 必填，公众号的唯一标识
						// 	timestamp:res.data.timestamp , // 必填，生成签名的时间戳
						// 	nonceStr: res.data.noncestr, // 必填，生成签名的随机串
						// 	signature: res.data.signature,// 必填，签名
						// 	jsApiList: ["onMenuShareAppMessage", "onMenuShareTimeline"], // 必填，需要使用的JS接口列表
						// 	openTagList: ['wx-open-launch-app'] // 可选
						// });
						// this.extinfo=`?newsId=${this.newsid}`
						// wx.ready((e)=>{
						// 	console.log(e)
						// 	wx.checkJsApi({
						// 		jsApiList: [
						// 		'onMenuShareTimeline',
						// 		'onMenuShareAppMessage',], // 需要检测的JS接口列表
						// 		success: (res)=> {
						// 		// 以键值对的形式返回，可用的api值true，不可用为false
						// 		// 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
						// 			console.log(res)
						// 		},
						// 		fail:function(err){
						// 			console.log(err)
						// 		}
						// 	});
						// })
					},
					fail: () => {},
					complete: () => {}
				});
			},
			wechatMiniparam(){
				// var url=`/pages/surgicalData/surgicalDetail?id=${413}`
				var url=`/pages/aboutUs/aboutUs`
				// this.minipath=`?id=${413}`
				this.minipath=`pages/aboutUs/aboutUs`
				uni.request({
					url: 'https://wxgzh.shoyii.com/newsdetail',
					// url: 'http://xusrhc.natappfree.cc/newsdetail',
					method: 'GET',
					data: {
						url:url
					},
					success: res => {
						// console.log(res)
						// wx.config({
						// 	debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印
						// 	appId: 'wxa3dc77fda65fd3cc', // 必填，公众号的唯一标识
						// 	timestamp:res.data.timestamp , // 必填，生成签名的时间戳
						// 	nonceStr: res.data.noncestr, // 必填，生成签名的随机串
						// 	signature: res.data.signature,// 必填，签名
						// 	jsApiList: ["onMenuShareAppMessage", "onMenuShareTimeline"], // 必填，需要使用的JS接口列表
						// 	openTagList: ['wx-open-launch-weapp'] // 可选
						// });
						
						// wx.ready((e)=>{
						// 	console.log(e)
						// })
					},
					fail: () => {},
					complete: () => {}
				});
			},
			async asyncPay(){
				const res=await this.miniOpenid()
				console.log(res)
				if(res.data.code==0){
					console.log(res.data.object)
				}else{
					uni.showToast({
						title:res.data.msg,
						icon:'none'
					})
				}
			},
			miniOpenid(){
				// 同步wx.login
				return new Promise((reslove,reject) => {
				    uni.login({
						success: async (res)=> {
							console.log(res.code)
							let data = await getOpenid({
								jsCode:res.code
							})
							reslove(data);
						},
						fail:(err)=>{
							reject(err)	
						}
				    })
				})
			},
			// 接口同步测试
			async asyncTest(){
				let data=await getInfor({})
				console.log(data)
				this.address=data.data.object.address
				getInfor({}).then(res=>{
					console.log(this.address)
					console.log(res)
				})
			},
			// 进入微信客服
			enterChat(){
				var sweixin = null; 
				//需调用plus.share.getServices获取微信分享服务对象
				plus.share.getServices(function(res){
					var sweixin = null;  
					for(var i=0;i<res.length;i++){  
						var t = res[i];  
						if(t.id == 'weixin'){  
							sweixin = t;  
						}  
					}  
					console.log(sweixin)
					sweixin?sweixin.openCustomerServiceChat({
							corpid:'ww3c862994b46ac04a', //微信客服ID,是微信小程序的原始ID（"g_"开头的字符串）。
							url:'https://work.weixin.qq.com/kfid/kfc07321f0b00f3d24a',//微信客服的页面路径
					},res=>console.log(res),err=>console.login(err)):plus.nativeUI.alert('当前环境不支持微信操作!');
				},function(res){  
					console.log(res)
					console.log(JSON.stringify(res));  
				});
			},
			// 退款
			retireTotal(){
				uni.getSystemInfo({  //获取状态栏高度
					success: function(res) {  
						console.log(res);  
					}  
				});
				plus.device.getInfo({
					success:function(e){
						console.log('getDeviceInfo success: '+JSON.stringify(e));
					},
					fail:function(e){
						console.log('getDeviceInfo failed: '+JSON.stringify(e));
					}
				});
				return
				// uniCloud.callFunction({ //查询退款订单交易
				// 	name:"refundQuery",
				// 	data:{
				// 		// #ifdef MP-WEIXIN
				// 		plateForm:'miniparamWeixin',
				// 		// #endif
				// 		// #ifdef APP-PLUS
				// 		plateForm:'appWeixin',
				// 		// #endif
				// 		outTradeNo:'20210712165219568403046Bhvr',//商户订单号
				// 		outRefundNo:'4Af3gFDQ8NNfhzqkeIAwqgDAksKk', // 支付宝必填，退款订单号
				// 	},
				// 	success(res) {
				// 		console.log(res)
				// 	},
				// 	fail(err) {
				// 		console.log(err)
				// 	}
				// })
				// return;
				var outRefundNo=this.randomStr(28)
				uniCloud.callFunction({
					name:'refund',
					data:{
						// #ifdef MP-WEIXIN
						plateForm:'miniparamWeixin',
						// #endif
						// #ifdef APP-PLUS
						plateForm:'appWeixin',
						// #endif
						outTradeNo:'CPEdhJWR47re0Jn3PfxqT604P0rG',//商户订单号
						outRefundNo: outRefundNo, // 商户退款单号，支付宝可不填此项
						totalFee: 1, // 订单总金额，支付宝可不填此项
						refundFee: 1, // 退款总金额
					},
					success(res) {
						console.log(res)
						uniCloud.callFunction({ //查询退款订单交易
							name:"refundQuery",
							data:{
								// #ifdef MP-WEIXIN
								plateForm:'miniparamWeixin',
								// #endif
								// #ifdef APP-PLUS
								plateForm:'appWeixin',
								// #endif
								outTradeNo:'CPEdhJWR47re0Jn3PfxqT604P0rG',//商户订单号
								outRefundNo:outRefundNo, // 支付宝必填，退款订单号
							},
							success(res) {
								console.log(res)
							},
							fail(err) {
								console.log(err)
							}
						})
					},
					fail(err) {
						console.log(err)
					}
				})
			},
			loginout(){
				plus.oauth.getServices(function(services){
					console.log(services)
					if(services.length!=0){
						services.forEach(item=>{
							if(item.id=='weixin'){
								item.logout(function(e){
									console.log(e)
								}, function(e){
									console.log(e)
								});
							}
						})
					}
				})
			},
			wechatLogin(){
				var aweixin=null;
					// // 当前环境支持的所有授权登录对象
					// var auths = {};
					// // 获取登录授权认证服务列表，单独保存微信登录授权对象
					// // 5+APP在plusready事件中调用，uni-app在vue页面的onLoad中调用
					var _this=this
					plus.oauth.getServices(function(services){
						console.log(services)
						services.forEach((item)=>{
							if(item.id=='weixin'){
								aweixin = item;
							}
						})
						if(!aweixin){//没有取得微信登陆的服务
							uni.showToast({
								title:'当前环境不支持微信登录',
								icon:'none'
							})
							return;
						}
						if(!aweixin.authResult){//是否登录认证过
							aweixin.authorize((e)=>{
								aweixin.login(function(e){
									console.log(e)
								}, function(e){
									plus.nativeUI.alert("登录认证失败: "+JSON.stringify(e));
								} );
								return;
								
								// 调取后端登录接口
								
							},(e)=>{
								console.log(JSON.stringify(e))
								uni.showToast({
									title:'用户取消授权',
									icon:'none'
								})
							},{scope:'snsapi_userinfo',state:'authorize',appid:'wxdbe07c2bfb651890'})
							// ios 需要添加以上参数，否则会走authorize的错误回调，Android目前不受影响
						}else{
							console.log('已经登录过了')
							uni.showToast({
								title:'请使用其他登录方式',
								icon:'none'
							})
							aweixin.getUserInfo(function(e){
								console.log(e.target.userInfo)
							},function(err){
								console.log(err)
							})
						}
					}, function(e){
						console.log(e)
						uni.showToast({
							title:'获取登录授权服务列表失败',
							icon:'none'
						})
						} );
					// 通常登录前需要先调用authorize方法进行授权
			},
			// 获取缓存
			getcache(){
				console.log(plus.os.name)
				let that = this;
				plus.cache.calculate(function(size) {
					console.log(size)
					let sizeCache = parseInt(size);
					if (sizeCache == 0) {
						that.fileSizeString = "0B";
					} else if (sizeCache < 1024) {
						that.fileSizeString = sizeCache + "B";
					} else if (sizeCache < 1048576) {
						that.fileSizeString = (sizeCache / 1024).toFixed(2) + "KB";
					} else if (sizeCache < 1073741824) {
						that.fileSizeString = (sizeCache / 1048576).toFixed(2) + "MB";
					} else {
						that.fileSizeString = (sizeCache / 1073741824).toFixed(2) + "GB";
					}
					console.log(that.fileSizeString)
				});
			},
			// 清除缓存
			clern() {
				let that = this
				uni.showModal({
					title: '清除缓存',
					content: '您确定要清除缓存吗？',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							that.clearCache() 
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			// 清理缓存
			clearCache() {
				let that = this;
				let os = plus.os.name;
				if (os == 'Android') {
					let main = plus.android.runtimeMainActivity();
					let sdRoot = main.getCacheDir();
					let files = plus.android.invoke(sdRoot, "listFiles");
					console.log(files)
					let len = files.length;
					console.log(len)
					for (let i = 0; i < len; i++) {
						let filePath = '' + files[i]; // 没有找到合适的方法获取路径，这样写可以转成文件路径  
						console.log(filePath)
						plus.io.resolveLocalFileSystemURL(filePath, function(entry) {
							console.log(entry)
							if (entry.isDirectory) {
								entry.removeRecursively(function(entry) { //递归删除其下的所有文件及子目录  
									uni.showToast({
										title: '缓存清理完成',
										duration: 2000
									});
									that.formatSize(); // 重新计算缓存  
								}, function(e) {
									console.log(e.message)
								});
							} else {
								entry.remove();
							}
						}, function(e) {
							console.log('文件路径读取失败')
						});
					}
				} else { // ios  
					plus.cache.clear(function() {
						uni.showToast({
							title: '缓存清理完成',
							duration: 2000
						});
						that.formatSize();
					});
				}
			},
			downloadwgt(){
					var url='http://192.168.31.223:9000/shoyii-open-1258143571/test/__UNI__AF91735.wgt'	
					var showLoading = plus.nativeUI.showWaiting("正在下载,请稍后...");
					const downloadTasks =
						uni.downloadFile({
							url: url,
							success: (res) => {
								console.log(res)
								if(res.statusCode===200){
									var filePath = res.tempFilePath;
									 // 仅安装wgt和wgtu时生效，默认值 false,true表示强制安装，不进行版本号的校验；false则需要版本号校验，
									plus.runtime.install(filePath,{force: true,},(e) => {
										showLoading.setTitle("安装中...");
										plus.runtime.restart(); 
										plus.nativeUI.closeWaiting();
									},(e) => {
										showLoading.setTitle("安装失败，请尝试重新下载");
										setTimeout(()=>{
											  plus.nativeUI.closeWaiting();
										},1000)
									})
								}
								
							},
							fail:(err)=>{
								showLoading.setTitle("下载失败");
								setTimeout(()=>{
									  plus.nativeUI.closeWaiting();
								},1000)
							}
						})
						downloadTasks.onProgressUpdate((res) => {
							console.log(res)
							showLoading.setTitle("正在下载" + res.progress + "%");
							if(res.progress==100){
								console.log(res.progress)
								showLoading.setTitle("下载完成");
							}
						})
			},
			// 搜索蓝牙
			searchbool(){
				// 初始化蓝牙模块
				wx.openBluetoothAdapter({
					complete(e){
						console.log(e)
						if(e.errMsg=='openBluetoothAdapter:ok'){
							wx.startBluetoothDevicesDiscovery({
							  success (res) {
							    console.log(res)
								wx.onBluetoothDeviceFound((res)=>{
									console.log(res.devices)
									this.serviceList.push(res.devices)
									console.log(this.serviceList)
								})
							  },
							  complete(e){
								  console.log(e)
							  }
							})
						}
					}
				})
				
			},
			// 搜做mdns服务
			getmDNS(){
				wx.startLocalServiceDiscovery({
					serviceType:'_http._tcp.',
					success(e){
						console.log(e)
						wx.onLocalServiceFound((res)=>{
							console.log(res)
						})
					}
				})
				 setTimeout(() => {
					// 停止搜索服务
				      wx.stopLocalServiceDiscovery({        
					       success: (res) => {
					       	  console.log(res)
					       },
				      }) 
				    }, 5000);
			},
			getfail(){
				wx.chooseInvoiceTitle({
				  success(res) {
					  console.log(res)
				  }
				})
			},
			selectfail(){
				wx.chooseInvoice({
					success(res) {
						console.log(res)
					}
				})
			},
			select(e){
				console.log(e)
			},
			scrolltolower(){
				console.log('触底了')
			},
			markertap(e){
				console.log(e)
			},
			randomStr(length){
			  const chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			  let noceStr='';
			  let maxPos=chars.length;
			  while (length--) noceStr += chars[Math.random()*maxPos |0]
			  return noceStr
			},
			qrR(e){
				// console.log(e) //移动端是图片路径，网页是base64
				// this.src = e
			},
			create(){
				// this.val='weixin://wxpay/bizpayurl?pr=1R0TSQrzz'
				this.val='weixin://wxpay/bizpayurl?pr=jC041DOzz'
				this.$refs.qrcode._makeCode()
			},
			checkOrder(){
				console.log('123')
				// return;
				uniCloud.callFunction({//查询订单
					name: 'orderQuery',
					data:{
						// outTradeNo:this.Orderno,
						outTradeNo:'rPC30NefoVQwaxVFMaeYQjyPChwj'
					},
					success(e) {
						uni.hideLoading()
						console.log(e)
						
					},fail(err) {
						uni.hideLoading()
						console.log(err)//订单不存在， 返回值为ORDERNOTEXIST
					}
				})
			},
			// h5支付
			HFivement(){
				var outTradeNo=this.randomStr(28)
				var body='微信移动端支付'
				var totalFee=1
				var subject='副标题1'
				var openId
				uni.showLoading({
					title:'加载中'
				})
				var _this=this
				uniCloud.callFunction({
					// name: 'getmwebinfor',
					name: 'getOrderInfo',
					data:{
						plateForm:'MWEB',//H5支付
						body:body,
						outTradeNo:outTradeNo,
						totalFee:totalFee,
						sceneInfo:{
							h5_info: {
								type: "Wap",
								// wap_url: "https://www.shoyii.com/", // 开发者网站的网址
								// wap_name: "树蚁医疗" // 开发者网站名称
							}
						}
					},
					success(res) {
						console.log(res)
						if(res.result.orderInfo.returnCode=='SUCCESS'){
							console.log(res.result.orderInfo.mwebUrl)
							var h5url=res.result.orderInfo.mwebUrl+'&redirect_url='+'http%3A%2F%2Fspv35y.natappfree.cc%2F%23%2F'
							console.log(h5url)
							location.href=h5url
							uni.hideLoading()
						}
						return;
						uni.requestPayment({
							// provider: 'wxpay', // App端此参数必填，可以通过uni.getProvider获取
							orderInfo: res.result.orderInfo,
						...res.result.orderInfo,
							success(e){
								console.log('3')
								console.log(e)
								// uniCloud.callFunction({//查询订单
								// 	name: 'orderQuery',
								// 	data:{
								// 		outTradeNo:outTradeNo
								// 	},
								// 	success(e) {
								// 		uni.hideLoading()
								// 		console.log(e)
										
								// 	},fail(err) {
								// 		uni.hideLoading()
								// 		console.log(err)//订单不存在， 返回值为ORDERNOTEXIST
								// 	}
								// })
							},
							fail(err){//取消支付
								// console.log('2')
								console.log(err)
								console.log(JSON.stringify(err))
								uni.showToast({
									title:'取消支付',
									icon:'none'
								})
							}
						})
					},
					fail(err) {
						uni.hideLoading()
						console.log(err)
						uni.showToast({
							title:'err1'
						})
					}
				})
			},
			// 阿里native支付
			Alinativepayment(){
				var outTradeNo=this.randomStr(28)
				this.Orderno=outTradeNo
				var body='支付宝native支付'
				var totalFee=1
				var subject='副标题'
				var openId
				uni.showLoading({
					title:'加载中'
				})
				var _this=this
				uniCloud.callFunction({
					name: 'aliwebpay',
					data:{
						plateForm:'nativeAli',//native支付
						subject:subject,//app的副标题
						body:body,
						outTradeNo:outTradeNo,
						totalFee:totalFee,
						openid:openId
					},
					success(res) {
						uni.hideLoading()
						console.log(res)
						// console.log(res.result.orderInfo.codeUrl)
						// _this.val=res.result.orderInfo.codeUrl
						// _this.$refs.qrcode._makeCode()
					},
					fail(err) {
						uni.hideLoading()
						console.log(err)
						uni.showToast({
							title:'err1'
						})
					}
				})
			},
			// native支付
			webpayment(){
				var outTradeNo=this.randomStr(28)
				this.Orderno=outTradeNo
				var body='微信网页移动端支付'
				var totalFee=1
				var subject='副标题'
				var openId
				uni.showLoading({
					title:'加载中'
				})
				var _this=this
				uniCloud.callFunction({
					name: 'getOrderInfo',
					data:{
						plateForm:'webWxpay',//native支付
						subject:subject,//app的副标题
						body:body,
						outTradeNo:outTradeNo,
						totalFee:totalFee,
						openid:openId
					},
					success(res) {
						uni.hideLoading()
						console.log(res)
						console.log(res.result.orderInfo.codeUrl)
						_this.val=res.result.orderInfo.codeUrl
						_this.$refs.qrcode._makeCode()
						
						return;
						uni.requestPayment({
							provider: 'wxpay', // App端此参数必填，可以通过uni.getProvider获取
							orderInfo: res.result.orderInfo,
						...res.result.orderInfo,
							success(e){
								console.log('3')
								console.log(e)
								// uniCloud.callFunction({//查询订单
								// 	name: 'orderQuery',
								// 	data:{
								// 		outTradeNo:outTradeNo
								// 	},
								// 	success(e) {
								// 		uni.hideLoading()
								// 		console.log(e)
										
								// 	},fail(err) {
								// 		uni.hideLoading()
								// 		console.log(err)//订单不存在， 返回值为ORDERNOTEXIST
								// 	}
								// })
							},
							fail(err){//取消支付
								// console.log('2')
								console.log(err)
								console.log(JSON.stringify(err))
								uni.showToast({
									title:'取消支付',
									icon:'none'
								})
							}
						})
					},
					fail(err) {
						uni.hideLoading()
						console.log(err)
						uni.showToast({
							title:'err1'
						})
					}
				})
			},
			Alipayment(){
				var outTradeNo=this.randomStr(28)
				var body='支付宝支付'
				var totalFee=1
				var subject='副标题'
				var openId
				uni.showLoading({
					title:'加载中'
				})
				uniCloud.callFunction({
					name: 'getOrderInfo',
					data:{
						// #ifdef APP-PLUS
						plateForm:'appAli',//阿里支付
						subject:subject,//app的副标题
						// #endif
						body:body,
						outTradeNo:outTradeNo,
						totalFee:totalFee,
						openid:openId
					},
					success(res) {
						uni.hideLoading()
						console.log(res)
						uni.requestPayment({
							provider: 'alipay', // App端此参数必填，可以通过uni.getProvider获取
							orderInfo: res.result.orderInfo,
						...res.result.orderInfo,
							success(e){
								console.log('3')
								console.log(e)
								// uniCloud.callFunction({//查询订单
								// 	name: 'orderQuery',
								// 	data:{
								// 		outTradeNo:outTradeNo
								// 	},
								// 	success(e) {
								// 		uni.hideLoading()
								// 		console.log(e)
										
								// 	},fail(err) {
								// 		uni.hideLoading()
								// 		console.log(err)//订单不存在， 返回值为ORDERNOTEXIST
								// 	}
								// })
							},
							fail(err){//取消支付
								// console.log('2')
								console.log(err)
								console.log(JSON.stringify(err))
								uni.showToast({
									title:'取消支付',
									icon:'none'
								})
							}
						})
					},
					fail(err) {
						uni.hideLoading()
						console.log(err)
						uni.showToast({
							title:'err1'
						})
					}
				})
			},
			// 回调参数中的lists参数，为目前组件内的所有图片数组，index为当前操作的图片的索引，name为通过props传递的index参数
			beforeUpload(index, list){
				console.log(index)
				console.log(list)
			},
			onErrors(res, index, lists, name){
				console.log(res)
				console.log(index)
				console.log(lists)
				console.log(name)
			},
			onChange(res, index, lists, name){
				// res为服务器返回的信息，name为通过props传递的index参数
				console.log(res)
				console.log(index)
				console.log(lists)
				console.log(name)
			},
			onSuccess(data, index, lists, name){
				// data为服务器返回的数据，name为通过props传递的index参数
				console.log(data)
				console.log(index)
				console.log(lists)
				console.log(name)
				
			},
			onUploaded(lists, name){//所有图片上传完毕触发
				// 可以通过此事件，将lists参数获取，提交给后端使用，name为通过props传递的index参数
				console.log(lists)
				console.log(name)
			},
			
			cancel(){
				this.downloadTask.abort();
			},
			downloadnotify(){
				var url='https://app-1258143571.cos.ap-guangzhou.myqcloud.com/app/shoyii-doctor.apk'
				uni.showToast({
				    title: '下载中...',
				    icon:'none'
				});
				var appname='树蚁医疗';
				var NotificationUtil = NotifiUtil();//实例创建
				NotificationUtil.setNotification(appname, "开始下载! ");
				var dtask = plus.downloader.createDownload(url);// POST请求提交数据
				dtask.start();
				var arr = [
					{
						pro:1,
						isFirst:true
					},{
						pro:10,
						isFirst:true
					},{
						pro:30,
						isFirst:true
					},{
						pro:50,
						isFirst:true
					},{
						pro:70,
						isFirst:true
					},{
						pro:90,
						isFirst:true
					},
				]
				dtask.addEventListener( "statechanged", async function(task,status){
					console.log(task)
					console.log(status)
					switch(task.state) {
						case undefined: //下载任务未开始
						case 0: //下载任务开始调度
						case 1: //下载任务开始请求
						case 2: break; //下载任务请求已经接收
						case 3: // 已接收到数据
							// NotificationUtil.setProgress(Math.round(task.downloadedSize/task.totalSize*100),appname);//通知栏中实时更新进度条会引起操作界面卡顿：一秒执行40多次（监听函数），导致UI操作阻塞
							var pro = parseInt(task.downloadedSize/task.totalSize*100);
								// if(pro == 1 || pro == 10 || pro == 30 || pro == 50 || pro == 70 || pro == 90){//优化方案一：仅在指定整数进度时更新
								//     console.log("进度：" + pro);
								//     NotificationUtil.setProgress(pro,appname);
								// }
								switch (pro){//优化方案二：仅进度第一次出现（1,10，30，50，70，90）时刷新
									case arr[0].pro:
										if(arr[0].isFirst){
											console.log("进度：" + pro);
											NotificationUtil.setProgress(pro,appname);
											arr[0].isFirst = false;
										}
										break;
									case arr[1].pro:
										if(arr[1].isFirst){
											console.log("进度：" + pro);
											NotificationUtil.setProgress(pro,appname);
											arr[1].isFirst = false;
										}
										break;
									case arr[2].pro:
										if(arr[2].isFirst){
											console.log("进度：" + pro);
											NotificationUtil.setProgress(pro,appname);
											arr[2].isFirst = false;
										}
										break;
									case arr[3].pro:
										if(arr[3].isFirst){
											console.log("进度：" + pro);
											NotificationUtil.setProgress(pro,appname);
											arr[3].isFirst = false;
										}
										break;
									case arr[4].pro:
										if(arr[4].isFirst){
											console.log("进度：" + pro);
											NotificationUtil.setProgress(pro,appname);
											arr[4].isFirst = false;
										}
										break;
									case arr[5].pro:
										if(arr[5].isFirst){
											// console.log("进度：" + pro);
											NotificationUtil.setProgress(pro,appname);
											arr[5].isFirst = false;
										}
										break;
									default:
										break;
								}
							break;
						case 4: // 下载完成
							console.log("Download success: " + task.filename);
							NotificationUtil.compProgressNotification(appname,"下载完成! ");
							var ins = plus.runtime.install(plus.io.convertLocalFileSystemURL(task.filename), {force: true},()=>{
							    uni.showToast({icon:'none',title:'安装成功！'});
							    NotificationUtil.clearNotification();
							},(e)=>{
							    uni.showToast({icon:'none',title:'安装失败！'});
							    NotificationUtil.clearNotification();
							})
							// plus.runtime.install(task.filename);  // 安装下载的apk文件  
							break;
						default: //5: (Number 类型 )下载任务已暂停 -1: (Number 类型 )枚举任务状态
							console.log("Download failed: " + status);
							NotificationUtil.compProgressNotification(appname,"下载失败! ");
							break;
					}
				})
				return
				// -----------------------------------------------------------------------------------------
				
				var dtask = plus.downloader.createDownload(url, {}, function(d, status){
					// 下载完成
					if(status == 200){ 
						console.log("Download success: " + d.filename);
					} else {
						console.log("Download failed: " + status); 
					}  
				})
				try {
					dtask.start(); // 开启下载的任务
					var percent = 0;
					var showLoading = plus.nativeUI.showWaiting("正在下载");  //创建一个showWaiting对象 
					dtask.addEventListener('statechanged', function(task,status) {
						console.log(task)
						console.log(status)
					  switch (task.state) {
						case 1:
						  showLoading.setTitle("正在下载");
						  break;
						case 2:
						  showLoading.setTitle("已连接到服务器");
						  break;
						case 3:
						  percent = parseInt((parseFloat(task.downloadedSize) /parseFloat(task.totalSize)) *100);
						  showLoading.setTitle("正在下载" + percent + "%");
						  break;
						case 4:
							// true表示强制安装，不进行版本号的校验；false则需要版本号校验，如果将要安装应用的版本号不高于现有应用的版本号则终止安装，并返回安装失败。 仅安装wgt和wgtu时生效，默认值 false。
						    plus.runtime.install(task.filename,{force: false,},() => {
								// plus.runtime.restart();
								showLoading.setTitle("下载成功，正在安装...");
								setTimeout(()=>{
									 plus.nativeUI.closeWaiting();
								},1000)
							},(e) => {
								showLoading.setTitle("安装失败，请尝试重新下载");
								setTimeout(()=>{
									  plus.nativeUI.closeWaiting();
								},1000)
							}
						   );
						  break;
					  }
					});
				} catch (err) {
					  plus.nativeUI.closeWaiting();
					  uni.showToast({
						title: '更新失败',
						mask: false,
						duration: 1500
					  });
					  setTimeout(()=>{
						   plus.runtime.restart();
					  },1000)
				}
			 
			 
				
			 // ----------------------------------------------------------------------------------------------------------------------------------
				// var showLoading = plus.nativeUI.showWaiting("正在下载");
				// var url='https://app-1258143571.cos.ap-guangzhou.myqcloud.com/app/shoyii-doctor.apk'
				// const downloadTask =
				// 	uni.downloadFile({
				// 	    url: url,
				// 		success: (res) => {
				// 			console.log(res)
				// 	        var filePath = res.tempFilePath;
				// 			plus.runtime.install(filePath,{force: false,},(e) => {
				// 				console.log(JSON.parse(e))
				// 				console.log('success'+e)
				// 				showLoading.setTitle("正在安装...");
				// 				setTimeout(()=>{
				// 					  plus.nativeUI.closeWaiting();
				// 				},1000)
				// 			},(e) => {
				// 				console.log(JSON.parse(e))
				// 				console.log('error'+e)
				// 				showLoading.setTitle("安装失败，请尝试重新下载");
				// 				setTimeout(()=>{
				// 					  plus.nativeUI.closeWaiting();
				// 				},1000)
				// 			})
				// 		},
				// 		fail:(err)=>{
				// 			showLoading.setTitle("下载失败");
				// 			setTimeout(()=>{
				// 				  plus.nativeUI.closeWaiting();
				// 			},1000)
				// 		}
				// 	})
				// 	downloadTask.onProgressUpdate((res) => {
				// 		showLoading.setTitle("正在下载" + res.progress + "%");
				// 		console.log(res)
				// 		console.log(res.progress)
				// 	    if(res.progress==100){
				// 			console.log(res.progress)
				// 			showLoading.setTitle("下载完成");
				// 			plus.nativeUI.closeWaiting();
				// 		}
				// 	})
			},
		},
		async onLoad() { 
			// this.gethospital()
			// setTimeout(() => {
			// 	this.loading = false;
			// }, 2000)
			// await this.asyncTest()
			// uni.getProvider({
			// 	service:'payment',
			// 	success:(res)=> {
			// 		console.log(this.address)
			// 		console.log(res)
			// 	}
			// })
			// #ifdef H5
				// h5端打开app
				// this.wechatApp()
				// h5端打开小程序
				// this.wechatMiniparam()
			// #endif
		},
		onUnload() {
			this.debouncedClick.cancel()
		},
		async onReady() {
			var ctx = uni.createCanvasContext('firstCanvas')
			// 设置 canvas 背景色
			ctx.setFillStyle('blue');
			ctx.fillRect(75, 0, 300, 400);//绘制矩形
			ctx.setFillStyle('red');
			// 背景图片
			ctx.drawImage('/static/image/shoyiilogo.png',95,10,30,30);
			ctx.setFontSize(18);
			ctx.setTextAlign('center');
			ctx.fillText('树蚁医疗', 190, 30);
			ctx.beginPath()
			ctx.rect(95, 60, 180, 200)
			ctx.setFillStyle('#fff');
			ctx.fill()
			ctx.drawImage('/static/image/shoyiilogo.png',95,60,30,30);
			ctx.setFillStyle('#000') 
			ctx.setFontSize(12);
			ctx.fillText('作者', 150, 80);
			ctx.fillText('简介简介啊', 150, 100);
			ctx.fillText('达标器达标器达标器达标器达标器', 150, 120);
			ctx.fillText('详细内容', 150, 130);
			ctx.stroke();
			ctx.draw()
			// context.setStrokeStyle("#00ff00")
			// context.setLineWidth(5)
			// context.rect(0, 0, 200, 200)
			// context.stroke()
			// context.setStrokeStyle("#ff0000")
			// context.setLineWidth(2)
			// context.moveTo(160, 100)
			// context.arc(100, 100, 60, 0, 2 * Math.PI, true)
			// context.moveTo(140, 100)
			// context.arc(100, 100, 40, 0, Math.PI, false)
			// context.moveTo(85, 80)
			// context.arc(80, 80, 5, 0, 2 * Math.PI, true)
			// context.moveTo(125, 80)
			// context.arc(120, 80, 5, 0, 2 * Math.PI, true)
			// context.stroke()
			// context.draw()
			// let _this = this;
			// uni.getSystemInfo({
			// 	success(res) {
			// 		console.log(res)
			// 		console.log(res.screenHeight)
			// 		let wHeight=res.windowHeight //windoHeight为窗口高度，主要使用的是这个
			// 		let titleH=uni.createSelectorQuery().select(".scrollContent"); //想要获取的高度的元素名（class/id）
			// 		titleH.boundingClientRect(data=>{//添加节点的布局位置的查询请求
			// 			_this.scrollHeight=wHeight-data.top  //计算高度：元素高度=窗口高度-元素距离顶部的距离（data.top）
			// 		}).exec()
			// 	}
			// })
			  // 创建绘制工具
			  
			
		}
	}
</script>

<style scoped lang="scss">
	
	page{
		width: 100%;
		height: 100%;
	}
	.openApps{
		background-color: #FFFFFF;
		padding: 10rpx 30rpx;border-bottom:1px solid #EEEEEE ;
		display: flex;justify-content: space-between;align-items: center;
		.openLeft{
			display: flex;align-items: center;
			.image{
				width: 80rpx;height: 80rpx;margin-right: 20rpx;
			}
			.text{
				font-size: 36rpx;font-style: italic;
			}
		}
	}
	
	.list-cell {
			display: flex;
			box-sizing: border-box;
			width: 100%;
			padding: 10px 24rpx;
			overflow: hidden;
			color: #323233;
			font-size: 14px;
			line-height: 24px;
			background-color: #fff;
		}
	// page{
	// 	width: 100%;
	// 	height: 100%;
	// }
	// .aboutUs{
	// 	padding: 0 30rpx;
	// 	display: flex;
	// 	flex-direction: column;
	// 	width: 100%;
	// 	height: 100%;
	// }
	// .header{
	// 	height: 30px;
	// 	background-color: #007AFF;
	// }
	// .content{
	// 	flex: 1;
	// 	width: 100%;
	// 	height: 100%;
	// 	background-color: #07C160;
	// 	overflow: auto;
	// }
	// .footer{
	// 	height: 60px;
	// 	background-color: #F0AD4E;
	// }
	.all{
		width: 100%;
		/* #ifdef H5 */
		height:100%;
		/* #endif */
		/* #ifndef H5 */
		height: 100vh;
		/* #endif */
		display: flex;
		flex-direction: column;
	}
	.header{
		width: 100%;
		background-color: #07C160;
		height: 100px;
	}
	.section{
		flex: 1;
		background-color: #007AFF;
		height: 100%;
		overflow: auto;
	}
	.item{
		height: 200px;
		border: 1px solid red;
	}
</style>
