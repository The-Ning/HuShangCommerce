// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
 event.createTime = db.serverDate()
 event.remarks[0] = {
   openid:event.openid,
   avatarUrl:event.userInfo.avatarUrl,
   nickName:event.userInfo.nickName,
   content:'楼主镇楼！！！'
}
 return await  db.collection(event.category).add({
     data:event
   }).then(res=>{
     return event;
   })
}