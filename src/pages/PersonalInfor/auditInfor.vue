<template>
	<view class="container" :data-theme='themeType'>
		<view class="basic">
			<u-field
				class="sy_block"
				v-model="Uname"
				label="姓名:"
				placeholder="请填写姓名"
				:border-bottom="themeType=='dark'?false:true"
			>
			</u-field>
			<view class="item sy_title_primary sy_border" @click="amend(0)">
				<text>角色选择：</text>
				<view class="sy_title_primary">
					<text style="color: gray;">{{role}}</text>
				</view>
			</view>
			<view class="item sy_title_primary sy_border" @click="amend(1)">
				<text>身份证号码：</text>
				<view class="content" style="">
					<text>{{idcode||'未填写'}}</text>
				</view>
			</view>
			<!-- 医院选择 -->
			<view class="sy_block" v-if="this.role!='企业用户'" style="padding: 10rpx 0;">
				<com-box label='所属医院:' amendStyle :candidates="hospitallist" placeholder="请输入或选择所属医院" v-model="hospital"
					:border="false">
				</com-box>
			</view>
			<!-- 企业填写 --> 
			<u-field
				class="sy_block"
				v-if="this.roleId=='5'"
				v-model="hospital"
				label="所属企业:"
				placeholder="请填写所属企业"
				placeholder-style='color:gray;'
				:border-bottom="themeType=='dark'?false:true"
			>
			</u-field>
			<view class="item sy_title_primary sy_border" @click="amend(3)" v-if="this.roleId!='5'">
				<text>请填写科室：</text>
				<view class="content" style="">
					<text>{{department||'未填写'}}</text>
				</view>
			</view>
			<u-field
				class="sy_block"
				v-if="this.roleId!='5'"
				v-model="position"
				label="职位:"
				placeholder="请填写职位"
				placeholder-style='color:gray;'
				:border-bottom="themeType=='dark'?false:true"
			>
			</u-field>
			<view class="item sy_title_primary sy_border" @click="amend(2)">
				<text>性别：</text>
				<view class="">
					<text style="color: gray;">{{gender}}</text>
				</view>
			</view>
		</view>
		<view class="submit sy_block">
			<u-button class="btn" @click="submit" throttle-time='1000'>提交审核</u-button>
		</view>
		<u-keyboard ref="uKeyboard" mode="card" @backspace="backspace" @change="change" @confirm='complete' @cancel="cancel" v-model="idcardshow"></u-keyboard>
		<!-- 性别选择 -->
		<u-select v-model="gendershow" :list="genderlist" value-name='value' @confirm="confirm" confirm-color='#86B0D4'></u-select>
		<!-- 角色选择 -->
		<u-select v-model="roleshow" :list="rolelist" value-name='value' @confirm="roleconfirm" confirm-color='#86B0D4'></u-select>
		<u-select v-model="departmentbool" :list="departmentlist" value-name='diseaseCategoryId' @confirm="departconfirm" confirm-color='#86B0D4'></u-select>
	</view>
</template>

