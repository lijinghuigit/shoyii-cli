<template>
	<view class="" style="padding: 10rpx 30rpx 0;">
		<!-- #ifdef MP-WEIXIN -->
		<!-- 公众号的关注，只适用于扫小程序码时展示 -->
		<official-account></official-account>
		<!-- #endif -->
		<view class="payStatus" style="margin-top: 20rpx;">
			<text v-if="billDetails.billStatus=='WFK'">未付款</text>
			<text v-if="billDetails.billStatus=='YFK'">已付款</text>
			<!-- <text v-if="item.billStatus=='YQ'">已逾期</text> -->
			<view class="count" style="">
				<text>￥</text><text>{{billDetails.totalAmount}}</text>
			</view>
			<text class="tip">*仅支持微信支付</text>
		</view>
		<view class="payInfo">
			<view class="item">
				<text class="time right" style="">支付金额</text>
				<text>{{billDetails.totalAmount}}</text><text>元</text>
			</view>
			<view class="item">
				<text class="time right" style="">交易对象</text>
				<text>{{billDetails.targetName}}</text>
			</view> 
			<view class="item">
				<text class="time right" style="">账单描述</text>
				<text style="flex: 1;">{{billDetails.billDescription}}</text>
			</view>
			<view class="item">
				<text class="time right" style="">账单编号</text>
				<text>{{billDetails.billNo}}</text>
			</view>
			<view class="item">
				<text class="time right" style="">创建时间</text>
				<text>{{time(billDetails.createTime)}}</text>
			</view>
			<view class="item" v-if="billDetails.paymentTime">
				<text class="time right" style="">付款时间</text>
				<text>{{time(billDetails.paymentTime)}}</text>
			</view>
		</view>
		<view class="btn" style="">
			<button type="default" @click='miniparamPayment(billDetails)' v-if="billDetails.billStatus=='WFK'||billDetails.billStatus=='YQ'" class="btn1">立即支付</button>
			<button type="default" v-if="billDetails.billStatus=='YFK'" class="btn1">已付款</button>
			<!-- <button type="default" @click='miniparamPayment(billDetails)' class="btn1">立即支付</button> -->
		</view>
			<!-- <navigator url="/pages/orderManage/orderSuccess">跳转支付成功页面</navigator> -->
		<!-- <view class="footer" @click="enterBill(billDetails.orderNo)">
			<button type="default" style="height: 100rpx;line-height: 100rpx;background-color: #86B0D4;color: #FFFFFF;">查看订单</button>
		</view> -->
	</view>
</template>

<script>
	import {billDetail,getOpenid,getOrderparams,notifyOrder} from '@/utill/api/order/order.js'
	export default{
		data(){
			return{
				billDetails:{},
				flag:true,//避免用户在短时间内点击
				openId:'',
				timerID:null,
			}
		},
		methods:{
			billDetail(id){
				let timer=setTimeout(function(){
					uni.showLoading({
						title:'加载中'
					})
				},1000)
				billDetail({
					billNo:id
				}).then(res=>{
					if(timer){
						clearTimeout(timer)
						uni.hideLoading()
					}
					console.log(res)
					if(res.data.code==0){
						this.billDetails=res.data.object
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
					}
				}).catch(err=>{
					console.log(err)
					if(timer){
						clearTimeout(timer)
						uni.hideLoading()
					}
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
			async miniparamPayment(data){
				// #ifndef MP-WEIXIN
				uni.showToast({
					title:'不支持网页端支付',
					icon:'none'
				})
				return
				// #endif
				if(this.flag){
					this.flag=false
					if(data.totalAmount=='未报价'||data.totalAmount=='0.00'||data.totalAmount=='0'){
						uni.showToast({
							title:'金额为0或未报价',
							icon:'none'
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
							title:`openId获取失败,${result.data.msg}`
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
						if(res.data.code==0){
							wx.requestPayment({
							  timeStamp: res.data.object.timeStamp,
							  nonceStr: res.data.object.nonceStr,
							  package: res.data.object.packages,
							  signType: res.data.object.signType,
							  paySign: res.data.object.paySign,
							  success: (res) =>{
								   console.log(res)
									notifyOrder({ 
										// outTradeNo:data.billNo
										outTradeNo:res.data.object.billNoStr
									}).then(res=>{
										console.log(res)
										if(res.data.code==0){
											uni.showToast({
												title:res.data.object.message
											})
											this.billDetail(data.billNo)
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
							  fail (err) { 
								  console.log(err)
								  uni.showToast({
								  	title:'err',
								  	icon:'none'
								  })
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
		},
		onLoad(option) {
			console.log(option)
			// 支付成功后，会跳转到该页面，然后进行订单列表数据的刷新
			// #ifdef MP-WEIXIN
			if(option.scene){ 
				var scene=decodeURIComponent(option.scene)
				this.billDetail(scene)
			}else{
				uni.showToast({
					title:'仅支持扫码查看',
					icon:'none'
				})
			}    
			// #endif
			// #ifdef H5
			if(option.billNo){
				this.billDetail(option.billNo)
			}else{
				uni.showToast({
					title:'内容为空',
					icon:'none'
				})
			}
			// #endif
		},
		onUnload(){
			clearTimeout(this.timerID)
		},
	}
</script>

<style scoped lang="scss">
		.payStatus{
			padding: 50rpx 30rpx;text-align: center;
			background-color: #FFFFFF;
			.count{
				font-size: 48rpx;font-weight: bold;font-family: PingFang-SC-Bold;
				margin: 10rpx 0;
			}
			.tip{
				color: #8F8F8F;
			}
		}
		.payInfo{
			background-color: #FFFFFF;padding: 30rpx 28rpx;border-radius: 15rpx;
			.item{
				line-height: 56rpx;
				color: #000000;
				display: flex;
				.time{
					color: #8F8F8F;
					width: 112rpx;
					display: block;
				}
				.right{
					margin-right: 38rpx;
				}
			}
		}
		.btn{
			margin-top: 80rpx;
			.btn1{
				height: 88rpx;line-height: 88rpx;background-color: #52D17F;color: #FFFFFF;
				font-size: 30rpx;font-family: PingFang-SC-Bold;font-weight: bold;
			}
		}
		.footer{
			position: fixed;
			bottom: 20rpx;
			left: 0;
			right: 0;
			width: 100%;
			padding: 0 30rpx;
		}
	
	
	
</style>
