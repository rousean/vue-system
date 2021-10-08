<template>
  <el-menu
    :default-active="this.$route.name"
    :collapse="collapse"
    :collapse-transition="false"
    background-color="rgb(25, 26, 35)"
    text-color="#fff"
    active-text-color="#409EFF"
    unique-opened
    router
    class="el-menu-vertical-demo"
    @select="changeRouter"
  >
    <template v-for="menu in asyncRouters">
      <el-menu-item
        v-if="menu.children.length === 0"
        :index="menu.name"
        :key="menu.name"
      >
        <svg-icon
          :iconClass="menu.meta.icon"
          className="first-level-icon"
        ></svg-icon>
        <span slot="title">
          {{ menu.meta.title }}
        </span>
      </el-menu-item>
      <el-submenu v-else :index="menu.name" :key="menu.name">
        <template slot="title">
          <svg-icon
            :iconClass="menu.meta.icon"
            className="first-level-icon"
          ></svg-icon>
          <span slot="title">
            {{ menu.meta.title }}
          </span>
        </template>
        <el-menu-item
          v-for="item in menu.children"
          :key="item.name"
          :index="item.name"
        >
          <svg-icon
            :iconClass="item.meta.icon"
            className="second-level-icon"
          ></svg-icon>
          <span slot="title">
            {{ item.meta.title }}
          </span>
        </el-menu-item>
      </el-submenu>
    </template>
  </el-menu>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Aside',
  props: {
    collapse: Boolean
  },
  computed: {
    ...mapState(['asyncRouters', 'historyRouters'])
  },
  methods: {
    changeRouter(index, indexPath) {
      this.$store.commit('addHistoryRouters', index)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
.first-level-icon {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
.second-level-icon {
  width: 18px;
  height: 18px;
  margin-right: 5px;
}
::v-deep .el-menu {
  border-right: solid 0px #e6e6e6;
}
::v-deep .el-submenu__title:hover,
.el-menu-item:hover {
  background-color: rgb(9, 10, 14) !important;
}
</style>
