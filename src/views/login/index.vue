<template>
  <div class="login-container">
    <div class="container" :class="{ switch: isShow }">
      <div class="container-form container-signup">
        <Register></Register>
      </div>
      <div class="container-form container-signin">
        <Login></Login>
      </div>
      <div class="container-overlay">
        <div class="overlay">
          <div class="overlay-slide overlay-left">
            <div class="title">路漫漫其修远兮 吾将上下而求索</div>
            <el-button type="danger" @click.native.prevent="goSignIn"
              >登录</el-button
            >
          </div>
          <div class="overlay-slide overlay-right">
            <div class="title">路漫漫其修远兮 吾将上下而求索</div>
            <el-button type="danger" @click.native.prevent="goSignUp"
              >注册</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Register from './Register.vue'
import Login from './Login.vue'
export default {
  data() {
    return {
      isShow: false
    }
  },
  components: {
    Register,
    Login
  },
  methods: {
    goSignIn() {
      this.isShow = !this.isShow
    },
    goSignUp() {
      this.isShow = !this.isShow
    }
  }
}
</script>
<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;
@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
.login-container {
  .el-input {
    display: inline-block;
    height: 35px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 10px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 40px;
      caret-color: $cursor;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    color: #ffffff;
  }
}
</style>
<style lang="scss" scoped>
.login-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('../../assets/bg.png') no-repeat fixed center;
  background-size: cover;
}
.container {
  position: relative;
  width: 50vw;
  height: 60vh;
  background-color: #b5bec434;
  box-shadow: 0 1rem 1.5rem rgba(0, 0, 0, 0.3),
    0 0.5rem 0.5rem rgba(0, 0, 0, 0.2);
  border-radius: 1rem;
  overflow: hidden;
}
.container-form {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.5s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.container-signup {
  left: 0;
  width: 50%;
  z-index: 1;
  opacity: 0;
}
.container-signin {
  left: 0;
  width: 50%;
  z-index: 2;
  opacity: 1;
}
.container.switch .container-signup {
  transform: translateX(100%);
  z-index: 5;
  opacity: 1;
}
.container.switch .container-signin {
  transform: translateX(100%);
  opacity: 0;
}
.container-overlay {
  position: absolute;
  left: 50%;
  top: 0;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transform: translateX(0);
  transition: transform 0.5s ease-in-out;
  z-index: 999;
}
.overlay {
  position: absolute;
  top: 0;
  left: -100%;
  width: 200%;
  height: 100%;
  background: #b5bec47a;
  transition: transform 0.5s ease-in-out;
}
.container.switch .container-overlay {
  transform: translateX(-100%);
}
.container.switch .overlay {
  transform: translateX(50%);
}
.overlay-slide {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 50%;
  transition: transform 0.5s ease-in-out;
}
.overlay-left {
  transform: translateX(-20%);
}
.overlay-right {
  transform: translateX(0);
  right: 0;
}
.container.switch .overlay-left {
  transform: translateX(0);
}
.container.switch .overlay-right {
  transform: translateX(20%);
}
.title {
  position: absolute;
  top: 50px;
  font-family: 'Times New Roman', Times, serif;
  font-size: 30px;
  font-weight: 1000;
}
.submit {
  padding: 1rem 3rem;
  background-image: -webkit-linear-gradient(40deg, #0367a6 0%, #008997 70%);
  border-radius: 1rem;
  color: #fff;
  cursor: pointer;
  text-transform: uppercase;
  transition: transform 0.1s ease-in-out;
}
.submit:active {
  transform: scale(0.95);
}
</style>
