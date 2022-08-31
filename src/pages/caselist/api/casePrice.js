import {myRequest} from '@/utill/http/request.js'
// 查询基础部位信息
export const casePrice=params=>{
	console.log(params)
	return myRequest({
		url:'/surgicalAssistDesignPrice/loadAll',
		data:params
	})
}  
// 查询部位科室信息
export const getdepartment=params=>{
	console.log(params)
	return myRequest({
		url:'/surgicalAssistDesignPrice/loadLocationDepartmentList',
		data:params
	})
}  
// 查询经典案例
export const getclassifycase=params=>{
	console.log(params)
	return myRequest({
		url:'/caseHistory/getClassicCaseListBySurgicalPlanType',
		data:params
	})
} 
