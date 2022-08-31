let state={
	curThemeType:uni.getStorageSync('theme') || 'light',//主题
},
getters={
	themeType(state){
		// 只有h5才支持document
		// if(state.curThemeType=='light'){
		// 	if (document.body.className) document.body.className = ''
		// }else{
		// 	document.body.className = state.curThemeType;
		// }
		// console.log(',,,,,,,,,,,',state.curThemeType)
		// #ifdef APP-PLUS
		let dark_arr=[
			'/static/app-plus/dark/index_dark.png',
			'/static/app-plus/dark/surgical_dark.png',
			'/static/app-plus/dark/case_dark.png',
			'/static/app-plus/dark/model_dark.png',
			'/static/app-plus/dark/mine_dark.png'
		]
		let light_arr=[
			'/static/image/index.png',
			'/static/image/method.png',
			'/static/image/case.png',
			'/static/image/model.png',
			'/static/image/mine.png'
		]
		if(state.curThemeType=='light'){
			// 背景色
			uni.setTabBarStyle({
				color:"#000000",
				selectedColor:'#69CDFF',
				backgroundColor:'#F7F7F7',
				borderStyle:'black'
			})
			// tabbar路径
			light_arr.forEach((item,index)=>{
				uni.setTabBarItem({
					index,
					iconPath:item
				})
			})
		}else{
			// 背景色
			uni.setTabBarStyle({
				color:'#ffffff',
				selectedColor:'#69CDFF',
				backgroundColor:'#999999',
				borderStyle:'black'
			})
			// tabbar路径
			dark_arr.forEach((item,index)=>{
				uni.setTabBarItem({
					index,
					iconPath:item
				})
			})
		}
		// #endif
		return state.curThemeType
	}
},
mutations={
	// app主题颜色调整
	changeTheme(state,data){
		state.curThemeType=data.themetype
		uni.setStorageSync('theme', state.curThemeType);
	},
}

export default{
	namespaced: true,
	state,
	getters,
	mutations,
}