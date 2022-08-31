<template>
	<view class="Information" :data-theme='themeType'>
		<!-- 个人资料修改 -->
		<view class="editAvatar sy_block">
			<u-avatar class="logo" @click="upload" :src="src" mode="circle" size='126' img-mode=''></u-avatar>
			<text>点击更换头像</text>
		</view>
		<!-- 基本资料 -->
		<view class="basic sy_block">
			<view class="item sy_border_bt sy_title_primary" @click="amend(0)">
				<text>姓名：</text>
				<view class="">
					<text>{{Uname||'未填写'}}</text>
					<uni-icons class="icon" size="28rpx" type="arrowright" :color="themeType=='dark'?'#8f8f8f':''"></uni-icons>
				</view> 
			</view>
			<view class="item sy_border_bt sy_title_primary" @click="amend(10)">
				<text>角色：</text>
				<view class="">
					<text>{{role}}</text>
					<uni-icons class="icon" size="28rpx" type="arrowright" :color="themeType=='dark'?'#8f8f8f':''"></uni-icons>
				</view>
			</view>
			<view class="item sy_border_bt sy_title_primary" @click="amend(1)">
				<text>性别：</text>
				<view class="">
					<text>{{gender}}</text>
					<uni-icons class="icon" size="28rpx" type="arrowright" :color="themeType=='dark'?'#8f8f8f':''"></uni-icons>
				</view>
			</view>
			<view class="item sy_border_bt sy_title_primary" @click="amend(2)">
				<text>出生日期：</text>
				<view class="">
					<text>{{timeStamp(birthday)}}</text>
					<uni-icons class="icon" size="28rpx" type="arrowright" :color="themeType=='dark'?'#8f8f8f':''"></uni-icons>
				</view>
			</view>
			<view class="item sy_border_bt sy_title_primary" @click="amend(3)">
				<text>身份证号码：</text>
				<view class="">
					<text>{{idcode||'未填写'}}</text>
					<uni-icons class="icon" size="28rpx" type="arrowright" :color="themeType=='dark'?'#8f8f8f':''"></uni-icons>
				</view>
			</view>
			<view class="item sy_border_bt sy_title_primary" @click="amend(4)">
				<text>身份证照片：</text>
				<view class="">
					<text>{{idpictrue||'未上传'}}</text>
					<uni-icons class="icon" size="28rpx" type="arrowright" :color="themeType=='dark'?'#8f8f8f':''"></uni-icons>
				</view>
			</view>
		</view>
		<!-- 从业信息 -->
		<view class="basic job sy_block">
			<view class="item sy_border_bt sy_title_primary" @click="amend(5)" >
				<text v-if="roleId==3">所属企业：</text>
				<text v-else>所属医院：</text>
				<view class="hospitalText">
					<text>{{hospital}}</text>
					<uni-icons class="icon" size="28rpx" type="arrowright" :color="themeType=='dark'?'#8f8f8f':''"></uni-icons>
				</view>
			</view>
			<view class="item sy_border_bt sy_title_primary" @click="amend(6)" v-if="roleId!=3">
				<text>医院详细地址（选填）：</text>
				<view class="">
					<text>{{address}}</text>
					<uni-icons class="icon" size="28rpx" type="arrowright" :color="themeType=='dark'?'#8f8f8f':''"></uni-icons>
				</view>
			</view>
			<view class="item sy_border_bt sy_title_primary" @click="amend(7)" v-if="roleId!=3">
				<text>所属科室：</text>
				<view class="">
					<text>{{department}}</text>
					<uni-icons class="icon" size="28rpx" type="arrowright" :color="themeType=='dark'?'#8f8f8f':''"></uni-icons>
				</view>
			</view>
			<view class="item sy_border_bt sy_title_primary" @click="amend(8)" v-if="roleId!=3">
				<text>职位：</text>
				<view class="">
					<text>{{position}}</text>
					<uni-icons class="icon" size="28rpx" type="arrowright" :color="themeType=='dark'?'#8f8f8f':''"></uni-icons>
				</view>
			</view>
			<view class="item sy_border_bt sy_title_primary" @click="amend(9)" v-if="roleId!=3">
				<text>医生执照：</text>
				<view class="">
					<text>{{license}}</text>
					<uni-icons class="icon" size="28rpx" type="arrowright" :color="themeType=='dark'?'#8f8f8f':''"></uni-icons>
				</view>
			</view>
		</view>
		<!-- 性别选择 -->
		<u-select v-model="gendershow" :list="genderlist" value-name='value' @confirm="confirm" confirm-color='#86B0D4'></u-select>
		<!-- 日期选择 -->
		<u-calendar class="date" v-model="dayshow" mode="date" @change="amendday" active-bg-color='#86B0D4'>
			<template v-slot:tooltip>
				<view class="title">
					请选择出生日期
				</view>
			</template>
		</u-calendar>
		<!-- 身份证键盘 -->
		<u-keyboard ref="uKeyboard" mode="card" @backspace="backspace" @change="valChange" @confirm='complete' @cancel="cancel" v-model="idcardshow"></u-keyboard>
		<u-top-tips ref="uTips"></u-top-tips>
		<!-- 角色选择 -->
		<u-select v-model="roleshow" :list="rolelist" value-name='value' @confirm="roleconfirm" confirm-color='#86B0D4'></u-select>
		<u-select v-model="departmentbool" :list="departmentlist" value-name='diseaseCategoryId' @confirm="departconfirm" confirm-color='#86B0D4'></u-select>
		<u-no-network></u-no-network>
	</view>
