## 1.基本概念

Fetch、Axios、Ajax 和XHR都是前端用于发送HTTP请求的工具或技术：

- **Fetch**：一种现代化的网络请求方法，通过使用 Promise 处理异步操作，简洁而直观地发送HTTP请求、处理响应，并支持各种功能和API，如设置请求头、传递参数、处理流数据、上传下载文件等。
- **Axios**：一个基于Promise的现代化HTTP客户端，是目前最流行的 HTTP 客户端，可以在浏览器和Node.js环境中发送HTTP请求，并具有拦截请求和响应、支持并发请求、提供丰富的API等功能。
- **Ajax**：通过在浏览器和服务器之间进行异步通信，实现部分页面更新和动态交互，提升用户体验；可以在不重新加载整个页面的情况下，通过JavaScript发送HTTP请求到服务器，并处理服务器返回的数据；减少带宽消耗，提高页面加载速度；提高用户交互性，实现更多的动态效果和实时更新。
- **XHR**：一种在浏览器中用于与服务器进行异步通信的API，通过发送HTTP请求并处理服务器返回的数据，实现异步获取各种格式的数据（如XML、JSON、HTML等），以实现页面的无刷新更新和动态交互。

## 2.XHR

XMLHttpRequest 是一个内置的 JavaScript 对象，XMLHttpRequest（XHR）对象用于与服务器交互。通过 XMLHttpRequest 可以在不刷新页面的情况下请求特定 URL，获取数据。这允许网页在不影响用户操作的情况下，更新页面的局部内容。

XMLHttpRequest 在 AJAX 编程中被大量使用。尽管名称包含XML，XMLHttpRequest 也可以用于获取任何类型的数据，而不仅仅是 XML。它甚至支持 HTTP 以外的协议（包括 `file://` 和 `FTP`）。

XMLHttpRequest 存在一些缺点：

- **语法复杂性**：使用原始的 XMLHttpRequest 进行复杂的 AJAX 请求需要编写更多的代码，并手动处理状态管理、错误处理等方面的逻辑。相比之下，Axios 和 Fetch API 提供了更简单和直观的语法，使得发送和处理 HTTP 请求更加方便。
- **功能限制**：XHR 提供的功能相对较少，需要手动设置请求头、处理超时、取消请求等。而 Axios 和 Fetch API 提供了更丰富的功能，如拦截请求和响应、自动转换数据格式、请求取消等。
- **XSRF（跨站请求伪造）保护**：在 Axios 中，可以通过设置 `withCredentials` 选项来自动处理 XSRF 保护。然而，在 XMLHttpRequest 和 Fetch API 中，需要手动设置请求头来实现类似的保护。
- **错误处理**：XHR 的错误处理较为繁琐，需要在回调函数中进行错误判断。而 Axios 和 Fetch API 使用 Promise 和 async/await 语法，能够更便捷地处理请求和响应的错误。
- **仅限于浏览器环境**：XMLHttpRequest 是浏览器提供的 API，因此只能在浏览器环境中使用，无法在其他环境中（如服务器端）直接使用。

​                                                                              **请求步骤**

使用 XMLHttpRequest 发送请求的步骤如下：

```js
//创建XMLHttpRequest对象
var xhr = new XMLHttpRequest();
设置请求头（可选）
xhr.setRequestHeader('Content-Type', 'application/json');
//设置请求参数：
xhr.open('GET', 'https://api.example.com/data', true);
//监听状态变化：
xhr.onreadystatechange = () => {
  if (xhr.readyState === 4 && xhr.status === 200) {
      // 请求成功，处理响应
      console.log(xhr.responseText);
  } else {
      // 请求失败
      console.error('请求失败');
  }
};
// 发送请求
xhr.send();
```

这里创建了一个`XMLHttpRequest`对象，并使用`open()`方法设置了一个GET请求类型和URL。然后，通过监听`onreadystatechange`事件来判断请求的状态并处理响应。当`readyState`为4时，表示请求已完成，此时可以通过`status`属性判断请求是否成功（200表示成功）。如果成功，可以通过`responseText`属性获取服务器返回的数据进行处理。如果失败，将到控制台输出错误信息。

​                                                                              **open**

XMLHttpRequest 的 `open()` 方法用于初始化一个请求。`open()` 方法接受三个必填参数和一个可选参数，它们是：

