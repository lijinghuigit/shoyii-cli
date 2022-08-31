// 线上分享路径,socket, 3js分享路径，上传图片地址
import {baseurl,socketurl,JsUrl,uploadUrl} from '@/utill/baseUrl/baseurl.js'
import {myRequest} from '@/utill/http/request.js'
import {myConnect} from '@/utill/http/connect.js'
import {myCos} from '@/utill/http/cosDelete.js'
import {uploadRequest} from '@/utill/http/upload.js'
import checkAudit from '@/utill/tools/checkAudit.js'
import checkLogin from '@/utill/tools/checklogin.js'
import moment from 'moment'
import time from '@/utill/tools/timestamp.js'
//全局主题 
import themeMixin from '@/mixin/theme.js'
export default{
	install:(app, options)=>{
		// 全局url
		app.config.globalProperties.$onlineUrl=baseurl
		app.config.globalProperties.$socketurl=socketurl
		app.config.globalProperties.$JslineUrl=JsUrl
		app.config.globalProperties.$uploadUrl=uploadUrl
		app.config.globalProperties.$myRequest=myRequest
		app.config.globalProperties.$myConnect=myConnect
		app.config.globalProperties.$myCos=myCos
		app.config.globalProperties.$uploadRequest=uploadRequest
		//全局方法
		
		// 是否登陆
		app.config.globalProperties.checkLogin=checkLogin
		// 审核结果
		app.config.globalProperties.checkAudit=checkAudit

		
		app.config.globalProperties.timeStamp=(data)=>{
			return moment(data).format('YYYY-MM-DD')
		}
		app.config.globalProperties.changeDate=(data)=>{
			return moment(data).format('YYYY-MM-DD HH:mm:ss')
		}
		app.config.globalProperties.time=time.time
		app.config.globalProperties.relativtime=time.relativtime
		
		app.mixin(themeMixin)
		// #ifdef VUE3
		// app.config.compilerOptions.isCustomElement=tag=>tag.startsWith('wx-open-launch-weapp')
		// #endif
		// #ifndef VUE3
		// Vue.config.productionTip = false// 3.0移除
		// Vue.config.ignoredElements.push('wx-open-launch-app','wx-open-launch-weapp') //忽略开放标签
		// #endif
	}
}