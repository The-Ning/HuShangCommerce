// miniprogram/pages/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    content:'',
    title:'',
    openid:null,
    checked:false,
    //字数限制
    maxWord:300,
    currentWord:0,
    fileList:[],
    category:'love',
    location:null,
       // 传到数据库的图片云端路径数组
    imgCloudPaths:[]  // 图片上传到云端后的路径存储数组
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setTabBarStyle({
      color: 'black',
      selectedColor: '#87CEFA',
      borderStyle: 'white'
    })
    const userInfo = wx.getStorageSync('userInfo')
    const openid = wx.getStorageSync('openid')
    if(userInfo instanceof Object && openid !=null){
      this.setData({
        userInfo,
        openid
      })
    }

  },
 
  onChange(event) {
    this.setData({
      category: event.detail,
    })
    console.log(this.data.category)
  },


  limitWord:function(e){
    var that = this;
    var value = e.detail.value;
    var wordLength = parseInt(value.length); //解析字符串长度转换成整数。
    if (that.data.maxWord < wordLength) {
      return ;
    }
    that.setData({
      currentWord: wordLength 
    });
  },


  tologin(){
      wx.switchTab({
        url: '../mine/mine',
      }).then(res=>{console.log(res)})
      .catch(reason=>{
        console.log(reason)
      })
  },
  afterRead(event) {
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
        // 上传完成需要更新 fileList
        const { fileList = [] } = this.data;
        file.forEach(function(e){  
          fileList.push({ ...file,url:e.url });
        });
      
        this.setData({ fileList});
  },
  
  deleteImage(event){
    console.log(event);
    let that=this;
          const { fileList = [] } = that.data;
          fileList.splice(event.detail.index, 1)
          that.setData({ fileList });
  },
  
  // 表单提交函数
  formSubmit(e){
    
    if(!e.detail.value.title){
       wx.showToast({
         title: '标题不能为空',
       })
       return;
    }
    wx.showLoading({
      title: '发表中',
    })
    if(this.data.checked){
      e.detail.value.location = this.data.location;
    }
    e.detail.value.remarks = [];  // 存储评论的数组
    e.detail.value.userInfo = this.data.userInfo;
    e.detail.value.openid = this.data.openid;
    e.detail.value.category = this.data.category;
    // 获取上传图片的临时url数组
    if(this.data.fileList.length){
    const temUrls = [];
    this.data.fileList.forEach(item=>{
      temUrls.push(item.url)
    })
    e.detail.value.imgsrc = [];
    temUrls.forEach(item=>{
    wx.cloud.uploadFile({
      filePath:item,
      cloudPath: 'imgs/' + e.detail.value.category + '/' + Date.now()+item.match(/\.[^.]+?$/)[0],
      success (res){
        e.detail.value.imgsrc.push(res.fileID) //云存储图片路径,可以把这个路径存到集合，要用的时候再取出来
      }
    })
   })
   setTimeout((event)=>{
    event.detail.value.clickload = 1;
    event.detail.value.date = this.getNow();
    console.log(event.detail.value)
      wx.cloud.callFunction({
        name:'publish',
        data:event.detail.value
      }).then(res=>{
        console.log('插入成功',res)
        console.log(event.detail.value)
        wx.hideLoading().then(res1=>{
          
           wx.showToast({
             title: '发布成功',
             icon:'success'
           })
           // 清除发布页面的数据
           this.setData({
            fileList:[],
            title:'',
            content:'',
            checked:false,
            location:null
           })
           
        })
       
      })
  },3000,e)
  }
  else{
 // 用户没有选择图片时
 e.detail.value.clickload = 1;
 e.detail.value.date = this.getNow();
 console.log(e.detail.value)
   wx.cloud.callFunction({
     name:'publish',
     data:e.detail.value
   }).then(res=>{
     console.log('插入成功',res)
     wx.hideLoading().then(res1=>{
        wx.showToast({
          title: '发布成功',
          icon:'success'
        })
        // 清除发布页面的数据
      this.setData({
        title:'',
        content:'',
        checked:false,
        location:null
      })
     })
   
   })
  }
  },
  getNow(){
    var date = new Date();
    var year = date.getFullYear();
    var month = parseInt(date.getMonth()+1)>9?parseInt(date.getMonth()+1):'0'+ parseInt(date.getMonth()+1);
    var day = date.getDate()>9?date.getDate() : '0' + date.getDate();
    var hour = date.getHours()>9?date.getHours():'0'+date.getHours();
    var minute = date.getMinutes()>9?date.getMinutes():'0'+date.getMinutes();
    return year +'-'+month+'-'+day+' '+hour+':'+minute;
  },

  oversize(){
    wx.showToast({
      title: '文件不能超过2M',
    })
  },
 

// 地址处理函数
onInputLocation(e){
 this.setData({
   checked:!this.data.checked
 })
 if(this.data.checked){
  wx.chooseLocation()
  .then(res=>{
    console.log(res)
    this.setData({
      location:res.name
    })
  }).catch(reason=>{
    this.setData({
      checked:false
    })
  })
 }
 
 // 取消了勾选位置
 else{
   this.setData({
     location:null,
     checked:false
   })
 }
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
    const userInfo = wx.getStorageSync('userInfo')
    const openid = wx.getStorageSync('openid')
    if(userInfo instanceof Object && openid !==null){
      this.setData({
        userInfo,
        openid
      })
    }
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