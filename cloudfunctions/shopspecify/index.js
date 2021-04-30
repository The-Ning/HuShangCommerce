// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database();

// 云函数入口函数
// 返回指定的商品的详细信息
exports.main = async (event, context) => {
     var shoptable = event.table;
     var _id = event._id;
  
  return await   db.collection(shoptable).doc(_id).get()
     .then(
       res=>{
         return res;
       }
     )
     
}