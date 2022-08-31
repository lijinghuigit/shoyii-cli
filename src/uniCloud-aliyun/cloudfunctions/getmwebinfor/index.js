'use strict';
const {
	wxConfigWWEB
} = require('config')
const unipay = require('uni-pay')
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	let uniPayInstance,
		notifyUrl ='https://doctor.shoyii.com/payment/wxHooksHandle',
		openid,
		tradeType,
		outTradeNo,
		totalFee,
		subject,
		body,
		sceneInfo,
		spbillCreateIp
	switch (event.plateForm) {
		case 'MWEB'://h5端微信支付
			uniPayInstance = unipay.initWeixin(wxConfigWWEB)
			tradeType = 'MWEB'
			outTradeNo=event.outTradeNo
			totalFee=event.totalFee// 金额，单位分
			body=event.body,
			sceneInfo=event.sceneInfo,
			spbillCreateIp=context.CLIENTIP
		break;
		default:
			return {
				code: -1,
				msg: '参数错误'
			}
		}
		let orderInfo
		try {
			// 获取支付信息
			orderInfo = await uniPayInstance.getOrderInfo({
				outTradeNo,
				totalFee,
				body,
				notifyUrl,
				tradeType,
				sceneInfo,
				spbillCreateIp
			})
		} catch (e) {
			console.log(e.message)
			return {
				code: -3,
				msg: '获取支付信息失败，请稍后再试'
			}
		}
		return {
			// outTradeNo,
			orderInfo
		}
};
