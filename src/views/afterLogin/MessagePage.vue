<template>
    <div class="messagePage">
      <h2>通知</h2>
      <div class="card-box">
        <div class="component-notification">
          <div class="flex-between">
            <div class="flex-align h-info">
              <span class="h-icon font22 font_family ">
                <img class="picture" src="@/assets/images/afterLogin/remind.png" alt="remind">
              </span>
             <span class="h-type">教学活动</span>
           </div>
          </div>
          <div class="flex-between item-content">
            <div class="left">
              <span class="font-color--main font12">#公告#</span>
              课程设计安排
            </div>
         </div>
         <div class="bottom">
            来自
            <span class="class">面向对象程序设计（Java）</span>
           <span class="end-time">2023-06-01 10:42:39</span>
         </div>
        </div>
        <div class="component-notification">
          <div class="flex-between">
            <div class="flex-align h-info">
              <span class="h-icon font22 font_family ">
                <img class="picture" src="@/assets/images/afterLogin/remind.png" alt="remind">
              </span>
              <span class="h-type">教学活动</span>
            </div>
          </div>
          <div class="flex-between item-content">
            <div class="left">
              <span class="font-color--main font12">#测试#</span>
              类与对象自测题
            </div>
          </div>
          <div class="bottom">
            来自
            <span class="class">面向对象程序设计（Java）</span>
            <span class="end-time">2023-05-27 15:48:14</span>
          </div>
        </div>
        <div class="component-notification">
          <div class="flex-between">
            <div class="flex-align h-info">
              <span class="h-icon font22 font_family ">
                <img class="picture" src="@/assets/images/afterLogin/remind.png" alt="remind">
              </span>
              <span class="h-type">教学活动</span>
            </div>
          </div>
          <div class="flex-between item-content">
            <div class="left">
              <span class="font-color--main font12">#测试#</span>
              继承
            </div>
          </div>
          <div class="bottom">
            来自
            <span class="class">面向对象程序设计（Java）</span>
            <span class="end-time">2023-05-27 15:48:07</span>
          </div>
        </div>
        <div class="component-notification">
          <div class="flex-between">
            <div class="flex-align h-info">
              <span class="h-icon font22 font_family ">
                <img class="picture" src="@/assets/images/afterLogin/remind.png" alt="remind">
              </span>
              <span class="h-type">教学活动</span>
            </div>
          </div>
          <div class="flex-between item-content">
            <div class="left">
              <span class="font-color--main font12">#测试#</span>
              抽象类、接口
            </div>
          </div>
          <div class="bottom">
            来自
            <span class="class">面向对象程序设计（Java）</span>
            <span class="end-time">2023-05-27 15:47:59</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "MessagePage"
}
</script>

<style lang="scss">
  .messagePage {
    margin: auto;
    width: 900px;
    background: #f8f9fa;
    border-radius: 8px;
    padding: 12px;
    .card-box {
      .component-notification {
        cursor: pointer;
        margin-top: 16px;
        padding: 12px;
        background: #fff;
        border: 1px solid #dadce0;

        .flex-between {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .flex-align {
            display: flex;
            align-items: center;

            .font22 {
              font-size: 22px;
            }

            .font_family {
              font-family: font_family !important;
              font-style: normal;
              -webkit-font-smoothing: antialiased;
            }

            .picture {
              width: 25px;
              height: 25px;
            }
          }
        }

        .h-info {
          margin-bottom: 14px;

          .h-type {
            font-size: 14px;
            font-weight: 500;
            color: #575a5b;
            line-height: 16px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 75px;
          }

          .h-icon {
            display: block;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            margin-right: 8px;
            color: #ff6000;
          }
        }

        .item-content {
          .left {
            font-size: 14px;
            font-weight: 700;
            text-align: left;
            color: #3c4043;
            line-height: 20px;

            span {
              margin-right: 8px;
            }

            .font-color--main {
              color: #4285f4;
            }

            .font12 {
              font-size: 12px;
            }
          }
        }

        .bottom {
          margin-top: 16px;
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: left;
          line-height: 16px;

          .class {
            margin-left: 8px;
            color: #4285f4;
          }

          .end-time {
            margin-left: 48px;
            color: #74787c;
          }
        }
      }
    }
  }
  </style>