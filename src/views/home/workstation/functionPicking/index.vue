<template>
  <div class="container">
    <el-steps :active="0" finish-status="success" simple style="margin: 5px">
      <el-step title="功能领料"></el-step>
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
          property="MaterialPrice"
          label="产品价格"
        ></el-table-column>
        <el-table-column property="Number" label="应出货数量"></el-table-column>

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
            <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
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
              </el-form>
              <el-button
                style="float: right"
                type="primary"
                @click="handleEdit(scope)"
                >确定</el-button
              >
              <el-button
                style="float: right; margin: 0 10px"
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
      let DeliverGoodsTotalsd =
        parseInt(this.form.DeliverGoods) +
        parseInt(scope.row.DeliverGoodsTotal);
      if (DeliverGoodsTotalsd > parseInt(scope.row.Number)) {
        //this.form.DeliverGoods=parseInt(scope.row.Number)-parseInt(scope.row.DeliverGoodsTotal);
        alert("超出发货总数");
        return;
      }
      let sy = parseInt(scope.row.Inventory) - parseInt(this.form.DeliverGoods);
      if (sy < 0) {
        alert("库存不足");
        return;
      }
      //////////////////
      this.$myloading({
        show: true,
      });
      this.$https({
        method: "post",
        url: "api/transaction/functionPickingTransaction",
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
    async DFPStoreNumber(MaterialNumber, v) {
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
          form: { SYNumber: v },
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    //生成成品出货单
    insertclch(v) {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/apiModel/insert",
        data: {
          table: "materialDelivery",
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
    updatesalesInvoice(cod) {
      this.$https({
        method: "post",
        url: "/api/apiModel/update",
        data: {
          table: "functionPicking",
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

    /////////////////////////////////
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
          table: "functionPicking",
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

    //权限
    auth() {},
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
