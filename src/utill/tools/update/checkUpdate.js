import {myRequest} from '../../http/request.js'
import publicdown from './publicdown.js'
	function checkUpdate(){
		plus.runtime.getProperty(plus.runtime.appid,(infor)=>{
			console.log(infor.version); 
			myRequest({
				url:'/App/getDoctorAppLatestEdition',
			}).then(res=>{
				console.log(res)
				if(res.data.code==0){
					var type=res.data.object.updateType//更新方式，1是整包更新 2是资源热更新
					if(res.data.object.updateType=='1'){
						var url=res.data.object.latestPkgDownloadUrl
					}else{
						var url=res.data.object.updateUrl//热更新
					}
					 // console.log(type,url)
					 // console.log(res.data.object.codeVersion)
					 // console.log(infor.version)
					 if(infor.version<res.data.object.codeVersion){
						plus.globalEvent.addEventListener('splashclosed',function(){
							// 所有启动app的弹窗都放在这里
							uni.showModal({
							 	title:res.data.object.versionTitle||'新版发布',
							 	content:res.data.object.versionMessage||'有重要内容更新',
							 	cancelText:'取消下载',
							 	confirmText:'确定下载',
							 	success(e){
							 		console.log(e)
							 		if(e.confirm){//确定下载	
							 		  uni.getSystemInfo({
							 			success:(res) => {
							 				console.log(res)
							 				//检测当前平台，如果是安卓则启动安卓更新  
							 				if (res.platform == "android") {
							 					publicdown(type,url)	
							 				}else if(res.platform == "ios"){
							 					// 进入应用市场下载
							 					plus.runtime.openURL(url, function(res) {
							 					   console.log(res);   
							 					});
							 				}
							 			}
							 		  })
							 		}
							 	},
							 	fail(e){
							 		console.log(e)
							 	}
							})
						})
					 }
				}
			}).catch(err=>{
				console.log(err)
			})
		})
	}
	function update(type,url){
		uni.getSystemInfo({
			success:(res) => {
				console.log(res)
				//检测当前平台，如果是安卓则启动安卓更新  
				if (res.platform == "android") {
					publicdown(type,url)	
				}else if(res.platform == "ios"){
					// 进入应用市场下载
					plus.runtime.openURL(url, function(res) {
					   console.log(res);   
					});
				}
			}
		})
	}
export default {
	checkUpdate,
	update,
}


