// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event) => {
  const _id = event._id;
  let category = event.category;
  const imglist = event.imglist;
 
  return await  db.collection(category).where({
    _id:_id
  })
  .remove().then(res=>{
    return  '删除成功'+ cloud.deleteFile({
      fileList:imglist
    }).then(res1=>res1).catch(reason=>reason)
  }).catch(reason=>{
    return reason
  })
}