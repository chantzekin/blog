//
// src/utils/render.js

import marked from 'marked'
import prism from 'prismjs'

const renderer = new marked.Renderer()

renderer.heading = (text, level) => {
    const slug = text
        .replace(/<(?:.|\n)*?>/gm, '')
        .toLowerCase()
        .replace(/[\s\n\t]+/g, '-')
    return `<h${level} id="${slug}">${text}</h${level}>`
}

renderer.code = (code, lang) => {
    const highlight = Prism.highlight(
        code,
        Prism.languages[lang] || Prism.languages.javascript
    )
    return `<pre><code class="lang-${escape(lang, true)}">${highlight}</code></pre>`
}

marked.setOptions({
    renderer,
    breaks: true,
    gfm: true
})

export default marked