<template>
	<view class="paymentOrder" :data-theme='themeType'>
		<text class="tip" v-if="this.paymentData.length>1">该账单已超过单笔支付最高金额￥6000，已自动拆分为{{paymentData.length}}个账单</text>
		<view class="" style="margin-top: 48rpx;">
			<view class="items sy_block" v-for="(item,index) in paymentData" :key='index'>
				<view style="padding: 0 0 30rpx;display: flex;align-items: center;font-size: 26rpx;color: #8f8f8f;">
					<text class="">账单编号:</text>
					<text style="flex: 1;text-align:left;margin: 0 20rpx;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">{{item.billNo}}</text>
					<text class="iconfont iconfuzhi1" @click="copyOrder(item.billNo)"></text>
				</view>
				<text v-if="item.billStatus=='WFK'">未付款</text>
				<text v-if="item.billStatus=='YFK'">已付款</text>
				<!-- <text v-if="item.billStatus=='YQ'">已逾期</text> -->
				<view class="count sy_title_deep" style="">
					<text>￥</text><text>{{item.totalAmount}}</text>
				</view>
				<text class="tip">*仅支持微信支付</text>
				<view class="btn" style="">
					<!-- #ifndef MP-WEIXIN -->
					<button type="default" @click='payment(item)' v-if="item.billStatus=='WFK'||item.billStatus=='YQ'" class="btn1">立即支付</button>
					<!-- #endif -->
					<!-- #ifdef MP-WEIXIN -->
					 <button type="default" @click='miniparamPayment(item)' v-if="item.billStatus=='WFK'||item.billStatus=='YQ'" class="btn1">立即支付</button>
					<!-- #endif -->
					<!-- <button type="default" @click='payment(item)' v-if="item.billStatus=='WFK'||item.billStatus=='YQ'" class="btn1">支付测试</button> -->
					<button type="default" v-if="item.billStatus=='YFK'" class="btn1 btn2">已付款</button>
				</view>
			</view>
			<!-- <navigator url="/pages/orderManage/orderSuccess">跳转支付成功页面</navigator> -->
		</view>
		<u-modal v-model="show" title='长按识别二维码' :show-confirm-button='false' :show-cancel-button='true' cancel-color='#19be6b'>
			<view class="slot-content" style="background-color: #FFFFFF;padding: 20rpx;text-align: center;">
				<tki-qrcode
				ref="qrcode" 
				:val="val" 
				:size="sizes" 
				:unit="unit" 
				:icon="icon"
				:onval=true 
				:loadMake="loadMake" 
				:usingComponents="true"
				@result="qrR" />
				<view class="" style="color: red;padding: 30rpx 0;">
					<text>有效期为2个小时，请注意支付时间</text>
					<view class="">
						<text style="font-size: 24rpx;color: #000;">支付完成后，请重新进入页面查看支付状态</text>
					</view>
				</view>
				<!-- <view class="" @click="saveCode" style="color: #18B566;padding: 20rpx 0;">
					<u-button type="success">点击保存相册</u-button>
				</view> -->
			</view>
		</u-modal>
	</view>
</template>

