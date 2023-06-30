<template>
  <div>
    <common-header/>
    <router-view/>
    <common-footer/>
  </div>

</template>

<script>
import CommonHeader from "@/components/preLogin/CommonHeader";
import CommonFooter from "@/components/preLogin/CommonFooter";
export default {
  name: "MyMain",
  components: {CommonHeader,CommonFooter},

}
</script>

<style scoped>

</style>