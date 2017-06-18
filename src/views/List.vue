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

<style>
.main ul {
  list-style-type: none;
  padding: 0;
  padding-top: 4px;
}

.main ul li {
  position: relative;
  padding: 30px 0 30px;
  border-bottom: 1px solid #e6e6e6;
}

.main ul li:first-child {
  margin-top: -30px;
}

.main h2,
.main h3 {
  letter-spacing: 1px;
  margin: 0;
  text-transform: uppercase;
}

.main h2 {
  font-size: 20px;
  letter-spacing: 1px;
  margin-left: 120px;
}

.main h2 a {
  color: #444;
}

.main h2 a:hover {
  color: #f33;
}

.main h3 {
  font-size: 13px;
  color: #999;
  position: absolute;
  left: 0;
  top: 33px;
}

@media screen and (max-width: 420px) {
  .main h2 {
    font-size: 16px;
    margin-left: 0;
  }
  .main h2 a:hover {
    color: #f66;
  }
  .main h3 {
    font-size: 11px;
    position: static;
    margin-bottom: 10px;
  }
  .main ul li {
    padding: 18px 0 20px;
  }
  .main ul li:first-child {
    margin-top: -35px;
  }
}
</style>