1. **method**: 表示请求的 HTTP 方法，例如 GET、POST、PUT 等。

   ```js
   xhr.open("GET", "https://example.com/api/data", true);
   ```

2. **url**: 表示请求的 URL 地址。

   ```js
   xhr.open("GET", "https://example.com/api/data", true);
   ```

3. **async**: 表示请求是否异步执行，即是否使用异步模式。默认为 `true`，表示异步执行；f`alse` 表示同步执行。

   ```js
   xhr.open("GET", "https://example.com/api/data", true);
   ```

4. **username** (可选): 表示用于进行 HTTP 认证的用户名。

   ```js
   xhr.open("GET", "https://example.com/api/data", true, "username");
   ```

5. **password** (可选): 表示用于进行 HTTP 认证的密码。

   ```js
   xhr.open("GET", "https://example.com/api/data", true, "username", "password");
   ```

综合起来，`open()` 方法的完整语法如下：

```js
xhr.open(method, url, async, username, password);
```

​                                                                              **请求头和响应头**

可以使用 `setRequestHeader()` 方法设置 XMLHttpRequest 的请求头。这个方法接受两个参数：头字段的名称和值。

```js
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("Authorization", "Bearer token123");
```

这里使用 `setRequestHeader()` 方法设置了两个请求头：`Content-Type` 和 `Authorization`。第一个参数是头字段的名称，第二个参数是头字段的值。

可以使用 `getResponseHeader()` 方法或者 `getAllResponseHeaders()` 方法来获取 XMLHttpRequest 的响应头。

- `getResponseHeader()`：通过指定头字段的名称，可以获取指定的响应头字段的值。

  ```js
  const contentType = xhr.getResponseHeader("Content-Type");
  ```

  这里使用 `getResponseHeader()` 方法获取了名为 `Content-Type`的响应头字段的值。

- `getAllResponseHeaders()`** **：该方法返回一个包含所有响应头信息的字符串。

  ```js
  const headers = xhr.getAllResponseHeaders();
  ```

  这里使用 `getAllResponseHeaders()` 方法获取了所有响应头信息，并将其存储在名为 `headers` 的变量中。

  这里返回的 `headers` 是一个包含所有响应头信息的字符串。该字符串中每一行表示一个响应头字段，具有以下形式：

  ```js
  HeaderName: HeaderValue
  ```

  例如，如果响应头中包含 `Content-Type` 和 `Authorization` 字段，那么返回的 `headers` 字符串可能如下所示：

  ```js
  Content-Type: application/json
  Authorization: Bearer token123
  ```

  可以使用适当的方法（如字符串解析）将这个字符串进行进一步处理，以获取特定的响应头字段的名称和值。

  注意，要在调用 `open()` 方法之后、发送请求之前使用 `setRequestHeader()` 方法来设置请求头，以确保设置能够生效。同样，要在接收到响应之后才能使用 `getResponseHeader()` 或 `getAllResponseHeaders()` 来获取响应头信息。

​                                                                              **readyState**

上面示例中的 `readyState` 是 XMLHttpRequest 对象的一个属性，用于表示请求的状态。该属性有以下五种可能的取值：

1. **0 (未初始化)**: XMLHttpRequest 对象已创建，但尚未调用 `open` 方法。
2. **1 (载入中)**: `open` 方法已调用，但尚未调用 `send` 方法。
3. **2 (载入完成)**: s`end` 方法已调用，并且响应头和响应状态已经可用。
4. **3 (交互中)**: 正在接收响应数据，此时部分响应内容可能已经可以访问了。
5. **4 (完成)**: 响应数据接收完成，整个请求过程已经完全结束。

通常情况下，我们主要关注 readyState 为 4 的状态，即请求完成状态。在这个状态下，我们可以通过检查 `status` 属性来获取请求的结果（比如响应状态码），并通过 `responseText` 或 `responseXML` 属性来获取服务器返回的数据。

注意，readyState 属性是只读的，我们不能直接修改它的值。它会在请求过程中自动更新，我们可以通过监听 readystatechange 事件来进行相应的处理。

​                                                                              **status**

status 是 XMLHttpRequest 对象的一个属性，用于表示 HTTP 状态码。HTTP 状态码是服务器对请求处理的结果进行响应的标准化数字代码。常见的一些 HTTP 状态码包括：

