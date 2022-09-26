<template>
  <!--  登录注册页面-->
  <div id="login">
    <!--    顶部-->
    <div class="loginTop">
      <div class="login-logo">
        <div class="loginImgBox">
          <img src="@/assets/images/cereshop/home/eshop.png" alt="" @click="$router.push('/index')">
        </div>
        <span>欢迎来到PC商城</span>
      </div>
    </div>
    <!--    顶部end-->
    <div class="loginCent">
      <el-card class="box-card" :body-style="{  }">
        <div class="loginTit" v-text="isShow ? '登录' : '注册' ">

        </div>
        <!--        表单-->
        <el-form label-position="top" label-width="80px" :model="formLogin">
          <el-form-item label="手机号码">
            <!--            登录-->
            <el-input v-model="formLogin.phone" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item label="验证码" v-if="!isShow">
            <!--            注册-->
            <el-input v-model="formLogin.code" placeholder="请输入验证码"></el-input>
            <el-button type="primary" size="medium" @click="getCode" class="send-code">获取验证码</el-button>
          </el-form-item>
          <el-form-item label="昵称" v-if="!isShow">
            <!--            注册-->
            <el-input v-model="formLogin.nickname" placeholder="请输入昵称"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <!--            登录-->
            <el-input v-model="formLogin.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" v-if="!isShow">
            <el-input v-model="formLogin.password2" placeholder="请输入确认密码"></el-input>
          </el-form-item>
          <el-form-item>
            <!--            登录-->
            <el-checkbox-group v-model="formLogin.noLogin">
              <el-checkbox label="七天免登录" name="type" v-if="isShow"></el-checkbox>
            </el-checkbox-group>
            <span v-text="isShow ? '用户注册' : '登录'" @click="type === '2' ? type = '1' : type='2'"><!--用户注册/登录--></span>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login" size="medium" v-text="isShow  ? '立即登录' : '注册' ">
              <!--立即登录/注册--></el-button>
          </el-form-item>
        </el-form>
        <!--        表单end-->
      </el-card>
    </div>
  </div>
</template>

<script>
import {getUserInfo, login, register, registerCode} from '@/api/api'
import {mapMutations} from "vuex";

export default {
  name: "login",
  data() {
    return {
      type: "2",//默认登录
      isShow: true,//默认显示登录
      formLogin: {
        phone: '123456789',
        code: '',//获取验证码
        nickname: '',//昵称
        password: '123456789',
        password2: '',
        noLogin: [],//免登录
      }
    }
  },
  methods: {
    ...mapMutations([
      'setuserInfoVal'
    ]),
    //登录
    getLogin() {
      login({
        'username': this.formLogin.phone,
        'password': this.formLogin.password
      }).then(res => {
        if (res.status === 200) {
          this.$message.success('登录成功！')
          window.localStorage.setItem('token', res.data.token)
          //获取用户信息
          getUserInfo().then(res => {
            if (res.status === 200) {
              window.localStorage.setItem('userInfo', JSON.stringify(res.data))
              this.setuserInfoVal(res.data)
              let user = JSON.parse(window.localStorage.getItem('userInfo'))
            }
          })
          this.$router.push('/index')
        } else if (res.status === 422) {
          this.$message.warning('账号或密码错误')
        } else {
          this.$message.warning('出现错误');
        }
      })
    },
    //注册
    getRegister() {
      register({
        'account': this.formLogin.phone,//手机号
        'captcha': this.formLogin.code,//验证码
        'password': this.formLogin.password,
        'nickname': this.formLogin.nickname, //用户昵称
      }).then(res => {
        if (res.status === 200) {
          this.$message.success(res.msg)
          this.type = '2'
        } else if (res.status === 422) {
          this.$message.warning(res.msg)
        } else {
          this.$message.warning(res.msg)
        }
      })
    },
    //获取验证码
    getCode() {
      registerCode({
        phone: this.formLogin.phone,
        type: "register",
      }).then(res => {
        this.formLogin.code = res.data
      })
    },
    login() {
      let self = this.type
      if (self === '2') {//登录
        this.getLogin()
      } else if (self === '1') {//注册
        this.getRegister()
      }
    },
  },
  watch: {
    type(newVal, oldVal) {
      if (newVal === "2") {
        this.isShow = true
      } else if (newVal === "1") {
        this.isShow = false
      }
    }
  },
  mounted() {
    if (this.$route.query.type === "1" || this.$route.query.type === '2') {
      if (this.$route.query.type === '1') {
        // this.isShow = false
        this.type = this.$route.query.type
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-logo {
  display: flex;
  height: 88px;
  width: 1250px;
  align-items: center;
  margin: 0 auto;

  span {
    font-size: 18px;
    color: #333333;
  }

  .loginImgBox {
    display: flex;
    align-items: center;
    margin-right: 20px;
    margin-left: -50px;
    cursor: pointer;
  }
}

.loginCent {
  background: url('../../assets/images/loginBg.jpg') no-repeat;
  //flex-grow: 1;
  background-size: cover;
  display: flex;
  align-items: center;
  min-height: 680px;
}

/*卡片*/
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 540px;

  margin: 50px auto;
  padding: 0 0 60px;
  border-radius: 10px
}

/*卡片endl*/
.loginTit {
  height: 50px;
  display: flex;
  align-items: center;
  font-size: 30px;
  width: 100%;
  justify-content: center; //水平居中
  margin: 30px 0;

  &:before {
    content: '';
    height: 2px;
    width: 98px;
    display: block;
    background: url("../../assets/images/dzuo.png") no-repeat;
    margin-right: 27px;
  }

  &:after {
    content: '';
    height: 2px;
    width: 98px;
    display: block;
    background: url("../../assets/images/dyou.png") no-repeat;
    margin-left: 27px;
  }
}

.el-form {
  padding: 0 40px;

  .el-form-item {
    margin-bottom: 10px;

    /deep/ .el-form-item__label {
      padding: 0;
      display: flex;
    }

    /deep/ .el-form-item__content {
      display: flex;

      span {
        flex-grow: 1;
        text-align: right;
        cursor: pointer;
      }

      button {
        width: 100%;
        height: 40px;
        background-color: #ff7800;
        border-color: #ff7800;
      }
    }
  }
}

.send-code {
  width: 140px !important;
  //height: 48px !important;
  background-color: #eeeeee !important;
  border: 0 !important;
  margin-left: 6px;
  color: #333333;
}
</style>
