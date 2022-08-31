import {socketurl} from '@/utill/baseUrl/baseurl.js'
// let timerheart=null
let state={
		connectStatus:false,//未连接
		newNoticeStatus:false,//首页入口红点
		socketTask:null,//socket任务
		is_open_socket:false,//是否打开的状态
		SocketState: {},
		SocketStateErr: {},
		socketData:'',
		timerheart:null
    },
	getters = {
		connect(state,getters,rootState,rootGetters){
			// console.log(rootGetters['user/info'].doctorId)
			return state.newNoticeStatus
		},
	},
	mutations={
		// 初始化
		SOCKET_INIT(state,id){
			console.log(socketurl,id)
			state.socketTask=null
			state.timerheart&&clearInterval(state.timerheart)
			state.socketTask=uni.connectSocket({ //登陆创建
				url: socketurl+id,
				success:(e)=>{
					console.log(e,'创建成功')
				},
				fail:(err)=>{
					console.log(err,'创建失败')
				} 
			}); 
			// 监听是否打开
			state.socketTask.onOpen((res) => {
				console.log(res)
				console.log("WebSocket连接正常打开中...！");
				// console.log(id)
				state.is_open_socket = true;
				// 注：只有连接正常打开中 ，才能正常收到消息
				state.timerheart=setInterval(()=>{ //10s发一次心跳
					// console.log('sssssss')
					 state.socketTask.send({
						data: 'head',
						success(e) {
							// console.log(socketurl+id)
							// console.log(id)
							// console.log("心跳发送成功");
						},
						fail(e) {
							console.log(e,'心跳发送失败',id)
							state.is_open_socket = false;
							clearInterval(state.timerheart) //心跳发送失败，取消定时器
						}
					}); 
				},10000)
			})
			state.socketTask.onMessage((res) => {
				// console.log("收到服务器内容：" + res.data);
				// console.log(state.timerheart)
				if(res.data=='head'){
					state.socketData=res.data
				}else{
					state.socketData=JSON.parse(res.data)
				} 
				// #ifdef APP-PLUS
				var page =getCurrentPages();
				var pageroute=page[page.length-1].route
				// console.log(pageroute)
				if(pageroute=='pages/shoyiiChat/index'||pageroute=='pages/shoyiiChat/chatWindow'){
				// 在聊天页面不创建通知栏
				}else{ //其他页面创建通知栏
					if(res.data=='head'){//心跳回复
					}else if(JSON.parse(res.data).friend_request){//请求的通知
						console.log(JSON.parse(res.data).friend_request)
						console.log('创建添加好友请求的通知栏')
					}else{
						const message=JSON.parse(res.data).chatMsgDetail
						console.log(message)
						if(message.groupId){ //群组消息
							var title=message.groupName
						}else{
							var title=message.userName
						}
						var options={
							title:title,//标题
							sound:'system',//提示音
							cover:true,//消息覆盖
							when:message.sendTime,//消息上显示的提示时间
						}
						// #ifdef APP-PLUS
						if(plus.os.name=='iOS'){
							plus.push.createMessage(message.content,JSON.stringify(message),options)
						}else{
							// content ,payload(数据),options（JSON对象，获客户端创建本地消息的参数）
							plus.push.createMessage(message.content,message,options)
						}
						// #endif
						
						// 迁移到全局方法里
						// plus.push.addEventListener('click', function(message) {
						// 	console.log('click事件')
						// 	console.log(message.payload) //即是message的数据
						// 	var data=message.payload //无病例id，群组id，群组人数，名称；只能跳转聊天首页
						// 	uni.navigateTo({
						// 		url:'/pages/shoyiiChat/index'
						// 	})
						// })
					}
				}
				// #endif  
			})
			state.socketTask.onClose(res=>{
				console.log(res,'监听WebSocket连接关闭事件触发')
				// uni.showToast({
				// 	title:'监听连接关闭事件触发'
				// })  
				console.log(state.timerheart)
				if(state.timerheart){//如果定时器存在，关闭
					clearInterval(state.timerheart)
				}
				state.is_open_socket=false 
				state.socketTask=null
			}) 
			state.socketTask.onError(res=>{
				console.log(res,'监听WebSocket错误事件')
				if(state.timerheart){//如果定时器存在，关闭
					clearInterval(state.timerheart)
				}
				state.is_open_socket=false
				state.socketTask=null
				// uni.showToast({
				// 	title:'error'+JSON.stringify(res) 
				// }) 
			}) 
		},    
		// 发送消息
		SOCKET_SEND(state, data) {
			console.log("ws发送！");
			console.log(data)
			console.log(state.socketTask)
			state.socketTask.send({
				data: data,
				async success(e) {
					console.log("消息发送成功");
				},
			});
		},  
		// 关闭socket
		SOCKET_CLOSE(state, data){
			state.socketTask.close({
				success(e){
					if(state.timerheart){//如果定时器存在，关闭
						console.log(e,'关闭socekt')
						clearInterval(state.timerheart)
					}
					state.socketTask=null
					state.is_open_socket=false
				},fail(err){
					console.log(err)
				}
			})
		},
		connectData(state,data){
			console.log(data)
			state.newNoticeStatus=data
		},
		// setSocketState(that, info) {
		// 	that.SocketState = info;
		// }, 
		// setSocketStateErr(that, info) {
		// 	that.SocketStateErr = info;
		// },
	},
	actions={
		// 初始化
		WEBSOCKET_INIT(
			{commit}, id) {
			commit('SOCKET_INIT', id)
		},
		// 发送消息(是用于状态的判断)
		async WEBSOCKET_SEND({
			dispatch,commit,state,rootState 
		}, data) {
			// console.log(state.socketTask) //先判断链接状态，正常则发送，不正常重新连接
			// CONNECTING:0 ;OPEN:1;CLOSING:2;CLOSED:3
			if(!state.socketTask||state.socketTask.readyState!==1){//链接失败，需要重连（目前只进行重连）
				// console.log('你来了')
				state.timerheart&&clearInterval(state.timerheart)
				state.is_open_socket=false
				await dispatch('WEBSOCKET_INIT',rootState.user.userInfo.doctorId)
				// await dispatch('WEBSOCKET_TRUESEND',data)
				// commit('SOCKET_SEND',data) 
			}else{//链接正常，就发消息
				commit('SOCKET_SEND',data)
				// console.log('你出发')
				// await dispatch('WEBSOCKET_TRUESEND',data)
			}   
		},  
		WEBSOCKET_TRUESEND({dispatch,commit,state,rootState},data){
			commit('SOCKET_SEND',data)
		}
	};
export default{
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}