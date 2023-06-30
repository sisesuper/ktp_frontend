<template>
  <div class="registerPage">
    <logo/>
    <div class="contain">
      <img class="bg" src="@/assets/images/preLogin/regist-bg.png" alt="bg">
        <div class="table">
          <h3>注册账号</h3>
          <el-form  :model="registerForm" status-icon :rules="rules" ref="registerForm" class="registerForm">
            <el-form-item prop="account">
              <el-input placeholder="请输入邮箱/手机号" v-model="registerForm.account" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" placeholder="请输入密码" v-model="registerForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
              <el-input type="password" placeholder="请再次输入密码确认" v-model="registerForm.checkPass"></el-input>
            </el-form-item>
            <el-form-item>
              <div class="selectRole">选择身份</div>
            </el-form-item>
            <div @click="chooseRole('0')" class="role" :class="registerForm.role==='0'?'selected':''" style="margin-right: 14px"><img src="@/assets/images/preLogin/regist-teacher.svg" alt="teacher"><i>老师</i></div>
            <div @click="chooseRole('1')" class="role" :class="registerForm.role==='1'?'selected':''"><img src="@/assets/images/preLogin/regist-student.svg" alt="student"><i>学生</i></div>
            <el-form-item prop="userName">
              <el-input   placeholder="请输入姓名" v-model="registerForm.userName"></el-input>
            </el-form-item>
            <el-form-item prop="school">
              <el-autocomplete
                  v-model="registerForm.school"
                  :fetch-suggestions="querySearchAsync"
                  :hide-loading="true"
                  :trigger-on-focus="false"
                  placeholder="请输入学校/机构"
              ></el-autocomplete>
            </el-form-item>
            <el-form-item prop="sid" v-if="registerForm.role==='1'">
              <el-input placeholder="请输入学号" v-model="registerForm.sid"></el-input>
            </el-form-item>
            <div class="captchaBox">
              <el-input placeholder="请输入图片内文字" class="captcha" v-model="registerForm.captchaResult"></el-input>
              <img  @click="getCaptcha" class="captchaImg" :src="captchaSrc" alt="">
            </div>
            <el-form-item>
              <el-button type="primary" class="submit" @click="submitForm('registerForm')">注册</el-button>
            </el-form-item>
          </el-form>
          <span class="link">已有账号？ <router-link to="/login">去登录</router-link></span>
        </div>
    </div>
  </div>
</template>

<script>
import logo from "@/components/Logo";
import httpPost from "@/utils/axios/Home";
export default {
  name: "MyRegist",
  data(){
    var checkAccount = (rule, value, callback) => {
      this.registerForm.telephone=''
      this.registerForm.email=''
      if (this.tel(value)){
        this.registerForm.telephone=value
        callback();
      }else if (this.email(value)){
        this.registerForm.email=value
        callback();
      }else {
        return callback(new Error('格式不正确'));
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.registerForm.checkPass !== '') {
          this.$refs.registerForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致'));
      } else {
        callback();
      }
    };
    var checkUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入姓名'));
      } else {
        callback();
      }
    };
    var checkSchool = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择学校'));
      } else {
        callback();
      }
    };
    var checkSid = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入学号'));
      } else {
        callback();
      }
    };
    var checkResult = (rule, value, callback) => {
      if (value === '') {
        callback();
      } else {
        callback();
      }
    }
    return{
      schools: [],
      state: '',
      timeout:  null,
      isStudent:false,
      registerForm: {
        account:'',
        email:'',
        telephone: '',
        password: '',
        checkPass: '',
        userName:'',
        school:'',
        sid:'',
        captchaResult:'',
        role:'0',
      },
      captchaSrc:'',
      rules: {
        account: [
          { validator: checkAccount, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        userName: [
          { validator: checkUsername, trigger: 'blur' }
        ],
        school: [
          { validator: checkSchool, trigger: 'blur' }
        ],
        sid: [
          { validator: checkSid, trigger: 'blur' }
        ],
        captchaResult: [
          { validator: checkResult, trigger: 'blur' }
        ],
      }
    }
  },
  mounted() {
    this.getCaptcha()
  },
  methods:{
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.register()
        } else {
          return false;
        }
      });
    },
    chooseRole(role){
       this.registerForm.role=role
    },
    querySearchAsync(queryString, cb) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          httpPost({schoolName:queryString},'/schoolList','POST').then((res)=>{
            console.log(res)
            this.schools = res.data.map(obj => ({ value: obj.schoolName, id: obj.id ,schoolName:obj.schoolName}));
            cb(this.schools)
          })
        }, 500);
    },

    register(){
      httpPost(this.registerForm,'/register?captchaResult='+this.registerForm.captchaResult,'POST').then((res)=>{
        console.log(res)
        if (res.code===200){
          this.$message({
            message: '注册成功！',
            type: 'success'
          })
          this.$router.push('login')
        }
      })
    },
    getCaptcha(){
      httpPost({},'/captcha','GET').then((res)=>{
        console.log(res)
        sessionStorage.setItem("captcha",JSON.stringify(res.data.captcha))
        this.captchaSrc = res.data.base64
        console.log(this.captchaSrc)
      })
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
  components:{logo},
}
</script>

<style lang="scss">
.registerPage, .loginPage{
  height: 100vh;
  .contain{
    width: 1166px;
    height: 100%;
    min-height: 929px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    .bg{
      height: 560px;
    }
    .table{
      width: 448px;
      border: 1px solid #eeeeee;
      margin-left: -104px;
      background: #fff;
      box-shadow: 0 0 61px 0 rgba(85, 108, 144, 0.07);
      padding: 0 37px;
      h3{
        font-size: 22px;
        text-align: center;
        line-height: 22px;
        margin-top: 24px;
        margin-bottom: 22px;
      }
      .registerForm{
        .el-form-item .el-input__inner {
          height: 50px;
          line-height: 50px;
        }
        .selectRole{
          font-size: 16px;
          font-weight: 700;
          line-height: 16px;
        }
        .selected{
          border: 1px solid rgb(66, 133, 244);
        }
        .role{
          display: inline-block;
          height: 62px;
          width: 179px;
          padding: 8px 16px;
          font-size: 14px;
          color: #3c4043;
          margin-bottom: 15px;
          i{
            font-style: normal;
            float: left;
            margin-top: 10px;
          }
          img{
            width: 43px;
            float: left;
            margin-right: 10px;
          }
        }
        input{
          height: 50px;
          width: 373px;
          border: 1px solid #dadce0;
          border-radius: 4px;
          padding:4px 15px;
        }
        .submit{
          height: 50px;
          width: 100%;
          color: #fff;
          background-color: #4285f4;
          cursor: pointer;
        }
        .captchaBox{
          margin-bottom: 20px;
          display: flex;
          justify-content: space-between;
          .captcha{
            width: 192px;
            .el-input__inner{
              width: 100%;
            }
          }
          .captchaImg{
            vertical-align: middle;
          }
        }
      }
      .link{
        display: flex;
        justify-content: right;
        font-size: 14px;
        height: 14px;
        line-height: 14px;
        margin-top: 15px;
        margin-bottom: 16px;
        a{
          color: #4285f4;
        }
      }
    }
  }
}
</style>