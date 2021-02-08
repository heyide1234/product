<template>
  <div ref="main" id="mainS"></div>
</template>

<script>
var echarts = require("echarts");
var myChart = null;

export default {
  props: {
    datas: {
      type: Object,
      default: () => ({ value: 0, lx: "" }),
    },
  },
  data() {
    return {
      option: {
        backgroundColor: "#02164c",
        title: {
          text: this.datas.value + "%",
          x: "center",
          y: "center",
          textStyle: {
            fontWeight: "normal",
            color: "#fff",
            fontSize: "15",
          },
          subtext: this.datas.lx,
          subtextStyle: {
            color: "#ffb",
          },
          itemGap: 10, // 主副标题距离
          top: "38%",
          left: "center",
        },
        color: ["#282c40"],
        legend: {
          show: false,
          data: [],
        },

        series: [
          {
            name: "Line 1",
            type: "pie",
            clockWise: true,
            radius: ["50%", "60%"],
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
              },
            },
            hoverAnimation: false,
            data: [
              {
                value: this.datas.value,
                name: "",
                itemStyle: {
                  normal: {
                    color: {
                      // 完成的圆环的颜色
                      colorStops: [
                        {
                          offset: 0,
                          color: "#02d6fc", // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#367bec", // 100% 处的颜色
                        },
                      ],
                    },
                    label: {
                      show: false,
                    },
                    labelLine: {
                      show: false,
                    },
                  },
                },
                label: {
                  normal: {
                    textStyle: {
                      fontSize: 15,
                      fontWeight: "bold",
                      color: "#23EB7B",
                    },
                  },
                },
              },
              {
                name: "",
                value: 100 - this.datas.value,
              },
            ],
          },
        ],
      },
    };
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例

    myChart = echarts.init(this.$refs.main);
    // 绘制图表
    myChart.setOption(this.option);
  },
  destroyed() {},

  computed: {
    // clientHeight() {
    //   // return document.body.clientHeight / 10;
    //   return window.screen.availHeight - 135;
    // },
    // clientWidth() {
    //   // return document.body.clientHeight / 10;
    //   return window.screen.availWidth;
    // }
  },
  watch: {
    datas: {
      //观察option的变化
      handler(newVal, oldVal) {
        console.log(newVal, oldVal);
        // if (newVal) {
        // } else {
        //   myChart.setOption(oldVal);
        // }
        this.option = {
          backgroundColor: "#02164c",
          title: {
            text: this.datas.value + "%",
            x: "center",
            y: "center",
            textStyle: {
              fontWeight: "normal",
              color: "#fff",
              fontSize: "15",
            },
            subtext: this.datas.lx,
            subtextStyle: {
              color: "#ffb",
            },
            itemGap: 10, // 主副标题距离
            top: "38%",
            left: "center",
          },
          color: ["#282c40"],
          legend: {
            show: false,
            data: [],
          },

          series: [
            {
              name: "Line 1",
              type: "pie",
              clockWise: true,
              radius: ["50%", "60%"],
              itemStyle: {
                normal: {
                  label: {
                    show: false,
                  },
                  labelLine: {
                    show: false,
                  },
                },
              },
              hoverAnimation: false,
              data: [
                {
                  value: this.datas.value,
                  name: "",
                  itemStyle: {
                    normal: {
                      color: {
                        // 完成的圆环的颜色
                        colorStops: [
                          {
                            offset: 0,
                            color: "#02d6fc", // 0% 处的颜色
                          },
                          {
                            offset: 1,
                            color: "#367bec", // 100% 处的颜色
                          },
                        ],
                      },
                      label: {
                        show: false,
                      },
                      labelLine: {
                        show: false,
                      },
                    },
                  },
                  label: {
                    normal: {
                      textStyle: {
                        fontSize: 15,
                        fontWeight: "bold",
                        color: "#23EB7B",
                      },
                    },
                  },
                },
                {
                  name: "",
                  value: 100 - this.datas.value,
                },
              ],
            },
          ],
        };
        myChart.setOption(this.option);
      },
      //immediate: true; //刷新加载 立马触发一次handler
      //deep: true; // 可以深度检测到 person 对象的属性值的变化
    },
  },
  created() {},
  beforeDestory() {
    echarts.dispose(myChart);
    myChart = null;
  },
};
</script>
<style scoped>
#mainS {
  background-color: "#05224d";
  height: 80%;
  width: 100%;
}
</style>
