<template>
	<web-view :src="url"></web-view>
</template>

<script>
	export default {
		data() {
			return {
				url:''
			}
		},
		onLoad(options) {
			// console.log(options)
			this.url=decodeURIComponent(options.baseUrl)
		}
	}
</script>

<style>

</style>
