'use strict';
const {
	wxConfigH5,
	aliConfigH5,
} = require('config')
const unipay = require('uni-pay')
exports.main = async (event, context) => {
	console.log(event)
	//event为客户端上传的参数
	console.log('event : ', event)
	let uniPayInstance,
		notifyUrl ='https://doctor.shoyii.com/payment/wxHooksHandle',
		// notifyUrl ='http://192.168.31.141:8083/payment/wxHooksHandle',
		openid,
		tradeType,
		outTradeNo,
		totalFee,
		subject,
		body
	switch (event.plateForm) {
		case 'webWxpay'://h5微信支付
			uniPayInstance = unipay.initWeixin(wxConfigH5)
			openid = event.openid
			tradeType = 'NATIVE'
			outTradeNo=event.outTradeNo
			totalFee=event.totalFee// 金额，单位分
			subject=event.subject
			body=event.body
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
				openid, // App端支付时不需要openid，传入个undefined也没有影响
				outTradeNo,
				totalFee,
				subject,//支付宝必填，微信忽略
				body,
				notifyUrl,
				tradeType
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
