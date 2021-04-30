// custom-tab-bar/index.js
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../store/store'

Component({

  options: {
    styleIsolation: 'shared'
  },

  behaviors: [storeBindingsBehavior],

  storeBindings: {
    store,
    fields: {
      sizi: () => store.sizi,
      active: 'activeTabBarIndex'
    },
    actions: {
      updateActive: 'updateActiveTabBarIndex'
  },
  }, 

  //监听事件
  observers: {
    'sizi': function(val) {
      if(val <= -1)
        return 
      this.setData({
        'list[1].info': val
      })
    }
  },

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    "list": [{
      "pagePath": "/pages/index/index",
      "text": "首页",
      "iconPath": "../imgs/tabbar/home.png",
      "selectedIconPath": "../imgs/tabbar/home-active.png",
      
    },
    {
      "pagePath": "/pages/message/message",
      "text": "消息",
      "iconPath": "../imgs/tabbar/message.png",
      "selectedIconPath": "../imgs/tabbar/message-active.png",
      info: 2
    },
    
    {
      "pagePath": "/pages/shopcart/shopcart",
      "text": "购物车",
      "iconPath": "../imgs/tabbar/shopcart.png",
      "selectedIconPath": "../imgs/tabbar/shopcart-active.png"
    },
    {
      "pagePath": "/pages/mine/mine",
      "text": "我的",
      "iconPath": "../imgs/tabbar/user.png",
      "selectedIconPath": "../imgs/tabbar/user-active.png"
    }
  ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event) {
      // event.detail 的值为当前选中项的索引
      this.updateActive(event.detail)
      wx:wx.switchTab({
        url: this.data.list[event.detail].pagePath
      })
   }
 } 
})
