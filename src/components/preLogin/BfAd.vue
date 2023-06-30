<template>
<div class="all">
 <div class="contain">
   <h3>教学从未如此得心应手</h3>
   <p>融合教学场景，有效连接各项教学元素，打造多元化互动创新教学模式</p>
   <div class="btn-box">
     <router-link class="regist" to="/regist">立即注册</router-link>
     <router-link class="contact" to="/contactktp">联系课堂派</router-link>
   </div>
 </div>
</div>
</template>

<script>
export default {
  name: "BF-AD"
}
</script>

<style scoped>
.all {
  height: 470px;
  width: 100%;
  max-width: 1920px;
  min-width: 1577px;
  margin: 0 auto;
  background: url("../../assets/images/preLogin/PF1.jpg") no-repeat;
}
.all h3{
  width: max-content;
  font-size: 48px;
  color: #fff;
  font-weight: 500;
  height: 48px;
  line-height: 48px;
}
.contain{
  margin: 0 auto;
  padding: 128px 0 0 1046px;
 }

.contain p{
  color: #fff;
  font-size: 20px;
  width: 530px;
  line-height: 32px;
  margin-top: 30px;
}
.contain .btn-box {
  width: 267px;
  height: 50px;
  margin-top: 25px;
}
.contain .btn-box a{
  display: inline-block;
  text-align: center;
  height: 50px;
  width: 125px;
  line-height: 50px;
  border-radius: 4px;
}
.contain .btn-box .contact{
  float: left;
  margin-left: 17px;
  border: 1px solid #ffffff;
  color: #fff;
  background:  #4285f4;
}
.contain .btn-box .regist{
  float: left;
  border:none;
  background: #fff;
  color: #4285f4;

}
</style>