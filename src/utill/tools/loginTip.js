// 登录的跳转的封装
import {socketurl} from '@/utill/baseUrl/baseurl.js'
import store from '@/store/index.js'
import {clientId} from '@/utill/api/clientid/clientid.js'
export default
    function loginTip(options,url,type){
		console.log(options,url,type, 'options,url,type')
		// 成功之后，存储信息，进入相应的页面
		console.log(options)
		console.log(url)//页面路径
		console.log(type) //1为switchTab；2 navigateTo
		store.dispatch('socket/WEBSOCKET_INIT',options.data.object.doctorId) //初始化，创建socket
		// 存储数据到vuex及本地化
		store.dispatch('user/setInfor',{
			auditstatus:options.data.object.auditStatus,//审核状态
			token:options.data.object.token,//token
			doctorId:options.data.object.doctorId,//用户ID
		})
		// #ifdef APP-PLUS
		let info = plus.push.getClientInfo();
		console.log(info.clientid)
		if(info.clientid){ //上传客户端唯一标识
			clientId({
				clientId:info.clientid
			}).then(res=>{
				console.log(res)
			}).catch(err=>{
				console.log(err)
			})
		} 
		// #endif
		switch (options.data.object.auditStatus){
			case 'NP':
				uni.navigateTo({//未通过
					url:'/pages/PersonalInfor/auditInfor',
					animationType:'pop-in'
				})
			break;
			case 'ZC'://注册
				// 填写审核信息
				uni.navigateTo({
					url:'/pages/PersonalInfor/auditInfor',
					animationType:'pop-in'
				})
			break;
			default:
				switch (type){
					case '1':{ // switchTab（用于账号切换，以及tabar页面未登录的问题）
						uni.reLaunch({
							url:url
						})
					}
					break;
					case '2':{//跳转相应的页面navigateTo,常用于详情页面的操作。
						uni.navigateTo({
							url:url,
							animationType:'pop-in'
						})
					}
					break;
					default://store里的数据刷新为undefined
						uni.reLaunch({
							url:'/pages/Tabbar/index'
						})
					break;
				}
			break;
		}
    }
