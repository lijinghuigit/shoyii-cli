let mock={};
// #ifndef VUE3
// Mock=require('mockjs')
Mock.mock('/getTrainInfor','get',require('./hospital.json'))
// 小程序端注意
// Mock.mock('/api/tags','get', Mock.mock({
//     'list|100': [{ name: '@city', 'value|1-100': 50, 'type|0-2': 1 }],
// 	})
// )
// #endif
// #ifdef VUE3
// import hospitaljson from './hospital.json'
// let aa=Mock.mock('/hospital','get',hospitaljson)
let dd=Mock.mock('/api/user/userinfo', 'post', () => {
    const data = Mock.mock({
        userhead: 'https://avatars.githubusercontent.com/u/22078920?v=4',
        rolesDetail: {
            updateTime: "2022/07/24 19:50:49",
        }
    })
    return {
        code: 1,
        message: '请求成功',
        data,
    }
})
let cc= Mock.mock('/api/tags','get', Mock.mock({
     'list|100': [{ name: '@city', 'value|1-100': 50, 'type|0-2': 1 }],
     })
 )
export default {cc,dd}
// #endif
