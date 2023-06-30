<template>
<div>
  <div class="pic"></div>
<!--  <mix-teach/>-->
<!--  <smart-teach/>-->
  <homepage-institute/>
  <home-news/>
  <home-bottom/>
</div>
</template>

<script>
// import mixTeach from "@/components/MixTeach";
// import smartTeach from "@/components/SmartTeach";
import homepageInstitute from "@/components/preLogin/HomepageInstitute";
import homeNews from "@/components/preLogin/HomeNews";
import homeBottom from "@/components/preLogin/HomeBottom";

export default {
  name: "MyHome",
  components:{homeBottom,homepageInstitute,homeNews}
}
</script>

<style scoped>
.pic{
  height: 470px;
  width: 100%;
  min-width: 1268px;
  background: url("../../assets/images/preLogin/homePage1.png") no-repeat 50%;
  background-size: cover;
}

</style>