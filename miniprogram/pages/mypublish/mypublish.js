import Toast from '../../miniprogram_npm/@vant/weapp//toast/toast';
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
    wx.setNavigationBarTitle({
      title: '我的发布',
    })
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
    });
  this.setData({
    openid:wx.getStorageSync('openid'),
    userInfo:wx.getStorageSync('userInfo')
  })

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
      Toast.clear
      result.push(...res.result)
      this.setData({
        mypublishArr:result
      })
      
    }).catch(reason=>{
      console.log(reason)
    })
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
        wx.cloud.callFunction({
          name:'deleteList',
          data:{
            _id:e.currentTarget.dataset._id,
            category:e.currentTarget.dataset.category
          }
        }).then(res1=>{
          this.data.mypublishArr.splice(e.currentTarget.dataset.index,1)
          if(e.currentTarget.dataset.category == 'love'){
            let list1 = wx.getStorageSync('list1')
            list1.forEach((item,index)=>{
              if(item._id == e.currentTarget.dataset._id){
                list1.splice(index,1)
                wx.setStorage({
                  data: list1,
                  key: 'list1',
                })
                return
              }
            }) 
          }
          if(e.currentTarget.dataset.category == 'findItem'){
            let list2 = wx.getStorageSync('list2')
            list2.forEach((item,index)=>{
              if(item._id == e.currentTarget.dataset._id){
                list2.splice(index,1)
                wx.setStorage({
                  data: list2,
                  key: 'list2',
                })
                return
              }
            }) 
          }
          if(e.currentTarget.dataset.category == 'campus'){
            let list3 = wx.getStorageSync('list3')
            list3.forEach((item,index)=>{
              if(item._id == e.currentTarget.dataset._id){
                list3.splice(index,1)
                wx.setStorage({
                  data: list3,
                  key: 'list3',
                })
                return
              }
            }) 
          }
          this.setData({
            mypublishArr:this.data.mypublishArr
          })
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