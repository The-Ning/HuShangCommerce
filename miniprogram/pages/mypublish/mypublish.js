const appInstance = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    openid:'',
    mypublishArr:[],
    list:[],
    favor_img: "https://z3.ax1x.com/2021/05/20/gT0Cd0.png",
    favor: "https://z3.ax1x.com/2021/05/20/gT0kJU.png"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     //设置回调，防止小程序globalData拿到数据为null    
     appInstance.getopenid(res => {
      console.log("write cb res", appInstance.globalData.openid)
      this.setData({
        openid: res
      })
    })
    wx.setTabBarStyle({
      color: 'black',
      selectedColor: '#87CEFA',
      borderStyle: 'white'
    })
    wx.setNavigationBarTitle({
      title: '我的发布',
    })
  this.setData({
    userInfo:wx.getStorageSync('userInfo'),
    mypublishArr:JSON.parse(options.mypublishArr)
  })
  },
  praiseThis(){
     wx.showToast({
       title: '此处未开通点赞',
     })
  },
  deleteThis(e){
    console.log(e)
  wx.showModal({
    title:'删除确认',
    content:'确认删除？不可恢复',
    cancelColor: 'cancelColor',
    cancelText:'不了',
    confirmText:'删了',
    success:res=>{
      if (res.confirm) {
        wx.showLoading({
          title: '删除中',
        })
        wx.cloud.callFunction({
          name:'deleteList',
          data:{
            _id:e.currentTarget.dataset._id,
            category:e.currentTarget.dataset.category,
            imglist:e.currentTarget.dataset.imglist
          }
        }).then(res1=>{
          this.data.mypublishArr.splice(e.currentTarget.dataset.index,1)
          // 获取点赞缓存，删除对应的点赞信息
          let likeCollection = wx.getStorageSync('likeCollection')
          if(e.currentTarget.dataset.category == 'love'){
            // 删除云存储图片
            let list1 = wx.getStorageSync('list1')
            list1.forEach((item,index)=>{
              if(item._id == e.currentTarget.dataset._id){
                list1.splice(index,1)
               delete likeCollection[`list1-${item._id}`]
                wx.setStorage({
                  data: list1,
                  key: 'list1',
                })
                return
              }
            }) 
          }
         else if(e.currentTarget.dataset.category == 'commerce'){
           
            let list2 = wx.getStorageSync('list2')
            list2.forEach((item,index)=>{
              if(item._id == e.currentTarget.dataset._id){
                list2.splice(index,1)
                delete likeCollection[`list2-${item._id}`]
                wx.setStorage({
                  data: list2,
                  key: 'list2',
                })
                return
              }
            }) 
          }
        else  if(e.currentTarget.dataset.category == 'findItem'){
            let list3 = wx.getStorageSync('list3')
            list3.forEach((item,index)=>{
              if(item._id == e.currentTarget.dataset._id){
                list3.splice(index,1)
                delete likeCollection[`list3-${item._id}`]
                wx.setStorage({
                  data: list3,
                  key: 'list3',
                })
                return
              }
            }) 
          }
          else{
            let list4 = wx.getStorageSync('list4')
            list4.forEach((item,index)=>{
              if(item._id == e.currentTarget.dataset._id){
                list4.splice(index,1)
                delete likeCollection[`list4-${item._id}`]
                wx.setStorage({
                  data: list4,
                  key: 'list4',
                })
                return
              }
            }) 
          }
          wx.setStorage({
            data: likeCollection,
            key: 'likeCollection',
          })
          this.setData({
            mypublishArr:this.data.mypublishArr
          })
          appInstance.globalData.mypublishChange = true;
          wx.hideLoading()
        })
        
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
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
// 增加评论函数
remark(e){
  let item = JSON.stringify(e.target.dataset.item)
  wx.navigateTo({
    url: '../remark/remark?item='+item,
  }).then(res=>{
    console.log(res);
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