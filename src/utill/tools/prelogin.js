
function prelogin(){
	uni.preLogin({//如果当前设备环境不支持一键登录，此时应该显示其他的登录选项。如果手机没有插入有效的sim卡，或者手机蜂窝数据网络关闭，都有可能造成预登陆校验失败。
		provider: 'univerify',
		success:(e)=>{  //预登录成功
			console.log(e,'预登录来了')
			getApp().globalData.preloginStatus = true
		},
		fail(res){  // 预登录失败
			console.log(res)
			getApp().globalData.preloginStatus = false
		},
		complete(e) {
			console.log(e)
		}
	});
}

export default prelogin


