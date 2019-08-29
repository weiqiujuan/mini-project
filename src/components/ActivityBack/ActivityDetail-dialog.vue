<template>
  <div>
    <el-dialog
      title="活动详情"
      :visible.sync="dialogDetailVisible"
      width="50%"
      :before-close="handleClose">
      <div class='statusActivity'>
        <p v-if="formDetailData.status===null">活动暂无详情</p>
        <p v-if="formDetailData.status===0">活动未开始</p>
        <p v-if="formDetailData.status===1">活动进行中</p>
        <p v-if="formDetailData.status===2">活动开奖中</p>
        <p v-if="formDetailData.status===3">活动开奖成功</p>
        <p v-if="formDetailData.status===-1">活动开奖失败</p>
      </div>

      <el-row :gutter="20">
        <el-col :span='12' v-if="formDetailData.status!==0&&formDetailData.status!==null">
          <p class="tableInfo">参与用户列表:</p>
          <el-table
            :data="formDetailData.users" border
            style="width: 100%"
            max-height="300"
            :row-style="rowStyle"
          >
            <el-table-column
              prop="id"
              label="用户id"
              min-width="100">
            </el-table-column>
            <el-table-column
              prop="name"
              label="用户姓名"
              min-width="100">
            </el-table-column>
            <el-table-column
              prop="time"
              label="参与时间">
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12" v-if="formDetailData.status!==null&&formDetailData.status>=1">
          <p class="tableInfo">中奖用户列表:</p>
          <el-table
            :data="formDetailData.winners" border
            style="width: 100%"
          >
            <el-table-column
              prop="id"
              label="用户id"
              min-width="100">
            </el-table-column>
            <el-table-column
              prop="name"
              label="用户姓名"
              min-width="100">
            </el-table-column>
            <el-table-column
              prop="time"
              label="参与时间"
              min-width="100">
            </el-table-column>
            <el-table-column
              prop="receive"
              label="奖品领取">
              <template slot-scope="scope">
                <el-button
                  type="text" disabled mini
                  v-if="scope.row.receive===0">已领奖
                </el-button>
                <el-button
                  type="text" disabled mini
                  v-if="scope.row.receive===1">未领奖
                </el-button>
              </template>
            </el-table-column>
          </el-table>
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
    mounted() {

    },
    data() {
      return {
        rowStyle: {height: 65 + 'px'},
      }
    },
    methods: {
      handleClose() {
        this.$emit('dialog-close', false);
      }
    }
  }
</script>

<style scoped>
  .statusActivity, .tableInfo {
    margin-bottom: 10px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }

  .tableInfo {
    color: #545c64;
    font-size: 1.5em;
    text-align: left;
  }

  .statusActivity {
    color: #ff693b;
    font-size: 2.5em;
    text-align: center;
  }
</style>
