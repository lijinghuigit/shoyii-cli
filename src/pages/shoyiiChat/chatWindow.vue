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
		<!-- <button @click="close">关闭</button> -->
		<!-- 病例，只有病例群组里才有 -->
		<case-infor :caselist="caseInfor" :caseid="caseid" :caseshow="caseShow" />
		<view class="" style="flex: 1;overflow: auto;height: 100%;" @click.stop="closeMore">
			<scroll-view class="section" scroll-y="true"
			@scrolltolower='toupper' :scroll-top='scrollTop' @scroll="scroll">
				<view class="section-item">
					<!-- lastestChat.length-index -->
					<view v-for="(item,index) in lastestChat" :key='item.id' class="list_item"> 
						<!-- <text class="time" v-if="lastestChat.length  > index+1?lastestChat[index+1].sendTime < (item.sendTime - 300000) : true">{{relativtime(item.sendTime)}}</text> -->
						<!-- 每一项的比较都不会比较index==0这一项，除非index=0时，会跟自身比较下；而且index==length-1这一项还不做遍历-->
						<text class="time" v-if="index < lastestChat.length-1 && (item.sendTime -  lastestChat[index + 1].sendTime) > 300000">{{relativtime(item.sendTime)}}</text>
						<!-- <text class="time" v-if="index-1 >= 0 ? lastestChat[index-1].sendTime < item.sendTime - 300000 : true">{{relativtime(item.sendTime)}}</text> -->
						<view class="chatlist" :class="item.userId==userId?'alluser':'allother'">
							<image class='image' lazy-load	mode='aspectFit'
							:src="item.userProfile?item.userProfile:'/static/image/person.png'"></image>
							<view class="chatlist_box">
								<!-- 群组且非自身 -->
								<text class="item" v-if="type=='GROUP'&&item.userId!=userId">
									{{item.userName}}
								</text>
								<view style="color: #000000;max-width: 500rpx;"
								 :class="item.userId==userId?'userCord':'otherCord'">
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
									<view class="surgicalCode" v-if="item.msgType=='5'" @click="CaseDetail(item)">
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
									<!-- 语音 -->
									<template v-if="item.msgType == '6'">
										<div class="audio_box" :class="item.userId==userId?'TextuserCord':'TextotherCord'"
										style="display: flex;align-items: center;" @click="playAudio(item,index)">
											<text class="content_box" style="text-align: left;">
												{{JSON.parse(item.content).time}}''
											</text>
											<!-- :style="{transform:item.userId==userId?'rotate(180deg)':''}" -->
											<uni-icons class='audio_img' custom-prefix="iconfont" :type="payAudioIndex==index?'iconshengyin':'iconshengyin1'" size="24" color="#000"
											style="margin-left: 5rpx;margin-right: 5rpx;transform:rotate(180deg)"
											></uni-icons>
										</div>
									</template> 
								</view>
							</view> 
						</view> 
					</view>
				</view>
				<u-loadmore :status="status" :is-dot='true' :load-text="loadText" class='loadtext'/>
			</scroll-view>
		</view>
		<l-file ref="lFile" @up-success="onSuccess"></l-file>
		<view class="footer sy_block">
			<!-- #ifdef APP-PLUS -->
			<view class="inputItem">
			<!-- #endif -->
			<!-- #ifndef APP-PLUS -->
			<view class="inputItem" :style="{marginBottom:keyHeight+'px'}">
			<!-- #endif -->
				<!-- #ifdef APP-PLUS-->
				<!-- <view class="record" style="padding-right: 20rpx;"  @click="startRecord">
					<u-icon color="#999" size="70" name="mic"></u-icon>
				</view> -->
				<uni-icons @click="clickVoice" class='voiceIcon sy_content' custom-prefix="iconfont" :type="isVoice?'iconjianpan1':'iconyuyin'" 
				size="32" color="#999"></uni-icons>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<textarea :adjust-position='false' :auto-blur='true' @focus='Inputfocus' @blur="Inputblur"
				cursor-spacing='10' :hold-keyboard='true' :show-confirm-bar='false'  @linechange="texTlinechange"
				maxlength='250' class="input" :auto-height="lineCount>=5?false:true" v-model="InputContent"></textarea>
				<!-- #endif -->
				<!-- #ifndef MP-WEIXIN -->
				<template v-if="isVoice">
					<view class="voice_box" @touchstart="touchstartVoice" @touchmove.stop.prevent="touchmoveVoice"
					:style="{background:voiceFlg?'#f8f8f8':'#fff'}"
					@touchcancel.stop="touchcancelVoice" @touchend="touchendVoice">
						<text class="voice_text">
							{{voiceText}}
						</text>
					</view>
				</template>
				<template v-else>
					<textarea :adjust-position='false' :auto-blur='true' @focus='Inputfocus' @blur="Inputblur"
					@linechange="texTlinechange" :style="{color:themeType=='dark'?'#000':''}"
					cursor-spacing='10' :hold-keyboard='true' :show-confirm-bar='false' :focus='focus'
					maxlength='250' class="input" :auto-height="lineCount>=5?false:true" v-model="InputContent"></textarea>
				</template>
				<!-- #endif -->
				<uni-icons @click="moreplus(0)" custom-prefix="iconfont" type="iconxiaolianhaoping" size="32" class="emoj_img sy_content" color="#999"></uni-icons>
				<view v-if="sendBool" class='sendBtn' @touchend.prevent="sendItem(0)">
				 	<text>发送</text>  
				</view>
				<view v-else @click="moreplus(1)" class="emoj_img" >
					 <uni-icons custom-prefix="iconfont" type="iconplus-circle sy_content" size="32" color="#999"></uni-icons>
				</view>
			</view>
			<!-- #ifdef APP-PLUS -->
			<view :style="{height:keyboardHeightFlg ?(keyHeight - deviceBottom)+'px' : '0px'}">
			<!-- #endif -->
			<!-- #ifndef APP-PLUS -->
			<view :class="{displaynone:moreboolean}">
			<!-- #endif -->
				<view class="moreFunction sy_block">
					<!-- #ifdef APP-PLUS -->
					<swiper :current="currentFun" class="fun_swiper" disable-touch
					:style="{height:keyboardHeightFlg ? (keyHeight - deviceBottom)+'px' : '0px'}">
					<!-- #endif -->
					<!-- #ifndef APP-PLUS -->
					<swiper :current="currentFun" class="fun_swiper" disable-touch style="height:200px" >
					<!-- #endif -->
						<swiper-item>
							<emoji-box @setEmoj="setEmoj" :emojiList="emojiList"></emoji-box>							
						</swiper-item> 
						<swiper-item> 
							<more-function @sendItem='sendItem'></more-function>
						</swiper-item>
					</swiper> 
				</view>
			</view>
		</view>
		
		<!-- 方法库 -->
		<surgical-popup ref='Sonshow' :chatId='chatId' :type='type' @addPage='addPage' :page="surgicalPage" :total="surgicalTotal" :otherId='otherid' :surgical='surgical' @refleshData='refleshData'></surgical-popup>
		<!-- 病例 -->
		<case-popup ref='caseshow' :chatId='chatId' :type='type' @addcasePage='addcasePage' :page="casePage" :total="caseTotal" :otherId='otherid' :caseList='caseList' @caserefleshData='caserefleshData'></case-popup>
		<!-- 语音状态显示 -->
		<template v-if="voiceFlg">
			<view class="voice_bd">
				<div class="voice_box">
					<div class="voice_ui" :class="voiceStop?'cancel_ui':'normal_ui'">
						<uni-icons class='voice_icon' custom-prefix="iconfont" type="iconshengyin" size="50" color="#fff"></uni-icons>
						<text class="voice_ui_text">{{voiceTis}}</text>
						<view style="color: #ff9900;font-weight: bold;padding-top: 10rpx;" v-if="endTip">
							 <text style="font-size: 36rpx;">{{30-voiceLength.toFixed(0)}}</text>
							 <text>'' 后</text>
							 <text >{{endTip}}</text>
						</view>
					</div>
					<div class='round_ui' :class="voiceStop?'cancel_round_ui':'normal_round_ui'"></div>
					<div class="tip_text" v-if="!voiceStop">
						<text>松开 发送</text>
					</div>
				</div>
			</view>
		</template>
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
	import emoji from './common/emoji.js'
	import emojiBox from "./components/emoj.vue"
	import emojiTools from '@/utill/tools/emoji.js'
	import CaseInfor from './components/CaseInfor.vue'
	import MoreFunction from './components/MoreFunction.vue'
	// #ifdef APP-PLUS
	const recorderManager = uni.getRecorderManager();//录音
	import permission from '@/utill/tools/getpermission.js'
	// #endif
	const innerAudioContext = uni.createInnerAudioContext(); //音频
	export default{
		components:{
			CaseInfor,
			surgicalPopup,
			casePopup,
			emojiBox,
			MoreFunction
		},
		data(){
			return{
				endTip:'',
				clickEvent:'',
				payAudioIndex:null,
				voiceStop: false,
				voiceTimer: null,
				voiceLength: 0,
				voicePageY: 0,
				voiceFlg: false,
				voiceText: '按住 说话',
				voiceTis: "手指上滑 取消发送",
				isVoice:false,
				lineCount:1,//输入框的行高
				deviceBottom: 0,//获取底部安全区域高度 兼容苹果X 以上机型 
				focus:false,//textarea是否是聚焦状态
				keyboardHeightFlg:false,//键盘是否是聚焦状态
				currentFun:1,//swiper的表情或功能，默认是功能
				emojiList:emoji,//表情包
				old: {
					scrollTop: 0
				},
				scrollTop:0,
				status:'nomore',
				loadText: {
					loadmore: '轻轻下拉',
					loading: '',
					nomore: '没有更多' //默认是圆点
				},
				otherid:null,//其他人id
				InputContent:'',//输入的内容
				lastestChat:[],
				//手术方法库数据
				surgical:[],
				page:1,
				total:1,//聊天记录总页数
				surgicalPage:1,
				surgicalTotal:1,
				mark:0,
				type:null,
				// 顶部病例信息
				caseInfor:{},
				caseid:'',
				caseShow:true,
				// 发送的病例列表
				caseList:[],
				casePage:1,
				caseTotal:1,
				chatIndex:'',
				chatId:'',//每一条记录的id
				pictureid:'',
				fileId:'',//上传文件的id
				navTitle:'',
				background:{
					background:'#f8f8f8'
				},
				moreboolean:true,
				keyHeight:0,
				sendBool:false,//是否显示发送按钮
				permissionBool:''
			}
		},
		watch:{
			'socketData': {
				handler:function(val,oldVal) {
					console.log('watch聊天时监听')
					console.log(val)
					if(val=='head'){//心跳回复
						 
					}else if(val.friend_request){//请求的通知 JSON.parse(val).friend_request
						console.log(val.friend_request)
					}else{ 
						if(val.chatMsgDetail.userId==this.userId){//用户自身的消息
							this.InputContent=''//输入框清空
						}
						var receiveData=val.chatMsgDetail
						if(this.chatId==receiveData.chatId){//除了用户自身的消息，才会unshift
							this.lastestChat.unshift(receiveData)
							console.log(this.lineCount)
							if(this.lineCount!==1){this.lineCount=1}//行高恢复
							// this.lastestChat=[receiveData,...this.lastestChat]
						}
						console.log(this.lastestChat)
					} 
				}, 
				deep: true 
			},  
			// 'lastestChat':{
			// 	// 监听的数据不做处理
			// 	handler(newValue,oldValue){
			// 		// this.pageToBottom();
			// 	},
			// 	deep:true
			// },
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
			"voiceLength":function(val){
				// console.log(val,val.toFixed(0),this.voiceStop)
				if(val.toFixed(0)>20&&val.toFixed(0)<30){//20-30，提示录音即将结束
					// console.log(val.toFixed(0))
					this.endTip = "录音即将发送"
				}else if(val.toFixed(0)==30){//30s，停止录音
					this.endTip='录音结束'
					clearInterval(this.voiceTimer);
					this.voiceTimer = null
					this.voiceStop=false//正常发送
					recorderManager.stop(); //录音结束
					this.voiceFlg=false// 
				}else{
					this.endTip=''
				}
			}
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
			// 录音监听
			onRecorderManager() {
				//录音开始
				recorderManager.onStart((e) => {
					console.log('录音开始')
				})
				// 录音报错
				recorderManager.onError((e) => {
					console.log(e)
					console.log('录音报错')
				})
				//录音结束
				recorderManager.onStop((e)=>{
					console.log('录音结束')
					console.log(this.voiceStop)
					if (this.voiceStop) {
						uni.showToast({
							icon: "none",
							title: "取消发送"
						})
						//取消发送后，计时为0，voiceStop为false
						this.voiceLength = 0
						this.voiceStop=false
					} else {  
						console.log('发送的判断',this.voiceLength)
						if (this.voiceLength < 1) {//多次可能会导致程序退出
							uni.showToast({
								icon: "none",
								title: "发送时间过短"
							})
							return
						} else {
							// console.log('发送语音')
							// this.$nextTick(() => {
							// 	this.voiceLength = 0
							// 	this.voiceStop=false
							// })
							// return
							var type= this.type=='GROUP'?'GROUP':'D'
							console.log(e,e.tempFilePath,this.voiceLength)
							uni.uploadFile({
								url:this.$uploadUrl+'/cosFile/uploadSingleChatFile',
								method:'POST',
								filePath: e.tempFilePath,
								name: 'file',//注意是file还是files
								success: (res) => {
									var data=JSON.parse(res.data)
									console.log(this.voiceLength)
									console.log(data);
									if(data.code==0){
										console.log('id',data.object)
										var msg={
											chatId:this.chatId,
											sendUserType:'D',
											sendUserId:this.userId,
											receiveUserType:type,
											receiveUserId:this.otherid,
											msgType:'6',
											msgContent:{
												file:String(data.object),
												time:this.voiceLength.toFixed(0)
											}
										}
										console.log(msg)
										console.log(this.voiceLength)
										this.$store.dispatch('socket/WEBSOCKET_SEND',JSON.stringify(msg))
										this.$nextTick(() => {
											this.voiceLength = 0
											this.voiceStop=false
										})
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
						}
					}
				})
			},
			playAudio(data,index){
				console.log('语音')
				console.log(index,data)
				var url=JSON.parse(data.content).file
				console.log(url)
				if (this.payAudioIndex == index) {
					innerAudioContext.src = '';
					this.$nextTick(function() {
						innerAudioContext.stop();
						this.payAudioIndex = null
					});
				} else {
					this.payAudioIndex = index
					innerAudioContext.src = url
					this.$nextTick(function() {
						innerAudioContext.play();
					});
				}
			},
			// 按下触发
			async touchstartVoice(e) {
				this.permissionBool=await permission.getpermission('android.permission.RECORD_AUDIO')
				console.log('111',this.permissionBool)
				if(this.permissionBool==-1){//麦克风权限被禁用
					uni.showModal({
						title: '权限申请',
						content: '在设置-应用-树蚁医疗-权限中开启麦克风权限，以正常使用语音功能',
						confirmText:'去设置',
						success: function (res) {
							if (res.confirm) {
								permission.opensetting()
							} else if (res.cancel) {
								 uni.showToast({
								 	title:'取消',
									icon:'none'
								 })
							} 
						}
					})
					return
				}else if(this.permissionBool==0){//还未获取授权
					uni.showToast({
						title:'麦克风还未授权',
						icon:'none'
					})
					return
				}else if(this.permissionBool==1){//已授权
					this.pageToBottom()
					uni.vibrateShort({
						complete: function () {
							console.log('complete');
						}
					})
					this.voiceStop=false
					this.voicePageY = (e.changedTouches[0].pageY).toFixed(2)
					this.voiceText = '松开 结束'
					this.voiceFlg = true
					recorderManager.start({
						format: "mp3"
					}); //录音开始,
					this.voiceTimer = setInterval(() => {
						this.voiceLength += 0.1
						// console.log(this.voiceLength,this.voiceLength.toFixed(0))
					}, 100)
					// console.log('touchstartVoice', this.voicePageY)
				}else{
					console.log('权限未获取')
					return
				}
			},
			// 滑动触发
			touchmoveVoice(e) {
				// console.log('222',e)
				if(this.permissionBool==1){//麦克风权限可使用
					let numTemp = this.voicePageY - ((e.changedTouches[0].pageY).toFixed(2))
					// console.log('触发',numTemp)
					if (numTemp >= 60) {
						// console.log('松开手指')
						this.voiceStop = true
						this.voiceTis = "松开手指 取消发送"
					} else {//这块注意的是：如果第一次取消发送（this.voiceStop = true），下一次发送语音可能不会触发该事件，导致voiceStop一直为true
						// console.log('手指上滑 取消发送')
						this.voiceStop = false
						this.voiceTis = "手指上滑 取消发送"
					}
					// 左右滑动
					// let numTemp = this.voicePageY - ((e.changedTouches[0].pageX).toFixed(2))
					// console.log(numTemp)
					// if (numTemp > 0) {//向左
					// 	console.log('松开手指')
					// 	this.voiceStop = true
					// 	this.voiceTis = "向左滑动"
					// } else {//向右
					// 	console.log('手指上滑 取消发送')
					// 	this.voiceStop = false
					// 	this.voiceTis = "向右滑动"
					// }
					// console.log(this.voiceStop)
				}
			},  
			// 松开触发
			touchendVoice() { 
				// console.log('333')
				if(this.permissionBool==1){//麦克风权限可使用
					this.voiceFlg = false
					this.voiceText = '按住 说话'
					this.voiceTis = "手指上滑 取消发送"
					// console.log('touchendVoice')
					// console.log(this.voiceStop)
					clearInterval(this.voiceTimer);
					this.voiceTimer = null
					// console.log(recorderManager)
					recorderManager.stop(); //录音结束
				}
			},
			// 打断触发 
			touchcancelVoice() {
				console.log('444')
				if(this.permissionBool==1){
					clearInterval(this.voiceTimer);
					this.voiceTimer = null 
					this.voiceFlg = false
					this.voiceText = '按住 说话'
					this.voiceTis = "手指上滑 取消发送"
					console.log('touchcancelVoice')
					// recorderManager.stop(); //录音结束
				}
			},  
			async clickVoice(){
				if(this.focus){//聚焦状态
					console.log('正在打字')
					this.focus=false
					this.keyboardHeightFlg = false//关闭抽屉
					this.$nextTick(() => {
						setTimeout(() => {
							console.log('打开语音')
							this.isVoice = true
						}, 60)
					})
				}else{
					console.log('没有焦点')
					if (this.keyboardHeightFlg) {
						console.log('抽屉打开中')
						this.keyboardHeightFlg = false
						this.$nextTick(() => {
							console.log('打开语音')
							this.isVoice = true
						})
					}else{
						if (this.isVoice) {
							console.log('切换到打字')
							this.isVoice = false
							this.$nextTick(() => {
								setTimeout(() => {
									console.log('弹出键盘')
									this.focus=true
								}, 60)
							})
						} else {
							this.isVoice = true
							console.log('打开语音')
						}
					}
				}
				if(this.isVoice){//打开语音，开启权限
					if(this.permissionBool!==1){//权限未开启时，开启权限
						this.permissionBool=await permission.getpermission('android.permission.RECORD_AUDIO')
						console.log(this.permissionBool)
					}
				}
			},
			// 获取输入框行高
			texTlinechange(e) {
				console.log(e.detail.lineCount)
				// 获取行高
				this.lineCount = e.detail.lineCount
			},
			// 文本过滤表情
			filterText(text){
				// 如果是base64，则转为表情
				var reg = /\&#.*?;/g;
				if(text.match(reg)) {
					// console.log(emojiTools.uncodeUtf16(text))
					text=emojiTools.uncodeUtf16(text)
					return text
				}
				// 不是base64，直接return
				return text
			},
			// 更多功能
			moreplus(i){
				console.log(i,this.currentFun,this.keyboardHeightFlg,this.focus)
				this.clickEvent='event'
				if(this.focus){//有焦点的话，只让失去焦点，不隐藏功能栏
					this.focus=false
					this.currentFun = i
				}else{//无焦点
					if (i !== this.currentFun) {//不是当前功能icon，进行切换
						this.currentFun = i
						this.moreboolean=false
						// 没有焦点 点击切换功能栏 的显示和隐藏
						this.keyboardHeightFlg = true //
					}else{//是当前功能icon，进行功能栏的隐藏或展示
						this.moreboolean=!this.moreboolean
						// 没有焦点 点击切换功能栏 的显示和隐藏
						this.keyboardHeightFlg = !this.keyboardHeightFlg
					}
				}
				
				console.log(this.keyHeight,this.keyboardHeightFlg,this.focus)
				// #ifdef APP-PLUS
				// 如果键盘无高度，则赋值为固定值
				if(!this.keyHeight||this.keyHeight ==0){
					this.keyHeight = 220
				}
				// #endif
				// #ifdef MP-WEIXIN
				uni.hideKeyboard()//隐藏键盘
				// #endif
				this.$nextTick(() => {
					if (this.keyboardHeightFlg) {
						this.isVoice = false
					}
					this.pageToBottom()
				})
			},
			setEmoj(item, index){
				console.log(item, index)
				this.InputContent += item
			},
			closeMore(){
				// #ifndef APP-PLUS
				this.moreboolean=true
				// #endif
				// #ifdef APP-PLUS
				this.keyboardHeightFlg=false
				this.focus=false
				// #endif
			}, 
			// close(){
			// 	this.voiceFlg=!this.voiceFlg
			// // // 	// this.$store.commit('socket/SOCKET_CLOSE')
			// // 	uni.removeStorageSync('keyboardHeight')
			// // // 	// uni.onKeyboardHeightChange(res => {
			// // // 	// 	console.log(res.height)
			// // // 	// })
			// },
			scroll(e) {
				// console.log(e.detail.scrollTop)
				if(this.caseid){//针对群组中的病例
					if(e.detail.scrollTop>100){//不展示
						this.caseShow=false
					}else{//展示
						this.caseShow=true
					}
				}
				this.old.scrollTop = e.detail.scrollTop
			},
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
			async getheight(){
				let iosObj = plus.navigator.getSafeAreaInsets()
				// 获取底部安全区域高度 兼容苹果X 以上机型 
				this.deviceBottom = iosObj.deviceBottom || 0
				console.log(this.deviceBottom)
				let keyHeight = uni.getStorageSync('keyboardHeight')
				let keyFlg = (!keyHeight || keyHeight == 0)
				this.keyHeight = keyHeight
				// console.log(this.keyHeight)
				// console.log(keyFlg)
				if (keyFlg) {//键盘高度不存在，弹起键盘重新获取
					// 主动弹出键盘 获取 键盘高度
					await this.$nextTick(() => {
						setTimeout(() => {
							this.focus=true
						}, 60)
					})
				}
				await this.$nextTick(() => {
					console.log('监听键盘高度')
					// 键盘弹起，才会监听高度
					uni.onKeyboardHeightChange(res => {
						// console.log(res.height,keyHeight)
						if (res.height !== 0) {
							if (keyHeight < res.height) {//如果缓存的高度小于获取的键盘高度，以获取的最新为准
								console.log('缓存的高度小于实际高度')
								uni.setStorageSync('keyboardHeight', res.height)
								this.keyHeight = res.height
								console.log(this.keyHeight)
								this.$nextTick(() => {
									keyFlg = false
								})  
							}else if(keyHeight > res.height){// 缓存的高度大于实际的键盘高度，以实际的为准，实际的不能为0
								console.log('缓存的高度大于实际高度')
								uni.setStorageSync('keyboardHeight', res.height)
								this.keyHeight = res.height
								console.log(this.keyHeight)
								this.$nextTick(() => {
									keyFlg = false
								})  
							}
							this.$nextTick(() => {
								console.log('弹起键盘')
								this.focus=true
							})
						} 
					})
				})
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
					urls:arr.reverse(),
					success(e){
						console.log(e)
					},
					fail(err){
						console.log(err)
					}
				})
			},
			pageToBottom(){
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
				});
				// this.chatIndex=''
				// let lastIndex = this.lastestChat.length-(this.page-1)*10 - 1
				// console.log(lastIndex)
				// if(lastIndex < 0) return;
				// this.$nextTick(function(){
				// 	this.chatIndex = 'chatIndex'+this.lastestChat[lastIndex].id
				// 	console.log(this.chatIndex)
				// })
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
				// #ifdef APP-PLUS
				this.keyboardHeightFlg=true//键盘状态聚焦
				this.focus=true
				this.pageToBottom()
				this.currentFun=''//进行清空，避免icon=》input=》icon时，currentFun还是原来的值，再次点击icon时，直接隐藏掉
				// #endif
				// #ifdef H5
				this.moreboolean=true
				if(this.lastestChat.length!=0){
					// this.chatIndex = 'chatIndex'+this.lastestChat[this.lastestChat.length-1].id
					this.scrollTop=0
				}
				// #endif
				// #ifdef MP-WEIXIN
				this.moreboolean=true
				uni.onKeyboardHeightChange(res => {
				   this.keyHeight=res.height
				   this.pageToBottom()
				})
				// #endif
			},
			// 键盘收起
			Inputblur(){
				// #ifdef MP-WEIXIN
				this.keyHeight=0
				// #endif
				if(this.clickEvent !== ''){
					// 点击 功能键 不触发 功能栏的收起
				}else{
					this.keyboardHeightFlg=false//输入框状态为false，
				}
				this.$nextTick(() => {
					this.focus=false
					this.clickEvent = ''
				})
				this.pageToBottom()
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
			async sendItem(index){
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
					// var reg = /[^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n]/g;
					// if(this.InputContent.match(reg)) {
					// 	// 将表情转为base64
					// 	this.InputContent=emojiTools.utf16toEntities(this.InputContent)
					// }
					console.log(this.InputContent)
					var msg={
						chatId:this.chatId,
						sendUserType:'D',
						sendUserId:this.userId,
						receiveUserType:type,
						receiveUserId:this.otherid,
						msgType:'1',
						msgContent:this.InputContent
					}
					// console.log(msg)
					// this.InputContent=''//输入框清空
					this.$store.dispatch('socket/WEBSOCKET_SEND',JSON.stringify(msg))
				}else if(index==1){ //相册
					var source=['album']
					this.uploadImage(source,type)
				}else if(index==2){//拍摄
					// #ifndef H5
					let cameraBool=await permission.getpermission('android.permission.CAMERA')
					console.log('拍摄',cameraBool)
					if(cameraBool!==1){
						uni.showModal({
							title: '权限申请',
							content: '在设置-应用-树蚁医疗-权限中开启相机权限，以正常使用拍摄功能',
							confirmText:'去设置',
							success: function (res) {
								if (res.confirm) {
									permission.opensetting()
								}
							}
						})
						return
					}
					// #endif
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
						this.$refs.Sonshow.open()
					}
					this.pageToBottom();
				}else{//病例
					if(this.caseList.length!=0){
						this.$refs.caseshow.open()
					}else{
						this.getCase(0,1)
						this.$refs.caseshow.open()
					}
					this.pageToBottom();
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
				console.log('文件')
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
							// if(mark==0){
							// 	this.lastestChat=res.data.object.list.reverse()
							// }else if(mark==1){
							// 	this.lastestChat=this.lastestChat.reverse().concat(res.data.object.list).reverse()
							// }
							this.lastestChat=[...this.lastestChat,...res.data.object.list]
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
						this.caseInfor=res.data.object
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
			// 方法库发送之后,要下拉到底部
			refleshData(){
				this.pageToBottom();
			},
			// 病例发送之后,要下拉到底部
			caserefleshData(){
				this.pageToBottom();
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
			// #ifdef APP-PLUS
			this.getheight()
			this.onRecorderManager()
			// #endif
			//语音播放结束,恢复数据
			innerAudioContext.onEnded((res) => {
				console.log('播放结束')
				console.log(res)
				this.payAudioIndex = null
			});
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
			// var unwatch =this.$watch('socketData', function(val,oldVal) {
			// 		uni.showToast({
			// 			title:'val'
			// 		})  
			// 		console.log('watch聊天时监听')
			// 		// console.log(val)
			// 		if(val=='head'){//心跳回复
						 
			// 		}else if(val.friend_request){//请求的通知 JSON.parse(val).friend_request
			// 			console.log(val.friend_request)
			// 		}else{ 
			// 			this.InputContent=''
			// 			// var receiveData=JSON.parse(val).chatMsgDetail
			// 			var receiveData=val.chatMsgDetail
			// 			if(this.chatId==receiveData.chatId){
			// 				this.lastestChat.unshift(receiveData)
			// 			} 
			// 			console.log(this.lastestChat)
			// 			// this.pageToBottom();
			// 		}  
			// 	},{       
			//   deep: true 
			// }) 
		},
		onReady() {
			this.amendNavigator()
			this.pageToBottom()
		},
		onUnload() {
			console.log('onUnload')
			// unwatch()
			// 取消监听键盘高度
			// #ifndef H5
			uni.offKeyboardHeightChange(res => {
			  console.log('取消监听',res)
			})
			// #endif
			// 停止语音播放
			innerAudioContext.stop()
			this.payAudioIndex = null
		},
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
					will-change: transform;
				}
			}
		}
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
		.section{
			margin-top: 10px;
			height: 100%;
			// 旋转180
			direction: ltr;
			transform: rotate(180deg);
			-ms-transform: rotate(180deg);
			-moz-transform: rotate(180deg);
			-webkit-transform: rotate(180deg);
			-o-transform:rotate(180deg);
			// 
			.section-item{
				// 
				display: flex;  
				flex-direction: column;
				justify-content: flex-end;
				min-height: 100%;
				//    
				padding:90rpx 30rpx 0;
				.list_item{ 
					//旋转180
					direction: ltr;transform:rotate(180deg);-ms-transform:rotate(180deg);
					-moz-transform:rotate(180deg);-webkit-transform:rotate(180deg);-o-transform:rotate(180deg);
					// 
				}
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
					.image{
						border: 1px solid #F8F8F8;width:80rpx;height: 80rpx;
					}
					.chatlist_box{
						display: flex;flex-direction: column;justify-content: flex-start;align-items: flex-start;
							.item{
								margin-left: 36rpx;max-width: 400rpx;
								text-overflow: ellipsis;overflow: hidden;
								font-size: 20rpx;color: #8f8f8f;white-space: nowrap;
							}
					}
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
					margin-right: 36rpx;
					.TextuserCord{
						border-radius: 10rpx;
						padding: 20rpx;
						background-color: #7DCCEC;
						word-wrap:break-word;
						word-break: break-all;
						position: relative;
						&::before,&::after{
						    position: absolute;
						    content: " ";
						    top: 11px;
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
					margin-left: 36rpx;
					.TextotherCord{
						border-radius: 10rpx;
						padding: 20rpx;
						background-color: #FFFFFF;
						word-wrap:break-word;
						word-break: break-all;
						position: relative;
						&::before,&::after{
						    position: absolute;
						    content: " ";
						    top: 11px;
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
		.loadtext{
			//
			direction: ltr;
			transform: rotate(180deg);
			-ms-transform: rotate(180deg);
			-moz-transform: rotate(180deg);
			-webkit-transform: rotate(180deg);
			-o-transform:rotate(180deg);
			// 
		}
		.footer{
			width: 100%;
			background-color: #fff;
			.inputItem{
				padding: 20rpx 30rpx;display: flex;align-items: center;justify-content: space-between;
				.voiceIcon{ 
					margin:0 18rpx 0 10rpx;
				}
				.input{
					padding: 26rpx 0;
					background-color: #F8F8F8;
					border-radius:10rpx;
					font-size: 30rpx;
					/* #ifdef MP-WEIXIN */
					height: 40rpx;
					/* #endif */
				}
				.emoj_img{
					margin-left: 18rpx;
					margin-right: 13rpx;
				}
				.sendBtn{
					width: 140rpx;
					height: 60rpx;
					padding: 0 10rpx;
					border-radius: 10rpx;
					margin-left: 20rpx;
					background-color: #7DCCEC;
					color: #FFFFFF;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.voice_box{
					flex: 1;display: flex;
					height: 82rpx;
					background-color: #FFFFFF;
					border: 1px solid #F8F8F8;
					align-items: center;
					justify-content: center;
					.voice_text{
						font-size: 32rpx;
						font-weight: 400;
						color: #161616;
					}
				}
			}
			.moreFunction{
				padding: 0 40rpx;
				background-color: #F8F8F8; 
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				.fun_swiper{
					flex: 1;
				}
			}
		}
		.voice_bd{
			position: fixed;
			// bottom: 140rpx;
			// top:200rpx;
			width: 750rpx;
			height: 100%;
			background:rgba(0,0,0,0.8);
			.voice_box{
				position: relative;
				height: 100%;
			}
			.voice_ui{
				position: absolute;top:0;
				left:0;
				right:0;
				bottom:0;
				width: 360rpx;display: flex;flex-direction: column;margin: auto;
				height: 240rpx;
				border-radius: 16rpx;
				align-items: center;
				justify-content: center;
				.voice_icon{
					margin-bottom: 20rpx;
					animation: voice_style 1s infinite;
				}
				.voice_ui_text{
					color: #FFFFFF;
					font-size: 30rpx;
				}
			}
			.cancel_ui{
				background-color: #dd6161;
			}
			.normal_ui{
				background-color: #50BCF2;
			}
			.round_ui{
				width: 750rpx;
				height: 180rpx;
				border-radius: 80%/100% 100% 0 0;
				position: absolute;
				bottom: 0;
				// top: 120px;
			}
			.cancel_round_ui{
				background: #8f8f8f;
			}
			.normal_round_ui{
				background: #fff;
			}
			.tip_text{
				width: 100%;
				position: absolute;
				bottom: 200rpx;
				text-align: center;
				color: #8f8f8f;
				// top: 110px;
			}
		}
		@keyframes voice_style{
			from{
				transform: scale(1);   
			}
			50%{
				transform: scale(1.5)
			}
			to{
				transform: scale(1)
			}
		}
</style>
