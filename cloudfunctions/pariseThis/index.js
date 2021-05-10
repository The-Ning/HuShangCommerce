// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  // 点赞数量增加
  const _id = event._id;
  let likeOr = event.likeOr;
  let category = event.category;
  if(likeOr){
 return await db.collection(category).doc(_id).update({
   data:{
    clickload:_.inc(1)
   }
  }).then(res=>{
    return '点赞成功'
  })
}
return await db.collection(category).doc(_id).update({
  data:{
   clickload:_.inc(-1)
  }
 }).then(res=>{
   return '取消点赞成功'
 })
}