# front-monitor

1. 获取页面性能指标

   ```js
   // 获取性能指标
   getTiming() {
     const timing = window.performance.timing;
     return {
       // DNS解析时间
       dnst: timing.domainLookupEnd - timing.domainLookupStart || 0,
       //TCP建立时间
       tcpt: timing.connectEnd - timing.connectStart || 0,
       // 白屏时间
       writet: timing.responseStart - timing.navigationStart || 0,
       //dom渲染完成时间
       domt: timing.domContentLoadedEventEnd - timing.navigationStart || 0,
       //页面onload时间
       loadt: timing.loadEventEnd - timing.navigationStart || 0,
       // 页面准备时间
       readyt: timing.fetchStart - timing.navigationStart || 0,
       // 页面重定向时间
       redt: timing.redirectEnd - timing.redirectStart || 0,
       // unload时间
       unloadt: timing.unloadEventEnd - timing.unloadEventStart || 0,
       //request请求耗时
       reqt: timing.responseEnd - timing.requestStart || 0,
       //页面解析dom耗时
       andt: timing.domComplete - timing.domInteractive || 0,
     };
   }
   ```

2. 获取资源加载时间

   ```js
   getEnteries() {
     const resources = window.performance.getEntriesByType('resource');
     const imageArrs = [],
           jsArrs = [],
           cssArrs = [],
           videoArrs = [],
           otherArrs = [];
     resources.map(item => {
       const d = {
         name: item.name,
         tcpTime: item.connectEnd - item.connectStart,
         duration: item.duration,
       };
   
       switch (checkResourceType(item.name)) {
         case 'image':
           imageArrs.push(d);
           break;
         case 'javascript':
           jsArrs.push(d);
           break;
         case 'css':
           cssArrs.push(d);
           break;
         case 'video':
           videoArrs.push(d);
           break;
         case 'others':
           otherArrs.push(d);
           break;
       }
     });
     return {
       js: jsArrs,
       css: cssArrs,
       image: imageArrs,
       video: videoArrs,
       others: otherArrs,
     };
   }
   ```

3. 捕js代码异常、资源加载异常 window.onerror事件、promise reject unhandledrejection 事件

   ```js
   // 捕获异常
   caughtError() {
     window.addEventListener(
       'error',
       error => {
         switch (error.type) {
           case 'error':
             error instanceof ErrorEvent
               ? this.reportCaughtError(error)
             : this.reportResourceError(error);
             break;
         }
       },
       true
     );
   
     // 捕获promise reject
     window.addEventListener('unhandledrejection', error => {
       error.preventDefault();
       this.reportPromiseError(error);
       return true;
     });
   }
   ```

4. 捕获xml请求、fetch请求

```js
// 重写xmlhttp请求
resetXmlHttp() {
  if (!window.XMLHttpRequest) return;
  const xmlhttp = window.XMLHttpRequest;
  const _oldOpen = xmlhttp.prototype.open;
  const that = this;
  xmlhttp.prototype.open = function () {
    const data = {};
    data.method = arguments[0].toLocaleUpperCase();
    let startTime = '';
    this.addEventListener('loadstart', () => {
      startTime = new Date().getTime();
    });
    const handle = event => {
      const endTime = new Date().getTime();
      data.duration = endTime - startTime;
      data.statusCode = event.target.status;
      data.requestUrl = event.target.responseURL;
      data.type = event.type;
      that.reportRequest(data);
    };
    this.addEventListener('error', handle);
    this.addEventListener('load', handle);
    return _oldOpen.apply(this, arguments);
  };
}
// 重写fetch请求
resetFetch() {
  let _oldFetch = window.fetch;
  const that = this;
  window.fetch = function () {
    const startTime = new Date().getTime();
    const data = {};
    data.requestUrl = arguments[0];
    data.method = arguments[1].method.toLocaleUpperCase();
    return _oldFetch
      .apply(this, arguments)
      .then(res => {
      const endTime = new Date().getTime();
      data.duration = endTime - startTime;
      data.statusCode = res.status;
      data.requestUrl = res.url;
      data.type = res.type;
      that.reportRequest(data);
      return res;
    })
      .catch(error => {
      const endTime = new Date().getTime();
      data.duration = endTime - startTime;
      data.statusCode = 0;
      data.type = 'error';
      that.reportRequest(data);
      return error;
    });
  };
}
```

