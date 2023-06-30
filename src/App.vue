<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

import store from "@/store";

export default {
  name: 'App',
  components: {
  },
  beforeCreate() {
    if (sessionStorage.getItem("token")) {
      store.dispatch('checkToken')
    } else if (JSON.parse(localStorage.getItem('autoLogin'))) {
      sessionStorage.setItem('token', localStorage.getItem('token'))
      store.dispatch('checkToken')
    }
  }
}
</script>

<style>


*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
li{
  list-style: none;
}
a{
  text-decoration: none;
}
.clearfix:after {
  visibility: hidden;
  clear: both;
  display: block;
  content: ".";
  height: 0
}

.clearfix {
  *zoom: 1
}
button{
  cursor: pointer;
}

</style>
