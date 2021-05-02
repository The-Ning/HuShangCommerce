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
dates:'',

list1:[
  {_id:'1',date:'2021-5-1',clickload:20,imgsrc:['https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3401709509,766202338&fm=26&gp=0.jpg',
  'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3401709509,766202338&fm=26&gp=0.jpg',
  'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3401709509,766202338&fm=26&gp=0.jpg',
  'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3401709509,766202338&fm=26&gp=0.jpg',
  'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3401709509,766202338&fm=26&gp=0.jpg',
  'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2401160306,2584571540&fm=26&gp=0.jpg'],
  avatar:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2401160306,2584571540&fm=26&gp=0.jpg',content:'小迪，你知道吗，我喜欢你很久了，从第一眼见到你就无法自拔是多少'
  +'实打实大苏打飒飒的飒飒实打实大苏打',userInfo:{openid:'123456',nickname:'ning'}
},
  {_id:'1',date:'2021-5-1',clickload:20,imgsrc:['https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3401709509,766202338&fm=26&gp=0.jpg',
  'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3401709509,766202338&fm=26&gp=0.jpg'],
  avatar:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2401160306,2584571540&fm=26&gp=0.jpg',content:'小迪，你知道吗，我喜欢你很久了，从第一眼见到你就无法自拔是多少'
  +'实打实大苏打飒飒的飒飒实打实大苏打',userInfo:{openid:'123456',nickname:'ning'}
},
{_id:'1',date:'2021-5-1',clickload:20,imgsrc:['https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3401709509,766202338&fm=26&gp=0.jpg',
'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3401709509,766202338&fm=26&gp=0.jpg'],
avatar:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2401160306,2584571540&fm=26&gp=0.jpg',content:'小迪，你知道吗，我喜欢你很久了，从第一眼见到你就无法自拔是多少'
+'实打实大苏打飒飒的飒飒实打实大苏打',userInfo:{openid:'123456',nickname:'ning'}
},
{_id:'1',date:'2021-5-1',clickload:20,imgsrc:[
'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3401709509,766202338&fm=26&gp=0.jpg'],
avatar:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2401160306,2584571540&fm=26&gp=0.jpg',content:'小迪，你知道吗，我喜欢你很久了，从第一眼见到你就无法自拔是多少'
+'实打实大苏打飒飒的飒飒实打实大苏打',userInfo:{openid:'123456',nickname:'ning'}
},
{_id:'1',date:'2021-5-1',clickload:20,
  avatar:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2401160306,2584571540&fm=26&gp=0.jpg',content:'小迪，你知道吗，我喜欢你很久了，从第一眼见到你就无法自拔是多少'
  +'实打实大苏打飒飒的飒飒实打实大苏打',userInfo:{openid:'123456',nickname:'ning'}
  },
  {_id:'1',date:'2021-5-1',clickload:20,imgsrc:[
    'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3401709509,766202338&fm=26&gp=0.jpg'],
    avatar:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2401160306,2584571540&fm=26&gp=0.jpg',content:'小迪，你知道吗，我喜欢你很久了，从第一眼见到你就无法自拔是多少'
    +'实打实大苏打飒飒的飒飒实打实大苏打',userInfo:{openid:'123456',nickname:'ning'}
    },
    {_id:'1',date:'2021-5-1',clickload:20,imgsrc:['https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3401709509,766202338&fm=26&gp=0.jpg',
    'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3401709509,766202338&fm=26&gp=0.jpg',
    'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3401709509,766202338&fm=26&gp=0.jpg',
    'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3401709509,766202338&fm=26&gp=0.jpg',
    'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3401709509,766202338&fm=26&gp=0.jpg',
    'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2401160306,2584571540&fm=26&gp=0.jpg'],
    avatar:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2401160306,2584571540&fm=26&gp=0.jpg',content:'小迪，你知道吗，我喜欢你很久了，从第一眼见到你就无法自拔是多少'
    +'实打实大苏打飒飒的飒飒实打实大苏打',userInfo:{openid:'123456',nickname:'ning'}
  },
  {_id:'1',date:'2021-5-1',clickload:20,
  avatar:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2401160306,2584571540&fm=26&gp=0.jpg',content:'小迪，你知道吗，我喜欢你很久了，从第一眼见到你就无法自拔是多少'
  +'实打实大苏打飒飒的飒飒实打实大苏打',userInfo:{openid:'123456',nickname:'ning'}
  },
  {_id:'1',date:'2021-5-1',clickload:20,imgsrc:['https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3401709509,766202338&fm=26&gp=0.jpg',
  'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3401709509,766202338&fm=26&gp=0.jpg',
  'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3401709509,766202338&fm=26&gp=0.jpg',
  'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3401709509,766202338&fm=26&gp=0.jpg',
  'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3401709509,766202338&fm=26&gp=0.jpg',
  'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2401160306,2584571540&fm=26&gp=0.jpg'],
  avatar:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2401160306,2584571540&fm=26&gp=0.jpg',content:'小迪，你知道吗，我喜欢你很久了，从第一眼见到你就无法自拔是多少'
  +'实打实大苏打飒飒的飒飒实打实大苏打',userInfo:{openid:'123456',nickname:'ning'}
},
{_id:'1',date:'2021-5-1',clickload:20,
  avatar:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2401160306,2584571540&fm=26&gp=0.jpg',content:'小迪，你知道吗，我喜欢你很久了，从第一眼见到你就无法自拔是多少'
  +'实打实大苏打飒飒的飒飒实打实大苏打',userInfo:{openid:'123456',nickname:'ning'}
  }
  
],
list2:[
  {_id:'1',date:'2021-5-1',clickload:20,
  avatar:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2401160306,2584571540&fm=26&gp=0.jpg',content:'小迪，你知道吗，我喜欢你很久了，从第一眼见到你就无法自拔是多少'
  +'实打实大苏打飒飒的飒飒实打实大苏打',userInfo:{openid:'123456',nickname:'ning'}
  }
 
]
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
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['size'],
      actions: ['updateNum']
    });
   this.setData({
     dates:this.getNow()
   })
   
    
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