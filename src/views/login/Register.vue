<template>
  <div>
    <div class="form-header">
      <img src="../../assets/venus.png" alt="logo" />
      <span>Venus-Vue-Admin</span>
    </div>
    <el-form
      ref="registerForm"
      class="register-form"
      :model="registerForm"
      :rules="registerRules"
    >
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon iconClass="user"></svg-icon>
        </span>
        <el-input
          ref="username"
          v-model="registerForm.username"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon iconClass="password"></svg-icon>
        </span>
        <el-input
          ref="password"
          :type="passwordType"
          v-model="registerForm.password"
          placeholder="请输入密码"
          autocomplete="off"
        ></el-input>
        <span class="svg-eye" @click="changePasswordType">
          <svg-icon
            :iconClass="passwordType === 'password' ? 'eyeClose' : 'eyeOpen'"
          ></svg-icon>
        </span>
      </el-form-item>
      <el-form-item prop="checkPass">
        <span class="svg-container">
          <svg-icon iconClass="checkPass"></svg-icon>
        </span>
        <el-input
          ref="checkPass"
          :type="checkPassType"
          v-model="registerForm.checkPass"
          placeholder="请再次确认密码"
          autocomplete="off"
          @input="checkDisabled(registerForm.checkPass)"
        ></el-input>
        <span class="svg-eye" @click="changeCheckPassType">
          <svg-icon
            :iconClass="passwordType === 'password' ? 'eyeClose' : 'eyeOpen'"
          ></svg-icon>
        </span>
      </el-form-item>
      <el-button
        type="primary"
        :disabled="disabled"
        @click.native.prevent="userRegister"
        >注册</el-button
      >
      <el-button @click.native.prevent="reset">重置</el-button>
    </el-form>
  </div>
</template>

<script>
import { reqRegister } from '../../api'
export default {
  data() {
    let validateUsername = (rule, value, callback) => {
      let enReg = /^[a-z]+$/
      let emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      let phoneReg = /^(?:(?:\+|00)86)?1\d{10}$/
      if (enReg.test(value) | emailReg.test(value) | phoneReg.test(value)) {
        callback()
      } else {
        callback(new Error('用户名为英文、邮箱或者手机号！'))
      }
    }
    let validatePassword = (rule, value, callback) => {
      let passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/
      if (!passwordReg.test(value)) {
        callback(new Error('包含数字,大写,小写且8-10位的字符串!'))
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
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      disabled: true,
      passwordType: 'password',
      checkPassType: 'password',
      registerForm: {
        username: '',
        password: '',
        checkPass: ''
      },
      registerRules: {
        username: [
          { required: true, message: '用户名不能为空！', trigger: 'blur' },
          { validator: validateUsername, trigger: 'blur' }
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
    focus() {
      if (this.registerForm.username === '') {
        this.$refs.username.focus()
      } else if (this.registerForm.password === '') {
        this.$refs.password.focus()
      } else if (this.registerForm.checkPass === '') {
        this.$refs.checkPass.focus()
      }
    },
    changePasswordType() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    changeCheckPassType() {
      if (this.checkPassType === 'password') {
        this.checkPassType = ''
      } else {
        this.checkPassType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.checkPass.focus()
      })
    },
    checkDisabled(value) {
      let passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/
      if (passwordReg.test(value) & (value === this.registerForm.password)) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    },
    userRegister() {
      this.$refs.registerForm.validate(async valid => {
        if (valid) {
          const username = this.registerForm.username
          const password = this.registerForm.password
          const result = await reqRegister(username, password)
          console.log(result)
          if (result.code == 1) {
            this.$confirm('您已注册成功,是否为您跳转登录页面？', '', {
              distinguishCancelAndClose: true,
              confirmButtonText: '是',
              cancelButtonText: '否'
            })
              .then(() => {
                this.$parent.sign()
                this.bus.$emit('submit', {
                  username: username,
                  password: password
                })
              })
              .catch(action => {
                this.$notify.success({
                  title: '失败',
                  message: '用户注册失败！'
                })
              })
            this.registerForm.username = ''
            this.registerForm.password = ''
            this.registerForm.checkPass = ''
            this.$refs.username.focus()
          } else {
            this.$notify.error({
              title: '失败',
              message: result.message
            })
          }
        } else {
          this.$notify.error({
            title: '错误',
            message: '注册信息提交错误！'
          })
        }
      })
    },
    reset() {
      this.$refs.registerForm.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.form-header {
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  img {
    width: 60px;
    height: 50px;
    margin-right: 20px;
  }
  span {
    font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
      'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
    font-size: 30px;
    height: 50px;
    line-height: 50px;
  }
}
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
</style>
