<template>
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
      <span
        slot="label"
        :style="{
          color: editableTabsValue === item.name ? '#000' : '#333'
        }"
        ><i
          class="dot"
          :style="{
            backgroundColor: editableTabsValue === item.name ? '#000' : '#ddd'
          }"
        />
        {{ item.title }}</span
      >
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: 'History',
  data() {
    return {
      editableTabsValue: '1',
      editableTabs: [
        {
          title: '首页',
          name: '1',
          content: 'Tab 1 content'
        },
        {
          title: '系统管理',
          name: '2',
          content: 'Tab 2 content'
        },
        {
          title: '测试管理',
          name: '3',
          content: 'Tab 2 content'
        }
      ],
      tabIndex: 1
    }
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

<style lang="scss">
.rousean {
  background-color: hotpink;
}
.el-tabs__item .el-icon-close {
  color: initial !important;
}
.el-tabs__item .dot {
  content: '';
  width: 9px;
  height: 9px;
  margin-right: 8px;
  display: inline-block;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.contextmenu li {
  margin: 0;
  padding: 7px 16px;
}
.contextmenu li:hover {
  background: #f2f2f2;
  cursor: pointer;
}
</style>
