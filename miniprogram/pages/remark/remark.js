const appInstance = getApp()
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
    isLouzhu:true,
    remarking:false,
    imgsClass:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const information = JSON.parse(options.item);
    let userInfo;
   //设置回调，防止小程序globalData拿到数据为null    
   appInstance.getopenid(res => {
    console.log("write cb res", appInstance.globalData.openid)
    userInfo = wx.getStorageSync('userInfo');
    this.setData({
      openid: res,
      information:information,
      remarkArr:information.remarks,
      userInfo:information.userInfo,
      myUserInfo:userInfo,
      isLouzhu:res == information.openid
    })

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

  if(this.data.remarking){
    return
  }
  this.handleRemarkResult(this.data.information.category)
},

handleRemarkResult(category){
  wx.showLoading({
    title: '内容审核中',
  })
  this.setData({
    remarking:true
  })
  // 先审核内容
  wx.cloud.callFunction({
    name:'checkSecure',
    data:{
      checkCategory:'text',
      content:this.data.remarkContent
    }
  }).then(res1=>{
    wx.hideLoading()
    if(res1.result.errCode != 0){
      Notify({ type: 'warning',
       message: '内容不合法',
       duration:1000
       });
       this.setData({
        remarking:false
      })
    }
    else{
      wx.showLoading({
        title: '发布中',
      })
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
        wx.hideLoading()
        console.log(res)
        Notify({ type: 'success',
         message: '吐槽成功！',
         duration:1500
        });
        this.data.information.remarks = res.result
        this.setData({
          information:this.data.information,
          remarkContent:'',
          remarking:false
        })
        appInstance.globalData.myremarkChange = true
      }).catch(reason=>{
        console.log(reason)
      })
    }
  })
  
},

// 删除评论函数
deleteThis(e){
  wx.showLoading({
    title: '删除中',
  })
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
    appInstance.globalData.myremarkChange = true
    wx.hideLoading()
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

  person(e){
      let openid = e.currentTarget.dataset.openid
      wx.navigateTo({
        url: `../person/person?openid=${openid}`,
      })
    
   
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
    return {
      title: this.data.information.title,    //自定义标题   string
      path: '545'  //这个地址需要把页面路径拼接的参数发送出去,直写页面地址的话，别人进入会是空的页面
    }
  },

  onShareTimeline(){
    return {
      title: this.data.information.title,
      imageUrl:this.data.information.imgsrc[0] || 'https://z3.ax1x.com/2021/05/27/2CRcC9.jpg'
    }
  }
})