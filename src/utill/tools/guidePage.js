
function guidePage(){
	try {
		 // 获取本地存储中launchFlag标识
		 console.log(uni.getStorageSync('first_flag'))
		 if(!uni.getStorageSync('first_flag')){//第一次进入app,为false
			// 进入引导页
			uni.reLaunch({
				url:'/pages/GuidePage/GuidePage',
			})
		 }
	} catch(e) { //error
		// 设置为true
		uni.setStorageSync('first_flag', true);
	}
}

export default guidePage
