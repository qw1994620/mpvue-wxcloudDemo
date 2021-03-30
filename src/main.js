/*
 * @Author: your name
 * @Date: 2021-03-24 13:13:37
 * @LastEditTime: 2021-03-24 17:18:02
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \applets-shop\src\main.js
 */
import Vue from 'vue'
import App from './App'
wx.cloud.init({
  traceUser: true
})
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
