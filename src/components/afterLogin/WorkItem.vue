<template>
  <div class="workItemPage">
    <div class="workItem" @click="goWorkDetail">
      <div class="itemLeft">
        <img class="noItem" src="@/assets/images/afterLogin/work.png" alt="">
        <div class="itemLeft-bottom">
          作业
        </div>
      </div>
      <div class="itemRight">
        <div class="itemRight-left">
          <div class="itemRight-left-head">
            {{task.taskName}}
          </div>
          <div class="itemRight-left-body">
            <div class="itemRight-left-body-left">
              提交截止时间：{{time(task.endTime)}}
            </div>
            <div class="el-divider">
              |
            </div>
            <div class="itemRight-left-body-mid">
              已结束
            </div>
            <div class="el-divider">
              |
            </div>
            <div class="itemRight-left-body-right">
              个人作业
            </div>
          </div>
          <div class="itemRight-left-foot">
            已提交
          </div>
        </div>
        <div class="itemRight-right" v-if="$store.getters.user.role==='1'">
          <el-button class="hasSubmit" type="primary">提交作业</el-button>
        </div>
        <div class="itemRight-right" v-if="$store.getters.user.role==='0'">
          <template v-if="task.status==='3'">
            <span class="workDetail">
           <div class="num">{{task.markingNum||0}}</div>
           <div>已批完</div>
         </span>
            <span class="workDetail">
           <div class="num">{{task.unmarkingNum||0}}</div>
           <div>未批完</div>
         </span>
            <span class="workDetail">
           <div class="num">{{task.unsubmitNum||0}}</div>

           <div>未交</div>
         </span>
          </template>
          <template v-if="task.status==='1'">
            <div class="moreBox" @click="issuetask" @click.stop>
              <img class="moreIcon" src="@/assets/images/afterLogin/issue.png" alt="" >
              <div>发布</div>
            </div>
          </template>
          <el-dropdown placement="bottom" trigger="click" @command="handleCommand">
            <div class="moreBox" @click.stop>
              <img class="moreIcon" src="@/assets/images/afterLogin/more.svg" alt="" >
              <div>更多</div>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item  command="edit" v-if="task.status!=='1'">编辑
              </el-dropdown-item>
              <el-dropdown-item command="delete">删除
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </div>
      </div>
    </div>
    <el-dialog title="编辑作业" :visible.sync="editFormVisible" @close="closeDialog('editForm')">
      <el-form :model="task" :rules="editRules" ref="editForm" label-width="100px">
        <el-form-item label="作业标题" prop="taskName">
          <el-input v-model="editForm.taskName" placeholder="作业标题" type="text" maxlength="70" show-word-limit></el-input>
        </el-form-item>
        <el-form-item  label="作业描述" prop="remarks">
          <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="editForm.remarks">
          </el-input>
        </el-form-item>
        <el-form-item  label="立即发布" prop="publishNow">
          <el-switch
              v-model="editForm.publishNow">
          </el-switch>
        </el-form-item>

        <el-form-item label="发布时间" prop="publishTime" v-if="editForm.publishNow">
          <el-date-picker  :disabled="task.status==='3'"
              v-model="editForm.publishTime"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="截至时间" prop="endTime" v-if="editForm.publishNow">
          <el-date-picker
              v-model="editForm.endTime"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item  label="作业附件">
          <el-upload
              class="upload-demo"
              action="http://upload-cn-east-2.qiniup.com"
              :data="data"
              :before-remove="beforeRemove"
              :on-success="handleSuccess"
              :before-upload="handleBeforeUpload"
              :on-preview="handlePreview"
              multiple
              :limit="1"
              :on-exceed="handleExceed"
              :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
              <el-button @click="closeDialog('editForm')">取 消</el-button>
            <el-button type="primary" @click="submitForm('editForm')">确 定</el-button>
            </span>
    </el-dialog>
  </div>
</template>

<script>
import httpPost from "@/utils/axios/Home";

