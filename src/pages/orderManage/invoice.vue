<template>
	<view class="invoice" :data-theme='themeType'>
		<view class="section" v-if="invoiceStatus==0">
			<scroll-view scroll-y="true" class="scrollY">
				<u-subsection :list="list" :current="current" mode='button' buttonColor='#fff'
				 @change="sectionChange"></u-subsection>
				<u-form :model="form" ref="uForm">
					<u-form-item label="开票金额*" label-width='160' :label-style="themeType=='dark'?{color:'#8f8f8f'}:{}">
						<u-input v-model="form.amount" disabled placeholder=''
						:custom-style="themeType=='dark'?{color:'#8f8f8f'}:{color:'#000'}"/>
					</u-form-item>
					<!-- 发票抬头 -->
					<u-form-item label="名称*" prop="componyname" label-width='160' :label-style="themeType=='dark'?{color:'#8f8f8f'}:{}">
						<u-input v-model="form.componyname" placeholder='请输入公司名称/个人名称'
						:custom-style="themeType=='dark'?{color:'#8f8f8f'}:{color:'#000'}"/>
					</u-form-item>
					<u-form-item label="公司税号*" prop="taxcode" label-width='160' v-if="current=='0'" :label-style="themeType=='dark'?{color:'#8f8f8f'}:{}">
						<u-input v-model="form.taxcode" placeholder='请输入公司税号'
						:custom-style="themeType=='dark'?{color:'#8f8f8f'}:{color:'#000'}"/>
					</u-form-item>
					<u-form-item label="电子邮箱*" prop="email" label-width='160' :label-style="themeType=='dark'?{color:'#8f8f8f'}:{}">
						<u-input v-model="form.email" placeholder='请输入电子邮箱' 
						:custom-style="themeType=='dark'?{color:'#8f8f8f'}:{color:'#000'}"/>
					</u-form-item>
					<!-- 收起 -->
					<u-read-more :toggle="true" show-height="0" close-text='展开填写更多内容（选填）'
					color='#8F8F8F' text-indent='0' :shadow-style="shadowStyle">
						<u-form-item label="公司地址" prop="componyaddress" label-width='160' :label-style="themeType=='dark'?{color:'#8f8f8f'}:{}">
							<u-input v-model="form.componyaddress" placeholder='请输入公司地址'
							:custom-style="themeType=='dark'?{color:'#8f8f8f'}:{color:'#000'}"/>
						</u-form-item>
						<u-form-item label="公司电话" prop="componyphone" label-width='160' :label-style="themeType=='dark'?{color:'#8f8f8f'}:{}">
							<u-input v-model="form.componyphone" placeholder='请输入公司电话'
							 :custom-style="themeType=='dark'?{color:'#8f8f8f'}:{color:'#000'}"/>
						</u-form-item>
						<u-form-item label="公司开户行名" prop="componybankname" label-width='180' :label-style="themeType=='dark'?{color:'#8f8f8f'}:{}">
							<u-input v-model="form.componybankname" placeholder='请输入公司开户行名'
							:custom-style="themeType=='dark'?{color:'#8f8f8f'}:{color:'#000'}"/>
						</u-form-item>
						<u-form-item label="公司开户行账号" prop="componybankacount" label-width='220' :label-style="themeType=='dark'?{color:'#8f8f8f'}:{}">
							<u-input v-model="form.componybankacount" placeholder='请输入公司开户行账号'
							 :custom-style="themeType=='dark'?{color:'#8f8f8f'}:{color:'#000'}"/>
						</u-form-item> 
						<!-- 发票内容 -->
						<u-form-item label="备注" prop="invoiceContent" label-width='180' :label-style="themeType=='dark'?{color:'#8f8f8f'}:{}">
							<u-input v-model="form.invoiceContent" placeholder='请输入备注'
							:custom-style="themeType=='dark'?{color:'#8f8f8f'}:{color:'#000'}"/>
						</u-form-item>
					</u-read-more>
				</u-form>
			</scroll-view>
			<view class="btn">
				<!-- #ifdef MP-WEIXIN -->
				<view class="wxbtn">
					<button @click="wxInvoice" class='button'>微信发票快速导入</button>
				</view>
				<!-- #endif -->
				<view class="btnamend" style="">
					<button @click="cancel" class='cancelbtn'>取消</button>
					<button @click="submit" class='commitbtn'>提交</button>
				</view>
			</view>
		</view>
		<view class="section sy_title_primary" v-else style="">
			<scroll-view scroll-y="true" class="scrollY">
				<u-row gutter="16">
					<u-col span="4">
						<view class="demo-layout">开票金额</view>
					</u-col>
					<u-col span="8">
						<view class="demo-layout">{{invocedata.invoiceAmount}}</view>
					</u-col>
				</u-row>
				<u-row gutter="16">
					<u-col span="4">
						<view class="demo-layout">公司名称</view>
					</u-col>
					<u-col span="8">
						<view class="demo-layout">{{invocedata.invoiceTitle}}</view>
					</u-col>
				</u-row>
				<u-row gutter="16">
					<u-col span="4">
						<view class="demo-layout">电子邮箱</view>
					</u-col>
					<u-col span="8">
						<view class="demo-layout">{{invocedata.vatEmail}}</view>
					</u-col>
				</u-row>
				<u-row gutter="16" v-if='invocedata.invoiceTaxNo'>
					<u-col span="4">
						<view class="demo-layout">发票税号</view>
					</u-col>
					<u-col span="8">
						<view class="demo-layout">{{invocedata.invoiceTaxNo}}</view>
					</u-col>
				</u-row>
				<u-row gutter="16" v-if="invocedata.invoiceTax">
					<u-col span="4">
						<view class="demo-layout">开票税金</view>
					</u-col>
					<u-col span="8">
						<view class="demo-layout">{{invocedata.invoiceTax}}</view>
					</u-col>
				</u-row>
				<u-row gutter="16" v-if="invocedata.invoiceType">
					<u-col span="4">
						<view class="demo-layout">发票抬头类型</view>
					</u-col>
					<u-col span="8">
						<view class="demo-layout">{{ivovetitleType(invocedata.invoiceType)}}</view>
					</u-col>
				</u-row>
				<u-row gutter="16" v-if="invocedata.vatBoolean">
					<u-col span="4">
						<view class="demo-layout">发票类型</view>
					</u-col>
					<u-col span="8">
						<view class="demo-layout">{{ivoveType(invocedata.vatBoolean)}}</view>
					</u-col>
				</u-row>
				<u-row gutter="16" v-if="invocedata.vatCompanyAddress">
					<u-col span="4">
						<view class="demo-layout">公司地址</view>
					</u-col>
					<u-col span="8">
						<view class="demo-layout">{{invocedata.vatCompanyAddress}}</view>
					</u-col>
				</u-row>
				<u-row gutter="16" v-if="invocedata.vatTelphone">
					<u-col span="4">
						<view class="demo-layout">公司电话</view>
					</u-col>
					<u-col span="8">
						<view class="demo-layout">{{invocedata.vatTelphone}}</view>
					</u-col>
				</u-row>
				<u-row gutter="16" v-if="invocedata.vatBankName">
					<u-col span="4">
						<view class="demo-layout">公司开户行名</view>
					</u-col>
					<u-col span="8">
						<view class="demo-layout">{{invocedata.vatBankName}}</view>
					</u-col>
				</u-row>
				<u-row gutter="16" v-if="invocedata.vatBankAccount">
					<u-col span="4">
						<view class="demo-layout">公司开户行账号</view>
					</u-col>
					<u-col span="8">
						<view class="demo-layout">{{invocedata.vatBankAccount}}</view>
					</u-col>
				</u-row>
				<u-row gutter="16" v-if="invocedata.invoiceContent">
					<u-col span="4">
						<view class="demo-layout">备注</view>
					</u-col>
					<u-col span="8">
						<view class="demo-layout">{{invocedata.invoiceContent}}</view>
					</u-col>
				</u-row>
				<u-row gutter="16">
					<u-col span="4">
						<view class="demo-layout">开票时间</view>
					</u-col>
					<u-col span="8">
						<view class="demo-layout">{{invocedata.createTime}}</view>
					</u-col>
				</u-row>
			</scroll-view>
			<view class="btnamend">
				<button @click="back" class="cancelbtn">返回</button>
				<button @click="amend" class="commitbtn">修改</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {addIvoice,getIvoice} from '@/utill/api/order/order.js'
	export default{
		data(){
			return{
				list: [{name: '企业单位'},{name:'个人/非企业单位'}],
				current:0,
				form: {
					amount: '',//开票金额
					componyname: '',//公司名称即是发票抬头
					taxcode:'',//税号,个人不存在税号
					email:'',//接收邮箱
					componyaddress:'',//公司地址
					componyphone:'',//联系电话
					componybankname:'',//银行名称
					componybankacount:'',//银行账户号
					invoiceContent:'',//备注即是发票内容
				},
				rules: {
					componyname: [
						{
							required: true,
							message: '公司名称必填', 
							trigger: 'change'
						}
					],
					taxcode:[
						{
							validator: (rule, value, callback) => {
								// console.log(value)
								// console.log(this.current)
								// 返回true表示校验通过，返回false表示不通过
								if(this.current==1){//非企业不做校验
									return true
								}else{
									if(!value){//value不存在
										return false
									}else{
										return true
									}
								}
								
							},
							message: '税号必填',
							trigger: ['change','blur'],
						}
					],
					email:[
						{
							required: true,
							type:'email',
							message: '邮箱格式有误', 
							trigger: 'change'
						}
					]
				},
				orderno:'',
				shadowStyle: {
					backgroundImage: "none",
					paddingTop: "0",
					marginTop: "30rpx"
				},
				invoiceStatus:0,//发票状态。默认待申请，为1,2显示详情页面
				invocedata:{}
			}
		},
		methods:{
			// 个人和企业切换
			sectionChange(e){
				this.current=e
			},
			// 新增或修改
			submit() {
				// 个人时,将公司税号.发票抬头为空
				if(this.current==1){
					this.form.taxcode=''
					// this.form.componyname=''
				}
				let info={
					invoiceAmount:this.form.amount,
					invoiceTaxNo:this.form.taxcode,
					invoiceType:this.current,//发票抬头类型（0：企业单位；1：个人/非企业单位；）
					orderNo:this.orderno,//关联订单号
					vatCompanyAddress:this.form.componyaddress,//公司地址[增值税]
					invoiceTitle:this.form.componyname,//公司名称[增值税]
					vatEmail:this.form.email,//接收电子邮箱
					vatTelphone:this.form.componyphone,//联系电话[增值税]
					vatBankName:this.form.componybankname,//开户银行[增值税]
					vatBankAccount:this.form.componybankacount,//银行帐号
					invoiceContent:this.form.invoiceContent,//备注
				}
				if(this.invocedata.id){//修改
					info['id']=this.invocedata.id
					this.$refs.uForm.setRules(this.rules)
				}
				console.log(info)
				console.log(this.form)
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						console.log(info)
						addIvoice(info).then(res=>{
							console.log(res)
							if(res.data.code==0){
								// 显示申请详情
								this.invoiceStatus=1
								this.invoce(this.orderno)
							}else{
								uni.showToast({
									title:res.data.msg,
									icon:'none'
								})
							}
						}).catch(err=>{
							console.log(err)
						})
					} else {
						console.log('验证失败');
					}
				});
			},
			// 新增发票时的取消
			cancel(){
				uni.navigateBack({
					delta:1
				})
			},
			invoce(orderNo){
				getIvoice({
					orderNo
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						this.invocedata=res.data.object
						console.log(this.invocedata)
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
			// 发票类型
			ivoveType(boolean){
				if(boolean){
					return '增值发票'
				}else{
					return '普通发票'
				}
			},
			ivovetitleType(type){
				if(type==0){
					return '企业单位'
				}else{
					return '个人/非企业单位'
				}
			},
			// 修改时的返回
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			// 修改
			amend(){
				if(this.invocedata.invoiceStatus==1){//已申请
					// 展示出修改页面
					this.invoiceStatus=0
					this.form={
						amount: this.invocedata.invoiceAmount,//开票金额
						componyname: this.invocedata.invoiceTitle,//公司名称即是发票抬头
						taxcode:this.invocedata.invoiceTaxNo,//税号
						email:this.invocedata.vatEmail,//接收邮箱
						componyaddress:this.invocedata.vatCompanyAddress?this.invocedata.vatCompanyAddress:'',//公司地址
						componyphone:this.invocedata.vatTelphone?this.invocedata.vatTelphone:'',//联系电话
						componybankname:this.invocedata.vatBankName?this.invocedata.vatBankName:'',//银行名称
						componybankacount:this.invocedata.vatBankAccount?this.invocedata.vatBankAccount:'',//银行账户号
						invoiceContent:this.invocedata.invoiceContent?this.invocedata.invoiceContent:'',//备注即是发票内容
					}
					console.log(this.form)
					this.current=this.invocedata.invoiceType//企业或个人
					uni.setNavigationBarTitle({
						title: '修改发票'
					})
				}else if(this.invocedata.invoiceStatus==2){//已开票，不做修改
					uni.showToast({
						title:'发票已开，不能修改',
						icon:'none'
					})
				}
			},
			// 微信端获取发票数据
			wxInvoice(){
				console.log('wx')
				wx.chooseInvoiceTitle({
					success:(res) =>{
						console.log(res)
						if(res.errMsg=='chooseInvoiceTitle:ok'){
							this.form.componybankacount=res.bankAccount//银行账号
							this.form.componybankname=res.bankName//银行名称
							this.form.componyaddress=res.companyAddress//单位地址
							this.form.taxcode=res.taxNumber//抬头税号
							this.form.componyname=res.title//抬头名称
							this.form.componyphone=res.telephone//手机号码
							this.current=res.type //0是单位，1是个人
						}else{
							uni.showToast({
								title:'导入失败',
								icon:'none'
							})
						}
					},
					fail(err){
						console.log(err)
					}
				})
			}
		},
		onReady() {
			if(this.invoiceStatus==0){//新增时，规则检验
				this.$refs.uForm.setRules(this.rules);
			}
			this.amendNavigator()
		},
		onLoad(options) {
			console.log(JSON.parse(decodeURIComponent(options.info)))
			let data=JSON.parse(decodeURIComponent(options.info))
			this.form.amount=data.amout
			this.orderno=data.orderno
			this.invoiceStatus=data.invoiceStatus//切换新增或展示
			if(data.invoiceStatus!=0){//0新增发票，1,2；已申请，已开票
				this.invoce(data.orderno)//获取发票详情
				uni.setNavigationBarTitle({
					title: '查看详情'
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f8f8f8;
		height: 100%;
	}
	.invoice{
		padding: 30rpx 30rpx 0;
		width: 100%;
		/* #ifdef H5 */
		height: 100%;
		/* #endif */
		/* #ifndef H5 */
		height: 100vh;
		/* #endif */
		.section{
			display: flex;flex-direction: column;height: 100%;
			.scrollY{
				flex: 1;overflow: auto;
			}
			.btn{
				width: 100%;
				.wxbtn{
					margin-bottom: 20rpx;
					.button{
						color:#fff;
						background-color:#52D17F;
					}
				}
			}
			.btnamend{
				width: 100%;display: flex;justify-content: space-between;align-items: center;
				margin-bottom: 20rpx;
				.cancelbtn{
					color:#fff;background-color:#CCCCCC;flex: 1;margin-right: 10rpx;
				}
				.commitbtn{
					color:#fff;background-color: #69CDFF;flex: 1;margin-left: 10rpx;
				}
			}
		}
	}
	
	.u-row {
		margin: 10rpx 0;
	}
	.demo-layout {
		height: 80rpx;
	}
</style>