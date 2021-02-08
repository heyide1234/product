/**
 * @function sleep --代码休眠
 * @function delay --防抖函数一
 * @function debounce --防抖函数二
 * @function throttle --节流函数
 * @function lazyloadImg --图片懒加载
 * @function listenerScrollEvent  --监听鼠标滚动底部事件
 * @function animationFrame --动画
 * @function runderBigData --大数据加载页面
 * @function htmlTagNum --HTML元素数量
 * @function render --virtualDom转为真实DOM
 * @function arrayUnique --数组去重
 * @function getTime --获取当前时间字符串
 * @function deepClone --深度拷贝
 */
export {
  sleep, delay, debounce, throttle, myAJAX, lazyloadImg
  , listenerScrollEvent, animationFrame, runderBigData, htmlTagNum
  , render, arrayUnique, getTime, getCookie, deepClone
}




/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @function sleep
 * @param {} ms 休眠毫秒数
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(() => resolve(), ms));
}
/**
 * @function 防抖函数
 * @param callback 回调函数
 * @param ms 间隔时间
 */
const delay = (function () {
  let timer = 0;
  return function (callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();

/**
 * @function 防抖函数 
 * @param func 回调函数
 * @param wait 间隔时间
 */
const debounce = (func, wait) => {
  let timeout = null;
  return function () {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, arguments)
    }, wait)
  }
}

/**
 * @function 节流函数 
 * @param func 回调函数
 * @param wait 间隔时间
 */
const throttle = (fu, time) => {
  let flag = true;
  return function () {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fu.apply(this, arguments);
      flag = true;
    }, time)
  }
}

/**
* @function AJAX 
* @param url 请求地址
* @param method 请求方法
* @param data 数据
*/
const myAJAX = function (url, method, data) {
  data = data || null;
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    //|| new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open(method, url, false);
    if (method.toLowerCase() == 'get')
      xhr.setRequestHeader('Content-type', 'application/json');
    else
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      if (xhr.status === 200 || xhr.status === 304) {
        resolve(xhr.responseText)
      } else {
        reject(new Error(xhr.responseText))
      }
    }
    xhr.send(data);
  })
}

/**
 * @function 图片懒加载
 * @description img.src='default.png' 
 *            ;根据滚动位置动态将img.dataset.src==img.src
 *            ; window.addEventListener('scroll',lazyloadImg);//绑定滚动事件
 *            ;如优化可添加到节流函数中
 * @used window.addEventListener("scroll",lazyloadImg)
 */
function lazyloadImg() {
  const imgs = document.getElementsByTagName('img');
  //视口高度
  const viewHeight = document.docunmentElement.clientHeight
    || document.body.clientHeight;
  //滚动条高度
  const scrollTop = document.documentElement.scrollTop
    || document.body.scrollTop;
  const currentHeight = viewHeight + scrollTop;//滚动的位置
  for (let i = 0; i < imgs.length; i++) {
    const _offsetTop = imgs[i].offsetTop;//距离父级定位距离
    if (_offsetTop < currentHeight) {
      imgs[i].src = imgs[i].dataset.src;
    }
  }
}
/**
 * 
 * @param {*} fun --事件触发的执行函数
 */
function listenerScrollEvent(fun) {
  window.addEventListener("scroll", function () {
    const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    if (clientHeight + scrollTop >= scrollHeight) {
      //检测滚动页面底部
      //.....
      //.....
      //fun();
      fun.apply(this, arguments);
    }
  }, false);
}
/**
 * 
 * @param {回调函数，动画帧} fn 
 * @param {等待时间} delay 
 */
function animationFrame(fn, delay = 1000 / 60) {
  let requestId = 0;
  function render() {
    //elm = document.getElementById("animated");
    // elm.style.left = ((lpos += 3) % 600) + "px";
    fn();
    requestId = window.requestAFrame(render);
  }

  function start() {
    requestId = window.requestAFrame(render);
  }
  function stop() {
    if (requestId)
      window.cancelAFrame(requestId);
  }

  window.requestAFrame = (function () {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, delay); // shoot for 60 fps
      };
  })();
  window.cancelAFrame = (function () {
    return window.cancelAnimationFrame ||
      window.webkitCancelAnimationFrame ||
      window.mozCancelAnimationFrame ||
      window.oCancelAnimationFrame ||
      function (id) {
        window.clearTimeout(id);
      };
  })();
  return {
    start, stop
  }
}