export default {
  name: "WorkItem",
  props:['task'],
  data(){
    return{
      editFormVisible:false,
      editForm:{
        status:'',
        taskName:'',
        remarks:'',
        endTime:'',
        publishTime:'',
        file:'',
        publishNow:false,
      },
      fileList:[],
      editRules: {
        taskName: [
          { required: true, message: '必填项', trigger: 'blur' },
        ],
        publishTime: [
          { required: true, message: '必填项', trigger: 'blur' },
        ],
        endTime: [
          { required: true, message: '必填项', trigger: 'blur' },
          { validator: this.checkEndDate, trigger: 'blur' }
        ],
      },
      data:{
        token:''
      },
    }
  },
  mounted() {
    this.editForm.id = this.task.id
    this.editForm.creatorId = this.task.creatorId
    this.editForm.unsubmitNum = this.task.unsubmitNum
    this.editForm.lessonId = this.task.lessonId
    this.editForm.unmarkingNum = this.task.unmarkingNum
    this.editForm.publishNow=this.task.status!=='1'
    this.editForm.status = this.task.status
    this.editForm.taskName = this.task.taskName
    this.editForm.remarks = this.task.remarks
    this.editForm.file = this.task.file
    this.editForm.publishTime = new Date(this.task.publishTime)
    this.editForm.endTime = new Date(this.task.endTime)
    if (this.task.file!==''){
      this.fileList.push({name: this.task.file.substring(this.task.file.lastIndexOf('/') + 1), url: this.task.file})
    }
    console.log(this.editForm)
  },
  methods:{
    goWorkDetail(){
      this.$router.push({name:'workDetail',
        query: {
          taskId:this.task.id
        }})
    },
    handleCommand(command){
      switch (command){
        case "edit":
          this.getQiniuyunToken()
          this.editFormVisible = true; break;
        case "delete":this.deleteTask(); break;
      }
    },
    time(dateString){
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      const hour = ("0" + date.getHours()).slice(-2);
      const minute = ("0" + date.getMinutes()).slice(-2);

      const formattedDate = `${year}/${month}/${day} ${hour}:${minute}`;
      return formattedDate
    },
    handleBeforeUpload(file){
      this.data.key=file.name
      console.log(file)
    },
    handleSuccess(response) {
      this.editForm.file=this.$fileBase+response.key
    },
    getQiniuyunToken(){
      httpPost({}, '/qiniu/token', 'GET').then(res=>{
        this.data.token=res
      })
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    handlePreview() {
      window.open(this.task.file);
    },
    checkEndDate(rule, value, callback) {
      const startTimeStamp = +new Date(this.editForm.publishTime); // 将开始时间转换为时间戳
      const endTimeStamp = +new Date(this.editForm.endTime); // 将结束时间转换为时间戳
      if (startTimeStamp>endTimeStamp) {
        callback(new Error('结束时间必须在开始时间之后'));
      } else {
        callback();
      }
    },
    closeDialog(){
      this.resetForm('editForm')
      this.editFormVisible = false;
    },
    submitForm(formName) {
      console.log(this.editForm)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (formName==='editForm'){
            this.updateTask()
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    updateTask(){
      if (this.editForm.status==='1'){
        if (this.editForm.publishNow){
          this.editForm.status=this.editForm.publishNow>new Date()?'3':'2'
        }
      }
      console.log(this.editForm)
      httpPost(this.editForm,'/updateTask','POST').then(res=>{
        if (res.code===200){
          this.closeDialog()
          this.$emit('child-event')
        }
      })
    },
    deleteTask(){
      httpPost({taskId:this.task.id},'/delTask','POST').then(res=>{
        if (res.code===200){
          console.log(res)
          this.$emit('child-event')
        }
      })
    },
    issuetask(){
      this.editForm.publishTime=null
      this.editForm.endTime=null
      this.getQiniuyunToken();
      this.editFormVisible = true;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  }
}
</script>

<style scoped lang="scss">
.workItemPage {

  .workItem {
    padding: 10px 16px 0 16px;
    display: flex;

    .itemLeft {
      width: 85px;
      margin-right: 16px;
      font-size: 12px;
      flex-direction: column;
      text-align: center;

      .itemLeft-bottom {
        margin-top: 5px;
        text-align: center;
      }
    }

    .itemRight {
      width: 100%;
      padding: 0 0 4px;
      display: flex;
      border-bottom: 1px solid #eee;
      justify-content: space-between;

      .itemRight-left {
        color: #5f6368;
        font-size: 12px;

        .itemRight-left-head {
          font-size: 16px;
          margin-bottom: 12px;
          color: #212121;
        }

        .itemRight-left-body {
          display: flex;
          font-family: Roboto, Helvetica, Arial, sans-serif;

          .el-divider {
            color: #dadce0;
            margin: 0 8px;
          }

          .itemRight-left-body-left {
            border-right: #5f6368;
          }

          .itemRight-left-body-mid {
            border-right: #5f6368;
          }

          .itemRight-left-body-right {
            border-right: #5f6368;
          }
        }

        .itemRight-left-foot {
          font-size: 12px;
          padding-top: 8px;
        }
      }

      .itemRight-right {
        display: flex;
        //justify-content: ;
        .workDetail{
          text-align: center;
          margin: 0 20px;
          margin-top: 10px;
          .num{
            color: #4285f4;
            font-size: 20px;
          }
        }
        .hasSubmit {
          height: 40px;
          color: #4285f4;
          background: #ecf3fe;
          border-color: #b3cefb;
        }
        .moreBox{
          height: 50px;
          border-left: 1px solid #e7ebf0;
          font-size: 12px;
          text-align: center;
          padding-left: 30px;
          padding-right: 40px;
          padding-top: 10px;
          .moreIcon{
            width: 20px;
          }
        }
      }
    }
  }
}
</style>