<template>
	<view class="accountSecurity" :data-theme='themeType'>
		<view class="center-list-item sy_block sy_border_bottom" @click='enterPage(0)' hover-class="bgColor">
			<text class="list-text sy_title_primary">修改账号</text>
			<view class="">
				<text>{{filterPhone(phone)}}</text>
				<uni-icons type="arrowright" :color="themeType=='dark'?'#8f8f8f':''"></uni-icons>
			</view>
		</view>
		<view class="center-list-item sy_block sy_border_bottom" @click='enterPage(1)' hover-class="bgColor">
			<text class="list-text sy_title_primary">修改密码</text>
			<uni-icons type="arrowright" :color="themeType=='dark'?'#8f8f8f':''"></uni-icons>
		</view>
		<view class="center-list-item sy_block sy_border_bottom" @click='enterPage(2)' hover-class="bgColor">
			<text class="list-text sy_title_primary">二级密码</text>
			<text>{{ifSetting}}</text>
			<uni-icons type="arrowright" :color="themeType=='dark'?'#8f8f8f':''"></uni-icons>
		</view>
		<view class="center-list-item sy_block sy_border_bottom" @click='enterPage(3)' hover-class="bgColor">
			<text class="list-text sy_title_primary">绑定微信</text>
			<text v-if="unionId">{{bindcontent}}</text>
			<text v-else>未绑定</text>
			<uni-icons type="arrowright" :color="themeType=='dark'?'#8f8f8f':''"></uni-icons>
		</view>
		<!-- 解除绑定微信痰喘 -->
		<u-modal v-model="bindshow" title='解除绑定' :content="content" :show-cancel-button='true'
		 confirm-text='解除' @confirm='confirm' @cancel="cancel">
		</u-modal>
	</view>
</template>

<script>
	import {getInfor} from '@/utill/api/personalInfor/getInfor.js'
	import {cancelBind} from '@/utill/api/login/wechatBind.js'
	export default {
		data() {
			return {
				phone:'',
				ifSetting: '未启用',
				unionId:false,
				bindshow:false,
				content:'是否解除绑定微信',
				bindcontent:"已绑定微信",
				ifSecond:true,
			}
		},
		methods: {
			filterPhone(data){
				var telChange=data.substring(3,data.length-4)
				return data.replace(telChange,"****")
			},
			enterPage(index){
				if(index==0){//修改账号
					uni.navigateTo({
						url:'/pages/AccoutSecurity/amendPhone?phone='+this.phone
					})
				}else if(index==1){//修改密码
					uni.navigateTo({
						url:'/pages/AccoutSecurity/amendPwd'
					})
				}else if(index==2){//修改二级密码
                    uni.navigateTo({
                        url: '/pages/AccoutSecurity/secondPwd?phone='+this.phone+'&ifSecond='+this.ifSecond
                    })
                }else if(index==3){
					if(this.unionId){
						this.bindshow=true
					}else{
						uni.showToast({
							title:'请用微信登录绑定',
							icon:'none'
						})
					}
				}
			},
			confirm(){
				cancelBind({
					unionId:this.unionId
				}).then(res=>{
					console.log(res)
					uni.showToast({
						title:res.data.msg,
						icon:'none'
					})
					this.bindshow=false
					this.bindcontent='未绑定'
				}).catch(err=>{
					console.log(err)
				})
			},
			cancel(){
				this.bindshow=false
			},
			getDocinfor(){
				getInfor({}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						this.unionId=res.data.object.unionId
						this.content=`是否解除绑定 "${res.data.object.nickName}" 这个微信`
						this.ifSecond=res.data.object.secondLevelPasswordSwitch
						if(res.data.object.secondLevelPasswordSwitch){
							this.ifSetting='已启用'
						}else{
							this.ifSetting='未启用'
						}
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
		},
		onLoad(options) {
			this.phone=options.phone
			this.getDocinfor()
		},
		onReady() {
			this.amendNavigator()
		}
	}
</script>

<style scoped>
	page{
		background-color: #f8f8f8;
		/* #ifdef H5 */
		height: 100%;
		/* #endif */
	}
	.accountSecurity{
		width: 100%;
		/* #ifdef H5 */
		min-height: 100%; 
		/* #endif */
		/* #ifndef H5 */
		min-height: 100vh;
		/* #endif */
	}
	.center-list-item {
		padding: 30rpx 30rpx;
		border-bottom: 1px solid #EEEEEE;
		align-items: center;
		justify-content: space-between;
		display: flex;
		background-color: #ffffff;
	}
	.list-text {
		font-size: 30rpx;
		color: #000000;
		font-family: PingFang-SC-Regular;
		flex: 1;
		text-align: left;
	}
	.bgColor{
		background-color: #F8F8F8;
	}
</style>
