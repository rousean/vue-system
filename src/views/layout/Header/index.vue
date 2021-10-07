<template>
  <div class="header-container">
    <el-row>
      <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1" class="header-left">
        <span @click="changeFold">
          <svg-icon
            className="header-svg-icon"
            :iconClass="asideFold ? 'system-aside-unfold' : 'system-aside-fold'"
          ></svg-icon>
        </span>
      </el-col>
      <el-col
        :xs="12"
        :sm="12"
        :md="12"
        :lg="12"
        :xl="12"
        class="header-middle"
      >
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item
            v-for="item in $route.matched.slice(1, $route.matched.length)"
            :key="item.path"
          >
            {{ item.meta.title }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11" class="header-right">
        <span @click="clickRefresh">
          <svg-icon
            className="header-svg-icon"
            iconClass="system-refresh"
          ></svg-icon>
        </span>
        <span @click="changeFullScreen" class="fullscreen-icon">
          <svg-icon
            className="header-svg-icon"
            :iconClass="
              fullScreen ? 'system-unfullscreen' : 'system-fullscreen'
            "
          ></svg-icon>
        </span>
        <el-avatar icon="el-icon-user-solid" size="small"></el-avatar>
        <el-dropdown class="el-dropdown">
          <span class="el-dropdown-link">
            管理员
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <svg-icon
                className="header-svg-icon"
                iconClass="system-person-info"
              ></svg-icon>
              个人信息
            </el-dropdown-item>
            <el-dropdown-item>
              <svg-icon
                className="header-svg-icon"
                iconClass="system-login-out"
              ></svg-icon>
              登出
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Header',
  inject: ['reload'],
  data() {
    return {
      asideFold: false, // 侧边栏状态
      fullScreen: false // 全屏状态
    }
  },
  mounted() {
    window.addEventListener('resize', () => {
      if (this.timer) {
        return
      }
      this.timer = setTimeout(() => {
        if (!this.checkFullScreen() && this.fullScreen) {
          this.fullScreen = false
        }
        clearTimeout(this.timer)
        this.timer = null
      }, 0)
    })
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('resize', () => {
        if (this.timer) {
          return
        }
        this.timer = setTimeout(() => {
          if (!this.checkFullScreen() && this.fullScreen) {
            this.fullScreen = false
          }
          clearTimeout(this.timer)
          this.timer = null
        }, 0)
      })
    })
  },
  methods: {
    // 改变侧边栏状态
    changeFold() {
      this.asideFold = !this.asideFold
      this.$emit('emitCollapse', this.asideFold)
      console.log(this.$route)
    },
    // 刷新当前组件
    clickRefresh() {
      this.reload()
    },
    // 切换全屏
    changeFullScreen() {
      this.fullScreen = !this.fullScreen
      if (this.fullScreen) {
        this.windowFullScreen()
      } else {
        this.windowExitFullScreen()
      }
    },
    // 进入全屏
    windowFullScreen() {
      let docElm = document.documentElement
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen()
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen()
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen()
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen()
      }
    },
    // 退出全屏
    windowExitFullScreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen()
      }
    },
    // 检查全屏状态
    checkFullScreen() {
      let isFull =
        document.mozFullScreen ||
        document.fullScreen ||
        document.webkitIsFullScreen ||
        document.webkitRequestFullScreen ||
        document.mozRequestFullScreen ||
        document.msFullscreenEnabled
      if (isFull === undefined) {
        isFull = false
      }
      return isFull
    }
  }
}
</script>

<style lang="scss" scoped>
.header-container {
  width: 100%;
  height: 50px;
  background-color: #fff;
}
.header-left {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
}
.header-svg-icon {
  width: 20px;
  height: 20px;
  vertical-align: middle;
  margin-right: 5px;
}
.header-middle {
  height: 50px;
  display: flex;
  align-items: center;
}
.header-right {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.fullscreen-icon {
  margin: 0 30px 0 30px;
}
.el-dropdown {
  margin: 0 20px 0 10px;
}
::v-deep .el-avatar--small {
  width: 20px;
  height: 20px;
  line-height: 20px;
}
</style>
