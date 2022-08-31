import user from './modules/user.js'
import socket from './modules/socket.js'
import theme from './modules/theme.js'
import createorder from './modules/createorder.js'
import { createStore } from 'vuex'
	const store = createStore({
	modules: {
		user,
		socket,
		theme,
		createorder
	},
	state: {
		PagesUrl:'',//跳转的页面
		PagesType:"",//跳转页面的类型
		modelIds:'',
		dataStatus:false,//更改logo以及登陆切换，退出登录时，刷新数据
	},
	mutations: {
		// 保存跳转的页面
		savePages(state,payload){
			console.log(state)
			console.log(payload)
			state.PagesUrl=payload.pages//跳转的页面路径
			state.PagesType=payload.pagetype//跳转方式，1 为switchTab；2为navigateTo
		},
		saveModelIds(state,payload){
			state.modelIds= payload
			console.log(state.modelIds)
		},
		// 更改全局的数据(即全局页面刷新)
		changeDataStatus(state,data){
			state.dataStatus=data
		},
	},
	getters:{
		DataStatus(state){
			return state.dataStatus
		},
	},
	actions: {
		
	}
})
export default store
