// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  userInfo:null,
  openid:null,
  mypublishArr:[],
  myclickload:0
  },

  getUserProfile(){
    let that = this;
    wx.getUserProfile({
      desc: '用于完善用户资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    }).then(res=>{
      wx.setStorageSync('userInfo', res.userInfo)
      this.setData({
        userInfo:res.userInfo
      })
      console.log(res)
      wx.login().then(res=>{
        if(res.code){
          wx.request({
            url:'https://api.weixin.qq.com/sns/jscode2session?'+
            'appid=wxba4ca0d1f2046721&secret=6a67ac618bfefe4e2001d685610f8851&js_code='+res.code+'&grant_type=authorization_code',
            data:{
              code:res.code
            },
            success(result){
             console.log(that)
             that.setData({
               openid:result.data.openid
             })
             wx.setStorageSync('openid', result.data.openid)
           
            }
          })
        }else{
          console.log('登陆失败');
        }
      });
    });

    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setTabBarStyle({
      color: 'black',
      selectedColor: '#87CEFA',
      borderStyle: 'white'
    })
    // 先从本地缓存找用户登录信息
    let userInfo = wx.getStorageSync('userInfo')
    let openid = wx.getStorageSync('openid')
    if(userInfo){
      this.setData({
        userInfo:userInfo,
        openid:openid
      })
      console.log(userInfo)
    }
    this.queryMypublish()
    // 获取我的获赞量
    setTimeout(()=>{
      let myclickload = 0;
      this.data.mypublishArr.forEach((item)=>{
        myclickload += item.clickload;
      })
      this.setData({
        myclickload:myclickload
      })
    },1200)
    
  },

  queryMypublish(){
    // 若缓存里有
    const mypublishArr = wx.getStorageSync('mypublish')
    if(mypublishArr){
      this.setData({
        mypublishArr:mypublishArr
      })
      return
    }
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
    wx.setStorageSync('mypublish', result)
  }).catch(reason=>{
    console.log(reason)
  })
 })
  },


  mypublish(){
    if(!this.data.userInfo ){
      wx.showToast({
        title: '请先登录',
      })
      return;
    }
    
    // 已经登录
    wx.navigateTo({
      url: `../mypublish/mypublish?mypublishArr=${JSON.stringify(this.data.mypublishArr)}`,
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