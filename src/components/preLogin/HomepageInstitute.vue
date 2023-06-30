<template>
  <div class="main">
    <header>
      <h3>课堂派机构版</h3>
    </header>
    <div class="box-bd">
      <div class="l-box"><img src="@/assets/images/preLogin/homeInstitute1.png" alt="homeInstitute1"></div>
      <div class="r-box">
        <ul>
          <li>
            <h3><img src="@/assets/images/preLogin/circle.png" alt="circle">精准高效管理教学事务</h3>
            <p>一键对接教务系统，精准高效管理师生教学、课程、课务。</p>
          </li>
          <li>
            <h3><img src="@/assets/images/preLogin/circle.png" alt="circle">有效提升教学质量</h3>
            <p>以课堂教学为核心，以产出为导向；实时监控师生、课程、教学活动等教学过程。</p>
          </li>
          <li>
            <h3><img src="@/assets/images/preLogin/circle.png" alt="circle">有效提升教学质量</h3>
            <p>沉淀教学过程资产，促进优质课程、资源、知识图谱建设。</p>
          </li>
          <li>
            <h3><img src="@/assets/images/preLogin/circle.png" alt="circle">智慧校园全景定制</h3>
            <p>以学生为中心，以教学为导向，提供校园全景智慧教学解决方案。</p>
          </li>
        </ul>
        <div class="btn-box">
          <router-link class="learn-more" to="/productFunction">了解详细功能</router-link>
          <router-link class="try" to="/mechanism">申请免费试用</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomepageInstitute"
}
</script>

<style lang="less" scoped>
.main {
  background: linear-gradient(180deg,#fff,#f4f8ff 42%);
  text-align: center;
  height: 838px;
  padding-top: 75px;
  header {
    h3 {
      height: 40px;
      line-height: 40px;
      font-weight: 500;
      font-size: 40px;
      color: #1f2023
    }
  }
  .box-bd{
    margin: 72px auto 0;
    width: 1272px;
    height: 574px;
    .l-box{
      float: left;
      width: 650px;
      img{
        width: 650px;
      }
    }
    .r-box{
      text-align: left;
      float: right;
      ul{
        li{
          margin-bottom: 39px;
          h3{
            font-size: 24px;
            height: 24px;
            line-height: 24px;
            color: #1F2023;

            img{
              height: 21px;
              margin-right: 17px;
              vertical-align: middle;
            }
          }
          p{
            margin-top: 13px;
            margin-left: 40px;
            font-size: 18px;
            width: 480px;
            line-height: 32px;
            color: #74787c;
          }
        }
      }
      .btn-box {

        text-align: center;
        height: 50px;
        width: 358px;
        margin-top: 66px;
        margin-left: 40px;

        a {
          display: inline-block;
          font-weight: 400;
          width: 167px;
          height: 50px;
          border-radius: 4px;
          font-size: 14px;
          line-height: 50px;
        }

        .learn-more {
          border: 1px solid #4285f4;
          color: #4285f4;
        }

        .try {
          background: linear-gradient(131deg, #7eb0ff, #2178ff);
          border: none;
          color: #fff;
          margin-left: 24px;
        }
      }
    }
  }


}


</style>