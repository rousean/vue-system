<template>
  <div class="router-view">
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

<style lang="scss">
.router-view {
  background-color: #fff;
  margin: 10px;
}
</style>
