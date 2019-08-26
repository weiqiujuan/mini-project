<template>
  <div class="activeDialog">
    <el-button type="" @click="dialogVisible = true" size="larger">活动新增</el-button>
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
            <el-date-picker type="date" placeholder="选择开始时间" v-model="form.activity_start" value-format="timestamp"
                            style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择结束时间" v-model="form.timestamp" value-format="timestamp"
                            style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="抽奖时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择开始时间" v-model="form.random_start" value-format="timestamp"
                            style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择结束时间" v-model="form.random_end" value-format="timestamp"
                            style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="活动描述">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item label="活动图片">
          <el-input v-model="form.pic" v-if="false"></el-input>
          <el-upload
            class="avatar-uploader"
            ref="upload"
            :show-file-list="false"
            action="/index/upload"
            :before-upload="beforeUpload"
            :on-change="handleChange"
            :auto-upload="false"
            :data="form">
            <img v-if="form.pic" :src="form.pic" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
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
  import {createActivity} from '../../util/api'

  export default {
    name: "Activity-dialog",
    data() {
      return {
        dialogVisible: false,
        form: {
          name: 'st,',
          desc: 'str',
          pic: '',
          price: 'float',//
          activity_start: 'timestamp',
          activity_end: 'timestamp',
          random_start: 'timestamp', // 开奖开始时间
          random_end: 'timestamp', // 开奖结束时间
          person: 'int'
        }
      }
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      onSubmit() {
        let params = this.form
        console.log(this.form);
        let result = createActivity(params)

        if (result.code === 200) {
          this.$notify({
            title: '提示',
            message: '新增项目成功',
            type: 'success'
          })
        } else {
          this.$notify.error({
            title: '提示',
            message: '修改' + result.data.msg,
          })
        }
        this.dialogVisible = false;
        //清空表单
      },
      handleChange(file, fileList) {
        this.form.pic = URL.createObjectURL(file.raw);
      },
      beforeUpload(file) {
        return true
      }
    }
  }
</script>

<style scoped>
  .activeDialog {
    margin-bottom: 10px;
  }
</style>
