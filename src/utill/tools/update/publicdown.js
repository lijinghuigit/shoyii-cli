import NotifiUtil from '@/js_sdk/swfq-notification-progress/notification/notification.js'
	function publicdown(type,url){
		if(type=='2'){//资源热更新
			var showLoading = plus.nativeUI.showWaiting("正在下载,请稍后...");
			const downloadTasks =
				uni.downloadFile({
					url: url,
					success: (res) => {
						console.log(res)
						if(res.statusCode===200){
							var filePath = res.tempFilePath;
							 // 仅安装wgt和wgtu时生效，默认值 false,true表示强制安装，不进行版本号的校验；false则需要版本号校验，
							plus.runtime.install(filePath,{force: true,},(e) => {
								showLoading.setTitle("安装中...");
								plus.runtime.restart(); //重启
								plus.nativeUI.closeWaiting();
							},(e) => {
								showLoading.setTitle("安装失败，请尝试重新下载");
								setTimeout(()=>{
									  plus.nativeUI.closeWaiting();
								},1000)
							})
						}
					},
					fail:(err)=>{
						showLoading.setTitle("下载失败");
						setTimeout(()=>{
							  plus.nativeUI.closeWaiting();
						},1000)
					}
				})
				downloadTasks.onProgressUpdate((res) => {
					console.log(res)
					showLoading.setTitle("正在下载" + res.progress + "%");
					if(res.progress==100){
						showLoading.setTitle("下载完成");
					}
				})
		}else{//整包更新
			// pagedownload(url)
			notifydownload(url)
		}
		// 页面内下载
		function pagedownload(url){
			var showLoading = plus.nativeUI.showWaiting("正在下载,请稍后...");
			const downloadTask =
				uni.downloadFile({
					url: url,
					success: (res) => {
						console.log(res)
						var filePath = res.tempFilePath;
						plus.runtime.install(filePath,{force: false,},(e) => {
							showLoading.setTitle("安装中...");
							setTimeout(()=>{
								  plus.nativeUI.closeWaiting();
							},1000)
						},(e) => {
							showLoading.setTitle("安装失败，请尝试重新下载");
							setTimeout(()=>{
								  plus.nativeUI.closeWaiting();
							},1000)
						})
					},
					fail:(err)=>{
						showLoading.setTitle("下载失败");
						setTimeout(()=>{
							  plus.nativeUI.closeWaiting();
						},1000)
					}
				})
				downloadTask.onProgressUpdate((res) => {
					console.log(res)
					showLoading.setTitle("正在下载" + res.progress + "%");
					if(res.progress==100){
						console.log(res.progress)
						showLoading.setTitle("下载完成");
						plus.nativeUI.closeWaiting();
					}
				})
		}
		// 通知栏下载
		function notifydownload(url){
			uni.showToast({
			    title: '下载中...',
			    icon:'none'
			});
			var appname='树蚁医疗';
			var NotificationUtil = NotifiUtil();//实例创建
			NotificationUtil.setNotification(appname, "开始下载! ");
			var dtask = plus.downloader.createDownload(url);// POST请求提交数据
			dtask.start();
			var arr = [
				{
					pro:1,
					isFirst:true
				},{
					pro:10,
					isFirst:true
				},{
					pro:30,
					isFirst:true
				},{
					pro:50,
					isFirst:true
				},{
					pro:70,
					isFirst:true
				},{
					pro:90,
					isFirst:true
				},
			]
			dtask.addEventListener( "statechanged", async function(task,status){
				console.log(task)
				console.log(status)
				switch(task.state) {
					case undefined: //下载任务未开始
					case 0: //下载任务开始调度
					case 1: //下载任务开始请求
					case 2: break; //下载任务请求已经接收
					case 3: // 已接收到数据
						// NotificationUtil.setProgress(Math.round(task.downloadedSize/task.totalSize*100),appname);//通知栏中实时更新进度条会引起操作界面卡顿：一秒执行40多次（监听函数），导致UI操作阻塞
						var pro = parseInt(task.downloadedSize/task.totalSize*100);
							// if(pro == 1 || pro == 10 || pro == 30 || pro == 50 || pro == 70 || pro == 90){//优化方案一：仅在指定整数进度时更新
							//     console.log("进度：" + pro);
							//     NotificationUtil.setProgress(pro,appname);
							// }
							switch (pro){//优化方案二：仅进度第一次出现（1,10，30，50，70，90）时刷新
								case arr[0].pro:
									if(arr[0].isFirst){
										console.log("进度：" + pro);
										NotificationUtil.setProgress(pro,appname);
										arr[0].isFirst = false;
									}
									break;
								case arr[1].pro:
									if(arr[1].isFirst){
										console.log("进度：" + pro);
										NotificationUtil.setProgress(pro,appname);
										arr[1].isFirst = false;
									}
									break;
								case arr[2].pro:
									if(arr[2].isFirst){
										console.log("进度：" + pro);
										NotificationUtil.setProgress(pro,appname);
										arr[2].isFirst = false;
									}
									break;
								case arr[3].pro:
									if(arr[3].isFirst){
										console.log("进度：" + pro);
										NotificationUtil.setProgress(pro,appname);
										arr[3].isFirst = false;
									}
									break;
								case arr[4].pro:
									if(arr[4].isFirst){
										console.log("进度：" + pro);
										NotificationUtil.setProgress(pro,appname);
										arr[4].isFirst = false;
									}
									break;
								case arr[5].pro:
									if(arr[5].isFirst){
										// console.log("进度：" + pro);
										NotificationUtil.setProgress(pro,appname);
										arr[5].isFirst = false;
									}
									break;
								default:
									break;
							}
						break;
					case 4: // 下载完成
						console.log("Download success: " + task.filename);
						NotificationUtil.compProgressNotification(appname,"下载完成! ");
						var ins = plus.runtime.install(plus.io.convertLocalFileSystemURL(task.filename), {force: true},()=>{
						    uni.showToast({icon:'none',title:'安装成功！'});
						    NotificationUtil.clearNotification();
						},(e)=>{
						    uni.showToast({icon:'none',title:'安装失败！'});
						    NotificationUtil.clearNotification();
						})
						// plus.runtime.install(task.filename);  // 安装下载的apk文件  
						break;
					default: //5: (Number 类型 )下载任务已暂停 -1: (Number 类型 )枚举任务状态
						console.log("Download failed: " + status);
						NotificationUtil.compProgressNotification(appname,"下载失败! ");
						break;
				}
			})
		}
	}

export default publicdown
