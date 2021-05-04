// miniprogram/pages/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    openid:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const userInfo = wx.getStorageSync('userInfo')
    const openid = wx.getStorageSync('openid')
    if(userInfo instanceof Object && openid !==null){
      this.setData({
        userInfo,
        openid
      })
    }
  },


  tologin(){
      wx.switchTab({
        url: '../mine/mine',
      }).then(res=>{console.log(res)})
      .catch(reason=>{
        console.log(reason)
      })
  },
  // 表单提交函数
  formSubmit(e){
    wx.showLoading({
      title: '发表中',
    })
    console.log(e.detail.value);
    wx.cloud.callFunction({
      name:'love',
      data:e.detail.value
    }).then(res=>{
      console.log(res);
      wx.hideLoading().then(res1=>{
         wx.showToast({
           title: '发布成功',
           icon:'success'
         })
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
    const userInfo = wx.getStorageSync('userInfo')
    const openid = wx.getStorageSync('openid')
    if(userInfo instanceof Object && openid !==null){
      this.setData({
        userInfo,
        openid
      })
    }
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