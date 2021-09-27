<template>
  <div class="history-container">
    <el-tabs
      v-model="editableTabsValue"
      type="card"
      closable
      @tab-remove="removeTab"
    >
      <el-tab-pane
        v-for="item in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
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
      editableTabsValue: 'dashboard',
      editableTabs: [
        {
          title: '首页',
          name: 'dashboard',
          icon: 'system-dashboard'
        }
      ],
      tabIndex: 1
    }
  },
  mounted() {
    console.log(this.routerList)
    console.log(this.historyRouters)
  },
  computed: {
    ...mapState(['routerList', 'historyRouters'])
  },
  methods: {
    removeTab(targetName) {
      let tabs = this.editableTabs
      let activeName = this.editableTabsValue
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }
      this.editableTabsValue = activeName
      this.editableTabs = tabs.filter(tab => tab.name !== targetName)
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
</style>
