<template>
<footer>
  <div class="footer_msg">
    <div class="l-footer">
      <img src="@/assets/images/preLogin/logo-footer.png" alt="logo">
      <ul>
        <li><router-link to="/aboutUs">关于我们</router-link></li>
        <li><router-link to="/clauseService">服务条款</router-link></li>
        <li><router-link to="/productDynamic">产品动态</router-link></li>
        <li><router-link to="/downloadbrowse">浏览器下载</router-link></li>
      </ul>
    </div>
    <div class="r-footer">
      <div class="left">
        <p class="title">联系我们</p>
        <p class="time">(工作日09:30～18:30)</p>
        <p class="tel"><img src="@/assets/images/preLogin/tel.png" alt="tel">010-57748642</p>
        <p class="letter"><img src="@/assets/images/preLogin/letter.png" alt="letter">hi@ketangpai.com</p>
      </div>
      <div class="middle">
        <img src="@/assets/images/preLogin/footer-QR1.png" alt="QR1">
        <p>课堂派客服-派派</p>
      </div>
      <div class="right">
        <img src="@/assets/images/preLogin/footer-QR2.png" alt="QR2">
        <p>课堂派客服-派派</p>
      </div>
    </div>
  </div>
  <div class="copyright">
    <p><span>Copyright © 2014 ketangpai.com All Rights Reserved. <a href="https://beian.miit.gov.cn/#/Integrated/recordQuery">京ICP备14023276号-4</a></span><span><a href="https://app.eduyun.cn/mapp/mappCorpDetail?id=003344">教APP备1101923号</a></span><span><a
        href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11011402010566">京公网安备11011402010566号</a></span></p>
  </div>
</footer>
</template>

<script>
export default {
  name: "CommonFooter"
}
</script>

<style lang="less" scoped>
footer{
  font-weight: 500;
  height: 295px;
  background-color: #272E38;
  min-width: 1268px;
  .footer_msg{
    height: 246px;
    margin: 0 125px;
    .l-footer{
      float: left;
      width: 514px;
      height: 246px;
      img{
        width: 133px;
        margin-top: 68px;
      }
      ul{
        margin-top: 39px;
        li{
          display: inline-block;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          float: left;
          margin-right: 33px;
          a{
            color: #fff;
          }
        }
      }
    }
    .r-footer{
      float: right;
      height: 246px;
      p img{
        margin-right: 10px;
        vertical-align: middle;
      }
      .left{
        float:left;
        margin-top: 66px;
        color: #fff;
        font-size: 14px;
        .title{
          margin-left: -1px;
          height: 14px;
          line-height: 14px;
        }
        .time{
          margin-top: 8px;
          font-size: 12px;
          height: 12px;
          line-height: 12px;
          color: #6D7790;
        }
        .tel{
          height: 14px;
          line-height: 14px;
          margin: 21px 0;
        }
        .letter{
          height: 14px;
          line-height: 14px;
        }
      }
      .middle{
        float:left;
        margin-top: 40px;
        margin-left: 42px;
        img{
          width: 125px;
        }
        p{
          width: 125px;
          height: 14px;
          line-height: 14px;
          margin-top: 23px;
          text-align: center;
          color: #fff;
          font-size: 14px;
        }
      }
      .right{
        float:left;
        margin-top: 40px;
        margin-left: 20px;
        img{
          width: 125px;
        }
        p{
          width: 125px;
          height: 14px;
          line-height: 14px;
          margin-top: 23px;
          text-align: center;
          color: #fff;
          font-size: 14px;
        }
      }
    }
  }
  .copyright{
    height: 49px;
    background-color: #15191F;
    p{
      margin:0 auto;
      height: 49px;
      width: 833px;
      font-size: 12px;
      color: #647184;
      display: flex;
      justify-content: space-between;
      align-items: center;
      a{
        color: #647184;
      }
    }


  }
}

</style>