// 从外部（H5）跳转到App时的参数
export default function getargs(){
	let args= plus.runtime.arguments;
	// console.log(args) // {"name":"","path":"","query":"","id":0} 
	if(args){
		if(typeof args=='string'){
			if(args.indexOf("?")!=-1){
				  let parameter1 = args.split("newsId=")[1];
				  let parameter2 = args.split("modelId=")[1];
				  let parameter3 = args.split("caseId=")[1];
				  let parameter4 = args.split("myModelId=")[1];
				  if(parameter1){//新闻
					  uni.navigateTo({
					  	url:'/pages/news/newsDetail?id='+parameter1
					  })
				  }else if(parameter2){//公开模型库id
					  uni.navigateTo({
					  	url:'/pages/publicModel/modelDetail?modelId='+parameter2
					  })
				  }else if(parameter3){//病例id
					   uni.navigateTo({
					   	  url:'/pages/caselist/caselistdetail?id='+parameter3
					   })
				  }else if(parameter4){// 我的模型库id
					  uni.navigateTo({
					  	 url:'/pages/model/MyDetail?modelId='+parameter4
					  })
				  }
			}else{
				// console.log('不存在？')
			}
		}else{
			// console.log('object')
		}
	}else{
		// console.log('参数不存在')
	}
}