// 图片的预览及相关保存操作
export default{
	// 模型库及病例其他图片的操作
	previewImage(index,data){
		var Allarr=Object.values(data)
		// console.log(Allarr)//全部的图片数组
		var b=Object.keys(data)
		// console.log(b)//下标数组
		var newArr=[]
		b.filter((s_item,s_index)=>{
			if(s_item==index&&s_item){
				newArr.push(Allarr[s_index])
			}
		})
		console.log(newArr)
		uni.previewImage({
			current:newArr[0],//预览的第一张图，可以使index，可以是路径
			urls:Allarr,//必须是数组
			indicator:'number',
			loop:true,
			longPressActions:{
				 itemList: ['保存图片','分享朋友','分享朋友圈'],//长按时弹出的列表选项
				 success: (data)=> {
					console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
					if(data.tapIndex==0){//选中第一个按钮
						console.log(Allarr[data.index])
						// 保存图片
						uni.saveImageToPhotosAlbum({
							filePath:Allarr[data.index],
							success(e){
								uni.showToast({
									title:'保存成功',
									icon:'none'
								})
							},
							fail(e){
								uni.showToast({
									title:e.errMsg
								})
							}
						})
					}else if(data.tapIndex==1){
						console.log(Allarr[data.index])
						// 分享聊天列表
						uni.share({
							provider: "weixin",
							scene: "WXSceneSession",
							type: 2,
							imageUrl: Allarr[data.index],
							success(res) {
								console.log("success:" + JSON.stringify(res));
							},
							fail(err) {
								console.log("fail:" + JSON.stringify(err));
							}
						})
					}else if(data.tapIndex==2){
						// console.log(Allarr[data.index])
						// // 分享朋友圈
						uni.share({
							provider: "weixin",
							scene: "WXSceneTimeline",
							type: 2,
							imageUrl: Allarr[data.index],
							success(res) {
								console.log("success");
							},
							fail(err) {
								console.log(JSON.stringify(err));
							}
						})
					}
				 },
				 fail:(err)=> {
				 }
			},
			success(e){
				console.log(e)
			}
		})
	},
	// 手术方法库的图片以及病例的手术方法图片操作
	methodsPreview(index,data){
		console.log(Object.values(data))
		var arr=Object.values(data)
		var newArr=[]
		console.log(arr)
		arr.filter((item,index)=>{
			if(item){//item要存在
				newArr.push(item)
			}
		})
		console.log(newArr)
		uni.previewImage({
			current:newArr[index],//预览的第一张图，可以使index，可以是路径
			urls:newArr,//必须是数组
			indicator:'number',
			loop:true,
			longPressActions:{
				 itemList: ['保存图片','分享朋友','分享朋友圈'],//长按时弹出的列表选项
				 success: function(data) {
					console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
					if(data.tapIndex==0){//选中第一个按钮
						console.log(newArr[data.index])
						// 保存图片
						uni.saveImageToPhotosAlbum({
							filePath:newArr[data.index],
							success(e){
								uni.showToast({
									title:'保存成功',
									icon:'none'
								})
							},
							fail(e){
								uni.showToast({
									title:e.errMsg
								})
							}
						})
					}else if(data.tapIndex==1){
						console.log(newArr[data.index])
						// 分享聊天列表
						uni.share({
							provider: "weixin",
							scene: "WXSceneSession",
							type: 2,
							imageUrl: newArr[data.index],
							success(res) {
								console.log("success:" + JSON.stringify(res));
							},
							fail(err) {
								console.log("fail:" + JSON.stringify(err));
							}
						})
					}else if(data.tapIndex==2){
						// console.log(newArr[data.index])
						// // 分享朋友圈
						uni.share({
							provider: "weixin",
							scene: "WXSceneTimeline",
							type: 2,
							imageUrl: newArr[data.index],
							success(res) {
								console.log("success");
							},
							fail(err) {
								console.log(JSON.stringify(err));
							}
						})
					}
				 },
				 fail: function(err) {
				 }
			},
			success(e){
				console.log(e)
			}
		})
	},
	// 病例的效果预测图片操作
	casePredictView(index,data){
		var newArr=[]
		data.forEach(item=>{
			newArr.push(item.fileDownloadUrl)
		})
		console.log(newArr)
		uni.previewImage({
			current:index,//预览的第一张图，可以使index，可以是路径
			urls:newArr,//必须是数组
			indicator:'number',
			loop:true,
			longPressActions:{
				 itemList: ['保存图片','分享朋友','分享朋友圈'],//长按时弹出的列表选项
				 success: (data)=> {
					console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
					if(data.tapIndex==0){//选中第一个按钮
						console.log(newArr[data.index])
						// 保存图片
						uni.saveImageToPhotosAlbum({
							filePath:newArr[data.index],
							success(e){
								uni.showToast({
									title:'保存成功',
									icon:'none'
								})
							},
							fail(e){
								uni.showToast({
									title:e.errMsg
								})
							}
						})
					}else if(data.tapIndex==1){
						console.log(newArr[data.index])
						// 分享聊天列表
						uni.share({
							provider: "weixin",
							scene: "WXSceneSession",
							type: 2,
							imageUrl: newArr[data.index],
							success(res) {
								console.log("success:" + JSON.stringify(res));
							},
							fail(err) {
								console.log("fail:" + JSON.stringify(err));
							}
						})
					}else if(data.tapIndex==2){
						// console.log(newArr[data.index])
						// // 分享朋友圈
						uni.share({
							provider: "weixin",
							scene: "WXSceneTimeline",
							type: 2,
							imageUrl: newArr[data.index],
							success(res) {
								console.log("success");
							},
							fail(err) {
								console.log(JSON.stringify(err));
							}
						})
					}
				 },
				 fail:(err)=> {
				 }
			},
			success(e){
				console.log(e)
			}
		})
	},
	preview(index,data){
		var newArr=[]
		newArr.push(data)
		uni.previewImage({
			current:index,//预览的第一张图，可以使index，可以是路径
			urls:newArr,//必须是数组
			indicator:'number',
			loop:true,
			success(e){
				// console.log(e)
			},
		})
	}
}