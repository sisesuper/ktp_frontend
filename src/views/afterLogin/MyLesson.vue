<template>
  <div class="myLessonPage">
    <el-dialog title="创建课程" width="70%" :visible.sync="createFormVisible" @close="closeDialog('createForm')">
      <el-form :model="createForm" :rules="createRules" ref="createForm" label-width="100px" label-position="left">
        <el-form-item label="课程名称" prop="name">
          <el-input v-model="createForm.name" type="text" maxlength="50" show-word-limit></el-input>

        </el-form-item>
        <el-form-item label="教学班级" prop="className">
          <el-input v-model="createForm.className" type="text" maxlength="30" show-word-limit></el-input>
        </el-form-item>

        <el-form-item class="academicYearAndsemester" label="选择学年 - 学期" required label-width="200px">

          <el-col :span="11">
            <el-form-item prop="academicYear">
              <el-select v-model="createForm.academicYear" placeholder="请选择">
                <el-option
                    v-for="item in academicYearRange"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item prop="semester">
              <el-select v-model="createForm.semester" placeholder="请选择">
                <el-option
                    v-for="item in semesterRange"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item
            class="classHour"
            label="课时数"
            prop="classHour"
        >
          <el-input v-model.number="createForm.classHour" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item  label="课程介绍" prop="classIntroduction">
          <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="createForm.classIntroduction">
          </el-input>
        </el-form-item>
        <el-form-item  label="授课地点" prop="venue">
          <el-input v-model="createForm.venue"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
              <el-button @click="closeDialog('createForm')">取 消</el-button>
            <el-button type="primary" @click="submitForm('createForm')">确 定</el-button>
            </span>
    </el-dialog>
    <el-dialog title="加入课程" :visible.sync="addFormVisible" @close="closeDialog('addForm')">
      <el-form :model="addForm" :rules="addRules" ref="addForm" label-width="100px">
        <el-form-item label="加课码" prop="code">
          <el-input v-model="addForm.code"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
              <el-button @click="closeDialog('addForm')">取 消</el-button>
            <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
            </span>
    </el-dialog>
    <div class="btns" v-if="Object.keys(topCourseList).length===0">
      <el-button class="titleBtn" v-if="$store.getters.user.role==='1'" @click="addFormVisible=true">+ 加入课程</el-button>
      <el-dropdown trigger="click" v-else @command="handleCommand">
        <el-button class="titleBtn">+ 创建/加入课程</el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item  command="create">创建课程</el-dropdown-item>
          <el-dropdown-item command="join" >加入课程</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="coursesCard" v-if="Object.keys(topCourseList).length>0">
        <div class="title">
          <div class="titleText" >置顶课程</div>
          <el-button class="titleBtn" v-if="$store.getters.user.role==='1'" @click="addFormVisible=true">+ 加入课程</el-button>
          <el-dropdown trigger="click" v-else @command="handleCommand">
            <el-button class="titleBtn">+ 创建/加入课程</el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item  command="create">创建课程</el-dropdown-item>
              <el-dropdown-item command="join" >加入课程</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      <div class="cardBox">
        <course-card v-for="(course,index) in topCourseList" @child-event="reflash" :key="index" :course="course"></course-card>
      </div>
    </div>
    <div class="lessonNav">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane v-if="$store.getters.user.role==='0'" label="我教的" name="first"></el-tab-pane>
        <el-tab-pane v-else label="我学的" name="first"></el-tab-pane>
        <el-tab-pane label="我协助的" name="second"></el-tab-pane>
      </el-tabs>
      <div class="navRight">
        <el-button class="navBtn" @click="archivesFormVisible=true">归档管理</el-button>
        <el-input class="search"
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
                  @blur="search(searchValue)"
            v-model="searchValue">
        </el-input>
      </div>
    </div>


    <el-dialog title="归档课程" id="dialog" width="884px" :visible.sync="archivesFormVisible" @open="openArchives" @close="closeDialog('archivesForm')">
            <div class="archivesHead">
              <el-tabs v-model="archivesActive" @tab-click="handleArchivesClick">
                <el-tab-pane v-if="$store.getters.user.role==='0'" label="我教的" name="first"></el-tab-pane>
                <el-tab-pane v-else label="我学的" name="first"></el-tab-pane>
                <el-tab-pane label="我协助的" name="second"></el-tab-pane>
              </el-tabs>
              <el-input class="search"
                        placeholder="请输入内容"
                        prefix-icon="el-icon-search"
                        @blur="archivesSearch(archivesSearchValue)"
                        v-model="archivesSearchValue">
              </el-input>
            </div>
            <div class="archivesBody">
              <div class="bodyLeft">
              <div class="bodyLeft-text" v-for="(value,index) in Object.keys(archivesSemesterCourseList)" :key="index" :class="activeText===value?'active':'normal'" @click="clickLeftText(value)">
                {{value}}
              </div>

              </div>
              <div class="bodyRight">
              <div class="bodyRight-text" @click="goCourseDetail(value.id)" v-for="(value,index) in archivesSemesterCourseList[activeText]" :key="index">
                <div class="bodyRight-text-left">
                <div class="bodyRight-text-bottom">
                  加课码 {{value.id}}
                </div>
                </div>
                <div class="bodyRight-text-right">
                  <div class="bodyRight-text-right-head">
                    {{value.className}}
                    <el-dropdown @command="handleArchivesCommand">
                      <span class="el-dropdown-link" @click.stop>
                      <img src="@/assets/images/afterLogin/more2.png" alt="">
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item :command="['back',value.id,value.creatorId]">恢复</el-dropdown-item>
                        <el-dropdown-item :command="['delete',value.id,value.creatorId]">删除</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                  <div class="bodyRight-text-right-body">
                    {{value.name}}
                  </div>
                  <div class="bodyRight-text-right-foot">
                    成员{{value.userNum}}人
                  </div>
                </div>
              </div>
               <template v-if="Object.keys(archivesSemesterCourseList).length===0">
                 <img class="interFileNoItem" src="@/assets/images/afterLogin/noItem.png" alt="">
                 暂无数据
               </template>
              </div>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="archivesFormVisible=false">确 定</el-button>
            </span>
      </el-dialog>



    <el-collapse v-model="activeNames" v-if="Object.keys(semesterCourseList).length>0">
      <div class="coursesCard bodyBox" v-for="(item,index) in semesterCourseList" :key="index">
          <el-collapse-item :name="index">
            <div class="title" slot="title">
              <div class="bodyText">{{index}}</div>
            </div>
            <div class="cardBox">
              <course-card @child-event="reflash" v-for="(course,index) in item" :key="index" :course="course"></course-card>
            </div>
          </el-collapse-item>
      </div>
    </el-collapse>
    <div class="lessonSorts" v-else>
      <img class="noItem" src="@/assets/images/afterLogin/noItem.png" alt="">
    </div>
  </div>