/**
 * @function --大数据渲染
 * 
 * @animation --
 *        timer = requestAnimationFrame(fn);//定制
          cancelAnimationFrame(timer);//取消
   @animationExample    
       
 */
function runderBigData() {
  let docunment = window.document;
  setTimeout(() => {
    const total = 10000;//模拟10000条数据
    const once = 20;//单次插入的数量
    const loopCount = Math.cell(total / once);//循环次数
    let countOfRender = 0;
    const ul = docunment.querySelector("li");
    function add() {
      const fragment = docunment.createDocumentFragment();//创建文档片段对象
      for (let i = 0; i < once.length; i++) {
        const li = document.createElement("li")
        li.innerText = Math.floor(Math.random() * total);
        fragment.appendChild(li);
      }
      ul.appendChild(fragment);
      countOfRender++;
      loop();
    }
    function loop() {
      if (countOfRender < loopCount) {
        window.requestAnimationFrame(add);//跟随屏幕刷新
      }
    }
    loop();
  }, 0)
}
/**
 * @function --获取HTML元素数量
 */
const htmlTagNum = () => {
  return [...new Set([...document.querySelectorAll("*")].map(el => el.tagName))].length;
}
/**
 * @function 将VirtualDom转为真实DOM结构
 * vnode结构: { tag, attrs, children }
 */
function render(vnode, container) {
  container.appendChild(_render(vnode));
}
function _render(vnode) {
  //如果是数字类型转为字符串
  if (typeof vnode === "number") {
    vnode = String(vnode);
  }
  //字符串类型直接就是文本节点
  if (typeof vnode === "string") {
    return window.docunment.createElement(vnode);
  }
  const dom = window.document.createElement(vnode.tagName);
  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach(key => {
      const value = vnode.attrs[key];
      dom.setAttribute(key, value);
    })
  }
  //子数组进行递归操作
  vnode.children.forEach(child => render(child, dom));
  return dom;
}
/**
 * 
 * @param {*} arr 传入需要去重的数组 
 * @returns 输出去重后的数组
 * distinctArray
 */
function arrayUnique(arr) {
  //return [...new Set(arr)] //--es6
  let _tempObj = {};
  let newArr = [];
  arr.forEach(item => _tempObj[item] || ((_tempObj[item] = true), newArr.push(item)));
  return newArr;
}

/**
 * @function 获取时间字符串
 * @param date --时间(可选)
 */
function getTime(date) {
  let myDate = "";
  myDate = date ? date : new Date();
  let year = myDate.getFullYear();
  let month = pad(myDate.getMonth() + 1, 2);
  let data = pad(myDate.getDate(), 2);
  let hours = pad(myDate.getHours(), 2);
  let minuters = pad(myDate.getMinutes(), 2);
  let seconds = pad(myDate.getSeconds(), 2);
  return year + "/" + month + "/" + data + " " + hours + ":" + minuters + ":" + seconds

}
function pad(num, n) {
  var len = num.toString().length;
  while (len < n) {
    num = "0" + num;
    len++;
  }
  return num;
}
/**
 * @function getCookie
 * @param {*} name 
 * @param {*} defaultValue 
 */
function getCookie(name, defaultValue) {
  var arr,
    reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
  else return defaultValue;
}
/**
 * @function deepClone
 * @param {*} target 
 */
function deepClone(target) {
  // 定义一个变量
  let result;
  // 如果当前需要深拷贝的是一个对象的话
  if (typeof target === 'object') {
    // 如果是一个数组的话
    if (Array.isArray(target)) {
      result = []; // 将result赋值为一个数组，并且执行遍历
      for (let i in target) {
        // 递归克隆数组中的每一项
        result.push(deepClone(target[i]))
      }
      // 判断如果当前的值是null的话；直接赋值为null
    } else if (target === null) {
      result = null;
      // 判断如果当前的值是一个RegExp对象的话，直接赋值    
    } else if (target.constructor === RegExp) {
      result = target;
    } else {
      // 否则是普通对象，直接for in循环，递归赋值对象的所有值
      result = {};
      for (let i in target) {
        result[i] = deepClone(target[i]);
      }
    }
    // 如果不是对象的话，就是基本数据类型，那么直接赋值
  } else {
    result = target;
  }
  // 返回最终结果
  return result;
}