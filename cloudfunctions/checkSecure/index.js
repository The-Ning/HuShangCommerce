// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

// 云函数入口函数
exports.main = async (event) => {
  let checkCategory = event.checkCategory
  if(checkCategory == 'text'){
    try{
      return await cloud.openapi.security.msgSecCheck({
        content:event.content
      })
    }catch(error){
      return error
    }
  }
  else if(checkCategory == 'image'){
    try{
      return await cloud.openapi.security.imgSecCheck({
        media:{
          //按照要求填写属性参数       
          contentType: 'image/png',
          value: Buffer.from(event.buffer)
        }
      })
    }
    catch(error){
      return error
    }
  }


}