import en from './en.json'
import zhHans from './zh-Hans.json'
import zhHant from './zh-Hant.json'
export default {
	en,
	// #ifdef APP-PLUS||H5
	"zh-Hans":zhHans,
	// #endif
	// #ifdef MP-WEIXIN
	"zh-Hans":zhHans,// zh_CN
	// #endif
	"zh-Hant":zhHant
}
