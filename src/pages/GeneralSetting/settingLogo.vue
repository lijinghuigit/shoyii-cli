<template>
	<view class="editAvatar" :data-theme='themeType'>
		<text class="sy_title_primary">选择上传自定义LOGO</text>
		<u-avatar class="logo" @click="upload" :src="src" mode="circle" size='320' img-mode=''></u-avatar>
		<view class="sy_title_primary" @click="Redefault">
			<u-icon name="reload" size='28' color='#666666' style='margin-right: 12rpx;'></u-icon>
			<text>恢复默认</text>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				src: "../../static/image/person.png",
			}
		},
		methods:{
			// 上传头像
			upload(){
				var _this=this
				uni.chooseImage({
					count: 1, //默认9
				    success: (chooseImageRes) => {
				        const tempFilePaths = chooseImageRes.tempFilePaths;
						_this.src=tempFilePaths[0]
						uni.saveFile({
						      tempFilePath: tempFilePaths[0],
						      success: function (res) {
								  // 如果缓存的图片不是默认的shoyiilogo，则删除
								if(uni.getStorageSync('uploadLogo')!='/static/image/shoyiilogo.png'){
									uni.removeSavedFile({
									  filePath: uni.getStorageSync('uploadLogo'),
									  success(data) {
									  	console.log(data)
									  }
									});
								}
						        var savedFilePath = res.savedFilePath;
								console.log(savedFilePath)//本地的保存路径
								uni.setStorageSync('uploadLogo',savedFilePath)
								_this.$store.commit('changeDataStatus',true)//更改数据状态
							}
						});
				    },
					fail(e) {
						console.log(e)
					}
				});
			},
			// 恢复默认
			Redefault(){
				if(uni.getStorageSync('uploadLogo')!='/static/image/shoyiilogo.png'){
					uni.setStorageSync('uploadLogo','/static/image/shoyiilogo.png')
					this.$store.commit('changeDataStatus',true)//更改数据状态
					this.src=uni.getStorageSync('uploadLogo')
				}else{
					uni.showToast({
						title:'已恢复默认',
						icon:'none'
					})
				}
			},
		},
		onLoad() {
			this.src=uni.getStorageSync('uploadLogo')
		},
		onReady() {
			this.amendNavigator()
		}
	}
</script>

<style scoped>
	page{
		background-color: #FFFFFF;
		/* #ifdef H5 */
		height: 100%;
		/* #endif */
	}
	.editAvatar{
		padding: 30rpx 0;
		color: #333333;
		font-size: 28rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		/* #ifdef H5 */
		min-height: 100%; 
		/* #endif */
		/* #ifndef H5 */
		min-height: 100vh;
		/* #endif */
	}
	.editAvatar .logo{
		margin: 30rpx 0;
	}
</style>
