<template>
  <div class="container">
    <div class="loadbg" v-show="flg">
      <div class="loading">
        <div class="imgdiv"><img src="~assets/title.png" /></div>
        <div class="imgdiv"><img src="~assets/title.png" /></div>
        <div class="imgdiv"><img src="~assets/title.png" /></div>
        <div class="imgdiv"><img src="~assets/title.png" /></div>
        <div class="imgdiv"><img src="~assets/title.png" /></div>
        <div class="imgdiv"><img src="~assets/title.png" /></div>
      </div>
    </div>
    <el-steps :active="0" finish-status="success" simple style="margin: 5px">
      <el-step title="产品入库单"></el-step>
      <!--<el-step title="制程"></el-step>
      <el-step title="配料"></el-step>
      <el-step title="领料"></el-step>
      <el-step title="检验"></el-step>-->
    </el-steps>

    <div class="tabels">
      <el-table
        ref="tableselectData"
        class="table"
        height="300"
        :data="tableData"
        highlight-current-row
      >
        <el-table-column type="selection" width="50"></el-table-column>

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
        <el-table-column property="Thumbnail" label="缩略图"></el-table-column>
        <el-table-column
          property="MaterialSpec"
          label="规格型号"
        ></el-table-column>

        <el-table-column property="Number" label="产品数量"></el-table-column>
        <el-table-column property="Purpose" label="用途"></el-table-column>
        <el-table-column
          property="ConfirmNumer"
          label="入库数"
        ></el-table-column>

        <el-table-column label="关于" min-width="80">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>创建人: {{ scope.row.creater }}</p>
              <p>创建日期: {{ scope.row.creatdate }}</p>

              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">...</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="入库" min-width="90" fixed="right">
          <template slot-scope="scope">
            <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
            <el-popover
              placement="left"
              width="300"
              trigger="click"
              :ref="`popover-${scope.$index}`"
            >
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="入库数">
                  <el-input v-model="form.ConfirmNumer"></el-input>
                </el-form-item>
              </el-form>
              <el-button
                style="float: right"
                type="primary"
                @click="handleEdits(scope)"
                >确定</el-button
              >
              <el-button
                style="float: right; margin: 0 10px"
                @click="scope._self.$refs[`popover-${scope.$index}`].doClose()"
                >取消</el-button
              >
              <el-button
                @click="firbtn"
                slot="reference"
                type="primary"
                icon="el-icon-edit"
                circle
                size="mini"
              ></el-button>
            </el-popover>
            <el-button
              type="primary"
              style="margin-left: 5px"
              icon="el-icon-reading"
              circle
              size="mini"
              plain
              @click="zk(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
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
        <el-step title="产品编码"></el-step>&nbsp;&nbsp;&nbsp;<font>{{
          MaterialNumber
        }}</font>
      </el-steps>
      <!-- <div class="animation"></div> -->

      <el-table
        ref="tableselectData"
        class="table"
        height="500"
        :data="tableData1"
        highlight-current-row
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column property="SN" label="SN"></el-table-column>
        <el-table-column
          property="MaterialNumber"
          label="产品编号"
        ></el-table-column>

        <el-table-column
          property="MaterialName"
          label="产品名称"
        ></el-table-column>

        <el-table-column property="Thumbnail" label="缩略图"></el-table-column>

        <el-table-column
          property="MaterialSpec"
          label="规格型号"
        ></el-table-column>

        <el-table-column property="Company" label="单位"></el-table-column>
        <el-table-column property="Number" label="数量"></el-table-column>

        <el-table-column label="关于" min-width="80">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>创建人: {{ scope.row.creater }}</p>
              <p>创建日期: {{ scope.row.creatdate }}</p>
              <p>备注: {{ scope.row.Remark }}</p>

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
import { getTime } from "common/time/getTime";
import { jsNums } from "common/utils/content";
export default {
  data() {
    return {
      MaterialNumber: "",
      LLNumber: "",
      flg: false,
      id: "",
      total: 0,
      tableData: [],
      tableData1: [],
      datas1: [],
      options: [],
      pyid: "",
      datatemp: [],
      form: {
        MaterialNumber: "", //产品编号
        MaterialName: "", //产品名称
        MaterialSpec: "", //规格型号
        Thumbnail: "", //缩略图
        Company: "", //单位
        Number: "0", //数量
        ConfirmNumer: "0", //入库数量
        Remark: "", //备注
        status: "0", //状态
        creater: "", //创建人
        creatdate: "", //创建时间
      },
    };
  },
  methods: {
    handleEdits1(row, vd, datatemp) {
      //添加到成品入库单
      this.insertGoodWarehousing(vd);
      //增加库存
      this.insertStore(row);
      //修改SN状态 status=3
      this.updateSat(row.MaterialNumber);
      //修改SN流转状态
      //let dt = this.datatemp;//当前页的status=2的产品
      datatemp.filter((item) => {
        if (item.MaterialNumber === row.MaterialNumber) {
          this.updateZZSN(item.SN);
        }
      });
    },
    async handleEdits(scope) {
      //if(this.form.ConfirmNumer==="0")return;
      scope._self.$refs[`popover-${scope.$index}`].doClose();
      if (scope.row.Number != this.form.ConfirmNumer) return; //校验数据
      //入库记录
      let vd = JSON.parse(JSON.stringify(scope.row));
      vd.ConfirmNumer = scope.row.Number;
      this.$delete(vd, "_id");
      this.$delete(vd, "SN");
      // this.handleEdits1(scope.row, vd, this.datatemp);
      this.$myloading({
        show: true,
      });
      this.$https({
        method: "post",
        url: "api/transaction/goodsWarehousingTransaction",
        data: {
          row: scope.row,
          Purpose: scope.row.Purpose,
          vd: vd,
          datatemp: this.datatemp,
          creater: sessionStorage.getItem("loginName"), //创建人
          creatdate: getTime(), //创建时间
        },
      })
        .then((res) => {
          if (res.status) {
            this.find();
            this.$myloading({
              show: false,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async updateZZSN(sn) {
      await this.$https({
        method: "post",
        url: "/api/apiModel/updateByWhere",
        data: {
          table: "ManufacturingExecution",
          form: {
            IsDeliverGoods: "1",
          },
          where: {
            SN: sn,
          },
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //入库记录
    async insertGoodWarehousing(v) {
      console.log(v);
      await this.$https({
        method: "post",
        url: "/api/apiModel/insert",
        data: {
          table: "goodsWarehousing",
          form: v,
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //增加库存
    async insertStore(row) {
      //判断仓库状态 stock
      await this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "stock",
          where: {
            MaterialNumber: row.MaterialNumber,
            // Purpose: "生产制造"
          },
        },
      })
        .then((res) => {
          console.log("当前仓库数据", res);
          if (res.length == 0) {
            //插入仓库数据 row
            this.insertStores(row);
          } else {
            let num = parseInt(res[0].Number) + parseInt(row.Number);
            let num1 = parseInt(res[0].SYNumber) + parseInt(row.Number);
            this.updateStores(row.MaterialNumber, num + "", num1 + "");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async insertStores(row) {
      let v = {
        MaterialNumber: row.MaterialNumber, //物料编号
        MaterialName: row.MaterialName, //物料名称
        MaterialSpec: row.MaterialSpec, //规格型号
        Thumbnail: row.Thumbnail, //缩略图
        Number: row.Number + "", //数量
        Location: row.Location, //库位
        MaterialSource: row.MaterialSource, //材料来源
        SYNumber: row.Number + "", //剩余数量
        Status: "0", //状态
        creater: sessionStorage.getItem("loginName"), //创建人
        creatdate: getTime(), //创建时间
      };
      await this.$https({
        method: "post",
        url: "/api/apiModel/insert",
        data: {
          table: "stock",
          form: v,
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async updateStores(MaterialNumber, Number, SYNumber) {
      await this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/apiModel/updateByWhere",
        data: {
          table: "stock",
          where: {
            MaterialNumber: MaterialNumber,
            // Purpose: "生产制造"
          },
          form: { Number: Number, SYNumber: SYNumber },
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    //修改SN状态
    updateSat(MaterialNumber) {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/apiModel/updateByWhere",
        data: {
          table: "ManufacturingExecution",
          where: { MaterialNumber: MaterialNumber, status: "2" },
          form: {
            status: "3",
          },
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
    },

    firbtn() {
      this.form.ConfirmNumer = "0";
    },
    de(scope) {
      this.LLNumber = scope.row.SurplusNumber;
    },
    //刷新界面
    newview() {
      this.find(); //找寻对应页面的数据
    },
    //根据page数查询对应数据
    find() {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "ManufacturingExecution",
          where: { status: "2" },
        },
      })
        .then((res) => {
          console.log("当前数据", res);
          this.datatemp = res;
          this.tableData = jsNums(
            JSON.parse(JSON.stringify(res)),
            "MaterialNumber",
            "Number"
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
    materialHB() {
      let tempc = [];
      this.datatemp.filter((item) => {
        if (tempc.indexOf(item.MaterialNumber) === -1) {
          tempc.push(item.MaterialNumber);
        }
      });
      console.log("....", tempc);
      this.tableData = [];
      for (let i = 0; i < tempc.length; i++) {
        let num = 0; //该产品数量
        let obj = {};

        for (let j = 0; j < this.datatemp.length; j++) {
          if (tempc[i] === this.datatemp[j].MaterialNumber) {
            ++num;
            if (num === 1) obj = JSON.parse(JSON.stringify(this.datatemp[j]));
          }
        }
        obj.Number = num + "";
        this.tableData.push(obj);
      }
    },

    //权限
    auth() {
      //   if (sessionStorage.getItem("loginName") == null) {
      //     this.$message("请先登陆");
      //     this.$router.push({ path: "/login" });
      //     return true;
      //   }
      //   if (this.name === sessionStorage.getItem("loginName")) {
      return false;
      // } else {
      //   this.$message("权限不足");
      //   return true;
      // }
    },

    zk(row) {
      this.MaterialNumber = row.MaterialNumber;
      this.tableData1 = [];
      this.findDetail();
    },
    findDetail() {
      this.tableData1 = this.datatemp.filter((item) => {
        return item.MaterialNumber === this.MaterialNumber;
      });
    },

    //////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////////
  },
  created() {
    this.newview();
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
</style>
