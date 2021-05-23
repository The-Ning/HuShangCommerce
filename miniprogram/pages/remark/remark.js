// miniprogram/pages/remark/remark.js
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    information:{},
    remarkArr:[],
    openid:null,
    userInfo:{},
    remarkContent:'',
    myUserInfo:null,
    isLouzhu:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const information = JSON.parse(options.item);
    let openid = wx.getStorageSync('openid');
    let userInfo = wx.getStorageSync('userInfo');
    this.setData({
      information:information,
      remarkArr:information.remarks,
      userInfo:information.userInfo,
      openid:openid,
      myUserInfo:userInfo,
      isLouzhu:openid == information.openid
    })
    console.log(this.data.information);
  },
  remarkContent(e){
    this.setData({
      remarkContent:e.detail
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
addRemark(e){
  if(this.data.remarkContent == ''){
    wx.showToast({
      title: '不能为空',
    })
    return
  }
  this.handleRemarkResult(this.data.information.category)
},

handleRemarkResult(category){
  wx.cloud.callFunction({
    name:'addRemark',
    data:{
        category:category,
        id:this.data.information._id,
        openid:this.data.openid,
        content:this.data.remarkContent,
        remarkTime:this.getNow(),
        nickName:this.data.myUserInfo.nickName,
        avatarUrl:this.data.myUserInfo.avatarUrl,
        remarkId:this.data.openid + Date.now()
    }
  }).then(res=>{
    console.log(res)
    Notify({ type: 'success',
     message: '吐槽成功！',
     duration:1500
    });
    this.data.information.remarks = res.result
    this.setData({
      information:this.data.information,
      remarkContent:''
    })
    
  }).catch(reason=>{
    console.log(reason)
  })
},

// 删除评论函数
deleteThis(e){
  console.log(e)
  console.log(e.currentTarget.dataset.remarkid)
  wx.cloud.callFunction({
    name:'deleteRemark',
    data:{
      category:e.currentTarget.dataset.category,
      _id:e.currentTarget.dataset._id,
      remarkId:e.currentTarget.dataset.remarkid
    }
  }).then(res=>{
    this.data.information.remarks.splice(e.currentTarget.dataset.index,1)
    this.setData({
      information:this.data.information
    })
    console.log(res)
  }).catch(reason=>{
    console.log(reason)
  })
},


getNow(){
    var date = new Date();
    var year = date.getFullYear();
    var month = parseInt(date.getMonth()+1)>9?parseInt(date.getMonth()+1):'0'+ parseInt(date.getMonth()+1);
    var day = date.getDate()>9?date.getDate() : '0' + date.getDate();
    return year +' '+month+'-'+day;
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