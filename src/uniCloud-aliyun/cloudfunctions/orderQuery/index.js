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
		case 'miniparamWeixin': //小程序订单查询
			unipayIns = unipay.initWeixin({
			  appId: wxConfigMp.appId,
			  mchId: wxConfigMp.mchId,
			  key: wxConfigMp.key,
			})
		break;
		case 'appWeixin'://app端微信支付
			unipayIns = unipay.initWeixin({
			  appId: wxConfigApp.appId,
			  mchId: wxConfigApp.mchId,
			  key: wxConfigApp.key,
			  // pfx: fs.readFileSync('/path/to/your/pfxfile'), // p12文件路径，使用微信退款时需要，需要注意的是阿里云目前不支持以相对路径读取文件，请使用绝对路径的形式
			})
		break;
		default:
			return {
				code: -1,
				msg: '参数错误'
			}
		break;
	}
	//event为客户端上传的参数
	console.log('event : ', event)
	 let res = await unipayIns.orderQuery({
	    outTradeNo: event.outTradeNo,
	  })
	  //返回数据给客户端
	  return res
};
