// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event) => {
  const _id = event._id;
  let category = event.category;
  return await  db.collection(category).doc(_id)
  .remove().then(res=>{
    return  '删除成功'
  }).catch(reason=>{
    return reason
  })
}