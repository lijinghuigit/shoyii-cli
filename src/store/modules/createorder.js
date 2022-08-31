let state={
	totalPrice:0,// 总价
	serviceList:[],//去重后的额数据
	Allprice:{},//服务的所有价格
	guidePrice:{},//u所选的导板材料价格
	modelPrice:{},//所选的模型材料价格
},
getters={
	totalPrice(state){
		return state.totalPrice
	},
},
mutations={
	// 材料价格（导板和模型）
	materialPrice(state,payload){
		if(payload.type=='guide'){//导板
			state.guidePrice={type:'4',price:payload.price}
		}
		if(payload.type=='model'){//模型
			state.modelPrice={type:'6',price:payload.price}
		}
	},
	addPrice(state,payload){
		// console.log(payload)
		// 合并数组，并只保留一份相同的数据
		// 仅针对数组,合并，且只保留一份数据
		// let _serviceList=new Set([...state.serviceList,...payload]) 
		let concactArray=state.serviceList.concat(payload)
		// console.log(concactArray)
		let _serviceList=[]
		for(let item1 of concactArray){
			let flag=true//判断是否重复，true不重复
			for(let item2 of _serviceList){
				if(item1.type==item2.type){
					flag=false//数据重复
				}
			}
			if(flag){//不重复push
				_serviceList.push(item1)
			}
		}
		// console.log(_serviceList)
		state.serviceList=_serviceList
		console.log(state.serviceList)
		// 数组中price累加
		state.totalPrice=state.serviceList.reduce((pre,cur)=>{
			return pre+cur.price
		},0)
		console.log(state.totalPrice)
	},
	reducePrice(state,payload){
		// console.log(payload)
		// console.log(state.serviceList)//去重后的数据
		// 在已去重的数据中，删除payload中的数据，最后剩下的数据，即是最终的type
		// 先要判断unique，便于处理元数据
		// 如果传入的参数中有unique,则需要在元数据中将unique删除
		if(payload.findIndex(item=>item.type=='unique')!=-1){
			// 原数组中删除unique的数据
			let index=state.serviceList.findIndex(item=>item.type=='unique')//获取下标
			state.serviceList.splice(index,1)
		}
		// 如果元数据中存在unique，且传入的参数中包含1,3,4,6，(传入的参数不包含unique)，都需要删除unique;error
		// if(state.serviceList.findIndex(item=>item.type=='unique')!=-1&&payload.findIndex(item=>item.type=='unique')==-1){
		// 	// 原数组中删除unique的数据
		// 	let index=state.serviceList.findIndex(item=>item.type=='unique')//获取下标
		// 	state.serviceList.splice(index,1)
		// }
		//过滤相同数据后的数据（，匹配payload，过滤元数据）
		let uniqueData = state.serviceList.filter((item) => {
		    return !payload.some(ele=>ele.type===item.type)
		});
		//删除元素之后的去重数据，state.serviceList的数据，如果不存在payload中的数据，最终的结果也不会将payload那个数据加进去
		// console.log(uniqueData)
		let middleData=[]
		if(uniqueData.length==0){//数据为空
			middleData=[]
			state.totalPrice=0
			console.log(state.totalPrice)
			state.serviceList=middleData//更新累加的数据
			return
		}
		if(uniqueData.findIndex(item=>item.type=='1')!=-1){//有相同元素
			console.log('1')
			middleData=[
				{type:'1',price:state.Allprice.threeDimensionalReconstructionServicePrices},
			]
		}
		if(uniqueData.findIndex(item=>item.type=='6')!=-1){//有相同元素
			middleData=[
				{type:'6',price:state.modelPrice.price},
				{type:'1',price:state.Allprice.threeDimensionalReconstructionServicePrices},
			]
			console.log('6,1')
		}
		if(uniqueData.findIndex(item=>item.type=='3')!=-1){//有相同元素
			console.log('3,1')
			middleData=[
				{type:'3',price:state.Allprice.surgicalDesignServicePrices},
				{type:'1',price:state.Allprice.threeDimensionalReconstructionServicePrices},
			]
		}
		if(uniqueData.findIndex(item=>item.type=='4')!=-1){//有相同元素
			console.log('4,3,1')
			middleData=[
				{type:'4',price:state.guidePrice.price},
				{type:'3',price:state.Allprice.surgicalDesignServicePrices},
				{type:'1',price:state.Allprice.threeDimensionalReconstructionServicePrices},
			]
		}
		if(uniqueData.findIndex(item=>item.type=='1')!=-1&&uniqueData.findIndex(item=>item.type=='3')!=-1&&uniqueData.findIndex(item=>item.type=='4')!=-1&&uniqueData.findIndex(item=>item.type=='6')!=-1){
			console.log('6','4,3,1')
			middleData=[
				{type:'6',price:state.modelPrice.price},
				{type:'4',price:state.guidePrice.price},
				{type:'3',price:state.Allprice.surgicalDesignServicePrices},
				{type:'1',price:state.Allprice.threeDimensionalReconstructionServicePrices},
			]
		}
		// console.log(middleData)
		// 如果传入的参数没有unique，但元数据中存在unique，则需要将unique构造到新数据中
		if(uniqueData.findIndex(item=>item.type=='unique')!=-1&&payload.findIndex(item=>item.type=='unique')==-1){
			middleData.push({
				type:'unique',
				price:state.Allprice.softTissueServicePrice
			})
		}
		// console.log(middleData)
		state.serviceList=middleData//更新累加的数据
		console.log(state.serviceList)
		state.totalPrice=state.serviceList.reduce((pre,cur)=>{
			return pre+cur.price
		},0)
		console.log(state.totalPrice)
	},
	Allprice(state,payload){
		state.Allprice=payload
	},
	// 切换科室时，清除所有数据
	clearData(state){
		state.totalPrice=0,
		state.serviceList=[],
		// state.Allprice={},//总价格不清除
		state.guidePrice={},
		state.modelPrice={}
	}
},
actions={
	
}
export default{
	namespaced:true,
	state,
	getters,
	mutations,
	actions
}