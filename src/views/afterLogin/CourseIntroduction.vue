<template>
  <div class="courseIntroductionPage">
    <div class="navBox">
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="first">
          <div class="bodyBox">
            <div class="titleBox">
              基本信息
            </div>
            <div class="containBox">
              <div class="itemBox">
                <div class="itemKey">
                  课程名称
                </div>
                <div class="itemValue">
                  {{courseDetail.name}}
                </div>
              </div>
              <div class="itemBox">
                <div class="itemKey">
                  教学班级
                </div>
                <div class="itemValue">
                  {{courseDetail.className}}
                </div>
              </div>
              <div class="itemBox">
                <div class="itemKey">
                  学年-学期
                </div>
                <div class="itemValue">
                  {{courseDetail.academicYear}}{{courseDetail.semester}}
                </div>
              </div>
              <div class="itemBox">
                <div class="itemKey">
                  学时数
                </div>
                <div class="itemValue">
                  {{courseDetail.classHour}}
                </div>
              </div>
              <div class="itemBox">
                <div class="itemKey">
                  授课地点
                </div>
                <div class="itemValue">
                  {{courseDetail.venue}}
                </div>
              </div>
              <div class="itemBox">
                <div class="itemKey">
                  课程介绍
                </div>
                <div class="itemValue">
                  {{courseDetail.classIntroduction}}
                </div>
              </div>
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
  name: "CourseIntroduction",
  data() {
    return {
      lessonId:'',
      activeName: 'first',
      courseDetail:''
    }
  },
  mounted() {
    this.lessonId = this.$route.query.lessonId;
    httpPost({id:this.lessonId}, '/getLessonDetail', 'POST').then(res=>{
      this.courseDetail=res.data
      console.log(this.courseDetail)
    })
  }
}
</script>

<style lang="scss">
.courseIntroductionPage {
  .navBox {
    .el-tabs__header .el-tabs__nav-wrap::after {
      content: none;
    }

    margin-top: 16px;

    .el-tabs__item {
      font-size: 16px;
    }

    .bodyBox {
      background: #f8f9fa;
      margin-top: 16px;
      padding: 0 24px 24px 24px;

      .titleBox {
        text-align: left;
        padding: 24px 0;
      }

      .containBox {
        background: #fff;
        box-shadow: inset 4px 0 0 0 #4285f4;
        border-radius: 4px;
        border-right: 1px solid #dadce0;
        border-bottom: 1px solid #dadce0;

        .itemBox {
          border-top: 1px solid #dadce0;
          margin-left: 4px;
          font-size: 14px;
          padding: 16px 0;
          display: flex;

          .itemKey {
            width: 150px;
            padding: 0 24px;
            text-align: left;
          }

          .itemValue {
            color: #5f6368;

            .warnIcon {
              height: 16px;
              margin-right: 10px;
              vertical-align: middle;
            }
          }

          .clickText {
            color: #4285f4;
            font-size: 14px;
            cursor: pointer;
            flex: 1;
            text-align: right;
            padding-right: 24px;
          }
        }
      }
    }

  }
}
</style>