- **200 OK**：表示请求成功并返回所请求的数据。
- **201 Created**：表示请求成功并在服务器上创建了新资源。
- **204 No Content**：表示请求成功，但响应中无返回的内容。
- **400 Bad Request**：表示请求有语法错误或参数错误，服务器无法理解。
- **401 Unauthorized**：表示请求未经授权，需要用户进行身份验证。
- **403 Forbidden**：表示服务器拒绝请求，通常是因为请求的资源没有访问权限。
- **404 Not Found**：表示请求的资源不存在。
- **500 Internal Server Error**：表示服务器内部发生错误，无法完成请求。

在使用 XMLHttpRequest 发送请求后，可以通过检查 `status` 属性来获取服务器对请求的响应状态码，并根据不同的状态码进行相应的处理。

​                                                                              **事件属性**

XMLHttpRequest (XHR) 对象具有以下常用的事件属性：

1. **onreadystatechange**: 当 `readyState` 属性发生变化时触发该事件。可以使用 `xhr.onreadystatechange` 属性来指定处理状态变化的回调函数。在每次状态变化时都会触发该事件，可以通过检查 `xhr.readyState` 属性来确定当前的状态。

   ```js
   xhr.onreadystatechange = () => {
     if(xhr.readyState === 4) {
       // 请求已完成
       if(xhr.status === 200) {
         // 请求成功
       } else {
         // 请求失败
       }
     } else {
       // 请求进行中
     }
   };
   ```

2. `onload:` 当请求成功完成并且响应数据完全加载时触发该事件。可以使用 `xhr.onload` 属性来指定处理成功加载的回调函数。通常在这个事件中获取和处理响应数据。

   ```js
   xhr.onload = () => {
     // 获取和处理响应数据
     const responseData = JSON.parse(xhr.responseText);
     // 其他操作...
   };
   ```

3. `onerror`: 当请求发生错误时触发该事件。可以使用 `xhr.onerror` 属性来指定处理错误的回调函数。常见的错误包括网络错误、无法完成请求等。

   ```js
   xhr.onerror = () => {
     // 处理错误逻辑
   };
   ```

4. `onprogress`: 在数据传输过程中持续触发，用于追踪请求的进度。可以使用 `xhr.onprogress` 属性来指定处理进度的回调函数。

   ```js
   xhr.onprogress = (event) => {
     // 处理进度逻辑
   };
   ```

5. `ontimeout`： 当请求超时时触发该事件。可以使用 `xhr.ontimeout` 属性来指定处理超时的回调函数。

   ```js
   
   xhr.ontimeout = () => {
     // 处理超时逻辑
   };
   ```

​                                                                              **responseType**

responseType 是 XMLHttpRequest 对象的属性，用于指定响应的数据类型。它决定了如何解析从服务器返回的响应数据。 常见的 responseType 值包括：

1. **"" (默认值)**: 表示响应的数据类型是字符串。

   ```js
   xhr.responseType = "";
   ```

2. **"text"**: 表示响应的数据类型是字符串。

   ```js
   xhr.responseType = "text";
   ```

3. **"json"**: 表示响应的数据类型是 JSON 对象，会自动将响应数据解析为 JavaScript 对象。

   ```js
   xhr.responseType = "json";
   ```

4. **"document"**: 表示响应的数据类型是 XML 文档对象，会自动将响应数据解析为 XML 文档对象。

   ```js
   xhr.responseType = "document";
   ```

5. **"arraybuffer"**: 表示响应的数据类型是 `ArrayBuffer` 对象，适用于二进制数据的传输和处理

   ```js
   xhr.responseType = "arraybuffer";
   ```

6. **"blob"**: 表示响应的数据类型是 Blob 对象，适用于文件下载等场景。

   ```js
   xhr.responseType = "blob";
   ```

   通过设置不同的 `responseType` 值，可以根据需要获取不同类型的响应数据。注意，在设置 `responseType` 之前，最好在调用 `open` 方法之后、发送请求之前设置，以确保设置生效。

## 3.Ajax

AJAX（Asynchronous JavaScript and XML，异步 JavaScript 和 XML）是一种使用现有的网页技术来创建异步请求和更新页面内容的方法。Ajax 本身不是一种技术，而是一种将一些现有技术结合起来使用的方法，包括：HTML 或 XHTML、CSS、JavaScript、DOM、XML、XSLT、以及最重要的 XMLHttpRequest 对象。

