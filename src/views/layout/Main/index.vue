<template>
  <div class="view-container">
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Main'
}
</script>

<style lang="scss" scoped>
.view-container {
  background-color: #fff;
  margin: 10px;
}
</style>
