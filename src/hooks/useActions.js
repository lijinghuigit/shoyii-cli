import { mapActions, createNamespacedHelpers } from 'vuex';
import {useActionMapper} from './useMapper'
 // @param {*} moduleName 模块名称
 // * @param {*} mapper 方法名集合 ['fn1', 'fn2']
 export function useActions(moduleName, mapper) {
    let mapperFn = mapActions;
	// 如果使用模块化，则使用vuex提供的createNamespacedHelpers方法找到对应模块的mapActions方法
    if (typeof moduleName === 'string' && moduleName.length > 0) {
        mapperFn = createNamespacedHelpers(moduleName).mapActions
    }else {
		mapper = moduleName
	}
    return useActionMapper(mapper, mapperFn)
}