<template>
  <div style="min-height:100%">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <p>活动内容运营平台</p>
      <el-menu-item index="1">
        <i class="el-icon-location"></i>
        <span><router-link to="ActivityBack">活动列表</router-link></span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title"><router-link to="UserInfoBack">用户信息</router-link></span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title"><router-link to="AboutMe">关于我们</router-link></span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "NavMenu",
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
  div {
    text-align: center;
  }
  p {
    margin: 15px 0;
    font-size: 28px;
    color: #ffffff;
  }

  a {
    color: #ffffff;
  }
</style>
