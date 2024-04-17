Promise 是JS中一种处理异步操作的机制，在现在的前端代码中使用频率很高。Promise 这个词可能有点眼生，但肯定见过 `axios.get(...).then(res => {...})`；用于异步请求的 axios 返回的就是一个 Promise 对象。

## Promise 对象

一个 Promise 对象表示一个异步操作的执行结果，包括状态（成功/失败）和值（成功返回值/错误原因）。一个 Promise 在创建的时候异步操作可能还没执行完成，通过持有这个 Promise 对象，可以在未来异步操作完成的时候对结果进行相应操作。

### Promise 对象的状态

这里有几个常用的名词，用来表示 Promise 对象当前的具体状态：

*Pending 待定：*刚创建时的初始状态，还没有确定执行结果

*Fulfilled 已兑现：*异步操作执行成功，并返回一个值

*Rejected 已拒绝：*异步操作执行失败，并返回一个错误原因

*Settled 已敲定 / Resolved 已决议*：“待定”状态的反面，都表示异步操作已经执行完成，即已兑现**或**已拒绝

![image-20230830182032715](C:\Users\TW0069768\AppData\Roaming\Typora\typora-user-images\image-20230830182032715.png)

### 回调函数

如果完全不关心异步操作的执行结果，那就把它放在那自己执行就可以了；但通常情况下我们总是要对操作执行的结果进行后续处理的，例如更改页面上的数据显示、错误处理等。但由于异步操作不知道什么时候可以执行完成，就出现了**“回调函数”**的概念，意思就是等到异步操作处理结束了，再回过头来调用这个函数来对执行结果进行处理。

传统做法是，在执行异步操作的时候就把回调函数作为参数传进去，比如最常见的：

```js
setTimeout(function(){
    console.log("成功!");
}, 250);
```

`setTimeout()` 函数是最常见的异步函数之一，众所周知它的作用就是在指定时间后执行指定代码。仔细看就会发现，`setTimeout()` 函数接收两个参数，第二个参数是等待时间，而第一个参数就是**回调函数**，即等待指定的时间之后要回来调用这个函数。

很显然这种传参的做法有很多不方便的地方，比如把对结果的后续处理和异步操作本身耦合在了一起，以及著名的*回调地狱：*

回调地狱简单来说就是异步回调函数的层层嵌套。

回调地狱的坏处：代码可复性差、可阅读性差、可维护（可迭代性差）、扩展性差等

```js
doSomething(function(result) {
  doSomethingElse(result, function(newResult) {
    doThirdThing(newResult, function(finalResult) {
      console.log('Got the final result: ' + finalResult);
    }, failureCallback);
  }, failureCallback);
}, failureCallback);
```



### Promise.then() 绑定回调函数

有了 Promise 之后，就能把回调和异步操作本身分开了。无论一个 Promise 对象当前是否已经执行完毕，我们都能在它上面绑定回调函数，并且保证回调函数被执行；这就是喜闻乐见的 `then()` 方法。

```js
p.then(onFulfilled[, onRejected]);
p.then(value => {
  // fulfillment
}, reason => {
  // rejection
});
```

then() 方法的语法很简单，有两个可选参数，分别代表当 Promise 的状态变为成功（fulfilled）和失败（rejected）时所使用的回调函数。

如果只想绑定 `onRejected`（即失败时的错误处理函数），下面两种写法完全等价，第二种是第一种的简写形式。

```js
p.then(null, failureCallback);
p.catch(failureCallback);
```

## 使用 Promise：链式调用

如果只是用 then 来绑定回调函数，那并不能解决回调地狱的问题。然而很妙的地方来了：Promise 支持**链式调用**：

```js
doSomething().then(function(result) {
  return doSomethingElse(result);
})
.then(function(newResult) {
  return doThirdThing(newResult);
})
.then(function(finalResult) {
  console.log('Got the final result: ' + finalResult);
})
.catch(failureCallback);
```

### 链式调用的实现

能做到链式调用的魔法来自 `then()` 方法：它会在执行相应的回调函数之后，**返回一个新的 Promise 对象，并且插入 Promise 链的当前位置**。

这里稍微有点绕，容易把回调函数等同于 then() 方法本身。实际上成功/失败的回调函数只是 then() 的参数而已；而实际执行 then() 的时候，它会先根据 promise 的状态调用相应的回调函数，再根据回调函数的执行结果生成一个新的 Promise 对象并返回；具体的对应规则如下：

| 回调函数执行情况                    | then() 返回的 Promise 对象           |
| ----------------------------------- | ------------------------------------ |
| 返回值 `return x;`                  | fulfilled 状态，参数为 x             |
| 直接返回 `return;` / 无 return 语句 | fulfilled 状态，参数为 undefined     |
| 抛出错误 `throw err;`               | rejected 状态，参数为 err            |
| 返回已决议的 Promise                | 状态和参数与返回的 Promise 一致      |
| 返回未定的 Promise                  | 未定的 Promise，回调参数与返回的相同 |

