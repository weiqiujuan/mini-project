<template>
  <div class="header">
    <div class="userImg" @click="remind()">
      <router-link to="/">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HeaderBack",
    data() {
      return {
      }
    },
    methods: {
      remind(){
        alert('确定退出登录？')
      }
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
  .userImg{
    float: right;
    margin: 20px;
  }

</style>
