<template>
  <div class="layout-container">
    <el-container>
      <el-aside class="aside-container" :width="collapse ? '60px' : '200px'">
        <div class="system-container">
          <div class="system-icon">
            <svg-icon
              iconClass="system-icon"
              style="width: 24px; height: 24px;"
            ></svg-icon>
          </div>
          <div class="system-title" v-if="!collapse">Vue-Admin</div>
        </div>
        <Aside :collapse="collapse"></Aside>
      </el-aside>
      <el-main class="main-container">
        <div class="header-history">
          <Header @emitCollapse="getCollapse"></Header>
          <History></History>
        </div>
        <Main class="main-content"></Main>
        <Footer></Footer>
      </el-main>
    </el-container>
  </div>
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
.layout-container {
  width: 100%;
  height: 100%;
}
.aside-container {
  background-color: rgb(25, 26, 35);
}
.aside-container::-webkit-scrollbar {
  width: 0 !important;
}
.system-container {
  background-color: rgb(25, 26, 35);
  min-height: 60px;
  height: 64px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 99;
}
.system-icon {
  width: 60px;
  text-align: center;
}
.system-title {
  font-size: 22px;
  color: #fff;
  font-family: 'Times New Roman', Times, serif;
  font-weight: bold;
}
.header-history {
  position: sticky;
  top: 0;
  z-index: 999;
}
.main-container {
  background-color: #f0f2f5;
}
.main-content {
  min-height: calc(100vh - 190px);
  background-color: #fff;
  padding: 20px;
  margin: 15px;
  border-radius: 5px;
}
.main-container::-webkit-scrollbar {
  display: none;
}
::v-deep .el-container {
  position: relative;
  height: 100%;
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
</style>
