<template>
  <div>
    <el-dialog
      title="活动修改"
      :visible.sync="dialogFormVisible"
      width="50%"
      :before-close="handleClose">
      <el-form ref="form"  :model="formData" label-width="80px">
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
            <el-date-picker type="date" placeholder="选择开始时间" v-model="formData.activity_start" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择结束时间" v-model="formData.timestamp" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="抽奖时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择开始时间" v-model="formData.random_start" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择结束时间" v-model="formData.random_end" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="活动描述">
          <el-input type="textarea" v-model="formData.desc"></el-input>
        </el-form-item>
        <el-form-item label="活动图片">
          <el-input v-model="formData.pic" v-if="false"></el-input>
          <el-upload
            class="avatar-uploader"
            ref="upload"
            :show-file-list="false"
            action="/index/upload"
            :before-upload="beforeUpload"
            :on-change="handleChange"
            :auto-upload="false"
            :data="formData">
            <img v-if="formData.pic" :src="formData.pic" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
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
  import {createActivity} from '../../util/api'

  export default {
    name: "Activity-dialog",
    props:{
      formData:{
        type:Object,
        require:true
      },
      dialogFormVisible:{
        type:Boolean,
        require: true
      }
    },
    data() {
      return {
      }
    },
    methods: {
      handleClose() {
        this.$emit('dialog-cancel',false);
      },
      onSubmit() {
        let params=this.formData
        createActivity(params)
        this.$emit('dialog-cancel', true);
      },
      handleChange(file, fileList){
        this.formData.pic = URL.createObjectURL(file.raw);
      },
      beforeUpload(file){
        return true
      }
    }
  }
</script>

<style scoped>

</style>
