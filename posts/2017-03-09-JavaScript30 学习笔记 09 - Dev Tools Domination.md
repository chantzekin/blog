---
title: JavaScript30 学习笔记 09 - Dev Tools Domination
date: 2017-03-09
---

> [javascript30](https://javascript30.com/) 是 [Wes Bos](https://github.com/wesbos) 发起的一个30天JS编码挑战，30个教学30天完成30个前端小项目，无需引入额外框架，无需编译，无第三方库，无开发模板，回归纯粹的Javascript开发。
>
> 作者该项目的 → [GitHub](https://github.com/wesbos/JavaScript30)


## 实现效果

浏览器 `F12` Developer Tools 的 Console 的控制台调试技巧

## 知识点


### Regular 常规的 `console.log()`

`console.log()` 向 web 控制台输出一条消息。

`console.log('Hello, world.')` 向控制台输出一行 "Hello, world."
字符串

### Interpolated 在 log 的信息中插值

可以在 `console.log()` 方法中通过参数指定输出字符串的格式

`console.log('Hello I am a %s string!', '💩')`

↑ Hello I am a 💩 string!

同样，`console` 对象的其他字符串输出方法（`exp. console.warn()`）都可以使用占位符插值。

占位符有四种：

- `%s` -> 字符串
- `%d` / `%i` -> 整数
- `%f` -> 浮点型
- `%o` -> 对象

### Styled 输出样式

```js
console.log('%c I am some great text', 'font-size:50px; background:red; text-shadow: 10px 10px 0 blue')
```

↑ 结果

![](http://p1.bqimg.com/567571/dfb72eb948a43c84.jpg)

`%c` 标识符指定了以其分割的字符串的样式，每一个标识符对应第二个参数往后的样式参数。

### Warning 警告信息

`console.warn('OH NOOO')` 输出警告信息 "ON NOOO"。
有感叹号标志，切显示为黄色字体。

↑ 结果

![](http://p1.bqimg.com/567571/5272afb534186ab5.jpg)

### Error 错误信息

`console.error('Shit!')` 向 web 控制台输出一条错误消息 "Shit!" （作者真的不是卖萌吗 - -。）

### Info 说明信息

![](http://i1.piimg.com/567571/72d7dfb6a62b8729.jpg)

没什么特别的，就是一条信息。

### Testing 测试值

```js
const p = document.querySelector('p');
console.assert(p.classList.contains('ouch'), 'That is wrong!');
```

`console.assert()` 接收至少两个参数，第一个参数的值或返回值为false的时候，将会在控制台上输出后续参数的值。

### Clearing 清空输出

Console 显示 `// Console was cleared`

Orz 就是清空了

![](http://p1.bpimg.com/567571/8ee04bfe470cae26.jpg)

### Viewing DOM Elements 查看 DOM 元素

```js
console.log(p);
console.dir(p);
```

![](http://i1.piimg.com/567571/64a9f1b76990ca79.jpg)

`log()` 还接受 DOM 对象作为参数，输出该元素的 HTML 代码。
`dir()` 方法将传入对象的属性，包括子对象的属性以列表形式输出。

### Grouping together 组

```js
dogs.forEach(dog => {
    console.groupCollapsed(`${dog.name}`);
    console.log(`This is ${dog.name}`);
    console.log(`${dog.name} is ${dog.age} years old`);
    console.log(`${dog.name} is ${dog.age * 7} dog years old`);
    console.groupEnd(`${dog.name}`);
});
```

![](http://i1.piimg.com/567571/64a9f1b76990ca79.jpg)

`groupCollapsed()` 能够让控制台输出的语句产生不同的层级嵌套关系，以 `groupEnd()` 退回一层。

### Counting 计数

```js
console.count('Wes');
console.count('Wes');
console.count('Steve');
console.count('Steve');
console.count('Wes');
console.count('Steve');
console.count('Wes');
console.count('Steve');
console.count('Steve');
console.count('Steve');
console.count('Steve');
console.count('Steve');
```

![](http://i1.piimg.com/567571/8a2c44e59d6ac404.jpg)

`count()` 输出执行到该行的次数，可选参数 label 可以输出在次数之前

### timing 计时器

```js
console.time('fetching data');
fetch('https://api.github.com/users/wesbos')
    .then(data => data.json())
    .then(data => {
        console.timeEnd('fetching data');
        console.log(data);
    });
console.table(dogs);
```

![](http://p1.bpimg.com/567571/c7c438abae05f913.jpg)

可以将成对的console.time()和console.timeEnd()之间代码的运行时间输出到控制台上，参数可作为标签名。



## 实践过程
