<template>
  <div>
    <el-dialog
      title="活动修改"
      :visible.sync="dialogFormVisible"
      width="50%"
      :before-close="handleClose">
      <el-form ref="form" :model="formData" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="活动人数">
          <el-input v-model="formData.person"></el-input>
        </el-form-item>
        <el-form-item label="活动金额">
          <el-input v-model="formData.price"></el-input>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker type="datetime" placeholder="选择开始时间" v-model="formData.activity_start"
                            value-format="timestamp"
                            style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker type="datetime" placeholder="选择结束时间" v-model="formData.activity_end"
                            value-format="timestamp"
                            style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="抽奖时间">
          <el-col :span="11">
            <el-date-picker type="datetime" placeholder="选择开始时间" v-model="formData.random_start"
                            value-format="timestamp"
                            style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker type="datetime" placeholder="选择结束时间" v-model="formData.random_end" value-format="timestamp"
                            style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="活动介绍">
          <el-input type="textarea" v-model="formData.introduce"></el-input>
        </el-form-item>
        <el-form-item label="活动描述">
          <el-input type="textarea" v-model="formData.desc"></el-input>
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
            :on-exceed="handleExceed">
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
            :on-exceed="handleExceed">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="onSubmit">保存</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import Qs from 'qs'
  import {apiUrl, $axios} from '../../util/api'

  export default {
    name: "Activity-dialog",
    props: {
      formData: {
        type: Object,
        require: true
      },
      dialogFormVisible: {
        type: Boolean,
        require: true
      }
    },
    data() {
      return {}
    },
    methods: {
      //关闭弹窗
      handleClose() {
        this.$emit('dialog-cancel', false);
      },
      //修改保存操作
      onSubmit() {
        let params = this.formData
        $axios({
          url: apiUrl + '/activity/update',
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
              message: '修改成功',
              type: 'success'
            })
          } else {
            this.$notify.error({
              title: '提示',
              message: '修改' + result.data.msg,
            })
          }
        })
        this.$emit('dialog-cancel', true);
      },
      //图片上传操作
      handlePicUrl(file) {
        this.formData.pic = file.data.msg
      },
      handlePicUrlSmall(file) {
        this.formData.pic_small = file.data.msg
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

</style>
