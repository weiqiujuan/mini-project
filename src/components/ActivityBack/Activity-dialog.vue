<template>
  <div class="activeDialog">
    <el-button type="" @click="createActivity()" size="larger">活动新增</el-button>
    <el-dialog
      title="新增活动"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动人数">
          <el-input v-model="form.person"></el-input>
        </el-form-item>
        <el-form-item label="活动金额">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker type="datetime" placeholder="选择开始时间" v-model="form.activity_start" value-format="timestamp"
                            style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker type="datetime" placeholder="选择结束时间" v-model="form.activity_end" value-format="timestamp"
                            style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="抽奖时间">
          <el-col :span="11">
            <el-date-picker type="datetime" placeholder="选择开始时间" v-model="form.random_start" value-format="timestamp"
                            style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker type="datetime" placeholder="选择结束时间" v-model="form.random_end" value-format="timestamp"
                            style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="活动介绍">
          <el-input type="textarea" v-model="form.introduce"></el-input>
        </el-form-item>
        <el-form-item label="活动描述">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item label="活动图片">
          <el-upload
            class="upload-demo"
            action="http://10.234.210.197:8080/pic/upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-success="handlePicUrl"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="活动奖品">
          <el-upload
            class="upload-demo"
            action="http://10.234.210.197:8080/pic/upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-success="handlePicUrlSmall"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="onSubmit">保存</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import {apiUrl, $axios} from '../../util/api'
  import Qs from 'qs'

  export default {
    name: "Activity-dialog",
    data() {
      return {
        dialogVisible: false,
        fileList: [],
        form: {
          name: 'st,',
          desc: 'str',
          introduce: '介绍介绍呗',
          pic: '',
          pic_small: '',
          price: 44.5,//
          activity_start: 1234567891234,
          activity_end: 1234567891234,
          random_start: 1234567891234, // 开奖开始时间
          random_end: 1234567891234, // 开奖结束时间
          person: 100
        }
      }
    },
    methods: {
      //表单初始化
      createActivity() {
        this.form = {}
        this.dialogVisible = true
      },
      //关闭确认
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      //新增活动保存
      onSubmit() {
        let params = this.form
        $axios({
          url: apiUrl + '/activity',
          method: 'post',
          transformRequest: [function (data) {
            return Qs.stringify(data)
          }],
          data: params
        }).then((response) => {
          let result = response.data
          if (result.code === '200') {
            this.$notify({
              title: '提示',
              message: '新增项目成功',
              type: 'success'
            })
          } else {
            this.$notify.error({
              title: '提示',
              message: '新增' + result.data.msg,
            })
          }
        });
        this.dialogVisible = false;
      },
      //图片上传操作
      handlePicUrl(file) {
        this.form.pic = file.data.msg
      },
      handlePicUrlSmall(file) {
        this.form.pic_small = file.data.msg
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 张图片，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`);
      }
    }
  }
</script>

<style scoped>
  .activeDialog {
    margin-bottom: 10px;
  }
</style>