</template>

<script>
	import {amend,getDepartments} from './api/amendInfor.js' 
	import {getInfor} from '@/utill/api/personalInfor/getInfor.js'
	export default {
		data() {
			return {
				// 状态栏高度，H5中，此值为0，因为H5不可操作状态栏
				statusBarHeight: uni.getSystemInfoSync().statusBarHeight,
				// 导航栏内容区域高度，不包括状态栏高度在内
				navbarHeight: 44,
				src: '/static/image/person.png', //默认头像
				Uname:'',
				gender:'',
				birthday:'',
				idcode:'',
				idcodebackup:"",//备份的IDcard
				idpictrue:'',
				hospital:'',
				address:'',
				department:'',
				position:'', 
				license:'',
				frontSrc:'',
				backSrc:'',
				licenseSrc:'',
				gendershow:false,//性别picker
				dayshow:false,//日期picker
				idcardshow:false,//身份证picker
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
				value:'',
				role:'',//角色选择
				roleId:"",//0,1,3，2 医生，学生，企业用户，测试账号（医生）
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
						value: '3',
						label: '企业用户'
					}
				],
				departmentbool:false,
				departmentlist:[],
			}
		},
		computed:{
			doctorId(){
				return this.$store.getters['user/info'].doctorId
			}
		},
		methods: { 
			// 上传头像
			upload(){
				uni.chooseImage({
					count: 1, //默认9
				    success: (chooseImageRes) => {
				        const tempFilePaths = chooseImageRes.tempFilePaths;
						const tempFiles=chooseImageRes.tempFiles;
						console.log(tempFiles)
						console.log(tempFilePaths[0])
						this.$uploadRequest({
							url:'/fileHandle/uploadSingleOpenPicture',
							filePath: tempFilePaths[0],
							method:'POST'
						}).then(res=>{
							var data=JSON.parse(res.data)
							console.log(data)
							if(data.code==0){
								this.src=tempFilePaths[0]
								console.log(this.doctorId)
								amend({
									doctorId:this.doctorId,
									avatar:data.object.id
								}).then(res=>{
									console.log(res)
									if(res.data.code==0){
									}else{
										uni.showToast({
											title:res.data.msg,
											icon:'none'
										})
									}
								}).catch(err=>{
										console.log(err)
								})
							}else{
								uni.showToast({
									title:data.msg,
									icon:'none'
								})
							}
						}).catch(err=>{
							console.log(err)
						});
				    },
					fail(e) {
						console.log(e)
					}
				});
			},
			amend(index){
				switch (index){
					case 0:// 修改名称
						uni.navigateTo({
							url:'/pages/PersonalInfor/AmendInfor?pageTitle='+'修改名称'+'&pageId='+0,
						})
					break;
					case 1://修改性别
						this.gendershow=true
					break;
					case 2://出生日期
						this.dayshow=true
					break;
					case 3://身份证号码
						this.idcardshow=true
						this.value=''
					break;
					case 4://身份照片
						uni.navigateTo({
							url:'/pages/PersonalInfor/AmendInfor?pageTitle='+'上传身份证图片'+'&pageId='+5+'&frontSrc='+encodeURIComponent(this.frontSrc)+'&backSrc='+encodeURIComponent(this.backSrc),
						})
					break;
					case 5://所属医院或企业
						uni.navigateTo({
							url:'/pages/PersonalInfor/AmendInfor?pageTitle='+'修改所属医院'+'&pageId='+1+'&roleId='+this.roleId,
						})
					break;
					case 6://医院详细地址
						uni.navigateTo({
							url:'/pages/PersonalInfor/AmendInfor?pageTitle='+'修改医院地址'+'&pageId='+2,
						}) 
					break;
					case 7://所属科室
						// 获取科室数据并打开弹窗
						this.getDepartments()
					break;
					case 8://职位
						uni.navigateTo({
							url:'/pages/PersonalInfor/AmendInfor?pageTitle='+'修改职位'+'&pageId='+4,
						}) 
					break;
					case 9://医生执照
						uni.navigateTo({
							url:'/pages/PersonalInfor/AmendInfor?pageTitle='+'上传医生执照'+'&pageId='+6+'&licenseSrc='+ encodeURIComponent(this.licenseSrc),
						})
					break;
					case 10://角色选择
						uni.showToast({
							title:'不能修改',
							icon:'none'
						})
					break;
					default:
						uni.showToast({
							title:'修改失败',
							icon:'none'
						})
					break;
				}
			},
			// 角色修改
			roleconfirm(e){
				this.role=e[0].label//
				this.roleId=e[0].value
			},
			// 性别修改
			confirm(e){
				// 注意返回值为一个数组，单列时取数组的第一个元素即可(只有一个元素)
				amend({
					doctorId:this.doctorId,
					sex:e[0].label
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
					 	this.gender=e[0].label
						this.gendershow=false
					}else{
						this.$refs.uToast.show({
							title: res.data.msg
						})
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			// 修改日期
			amendday(e){
				// console.log(e)
				amend({
					doctorId:this.doctorId,
					birthday:e.result
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
					 	this.birthday=e.result
						this.dayshow=false
					}else{
						this.$refs.uToast.show({
							title: res.data.msg
						})
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			// 按键被点击(点击退格键不会触发此事件)
			valChange(val){	
				this.value += val;
				// console.log(this.value)
			},
			// 退格键被点击
			backspace() {
				// 删除value的最后一个字符
				if(this.value.length) this.value = this.value.substr(0, this.value.length - 1);
				// console.log(this.value);
			},
			// 身份证上传(还是有点bug)
			complete(){
				console.log(this.value)
				if(!this.value){
					uni.showToast({
						title:'不能为空',
						icon:'none'
					})
					return;
				}
				amend({
					doctorId:this.doctorId,
					iDcard:this.value
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						this.idcardshow=false
						this.idcode=this.value
					}else{
						this.$refs.uToast.show({
							title: res.data.msg
						})
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			// 身份证取消输入
			cancel(){
				// 取消时将元数据赋值给输入框
				this.idcode=this.idcodebackup
			},
			departconfirm(e){
				amend({
					doctorId:this.doctorId,
					department:e[0].value
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						this.department=e[0].label
						this.departmentbool=false
					}else{
						this.departmentbool=false
						this.$refs.uToast.show({
							title: res.data.msg
						})
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			// 获取部门数据
			getDepartments(){
				getDepartments({}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						var data = JSON.parse(JSON.stringify(res.data.object).replace(/diseaseCategoryName/g,"label"))
						console.log(data)
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
		},
		watch:{
			value(newValue,oldValue){
				this.idcode=newValue
			}
		},
		onReady() {
			var auditstatus=this.$store.getters['user/info'].auditstatus
			if(auditstatus=='PS'){
				this.$refs.uTips.show({
					title: '待审核',
					type: 'info',
					duration: '5000'
				})
			}else if(auditstatus=='NP'){
				this.$refs.uTips.show({
					title: '审核未通过',
					type: 'warning',
					duration: '5000'
				})
			}else if(auditstatus=='ZC'){
				this.$refs.uTips.show({
					title: '新用户填写审核资料',
					type: 'warning',
					duration: '5000'
				})
			}
			this.amendNavigator()
		},
		// 获取个人数据
		onShow() {
			// plus.key.addEventListener('backbutton',backListener,false); 
		},
		// back回来不会执行
		onLoad(options) {
			console.log(options)
			getInfor({}).then(res=>{
				console.log(res)
				if(res.data.code==0){
					var data=res.data.object
					this.Uname=data.name
					this.gender=data.sex
					this.birthday=data.birthday
					this.idcode=data.iDcard
					this.idcodebackup=data.iDcard
					this.hospital=data.hospital
					this.address=data.address
					this.idpictrue=data.processResult
					this.department=data.departmentName
					this.position=data.position
					this.license=data.processResult
					this.src=data.avatarLinks
					this.roleId=data.accountOwner
					if(data.accountOwner){
						switch (data.accountOwner){
							case '0':
								this.role='医生'
							break;
							case '1':
								this.role='学生'
							break;
							case '2'://测试账户
								this.role='测试账户'
							break;
							case '3':
								this.role='企业用户'
							break;
							default:
								this.role='测试账户'
							break;
						}
					}
					for(let i in data.previewImage){
						if(i==data.iDcardPicture){
							this.frontSrc=data.previewImage[i]
							console.log(this.frontSrc)
						}
						if(i==data.iDcardPictureBack){
							this.backSrc=data.previewImage[i]
							console.log(this.backSrc)
						}
						if(i==data.doctorLicense){
							this.licenseSrc=data.previewImage[i]
							console.log(this.licenseSrc)
						}
					}
				}else{
					uni.showToast({
						title:res.data.msg
					})
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		onBackPress(e){
			console.log(e)
			uni.switchTab({
				url:'/pages/Tabbar/mine'
			})
			return true
		}
	}
</script>

<style scoped>
	page{
		background-color: #f8f8f8;
	}
	.Information{
		padding-bottom: 20rpx;
	}
	.editAvatar{
		padding: 30rpx 0;
		color: #909090;
		font-size: 28rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #ffffff;
	}
	.editAvatar .logo{
		margin-bottom: 20rpx;
	}
	.basic{
		padding: 0 30rpx;
		background-color: #ffffff;
	}
	.item{
		display: flex;
		justify-content: space-between;
		padding: 30rpx 0;
		border-bottom: 1px solid #EEEEEE;
		border-top: 1px solid #EEEEEE;
		font-size: 28rpx;
		color: #000000;
	}
	.item .icon{
		margin-left: 22rpx;
	}
	.job{
		margin-top: 60rpx;
	}
	.date .title{
		text-align: center;
	}
	/* #ifndef APP-NVUE */
	.date ::v-deep .u-btn--primary{
		background-color: #86B0D4;
	}
	/* #endif */
	.hospitalText{
		width: 75%;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		text-align: right;
	}
</style>
