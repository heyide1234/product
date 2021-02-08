import Vue from "vue";
import myloading from "./loading";

const myloadingBox = Vue.extend(myloading);
const instance = new myloadingBox().$mount();
document.body.appendChild(instance.$el);

myloading.install = function (data) {

  // const instance = new myloadingBox({
  //   data,
  // }).$mount();
  // console.log("instance===", instance.show);

  instance.show = data.show;

  // Vue.nextTick(() => {
  //   instance.show = true;
  //   // show 和弹窗组件里的show对应，用于控制显隐
  // });
};

export default myloading;
// export { };
