// pages/index/index.js
import { createStoreBindings } from'mobx-miniprogram-bindings'
const app = require('../../app')


Page({

  
  /**
   * 页面的初始数据//
   */
  data: {
   // tab切换
currentTab: 0,
list1:[],
list2:[],
list3:[],
like:0,
hasChange: false,
favor_img: "../../imgs/like.png",
favor: "../../imgs/like1.png",
dates:''
  },

  getNow(){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()>9?date.getMonth():'0'+date.getMonth();
    var day = date.getDay()>9?date.getDay() : '0' + date.getDay();
    var hour = date.getHours()>9?date.getHours():'0'+date.getHours();
    var minute = date.getMinutes()>9?date.getMinutes():'0'+date.getMinutes();
    return year +'-'+month+'-'+day+' '+hour+'-'+minute;
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
     remark(e){
       console.log(e.target.dataset.remark);
       wx.navigateTo({
         url: '../remark/remark',
       }).then(res=>{
         console.log(res);
       }).catch(reason=>{
         console.log(reason)
       })
     },
    swiperChange: function (e) {
     
     
    this.setData({
     
    currentTab: e.detail.current,
     
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
    
   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
   let value =   wx.getStorageSync('openid')
     
  
   
  wx.cloud.callFunction({
    name:'getLoves'
  }).then(res=>{
    this.setData({
      list1:res.result
    })
  }).catch(reason=>{
    console.log(reason)
  })
   
    
  },

  
  // 点赞函数
  praiseThis(e){
    var that = this;
    let index = e.currentTarget.dataset.index;
    var hasChange = that.data.list1[index].hasChange;
    if (hasChange !== undefined) {
      var onum = parseInt(that.data.list1[index].clickload);
      console.log(hasChange);
      if (hasChange === true) {
        that.data.list1[index].clickload = (onum - 1);
        that.data.list1[index].hasChange = false;
      } else {
        that.data.list1[index].clickload = (onum + 1);
        that.data.list1[index].hasChange = true;
      }
      this.setData({
       list1: that.data.list1,
      })
    };
    wx.cloud.callFunction({
      name:'pariseThis',
      data:{
        openid: wx.getStorageSync('openid'),//我的ID
        _id:e.currentTarget.dataset._id,  //文章id
        likeOr:this.data.list1[index].hasChange
      }
    }).then(res=>{
      console.log(res.result)
     // 动态更新赞量
      /*
     const currencyLike = SelectorQuery.selectAll('.clickload1')[index];
     currencyLike.value += 1;
     */
    });
   

    
    var pages = getCurrentPages();//当前页面栈
    if (pages.length > 1) {
      var beforePage = pages[pages.length - 2];//获取上一个页面实例对象
      beforePage.changeData();//触发父页面中的方法
    }
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