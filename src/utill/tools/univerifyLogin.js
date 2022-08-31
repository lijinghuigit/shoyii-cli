import loginTip from '@/utill/tools/loginTip.js'
import {localTelLogin} from '@/utill/api/login/localTelLogin.js'
import store from '@/store/index.js'
let Telconfig={ // 自定义登录框样式
		"fullScreen": false,
		"backgroundColor": "#ffffff",  
		"icon": {
			"path": "",//可选 自定义本地图片 默认显示logo 
			"width": "60",
			"height": "60"
		},
		"phoneNum": {
			"color": "#000000",
			"fontSize": "18"
		},
		"slogan": {
			"color": "#8a8b90",
			"fontSize": "12"
		},
		"authButton": {
			"normalColor": "#69CDFF",
			"highlightColor": "#53c3fb",
			"disabledColor": "#73aaf5",//仅ios支持
			"textColor": "#ffffff",
			"title": "本机号码一键登录"
		},
		"otherLoginButton": {
			"visible": "true", //是否显示其他登录按钮，默认显示
			"normalColor": "#f8f8f8",
			"highlightColor": "#dedede",
			"textColor": "#000000",
			"title": "其他登录方式",
			"borderWidth": "1px",//仅ios支持
			"borderColor": "#c5c5c5"//仅ios支持
		},
		"privacyTerms": {
			"defaultCheckBoxState":"false", // 条款勾选框初始状态 默认值： true   
			"checkBoxSize":18,
			"textColor": "#8a8b90", //文字颜色
			"termsColor": "#1d4788", //协议文字颜色
			"prefix": "我已阅读并同意",
			"suffix": "并使用本机号码登录",
			"privacyItems": [
				{
					"url": "https://mobile.shoyii.com/#/pages/aboutShoyii/userAgree",
					"title": "用户服务协议"
				},{
					"url": "https://mobile.shoyii.com/#/pages/aboutShoyii/privacyPolicy",
					"title": "隐私政策"
				}
			]
		},
			// "buttons": {  // 自定义登陆按钮
			//     "iconWidth": "40px", // 图标宽度（高度等比例缩放） 默认值：45px
			// 	"list": [
			// 		{
			// 		  "iconPath": "/static/image/wechat.png" // 图标路径仅支持本地图片
			// 		}
			// 	]
			// }
		
	}
export default function univerifyLogin(fullScreen,isJump){//全屏或半屏，是否页面跳转
	Telconfig.fullScreen=fullScreen==false?false:true 
	uni.login({  
		provider: 'univerify',
		univerifyStyle: Telconfig, 
		success(res){ // 登录成功
			console.log(res.authResult);  // {openid:'deviceIDlength+deviceID+gyuid',access_token:'接口返回的 token'}
			uniCloud.callFunction({//获取本机号码
			  name: 'getPhoneNumber',
			  data: {
				'access_token':res.authResult.access_token, // 客户端一键登录接口返回的access_token
				'openid':res.authResult.openid  // 客户端一键登录接口返回的openid
			  } 
			}).then(res => {
				// 登录成功，可以关闭一键登陆授权界面了
				console.log(res)
				console.log(res.result)
				var phoneNumber=res.result.res.phoneNumber
				if(res.result.res.code==0){
					localTelLogin({
						telephone:phoneNumber
					}).then(res=>{//成功之后，再跳转页面
						console.log(res)
						// uni.report('telephoneLogin',{//一键登陆统计上报
						// 	telephone:phoneNumber,
						// })
						if(res.data.code==0){
							if(Array.isArray(res.data.object)){
								uni.navigateTo({
									url:'/pages/login/accountLogin?data='+encodeURIComponent(JSON.stringify(res.data.object))
								})
							}else{//直接登录
								loginTip(res,store.state.PagesUrl,store.state.PagesType)
							}
							uni.closeAuthView()
						}else{
							uni.showToast({
								title:res.data.msg,
								icon:'none'
							})
							uni.closeAuthView()
						}
					}).catch(err=>{
						console.log(err)
						uni.closeAuthView()
					})
				}
			}).catch(err=>{
				//4100:errCode: 4100 | errMsg: 获取手机号码失败：uni一键登录账户余额不足
				console.log(err)  
				uni.showToast({
					title:'请选择其他方式登录',
					icon:'none',
					duration:4000,
				})
				uni.closeAuthView()
				if(isJump){//页面跳转
					uni.navigateTo({
						url:'/pages/login/tellogin?pages='+'/pages/Tabbar/index'+'&pagetype='+1,
						animationType:'pop-in'
					})
				}
			  // 处理错误
			}) 
		},
		fail(res){  // 登录失败
			console.log(res)
			console.log(res.code)
			console.log(res.errMsg)
			// uni.report('telLoginFail',{//登录失败统计上报
			// 	error_data:res
			// }) 
			// 30002 login:fail 用户点击了其他登录方式
			if(res.code=='30002'){
				uni.closeAuthView()
			}else if(res.code=='30003'){//用户关闭验证界面
				console.log('用户关闭验证界面')
			}else if(res.code=='30006'){// login:fail -20202{"error_data":"没有开启数据流量 或者是 当前网络不可用"}
				uni.showToast({
					title:'请开启数据流量',
					icon:'none',
					duration:3000
				})
			}else if(res.code=='30008'){
				console.log('微信登录')
			}
			if(isJump){//页面跳转
				uni.navigateTo({
					url:'/pages/login/tellogin?pages='+'/pages/Tabbar/index'+'&pagetype='+1,
					animationType:'pop-in'
				})
			} 
		}
	})
}