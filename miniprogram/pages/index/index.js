// pages/index/index.js
import { createStoreBindings } from'mobx-miniprogram-bindings'
import { store } from '../../store/store'


var db = wx.cloud.database();

Page({

  
  /**
   * 页面的初始数据//
   */
  data: {
   name:'',
   id:0,
   classify:[
     
   ],
   datasturct:{}
  },

   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['size'],
      actions: ['updateNum']
    }),
    this.getData()
  },
  // 查询数据库信息
  getData(){
    db.collection('shops').where({
      Id:1
    }).get().then(res=>{
      this.setData({
        datasturct:res.data[0]
      }
    )
  })},
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

  // 提交表单事件，进数据库
  btnSubmit(res){
 // 解构赋值var {account,password} = res.detail.value;
 // 直接获取对象
 var dataVuale = res.detail.value;
 console.log(dataVuale);
   db.collection('test').add({
     data:dataVuale
   }).then(res=>{
     console.log(res);
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