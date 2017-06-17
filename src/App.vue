<template>
  <div id="app" class="wrapper">
    <div class="header">
      <router-link to="/">{{title}}</router-link>
    </div>
    <p class="links">
      <a href="/" target="_blank">
        <i class="iconfont">&#xe618;</i>
      </a>
      <a href="/" target="_blank">
        <i class="iconfont">&#xe735;</i>
      </a>
    </p>
    <router-view class="main"></router-view>
  </div>
</template>

<script>
import config from './config'

export default {
  name: 'app',

  data() {
    return {
      title: config.blogTitle
    }
  },

}
</script>