<script>
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	import {orderDetail,paymentResult,getOpenid,getOrderparams,notifyOrder} from '@/utill/api/order/order.js'
	export default{
		components:{
			tkiQrcode
		},
		data(){
			return{
				paymentData:[],//账单的信息
				flag:true,//避免用户在短时间内点击
				timerID:null,
				orderData:{},//订单的数据
				show: false,
				val: '无效码，请重新生成', // 要生成的二维码值
				sizes: 200, // 二维码大小
				unit: 'px', // 单位
				icon: '/static/image/shoyiilogo.png', // 二维码图标
				iconsize: 80, // 二维码图标大小
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: false, // val值变化时自动重新生成二维码
				loadMake: false, // 组件加载完成后自动生成二维码
				openId:''
			}
		},
		methods:{
			// 复制订单号
			copyOrder(orderNo){
				// console.log(orderNo)
				uni.setClipboardData({
				    data: orderNo,
				    success: function () {
				        // console.log('success');
						uni.showToast({
							title:'复制成功',
							icon:'none'
						})
				    }
				});
			},
			// 保存二维码到相册
			saveCode(){
				this.$refs.qrcode._saveCode()
			},
			qrR(e){
				// console.log(e) //移动端是图片路径，网页是base64
				// this.src = e
			},
			orderDetail(id){
				orderDetail({
					orderNo:id,
					flag:'bill'
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						this.orderData=res.data.object
						this.paymentData=res.data.object.omsBills?res.data.object.omsBills:[]
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
					}
				}).catch(err=>{
					console.log(err)
					uni.showToast({
						title:'err',
						icon:'none'
					})
				})
			},
			// 获取openid
			miniOpenid(){
				// 同步wx.login
				return new Promise((reslove,reject) => {
				    uni.login({
						success: async (res)=> {
							console.log(res.code)
							let data = await getOpenid({
								jsCode:res.code
							})
							reslove(data);
						},
						fail:(err)=>{
							reject(err)	
						}
				    })
				})
			},
			randomStr(length){
			  const chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			  let noceStr='';
			  let maxPos=chars.length;
			  while (length--) noceStr += chars[Math.random()*maxPos |0]
			  return noceStr
			},
			// 小程序端的支付
			async miniparamPayment(data){
				if(this.flag){
					this.flag=false
					if(data.totalAmount=='未报价'||data.totalAmount=='0.00'||data.totalAmount=='0'){
						uni.showToast({
							title:'暂不能支付'
						})
						return;
					}
					uni.showLoading({//避免接口调用时间长， 没反应
						title:'加载中'
					})
					const result= await this.miniOpenid()
					uni.hideLoading()
					if(result.data.code==0){
						this.openId=result.data.object
					}else{
						uni.showToast({
							title:`openId获取失败,${result.data.msg}`,
							icon:'none'
						})
						return
					}
					uni.showLoading({//避免接口调用时间长， 没反应
						title:'调起支付中'
					})
					getOrderparams({
						billNo:data.billNo,
						description:data.billDescription,
						openId:this.openId,
						payAmount:data.totalAmount,
						tradeType:'jsapi',
					}).then(res=>{
						uni.hideLoading()
						console.log(res)
						if(res.data.code==0){
							wx.requestPayment({
							  timeStamp: res.data.object.timeStamp,
							  nonceStr: res.data.object.nonceStr,
							  package: res.data.object.packages,
							  signType: res.data.object.signType,
							  paySign: res.data.object.paySign,
							  success (res) {
								   console.log(res)
									notifyOrder({
										// outTradeNo:data.billNo
										outTradeNo:res.data.object.billNoStr
									}).then(res=>{
										console.log(res)
										if(res.data.code==0){
											uni.navigateTo({//订单查询完之后，进行跳转页面
												url:'/pages/orderManage/orderSuccess?billNo='+data.billNo
											})  
										}else{
											uni.showToast({
												title:res.data.msg,
												icon:'none'
											})
										} 
									}).catch(err=>{
										console.log(err)
									}) 
							  }, 
							  fail (err) { 
								  console.log(err)
								  if(err.errMsg=='requestPayment:fail cancel'){
									  uni.showToast({
									  	title:'取消支付',
									  	icon:'none'
									  })
								  }else{
									  uni.showToast({
									  	title:err.errMsg,
									  	icon:'none'
									  })
								  }
							  }
							})
						}else{
							uni.showToast({
								title:res.data.msg,
								icon:'none'
							})
						}
					}).catch(err=>{
						uni.hideLoading()
						console.log(err)
					})
				}
				this.timerID = setTimeout(()=> {
					console.log('你有执行吗')
					this.flag = true
				}, 4000)
			},
			async payment(data){
				if(this.flag){
					this.flag=false
					if(data.totalAmount=='未报价'||data.totalAmount=='0.00'||data.totalAmount=='0'){
						uni.showToast({
							title:'暂不能支付'
						})
						return;
					}
					// #ifdef MP-WEIXIN
					uni.showLoading({//避免接口调用时间长， 没反应
						title:'加载中'
					})
					const result= await this.miniOpenid()
					uni.hideLoading()
					if(result.data.code==0){
						this.openId=result.data.object
					}else{
						uni.showToast({
							title:`openId获取失败,${result.data.msg}`
						})
						return
					}
					// #endif
					var outTradeNo=this.randomStr(3)//随机数
					var subject=data.billDescription//app支付的副标题，
					if(!data.billSubject){
						uni.showToast({
							title:'订单描述错误',
							icon:'none'
						})
						return
					}
					var body=data.billSubject//订单描述
					var outTradeNo=data.billNo+outTradeNo//订单号
					// var outTradeNo=data.billNo//订单号
					// var outTradeNo='20210716144306148403521B398'
					var totalFee=Number((data.totalAmount)*100).toFixed(0)//总金额，分
					uni.showLoading({//避免接口调用时间长， 没反应
						title:'调起支付中'
					})
					var _this=this
					uniCloud.callFunction({
						name: 'getOrderInfo',
						data:{
							// #ifdef MP-WEIXIN
							plateForm:'miniparamWeixin',
							// #endif
							// #ifdef APP-PLUS
							plateForm:'appWeixin',
							// #endif
							// #ifdef H5
							plateForm:'webWxpay',
							// #endif
							body:body,
							outTradeNo:outTradeNo,
							totalFee:totalFee,
							// #ifdef APP-PLUS||H5
							subject:subject,//app的副标题
							// #endif
							openid:this.openId,
							// sandbox:true
						},
						success(res) {
							uni.hideLoading()
							console.log(res)
							// #ifdef H5
								console.log(res)
								console.log(res.result.orderInfo.codeUrl)
								_this.val=res.result.orderInfo.codeUrl
								_this.show=true
								console.log(this)
								_this.$nextTick(() => {
									_this.$refs.qrcode._makeCode()
								 });
							   return;
							// #endif
							console.log(res.result.orderInfo) //这可以做判断，避免云函数调用失败继续执行
							uni.requestPayment({
								// #ifdef APP-PLUS
								provider: 'wxpay', // App端此参数必填，可以通过uni.getProvider获取
								// #endif
								// #ifdef MP-WEIXIN
								...res.result.orderInfo,
								// #endif
								// #ifdef APP-PLUS || MP-ALIPAY
								orderInfo: res.result.orderInfo,
								// #endif
							    ...res.result.orderInfo,
								success(e){
									console.log(e)
									// errMsg: "requestPayment:ok"
									// 支付成功后,需要进行支付的禁止
									// 点击支付完成之后,如果需要跳转页面,可以在这里设置逻辑
									uni.showLoading({
										title:'加载中'
									})
									uniCloud.callFunction({//查询订单
										name: 'orderQuery',
										data:{
											// #ifdef MP-WEIXIN
											plateForm:'miniparamWeixin',
											// #endif
											// #ifdef APP-PLUS
											plateForm:'appWeixin',
											// #endif
											outTradeNo:outTradeNo
										},
										success(e) {
											uni.hideLoading()
											console.log(e)
											if(e.result.tradeState=='SUCCESS'&&e.result.totalFee==totalFee){//支付成功，将结果返给后端，后端通过与微信发送的消息去修改订单的状态
												paymentResult({
													resultCode:e.result.resultCode,
													returnCode:e.result.returnCode,
													outTradeNo:e.result.outTradeNo,
													tradeType:e.result.tradeType,
													totalFee:e.result.totalFee,//总金额，分
													openId:e.result.openid,
													timeEnd:e.result.timeEnd,//交易完成时间
													transactionId:e.result.transactionId//微信交易号
												}).then(res=>{
													console.log(res)
													if(res.data.code==0){
														uni.navigateTo({//订单查询完之后，进行跳转页面
															url:'/pages/orderManage/orderSuccess?billNo='+data.billNo
														})
													}else{
														uni.showToast({
															title:res.data.msg,
															icon:'none'
														})
													}
												}).catch(err=>{
													console.log(err)
												})
											}
										},fail(err) {
											uni.hideLoading()
											console.log(err)//订单不存在， 返回值为ORDERNOTEXIST
										}
									})
								},
								fail(err){//取消支付
									// console.log('2')
									console.log(JSON.stringify(err))
									uni.showToast({
										title:'取消支付',
										icon:'none'
									})
									// uni.report('订单支付时报错',{
									// 	outTradeNo:outTradeNo,
									// 	err:JSON.stringify(err)
									// })
									// 小程序取消支付
									// {"errMsg":"requestPayment:fail 系统错误，错误码：1, [20201229 14:38:04][touristappid]"}
									// {"errMsg":"requestPayment:fail cancel"}
									// app取消支付
									 // {"errMsg":"requestPayment:fail [payment微信:-2]User canceled","errCode":-100,"code":-100} 
								}
							})
						},
						fail(err) {
							// uni.report('获取订单支付参数时报错',{
							// 	outTradeNo:outTradeNo,
							// 	err:err
							// })
							uni.hideLoading()
							console.log(err)
							uni.showToast({
								title:'err1'
							})
						}
					})
				}
				this.timerID = setTimeout(()=> {
					console.log('你有执行吗')
					this.flag = true
				}, 4000)
			},
		},
		onLoad(option) {
			this.orderDetail(option.orderNo)
		},
		onUnload(){
			clearTimeout(this.timerID)
		},
		onBackPress(e){
			// console.log(getCurrentPages())
			var page =getCurrentPages()[0].route;
			// console.log(page)
			uni.navigateTo({
				url:'/pages/orderManage/orderDetail?orderNo='+this.orderData.orderNo
			})
			return true
		},
		onReady(){
			this.amendNavigator()
		}
	}
</script>

<style scoped lang="scss">
	.paymentOrder{
		width: 100%;
		/* #ifdef H5 */
		min-height: 100%; 
		/* #endif */
		/* #ifndef H5 */
		min-height: 100vh;
		/* #endif */
		padding: 30rpx;
		font-size: 24rpx;
		font-family: PingFang-SC-Medium;
		color: #000000;
		.tip{
			color: #8F8F8F;
		}
		.items{
			padding: 20rpx 30rpx;text-align: center;
			background-color: #FFFFFF;margin-bottom: 30rpx;
			.count{
				font-size: 48rpx;font-weight: bold;font-family: PingFang-SC-Bold;
				margin: 10rpx 0;
			}
			.btn{
				margin-top: 60rpx;
				.btn1{
					height: 88rpx;line-height: 88rpx;background-color: #52D17F;color: #FFFFFF;
					font-size: 30rpx;font-family: PingFang-SC-Bold;font-weight: bold;
				}
				.btn2{
					background-color: #ccc;
				}
			}
		}
	}
</style>
