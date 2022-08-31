<template>
	<view class="team">
		<view class="section">
			<view class="tip">
				<view class="title">
					<text>注意事项：</text>
				</view>
				<view class="tipItem">
					<view class="dot"></view>
					<view class="item">
						<text>该金额为预估金额，由于手术设计难度差异、3D打印耗材材料重量差异，实际金额可能产生±￥500左右的差额。</text>
					</view>
				</view>
				<view class="tipItem">
					<view class="dot"></view>
					<view class="item">
						<text>承诺时限仅为完成设计的时限，并不包含3D打印及物流时间。</text>
					</view>
				</view>
			</view>
			<view class="designTeam" v-for="(item,index) in teamData" :key='index'>
				<view class="designLeft">
					<view class="d_left" @click.stop="select(item.leaderId)">
						<radio :checked="item.leaderId==radioId" color='#86B0D4' style="transform:scale(0.7)"/>
					</view>
					<view class="d_middle">
						<view class="d_header">
							<image style="border:1px solid #CCCCCC;width: 126rpx;height: 126rpx;" :src="item.avatarUrl?item.avatarUrl:'/static/image/shoyiilogo.png'" mode="aspectFill"></image>
							<view class="infor">
								<text class="title" @click="enterInfor(item,0)">{{item.deptName}}</text>
								<view class="">
									<text class="label">预估价：</text>
									<text class="price" style="text-decoration: underline;" @click="enterPrice(item.deptId)">￥{{item.estimatedPrice}}</text>
								</view>
							</view>
						</view>
						<view class="d_footer">
							<view class="">
								<view class="items">
									<text class="label">负责人：</text>
									<text class="subtitle" style="text-decoration: underline;" @click="enterInfor(item,1)">{{item.leaderRealName}}</text>
								</view>
								<view class="items">
									<text class="label">已完成数量：</text>
									<text class="subtitle">{{item.totalCases}}</text>
								</view>
							</view>
							<view class="">
								<view class="items">
									<text class="label">擅长类型：</text>
									<text class="subtitle">骨科</text>
								</view>
								<view class="items">
									<text class="label">承诺时限：</text>
									<text class="subtitle">{{item.completionTime}}天</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="d_right">
					<u-icon name="arrow-upward" :color="index==0?'#FFCB20':'#DDDDDD'" size="30"></u-icon>
				</view>
			</view>
		</view>
		<view class="btn">
			<view class="button" @click="cancelTeam">取消</view>
			<view class="button surebtn" @click="sureTeam">确定</view>
		</view>
		<!-- 密码框 -->
		<u-popup v-model="pwdshow" mode="center" :mask='false' :closeable='true'>
			<view style="background-color: #FFFFFF;border: 1px solid #999;padding: 60rpx 30rpx;">
				<view class="" style="padding: 30rpx 0;">
					<u-field
						:password='true'
						v-model="secondPwd"
						label="密码"
						placeholder="请填写密码"
					>
					</u-field>
				</view>
				<view class="" style="display: flex;justify-content: space-between;padding: 30rpx 0 0;">
					<u-button size="medium" @click="cancelPwd">取消</u-button>
					<u-button type="primary" size="medium" @click="surePwd">确定</u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>
