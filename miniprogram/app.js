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
          
    })
  },
  
  
  globalData: {
    mypublishChange:false 
  }
})



