<template>
  <div>
    <el-dialog
      title="活动详情"
      :visible.sync="dialogDetailVisible"
      width="50%"
      :before-close="handleClose">
      <el-row :gutter="20">
        <el-col :span='12'><img src="../../assets/mini.png" alt="图片" style="width:100%;height: 100%"></el-col>
        <el-col :span="12">
          <div class="name">{{formDetailData.name}}</div>
          <div class="desc">{{formDetailData.desc}}</div>
          <div class="count">目前参与人数达{{formDetailData.joinPerson}}人</div>
          <div v-if="formDetailData.onsale === 0 && formDetailData.status === 4" class="imp">
            因人数不足活动结束，活动参与还需{{formDetailData.participate}}人
          </div>
          <div v-if="formDetailData.onsale === 1 && formDetailData.status === 1" class="imp">
            还需{{formDetailData.participate}}人成团
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>

</template>

<script>

  export default {
    name: "ActivityDetail-dialog",
    props: {
      formDetailData: {
        type: Object,
        require: true
      },
      dialogDetailVisible: {
        type: Boolean,
        require: true
      }
    },
    data() {
      return {}
    },
    methods: {
      handleClose() {
        this.$emit('dialog-close', false);
      }
    }
  }
</script>

<style scoped>
  .name, .count, .imp, .desc {
    margin-bottom: 10px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }

  .name {
    margin-top: 10px;
    color: #909399;
    /*font-size: 24px;*/
    font-size: 1.5em;

  }

  .desc {
    color: #909399;
    /*font-size: 20px;*/
    font-size: 1.25em;
  }

  .count {
    color: #E6A23C;
    /*font-size: 24px;*/
    font-size: 1.5em;
  }

  .imp {
    color: #F56C6C;
    /*font-size: 36px;*/
    font-size: 2.25em;
  }

</style>
