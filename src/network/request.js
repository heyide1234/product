// /**
//  * 封装get方法
//  * @param url
//  * @param data
//  * @returns {Promise}
//  */

// export function fetch(url,params={}){
//   return new Promise((resolve,reject) => {
//     axios.get(url,{
//       params:params
//     })
//     .then(response => {
//       resolve(response.data);
//     })
//     .catch(err => {
//       reject(err)
//     })
//   })
// }

// /**
//  * 封装post请求
//  * @param url
//  * @param data
//  * @returns {Promise}
//  */

//  export function post(url,data = {}){
//    return new Promise((resolve,reject) => {
//      axios.post(url,data)
//           .then(response => {
//             resolve(response.data);
//           },err => {
//             reject(err)
//           })
//    })
//  }

//  /**
//  * 封装patch请求
//  * @param url
//  * @param data
//  * @returns {Promise}
//  */

// export function patch(url,data = {}){
//   return new Promise((resolve,reject) => {
//     axios.patch(url,data)
//          .then(response => {
//            resolve(response.data);
//          },err => {
//            reject(err)
//          })
//   })
// }

//  /**
//  * 封装put请求
//  * @param url
//  * @param data
//  * @returns {Promise}
//  */

// export function put(url,data = {}){
//   return new Promise((resolve,reject) => {
//     axios.put(url,data)
//          .then(response => {
//            resolve(response.data);
//          },err => {
//            reject(err)
//          })
//   })
// }
import { productURL, developURL } from "./urlConfig";
import { testproductURL, testdevelopURL } from "./testurlConfig";

import axios from "axios";

// let _baseURL = "http://172.16.1.10:3000";

// let _baseURL = config.BASE_URL;
let _baseURL = null;

//let _baseURL = "http://172.16.1.52:3000";

export function https(options) {

  return new Promise((resolve, reject) => {
    if (sessionStorage.getItem("model") == "test") {

      _baseURL = process.env.NODE_ENV === "production" ? testproductURL : testdevelopURL
    } else {
      _baseURL = process.env.NODE_ENV === "production" ? productURL : developURL;
    }

    const defaultOptions = {};
    const newOptions = {
      ...defaultOptions,
      ...options,
    };

    // if (newOptions.url.search("/delete") > -1)
    //   if (newOptions.data.table != "IntransitOrder")
    //     if (!confirm("删除该项将不可恢复，是否继续？"))
    //       return;


    //headers默认传递json格式数据，这里也可以设置token，每次调用都会携带
    newOptions.headers = {
      //"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      "Content-Type": "application/json;charset=UTF-8",
      "accessToken": sessionStorage.getItem("loginName"),
      ...newOptions.headers,
    };

    // newOptions.headers = {
    //   "Content-Type": "multipart/form-data",
    //   ...newOptions.headers,
    // };


    axios({
      baseURL: _baseURL,
      method: newOptions.method || "GET",
      url: newOptions.url,
      params: newOptions.params || {},
      data: newOptions.data || {},
      headers: newOptions.headers,
    })
      .then((res) => {
        //根据返回的状态码判断，注意res返回的并不一定都是status，比如小程序就是statusCode
        if (res.status == 200) {
          if (
            newOptions.method != "" &&
            newOptions.method != null &&
            newOptions.method != "get"
          ) {
            this.$myalert({
              content: "OK",
              type: "success"
            });
          }

          resolve(res.data);
        } else {

          this.$myalert({
            content: "Data exception",
            type: 'warning'
          })
          reject(res);
        }
      })
      .catch((err) => {

        this.$myalert({
          content: "Request exception",
          type: 'warning'
        })

        reject(err);
      });
  });
}




import _vue from "../main"
import { getUserAuth } from "../router/beforeEachIsNext"

// http request 拦截器
axios.interceptors.request.use(
  async config => {
    // debugger;
    //权限认证
    if (config.method != "get") {
      var stat = null;
      stat = await getUserAuth(sessionStorage.getItem("loginName"), _vue.$route.name);
      // console.log("请求。。", stat)
      if (stat === "r") {
        alert("权限不足！")
        return
      }
    }
    // 请求地址添加新的参数记录当前
    // debugger;

    if (config.url.search("/delete") > -1) {

      if (config.data.table != "IntransitOrder") {
        if (!confirm("删除该项将不可恢复，是否继续？")) {
          return;
        }
      }
    }
    return config;
  },
  // err => {
  //   return Promise.reject(err);
  // },

);

// http response 拦截器
axios.interceptors.response.use(

  response => {
    // console.log("拦截器response", response);
    // if (response.status === 200) {
    //   this.$myalert({
    //     content: "OK",
    //     type: "success"
    //   });
    // }
    return response;
  },
  // error => {
  //   return Promise.reject(error);
  // }
);





