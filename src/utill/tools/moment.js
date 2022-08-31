import moment from 'moment';
moment.locale('zh-cn')
export default function newtime(options){
		console.log(options)
		console.log(moment(options).fromNow())
		return moment(options).fromNow()
	}
