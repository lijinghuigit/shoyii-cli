import { mapGetters, createNamespacedHelpers } from 'vuex'
import { useStateMapper } from './useMapper'
// moduleName 模块名称; mapper: getters属性集合 ['name', 'age']
export function useGetters(moduleName, mapper) {
    let mapperFn = mapGetters;
	// 如果使用模块化，则使用vuex提供的createNamespacedHelpers方法找到对应模块的mapGetters方法
    if (typeof moduleName === 'string' && moduleName.length > 0) {
        mapperFn = createNamespacedHelpers(moduleName).mapGetters
    }else {
		mapper = moduleName
	}
    return useStateMapper(mapper, mapperFn)
}