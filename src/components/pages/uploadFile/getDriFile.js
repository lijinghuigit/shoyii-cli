function getSDCardPath() { //获取环境根目录
	var sdcardDir = null;
	//判断SDCard是否存在
	var Environment = plus.android.importClass("android.os.Environment");
	if (Environment) {
		sdcardDir = Environment.getExternalStorageDirectory();
	}
	return sdcardDir.toString();
}

function readSonFilenum(path) { //遍历文件夹下面的文件或文件夹
	var File = plus.android.importClass("java.io.File");
	var subRoot = new File(path);
	var files = plus.android.invoke(subRoot, "listFiles");
	var len = files.length;
	var arr = [];
	for (var i = 0; i < len; i++) {
		var file = files[i];
		if (!plus.android.invoke(file, "isHidden")) {
			var filePath = path + '/' + plus.android.invoke(file, "getName");
			// var size = readFileSize(filePath);
			if (judgeIsFolder(filePath)) {
				if (path.indexOf('MicroMsg') != -1) {
					arr.push({
						'path': path + '/' + plus.android.invoke(file, "getName"),
						'fileName': plus.android.invoke(file, "getName"),
						'origin': '微信',
						'isActive': false
					});
				} else {
					arr.push({
						'path': path + '/' + plus.android.invoke(file, "getName"),
						'fileName': plus.android.invoke(file, "getName"),
						'origin': 'QQ',
						'isActive': false
					});
				}
			}
		}
	}
	return arr;
}

function judgeFile(path) { //判断文件夹是否存在
	var File = plus.android.importClass("java.io.File");
	var fd = new File(path);
	if (fd != null && fd.exists()) {
		return true;
	} else {
		return false;
	}
}

function judgeIsFolder(path) { //判断是文件还是文件夹
	var bool = true;
	var File = plus.android.importClass("java.io.File");
	var fd = new File(path);
	if (fd.isDirectory()) {
		bool = false;
	} else {
		bool = true;
	}
	return bool;
}

function readFileSize(file) {
	var FileInputStream = plus.android.importClass("java.io.FileInputStream");
	var fileSize = new FileInputStream(file);
	var size = fileSize.available();
	var fileSizeString;
	if (size == 0) {
		fileSizeString = "0B";
	} else if (size < 1024) {
		fileSizeString = size + "B";
	} else if (size < 1048576) {
		fileSizeString = (size / 1024).toFixed(2) + "KB";
	} else if (size < 1073741824) {
		fileSizeString = (size / 1048576).toFixed(2) + "MB";
	} else {
		fileSizeString = (size / 1073741824).toFixed(2) + "GB";
	}
	return fileSizeString;
}
module.exports = {
	getSDCardPath: getSDCardPath,
	readSonFilenum: readSonFilenum,
	judgeIsFolder: judgeIsFolder,
	judgeFile: judgeFile
}
