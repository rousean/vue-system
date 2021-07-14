<template>
  <div>
    <h2>欢迎登录</h2>
    <el-form
      ref="loginForm"
      class="login-form"
      :model="loginForm"
      :rules="loginRules"
      autocomplete="on"
      label-position="left"
    >
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon iconClass="user"></svg-icon>
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入用户名"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        ></el-input>
      </el-form-item>
      <el-tooltip
        class="item"
        effect="light"
        content="大写锁定已打开"
        placement="right-end"
        v-model="isCapsLock"
        manual
      >
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon iconClass="password"></svg-icon>
          </span>
          <el-input
            ref="password"
            :type="passwordType"
            v-model="loginForm.password"
            placeholder="请输入密码"
            tabindex="1"
            autocomplete="on"
            @keyup.native="checkCapsLock"
            @blur="isCapsLock = false"
            @keyup.enter.native="userLogin"
            @input="checkDisabled(loginForm.password)"
          ></el-input>
          <span class="svg-eye" @click="changePasswordType">
            <svg-icon
              :iconClass="passwordType === 'password' ? 'eyeClose' : 'eyeOpen'"
            ></svg-icon>
          </span>
        </el-form-item>
      </el-tooltip>
      <el-button
        :loading="loading"
        type="primary"
        @click.native.prevent="userLogin"
        :disabled="disabled"
        >立即登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    const validateUsername = (rule, value, callback) => {
      let enReg = /^[a-z]+$/
      let emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      let phoneReg = /^(?:(?:\+|00)86)?1\d{10}$/
      if (enReg.test(value) | emailReg.test(value) | phoneReg.test(value)) {
        callback()
      } else {
        callback(new Error('用户名为英文、邮箱或者手机号！'))
      }
    }
    const validatePassword = (rule, value, callback) => {
      // 登录密码长度至少8位,必须符合由数字,大写字母,小写字母,特殊符,至少其中三种组成密码
      //var reg = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\\W_!@#$%^&*`~()-+=]+$)(?![0-9\\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\\W_!@#$%^&*`~()-+=]{8,30}$/
      let passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/
      if (!passwordReg.test(value)) {
        callback(new Error('包含数字,大写,小写且8-10位的字符串!'))
      } else {
        callback()
      }
    }
    return {
      // 输入框是否为password类型
      passwordType: 'password',
      // 是否显示提示文字
      isCapsLock: false,
      loading: false,
      disabled: true,
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '用户名不能为空！', trigger: 'blur' },
          { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空！', trigger: 'blur' },
          { validator: validatePassword, trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
    // 注册组件注册完毕传值登录
    this.bus.$on('submit', data => {
      const { username, password } = data
      this.loginForm.username = username
      this.loginForm.password = password
      this.$refs.username.focus()
      this.$refs.password.focus()
      this.disabled = false
    })
  },
  methods: {
    focus() {
      if (this.loginForm.username === '') {
        this.$refs.username.focus()
      } else if (this.loginForm.password === '') {
        this.$refs.password.focus()
      }
    },
    // 通过点击眼睛图标切换密码输入的类型
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
    // 判断大写是否锁定
    checkCapsLock(e) {
      const { key } = e
      this.isCapsLock = key && key.length === 1 && key >= 'A' && key <= 'Z'
    },
    checkDisabled(value) {
      let passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/
      if (passwordReg.test(value)) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    },
    // 用户登录
    userLogin() {
      this.$refs.loginForm.validate(valide => {
        if (valide) {
          alert('登录成功')
        } else {
          alert('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.login-form {
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
