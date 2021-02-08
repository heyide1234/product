<template>
  <el-container>
    <div class="messtz" v-show="isMessShow" ref="messtzs">
      <span class="close" title="我已知晓！" @click="isMessShow = false"
        >X</span
      >
      <h2><font> 系统消息：</font></h2>
      <p>{{ messContent }}</p>
    </div>

    <el-header>
      <div class="top">
        <div class="navLogo" id="navLogo" :class="{ centers: iscenters }">
          <img src="~assets/logo.png" alt="" />
        </div>

        <div class="navBtn" v-show="flag" @click="showNav">
          <a>
            <img src="~assets/ifont/nav.png" alt="" srcset="" calss="nav-img" />
          </a>
        </div>
        <div class="top_nav">
          <transition name="slide-fade">
            <el-menu
              :default-active="activeIndex"
              :mode="modes"
              v-if="isShowNav"
              id="elmenu"
              :class="{ menuposition: flag }"
              background-color="#000000"
              text-color="#fff"
              active-text-color="#ffd04b"
              router
            >
              <el-submenu index="12">
                <template slot="title">主 页</template>
                <el-menu-item index="status">控制中心</el-menu-item>
                <el-menu-item index="message">订单状态</el-menu-item>

                <el-submenu index="12-1">
                  <template slot="title">通 用</template>
                  <el-menu-item index="materialRequisition"
                    >内部需求单</el-menu-item
                  >
                  <el-menu-item index="functionPicking">功能领料</el-menu-item>
                </el-submenu>
              </el-submenu>

              <el-submenu index="51">
                <template slot="title">销 售</template>
                <el-menu-item index="salesOrder">销售订单</el-menu-item>
                <el-menu-item index="salesInvoice">销售发货单</el-menu-item>
                <el-menu-item index="customerManager">客户管理</el-menu-item>
                <el-menu-item index="customerContacts">客户联系人</el-menu-item>
                <el-menu-item index="XSCollectionAndPaymentPlan"
                  >收款计划单</el-menu-item
                >
              </el-submenu>
              <el-submenu index="41">
                <template slot="title">计 划</template>
                <el-menu-item index="MaterialPlanDemand"
                  >材料明细需求计划单</el-menu-item
                >
                <el-menu-item index="MaterialDemand"
                  >物料采购计划单</el-menu-item
                >
              </el-submenu>
              <el-submenu index="61">
                <template slot="title">采 购</template>
                <el-menu-item index="PurchaseOrder">
                  预购单
                  <!-- 采购单 -->
                </el-menu-item>
                <el-menu-item index="IntransitOrders">
                  采购单
                  <!-- 在途单 -->
                </el-menu-item>
                <el-menu-item index="ReturnOrder">退货单</el-menu-item>

                <el-menu-item index="supplierManager">供应商管理</el-menu-item>
                <el-menu-item index="supplierContacts"
                  >供应商联系人</el-menu-item
                >
                <!-- <el-menu-item index="supplierMaterial"
                  >供应商物料单</el-menu-item
                >
                <el-menu-item index="supplierSeq">物料供应商</el-menu-item> -->
                <el-menu-item index="CGCollectionAndPaymentPlan"
                  >付款计划单</el-menu-item
                >
              </el-submenu>
              <el-submenu index="71">
                <template slot="title">品 管</template>
                <el-menu-item index="IncomingCheck">来料检验</el-menu-item>
                <el-menu-item index="productCheck">成品检验</el-menu-item>
              </el-submenu>

              <!-- <el-menu-item index="ManufacturingExecutionDetail"
                  >制造执行明细</el-menu-item
                > -->
              <!-- <el-submenu index="2-1">
                <template slot="title">制程清单</template>
                <el-menu-item index="workOrderHead">清单头</el-menu-item>
                <el-menu-item index="processList">制程清单</el-menu-item>
              </el-submenu>
             
              <el-submenu index="4">
                <template slot="title">制造任务</template>
                <el-menu-item index="picking">领料</el-menu-item>
                <el-menu-item index="examine">成品自检</el-menu-item>
              </el-submenu>
              <el-menu-item index="workOrderSummary">表单汇总</el-menu-item> -->

              <el-submenu index="21">
                <template slot="title">仓 库</template>
                <el-menu-item index="stock">库存管理</el-menu-item>
                <el-menu-item index="IntransitOrder">材料到货单</el-menu-item>
                <el-menu-item index="Warehousing">材料入库单</el-menu-item>
                <el-menu-item index="materialDelivery">材料出库单</el-menu-item>

                <el-menu-item index="goodsWarehousing">成品入库单</el-menu-item>
                <el-menu-item index="goodsDelivery">成品出库单</el-menu-item>
                <el-menu-item index="YYB">盈余表</el-menu-item>
                <!-- <el-menu-item index="stockOtherCRK">其他出入库</el-menu-item> -->

                <!-- <el-menu-item index="batching">配料</el-menu-item> -->
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">制 造</template>

                <el-menu-item index="ManufacturingPlan"
                  >制造计划单</el-menu-item
                >
                <el-menu-item index="ManufacturingExecution"
                  >制造执行单</el-menu-item
                >
              </el-submenu>
              <el-submenu index="31">
                <template slot="title">技 术</template>
                <el-menu-item index="materialclass">物料分类</el-menu-item>
                <el-menu-item index="unit">单位维护</el-menu-item>
                <el-menu-item index="orderPurpose"
                  >内部需求用途维护</el-menu-item
                >

                <el-menu-item index="basicMaterialList"
                  >物料基础资料</el-menu-item
                >
                <el-menu-item index="MaterialDetails">材料明细表</el-menu-item>
                <el-menu-item index="diagram">材料明细关系图</el-menu-item>
              </el-submenu>

              <el-submenu index="91">
                <template slot="title">设 置</template>
                <el-menu-item index="messContent">系统通知</el-menu-item>
                <el-menu-item index="others">资料相关</el-menu-item>
                <el-menu-item index="comm">公共数据</el-menu-item>

                <el-menu-item index="user">用户管理</el-menu-item>

                <el-menu-item index="auth">权限管理</el-menu-item>
                <el-menu-item index="role">角色管理</el-menu-item>
              </el-submenu>

              <!-- 撑起底部 -->
              <el-menu-item index="-999" class="endstart"></el-menu-item>
            </el-menu>
          </transition>
        </div>

        <div class="lang">
          <el-dropdown>
            <el-button icon="el-icon-more" circle class="exit"></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="printing">查询</el-dropdown-item>
              <el-dropdown-item @click.native="user">登陆</el-dropdown-item>
              <el-dropdown-item @click.native="exit">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-header>
    <el-main>
      <div style="height: 61px; width: 100%"></div>

      <!-- <mavon-editor v-model="value" /> -->

      <router-view></router-view>
      <div class="cons" v-if="isMessShowBK"></div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      messContent: "系统维护中。。。",
      value: "1234",
      activeIndex: "status",
      usernameq: "未登陆",
      modes: "horizontal",
      flag: false,
      isShowNav: false,
      iscenters: false,
      isMessShow: true,
      isMessShowBK: true,
      tempd: "",
    };
  },

  methods: {
    getfile() {
      window.open("http://www.w3school.com.cn", "hello");
    },
    user() {
      this.$router.push({ path: "/login" });
    },
    exit() {
      window.sessionStorage.removeItem("loginName");

      this.usernameq = "未登陆";
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    printing() {
      this.$router.push({ path: "./print" });
    },
    print() {
      this.$bus.$emit("print");
    },
    onsizeclientwidth() {
      if (document.body.clientWidth < 1255) {
        this.modes = "vertical";
        this.flag = true;
        this.iscenters = true;
        this.isShowNav = false;
      } else {
        this.modes = "horizontal";
        this.flag = false;
        this.isShowNav = true;
        this.iscenters = false;
      }
    },
    showNav() {
      this.isShowNav ? (this.isShowNav = false) : (this.isShowNav = true);
    },
    getmessContent() {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__messContent",
          dataBase: "base",
          where: {},
        },
      })
        .then((res) => {
          this.messContent = `【${res[0].creatdate}】${res[0].Content}`;
          if (res[0].Content === "systemclose") {
            this.isMessShowBK = true;
            this.isMessShow = true;
            this.messContent = "系统维护中......";
          } else if (res[0].Content === "close") {
            this.isMessShowBK = false;
            this.isMessShow = false;
          } else {
            this.isMessShowBK = false;
            if (this.tempd != this.messContent) {
              this.isMessShow = true;
            }
            this.tempd = this.messContent;
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    },
  },
  created() {
    // this.$https({
    //   //这里是你自己的请求方式、url和data参数
    //   method: "get",
    //   url: "/api/apiModel/getsesstionId",
    //   params: {},
    // })
    //   .then((res) => console.log("计数器==", res))
    //   .catch((err) => console.log(err));
  },
  mounted() {
    this.onsizeclientwidth();
    // 监听窗口大小
    window.onresize = () => {
      this.onsizeclientwidth();
    };
    this.isMessShowBK = false;
    setTimeout(() => {
      this.$refs.messtzs.style.top = "150px";
    }, 500);
    this.getmessContent();
    setInterval(() => {
      this.getmessContent();
    }, 30000);
  },
};
</script>
<style scoped lang='less'>
@media screen and (max-width: 300px) {
  ///...
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(-200px);
  opacity: 0;
}
.navLogo {
  height: 60px;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: 50%;
    width: 80%;
  }
}
.centers {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.navBtn {
  display: flex;
  height: 60px;
  width: 200px;
  border: none;
  background-color: transparent;
  float: left;
  font-size: 20px;
  text-align: start;
  align-items: center;

  img {
    height: 30px;
    width: 30px;
    margin-left: 18px;
  }
}
.menuposition {
  position: fixed;
  left: 0px;
  top: 60px;
  width: 200px;
  overflow: auto;
}
.el-menu.el-menu--horizontal {
  border-bottom: none;
}
.top {
  background-color: #000;
  display: flex;
  justify-content: space-between;
}

.topco > span {
  color: rgb(132, 136, 127);
}
.lang {
  width: 110px;
  text-align: end;
  padding-right: 10px;
  box-sizing: border-box;
  order: 3;
  height: 60px;
}
.exit {
  background-color: transparent;
  border: none;
  color: #f5f8fa;
  font-size: 18px;
  // margin-top: 5px;
  height: 60px;
}
.user {
  background-color: transparent;
  border: none;
  color: #f5f8fa;
  font-size: 18px;
}
.print {
  background-color: transparent;
  border: none;
  color: #f5f8fa;
  font-size: 18px;
}
.topco {
  height: 100%;
  line-height: 60px;
  color: rgb(238, 229, 229);
}
.el-header {
  /* box-shadow: rgba(0, 0, 0, 0.01) 0px 1px 1px, rgba(0, 0, 0, 0.08) 0px 10px 30px; */
  padding: 0px;
  /* height: 61px; */
  background-color: #000000;
  width: 100%;
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 100;
}
.top_nav {
  // overflow: auto;
}

.el-menu {
  height: 100%;
  overflow: auto;
  // margin-bottom: 50px;
  &:last-of-type {
    padding: 0;
  }
}

.el-main {
  background-color: #f5f8fa;
  padding: 0px;
}
.el-card {
  /* width: 100px;
  height: 70px; */

  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  transition: 0.3s;
  border-radius: 4px;
  overflow: hidden;
  text-align: center;
}
.cons {
  height: 600px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 120px;
  left: 0px;
  z-index: 9992;
}
.messtz {
  position: fixed;
  top: -300px;
  left: 50%;
  z-index: 9991;
  transform: translate(-50%, 0);
  width: 500px;
  height: 240px;
  border-radius: 2px;
  padding: 15px;
  background-color: rgba(63, 59, 59, 0.8);
  color: white;
  font-size: 14px;
  font-family: "宋体";
  transition: all 2s;
}
.messtz h2 {
  color: rgb(252, 106, 8);
}
.messtz .close {
  float: right;
  cursor: pointer;
  transform: scaleX(1.3);
  font-family: sans-serif;
  font-size: 11px;
}

.messtz::before {
  content: "";
  position: absolute;
  top: -150px;
  left: 50%;
  transform: translate(-50%, 0);
  height: 150px;
  width: 2px;
  background-color: rgba(63, 59, 59, 0.8);
}
font {
  color: red;
  font-weight: bold;
  animation: ss 0.8s steps(2) infinite;
}
@keyframes ss {
  from {
    color: yellow;
  }
  to {
    color: red;
  }
}
</style>
