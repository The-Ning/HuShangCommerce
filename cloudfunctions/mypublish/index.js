// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event) => {
  let openid = event.openid;
  let category = event.category;
  return await db.collection(category)
  .where({
    openid:openid
  }).orderBy('createTime','desc').
  get().then(res=>{
    return res.data;
  })
}