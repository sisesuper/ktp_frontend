<template>
<div class="main">
    <div class="contain">
      <h3>欢迎使用课堂派</h3>
      <p>精彩教学，从这里开启</p>
      <div class="btn-box">
        <router-link class="contact" to="/contactktp">联系课堂派</router-link>
        <router-link class="regist" to="/regist">免费注册</router-link>
      </div>
    </div>
</div>
</template>

<script>
export default {
  name: "HomeBottom"
}
</script>

<style lang="less" scoped>
.main{
  height: 400px;
  width: 100%;
  background: url("../../assets/images/preLogin/bottom2.png") 50% repeat-x;
  background-size: auto;
  font-weight: 500;
  text-align: center;
  .contain{
    padding-top: 92px;
    h3{
      font-size: 48px;
      color: #1f2023;
      font-weight: 500;
      height: 48px;
      line-height: 48px;
    }
    p{
      color: #74787c;
      font-size: 20px;
      height: 20px;
      line-height: 20px;
      margin-top: 30px;
    }
    .btn-box{
      width: 300px;
      height: 42px;
      margin: 41px auto;
      a{
        display: inline-block;
        height: 42px;
        width: 125px;
        line-height: 42px;
        border-radius: 4px;
      }
      .contact{
        float: left;
        border:1px solid #4285f4;
        color: #4285f4;
        background: #fff;
      }
      .regist{
        float: right;
        background: linear-gradient(131deg,#7eb0ff,#2178ff);
        border: none;
        color: #fff;
      }
    }
  }
}
</style>