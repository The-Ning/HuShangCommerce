// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event) => {
    let openid = event.openid
    let way = event.way
    if(way == 'query'){
      return await  db.collection('person').where({
        openid:openid
      }).get().then(res=>{
        return res
      }).catch(reason=>{
        return reason
      })
    }
 
     else if(way == 'parise'){
       return await db.collection('person').where({
         openid:openid
       }).update({
        data:{
         clickload:_.inc(1)
        }
     }).then(res=>{
       return '助力成功'
     }).catch(reason=>{
       return reason
     })
}
}