<template>
	<view class="wechatItem" :data-theme='themeType'>
		<!-- #ifdef MP-WEIXIN -->
		<u-navbar class="navbar" title="" :background="themeType=='dark'?{backgroundColor: '#3A3A3A'}:background" :is-back="false"
		:border-bottom="themeType=='dark'?false:true">
			<view class="slot-wrap">
				<u-icon name="arrow-left" size="38" @click="back" :color="themeType=='dark'?'#8f8f8f':''"></u-icon>
				<text class="title sy_title_deep">{{navTitle}}</text>
				<u-icon @click='addGroup' name="more-dot-fill" size="44" :color="themeType=='dark'?'#8f8f8f':''"></u-icon>
			</view>
		</u-navbar>
		<!-- #endif -->
		<!-- 病例，只有群组里才有 -->
		<view class="caseheader">
			<view class="header" justify="center" v-if="caseid">
				<u-row gutter="16" class='headerRow sy_block' @click='enterCase(caselist.caseHistoryId)'>
					<u-col span="3">
						<view class="caseimage sy_border">
							<u-image v-if='caselist.previewImage' width="100rpx" height="100rpx" :show-error='false' :src="caselist.previewImage" mode="aspectFit"></u-image>
							<u-image v-else width="100rpx" height="100rpx" src="/static/image/shoyiilogo.png" mode="aspectFit"></u-image>		
						</view>
					</u-col>
					<u-col span="4">
						<view class="case">
							<view class="content sy_title_primary" >
								<text class="item">病历名称：</text>
								<text class="item">{{caselist.name}}</text>
							</view>
							<view class="content sy_title_primary">
								<text class="item">简介：</text>
								<text class="item">{{caselist.title}}</text>
							</view>
						</view>
					</u-col>
					<u-col span="5">
						<view class="case">
							<view class="content sy_title_primary">
								<text class="item">病历号：</text>
								<text class="item">{{caselist.caseHistoryNo}}</text>
							</view>
							<view class="content sy_title_primary">
								<text class="item">创建时间：</text>
								<text class="item">{{timeStamp(caselist.createTime)}}</text>
							</view>
						</view>
					</u-col>
				</u-row>
			</view>
		</view>
		<scroll-view class="section" :adjust-position='true' scroll-top='50' :scroll-into-view="chatIndex" :scroll-y="true" @scrolltoupper='toupper' upper-threshold="50">
			<u-loadmore :status="status" :is-dot='true' :load-text="loadText"/>
			<view class="section-item" :style="{paddingBottom:scrollHeight+'px'}">
				<view v-for="(item,index) in lastestChat" :key='index' :id="'chatIndex'+item.id">
					<text class="time" v-if="index-1 >= 0 ? lastestChat[index-1].sendTime < item.sendTime - 300000 : true">{{relativtime(item.sendTime)}}</text>
					<view class="chatlist" :class="item.userId==userId?'alluser':'allother'">
						<u-image class='image' style='border: 1px solid #F8F8F8;' width='80' height='80' :src="item.userProfile" 
						mode='aspectFit'>
							<template v-slot:error>
								<view style="">
									<u-image width='80rpx' height='80rpx' src='/static/image/person.png' mode="aspectFit"></u-image>
								</view>
							</template>
						</u-image>
						<view style="color: #000000;max-width: 500rpx;" :class="item.userId==userId?'userCord':'otherCord'">
							<!-- 文本信息 -->
							<view :class="item.userId==userId?'TextuserCord':'TextotherCord'" v-if="item.msgType=='1'">
								<text selectable='true'>{{item.content}}</text>
							</view>
							<!-- 方法库数据 -->
							<view @click="enterDetail(item)" class="surgicalCode" v-if="item.msgType=='3'">
								<view class="s_header" style="">
									<text>{{JSON.parse(item.content).surgicalPlanName}}</text>
								</view>
								<view class="s_section" style="">
									<text class="content" style="">{{JSON.parse(item.content).title}}</text>
									<image lazy-load class="image" v-if="JSON.parse(item.content).previewImage" :src="JSON.parse(item.content).previewImage" mode="aspectFit"></image>
									<image lazy-load class="image" v-else src="/static/image/shoyiilogo.png" mode="aspectFit"></image>
								</view>
								<view class="s_footer" style="">
									<image lazy-load class="image" style="" src="/static/image/shoyiilogo.png" mode="aspectFit"></image>
									<text class="name">{{JSON.parse(item.content).doctorName}}</text>
								</view>
							</view>
							<!-- 图片 -->
							<view class="cordimages" v-if="item.msgType=='2'" @click="previewImage(item)">
								<u-image class="chatimage" height="300rpx" :src="item.content" 
								mode="aspectFill"></u-image>
							</view>
							<view class="cordfile" v-if="item.msgType=='4'" @click="openFile(item)">
								<view class="title" style="">
									<text>{{JSON.parse(item.content).name}}</text>
								</view>
								<view class="" v-if="filesuffix(item)=='mp3'">
								    <u-icon name="play-circle-fill" size='100' color='#86B0D4'></u-icon>
								</view>
								<view class=""
								      v-else-if="filesuffix(item)=='pdf'||filesuffix(item)=='zip'||filesuffix(item)=='docx'">
								    <u-icon name="file-text-fill" size='100' color='#fa3534'></u-icon>
								</view>
								<view class="" v-else>
								    <u-icon name="file-text-fill" size='100' color='#999'></u-icon>
								</view>
							</view>
							<view class="surgicalCode" v-if="item.msgType=='5'" @click=CaseDetail(item)>
								<view class="s_header" style="">
									<text>{{JSON.parse(item.content).name||JSON.parse(item.content).caseHistoryNo||'暂无数据'}}</text>
								</view>
								<view class="s_section" style="">
									<text class="content" style="">{{JSON.parse(item.content).title||'暂无数据'}}</text>
									<image lazy-load class="image" v-if="JSON.parse(item.content).previewImage" :src="JSON.parse(item.content).previewImage" mode="aspectFit"></image>
									<image lazy-load class="image" v-else src="/static/image/shoyiilogo.png" mode="aspectFit"></image>
								</view>
								<view class="s_footer">
									<image lazy-load class="image" src="/static/image/shoyiilogo.png" mode="aspectFit"></image>
									<text class="name">树蚁医疗</text>
								</view>
							</view>
						 </view>
						<view class="" style="width: 80rpx;"></view>
					</view>
				</view>
			</view>
			<!-- 安全距离 -->
			<view class="empty"></view>
		</scroll-view>
		<l-file ref="lFile" @up-success="onSuccess"></l-file>
		<view class="footer sy_block" :style="{paddingBottom:keyHeight+'px'}">
			<view class="inputItem">
				<!-- #ifdef APP-PLUS-->
				<!-- <view class="record" style="padding-right: 20rpx;"  @click="startRecord">
					<u-icon color="#999" size="70" name="mic"></u-icon>
				</view> -->
				<!-- #endif -->
				<!-- 官方bug，键盘高度无参数，下个版本优化 -->
				<!-- #ifdef MP-WEIXIN -->
				<textarea :adjust-position='false' :auto-blur='true' @focus='Inputfocus' @blur="Inputblur"
				cursor-spacing='10' :hold-keyboard='true' :show-confirm-bar='false' 
				maxlength='250' class="input" :auto-height='true' v-model="InputContent"></textarea>
				<!-- #endif -->
				<!-- #ifndef MP-WEIXIN -->
				<textarea :adjust-position='true' :auto-blur='true' @focus='Inputfocus' @blur="Inputblur"
				cursor-spacing='10' :hold-keyboard='true' :show-confirm-bar='false' 
				maxlength='250' class="input" :auto-height='true' v-model="InputContent"></textarea>
				<!-- #endif -->
				 <view v-if="sendBool" class='sendBtn' @touchend.prevent="sendItem(0)">
				 	<text>发送</text>  
				 </view>
				 <view v-else @click="moreplus" style="padding-left: 20rpx;">
				 	<u-icon name="plus-circle" color="#999" size="70"></u-icon>
				 </view>
			</view>
			<view :class="{displaynone:moreboolean}">
				<view class="moreFunction sy_block">
					<view class="item" v-for="(item,index) in menu" :key='index'>
						<view class="icon">
							<text @click="sendItem(index+1)" :class="item.icon" class="iconfont"></text>
						</view>
						<text class="tip">{{item.title}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 方法库 -->
		<surgical-popup ref='Sonshow' :chatId='chatId' :type='type' @addPage='addPage' :page="surgicalPage" :total="surgicalTotal" :otherId='otherid' :surgical='surgical' @refleshData='refleshData'></surgical-popup>
		<!-- 病例 -->
		<case-popup ref='caseshow' :chatId='chatId' :type='type' @addcasePage='addcasePage' :page="casePage" :total="caseTotal" :otherId='otherid' :caseList='caseList' @caserefleshData='caserefleshData'></case-popup>
	</view>
</template>

<script>
	import {sendMessage,findchatLastest} from '@/utill/api/connect/connect.js'
	import {getcasedetail} from '@/utill/api/case/getcasedetail.js'
	import {getCaselist} from '@/utill/api/case/getCaselist.js'
	import {getSurgical} from '@/utill/api/surgical/getSurgical.js'
	import {mapGetters,mapState} from 'vuex' 
	import surgicalPopup from './components/surgicalPopup.vue'
	import casePopup from './components/casePopup.vue'
	import getFileExtension from '@/utill/tools/filesuffix.js'
	export default{
		components:{
			surgicalPopup,
			casePopup
		},
		data(){
			return{
				menu:[
					{title:'相册',icon:'icontupian'},
					{title:'拍摄',icon:'iconxiangji1'},
					{title:'文件',icon:'iconwenjian'},
					{title:'方法库',icon:'iconshoushufangfa'},
					{title:'病例',icon:'iconfasongbingli'},
				],
				status:'nomore',
				loadText: {
					loadmore: '轻轻下拉',
					loading: '',
					nomore: '没有更多' //默认是圆点
				},
				otherid:null,//其他人id
				caseid:'',
				InputContent:'',//输入的内容
				lastestChat:[],
				page:1,
				total:1,//聊天记录总页数
				surgicalPage:1,
				surgicalTotal:1,
				mark:0,
				surgical:[],//手术方法库数据
				type:null,
				caselist:{},
				chatIndex:'',
				chatId:'',//每一条记录的id
				pictureid:'',
				fileId:'',//上传文件的id
				navTitle:'',
				background:{
					background:'#f8f8f8'
				},
				moreboolean:true,
				scrollHeight:90,
				keyHeight:10,
				sendBool:false,//是否显示发送按钮
				caseList:[],//病例数据
				casePage:1,
				caseTotal:1,
			}
		},
		watch:{
			'socketData': function(val) {
				console.log('watch聊天时监听')
				// console.log(val)
				if(val=='head'){//心跳回复
					
				}else if(JSON.parse(val).friend_request){//请求的通知
					console.log(JSON.parse(val).friend_request)
				}else{
					this.InputContent=''
					var receiveData=JSON.parse(val).chatMsgDetail
					if(this.chatId==receiveData.chatId){
						this.lastestChat.push(receiveData)
					}
				}
			},
			'lastestChat':{
				handler(newValue,oldValue){
					setTimeout(()=>{ //滚动到底部
						this.pageToBottom();
					},200)
				},
				deep:true
			},
			"InputContent":function(val){
				var reg = "^[ ]+$";
				var space = new RegExp(reg);
				// console.log(space.test(val)) //空格为true
				if(val.length==0||space.test(val)){ //不存在
					this.sendBool=false
				}else{
					this.sendBool=true
				}
			},
		},
		computed:{
			...mapGetters(['socket/connect']),
			...mapState({
				socketData:state => state.socket.socketData,
			}),
			userId(){
				return this.$store.getters['user/info'].doctorId
			}
		},
		methods:{
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			// 开始录音
			startRecord(e) {
				// #ifdef APP-PLUS
				var options={
					continue:false,
					engine:'baidu',
					punctuation:false,
					userInterface:true
				}
				plus.speech.startRecognize(options, (res)=>{
					console.log(res)
					this.InputContent=res
				}, (Error)=>{
					console.log(Error)
				} );
				// #endif
			},  
			getheight(){
				let titleH=uni.createSelectorQuery().select(".footer");
				titleH.boundingClientRect(data=>{
					this.scrollHeight=data.height
					this.pageToBottom();
				}).exec()
			},
			addGroup(){
				if(this.type=='GROUP'){//进入群聊设置
					uni.navigateTo({
						url:'/pages/shoyiiChat/contactGroup?groupId='+this.otherid
					})
				}else{//进入私聊设置
					uni.navigateTo({
						url:'/pages/shoyiiChat/contactGroup?memberId='+this.otherid+'&navTitle='+this.navTitle
					})
				}
			},
			// 文件尾缀获取
			filesuffix(data) {
			    if (JSON.parse(data.content).fileDownloadUrl && JSON.parse(data.content)) {
			        getFileExtension(JSON.parse(data.content).fileDownloadUrl)
			        var dataBool = getFileExtension(JSON.parse(data.content).fileDownloadUrl)
			        return dataBool;
			    } else {
			        return
			    }
			},
			// 上传成功
			onSuccess(res) {
				console.log('上传文件的数据处理')
				console.log(res)
				console.log(res.fileName)
				// #ifdef APP-PLUS
				console.log('上传成功回调',JSON.parse(res.data.id));
				if(JSON.parse(res.data.id).code==0){
					this.fileId=JSON.parse(res.data.id).object
				}else{
					this.fileId='';
					return;
				}
				// #endif
				// #ifdef MP-WEIXIN
				if(res.data.code==0){
					this.fileId=res.data.object
				}else{
					this.fileId='';
					return;
				}
				// #endif
				console.log(this.fileId)
				if(!this.fileId){
					uni.showToast({
						title:'文件没上传',
						icon:'none'
					})
					return;
				}
				var msg={
					chatId:this.chatId,
					sendUserType:'D',
					sendUserId:this.userId,
					receiveUserType:this.type,
					receiveUserId:this.otherid,
					msgType:'4',
					msgContent:String(this.fileId)
				}
				console.log(msg)
				this.$store.dispatch('socket/WEBSOCKET_SEND',JSON.stringify(msg))	
			},
			// 图片预览
			previewImage(item){
				var arr=[]
				this.lastestChat.forEach(item=>{
					if(item.msgType=='2'){
						arr.push(item.content)
					}
				})
				uni.previewImage({
					current:item.content,
					urls:arr,
					success(e){
						console.log(e)
					},
					fail(err){
						console.log(err)
					}
				})
			},
			pageToBottom(){
				this.chatIndex=''
				let lastIndex = this.lastestChat.length-(this.page-1)*10 - 1
				console.log(lastIndex)
				if(lastIndex < 0) return;
				this.$nextTick(function(){
					this.chatIndex = 'chatIndex'+this.lastestChat[lastIndex].id
					console.log(this.chatIndex)
				})
			},
			// 群组的病例详情
			enterCase(id){
				uni.navigateTo({
					url:'/pages/caselist/caselistdetail?id='+id,
					animationType:'pop-in'
				})
			},
			// 手术方法库页面新增
			addPage(){
				console.log(this.surgicalPage)
				this.mark=1
				this.getSurgical(this.mark,this.surgicalPage)
			},
			toupper(e){//向上刷新
				// 查找历史记录
				if(this.page >= this.total) return this.status = 'nomore';
				this.status = 'loading';
				this.page++;
				this.mark=1
				if(this.type=='GROUP'){//群组
					this.fondLast(this.mark,this.page,'GROUP')	
				}else{
					this.fondLast(this.mark,this.page,'D')
				}
			},
			// 打开键盘
			Inputfocus(e){
				// console.log(e)
				this.moreboolean=true
				// #ifdef H5
				if(this.lastestChat.length!=0){
					this.chatIndex = 'chatIndex'+this.lastestChat[this.lastestChat.length-1].id
				}
				// #endif
				// #ifndef H5 
				console.log(e.detail.height)
				if(e.detail.height){
					this.keyHeight=e.detail.height //键盘高度
				}
				setTimeout(()=>{//重新进行定位
					this.getheight()
				},200)
				// #endif
			},
			// 键盘收起
			Inputblur(){
				this.keyHeight=10
				setTimeout(()=>{//重新进行定位
					this.getheight()
				},200)
			},
			uploadImage(source,type){
				console.log(source)
				console.log(type)
				var that=this
				uni.chooseImage({
				    count: 3, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType:source,
					success(res) {
						console.log(res)
						const tempFilePaths = res.tempFilePaths;
						const tempFiles=res.tempFiles;
						tempFilePaths.forEach(item=>{
							uni.uploadFile({
								url:that.$uploadUrl+'/cosFile/uploadSingleOpenImage',
								method:'POST',
								filePath: item,
								formData: {
									'compression': String(true)  //formData是指除了图片以外，额外加的字段
							    },
								name: 'file',//注意是file还是files
								success: (res) => {
									var data=JSON.parse(res.data)
									console.log(data);
									if(data.code==0){
										that.pictureid=data.object
										console.log(that.pictureid)
										var msg={
											chatId:that.chatId,
											sendUserType:'D',
											sendUserId:that.userId,
											receiveUserType:type,
											receiveUserId:that.otherid,
											msgType:'2',
											msgContent:String(that.pictureid)
										}
										console.log(msg)
										that.$store.dispatch('socket/WEBSOCKET_SEND',JSON.stringify(msg))
									}else{
										uni.showToast({
											title:data.msg,
											icon:'none'
										})
									}
								},
								fail:(err)=>{
									console.log(err)
								}
							})
						})
				    },
					fail(err) {
						console.log(err)
					}
				});
			},
			// 发送文字，图片,文件,手术方法
			sendItem(index){
				if(!this.$store.state.socket.is_open_socket){
					uni.showToast({
						// #ifndef MP-WEIXIN
						title:'连接已断，请重新启动App',
						icon:'none',
						// #endif
						// #ifdef MP-WEIXIN
						title:'连接已断，请重新进入小程序',
						icon:'none'
						// #endif
					})
					return;
				}
				if(this.type=='GROUP'){//群组消息
					var type='GROUP'
				}else{
					var type='D'
				}
				if(index==0){//发送文本
					if(!this.InputContent){
						uni.showToast({
							title:'内容不能为空',
							icon:'none'
						})
						return;
					}
					var reg = /[^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n]/g;
					if(this.InputContent.match(reg)) {
						uni.showToast({
							title:'不能发送表情',
							icon:'none'
						})
						return;
					}
					var msg={
						chatId:this.chatId,
						sendUserType:'D',
						sendUserId:this.userId,
						receiveUserType:type,
						receiveUserId:this.otherid,
						msgType:'1',
						msgContent:this.InputContent
					}
					console.log(msg)
					this.$store.dispatch('socket/WEBSOCKET_SEND',JSON.stringify(msg))
				}else if(index==1){ //相册
					var source=['album']
					this.uploadImage(source,type)
				}else if(index==2){//拍摄
					var source=['camera']
					this.uploadImage(source,type)
				}else if(index==3){//文件
					console.log('文件')
					/**
					 * currentWebview: 当前webview
					 * url：上传接口地址
					 * name：附件key,服务端根据key值获取文件流，默认file,上传文件的key
					 * header: 上传接口请求头
					 */
					this.$refs.lFile.upload({
						// #ifdef APP-PLUS
						// nvue页面使用时请查阅nvue获取当前webview的api，当前示例为vue窗口
						currentWebview: this.$scope.$getAppWebview(),
						// #endif
						url: this.$uploadUrl+'/cosFile/uploadSingleChatFile',
						// name: 'myFile',
						// header: {'Authorization':'token'},
						// 其他业务参数直接写key,value,如：
						// key1: 'value1',
						// key2: 'value2',
					});
				}else if(index==4){//手术方法库
					console.log(this.surgical)
					if(this.surgical.length!=0){
						this.$refs.Sonshow.open()
					}else{
						this.getSurgical(0,1)
					}
					setTimeout(()=>{
						this.pageToBottom();
					},300)
				}else{//病例
					if(this.caseList.length!=0){
						this.$refs.caseshow.open()
					}else{
						this.getCase(0,1)
					}
					setTimeout(()=>{
						this.pageToBottom();
					},300)
				}
			},
			// 手术方法库详情
			enterDetail(item){
				console.log(item)
				var id=JSON.parse(item.content).surgicalPlanId
				uni.navigateTo({
					url:'/pages/surgicalData/surgicalDetail?id='+id
				})
			},
			// 文件详情
			openFile(data){
				var url=JSON.parse(data.content).fileDownloadUrl
				console.log(url)
				uni.showLoading({
					title:'打开中',
					icon:'none'
				})
				uni.downloadFile({
					url:url,
					success(res){
						console.log(res)
						// alert(res.statusCode)
						if (res.statusCode === 200) {
							console.log('下载成功'+res.tempFilePath);
							uni.hideLoading()
								//打开文档查看
							uni.openDocument({
								filePath: res.tempFilePath,
								success: function(res) {
									console.log('打开文档成功');
								}
							});
						}else{
							uni.hideLoading()
							console.log('下载失败');
						}
					},
					fail(err){
						uni.hideLoading()
						console.log(err)
					}
				})
			},
			// 聊天中的病例详情
			CaseDetail(item){
				var id=JSON.parse(item.content).caseHistoryId
				uni.navigateTo({
					url:'/pages/caselist/caselistdetail?id='+id,
					animationType:'pop-in'
				})
			},
			// 查询最新历史记录
			fondLast(mark,page,type){
				console.log(type)
				var that=this
				findchatLastest({
					sendUserType:'D',
					sendUserId:this.userId,
					receiveUserType:type,//目标类型
					receiveUserId:this.otherid, //目标用户(或者群组id)
					pageNum:page,
					pageSize:10,
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						if(res.data.object){
							this.total=res.data.object.pages//总页数
							if(mark==0){
								this.lastestChat=res.data.object.list.reverse()
							}else if(mark==1){
								this.lastestChat=this.lastestChat.reverse().concat(res.data.object.list).reverse()
							}
						}
					}else if(res.data.code==-1){//数据为空
						this.status='nomore'
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			// 查询相关病例
			caseData(caseid){
				getcasedetail({
					caseHistoryId:caseid
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						var data=res.data.object
						this.caselist=res.data.object
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			addcasePage(){
				this.mark=1
				this.getCase(this.mark,this.casePage)
			},
			// 方法库发送之后,要重新加载聊天记录
			refleshData(){
				setTimeout(()=>{ //滚动到底部
					this.pageToBottom();
				},300)
			},
			// 病例发送之后,要重新加载聊天记录
			caserefleshData(){
				setTimeout(()=>{ //滚动到底部
					this.pageToBottom();
				},300)
			},
			// 获取手术方法
			getSurgical(mark,surgicalPage){
				getSurgical({
					start:surgicalPage,
					length:6,
				}).then(res=>{
					// console.log(res)
					if(res.data.code==0){
						this.surgicalTotal=res.data.object.pages//总页数
						this.surgicalPage++//页数增加一页
						if(mark=='1'){//加载更多的操作
							this.surgical=this.surgical.concat(res.data.object.list) 
						}else{//初始化操作
							this.surgical=res.data.object.list
						}
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			getCase(mark,casePage){
				getCaselist({
					status:'ALL',
					identity:'ALL',
					type:'ALL',//现在默认全是all
					page:casePage,
					size:6,
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						this.caseTotal=res.data.object.pages//总页数
						this.casePage++//页数增加一页
						if(mark=='1'){//加载更多的操作
							this.caseList=this.caseList.concat(res.data.object.list) 
						}else{//初始化操作
							this.caseList=res.data.object.list
						}
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			// 更多功能
			moreplus(){
				this.moreboolean=!this.moreboolean
				setTimeout(()=>{ 
					this.getheight() //获取底部高度
				},100)
			},
		},
		// 导航栏右上角
		onNavigationBarButtonTap(e){
			console.log(e)
			console.log(this.type)
			if(this.type=='GROUP'){//进入群聊设置
				uni.navigateTo({
					url:'/pages/shoyiiChat/contactGroup?groupId='+this.otherid
				})
			}else{//进入私聊设置
				uni.navigateTo({
					url:'/pages/shoyiiChat/contactGroup?memberId='+this.otherid+'&navTitle='+this.navTitle
				})
			}
		},
		onLoad(options) {
			console.log(options)
			this.otherid=options.id	//群组或私聊id
			this.type=options.type
			this.chatId=options.chatId
			this.navTitle=options.otherName
			uni.setNavigationBarTitle({
				title:options.otherName
			})
			if(options.type=='GROUP'){//群组,这个是从聊天列表进来的
				// 查询相关病例
				if(options.caseId!='undefined'){
					this.caseid=options.caseId
					this.caseData(options.caseId)
				}
				this.fondLast(0,1,'GROUP')
			}else if(options.type=='D'){//私聊
				// 查询最新聊天记录
				this.fondLast(0,1,'D')
			}else{
				// 查询最新聊天记录
				this.fondLast(0,1,'MGR')
			}
			// 获取手术方法库
			this.getSurgical(0,1)
			// 获取病例数据
			this.getCase(0,1)
		},
		onReady() {
			this.amendNavigator()
		}
	}
</script>

<style scoped lang="scss">
		.displaynone{
			display: none;
		}
		.cordimages {
			width: 300rpx;
			height: 300rpx;
			display: flex;
			align-items: flex-start;
			.chatimage{
				width: 300rpx;
				height: 300rpx;
				&.u-image__image{
					width: 300rpx!important;
					height: 300rpx!important;
				}
			}
		}
		/* #ifndef APP-NVUE */
		.image ::v-deep uni-image{
			width: 80rpx!important;
			height: 80rpx!important;
		}
		/* #endif */
		page{
			width: 100%;
			height: 100%;
		}
		.wechatItem{
			width: 100%;
			/* #ifdef H5 */
			height:100%;
			/* #endif */
			/* #ifndef H5 */
			height: 100vh;
			/* #endif */
			display: flex;
			flex-direction: column;
			.slot-wrap{
				width: 100%;padding: 0 30rpx;
				display: flex;align-items: center;justify-content: space-between;
				.title{
					font-size: 28rpx;
					font-weight: 500;
				}
			}
			/* #ifndef APP-NVUE */
			.navbar ::v-deep .u-line-1{
				display: none!important;
			}
			/* #endif */
		}
		.header{
			padding: 0 30rpx;
			height: auto;
			margin-top: 20rpx;
			/* #ifdef MP-WEIXIN */
			background-color: #FFFFFF;
			/* #endif */
			.headerRow{
				background-color: #FFFFFF;
				.caseimage{
					border: 1px solid #F8F8F8;
					display: flex;
					justify-content: center;
					.u-image{
						text-align: center;
						max-height: 140rpx;
					}
				}
				.case {
					height: 140rpx;
					border-radius: 8rpx;
					display: flex;
					align-items: flex-start;
					flex-direction: column;
					justify-content: space-around;
					color: #333333;
					font-family: PingFang-SC-Regular;
					font-size: 24rpx;
					font-weight: 400;
					.content{
						text-overflow: ellipsis;
						width: 100%;
						white-space: nowrap;
						overflow: hidden;
						.item{
							white-space: nowrap;
						}
					}
				}
			}
		}
		.section{
			margin-top: 10px;
			flex: 1;
			overflow: auto;
			height: 100%;
			.section-item{
				padding: 0 30rpx;
				display: flex;
				flex-direction: column;
				.time{
					display: flex;justify-content: center;
					padding: 20rpx 0;
					color: #606266;
				}
				.chatlist{
					padding: 20rpx 10rpx;
					border-radius: 10rpx;
					display: flex;
					align-items: flex-start;
				}
				.alluser{
					display: flex;
					flex-direction: row-reverse;
				}
				.allother{
					display: flex;
					flex-direction: row;
				}
				.userCord{
					margin-right: 18px;
					.TextuserCord{
						border-radius: 20rpx;
						padding: 20rpx;
						background-color: #7DCCEC;
						word-wrap:break-word;
						word-break: break-all;
						position: relative;
						&::before,&::after{
						    position: absolute;
						    content: " ";
						    top: 13px;
						    right: -15px;
						    display: block;
						    width: 0;
						    height: 0;
						    border: 8px solid #7DCCEC;
						    border-color: transparent transparent transparent #7DCCEC;
						    z-index: 111;
						}
						&::after{
						    right: -15px;
						    border-color: transparent transparent transparent #7DCCEC;
						    z-index: 11;
						}
					}
				}
				.otherCord{
					margin-left: 18px;
					.TextotherCord{
						border-radius: 20rpx;
						padding: 20rpx;
						background-color: #FFFFFF;
						word-wrap:break-word;
						word-break: break-all;
						position: relative;
						&::before,&::after{
						    position: absolute;
						    content: " ";
						    top: 13px;
						    left: -15px;
						    display: block;
						    width: 0;
						    height: 0;
						    border: 8px solid #7DCCEC;
						    border-color: transparent #fff transparent transparent;
						    z-index: 111;
						}
						&::after{
						    left: -15px;
						    border-color: transparent #FFFFFF transparent transparent;
						    z-index: 11;
						}
					}
				}
			}
			.surgicalCode{
				width: 440rpx;
				padding: 20rpx 20rpx 0;
				background-color: #FFFFFF;border-radius: 10rpx;
				.s_header{
					color: #000000;font-size: 30rpx;font-weight: bold;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
					word-wrap: break-word;
					word-break: break-all;
				}
				.s_section{
					display: flex;justify-content: space-between;align-items: center;
					padding: 20rpx 0;color: #999999;font-size: 26rpx;
					.content{
						flex: 1;padding-right: 20rpx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 3;
						overflow: hidden;
						word-wrap: break-word;
						word-break: break-all;
					}
					.image{
						width: 100rpx;height: 100rpx;
					}
				}
				.s_footer{
					display: flex;align-items: center;padding: 10rpx 0;font-size: 24rpx;
					border-top: 1px solid #F8F8F8;color: #999;
					.image{
						width: 20rpx;height: 20rpx;padding-right:10rpx ;
					}
					.name{
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;
						overflow: hidden;
						word-wrap: break-word;
						word-break: break-all;
					}
				}
			}
			.cordfile {
				width: 440rpx;
				padding: 30rpx;background-color: #FFFFFF;display: flex;justify-content: space-between;
				.title{
					flex: 1;flex-wrap: wrap;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 3;
					overflow: hidden;
					word-wrap: break-word;
					word-break: break-all;
				}
			}
			.empty{
				height: var(--status-bar-height);
				width: 100%;
			}
		}
		.footer{
			position: fixed;
			bottom: 0;
			width: 100%;
			background-color: #fff;
			z-index: 150;
			.inputItem{
				padding: 20rpx 30rpx;display: flex;align-items: center;justify-content: space-between;
				.input{
					padding: 26rpx 0;
					background-color: #F8F8F8;
					border-radius:10rpx;
					font-size: 30rpx;
					/* #ifdef MP-WEIXIN */
					height: 40rpx;
					/* #endif */
				}
				.sendBtn{
					width: 120rpx;
					height: 60rpx;
					margin-left: 20rpx;
					background-color: #7DCCEC;
					color: #FFFFFF;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
			.moreFunction{
				padding: 40rpx 40rpx;
				background-color: #F8F8F8;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				.item{
					width: 25%;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: center;
					box-sizing: border-box;
					margin: 20rpx 0;
					.iconfont{
						font-size: 48rpx;
					}
					.icon{
						background-color: #FFFFFF;
						width: 70rpx;
						height: 70rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						color: #000000;
						border-radius: 20rpx;
						margin-bottom: 10rpx;
					}
					.tip{
						font-size: 24rpx;
						color: #666;
					}
				}
			}
		}
</style>
