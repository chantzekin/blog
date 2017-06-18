<template>
  <div>
    <ul>
      <li v-for="{ title, sha, date } in list" :key="sha">
        <h3>{{ date | formatDate }}</h3>
        <h2>
          <router-link :to="'/post/' + sha">{{ title }}</router-link>
        </h2>
      </li>
    </ul>
  </div>
</template>

<script>

import api from '../api'
import config from '../config'

import '../../static/index.css'

export default {

  name: 'list',

  data() {
    return {
      list: [],
      loading: true
    }
  },

  created() {
    this.loadList()
  },

  methods: {
    loadList() {
      this.loading = true
      window.document.title = config.blogTitle

      api
        .fetchList()
        .then(list => {
          this.loading = false
          this.list = list
        })
        .catch(err => {
          this.loading = false
          console.log(err)
        })
    }
  },

  watch: {
    '$route': 'loadList'
  }
}
</script>
