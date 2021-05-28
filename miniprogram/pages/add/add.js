const appInstance = getApp()
Page({

  data: {
    userInfo:null,
    content:'',
    title:'',
    openid:'123',
    checked:false,
    //字数限制
    maxWord:300,
    currentWord:0,
    fileList:[],
    imgError:true,
    category:'love',
    location:'',
    categoryList:['love','commerce','findItem','campus'],
    highlight:['highlight'],
       // 传到数据库的图片云端路径数组
    imgCloudPaths:[]  // 图片上传到云端后的路径存储数组
  },
  onLoad: function (options) {
    //设置回调，防止小程序globalData拿到数据为null    
  appInstance.getopenid(res => {
   console.log("write cb res", appInstance.globalData.openid)
   this.setData({
     openid:appInstance.globalData.openid
   })
   console.log(this.data.openid)
 })
   wx.setTabBarStyle({
     color: 'black',
     selectedColor: '#87CEFA',
     borderStyle: 'white'
   })
 
 const userInfo = wx.getStorageSync('userInfo')
   if(userInfo instanceof Object){
     this.setData({
       userInfo
     })
   }

 },
 
  onChange(event) {
    let index = event.currentTarget.dataset.index;
    console.log(event.currentTarget.dataset.index,typeof event.currentTarget.dataset.index)
    this.setData({
      category: this.data.categoryList[index],
    })
    console.log(this.data.category)
    var highlight = []
    for (var i = 0; i < this.data.categoryList; i++){
      highlight[i] = ''
    }
    highlight[index] = 'highlight'
    this.setData({ highlight: highlight})
  },
 

  /**
   * 生命周期函数--监听页面加载
   */
 
 
  


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
    wx.showLoading({
      title: '图片审核中',
    })
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
        // 上传完成需要更新 fileList
        const { fileList = [] } = this.data;
        file.forEach(function(e){  
          fileList.push({ ...file,url:e.url });
        });
      
        this.setData({ fileList});
        let length = this.data.fileList.length
    //使用getFileSystemManager获取图片的Buffer流
    this.data.fileList.forEach((item,index)=>{
      console.log(item.url)
      wx.getFileSystemManager().readFile({
        filePath: item.url,                   
        success: (res)=>{            
          const buffer = res.data
          wx.cloud.callFunction({
            name:'checkSecure',
            data:{
              buffer:buffer,
              checkCategory:'image'
            }
          }).then(res1=>{
            console.log(res1)
            if(res1.result.errCode != 0){
              this.setData({
                imgError:false
              })
            }
          }).catch(reason=>{
            console.log(reason)
          })
        }
      })
    })
    setTimeout(()=>{
      wx.hideLoading()
      if(!this.data.imgError){
        wx.showModal({
          title: '违规提示',
          content: `图片违规`,
          showCancel: false,
          confirmColor: '#DC143C'
        })
      }
     
    },length*400)
  },
  
  deleteImage(event){
    console.log(event);
    let that=this;
          const { fileList = [] } = that.data;
          fileList.splice(event.detail.index, 1)
          that.setData({ fileList });
  },
  
  // 表单提交函数
  formSubmit(){
    let obj = {}
    if(!this.data.title){
       wx.showToast({
         title: '标题不能为空',
       })
       return;
    }
    if(this.data.openid== ''){
      wx.showLoading({
        title:'刷新中',
      })
      setTimeout(()=>{
        wx.hideLoading()
        this.onLoad()
        this.formSubmit()
      },1000)
      
       return
     }
     obj.title = this.data.title
    // 如果选择了地址
    if(this.data.checked){
      obj.location = this.data.location;
    }
    obj.remarks = [];  // 存储评论的数组
    obj.userInfo = this.data.userInfo;
    obj.openid = this.data.openid;
    obj.category = this.data.category;
    
    // 获取上传图片的临时url数组
    if(this.data.fileList.length){
      if(!this.data.imgError){
        wx.showModal({
          title: '违规提示',
          content: `图片违规`,
          showCancel: false,
          confirmColor: '#DC143C'
        })
        return
      }
      else{
        wx.showLoading({
          title: '发表中',
        })
      
    const temUrls = [];
    this.data.fileList.forEach(item=>{
      temUrls.push(item.url)
    })
    obj.imgsrc = [];
    temUrls.forEach(item=>{
    wx.cloud.uploadFile({
      filePath:item,
      cloudPath: 'imgs/' + obj.category + '/' + Date.now()+item.match(/\.[^.]+?$/)[0],
      success (res){
        obj.imgsrc.push(res.fileID) //云存储图片路径,可以把这个路径存到集合，要用的时候再取出来
      }
    })
   })
   setTimeout((obj)=>{

    obj.clickload = 1;
    obj.date = this.getNow();
    console.log(obj)
      wx.cloud.callFunction({
        name:'publish',
        data:obj
      }).then(res=>{
        console.log('插入成功',res)
        console.log(obj)
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
  },3000,obj)
}
  }
  else{
 // 用户没有选择图片时
 obj.clickload = 1;
 obj.date = this.getNow();
 this.msgIsSecure(obj);
 }
  },
  // 审核内容函数，文本
msgIsSecure(obj){
  wx.showLoading({
    title: '审核中',
  })
  wx.cloud.callFunction({
     name:'checkSecure',
     data:{
       checkCategory:'text',
       content:obj.title+obj.content
     }
   }).then(res=>{
     console.log(res)
     if(res.result.errCode != 0){
       wx.showModal({
         title: '违规提示',
           content: '输入的内容违规',
           showCancel: false,
           confirmColor: '#DC143C'
       })
     }
     else{
      wx.showLoading({
        title: '发表中',
      })
       //文本验证成功，发布上传
      wx.cloud.callFunction({
        name:'publish',
        data:obj
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
   }).catch(reason=>{
     console.log(reason)
    
   })
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
     location:'',
     checked:false,
     imgError:true
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