import {useStore} from 'vuex'
import { computed } from 'vue'
// mapper传入的参数（如果是action，则传入的是方法；如果是state或getters，就是属性的集合）,
// mapFn是传入的辅助函数
export function useStateMapper(mapper, mapFn) {
    const store = useStore();
    const storeStateFns = mapFn(mapper);
	console.log(mapper) //info
	console.log(storeStateFns)
    const storeState = {};
    Object.keys(storeStateFns).forEach(fnKey => {
		console.log(fnKey) //info
        // vuex源码中mapState和mapGetters的方法中使用的是this.$store,所以更改this绑定
        const fn = storeStateFns[fnKey].bind({ $store: store });
        storeState[fnKey] = computed(fn)
		console.log(storeState)
    })
    return storeState
}
export function useActionMapper(mapper, mapFn) {
    const store = useStore();
    const storeActionsFns = mapFn(mapper);
    const storeAction = {};
    Object.keys(storeActionsFns).forEach(fnKey => {
        storeAction[fnKey] = storeActionsFns[fnKey].bind({ $store: store })
    })
    return storeAction
}