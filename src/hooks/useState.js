import { mapState, createNamespacedHelpers } from 'vuex'
import { useStateMapper } from './useMapper'
// moduleName 模块名称; mapper: state属性集合 ['name', 'age']
export function useState(moduleName, mapper) {
    let mapperFn = mapState;
	// 如果使用模块化，则使用vuex提供的createNamespacedHelpers方法找到对应模块的mapState方法
    if (typeof moduleName === 'string' && moduleName.length > 0) {
        mapperFn = createNamespacedHelpers(moduleName).mapState
    }else {
		mapper = moduleName
	}
    return useStateMapper(mapper, mapperFn)
}