当使用结合了这些技术的 Ajax 模型以后，网页应用能够快速地将增量更新呈现在用户界面上，而不需要重载（刷新）整个页面。这使得程序能够更快地回应用户的操作。Ajax 最吸引人的特性是它的“异步”性质，这意味着它可以与服务器通信、交换数据并更新页面，而无需刷新页面。

Ajax 是一种使用浏览器提供的 XMLHttpRequest 对象实现的技术，用于在不刷新整个页面的情况下进行异步请求和更新页面内容。**可以说 Ajax 是基于浏览器提供的 XMLHttpRequest 对象来实现的。**

以下是基于原生 JavaScript 的 AJAX 请求代码示例：

```js
// 创建 XMLHttpRequest 对象
const xhr = new XMLHttpRequest();

// 指定请求的方法和 URL
xhr.open('GET', 'api_url', true);  // 第三个参数 true 表示异步请求

// 设置请求头（如果需要）
xhr.setRequestHeader('Content-Type', 'application/json');  // 根据实际需求设置请求头

// 注册一个回调函数来处理响应
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const response = JSON.parse(xhr.responseText);  // 处理响应数据
    // 在这里执行相应的操作
    console.log(response);
  }
};

// 发送请求
xhr.send();
```

虽然 AJAX 是一种强大的技术，但相对于 Axios 和 Fetch API，它有以下一些缺点：

- **兼容性问题**：AJAX 的兼容性相对较低，尤其在旧版本的浏览器中可能会出现问题。而 Axios 和 Fetch API 使用了更现代的 JavaScript 特性，具有更好的兼容性。
- **代码冗余**：使用原生的 AJAX 需要编写较多的代码来处理不同的状态码、错误处理以及请求的拼装等。而 Axios 和 Fetch API 提供了更简洁和易用的接口，减少了代码冗余。
- **缺乏默认配置**：AJAX 不提供默认的全局配置，如请求和响应拦截器、统一的错误处理等。而 Axios 和 Fetch API 支持全局配置，并且提供了更方便的拦截器机制。
- **功能限制**：AJAX 在处理跨域请求时需要注意添加额外的处理，比如设置 CORS 头部信息或者使用 JSONP。而 Axios 和 Fetch API 提供了更直接的方式来处理跨域请求。
- **可读性较差**：由于 AJAX 使用的是回调函数来处理异步请求，可能会导致代码逻辑比较复杂，可读性较差。而 Axios 和 Fetch API 使用的是 Promise 或 async/await，使代码结构更加清晰易读。

## 4.Fetch

Fetch 是一种用于进行网络请求的现代 JavaScript API。它提供了一种简单、灵活且功能强大的方式，用于从服务器获取资源并处理响应。

Fetch API 在浏览器中原生支持，并且以 Promise 为基础，使得异步请求更加直观和易用。使用 Fetch API，可以执行各种类型的请求（如 GET、POST、PUT、DELETE 等），发送请求时可以设置请求头、请求参数，以及处理响应数据。

与传统的 AJAX 相比，Fetch API 具有以下优点：

- **Promise 支持**：Fetch API 使用 Promise 对象来处理异步操作，使得处理异步请求的流程更加清晰、易于阅读和编写。
- **更简洁的 API**：Fetch API 提供了一个简洁的 API，使发送请求变得更加直观和简单，同时提供了丰富的配置选项（如设置请求头、请求参数等）。
- **内置的 JSON 解析**：在处理响应时，Fetch API 内置了对 JSON 数据的解析，无需手动进行解析操作。
- **更好的错误处理**：Fetch API 使用了更全面的错误处理机制，允许通过检查响应状态码来确定请求是否成功，并以不同的方式处理错误。

​                                                                              **fetch()**

Fetch API 提供了一个全局的 `fetch()` 方法，该方法提供了一种简单、逻辑的方式来通过网络异步获取资源。

`fetch() `方法的语法如下：

```js
fetch(url, options)
  .then(response => {
    // 在这里处理响应
  })
  .catch(error => {
    // 在这里处理错误
  });

```

这里有两个参数：

- `url`：请求的 URL 地址。
- `options`（可选）：一个包含请求选项的对象，可以指定请求的方法（method）、请求头（headers）、请求体（body）等。

