<template>
  <div class="courseCard" >
    <div class="picBox"  @click="goCourseDetail">
      <div class="semester">{{course.academicYear}} {{course.semester}}</div>
      <h3 class="courseName">{{course.name}}</h3>
      <p class="className">{{course.className}}</p>
      <div class="codeBox">
        <img class="codeIcon" src="@/assets/images/afterLogin/codeIcon.svg" alt="">
        <div class="code">加课码:{{course.id}}</div>
      </div>
    </div>
    <div class="cardBottom">
      <div class="bottomLeft">
          <span class="xue" v-if="course.role==='1'">
            学
          </span>
          <span class="xue" v-else>
            教
          </span>
        负责人:{{creatorName}}
      </div>
      <div class="bottomRight">
        <span style="cursor: pointer;" v-if="course.isTop==='1'" @click="cancelTop">取消置顶</span>
        <span style="cursor: pointer;" v-else @click="top">置顶</span>
        <el-dropdown placement="top" trigger="click" @command="handleCommand">
          <img class="more" src="@/assets/images/afterLogin/more.svg" alt="">
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item  command="quit">退课
            </el-dropdown-item>
            <el-dropdown-item command="toFile">归档
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

      </div>
    </div>
  </div>
</template>

<script>
import httpPost from "@/utils/axios/Home";

export default {
  name: "CourseCard",
  data(){
    return{
      creatorName:''
    }
  },
  props:['course'],
  mounted() {
    this.getUserInfo(this.course.creatorId)
  },
  methods:{
    goCourseDetail(){
      this.$router.push({name:'learning',
        query: {
          lessonId:this.course.lessonId
        }})
    }
    ,
    handleCommand(command){
      switch (command){
        case "toFile": this.toFile(); break;
        case "quit": this.quit() ; break;
      }
    },
    getUserInfo(id){
      httpPost({id:id},'/userList','POST').then((res)=>{
        this.creatorName = res.data.userName
      })
    },
    cancelTop(){
      httpPost({isTop:'0',lessonId:this.course.lessonId},'updateUserLesson','POST').then(res=>{
        console.log(res)
        this.$emit('child-event')
      })
    },
    top(){
      httpPost({isTop:'1',lessonId:this.course.lessonId},'updateUserLesson','POST').then(res=>{
        console.log(res)
        this.$emit('child-event')
      })
    },
    toFile(){
      httpPost({status:'2',lessonId:this.course.lessonId},'updateUserLesson','POST').then(res=>{
        console.log(res)
        this.$emit('child-event')
      })
    },
    quit(){
      httpPost({creatorId:this.course.creatorId,lessonId:this.course.lessonId},'delLesson','POST').then(res=>{
        console.log(res)
        this.$emit('child-event')

      })
    }
  }
}
</script>

<style scoped lang="scss">
.courseCard{
  font-size: 14px;
  border: 1px solid #e2e6ed;
  border-radius: 8px;
  overflow: hidden;
  margin: 11px;
  width: 255px;
.picBox{
  height: 152px;
  padding: 18px 24px;
  background: url('../../assets/images/afterLogin/courseCard1.jpg');
  background-size: cover;
  background-position: 50%;
  text-align: left;
.semester{
  font-size: 12px;
  color: #fff;
  opacity: .6;

}
.courseName{
  margin-top: 3px;
  color: #fff;
  font-weight: 500;
  font-size: 18px;
  line-height: 32px
}
.className{
  font-weight:500;
  font-size: 12px;
  line-height: 24px;
  color: #fff;

}
.codeBox{
  margin-top:18px ;
  display: flex;
.codeIcon{
  width: 14px;
  margin-right: 8px;
}
.code{
  color: #fff;
  font-size: 14px;
  line-height: 16px;
  font-weight: 500;
}
}
}
.cardBottom{
  display: flex;
  justify-content: space-between;
  height: 80px;
  padding:  48px 14px 12px 14px;
  font-weight: 400;
  color: #3c4043;
  font-size: 12px;
.bottomLeft{
.xue{
  display: inline-block;
  width: 20px;
  margin-right: 8px;
  height: 18px;
  color: #4285f4;
  border: 1px solid #4285f4;
  line-height: 15px;
}
}
.bottomRight{
    .more{
      width: 14px;
      vertical-align: middle;
      margin-left: 10px;
    }
  .el-dropdown-menu__item{
    line-height: 24px;
  }
}
}
}
</style>