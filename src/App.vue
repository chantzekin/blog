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

<style>
body {
  font-family: "Roboto", "Helvetica Neue", "Hiragino Sans GB", "LiHei Pro", Arial, serif;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 400;
  font-size: 16px;
  word-spacing: 1px;
  color: #666;
  margin: 0;
}

a {
  color: #666;
  text-decoration: none;
  transition: color 0.2s ease, border-color 0.2s ease;
}

.header,
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Montserrat", "Helvetica Neue", "Hiragino Sans GB", "LiHei Pro", Arial, sans-serif;
  font-weight: 400;
  color: #444;
}

.header {
  letter-spacing: 5px;
  margin: 50px auto 15px;
  text-align: center;
}

.header a {
  font-size: 15px;
  color: #444;
}

.links {
  text-align: center;
  font-family: "Roboto", "Helvetica Neue", "Hiragino Sans GB", "LiHei Pro", Arial, serif;
  color: #999;
  font-size: 24px;
  margin: 0;
}

.links a {
  cursor: pointer;
  padding: 2px;
  margin: 0 3px;
}

.links .iconfont {
  font-size: 15px;
  line-height: 1;
  vertical-align: middle;
  color: #000;
  opacity: .4;
  transition: opacity .2s ease-in;
}

.links .iconfont:hover {
  opacity: .6;
}
</style>
