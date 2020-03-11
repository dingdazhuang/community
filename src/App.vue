<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <m-header></m-header>
    <router-view/>
    <bottom-tab></bottom-tab>
  </div>
</template>

<script>
import MHeader from 'components/Header/Header'
import BottomTab from 'components/BottomTab/bottomTab'
export default {
  name: 'App',
  components: {
    MHeader,
    BottomTab
  }
}
</script>

<style>
#app {
  /* font-size: 14px;  no */
  position: relative;
  width: 100%;
  padding: 100px 0;
  box-sizing: border-box;
  margin: 0 auto;
}
</style>
