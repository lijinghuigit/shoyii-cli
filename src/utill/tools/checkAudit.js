// #ifndef APP-NVUE
import store from '@/store/index.js';
// #endif
function checkAudit(){
	let auditstatus=''
	// #ifndef APP-NVUE
	auditstatus=store.getters['user/info'].auditstatus
	// #endif
	// #ifdef APP-NVUE
	auditstatus=uni.getStorageSync('userInfo').auditstatus
	// #endif
	// console.log('xxxxxx',auditstatus)
	if(auditstatus=='NP'||auditstatus=='ZC'){//如果未通过
	// if(auditstatus=='AP'){//如果已通过
		uni.showModal({
			title: '审核状态',
			content: '您的信息审核没有通过，暂时不能查看当前内容，是否前去重新修改信息',
			cancelText:'否',
			confirmText:'是',
			success: function (res) {
				if (res.confirm) {
					uni.navigateTo({
						// 进入修改审核页面
						url:'/pages/PersonalInfor/auditInfor'
					})
				} else if (res.cancel) {
					console.log('用户点击取消');
				}
			}
		});
		return true
	}
	return false
}

export default checkAudit


