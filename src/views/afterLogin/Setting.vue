<template>
<div class="settingPage">
  <div class="headBox">
    <img src="https://assets.ketangpai.com//Public/Common/img/40/34.png" alt="">
    <div class="textBox">
      <div class="userName">{{userinfo.userName}}</div>
      <div class="vip">开通课堂派VIP</div>
    </div>
  </div>
  <div class="navBox">
    <el-tabs v-model="activeName" >
      <el-tab-pane label="账户信息" name="first">
        <div class="bodyBox">
        <div class="titleBox">
          账号设置
        </div>
          <div class="containBox">
          <div class="itemBox">
            <div class="itemKey">
              账号
            </div>
            <div class="itemValue">
                {{userinfo.id}}
            </div>
          </div>
            <div class="itemBox">
              <div class="itemKey">
                所属角色
              </div>
              <div class="itemValue" v-if="userinfo.role === '0'">
                老师
              </div>
              <div class="itemValue" v-if="userinfo.role === '1'">
                学生
              </div>
              <div class="clickText">
                去设置
              </div>
            </div>
            <div class="itemBox">
              <div class="itemKey">
                手机号
              </div>
              <div class="itemValue" v-if="userinfo.telephone !== null">
                {{userinfo.telephone}}
              </div>
              <div class="itemValue" v-if="userinfo.telephone === null">
                <img class="warnIcon" src="@/assets/images/afterLogin/warn.png" alt="">
                未完善
              </div>
              <div class="clickText">
                更换手机号
              </div>
            </div>
            <div class="itemBox">
              <div class="itemKey">
                密码
              </div>
              <div class="itemValue">
                *******
              </div>
              <div class="clickText">
                修改密码
              </div>
            </div>
          </div>
          <div class="titleBox">
            基础信息
          </div>
          <div class="containBox">
            <div class="itemBox">
              <div class="itemKey">
                姓名
              </div>
              <div class="itemValue">
                {{userinfo.userName}}
              </div>
            </div>
            <div class="itemBox">
              <div v-if="$store.getters.user.role==='0'" class="itemKey">
                工号
              </div>
              <div v-else class="itemKey">
                工号
              </div>
              <div class="itemValue" v-if="userinfo.sid != null">
                {{userinfo.sid}}
              </div>
              <div class="itemValue" v-if="userinfo.sid === null">
                <img class="warnIcon" src="@/assets/images/afterLogin/warn.png" alt="">
                未完善
              </div>
            </div>
            <div class="itemBox">
              <div class="itemKey">
                学校
              </div>
              <div class="itemValue">
                {{userinfo.school}}
              </div>
            </div>
            <div class="itemBox">
              <div class="itemKey">
                院系
              </div>
              <div class="itemValue" v-if="userinfo.major === null">
                <img class="warnIcon" src="@/assets/images/afterLogin/warn.png" alt="">
                未完善
              </div>
              <div class="itemValue" v-if="userinfo.major !== null">
                {{userinfo.major}}
              </div>
            </div>
            <div class="itemBox">
              <div class="itemKey">
                专业
              </div>
              <div class="itemValue" v-if="userinfo.major !== null">
                {{userinfo.major}}
              </div>
              <div class="itemValue" v-if="userinfo.major === null">
                <img class="warnIcon" src="@/assets/images/afterLogin/warn.png" alt="">
                未完善
              </div>
            </div>
            <div class="itemBox" v-if="$store.getters.user.role==='1'">
              <div class="itemKey">
                年级
              </div>
              <div class="itemValue" v-if="userinfo.grade !== null">
                {{userinfo.grade}}
              </div>
              <div class="itemValue" v-if="userinfo.grade === null">
                <img class="warnIcon" src="@/assets/images/afterLogin/warn.png" alt="">
                未完善
              </div>
            </div>
          </div>
          <div class="titleBox">
            第三方账号绑定
          </div>
          <div class="containBox">
            <div class="itemBox">
              <div class="itemKey">
                邮箱绑定
              </div>
              <div class="itemValue" v-if="userinfo.email !== null">
                {{userinfo.email}}
              </div>
              <div class="itemValue" v-if="userinfo.email === null">
                <img class="warnIcon" src="@/assets/images/afterLogin/warn.png" alt="">
                未完善
              </div>
              <div class="clickText">
                立即修改
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
  name: "MySetting",
  data(){
    return{
      activeName:'first',
      userinfo:{}
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods:{
    getUserInfo(){
      httpPost({},'/userList','POST').then((res)=>{
        this.userinfo= res.data
      })

    }
  }
}
</script>

<style lang="scss">

.el-main {
  padding: 10px 0 0 0 !important;
}
.settingPage{

  margin:  0 auto;
  width: 50%;
  .headBox{
    background: #f8f9fa;
    border-radius: 8px;
    padding: 24px;
    display: flex;
    justify-content: flex-start;
    .textBox{
      margin-left: 16px;
      text-align: left;
      display: flex;
      flex-direction: column;
      justify-content: center;
        .userName{
          margin-bottom: 4px;
          font-size: 20px;
        }
      .vip{
        color: #4285f4;
        font-weight: 500;
        font-size: 14px;
      }
    }
  }
  .navBox{
    .el-tabs__header .el-tabs__nav-wrap::after{
      content: none;
    }
   margin-top: 16px;
    .el-tabs__item{
      font-size: 16px;
    }
    .bodyBox{
      background:#f8f9fa;
      margin-top: 16px;
      padding:0 24px 24px 24px;
      .titleBox{
                text-align: left;
                padding:24px 0;
      }
      .containBox{
        background: #fff;
        box-shadow: inset 4px 0 0 0 #4285f4;
        border-radius: 4px;
        border-right: 1px solid #dadce0;
        border-bottom: 1px solid #dadce0;
        .itemBox{
          border-top: 1px solid #dadce0;
          margin-left: 4px;
          font-size: 14px;
          padding: 16px 0;
          display:flex;
          .itemKey{
            width: 150px;
            padding: 0 24px;
            text-align: left;
          }
          .itemValue{
            color: #5f6368;
            .warnIcon{
              height: 16px;
              margin-right: 10px;
              vertical-align: middle;
            }
          }
          .clickText{
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