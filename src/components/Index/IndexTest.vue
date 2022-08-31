<template>
	<!-- 相关功能测试 -->
	<view class="">
		<view class="locale-item" v-for="(item, index) in locales" :key="index" @click="switchLang(item)">
		  <text class="text">{{item.text}}</text>
		</view>
		<button type="default" @click="ChatService">微信订阅</button>
		<button type="default" @click="permissionVetify">权限的验证</button>
		<button @click="pluginTest">插件检查</button>
	</view>
</template>

<script>
	import permision from "@/js_sdk/wa-permission/permission.js"
	// import {navigateTo} from '@/utill/tools/switchtheme.js'
	// const ToastPlusModule = uni.requireNativePlugin("toastplus")
	export default{
		computed:{
			locales() {
				return [{
					text: this.$t('locale.auto'),
					code: 'auto'
				  }, {
					text: this.$t('locale.en'),
					code: 'en'
				  },
				  {
					text: this.$t('locale.zh-hans'),
					code: 'zh-Hans'
				  },
				  {
					text: this.$t('locale.zh-hant'),
					code: 'zh-Hant'
				  }
				]
			},
		},
		onLoad() {
			function onResp (e) {
				console.log(e)
			}
		},
		methods:{
			pluginTest(){
				// console.log('aij',ToastPlusModule.processData())
				// ToastPlusModule.showToast('插件toast检查')
			},
			// 语言切换
			switchLang(e) {
				console.log(e)
				// plus.nativeUI.setUIStyle('dark')
				// navigateTo('/pages/aboutShoyii/aboutCompony')
				// uni.navigateTo({
				// 	url:'/pages/aboutShoyii/aboutCompony'
				// })
				// 切换为英文
				uni.setLocale(e.code);//设置当前语言；刷新后不重置语言
				this.$i18n.locale = e.code;// 页面中设置语言后需要调用 this.$i18n.locale = 'zh-Hans' 后生效
			},
			ChatService(){
				var SubscribeMessage = plus.android.importClass("com.tencent.mm.opensdk.modelbiz.SubscribeMessage");
				// console.log(SubscribeMessage)
				var subsMessageReq = new SubscribeMessage.Req();
				subsMessageReq.plusSetAttribute("scene", 1234); // 随便一个整数，0-10000以内
				subsMessageReq.plusSetAttribute("templateID", "MyAOnnW8FXa2HpUoMACAYBY9R3uMyc4-JyLEqye0vs8"); // 在微信开放后台，可以查看自己应用的APPID对应的templateID
				var IWXAPI = plus.android.importClass("com.tencent.mm.opensdk.openapi.IWXAPI");
				var WXAPIFactory = plus.android.importClass("com.tencent.mm.opensdk.openapi.WXAPIFactory");
				var wxapi = WXAPIFactory.createWXAPI(plus.android.runtimeMainActivity().getContext(), "wxdbe07c2bfb651890"); // appid是你自己微信的appid
				wxapi.sendReq(subsMessageReq)
				// 回调的监听 
				
				// wxapi.handleIntent(getIntent(), this);
				
				// var IWXAPIEventHandler=plus.android.implements('com.tencent.mm.opensdk.openapi.IWXAPIEventHandler')
				// var SendAuth = plus.android.importClass("com.tencent.mm.opensdk.modelmsg.SendAuth")
				// var authResp = SendAuth.Resp
				// console.log(authResp)  
				// plus.android.implements("com.tencent.mm.opensdk.openapi.IWXAPIEventHandler", {  
				// 	onResp:function(e){
				// 			// 这个是在onResp中的回调
				// 			var authResp = SendAuth.Resp
				// 			console.log(authResp)  
				// 	} 	
				// });
			}, 
			// 获取Android设备上当前App是否有某项权限
			requestAndroidPermission(permisionID) {
			    var result = permision.requestAndroidPermission(permisionID)
				console.log(result)
				return result;  
			}, 
			permissionVetify(){
				// #ifdef APP-PLUS
				var result=this.requestAndroidPermission('android.permission.RECORD_AUDIO')// RECORD_AUDIO
				result.then(res=>{
					console.log(res)
					var strStatus
					if (res == 1) {
					    strStatus = "已获得授权"
					} else if (res == 0) {
					    strStatus = "未获得授权"
					} else {//-1
					    strStatus = "被永久拒绝权限"
						uni.showToast({
							title:'麦克风权限未开启',
							icon:'none'
						})
						permision.gotoAppPermissionSetting()
					}
				})
				// #endif
			}
		}
	}
</script>

<style>
</style>
