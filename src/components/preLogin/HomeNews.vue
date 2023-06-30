<template>
  <div class="main">
    <header>
      <h3>媒体报道</h3>
    </header>
    <div class="box-bd">
      <el-carousel :interval="4000" height="416px" type="card">
        <el-carousel-item>
          <div class="PPT medium">
            <img src="@/assets/images/preLogin/PPT1.png" alt="PPT1">
            <div class="desc">
              <h4>助力智慧课堂：课堂派成为腾讯微校生态战略伙伴</h4>
              <p>7月18日，腾讯微校发布会在北京船山书院如期举行，正式推出以微信校园卡、腾讯校园码为核心的数字校园解决方案——腾讯微校2.0。本次发布会突破传统Q&A的传统模式，现场模拟校园场景，利用“一款非常好用的应用”课堂派进行了现场互动。作为腾讯微校的生态战略伙伴，互动教学品牌课堂派展现了科技时代，智慧课堂所带来的创新和变化。</p>
              <a href="https://new.qq.com/ch/edu/">查看详情</a>
            </div>
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <div class="PPT medium" >
            <img src="@/assets/images/preLogin/PPT2.png" alt="PPT2">
            <div class="desc">
              <h4>课堂派亮相2018中国“互联网+”数字经济峰会</h4>
              <p>4月12日下午教育分论坛，北京大学软件与微电子学院林院长分享了智慧课堂的建设经验：教学资源呈现多样化、课堂形式丰富、如何把学生从玩手机的屏幕聚焦到课堂互动环节等方面。林院长表示，课堂派在研发过程中，学院的一线教师主动参与，把很多丰富的实际教学经验融入研发当中，使整个智慧课堂的建设更具实用性和前瞻性。</p>
              <a href="https://www.sohu.com/a/228148312_429328">查看详情</a>
            </div>
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <div class="PPT medium">
            <img src="@/assets/images/preLogin/PPT3.png" alt="PPT3">
            <div class="desc">
              <h4>新时代新青年 课堂派创始人陈杰宾的创业梦</h4>
              <p>6月26日，中国共产主义青年团第十八次全国代表大会在人民大会堂开幕。共青团委对福建省驻京团工委点赞，CCTV新闻频道进行了同步报道。分享会上，课堂派创始人陈杰宾作为闽籍创业青年代表，向在京青年创业者分享了课堂派的发展模式以及创业历程。</p>
              <a href="https://new.qq.com/ch/edu/">查看详情</a>
            </div>
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <div class="PPT medium">
            <img src="@/assets/images/preLogin/PPT4.png" alt="PPT4">
            <div class="desc">
              <h4>【新浪新闻】课堂派云管理颠覆高校传统实习模式</h4>
              <p>用课堂派最大的好处就是在学习的过程中，随时跟老师进行沟通和分享，无论从知识和情感层面都需要倾诉，而课堂派不仅提供跟老师同学交流的机会，还能够获得别人的指导和鼓励，让整个学习过程更加轻松。</p>
              <a href="http://news.sina.com.cn/o/2015-08-19/doc-ifxfxrai2235429.shtml">查看详情</a>
            </div>
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <div class="PPT medium">
            <img src="@/assets/images/preLogin/PPT5.png" alt="PPT5">
            <div class="desc">
              <h4>【华北电力大学】“互联网+”让教育发现每一个学生</h4>
              <p>“课堂上教师要及时了解学生对内容的掌握程度，课下学生也希望教师能对自己的学习困难进行及时的指导。”在以前，这些实现起来比较困难的事情，“课堂派”可以让这一切变得轻而易举。</p>
              <a href="https://news.ncepu.edu.cn/mthd/76621.htm">查看详情</a>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeNews"
}
</script>

<style lang="less" scoped>
.main {
  padding-top: 75px;

  header {
    h3 {
      text-align: center;
      height: 40px;
      line-height: 40px;
      font-weight: 500;
      font-size: 40px;
      color: #1f2023
    }
  }

  .box-bd {

    margin-top: 72px;
    height: 445px;
    .PPT {
      height: 429px;
      margin: 8px;
      padding: 31px;
      background-color: #fff;
      box-shadow: 0 0 10px #e7ebf0;
      img {
        float: left;
        width: 249px;
      }
      .desc {
        float: left;
        text-align: left;
        height: 337px;
        width: calc( 100% - 280px);
        padding-left: 31px;

        h4 {
          font-size: 24px;
          font-weight: 600;
          height: 24px;
          line-height: 24px;
          margin-top: 52px;
        }
        p {
          margin-top: 52px;
          color: #74787c;
          font-size: 14px;
          line-height: 24px;


        }
        a{
          display: block;
          height: 40px;
          width: 112px;
          font-size: 14px;
          color: #fff;
          background-color: #4285F4;
          text-align: center;
          line-height: 40px;
          border-radius: 4px;
          font-weight: 500;
          margin-top: 47px;
        }
        a:hover{
          background-color: #689df6;
        }
      }
    }
    .PPT:after{
      content: '';
      position: absolute;
      right: 0;
      top: 48px;
      height: 333px;
      width: 8px;
      border-bottom-right-radius: 5px;
      border-top-right-radius: 5px;
      background-color: #2178ff;
    }
  }
}
.el-carousel-item{
  position: relative;
}
</style>