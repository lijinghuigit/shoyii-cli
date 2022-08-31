<template>
	<view class="orderInfor" :data-theme='themeType'>
		<uni-notice-bar single="true" scrollable="true" showIcon="true"
		 v-if="notifyText"
		 :text="notifyText"></uni-notice-bar>
		<view class="title sy_title_deep">
			<text>{{orderData.paymentStatus}}</text>
			<view class="paycount sy_title_deep">
				<text>￥</text>
				<text class="count sy_title_deep">{{orderData.price}}</text>
			</view>
			<!-- <navigator url="/pages/orderManage/orderSuccess">跳转s支付</navigator> -->
		</view>
		<!-- 物流信息 -->
		<view class="service_items sy_block" v-if="orderData.logisticsNumber">
			<view class="item" style="display: flex;align-items: center;"
			@click="openLogistics(orderData.orderNo)">
				<text class="time right sy_title_primary" style="font-size: 28rpx;font-weight: 500;flex:1;color: #000000;
				white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">物流信息</text>
				<uni-icons type="forward" size="14" :color="themeType=='dark'?'#f8f8f8':'#666666'"></uni-icons>
			</view>
		</view>
		<!-- 树蚁设计报告 -->
		<view class="service_items sy_block" v-if="orderData.designReportFile&&orderData.designReportFile.length>0">
			<view class="item" style="display: flex;align-items: center;"
			v-for="(item,index) in orderData.designReportFile" :key='item.id'
			@click="openFile(item.fileDownloadUrl)">
				<text class="time right sy_title_primary" style="font-size: 28rpx;font-weight: 500;flex:1;color: #000000;
				white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">{{item.name}}</text>
				<uni-icons type="forward" size="14" :color="themeType=='dark'?'#f8f8f8':'#666666'"></uni-icons>
			</view>
		</view>
		<!-- 设计服务的信息 -->
		<view class="service_items sy_block" style="">
			<!-- <view class="item">
				<u-collapse :head-style='headStyle' style='width: 100%;' ref="aa">
					<u-collapse-item @change='change'>
						<template v-slot:title>
							<view class="">
								<text style="margin-right:40rpx;width: 112rpx;font-size: 28rpx;">服务项目：</text>
								<text style="color: #000000;">{{orderData.content}}</text>
							</view>
						</template>
						<view style="">
							<view class="" style="">
								<text style="">服务内容：</text>
							</view>
							<view class="" style="color: #000000;">
								<view class=""> -->
									<!-- 设计部位 -->
									<!-- <view v-if="aidedDesign.computerAidedDesignOrder?Object.keys(aidedDesign.computerAidedDesignOrder).length>0:false">
										<view v-if="aidedDesign.computerAidedDesignOrder.position?Object.keys(aidedDesign.computerAidedDesignOrder.position).length>0:false" style="display: flex;background-color: #F8F8F8;margin-bottom: 20rpx;padding:10rpx 20rpx;">
											<text style="color: #666666;">设计部位：</text>
											<view style="flex: 1;margin-left: 20rpx;">
												<view v-for="(item1,index1) in aidedDesign.computerAidedDesignOrder.position" :key='item1.id'>
													<text>{{item1.name}}</text><text style="margin: 0 10rpx;">-</text>
													<text v-for="(item2,index2) in item1.position" :key='index2'>{{item2}} 
														<text v-show="item1.position.length!=index2+1">、</text>
													</text>
												</view>
											</view>
										</view>
									</view>
									<view style="background-color: #F8F8F8;margin-bottom: 20rpx;padding:10rpx 20rpx;">
										<view style="display: flex;" v-if="aideType.length>0">
											<text style="color: #666666;">服务项目：</text>
											<view style="flex: 1;display: flex;flex-wrap: wrap;">
												<view style="padding: 0 10rpx;" v-for="(item,index) in aideType.length>0?aideType:[]" :key='index'>
													<text>{{handleType(item)}}</text>
													<text v-if="aideType.length!=index+1" style="color: #000;font-weight: bold;margin-left: 3rpx;">,</text>
												</view>
											</view>
										</view>
										<view class="" v-if="aidedDesign.computerAidedDesignOrder?Object.keys(aidedDesign.computerAidedDesignOrder).length>0:false" style="background-color: #F8F8F8;">
											<view class="" v-if="aidedDesign.computerAidedDesignOrder.totalPrice">
												<text style="color: #666666;">项目价格：</text>
												<text>￥</text><text>{{aidedDesign.computerAidedDesignOrder.totalPrice}}</text>
											</view>
										</view>
									</view> -->
									<!-- 导板材料 -->
									<!-- <view v-if="aidedDesign.guidePlateOrder" style="margin-bottom: 20rpx;background-color: #F8F8F8;padding:10rpx 20rpx;">
										<view class="">
											<text style="color: #666666;">服务项目：</text>
											<text style="margin-left: 20rpx;">导板制备</text>
										</view>
										<view class="" v-if="aidedDesign.guidePlateOrder.secondaryName">
											<text style="color: #666666;">制备材料：</text>
											<text style="margin-left: 20rpx;">{{aidedDesign.guidePlateOrder.secondaryName}}</text>
										</view>
										<view class="" v-if="aidedDesign.guidePlateOrder.totalPrice">
											<text style="color: #666666;">制备价格：</text>
											<text style="margin-left: 20rpx;">￥</text><text>{{aidedDesign.guidePlateOrder.totalPrice}}</text>
										</view>
									</view> -->
									<!-- 模型打印的材料 -->
									<!-- <view class="" v-if="aidedDesign.modelOrder" style="margin-bottom: 20rpx;background-color: #F8F8F8;padding:10rpx 20rpx;" >
										<view class="">
											<text style="color: #666666;">服务项目：</text>
											<text style="margin-left: 20rpx;">模型制备</text>
										</view>
										<view class="" v-if="aidedDesign.modelOrder.secondaryName">
											<text style="color: #666666;">制备材料：</text>
											<text style="margin-left: 20rpx;">{{aidedDesign.modelOrder.secondaryName}}</text>
										</view>
										<view class="" v-if="aidedDesign.modelOrder.totalPrice">
											<text style="color: #666666;">制备价格：</text>
											<text style="margin-left: 20rpx;">￥</text><text>{{aidedDesign.modelOrder.totalPrice}}</text>
										</view>
									</view>
								</view> -->
								<!-- 报价的说明 -->
								<!-- <view class="" v-if="orderData.quoteDescription" style="background-color: #F8F8F8;padding:10rpx 20rpx;margin-bottom: 20rpx;">
									<text style="font-weight: bold;">报价说明：</text>
									<text>{{orderData.quoteDescription}}</text>
								</view>
							</view>
						</view>
					</u-collapse-item>
				</u-collapse>
			</view> -->
			<!-- 服务项目及订单金额 -->
			<view class="">
				<view class="" style="margin-bottom: 10rpx;">
					<text class="time right" style="">服务项目：</text>
				</view>
				<!-- 服务相关价格（服务，材料） -->
				<view class="" v-if="orderData.omsOrderItems&&orderData.omsOrderItems.length>0">
					<view class="item" v-for="(item,index) in orderData.omsOrderItems" :key='index'>
						<view class="service_left sy_title_primary">
							<text>{{item.primaryName}}</text>
							<text v-if="item.assistDesign&&item.assistDesign.softTissueBoolean">(软组织)</text>
							<text v-if="item.secondaryName">{{`(${item.secondaryName})`}}</text>
						</view>
						<text class="content sy_title_primary" style="color: #000000;">
						{{`￥${item.totalPrice}`}}
						</text>
					</view>
				</view>
			</view>
			<u-line class="u-line" margin="20rpx 0" :color="themeType=='dark'?'#333':'#eee'"></u-line>
			<view class="item">
				<text class="time right" style="">预计总价：</text>
				<text class="content sy_title_primary" style="text-decoration: line-through;">￥{{orderData.estimatedPrice}}</text>
			</view>
			<view class="item" v-if="orderData.price=='0'||orderData.price=='0.00'">
				<text class="time right" style="width: auto;">订单总价(实付款)：</text>
				<text class="content sy_title_primary">未确定</text>
			</view>
			<view class="item" v-else>
				<text class="time right" style="width: auto;">订单总价(实付款)：</text>
				<text class="content sy_title_primary">￥{{orderData.price}}</text>
			</view>
			<view class="item">
				<text class="time right" style="">报价说明：</text>
				<text class="content sy_title_primary" style="white-space: normal;">{{orderData.quoteDescription}}</text>
			</view>
		</view>
		<!-- 病例信息和订单信息 -->
		<view class="sy_block" style="background-color: #ffff;">
			<u-read-more show-height="200" text-indent='0' :toggle="true"
			:shadow-style="shadowStyle"
			color='#8F8F8F'
			close-text='查看更多'>
				<view class="service_items sy_block">
					<view class="item">
						<text class="time right" style="">对应病例：</text>
						<text class="content sy_title_primary" style="text-decoration: underline;"
						@click="show(1,orderData)">
						{{orderData.subordinateName||'未填写'}}
						</text>
					</view>
					<view class="item">
						<text class="time right" style="">编译团队：</text>
						<text class="content sy_title_primary">{{orderData.company}}</text>
					</view>
					<view class="item">
						<text class="time right" style="">订单状态：</text>
						<text class="content sy_title_primary">{{orderData.status}}</text>
					</view>
					<u-line class="u-line" margin="20rpx 0" :color="themeType=='dark'?'#333':'#eee'"></u-line>
					<view class="item">
						<text class="time right" style="">订单编号：</text>
						<text class="content sy_title_primary">{{orderData.orderNo}}</text>
						<!-- #ifndef H5 -->
						<text class="iconfont iconfuzhi1" @click="copyOrder"></text>
						<!-- #endif -->
					</view>
					<view class="item">
						<text class="time right" style="">创建时间：</text>
						<text class="content sy_title_primary">{{time(orderData.createTime)}}</text>
					</view>
					<view class="item">
						<text class="time right" style="">支付时间：</text>
						<text class="content sy_title_primary">{{time(orderData.createTime)}}</text>
					</view>
					<view class="item" v-if="orderData.paymentTime">
						<text class="time right" style="">完成时间：</text>
						<text class="content sy_title_primary">{{time(orderData.paymentTime)}}</text>
					</view>
				</view>
			</u-read-more>
		</view>
		<!-- 退款信息 -->
		<view class="service_items sy_block" v-if="billList.billStatus=='TK'" style="margin-top: 20rpx;">
			<view class="item" v-if="billList.outRefundNo">
				<text class="time right">退款编号：</text>
				<text class="content sy_title_primary">{{billList.outRefundNo}}</text>
			</view>
			<view class="item" v-if="billList.refundTime">
				<text class="time right">退款时间：</text>
				<text class="content sy_title_primary">{{time(billList.refundTime)}}</text>
			</view>
			<view class="item" v-if="billList.refundAmount">
				<text class="time right">退款金额：</text>
				<text class="content sy_title_primary">￥{{billList.refundAmount}}</text>
			</view> 
			<view class="item" v-if="orderData.refundReason">
				<text class="time right">退款原因：</text>
				<u-read-more show-height="90" text-indent='0' close-text='展开阅读更多' class="content sy_title_primary">
					<rich-text :nodes="orderData.refundReason"></rich-text>
				</u-read-more>
			</view>
		</view>	
		<!-- 底部转发等功能 -->
		<view class="footer sy_block">
			<!-- #ifdef MP-WEIXIN -->
			<button type="default" open-type='share' style="line-height: 92rpx;font-size: 28rpx;text-align: left;border-color: #F8F8F8;background-color: #FFFFFF;color: #000000;">转发</button>
			<!-- #endif -->
			<view class="items sy_border_bottom" v-for="(item,index) in boottomList" :key='index' @click="show(index,orderData)" 
			:hover-class="themeType=='dark'?'sy_hover_bg':'bgColor'">
				<text>{{item.title}}</text>
				<u-icon name="arrow-right" color="#666666" size="28"></u-icon>
			</view>
		</view>
		<view class="servicebtn">
			<button v-if="orderData.statusCode=='701'" type="default" @click="ensure" class="servicesure" style="">确认服务</button>
			<button v-if="orderData.statusCode=='901'" type="default" @click="servicePay" class="servicepayment" style="">立即支付</button>
			<view class="" v-if="orderData.statusCode=='201'">
				<button type="default" class="servicecancel" style="">请等待团队确认订单</button>
				<text @click="cancelorder" class="sy_title_primary">取消订单</text>
			</view>
			<view class="" style="display: flex;align-items: center;justify-content: space-between;">
				<button style="flex: 1;" type="default" v-if="orderData.statusCode=='902'||orderData.statusCode=='903'" @click="refund" 
				class="refund" :disabled="disabled||orderData.statusCode=='903'" :style="disabled||orderData.statusCode=='903'?'background:#666;color:#fff':''">
				{{disabled || orderData.statusCode=='903'?'退款申请中':'退款申请'}}
				</button>
				<!-- 状态为902，已完成时，才能申请发票 -->
				<!-- invoiceStatus 发票状态默认0（0：待申请；1：已申请；2：已开票；）  -->
				<button style="width: 60%;background-color: #69CDFF;color: #ffff;margin-left: 20rpx;" v-if="orderData.statusCode=='902'"
				@click="applyIvoice(orderData)">
					{{orderData.invoiceStatus==0?'申请发票':'查看发票'}}
				</button>
			</view>
		</view>
		<!-- 取消订单的模态框 -->
		<u-modal v-model="cancelshow" content="是否取消该订单" :show-cancel-button='true' :mask-close-able='true' @confirm='confirmModal' @cancel='cancelModal'></u-modal>
		<u-modal v-model="ensureShow" :show-title='false' :show-cancel-button='true' @confirm='ensureModal' @cancel='ensureCancel' confirm-text='是' cancel-text='否'>
			<view class="slot-content" style="">
				<view class="title">
					<text class="">是否确认使用该服务？</text>
				</view>
				<view class="tip">
					<text class="">如果确认，将会产生支付账单</text>
				</view>
				<text>￥</text><text class="title count">{{orderData.price}}</text>
				<!-- 输入二级密码 -->
				<view class="" v-if="secondSwitch" style="padding: 20rpx 30rpx;">
					<u-input v-model="secondPwd" placeholder='请输入二级密码' :border='true' type='password' :password-icon='true'/>
				</view>
			</view>
		</u-modal>
		<u-modal v-model="refundshow" title='退款申请' @confirm='refundConfirm' @cancel="refundCancel" confirm-color='red' show-cancel-button confirm-text='确定退款' mask-close-able>
			<view class="slot-content">
				<view class="" style="padding: 30rpx 30rpx 0;text-align: left;font-size: 30rpx;">
					<text style="color: #666;">退款金额：</text>￥
					<text>{{orderData.price}}</text>
				</view>
				<view class="" style="padding: 30rpx;">
					<u-input v-model="refundReason" type="textarea" :border="true" height='100' auto-height 
					placeholder='请输入退款原因,未填写或原因不详,可能会导致退款失败' maxlength='-1'/>
				</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import {orderDetail,ensureService,cancelOrder,refund} from '@/utill/api/order/order.js'
	import previewFiles from '@/utill/tools/previewFiles.js'
	export default{
		data(){
			return{
				// 展开更多阴影
				shadowStyle:{
					backgroundImage: "none",
					paddingTop: "0",
					marginTop: "20rpx"
				},
				orderData:{
					aidedDesign:{type:''},
					designReportFile:[],//树蚁设计报告
					omsOrderItems:{},//服务价格信息
				},// 账单详情
				billList:{},//账单的相关信息
				headStyle:{
					color:'gray'
				},
				aidedDesign:{},// 服务相关信息
				// aideType:[],// 服务内容
				orderNo:'',//订单号
				// 底部导航
				boottomList:[
					{title:'有疑问'},
					{title:'查看详情'},
					// #ifdef APP-PLUS
					{title:'转发账单'},
					// #endif
				],
				cancelshow:false,//取消订单
				ensureShow:false,//确定账单
				refundshow:false,//退款申请
				refundReason:'',//退款原因
				disabled:false,
				refundBtn:'申请退款',
				secondPwd:'',//二级密码
				notifyText:'',//通知栏
	
			}
		},
		computed:{
			secondSwitch(){// 是否设置二级密码,默认是有二级密码
				return this.$store.getters['user/info'].secondSwitch
			},
			// 手术设计type
			filterDesign(){
				if(this.orderData.aidedDesign.type.indexOf('3')!=-1){
					return true
				}else{
					return false
				}
			},
			// 三维重建type
			filterRebuild(){
				if(this.orderData.aidedDesign.type.indexOf('1')!=-1){
					return true
				}else{
					return false
				}
			}
		},
		methods:{
			// handleType(data){
			// 	console.log(data)
			// 	switch (data){
			// 		case '1':
			// 		return '三维重建';
			// 		case '2':
			// 		return '模型观察、分析、测量';
			// 		case '3':
			// 		return '手术设计模拟';
			// 		case '4':
			// 		return '导板制备';
			// 		case '5':
			// 		return '器械制备';
			// 		case '6':
			// 		return '模型制备';
			// 		case '7':
			// 		return '假体制备';
			// 		default:
			// 		return '无设计类型'
			// 	}
			// },
			// 手风琴重新渲染
			// change(e){
			// 	if(e.show==true){
			// 		this.$nextTick(()=>{
			// 			this.$refs.aa.init()
			// 		})
			// 	}
			// },
			openFile(url){
				console.log(url)
				previewFiles(url)
			},
			// 查看物流
			openLogistics(orderNo){
				// var orderNo='20220419154031459757424'
				uni.navigateTo({
					url:'/pages/caselist/logistics?orderNo='+orderNo
				})
			},
			// 复制订单号
			copyOrder(){
				uni.setClipboardData({
				    data: this.orderData.orderNo,
				    success: function () {
				        console.log('success');
				    }
				});
			},
			show(index,data){
				console.log(data)
				if(index==0){//有疑问
				// #ifndef H5
					uni.navigateTo({
						url:'/pages/orderManage/orderQuestion?orderNo='+data.orderNo
					})
				// #endif
				// #ifdef H5
					uni.showToast({
						title:'网页端不能操作',
						icon:'none'
					})
					return;
				// #endif
				}else if(index==1){//进入病例 
					if(data.caseHistoryId){
						uni.navigateTo({
							url:'/pages/caselist/caselistdetail?id='+data.caseHistoryId
						})
					}
					// else if(data.modelLibId){
					// 	uni.navigateTo({
					// 		url:'/pages/publicModel/modelDetail?modelId='+data.modelLibId
					// 	})
					// }
				}else{//转发账单
					// #ifdef H5
						uni.showToast({
							title:'网页端不能转发',
							icon:'none'
						})
						return;
					// #endif
					// #ifdef APP-PLUS
					if(data.caseHistoryId){//是病例相关
						var title=`患者名:${data.subordinateName?data.subordinateName:"未填写"}\n订单号:${data.orderNo}`
					}
					// else if(data.modelLibId){//模型相关
					// 	var title=`模型名:${data.subordinateName?data.subordinateName:"未填写"}\n订单号:${data.orderNo}`
					// }
					else{
						var title='标题'
					}
					console.log(title)
					uni.share({
						provider: 'weixin',
						scene: "WXSceneSession",
						type: 5,
						imageUrl:'./static/sharelogo.png',
						title: title,
						miniProgram: {
							id: 'gh_088556d792b9',
							path: 'pages/orderManage/orderDetail?orderNo='+data.orderNo,
							type: 0,
							webUrl: 'https://mobile.shoyii.com/#/'
						},
						success: ret => {
							console.log(JSON.stringify(ret));
						}
					});
					// #endif
				}
			},
			// 是否进行账单的确认
			ensure(){
				// #ifdef H5
					uni.showToast({
						title:'网页端不能操作',
						icon:'none'
					})
					return;
				// #endif
				this.ensureShow=true
			},
			// 确认服务
			ensureModal(){
				// console.log(this.orderNo)
				// console.log(this.secondSwitch)
				// console.log(this.secondPwd)
				if(!this.orderNo){
					return
				}
				if(this.secondSwitch){
					if(!this.secondPwd){
						uni.showToast({
							title:'二级密码不能为空',
							icon:'none'
						})
						return
					}
				}
				ensureService({
					orderNo:this.orderNo,
					confirmStatus:true,
					secondLevelPassword:this.secondPwd,// 二级密码
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
						// 服务确认后，状态改为待支付状态，需要进行支付，将订单页面刷新一下,以及将订单列表页面刷新
						this.orderDetail(this.orderNo)
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
			// 取消确认服务
			ensureCancel(){
				console.log('cancel')
				this.ensureShow=false
			},
			// 服务支付
			servicePay(){
				// uni.navigateTo({
				// 	url:'/pages/orderManage/paymentOrder?orderNo='+ this.orderNo
				// })
				// #ifdef H5
					uni.showToast({
						title:'网页端不能操作',
						icon:'none'
					})
					return;
				// #endif
				// 跳转支付页面
				// #ifndef H5
				uni.navigateTo({
					url:'/pages/orderManage/paymentOrder?orderNo='+ this.orderNo
				})
				// #endif		
			},
			// 是否取消订单
			cancelorder(){
				// #ifdef H5
					// uni.showToast({
					// 	title:'网页端不能操作',
					// 	icon:'none'
					// })
					// return;
				// #endif
				this.cancelshow=true
			},
			// 确定取消订单
			confirmModal(){
				cancelOrder({
					orderNo:this.orderNo
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						uni.navigateTo({ //取消订单后跳转订单列表
							url:'/pages/orderManage/orderManage'
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
			// 取消订单窗口隐藏
			cancelModal(){
				this.cancelshow=false
			},
			// 申请退款
			refund(){
				// #ifdef H5
				uni.showToast({
					title:'网页端不能操作',
					icon:'none'
				})
				// #endif
				// #ifndef H5
				this.refundshow=true
				// #endif
			},
			// 确认退款
			refundConfirm(){
				if(!this.refundReason){
					uni.showToast({
						title:'退款原因必填',
						icon:'none'
					})
					return
				}
				refund({
					orderNo:this.orderData.orderNo,
					reason:this.refundReason
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						this.disabled=true
						this.refundBtn='退款申请中'
						uni.showToast({
							title:res.data.msg,
							icon:'none'
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
			// 确认取消退款
			refundCancel(){
				this.refundshow=false
			},
			// 申请发票
			applyIvoice(data){
				// #ifdef H5
				uni.showToast({
					title:'网页端不支持操作',
					icon:'none'
				})
				return
				// #endif
				// #ifndef H5
				console.log(data)
				let info={
					orderno:data.orderNo,
					amout:data.price,
					invoiceStatus:data.invoiceStatus//0，申请发票；1 已申请；2 已开票
				}
				uni.navigateTo({
					url:'/pages/orderManage/invoice?info='+encodeURIComponent(JSON.stringify(info)) 
				})
				// #endif
			},
			orderDetail(orderNo){
				orderDetail({
					orderNo:orderNo
				}).then(res=>{
					console.log(res)
					this.orderData=res.data.object
					// 主要用于退款信息
					this.billList=res.data.object.omsBills&&res.data.object.omsBills.length!=0?res.data.object.omsBills[0]:{}
					if(this.billList.billStatus=='YQ'){
						this.notifyText='该账单已逾期，请尽快支付'
					}
					this.aidedDesign=res.data.object.aidedDesign?res.data.object.aidedDesign:{},
					console.log(this.aidedDesign.type)
					// this.aidedDesign.type&&this.aidedDesign.type.split(',').forEach(item=>{
					// 	if(item=='1'||item=='2'||item=='3'){
					// 		this.aideType.push(item)
					// 	}
					// })
					// console.log(this.aideType)
				}).catch(err=>{
					console.log(err)
				})
			}
		},
		onLoad(option) {
			// #ifdef MP-WEIXIN
			if(option.scene){
				var scene=decodeURIComponent(option.scene)
				this.orderNo=scene
				this.orderDetail(scene)
			}else{
				this.orderNo=option.orderNo
				this.orderDetail(option.orderNo)
			}
			// #endif
			// #ifndef MP-WEIXIN
			this.orderNo=option.orderNo
			this.orderDetail(option.orderNo)
			// #endif
		},
		onBackPress(e){
			// console.log(getCurrentPages())//最后一个为当前页面，第一个为首页
			// #ifdef H5
			var length=getCurrentPages().length-1
			var page1=getCurrentPages()[length-1].route
			console.log(page1)
			if(page1=='pages/caselist/caselistdetail'){//从病例详情过来的，能返回
				return 
			}else{//其他情况,h5端不能返回列表
				uni.showToast({
					title:'无效',
					icon:'none'
				})
				return true
			}
			// #endif
			// #ifndef H5
			var page = getCurrentPages()[0].route;//获取第一个页面
			var length=getCurrentPages().length-1
			// var length2=getCurrentPages().length
			// console.log(getCurrentPages()[length2-1].route) //获取最后一个，当前页面
			var page1=getCurrentPages()[length-1].route// 获取倒数第一个页面，也即当前页面的前一个栈
			// console.log(page1)
			if(page=='pages/orderManage/orderDetail'){
				uni.switchTab({
					url:'/pages/Tabbar/index'
				})
				return true
			}else if(page1!='pages/orderManage/orderManage'){ //如果是从列表page过来的，不作处理，其他（支付页面和支付成功页面）则 直接返回列表页；不做处理，则会出现按栈顺序依次返回；
				uni.navigateTo({
					url:'/pages/orderManage/orderManage',
					animationType:'slide-in-left'
				})
				return true
			}
			// #endif
		},
		onReady() {
			this.amendNavigator()
		},
		// 分享朋友
		// #ifdef MP-WEIXIN
		onShareAppMessage: function (res) {
			console.log(res)
			if(this.orderData.caseHistoryId){//是病例相关
				var title=`患者名:${this.orderData.subordinateName?this.orderData.subordinateName:"未填写"}\n订单号:${this.orderData.orderNo}`
			}
			// else if(this.orderData.modelLibId){//模型相关
			// 	var title=`模型名:${this.orderData.subordinateName?this.orderData.subordinateName:"未填写"}\n订单号:${this.orderData.orderNo}`
			// }
			else{
				var title='标题'
			}
		    if (res.from === 'button') {//定义了share 才是button
		      // 来自页面内转发按钮
			  return {
				  title: title,
				  path: 'pages/orderManage/orderDetail?orderNo='+this.orderData.orderNo,
			  }
		    }else{//menu为原生胶囊转发
				return {
				  title:title,
				  path: 'pages/orderManage/orderDetail?orderNo='+this.orderData.orderNo,
				}
			}
		},
		// #endif
	}
</script>

<style scoped lang="scss">
	.orderInfor{
		width: 100%;
		/* #ifdef H5 */
		min-height: 100%;
		/* #endif */
		/* #ifndef H5 */
		min-height: 100vh;
		/* #endif */
		padding: 0 30rpx 10rpx;
		.service_items{
			background-color: #FFFFFF;padding: 30rpx 28rpx;border-radius: 15rpx;
			margin-bottom: 20rpx;
		}
	}
	.title{
		text-align: center;
		padding: 40rpx 0 0;
		color: #000000;
		font-size: 28rpx;
		.paycount{
			color: #333333;
			padding: 30rpx 0;
			font-size: 30rpx;
			.count{
				font-size: 48rpx;
				font-weight: bold;
				font-family: PingFang-SC-Bold;
				color: #000000;
				margin-right: 18rpx;
			}
		}
	}
	.item{
		line-height: 56rpx;
		color: #000000;
		display: flex;
		.content{
			flex: 1;
			text-align: right;
			text-overflow: ellipsis;overflow: hidden;white-space: nowrap;
		}
	}
	.time{
		color: #8F8F8F;
		width: 160rpx;
		display: block;
	}
	.right{
		margin-right: 20rpx;
	}
	.u-collapse-body{
		height: 100%;
	}
	.footer{
		background-color: #FFFFFF;margin: 20rpx 0;
		.items{
			padding: 26rpx 28rpx;
			display: flex;justify-content: space-between;
			border-bottom: 1px solid #F8F8F8;
		}
		.bgColor{
			background-color: #F8F8F8;
		}
		
		/* #ifdef MP-WEIXIN */
		button::after{
			border: none;
			border-bottom: 1px solid #f8f8f8;
		}
		/* #endif */
		
	}
	.servicebtn{
		padding: 10rpx 0 20rpx;
		text-align: center;
		.servicesure{
			background-color: #69CDFF;color: #FFFFFF;
		}
		.servicepayment{
			background-color: #52D17F;color: #FFFFFF;
		}
		.servicecancel{
			background-color: #CCCCCC;color: #FFFFFF;
			margin-bottom: 20rpx;
		}
		.refund{
			background-color: #CCCCCC;color: #fff;border-radius: 15rpx;
		}
	}
	.slot-content{
		text-align: center;
		font-size: 24rpx;
		color: #000000;
		font-family: PingFang-SC-Medium;
		padding-bottom: 20rpx;
		.title{
			font-size: 30rpx;
			font-weight: bold;
			font-family: PingFang-SC-Bold;
		}
		.tip{
			margin: 40rpx 0 10rpx;
		}
		.count{
			font-size: 48rpx;
		}
	}
	.service_left{
		margin-right: 20rpx;color: #000000;
		width: auto;overflow: hidden;
		text-overflow: ellipsis;white-space: nowrap;
	}
</style>
<!--这个是获取的订单数据，提交给微信后台的
 // requestId: "ac1414cc1609223645371436774"
// result:
// orderInfo:
// appId: "wx347cba31a8aac486"
// errMsg: "payment.unifiedOrder ok"
// mchId: "1520295921"
// nonceStr: "re5bkvoigj8bcqsg"
// package: "prepay_id=wx29143406749391afe6f18cd171fbd70000"
// paySign: "4228D8CFFC35135092BC345997EA81E4"
// prepayId: "wx29143406749391afe6f18cd171fbd70000"
// resultCode: "SUCCESS"
// returnCode: "SUCCESS"
// returnMsg: "OK"
// sign: "0F761E0847F8D304022308A3450C7B01"
// signType: "MD5"
// timeStamp: "1609223646"
// tradeType: "JSAPI"
 --><!-- {"appid":"wxd2d16a504f24665e",
"sign":"52A5C09D19F37F83C70829C7EFDB4214",
"payment":
	{"appId":"wx347cba31a8aac486","timeStamp":"1609138508",
	"nonceStr":"WQtyC0nlDAEn3Bt7",
	"package":"prepay_id=wx281455084802695c10e286ea4e68990000",
	"signType":"MD5","paySign":"2A3C434FF7D8C4288538014CA1312420"
	},
"returnCode":"SUCCESS","returnMsg":"OK","mchId":"1800008281",
"subAppid":"wx347cba31a8aac486","subMchId":"1520295921",
"nonceStr":"WQtyC0nlDAEn3Bt7","resultCode":"SUCCESS",
"tradeType":"JSAPI","prepayId":"wx281455084802695c10e286ea4e68990000",
"errCode":0,"errMsg":"cloudPay.unifiedOrder:ok"
} -->
<!-- {"event":{
	"appid":"wxd2d16a504f24665e",
	"bankType":"OTHERS",
	"cashFee":1,
	"feeType":"CNY",
	"isSubscribe":"N",
	"mchId":"1800008281",
	"nonceStr":"d7b95b2fe491f5ad",
	"openid":"oPoo442kNS--146hOSv64RFVoJ1E",
	"outTradeNo":"KWttNMKGE6u7jmAle5HqisrV4kIv",//商户订单号
	"resultCode":"SUCCESS",
	"returnCode":"SUCCESS",
	"subAppid":"wx347cba31a8aac486",
	"subIsSubscribe":"N",
	"subMchId":"1520295921",
	"subOpenid":"o7DUr42rUoI6jMiWyqoybvv0DIPg",
	"timeEnd":"20201228145526",
	"totalFee":1,
	"tradeType":"JSAPI",
	"transactionId":"4200000791202012283032557780",//微信订单号
	"userInfo":{"appId":"wx347cba31a8aac486","openId":"o7DUr42rUoI6jMiWyqoybvv0DIPg"}
	},
	"openid":"o7DUr42rUoI6jMiWyqoybvv0DIPg",
	"appid":"wx347cba31a8aac486",
	"unionid":""
} -->