import { defineStore } from 'pinia';
export const testStore=defineStore('countertest',{
	state:()=>{
		return {
			count: 0
		}
	},
	getters:{
		myCount(state){
			return state.count
		},
		// myCount: (state) => state.counter * 2,
	},
	actions:{
		increment() {
			this.count++;
		},
	}
})