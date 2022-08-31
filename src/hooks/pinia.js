// 封装的pinia 函数，测试用
import { storeToRefs } from 'pinia'
import { testStore } from '@/store/piniacounter';
export default function piniaStore(){
	const counter =testStore()
	const {count,increment,myCount} = storeToRefs(testStore())
	// // const {count,increment,myCount} =testStore()
	const addcount=()=>{
		counter.increment()
		// increment()
		// 可以手动触发
		// counter.$patch({
		// 	count:counter.count+1
		// })
		// counter.count++;
		// // 或者使用 actions
		// counter.increment();
	}
	return {
		count,
		myCount,
		addcount
	}
}