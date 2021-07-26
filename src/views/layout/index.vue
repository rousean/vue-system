<template>
  <div>
    <el-container>
      <el-aside style="width:200px;">
        <el-menu>
          <el-menu-item index="1">
            <i class="el-icon-document"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>系统管理</span>
            </template>
            <el-menu-item index="1">
              <i class="el-icon-document"></i>
              <span slot="title">角色管理</span>
            </el-menu-item>
            <el-menu-item index="1">
              <i class="el-icon-document"></i>
              <span slot="title">菜单管理</span>
            </el-menu-item>
            <el-menu-item index="1">
              <i class="el-icon-document"></i>
              <span slot="title">用户管理</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main style="width:100%;">
        <div style="height:60px"></div>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        </el-breadcrumb>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
