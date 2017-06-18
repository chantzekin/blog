---
title: JavaScript30 学习笔记 07 - Array Cardio Day 2
date: 2016-12-31
---

# 06 - Type Ahead


> [javascript30](https://javascript30.com/) 是 [Wes Bos](https://github.com/wesbos) 发起的一个30天JS编码挑战，30个教学30天完成30个前端小项目，无需引入额外框架，无需编译，无第三方库，无开发模板，回归纯粹的Javascript开发。
>
> 作者该项目的 → [GitHub](https://github.com/wesbos/JavaScript30)


## 实现效果
1. 一个输入框，跟随其后的模拟折纸样式的输入提示列表。

2. 实现预输入联想，通过在输入控件上的操作弹出匹配到的联想结果，并高亮显示匹配词。

![](http://p1.bpimg.com/567571/04e4c5d7ea17e2f4.jpg)

## 知识点

### CSS

#### [box-sizing](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-sizing)
> box-sizing 属性用来改变默认的 CSS 盒模型 对元素宽高的计算方式。

```css
html {
    box-sizing: border-box;
    ...
}
```
`border-box` 容器宽高包括了 border 与 pading， 尺寸计算公式：width = border + padding + 内容的宽度，height = border + padding + 内容的高度。

#### [box-shadow](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-shadow)
> `box-shadow` 以逗号分割列表来描述一个或多个阴影效果。

 ```css
input.search {
    ...
    box-shadow: 0 0 5px rgba(0, 0, 0, .12), inset 0 0 2px rgba(0, 0, 0, .19)
}
```
```css
none | [inset? && [ <offset-x> <offset-y> <blur-radius>? <spread-radius>? <color>? ] ]#
```
`inset` 为内阴影。

#### [justify-content](https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-content)
> `justify-content` 属性定义了浏览器如何分配顺着父容器主轴的弹性元素之间及其周围的空间。

```css
.suggestions li {
    ...
    justify-content: space-between;
    ...
}
```
`space-between` 致使均匀排列每个元素，首个元素放置于起点，末尾元素放置于终点。项目中的效果为地名和人口数量分别置于左右贴边。

#### [transform](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform)
> `transform` 属性允许你修改CSS可视化模型的坐标空间。通过transform，可以让元素进行移动（translate）、旋转（rotate）、缩放（scale）、倾斜（skew）。

```css
.suggestions li:nth-child(even) {
    transform: perspective(100px) rotateX(3deg) translateY(2px) scale(1.001);
    ...
}
```
`perspective` 属性定义 3D 元素距视图的距离，实战中组合旋转位移缩放实现三维的效果，基偶的相反效果组合成折纸效果。

### JS

#### Fetch API

[[译] JavaScript Fetch API - 推酷](http://www.tuicool.com/articles/QZBJ7zJ)

[在 JS 中使用 fetch 更加高效地进行网络请求](http://www.tuicool.com/articles/f63yUja)

[深入浅出Fetch API 带你入解应用场景及适用问题](http://www.csdn.net/article/1970-01-01/2826065)

在 AJAX 时代，进行请求 API 等网络请求都是通过 XMLHttpRequest 或者封装后的框架进行网络请求。现在产生的 fetch 框架简直就是为了提供更加强大、高效的网络请求而生。

在Fetch API中，最常用的就是fetch()函数。它接收一个URL参数，返回一个promise来处理response。response参数带着一个Response对象。

* Get

```js
fetch("/data.json")
    .then(function(res) {
        // res instanceof Response == true.
        if (res.ok) {
            res.json().then(function(data) {
            console.log(data.entries);
            });
        } else {
            console.log("Looks like the response wasn't perfect, got status", res.status);
        }
    }, function(e) {
        console.log("Fetch failed!", e);
    });
```

* Post

```js
fetch("http://www.example.org/submit.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "firstName=Nikhil&favColor=blue&password=easytoguess"
    })
    .then(function(res) {
        if (res.ok) {
            alert("Perfect! Your settings are saved.");
        } else if (res.status == 401) {
            alert("Oops! You are not authorized.");
        }
    }, function(e) {
        alert("Error submitting form!");
    });
```

本章节实战中：

```js
fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data));
```

先构造请求的URL（原教程请求网络地址，这里直接请求本地文件），然后将URL传递给全局的`fetch()`方法，它会返回一个Promise对象，当该对象被通过，会返回一个Response对象，通过该对象的json()方法可以将结果作为JSON对象返回。

`response.json()`同样返回一个Promise对象，因此我们可以继续链接一个`then()`方法。

使用 Fetch API 获得更简洁的编码体验。

对于传统的XMLHttpRequest而言，你必须使用它的一个实例来执行请求和检索返回的响应。 但是通过Fetch API，我们还能够明确的配置请求对象。

你可以通过Request构造器函数创建一个新的请求对象，这也是建议标准的一部分。 第一个参数是请求的URL，第二个参数是一个选项对象，用于配置请求。请求对象一旦创建了， 你便可以将所创建的对象传递给fetch()方法，用于替代默认的URL字符串。示例代码如下：

```js
var req = new Request(URL, {method: 'GET', cache: 'reload'});
fetch(req).then(function (response) {
    return response.json();
}).then(function (json) {
    insertPhotos(json);
});
```

上面的代码中我们指明了请求使用的方法为GET，并且指定不缓存响应的结果。

基础知识至此，详细可以看上面的链接。

#### 扩展语句

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_operator)

>  扩展语法允许在需要多个参数（用于函数调用）或多个元素（用于数组文本）或多个变量（用于解构分配）的位置扩展表达式。

##### 语法

* 用于函数调用

```js
myFunction(...iterableObj);
```

* 用于数组字面量

```js
[...iterableObj, 4, 5, 6]
```

1. 更好的 apply 方法

    在需要使用数组作为函数的参数的情况下,通常使用 Function.prototype.apply 方法:

    ```js
    function myFunction(x, y, z) { }
    var args = [0, 1, 2];
    myFunction.apply(null, args);
    ```

    如果使用了ES6的展开运算符,你可以这么写:

    ```js
    function myFunction(x, y, z) { }
    var args = [0, 1, 2];
    myFunction(...args);
    ```

    还可以同时展开多个数组:

    ```js
    function myFunction(v, w, x, y, z) { }
    var args = [0, 1];
    myFunction(-1, ...args, 2, ...[3]);
    ```

2. 更强大的数组字面量

    例子:  如果已经有一个数组，此时还需要再新建一个数组，要求新数组包含已有数组的数组项的话，就要用到push，splice，concat 等数组方法。有了扩展运算符会让代码更简洁:

    ```js
    var parts = ['shoulder', 'knees'];
    var lyrics = ['head', ...parts, 'and', 'toes']; // ["head", "shoulders", "knees", "and", "toes"]
    ```

    和函数调用一样,数组字面量中也可以使用...多次.

3. 配合new运算符

    例子: 在ES5中,我们无法同时使用 new 运算符和 apply 方法(apply方法调用[[Call]]而不是[[Construct]])。在ES6中，我们可以使用扩展运算符，和普通的函数调用一样。

    ```js
    var dataFields = readDateFields(database);
    var d = new Date(...dateFields);
    ```

4. 更好的 push 方法

    例子: 在ES5中，我们通常使用 push 方法将一个数组添加到另一个数组的末尾:

    ```js
    var arr1 = [0, 1, 2];
    var arr2 = [3, 4, 5];
    // 将arr2中的所有元素添加到arr1中
    Array.prototype.push.apply(arr1, arr2);
    ```

    在ES6中，使用扩展运算符：

    ```js
    var arr1 = [0, 1, 2];
    var arr2 = [3, 4, 5];
    arr1.push(...arr2);
    ```

5. 仅可遍历对象(iterables)可用

    ```js
    var obj = {"key1":"value1"};
    function myFunction(x) {
        console.log(x); // undefined
    }
    myFunction(...obj);
    var args = [...obj];
    console.log(args, args.length) //[] 0
    ```

6. 将类数组对象转换成数组

    扩展运算符可以将一个类数组对象中索引范围在[0,length)之间的所有属性的值添加到一个数组中,这样就可以得到一个真正的数组:

    ```js
    var nodeList = document.querySelectorAll('div');
    var array = [...nodeList];
    ```

    实战中 `cities.push(...data)` 将请求到的 json 数据 `push` 到定义的数据数组里。

#### 正则表达式

[js正则表达式基本语法(精粹)](http://www.jb51.net/article/72044.htm)

```js
const regex = new RegExp(wordToMatch, 'gi');
```

`'gi'` 声明一个全局匹配，并且忽略大小写。

```js
const regex = new RegExp(this.value, 'gi');
const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
```

这里是实现输入的关键字显示高亮。

## 实现过程

监听 `input` 的 `change` 和 `keyup` 事件，保证用户输入时，或者复制粘贴等其他操作导致的关键词变化作出反应。

然后获取关键词与请求到的数据做匹配，州或市匹配的情况下，配合处理过的人口数目和关键字高亮，显示在搜索结果层。

以上。
