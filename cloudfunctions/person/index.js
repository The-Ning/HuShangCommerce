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
   else if(way == 'modify'){
     let signature = event.signature
     let location = event.location
     let campus = event.campus
     return await db.collection('person').where({
       openid:openid
     }).update({
       data:{
        signature:signature,
        location:location,
        campus:campus
       }
        
     }).then(res=>{
       return res
     }).catch(reason=>{
       return reason
     })
   }

   else if(way == 'insert'){
    return await db.collection('person').add({
       data:{
         openid:openid,
         avatar:event.avatar,
         signature:'默认签名',
         location:'默认地址',
         clickload:1,
         campus:'默认学校',
         nickname:event.nickname,
         gender:event.gender
       }
     }).then(res=>{
       return res
     }).catch(reason=>{
       return reason
     })
   }
}