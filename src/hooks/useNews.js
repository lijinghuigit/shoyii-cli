import { reactive,toRefs } from "vue"
import {getNewsList} from '@/utill/api/news/news.js'
export default function useNews(){
	const state=reactive({
		NewstabIndex:0,
		newsData:[
			{data:[],page:1,Totalpage:null},//案例
			{data:[],page:1,Totalpage:null}//指南
		],
	})
	const newsMenu=(index)=>{
		if(index==0){//案例
			state.NewstabIndex=0
			state.newsData[0].page=1
			getNewsData('4',1)
		}else if(index==1){//说明
			state.NewstabIndex=1
			state.newsData[1].page=1
			getNewsData('1',1)
		}else if(index==2){//进入列表 
			uni.navigateTo({
				url:'/pages/news/news?id='+''
			})
			return;
		}else if(index==3){//展开更多
			if(state.NewstabIndex==0){
				if(state.newsData[0].page<=state.newsData[0].Totalpage){
					getNewsData('4',state.newsData[0].page,'mark')
				}else{
					uni.showToast({
						title:'无更多数据',
						icon:'none'
					})
				}
			}else if(state.NewstabIndex==1){
				if(state.newsData[1].page<=state.newsData[1].Totalpage){
					getNewsData('1',state.newsData[1].page,'mark')
				}else{
					uni.showToast({
						title:'无更多数据',
						icon:'none'
					})
				}
			}
		}
	}
	const getNewsData=(newsId,page,mark)=>{
		getNewsList({
			page:page,
			size:4,
			categoryId:newsId
		}).then(res=>{
			if(res.data.code==0){
				if(newsId=='4'){//案例
					state.newsData[0].page++ //页数添加
					if(mark){
						state.newsData[0].data=state.newsData[0].data.concat(res.data.object.list)
					}else{
						state.newsData[0].data=res.data.object.list
					}
					// state.newsData[0].data=[...state.newsData[0].data,...res.data.object.list]
					state.newsData[0].Totalpage=res.data.object.pages //总页数
					// console.log(state.newsData[0].data)
				}else if(newsId=='1'){//说明
					state.newsData[1].page++//页数添加
					if(mark){
						state.newsData[1].data=state.newsData[1].data.concat(res.data.object.list)
					}else{
						state.newsData[1].data=res.data.object.list
					}
					// state.newsData[1].data=[...state.newsData[1].data,...res.data.object.list]
					state.newsData[1].Totalpage=res.data.object.pages// 总页数
				}
			}else{
				uni.showToast({
					title:res.data.msg,
					icon:'none'
				})
			}
		}).catch(err=>{
			uni.hideLoading()
			console.log(err)
		})
	}
	return {
		...toRefs(state),
		newsMenu
	}
}