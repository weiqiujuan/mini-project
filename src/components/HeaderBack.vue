<template>
  <div class="header">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>
        <a @click="loginBack" v-model="login">{{login}}</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <a @click="logout">注销</a>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  import {eventBus} from '../eventBus'

  export default {
    name: "HeaderBack",
    data() {
      return {
        login: '登录',
      }
    },
    created() {
      eventBus.$on('username', (params) => {
        this.login = params
      })
    },
    methods: {
      loginBack(){
        console.log('登录操作')
      },
      logout() {
        console.log('退出操作')
      },
    },
    beforeDestroy() {
      eventBus.$off('username')
    }
  }
</script>

<style scoped>
  .header {
    text-align: center;
    background-color: rgb(84, 92, 100);
    height: 120%;
    position: relative;
  }
  .breadcrumb {
    padding: 10px;
    position: absolute;
    right: 10px;
    line-height: 100%;
  }
</style>
