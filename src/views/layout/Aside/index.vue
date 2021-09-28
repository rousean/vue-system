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
    <template v-for="asyncRouter in asyncRouters">
      <el-menu-item
        v-if="asyncRouter.children.length === 0"
        :index="asyncRouter.name"
        :key="asyncRouter.name"
      >
        <svg-icon
          :iconClass="asyncRouter.meta.icon"
          className="first-level-icon"
        ></svg-icon>
        <span slot="title">
          {{ asyncRouter.meta.title }}
        </span>
      </el-menu-item>
      <el-submenu v-else :index="asyncRouter.name" :key="asyncRouter.name">
        <template slot="title">
          <svg-icon
            :iconClass="asyncRouter.meta.icon"
            className="first-level-icon"
          ></svg-icon>
          <span slot="title">
            {{ asyncRouter.meta.title }}
          </span>
        </template>
        <el-menu-item
          v-for="router in asyncRouter.children"
          :key="router.name"
          :index="router.name"
        >
          <svg-icon
            :iconClass="router.meta.icon"
            className="second-level-icon"
          ></svg-icon>
          <span slot="title">
            {{ router.meta.title }}
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
  data() {
    return {}
  },
  computed: {
    ...mapState(['asyncRouters', 'historyRouters'])
  },
  methods: {
    changeRouter(index, indexPath) {
      if (this.historyRouters.indexOf(index) === -1) {
        this.$store.commit('addHistoryRouters', index)
      }
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
