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
userInfo:null,
openid:null,
category:null,
favor_img: "../../imgs/like.png",
favor: "../../imgs/like1.png"
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
    // 增加评论函数
     remark(e){
       let item = JSON.stringify(e.target.dataset.item)
       wx.navigateTo({
         url: '../remark/remark?item='+item,
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
  let list1 = wx.getStorageSync('list1');
  if(list1){
    this.setData({
      list1:list1
    })
  }else{
    this.uploadList(0,'list1')
  }

  let list2 = wx.getStorageSync('list2');
  if(list2){
    this.setData({
      list2:list2
    })
  }else{
// 获取二手交易数据并渲染到list2
this.uploadList(1,'list2')
  }
  

  let list3 = wx.getStorageSync('list3')
  if(list3){
    this.setData({
      list3:list3
    })
  }
  else{
// 获取校园生活数据并渲染到list3
this.uploadList(2,'list3')
  }

  },
  // 点赞函数
  praiseThis(e){
    var that = this;
    let list = e.currentTarget.dataset.list;
    let index = e.currentTarget.dataset.index;
    let _id = e.currentTarget.dataset._id;
    let hasChange = !(this.data[list][index].hasChange);
      // 当前点击的赞的情况取反
      console.log('当前点击的赞'+hasChange)
   // 判断本地用户是否点赞了该文章
    wx.getStorage({
     key: 'likeCollection',
     success:(res)=>{
      let details = res.data;
      console.log('缓存里的值:'+details[list+'-'+_id])
      var onum = parseInt(that.data[list][index].clickload);
      if(details[list+'-'+_id]){  // 如果点赞过
         that.data[list][index].clickload = (onum - 1);
         that.data[list][index].hasChange = false;
      }
        else {
         that.data[list][index].clickload = (onum + 1);
         that.data[list][index].hasChange = true;
       } 
       wx.getStorage({
         key: 'likeCollection',
         success:datas=>{
           let obj = datas.data;
           obj[list+'-'+_id] = that.data[list][index].hasChange
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
       if(list === 'list1'){
       this.setData({
        list1: that.data[list],
        category:'love'
       })
       }
       else if(list === 'list2'){
         this.setData({
           list2: that.data[list],
           category:'findItem'
          })
     
       }
       else if(list === 'list3'){
         this.setData({
           list3: that.data[list],
           category:'campus'
          })
       }
       wx.cloud.callFunction({
         name:'pariseThis',
         data:{
           _id:_id,  //文章id
           likeOr:that.data[list][index].hasChange,
           category:this.data.category
         }
       }).then(res=>{
         console.log(res.result)
        // 动态更新赞量
   
       }).catch(reason=>{
         console.log(reason)
       });
     }
   })
   
  },

 // 数据加载函数
 // list 需要渲染的列表
 // index 索引
  uploadList(index,list){
    let likeCollection = wx.getStorageSync('likeCollection');
    console.log(index,list)
    let category = '';
    if(index == 0){
      category = 'love'
    }
    else if(index == 1){
      category = 'findItem'
    }
    else if(index == 2){
      category = 'campus'
    }
    // 调用云函数
    wx.cloud.callFunction({
      name:'getLists',
      data:{
        category:category
      }
    }).then(res=>{
      res.result.data.forEach((item)=>{
        item['hasChange']=likeCollection[list+item._id];
      })
      if(list == 'list1'){
        this.setData({
          list1:res.result.data
        })
        wx.setStorageSync('list1', res.result.data)
      } 
      else if(list == 'list2'){
        this.setData({
          list2:res.result.data
        })
        wx.setStorageSync('list2', res.result.data)
      }
      else{
        this.setData({
          list3:res.result.data
        })
        wx.setStorageSync('list3', res.result.data)
      }
     
    }).catch(reason=>{
      console.log(reason)
    })
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
    list1:res.result.data
  })
  this.data.list1.forEach((item,index)=>{
    item['hasChange']=likeCollection['list1-'+item._id];
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
    list2:res.result.data
  })
  this.data.list2.forEach((item,index)=>{
    item['hasChange']=likeCollection['list2-'+item._id];
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
  list3:res.result.data
})
this.data.list3.forEach((item,index)=>{
  item['hasChange']=likeCollection['list3-'+item._id];
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