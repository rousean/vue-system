<template>
  <div class="login-container">
    <h1 style="color:white">同源性分析系统</h1>
    <div class="login-content">
      <h3>用户登录</h3>
      <el-form
        ref="form"
        :model="form"
        class="login-form"
        autocomplete="on"
        label-position="left"
      >
        <el-form-item>
          <span class="svg-container">
            <svg-icon iconClass="user"></svg-icon>
          </span>
          <el-input
            ref="username"
            v-model="form.user"
            name="username"
            type="text"
            tabindex="1"
            autocomplete="on"
          ></el-input>
        </el-form-item>
        <el-tooltip
          class="item"
          effect="dark"
          content="Right Bottom 提示文字"
          placement="right-end"
          :disabled="isDisabled"
        >
          <el-form-item>
            <span class="svg-container">
              <svg-icon iconClass="password"></svg-icon>
            </span>
            <el-input
              ref="password"
              :type="passwordType"
              v-model="form.password"
            ></el-input>
            <span class="svg-eye" @click="changePasswordType">
              <svg-icon
                :iconClass="
                  passwordType === 'password' ? 'eyeClose' : 'eyeOpen'
                "
              ></svg-icon>
            </span>
          </el-form-item>
        </el-tooltip>
        <el-button>登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        user: 'admin',
        password: '111111'
      },
      passwordType: 'password',
      isDisabled: 'false'
    }
  },
  methods: {
    changePasswordType() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
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

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 35px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 35px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss">
.login-container {
  min-height: 100vh;
  width: 100%;
  background: url('../../assets/bg.png') no-repeat center 0;
  background-size: cover;
  background-position: center 0;
  background-repeat: no-repeat;
  background-attachment: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.login-content {
  width: 500px;
  height: 400px;
  background-color: #b5bec434;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.login-form {
  position: relative;
  width: 350px;
  max-width: 100%;
  padding: 20px 35px 0;
  margin: 0 auto;
  overflow: hidden;
}
.svg-container {
  padding: 5px 5px 5px 5px;
  color: #696e70;
  vertical-align: middle;
  width: 30px;
  display: inline-block;
}
.svg-eye {
  position: absolute;
  right: 10px;
  top: 7px;
  font-size: 16px;
  color: #696e70;
  cursor: pointer;
  user-select: none;
}
</style>
