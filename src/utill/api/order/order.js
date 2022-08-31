import {myRequest} from '@/utill/http/request.js'
// 获取订单列表 
export const getOrderList=params=>{
	console.log(params)
	return myRequest({
		url:'/omsOrder/queryOrderListForPageApp',
		data:params
	})
}  
// 进入账单时,获取用户的openid,用于支付，用于小程序的
export const getOpenid=params=>{
	console.log(params)
	return myRequest({
		url:'/doctor/bindDoctorByOpenId',
		data:params,
		method:'POST'
	})
}
// 小程序端调起支付
export const getOrderparams=params=>{
	console.log(params)
	return myRequest({
		url:'/payment/wxV3Pay',
		data:params,
		method:'POST',
		header:'application/x-www-form-urlencoded'
	})
}
// 支付订单后通知服务端
export const notifyOrder=params=>{
	console.log(params)
	return myRequest({
		url:'/payment/webWxV3HooksHandle',
		data:params,
		method:'POST',
		header:'application/x-www-form-urlencoded'
	})
}
// 查询订单下的所有账单
// export const getOrderDetail=params=>{
// 	console.log(params)
// 	return myRequest({
// 		url:'/omsOrder/getBillsForAppByOrderNo',
// 		data:params
// 	})
// }
// 订单疑问时,删除的图片
export const delOrderPicture=params=>{
	console.log(params)
	return myRequest({
		url:'/fileHandle/delFileById',
		data:params,
		method:'POST',
		header:'application/x-www-form-urlencoded'
	})
}
// 订单疑问的提交
export const orderQuestionSave=params=>{
	console.log(params)
	return myRequest({
		url:'/omsProblem/saveOrModify',
		data:params,
		method:'POST'
	})
}
// 给后端发送支付成功的数据
export const paymentResult=params=>{
	console.log(params)
	return myRequest({
		url:'/payment/webWxHooksHandle',
		data:params,
		method:'POST'
	})
}
// 根据账单编号去查该账单的支付情况
export const billDetail=params=>{
	console.log(params)
	return myRequest({
		url:'/omsOrder/getBillForAppByBillNo',
		data:params,
	})
}
// 取消订单
export const cancelOrder=params=>{
	console.log(params)
	return myRequest({
		url:'/omsOrder/cancelOrder',
		data:params,
	})
}
// 根据病例号查询订单的相关信息(只在病例详情中用到)
// export const getCaseOrder=params=>{
// 	console.log(params)
// 	return myRequest({
// 		url:'/omsOrder/getAidedDesignForApp',
// 		data:params,
// 	})
// }
export const getCaseOrder=params=>{
	console.log(params)
	return myRequest({
		url:'/omsOrder/getAidedDesignForAppNew',
		data:params,
	})
}
// 账单详情
export const orderDetail=params=>{
	console.log(params)
	return myRequest({
		url:'/omsOrder/getBillsByOrderNo',
		data:params,
	})
}
// 确认收货
export const sureOrder=params=>{
	console.log(params)
	return myRequest({
		url:'/omsOrder/confirmReceipt',
		data:params,
		method:'POST'
	})
}
// 用户确认服务
export const ensureService=params=>{
	console.log(params)
	return myRequest({
		url:'/omsOrder/confirmationService',
		data:params,
		method:'POST'
	})
} 
// 退款
export const refund=params=>{
	console.log(params)
	return myRequest({
		url:'/omsOrder/refunds',
		data:params,
		method:'POST',
		header:'application/x-www-form-urlencoded'
	})
} 
// 查询订单服务价格
export const getorderPrice=params=>{
	console.log(params)
	return myRequest({
		url:'/orderServicePrices/getOrderServicePrices',
		data:params,
		method:'POST',
		header:'application/x-www-form-urlencoded'
	})
}
// 根据订单号查询物流信息
export const getlogisticInfo=params=>{
	console.log(params)
	return myRequest({
		url:'/orderLogistics/loadLogistics',
		data:params,
	})
}
// 申请发票
export const addIvoice=params=>{
	console.log(params)
	return myRequest({
		url:'/omsOrderInvoice/addOrModify',
		data:params,
		method:'POST',
	})
}
// 获取发票数据
export const getIvoice=params=>{
	console.log(params)
	return myRequest({
		url:'/omsOrderInvoice/getOmsOrderInvoice',
		data:params,
	})
}