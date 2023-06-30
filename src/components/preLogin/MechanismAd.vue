<template>
<div class="all">
 <div class="contain">
   <h3>机构版智慧管理平台</h3>
   <p>便捷而不失强大，面向教学过程和产出，效果触手可得</p>
   <div class="btn-box">
     <router-link class="try" to="">申请免费试用</router-link>
     <router-link class="contact" to="/contactktp">联系课堂派</router-link>
   </div>
   <span>已开通机构版，进入管理后台</span>
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
  background: url("../../assets/images/preLogin/mechanism1.jpg") no-repeat;
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
  /*top:128px;*/
  /*left: 1010px;*/
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
  color: rgb(255, 255, 255);
  background: rgb(0, 202, 144);
  border: 1px solid rgb(255, 255, 255);
}
.contain .btn-box .try{
  float: left;
  border:none;
  color: rgb(0, 166, 118);
  background: rgb(255, 255, 255);

}
.contain span{
  display: block;
  font-size: 18px;
  color: #fff;
  margin-top: 20px;
}
</style>