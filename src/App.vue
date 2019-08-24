<template>
  <div id="app">
    <el-container>
      <el-aside width="300px" style="background-color:#545c64;height: 100vh" ><NavMenu/></el-aside>
      <el-container>
        <el-header style="padding: 0"><HeaderBack/></el-header>
        <el-main><router-view/></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

  import NavMenu from '@/components/NavMenu'
  import HeaderBack from '@/components/HeaderBack'

  export default {
    name: 'App',
    components: {
      NavMenu, HeaderBack
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    text-decoration: none;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
