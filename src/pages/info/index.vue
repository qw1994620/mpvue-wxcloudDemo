<!--
 * @Author: your name
 * @Date: 2021-03-24 13:13:37
 * @LastEditTime: 2021-03-25 09:22:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \applets-shop\src\pages\logs\index.vue
-->
<template>
  <div>
    <van-cell is-link title="获取用户信息"  @click="getUserInfo" />
      <van-cell is-link title="查询授权信息" @click="getSetting" />
      <van-cell is-link title="获取openid"  @click="getOpenid" />
      <img class="userinfo-avatar"  :src="userInfo.avatarUrl" background-size="cover" />
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
      <van-toast id="van-toast" />
      <div>
          openid:{{openid}}
      </div>
  </div>
</template>

<script>
import card from '@/components/card'
import Toast from '../../../static/vant/toast/toast'

export default {
  components: {
    card
  },

  data () {
    return {
      userInfo: {
        nickName: 'mpvue',
        avatarUrl: ''
      },
      openid: ''
    }
  },
  methods: {
    getUserInfo () {
      wx.getUserProfile({
        desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          this.userInfo = res.userInfo
        }
      })
    },
    getSetting () {
      wx.getSetting({
        success (res) {
          Toast.success('在控制台查看')
          console.log('%c [ 授权信息 ]', 'font-size:13px; color:#bf2c9f;', res.authSetting)
        }
      })
    },
    getOpenid () {
      let app = getApp()
      // 调用云函数
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          console.log('[云函数] [login] user openid: ', res.result.openid)
          app.globalData.openid = res.result.openid
          this.openid = res.result.openid
        },
        fail: err => {
          console.error('[云函数] [login] 调用失败', err)
        }
      })
    }
  },
  created () {
  }
}
</script>

<style>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}
</style>