下面这个例子中，初始 Promise 的状态为已拒绝，然后第一个 then() 调用了绑定的 onRejected，返回了状态为 fulfilled 的新 Promise 对象，并传递给了链中的下一个 then()：

```js
Promise.reject()
  .then(() => 99, () => 42) // 调用 onRejected（return 42;），表格中的第一种情况
  .then(solution => console.log('Resolved with ' + solution)); // Resolved with 42
```

同时，你可能还记得 then() 的参数定义，两个回调函数都是可选的；如果没有传入对应的回调函数，then() 会直接把原 promise 的终态返回，不做额外处理。

### 错误处理

遇到异常抛出（被拒绝的 promise）时，浏览器会顺着 Promise 链寻找下一个 `onRejected` 回调函数（经常被简写为 `.catch()`），并跳过中间的 `onFulfilled` 回调函数。这种执行逻辑与同步代码中的 try-catch 执行过程非常相似：

```js
// 异步 Promise
doSomething()
.then(result => doSomethingElse(result))
.then(newResult => doThirdThing(newResult))
.then(finalResult => console.log(`Got the final result: ${finalResult}`))
.catch(failureCallback);

// 同步
try {
  let result = syncDoSomething();
  let newResult = syncDoSomethingElse(result);
  let finalResult = syncDoThirdThing(newResult);
  console.log(`Got the final result: ${finalResult}`);
} catch(error) {
  failureCallback(error);
}
```

一个具体的例子：

```js
Promise.resolve()
.then(() => {
    throw new Error('出错');
    console.log('a');
})
.then(() => {
    console.log('b');
})
.catch(() => {
    console.log('c');
})
.then(() => {
    console.log('d');
});

// 输出结果：
// "c"
// "d"
```

### 常见错误

```js
doSomething().then(function(result) {
  doSomethingElse(result) // 没有返回 Promise 以及没有必要的嵌套 Promise
  .then(newResult => doThirdThing(newResult));
}).then(() => doFourthThing());
// 最后，是没有使用 catch 终止 Promise 调用链，可能导致没有捕获的异常
```

上面这个例子在 Promise 中进行了嵌套，但没有将嵌套的 Promise 对象返回，因此`doFourthThing()` 不会等待 `doSomethingElse()` 或 `doThirdThing()` 完成，而是并行运行；并且如果有传入参数，接收到的会是 `undefined` 而不是 doThirdThing() 的执行结果。

正确的写法应该是：

注：箭头函数 `() => x` 是 `() => { return x; }` 的简写，即返回了新的 Promise 对象

```js
doSomething()
.then(function(result) {
  return doSomethingElse(result);
})
.then(newResult => doThirdThing(newResult))
.then(() => doFourthThing())
.catch(error => console.log(error));
```

## 创建 Promise 对象

如果要执行的异步操作没有返回 Promise 对象，可以用 new 和构造器创建自己的 promise。构造器的两个参数的作用是在异步操作成功/失败时，转换 Promise 对象的状态并传递对应参数。

```js
const myFirstPromise = new Promise((resolve, reject) => {
  // 做一些异步操作，最终会调用下面两者之一:
  // resolve(someValue); // fulfilled
  // reject("failure reason"); // rejected
});

// 一个例子
function myAsyncFunction(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
};
```

## Promise 其他静态方法

`Promise.resolve(value)` 和 `Promise.reject(reason)` 方法分别返回一个已经成功/失败的 Promise 对象。

```js
const p1 = new Promise((resolve, reject) => {
  resolve();
});
const p2 = Promise.resolve();
```

如果 `resolve(value)` 的参数是带有 then() 方法的 Promise 对象，函数将返回其自带 then() 方法的执行结果；如果参数为空或是基本类型，返回的Promise对象与在 then() 方法中 return 对应值的结果一致，参见上文表格。基于这样的特性， `resolve(value)` 方法可以用于将不确定是否为 Promise 对象的 value 值统一为 Promise。

### 多个 Promise 对象

```
Promise.all(iterable)
```

- 参数列表中的所有的 promises 都成功时，返回一个 fulfilled 的 Promise 对象，参数值是所有 promises 成功返回值的列表（顺序不变）
- 如果任何一个 promise 失败，立即返回一个 rejected 的 Promise 对象，参数是这个失败 promise 的错误信息

```js
Promise.all([func1(), func2(), func3()])
.then(([result1, result2, result3]) => { /* use result1, result2 and result3 */ });
```

`Promise.allSettled(iterable)`
列表中所有 promises 都已敲定后返回一个promise，并带有一个对象数组，对应每个promise 的结果。

`Promise.any(iterable)`
当列表中的任意一个 promise 成功时，立即返回这个 promise 的值。

`Promise.race(iterable)`
当列表中任意一个 promise 成功或失败时，立即返回该 promise 对象的执行结果。

