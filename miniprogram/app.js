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
    mypublishChange:false,
    openid:''
  },

  getopenid: function(cb) { 
    if (this.globalData.openid) {
      typeof cb == "function" && cb(this.globalData.openid)
    } else {
      var that = this
      wx.cloud.callFunction({
        name: 'getopenid',
        success: res => {
          //闭包函数内，可以用this,而不需要用that=this
          that.globalData.openid = res.result
          typeof cb == "function" && cb(that.globalData.openid)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '获取 openid 失败，请检查 login 云函数',
          })
          console.log('[云函数] [login] 获取 openid 失败，请检查是否有部署云函数，错误信息：', err)
        },
      })

    }
  },
})



