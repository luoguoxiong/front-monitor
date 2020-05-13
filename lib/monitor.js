import { BrowserType, checkResourceType } from "./utils";

class Monitor {
  isRunInit = false;
  config = {};
  // 初始化
  init(config) {
    this.isRunInit = true;
    this.caughtError();
    this.getWebPerformance();
    this.resetXmlHttp();
    this.resetFetch();
    this.config = config;
    this.userAgent = BrowserType();
    return this;
  }
  // 获取页面性能指标
  getWebPerformance() {
    if (this.isRunInit) {
      window.onload = () => {
        const id = setTimeout(() => {
          clearTimeout(id);
          this.reportPerformance(this.getTiming(), this.getEnteries());
        }, 0);
      };
    }
  }

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
  // 获取资源加载时间
  getEnteries() {
    const resources = window.performance.getEntriesByType("resource");
    const imageArrs = [],
      jsArrs = [],
      cssArrs = [],
      videoArrs = [],
      otherArrs = [];
    resources.map((item) => {
      const d = {
        name: item.name,
        tcpTime: item.connectEnd - item.connectStart,
        duration: item.duration,
      };

      switch (checkResourceType(item.name)) {
        case "image":
          imageArrs.push(d);
          break;
        case "javascript":
          jsArrs.push(d);
          break;
        case "css":
          cssArrs.push(d);
          break;
        case "video":
          videoArrs.push(d);
          break;
        case "others":
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
  // 捕获异常
  caughtError() {
    window.addEventListener(
      "error",
      (error) => {
        switch (error.type) {
          case "error":
            error instanceof ErrorEvent
              ? this.reportCaughtError(error)
              : this.reportResourceError(error);
            break;
        }
      },
      true
    );

    // 捕获promise reject
    window.addEventListener("unhandledrejection", (error) => {
      error.preventDefault();
      this.reportPromiseError(error);
      return true;
    });
  }

  // 重写xmlhttp请求
  resetXmlHttp() {
    if (!window.XMLHttpRequest) return;
    const xmlhttp = window.XMLHttpRequest;
    const _oldOpen = xmlhttp.prototype.open;
    const that = this;
    xmlhttp.prototype.open = function () {
      const data = {};
      data.method = arguments[0].toLocaleUpperCase();
      let startTime = "";
      this.addEventListener("loadstart", () => {
        startTime = new Date().getTime();
      });
      const handle = (event) => {
        const endTime = new Date().getTime();
        data.duration = endTime - startTime;
        data.statusCode = event.target.status;
        data.requestUrl = event.target.responseURL;
        data.type = event.type;
        that.reportRequest(data);
      };
      this.addEventListener("error", handle);
      this.addEventListener("load", handle);
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
      console.log(arguments);
      return _oldFetch
        .apply(this, arguments)
        .then((res) => {
          const endTime = new Date().getTime();
          data.duration = endTime - startTime;
          data.statusCode = res.status;
          data.requestUrl = res.url;
          data.type = res.type;
          that.reportRequest(data);
          return res;
        })
        .catch((error) => {
          const endTime = new Date().getTime();
          data.duration = endTime - startTime;
          data.statusCode = 0;
          data.type = "error";
          that.reportRequest(data);
          return error;
        });
    };
  }

  // 上报接口请求
  reportRequest(data) {
    this.report({ ...data }, "request");
  }
  // 页面性能上报
  reportPerformance(data, resource) {
    this.report({ perfamce: data, resource }, "performance");
  }

  // 代码异常上报
  reportCaughtError(error) {
    const {
      message,
      filename,
      error: { stack },
    } = error;
    this.report({ filename, message, stack }, "jsError");
  }

  // 资源异常上报
  reportResourceError(error) {
    const jsUrl = error.target.src;
    this.report({ jsUrl, type: error.type }, "resourceError");
  }

  // promise reject上报
  reportPromiseError(error) {
    this.report({ rejContent: JSON.stringify(error.reason) }, "prmiseReject");
  }

  // 上报日志
  report(data, type) {
    const uploadData = {
      userAgent: this.userAgent,
      location: location,
      appId: this.config.appId,
      data,
      type,
    };
    console.log(uploadData);
  }
}

export default new Monitor();
