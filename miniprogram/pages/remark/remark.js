// miniprogram/pages/remark/remark.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    information:{},
    remarkArr:[],
    openid:null,
    userInfo:{},
    remarkContent:'',
    myUserInfo:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const information = JSON.parse(options.item);
    this.setData({
      information:information,
      remarkArr:information.remarks,
      userInfo:information.userInfo,
      openid:wx.getStorageSync('openid'),
      myUserInfo:wx.getStorageSync('userInfo')
    })
    console.log(this.data.openid);
  },
  remarkContent(e){
    this.setData({
      remarkContent:e.detail
    })
  },
// 预览图片事件函数
imgYulan:function(event){
  var currency = event.currentTarget.dataset.src;
  var imgs = event.currentTarget.dataset.list;
  wx.previewImage({
    current: currency, // 当前显示图片的http链接
    urls:imgs  // 需要预览的图片http链接列表
  })
},
addRemark(e){
  if(this.data.remarkContent == ''){
    wx.showToast({
      title: '不能为空',
    })
    return
  }
  this.handleRemarkResult(this.data.information.category)
},

handleRemarkResult(category){
  wx.cloud.callFunction({
    name:'addRemark',
    data:{
        category:category,
        id:this.data.information._id,
        openid:this.data.openid,
        content:this.data.remarkContent,
        remarkTime:this.getNow(),
        nickName:this.data.myUserInfo.nickName,
        avatarUrl:this.data.myUserInfo.avatarUrl    
    }
  }).then(res=>{
    console.log(res)
    this.data.information.remarks = res.result
    this.setData({
      information:this.data.information
    })
  }).catch(reason=>{
    console.log(reason)
  })
},


getNow(){
    var date = new Date();
    var year = date.getFullYear();
    var month = parseInt(date.getMonth()+1)>9?parseInt(date.getMonth()+1):'0'+ parseInt(date.getMonth()+1);
    var day = date.getDate()>9?date.getDate() : '0' + date.getDate();
    return year +' '+month+'-'+day;
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