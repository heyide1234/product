<template>
  <div id="mainfs">
    <div ref="main" id="mainS"></div>
  </div>
</template>

<script>
var echarts = require("echarts");
var myChart = "";
// var datass = [70, 34, 60, 70, 34, 70, 34, 60, 70, 34];

export default {
  props: {
    datas: {
      type: Object,
      default: () => ({
        values: [70, 34, 60, 70, 34, 70, 34, 60, 70, 34],
        orderNumber: [
          "920210310002",
          "920210310002",
          "920210310002",
          "920210310002",
          "920210310002",
          "920210310002",
          "920210310002",
          "920210310002",
          "920210310002",
          "920210310002",
        ],
      }),
    },
  },
  data() {
    return {
      option: {
        backgroundColor: "#02164c",
        // title: {
        //   text: "电耗排名TOP10",
        //   // x: 'left',
        //   textStyle: {
        //     fontSize: 15,
        //     color: "#333",
        //   },
        //   // left: '6%',
        //   // top: '10%'
        // },
        //图标位置
        grid: {
          top: "0%",
          left: "40%",
        },
        xAxis: {
          show: false,
        },
        yAxis: [
          {
            show: true,
            data: this.datas.orderNumber,
            inverse: true,
            axisLine: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              color: "#ffe",
              backgroundColor: "#0f0d40",
              fontSize: 9.5,
              formatter: (value, index) => {
                return [index + 1 + ".{title|" + value + "} "].join("\n");
              },
              rich: {
                title: {
                  // backgroundColor: "#000",
                  color: "#fff",
                  fontSize: 9.5,
                  width: 85,
                  align: "left",
                  borderRadius: 5,
                  padding: 2,
                },
              },
            },
          },
        ],
        series: [
          {
            name: "条",
            type: "bar",
            yAxisIndex: 0,
            data: this.datas.values,
            barWidth: 5,
            label: {
              normal: {
                show: true,
                position: "right",
                textStyle: {
                  color: "#ccc",
                  fontSize: "10",
                },
              },
            },
            itemStyle: {
              normal: {
                barBorderRadius: 30,
                color: function (params) {
                  var num = ["#909399", "#e6a23c", "#67c23a"].length;
                  return ["#909399", "#e6a23c", "#67c23a"][
                    params.dataIndex % num
                  ];
                },
                // 渐变色
                // color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                // offset: 0,
                // color: 'rgba(0,255,0)'
                // }, {
                // offset: 1,
                // color: 'rgb(215 ,255,0)'
                // }]),
              },
            },
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
          // title: {
          //   text: "电耗排名TOP10",
          //   // x: 'left',
          //   textStyle: {
          //     fontSize: 15,
          //     color: "#333",
          //   },
          //   // left: '6%',
          //   // top: '10%'
          // },
          //图标位置
          grid: {
            top: "0%",
            left: "40%",
          },
          xAxis: {
            show: false,
          },
          yAxis: [
            {
              show: true,
              data: this.data.orderNumber,
              inverse: true,
              axisLine: {
                show: false,
              },
              splitLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                color: "#ffe",
                backgroundColor: "#0f0d40",
                fontSize: 9.5,
                formatter: (value, index) => {
                  return [index + 1 + ".{title|" + value + "} "].join("\n");
                },
                rich: {
                  title: {
                    // backgroundColor: "#000",
                    color: "#fff",
                    fontSize: 9.5,
                    width: 85,
                    align: "left",
                    borderRadius: 5,
                    padding: 2,
                  },
                },
              },
            },
          ],
          series: [
            {
              name: "条",
              type: "bar",
              yAxisIndex: 0,
              data: this.data.values,
              barWidth: 5,
              label: {
                normal: {
                  show: true,
                  position: "right",
                  textStyle: {
                    color: "#ccc",
                    fontSize: "10",
                  },
                },
              },
              itemStyle: {
                normal: {
                  barBorderRadius: 30,
                  color: function (params) {
                    var num = ["#909399", "#e6a23c", "#67c23a"].length;
                    return ["#909399", "#e6a23c", "#67c23a"][
                      params.dataIndex % num
                    ];
                  },
                  // 渐变色
                  // color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                  // offset: 0,
                  // color: 'rgba(0,255,0)'
                  // }, {
                  // offset: 1,
                  // color: 'rgb(215 ,255,0)'
                  // }]),
                },
              },
            },
          ],
        };
        myChart.setOption(this.option);
      },
      //immediate: true; //刷新加载 立马触发一次handler
      //deep: true; // 可以深度检测到 person 对象的属性值的变化
    },
  },
  created() {
    this.$nextTick(() => {
      // document.querySelector("#mainS").style.width="500px";
      //  document.querySelector("#mainS").style.height="500px";
    });
  },
};
</script>
<style scoped>
#mainS {
  background-color: "#05224d";
  /* height: 100%; */
  min-height: 240px;
  width: 100%;
}
#mainfs {
  overflow: hidden;
  height: 100%;
  width: 100%;
}
</style>
