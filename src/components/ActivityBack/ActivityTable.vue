<template>
  <div>
    <el-table
      :data="tableData.slice((page-1)*size,page*size)"
      border
      style="width: 100%">
      <el-table-column
        prop="name"
        label="活动名称"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="introduce"
        label="活动介绍"
        min-width="120">
      </el-table-column>
      <el-table-column
        label="活动大图"
        min-width="140"
      >
        <template slot-scope="scope">
          <img
            style="width: 100px; height: 100px;"
            :src="getImgUrl(scope.row.pic)" fit
          />
        </template>
      </el-table-column>
      <el-table-column
        label="活动小图"
        min-width="140"
      >
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px;"
            :src="getImgUrl(scope.row.pic_small)" fit
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="activity_start"
        label="活动开始时间"
        min-width="140"
        :formatter="dateFormat">
      </el-table-column>
      <el-table-column
        prop="activity_end"
        label="活动结束时间"
        min-width="140"
        :formatter="dateFormat">
      </el-table-column>
      <el-table-column
        prop="random_start"
        label="开奖时间"
        min-width="140"
        :formatter="dateFormat">
      </el-table-column>
      <el-table-column
        prop="random_end"
        label="开奖结束时间"
        min-width="140"
        :formatter="dateFormat">
      </el-table-column>
      <el-table-column
        prop="person"
        label="开团需要人数"
        min-width="110">
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
        min-width="160">
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
            @click="handleChange(scope.row)"
            v-if="scope.row.onsale!==0">已上线
          </el-button>
        </template>
      </el-table-column>

    </el-table>
    <div class="pagination">
      <el-pagination align='right'
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" :current-page="page" :page-sizes="[1,3,5,10]"
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
  import moment from 'moment'//事件处理模块
  import Qs from 'qs'
  import {apiUrl, imgUrl, $axios} from '../../util/api'

  export default {
    name: "ActivityTable",
    mounted() {
      if (this.timer) {
        clearInterval(this.timer)
      } else {
        this.timer = setInterval(() => {
          //获取数据
          this.getData()
        }, 6000)
      }
      this.getData()
    },
    destroyed(){
      clearInterval(this.timer)
    },
    data() {
      return {
        tableData: [],
        formData: {},
        formDetailData: {},
        dialogFormVisible: false,
        dialogDetailVisible: false,
        page: 1,
        size: 3,
        total_page: 15
      }
    },
    components: {
      ActivityModifyDialog,
      ActivityDetailDialog
    },
    methods: {
      //列表展示数据
      getData() {
        $axios
          .get(apiUrl + '/activities')
          .then(response => {
              let res = response.data
              this.tableData = res.data.activities
              this.total_page = res.data.activities.length
            }
          ).catch(error => {
          console.log(error)
        })
      },
      //向修改子组件传值
      handleModify(row) {
        this.dialogFormVisible = true;
        this.formData = row;
      },
      //上下线操作
      handleChange(row) {
        let changeRes = row.onsale;
        let params = {
          id: row.id,
          action: changeRes
        };
        $axios({
          url: apiUrl + '/activity/onsale',
          method: 'post',
          transformRequest: [function (data) {
            return Qs.stringify(data)
          }],
          data: params
        }).then(response => {
            let res = response.data
            if (res.code === '200' && res.data.msg === 'success') {
              if (changeRes === 0) {
                row.onsale = 1;
                this.$notify({
                  title: '提示',
                  message: '上线成功',
                  type: 'success'
                })
              } else {
                row.onsale = 0;
                this.$notify({
                  title: '提示',
                  message: '下线成功',
                  type: 'success'
                })
              }
            } else {
              this.$notify.error({
                title: '提示',
                message: res.data.msg,
              })
            }
          }
        )
      },
      //时间戳处理
      dateFormat(row, column) {
        var date = row[column.property];
        if (date === undefined) {
          return "";
        }
        return moment(date).format("YYYY-MM-DD HH:mm");
      },
      //活动详情
      handleDetail(row) {
        this.dialogDetailVisible = true;
        $axios
          .get(apiUrl + '/activity/detail?id=' + row.id)
          .then(response => {
              let res = response.data
              if (res.code === '200') {
                this.formDetailData = res.data
              }
            }
          ).catch(error => {
          console.log(error)
        })
      },

      //图片地址拼接
      getImgUrl(url) {
        return imgUrl + url;
      },
      //分页处理
      handleSizeChange(val) {
        console.log(`每页${val}条`);
        this.page = 1;
        this.size = val;
      },
      handleCurrentChange(val) {
        console.log(`当前页：${val}`);
        this.page = val;
      },

      //弹窗关闭
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
