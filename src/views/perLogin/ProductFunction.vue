<template>
  <div class="all">
    <bf-ad/>
<!--    <mix-teach/>-->
    <PFBottom/>
  </div>
</template>

<script>


 // import mixTeach from "@/components/MixTeach";
import PFBottom from "@/components/preLogin/PFBottom";
import bfAd from "@/components/preLogin/BfAd";

export default {
  name: 'ProductFunction',
  components: {
   PFBottom,bfAd
  }
}
</script>

<style>

</style>
