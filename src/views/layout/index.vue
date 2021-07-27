<template>
  <el-container>
    <!-- Aside -->
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
    <!-- Main -->
    <el-main>
      <Header></Header>
      <el-divider></el-divider>
      <History></History>

      <Main></Main>
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
</style>
