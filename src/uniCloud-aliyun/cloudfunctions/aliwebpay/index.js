'use strict';
const {
	wxConfigH5,
	aliConfigH5,
	aliConfigApp
} = require('config')
const unipay = require('uni-pay')
exports.main = async (event, context) => {
	console.log('event : ', event)
	let uniPayInstance,
		notifyUrl ='https://doctor.shoyii.com/payment/wxHooksHandle',
		openid,
		tradeType,
		outTradeNo,
		totalFee,
		subject,
		body,
		sandbox,
		spbillCreateIp = context.CLIENTIP, //用于MWEB
		sceneInfo={} //用于MWEB
	switch (event.plateForm) {
		case 'webWxpay'://native微信支付
			uniPayInstance = unipay.initWeixin(wxConfigH5)
			openid = event.openid
			tradeType = 'NATIVE'
			outTradeNo=event.outTradeNo
			totalFee=event.totalFee// 金额，单位分
			subject=event.subject
			body=event.body
			break;
		case 'appAli'://app的阿里支付
			uniPayInstance = unipay.initAlipay(aliConfigApp)
			tradeType = 'APP'//app支付必填
			outTradeNo=event.outTradeNo
			totalFee=event.totalFee// 金额，单位分
			subject=event.subject
			body=event.body
			notifyUrl='https://mobile.shoyii.com'
			break;
		case 'nativeAli'://native支付宝支付
			uniPayInstance = unipay.initAlipay(aliConfigH5)
			tradeType = 'NATIVE'
			outTradeNo=event.outTradeNo
			totalFee=event.totalFee// 金额，单位分
			subject=event.subject
			body=event.body
			notifyUrl='https://mobile.shoyii.com'
			sandbox=true
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
				tradeType,
				spbillCreateIp,
				sceneInfo,
				sandbox,
			})
		} catch (e) {
			console.log(e)
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
