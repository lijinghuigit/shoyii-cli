// 自定义share函数，目前只应用于aboutShoyii页面
import {reactive} from 'vue'
export default function share(){
	// 分享微信聊天
	const shareChat=(href)=>{
		console.log('shaereweixcin',href)
		uni.share({
			provider:'weixin',
			title:'树蚁医疗',
			type:0,
			href:href,
			summary:'树蚁医疗是一个方便医生进行精准外科三维数据展示与运用，从而关联XR影像系统，自研三维重建系统。真正帮助医生阅读精准三维诊断数据，精准外科学习与运用以及医患沟通',
			scene:'WXSceneSession',
			imageUrl:'/static/image/shoyiilogo.png',
			success(e) {
				uni.showToast({
					title:'分享成功',
					icon:'none'
				})
				console.log(e)	
			},
			fail(e) {
				uni.showToast({
					title:'分享失败',
					icon:'none'
				})
				console.log(e)
			}
		})
	}
	// 分享朋友圈
	const shareTimeline=href=>{
		console.log(href)
		uni.share({
			provider:'weixin',
			title:'树蚁医疗',
			type:0,
			href: href,
			summary:'树蚁医疗是一个方便医生进行精准外科三维数据展示与运用，从而关联XR影像系统，自研三维重建系统。真正帮助医生阅读精准三维诊断数据，精准外科学习与运用以及医患沟通',
			scene:'WXSceneTimeline',
			imageUrl: '/static/image/shoyiilogo.png',
			success(e) {
				uni.showToast({
					title:'分享成功',
					icon:'none'
				})
				console.log(e)
			},
			fail(e) {
				uni.showToast({
					title:'分享失败',
					icon:'none'
				})
				console.log(e)
			}
		})
	}
	// 分享到qq聊天
	const shareQqChat=href=>{
		console.log(href)
		uni.share({
			provider:'qq',
			type:'2',
			title:'树蚁医疗',
			imageUrl:'/static/image/shoyiilogo.png',
			href:href,
			summary:'树蚁医疗是一个方便医生进行精准外科三维数据展示与运用，从而关联XR影像系统，自研三维重建系统。真正帮助医生阅读精准三维诊断数据，精准外科学习与运用以及医患沟通',
			success(e) {
				uni.showToast({
					title:'分享成功',
					icon:'none'
				})
				console.log(e)
			},
			fail(e) {
				uni.showToast({
					title:'分享失败',
					icon:'none'
				})
				console.log(e)
			}
		})
	}
	return {
		shareChat,
		shareTimeline,
		shareQqChat
	}
		
}