<template>
  <div>
    <el-table
      :data="tableData.slice((page-1)*size,page*size)"
      border
      style="width: 100%">
      <el-table-column
        prop="name"
        label="活动名称"
        min-width="130">
      </el-table-column>
      <el-table-column
        label="活动展示"
        min-width="150"
      >
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px;"
            :src="scope.row.pic" fit
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="activity_start"
        label="活动开始时间"
        min-width="150">
      </el-table-column>
      <el-table-column
        prop="activity_end"
        label="活动结束时间"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="random_start"
        label="开奖时间"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="random_end"
        label="开奖结束时间"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="person"
        label="开团需要人数"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="desc"
        label="活动描述"
        min-width="120">
      </el-table-column>
      <el-table-column
        label="活动详情"
        min-width="100">
        <template slot-scope="scope">
          <el-button @click="handleDetail(scope.row)" type="text">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="活动状态"
        min-width="150">
        <template slot-scope="scope">
          <el-button
            @click="handleModify(scope.row)"
            v-if="scope.row.status===0">活动修改
          </el-button>
          <el-button
            type="primary"
            v-if="scope.row.status===1" disabled="">活动进行中
          </el-button>
          <el-button
            type="success"
            v-if="scope.row.status===2" disabled="">开奖中
          </el-button>
          <el-button
            type="success"
            v-if="scope.row.status===3">开奖成功
          </el-button>
          <el-button
            type="info"
            v-if="scope.row.status===4">不满足条件结束
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="onsale"
        label="是否上线"
        min-width="130">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="handleChange(scope.row)"
            v-if="scope.row.onsale===0">上线
          </el-button>
          <el-button
            type="success"
            v-if="scope.row.onsale!==0" disabled="">已上线
          </el-button>
        </template>
      </el-table-column>

    </el-table>
    <div class="pagination">
      <el-pagination align='right'
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" :current-page="page" :page-sizes="[1,5,10]"
                     :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total_page">
      </el-pagination>
    </div>
    <ActivityModifyDialog :dialogFormVisible="dialogFormVisible"
                          :formData="formData"
                          @dialog-cancel="close"/>
    <ActivityDetailDialog :dialogDetailVisible="dialogDetailVisible"
                          :formDetailData="formDetailData"
                          @dialog-close="detailClose"/>
  </div>
</template>

<script>
  import ActivityModifyDialog from './ActivityModifty-dialog'
  import ActivityDetailDialog from './ActivityDetail-dialog'
  import {getActivitys, getActivityDetail, onSale} from '../../util/api'

  export default {
    name: "ActivityTable",
    mounted() {
      this.getData()
    },
    data() {
      return {
        tableData: [{
          id: 1,
          name: '三元购',
          desc: '活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述',
          pic: 'http://seopic.699pic.com/photo/50050/2419.jpg_wh1200.jpg', //url
          price: 22555.5,
          onsale: 0,
          activity_start: 'timestamp',
          activity_end: 'timestamp',
          random_start: 'timestamp', // 开奖开始时间
          random_end: 'timestamp', // 开奖结束时间
          person: 100, // 开团需要人数
          status: 4, // 0活动未开始，1活动进行中，2开奖中，3开奖成功，4不满足条件结束
          participate: 15,
          joinPerson: 80
        }, {
          name: '三元购',
          desc: '活动描述',
          pic: '', //url
          price: 22555.5,
          onsale: 1,
          activity_start: 'timestamp',
          activity_end: 'timestamp',
          random_start: 'timestamp', // 开奖开始时间
          random_end: 'timestamp', // 开奖结束时间
          person: 100, // 开团需要人数
          status: 1, // 0活动未开始，1活动进行中，2开奖中，3开奖成功，4不满足条件结束
        }, {
          name: '三元购',
          desc: '活动描述',
          pic: '', //url
          price: 22555.5,
          onsale: 0,
          activity_start: 'timestamp',
          activity_end: 'timestamp',
          random_start: 'timestamp', // 开奖开始时间
          random_end: 'timestamp', // 开奖结束时间
          person: 100, // 开团需要人数
          status: 0, // 0活动未开始，1活动进行中，2开奖中，3开奖成功，4不满足条件结束
          participate: 15,
          joinPerson: 1000
        }],
        formData: {},
        formDetailData: {},
        dialogFormVisible: false,
        dialogDetailVisible: false,
        page: 1,
        size: 3,
        total_page: 100
      }
    },
    components: {
      ActivityModifyDialog,
      ActivityDetailDialog
    },
    methods: {
      getData() {
        let res = getActivitys(this.page, this.size)
        this.tableData = res.activities
        this.page = res.page
        this.size = res.size
        this.total_page = res.total_page
      },
      handleSizeChange(val) {
        console.log(`每页${val}条`);
        this.page = 1;
        this.size = val;
      },
      handleCurrentChange(val) {
        console.log(`当前页：${val}`);
        this.page = val;
      },
      handleModify(row) {
        this.dialogFormVisible = true;
        this.formData = row;
        console.log(row)
      },
      handleChange(row) {
        let params = {
          id: row.id,
          action: row.onsale
        };
        let res = onSale(params)
        if (res.code === 200 && res.data.status === 'success') {
          row.onsale = 1;
          this.$notify({
            title: '提示',
            message: '上线成功',
            type: 'success'
          })
        } else {
          this.$notify.error({
            title: '提示',
            message: '此活动已上线',
          })
        }
      },
      handleDetail(row) {
        this.dialogDetailVisible = true;
        row.joinPerson = getActivityDetail(row.id);
        row.participate = row.person - row.joinPerson
        this.formDetailData = row
      },
      detailClose() {
        this.dialogDetailVisible = false;
      },
      close() {
        this.dialogFormVisible = false
      }
    }
  }
</script>

<style scoped>
  .pagination {
    margin-top: 20px;
  }
</style>
