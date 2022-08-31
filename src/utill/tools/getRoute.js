export default function getPageRoute(id1,id2){
	let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
	let Routers = routes[routes.length - 1] 
	// console.log(Routers.$page.fullPath) //完整路径/pages/model/MyDetail?modelId=220
	if(!id2){
		return [Routers.route,Routers[id1]]// 获取当前页面路由，也就是最后一个打开的页面路由;路由参数
	}else{
		return [Routers.route,Routers[id1],Routers[id2]]// 获取当前页面路由，也就是最后一个打开的页面路由;路由参数
	}
	
	
}