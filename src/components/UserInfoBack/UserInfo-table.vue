<template>
  <div>
    <span>用户名查找</span>
    <el-input
      placeholder="请输入用户名查找"
      v-model="username" class="search">
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
    </el-input>
    <el-button icon="el-icon-search" circle @click="searchInfo"></el-button>
    <el-table
      :data="tableData.slice((page-1)*size,page*size)"
      border
      style="width: 100%"
      class="table">
      <el-table-column
        prop="balance"
        label='用户状态'
        min-width="120">
        <template slot-scope="scope">
          <el-button
            type="text"
            style="color: #000;"
            v-if="scope.row.role===0">用户
          </el-button>
          <el-button
            type="text"
            style="color: #000;"
            v-if="scope.row.role===1">管理员
          </el-button>
        </template>

      </el-table-column>
      <el-table-column
        fixed
        prop="username"
        label="用户名"
        min-width="150">
      </el-table-column>
      <el-table-column
        prop="birthday"
        label="用户年龄"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="用户性别"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="balance"
        label='账户余额'
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="联系方式"
        min-width="150">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        min-width="150">
      </el-table-column>
      <el-table-column
        label="详情"
        min-width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination align='right'
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange" :current-page="page" :page-sizes="[1,5,10]"
                   :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total_page">
    </el-pagination>
    <UserInfoDetailDialog :dialogFormVisible="dialogFormVisible"
                          :userInfoData="userInfoData"
                          @dialog-cancel="close"/>
  </div>
</template>

<script>
  import UserInfoDetailDialog from "./UserInfoDetail-dialog";
  import {apiUrl, $axios} from '../../util/api'

  export default {
    name: "UserInfo-table",
    components: {UserInfoDetailDialog},
    created() {
      this.getUserInfoData()
    },
    data() {
      return {
        tableData: [],
        page: 1,
        size: 5,
        total_page: 100,
        username: '',
        dialogFormVisible: false,
        userInfoData: []
      }
    },
    methods: {
      //用户列表展示
      getUserInfoData() {
        $axios
          .get(apiUrl + '/users')
          .then(response => {
              let res = response.data
              if (res.code === '200' && res.data.users !== []) {
                this.tableData = res.data.users
                this.total_page = res.data.users.length
              } else {
                alert(res.data.msg)
              }
            }
          )
      },
      //用户流水信息
      handleClick(row) {
        $axios
          .get(apiUrl + '/user/detail?id=' + row.id)
          .then(response => {
              let res = response.data
              if (res.code === '200') {
                if (res.data !== []) {
                  this.userInfoData = res.bills
                } else {
                  alert('暂无用户流水信息 ')
                }
              } else {
                alert(res.msg)
              }
            }
          );
        this.dialogFormVisible = true
      },
      //按用户名查找
      searchInfo() {
        if (this.username) {
          $axios
            .get(apiUrl + '/user/find?username='+this.username)
            .then(response => {
                let res = response.data
                if (res.code === '200') {
                  this.tableData = res.data.users
                  this.total_page = res.data.users.length
                } else {
                  alert(res.data.msg)
                }
              }
            )
        } else {
          alert('请输入要查询的用户名')
        }
      },
      //弹窗组件关闭
      close() {
        this.dialogFormVisible = false
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
    }
  }
</script>

<style scoped>
  .search {
    width: 30%;
    margin: 20px 0 20px 10px;
  }

  .table {
    margin-bottom: 20px;
  }

</style>
