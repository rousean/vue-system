<template>
  <div class="header-container">
    <el-row>
      <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
        <span @click="changeFold">
          <svg-icon
            :iconClass="fold ? 'system-aside-unfold' : 'system-aside-fold'"
          ></svg-icon>
        </span>
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">中间</el-col>
      <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
        <svg-icon iconClass="system-refresh"></svg-icon>
        <svg-icon
          :iconClass="full ? 'system-unfullscreen' : 'system-fullscreen'"
        ></svg-icon>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      fold: false,
      full: false
    }
  },
  methods: {
    changeFold() {
      this.fold = !this.fold
      this.$emit('emitCollapse', this.fold)
      // this.$parent.$parent.$parent.trendWidth()
    }
  }
}
</script>

<style lang="scss" scoped>
.header-container {
  width: 100%;
  height: 50px;
  background-color: #fff;
  text-align: center;
  line-height: 50px;
}
</style>
