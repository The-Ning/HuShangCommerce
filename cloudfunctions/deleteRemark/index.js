// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event) => {
  let category = event.category
  let _id = event._id
  let remarkId = event.remarkId
  return await db.collection(category).where({
    _id:_id
  })
  .update({
    data:{
      remarks:_.pull({
        remarkId:_.eq(remarkId)
      })
    }
  }).then(res=>{
    return `删除评论${remarkId}成功${event.remarkId}`
  }).catch(reason=>{
    return reason
  })
}