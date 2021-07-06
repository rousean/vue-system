<template>
  <div class="login-container">
    <h1 style="color:white">同源性分析系统</h1>
    <div class="login-content">
      <h3>用户登录</h3>
      <el-form
        ref="form"
        :model="form"
        label-width="90px"
        label-position="right"
        class="login-form"
      >
        <el-form-item label="用户名">
          <el-input v-model="form.user"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button>登录</el-button>
          <el-button>重置</el-button>
        </el-form-item>
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
      }
    }
  }
}
</script>

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
  background-color: #e0edf52e;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 2px 2px 2px 2px #c6e2f6 inset, -2px -2px 2px 2px #c6e2f6 inset;
}
.login-form {
  width: 80%;
  text-align: center;
}
.svg-container {
  padding: 6px 5px 6px 15px;
  color: #c6e2f6;
  vertical-align: middle;
  width: 30px;
  display: inline-block;
}
</style>
