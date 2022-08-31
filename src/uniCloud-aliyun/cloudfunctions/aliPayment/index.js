'use strict';
const {
	wxConfigMp,
	wxConfigApp,
	wxConfigH5,
	aliConfigMp,
	aliConfigApp,
	aliConfigH5,
} = require('config')
const unipay = require('uni-pay')
exports.main = async (event, context) => {
	console.log(event)
	//event为客户端上传的参数
	console.log('event : ', event)
	let uniPayInstance,
		notifyUrl ='https://mobile.shoyii.com',
		// notifyUrl ='http://e09adb0eca0c.ngrok.io/payment/wxHooksHandle',
		openid,
		tradeType,
		outTradeNo,
		totalFee,
		subject,
		body,
		sandbox
	switch (event.plateForm) {
		case 'appAli'://app端支付宝支付
			uniPayInstance = unipay.initAlipay(aliConfigApp)
			tradeType = 'APP'//app支付必填
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
				outTradeNo,
				totalFee,
				subject,//支付宝必填，微信忽略
				notifyUrl,
				tradeType
			})
		} catch (e) {
			console.log('报错')
			console.log(e)
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
