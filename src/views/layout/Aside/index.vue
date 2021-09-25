<template>
  <div>
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
        <svg-icon
          iconClass="system-dashboard"
          style="width: 20px; height: 20px; margin-right: 5px;"
        ></svg-icon>
        <span slot="title">
          首页
        </span>
      </el-menu-item>
      <el-submenu index="system">
        <template slot="title">
          <svg-icon
            iconClass="system-manage"
            style="width: 20px; height: 20px; margin-right: 5px;"
          ></svg-icon>
          <span>
            系统管理
          </span>
        </template>
        <el-menu-item index="auth">
          <svg-icon
            iconClass="system-auth"
            style="width: 18px; height: 18px; margin-right: 5px;"
          ></svg-icon>
          <span slot="title">
            角色管理
          </span>
        </el-menu-item>
        <el-menu-item index="menu">
          <svg-icon
            iconClass="system-menu"
            style="width: 18px; height: 18px; margin-right: 8px;"
          ></svg-icon>
          <span slot="title">菜单管理</span>
        </el-menu-item>
        <el-menu-item index="user">
          <svg-icon
            iconClass="system-user"
            style="width: 18px; height: 18px; margin-right: 5px;"
          ></svg-icon>
          <span slot="title">用户管理</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
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

<style lang="scss" scoped>
::v-deep .el-menu {
  border: 0px;
}
::v-deep .el-submenu__title:hover,
.el-menu-item:hover {
  background-color: rgb(9, 10, 14) !important;
}
</style>
