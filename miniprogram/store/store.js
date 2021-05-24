import { observable, action } from 'mobx-miniprogram'

export const store = observable({
  // 数据字段
  activeTabBarIndex: 0,

  
  updateActiveTabBarIndex: action(function(index) {
    this.activeTabBarIndex = index
  })
})