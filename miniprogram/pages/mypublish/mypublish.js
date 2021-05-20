// miniprogram/pages/mypublish/mypublish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    openid:'',
    mypublishArr:[],
    list:[{_id: "28ee4e3e60990466177d65e96bc14081", category: "campus", clickload: 2, content: "哈哈哈哈", date: "2021-05-10 18:01"}
  ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  console.log(options)
  this.setData({
    openid:options.openid,
    userInfo:wx.getStorageSync('userInfo')
  })

  // 查询用户自己的发布
  const arr = ['love','findItem','campus']
  const result = []
   arr.forEach(item=>{
    wx.cloud.callFunction({
      name:'mypublish',
      data:{
        openid:this.data.openid, 
        category:item
      }
    }).then(res=>{
      result.push(...res.result)
      this.setData({
        mypublishArr:result
      })
    }).catch(reason=>{
      console.log(reason)
    })
   })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})