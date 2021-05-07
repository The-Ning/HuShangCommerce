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
    fileList:[],
    imgCloudPaths:[]  // 图片上传到云端后的路径存储数组
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
  afterRead(event) {
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
        // 上传完成需要更新 fileList
        const { fileList = [] } = this.data;
        file.forEach(function(e){  
          fileList.push({ ...file,url:e.url });
        });
      
        this.setData({ fileList});
        console.log(this.data.fileList[0]);
  },
  
  deleteImage(event){
    console.log(event);
    let that=this;
          const { fileList = [] } = that.data;
          fileList.splice(event.detail.index, 1)
          that.setData({ fileList });
  },
  
  // 表单提交函数
  formSubmit(e){
    /*
    wx.showLoading({
      title: '发表中',
    })
    */
    e.detail.value.userInfo = wx.getStorageSync('userInfo')
    // 获取上传图片的临时url数组
    const temUrls = [];
    this.data.fileList.forEach(item=>{
      temUrls.push(item.url)
    })
   this.uploadImgtoCloud(temUrls);
   /*
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
    */
  },

  
  // 根据临时图片路径数组，将图片上传到云端，并返回云端图片url
  uploadImgtoCloud(arr){
    const cloudPaths = this.data.imgCloudPaths;
   arr.forEach(item=>{
    wx.cloud.uploadFile({
      filePath:item,
      name: 'test',
      cloudPath: 'imgs/' + Date.now()+item.match(/\.[^.]+?$/)[0],
      success (res){
          console.log(res)
          cloudPaths.push(res.fileID) //云存储图片路径,可以把这个路径存到集合，要用的时候再取出来
      }
    })
   })
   this.setData({
    imgCloudPaths:cloudPaths
   })
   console.log(this.data.imgCloudPaths)
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