注意，`fetch()`默认使用的是 GET 请求，如果需要使用其他方法（如 POST、PUT 等），需要通过 `options` 参数进行设置。

`fetch()` 方法返回一个 Promise 对象，可以使用 `.then()` 方法来处理成功的响应，使用 `.catch()` 方法来处理错误的情况。

- 在 `.then() `中，可以访问到 `response` 对象，进一步处理响应的内容。
- 在 `.catch()` 中，我们可以访问到 `error` 对象，用于处理请求过程中的任何错误。

`options` 对象包含的属性如下：

```js
{
  method: 'POST', // *GET, POST, PUT, DELETE等
  mode: 'cors', // no-cors, *cors, same-origin
  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin', // include, *same-origin, omit
  headers: { 
    'Content-Type': 'application/json'
  },
  redirect: 'follow', // manual, *follow, error
  referrerPolicy: 'no-referrer', // no-referrer, *client
  body: JSON.stringify(data) 
   // body 数据类型必须与 "Content-Type" 请求头匹配
}
```

- `method`：请求方法，例如 GET、POST、PUT、DELETE 等。
- `mode`：请求模式，可以是 no-cors、*cors、same-origin 等。
- `cache`：缓存模式，可以是 default、no-cache、reload、force-cache、only-if-cached 等。
- `credentials`：请求的凭证模式，可以是 include、*same-origin、omit 等。
- `headers`：请求头对象，用于设置请求头的键值对。
- `redirect`：重定向模式，可以是 manual、*follow、error 等。
- `referrerPolicy`：引用页面隐私设置，可以是 no-referrer、*client 等。
- `body`：请求体数据，必须与 "Content-Type" 请求头指定的数据类型匹配。在示例中，使用`JSON.stringify()`将数据转换为 JSON 字符串。

这些方法返回一个 Promise，当解析完成时，Promise 将被解析为相应的数据类型。

​                                                                    **请求头和响应头**

fetch 函数的请求头包含在发起 HTTP 请求时发送给服务器的信息，用于传递额外的参数和配置。可以使用 `headers` 对象来设置和操作请求头。常见的请求头字段包括：

- `Content-Type`：指定请求体的格式类型，如 `application/json`、`application/x-www-form-urlencoded` 等。
- `Authorization`：用于身份验证，通常与 Token 或用户名密码一起使用。
- `Accept`：指定客户端所能接受的响应数据类型。
- `User-Agent`：标识发起请求的用户代理（浏览器或应用程序）的信息。

在 fetch 函数中可以通过第二个参数进行配置，其中可以指定请求头：

```js
fetch(url, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token123'
  }
})
  .then(response => {
    // 处理响应
  })
  .catch(error => {
    // 处理错误
  });
```

响应头是服务器在响应 HTTP 请求时发送给客户端的头部信息。可以通过 `Response` 对象的 `headers` 属性访问响应头。常见的响应头字段包括：

- `Content-Type`：指定响应体的格式类型。
- `Set-Cookie`：设置或修改客户端的 Cookie。
- `Cache-Control`：控制缓存的行为，如 no-cache、max-age 等。
- `Content-Disposition`：指定响应的内容该如何展示（如文件的下载）。

在处理 `fetch` 返回的 `Response` 对象时，可以通过调用 `response.headers.get('Header-Name')` 方法来获取特定的响应头字段的值。

```js
fetch(url)
  .then(response => {
    const contentType = response.headers.get('Content-Type');
    // 其他处理逻辑
  })
  .catch(error => {
    // 处理错误
  });
```

​                                                                    **错误处理**

除了可以使用 catch() 来处理错误之外，与使用其他异步操作一样，我们也可以使用 `async/await `来处理异步请求，使代码更加简洁和易读：

```js
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    if (response.ok) {
      const data = await response.json();
      console.log(data); // 处理解析后的数据
    } else {
      throw new Error('请求失败');
    }
  } catch (error) {
    console.log(error); // 处理错误
  }
}

fetchData();
```

​                                                                    **浏览器兼容**

目前，主流浏览器都支持 Fetch API：

## 5.Axios

Axios 是一个基于 Promise 网络请求库，用于在浏览器和 Node.js 中进行 HTTP 请求。在服务端它使用原生 node.js `http` 模块, 而在客户端 (浏览端) 则使用 `XMLHttpRequests`。Axios 是目前最流行的 HTTP 请求库

