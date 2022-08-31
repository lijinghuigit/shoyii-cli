<template>
	<view class="qiun-columns">
		<view class="qiun-charts" >
			<!--#ifdef MP-ALIPAY -->
			<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" :width="cWidth*pixelRatio" :height="cHeight*pixelRatio" :style="{'width':cWidth+'px','height':cHeight+'px'}" @touchstart="touchColumn"></canvas>
			<!--#endif-->
			<!--#ifndef MP-ALIPAY -->
			<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" @touchstart="touchColumn"></canvas>
			<!--#endif-->
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<ad unit-id="adunit-908b0a16e90e2a5f" ad-type="grid" grid-count="8" ad-theme="white"></ad>
		<!-- #endif -->
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
			<view class="qiun-title-dot-light">基本柱状图</view>
		</view>
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
			<view class="qiun-title-dot-light">标准数据格式</view>
		</view>
		<view class="qiun-bg-white qiun-padding">
		    <textarea class="qiun-textarea" auto-height="true" maxlength="-1" v-model="textarea"/>
		</view>
		<view class="qiun-text-tips">Tips：修改后点击更新图表</view>
		<button class="qiun-button" @click="changeData()">更新图表</button>
	</view>
</template>

<script>
	// import uCharts from '@/js_sdk/u-charts/u-charts.js';
	// import  { isJSON } from '@/common/js/checker.js';
	var _self;
	var canvaColumn=null;
	export default{
		data(){
			return{
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				textarea:'',
			}
		},
		methods:{
			// 获取数据
			getServerData(){
				uni.request({
					url: 'https://www.ucharts.cn/data.json',
					data:{
					},
					success: function(res) {
						console.log(res.data.data)
						let Column={categories:[],series:[]};
						//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
						Column.categories=res.data.data.ColumnB.categories;
						Column.series=res.data.data.ColumnB.series;
						_self.textarea = JSON.stringify(res.data.data.ColumnB);
						_self.showColumn("canvasColumn",Column);
					},
					fail: () => {
						_self.tips="网络错误，小程序端请检查合法域名";
					},
				});
			},
			// 数据渲染
			showColumn(canvasId,chartData){
				// 实例化
				canvaColumn=new uCharts({
					title:{
						name:'测试',
						color:'#f8f8f8'
						
					},
					$this:_self,
					canvasId: canvasId,
					type: 'column',
					padding:[15,5,0,15],
					legend:{
						show:true,
						padding:5,
						lineHeight:11,
						margin:0,
						position:'bottom'
					},
					fontSize:11,
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					animation: true,
					categories: chartData.categories,
					series: chartData.series,
					xAxis: {
						disableGrid:true,
					},
					yAxis: {
						data:[{
						  position:'left',
						  axisLine:false,
						  format:(val)=>{return val.toFixed(0)+'元'},
						}]
					},
					dataLabel: true,
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						column: {
							type:'group',
							width: _self.cWidth*_self.pixelRatio*0.45/chartData.categories.length
						}
					  }
				});
			},
			touchColumn(e){
				canvaColumn.showToolTip(e, 
				{
					background:'#f8f8f8',
					format: function (item, category) {
						console.log(item)
						console.log(category)
						if(typeof item.data === 'object'){
							return category + ' ' + item.name + ':' + item.data.value 
						}else{
							return category + ' ' + item.name + ':' + item.data 
						}
					}
				});
				canvaColumn.touchLegend(e,{animation:true});
			},
			// 数据更新
			changeData(){
				if(isJSON(_self.textarea)){
					let newdata=JSON.parse(_self.textarea);
					canvaColumn.updateData({
						series: newdata.series,
						categories: newdata.categories,
						animation:true
					});
				}else{
					uni.showToast({
						title:'数据格式错误',
						image:'../../../static/images/alert-warning.png'
					})
				}
			}
		},
		onLoad() {
			_self = this;
			this.cWidth=uni.upx2px(750);
			this.cHeight=uni.upx2px(500);
			this.getServerData();
		}
	}
</script>

<style>
	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
	
	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
</style>
