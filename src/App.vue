<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  name: 'App',
  created() {

  },
  methods: {
    ...mapMutations(['setuserInfoVal']),
  },
  mounted() {
    if (localStorage.getItem('userInfo') != null) {
      let userinfo = JSON.parse(localStorage.getItem('userInfo'))
      // console.log(userinfo)
      this.setuserInfoVal(userinfo)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
