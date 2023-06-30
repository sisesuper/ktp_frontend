<template>
<header>
  <div class="header-contain">
    <div class="l-box">
      <router-link to="/homePage"><img src="@/assets/images/preLogin/logo.png" alt="logo"></router-link>
      <ul>
        <li><router-link to="/homePage" active-class="nav-now"><p>首页</p></router-link></li>
        <li><router-link to="/productFunction"  active-class="nav-now"><p>产品功能</p></router-link></li>
        <li><router-link to="/mechanism"  active-class="nav-now"><p>机构版</p></router-link></li>
        <li><router-link to="/cooperation"  active-class="nav-now"><p>渠道合作</p></router-link></li>
        <li><router-link to="/vipPower"  active-class="nav-now"><p>会员权益</p></router-link></li>
        <li><router-link to="/helpCenter"  active-class="nav-now"><p>帮助中心</p></router-link></li>
      </ul>
    </div>
    <div class="r-box">
      <router-link v-if="!this.$store.getters.isLogin" class="login" to="/login">登录</router-link>
      <router-link v-if="!this.$store.getters.isLogin" class="regist" to="/regist">注册</router-link>
      <router-link v-if="this.$store.getters.isLogin" class="regist" to="/main">进入课堂</router-link>

    </div>
  </div>
</header>
</template>

<script>
export default {
  name: "CommonHeader",
}
</script>

<style lang="less" scoped>

header{
  font-weight: 500;
  height: 72px;
  color: #fff;
  width: 100%;
  .header-contain{
    display: flex;
    justify-content: space-between;
    width: 1272px;
    height: 73px;
    margin: 0 auto;
  }
  .l-box {
    ul {
      float: left;
      :first-child a{
        padding-left: 0;
      }
      :last-child a{
        padding-right: 0;
      }
      li{
        float: left;
        display: inline-block;
        height: 73px;
        line-height: 73px;
        text-align: center;
        a{
          display: block;
          height: 73px;
          color: #3c4043;
          font-size: 18px;
          padding: 0 21px;
          p{
            height: 73px;
          }
        }
      }
    }
    img{
      float: left;
      width: 132px;
      margin: 18px 50px 0 0 ;
    }
  }
  .r-box {
    height: 73px;
    display: flex;
    justify-content: flex-end;
    gap: 15px;
    align-items: center;
    a{
      display: block;
      width: 94px;
      height: 37px;
      border-radius: 4px;
      font-size: 14px;
      text-align: center;
      line-height: 37px;
    }
    .login{
      border:1px solid #4285f4;
      color: #4285f4;

    }
    .regist{
      background: linear-gradient(131deg,#7eb0ff,#2178ff);
      border: none;
      color: #fff;
    }
  }
}
.nav-now p{
  border-bottom: 3px solid #4285f4;
}
</style>