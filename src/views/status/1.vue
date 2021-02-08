<template>
  <div ref="main" id="mainS"></div>
</template>

<script>
var echarts = require("echarts");
var myChart = "";
export default {
  props: {
    data: {
      type: Object,
      default: () => ({
        title: "0",
        gx: ["一", "二", "三", "四", "五"],
        lb: ["待出", "配料", "领料", "完成"],
        dc: [
          {
            value: 3,
          },
          {
            value: 6,
          },
          {
            value: 10,
          },
          {
            value: 6,
          },
          {
            value: 8,
          },
        ],
        pl: [
          {
            value: 13,
          },
          {
            value: 6,
          },
          {
            value: 10,
          },
          {
            value: 6,
          },
          {
            value: 8,
          },
        ],
        ll: [
          {
            value: 23,
          },
          {
            value: 6,
          },
          {
            value: 10,
          },
          {
            value: 6,
          },
          {
            value: 8,
          },
        ],
        wc: [
          {
            value: 33,
          },
          {
            value: 6,
          },
          {
            value: 10,
          },
          {
            value: 6,
          },
          {
            value: 8,
          },
        ],
      }),
    },
  },
  data() {
    return {
      option: {
        title: {
          // left: "center",
          // text: "SCNT1234-JFDS345", //标题
          // backgroundColor: "#000", //背景
          //subtext: "同比百分比(%)", //子标题

          textStyle: {
            fontWeight: "normal", //标题颜色
            color: "#fff",
            fontSize: 12,
          },
        },
        backgroundColor: "RGB(2,22,76)",
        color: ["#f56803", "#f9d000", "#00ffff", "#00ff54"],
        //animation: false,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line", // 默认为直线，可选为：'line' | 'shadow'
            lineStyle: {
              width: 1,
              type: "solid",
            },
          },
        },
        grid: {
          top: "5%",
          left: "5%",
          right: "5%",
          bottom: "5%",
          containLabel: true,
        },
        legend: {
          itemWidth: 12,
          itemHeight: 12,
          show: true,
          top: 15,
          right: 26,
          data: this.data.lb, //["待出", "配料", "领料", "完成"], //类别
          textStyle: {
            color: "RGB(193,223,255)",
          },
        },

        xAxis: [
          {
            // name: "工序",
            type: "category",
            data: this.data.gx, //["工序一", "工序二", "工序三", "工序四", "工序五"],
            axisTick: {
              alignWithLabel: true,
            },
            nameTextStyle: {
              color: "#fff",
            },
            axisLine: {
              lineStyle: {
                color: "RGB(47,68,114)",
              },
            },
            axisLabel: {
              textStyle: {
                color: "white",
              },
              margin: 20,
            },
          },
        ],
        yAxis: [
          {
            // name: "数量（*）",
            nameTextStyle: {
              color: "#fff",
              fontSize: 12,
            },
            type: "value",
            axisLabel: {
              textStyle: {
                color: "white",
              },
              formatter: "{value}",
            },

            axisTick: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "RGB(47,68,114)",
              },
            },
            splitNumber: 6,
            splitLine: {
              show: true,
              lineStyle: {
                color: "#0a3256",
              },
            },
          },
        ],
        series: [
          {
            name: "待出",
            type: "bar",
            //silent: true,
            barWidth: "4",
            //barGap: '-100%', // Make series be overlap
            data: this.data.dc,
            tooltip: {
              show: true,
            },
          },
          {
            name: "配料",
            type: "bar",
            //silent: true,
            barWidth: "4",
            //barGap: '-100%', // Make series be overlap
            data: this.data.pl,
            tooltip: {
              show: true,
            },
          },
          {
            name: "领料",
            type: "bar",
            //silent: true,
            barWidth: "4",
            //barGap: '-100%', // Make series be overlap
            data: this.data.ll,
            tooltip: {
              show: true,
            },
          },
          {
            name: "完成",
            type: "bar",
            //silent: true,
            barWidth: "4",
            //barGap: '-100%', // Make series be overlap
            data: this.data.wc,
            tooltip: {
              show: true,
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
    //观察option的变化
    data(newVal, oldVal) {
      if (newVal) {
        myChart.setOption(newVal);
      } else {
        myChart.setOption(oldVal);
      }
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
  height: 80%;
  width: 100%;
}
</style>
