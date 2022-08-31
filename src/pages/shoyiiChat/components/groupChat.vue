<template>
	<view class="groupchat">
		<view class="">
			<u-subsection :list="list" :current="current" @change='subsection' active-color="#86B0D4"></u-subsection>
		</view>	
		<view class="content" style="">
			<view class="" v-if="current==0">
				<chatlist :chatlist='caseGroup'></chatlist>
			</view>
			<view class="" v-if="current==1">
				<chatlist :chatlist='otherGroup'></chatlist>
			</view>
		</view>
	</view>
</template>

<script>
	import chatlist from './chatlist.vue'
	export default {
		components:{
			chatlist
		},
	    data() {
	        return {
	           list: [
					{name: '病例群组'}, 
					{name: '其他群组'}, 
				],
				current: 0
	        }
	    },
	    props: {
	        caseGroup: {
	            type: Array,
	            default: () => {
	                return []
	            }
	        },
			otherGroup: {
	            type: Array,
	            default: () => {
	                return []
	            }
	        },
		
			
	    },
		methods:{
			subsection(e){
				console.log(e)
				this.current=e
			},
			refreshChat(){
				
			},
		},
	
	}
</script>

<style scoped lang="scss">
	page{
		width: 100%;
		height: 100%;
	}
	.groupchat{
		width: 100%;
		
	}
	.content{
		
	}
</style>
