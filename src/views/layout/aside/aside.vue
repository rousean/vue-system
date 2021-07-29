<template>
  <el-scrollbar>
    <el-menu
      :default-active="this.$route.name"
      :collapse="collapse"
      :collapse-transition="false"
      background-color="rgb(25, 26, 35)"
      text-color="#fff"
      active-text-color="#409EFF"
      unique-opened
      router
    >
      <el-menu-item index="dashboard">
        <i class="el-icon-document"></i>
        <span>首页</span>
      </el-menu-item>
      <el-submenu index="系统管理">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>系统管理</span>
        </template>
        <el-menu-item index="auth">
          <i class="el-icon-document"></i>
          <span>角色管理</span>
        </el-menu-item>
        <el-menu-item index="menu">
          <i class="el-icon-document"></i>
          <span>菜单管理</span>
        </el-menu-item>
        <el-menu-item index="user">
          <i class="el-icon-document"></i>
          <span>用户管理</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="测试管理">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>测试管理</span>
        </template>
        <el-menu-item index="管理1">
          <i class="el-icon-document"></i>
          <span>管理1</span>
        </el-menu-item>
        <el-menu-item index="管理2">
          <i class="el-icon-document"></i>
          <span>管理2</span>
        </el-menu-item>
        <el-menu-item index="管理3">
          <i class="el-icon-document"></i>
          <span>管理3</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-scrollbar>
</template>

<script>
export default {
  name: 'Aside',
  props: {
    collapse: Boolean
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss">
.el-scrollbar {
  height: calc(100vh - 64px);
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.el-scrollbar__view {
  height: 100%;
}
.el-menu {
  height: 100%;
  text-align: left;
  border: 0px;
}
.el-menu-item {
  padding: 0;
}
.el-submenu__title:hover,
.el-menu-item:hover {
  background-color: rgb(9, 10, 14) !important;
}
</style>
