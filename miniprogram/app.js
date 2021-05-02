// app.js
App({
 
  onLaunch() {
    // 展示本地存储能力
   
    wx.cloud.init({
      env:'one-ev4od'
    })
    
    // 登录
    wx.login({
        // 发送 res.code 到后台换取 openId, sessionKey, unionId 
          
    }).then(res=>{
 wx.cloud.callFunction({
   name:'getOpenId'
 }).then(res=>{
   console.log(res)
   this.globalData.userInfo=res.result
 })
    })
  },
  getOpenid: async function(){

    let res = await wx.cloud.callFunction({ name: 'login' })

    wx.setStorageSync('openid', res.result.openid)

    return res.result.openid

},
  
  globalData: {
    userInfo: null,
    avatarUrl:null,
    nickName:null,
    gender:null
  }
})



