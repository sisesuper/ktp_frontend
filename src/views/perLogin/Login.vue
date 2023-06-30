<template>
  <div class="loginPage">
    <logo/>
    <div class="contain">
      <img alt="bg" class="bg" src="@/assets/images/preLogin/loginbg.png">
      <div class="table">
        <h3>账号登录</h3>
        <ul class="way">
          <li :class="this.way==='telephone'?'active':''" @click="selectWay('telephone')">账号登录</li>
          <li :class="this.way==='number'?'active':''" @click="selectWay('number')">手机短信登录</li>
          <li :class="this.way==='QR'?'active':''" @click="selectWay('QR')">微信登录</li>
        </ul>
        <el-form v-show="way !== 'QR'" ref="loginForm" :model="loginForm" :rules="rules" class="loginForm" status-icon>
          <el-form-item v-show="way==='telephone'" prop="account">
            <el-input v-model="loginForm.account" autocomplete="off" placeholder="请输入邮箱/手机号/账号"></el-input>
          </el-form-item>
          <el-form-item v-show="way==='telephone'" prop="password">
            <el-input v-model="loginForm.password" autocomplete="off" placeholder="请输入密码" type="password"></el-input>
          </el-form-item>
          <el-form-item v-show="way==='number'">
            <el-input v-model="loginForm.telephone" autocomplete="off" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item v-show="way==='number'" class="telCaptcha" prop="password">
            <el-input v-model="loginForm.password" autocomplete="off" placeholder="请输入验证码"></el-input>
            <el-button class="captchaBtn">发送验证码</el-button>
          </el-form-item>
          <div class="optionBox">
            <div class="auto-log"><input v-model="loginForm.autoLogin" type="checkbox">下次自动登录</div>
            <div class="forget-passsword">忘记密码？</div>
          </div>
          <el-form-item>
            <el-button class="submit" type="primary" @click="submitForm('loginForm')">登录</el-button>
          </el-form-item>
          <div class="link"><span>还没有账号？ <router-link to="/regist">去注册</router-link> </span></div>
        </el-form>

        <div v-show="way !== 'QR'" class="inputUl">
          <div class="cornerLabel" @click="selectWay('QR')"></div>
        </div>

        <div v-show="way === 'QR'" class="QR">
          <img alt="QR" src="@/assets/images/preLogin/login-QR.png">
          <div class="bottom">
            <div class="cornerLabel" @click="selectWay('telephone')"></div>
            <p>二维码 2 分钟后失效</p>
            <div class="auto-log"><input type="checkbox">下次自动登录</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import logo from "@/components/Logo";
export default {
  name: "MyLogin",
  data() {
    var checkAccount = (rule, value, callback) => {
      this.loginForm.telephone=''
      this.loginForm.email=''
      if (this.tel(value)){
        this.loginForm.telephone=value
        callback();
      }else if (this.email(value)){
        this.loginForm.email=value
        callback();
      }else {
        return callback(new Error('格式不正确'));
      }
    };
    // var checkTel = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error('格式不正确'));
    //   } else {
    //     callback();
    //   }
    // };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      way: 'telephone',
      loginForm: {
        account:'',
        email:'',
        telephone: '',
        password: '',
        autoLogin:false
      },
      rules: {
        account: [
          {validator: checkAccount, trigger: 'blur'}
        ],
        // telephone: [
        //   {validator: checkTel, trigger: 'blur'}
        // ],
        password: [
          {validator: validatePass, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    selectWay(way) {
      this.way = way
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(valid)
        if (valid) {
          this.login()
        } else {
          return false;
        }
      });
    },
    login() {
      this.$store.dispatch('login',this.loginForm)
    },
    //判断是不是邮箱
    email(str) {
      var string = str.replace(/\s|&nbsp;/g, '') //先去除用户输入的无效字符
      var reg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
      if (reg.test(string)) {
        return true;
      } else {
        return false;
      }
    },
    // 判断是不是手机号
    tel(str) {
      var string = str.replace(/\s|&nbsp;/g, '')
      if ((/^1(3|4|5|7|8)\d{9}$/.test(string))) {
        return true
      } else {
        return false
      }
    }
  },
  components: {logo}
}
</script>

<style lang="scss">
.loginPage ,.registerPage {
  height: 100vh;

  .contain {
    width: 1166px;
    height: 100%;
    min-height: 929px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;

    .bg {
      height: 560px;
    }

    .table {
      width: 448px;
      border: 1px solid #eeeeee;
      margin-left: -104px;
      background: #fff;
      box-shadow: 0 0 61px 0 rgba(85, 108, 144, 0.07);
      padding: 0 37px;
      margin-top: -70px;

      h3 {
        font-size: 22px;
        text-align: center;
        line-height: 22px;
        margin-top: 24px;
        margin-bottom: 22px;
      }

      .way {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #74787c;
        cursor: pointer;
        font-size: 18px;
        margin-bottom: 15px;

        li::after {
          content: '';
          display: block;
          width: 62px;
          height: 2px;
          background-color: #4285f4;
          margin-left: calc(50% - 31px);
          margin-top: 14px;
          visibility: hidden;
        }

        .active::after {
          visibility: visible;
        }
      }

      .loginForm {
        .el-form-item {
          .el-form-item__content::after, .el-form-item__content::before {
            content: none;


          }

          .el-input {
            height: 50px;
            line-height: 50px;

            .el-input__inner {
              height: 50px;
              width: 373px;
              border: 1px solid #dadce0;
              border-radius: 4px;
              padding: 4px 15px;
            }
          }

        }


        .telCaptcha {
          .el-form-item__content {
            display: flex;
            justify-content: space-between;

            .el-input {
              width: 245px;

              .el-input__inner {
                width: 245px;
              }
            }

            .captchaBtn {
              color: rgb(255, 255, 255);
              background: #4285f4;
              border: 1px solid #b3cefb;
            }

            .captchaBtn:hover {
              border-color: #4285f4;
            }
          }

        }

        .optionBox {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: rgb(116, 120, 124);
          padding-top: 10px;
          margin-bottom: 30px;

          .auto-log {
            input {
              width: 15px;
              height: 15px;
              border: 1px solid #dadce0;
              background-color: #fff;
              vertical-align: middle;
              margin-right: 10px;
            }
          }
        }

        .submit {
          height: 50px;
          width: 100%;
          color: #fff;
          background-color: #4285f4;
          cursor: pointer;
        }
      }

      .inputUl .cornerLabel {
        left: 0;
        bottom: 0;
        width: 70px;
        height: 70px;
        background: url("../../assets/images/preLogin/cornerLabels.png") no-repeat 0 0;
        margin-left: -37px;
        cursor: pointer;
      }

      .QR {
        text-align: center;

        .bottom {
          height: 70px;

          .cornerLabel {
            float: left;
            left: 0;
            bottom: 0;
            width: 70px;
            height: 70px;
            background: url("../../assets/images/preLogin/cornerLabels.png") no-repeat 0 -140px;
            margin-left: -37px;
            cursor: pointer;

          }

          .auto-log {
            float: left;
            font-size: 14px;
            color: rgb(116, 120, 124);
            margin-left: 15px;
            margin-top: 15px;

            input {
              width: 15px;
              height: 15px;
              border: 1px solid #dadce0;
              background-color: #fff;
              vertical-align: middle;
            }
          }
        }

        img {
          height: 312px;
        }

        p {
          font-size: 16px;
        }
      }
    }
  }

}

</style>