// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  userInfo:{}
  },

  getUserProfile(){
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    }).then(res=>{
      this.setData({
        userInfo: res.userInfo,
        hasUserInfo: true
      })
      console.log(res)
    });

    wx.login().then(res=>{
      if(res.code){
        wx.request({
          url:'https://api.weixin.qq.com/sns/jscode2session?'+
          'appid=wxba4ca0d1f2046721&secret=6a67ac618bfefe4e2001d685610f8851&js_code='+res.code+'&grant_type=authorization_code',
          data:{
            code:res.code
          },
          success(result){
           console.log(result)
          }
        })
      }else{
        console.log('登陆失败');
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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