'use strict';
const {
	wxConfigMp,
	wxConfigApp,
	wxConfigH5,
} = require('config')
const unipay = require('uni-pay')
exports.main = async (event, context) => {
	let unipayIns;
	switch (event.plateForm){
		case 'miniparamWeixin': //小程序微信退款
			unipayIns = unipay.initWeixin({
			  appId: wxConfigMp.appId,
			  mchId: wxConfigMp.mchId,
			  key: wxConfigMp.key,
			  pfx:wxConfigMp.pfx, // p12文件路径，使用微信退款时需要，需要注意的是阿里云目前不支持以相对路径读取文件，请使用绝对路径的形式
			})
		break;
		case 'appWeixin'://app端微信支付
			unipayIns = unipay.initWeixin({
			  appId: wxConfigApp.appId,
			  mchId: wxConfigApp.mchId,
			  key: wxConfigApp.key,
			  pfx:wxConfigApp.pfx, // p12文件路径，使用微信退款时需要，需要注意的是阿里云目前不支持以相对路径读取文件，请使用绝对路径的形式
			})
		break;
		default:
			return {
				code: -1,
				msg: '参数错误'
			}
		break;
	}
	 let res = await unipayIns.refund({
	    outTradeNo: event.outTradeNo,
	    outRefundNo: event.outRefundNo, // 支付宝可不填此项
	    totalFee: event.totalFee, // 订单总金额，支付宝可不填此项
	    refundFee: event.refundFee, // 退款总金额,
		// notifyUrl:'' // 退款地址
	  })
	  return res
};
