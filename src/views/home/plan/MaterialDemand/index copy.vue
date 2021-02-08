<template>
  <div class="container">
    <el-steps :active="0" finish-status="success" simple style="margin: 5px">
      <el-step title="系统订单"></el-step>
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
        <el-table-column property="Purpose" label="用途"></el-table-column>
        <el-table-column
          property="CustomerOrderNumber"
          label="客户订单编号"
        ></el-table-column>

        <el-table-column
          property="CustomerNumber"
          label="客户编号"
        ></el-table-column>
        <el-table-column
          property="CustomerName"
          label="客户名称"
        ></el-table-column>
        <el-table-column
          property="CustomerClass"
          label="行业类别"
        ></el-table-column>
        <el-table-column
          property="CustomerRemarks"
          label="客户备注"
        ></el-table-column>
        <el-table-column property="TIN" label="纳税人识别号"></el-table-column>

        <el-table-column property="Bank" label="开户行"></el-table-column>
        <el-table-column property="Account" label="账户"></el-table-column>
        <el-table-column property="Address" label="地址"></el-table-column>
        <el-table-column
          property="CompanyPhone"
          label="公司电话"
        ></el-table-column>
        <el-table-column property="Contacts" label="联系人"></el-table-column>
        <el-table-column
          property="ContactsPhone"
          label="联系人电话"
        ></el-table-column>
        <el-table-column
          property="ContactsAddress"
          label="联系人地址"
        ></el-table-column>
        <el-table-column
          property="ContactsEmail"
          label="联系人邮箱"
        ></el-table-column>

        <el-table-column
          property="ContactsRemarks"
          label="联系人备注"
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
        <el-table-column label="操作" min-width="90" fixed="right">
          <template slot-scope="scope">
            <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->

            <el-button
              type="primary"
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
        <el-step title="订单材料明细"></el-step>&nbsp;&nbsp;&nbsp;<font>{{
          OrderNumbers
        }}</font>
      </el-steps>
      <div class="animation"></div>

      <el-table
        ref="tableselectData"
        class="table"
        height="500"
        :data="tableData1"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column property="OrderNumber" label="订单编号">
        </el-table-column>

        <el-table-column
          property="MaterialNumber"
          label="物料编号"
        ></el-table-column>

        <el-table-column
          property="MaterialName"
          label="物料名称"
        ></el-table-column>

        <el-table-column property="Thumbnail" label="缩略图">
          <template slot-scope="scope">
            <img class="bigImg" :src="scope.row.Thumbnail" alt="" /> </template
        ></el-table-column>

        <el-table-column
          property="MaterialSpec"
          label="规格型号"
        ></el-table-column>

        <el-table-column
          property="MaterialTexture"
          label="材质"
        ></el-table-column>

        <el-table-column property="Company" label="单位"></el-table-column>

        <el-table-column property="Enclosure" label="附件"></el-table-column>
        <el-table-column property="Number" label="数量"></el-table-column>

        <!-- <el-table-column property="supplierName" label="供应商名称"></el-table-column> -->

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
        <el-table-column label="生成预购单" min-width="90" fixed="right">
          <template slot="header">
            <el-button
              type="primary"
              icon="el-icon-position"
              circle
              plain
              size="mini"
              @click="handleJS"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      OrderNumbers: "",
      total: 0,
      tableData: [],
      tableData1: [],
      pyid: "",
    };
  },
  methods: {
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
          table: "salesOrder",
          where: { processCode: "3" },
        },
      })
        .then((res) => {
          console.log("当前数据", res);
          this.tableData = res;
        })
        .catch((err) => {
          console.log(err);
        });
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
      this.OrderNumbers = row.OrderNumber;
      this.tableData1 = [];
      this.finddetail();
    },
    finddetail() {
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "MaterialDemand",
          where: { OrderNumber: this.OrderNumbers },
        },
      })
        .then((res) => {
          console.log(res);
          this.tableData1 = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //////////////////////////////////////////////////////////////////

    //计算物料实际需求数量
    async handleJS() {
      // this.$https({
      //   method: "post",
      //   url: "api/transaction/materialPlanADDTransaction",
      //   data: {
      //     datas: this.tableData1,
      //     OrderNumber: this.OrderNumbers,
      //   },
      // })
      //   .then((res) => {
      //     console.log("返回：", res);
      //     if (res.status) {
      //       this.tableData1 = [];
      //       this.tableDataT = [];
      //       this.OrderNumbers = "";
      //       this.newview();
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      let datast = this.tableData1;
      let flag = false;
      for (let i = 0; i < datast.length; i++) {
        let newrow = datast[i];
        //解决方案
        //盘盈数>=需求数，（盘盈数：相减数为修改后的盘盈数；采购数为为0）
        //盘盈数<需求数，（盘盈数为0；采购数：相减数绝对值为采购数）
        let pynum = await this.goYYB(newrow.MaterialNumber); //该物料盘盈数
        let num = pynum - parseInt(newrow.Number); //盘盈数-需求数
        if (num >= 0) {
          //盘盈数>=需求数
          //1.修改盘盈数=num
          this.updateYYB(newrow.MaterialNumber, num + "");
          //2.修改采购值
          newrow.Number = "0"; //
        } else {
          //盘盈数<需求数
          //1.修改盘盈数=0
          this.updateYYB(newrow.MaterialNumber, "0");
          //2.修改采购值
          newrow.Number = Math.abs(num) + ""; //
        }
        if (newrow.Number != "0") {
          flag = true;
          newrow.PlanNumber = newrow.Number; //计划采购数量
          newrow.ShouldNumber = ""; //采购应到数量
          newrow.ActualNumbertotal = ""; //实际采购总数
          newrow.ActualNumber = ""; //实际采购数量
          newrow.ActualPrice = ""; //采购单价
          newrow.SurplusDistribution = newrow.Number;
          newrow.supplierNumber = "";
          newrow.supplierName = "";
          newrow.status = "0";
          this.$delete(newrow, "_id");
          this.$delete(newrow, "Parent");

          this.add(newrow); //添加到采购订单
        }
      }
      //进入推单模式
      if (flag) {
        this.getProcessState(this.OrderNumbers, "PurchaseOrder", "-1", "4");
      } else {
        this.getProcessState(this.OrderNumbers, "PurchaseOrder", "-1", "-1");
      }

      this.tableData1 = [];
      this.OrderNumbers = "";
    },
    //算出盘盈数
    async goYYB(materialNumber) {
      //查询该物料号在盈余表中的是否存在（不存在则创建该物料，数量为0）
      let tempNum = 0;
      await this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "YYB",
          where: { MaterialNumber: materialNumber },
        },
      })
        .then((res) => {
          if (res.length > 0) {
            tempNum = parseInt(res[0].Number);
          } else {
            //不存在该物料则创建
            this.$https({
              method: "post",
              url: "/api/apiModel/insert",
              data: {
                table: "YYB",
                form: {
                  MaterialNumber: materialNumber, //物料编号
                  Number: "0", //数量
                },
              },
            })
              .then(function (res) {
                console.log(res);
              })
              .catch(function (err) {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
      return tempNum;
    },
    // 根据物料编码修改数量
    updateYYB(materialNumber, num) {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/apiModel/updateByWhere",
        data: {
          table: "YYB",
          form: { Number: num },
          where: { MaterialNumber: materialNumber },
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getProcessState(orderNumber, table, statusing, processCode) {
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: table,
          where: { OrderNumber: orderNumber },
        },
      })
        .then((res) => {
          console.log(res);
          let csd = true;
          for (let i = 0; i < res.length; i++) {
            if (res[i].status == statusing) csd = false;
          }
          if (csd) {
            ///进入推单模式
            this.$https({
              method: "post",
              url: "/api/apiModel/updateByWhere",
              data: {
                table: "salesOrder",
                where: { OrderNumber: orderNumber },
                form: { processCode: processCode },
              },
            })
              .then((res) => {
                console.log(res);
                this.newview();
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async MaterialNumberNumber(MaterialNumber) {
      console.log(MaterialNumber);
      // let number1 = "";
      // let number2 = "";
      // await this.$https({
      //   //这里是你自己的请求方式、url和data参数
      //   method: "get",
      //   url: "/api/apiModel/find",
      //   params: {
      //     table: "stock",
      //     where: { MaterialNumber: MaterialNumber },
      //   },
      // })
      //   .then((res) => {
      //     if (res.length == 0) {
      //       number1 = "0";
      //     } else {
      //       number1 = res[0].Number;
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      // await this.$https({
      //   //这里是你自己的请求方式、url和data参数
      //   method: "get",
      //   url: "/api/apiModel/find",
      //   params: {
      //     table: "PurchaseSurplus",
      //     where: { MaterialNumber: MaterialNumber },
      //   },
      // })
      //   .then((res) => {
      //     if (res.length == 0) {
      //       number2 = "0";
      //       this.pyid = "0";
      //     } else {
      //       number2 = res[0].Number;
      //       this.pyid = res[0]._id;
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      // console.log("number1 + number2 =" + number1 + "  " + number2);
      // this.mums = parseInt(number1) + parseInt(number2) + "";
    },
    deleteyy(ids) {
      console.log(ids);
      // this.$https({
      //   //这里是你自己的请求方式、url和data参数
      //   method: "post",
      //   url: "/api/apiModel/delete",
      //   data: {
      //     table: "PurchaseSurplus",
      //     id: ids,
      //   },
      // })
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },
    //更新盈余表数据
    updatepy(v, wheres) {
      console.log(v, wheres);
      // this.$https({
      //   //这里是你自己的请求方式、url和data参数
      //   method: "post",
      //   url: "/api/apiModel/updateByWhere",
      //   data: {
      //     table: "PurchaseSurplus",
      //     form: { Number: v },
      //     where: { MaterialNumber: wheres },
      //   },
      // })
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },
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
