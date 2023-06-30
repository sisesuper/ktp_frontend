<template>
  <div class="rightBoxComponent">
    <img class="taskIcon" src="@/assets/images/afterLogin/task.png" alt="task">
      <img @click="goMessage" class="messageIcon" src="@/assets/images/afterLogin/message.png" alt="task">

    <el-dropdown trigger="click" @command="handleCommand">
      <el-avatar class="headIcon" src="https://assets.ketangpai.com//Public/Common/img/40/34.png"></el-avatar>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item  command="setting"><img class="headDropDownIconsrc" src="@/assets/images/afterLogin/setting.png" alt="">个人设置
        </el-dropdown-item>
        <el-dropdown-item command="exit"><img class="headDropDownIconsrc" src="@/assets/images/afterLogin/exit.png" alt="">退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

  </div>
</template>

<script>
export default {
  name: "HeaderRight",
  data(){
    return{
      activeName: 'first'
    }
  },
  methods:{
    handleCommand(command){
      switch (command){
        case "exit":this.exit();break;
        case "setting":  if (this.$route.name!=='setting'){
          this.$router.replace({name:'setting'})
        }
      }
    },
    exit(){
      this.$store.dispatch('exit')
    },
    goMessage(){
      this.$router.push({name:'messagePage'})
    }
  }
}
</script>

<style lang="scss">
.el-dropdown-menu{
  .el-dropdown-menu__item .headDropDownIconsrc{
    vertical-align: middle;
    height: 20px;
    margin-right: 10px;
  }

}
.rightBoxComponentPopover{
  .el-tabs{
    margin: 0 24px;
    .el-tabs__item{
      font-size: 16px;
      font-weight: 500;
      //color: #303133;
    }
  }
  .el-tabs__header .el-tabs__nav-wrap::after{
    content: none;
  }
}


.rightBoxComponent {
  display: flex;
  align-items: center;
  gap: 15px;

  .taskIcon {
    vertical-align: middle;
    width: 22px;
    height: 22px;
  }

  .messageIcon {
    vertical-align: middle;
    width: 22px;
    height: 22px;
  }

  .headIcon {
    vertical-align: middle;
  }
}
</style>