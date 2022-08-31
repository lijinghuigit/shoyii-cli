import {ref} from 'vue'
import {getBanner} from '@/utill/api/Index/banner.js'
export default function useBanner(){
	const bannerList = ref([])
	const getBannerList=()=>{
		getBanner({}).then(res=>{
			console.log(res)
			if(res.data.code==0){
				bannerList.value=res.data.object
			}
		}).catch(err=>{
			console.log(err)
		})
	}
	return {
		bannerList,
		getBannerList,
	}
}