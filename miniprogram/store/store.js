import { observable, action } from 'mobx-miniprogram'

export const store = observable({
  // 数据字段
  sizi: 2,
  activeTabBarIndex: 0,

  //actions函数，专门来修改store中数据的值
  updateNum: action(function (step) {
    this.sizi += step
  }),
  updateActiveTabBarIndex: action(function(index) {
    this.activeTabBarIndex = index
  })
})