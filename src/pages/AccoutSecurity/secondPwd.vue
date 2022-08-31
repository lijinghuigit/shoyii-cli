<template>
    <view class="container" :data-theme='themeType'>
		<view class="" style="padding: 20rpx 30rpx;display: flex;align-items: center;">
			<u-switch v-model="checked" @change="change" active-color="#69CDFF" inactive-color="#eee"></u-switch>
			<text style="margin-left: 30rpx;" class="sy_title_primary">是否开启二级密码</text>
		</view>
		<!-- 密码设置 -->
		<view class="" v-show="ifPwd">
			<u-field
				class="sy_block"
				v-model="setpwd"
				:label="label"
				placeholder="请填写密码"
				:password='true'
				:error-message="OlderrorMessage"
			>
			</u-field>
			<view class="" style="padding: 0 30rpx;">
			    <u-button :custom-style="pwdcustomStyle" @click="sure">确定</u-button>
			</view>
		</view>
		
		<!-- 验证码验证 -->
        <view class="amedTel" v-show="ifCode">
            <u-field
				class="sy_block"
				v-model="mobile"
				label="手机号"
				placeholder="手机号码"
				icon="phone"
				:disabled='true'
            >
            </u-field>
            <u-field
				class="sy_block"
				v-model="code"
				label="验证码"
				icon="photo"
				placeholder="请填写验证码"
				:error-message="errorMessageCode"
            >
				<template v-slot:right>
					 <u-button size="mini" @click="getCode">{{codeText}}</u-button>
				</template>
            </u-field>
            <u-verification-code ref="uCode" @change="codeChange" :seconds="seconds"></u-verification-code>
			<view class="" style="padding: 0 30rpx;">
			    <u-button :custom-style="customStyle" @click="nextStep">下一步</u-button>
			</view>
		</view>
		
    </view>
</template>

<script>
    import {secondCode,vertifyCode,setSecondPwd} from './api/secondPwd.js'
    export default {
        data() {
            return {
                mobile: '',
                code: '',
                errorMessageCode: '',//验证码的提示
                codeText: '发送验证码',
                customStyle: {
                    marginTop: '20px', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
                    color: '#ffffff',
                    background: '#86B0D4'
                },
                seconds: 60,
				checked:false,
				ifCode:false,// 是否显示手机号验证
				// ----------密码设置--------------
				setpwd: '',
				OlderrorMessage: '',
				pwdcustomStyle: {
				    marginTop: '20px', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
				    color: '#ffffff',
				    background: '#86B0D4'
				},
				// ---------------------------
				ifPwd:false,// 密码设置是否展示
				middleBool:false,//开关的中间状态
				label:'设置密码',
            }
        },
		watch:{
			checked(val) {
				console.log(val)
			}
		},
        methods: {
			change(e){
				if(e){//打开
					if(!this.middleBool){// 初始化时状态是关闭的
						this.ifPwd=true //展示出密码输入框
						this.ifCode=false
						return
					}
					this.ifPwd=true
					this.ifCode=false
				}else{// 关闭
					if(this.middleBool){// 如果开关初始化时已经开启了，点击关闭需要进行验证码登陆
						this.ifCode=true
						this.ifPwd=false //展示出密码输入框
						return
					}
					this.ifPwd=false
				}
			},
			// 密码确定
			sure() {
			    if (this.setpwd == '') {
			        this.OlderrorMessage = '密码不能为空'
			        return;
			    }
				this.ifCode=true //验证码出现
				this.ifPwd=false// 密码框消失
			},
            getCode() {
                if (this.$refs.uCode.canGetCode) {
                    uni.showLoading({
                        title: '正在获取验证码'
                    })
                    setTimeout(() => {
                        uni.hideLoading();
                        // 通知验证码组件内部开始倒计时
                        this.$refs.uCode.start();
                        // 调发送验证码接口
                        secondCode({
                            areaCode: '86',
                            telephone: this.mobile,
                        }).then(res => {
                            console.log(res)
                            if (res.data.code == 0) {
                                uni.showToast({
                                    title: res.data.msg,
                                    icon: "none"
                                });
                            } else {
                                uni.showToast({
                                    title: res.data.msg,
                                    icon: "none"
                                });
                            }
                        }).catch(err => {
                            console.log(err)
                        })
                    }, 500);
                } else {
                    this.$u.toast('倒计时结束后再发送');
                }
            },
            codeChange(text) {
                this.codeText = text;
            },
            nextStep() {
                if (!this.code) {
                    this.errorMessageCode = '验证码不能为空'
                    return;
                }
				console.log(this.checked)
                vertifyCode({
                    areaCode: '86',
                    telephone: this.mobile,
                    smsVerCode: this.code,
					secondLevelPassword:this.setpwd,
					secondLevelPasswordSwitch:this.checked
                }).then(res => {
                    console.log(res)
                    if (res.data.code == 0) {
						if(!this.checked){// 取消二级密码成功
							//是否设置二级密码
							this.$store.dispatch('user/asyncLogin',{secondSwitch:false})
						}else{
							//是否设置二级密码
							this.$store.dispatch('user/asyncLogin',{secondSwitch:true})
						}
						// 修改密码成功
						uni.switchTab({
							url:'/pages/Tabbar/mine'
						})
                    } else {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        },
		onLoad(options) {
			console.log(options)
			this.mobile=options.phone
			console.log(options.ifSecond)
			if(options.ifSecond=='true'){
				this.checked=true // 展示初始化开关状态
				this.ifPwd=true // 密码框是否展示
				this.middleBool=true//中间状态
				this.label='修改密码'
			}else{
				this.checked=false
				this.ifPwd=false
			}
		},
		onReady() {
			this.amendNavigator()
		}
    }
</script>

<style scoped lang="scss">
    page {
        height: 100%;
        background-color: #FFFFFF;
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
	.switch{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 30rpx;
		border-bottom: 1px solid #e0dbdb;
	}
    .amedTel {
        margin-top: 40 rpx;
    }
</style>
