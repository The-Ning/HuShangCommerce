// pages/index/index.js
import { createStoreBindings } from'mobx-miniprogram-bindings'
import { store } from '../../store/store'


const db = wx.cloud.database();
const _ = db.command;
Page({

  
  /**
   * 页面的初始数据//
   */
  data: {
   name:'',
   id:0,
   classify:[
     
   ],
   booklist:[]
  },

   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['size'],
      actions: ['updateNum']
    })
  },

  // 获取书籍类商品信息并渲染
  getBookShop(){
      db.collection('shops').where({
        Id:_.eq(1)
      }).get().then(res=>{
        this.setData({
          booklist:res.data
        }
      )})
  },
  // 查询数据库信息
  
  
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
    console.log(res);
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