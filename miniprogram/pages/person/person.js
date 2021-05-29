const appInstance = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  information:{},
  productions:[],
  clickload:0,
  openid:null,
  show:false,
  myopenid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title:'加载中'
    })
     //设置回调，防止小程序globalData拿到数据为null    
   appInstance.getopenid(res => {
    console.log("write cb res", appInstance.globalData.openid)
    this.setData({
      myopenid:res
    })
   });

    
    let openid = options.openid;
    console.log(openid)
    this.setData({
      openid:openid
    })
    wx.cloud.callFunction({
      name:'person',
      data:{
        openid:openid,
        way:'query'
      }
    }).then(res=>{
      console.log(res)
      this.setData({
        information:res.result.data[0],
        clickload:res.result.data[0].clickload
      })
      wx.hideLoading()
    }).catch(reason=>{
      console.log(reason)
    })

    // 获取作品
const arr = ['love','commerce','findItem','campus']
const result = []
 arr.forEach(item=>{
  wx.cloud.callFunction({
    name:'mypublish',
    data:{
      openid:openid, 
      category:item
    }
  }).then(res=>{
    result.push(...res.result)
    this.setData({
      productions:result
    })
  }).catch(reason=>{
    console.log(reason)
  })
 })
  },

   parise(){

    this.data.clickload+=1;
    this.setData({
      clickload:this.data.clickload
    })
    
     wx.cloud.callFunction({
       name:'person',
       data:{
         openid:this.data.information.openid,
         way:'parise'
       }
     }).then(res=>{
       console.log(res)
     }).catch(reason=>{
       console.log(reason)
     })
   },
   
   cancel(){
    this.setData({
      show:false
    })
   },

   // 提交修改信息表单函数
   formSubmit(e){
     let signature = e.detail.value.signature
     let location = e.detail.value.location
     let campus = e.detail.value.campus
    console.log(e.detail.value)
    console.log(signature,location,campus)
    console.log(this.data.openid)
    if(signature == '' || location == '' || campus == ''){
      wx.showToast({
        title: '不能为空~',
      })
      return
    }

    else{
      wx.cloud.callFunction({
        name:'person',
        data:{
          way:'modify',
          openid:this.data.openid,
          signature:signature,
          campus:campus,
          location:location
        }
      }).then(res=>{
        console.log(res)
        this.data.information.location = location
        this.data.information.campus = campus
        this.data.information.signature = signature
        this.setData({
          information:this.data.information,
          show:false
        })
      }).catch(reason=>{
        console.log(reason)
      })
    }
   },

   showForm(){
     this.setData({
       show:true
     })
   },

   toRemark(e){
    console.log(e.currentTarget.dataset.item)
    let item = JSON.stringify(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '../remark/remark?item='+item,
    }).then(res=>{
    
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