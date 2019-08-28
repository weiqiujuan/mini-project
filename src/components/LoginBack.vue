<template>
  <div id="bg" class="bg">
    <div class="login" @keyup.13="doLogin">
      <div class="form-horizontal login">
        <div class="logo">登录</div>
        <div class="form-group input-group input-group-lg ">
          <span class="input-group-addon"><i class="fa fa-user-o" aria-hidden="true"></i></span>
          <el-input type="text" class=" form-control" placeholder="username" v-model="userInfo.username"/>
        </div>
        <div class="form-group input-group input-group-lg">
          <span class="input-group-addon"><i class="fa fa-key" aria-hidden="true"></i></span>
          <el-input type="password" class=" form-control" placeholder="password" v-model="userInfo.password"/>
        </div>
        <div class="form-group">
          <el-button type="text" style="float: left;">忘记密码？</el-button>
          <div class="oper">
            <el-button class="form-control" @click="doLogin" type="primary">登 录</el-button>
            <el-button class="form-control" @click="doSign">注册</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex';
  import {apiUrl, $axios} from '../util/api'

  export default {
    name: 'login',
    data() {
      return {
        userInfo: {
          username: '',
          password: '',
        },
        show: false,
        userToken: ''
      }
    },
    methods: {
      ...mapMutations(['changeLogin']),
      doLogin() {
        if (this.userInfo.username === '' || this.userInfo.password === '') {
          alert('用户名或密码不能为空');
          return false
        } else {
          $axios({
            method: 'post',
            url: apiUrl+'/login',
            data: this.userInfo
          }).then(response => {
            console.log(response.data)
            let res = response.data
            this.userToken = res.data.body.token
            this.changeLogin({Authorization: this.userToken})
            this.$notify({
              title: '提示信息',
              message: '登录成功',
              type: 'success',
            });
            this.$router.push({path: '/ActivityBack'})
          }).catch(error => {
            this.$notify({
              title: '提示信息',
              message: '账号或密码错误',
              type: 'error'
            });
          })
        }
      },
      doSign() {
        alert('找相关人员开启权限')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bg {
    /*!*background-color: aqua;*!*/
    /* background-image: url("../assets/bj.jpg");
     background-size: 100% 100%*/
  }

  .login {
    text-align: center;
    position: absolute;
    top: 40%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 400px;
  }

  .login-btn {
    background-color: whitesmoke;
  }

  .oper {
    float: right;
  }

  .form-group {
    margin-bottom: 25px;
  }

  .logo {
    font-family: "DejaVu Sans Mono";
    color: lightblue;
    font-size: 38px;
    letter-spacing: 4px;
    margin: 30px;
  }
</style>
