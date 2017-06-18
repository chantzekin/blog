---
title: JavaScript30 学习笔记 07 - Array Cardio Day 2
date: 2017-01-03
---

> [javascript30](https://javascript30.com/) 是 [Wes Bos](https://github.com/wesbos) 发起的一个30天JS编码挑战，30个教学30天完成30个前端小项目，无需引入额外框架，无需编译，无第三方库，无开发模板，回归纯粹的Javascript开发。
>
> 作者该项目的 → [GitHub](https://github.com/wesbos/JavaScript30)


## 实现效果

处理数组，根据提示用数组方法完成要求。

## 知识点

### Array [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)

## 实践过程

1. ### some & every

    检查数组内任务对象至少有一人19岁，是否每个人都19岁。

    [`Array.prototype.some()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some)

    > 如果数组中至少有一个元素满足测试函数，则返回 true，否则返回 false。

    语法
    > `arr.some(callback[, thisArg])`

    * `callback` - 用来测试每个元素的函数。
    * `thisArg` - 执行 callback 时使用的 this 值。


    ```js
    function isBigEnough(element, index, array) {
        return (element >= 10);
    }
    var passed = [2, 5, 8, 1, 4].some(isBigEnough);
    // passed is false
    passed = [12, 5, 8, 1, 4].some(isBigEnough);
    // passed is true
    ```

    因此，实践中至少有一人19岁代码如下：

    ```js
    const isAdult = people.some(
        person => ((new Date()).getFullYear()) - person.year >= 19
    );
    console.log(isAdult); // => true
    ```

    [`Array.prototype.every()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every)

    > 如果数组中的每个元素都满足测试函数，则返回 true，否则返回 false。

    语法
    > `arr.every(callback[, thisArg])`

    * `callback` - 用来测试每个元素的函数。
    * `thisArg` - 执行 callback 时使用的 this 值。


    ```js
    function isBigEnough(element, index, array) {
        return (element >= 10);
    }
    var passed = [12, 5, 8, 130, 44].every(isBigEnough);
    // passed is false
    passed = [12, 54, 18, 130, 44].every(isBigEnough);
    // passed is true
    ```

    因此，实践中是否成员都19岁以上代码如下：

    ```js
    const allAdults = people.every(
        person => ((new Date()).getFullYear - person.year >= 19)
    );
    console.log({allAdults}); // => false
    ```

2. ### find

    寻找对应id的评论。

    [`Array.prototype.find()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

    > 找到第一个满足测试函数的元素并返回那个元素的值，如果找不到，则返回 `undefined`。

    语法
    > `arr.find(callback[, thisArg])`

    * `callback`
    在数组每一项上执行的函数，接收 3 个参数：

        `element`
        当前遍历到的元素。

        `index`
        当前遍历到的索引。

        `array`
        数组本身。

    * `thisArg` - 执行 callback 时使用的 this 值。

    #### 用对象的属性查找数组里的对象

    ```js
    var inventory = [
        {name: 'apples', quantity: 2},
        {name: 'bananas', quantity: 0},
        {name: 'cherries', quantity: 5}
    ];

    function findCherries(fruit) {
        return fruit.name === 'cherries';
    }

    console.log(inventory.find(findCherries)); // { name: 'cherries', quantity: 5 }
    ```

    #### 寻找数组中的质数

    ````js
    function isPrime(element, index, array) {
        var start = 2;
        while (start <= Math.sqrt(element)) {
            if (element % start++ < 1) {
                return false;
            }
        }
        return element > 1;
    }

    console.log([4, 6, 8, 12].find(isPrime)); // undefined, not found
    console.log([4, 5, 8, 12].find(isPrime)); // 5
    ````

    因此实践中代码为

    ```js
    const comment = comments.find(comment => comment.id === 823423);
    console.log(comment); // => Object {text: "Super good", id: 823423}
    ```

3. ### findIndex

    删除对应id的评论。
    这里先找出该评论对象的index，在通过数组方法 `.splice()` 删除。

    [`Array.prototype.findIndex()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)

    > 找到第一个满足测试函数的元素并返回那个元素的索引，如果找不到，则返回 -1。

    语法
    > `arr.findIndex(callback[, thisArg])`

    * `callback`
    在数组每一项上执行的函数，接收 3 个参数：

        `element`
        当前遍历到的元素。

        `index`
        当前遍历到的索引。

        `array`
        数组本身。

    * `thisArg` - 执行 callback 时使用的 this 值。

    #### 查找数组中首个质数元素的索引

    ```js
    function isPrime(element, index, array) {
    var start = 2;
    while (start <= Math.sqrt(element)) {
            if (element % start++ < 1) return false;
        }
        return (element > 1);
    }

    console.log( [4, 6, 8, 12].findIndex(isPrime) ); // -1, 没找到质数元素
    console.log( [4, 6, 7, 12].findIndex(isPrime) ); // 2
    ```

    因此实践中代码为

    ```js
    const index = comments.findIndex(comment => comment.id === 823423);
    console.log(index); // => 1

    // comments.splice(index, 1);

    // es6

    const newComments = [
        ...comments.slice(0, index),
        ...comments.slice(index + 1)
    ]
    console.log(newComments);
    ```

    上面代码先找出符合条件的对象的index，非es6的方法是用 `arrayObject.splice(index,howmany,item1,.....,itemX)`
    删除从查找对象index开始的总计1个元素。es6 则用数组字面量结合 `arrayObject.slice(start,end)` 选择元素组合成新的数组。
