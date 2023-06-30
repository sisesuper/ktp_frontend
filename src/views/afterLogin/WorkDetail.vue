<template>
  <div class="WorkDetailPage">
    <div class="JobDetailHead">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="详情" name="first">
          <div class="JobDetailBody">
            <div class="list-card">
              <span class="Tip-Position">
                作业
              </span>
              <div class="margin-top">
                <header class="flex-align" style="margin-bottom: 0">
                  <div class="h-left">
                    <div class="title flex-align">
                      <h4 class="common_pointer">{{taskDetail.taskName}}</h4>
                    </div>
                  </div>
                </header>
                <div class="tags">
                  <span class="el-tag">个人作业</span>
                  <span class="el-tag">提交起止时间： {{publishTime}}~{{endTime}}</span>
                  <span class="tag-gray">查重</span>
                  <span class="tag-gray">允许超时提交</span>
                </div>
                <div class="homework-description">
                  {{taskDetail.remarks}}
                </div>
              </div>
            </div>
          </div>
          <div class="annex-box" v-if="taskDetail.file">
            <div class="title font16 mb24">
              作业附件
              <span class="font12 tip">1个</span>
            </div>
            <div class="attachment flex-between mb16">
              <div class="flex-align file">
                <div class="left">
                  <img src="@/assets/images/afterLogin/task.png" alt="task">

                </div>
                <div class="right">
                  <h3>{{taskDetail?taskDetail.file.split("com/")[1]:''}}</h3>
                </div>
              </div>
              <div class="opt">
                <div>
                  <button type="button" class="el-button el-button--text el-button--mini">
                    <span @click="downLoad(taskDetail.file)">下载</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="提交作业" name="second" v-if="$store.getters.user.role==='1'">
          <div class="Caps-student-submit">
            <div class="detail-header">
              <div class="cmp-work-list-card">
                <div class="layout-left flex-align">
                  <img src="@/assets/images/afterLogin/work.png"  alt="">
                  <div class="another-name">
                    <span class="lable-type">作业</span>
                  </div>
                </div>
                <div class="layout-right">
                  <header class="flex-align" style="margin-bottom: 0">
                    <div class="h-left">
                      <div class="title flex-align">
                        <h4 class="common_pointer">{{taskDetail.taskName}}</h4>
                      </div>
                    </div>
                  </header>
                  <div class="tags">
                    <span class="el-tag">个人作业</span>
                    <span class="el-tag">提交起止时间： {{publishTime}}~{{endTime}}</span>
                    <span class="tag-gray">查重</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="el-divider el-divider--horizontal">
            </div>
            <div class="submit-content mb24">
              <div class="flex-between mb24">
                <div class="font20">
                  提交内容
                </div>
                <div>
                  <button v-if="userTaskDetail.marking==='0'" type="button" class="el-button el-button--primary el-button--small">
                    <span v-if="userTaskDetail.submit==='1'" @click="submit">更新提交</span>
                    <span v-else @click="submit">提交</span>
                  </button>
                  <button v-if="userTaskDetail.marking==='1'" type="button" class="el-button el-button--primary el-button--small" style="font-size: 30px">
                    {{userTaskDetail.score}}分
                  </button>
                </div>
              </div>
              <el-form :model="submitForm" ref="submitForm" label-width="100px">
                <el-form-item  label="答案">
                  <el-input
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 4}"
                      placeholder="请输入答案"
                      v-model="submitForm.answer">
                  </el-input>
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
              <div class="annex-box"  v-if="userTaskDetail.file">
                <div class="title font16 mb24">
                  作业附件
                  <span class="font12 tip">1个</span>
                </div>
                <div class="attachment flex-between mb16">
                  <div class="flex-align file">
                    <div class="left">
                      <img src="@/assets/images/afterLogin/task.png" alt="task">

                    </div>
                    <div class="right">
                      <h3>{{userTaskDetail?userTaskDetail.file.split("com/")[1]:''}}</h3>
                    </div>
                  </div>
                  <div class="opt">
                    <div>
                      <button type="button" class="el-button el-button--text el-button--mini">
                        <span @click="downLoad(userTaskDetail.file)">下载</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </el-tab-pane>
       <el-tab-pane label="批阅" name="third" v-else>
         <div class="readoverBox">
           <div class="headerBox">
             {{taskDetail.taskName}}
           </div>
           <div class="topBox">
             <el-tag>截至: {{endTime}}</el-tag>
             <el-tag type="info">个人作业</el-tag>
             <el-tag type="info">查重</el-tag>
           </div>
           <div class="listBox">


             <el-table
                 :data="tableData"
                 style="width: 100%">
               <el-table-column
                   label="姓名"
                   width="180"
                   prop="name"
               >
               </el-table-column>
               <el-table-column
                   label="答案"
                   width="400">
                 <template slot-scope="scope">
                   <el-input
                       type="textarea"
                       :autosize="{ minRows: 2, maxRows: 4}"
                        v-model="scope.row.answer">
                   </el-input>
                 </template>
               </el-table-column>
               <el-table-column
                   label="附件"
                   width="200">
                 <template slot-scope="scope" v-if="scope.row.file!==''">
                   <el-link type="primary" @click="downLoad(scope.row.file)">下载</el-link>
                 </template>

               </el-table-column>
               <el-table-column
                   label="得分"
                   width="180">
                 <template slot-scope="scope">
                   <el-input v-model="scope.row.score"></el-input>
                 </template>

               </el-table-column>

               <el-table-column label="操作">
                 <template slot-scope="scope">
                   <el-button
                       size="mini"
                       type="danger"
                       @click="handleEdit(scope.row)">打分</el-button>
                 </template>
               </el-table-column>
             </el-table>
           </div>
         </div>
       </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script>
