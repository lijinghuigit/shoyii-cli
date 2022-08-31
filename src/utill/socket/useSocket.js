import Vue from 'vue'
import socket from "./socket.js"; //引入socket.js 重要
import store from "@/store/index.js";
import {socketurl} from '../baseUrl/baseurl.js'
const Socket = new socket({
	url: socketurl+store.getters['user/info'].doctorId, //连接地址 必填
	// maxInterValCount: 5,
	// interValTime: 2000,
	onOpen (res) {
		console.log(res)
		console.log('连接成功269')
		console.log(store.getters['user/info'].doctorId)
		// let msg = {
		// 	type: 'self',
		// 	selfName: '老司机',
		// 	text: '连接成功了',
		// 	time: new Date().toLocaleTimeString()
		// };
		// this.nsend(JSON.stringify(msg));
	},
	onClose(err){
		console.log('关闭了连接')
	},
	onReload(res){
		console.log('重载：' + res)
	},
	onRdFinsh(count) {
		console.log(count + '次重连已完成')
	},
	// 监听消息
	onMsg(msg) {
		console.log(msg)
		store.commit('setSocketState',State)
	}
})
Vue.prototype.$Socket = Socket;