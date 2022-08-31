
function thirdParty(){
	// 为true则有微信，false为没有微信；
	var ifweixin=plus.runtime.isApplicationExist({
		  pname:'com.tencent.mm',
		  action: 'weixin://',
	 })
	 // 是否存在qq
	 var ifQQ=plus.runtime.isApplicationExist({
		  pname:'com.tencent.mobileqq',
		  action: 'mqq://',
	 })
	 if(ifweixin){
		 getApp().globalData.ifThird.ifweixin = true
	 }else{
		 getApp().globalData.ifThird.ifweixin = false
	 }
	 if(ifQQ){
		 getApp().globalData.ifThird.ifqq = true
	 }else{
		 getApp().globalData.ifThird.ifqq = false
	 }
}
export default thirdParty




