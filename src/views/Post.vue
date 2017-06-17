<template>
  <div>
    <div class="post">
      <h3 class="date">{{ date | formatDate }}</h3>
      <h1>{{ title }}</h1>
      <article class="content" v-html="htmlFromMarkdown"></article>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import fm from 'front-matter'

import api from '../api'
import config from '../config'
import marked from '../utils/render'

import '../../static/post.css'

export default {

  data() {
    return {
      title: '',
      date: null,
      content: ''
    }
  },

  computed: {
    htmlFromMarkdown() {
      return this.content
        ? marked(this.content)
        : ''
    }
  },

  created() {
    this.loadPost()
  },

  methods: {
    loadPost() {
      const hash = this.$route.params.hash

      api
        .fetchPost(hash)
        .then(md => {
          // Parse front-matter
          // https://github.com/jxson/front-matter#fmstring
          const content = fm(md)
          this.content = content.body
          this.title = content.attributes.title
          this.date = content.attributes.date

          window.document.title = `${this.title} - ${config.blogTitle}`
        })
        .catch(err => {
          console.log(err)
          this.$router.replace('/')
        })
    }
  }

}
</script>

<style scoped>
.main h3 {
  position: initial;
}
</style>