import httpPost from "@/utils/axios/Home";

export default {
  name: "WorkDetail",
  data() {
    return {
      activeName: 'first',
      taskId:'',
      taskDetail:'',
      userTaskDetail:'',
      submitForm:{
        answer:'',
        file:'',
      },
      fileList:[],
      data:{
        token:''
      },
      tableData: []
    };
  },
  computed:{
    publishTime(){
      const date = new Date(this.taskDetail.publishTime);
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      const hour = ("0" + date.getHours()).slice(-2);
      const minute = ("0" + date.getMinutes()).slice(-2);

      const formattedDate = `${year}/${month}/${day} ${hour}:${minute}`;
      return formattedDate
    },
    endTime(){
      const date = new Date(this.taskDetail.endTime);
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      const hour = ("0" + date.getHours()).slice(-2);
      const minute = ("0" + date.getMinutes()).slice(-2);
      const formattedDate = `${year}/${month}/${day} ${hour}:${minute}`;
      return formattedDate
    },
  },
  mounted() {
    this.taskId = this.$route.query.taskId;
    this.getQiniuyunToken()
    this.getTaskDetail()
  },
  methods: {
    handleBeforeUpload(file){
      this.data.key=file.name
      console.log(file)
    },
    handleSuccess(response) {
      this.submitForm.file=this.$fileBase+response.key
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
    getTaskUnit(){
      httpPost({taskId:this.taskId},'/getTaskUnit','POST').then(res=>{
        this.userTaskDetail=res.data
      })
    },
    handleClick(tab) {
      if (tab.name==='second'){
        this.getTaskUnit()
      }
      else if (tab.name==='third'){
        httpPost({taskId:this.taskId},'/getAnswerInfo','POST').then(res=>{
          this.tableData=[]
          if (res.data){
            for (let i = 0; i < res.data.length; i++) {
              this.tableData.push({
                name: res.data[i].userName,
                answer: res.data[i].answer,
                file: res.data[i].file,
                studentId: res.data[i].studentId,
                score:res.data[i].score
              })
            }
          }
        })
      }
    },
    getTaskDetail(){
      httpPost({taskId:this.taskId},'/getTask','POST').then(res=>{
        this.taskDetail=res.data[0]
      })
    },
    downLoad(url){
      window.open(url);
    },
    submit(){
      this.submitForm.taskId=this.taskId
      httpPost(this.submitForm,'/submitTask','POST').then(res=>{
        console.log(res)
        this.$message({
          message: '提交成功!',
          type: 'success'
        });
        this.getTaskUnit()

      })
    },
    handleEdit(row) {
      let param={
        studentId:row.studentId,
        taskId:this.taskId,
        score:row.score
      }
      httpPost(param,'/updateScore','POST').then(res=>{
        console.log(res)
        this.$message({
          message: '打分成功!',
          type: 'success'
        });
      })
    },

  }
}


</script>

<style lang="scss">
.WorkDetailPage {
  width: 1224px;
  height: 1000px;
  margin: auto;
  .annex-box {
    margin-top: 20px;
    font-size: 14px;
    padding: 24px;
    border-radius: 8px;
    border: 1px solid #dadce0;
    .title{
      text-align: left;
    }
    .attachment {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      height: 72px;
      padding: 16px;
      background: #fff;
      border-radius: 8px;
      border: 1px solid #dadce0;

      .file {
        border-radius: 8px;
        width: 100%;
        height: 100%;
        .right{
          h3{
            font-weight: normal
          }
        }
      }

      .flex-align {
        display: flex;
        align-items: center;
      }

      .left {
        margin-right: 14px;

        img {
          width: 33px;
          height: 40px;
        }
      }

      .mb16 {
        margin-bottom: 16px;
      }

      .flex-between {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      text-align: left;
    }
  }
  .JobDetailHead {
    .el-tabs__nav-wrap::after {
      content: none;
    }

    .el-tabs__item {
      padding: 0 20px;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      font-weight: 500;
      color: #303133;
    }
  }

  .JobDetailBody {
    border-radius: 4px;
    border: 1px solid #ccc;
    padding: 12px;

    .list-card {
      width: 100%;
      display: flex;
      position: relative;

      .Tip-Position {
        position: absolute;
        background: #31ccd2;
        color: #fff;
        font-size: 14px;
        left: -12px;
        top: -12px;
        border-bottom-right-radius: 4px;
        text-align: center;
        padding: 8px;
      }

      .margin-top {
        margin-top: 30px;

        .flex-align {
          display: flex;
          align-items: center;

          .h-left {
            .title flex-align {
              line-height: 20px;

              .common_pointer {
                font-size: 16px;
                font-weight: 500;
                margin-right: 5px;
                max-width: 670px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
        }

        .tags {
          text-align: left;
          padding: 6px 0;

          .el-tag {
            height: 20px;
            padding: 0 5px;
            line-height: 19px;
            margin-right: 6px;
          }

          .tag-gray {
            margin-right: 6px;
            background-color: #f8f9fa;
            border-color: #f8f9fa;
            display: inline-block;
            font-size: 12px;
            color: #909399;
            border-width: 1px;
            border-style: solid;
            border-radius: 4px;
            box-sizing: border-box;
            white-space: nowrap;
            height: 20px;
            padding: 0 5px;
            line-height: 19px;
          }
        }

        .homework-description {
          text-align: left;
          font-weight: normal;
        }
      }
    }
  }

  .Caps-student-submit {
    width: 1224px;
    margin: 0 auto;
    font-size: 12px;

    .detail-header {
      position: relative;

      .cmp-work-list-card {
        width: 100%;
        display: flex;
        position: relative;

        img {
          border: none;
        }

        .layout-left {
          flex-direction: column;
          min-width: 55px;
          margin-right: 16px;
          font-size: 12px;

          img {
            width: 40px;
            height: 40px;
            margin-bottom: 10px;
          }

          .another-name {
            position: relative;
            margin-top: 5px;
            line-height: 13px;
            display: inline-block;
            width: 85px;
            text-align: center;
            max-height: 31px;
            margin-bottom: 2px;

            .lable-type {
              color: #3c4043;
              font-size: 13px;
              overflow: hidden;
              text-overflow: ellipsis;
              max-width: 65px;
              max-height: 30px;
              line-height: 15px;
              word-break: break-all;
              display: inline-block;
              text-align: center;
            }
          }
        }

        .flex-align {
          display: flex;
          align-items: center;
        }

        .layout-right {
          width: 100%;

          header {
            justify-content: space-between;
          }

          .tags {
            text-align: left;
            padding: 6px 0;

            .el-tag {
              height: 20px;
              padding: 0 5px;
              line-height: 19px;
              margin-right: 6px;
            }

            .tag-gray {
              margin-right: 6px;
              background-color: #f8f9fa;
              border-color: #f8f9fa;
              display: inline-block;
              font-size: 12px;
              color: #909399;
              border-width: 1px;
              border-style: solid;
              border-radius: 4px;
              box-sizing: border-box;
              white-space: nowrap;
              height: 20px;
              padding: 0 5px;
              line-height: 19px;
            }
          }

          .flex-align {
            display: flex;
            align-items: center;

            .h-left {
              .title {
                line-height: 20px;

                h4 {
                  font-size: 16px;
                  font-weight: 500;
                  margin-right: 5px;
                  max-width: 670px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }

                .common_pointer {
                  user-select: none;
                  cursor: pointer;
                }
              }

              .flex-align {
                display: flex;
                align-items: center;
              }
            }

            .h-right {
              text-align: right;
            }

            .font14 {
              font-size: 14px;
            }
          }
        }
      }

      .right-btn {
        position: absolute;
        top: 0;
        right: 0;
      }
    }

    .el-divider--horizontal {
      display: block;
      height: 1px;
      width: 100%;
      margin: 12px 0;
    }

    .el-divider {
      background-color: #dadce0;
      position: relative;
    }

    .opt {
      color: #4285f4;

      span {
        margin-left: 38px;
        cursor: pointer;
      }
    }

    span {
      outline: none;
    }

    .font14 {
      font-size: 14px;
    }

    .mb24 {
      margin-bottom: 24px;

      .flex-between {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .font20 {
          font-size: 20px;

          .el-button--text {
            color: #4285f4;
            background: 0 0;
            padding-left: 0;
            padding-right: 0;
          }

          .el-button--medium {
            padding: 10px 20px;
            font-size: 14px;
            border-radius: 4px;
          }

          .el-button {
            display: inline-block;
            line-height: 1;
            white-space: nowrap;
            cursor: pointer;
            background: #fff;
            -webkit-appearance: none;
            text-align: center;
            box-sizing: border-box;
            outline: 0;
            margin: 0;
            transition: .1s;
            font-weight: 500;
            padding: 12px 20px;
            font-size: 14px;
            border-radius: 4px;
          }
        }
      }
    }

    .font16 {
      font-size: 16px;
    }

    .tip {
      color: #74787c;
      margin-left: 8px;
    }

    .font12 {
      font-size: 12px;
    }

    span {
      outline: none;
    }


  }
  .readoverBox{
    margin: 0;
    padding: 0;
    border: 0;
    outline: none;
    font-weight: 400;
    vertical-align: baseline;
    font-family: Roboto,Helvetica,Arial,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    .headerBox{
      font-size: 20px;
      font-weight: 500;
      text-align: left;
      color: #3c4043;
    }
    .topBox{
      display: flex;
      margin-top: 8px;
      margin-bottom: 15px;
    }
    .listBox{
      display: flex;
      //.blockBox{
      //  height: 100%;
      //  width: 320px;
      //}
      //.tableBox{
      //  line-height: 60px;
      //  width: 50%;
      //  color: #909399;
      //}
      .studentworkBox{
        display: flex;
        justify-content: flex-end;
        .studentBox{
          padding:0 10px 0 10px;
          background-color: #fff;
          .studentName{
            text-align: left;
            font-size: 14px;
            font-weight: 700;
            color: #2d2d2d;
          }
          .studentNum{
            display: block;
          }
        }
        .gradeBox{
        }
      }
    }
    .paginationBox{
      text-align: center;
      white-space: nowrap;
      padding: 2px 5px;
      color: #303133;
      font-weight: 700;
    }
  }
}
</style>