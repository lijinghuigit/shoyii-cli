// 文件的预览

function previewFiles(url){
	console.log(url)
	// #ifdef H5
	var url=encodeURIComponent(url)
	uni.navigateTo({
		url:'/pages/previewPdf/previewPdf?pdfUrl='+url,
		animationType:'pop-in'
	})
	// #endif
	// #ifndef H5
	uni.showLoading({
		title: '打开中...'
	});
	uni.downloadFile({
		url:url,
		success(e){
			uni.openDocument({
				filePath:e.tempFilePath,
				fileType:'pdf',
				success(e){
					uni.hideLoading()
				},
				fail(err) {
					uni.hideLoading()
					console.log(err)
				}
			})
		},
		fail(e){
			uni.hideLoading()
			console.log(e)
		}
	})
	// #endif
	
}
export default previewFiles
