// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event) => {
    let openid= event.openid
    let content = event.detail
    let remarkTime = event.remarkTime
    let nickName = event.nickName
    let avatarUrl = event.avatarUrl
    db.collection('love').doc(event._id)
    .update({
        remarks:_.push({openid,content,remarkTime,nickName,avatarUrl})
    }).then(res=>{
        return '评论成功'
    }).catch(reason=>{
        return '评论失败' + reason
    })

}