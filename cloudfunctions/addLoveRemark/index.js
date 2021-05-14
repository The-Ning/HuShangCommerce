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
    db.collection('love').doc(id)
    .update({
        remarks:_.push({openid,content,remarkTime,nickName,avatarUrl})
    }).then(res=>{
        return '评论成功'
    }).catch(reason=>{
        return '评论失败' + _id + typeof _id
    })
}