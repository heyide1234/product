<template>
  <div>
    <el-dialog
      title="表单"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <div>
        <el-select
          v-model="value2"
          multiple
          collapse-tags
          style="margin-left: 20px"
          placeholder="请选择"
          @change="selectChange"
        >
          <el-option
            v-for="(item, index) in options"
            :key="index"
            :value="item"
          >
          </el-option>
        </el-select>
      </div>
      <div class="dialogBody">
        <!-- <div class="tabH">
          <div>表名：{{ dtsa }}</div>
          <div>创建人：{{ creat }}</div>
          <div>创建时间：{{ times }}</div>
        </div> -->

        <table id="dialogBody">
          <thead>
            <th>N0.</th>
            <th>table</th>
            <th v-for="(item, index) in querydataH" :key="index">
              {{ item }}
            </th>
          </thead>
          <tbody>
            <tr v-for="(item1, index) in querydata" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ dtsa }}</td>
              <td v-for="(item, index) in querydataH" :key="index">
                {{ item1[item] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button v-preventReClick @click="dialogFormVisible = false"
          >取 消</el-button
        >
        <el-button type="primary" v-print="printTable">打 印</el-button>
      </div>
    </el-dialog>
    <div class="container">
      <h1>表单查询</h1>
      <el-form lable-width="80px">
        <el-form-item label="表单类型">
          <el-select v-model="form.tables" placeholder="请选择表单类型">
            <el-option-group label="销售">
              <el-option value="salesOrder">销售订单</el-option>
              <el-option value="salesOrderDetail">销售订单明细</el-option>
              <el-option value="salesInvoice">销售发货单</el-option>
              <el-option value="__customerManager">客户管理</el-option>
              <el-option value="__customerContacts">客户联系人</el-option>
            </el-option-group>
            <el-option-group label="计划">
              <!-- <el-option value="MaterialPlanDemand">材料明细需求计划单</el-option> -->
              <el-option value="MaterialDemand">物料采购计划单</el-option>
            </el-option-group>

            <el-option-group label="采购">
              <el-option value="PurchaseOrder">预购单</el-option>
              <el-option value="ReturnOrder">退货单</el-option>
              <el-option value="__supplierManager">供应商管理</el-option>
              <el-option value="__supplierContacts">供应商联系人</el-option>

              <el-option value="__supplierMaterial">供应商物料单</el-option>
              <!-- <el-option value="supplierSeq">物料供应商</el-option> -->
            </el-option-group>

            <el-option-group label="品检">
              <el-option value="IncomingCheck">材料检验</el-option>
              <el-option value="productCheck">成品检验</el-option>
            </el-option-group>

            <el-option-group label="仓库">
              <el-option value="stock">库存管理</el-option>
              <el-option value="YYB">盈余表</el-option>
              <el-option value="IntransitOrder">材料到货</el-option>
              <el-option value="Warehousing">材料入库</el-option>
              <el-option value="materialDelivery">材料出库</el-option>
              <el-option value="goodsWarehousing">成品入库</el-option>
              <el-option value="goodsDelivery">成品出库</el-option>
            </el-option-group>

            <el-option-group label="制造">
              <el-option value="ManufacturingPlan">制造计划单</el-option>
              <el-option value="ManufacturingExecution">制造执行单</el-option>
              <el-option value="ManufacturingExecutionDetail"
                >制造执行单明细</el-option
              >
            </el-option-group>

            <el-option-group label="技术">
              <el-option value="__materialclass">物料分类</el-option>
              <el-option value="__basicMaterialList">物料基础资料</el-option>
              <el-option value="__MaterialDetails">材料明细</el-option>
            </el-option-group>
          </el-select>
        </el-form-item>
        <el-form-item label="表单状态">
          <el-select
            v-model="form.whereState"
            placeholder="查询条件"
            class="selectInput"
          >
            <el-option value="OrderNumber">订单编号</el-option>
            <el-option value="PurchaseNumber">采购编号</el-option>
            <el-option value="CheckNumber">质检编号</el-option>
            <el-option value="MaterialNumber">物料编号</el-option>
          </el-select>

          <el-input
            v-model="form.whereNumber"
            placeholder="条件编号"
            class="selectInputs"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="表单状态">
          <el-select v-model="form.status" placeholder="请选择表单状态">
            <el-option value="0">未完成</el-option>
            <el-option value="1">已完成</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="表单时间">
          <el-date-picker
            v-model="form.date"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <!-- <el-button
            type="warning"
            icon="el-icon-top-left"
            size="mini"
            plain
            style="float: left"
            circle
            title="将系统订单从预采购回滚到销售订单"
            v-preventReClick  @click="bdhg"
          ></el-button> -->
          <el-button>取消</el-button>
          <el-button type="primary" v-preventReClick @click="onSubmit"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getTime } from "common/utils/index";
import QRCode from "qrcode";
export default {
  data() {
    return {
      dialogFormVisible: false,
      printTable: {
        id: "dialogBody",
      },
      querydata: [],
      querydataH: [],
      form: {
        tables: "",
        status: "",
        whereState: "",
        whereNumber: "",
        date: [],
      },
      dtsa: "",
      times: "",
      creat: "",
      options: [],
      value2: "",

      dtsd: {
        salesOrder: "销售订单",
        salesOrderDetail: "销售订单明细",
        salesInvoice: "销售发货单",
        __customerManager: "客户管理",
        __customerContacts: "客户联系人",
        __customerMaterial: "客户物料单",
        MaterialPlanDemand: "物料计划需求",
        MaterialDemand: "物料需求",
        PurchaseOrder: "预购单",
        ReturnOrder: "退货单",
        __supplierManager: "供应商管理",
        __supplierContacts: "供应商联系人",
        __supplierMaterial: "供应商物料单",
        IncomingCheck: "材料检验",
        productCheck: "成品检验",
        stock: "库存管理",
        YYB: "盈余表",
        IntransitOrder: "材料到货",
        Warehousing: "材料入库",
        materialDelivery: "材料出库",
        goodsWarehousing: "成品入库",
        goodsDelivery: "成品出库",
        ManufacturingPlan: "制造计划单",
        ManufacturingExecution: "制造执行单",
        ManufacturingExecutionDetail: "制造执行单明细",
        __materialclass: "物料分类",
        __basicMaterialList: "物料基础资料",
        __MaterialDetails: "材料明细",
      },
    };
  },
  methods: {
    bdhg() {
      if (confirm("表单回滚后不可更改，是否继续？")) {
        if (!this.form.whereNumber || this.form.whereNumber.length == 0) {
          alert("表名或订单号不能为空！");
          return;
        }

        const loading = this.$loading({
          lock: true,
          text: "表单回滚中...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        this.$https({
          method: "post",
          url: "api/transaction/BDHGTransaction",
          data: {
            OrderNumber: this.form.whereNumber,
          },
        })
          .then((res) => {
            console.log("返回：", res);
            if (res.status) {
              alert("【" + this.form.whereNumber + "】回滚结束！");
            }
            loading.close();
          })
          .catch((err) => {
            console.log(err);
            loading.close();
          });
        // alert(
        //   "回退成功！" +
        //     "，表名：" +
        //     this.form.tables +
        //     "，订单号：" +
        //     this.form.whereNumber
        // );
      }
    },
    selectChange() {
      this.querydataH = this.value2;
    },
    onSubmit() {
      let database = false;
      if (this.form.tables.indexOf("__") > -1) {
        database = true;
      }
      this.dtsa = this.dtsd[this.form.tables];
      this.times = getTime();
      this.creat = sessionStorage.getItem("loginName");
      let value = {
        table: this.form.tables,
        where: {},
      };
      let wheres = {};
      if (this.form.status != "" && this.form.status != null)
        wheres.status = this.form.status;

      if (this.form.date.length === 2)
        wheres.creatdate = {
          $gte: getTime(this.form.date[0]),
          $lte: getTime(this.form.date[1]),
        };

      if (this.form.whereState != "" && this.form.whereState != null)
        wheres[this.form.whereState] = this.form.whereNumber;
      value.where = wheres;
      if (database) {
        value.dataBase = "base";
      } else {
        value.dataBase = undefined;
      }
      this.find(value);
      this.dialogFormVisible = true;
    },
    find(wheres) {
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: wheres,
      })
        .then((res) => {
          this.querydata = res.map((item) => {
            const { _id, ...parm } = item;
            console.log(_id);
            return { ...parm };
          });
          this.querydataH = [];
          for (let k = 0; k < this.querydata.length; k++) {
            for (const key in this.querydata[k]) {
              if (this.querydataH.indexOf(key) == -1) {
                this.querydataH.push(key);
              }
            }
            // if (
            //   Object.keys(this.querydata[k]).length >
            //   Object.keys(this.querydataH).length
            // ) {
            //   this.querydataH = Object.keys(this.querydata[k]);
            //   this.options = this.querydataH;
            //   this.value2 = this.querydataH;
            // }
            this.options = this.querydataH;
            this.value2 = this.querydataH;
          }

          // document.querySelector("table").style.width =
          //   this.querydataH.length * 120 + "px";
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    prints() {
      console.log("打印。。");
      QRCode.toCanvas(document.querySelector("table"), "value", function () {
        // console.log(error);
      });
    },
  },
};
</script>
<style scoped lang="less">
.dialogBody {
  overflow: auto;
  width: 100%;
  height: 300px;

  table {
    text-align: center;
    border-collapse: collapse;

    max-height: 400px;
    border: #000 1px solid;
    th,
    td {
      border: #000 1px solid;
      line-height: 30px;
    }
  }
}
.container {
  height: 330px;
  width: 450px;
  padding: 50px;
  padding-top: 30px;
  margin: 150px auto;
  border-radius: 4px;
  background-color: rgb(231, 233, 225);
  box-shadow: 0 0 5px rgb(0, 0, 0, 0.5);
  .el-form-item {
    &:last-of-type {
      text-align: end;
      padding-right: 40px;
    }
  }
}
.tabH {
  display: flex;
}
.tabH > div {
  margin-right: 100px;
}
.el-select {
  width: 350px;
}
.selectInput {
  width: 120px;
}
.selectInputs {
  margin-left: 10px;
  width: 220px;
}
</style>
