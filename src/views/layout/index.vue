<template>
  <el-container>
    <el-aside width="200px">
      <div class="venus">
        <div>
          <img
            src="../../assets/venus.png"
            alt="vensu"
            width="80px"
            height="55px"
          />
        </div>
        <div class="title">知行合一</div>
      </div>
      <Aside></Aside>
    </el-aside>
    <el-main class="main-container">
      <div class="header-fix">
        <Header></Header>
        <History></History>
      </div>
      <Main class="main"></Main>
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
  }
}
</script>

<style lang="scss">
.venus {
  display: flex;
  align-items: center;
  background-color: rgb(25, 26, 35);
  height: 64px;
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
  }
}
.el-container {
  height: 100%;
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

  .main {
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
