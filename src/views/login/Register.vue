<template>
  <div>
    <h2>欢迎注册</h2>
    <el-form
      ref="registerForm"
      class="register-form"
      :model="registerForm"
      :rules="registerRules"
      status-icon
    >
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon iconClass="user"></svg-icon>
        </span>
        <el-input
          v-model="registerForm.username"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon iconClass="password"></svg-icon>
        </span>
        <el-input
          type="password"
          v-model="registerForm.password"
          placeholder="请输入密码"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <span class="svg-container">
          <svg-icon iconClass="checkPass"></svg-icon>
        </span>
        <el-input
          type="password"
          v-model="registerForm.checkPass"
          placeholder="请再次确认密码"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-button
        type="primary"
        :disabled="disabled"
        @click.native.prevent="submitForm"
        >注册</el-button
      >
      <el-button @click.native.prevent="resetForm">重置</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    let validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码!'))
      } else {
        if (this.registerForm.checkPass !== '') {
          this.$refs.registerForm.validateField('checkPass')
        }
        callback()
      }
    }
    let validateCheckPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.passsword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      disabled: true,
      registerForm: {
        username: '',
        password: '',
        checkPass: ''
      },
      registerRules: {
        username: [
          { required: true, message: '用户名不能为空！', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空！', trigger: 'blur' },
          { validator: validatePassword, trigger: 'blur' }
        ],
        checkPass: [{ validator: validateCheckPass, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm() {
      this.$refs.registerForm.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.register-form {
  width: 380px;
  max-width: 100%;
  padding: 10px;
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
