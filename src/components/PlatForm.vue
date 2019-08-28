<template>
  <el-container>
    <el-aside width="300px" style="background-color:#545c64;height: 100vh">
      <NavMenu/>
    </el-aside>
    <el-container>
      <el-header style="padding: 0">
        <HeaderBack/>
      </el-header>
      <el-main>
        <keep-alive>
          <router-view/>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import NavMenu from '@/components/NavMenu'
  import HeaderBack from '@/components/HeaderBack'


  export default {
    name: "PlatForm",
    components: {
      NavMenu, HeaderBack
    },
    mounted(){
    }
  }
</script>

<style scoped>

</style>
