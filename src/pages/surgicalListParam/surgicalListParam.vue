<template>
	<view class="surgical">
		<view class="header_top">
			<view class="" @click="search" style="padding: 10rpx 30rpx;background-color: #FFFFFF;">
				<u-search placeholder="方法库相关信息" :disabled='true' :show-action="false" shape="round" bg-color='#ffffff' border-color='#EEEEEE' height='64'></u-search>
			</view>
			<u-dropdown ref="uDropdown" @open="open" @close="close" active-color="#86B0D4">
				<u-dropdown-item :title="item.title" v-for="(item,index1) in menu" :key='index1'>
					<view class="slot-content">
						<scroll-view scroll-y="true" style="height: 294rpx;">
							<view :class="boolean==item.id?'selectedClass':''" class="subContent" @click="selectedContent(item)" v-for="(item,index2) in menuData" :key='index2'>
								<text>{{item.name}}</text>
							</view>
						</scroll-view>
						<view class="btn">
							<u-button type="primary" size="default" shape="square" class="surebtn" @click="closeDropdown">确定</u-button>
						</view>
					</view>
				</u-dropdown-item>
			</u-dropdown>
		</view>
		<scroll-view 
		scroll-y="true" class="content" @scrolltolower='scrolltolower'>
				<surgical-list v-for='(item,index3) in surgicalListAll' :key='index3' :Surgicalid="item.surgicalPlanId" :docName='item.doctorName' :time='item.createTime' :imgUrl='filterUrl(item)' :content='item.title' :content_title="item.surgicalPlanName" :doctor='item.doctor'></surgical-list>
				<view class="bottomTip">
					<load-more :loadtext='loadtextAll'></load-more>
				</view>
		</scroll-view>		
		<u-no-network></u-no-network>
	</view>
