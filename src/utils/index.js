//
// src/utils/index.js

export function onlyTitle(name) {
    return name
        .replace(/\.md$/, '')
        .replace(/^\d{4}-\d{1,2}-\d{1,2}-/, '')
}

export function onlyDate(name) {
    return /^\d{4}-\d{1,2}-\d{1,2}-/.exec(title)[0]
}
