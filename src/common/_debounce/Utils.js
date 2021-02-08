
/**
 * @function 防抖函数 --案例一
 * @param callback 回调函数
 * @param ms 间隔时间
 */
export const delay = (function () {
  let timer = 0;
  return function (callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();
/**
 * @function 防抖函数 --案例二
 * @param func 回调函数
 * @param wait 间隔时间
 */
export const debounce = (func, wait) => {
  let timer = null;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, arguments)
    }, wait)
  }
}