</template>   
<script>
	import {getSurgical,getSurgicalMenu,getSurgicalparam} from '@/utill/api/surgical/getSurgical.js' 
	import SurgicalList from '@/components/surgical/SurgicalList.vue'
	import {mapGetters} from 'vuex'
	export default {
		components:{
			SurgicalList
		},
		data() {
			return {
				loadtextAll:'',//全部手术方法的底部提示
				// 下拉菜单
				boolean:0,//选中子菜单
				menu:[//默认菜单
					{title:'科室'},
					{title:'部位'},
					{title:'子部位'},
					// {title:'方法'},
				],
				menuData:[],//下拉出来的子菜单
				index:'',//顶部子菜单的index，对应menu中的index
				id:'',//选中的子菜单的id，用于获取下一级菜单数据
				//获取所有方法分页
				surgicalListAll:[],//全部手术方法数据
				page:1,
				size:6,
				total:1,//总页数默认为1，后端没有数据返回的是0
				mark:0,//用于进行加载更多的操作,用于进行数据的contact,是0则只加载第一页数据，为1，则进行数据的叠加
				officeId:'',
				sectionId:'',
				sonsectionId:'',
				methodsId:'',
			}
		},
		methods: {
			//帮助
			help(){
				uni.showToast({
				    title: '开发中',
				    duration: 1000,
					icon:'none'
				});
			},
			notice(){
				uni.showToast({
				    title: '开发中',
				    duration: 1000,
					icon:'none'
				});
			},
			// 进入搜索页面
			search(){
				uni.navigateTo({
					url:'/pages/search/search',
					animationType:'pop-in'
				})
			},
			scrolltolower(e){
				console.log('触底啦')
				console.log(e)
				this.loadtextAll='加载中...'
				this.loadmore()//获取更多数据
			},
			// 上拉加载
			loadmore(){
				if(this.page>this.total){//加载的页数大于等于总页数时，停止加载数据
					return 	this.loadtextAll='没有更多数据';
				}
				this.mark=1
				this.getSurcialData(this.mark,this.id)//id用于区分选中的子菜单对应的数据
			},
			// 获取全部手术方法数据
			getSurcialData(mark,id){
				if(!this.checkAudit()){//审核状态判断
					var timer = setTimeout(function() {
						uni.showLoading({
						  title: '数据加载中...',
						})
					}, 2000)
					var _this=this
					getSurgical({
						start:this.page,
						length:this.size,
						surgicalPlanTypeId:id
					}).then(res=>{
						console.log(res)
						clearTimeout(timer)
						uni.hideLoading()//关闭加载提示
						if(res.data.code==0){
							this.total=res.data.object.pages//总页数
							console.log(res.data.object.pages)
							this.page++//页数增加一页
							var data=res.data.object.list
							res.data.object.list.filter(item=>{
								console.log(item.doctor)
								if(!item.doctor){
									// item.doctor.avatarLinks=uni.getStorageSync('uploadLogo')
								}
								if(!item.previewList[0]){
									item.previewList.push({
										fileDownloadUrl:uni.getStorageSync('uploadLogo')
									})
								}
							})
							console.log(res.data.object.list)
							if(res.data.object.list.length==0){
								this.loadtextAll='没有更多数据';
							}
							if(mark=='1'){//加载更多的操作
								this.surgicalListAll=this.surgicalListAll.concat(res.data.object.list) 
							}else{//初始化操作
								this.surgicalListAll=res.data.object.list
							}
							console.log(this.surgicalListAll)
						}else{
							uni.showModal({
								title:'未登录',
								content:'用户未登录',
								confirmText:'前去登录',
								success(e){
									console.log(e)
									if(e.confirm){//点击确定
										uni.navigateTo({
											url:'/pages/login/tellogin?pages='+'/pages/Tabbar/surgicalData'+'&pagetype='+1,
											animationType:'pop-in'
										})
									}	
								},
								fail(e) {
									console.log(e)
								}	
							})
						}
					})
				}
			},
			//点击默认菜单中选型
			open(index) {
				this.index=index
				console.log(index)//根据index，去调用接口，获取内容数据
				// 展开某个下来菜单时，先关闭原来的其他菜单的高亮
				// 同时内部会自动给当前展开项进行高亮
				this.$refs.uDropdown.highlight();
				// this.menuData 根据不同的index，获取不同的数据
				if(index==0){//科室的数据
					this.getTitle(0)//获取科室数据，默认是0或者不传
				}
				// 部位数据
				if(index==1){
					if(!this.officeId){//如果没选中一级子菜单，则数据为空
						uni.showToast({
							title:'请选择科室',
							icon:'none'
						})
						this.menuData=''
						return
					}
					this.getTitle(this.officeId)
				}
				// 子部位数据
				if(index==2){//如果没选中二级子菜单，则数据为空	
					if(!this.sectionId){//如果没选中一级子菜单，则数据为空
						uni.showToast({
							title:'请选择部位',
							icon:'none'
						})
						this.menuData=''
						return
					}
					this.getTitle(this.sectionId)
				}
				// 方法数据
				// if(index==3){
				// 	if(!this.sonsectionId){//如果没选中一级子菜单，则数据为空
				// 		uni.showToast({
				// 			title:'请选择子部位',
				// 			icon:'none'
				// 		})
				// 		this.menuData=''
				// 		return
				// 	}
				// 	this.getTitle(this.sonsectionId)
				// }
			},
			// 获取子菜单内容
			getTitle(id){
				getSurgicalMenu({
					parentId:id
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						this.menuData=res.data.object
					}else{
						uni.showModal({
							title:'未登录',
							content:'用户未登录',
							confirmText:'前去登录',
							success(e){
								console.log(e)
								if(e.confirm){//点击确定
									uni.navigateTo({
										url:'/pages/login/tellogin?pages='+'/pages/Tabbar/surgicalData'+'&pagetype='+1,
										animationType:'pop-in'
									})
								}	
							},
						})
					}
				})
			},
			// 选中的菜单内容
			selectedContent(data){
				console.log(data)
				this.boolean=data.id
				// 将选中的值赋值给菜单
				this.menu[this.index].title=data.name
				// 在这块要赋值id
				this.id=data.id//将每一级的id赋值给id，选择哪个给哪个
				if(this.index==0){
					this.officeId=data.id
					this.menu[1].title='部位'
					this.menu[2].title='子部位'
					// this.menu[3].title='方法'
					this.sectionId=''
					this.sonsectionId=''
					this.methodsId=''
				}
				if(this.index==1){
					this.sectionId=data.id
					this.menu[2].title='子部位'
					// this.menu[3].title='方法'
					this.sonsectionId=''
					this.methodsId=''
				}
				if(this.index==2){
					this.sonsectionId=data.id
					// this.menu[3].title='方法'
					this.methodsId=''
				}
				if(this.index==3){
					this.methodsId=data.id
				}
				console.log(this.index)
			},
			closeDropdown() {//dropdown，自定义关闭按钮
				// 关闭子菜单
				this.$refs.uDropdown.close();
				console.log(this.index)
				// 确定之后,进行搜索
				console.log(this.id)
				this.page=1
				this.size=6
				this.getSurcialData(0,this.id)
			},
			close(index) {//dropdown 下拉菜单被关闭时触发,点击蒙泰窗也会触发，不做搜索
				// 关闭的时候，给当前项加上高亮
				// 也可以通过监听dropdown-item的@change事件进行处理
				this.$refs.uDropdown.highlight(index);
			},
			filterUrl(data){
				console.log(data)
				if(data.previewList&&data.previewList.length!=0){
					return data.previewList[0].fileDownloadUrl
				}else{
					return '/static/image/shoyiilogo.png'
				}
			},
		},
		onLoad() {
			//1表示switchTab
			if(this.checkLogin('/pages/surgicalListParam/surgicalListParam',2)){//token 存在
				this.getSurcialData(0,0)//初始化时，加载所有的数据
			}else{
				return
			}
		},
	}
