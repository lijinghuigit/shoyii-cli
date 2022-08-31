<template>
	<view class="">
		<view class="" style="background-color: #EEEEEE;">
			<u-input v-model="searchContent" type="text" :border="true" height='300'/>
		</view>
		<button type="default" @click="search">搜索</button>
		<button type="default" @click="getlocation">获取位置</button>
		<button type="default" @click="getweather">获取天气</button>
		<button type="default" @click="getsdkLocation">获取sdk位置</button>
		 <view class="page-section page-section-gap">
			 <text>您当前位置是</text>
			 <view class="">
				  <text>{{locations.country}}</text>
				  <text>{{locations.province}}</text>
				  <text>{{locations.city}}</text>
				  <text>{{locations.district}}</text>
				  <text>{{locations.street}}</text>
				  <text>{{locations.streetNum}}</text>
				  <text>{{locations.poiName}}</text>
				  <text>{{locations.cityCode}}</text>
			 </view>
			<map style="width: 100%; height: 400px;" @markertap='markertap' :latitude="latitude" :longitude="longitude" :markers="markers">
			</map>
		</view>
		<view class="">
			<view class="" v-for="(item,index) in searchlist" :key='index' style="padding: 10px 0;background-color: #EEEEEE;">
					<view class="" style="display: flex;flex-direction: row;align-items: center;">
						<uni-icons type="phone"></uni-icons>
						<view class="">
							<text style="color: #000;">{{item.name}}</text>
							<text style="color: #000;">{{item.address}}</text>
						</view>
					</view>
				<!-- 	<text> 距离：</text><text style="color: red;">{{item.distance}}米</text>
					<text> 电话：</text><text style="color: red;">{{item.phone}}</text> -->
			</view>
		</view>
		<view class="">
			<view class="weather">
				<text>{{weather.city.text}}</text>
				<text>{{weather.city.data}}</text>
			</view>
			<view class="weather">
				<text>{{weather.weather.text}}</text>
				<text>{{weather.weather.data}}</text>
			</view>
			<view class="weather">
				<text>{{weather.temperature.text}}</text>
				<text>{{weather.temperature.data}}</text>
			</view>
			<view class="weather">
				<text>{{weather.windpower.text}}</text>
				<text>{{weather.windpower.data}}</text>
			</view>
			<view class="weather">
				<text>{{weather.humidity.text}}</text>
				<text>{{weather.humidity.data}}</text>
			</view>
			<view class="weather">
				<text>时间</text>
				<text>{{weather.liveData.reporttime}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	// 引入高德地图
	// import amap from '../../common/js/map/amap-wx.130.js';  
	export default{
		data(){
			return{
				latitude: 39.909,
				longitude: 116.39742,
				covers: [
					{
					id:1,
					title: 'map地图',
					latitude: 39.909,
					longitude: 116.39742,
					iconPath: '/static/image/shoyiilogo.png',
					width: 20,
					height: 20,
					callout:{
						content:'天安门',
						color:'#ffffff',
						fontSize:'14',
						bgColor:'blue'
					},
					label:{
						content:'',
						color:'black',
						fontSize:'14',
					}
				},
				],
				locations:[],
				searchlist:[],
				searchContent:'琶洲',
				amapPlugin: null,
				// 这里填写高德开放平台上申请的key,小程序的key
				key:'34c1d7c06f414ab22e27351bf0c8ef53', 
				weather:{
					"city": {},
					"weather": {},
					"temperature": {},
					"winddirection": {},
					"windpower": {},
					"humidity": {},
					"liveData":{}
				}
			}
		},
		computed:{
			markers(){
				console.log(this.covers)
				console.log(this.covers.slice(0))
				return this.covers.slice(0)
			}
		},
		methods:{
			markertap(e){
				console.log(e)
				console.log(e.detail.markerId)
				// 在地图中打开该位置
				uni.openLocation({
					latitude: this.latitude,
					longitude: this.longitude,
					success: function () {
						console.log('success');
					}
				});
			},
			// 搜索周边
			search(){
				let mapSearch = weex.requireModule('mapSearch')  
				var _this=this
				mapSearch.poiSearchNearBy({
					point:{
						"latitude": 23.095234,
						"longitude": 113.399147,	
					},
					key:this.searchContent,
					index:2
				},function(res){
					console.log(res)
					console.log(res.currentNumber)
					console.log(res.pageIndex)
					console.log(res.pageNumber)
					_this.searchlist=res.poiList
					console.log(_this.searchlist)
				})
			},
			// 获取当地数据信息
			getweather(){
				var that = this;
				this.amapPlugin.getWeather({
				  success: function(data){
					//成功回调
					console.log(data)
					that.weather=data
				  },
				  fail: function(info){
					//失败回调
					console.log(info)
				  }
				})
			},
			getlocation(){
				const _this=this
				uni.getLocation({
				    type: 'gcj02',
					geocode:true,
				    success: function (res) {
						console.log(res)
				        console.log('当前位置的经度：' + res.longitude);
				        console.log('当前位置的纬度：' + res.latitude);
						this.latitude = res.latitude;
						_this.latitude=res.latitude
						_this.longitude=res.longitude
						this.longitude = res.longitude;
						_this.covers[0].latitude=res.latitude
						_this.covers[0].longitude=res.longitude
						// #ifdef APP-PLUS
						_this.locations=res.address
						_this.covers[0].callout.content=res.address.poiName
						_this.covers[0].label.content=res.address.poiName
						_this.covers[0].title=res.address.city
						console.log(_this.covers)
						// #endif
						
				    }
				});
			},
			// 高德sdk的本地位置
			getsdkLocation(){
				uni.showLoading({
					title: '获取信息中'  
				});  
				this.amapPlugin.getRegeo({  
					success: (data) => {  
						console.log(data)  
						this.addressName = data[0].name;  
						uni.hideLoading();  
					},
					 fail:(err)=>{
						 console.log(err)
						 uni.hideLoading();  
					 }
				});  
			}
		},
		onLoad() {
			// this.getlocation()
			// 高德地图小程序sdk初始化加载
			// this.amapPlugin = new amap.AMapWX({
			// 	key:this.key  
			// }); 
		}
	}
</script>

<style scoped>
	.weather{
		/* display: flex;
		flex-direction: row; */
	}
	
</style>
