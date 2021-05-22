// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event) => {
    let openid= event.openid
    let content = event.content
    let remarkTime = event.remarkTime
    let nickName = event.nickName
    let avatarUrl = event.avatarUrl
    let id = event.id
    let category = event.category
    let remarkId = event.remarkId
    return await db.collection(category).doc(id)
    .update({
        data:{
            remarks:_.push({
                each:[{openid,content,remarkTime,nickName,avatarUrl,remarkId}]
        })
        }
    }).then(res=>{
        return db.collection(category).where({
            _id:id
        }).get()
        .then(res1=>{
          return res1.data[0].remarks;
        }).catch(reason1=>{
            return '评论更新失败'
        })
    }).catch(reason=>{
        return '评论失败'
    })   
}