// pages/index/index.js
import { createStoreBindings } from'mobx-miniprogram-bindings'
import { store } from '../../store/store'



Page({

  
  /**
   * 页面的初始数据//
   */
  data: {
   // tab切换
currentTab: 0,
list:[
  {_id:'1',clickload:20,imgsrc:'../../imgs/index/book.png',title:'我要表白邓子豪',content:'豪，你知道吗，我喜欢你很久了，从第一眼见到你就无法自拔',userInfo:{openid:'123456',nickname:'ning'}}
]
  },
  swichNav: function (e) {
 
    var that = this;
     
    if (this.data.currentTab === e.target.dataset.current) {
     
    return false;
     
    } else {
     
    that.setData({
     
    currentTab: e.target.dataset.current,
     
    })
     
    }
     
    },
     
    swiperChange: function (e) {
     
     
    this.setData({
     
    currentTab: e.detail.current,
     
    })
     
     
    },
    
    
   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['size'],
      actions: ['updateNum']
    });

    
  },

  
  
  
  // 给数据库插入信息
  addData(){
    wx.showLoading({
      title:'数据正在插入中。。',
      mask:true
    })
  db.collection('test').add({
    data:{
    _id:'5',
    name:'still-Ning',
    age:22,
    boy:true
    }
  }).then(res=>{
    wx.hideLoading();
  })
  },

 
  

  // 修改数据
  

  //删除数据
  delData(){
    db.collection('test').where({
      account:'NingZhu'
    }).remove().then(res =>{
      console.log(res);
    })
  },
  
  btnHandler(e) {
   
    this.updateNum(e.target.dataset.step)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.storeBindings.destroyStoreBindings()
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