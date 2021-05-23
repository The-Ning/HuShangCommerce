// miniprogram/pages/history/history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    history:[],
    date:'',
    showdate:''
  },
 

  // date 代表指定的日期，格式：2018-09-27
// day 传-1表始前一天，传1表始后一天
// JS获取指定日期的前一天，后一天
getNextDate(e) { 
  wx.showLoading({
    title: '加载中',
  })
  let date = e.currentTarget.dataset.date;
  let day = e.currentTarget.dataset.day;
　　var dd = new Date(date);
　　dd.setDate(dd.getDate() + day);
　　var y = dd.getFullYear();
　　var m = dd.getMonth() + 1;
　　var d = dd.getDate();
    let showresult = m + "月" + d + '日'
    let result = y + "-" + m + "-" + d
    wx.request({
      url: `https://v.juhe.cn/todayOnhistory/queryEvent.php?key=bb8c674099eb6f0e4250a91aca42dc07&date=${m}/${d}`,
      success:res=>{
       console.log(res.data.result)
       this.setData({
        date:result,
        showdate:showresult,
        history:res.data.result
      })
     wx.hideLoading()
      }
    })
　　
},


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title:'历史上的今天'
    })
   
   this.setData({
     history:wx.getStorageSync('history'),
    date:options.date,
    showdate:options.showdate
   })
  console.log(this.data.history)

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