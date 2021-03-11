<template>
  <div class="container">
    <el-steps :active="0" finish-status="success" simple style="margin: 5px">
      <el-step title="在制产品"></el-step>
      <!--<el-step title="制程"></el-step>
      <el-step title="配料"></el-step>
      <el-step title="领料"></el-step>
      <el-step title="检验"></el-step>-->
    </el-steps>

    <div class="tabels">
      <el-table
        ref="tableselectData"
        class="table"
        height="120"
        :data="tableData"
        highlight-current-row
      >
        <el-table-column type="selection" width="50"></el-table-column>

        <el-table-column property="status" label="状态"></el-table-column>
        <el-table-column property="ZZJH" label="执造计划数"></el-table-column>
        <el-table-column label="制造领料">
          <template slot-scope="scope">
            <el-button @click="finddts('制造领料')">{{
              scope.row.ZZLL
            }}</el-button>
          </template>
        </el-table-column>

        <el-table-column label="制造执行"
          ><template slot-scope="scope">
            <el-button @click="finddts('制造执行')">{{
              scope.row.ZZZX
            }}</el-button>
          </template></el-table-column
        >
        <el-table-column label="制造品检"
          ><template slot-scope="scope">
            <el-button @click="finddts('制造品检')">{{
              scope.row.ZZPJ
            }}</el-button>
          </template></el-table-column
        >
        <el-table-column label="制造待入库"
          ><template slot-scope="scope">
            <el-button @click="finddts('制造待入库')">{{
              scope.row.ZZDRK
            }}</el-button>
          </template></el-table-column
        >
        <el-table-column label="制造已入库"
          ><template slot-scope="scope">
            <el-button @click="finddts('制造已入库')">{{
              scope.row.ZZYRK
            }}</el-button>
          </template></el-table-column
        >
      </el-table>
      <div class="df">
        <!-- <el-pagination
          @current-change="handleCurrentChange"
          :page-size="10"
          layout=" prev, pager, next"
          :total="total"
        ></el-pagination> -->
      </div>
      <el-steps
        :active="0"
        finish-status="success"
        simple
        style="margin: 40px 5px 5px 5px"
      >
        <el-step title="产品明细"></el-step>&nbsp;&nbsp;&nbsp;<font></font>
      </el-steps>
      <!-- <div class="animation"></div> -->

      <el-table
        ref="tableselectData"
        class="table"
        height="300"
        :data="tableData1"
        highlight-current-row
      >
        <el-table-column type="selection" width="50"></el-table-column>

        <el-table-column property="SN" label="SN"></el-table-column>

        <el-table-column
          property="IsDeliverGoods"
          label="在制状态"
        ></el-table-column>
        <el-table-column
          property="OrderNumber"
          label="订单编号"
        ></el-table-column>
        <el-table-column
          property="MaterialNumber"
          label="产品编号"
        ></el-table-column>
        <el-table-column
          property="MaterialName"
          label="产品名称"
        ></el-table-column>
        <el-table-column property="Thumbnail" label="缩略图">
          <template slot-scope="scope">
            <img class="bigImg" :src="scope.row.Thumbnail" alt="" />
          </template>
        </el-table-column>
        <el-table-column
          property="MaterialSpec"
          label="规格型号"
        ></el-table-column>
        <el-table-column property="Number" label="数量"></el-table-column>
        <el-table-column property="Purpose" label="用途"></el-table-column>
        <el-table-column label="关于" min-width="80">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>创建人: {{ scope.row.creater }}</p>
              <p>创建日期: {{ scope.row.creatdate }}</p>
              <p>说明: {{ scope.row.Remark }}</p>

              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">...</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
// import { getTime } from "common/time/getTime";
export default {
  data() {
    return {
      tableData: [],
      tableData1: [],
    };
  },
  created() {
    this.newview();
  },
  methods: {
    finddts(wheres) {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "ManufacturingExecution",
          where: {
            IsDeliverGoods: wheres,
          },
        },
      })
        .then((res) => {
          console.log("当前数据", res);
          this.tableData1 = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //刷新界面
    newview() {
      this.find(); //找寻对应页面的数据
    },
    //根据page数查询对应数据
    find() {
      this.$myloading({
        show: true,
      });
      this.$https({
        method: "post",
        url: "api/transaction/ManufacturingZZTransaction",
        data: {},
      })
        .then((res) => {
          console.log("res===", res);
          if (res.status) {
            this.tableData = res.data;
            this.$myloading({
              show: false,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////////
  },
};
</script>
<style scoped>
.df {
  float: right;
  margin-right: 5px;
}
.tabels {
  width: 100%;
  background-color: white;
}
.table {
  width: 100%;
  max-height: 470px;
}
.table1 {
  width: 98%;
  margin: 0 auto;
}
.yc {
  margin: 4px;
}
.container {
  width: 100%;
  margin: 0;
}
.tableData {
  min-width: 400px;
}
.el-card {
  width: 800px;
  margin-bottom: 20px;
  margin: 0px auto;
  padding: 20px;
}
.el-input {
  margin: 0;
}
font {
  color: rgb(77, 150, 3);
  font-weight: bold;
  animation: ss 5s infinite;
}
@keyframes ss {
  from {
    color: rgb(205, 226, 12);
  }
  to {
    color: rgb(247, 4, 4);
  }
}

body {
  perspective: 900px;
}
.loadbg {
  height: 100%;
  width: 100%;
  background-color: rgba(10, 10, 10, 0.2);
  position: absolute;
  z-index: 999;
}
.loading {
  height: 40px;
  width: 40px;
  position: absolute;
  background-color: silver;
  left: 50%;
  top: 40%;
  transform: translateX(-50%) translateY(-50%);
  text-align: center;
  font-weight: bold;
  transform-style: preserve-3d;
  animation: xz 5s infinite linear;
}

.loading .imgdiv {
  height: 40px;
  width: 40px;
  opacity: 0.7;
  position: absolute;
  background-color: rgb(94, 88, 88);
}
.loading .imgdiv:nth-child(1) {
  transform: rotateY(90deg) translateZ(20px);
}
.loading .imgdiv:nth-child(2) {
  transform: rotateY(-90deg) translateZ(20px);
}
.loading .imgdiv:nth-child(3) {
  transform: rotateX(90deg) translateZ(20px);
}
.loading .imgdiv:nth-child(4) {
  transform: rotateX(-90deg) translateZ(20px);
}
.loading .imgdiv:nth-child(5) {
  transform: rotateY(180deg) translateZ(20px);
}
.loading .imgdiv:nth-child(6) {
  transform: rotateY(0deg) translateZ(20px);
}

.loading .imgdiv img {
  height: 40px;
  width: 40px;
  vertical-align: top;
}
@keyframes xz {
  from {
    transform: rotateX(0) rotateZ(0);
  }
  to {
    transform: rotateX(1turn) rotateZ(1turn);
  }
}
.bigImg {
  height: 20px;
  width: 20px;
}
.bigImg:hover {
  height: 280px;
  width: 280px;
  background-color: teal;
  position: absolute;
  z-index: 9999;
  border: 3px solid rgb(45, 228, 8);
}
</style>
