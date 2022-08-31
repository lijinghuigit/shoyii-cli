<template>
	<view style="width: 100%;overflow-y: hidden;">
		<view class="uni-padding-wrap uni-common-mt">
			<uni-segmented-control :current="current" :values="items" :style-type="styleType" :active-color="activeColor" @clickItem="onClickItem" />
		</view>
		<view class="content">
			<view v-if="current === 0">
				<checkbox-group @change="checkboxChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(listData, index) in listDatas" :key="index">
						<view><checkbox v-model="listData.path" :checked="listData.isActive" /></view>
						<view class="uni-triplex-left">
							<text class="uni-title uni-ellipsis" :class="{ activeColor: listData.isActive }">{{ listData.fileName }}</text>
							<text class="uni-text-small uni-ellipsis">{{ listData.origin }}</text>
						</view>
					</label>
				</checkbox-group>
			</view>
			<view v-if="current === 1">
				<checkbox-group @change="checkboxChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(listDatasWx, index) in listDatasWxs" :key="index">
						<view><checkbox v-model="listDatasWx.path" :checked="listDatasWx.isActive" /></view>
						<view class="uni-triplex-left">
							<text class="uni-title uni-ellipsis" :class="{ activeColor: listDatasWx.isActive }">{{ listDatasWx.fileName }}</text>
							<text class="uni-text-small uni-ellipsis">{{ listDatasWx.origin }}</text>
						</view>
					</label>
				</checkbox-group>
			</view>
			<view v-if="current === 2">
				<checkbox-group @change="checkboxChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(listDatasQq, index) in listDatasQqs" :key="index">
						<view><checkbox v-model="listDatasQq.path" :checked="listDatasQq.isActive" /></view>
						<view class="uni-triplex-left">
							<text class="uni-title uni-ellipsis" :class="{ activeColor: listDatasQq.isActive }">{{ listDatasQq.fileName }}</text>
							<text class="uni-text-small uni-ellipsis">{{ listDatasQq.origin }}</text>
						</view>
					</label>
				</checkbox-group>
			</view>
		</view>
		<view class="uniBtn">
			<button type="default" @click="goBack">返回</button>
			<button type="default" :class="{ disbled: disbled }" @click="savePath">确认</button>
		</view>
	</view>
</template>
<script>
import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue';
let fileFun = require('../getDriFile.js');
export default {
	components: {
		uniSegmentedControl
	},
	data() {
		return {
			disbled: true,
			items: ['全部', '微信', 'QQ'],
			current: 0,
			activeColor: '#007aff',
			styleType: 'text',
			listDatas: [],
			tatolLen: 0,
			getSDCardPath: null,
			type: '',
			path: ''
		};
	},
	onLoad(e) {
		this.path = e.path;
		this.getSDCardPath = fileFun.getSDCardPath(); //获取根目录
		this.listDatasWx = fileFun.readSonFilenum(this.getSDCardPath + '/tencent/MicroMsg/Download'); //微信下载
		this.listDatasQq = fileFun.readSonFilenum(this.getSDCardPath + '/tencent/QQfile_recv'); //QQ下载
		this.listDatas = this.listDatasWx.concat(this.listDatasQq);
	},
	computed: {
		listDatasWxs() {
			let wx = [];
			this.listDatas.forEach(item => {
				if (item.origin == '微信') {
					wx.push(item);
				}
			});
			return wx;
		},
		listDatasQqs() {
			let qq = [];
			this.listDatas.forEach(item => {
				if (item.origin == 'QQ') {
					qq.push(item);
				}
			});
			return qq;
		}
	},
	methods: {
		onClickItem(index) {
			if (this.current !== index) {
				this.current = index;
			}
		},
		getChange(path, num) {
			this.listDatas.forEach(item => {
				if (item.path == path) {
					item.isActive = !item.isActive;
				}
			});

			this.tatolLen = this.computedActive();
			if (this.tatolLen != 0) {
				this.disbled = false;
			} else {
				this.disbled = true;
			}
			uni.setNavigationBarTitle({
				title: this.tatolLen != 0 ? `已选中(${this.tatolLen}个)` : `文件`
			});
		},
		computedActive() {
			let len = 0;
			this.listDatas.forEach(item => {
				if (item.isActive) {
					len++;
				}
			});
			return len;
		},
		savePath() {
			let arr = [];
			this.listDatas.forEach(item => {
				if (item.isActive) {
					arr.push({ path: item.path, filename: item.fileName });
				}
			});

			if (arr.length == 0) {
				uni.showToast({
					icon: 'none',
					title: '请选择至少一个文件',
					position: 'bottom'
				});
			} else {
				uni.redirectTo({
					url: this.path + '?pageFile=' + JSON.stringify(arr)
				});
			}
			// this.$eventHub.$emit('file', arr);
		},
		goBack() {
			uni.navigateBack();
		},
		checkboxChange: function(e) {
			var items = this.listDatas,
				values = e.detail.value;
			for (var i = 0, lenI = items.length; i < lenI; ++i) {
				const item = items[i];
				if (values.indexOf(item.path) >= 0) {
					this.$set(item, 'isActive', true);
				} else {
					this.$set(item, 'isActive', false);
				}
			}

			this.tatolLen = this.computedActive();
			if (this.tatolLen != 0) {
				this.disbled = false;
			} else {
				this.disbled = true;
			}
			uni.setNavigationBarTitle({
				title: this.tatolLen != 0 ? `已选中(${this.tatolLen}个)` : `文件`
			});
		}
	}
};
</script>
<style scoped>
page {
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	background-color: #fff;
}

view {
	font-size: 28rpx;
	line-height: inherit;
}

.content {
	display: flex;
	margin-top: 20rpx;
	width: 100%;
	padding-bottom: 120rpx;
	background-color: #fff;
}

.content > view {
	width: 100%;
	overflow: hidden;
}

.uni-common-mt {
	margin: 0;
	padding-bottom: 20rpx;
	padding-top: 20rpx;
	border-bottom: 1px solid #faf4f4;
	background: #fff;
}

.uni-triplex-left {
	margin-left: 20rpx;
}

.activeColor {
	color: #ffcc33 !important;
}

.uniBtn {
	position: fixed;
	bottom: 0;
	display: flex;
	flex-direction: row;
	width: 100%;
	left: 0;
	z-index: 100;
}

.uniBtn button {
	background: #0098ef;
	color: #fff;
	-webkit-flex: 1;
	flex: 1;
	border-radius: 0 !important;
}

.uniBtn button:nth-of-type(1) {
	border-right: 1px solid #fff;
}

.disbled {
	pointer-events: none;
	color: skyblue !important;
}

.uni-list-cell {
	justify-content: flex-start;
}
</style>
