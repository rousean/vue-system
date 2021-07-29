<template>
  <div class="login-container">
    <div class="container" :class="{ switch: isShow }">
      <div class="container-form container-signup">
        <Register ref="register"></Register>
      </div>
      <div class="container-form container-signin">
        <Login ref="login"></Login>
      </div>
      <div class="container-overlay">
        <div class="overlay">
          <div
            class="overlay-slide"
            :class="isShow ? 'overlay-left' : 'overlay-right'"
          >
            <div class="login-title">
              <img
                src="../../assets/venus-logo.png"
                alt="logo"
                width="170px"
                height="90px"
              />
            </div>
            <el-button type="success" @click.native.prevent="sign" plain>{{
              isShow ? '点我去登录' : '点我去注册'
            }}</el-button>
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
    sign() {
      if (this.isShow) {
        this.$refs.login.focus()
      } else {
        this.$refs.register.focus()
      }
      this.isShow = !this.isShow
    }
  }
}
</script>
<style lang="scss">
@supports (-webkit-mask: none) and (not (cater-color: #fff)) {
  .login-container .el-input input {
    color: #fff;
  }
}
.login-container {
  .el-input {
    display: inline-block;
    height: 35px;
    width: 85%;
    input {
      background-color: transparent;
      border: 0;
      -webkit-appearance: none;
      border-radius: 10px;
      padding: 12px 5px 12px 15px;
      color: #000;
      height: 40px;
      caret-color: #fff;
      &:-webkit-autofill {
        -webkit-animation: autofill-fix 1s infinite !important;
        -webkit-text-fill-color: #666;
        -webkit-transition: background-color 50000s ease-in-out 0s !important;
        transition: background-color 50000s ease-in-out 0s !important;
        background-color: transparent !important;
        background-image: none !important;
        -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
      }
      &::-webkit-input-placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
      &::-moz-input-placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
      &::-ms-input-placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }
    [role='button'],
    a,
    area,
    button,
    input:not([type='range']),
    label,
    select,
    summary,
    textarea {
      -ms-touch-action: manipulation;
      touch-action: manipulation;
    }
    input[type='number'],
    input[type='password'],
    input[type='text'],
    textarea {
      -webkit-appearance: none;
    }
  }
  .el-form-item {
    border: 1px solid rgba(0, 0, 0, 0.2);
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #fff;
    margin-bottom: 30px;
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
  text-align: center;
}
.container {
  position: relative;
  width: 50vw;
  height: 60vh;
  min-height: 60vh;
  background-color: #b5bec413;
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
  background-color: #6cb9f81c;
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
.login-title {
  position: absolute;
  top: 10px;
  left: 10px;
}
</style>
