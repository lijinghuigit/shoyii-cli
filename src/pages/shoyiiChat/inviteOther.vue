<template>
	<view class="invite" :data-theme='themeType'>
		<view class="section sy_block" style="padding: 0 30rpx;background-color: #FFFFFF;">
			<uni-list>
			    <uni-list :border="themeType=='dark'?false:true">
					<view style="display: flex;" class="sy_block" v-for="(item,index) in addressList" :key='index'>
						  <checkbox-group style="display: flex;align-items: center;" @change="singlecheck(item.anotherUserId,$event)">
								<checkbox :checked="item.checked" :disabled="item.ifGroups"/> 
						  </checkbox-group>
						<uni-list-chat class="chat sy_block" clickable :title="item.anotherUserName" :avatar="item.anotherUserProfile?item.anotherUserProfile:'/static/image/person.png'">
						</uni-list-chat>
					</view>
			    </uni-list>
			</uni-list>
		</view>
		<view class="footer">
			<u-tag text="完成" v-if="!newGroup" type="success" @click='complete'/>
			<view class="groupname" v-else>
				<u-field
					class="input"
					v-model="groupName"
					label="群名"
					placeholder="请填写群名称"
				>
				</u-field>
				<u-tag text="创建" type="success" @click='createGroup'/>
			</view>
		</view>
	</view>
</template>

<script>
	import {getAddress,addMember,createGroup} from '@/utill/api/connect/connect.js'
	export default{
		data(){
			return{
				addressList:[],
				memberList:[],
				groupId:'',
				newGroup:false,
				groupName:'',
				arr:[],
			}
		},
		computed:{
			userId(){
				return this.$store.getters['user/info'].doctorId
			}
		},
		methods:{
			singlecheck(otherid,e){
				var length=e.detail.value.length
				this.addressList.forEach((item)=>{
					if(otherid==item.anotherUserId&&length==1){//选中
						item.checked=true
					}else if(otherid==item.anotherUserId&&length==0){//取消选中
						item.checked=false
					}
				})
				console.log(this.addressList)
			},
			getaddressList(){
				getAddress({
					userId:this.userId,
					groupId:this.groupId
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						if(res.data.object.length==0){
							console.log('列表为空')
						}else{
							this.addressList=res.data.object
							this.addressList.forEach((item)=>{
								if(item.ifGroups){ //已在群组中，true
									item.checked=item.ifGroups
								}else{//默认是false
									item.checked=false
								}
							})
							console.log(this.addressList)
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
			// 添加列表完成
			complete(){
				this.addressList.forEach((item)=>{
					if(item.checked==true&&item.ifGroups==false){//群组中没有存在的和选中的同时存在
						this.memberList.push({userId:item.anotherUserId,userType:'D'})
					}
				})
				console.log(this.memberList)
				console.log(this.groupId)
				//添加完成后，进入到群组成员信息列表
				if(this.memberList.length==0){
					uni.showToast({
						title:'请选择成员',
						icon:'none'
					})
					return;
				}
				var groupId={id:this.groupId}
				console.log(groupId)
				console.log(this.memberList)
				addMember({
					cmsUserGroups:groupId,//群组id
					userModels:this.memberList
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						uni.navigateTo({
							url:'/pages/shoyiiChat/contactGroup?groupId='+this.groupId
						})
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
			// 创建群组
			createGroup(){
				var cmsUserGroups={}
				if(!this.groupName){//无名称
					uni.showToast({
						title:'添加群组名称',
						icon:'none'
					})
					return;
				}
				cmsUserGroups.name=this.groupName
				this.addressList.forEach((item)=>{
					console.log(item)
					if(item.checked==true){//群组中选中的
						this.memberList.push({userId:item.anotherUserId,userType:item.anotherUserType})
					}
				})
				console.log(this.memberList)
				if(this.memberList.length==0){
					uni.showToast({
						title:'请选择成员',
						icon:'none'
					})
					return;
				}
				this.memberList.unshift({userId:this.userId,userType:'D'})
				console.log(this.memberList)
				createGroup({
					cmsUserGroups:cmsUserGroups,//群组id及name
					userModels:this.memberList
				}).then(res=>{
					console.log(res)
					if(res.data.code==0){
						uni.navigateTo({
							url:'/pages/shoyiiChat/index'
						})
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
		onLoad(options) {
			console.log(options)
			if(options.groupId){ //从已有的群组过来
				console.log(options.groupId)
				this.groupId=options.groupId
			}else{//新创建的群组
				this.newGroup=true
			}
			this.getaddressList()
		},
		onReady() {
			this.amendNavigator()
		}
	}
</script>

<style scoped lang="scss">
	page{
		width: 100%;
		height: 100%;
	}
	.invite{
		width: 100%;
		/* #ifdef H5 */
		height:100%;
		/* #endif */
		/* #ifndef H5 */
		height: 100vh;
		/* #endif */
		display: flex;
		flex-direction: column;
	}
	.chat ::v-deep .uni-list-chat__content-title{
		color: #999;
		font-weight: 500;
	}
	.section{
		flex: 1;
		height: 100%;
		overflow: auto;
	}
	.footer{
		padding: 30rpx;
		text-align: right;
		.groupname{
			display: flex;justify-content: space-between;align-items: center;
			.input {
				background-color: #fff;
			}
		}
	}
</style>
