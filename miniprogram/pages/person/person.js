// miniprogram/pages/person/person.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  information:{},
  productions:[],
  clickload:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    let openid = 'oLdFI472i8OiQJxNv78-zML1tP-o'
    wx.cloud.callFunction({
      name:'person',
      data:{
        openid:openid,
        way:'query'
      }
    }).then(res=>{
      console.log(res)
      this.setData({
        information:res.result.data[0],
        clickload:res.result.data[0].clickload
      })
    }).catch(reason=>{
      console.log(reason)
    })

    // 获取作品
const arr = ['love','commerce','findItem','campus']
const result = []
 arr.forEach(item=>{
  wx.cloud.callFunction({
    name:'mypublish',
    data:{
      openid:wx.getStorageSync('openid'), 
      category:item
    }
  }).then(res=>{
    result.push(...res.result)
    this.setData({
      productions:result
    })
  }).catch(reason=>{
    console.log(reason)
  })
 })
  },

   parise(){

    this.data.clickload+=1;
    this.setData({
      clickload:this.data.clickload
    })
    
     wx.cloud.callFunction({
       name:'person',
       data:{
         openid:this.data.information.openid,
         way:'parise'
       }
     }).then(res=>{
       console.log(res)
     }).catch(reason=>{
       console.log(reason)
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