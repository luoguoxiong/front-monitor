import * as utils from "./util";

var formatMs = utils.formatMs;
var isObject = utils.isObject;
var checkResourceType = utils.checkResourceType;

function Performance() {}

Performance.prototype = {
  // 获取数据信息
  getPerformanceTiming: function () {
    // 初始化数据
    this.init();
    if (!isObject(this.timing)) {
      console.log("值需要是一个对象类型");
      return;
    }
    // 过早获取 loadEventEnd值会是0
    var loadTime = this.timing.loadEventEnd - this.timing.navigationStart;
    if (loadTime < 0) {
      setTimeout(() => {
        this.getPerformanceTiming();
      }, 0);
      return;
    }
    // 获取解析后的数据
    this.afterDatas.timingFormat = this._setTiming(loadTime);
    this.afterDatas.enteriesResouceDataFormat = this._setEnteries();
    this._show();
  },
  init: function () {
    this.timing = window.performance.timing;
    // 获取资源类型为 resource的所有数据
    this.enteriesResouceData = window.performance.getEntriesByType("resource");
  },
  // 保存原始数据
  timing: {},
  // 原始enteries数据
  enteriesResouceData: [],
  // 保存解析后的数据
  afterDatas: {
    timingFormat: {},
    enteriesResouceDataFormat: {},
    enteriesResouceDataTiming: {
      js: 0,
      css: 0,
      image: 0,
      video: 0,
      others: 0,
    },
  },
  _setTiming: function (loadTime) {
    var timing = this.timing;
    // 对数据进行计算
    var data = {
      重定向耗时: formatMs(timing.redirectEnd - timing.redirectStart),
      Appcache耗时: formatMs(timing.domainLookupStart - timing.fetchStart),
      DNS查询耗时: formatMs(timing.domainLookupEnd - timing.domainLookupStart),
      TCP链接耗时: formatMs(timing.connectEnd - timing.connectStart),
      HTTP请求耗时: formatMs(timing.responseEnd - timing.responseStart),
      请求完毕到DOM加载耗时: formatMs(
        timing.domInteractive - timing.responseEnd
      ),
      解析DOM树耗时: formatMs(timing.domComplete - timing.domInteractive),
      白屏时间耗时: formatMs(timing.responseStart - timing.navigationStart),
      load事件耗时: formatMs(timing.loadEventEnd - timing.loadEventStart),
      页面加载完成的时间: formatMs(loadTime),
    };
    return data;
  },
  _setEnteries: function () {
    var enteriesResouceData = this.enteriesResouceData;
    var imageArrs = [],
      jsArrs = [],
      cssArrs = [],
      videoArrs = [],
      otherArrs = [];
    enteriesResouceData.map((item) => {
      var d = {
        资源名称: item.name,
        HTTP协议类型: item.nextHopProtocol,
        TCP链接耗时: formatMs(item.connectEnd - item.connectStart),
        加载时间: formatMs(item.duration),
      };
      switch (checkResourceType(item.name)) {
        case "image":
          this.afterDatas.enteriesResouceDataTiming.image += item.duration;
          imageArrs.push(d);
          break;
        case "javascript":
          this.afterDatas.enteriesResouceDataTiming.js += item.duration;
          jsArrs.push(d);
          break;
        case "css":
          this.afterDatas.enteriesResouceDataTiming.css += item.duration;
          cssArrs.push(d);
          break;
        case "video":
          this.afterDatas.enteriesResouceDataTiming.video += item.duration;
          videoArrs.push(d);
          break;
        case "others":
          this.afterDatas.enteriesResouceDataTiming.others += item.duration;
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
  },
  _show: function () {
    console.table(this.afterDatas.timingFormat);
    for (var key in this.afterDatas.enteriesResouceDataFormat) {
      console.group(
        key +
          "--- 共加载时间" +
          formatMs(this.afterDatas.enteriesResouceDataTiming[key])
      );
      console.table(this.afterDatas.enteriesResouceDataFormat[key]);
      console.groupEnd(key);
    }
  },
};

var Per = new Performance();

export default Per;
