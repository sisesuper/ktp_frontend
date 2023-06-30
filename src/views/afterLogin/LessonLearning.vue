<template>
  <div class="lessonLearningPage">
    <el-tabs class="navBox" v-model="activeName" >
      <el-tab-pane label="目录" name="menu">
        <div class="amountBox">
          <span style="margin-right:8px ">共0个章节</span>
          <span>0个活动</span>
        </div>
      </el-tab-pane>
      <el-tab-pane label="作业" name="work">
        <div class="headBox">
          <div class="headText">共有{{workList.length}}项任务</div>
          <el-button v-if="$store.getters.user.role==='0'" round class="headBtn" @click="addFormVisible=true">＋ 添加作业</el-button>
        </div>
        <div class="workBox" v-if="workList.length!==0">
          <work-item @child-event="getWorkList" :task="item" v-for="(item,index) in workList" :key="index"></work-item>
        </div>
        <div class="noItemBox" v-if="workList.length===0">
          <img src="@/assets/images/afterLogin/noItem.png" alt="">
        </div>
      </el-tab-pane>
    </el-tabs>



    <el-dialog title="添加作业" :visible.sync="addFormVisible" @close="closeDialog('addForm')">
      <el-form :model="addForm" :rules="addRules" ref="addForm" label-width="100px">
        <el-form-item label="作业标题" prop="taskName">
          <el-input v-model="addForm.taskName" placeholder="作业标题" type="text" maxlength="70" show-word-limit></el-input>
        </el-form-item>
        <el-form-item  label="作业描述" prop="remarks">
          <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="addForm.remarks">
          </el-input>
        </el-form-item>
        <el-form-item  label="立即发布" prop="publishNow">
          <el-switch
              v-model="addForm.publishNow">
          </el-switch>
        </el-form-item>

        <el-form-item label="发布时间" prop="publishTime" v-if="addForm.publishNow">
          <el-date-picker
              v-model="addForm.publishTime"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="截至时间" prop="endTime" v-if="addForm.publishNow">
          <el-date-picker
              v-model="addForm.endTime"
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
              <el-button @click="closeDialog('addForm')">取 消</el-button>
            <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
            </span>
    </el-dialog>
  </div>

</template>

<script>
import WorkItem from "@/components/afterLogin/WorkItem";
import httpPost from "@/utils/axios/Home";

export default {
  name: "LessonLearning",
  components: {WorkItem},

  data(){
    return{
      activeName:"work",
      lessonId:'',
      addForm:{
        status:'',
        taskName:'',
        remarks:'',
        endTime:'',
        publishTime:'',
        file:'',
        publishNow:false,
      },
      fileList:[],
      addFormVisible:false,
      addRules: {
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
      workList:[]
    }
  },
  mounted() {
    this.lessonId = this.$route.query.lessonId;
    this.getWorkList()
  },
  created() {
    this.getQiniuyunToken();
  },
  methods:{
    getWorkList(){
      httpPost({lessonId:this.lessonId},'/taskList','POST').then(res=>{
        this.workList = res.data
      })
    },
    handleBeforeUpload(file){
      this.data.key=file.name
      console.log(file)
    },
    handleSuccess(response) {
      this.addForm.file=this.$fileBase+response.key
    },
    getQiniuyunToken(){
      httpPost({}, '/qiniu/token', 'GET').then(res=>{
          this.data.token=res
      })
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    handlePreview() {
      window.open(this.addForm.file);
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    checkEndDate(rule, value, callback) {
      const startTimeStamp = +new Date(this.addForm.publishTime); // 将开始时间转换为时间戳
      const endTimeStamp = +new Date(this.addForm.endTime); // 将结束时间转换为时间戳
      if (startTimeStamp>endTimeStamp) {
        callback(new Error('结束时间必须在开始时间之后'));
      } else {
        callback();
      }
    },
    closeDialog(){
          this.resetForm('addForm')
          this.addFormVisible = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (formName==='addForm'){
            this.addTask()
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    addTask(){
      this.addForm.lessonId=this.lessonId
      this.addForm.status=this.addForm.publishNow?'2':'1'
      httpPost(this.addForm,'/createTask','POST').then(res=>{
        if (res.code===200){
          this.closeDialog()
          this.getWorkList()
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  }
}
</script>

<style lang="scss">
.lessonLearningPage{
.el-tabs__header{
  margin: 12px 0;
.el-tabs__item{
  font-size: 16px;
  font-weight: 500;
}
.el-tabs__nav-wrap::after{
  content: none;
}
}

.navBox{
.amountBox{
  padding-top:10px;
  font-size: 14px;
}
  .headBox{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    .headBtn{
      color: #fff;
      background-color: #00ca90;
    }
  }
  .workBox{
    padding-top: 16px;
    border: 1px solid #e7ebf0;
    border-radius: 8px;
    margin-top: 8px;
    margin-bottom: 10px;

  }
  .noItemBox{
    text-align: center;
    margin-top: 20px;
  }
}
}
</style>