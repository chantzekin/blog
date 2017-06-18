<template>
  <div>
    <div class="post">
      <h3 class="date" v-if="date">{{ date | formatDate }}</h3>
      <h1>{{ title }}</h1>
      <article class="content" v-html="htmlFromMarkdown"></article>

      <a id="newer" class="blog-nav">&lt;&nbsp;NEWER</a>
      <a id="older" class="blog-nav">OLDER&nbsp;&gt;</a>
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
      hasNext: false,
      hasPrev: false,
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

      this.router.push({
        name: 'post',
        params: {
          hash: toPost.hash
        }
      })
    },

    loadPost() {
      const hash = this.$route.params.hash

      Promise.all([
        api.fetchList(),
        api.fetchPost(hash)
      ]).then(res => {
        const list = res[0]
        let post = fm(res[1])

        post = this.setPost(post)

        let postIndex = list.findIndex(item => console.log(item.title))

        console.log(post.title)

      })

      api
        .fetchList()
        .then(list => {
          this.list = list
        })
        .catch(err => {
          console.log(err)
        })

      api
        .fetchPost(hash)
        .then(md => {
          // Parse front-matter
          // https://github.com/jxson/front-matter#fmstring
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
  }

}
</script>

<style scoped>
.main h3 {
  position: initial;
}
</style>

