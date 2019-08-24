<template>
  <div class="login">
    <el-form>
      <el-form-item>
        <el-input v-model="userinfo.username" placeholder="用户名：admin"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="userinfo.password" placeholder="密码：11111"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button style="width:80%" type="primary" @click="doLogin()">确 定</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "LoginBack",
    data() {
      userinfo:{
      }
    },
    methods: {
      doLogin() {
        console.log('登录操作')
      }
    }
  }
</script>

<style scoped>

</style>
