<template>

</template>

<script>

import api from '../api'
import config from '../config'

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
          console.log(list)
        })
        .catch(err => {
          this.loading = false
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>
