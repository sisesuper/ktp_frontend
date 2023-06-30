<template>
  <div class="courseDetailPage">
    <div class="head">
      <div class="headPic">
        <h1 class="courseName">{{courseDetail.name}}</h1>
        <h2 class="className">{{courseDetail.className}}</h2>
        <div class="codeBox">
          <img class="codeIcon" src="@/assets/images/afterLogin/codeIcon.svg" alt="">
          <div class="code">加课码:{{courseDetail.id}}</div>
          <div class="text" >已有{{courseDetail.userNum}}人加入</div>
        </div>
        <el-button class="headPicBtn" disabled><i class="el-icon-video-play"></i>暂无课堂</el-button>
      </div>
      <div class="headNav">
        <div class="navBtns">
          <div class="btn" :class="select==='learning'?'active':''" @click="selector('learning')">课程学习</div>
          <div class="btn" :class="select==='analyse'?'active':''" @click="selector('analyse')">学期分析</div>
          <div class="btn" :class="select==='scores'?'active':''" @click="selector('scores')">成绩管理</div>
          <div class="btn" :class="select==='introduction'?'active':''" @click="selector('introduction')">课程介绍</div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import httpPost from "@/utils/axios/Home";
export default {

  name: "courseDetail",

  data(){
    return{
      select:'learning',
      lessonId:'',
      courseDetail:''
    }
  },
  mounted() {
    this.lessonId = this.$route.query.lessonId;
    httpPost({id:this.lessonId}, '/getLessonDetail', 'POST').then(res=>{
      this.courseDetail=res.data
      console.log(this.courseDetail)
    })
  },
  methods:{
    selector(index){0
      if (this.$route.name!==index){
        this.select = index
        this.$router.push({name:index,
          query: {
            lessonId: this.lessonId,
          }
        })
        console.log(this.$route)
      }
    }
  }

}
</script>

<style lang="scss">
.courseDetailPage {
  text-align: left;
  margin: 0 auto;
  max-width: 1224px;
  background-color: #fff;

  .head {
    overflow: hidden;
    border-radius: 8px;
    color: rgb(255, 255, 255);
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);

    .headPic {
      position: relative;
      background-image: url('../../assets/images/afterLogin/classCover.png');
      height: 200px;
      padding: 24px;

      .courseName {
        font-size: 36px;
        font-weight: 400;
      }

      .className {
        font-size: 20px;
        line-height: 32px;
        font-weight: 400;
      }

      .codeBox {
        margin-top: 55px;
        display: flex;
        line-height: 16px;
        .codeIcon {
          width: 16px;
        }

        .code {
          font-size: 14px;
          line-height: 16px;
          font-weight: 500;
          margin-right: 16px;
        }
        .text{
          font-size: 14px;
        }
      }
      .headPicBtn{
        position: absolute;
        right: 24px;
        bottom: 24px;
        cursor: not-allowed;
        padding: 10px 20px;
        border-radius: 20px;
        font-size: 14px;
        .el-icon-video-play{
          font-size: 16px;
          margin-right: 8px;
        }
      }
    }

    .headNav {
      box-shadow: 0 2px 4px 0 rgba(0,0,0,.1);
      padding: 12px 0;
      height: 64px;
      .navBtns{
        margin: 0 auto;
        color: rgb(60, 64, 67);
        display: flex;
        width: fit-content;
        .btn{
          margin: 0 24px;
          padding: 0 5px;
          font-size: 20px;
          line-height: 40px;
          border-radius: 10px;
        }
        .active{
          background: #e8f0ff;
          color: #4285f4;
        }
      }
    }
  }


}

</style>