<script>
	import {getTeam,help} from './api/help.js'
	export default{
		data(){
			return{
				radioId:null,
				teamData:[],
				pwdshow:false,//密码弹窗
				secondPwd:'',//输入的二级密码
				caseHistoryId:'',//病例id
				serviceData:{},//选择的服务类型
				casedata:{},//病例id，是否有二级密码
				Extradesign:'',//额外的设计说明
				orderData:{},//下订单的相关数据
			}
		},
		methods:{
			// 选择团队
			select(id){
				this.radioId=id
			},
			// 协助密码取消
			cancelPwd(){
				this.pwdshow=false
			},
			// 协助密码确定
			surePwd(){
				if(!this.secondPwd){
					uni.showToast({
						title:'密码不能为空',
						icon:'none'
					})
					return;
				}
				this.createOrder()
			},
			// 取消选择团队
			cancelTeam(){
				uni.navigateBack({
					delta:1
				})
			},
			// 确定团队
			sureTeam(){
				if(this.casedata.pwdBool){//有设置二级密码
					this.pwdshow=true //输入密码
					return;
				}
				this.createOrder()
			},
			// 下订单
			createOrder(){
				console.log(this.caseHistoryId)
				// console.log(this.serviceData)
				// this.serviceData = JSON.parse(JSON.stringify(this.serviceData).replace(/type/g,"productType"));
				// console.log(this.serviceData)
				console.log(this.orderData)
				if(!this.radioId){
					uni.showToast({
						title:'设计团队必选',
						icon:'none'
					})
					return;
				}
				help({
					caseHistoryId:this.casedata.caseHistoryId,
					computerAidedDesignDTO:this.orderData.assistExt,//寻求帮助参数
					diseaseCategoryId:this.orderData.departmentId,//科室id
					estimatedPrice:this.orderData.estimatePrice,//预估价
					secondLevelPassword:this.secondPwd, //二级密码
					leaderId:this.radioId,
					orderExplain:this.orderData.orderExplain,//订单描述
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
						// this.pwdshow=false
						uni.redirectTo({//？？
							url:'/pages/caselist/caselistdetail?id='+this.casedata.caseHistoryId
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
			// 查询团队
			getTeam(){
				console.log(this.serviceData)
				getTeam(this.serviceData).then(res=>{
					console.log(res)
					if(res.data.code==0){
						this.teamData=res.data.object
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:"none"
						})
					}
				}).catch(Error=>{
					console.log(Error)
				})
			},
			enterInfor(data,index){//0是团队信息，1是负责人信息
				if(index==0){
					uni.navigateTo({
						url:'/pages/caselist/DesignTeaminfor?deptId='+data.deptId+'&leaderId='+data.leaderId
					})
				}else{
					uni.navigateTo({
						url:'/pages/caselist/Designladerinfor?deptId='+data.deptId
					})
				}
			},
			// 查询价格详情
			enterPrice(id){
				console.log(this.serviceData)
				var data=this.serviceData
				data['deptId']=id
				console.log(data)
				uni.navigateTo({
					url:'/pages/caselist/checkprice?data='+encodeURIComponent(JSON.stringify(data)) 
				})
			}
		},
		onLoad(options) {
			// console.log(options)
			var data=JSON.parse(decodeURIComponent(options.data))
			// console.log(data)
			this.serviceData={
				type:data.assistExt.type,//服务类型
				// 所选的材料
				printBaseMaterials:{
					guidePlateMaterialsId:data.assistExt.guidePlateOrder.materialsId,//导板材料id
					modelMaterialsId:data.assistExt.modelOrder.materialsId,//模型材料id
					prosthesisMaterialsId:data.assistExt.computerAidedDesignOrder.softTissueBoolean//软组织
				},
			}
			this.orderData=data
			console.log(this.serviceData)
			this.casedata=data.casedata
			// this.getTeam()
		},
	}
</script>
<style scoped lang='scss'>
	page{
		width: 100%;
		height: 100%;
	}
	.team{
		display: flex;
		flex-direction: column;
		width: 100%;
		/* #ifdef H5 */
		height:100%;
		/* #endif */
		/* #ifndef H5 */
		height: 100vh;
		/* #endif */
		padding: 0 30rpx;
		.section{
			flex: 1;
			overflow: auto;
			.tip{
				padding-top: 20rpx;
				font-size: 24rpx;
				font-family: PingFang-SC-Medium;
				.title{
					color: #000000;
					font-weight: bold;
				}
				.tipItem{
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-top: 16rpx;
					.dot{
						width: 12rpx;
						height: 12rpx;
						border-radius: 50%;
						background-color: #BBBBBB;
						margin-right: 14rpx;
					}
					.item{
						flex: 1;
						color: #8F8F8F;
					}
				}
			}
			.designTeam{
				background-color: #FFFFFF;
				padding: 20rpx;
				display: flex;
				align-items: flex-start;
				margin-top: 20rpx;
				.designLeft{
					display: flex;
					align-items: center;
					justify-content: space-between;
					flex: 1;
				}
				.d_right{
					padding: 0 20rpx;
				}
				.d_middle{
					font-family: PingFang-SC-Medium;
					color: #000000;
					font-size: 24rpx;
					margin-left: 20rpx;
					flex: 1;
					.d_header{
						display: flex;
						justify-content: space-between;
						.infor{
							margin-left: 46rpx;
							flex: 1;
							display: flex;
							flex-direction: column;
							justify-content: space-around;
							.title{
								font-size: 30rpx;
								font-weight: bold;
								text-decoration: underline;
							}
						}
						.price{
							color: #FF4400;
							font-weight: bold;
							font-family: PingFang-SC-Bold;
							font-size: 28rpx;
						}
					}
					.d_footer{
						margin-top: 10rpx;
						display: flex;
						justify-content: space-between;
						.items{
							padding-top: 10rpx;
						}
					}
					.label{
						color: #8F8F8F;
					}
					.subtitle{
						font-weight: bold;
					}
				}
			}
		}
		.btn{
			margin-top: 20rpx;
			padding: 20rpx 0;
			background-color: #ffffff;
			display: flex;
			justify-content: space-between;
			.button{
				background-color: #FFFFFF;
				color: #FF5860;
				border: 1px solid #DDDDDD;
				padding: 30rpx 136rpx;
				font-size: 30rpx;
				font-weight: bold;
				font-family: PingFang-SC-Bold;
			}
			.surebtn{
				background-color: #69CDFF;
				color: #FFFFFF;
				border: 1px solid #69CDFF;
			}
		}
	}
	
</style>
