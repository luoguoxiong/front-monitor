export const BrowserType = () => {
  const ua = navigator.userAgent.toLowerCase();
  const testUa = (regexp) => regexp.test(ua);
  const testVs = (regexp) =>
    (ua.match(regexp) + "").replace(/[^0-9|_.]/gi, "").replace(/_/gi, ".");
  // 系统
  let system = "unknown";
  if (testUa(/windows|win32|win64|wow32|wow64/gi)) {
    system = "windows"; // window系统
  } else if (testUa(/macintosh|macintel/gi)) {
    system = "osx"; // osx系统
  } else if (testUa(/x11/gi)) {
    system = "linux"; // linux系统
  } else if (testUa(/android|adr/gi)) {
    system = "android"; // android系统
  } else if (testUa(/ios|iphone|ipad|ipod|iwatch/gi)) {
    system = "ios"; // ios系统
  }
  // 系统版本
  let systemVs = "unknown";
  if (system === "windows") {
    if (testUa(/windows nt 5.0|windows 2000/gi)) {
      systemVs = "2000";
    } else if (testUa(/windows nt 5.1|windows xp/gi)) {
      systemVs = "xp";
    } else if (testUa(/windows nt 5.2|windows 2003/gi)) {
      systemVs = "2003";
    } else if (testUa(/windows nt 6.0|windows vista/gi)) {
      systemVs = "vista";
    } else if (testUa(/windows nt 6.1|windows 7/gi)) {
      systemVs = "7";
    } else if (testUa(/windows nt 6.2|windows 8/gi)) {
      systemVs = "8";
    } else if (testUa(/windows nt 6.3|windows 8.1/gi)) {
      systemVs = "8.1";
    } else if (testUa(/windows nt 10.0|windows 10/gi)) {
      systemVs = "10";
    }
  } else if (system === "osx") {
    systemVs = testVs(/os x [\d._]+/gi);
  } else if (system === "android") {
    systemVs = testVs(/android [\d._]+/gi);
  } else if (system === "ios") {
    systemVs = testVs(/os [\d._]+/gi);
  }
  // 平台
  let platform = "unknow";
  if (system === "windows" || system === "osx" || system === "linux") {
    platform = "desktop"; // 桌面端
  } else if (system === "android" || system === "ios" || testUa(/mobile/gi)) {
    platform = "mobile"; // 移动端
  }
  // 内核和载体
  let engine = "unknow";
  let supporter = "unknow";
  if (testUa(/applewebkit/gi) && testUa(/safari/gi)) {
    engine = "webkit"; // webkit内核
    if (testUa(/edge/gi)) {
      supporter = "edge"; // edge浏览器
    } else if (testUa(/opr/gi)) {
      supporter = "opera"; // opera浏览器
    } else if (testUa(/chrome/gi)) {
      supporter = "chrome"; // chrome浏览器
    } else {
      supporter = "safari"; // safari浏览器
    }
  } else if (testUa(/gecko/gi) && testUa(/firefox/gi)) {
    engine = "gecko"; // gecko内核
    supporter = "firefox"; // firefox浏览器
  } else if (testUa(/presto/gi)) {
    engine = "presto"; // presto内核
    supporter = "opera"; // opera浏览器
  } else if (testUa(/trident|compatible|msie/gi)) {
    engine = "trident"; // trident内核
    supporter = "iexplore"; // iexplore浏览器
  }
  // 内核版本
  let engineVs = "unknow";
  if (engine === "webkit") {
    engineVs = testVs(/applewebkit\/[\d.]+/gi);
  } else if (engine === "gecko") {
    engineVs = testVs(/gecko\/[\d.]+/gi);
  } else if (engine === "presto") {
    engineVs = testVs(/presto\/[\d.]+/gi);
  } else if (engine === "trident") {
    engineVs = testVs(/trident\/[\d.]+/gi);
  }
  // 载体版本
  let supporterVs = "unknow";
  if (supporter === "chrome") {
    supporterVs = testVs(/chrome\/[\d.]+/gi);
  } else if (supporter === "safari") {
    supporterVs = testVs(/version\/[\d.]+/gi);
  } else if (supporter === "firefox") {
    supporterVs = testVs(/firefox\/[\d.]+/gi);
  } else if (supporter === "opera") {
    supporterVs = testVs(/opr\/[\d.]+/gi);
  } else if (supporter === "iexplore") {
    supporterVs = testVs(/(msie [\d.]+)|(rv:[\d.]+)/gi);
  } else if (supporter === "edge") {
    supporterVs = testVs(/edge\/[\d.]+/gi);
  }
  // 外壳和外壳版本
  let shell = "none";
  let shellVs = "unknow";
  if (testUa(/micromessenger/gi)) {
    shell = "wechat"; // 微信浏览器
    shellVs = testVs(/micromessenger\/[\d.]+/gi);
  } else if (testUa(/qqbrowser/gi)) {
    shell = "qq"; // QQ浏览器
    shellVs = testVs(/qqbrowser\/[\d.]+/gi);
  } else if (testUa(/ubrowser/gi)) {
    shell = "uc"; // UC浏览器
    shellVs = testVs(/ubrowser\/[\d.]+/gi);
  } else if (testUa(/2345explorer/gi)) {
    shell = "2345"; // 2345浏览器
    shellVs = testVs(/2345explorer\/[\d.]+/gi);
  } else if (testUa(/metasr/gi)) {
    shell = "sougou"; // 搜狗浏览器
  } else if (testUa(/lbbrowser/gi)) {
    shell = "liebao"; // 猎豹浏览器
  } else if (testUa(/maxthon/gi)) {
    shell = "maxthon"; // 遨游浏览器
    shellVs = testVs(/maxthon\/[\d.]+/gi);
  } else if (testUa(/bidubrowser/gi)) {
    shell = "baidu"; // 百度浏览器
    shellVs = testVs(/bidubrowser [\d.]+/gi);
  }
  return Object.assign(
    {
      engine, // webkit gecko presto trident
      engineVs,
      platform, // desktop mobile
      supporter, // chrome safari firefox opera iexplore edge
      supporterVs,
      system, // windows osx linux android ios
      systemVs,
    },
    shell === "none"
      ? {}
      : {
          shell, // wechat qq uc 2345 sougou liebao maxthon baidu
          shellVs,
        }
  );
};

function isImg(param) {
  if (/\.(gif|jpg|jpeg|png|webp|svg)/i.test(param)) {
    return true;
  }
  return false;
}

function isJS(param) {
  if (/\.(js)/i.test(param)) {
    return true;
  }
  return false;
}

function isCss(param) {
  if (/\.(css)/i.test(param)) {
    return true;
  }
  return false;
}

function isVideo(param) {
  if (/\.(mp4|rm|rmvb|mkv|avi|flv|ogv|webm)/i.test(name)) {
    return true;
  }
  return false;
}

export function checkResourceType(param) {
  if (isImg(param)) {
    return "image";
  }
  if (isJS(param)) {
    return "javascript";
  }
  if (isCss(param)) {
    return "css";
  }
  if (isVideo(param)) {
    return "video";
  }
  return "other";
}
