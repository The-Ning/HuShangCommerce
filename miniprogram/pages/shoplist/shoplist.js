// pages/shoplist/shoplist.js
wx.cloud.init();
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    query: {},
    shopList: [],
    page: 1,
    pageSize: 10,
    avatarurl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      query: options // url传过来的参数
    })
    this.getShopList()
  },

  // 跳转商品详细信息函数
  shopspecify(event){
   
    var table = event.currentTarget.dataset.table;
    var _id = event.currentTarget.dataset._id;

    wx.navigateTo({
      url:'/pages/specify/specify?table='+table+'&_id='+_id
    }).then(res=>{
      console.log(res)
    })
    
  },


  getShopList() {
    db.collection(this.data.query.class).get({ 
      // get 方法会触发网络请求，往数据库取数据
    }).then( res=>{
    console.log(res)
    this.setData({
     shopList: [...this.data.shopList, ...res.data]
    
    })
  })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.query.title
    })
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