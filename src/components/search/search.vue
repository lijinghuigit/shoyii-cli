<template>
	<view class="" @click="search">
		<uni-search-bar bgColor='#FFFFFF' v-model="searchContent" :placeholder="placeholder" clearButton='none' cancelButton='none' :radius="32" />
	</view>
</template>

<script>
	export default{
		data(){
			return{
				searchContent:''
			}
		},
		emits:['search'],
		props:{
			placeholder:{
				type:String,
				default:''
			},
		},
		methods:{
			search(){
				this.$emit('search',this.searchContent)
			}
		}
	}
</script>

<style>
</style>
