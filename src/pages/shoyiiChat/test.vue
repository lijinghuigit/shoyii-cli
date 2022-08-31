<template>
	<view class="wrap">
		<!-- <button type="default" @click="share">分享</button>
		<button type="default" @click="login">微信登录</button>
		<button type="default" @click="getcontacts">获取通讯录数据</button>
		<button type="default" @click="cameraOperate">摄像头的操作</button>
		<button type="default" @click="hLogin">h5登录测试</button>
		<button type="default" @click="loginout">退出登录</button>
		<button type="default" @click="payment">支付</button>
		<button type="default" @click="model">压屏</button> -->
		
	</view>
</template>
<script>
	export default {
		data() {
			return {
		
			}
		},
		methods: {
			login(){
				uni.login({
					provider:'weixin',
					scopes:'auth_user',					
					success(e) {
						console.log(e)
					}
				})
			},
			getcontacts(){
				// plus.contacts.getAddressBook( type, succesCB, errorCB );
				plus.contacts.getAddressBook(plus.contacts.ADDRESSBOOK_PHONE,function(addressbook){
					console.log(addressbook)
					addressbook.find([],function(e){
						console.log(e)
					})
				},function(e){
					console.log(e)
				})
			},
			cameraOperate(){
				var a=plus.camera.getCamera()
				console.log(a)
				// a.captureImage()
				a.startVideoCapture(function(e){
					console.log(e)
				},function(e){
					console.log(e)
				},function(e){
					console.log(e)
				})
			},
			hLogin(){
				// plus.oauth.getServices(function(e){
				// 	// console.log(e)
				// },function(err){
				// 	console.log(err)
				// }) 
				var aweixin=null;
				// 当前环境支持的所有授权登录对象
				var auths = {};
				
				// 获取登录授权认证服务列表，单独保存微信登录授权对象
				// 5+APP在plusready事件中调用，uni-app在vue页面的onLoad中调用
					plus.oauth.getServices(function(services){
						console.log(services)
						// for(var i in services){
						// 	auths[services[i].id]=services;
						// }
						aweixin = services[0];
						console.log(aweixin)
						console.log(!aweixin.authResult)
						if(!aweixin){
								plus.nativeUI.alert("当前环境不支持微信登录");
								return;
						}
						if(!aweixin.authResult){//是否登录认证过
						console.log(aweixin)
							aweixin.authorize(function(e){
								console.log(e)
								aweixin.login(function(e){
									console.log(e)
									console.log('登陆成功')
									console.log(e.target.userInfo)
									// plus.nativeUI.alert("登录认证成功!");
								}, function(e){
									console.log(e)
									console.log('登录失败')
									// plus.nativeUI.alert("登录认证失败: "+JSON.stringify(e));
								} );
							},function(e){
								console.log(e)
							})
							
						}else{
							console.log('已经登录过了')
							aweixin.getUserInfo(function(e){
								console.log(e)
							},function(err){
								console.log(err)
							})
							// plus.nativeUI.alert("已经登录认证!");
						}
					}, function(e){
						console.log(e)
						plus.nativeUI.alert("获取登录授权服务列表失败："+JSON.stringify(e));
					} );
				
				// 通常登录前需要先调用authorize方法进行授权
				
				// 获取微信登录授权对象后可进行登录认证操作
				// function authLogin(){
			
				// }
			},
			loginout(){
				plus.oauth.getServices(function(services){
					console.log(services)
					services[0].logout(function(e){
						console.log(e)
					}, function(e){
						plus.nativeUI.alert("注销登录认证失败: "+JSON.stringify(e));
					});
					
				})
			},
			payment(){
				uni.requestPayment({
					provider:'zhifubao',
					orderInfo:{
						a:123456
					},
					success(e){
						console.log(e)
					},
					fail(err) {
						console.log(err)
					}
				})
			},
		
		},
		onReady() {
			
		},
		onLoad() {
		}
	}
</script>

<style lang="scss">
	
</style>
