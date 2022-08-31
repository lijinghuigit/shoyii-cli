// 存储在本地的用户信息
import {getInfor} from '@/utill/api/personalInfor/getInfor.js'
let userInfoHistory = uni.getStorageSync('userInfo') || {};
let state={
		hasLogin:Boolean(Object.keys(userInfoHistory).length),//是否已经登陆
		userInfo:userInfoHistory,//用户信息
    },
	getters = {
		info(state) {
			return state.userInfo;
		},
		hasLogin(state){
			return state.hasLogin;
		}
	},
	mutations={
		login(state,provider){
			console.log('登录')
			// console.log(provider)
			// 登陆态为已登录
			state.hasLogin = true
			let _info=state.userInfo
			state.userInfo = Object.assign({}, _info, provider)
			// console.log(state.userInfo)//最终的数据
			//存储最新的用户数据到本地持久化存储（token及过期时间的存储）
			uni.setStorageSync('userInfo', state.userInfo);
		},
		logout(state,provider){
			console.log('退出登录')
			// 登陆态为未登录
			state.hasLogin = false;
			// 清除用户信息
			state.userInfo = {};
			// 清除本地缓存
			uni.setStorageSync('userInfo', {});
		}
	},
	actions={
		async setInfor({ state, commit, rootState,dispatch },data){
			await dispatch('asyncLogin',data) //先保存token，后面的接口需要token
			getInfor({}).then(res=>{
				console.log(res)
				// 二级密码和账户类型
				commit('login',{
					// 是否有设置二级密码
					secondSwitch:res.data.object.secondLevelPasswordSwitch?res.data.object.secondLevelPasswordSwitch:false,
					accountOwner:res.data.object.accountOwner?res.data.object.accountOwner:null,
					departmentName:res.data.object.departmentName?res.data.object.departmentName:'',//科室名称
					departmentId:res.data.object.department?res.data.object.department:null,//科室id
				})
			})
		},
		async asyncLogin({commit},data){
			commit('login',data)
		},
		// 测试
		getUserOpenId: async function ({
			commit,
			state
		}) {
			return await new Promise((resolve, reject) => {
				if (state.openid) {
					resolve(state.openid)
				} else {
					uni.login({
						success: (data) => {
							commit('login')
							setTimeout(function () { //模拟异步请求服务器获取 openid
								const openid = '123456789'
								console.log('uni.request mock openid[' + openid + ']');
								commit('setOpenid', openid)
								resolve(openid)
							}, 1000)
						},
						fail: (err) => {
							console.log('uni.login 接口调用失败，将无法正常使用开放接口等服务', err)
							reject(err)
						}
					})
				}
			})
		}
	};
export default{
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}