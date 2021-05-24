const appInstance = getApp()

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
       wx.cloud.callFunction({
         name:'getopenid'
       }).then(result=>{
          console.log(result)
          that.setData({
            openid:result.result
          })
          wx.setStorageSync('openid', result.result)
          setTimeout(()=>{
           that.onLoad()
          },500)
       })
           
         
       
    
    });

    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    appInstance.globalData.mypublishChange = false;
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
    }
   
    
  },

  queryMypublish(){
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

  history(){
    let now = new Date();
    let year = now.getFullYear();
    let month = parseInt(now.getMonth()+1);
    let day = now.getDate();
    let date = `${month}/${day}`

    const history = wx.getStorageSync('history')
    if(history == '' || history[0].day != date)
    wx.request({
      url: `https://v.juhe.cn/todayOnhistory/queryEvent.php?key=bb8c674099eb6f0e4250a91aca42dc07&date=${date}`,
      success:function(res){
       console.log(res.data.result)
       if(res.data.result != null){
        wx.setStorageSync('history', res.data.result)
       }
      },
      fail:function(reason){
        console.log(reason)
      }
    })

    wx.navigateTo({
      url: `../history/history?date=${year}-${month}-${day}&showdate=${month}月${day}日`
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
    if(appInstance.globalData.mypublishChange){
      this.onLoad()
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
    this.onLoad()
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