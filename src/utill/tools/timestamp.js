// 时间戳精准到分秒
import moment from 'moment'
moment.locale('zh-cn')
const JUST_NOW = 3000; //3s内
 const IN_SECOND = 1000 * 60; //一分钟
 const IN_MINUTE = 1000 * 60 * 60; //一小时
 const IN_HOUR = 1000 * 60 * 60 * 12; //12小时
 const IN_DAY = 1000 * 60 * 60 * 24 * 1; //1天
 const IN_MONTH = 1000 * 60 * 60 * 24 * 30; //1个月
    function time(options){
  //       var date = new Date(options)
  //       var y = date.getFullYear()
  //       var m = date.getMonth() + 1
  //       m = m < 10 ? ('0' + m) : m
  //       var d = date.getDate()
  //       d = d < 10 ? ('0' + d) : d
  //       var h = date.getHours()
  //       h = h < 10 ? ('0' + h) : h
  //       var minute = date.getMinutes()
  //       var second = date.getSeconds()
  //       minute = minute < 10 ? ('0' + minute) : minute
  //       second = second < 10 ? ('0' + second) : second
		
  //       return y + '-' + m + '-' + d + ' ' + h + ':'+ minute+':'+second   
		// console.log(moment(options).format('YYYY-MM-DD HH:mm:ss'))//年份
		return moment(options).format('YYYY-MM-DD HH:mm:ss')
    }
	function relativtime(time){
		let hm=moment(time).format('HH:mm')//时分
		// console.log(hm)
		  // console.log('数据测试')
		  // console.log(moment().format())
		  // console.log(moment(time).format())
		  // console.log(moment(time).format('MM')) //月份
		  // console.log(moment(time).format('DD'))//日期
		  // console.log(moment(time).format('YYYY'))//年份
		  // console.log(moment(time).format('xx'))//指定时间戳
		  // console.log(moment().format('xx'))//当前时间戳
		  let localTime = new Date(); //当前系统时间
		  // console.log(localTime) //Mon Mar 22 2021 10:20:43 GMT+0800 (中国标准时间)
		  let createTime = new Date(time) //消息创建时间
		  // let createTime =new Date(1616309398000) //转化为标准时间
		  // console.log(createTime) 
		  let diff = localTime - createTime; //标准时间相比
		  // console.log(moment().diff(moment(time), 'hours') )
		  // console.log(diff) 
		  if (diff <= JUST_NOW)
		    return '刚刚';
		  else if (diff <= IN_SECOND)
		    return "1分钟内";
		  else if (diff <= IN_MINUTE)
		    return parseInt(diff / IN_SECOND) + '分钟前';
		  else if (diff <= IN_MINUTE)
		    return parseInt(diff / IN_MINUTE) + '小时前';
		  else if (diff <= IN_HOUR * 2) {//<=24h
		    const list = createTime.toString().split(" ");
			// console.log(list)
		    const lastIndex = list[4].lastIndexOf(":") //查找：最后一次出现的位置，没有匹配，返回-1
			// console.log(lastIndex)
		    const realtime = list[4].toString().substring(0, lastIndex);
			// console.log(realtime)
			const nowTime=localTime.toString().split(" ");
			if(list[2]<nowTime[2]){
				return `昨天 ${realtime}`;
			}else{
				return realtime;
			}
		  } else if (diff < IN_DAY * 7) {//7天之内
		    if (diff < IN_DAY) {//<1天
		      return parseInt(diff / IN_HOUR) + '天前';
		    }
			// else{
			// 	return parseInt(diff / IN_DAY) + '天前';
			// }
			const t = createTime.toString().slice(0, 3);
			switch (t) {
			  case "Mon":
				return `星期一 ${hm}`;
			  case "Tue":
				return `星期二 ${hm}`;
			  case "Wed":
				return `星期三 ${hm}`;
			  case "Thu":
				return `星期四 ${hm}`;
			  case "Fri":
				return `星期五 ${hm}`;
			  case "Sat":
				return `星期六 ${hm}`;
			  case "Sun":
				return `星期日 ${hm}`;
			}
		  } else if (diff < IN_MONTH*24) {//一年内
				const list = createTime.toString().split(" ");
				// console.log(list)
				const month = list[1];
				var realtime = "";
				if (diff < IN_MONTH) {//一月内
					realtime += getNumberMonth(month)+"月";//月
				} else {
					realtime = list[3] + "年" + getNumberMonth(month)+"月";//年-月
				}
				return `${realtime}${list[2]}日 ${hm}`; //年月日或者月日
		  }else{
			  const list = createTime.toString().split(" ");
			  const month = list[1];
			  var realtime = list[3] + "-" + getNumberMonth(month);//年-月
			  return realtime + "-" + list[2]+hm; //年月日
		  };
		function getNumberMonth(month){
			// console.log(month)
			 switch (month) {
			    case "Jan":
			      return "1";
			    case "Feb":
			      return "2";
			    case "Mar":
			      return "3";
			    case "Apr":
			      return "4";
			    case "May":
			      return "5";
			    case "Jun":
			      return "6";
				case "June":
					return "6";
			    case "Jul":
			      return "7";
			    case "Aug":
			      return "8";
			    case "Sep":
			      return "9";
			    case "Oct":
			      return "10";
			    case "Nov":
			      return "11";
			    case "Dec":
			      return "12";
			  }
		};
		function isThisWeek(time) {
			    // 当前时间
			    var timestamp = Date.parse(new Date());
			    var serverDate = new Date(timestamp);
			    //本周周日的的时间
			    var sundayTiem = timestamp + ((7 - serverDate.getDay())* 24 * 60 * 60 * 1000)
			    var SundayData = new Date(sundayTiem);
			    //年
			    var tomorrowY = SundayData.getFullYear();
			    //月
			    var tomorrowM = (SundayData.getMonth() + 1 < 10 ? '0' + (SundayData.getMonth() + 1) : SundayData.getMonth() + 1);
			    //日
			    var tomorrowD = SundayData.getDate() < 10 ? '0' + SundayData.getDate() : SundayData.getDate();
			    // 本周周一的时间
			    var mondayTime = timestamp - ((serverDate.getDay()-1) * 24 * 60 * 60 * 1000)
			    var mondayData = new Date(mondayTime);
			    //年
			    var mondayY = mondayData.getFullYear();
			    //月
			    var mondayM = (mondayData.getMonth() + 1 < 10 ? '0' + (mondayData.getMonth() + 1) : mondayData.getMonth() + 1);
			    //日
			    var mondayD = mondayData.getDate() < 10 ? '0' + mondayData.getDate() : mondayData.getDate();
			    // 当前时间
			    var currentData = new Date(time);
				console.log(currentData)
			    //年
			    var currentY = currentData.getFullYear();
			    //月
			    var currentM = (currentData.getMonth() + 1 < 10 ? '0' + (currentData.getMonth() + 1) : currentData.getMonth() + 1);
			    //日
			    var currentD = currentData.getDate() < 10 ? '0' + currentData.getDate() : currentData.getDate();
			    //时
			    var currenH = currentData.getHours();
			    //分
			    var currenM = currentData.getMinutes();
			    var sundayDay = tomorrowY + tomorrowM + tomorrowD; //周日时间
			    var mondayDay = mondayY + mondayM + mondayD;//周一时间
			    var currentDay = currentY + currentM + currentD;//获取到的时间
			    parseInt(currentDay);
			    parseInt(mondayDay);
			    if (parseInt(currentDay) >= parseInt(mondayDay)) {
					if (parseInt(currentDay) <= parseInt(sundayDay)) {
						return true;
					}
					else {//不是本周
			    	    return false;
					}
			    }
				else { //非本周
			      return false;
			    }
		}
	}
	export default {
		time,
		relativtime
	}
