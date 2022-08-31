<template>
	<view class="wrap">
		<!-- <button type="default" @click="getcontacts">获取通讯录数据</button> -->
		<button type="default" @click="create">生成二维码</button>
		<view class="qrimg-i">
			<tki-qrcode 
			cid="qrcode1" 
			ref="qrcode" 
			:val="val" 
			:size="sizes" 
			:unit="unit" 
			:background="backgrounds" 
			:foreground="foreground" 
			:pdground="pdground" 
			:icon="icon" 
			:iconSize="iconsize" 
			:lv="lv" :onval="onval" 
			:loadMake="loadMake" 
			:usingComponents="true"
			@result="qrR" />
		</view>
	</view>
</template>
<script>
	// 生成二维码
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	export default {
		components:{
			tkiQrcode
		},
		data() {
			return {
				val: '二维码展示数据', // 要生成的二维码值
				sizes: 200, // 二维码大小
				unit: 'px', // 单位
				backgrounds: '#000000', // 背景色
				foreground: '#ffffff', // 前景色
				pdground: '#86B0D4', // 角标色
				icon: '/static/image/shoyiilogo.png', // 二维码图标
				iconsize: 80, // 二维码图标大小
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: false, // val值变化时自动重新生成二维码
				loadMake: false, // 组件加载完成后自动生成二维码
				src: '', // 二维码生成后的图片地址或base64
			}
		},
		methods: {
			qrR(e){
				console.log(e) //移动端是图片路径，网页是base64
				this.src = e
			},
			// 生成二维码
			create(){
				this.$refs.qrcode._makeCode()
			},
			getcontacts(){
				plus.contacts.getAddressBook(plus.contacts.ADDRESSBOOK_PHONE,function(addressbook){
					console.log(addressbook)
					addressbook.find([],function(e){
						console.log(e)
					})
				},function(e){
					console.log(e)
				})
			},
		},
		onLoad() {
		}
	}
</script>

<style lang="scss">
	.wrap {
		padding: 24rpx;
	}
		
	
</style>
