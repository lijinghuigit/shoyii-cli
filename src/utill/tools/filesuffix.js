
// 获取文件尾缀
function getFileExtension(filename) {
	 // console.log(filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2))
	return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}

export default getFileExtension
