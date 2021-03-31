<template>
  <div class="container">
    <el-steps :active="0" finish-status="success" simple style="margin: 5px">
      <el-step title="成品出库单"></el-step>
    </el-steps>

    <div class="tabels">
      <el-table
        ref="tableselectData"
        class="table"
        height="500"
        :data="tableData"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column label="订单编号" property="OrderNumber">
        </el-table-column>
        <el-table-column
          property="MaterialNumber"
          label="产品编号"
        ></el-table-column>
        <el-table-column
          property="MaterialName"
          label="产品名称"
        ></el-table-column>

        <el-table-column
          property="MaterialPrice"
          label="产品价格"
        ></el-table-column>

        <el-table-column
          property="CustomerMaterialNumber"
          label="客户物料编号"
        ></el-table-column>

        <el-table-column
          property="CustomerMaterialName"
          label="客户物料名称"
        ></el-table-column>

        <el-table-column property="Number" label="出库数量"></el-table-column>

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
        <el-table-column label="出库" min-width="90" fixed="right">
          <template slot-scope="scope">
            <!-- <el-button size="mini" v-preventReClick  @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
            <el-popover
              placement="left"
              width="300"
              trigger="click"
              :ref="`popover-${scope.$index}`"
            >
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="出库数">
                  <el-input v-model="form.DeliverGoods"></el-input>
                </el-form-item>
              </el-form>
              <el-button
                style="float: right"
                type="primary"
                v-preventReClick
                @click="handleEdit(scope)"
                >确定</el-button
              >
              <el-button
                style="float: right; margin: 0 10px"
                v-preventReClick
                @click="scope._self.$refs[`popover-${scope.$index}`].doClose()"
                >取消</el-button
              >
              <el-button
                :disabled="scope.row.status === '1'"
                slot="reference"
                type="primary"
                icon="el-icon-edit"
                circle
                size="mini"
              ></el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getTime } from "common/time/getTime";
