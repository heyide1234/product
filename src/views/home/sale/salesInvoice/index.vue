<template>
  <div class="container">
    <el-steps :active="0" finish-status="success" simple style="margin: 5px">
      <el-step title="销售发货单"></el-step>
    </el-steps>

    <div class="tabels">
      <el-table
        ref="tableselectData"
        class="table"
        height="500"
        :data="tableData"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column label="订单编号" min-width="150">
          <template #header>
            <el-input
              size="mini"
              v-model="search"
              @change="searchs"
              prefix-icon="el-icon-search"
              placeholder="输入订单编号"
            />
          </template>
          <template slot-scope="scope">
            <i class="el-icon-paperclip"></i>
            <span style="margin-left: 10px">{{ scope.row.OrderNumber }}</span>
          </template>
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
          property="MaterialSpec"
          label="规格型号"
        ></el-table-column>
        <el-table-column
          property="MaterialPrice"
          label="产品价格"
        ></el-table-column>
        <el-table-column property="Number" label="应出货数量"></el-table-column>

        <el-table-column
          property="CustomerMaterialNumber"
          label="客户物料编号"
        ></el-table-column>

        <el-table-column
          property="CustomerMaterialName"
          label="客户物料名称"
        ></el-table-column>
        <el-table-column
          property="DeliverGoodsTotal"
          label="实际出货总数"
        ></el-table-column>

        <el-table-column
          property="DeliverGoods"
          label="实际出货数"
        ></el-table-column>
        <el-table-column property="Inventory" label="库存数"></el-table-column>

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
        <el-table-column label="申请出库数" min-width="90" fixed="right">
          <template slot-scope="scope">
            <!-- <el-button size="mini" v-preventReClick  @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
            <el-popover
              placement="left"
              width="300"
              trigger="click"
              :ref="`popover-${scope.$index}`"
            >
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="需出库数">
                  <el-input v-model="form.DeliverGoods"></el-input>
                </el-form-item>
                <el-form-item label="收货人">
                  <el-input v-model="form.Receiver"></el-input>
                </el-form-item>
                <el-form-item label="收货电话">
                  <el-input v-model="form.ReceivingPhone"></el-input>
                </el-form-item>
                <el-form-item label="收货地址">
                  <el-input v-model="form.ReceivingAddress"></el-input>
                </el-form-item>
                <el-form-item label="出库日期">
                  <el-input v-model="form.DeliveryDate"></el-input>
                </el-form-item>
                <el-form-item label="合同模板">
                  <el-select v-model="form.HTModel">
                    <el-option value="送货单"></el-option>
                    <el-option value="发货清单"></el-option>
                  </el-select>
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
        Receiver: "", //收货人
        ReceivingPhone: "", //收货人电话
        ReceivingAddress: "", //收货地址
        DeliveryDate: "", //出库日期
        HTModel: "", //合同模板
        //////
        OrderNumber: "", //订单编号
        MaterialNumber: "", //产品编号
        MaterialName: "", //产品名称
        MaterialPrice: "", //产品价格
        Number: "0", //应出数量
        CustomerMaterialNumber: "", //客户物料编号
        CustomerMaterialName: "", //客户物料名称
        DeliverGoodsTotal: "0", //实际出货总数
        DeliverGoods: "0", //实际出货数
        Inventory: "0", //库存数
        status: "0", //状态
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
    };
  },
  methods: {
    handleEdit(scope) {
      scope._self.$refs[`popover-${scope.$index}`].doClose();
      if (parseInt(this.form.DeliverGoods) <= 0) return;
      this.id = scope.row._id;

      if (
        parseInt(this.form.DeliverGoods) +
          parseInt(scope.row.DeliverGoodsTotal) >
        parseInt(scope.row.Number)
      ) {
        alert("超出发货总数");
        return;
      }
      if (
        parseInt(scope.row.Inventory) - parseInt(this.form.DeliverGoods) <
        0
      ) {
        alert("库存不足");
        return;
      }
      ////////////salesInvoiceTransaction
      this.$myloading({
        show: true,
      });
      this.$https({
        method: "post",
        url: "api/transaction/salesInvoiceTransaction",
        data: {
          row: scope.row,
          form: this.form,
          creater: sessionStorage.getItem("loginName"), //创建人
          creatdate: getTime(), //创建时间
        },
      })
        .then((res) => {
          if (res.status) {
            this.$myloading({
              show: false,
            });
            this.findOrderNumber();
          }
        })
        .catch((err) => {
          console.log(err);
        });
      ///////////////////////
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
          table: "salesInvoice",
          where: { OrderNumber: this.search },
        },
      })
        .then((res) => {
          console.log(res);
          ////通过物料编号查询库存
          this.findstock(res);
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
              MaterialNumber: this.tempdatas[i].MaterialNumber,
            },
          },
        })
          .then((res) => {
            if (res.length === 0) {
              this.tempdatas[i].Inventory = "0";
            } else {
              this.tempdatas[i].Inventory = res[0].SYNumber;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }

      this.tableData = this.tempdatas;
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
    // Edit(scope) {
    //   this.operation = "update";

    //   this.id = scope.row._id;

    //   this.form.PlanNumber = scope.row.PlanNumber;
    //   this.form.MaterialNumber = scope.row.MaterialNumber; //物料编号
    //   let fs = {
    //     ShouldNumber: this.form.ShouldNumber,
    //     ActualPrice: this.form.ActualPrice,
    //     status: "1",
    //   };
    //   console.log("fs....", fs);
    //   //修改采购单
    //   this.update(fs);
    //   this.insertyyb(); //盈余表
    //   let csd = {
    //     OrderNumber: scope.row.OrderNumber, //订单编号
    //     MaterialNumber: scope.row.MaterialNumber + "", //物料编号
    //     PlanNumber: scope.row.PlanNumber,
    //     ShouldNumber: this.form.ShouldNumber,
    //     StateNumber: "0", //状态数量
    //   };
    //   this.insertyyztb(csd); //盈余状态表
    //   let tempsd = JSON.parse(JSON.stringify(scope.row));
    //   tempsd.ActualNumber = "";
    //   tempsd.ActualNumbertotal = "0";
    //   tempsd.ShouldNumber = this.form.ShouldNumber;
    //   tempsd.ActualPrice = this.form.ActualPrice;
    //   tempsd.status = "0";
    //   tempsd.creatdate = getTime(); //创建时间
    //   this.$delete(tempsd, "_id");
    //   this.ztinsert(tempsd);
    //   //this.sclljyd(tempsd);

    //   scope._self.$refs[`popover-${scope.$index}`].doClose();
    //   this.findOrderNumber();
    // },

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
      // if (sessionStorage.getItem("loginName") == null) {
      //   this.$message("请先登陆");
      //   this.$router.push({ path: "/login" });
      //   return true;
      // }
      // if (this.name === sessionStorage.getItem("loginName")) {
      //   return false;
      // } else {
      //   this.$message("权限不足");
      //   return true;
      // }
    },
  },
  created() {},
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
