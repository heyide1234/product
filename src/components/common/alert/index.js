import Vue from "vue";
import myalert from "./myalert";

const myalertBox = Vue.extend(myalert);

myalert.install = function(data) {
  let instance = new myalertBox({
    data,
  }).$mount();

  document.body.appendChild(instance.$el);

  // Vue.nextTick(() => {
  //   instance.show = true;
  //   // show 和弹窗组件里的show对应，用于控制显隐
  // });
};

export default myalert;
