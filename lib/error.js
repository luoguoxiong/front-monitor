// 捕获异常
const reportCaughtError = (error) => {
  console.log(error);
};
// 资源异常
const reportResourceError = (error) => {
  console.log(error);
};
// promise异常
const reportPromiseError = (error) => {
  console.log(error);
};

// 处理资源异常、捕获异常
window.addEventListener(
  "error",
  (error) => {
    console.log(error instanceof ErrorEvent);
    switch (error.type) {
      case "error":
        error instanceof ErrorEvent
          ? reportCaughtError(error)
          : reportResourceError(error);
        break;
    }
    return true;
  },
  true
);
// 捕获promise reject
window.addEventListener("unhandledrejection", function (e) {
  e.preventDefault();
  console.log(e.reason);
  return true;
});
// function pro() {
//   return new Promise((res, rej) => {
//     rej(2);
//   });
// }

// pro();
let _oldFetch = window.fetch;
window.fetch = function () {
  return _oldFetch.apply(this, arguments).then((res) => {
    if (!res.ok) {
      // True if status is HTTP 2xx
      // 上报错误
      console.log(res);
    }
    return res;
  });
  // .catch((error) => {
  //   this.console.log(error);
  //   // 上报错误
  //   throw error;
  // });
};

fetch("/abc2", {
  method: "post",
}).then((res) => {
  console.log(res);
});

if (!window.XMLHttpRequest) return;
var xmlhttp = window.XMLHttpRequest;
var _oldSend = xmlhttp.prototype.send;
var _handleEvent = function (event) {
  if (event && event.currentTarget && event.currentTarget.status !== 200) {
    // 自定义错误上报 }
    console.log(event);
  }
};
xmlhttp.prototype.send = function () {
  if (this["addEventListener"]) {
    this["addEventListener"]("error", _handleEvent);
    this["addEventListener"]("load", _handleEvent);
    this["addEventListener"]("abort", _handleEvent);
  } else {
    var _oldStateChange = this["onreadystatechange"];
    this["onreadystatechange"] = function (event) {
      if (this.readyState === 4) {
        _handleEvent(event);
      }
      _oldStateChange && _oldStateChange.apply(this, arguments);
    };
  }
  return _oldSend.apply(this, arguments);
};

const xhr = new XMLHttpRequest();
xhr.onreadystatechange = () => {
  if (xhr.readyStatus === 4) {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
      console.log("请求成功", xhr.responseText);
    }
  }
};
xhr.open("post", "/", true);

xhr.send();
// 1.埋点上报
// window.onbeforeunload = () => {
//   reportData("http://127.0.0.1:8080", { data: 2 });
// };

// const reportData = (url, data) => {
//   navigator.sendBeacon(url, JSON.stringify(data));
// };
