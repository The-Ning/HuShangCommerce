// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  let createTime = db.serverDate()
  let remark = []
 remark[0] = {
    openid:event.openid,
    avatarUrl:event.userInfo.avatarUrl,
    nickName:event.userInfo.nickName,
    content:'楼主镇楼！！！',
    remarkId:event.openid+ Date.now()
 }
 let category = event.category
 let clickload = 1
 let content = event.content
 let date = event.date
 let openid = event.openid
 let title = event.title
 let userInfo = event.userInfo
 let imgsrc = event.imgsrc
 let location = event.location
 return await  db.collection(category).add({
     data:{
       category:category,
       clickload:clickload,
       content:content,
       createTime:createTime,
       date:date,
       openid:openid,
       remarks:remark,
       title:title,
       imgsrc:imgsrc,
       userInfo:userInfo,
       location:location
     }
   }).then(res=>{
     return {
      category:category,
      clickload:clickload,
      content:content,
      createTime:createTime,
      date:date,
      openid:openid,
      remarks:remark,
      title:title,
      userInfo:userInfo,
      imgsrc:imgsrc,
      location:location
    };
   })
}