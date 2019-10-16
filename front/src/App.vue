<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /* background: url(./assets/img/login-background.JPG) no-repeat;
    background-size: 100%; */
    padding-top:1px
  }

  html,
  body,
  #app {
    height: 100%;
  }
</style>
