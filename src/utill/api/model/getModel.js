import {myRequest} from '@/utill/http/request.js'
// 获取公共模型列表，
export const getPublicModel=params=>{
	console.log(params)
	return myRequest({
		url:'/modelLib/getModelTypeListForPublic',
		data:params
	})
}  
// 添加或去除收藏
export const handlecollect=params=>{
	console.log(params)
	return myRequest({
		url:'/modelLib/saveOrRemoveModelToCollection',
		data:params
	})
} 
// 新的获取分类下的模型数据
export const getClassifyModel=params=>{
	console.log(params)
	return myRequest({
		url:'/modelLib/getModelLibPageListForPc',
		data:params
	})
} 
// // 获取公共模型详情
export const getModelDetail=params=>{
	console.log(params)
	return myRequest({
		url:'/modelLib/getModelLibDetail',
		data:params
	})
} 
// 查询所有的分类
export const getClassifyType=params=>{
	console.log(params)
	return myRequest({
		url:'/modelLib/getAllModelLibType',
		data:params
	})
} 
// 获取分类对应的数据（我的模型库下面对应的日期列表数据）
export const getClassifyList=params=>{
	console.log(params)
	return myRequest({
		url:'/modelLib/getGroupModelLibs',
		data:params
	})
} 
// 新增模型分类
// export const addClassify=params=>{
// 	console.log(params)
// 	return myRequest({
// 		url:'/modelLib/newModelCategory',
// 		method:'POST',
// 		data:params
// 	})
// }
// 修改模型库
 export const editModel=params=>{
 	console.log(params)
 	return myRequest({
 		url:'/modelLib/modifyModelLib',
 		method:'POST',
 		data:params
 	})
 } 
 // 批量将模型转到其他分类
  // export const batchModel=params=>{
  // 	console.log(params)
  // 	return myRequest({
  // 		url:'/modelLib/batchModifyModelLibType',
  // 		method:'POST',
  // 		data:params
  // 	})
  // } 
  // 批量公开模型
   // export const batchshareModel=params=>{
   // 	console.log(params)
   // 	return myRequest({
   // 		url:'/modelLib/batchShareModelLib',
   // 		method:'POST',
   // 		data:params
   // 	})
   // } 
   // 删除模型分类
    // export const deleteModelType=params=>{
    // 	console.log(params)
    // 	return myRequest({
    // 		url:'/modelLib/delModelCategory2',
    // 		data:params
    // 	})
    // } 
	// 修改模型分类名称
	export const editModelType=params=>{
	 	console.log(params)
	 	return myRequest({
	 		url:'/modelLib/modifyModelLibTypeName',
			method:'POST',
	 		data:params
	 	})
	}
	// -------------新的我的模型库-----------------
	// 获取我的模型库列表
	export const getMyModel=params=>{
	 	console.log(params)
	 	return myRequest({
	 		url:'/modelLib/getModelTypeList',
	 		data:params
	 	})
	}
	// 获取我的模型库的分类列表
	export const getMyclassify=params=>{
	 	console.log(params)
	 	return myRequest({
	 		url:'/modelLib/getModelLibPageListForPc',
	 		data:params
	 	})
	}
	// 对模型分类进行修改
	export const editClassify=params=>{
	 	console.log(params)
	 	return myRequest({
	 		url:'/modelLib/submitModelType',
			method:'POST',
	 		data:params
	 	})
	}
	// 删除模型分类
	export const deleteClassify=params=>{
	 	console.log(params)
	 	return myRequest({
	 		url:'/modelLib/deleteModelType',
	 		data:params
	 	})
	}
	// 新增或修改模型
	export const editModelClassify=params=>{
	 	console.log(params)
	 	return myRequest({
	 		url:'/modelLib/submit',
	 		data:params,
			method:'POST'
	 	})
	}
	