一个综合例子（使用 setTimeout 模拟异步操作）：

```js
// 创造一个状态为 fulfilled，参数为"foo"的 Promise 对象
Promise.resolve("foo")
  .then(function(string) {	// string: "foo"
    // 返回状态为 fulfilled，参数为"foobar"的对象
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        string += 'bar';
        resolve(string);
      }, 1);
    });
  })
  .then(function(string) {	// string: "foobar"
    setTimeout(function() {
      string += 'baz';
      console.log(string);
    }, 1)
    // 返回值"foobar"
    return string;
  })
  .then(function(string) {	// string: "foobar"
    console.log("Last Then");
    console.log(string);
  });

// 输出结果：
// Last Then
// foobar
// foobarbaz（由第二个 then 中的 setTimeout 输出）
```

  1.第一个 .then方法：接收到初始值“foo”，返回一个新的Promise对象。在内部的setTimeout中，等待1s后，将字符串"foobar"传递给下一个 .then方法。

  2.第二个.then方法：接收到的值为"foobar"，然后添加"baz"到字符串末尾，并使用console输出字符串"foobarbaz"。然后返回字符串"foobar"的值。

  3.第三个.then方法：接收到的值为“foobar”，然后使用console输出字符串"Last Then"和字符串“foobar”

按照Promise链式调用的规则，每个`.then`方法的返回值会作为下一个`.then`方法的参数，并且每个`.then`方法中的代码都是在**微任务**中执行的，所以会按照顺序输出结果。

解释：1）resolve(string)

  `resolve(string)`是在这个新的`Promise`对象内部调用的方法。

`resolve`是`Promise`对象的一个方法，用于将`Promise`对象的状态从等待（pending）改变为已完成（fulfilled），并将一个值传递给下一个链式调用中的`then`方法的回调函数。在这里，`resolve(string)`的意思是将`Promise`对象的状态设置为已完成，并将`string`的值传递给下一个`.then`方法中的回调函数。

当新的`Promise`对象的状态被设置为已完成后，下一个`.then`方法中的回调函数将会执行，输入参数为`string`的值，即`"foobar"`。这样可以将结果传递给下一个`.then`方法继续处理。如果在`.then`方法内部调用 `resolve()` 而没有传递任何值，则下一个`.then`方法中的回调函数将接收到 `undefined`。

所以，`resolve(string)`的作用是在第一个`.then`方法中完成当前`Promise`对象，并将`string`作为结果传递给下一个`.then`方法中的回调函数。

 2）任务

在 JavaScript 中，任务可以划分为主线程任务和微任务。它们的执行顺序和调度方式有所不同。

主线程任务（macrotask）是指需要在事件循环中按照顺序执行的任务。包括：

1. 渲染任务：更新页面布局和呈现。
2. 用户交互任务：响应用户的交互事件，如点击、滚动等。
3. 定时器任务：按照设定的时间间隔执行的任务，如使用 `setTimeout` 或 `setInterval` 设置的任务。
4. 网络请求任务：发送网络请求并处理响应。
5. I/O 任务：执行输入输出操作，如从文件读取数据或向文件写入数据。

微任务（microtask）是一个异步执行的任务队列，其执行时机在主线程任务的末尾，下一个主线程任务之前。它可以看作是一个优先级较高的任务队列。常见的微任务包括：

1. Promise 回调：Promise 的回调函数被添加到微任务队列中。
2. `MutationObserver` 回调：当观察到 DOM 变化时触发的回调函数。
3. `process.nextTick`：用于在 Node.js 环境中触发微任务。

 3）任务执行顺序

在 JavaScript 中，事件循环的执行顺序是先执行主线程任务，然后依次执行微任务队列中的所有微任务。

具体的执行顺序如下：

1. 执行当前主线程任务。
2. 检查微任务队列是否为空，如果不为空，则按照添加顺序依次执行所有微任务。
3. 检查是否需要执行新的回调任务，例如渲染任务、用户交互任务、定时器任务等。
4. 如果有渲染任务，更新页面布局和渲染。
5. 执行下一轮事件循环。

这意味着微任务的执行优先级高于下一轮事件循环中的主线程任务。当主线程中的任务执行完毕后，会立即执行微任务队列中的所有微任务，然后再执行下一轮的主线程任务。微任务队列中的任务执行完毕后，事件循环才会继续执行主线程中的下一个任务。

需要特别注意的是，微任务的执行时机是在当前主线程任务的末尾，下一个主线程任务之前。这也意味着，如果在一个主线程任务中添加了新的微任务，那么这些微任务将会在当前任务执行完毕后立即执行，不会等待下一个事件循环。

总结起来，主线程任务会在微任务之前执行，而微任务会在下一轮事件循环的主线程任务之前执行。这种机制确保了微任务的及时执行，而不会阻塞主线程任务的进行，从而提供了更好的异步编程体验。











