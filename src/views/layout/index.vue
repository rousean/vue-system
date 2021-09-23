<template>
  <el-container>
    <el-aside :width="collapse ? '60px' : '200px'">
      <div class="system-container">
        <div class="svg-system">
          <svg-icon
            iconClass="svg-system"
            style="width: 24px; height: 24px;"
          ></svg-icon>
        </div>
        <div class="system-title" v-if="!collapse">后台管理</div>
      </div>
      <Aside :collapse="collapse"></Aside>
    </el-aside>
    <el-main class="main-container">
      <div class="header-fix">
        <Header @emitCollapse="getCollapse"></Header>
        <History></History>
      </div>
      <Main class="main-main"></Main>
      <Footer></Footer>
    </el-main>
  </el-container>
</template>

<script>
import Aside from './Aside/index.vue'
import Main from './Main/index.vue'
import Header from './Header/index.vue'
import History from './History/index.vue'
import Footer from './Footer/index.vue'
export default {
  name: 'Layout',
  components: {
    Aside,
    Main,
    Header,
    History,
    Footer
  },
  data() {
    return {
      collapse: false,
      width: ''
    }
  },
  methods: {
    getCollapse(value) {
      this.collapse = value
    }
  }
}
</script>

<style lang="scss" scoped>
.system-container {
  background-color: rgb(25, 26, 35);
  min-height: 60px;
  height: 64px;
  display: flex;
  align-items: center;
}
.svg-system {
  width: 76px;
  text-align: center;
}
.system-title {
  font-size: 24px;
  color: #fff;
  font-family: 'Times New Roman', Times, serif;
  font-weight: bold;
  margin: 10px;
}
::v-deep .el-container {
  height: 100%;
  position: relative;
}
::v-deep .el-aside {
  height: 100%;
}
::v-deep .el-main {
  padding: 0;
}
::v-deep .el-divider--horizontal {
  margin: 0;
}
.header-fix {
  position: fixed;
  top: 0;
  box-sizing: border-box;
  z-index: 999;
  width: 100%;
}
.main-container {
  background-color: #f0f2f5;
  .main-main {
    min-height: calc(100vh - 200px);
    background-color: #fff;
    padding: 14px;
    margin: 114px 14px 20px;
    border-radius: 2px;
  }
}
.main-container::-webkit-scrollbar {
  display: none;
}
</style>
