import App from './App'
import Vuex from "vuex";
// 引入语言包，注意路径
import messages from './locale/index'
// 构造i18n对象
let i18nConfig = {
  // 默认语言，这里的local属性，对应message中的zh、en属性
  locale: uni.getLocale(),
  // 引入语言文件
  messages
}
// 引入socket.js文件
// import'./utill/socket/useSocket.js';
// 全局的属性及方法等
import globalUrl from './plugins/plugins'
import store from './store'
// import plugin from '@/utill/tools/index.js'

// #ifndef VUE3
// require('./mock/index.js')
// #endif
// #ifdef VUE3
// import mock from "./mock/index.js";
// #endif
import uView from './uni_modules/vk-uview-ui';
import { createSSRApp } from 'vue'
// pinia
// import * as Pinia from 'pinia';
import { createI18n } from 'vue-i18n'
const i18n  = createI18n(i18nConfig)
export function createApp() {
   const app = createSSRApp(App)
   app.use(store)
   app.use(i18n) 
   app.use(uView)
   app.use(globalUrl)
   // app.use(Pinia.createPinia())
   // app.config.globalProperties.$util=plugin()
   // #ifdef MP-WEIXIN
    console.log=function(){}; 
   // #endif
   return { 
      app,
	  // 如果 nvue 使用 vuex 的各种map工具方法时，必须 return Vuex
	  Vuex
   }
}

