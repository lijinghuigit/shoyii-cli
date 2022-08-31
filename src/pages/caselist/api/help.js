import {myRequest} from '@/utill/http/request.js'
export const help=params=>{
	console.log(params)
	return myRequest({
		url:'/omsOrder/generateOperationDesignOrder',
		method:'POST',
		data:params
	})
} 
 // 获取设计团队
export const getTeam=params=>{
	console.log(params)
	return myRequest({
		url:'/omsOrder/queryImageGroupVO',
		data:params,
		method:'POST',
	})
}
// 获取影像组团队信息
export const getTeamInfor=params=>{
	console.log(params)
	return myRequest({
		url:'/omsOrder/queryDeptInfoByDeptId',
		data:params,
	})
}
// 获取影像组负责人信息
export const getTeamLeader=params=>{
	console.log(params)
	return myRequest({
		url:'/omsOrder/queryLeaderInfo',
		data:params,
	})
}
// 获取价格表
export const getPrice=params=>{
	console.log(params)
	return myRequest({
		url:'/omsOrder/loadDeptDesignPriceList',
		data:params,
		method:'POST'
	})
} 
// 获取打印的基础材料
export const getMaterial=params=>{
	console.log(params)
	return myRequest({
		url:'/omsOrder/getBaseMaterials',
		data:params
	})
} 
export const getDepartments=params=>{
	// console.log(params)
	return myRequest({
		url:'/diseaseCategory/getAllDepartments',
		data:params
	})
} 