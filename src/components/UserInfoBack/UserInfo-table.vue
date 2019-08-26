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
        fixed
        prop="name"
        label="用户名"
        min-width="150">
      </el-table-column>
      <el-table-column
        prop="age"
        label="用户年龄"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="用户性别"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="city"
        label="市区"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        min-width="300">
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
  import {getUserInfo, getUserInfoDetail, getUserSearch} from "../../util/api";

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
        size: 3,
        total_page: 100,
        username: '',
        dialogFormVisible: false,
        userInfoData: []
      }
    },
    methods: {
      getUserInfoData() {
        let res = getUserInfo(this.page, this.size)
        if (res.code === 200 && res.data.users !== []) {
          this.tableData = res.data.users
          this.page = res.data.page
          this.size = res.data.size
          this.total_page = res.data.total_page
        } else {
          alert(res.data.msg)
        }
      },
      handleClick(row) {
        let res = getUserInfoDetail(1)
        // let res=getUserInfoDetail(row.id)
        if (res.code === 200) {
          if (res.data !== []) {
            this.userInfoData = res.bills
          } else {
            alert('暂无用户流水信息 ')
          }
        } else {
          alert(res.msg)
        }
        this.dialogFormVisible = true
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
      searchInfo() {
        if (this.username) {
          let res = getUserSearch(this.username)
          if (res.code === 200 && res.data.users !== []) {
            this.tableData = res.data.users
          } else {
            alert(res.data.msg)
          }
        } else {
          alert('请输入要查询的用户名')
        }

        console.log('查询用户信息')
      },
      close() {
        this.dialogFormVisible = false
      }
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
