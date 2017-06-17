//
// src/api/index.js

import axios from 'axios'
import 'es6-promise/auto'

import config from '../config'
import { onlyTitle, onlyDate } from '../utils'

const FETCH_LIST_URL = (() => {
  let url = `https://api.github.com/repos/${config.repo}/contents/`
  config.path && (url += config.path)
  config.branch && (url += `?ref=${config.branch}`)
  return url
})()

const FETCH_POST_URL = (hash => {
  return `https://api.github.com/repos/${config.repo}/git/blobs/${hash}`
})()

const Cache = {
  get: (key) => {
    if (!window.sessionStorage) {
      return false
    }
    return JSON.parse(window.sessionStorage.getItem(key))
  },
  set: (key, data) => {
    if (!window.sessionStorage) {
      return false
    }
    window.sessionStorage.setItem(key, JSON.stringify(data))
    return true
  },
  has: (key) => {
    return !!(window.sessionStorage
      && window.sessionStorage.hasOwnProperty(key))
  }
}

export default {
  fetchList() {
    if (Cache.has('list')) {
      return Promise.resolve(Cache.get('list'))
    } else {
      console.log(FETCH_LIST_URL)
      return axios
        .get(FETCH_LIST_URL)
        .then(res => res.data)
        .then(arr => {
          const list = arr.map(({ name, sha, size }) => ({
            title: onlyTitle(name),
            date: onlyDate(name),
            sha,
            size
          }))
          Cache.set('list', list)
          return list
        })
    }
  },
  fetchPost(hash) {
    const httpOpts = { headers: { Accept: 'application/vnd.github.v3.raw' } }
    const cacheKey = `post.${hash}`

    if (Cache.has(cacheKey)) {
      return Promise.resolve(Cache.get(cacheKey))
    } else {
      return axios
        .get(FETCH_POST_URL, httpOpts)
        .then(res => res.data)
        .then(content => {
          Cache.set(cacheKey, content)
          return content
        })
    }
  }
}
