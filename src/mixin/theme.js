 import {mapGetters,mapMutations,mapState} from 'vuex'
const themeMixin={
	methods:{
		...mapMutations({
			changeTheme:'theme/changeTheme'
		}),
		amendNavigator(){
			// console.log(this.themeType)
			// #ifndef MP-WEIXIN
			if(this.themeType=='dark'){
				uni.setNavigationBarColor({
					backgroundColor:'#1B1C1E',
					frontColor:'#ffffff'
				})
			}else{
				uni.setNavigationBarColor({
					backgroundColor:'#fff',
					frontColor:'#000000'
				})
			}
			// #endif
		}
	},
	computed:{
		...mapGetters('theme',{
			themeType:'themeType'
		}),
		...mapState('theme', {
			curThemeType:state => state.curThemeType,
		 })
	}
} 
export default themeMixin