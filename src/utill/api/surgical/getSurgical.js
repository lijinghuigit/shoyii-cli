// var request=require('../../http/request.js')
import {myRequest} from '@/utill/http/request.js'
export const getSurgical=params=>{//获取手术方法数据
	console.log(params)
	return myRequest({
		url:'/surgicalPlan/getSurgicalPlanList',
		data:params
	})
}
//获取小程序的手术方法数据
export const getSurgicalparam=params=>{
	console.log(params)
	return myRequest({
		url:'/surgicalPlan/getMySurgicalMethodForApplets',
		data:params
	})
}
export const getSurgicalMenu=params=>{
	console.log(params)
	return myRequest({//获取手术方法四级分类数据
		url:'/surgicalPlanType/getTypeListByParentId',
		data:params
	})
}  
export const getSurgicalDetail=params=>{
	console.log(params)
	return myRequest({//获取手术方法详情数据
		url:'/surgicalPlan/getDetails',
		data:params
	})
} 
// 获取小程序的手术方法详情数据
export const getSurgicalDetailParam=params=>{
	console.log(params)
	return myRequest({
		url:'/surgicalPlan/getDetails',
		data:params
	})
} 
export const getMySurgical=params=>{
	console.log(params)
	return myRequest({//获取我的方法详情数据
		url:'/surgicalPlan/getMySurgicalMethod',
		data:params
	})
}
// 获取成功案例
export const getSuccessCase=params=>{
	console.log(params)
	return myRequest({
		url:'/successfulCase/getAllSuccessfulCase',
		data:params
	})
}
// 查询成功案例的详情
export const getSuccessDetail=params=>{
	console.log(params)
	return myRequest({
		url:'/successfulCase/getDetails',
		data:params
	})
}
// 查询树蚁设计列表
export const getShoyiiList=params=>{
	console.log(params)
	return myRequest({
		url:'/caseAidedDesignContent/getCaseAidedDesignContentList',
		data:params
	})
}
// 查询树蚁设计详情
export const getShoyiiDetail=params=>{
	console.log(params)
	return myRequest({
		url:'/caseAidedDesignContent/getDetails',
		data:params
	})
}



