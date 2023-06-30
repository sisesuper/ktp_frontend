<template>
  <div class="TopCoursePage">
    <el-col :span="8" class="top-course">
      <el-card shadow="never" >
          <class-card ></class-card>
      </el-card>
    </el-col>
  </div>
</template>

<script>
import ClassCard from "@/components/afterLogin/ClassCard";
export default {
  name: "TopCourse",
  components: {ClassCard}
}
</script>

<style scoped lang="scss">
.TopCoursePage{
  display: flex;
  justify-content: center;
  .top-course{
    width:70% ;
    height:340px;
  }
}

</style>