Axios 库具有以下特点：

- **浏览器和 Node.js**：Axios 可在浏览器和 Node.js 环境中使用，可以在不同的平台上执行 HTTP 请求。
- **Promise API**：Axios 使用 Promise API 进行异步操作，能够更轻松地处理异步请求和响应。
- **请求拦截和响应拦截**：可以通过拦截器，在请求发送之前或响应返回之后对请求进行全局性或个性化的变换和处理。可以在请求或响应的不同阶段添加公共的请求头、验证身份、处理错误等。
- **取消请求**：Axios 允许取消未完成的请求，以避免无效的请求，并减轻服务器的负担。取消请求可以通过创建取消令牌、使用取消令牌进行请求配置或者在拦截器中中断请求来实现。
- **并发请求**：Axios 提供了执行多个并发请求的能力，可以同时发起多个请求，并在所有请求完成后进行处理。
- **自动转换数据**：Axios 可以自动将请求和响应的数据进行格式转换，包括 JSON、URL 编码等。无需手动处理数据转换的过程。
- **错误处理机制**：当请求过程中出现错误时，Axios 会返回详细的错误信息，包括 HTTP 错误状态码、错误描述等。可以根据需要对这些错误进行处理和显示。
- **简洁的 API**：Axios 的 API 设计简洁易用，具有直观的方法命名和参数配置。可以轻松地使用 Axios 进行 GET、POST、PUT、DELETE 等常见的 HTTP 请求。

可以通过以下命令来安装 Axios：

```js
// 使用 npm 安装
npm install axios
// 使用 yarn 安装
yarn add axios
```

下面来进行一个简单的 get 请求：

```js
axios.get('https://api.example.com/data')
  .then(response => {
    // 处理成功响应
    console.log(response.data);
  })
  .catch(error => {
    // 处理错误
    console.error(error);
  });
```

这里使用 `axios.get` 方法发起了一个 GET 请求，并将请求的 URL 作为参数传递给该方法。然后使用 Promise 的 `.then` 方法处理成功响应，并通过 `response.data` 获取响应数据。如果请求失败，可以通过 Promise 的 `.catch` 方法捕获错误。

​                                                                    **请求方法**

axios 支持通过简写方式来执行不同类型的请求：

- axios.request(config)
- axios.get(url[, config])
- axios.delete(url[, config])
- axios.head(url[, config])
- axios.options(url[, config])
- axios.post(url[, data[, config]])
- axios.put(url[, data[, config]])
- axios.patch(url[, data[, config]])

对于这些方法，第一个参数是请求的 URL，config 和 data 分别是请求的配置项和请求参数，这两个参数都是可选的。例如，下面是一个 post 请求：

```js
const options = {
  headers: {'X-Custom-Header': 'value'}
};

axios.post('/save', { a: 10 }, options)
  .then(response => {
    // 处理成功响应
    console.log(response.data);
  })
  .catch(error => {
    // 处理错误
    console.error(error);
  });
```

当作为第二个参数传递给 `axios.post` 函数时，Axios 会自动将 JavaScript 对象序列化为 JSON。 这样就无需将 POST 正文序列化为 JSON。Axios 还会自动将 `Content-Type` 请求头设置为 `application/json`。

​                                                                    **多个请求**

在 Axios 中，可以使用 `axios.all` 和 `axios.spread` 来处理多个并发的请求：

```js
const axios = require('axios');

// 创建多个请求
const request1 = axios.get('https://api.example.com/data1');
const request2 = axios.get('https://api.example.com/data2');

// 并发发送多个请求
axios.all([request1, request2])
  .then(axios.spread((response1, response2) => {
    // 处理各个请求的响应
    console.log(response1.data);
    console.log(response2.data);
  }))
  .catch(error => {
    // 处理错误
    console.error(error);
  });
```

可以看到，在 `.then` 方法中使用了 `axios.spread` 函数将多个请求的响应结果进行解构，通过多个参数分别接收各个请求的响应。可以根据实际情况命名这些参数，并通过 `response1.data`、r`esponse2.data` 等方式获取各个请求的响应数据。

​                                                                    **请求拦截、响应拦截**

在 Axios 中，可以使用 `transformRequest` 方法在请求发送之前对请求数据进行转换和处理，它是一个请求拦截器，是一个可选的函数。

