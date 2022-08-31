import { reactive, toRefs, watch } from "vue";
import {getSurgical,getSurgicalparam,getSurgicalMenu} from '@/utill/api/surgical/getSurgical.js' 
export default function useSurgical(){
	const state=reactive({
		surgicalitems:[],//手术方法库的menu
		current: 0,//默认为第一个
		isScroll:false,// 是否可以滚动，默认不滚动。>3 可滚动
		surgicalListAll:[],//方法库数据
		size:2,//手术方法的每页数据
		total:'',//手术方法的总数
		typeicon:'arrowdown',//底部icon
	})
	// 获取方法库部位
	const SurgicalMenu=()=>{
		getSurgicalMenu({
			parentId:1,//默认是1，
		}).then(res=>{
			console.log(res)
			if(res.data.code==0){
				state.surgicalitems=res.data.object
				if(res.data.object.length>3){
					state.isScroll=true //可滚动
				}
				getSurcialData(res.data.object[0].id)
			}
		}).catch(err=>{
			console.log(err)
		})
	}
	// 获取手术方法数据
	const getSurcialData=id=>{
		console.log(id)
		// #ifdef APP-PLUS||H5
		getSurgical({
			start:1,
			length:state.size,
			surgicalPlanTypeId:id
		}).then(res=>{
			console.log(res)
			if(res.data.code==0){
				state.total=res.data.object.pages
				res.data.object.list.filter(item=>{
					if(!item.doctor){
						// item.doctor.avatarLinks=uni.getStorageSync('uploadLogo')
					}
					if(!item.previewList[0]){
						item.previewList.push({
							fileDownloadUrl:uni.getStorageSync('uploadLogo')
						})
					}
				})
				state.surgicalListAll=res.data.object.list
			}else{
				uni.hideLoading()//关闭加载提示
				uni.showToast({
					title:res.data.msg,
					icon:'none'
				})
			}
		})
		// #endif
		// #ifdef MP-WEIXIN
		getSurgicalparam({
			start:1,
			length:state.size,
			surgicalPlanTypeId:id
		}).then(res=>{
			console.log(res)
			if(res.data.code==0){
				state.total=res.data.object.total
				res.data.object.list.filter(item=>{
					if(!item.doctor){
						// item.doctor.avatarLinks=uni.getStorageSync('uploadLogo')
					}
					if(!item.previewList[0]){
						item.previewList.push({
							fileDownloadUrl:uni.getStorageSync('uploadLogo')
						})
					}
				})
				state.surgicalListAll=res.data.object.list
				console.log(state.surgicalListAll)
			}else if(res.data.code==2){
			}else{
				uni.hideLoading()//关闭加载提示
				uni.showToast({
					title:res.data.msg,
					icon:'none'
				})
			}
		})
		// #endif
	}
	// 手术方法库menu
	const onClickItem=value=>{//e,data
		const {e,data}=value
		state.size=2
		state.typeicon='arrowdown'
		// 样式调整
		if (state.current !== e) {
			state.current = e;
		}
		getSurcialData(data[e].id)
	}
	// 方法库底部更多
	const StrenchMore=()=>{
		if(state.typeicon=='arrowdown'){//展开
			if(state.size<state.total&&state.size<4){
				state.size+=2
				getSurcialData(state.surgicalitems[state.current].id)
			}
		}else{//收回
			state.size=2
			getSurcialData(state.surgicalitems[state.current].id)
		}
	}
	watch(() => state.size,(newValue,oldValue)=>{
		if(newValue==4){
			state.typeicon='arrowup'
		}else if(newValue!=4){
			state.typeicon='arrowdown'
		}
	})
	// 监听多个数据源
	// watch(
	// 	[() => state.size,() => state.socketData],
	// 	(newValue,oldValue)=>{
	// 		//[size的newValue，socketData的newValue],[size的oldValue，socketData的oldValue]
	// 		// size监听
	// 		if(newValue[0]==4){
	// 			state.typeicon='arrowup'
	// 		}else if(newValue[0]!=4){
	// 			state.typeicon='arrowdown'
	// 		}
	// 		// socket监听
	// 		if(newValue[1]=='head'||newValue[1]==''){//心跳回复或为空，不做处理
	// 			return
	// 		}else if(newValue[1]!='head'){
	// 			state.isDot=true
	// 			uni.showTabBarRedDot({ //红点
	// 			   index:0,
	// 			   complete(e) {
	// 					console.log(e)
	// 			   }
	// 			})
	// 		}
	// 	},
	// )
	return {
		...toRefs(state),
		SurgicalMenu,
		onClickItem,
		StrenchMore
	}
}