</script>

<style scoped>
	.surgical{
		background-color: #F0F0F0;
	}
	.header_top{
		background-color: #FFFFFF;
		width: 100%;
		background-color: #FFFFFF;
		z-index: 99999;
	}
	/* #ifndef APP-NVUE */
	.header_top ::v-deep .uni-searchbar__box{
		justify-content: flex-start!important;
	}
	.header_top ::v-deep .uni-searchbar{
		padding-left: 30rpx;
		padding-right: 30rpx;
	}
	/* #endif */
	.bottomTip{
		color: #86B0D4;
		text-align: center;
		margin: 10rpx 0;
		font-size: 28rpx;
	}
	.content{
		margin-top: 20rpx;
		/* height: calc(100vh - 90rpx - 184rpx - 88rpx); */
		/* 自定义的导航栏 */
		/* #ifdef APP-PLUS */
			/* height: calc(100vh - 90rpx - 184rpx - 88rpx); */
		/* #endif */
		/* #ifdef H5 */
			/* height: calc(100vh - 90rpx - 184rpx - 88rpx); */
		/* #endif */
		overflow-y: auto;
		/* #ifdef MP-WEIXIN */
		 height: calc(100vh - 184rpx);
		/* #endif */
		-webkit-overflow-scrolling: touch;
	}
	.selected{
		background-color: #E8E8E8;
	}
	.slot-content{
		background-color: #F8F8F8;
	}
	.subContent{
		text-align: center;
		font-size: 28rpx;
		color: #000000;
		padding: 20rpx 0;
	}
	.selectedClass{
		background-color: #E8E8E8;
		font-weight: bold;
		font-family: PingFang-SC-Bold;
	}
	.btn{
		padding: 20rpx 30rpx;
		background-color: #FFFFFF;
	}
	.surebtn{
		background-color: #86B0D4;
		width: 100%;
	}
	
</style>
