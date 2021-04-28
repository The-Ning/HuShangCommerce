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
   booklist:[],
   shoplist:[{shopname:1},{shopname:2}],
   list: [{
    id: 174,
    userid: 10,
    title: "日本岚山、和服一日游",
    banner: "cloud://one-ev4od.6f6e-one-ev4od-1302814385/imgs/shops/datastruct.jpg",
    points: 6,
    like: "62",
    userinfo: {
      id: 10,
      nickName: "李诗源",
      //用户头像
      avatarurl: "https://pic3.zhimg.com/80/v2-fd0a58741fdf20f256c755719f81871e_hd.jpg"
    },
    islike: 0
  },
  {
    id: 173,
    userid: 9,
    title: "日本阿寒湖一日游",
    banner: "https://hbimg.huabanimg.com/ee5bf07b84fead3d57b445d2e7fa8eb6afe827c617e9c-ha1fZH_fw658",
    points: 7,
    like: "92",
    userinfo: {
      id: 9,
      nickName: "大飞狼",
      avatarurl: "https://pic3.zhimg.com/80/v2-fd0a58741fdf20f256c755719f81871e_hd.jpg"
    },
    islike: 0
  },
  {
    id: 172,
    userid: 8,
    title: "二次璧大乱斗东京动漫游",
    banner: "http://img1qn.moko.cc/2019-08-12/235e9bab-046e-4fea-afc2-4a049d81774e.jpg?imageView2/2/w/915/h/915/q/85",
    points: 4,
    like: "41",
    userinfo: {
      id: 8,
      nickName: "黄飞鸿",
      avatarurl: "https://pic3.zhimg.com/80/v2-fd0a58741fdf20f256c755719f81871e_hd.jpg"
    },
    islike: 0
  },
  {
    id: 100,
    userid: 314,
    title: "心和身体总要有一个在路上?",
    banner: "http://img.mb.moko.cc/2019-05-18/285bd040-2e62-4e1b-b0e8-91351c1f3c67.jpg?imageView2/2/w/915/h/915",
    points: 5,
    like: "110",
    userinfo: {
      id: 314,
      nickName: "二夏",
      avatarurl: "https://pic3.zhimg.com/80/v2-fd0a58741fdf20f256c755719f81871e_hd.jpg"
    },
    islike: 0
  },
  {
    id: 99,
    userid: 312,
    title: "新疆两日游",
    banner: "http://img.mb.moko.cc/2019-04-26/d4f1905c-3952-42be-9214-72260b97b0be.jpg?imageView2/2/w/915/h/915",
    points: 5,
    like: "99",
    userinfo: {
      id: 312,
      nickName: "Tohsaka",
      avatarurl: "https://pic3.zhimg.com/80/v2-fd0a58741fdf20f256c755719f81871e_hd.jpg"
    },
    islike: 0
  }
]
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