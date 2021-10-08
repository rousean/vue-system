<template>
  <div class="history-container">
    <el-tabs
      v-model="editableTabsValue"
      type="card"
      :closable="historyRouters.length !== 1 || editableTabsValue !== '首页'"
      @tab-remove="removeTab"
    >
      <el-tab-pane
        v-for="item in historyRouters"
        :key="item.name"
        :label="item.title"
        :name="item.title"
      >
        <span slot="label">
          <svg-icon
            :iconClass="item.icon"
            style="vertical-align: middle; margin-left:5px;"
          ></svg-icon>
          {{ item.title }}
        </span>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'History',
  data() {
    return {
      editableTabsValue: '首页',
      editableTabs: '',
      tabIndex: 1
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.editableTabsValue = route.meta.title
      },
      immediate: true
    }
  },
  computed: {
    ...mapState(['routerList', 'historyRouters'])
  },
  methods: {
    removeTab(targetName) {
      console.log(this.editableTabsValue)
      console.log(targetName)
      if (this.editableTabsValue === targetName) {
        this.$router.push(
          this.historyRouters[
            this.historyRouters.findIndex(item => item.title === targetName) - 1
          ].name
        )
      }
      this.$store.commit('delhistoryrouters', targetName)

      // let tabs = this.editableTabs
      // let activeName = this.editableTabsValue
      // if (activeName === targetName) {
      //   tabs.forEach((tab, index) => {
      //     if (tab.name === targetName) {
      //       let nextTab = tabs[index + 1] || tabs[index - 1]
      //       if (nextTab) {
      //         activeName = nextTab.name
      //       }
      //     }
      //   })
      // }
      // this.editableTabsValue = activeName
      // this.editableTabs = tabs.filter(tab => tab.name !== targetName)
    }
  }
}
</script>

<style lang="scss" scoped>
.history-container {
  background: #fff;
  border-top: 1px solid #f4f4f4;
  padding: 0;
}
::v-deep .el-tabs__header {
  margin: 0px;
}
::v-deep .el-tabs__nav {
  border: 0 !important;
}
::v-deep .el-tabs__item {
  border-left: 1px solid #f4f4f4 !important;
  border-bottom: 0px solid #f4f4f4 !important;
}
::v-deep .el-tabs__item .el-icon-close {
  color: initial !important;
}
::v-deep .el-tabs__item .dot {
  content: '';
  width: 9px;
  height: 9px;
  margin-right: 8px;
  display: inline-block;
  border-radius: 50%;
  transition: background-color 0.2s;
}
::v-deep .el-tabs__item.is-active {
  background-color: #409eff14;
}
</style>
