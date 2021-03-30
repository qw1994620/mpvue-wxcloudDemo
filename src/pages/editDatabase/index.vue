<!--
 * @Author: your name
 * @Date: 2021-03-24 13:13:37
 * @LastEditTime: 2021-03-25 15:09:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \applets-shop\src\pages\logs\index.vue
-->
<template>
  <div>
   <van-cell is-link title="添加一条数据" @click="add" />
   <van-cell is-link title="查询数据" @click="query" />
   <van-cell is-link title="更新数据" @click="onCounterInc" />
   <van-cell is-link title="删除数据" @click="onRemove" />
   <div>当前数据ID: {{counterId}}</div>
   <div>当前数据count: {{count}}</div>
  </div>
</template>

<script>

export default {
  components: {
  },

  data () {
    return {
      counterId: '',
      count: ''
    }
  },
  methods: {
    add () {
      const db = wx.cloud.database()
      db.collection('counters').add({
        data: {
          count: 1
        },
        success: res => {
        // 在返回结果中会包含新创建的记录的 _id
          console.log(res)
          wx.showToast({
            title: '新增记录成功'
          })
          this.counterId = res._id
          this.count = 1
          console.log('%c [ this.counterId ]', 'font-size:13px; color:#bf2c9f;', this.counterId)
          console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '新增记录失败'
          })
          console.error('[数据库] [新增记录] 失败：', err)
        }
      })
    },
    query () {
      let app = getApp()
      console.log('%c [ app ]', 'font-size:13px; color:#bf2c9f;', app)
      console.log('%c [ app.globalData.openid ]', 'font-size:13px; color:#bf2c9f;', app.globalData.openid)
      const db = wx.cloud.database()
      // 查询当前用户所有的 counters
      db.collection('counters').where({
        _openid: app.globalData.openid,
        _id: this.counterId
      }).get({
        success: res => {
          wx.showToast({
            title: '查询记录成功'
          })
          console.log('[数据库] [查询记录] 成功: ', res)
          this.counterId = res.data[0]._id || ''
          this.count = res.data[0].count || ''
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '查询记录失败'
          })
          console.error('[数据库] [查询记录] 失败：', err)
        }
      })
    },
    onCounterInc () {
      const db = wx.cloud.database()
      const newCount = this.count + 1
      db.collection('counters').doc(this.counterId).update({
        data: {
          count: newCount
        },
        success: res => {
          this.count = newCount
        },
        fail: err => {
          console.error('[数据库] [更新记录] 失败：', err)
        }
      })
    },
    onRemove () {
      if (this.counterId) {
        const db = wx.cloud.database()
        db.collection('counters').doc(this.counterId).remove({
          success: res => {
            wx.showToast({
              title: '删除成功'
            })
            this.setData({
              counterId: '',
              count: null
            })
          },
          fail: err => {
            wx.showToast({
              icon: 'none',
              title: '删除失败'
            })
            console.error('[数据库] [删除记录] 失败：', err)
          }
        })
      } else {
        wx.showToast({
          title: '无记录可删，请见创建一个记录'
        })
      }
    }
  },
  created () {
  }
}
</script>

<style>

</style>
