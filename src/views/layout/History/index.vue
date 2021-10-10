<template>
  <div class="history-container">
    <el-tabs
      v-model="currentTab"
      type="card"
      :closable="!(historyRouters.length === 1 && currentTab === '首页')"
      @tab-remove="removeTab"
      @tab-click="clickTab"
    >
      <el-tab-pane
        v-for="item in historyRouters"
        :key="item.name"
        :name="item.title"
      >
        <span slot="label" @click.right.prevent="rightClick">
          <svg-icon className="label-icon" :iconClass="item.icon"></svg-icon>
          {{ item.title }}
        </span>
      </el-tab-pane>
    </el-tabs>
    <div ref="operate" class="tab-operate" v-show="showOperate">
      <div>关闭所有</div>
      <div>关闭左侧</div>
      <div>关闭右侧</div>
      <div>关闭其他</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'History',
  data() {
    return {
      currentTab: '首页', // 当前标签页名
      showOperate: false
    }
  },
  watch: {
    $route: {
      handler: function(newVaule, oldValue) {
        this.currentTab = newVaule.meta.title
      },
      immediate: true
    },
    showOperate: {
      handler: function(newVaule, oldValue) {
        if (this.showOperate) {
          document.body.addEventListener('click', () => {
            this.showOperate = false
          })
        } else {
          document.body.removeEventListener('click', () => {
            this.showOperate = false
          })
        }
      }
    }
  },
  computed: {
    ...mapState(['routerList', 'historyRouters'])
    // historyRouters-数据实例 [{title: '首页', name: 'dashboard', icon: 'system-dashboard'}]
  },
  methods: {
    // 点击标签页
    // @tab 当前标签实例
    clickTab(tab) {
      if (this.currentTab === this.$route.meta.title) {
        return
      }
      let idx = this.historyRouters.findIndex(item => item.title === tab.name)
      this.$router.push(this.historyRouters[idx].name)
    },
    // 移除标签页
    // @tabName 当前标签页名
    removeTab(tabName) {
      if (this.currentTab === tabName) {
        if (this.historyRouters.length === 1) {
          this.$store.commit('addHistoryRouters', 'dashboard')
        }
        let idx = this.historyRouters.findIndex(item => item.title === tabName)
        if (idx === 0) {
          this.$router.push(this.historyRouters[idx + 1].name)
        } else {
          this.$router.push(this.historyRouters[idx - 1].name)
        }
      }
      this.$store.commit('delHistoryRouters', tabName)
    },
    // 鼠标右键点击操作
    rightClick(e) {
      if (!this.showOperate) {
        this.showOperate = true
      }
      this.$refs.operate.style = `left:${e.clientX - 200}px`
    }
  }
}
</script>

<style lang="scss" scoped>
.history-container {
  background: #fff;
  border-top: 1px solid #f4f4f4;
  padding: 0;
  position: relative;
}
.label-icon {
  vertical-align: middle;
  margin-right: 5px;
}
.tab-operate {
  width: 100px;
  height: 140px;
  box-shadow: 0 0 6px rgba(63, 63, 62, 0.6);
  background-color: rgb(255, 255, 255);
  border-radius: 3px;
  border: 1px solid rgba(97, 97, 97, 0.493);
  position: absolute;
  top: 30px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  z-index: 100;
}
.tab-operate > div {
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
}
.tab-operate > div:hover {
  background-color: rgb(238, 238, 238);
  cursor: pointer;
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
::v-deep .el-tabs__item.is-active {
  background-color: #409eff14;
}
</style>
