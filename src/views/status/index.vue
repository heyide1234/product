<style scoped lang="less">
@media screen and(max-width: 1000px) and(min-width: 421px) {
  ////根据宽度不同设置flex布局
  .content-center {
    order: 1;
    width: 100% !important;
  }
  .content-left,
  .content-right {
    // flex: 1;
    width: 50% !important;
    order: 2;
  }
}
@media screen and(max-width: 420px) {
  ////根据宽度不同设置flex布局
  .content-center {
    order: 1;
    width: 100% !important;
  }
  .content-left,
  .content-right {
    // flex: 1;
    width: 100% !important;
    order: 2;
  }
}

.container {
  height: 100%;
  width: 100%;
  background-color: #15135c;
  color: #dfeafa;
  .top {
    position: absolute;
    height: 3.076923rem;
    width: 100%;
    line-height: 3.076923rem;
    // background-image: linear-gradient(-180deg, #0e0c47, #030330);
    background-color: #0e0c47;
    text-align: center;
    box-shadow: 0.153846rem 0.153846rem 0rem rgba(0, 0, 0, 0.3);
    a {
      position: absolute;
      right: 0.769231rem;
      font-size: 1.538462rem;
    }
  }
  .content {
    display: flex; //内容flex
    flex-wrap: wrap;
    height: 100%;
    box-sizing: border-box;
    padding-top: 3.461538rem;
  }
}
//内容两侧
.content-left,
.content-right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  // z-index: 999;
  // margin: 0px 0.384615rem;
  padding: 5px 0.384615rem;
  width: 25%;
  height: 53.846154rem;
  & > div {
    width: 100%;
    height: 32.5%;
    border-radius: 0.307692rem;
    box-shadow: 2px 2px 8px rgba(253, 252, 252, 0.2);
  }
}
//内容中间
.content-center {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 50%;
  height: 53.846154rem;
  padding: 5px 0.384615rem;
  box-sizing: border-box;
  // flex: 1;

  & > div:nth-of-type(1) {
    width: 100%;
    height: 14%;
    box-sizing: border-box;
    padding: 0.461538rem;
    background-color: #02164c;
    box-shadow: 2px 2px 8px rgba(253, 252, 252, 0.2);
  }
  & > div:nth-of-type(2) {
    width: 100%;
    height: 51%;
    z-index: 0;
    background: radial-gradient(#49478d, #15135c 40%, #15135c);
  }
  & > div:nth-of-type(3) {
    width: 100%;
    height: 32.5%;
    // background-color: #02164c;
    border-radius: 0.307692rem;
    box-shadow: 2px 2px 8px rgba(253, 252, 252, 0.2);
  }
}
//视图盒子
.divBox {
  position: relative;
  background-color: #02164c;
  box-sizing: border-box;
}
.divBox::before,
.divBox::after {
  content: "";
  position: absolute;
  height: 0.769231rem;
  width: 0.769231rem;
}
.divBox::before {
  top: 0px;
  left: 0px;
  border-top-left-radius: 0.307692rem;
  border-left: 0.230769rem solid #303e75;
  border-top: 0.230769rem solid #303e75;
}
.divBox::after {
  top: 0px;
  right: 0px;
  border-top-right-radius: 0.307692rem;
  border-top: 0.230769rem solid #303e75;
  border-right: 0.230769rem solid #303e75;
}
//添加圆角框
.divBox_border {
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 0.769231rem;
}
.divBox_border::after,
.divBox_border::before {
  content: "";
  position: absolute;
  height: 0.769231rem;
  width: 0.769231rem;
}
.divBox_border::before {
  top: 0px;
  left: 0px;
  border-bottom-left-radius: 0.307692rem;
  border-left: 0.230769rem solid #303e75;
  border-bottom: 0.230769rem solid #303e75;
}
.divBox_border::after {
  top: 0px;
  right: 0px;
  border-bottom-right-radius: 0.307692rem;
  border-right: 0.230769rem solid #303e75;
  border-bottom: 0.230769rem solid #303e75;
}

.content-center-top-top {
  border: 1px #24214b solid;
  border-radius: 0.307692rem;
  height: 55%;
  margin: 0.153846rem;
  display: flex;
  position: relative;
  text-align: center;
  line-height: 3.846154rem;
  font-family: pictos;
  // font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 2.153846rem;
  color: rgb(243, 243, 157);
  font-weight: 700;
}

.content-center-top-bottom {
  margin: 0.153846rem;
  display: flex;
  text-align: center;
  line-height: 2.307692rem;
  font-family: "宋体";
  font-size: 1.153846rem;
  color: #aab5ce;
}
.content-center-top-top > div,
.content-center-top-bottom > div {
  flex: 1;
}
.content-center-top-top > div:nth-of-type(2) {
  border-left: 1px solid #24214b;
}
//年收付率
.LSFL {
  height: 100%;
  width: 100%;
  display: flex;
}
.LSFL:first-child,
.LSFL:last-child {
  flex: 1;
}
//视图标题
h4 {
  line-height: 0rem;
  text-align: center;
  font-weight: 400;
  font: 1rem;
}
.sjs {
  font-size: 0.8em;
  margin-right: 0.384615rem;
}
.animaJEF {
  position: relative;
}
.animaJE {
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translate(-50%, 0);
  opacity: 1;

  animation: animaJE 10s infinite;
}
@keyframes animaJE {
  0% {
    top: 3.076923rem;
    opacity: 0;
  }
  20% {
    top: 0px;
    opacity: 1;
  }
  80% {
    top: 0px;
    opacity: 1;
  }
  100% {
    top: -3.076923rem;
    opacity: 0;
  }
}
</style>
<template>
  <div class="container">
    <div class="top">
      <big>控制面板</big>
      <a @click="goHome"><i class="el-icon-s-home"></i></a>
    </div>
    <div class="content">
      <div class="content-left">
        <div class="divBox">
          <div class="divBox_border"></div>
          <h4>年收付率</h4>
          <div class="LSFL">
            <sssk :datas="sssk" class="LSFLs"></sssk>
            <cgfk :datas="cgfk" class="LSFLs"></cgfk>
          </div>
        </div>
        <div class="divBox">
          <div class="divBox_border"></div>
          <h4>销售订单</h4>
          <!-- sssks -->
          <nsfmx :dataB="sssks"></nsfmx>
        </div>
        <div class="divBox">
          <div class="divBox_border"></div>
          <h4>采购订单</h4>
          <!-- cgfks -->
          <nsfmx :dataB="cgfks"></nsfmx>
        </div>
      </div>
      <div class="content-center">
        <div>
          <div class="divBox content-center-top-top">
            <div>
              <span class="sjs">￥</span><span>{{ AnnualTarget }}</span>
            </div>
            <div class="animaJEF">
              <div class="animaJE">
                <span class="sjs">￥</span><span>{{ xswce }}</span>
              </div>
            </div>
          </div>
          <div class="content-center-top-bottom">
            <div>计划额</div>
            <div>完成额</div>
          </div>
        </div>

        <div>
          <xzmm></xzmm>
        </div>
        <div class="divBox">
          <div class="divBox_border"></div>
          <h4>订单状态</h4>
          <ddzt></ddzt>
        </div>
      </div>
      <div class="content-right">
        <div class="divBox">
          <div class="divBox_border"></div>
          <h4>制造状态</h4>
          <myv :datas="zdt"></myv>
        </div>
        <div class="divBox">
          <div class="divBox_border"></div>
          <h4>售后状态</h4>
          <myv :data="zdt"></myv>
        </div>
        <div class="divBox">
          <div class="divBox_border"></div>
          <h4>库存盈余</h4>
          <kcpy :dataB="yyb" :dataH="yybh"></kcpy>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      AnnualTarget: "",
      yyb: [], //盈余表内容
      yybh: [], //盈余表头部
      sssk: {}, //销售收款
      cgfk: {}, //采购付款
      sssks: [], //销售收款明细
      cgfks: [], //采购付款明细
      xswce: 0, //销售完成额
      zdt: {},
    };
  },
  methods: {
    goHome() {
      this.$router.push({ name: "message" });
    },
    //获取盈余表信息
    async YYBfind() {
      await this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "YYB",
          where: {},
        },
      })
        .then((res) => {
          let c = 0;
          res.map((item) => {
            if (item.Number != "0") {
              c++;
              this.yyb.push({
                index: c + "",
                MaterialNumber: item.MaterialNumber,
                MaterialName:
                  item.MaterialName.length > 7
                    ? item.MaterialName.substring(0, 7) + "..."
                    : item.MaterialName,
                Number: item.Number,
              });
            }
          });
          this.yybh = ["序号", "物料编码", "物料名称", "数量"];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //销售收付率
    async queryXSdata() {
      let Y = new Date().getFullYear();
      // 查询该订单下的所有订单号和金额
      let ress = [];
      await this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "salesOrder",
          where: {
            OrderNumber: {
              $gte: "900000000000",
              $lt: "999999999999",
            },
            creatdate: {
              $gte: Y + "/01/01 00:00:00",
              $lt: Y + "/12/31 23:59:59",
            },
          },
        },
      })
        .then((res) => {
          ress = res;
        })
        .catch((err) => {
          console.log(err);
        });

      for (let i = 0; i < ress.length; i++) {
        if (ress[i].TotalAmount == undefined) continue;

        let tempObje = {};
        tempObje.OddNumbers = ress[i].OrderNumber; //订单号
        tempObje.TotalAmount = ress[i].TotalAmount; //订单金额

        let completeNum = 0; //完成数
        await this.$https({
          method: "get",
          url: "/api/apiModel/find",
          params: {
            table: "CollectionAndPaymentPlan",
            where: {
              DepClass: "XS",
              OddNumbers: tempObje.OddNumbers,
              status: "1",
              AppointedTime: {
                $gte: Y + "/01/01 00:00:00",
                $lt: Y + "/12/31 23:59:59",
              },
            },
          },
        })
          .then((res) => {
            console.log(res);
            for (let j = 0; j < res.length; j++) {
              completeNum += parseFloat(res[j].PlannedAmount);
            }
          })
          .catch((err) => {
            console.log(err);
          });

        tempObje.completeNum = completeNum + "";
        tempObje.completeLv = parseInt(
          (parseFloat(tempObje.completeNum) * 100) /
            parseFloat(tempObje.TotalAmount)
        );
        this.sssks.push(tempObje);
      }
    },
    //采购收付率
    async queryCGdata() {
      let Y = new Date().getFullYear();
      // 查询该订单下的所有订单号和金额
      let ress = [];
      await this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "CGDhead",
          where: {
            OrderNumber: {
              $gte: "900000000000",
              $lt: "999999999999",
            },
            creatdate: {
              $gte: Y + "/01/01 00:00:00",
              $lt: Y + "/12/31 23:59:59",
            },
          },
        },
      })
        .then((res) => {
          ress = res;
        })
        .catch((err) => {
          console.log(err);
        });

      for (let i = 0; i < ress.length; i++) {
        if (!ress[i].TotalAmount) continue;

        let tempObje = {};
        tempObje.OddNumbers = ress[i].PurchaseNumber; //订单号
        tempObje.TotalAmount = ress[i].TotalAmount; //订单金额

        let completeNum = 0; //完成数
        await this.$https({
          method: "get",
          url: "/api/apiModel/find",
          params: {
            table: "CollectionAndPaymentPlan",
            where: {
              DepClass: "CG",
              OddNumbers: tempObje.OddNumbers,
              status: "1",
              AppointedTime: {
                $gte: Y + "/01/01 00:00:00",
                $lt: Y + "/12/31 23:59:59",
              },
            },
          },
        })
          .then((res) => {
            console.log(res);
            for (let j = 0; j < res.length; j++) {
              completeNum += parseFloat(res[j].PlannedAmount);
            }
          })
          .catch((err) => {
            console.log(err);
          });

        tempObje.completeNum = completeNum + "";
        tempObje.completeLv = parseInt(
          (parseFloat(tempObje.completeNum) * 100) /
            parseFloat(tempObje.TotalAmount)
        );
        this.cgfks.push(tempObje);
      }
    },
  },
  components: {
    sssk: () => import("./sssk"), //销售收款
    cgfk: () => import("./cgfk"), //采购付款
    ddzt: () => import("./ddzt"), //订单状态
    myv: () => import("./1"),
    xzmm: () => import("./xzmm"), //旋转木马
    kcpy: () => import("./kcpy"), //库存盘盈

    nsfmx: () => import("./nsfmx"), //年收付明细率
  },
  async created() {
    this.sssk = { value: 0, lx: "销售收款" };
    this.cgfk = { value: 0, lx: "采购付款" };
    this.YYBfind(); //库存盘盈查询
    await this.queryXSdata(); //销售收款数据查询
    await this.queryCGdata(); //采购付款数据查询
    let ssT = 0,
      cgT = 0,
      ssTs = 0,
      cgTs = 0;
    for (let i = 0; i < this.sssks.length; i++) {
      ssT += parseFloat(this.sssks[i].TotalAmount);
      ssTs += parseFloat(this.sssks[i].completeNum);
    }
    for (let j = 0; j < this.cgfks.length; j++) {
      cgT += parseFloat(this.cgfks[j].TotalAmount);
      cgTs += parseFloat(this.cgfks[j].completeNum);
    }
    this.xswce = ssTs; //销售完成额
    let s = ssTs / ssT || 0;
    let c = cgTs / cgT || 0;
    console.log(
      "销售收款",
      parseInt((ssTs / ssT) * 100),
      "采购付款",
      parseInt((cgTs / cgT) * 100)
    );

    this.sssk = { value: parseInt(s * 100), lx: "销售收款" };
    this.cgfk = { value: parseInt(c * 100), lx: "采购付款" };
  },

  mounted() {
    document.documentElement.style.backgroundColor = "#15135c";
    //制造在制

    this.$https({
      //这里是你自己的请求方式、url和data参数
      method: "get",
      url: "/api/apiModel/find",
      params: {
        table: "ManufacturingExecution",
        where: {
          IsDeliverGoods: {
            $in: ["制造领料", "制造执行", "制造品检", "制造待入库"],
          },
        },
      },
    })
      .then((res) => {
        console.log("当前数据", res);
        this.zdt.values = [];
        this.zdt.orderNumber = [];
        for (let i = 0; i < res.length; i++) {
          if (this.zdt.orderNumber.indexOf(res[i].OrderNumber) == -1) {
            this.zdt.orderNumber.push(res[i].OrderNumber);
          }
        }
        for (let j = 0; j < this.zdt.orderNumber.length; j++) {
          this.zdt.values.push(
            res.filter((item) => {
              return item.OrderNumber == this.zdt.orderNumber[j];
            }).length
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // window.onresize = function () {
    //   document.documentElement.style.backgroundColor = "#15135c";
    // };
    this.$https({
      method: "get",
      url: "/api/apiModel/find",
      params: {
        table: "__comm",
        where: { KeyName: "AnnualTarget" },
        dataBase: "base",
      },
    })
      .then((res) => {
        console.log(res);
        this.AnnualTarget = res[0].values;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

