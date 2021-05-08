// pages/index/index.js
import { createStoreBindings } from'mobx-miniprogram-bindings'
const userInfo = wx.getStorageSync('userInfo')


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
index:null,
userInfo:null,
openid:null,
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
    
   let openid =   wx.getStorageSync('openid')
   const userInfo = wx.getStorageSync('userInfo')
   if(openid != '' && userInfo != ''){
     this.setData({
       openid:openid,
       userInfo:userInfo
     })
   }
   // 初始化 本地点赞判断 对象
   // 保存点赞状态
    let likeCollection = wx.getStorageSync('likeCollection');
    if(!likeCollection){
      wx.setStorageSync('likeCollection', {})
    }
 // 获取表白墙数据并渲染
  wx.cloud.callFunction({
    name:'getLists',
    data:{
      category:'love'
    }
  }).then(res=>{
    this.setData({
      list1:res.result
    })
    console.log(this.data.list1)
   
    this.data.list1.forEach((item,index)=>{
      item['hasChange']=likeCollection['list1-'+index];
    })
    this.setData({
      list1:this.data.list1
    })
  }).catch(reason=>{
    console.log(reason)
  })
 
  // 获取二手交易数据并渲染到list2
  wx.cloud.callFunction({
    name:'getLists',
    data:{
      category:'findItem'
    }
  }).then(res=>{
    this.setData({
      list2:res.result
    })
    console.log(this.data.list2)
   
    this.data.list2.forEach((item,index)=>{
      item['hasChange']=likeCollection['list2-'+index];
    })
    this.setData({
      list2:this.data.list2
    })
  }).catch(reason=>{
    console.log(reason)
  })

// 获取校园生活数据并渲染到list3
wx.cloud.callFunction({
  name:'getLists',
  data:{
    category:'campus'
  }
}).then(res=>{
  this.setData({
    list3:res.result
  })
  console.log(this.data.list3)
 
  this.data.list3.forEach((item,index)=>{
    item['hasChange']=likeCollection['list3-'+index];
  })
  this.setData({
    list3:this.data.list3
  })
}).catch(reason=>{
  console.log(reason)
})
  },
  // 点赞函数
  praiseThis(e){
    var that = this;
    let list = e.currentTarget.dataset.list;
    let index = e.currentTarget.dataset.index;
    let hasChange = !this.data[list][index].hasChange;
      // 当前点击的赞的情况取反
      console.log('当前点击的赞'+hasChange)
    this.setData({
      index
    })
  
   // 判断本地用户是否点赞了该文章
   let details = wx.getStorageSync('likeCollection')
   console.log('缓存里的值:'+details[list+'-'+index])
   var onum = parseInt(that.data[list][index].clickload);
   if(details[list+'-'+index]){  // 如果点赞过
      that.data[list][index].clickload = (onum - 1);
      that.data[list][index].hasChange = false;
   }
     else {
      that.data[list][index].clickload = (onum + 1);
      that.data[list][index].hasChange = true;
    } 
    this.data[list][index].hasChange = hasChange;
    wx.getStorage({
      key: 'likeCollection',
      success:datas=>{
        let obj = datas.data;
        obj[list+'-'+index] = hasChange
        wx.setStorage({
          data: obj,
          key: 'likeCollection',
          success:res=>{
            
            console.log('缓存成功')
          },
          fail:reason=>console.log(reason)
        })
      }
    })
   // wx.setStorageSync('likeCollection', data)
    if(list === 'list1'){
    this.setData({
     list1: that.data[list],
    })
    }
    else if(list === 'list2'){
      this.setData({
        list2: that.data[list],
       })
  
    }
    else if(list === 'list3'){
      this.setData({
        list3: that.data[list],
       })
    }
    console.log(this.data[list][index])
    console.log(this.data[list][index].hasChange)
    wx.cloud.callFunction({
      name:'pariseThis',
      data:{
        openid: wx.getStorageSync('openid'),//我的ID
        _id:e.currentTarget.dataset._id,  //文章id
        likeOr:this.data[list][index].hasChange
      }
    }).then(res=>{
      console.log(res.result)
     // 动态更新赞量

    }).catch(reason=>{
      console.log(reason)
    });
    /*
    var pages = getCurrentPages();//当前页面栈
    if (pages.length > 1) {
      var beforePage = pages[pages.length - 2];//获取上一个页面实例对象
      beforePage.changeData();//触发父页面中的方法
    }
    */
  },

 
  
  btnHandler(e) {
   
    this.updateNum(e.target.dataset.step)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
   
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

let likeCollection = wx.getStorageSync('likeCollection');
// 获取表白墙数据并渲染

wx.cloud.callFunction({
  name:'getLists',
  data:{
    category:'love'
  }
}).then(res=>{
  this.setData({
    list1:res.result
  })
  console.log(this.data.list1)
 
  this.data.list1.forEach((item,index)=>{
    item['hasChange']=likeCollection['list1-'+index];
  })
  this.setData({
    list1:this.data.list1
  })
}).catch(reason=>{
  console.log(reason)
})

// 获取二手交易数据并渲染到list2
wx.cloud.callFunction({
  name:'getLists',
  data:{
    category:'findItem'
  }
}).then(res=>{
  this.setData({
    list2:res.result
  })
  console.log(this.data.list2)
 
  this.data.list2.forEach((item,index)=>{
    item['hasChange']=likeCollection['list2-'+index];
  })
  this.setData({
    list2:this.data.list2
  })
}).catch(reason=>{
  console.log(reason)
})

// 获取校园生活数据并渲染到list3
wx.cloud.callFunction({
name:'getLists',
data:{
  category:'campus'
}
}).then(res=>{
this.setData({
  list3:res.result
})
console.log(this.data.list3)

this.data.list3.forEach((item,index)=>{
  item['hasChange']=likeCollection['list3-'+index];
})
this.setData({
  list3:this.data.list3
})
}).catch(reason=>{
console.log(reason)
})

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