export default {
  data() {
    return {
      operation: "", //当前操作切换
      pagenums: 0,
      tableData1: [],

      form: {
        OrderNumber: "", //订单编号
        MaterialNumber: "", //产品编号
        MaterialName: "", //产品名称
        MaterialPrice: "", //产品价格
        CustomerMaterialNumber: "", //客户物料编号
        CustomerMaterialName: "", //客户物料名称
        DeliverGoodsApply: "", //产品出库申请数
        DeliverGoods: "", //出库数量
        status: "", //状态
        creater: "", //创建人
        creatdate: "", //创建时间
      },
      total: 0,
      id: "",
      name: "",
      search: "",
      dialogFormVisible: false,
      tableData: [],
      mums: "",
      tempdata: [],
      tempdatas: [],
      templatnum: "",
    };
  },
  methods: {
    async handleEdit(scope) {
      console.log("出货数。。");
      console.log(scope.row);
      ////////////
      //Inventory: "0"
      this.id = scope.row._id;

      let cods = {
        DeliverGoods: this.form.DeliverGoods,
        status: "0",
      };

      //减去库存数

      await this.findStockNum(parseInt(scope.row.MaterialNumber));
      console.log("库存数===", this.templatnum);

      let csds = parseInt(this.templatnum) - parseInt(this.form.DeliverGoods);
      if (csds < 0) return;
      this.updateStockNum(csds + "", parseInt(scope.row.MaterialNumber));

      this.updategoodsDelivery(cods);

      this.searchs();
      scope._self.$refs[`popover-${scope.$index}`].doClose();
    },
    //查询库存数
    async findStockNum(v) {
      await this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "stock",
          where: { MaterialNumber: v },
        },
      })
        .then((res) => {
          console.log(res);
          if (res.length > 0) {
            this.templatnum = res[0].Number;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //更新库存数
    updateStockNum(v, n) {
      this.$https({
        method: "post",
        url: "/api/apiModel/updateByWhere",
        data: {
          table: "stock",
          form: { Number: v },
          where: { MaterialNumber: n },
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //生成成品出货单
    insertcpch(v) {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/apiModel/insert",
        data: {
          table: "goodsDelivery",
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
    updategoodsDelivery(cod) {
      this.$https({
        method: "post",
        url: "/api/apiModel/update",
        data: {
          table: "goodsDelivery",
          form: cod,
          id: this.id,
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    searchs() {
      console.log(".....input", this.search);
      this.findOrderNumber();
    },
    findOrderNumber() {
      //明细请求
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "goodsDelivery",
          where: {},
        },
      })
        .then((res) => {
          console.log(res);
          this.tableData = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //库存查询
    async findstock(res1) {
      this.tempdatas = res1;
      for (let i = 0; i < this.tempdatas.length; i++) {
        await this.$https({
          method: "get",
          url: "/api/apiModel/find",
          params: {
            table: "stock",
            where: {
              MaterialNumber: parseInt(this.tempdatas[i].MaterialNumber),
            },
          },
        })
          .then((res) => {
            if (res.length === 0) {
              this.tempdatas[i].Inventory = "0";
            } else {
              this.tempdatas[i].Inventory = res[0].Number;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }

      this.tableData1 = this.tempdatas;
    },
    //20200927001
    // 数据添加
    add(v) {
      //  if (this.auth()) return;
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/apiModel/insert",
        data: {
          table: "PurchaseOrder",
          form: v,
        },
      })
        .then(function (res) {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
    },

    //添加事件
    handleAdd() {
      this.operation = "add";
      this.form = {};
      this.dialogFormVisible = true;
    },
    //编辑事件
    Edit(scope) {
      this.operation = "update";

      this.id = scope.row._id;

      this.form.PlanNumber = scope.row.PlanNumber;
      this.form.MaterialNumber = scope.row.MaterialNumber; //物料编号
      let fs = {
        ShouldNumber: this.form.ShouldNumber,
        ActualPrice: this.form.ActualPrice,
        status: "1",
      };
      console.log("fs....", fs);
      //修改采购单
      this.update(fs);
      this.insertyyb(); //盈余表
      let csd = {
        OrderNumber: scope.row.OrderNumber, //订单编号
        MaterialNumber: scope.row.MaterialNumber + "", //物料编号
        PlanNumber: scope.row.PlanNumber,
        ShouldNumber: this.form.ShouldNumber,
        StateNumber: "0", //状态数量
      };
      this.insertyyztb(csd); //盈余状态表
      let tempsd = JSON.parse(JSON.stringify(scope.row));
      tempsd.ActualNumber = "";
      tempsd.ActualNumbertotal = "0";
      tempsd.ShouldNumber = this.form.ShouldNumber;
      tempsd.ActualPrice = this.form.ActualPrice;
      tempsd.status = "0";
      tempsd.creatdate = getTime(); //创建时间
      this.$delete(tempsd, "_id");
      this.ztinsert(tempsd);
      //this.sclljyd(tempsd);

      scope._self.$refs[`popover-${scope.$index}`].doClose();
      this.findOrderNumber();
    },

    //在途单插入
    ztinsert(v) {
      this.$https({
        method: "post",
        url: "/api/apiModel/insert",
        data: {
          table: "IntransitOrder",
          form: v,
        },
      })
        .then((res) => {
          console.log(res);
          //将溢出的采购数插入盈余表中
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //数据修改
    update(v) {
      //   if (this.auth()) return;
      this.$https({
        method: "post",
        url: "/api/apiModel/update",
        data: {
          table: "PurchaseOrder",
          form: v,
          id: this.id,
        },
      })
        .then((res) => {
          console.log(res);
          console.log("insertyyb......");
          //将溢出的采购数插入盈余表中
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //盈余状态表

    insertyyztb(v) {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/apiModel/insert",
        data: {
          table: "PurchaseSurplusState",
          form: v,
        },
      })
        .then(function (res) {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    //盈余表
    async insertyyb() {
      //实际数量减去计划数量
      let cs =
        parseInt(this.form.ShouldNumber) - parseInt(this.form.PlanNumber);
      console.log("cs...", cs);
      if (cs > 0) {
        await this.findyy();
        console.log("tempdata...", this.tempdata);
        if (this.tempdata.length > 0) {
          let nu = parseInt(this.tempdata[0].Number) + cs;
          console.log("nu修改:" + nu);
          this.updateyy(nu + "", this.tempdata[0]._id);
        } else {
          console.log("nu插入:");
          this.insertyy(cs + ""); //表数据不存在添加新行
        }
      }
    },
    async findyy() {
      await this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "PurchaseSurplus",
          where: {
            MaterialNumber: this.form.MaterialNumber,
          },
        },
      })
        .then((res) => {
          console.log(res);
          this.tempdata = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    insertyy(cs) {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/apiModel/insert",
        data: {
          table: "PurchaseSurplus",
          form: {
            MaterialNumber: this.form.MaterialNumber,
            Number: cs,
          },
        },
      })
        .then(function (res) {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    updateyy(nu, id) {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/apiModel/update",
        data: {
          table: "PurchaseSurplus",
          form: {
            Number: nu,
          },
          id: id,
        },
      })
        .then(function (res) {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
    },

    //同时生成来料检验单
    sclljyd(rows) {
      console.log(rows);
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/apiModel/insert",
        data: {
          table: "IncomingCheck",
          form: rows,
        },
      })
        .then(function (res) {
          console.log("生成材料检验单", res);
        })
        .catch(function (err) {
          console.log(err);
        });
    },

    //选择展示页数据
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenums = (val - 1) * 10;
      console.log("---====---", this, this.pagenums);
      this.findByPageNum();
    },

    /////crud

    //根据page数查询对应数据
    findByPageNum() {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/workOrderHead/findByPageNum",
        params: {
          UserName:
            sessionStorage.getItem("loginName") === null
              ? {}
              : { creater: sessionStorage.getItem("loginName") },
          PageNum: this.pagenums,
        },
      })
        .then((res) => {
          console.log(res);
          this.tableData = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //权限
    auth() {
      if (sessionStorage.getItem("loginName") == null) {
        this.$message("请先登陆");
        this.$router.push({ path: "/login" });
        return true;
      }
      if (this.name === sessionStorage.getItem("loginName")) {
        return false;
      } else {
        this.$message("权限不足");
        return true;
      }
    },
  },
  created() {
    this.findOrderNumber();
  },
};
</script>
<style scoped>
.el-button {
  margin-left: 5px;
}
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
.yc {
  margin: 4px;
}
.container {
  width: 100%;
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
</style>