<script>
	import {amend,getDepartments} from './api/amendInfor.js' 
	import {getInfor} from '@/utill/api/personalInfor/getInfor.js'
	export default{
		data(){
			return{
				Uname: '',
				hospital:'',//所属医院
				department:'',//科室
				position:'',//职位
				gender:'',//
				idcode:'输入身份证号',
				idcardshow:false,//身份证picker
				gendershow:false,//性别picker
				genderlist: [
					{
						value: '1',
						label: '男'
					},
					{
						value: '2',
						label: '女'
					}
				],
				role:'',//角色选择，医生，学生，企业用户
				roleId:'',//0,1,5
				roleshow:false,
				rolelist:[
					{
						value: '0',
						label: '医生'
					},
					{
						value: '1',
						label: '学生'
					},
					{
						value: '5',
						label: '企业用户'
					}
				],
				departmentbool:false,
				departmentlist:[],
				deparetmentId:'',
				hospitallist:[],
			}
		},
		methods:{
			amend(index){
				if(index==0){//角色选择
					this.roleshow=true
				}
				else if(index==1){//身份证
					this.idcardshow=true
					this.idcode=''
				}else if(index==2){//性别
					this.gendershow=true
				}else if(index==3){//科室
					this.getDepartments()
				}
			},
			// 获取部门数据
			getDepartments(){
				getDepartments({}).then(res=>{
					if(res.data.code==0){
						var data = JSON.parse(JSON.stringify(res.data.object).replace(/diseaseCategoryName/g,"label"))
						this.departmentlist=data
						this.departmentbool=true
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
			departconfirm(e){
				this.department=e[0].label
				this.departmentbool=false
				this.deparetmentId=e[0].value
			},
			// 按键被点击(点击退格键不会触发此事件)
			change(val){	
				this.idcode += val;
			},
			// 退格键被点击
			backspace() {
				// 删除value的最后一个字符
				if(this.idcode.length) this.idcode = this.idcode.substr(0, this.idcode.length - 1);
			},
			// 身份证号确认(还是有点bug)
			complete(){
				console.log(this.idcode)
				if(!this.idcode){
					uni.showToast({
						title:'不能为空',
						icon:'none'
					})
					return;
				}
				var bool=this.$u.test.idCard(this.idcode)
				if(!bool){
					uni.showToast({
						title:'身份证号不正确',
						icon:'none'
					})
					return;
				}
			},
			// 身份证取消输入
			cancel(){
				this.idcode=this.idcodebackup
			},
			// 性别修改
			confirm(e){
				// 注意返回值为一个数组，单列时取数组的第一个元素即可(只有一个元素)
				this.gender=e[0].label
			},
			roleconfirm(e){
				this.role=e[0].label//
				this.roleId=e[0].value
			},
			// 提交审核
			submit(){
				var bool=this.$u.test.idCard(this.idcode)
				if(!this.roleId){
					uni.showToast({
						title:'角色选择不能为空',
						icon:'none'
					})
					return
				}else if(this.roleId==5){//企业用户
					if(!this.hospital){
						uni.showToast({
							title:'所属企业不能为空',
							icon:'none'
						})
						return
					}
				}else if(this.roleId!=5){
					if(!this.hospital){
						uni.showToast({
							title:'所属医院不能为空',
							icon:'none'
						})
						return
					}else if(!this.deparetmentId){
						uni.showToast({
							title:'科室不能为空',
							icon:'none'
						})
						return
					}else if(!this.position){
						uni.showToast({
							title:'职位不能为空',
							icon:'none'
						})
						return
					}
				}
				if(!this.Uname){
					uni.showToast({
						title:'姓名不能为空',
						icon:'none'
					})
					return
				}
				else if(!bool){
					uni.showToast({
						title:'身份证号不正确',
						icon:'none'
					})
					return
				}else if(!this.gender){
					uni.showToast({
						title:'性别不能为空',
						icon:'none'
					})
					return
				}
				// #ifdef MP-WEIXIN
				uni.requestSubscribeMessage({ //用户订阅消息
					tmplIds:['ufJ1StyerBqnYWa9GhS38WUKhutsi_RoO5rGx6s8hYM'],
					complete:(e)=>{
						uni.showLoading({
							title:'提交中...',
						})
						this.publicamend()
					}
				})
				// #endif
				// #ifndef MP-WEIXIN
				this.publicamend()
				// #endif
			},
			publicamend(){
				amend({
					doctorId:this.$store.getters['user/info'].doctorId,
					name:this.Uname,
					accountOwner:this.roleId,
					iDcard:this.idcode,
					hospital:this.hospital,
					department:this.deparetmentId,
					position:this.position,
					sex:this.gender
				}).then(res=>{
					uni.hideLoading()
					console.log(res)
					if(res.data.code==0){
						console.log(res)
						getInfor({}).then(res=>{//再次获取个人信息审核状态
							// console.log('------------',res.data.object.auditStatus)
							if(res.data.code==0){
								//审核状态
								this.$store.commit('user/login',{auditstatus:res.data.object.auditStatus})
							}
						})
						console.log(this.$store.state.PagesUrl)
						if(this.$store.state.PagesType=='1'){//switchTab方式
							uni.switchTab({
								url:this.$store.state.PagesUrl//跳转相应的tabbar
							})
						}else if(this.$store.state.PagesType=='2'){//跳转相应的页面
							uni.navigateTo({
								url:this.$store.state.PagesUrl
							})
						}else{
							uni.switchTab({
								url:'/pages/Tabbar/index'
							})
						}
					}else{
						console.log(res.data.msg)
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
					}
				}).catch(err=>{
					uni.hideLoading()
					console.log(err)
				})
			},
			getInfor(){
				getInfor({}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						var data=res.data.object
						this.roleId=data.accountOwner
						switch (data.accountOwner){
							case '0':
							this.role='医生'
							this.hospital=data.hospital
							break;
							case '1':
							this.role='学生'
							this.hospital=data.hospital
							break;
							case '5':
							this.role='企业用户'
							this.hospital=data.hospital
							break;
						}
						this.Uname=data.name
						this.idcode=data.iDcard
						this.department=data.departmentName
						this.deparetmentId=data.department
						this.position=data.position
						this.gender=data.sex
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
			gethospital(){
				uni.request({
				    url: 'https://shoyii-open-1258143571.cos.ap-guangzhou.myqcloud.com/dev/hospitalNameList.json',
				}).then((res) => {
					this.hospitallist=res.data
				}).catch((err) => {
					// 此处的 err 参数，与使用默认方式调用时 fail 回调中的 err 参数一致
					console.log(err)
				})
			} 
		},
		watch:{
			idcode(newValue,oldValue){
				this.idcode=newValue
			}
		},
		onLoad() {
			this.getInfor()
			this.gethospital()
		},
		onReady() {
			this.amendNavigator()
		}
		
	}
</script>

<style scoped>
	page{
		/* #ifdef H5 */
	height: 100%;	
		/* #endif */
	}
	.container{
		width: 100%;
		/* #ifdef H5 */
		min-height: 100%; 
		/* #endif */
		/* #ifndef H5 */
		min-height: 100vh;
		/* #endif */
	}
	.basic{
		padding: 0 30rpx;
	}
	/* #ifndef APP-NVUE */
	.basic ::v-deep .uni-input-input{
		color: gray;
	}
	.basic ::v-deep .u-field{
		padding-left: 0!important;
	}
	/* #endif */
	.item{
		display: flex;
		justify-content: flex-start;
		padding: 30rpx 0;
		border-bottom: 1px solid #EEEEEE;
		border-top: 1px solid #EEEEEE;
		font-size: 28rpx;
		color: #000000;
	}
	.item .content{
		margin-left: 20rpx;flex: 1;color: gray;
	}
	.submit{
		padding: 20rpx 30rpx;
		background-color: #FFFFFF;
		position: fixed;bottom: 10rpx;
		width: 100%;
	}
	.submit .btn{
		background-color: #80AED5;
		color: #FFFffF;
	}
</style>
