<!--
 * @Author: your name
 * @Date: 2021-03-24 13:13:37
 * @LastEditTime: 2021-03-25 09:28:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \applets-shop\src\pages\index\index.vue
-->
<template>

  <div>
      <!-- 用户头像 -->
      <!-- <open-data type="userAvatarUrl"></open-data> -->
      <van-cell is-link title="信息获取" link-type="navigateTo" url="../info/main" />
      <van-cell is-link title="前端操作数据库" link-type="navigateTo" url="../editDatabase/main" />



    <a href="/pages/counter/main" class="counter">去往Vuex示例页面</a>

  </div>
</template>

<script>

export default {
  data () {
    return {

    }
  },

  components: {

  },

  methods: {
  },

  created () {
  },
  onLoad () {

  }
}
</script>

<style scoped>


.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}
.all{
  width:7.5rem;
  height:1rem;
  background-color:blue;
}
.all:after{
  display:block;
  content:'';
  clear:both;
}
.left{
  float:left;
  width:3rem;
  height:1rem;
  background-color:red;
}

.right{
  float:left;
  width:4.5rem;
  height:1rem;
  background-color:green;
}
</style>