tran`sformRequest` 函数接收两个参数：`requestData` 和 `requestHeaders`。其中，`requestData` 是要发送的请求数据，`requestHeaders` 是要发送的请求头信息。可以在 `transformRequest` 函数内部对这些参数进行修改，并将修改后的值返回。返回的结果将作为实际发送请求的数据。

```js
axios({
  url: 'https://api.example.com/data',
  method: 'post',
  data: {
    id: 12345,
    name: 'John Doe'
  },
  transformRequest: (data, headers) => {
    // 对请求数据进行转换和处理
    const modifiedData = { ...data }; // 复制原始数据

    // 修改数据或添加额外字段
    modifiedData.extraField = 'Extra Value';

    // 修改请求头信息
    headers['Content-Type'] = 'application/json';

    return JSON.stringify(modifiedData); // 返回处理后的数据
  }
})
  .then(response => {
    // 处理成功响应
    console.log(response.data);
  })
  .catch(error => {
    // 处理错误
    console.error(error);
  });
```

这里使用 Axios 发起了一个 POST 请求。通过传递包含 `transformRequest` 函数的配置对象来定义请求。在 `transformRequest` 函数内部，复制了原始的请求数据 `data`，并进行了一些修改和处理，如添加了额外的字段和修改了请求头信息。最终，将修改后的数据以 JSON 字符串的形式返回。Axios 将使用 `transformRequest` 函数返回的结果作为实际发送请求的数据。

除了可以对请求进行拦截之外，Axios 还支持对响应进行拦截，对响应数据进行转换和处理。可以通过 `transformResponse` 响应拦截器来实现。该函数接收一个参数：`responseData`，它是从服务器接收到的原始响应数据。可以在 `transformResponse` 函数内部对这个参数进行修改，并将修改后的值返回。返回的结果将作为实际处理响应的数据。

```js
axios.get('https://api.example.com/data', {
  transformResponse: (data) => {
    // 对响应数据进行转换和处理
    const parsedData = JSON.parse(data); // 解析 JSON 字符串

    // 修改数据或添加额外字段
    parsedData.extraField = 'Extra Value';

    return parsedData; // 返回处理后的数据
  }
})
  .then(response => {
    // 处理成功响应
    console.log(response.data);
  })
  .catch(error => {
    // 处理错误
    console.error(error);
  });
```

这里使用 Axios 发起了一个 GET 请求，并通过传递包含 `transformResponse` 函数的配置对象来定义请求。在 `transformResponse` 函数内部，对从服务器接收到的响应数据 `data` 进行了一些修改和处理，如解析 JSON 字符串，添加了额外的字段。最终将修改后的数据返回。

​                                                                    **拦截请求和响应**

Axios 中，可以使用拦截器来拦截请求和响应，并在其被发送或接收之前进行一些额外的处理，可以通过 `axios.interceptors` 对象来添加拦截器。

```js
// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做一些处理
  console.log('请求拦截器');

  // 修改请求配置
  config.headers['Authorization'] = 'Bearer token';

  return config;
}, error => {
  // 处理请求错误
  console.error('请求出错：', error);
});

// 添加响应拦截器
axios.interceptors.response.use(response => {
  // 在接收到响应数据之前做一些处理
  console.log('响应拦截器');

  // 修改响应数据
  response.data = { ...response.data, extraField: 'Extra Value' };

  return response;
}, error => {
  // 处理响应错误
  console.error('响应出错：', error);
});

// 发送请求
axios.get('https://api.example.com/data')
  .then(response => {
    // 处理成功响应
    console.log(response.data);
  })
  .catch(error => {
    // 处理请求或响应错误
    console.error(error);
  });
```

这里首先使用 `axios.interceptors.request.use` 方法添加了一个请求拦截器。该拦截器在发送请求之前被调用，并接收请求配置对象 `config` 作为参数。可以对请求配置进行修改，如添加请求头信息。最后，要确保返回修改后的配置对象。

接下来，使用 `axios.interceptors.response.use` 方法添加了一个响应拦截器。该拦截器在接收到响应数据之前被调用，并接收响应对象 `response` 作为参数。可以对响应数据进行修改，如添加额外的字段。同样，要确保返回修改后的响应对象。

​                                                                    **客户端支持 XSRF防护**

