<template>
  <div>
    <div class="post">
      <h3 class="date" v-if="date">{{ date | formatDate }}</h3>
      <h1>{{ title }}</h1>
      <article class="content" v-html="htmlFromMarkdown"></article>

      <a id="newer" class="blog-nav" v-if="hasNewer" @click="to(index - 1)">&lt;&nbsp;NEWER</a>
      <a id="older" class="blog-nav" v-if="hasOlder" @click="to(index + 1)">OLDER&nbsp;&gt;</a>
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
      content: '',
      hasOlder: false,
      hasNewer: false,
      index: 0,
      list: []
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
    to(index) {
      const toPost = this.list[index]

      this.$router.push({
        name: 'post',
        params: {
          hash: toPost.sha
        }
      })
    },

    loadPost() {
      const hash = this.$route.params.hash

      Promise
        .all([
          api.fetchList(),
          api.fetchPost(hash)
        ])
        .then(res => {
          const list = res[0]
          let post = fm(res[1])
          post = this.setPost(post)

          const postIndex = list.findIndex(item => (item.title === post.title))

          this.index = postIndex
          this.hasOlder = postIndex > 0
          this.hasNewer = postIndex !== list.length - 1 && postIndex !== 0
          this.list = list
        })
        .catch(err => {
          console.log(err)
          this.$router.replace('/')
        })
    },

    setPost(fm) {
      this.content = fm.body
      this.title = fm.attributes.title
      this.date = fm.attributes.date

      window.document.title = `${this.title} - ${config.blogTitle}`

      return { content: this.content, date: this.date, title: this.title }
    }
  },

  watch: {
    '$route': 'loadPost'
  }

}
</script>

<style scoped>

</style>