</template>

<script>
import CourseCard from "@/components/afterLogin/CourseCard";
import httpPost from "@/utils/axios/Home";
export default {
  name: "MyLesson",
  components: {CourseCard},
  data(){
    return{
      topCourseList:'',
      activeNames: [],
      archivesActive:'first',
      academicYearRange: [{
        value: '2020-2021',
        label: '2020-2021'
      }, {
        value: '2021-2022',
        label: '2021-2022'
      }, {
        value: '2022-2023',
        label: '2022-2023'
      }, {
        value: '2023-2024',
        label: '2023-2024'
      }],
      semesterRange: [{
        value: '全年',
        label: '全年'
      }, {
        value: '第一学期',
        label: '第一学期'
      }, {
        value: '第二学期',
        label: '第二学期'
      }],
      addForm:{
        code:'',
      },
    createForm:{
        name:'',
        className:'',
        academicYear:'',
        semester:'',
        classHour:'',
        classIntroduction:'',
        venue:""
      },
      activeName:'first',
      searchValue:'',
      archivesSearchValue:'',
      addRules: {
        code: [
          { required: true, message: '必填项', trigger: 'blur' },
        ],
      },
      createRules: {
        name: [
          { required: true, message: '必填项', trigger: 'blur' },
        ],
        className: [
          { required: true, message: '必填项', trigger: 'blur' },
        ],
        academicYear: [
          { required: true, message: '必填项', trigger: 'blur' },
        ],
        semester: [
          { required: true, message: '必填项', trigger: 'blur' },
        ],
        classHour:[{ required: true, message: '年龄不能为空'},
                { type: 'number', message: '年龄必须为数字值'}]
      },
      createFormVisible:false,
      addFormVisible:false,
      archivesFormVisible:false,
      courseList:[],
      archivesCourseList:[],
      archivesSemesterCourseList:{},
      semesterCourseList:{},
      activeText:'',
      param:{
        role:'',
        status:''
      }
    }
  },
  mounted() {
    this.param.role='0'
    this.param.status='1'
    this.getTopList()
    this.getCourseList()
  },

  methods: {
    goCourseDetail(lessonId){
      this.$router.push({name:'learning',
        query: {
          lessonId:lessonId
        }})
    },
    clickLeftText(text){
      this.activeText=text
    },
    reflash(){
      this.getTopList()
      this.getCourseList()
    },
    getTopList() {
      httpPost({}, '/getTopLessonList', 'POST').then(res=>{
        this.topCourseList = res.data;
      })
    },
    getCourseList() {
       httpPost(this.param, '/getLessonList', 'POST').then(res=>{
         this.courseList = res.data;
         this.semesterCourseList={}
         if (this.courseList){
           for (let i = 0; i < this.courseList.length; i++) {
             let key = this.courseList[i].academicYear+' '+this.courseList[i].semester
             if (Object.prototype.hasOwnProperty.call(this.semesterCourseList, key)){
               this.semesterCourseList[key].push(this.courseList[i])
             }else {
               this.semesterCourseList[key]= [this.courseList[i]]
             }
           }
           console.log(this.semesterCourseList)
         }
       })
    },
    getArchivesCourseList() {
      httpPost(this.param, '/getLessonList', 'POST').then(res=>{
        this.archivesCourseList = res.data;
        this.archivesSemesterCourseList={}
        if (this.archivesCourseList){
          for (let i = 0; i < this.archivesCourseList.length; i++) {
            let key = this.archivesCourseList[i].academicYear+' '+this.archivesCourseList[i].semester
            if (Object.prototype.hasOwnProperty.call(this.archivesSemesterCourseList, key)){
              this.archivesSemesterCourseList[key].push(this.archivesCourseList[i])
            }else {
              this.archivesSemesterCourseList[key]= [this.archivesCourseList[i]]
            }
          }
          console.log(this.archivesSemesterCourseList)
        }
        this.activeText = Object.keys(this.archivesSemesterCourseList)[0]
      })
    },
    handleClick(tab){
      switch (tab.label){
        case '我学的':
          this.param.role='1'
          this.getCourseList();break;
        case '我教的':
          this.param.role='0'
          this.getCourseList();break;
        case '我协助的':
          this.param.role='2'
          this.getCourseList();break;
      }
    },
    handleArchivesClick(tab){
      switch (tab.label){
        case '我学的':
          this.param.role='1'
          this.getArchivesCourseList();break;
        case '我教的':
          this.param.role='0'
          this.getArchivesCourseList();break;
        case '我协助的':
          this.param.role='2'
          this.getArchivesCourseList();break;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
           if (formName==='addForm'){
             this.addCourse()
           }
           else if(formName==='createForm'){
             this.createCourse()
           }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    createCourse(){
      httpPost(this.createForm,'/createLesson','POST').then((res)=>{
        if (res.code===200){
          this.$message({
            message: 'submit success!',
            type: 'success'
          });
          this.closeDialog('createForm')
          this.reflash()
        }
      })
    },
    addCourse(){
      this.addForm.role = this.$store.getters.user.role==='0'?'2':'1'
      httpPost(this.addForm,'/joinLesson','POST').then((res)=>{
        if (res.code===200){
          this.$message({
            message: 'add success!',
            type: 'success'
          });
          this.closeDialog('addForm')
          this.reflash()
        }
      })
    },
    openArchives(){
      this.param.status='2'
      this.archivesActive = 'first'
      this.param.role='0'
      this.getArchivesCourseList()
    },
    closeDialog(formName){
      switch (formName){
        case 'createForm':
          this.resetForm(formName)
          this.createFormVisible = false;break;
        case 'addForm':
          this.resetForm(formName)
          this.addFormVisible = false;break;
        case 'archivesForm':
          this.param.name=''
          this.param.status='1'
          this.archivesSearchValue=''
          this.archivesFormVisible = false
          this.reflash();break;
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleCommand(command){
      switch (command){
        case "join": this.addFormVisible = true; break;
        case "create": this.createFormVisible = true; break;
      }
    },
    handleArchivesCommand(command){
      switch (command[0]){
        case "back": this.archivesBack(command[1]); break;
        case "delete": this.archivesDelete(command[1],command[2]); break;
      }
    },
    archivesBack(lessonId){
        httpPost({status:'1',lessonId:lessonId},'/updateUserLesson','POST').then(res=>{
          console.log(res)
          this.getArchivesCourseList()
        })
    },
    archivesDelete(lessonId,creatorId){
      httpPost({creatorId:creatorId,lessonId:lessonId},'/delLesson','POST').then(res=>{
        console.log(res)
        this.getArchivesCourseList()
      })
    },
    search(value){
      this.param.name=value
      this.getCourseList()
    },
    archivesSearch(value){
      this.param.name=value
      this.getArchivesCourseList()
    }
  }
  }

</script>

<style lang="scss">
.myLessonPage {
  font-size: 14px;
  max-width: 1150px;

  margin: 0 auto;
  .btns{
    display: flex;
    justify-content: right;
    .titleBtn{
      color: #fff;
      background-color: #4285f4;
    }
  }
  .el-tabs__header {
    margin: 0;
  }
  .el-tabs__nav-scroll {
    .el-tabs__item {
      font-size: 16px;
      font-weight: 500;
    }
  }
  #dialog{
    .el-dialog__footer {
      padding: 24px;
      box-shadow: 0 0 10px 0 rgba(0,0,0,.1);
    }
  }
  .el-dialog {
    border-radius: 8px;

    .el-dialog__header {
      display: flex;
      padding: 18px 24px;
      height: 50px;
      line-height: 12px;
      border-bottom: 1px solid #dadce0;

      .el-dialog__title {
        font-size: 16px;
        color: #3c4043;
        font-weight: 700;
      }
    }

    .el-dialog__body {
      padding: 20px 15px 15px 15px;
      border-bottom: 1px solid #dadce0;
      .el-tabs__nav-wrap::after{
        content: none;
      }
      .academicYearAndsemester {
        text-align: left;
      }
      .classHour{
        width: 200px;
      }
      .archivesHead{
        display: flex;
        justify-content: space-between;
        .el-tabs{
          width: fit-content;
        }
        .search {
          .el-input__inner {
            border-radius: 51px;
          }
          width: 200px;
        }
      }
      .archivesBody{
        border-top: 1px solid #dadce0;
        margin-top: 30px;
        display: flex;
        justify-content: center;
        .bodyLeft{
          overflow: auto;

          width: 256px;
          height: 400px;
          border-right: 1px solid #dadce0;
          .active{
            background: #e8f0ff;
            color: #4285f4;
            padding: 24px;
            line-height: 16px;
            border-left: 2px solid transparent;
            border-left-color: #4285f4;
          }
          .normal{
            padding: 24px;
            line-height: 16px;
          }
        }
        .bodyRight{
          overflow: auto;
          padding-left: 24px;
          padding-top: 24px;
          width: 100%;
          height: 400px;
          .interFileNoItem{
            display: block;
            height: 184px;
            margin: 0 auto;
          }
          .bodyRight-text{
            margin-bottom: 16px;
            width: 100%;
            height: 112px;
            padding: 16px;
            background: #fff;
            border: 1px solid #dadce0;
            border-radius: 4px;
            display: flex;
            .bodyRight-text-left{
              margin-right: 16px;
              position: relative;
              min-width: 96px;
              height: 80px;
              background-image: url('../../assets/images/afterLogin/courseCard1.jpg');
              border-radius: 8px 8px 0 0;
              cursor: pointer;
              .bodyRight-text-bottom{
                position: absolute;
                bottom: 0;
                left: 0;
                width: 96px;
                height: 24px;
                background: rgba(0,0,0,.4);
                font-size: 12px;
                font-weight: 600;
                text-align: center;
                color: #fff;
                line-height: 24px;
              }
            }

            .bodyRight-text-right{
              width: 100%;
              .bodyRight-text-right-head{
                width: 100%;
                font-size: 14px;
                font-weight: 400;
                text-align: left;
                color: #333;
                line-height: 20px;
                display: flex;
                justify-content: space-between;
              }
              .bodyRight-text-right-body{
                margin-top: 4px;
                font-size: 18px;
                font-weight: 500;
                text-align: left;
                color: #333;
                line-height: 24px;
                cursor: pointer;
              }
              .bodyRight-text-right-foot{
                margin-top: 6px;
                display: flex;
              }
            }
          }
        }
      }
    }
    .el-dialog__footer{
      padding: 10px 20px 10px;
      text-align: right;
      box-sizing: border-box;
    }
  }
  .coursesCard {
    border: 1px solid #dadce0;
    padding: 18px;
    border-radius: 8px;

    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .titleText {
        font-size: 20px;
        font-weight: 500;
      }

      .titleBtn {
        color: #fff;
        background-color: #4285f4;
      }

    }
  }

  .cardBox {
    display: flex;
    flex-wrap: wrap;
    margin-top: 8px;
  }

  .lessonNav {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;


    .navRight {
      display: flex;

      .navBtn {
        margin-right: 24px;
      }

      .search {
        .el-input__inner {
          border-radius: 51px;
        }
      }

    }
  }

  .lessonSorts {
    .noItem {
      height: 184px;
      margin: 100px 0 12px 0;

    }
  }

  .el-collapse{
    border: none;
    .el-collapse-item__header{
      background-color: #f8f9fa;
      border: none;
      color: #000;
      height: 24px;
      line-height: 24px;

    }
    .el-collapse-item__content{
      padding-bottom: 0;
    }
    .el-collapse-item__wrap{
      border: none;
      background-color: #f8f9fa;
    }
    .bodyBox {
      background: #f8f9fa;
      margin-bottom: 24px;
      border: 1px solid #dadce0;
      border-radius: 8px;
      padding: 18px;
      .bodyText {
        font-size: 16px;

      }
    }
  }


}
</style>