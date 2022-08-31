<template>
	<view class="setting" :data-theme='themeType'>
		<!-- <view class=""  @click="model" style="text-align: center;padding: 30rpx 0;">
			<text>查看系统模式</text>
		</view> -->
		<view class="settingItem sy_block sy_border_bottom" v-for="(item,index) in dataItems" :key='index' @click="enterDetail(index)" hover-class="bgColor">
			<text class="title sy_title_primary">{{item.title}}</text>
			<uni-icons :type="item.icon" color="#666666"></uni-icons>
		</view>
		<!-- #ifdef APP-PLUS -->
		<view class="settingItem sy_block sy_border_bottom" @click="clearCache()" hover-class="bgColor">
			<text class="title sy_title_primary">清理缓存</text>
			<view class="">
				<text>{{cachesize}}</text>
				<uni-icons type="arrowright" color="#666666"></uni-icons>
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataItems:[
					{title:'LOGO设置',icon:'arrowright'},
				],
				cachesize:'0B',
			}
		},
		methods: {
			enterDetail(index){
				if(index==0){//进入自定义logo
					uni.navigateTo({
						url:'/pages/GeneralSetting/settingLogo'
					})
				}
			},
			model(){
				console.log('1')
				uni.onThemeChange((res)=> {
					console.log(res)
				    console.log(res.theme);
				});
			},
			// 获取缓存
			getcache(){
				plus.cache.calculate((size)=>{
					let sizeCache = parseInt(size);
					if (sizeCache == 0) {
						this.cachesize = "0B";
					} else if (sizeCache < 1024) {
						this.cachesize = sizeCache + "B";
					} else if (sizeCache < 1048576) {
						this.cachesize = (sizeCache / 1024).toFixed(2) + "KB";
					} else if (sizeCache < 1073741824) {
						this.cachesize = (sizeCache / 1048576).toFixed(2) + "MB";
					} else {
						this.cachesize = (sizeCache / 1073741824).toFixed(2) + "GB";
					}
					console.log(this.cachesize)
				});
				
			},
			// 清理缓存
			clearCache() {
				// plus.cache.clear(()=>{}) 清除应用的缓存数据
				if(this.cachesize=='0B'){//缓存已经清除
					uni.showToast({
						title:'缓存已清除',
						icon:'none'
					})
					return;
				}
				uni.showLoading({
					title:'清除中'
				})
				let that = this;
				let os = plus.os.name;
				if (os == 'Android') {
					let main = plus.android.runtimeMainActivity();
					let sdRoot = main.getCacheDir();
					let files = plus.android.invoke(sdRoot, "listFiles");
					// console.log(files)
					let len = files.length;
					console.log(len)
					for (let i = 0; i < len; i++) {
						let filePath = '' + files[i]; // 没有找到合适的方法获取路径，这样写可以转成文件路径  
						console.log(filePath)
						plus.io.resolveLocalFileSystemURL(filePath, function(entry) {
							console.log(entry)
							if (entry.isDirectory) {
								entry.removeRecursively(function(entry) { //递归删除其下的所有文件及子目录  
									uni.hideLoading()
									uni.showToast({
										title: '缓存清理完成',
										duration: 2000
									});
									that.getcache(); // 重新计算缓存  
								}, function(e) {
									console.log(e.message)
								});
							} else {
								uni.hideLoading()
								entry.remove();
							}
						}, function(e) {
							console.log('文件路径读取失败')
						});
					}
				} else { // ios  
					plus.cache.clear(function() {
						uni.showToast({
							title: '缓存清理完成',
							duration: 2000
						});
						that.getcache();
					});
				}
			},
		},
		onLoad() {
			// #ifdef APP-PLUS
			this.getcache()
			// #endif
		},
		onReady() {
			this.amendNavigator()
		}
	}
</script>

<style scoped>
	page{
		/* #ifdef H5 */
		height: 100%;
		/* #endif */
	}
	.setting{
		width: 100%;
		/* #ifdef H5 */
		min-height: 100%; 
		/* #endif */
		/* #ifndef H5 */
		min-height: 100vh;
		/* #endif */
	}
	.settingItem{
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #EEEEEE;
		padding: 30rpx 30rpx;
		background-color: #FFFFFF;
	}
	.title{
		color: #000000;
	}
	.bgColor{
		background-color: #F8F8F8;
	}
</style>
