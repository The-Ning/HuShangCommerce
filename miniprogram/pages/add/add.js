// miniprogram/pages/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    openid:null,
    //字数限制
    maxWord:300,
    currentWord:0,
    images:["http://tmp/hkZ4XUHMUPaB2cf916004753f38ecd8b9557689e949a.jpg", "http://tmp/Yu9sE1TZ23XV855da5a1c1620d6bd065bc406563d70a.jpg", "http://tmp/4urN2QMPOU1se25112f376712a4791dca15fdacc5c71.jpg", "http://tmp/sfsW9dF9mcT62cf916004753f38ecd8b9557689e949a.jpg"]
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

  limitWord:function(e){
    var that = this;
    var value = e.detail.value;
    var wordLength = parseInt(value.length); //解析字符串长度转换成整数。
    if (that.data.maxWord < wordLength) {
      return ;
    }
    that.setData({
      currentWord: wordLength 
    });
  },


  tologin(){
      wx.switchTab({
        url: '../mine/mine',
      }).then(res=>{console.log(res)})
      .catch(reason=>{
        console.log(reason)
      })
  },

  addImg(e){
    let length = this.data.images.length;
    if(length<9){
      let remain = parseInt(9-length);
      wx.chooseImage({
        count: remain,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
      }).then(res=>{
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        const resultarr = this.data.images.concat(tempFilePaths)
        console.log(resultarr)

        this.setData({
          images:resultarr
        })
      }).catch(reason=>{
        console.log(reason)
      })
    }
    
    // 已经选择了九张图片
    else{
      wx.showToast({
        title: '最多9张',
        icon:'success'
      })
    }
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