// custom-tab-bar/index.js
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../store/store'


export default   Component({
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
      "text": "畅所欲言",
      "iconPath": "../imgs/tabbar/home.png",
      "selectedIconPath": "../imgs/tabbar/home-active.png",
      
    },
    {
      "pagePath": "/pages/add/add",
      "text": "毛遂自荐",
      "iconPath": "../imgs/tabbar/message.png",
      "selectedIconPath": "../imgs/tabbar/message-active.png",
    },
    {
      "pagePath": "/pages/mine/mine",
      "text": "我的",
      "iconPath": "../imgs/tabbar/user.png",
      "selectedIconPath": "../imgs/tabbar/user-active.png",

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
      console.log(event.detail)
      wx:wx.switchTab({
        url: this.data.list[event.detail].pagePath
      })
   }
 } 
})
