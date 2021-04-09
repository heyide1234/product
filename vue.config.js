const path = require("path"); //引入path模块
//const CompressionPlugin = require("compression-webpack-plugin");
// const productionGzipExtensions = ["js", "css"];

// function resolve(dir) {
//   return path.join(__dirname, dir); //path.join(__dirname)设置绝对路径
// }
module.exports = {
  productionSourceMap: process.env.NODE_ENV === "production" ? false : true,
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set("@", resolve("./src"))
  //     .set("components", resolve("./src/components"))
  //     .set("views", resolve("src/views"))
  //     .set("network", resolve("src/network"))
  //     .set("common", resolve("src/common"))
  //     .set("assets", resolve("src/assets"));
  // },
  ////////////////////////////////
  // devServer: {
  //   host: "0.0.0.0",
  //   disableHostCheck: true,
  //   //  https: true,
  //   proxy: {
  //     "/api/": {
  //       "target": "http://localhost:8090/",
  //       changeOrigin: true,
  //       ws: true,

  //       pathRewrite: {
  //         '^/api': '/'
  //       }
  //     }, "/rest/": {
  //       "target": "http://localhost:8000/",
  //       changeOrigin: true,
  //       ws: true,
  //       pathRewrite: {
  //         '^/rest': '/'
  //       }
  //     }
  //   }
  // }
  // ,
  configureWebpack: {
    resolve: {
      alias: {
        assets: "@/assets",
        common: "@/common",
        components: "@/components",
        network: "@/network",
        views: "@/views",
        business: "@/business",
      },
    },

    // devtool: "source-map"

    //打包进行压缩gz

    //plugins: [
    // new CompressionPlugin({
    //   algorithm: "gzip", // 使用gzip压缩
    //   test: /\.js$|\.html$|\.css$|\.png$|\.woff$/, // 匹配文件名
    //   filename: "[path].gz[query]", // 压缩后的文件名(保持原文件名，后缀加.gz)
    //   minRatio: 1, // 压缩率小于1才会压缩
    //   threshold: 30, // 对超过X的数据压缩
    //   deleteOriginalAssets: true, // 是否删除未压缩的源文件，谨慎设置，如果希望提供非gzip的资源，可不设置或者设置为false（比如删除打包后的gz后还可以加载到原始资源文件）
    // }),
    //],

  },
};
