<template>
  <div :style="{height:clientHeight/4+'px',width:clientWidth+'px'}">
    <div ref="main1" class="main1"></div>
  </div>
</template>

<script>
var echarts = require("echarts");
var myChart = "";
export default {
  props: {
    data: {
      type: Object,
      default: () => ({
        title: "工序0",
        lh: ["料号1", "料号2", "料号3", "料号4", "料号5", "料号6", "料号7"], ///料号
        zj: [393, 438, 485, 631, 689, 824, 987, 987], //总计
        sj: [200, 382, 102, 267, 186, 315, 316, 987] //实际
      })
    }
  },
  data() {
    return {
      option: {
        backgroundColor: "#05224d",
        color: ["#1dfff1", "#006699", "#4cabce", "#e5323e"], //标题
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line", // 默认为直线，可选为：'line' | 'shadow'
            lineStyle: {
              width: 1,
              type: "solid"
            }
          }
        },
        grid: {
          top: "25%",
          left: "1%",
          right: "1%",
          bottom: "8%",
          containLabel: true
        },
        legend: {
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 10,
          // top: 0,
          // right: 26,
          data: ["总计", this.data.title],
          textStyle: {
            color: "#f9f9f9",
            borderColor: "#fff"
          }
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: true,
            axisLine: {
              //坐标轴轴线相关设置。数学上的x轴
              show: true,
              lineStyle: {
                color: "#f9f9f9"
              }
            },
            axisLabel: {
              //坐标轴刻度标签的相关设置
              textStyle: {
                color: "#d1e6eb",
                margin: 15
              }
            },
            axisTick: {
              show: false
            },
            data: this.data.lh //["1月", "2月", "3月", "4月", "5月", "6月", "7月"]
          }
        ],
        yAxis: [
          {
            type: "value",
            min: 0,
            // max: 140,
            splitNumber: 6,
            splitLine: {
              show: true,
              lineStyle: {
                color: "#0a3256"
              }
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              margin: 20,
              textStyle: {
                color: "#d1e6eb"
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: "总计",
            type: "line",
            // smooth: true, //是否平滑曲线显示
            //symbol: "circle", // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            symbol: "emptyCircle",
            symbolSize: 6,
            lineStyle: {
              normal: {
                color: "#28ffb3" // 线条颜色
              },
              borderColor: "#f0f"
            },
            label: {
              show: true,
              position: "top",
              textStyle: {
                color: "#fff"
              }
            },
            itemStyle: {
              normal: {
                color: "#28ffb3",
                lineStyle: {
                  width: 0.5, // 设置线宽
                  type: "dotted" //'dotted'虚线 'solid'实线
                }
              }
            },
            tooltip: {
              show: true
            },
            areaStyle: {
              //区域填充样式
              normal: {
                //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(0,154,120,1)"
                    },
                    {
                      offset: 1,
                      color: "rgba(0,0,0, 0)"
                    }
                  ],
                  false
                ),
                shadowColor: "rgba(53,142,215, 0.9)", //阴影颜色
                shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
              }
            },
            data: this.data.zj //[393, 438, 485, 631, 689, 824, 987]
          },
          {
            name: this.data.title,
            type: "bar",
            barWidth: 10,

            tooltip: {
              show: true
            },
            label: {
              show: true,
              position: "top",
              textStyle: {
                color: "#fff"
              }
            },
            itemStyle: {
              normal: {
                color: params => {
                  var colorList = [
                    "#10cdff",
                    "#10cdff",
                    "#12daff",
                    "#15ebff",
                    "#17f8ff",
                    "#1cfffb",
                    "#1dfff1",
                    "green"
                  ];

                  if (
                    this.data &&
                    this.data.zj[params.dataIndex] ===
                      this.data.sj[params.dataIndex]
                  ) {
                    params.dataIndex = 7;
                  } else {
                    params.dataIndex = 6; //设置个的颜色
                  }
                  //params.dataIndex = 6; //设置个的颜色
                  return colorList[params.dataIndex];
                }
              }
            },
            data: this.data.sj //[200, 382, 102, 267, 186, 315, 316]
          }
        ]
      }
    };
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    myChart = echarts.init(this.$refs.main1);
    // 绘制图表
    myChart.setOption(this.option);
  },
  computed: {
    clientHeight() {
      // return document.body.clientHeight / 10;
      return window.screen.availHeight - 135;
    },
    clientWidth() {
      // return document.body.clientHeight / 10;
      return window.screen.availWidth;
    }
  },
  watch: {
    //观察option的变化
    data(newVal, oldVal) {
      if (newVal) {
        myChart.setOption(newVal);
      } else {
        myChart.setOption(oldVal);
      }
    }
  }
};
</script>
<style scoped>
.main1 {
  height: 100%;
  width: 100%;
}
</style>
