<template>
	<view>
		<web-view :src="pdfUrl"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pdfUrl:'',
			}
		},
		onLoad(options) {
			var pdfUrl=options.pdfUrl
			this.pdfUrl=decodeURIComponent(options.pdfUrl) 
			// this.pdfUrl='/hybrid/html/web/viewer.html?file='+encodeURIComponent(pdfUrl)
		}
	}
</script>

<style>

</style>
