<template>
  <el-container>
    <el-aside :width="collapse ? '60px' : '200px'">
      <div class="venus">
        <img src="../../assets/venus.png" alt="logo" />
        <h2 class="title" v-if="!collapse">我爱工作</h2>
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
import Aside from './aside/aside.vue'
import Main from './main/main.vue'
import Header from './header/header.vue'
import History from './history/history.vue'
import Footer from './footer/footer.vue'
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

<style lang="scss">
.venus {
  align-items: center;
  background-color: rgb(25, 26, 35);
  height: 64px;
  min-height: 60px;
  line-height: 60px;
  display: flex;
  img {
    width: 40px;
    height: 30px;
    margin: 10px;
  }
  .title {
    margin-left: 20px;
    font-size: 24px;
    color: #fff;
    font-family: 'Times New Roman', Times, serif;
    font-weight: bold;
    margin: 10px;
  }
}
.el-container {
  height: 100%;
  position: relative;
  width: 100%;
}
.el-aside {
  height: 100%;
}
.el-main {
  padding: 0;
}
.el-divider--horizontal {
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
