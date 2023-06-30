<template>
  <el-container class="mainPage">

    <el-drawer
        @open="openDrawer"
        :visible.sync="drawer"
        direction="ltr"
        close-icon-position="inside"
        size="15%">
      <div class="title" slot="title">
        <img height="24px" src="../../assets/images/preLogin/logo.png"/>
      </div>
      <div class="el-drawer__body">
        <ul>
          <li @click="goMyLesson" class="el-menu-item">我的课堂</li>
        </ul>
        <el-collapse v-model="activeNames" @change="handleChange" v-if="teachCourse">
          <el-collapse-item title="我教的课程" name="1">

            <div class="el-drawer__body-Box" v-for="(item,index) in teachCourse" :key="index">
            <div class="el-drawer__body-Box-left">
            </div>
              <div class="el-drawer__body-Box-right">
                <div class="el-drawer__body-Box-right-top">
                  {{item.name}}
                </div>
                <div class="el-drawer__body-Box-right-bottom">
                  {{item.className}}
                </div>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item title="我学的课程" name="2" v-if="learnCourse">

            <div class="el-drawer__body-Box"  v-for="(item,index) in learnCourse" :key="index">
              <div class="el-drawer__body-Box-left">
              </div>
              <div class="el-drawer__body-Box-right">
                <div class="el-drawer__body-Box-right-top">
                  {{item.name}}
                </div>
                <div class="el-drawer__body-Box-right-bottom">
                  {{item.className}}
                </div>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item title="我协助的课程" name="3" v-if="helfCourse">

            <div class="el-drawer__body-Box" v-for="(item,index) in helfCourse" :key="index">
              <div class="el-drawer__body-Box-left">
              </div>
              <div class="el-drawer__body-Box-right">
                <div class="el-drawer__body-Box-right-top">
                  {{item.name}}
                </div>
                <div class="el-drawer__body-Box-right-bottom">
                  {{item.className}}
                </div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-drawer>



    <el-header class="header" style="height: 64px;">

      <router-link class="logoBox" to="/homePage" v-if="isShow"><img class="logo" src="@/assets/images/preLogin/logo.png" alt="logo" ></router-link>

      <el-tabs v-model="activeName" v-if="isShow">
        <el-tab-pane label="我的课堂" name="first"></el-tab-pane>
      </el-tabs>

      <div v-if="!isShow" class="header-content">
        <div class="menuBox">
          <img src="../../assets/images/afterLogin/img.png" height="28" width="30" @click="drawer = true" type="primary"/>
        </div>
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ name: 'myLesson' }">我的课堂</el-breadcrumb-item>
          <el-breadcrumb-item v-if="lastBreadcrumb && !isLastBreadcrumbActive" :to="{ name: lastBreadcrumb.name, params: lastBreadcrumb.params }">{{ lastBreadcrumb.title }}</el-breadcrumb-item>
          <el-breadcrumb-item v-else>{{ lastBreadcrumb.title }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <header-right></header-right>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import HeaderRight from "@/components/afterLogin/HeaderRight";
import httpPost from "@/utils/axios/Home";

export default {
  name: "MyMain",
  components: {HeaderRight},
  data(){
    return{
      activeName:'first',
      isShow: this.$store.getters.show,
      drawer: false,
      activeNames:'',
      breadcrumbItems: [],
      teachCourse:'',
      helfCourse:'',
      learnCourse:'',
    }
  },
  created() {
    this.$store.watch(
        () => this.$store.getters.show,
        (newVal) => {
          this.isShow = newVal;
        }
    );
  },
  computed: {
    lastBreadcrumb() {
      // 获取最后一个面包屑标签的路由信息
      if (this.breadcrumbItems.length > 0) {
        return this.breadcrumbItems[this.breadcrumbItems.length - 1];
      } else {
        return null;
      }
    },
    isLastBreadcrumbActive() {
      // 判断最后一个面包屑标签是否为当前页面
      if (this.lastBreadcrumb && this.$route.name === this.lastBreadcrumb.name) {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted() {
    this.updateBreadcrumb();
  },
  watch: {
    $route() {
      this.updateBreadcrumb();
    }
  },
  methods: {
    getCourseList() {

    },
    openDrawer(){

      httpPost({role:'2',status:'1'}, '/getLessonList', 'POST').then(res=>{
        this.helfCourse = res.data;
      })

      if (this.$store.getters.user.role==='1'){
        httpPost({role:'1',status:'1'}, '/getLessonList', 'POST').then(res=>{
          this.learnCourse = res.data;
        })
      }
      else {
        httpPost({role:'0',status:'1'}, '/getLessonList', 'POST').then(res=>{
          this.teachCourse = res.data;
        })
      }

    },
    handleChange(val) {
      console.log(val);
    },
    goMyLesson(){
      this.drawer = false
      this.$router.push({name:'myLesson'});
    },
    updateBreadcrumb() {
      this.breadcrumbItems = [];
      let route = this.$route;
      while (route) {
        if (route.meta && route.meta.title) {
          this.breadcrumbItems.unshift({
            name: route.name,
            title: route.meta.title,
            params: route.params
          });
        }
        route = route.parent;
      }
    }
  }

}
</script>

<style lang="scss">
.mainPage{
  .header{
    background-color: #fff;
    box-shadow: 0 0 10px #ccc;
    display: flex;
    justify-content: space-between;
    padding: 0 28px;
    .logoBox{
      .logo{
        margin-top: -4px;
        height: 28px;
        vertical-align: middle;
      }
    }

  }

  .el-header {
    color: #333;
    text-align: center;
    line-height: 64px;
    .el-tabs{
      .el-tabs__item{
        font-size: 16px;
        font-weight: 500;
      }
    }
  }



  .el-main {
    color: #333;
    text-align: center;
  }

  .header-content{
    padding: 0;
    min-width: 210px;
    display: flex;
    align-items: center;
    box-shadow: 0 1px 0 0 #dfdfdf;
    .menuBox{
      margin-right: 42px;
      img{
        vertical-align: middle;
      }
    }
  }

  .el-menu-item{
    padding: 0;
  }
  .el-drawer__header{
    padding: 12px 12px 12px;
    margin: 0;
    .title{
      text-align: center;
    }
  }
.el-drawer__body-Box{
  cursor: pointer;
  padding: 12px 12px 0;
  display: flex;
  align-items: center;
  .el-drawer__body-Box-left{
    background-image: url('../../assets/images/afterLogin/courseCard1.jpg');
    display: block;
    width: 48px;
    height: 48px;
    margin-right: 16px;
    border-radius: 50%;
  }
  .el-drawer__body-Box-right{
    .el-drawer__body-Box-right-top{
      font-size: 16px;
      font-weight: 500;
      color: #3c4043;
      line-height: 24px;
      display: flex;
    }
    .el-drawer__body-Box-right-bottom{
      font-size: 14px;
      font-weight: 400;
      color: #74787c;
      line-height: 22px;
    }
  }
}


}





</style>