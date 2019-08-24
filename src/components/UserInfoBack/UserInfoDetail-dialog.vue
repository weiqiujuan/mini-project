<template>
  <el-dialog
    title="用户详情"
    :visible.sync="dialogFormVisible"
    width="50%"
    :before-close="handleClose">
    用户详情
  </el-dialog>
</template>

<script>
  import {getUserInfoDetail} from "../../util/api";

  export default {
    name: "UserInfoDetail-dialog",
    props: {
      dialogFormVisible: {
        type: Boolean,
        require: true
      },
      userInfo: {
        type: Boolean,
        require: true
      }
    },
    created(){
      getUserInfoDetail(this.userInfo.userId)
    },
    data() {
      return {}
    },
    methods: {
      handleClose() {
        this.$emit('dialog-cancel', false);
      },
    }
  }
</script>

<style scoped>

</style>