跨站请求伪造（简称 XSRF）是一种攻击 Web 应用的方法，其中攻击者将自己伪装成合法且受信任的用户，以影响应用程序与用户浏览器之间的交互。 有很多方法可以执行此类攻击，包括 `XMLHttpRequest`。

幸运的是，Axios 通过允许在发出请求时嵌入额外的身份验证数据来防止 XSRF。 这使得服务器能够发现来自未经授权的位置的请求。以下是使用 Axios 完成此操作的方法：

```js
const options = {
  method: 'post',
  url: '/login',
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
};

axios(options)
  .then(response => {
    // 处理成功响应
    console.log(response.data);
  })
  .catch(error => {
    // 处理请求错误
    console.error(error);
  });
```

这里有两个 xsrf 相关的属性：

- `xsrfCookieName: 'XSRF-TOKEN'`：用于跨站请求伪造(XSRF/CSRF)保护的配置选项之一。它指定了存储 XSRF 令牌的 cookie 的名称。XSRF 令牌用于防止恶意网站发起对已验证用户的请求。
- `xsrfHeaderName: 'X-XSRF-TOKEN'`：用于跨站请求伪造(XSRF/CSRF)保护的配置选项之一。它指定了包含 XSRF 令牌的请求头的名称。服务器端可以通过检查该请求头来验证请求的合法性。

​                                                                    **请求进度**

Axios 的另一个有趣的功能是能够监控请求的进度，这在下载或上传大文件时特别有用，可以使用 `onUploadProgress` 和 `onDownloadProgress` 两个配置选项来实现。

对于上传进度，可以使用 `onUploadProgress` 配置选项。它会在上传数据时触发，并提供关于上传进度的信息。

```js
axios.post('/upload', data, {
  onUploadProgress: progressEvent => {
    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    console.log(`上传进度：${percentCompleted}%`);
  },
})
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
```

这里发送了一个 POST 请求，在配置选项中使用了 `onUploadProgress`。当数据上传过程中触发进度事件时，回调函数会被执行。在回调函数中，我们计算出了已上传数据的百分比，并将其打印出来。

对于下载进度，可以使用 `onDownloadProgress` 配置选项。它会在接收到响应数据时触发，并提供关于下载进度的信息。

```js
axios.get('/download', {
  onDownloadProgress: progressEvent => {
    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    console.log(`下载进度：${percentCompleted}%`);
  },
})
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
```

这里发送了一个 GET 请求，在配置选项中使用了 `onDownloadProgress`。当数据下载过程中触发进度事件时，回调函数会被执行。在回调函数中，我们计算出了已下载数据的百分比，并将其打印出来。

​                                                                    **取消请求**

在 Axios 中，可以使用取消令牌（cancel token）来取消请求。取消令牌是一个对象，它表示一个具体的取消操作，并允许在需要时中止请求。

```js
// 创建一个取消令牌源
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

// 发送请求
axios.get('/api/data', {
  cancelToken: source.token
})
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (axios.isCancel(error)) {
      console.log('请求已被取消：', error.message);
    } else {
      console.error(error);
    }
  });

// 取消请求
source.cancel('取消请求的原因');
```

这里，先创建了一个取消令牌源 `source`。然后，发送 GET 请求时将 `cancelToken` 配置选项设置为 `source.token`，即将取消令牌与该请求关联起来。当需要取消请求时，调用 `source.cancel()` 方法，并传入取消请求的原因作为参数。

在请求的 `.catch()` 方法中，我们使用 `axios.isCancel(error)` 来判断捕获的错误是否是一个已取消的请求。如果是取消请求导致的错误，则会打印出 '请求已被取消' 的提示信息。否则，将打印出其他类型的错误。

​                                                                    **请求超时**

可以使用 `timeout` 配置选项设置 Axios 请求的超时时间，这个选项指定了请求在多少毫秒后如果没有得到响应就会超时。

```js
axios.get('/api/data', {
  timeout: 5000 // 设置超时时间为5秒
})
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
```

发送了一个 GET 请求，并在配置选项中设置了 `timeout` 为 5000 毫秒（即 5 秒）。如果请求在 5 秒内没有得到响应，就会触发超时错误。在超时错误的情况下，请求会被自动取消，并且进入 `.catch()` 分支。您可以根据需要进行错误处理。

注意，如果不设置 `timeout` 选项，默认情况下 Axios 请求是没有超时限制的。

















