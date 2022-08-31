import { reactive, ref, toRefs } from "vue";
import {getCaselist} from '@/utill/api/case/getCaselist.js' 
export default function useCase(){
	// const caselist=ref(null)
	// const casecurrent=ref(0)
	const state=reactive({
		caselist:[],
		casecurrent:0
	})
	// 获取病例数据
	const getCaseData=(identify,status)=>{
		console.log(identify,status)
		getCaselist({
			status:'ALL',
			identity:identify,
			type:'ALL',
			page:1,
			size:6,
			otherStatus:status
		}).then(res=>{
			console.log(res)
			if(res.data.code==0){
				res.data.object.list.filter(item=>{
					if(!item.previewImage){
						item.previewImage=uni.getStorageSync('uploadLogo')
					}
					if(!item.name||item.name==''){
						item.name='未填写'
					}
				})
				state.caselist=res.data.object.list
				console.log(state.caselist)
			}else{
				uni.showToast({
					title:res.data.msg,
					icon:'none'
				})
			}
		})
	}
	// 病例menu
	const menuClick=(e)=>{
		if (state.casecurrent !== e) {
			state.casecurrent = e;
		}
		console.log(state.casecurrent)//默认是0 
		if(state.casecurrent==0){//我的病例
			getCaseData('ZZ',"")
		}else if(state.casecurrent==1){//待确定
			getCaseData('ALL','701')//先默认是已发布
		}else if(state.casecurrent==2){//未付款
			getCaseData('ALL','901')	
		}
	}
	return {
		...toRefs(state),
		getCaseData,
		menuClick
	}
}