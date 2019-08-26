<template>
  <el-dialog
    title="用户流水信息"
    :visible.sync="dialogFormVisible"
    width="50%"
    :before-close="handleClose">
    <el-table
      :data="userInfoData"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="流水id"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="money"
        label="金额"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="activity_id"
        label="活动id"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="activity_name"
        label="参与活动"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="operation"
        label="操作"
        min-width="120">
        <template slot-scope="scope">
          <el-button
            type="text"
            v-if="scope.row.operation===1">存钱
          </el-button>
          <el-button
            type="text"
            v-if="scope.row.operation===2">用钱
          </el-button>
          <el-button
            type="text"
            v-if="scope.row.operation===2">退款
          </el-button>
        </template>

      </el-table-column>
      <el-table-column
        prop="time"
        label="流水创建时间"
        min-width="130"
        :formatter="dateFormat">
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
  import moment from 'moment'
  export default {
    name: "UserInfoDetail-dialog",
    props: {
      dialogFormVisible: {
        type: Boolean,
        require: true
      },
      userInfoData: {
        type: Array,
      }
    },

    data() {
      return {}
    },
    methods: {
      handleClose() {
        this.$emit('dialog-cancel', false);
      },
      dateFormat(row, column) {
        var date = row[column.property];
        if (date === undefined) {
          return "";
        }
        return moment(date).format("YYYY-MM-DD HH:mm:ss");
      },
    }
  }
</script>

<style scoped>

</style>
