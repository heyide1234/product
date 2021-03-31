<template>
  <div class="container">
    <el-steps :active="0" finish-status="success" simple style="margin: 5px">
      <el-step title="质检单号"></el-step>
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
          label="质检单号"
          property="CheckNumber"
        ></el-table-column>
        <el-table-column
          property="PurchaseNumber"
          label="采购单号"
        ></el-table-column>
        <el-table-column
          property="OrderNumber"
          label="订单编号"
        ></el-table-column>

        <el-table-column
          property="supplierNumber"
          label="供应商编号"
        ></el-table-column>
        <el-table-column
          property="supplierName"
          label="供应商名称"
        ></el-table-column>

        <el-table-column property="Contacts" label="联系人"></el-table-column>
        <el-table-column
          property="ContactsPhone"
          label="联系电话"
        ></el-table-column>

        <el-table-column label="操作" min-width="90" fixed="right">
          <template slot-scope="scope">
            <!-- <el-button size="mini" v-preventReClick  @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
            <el-button
              type="primary"
              icon="el-icon-reading"
              circle
              size="mini"
              plain
              v-preventReClick
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
        <el-step title="质检单"></el-step>&nbsp;&nbsp;&nbsp;<font>{{
          CheckNumber
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
        <el-table-column
          label="质检单号"
          property="CheckNumber"
        ></el-table-column>
        <el-table-column
          property="PurchaseNumber"
          label="采购单号"
        ></el-table-column>
        <el-table-column label="订单编号" property="OrderNumber">
        </el-table-column>
        <el-table-column property="Purpose" label="用途"></el-table-column>
        <el-table-column
          property="supplierNumber"
          label="供应商编号"
        ></el-table-column>
        <el-table-column
          property="supplierName"
          label="供应商名称"
        ></el-table-column>
        <el-table-column property="Contacts" label="联系人"></el-table-column>
        <el-table-column
          property="ContactsPhone"
          label="联系人电话"
        ></el-table-column>
        <el-table-column
          property="MaterialNumber"
          label="物料编号"
        ></el-table-column>

        <el-table-column
          property="MaterialName"
          label="物料名称"
        ></el-table-column>

        <el-table-column property="Thumbnail" label="缩略图"></el-table-column>

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
        <el-table-column
          property="PlanNumber"
          label="计划采购数量"
        ></el-table-column>
        <el-table-column
          property="ShouldNumber"
          label="采购应到数量"
        ></el-table-column>
        <el-table-column
          property="ActualNumbertotal"
          label="采购总数量"
        ></el-table-column>

        <el-table-column
          property="ActualNumber"
          label="实际采购数量"
        ></el-table-column>
        <el-table-column
          property="ActualPrice"
          label="采购单价"
        ></el-table-column>

        <el-table-column
          property="TotalCheckNum"
          label="质检总数"
        ></el-table-column>

        <el-table-column property="CheckNum" label="质检数量"></el-table-column>
        <el-table-column property="NGNum" label="不合格数"></el-table-column>
        <el-table-column
          property="CheckRemarks"
          label="检验结果"
        ></el-table-column>
        <el-table-column property="Checker" label="检验人"></el-table-column>

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
        <el-table-column label="检验" min-width="90" fixed="right">
          <template slot-scope="scope">
            <!-- <el-button size="mini" v-preventReClick  @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
            <el-popover
              placement="left"
              width="300"
              trigger="click"
              :ref="`popover-${scope.$index}`"
            >
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="质检数量">
                  <el-input v-model="form.CheckNum"></el-input>
                </el-form-item>
                <el-form-item label="不合格数">
                  <el-input v-model="form.NGNum"></el-input>
                </el-form-item>
                <el-form-item label="检验结果">
                  <el-input v-model="form.CheckRemarks"></el-input>
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
      CheckNumber: "",
      total: 0,
      tableData: [],
      tableData1: [],
      pyid: "",
      tempdata: [],
      form: {
        CheckNumber: "", //质检单哈
        OrderNumber: "", //订单编号
        PurchaseNumber: "", //采购编号
        supplierNumber: "", //供应商编号
        supplierName: "", //供应商名称
        Contacts: "", //联系人
        ContactsPhone: "", //联系人电话
        MaterialNumber: "", //物料编号
        MaterialName: "", //物料名称
        Thumbnail: "", //缩略图
        MaterialSpec: "", //规格型号
        MaterialTexture: "", //材质
        Company: "", //单位
        Remarks: "", //备注
        Enclosure: "", //附件
        PlanNumber: "", //计划采购数量
        ShouldNumber: "", //采购应到数量
        ActualNumber: "", //实际采购数量
        ActualNumbertotal: "", //实际采购总数
        ActualPrice: "", //采购单价
        status: "", //状态
        creater: "", //创建人
        creatdate: "", //创建时间
      },
    };
  },
  methods: {
    //刷新界面
    async newview() {
      this.tableData = [];
      this.tempdata = [];
      //let d=[];
      //let dts=await this.find(); //找寻对应页面的数据
      // if(dts.length>0){
      //将该流程的所有信息查询
      //let orderNumber=dts[i].OrderNumber;//订单编号
      await this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "IncomingCheck",
          where: { status: "0" },
        },
      })
        .then((res) => {
          this.tempdata = res;
        })
        .catch((err) => {
          console.log(err);
        });

      //this.tempdata=d;//存储该流程的在途信息
      let zj = []; //zj
      this.tempdata.filter((item) => {
        if (zj.indexOf(item.CheckNumber) == -1) {
          zj.push(item.CheckNumber);
        }
      });
      console.log("po", zj);
      let tdd = [];
      for (let j = 0; j < zj.length; j++) {
        this.tempdata.filter((item) => {
          if (item.CheckNumber == zj[j]) {
            let temps = {
              CheckNumber: item.CheckNumber, //质检单号
              OrderNumber: item.OrderNumber, //订单编号
              PurchaseNumber: item.PurchaseNumber, //采购编号
              supplierNumber: item.supplierNumber, //供应商编号
              supplierName: item.supplierName, //供应商名称
              Contacts: item.Contacts, //联系人
              ContactsPhone: item.ContactsPhone, //联系人电话
            };

            tdd.push(temps);
            zj.splice(j, 1);
            j--;
          }
        });
      }
      console.log("tdd", tdd);
      this.tableData = tdd;
    },
    //查询对应的销售订单
    async find() {
      let dt = [];
      await this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "salesOrder",
          where: { processCode: { $gte: "6" } },
        },
      })
        .then((res) => {
          console.log("当前数据", res);
          dt = res;
        })
        .catch((err) => {
          console.log(err);
        });
      return dt;
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
      this.CheckNumber = row.CheckNumber;
      this.tableData1 = [];
      this.finddetail();
    },
    finddetail() {
      //过滤数据
      this.tableData1 = this.tempdata.filter((item) => {
        return item.CheckNumber == this.CheckNumber;
      });
      console.log(this.tableData1);
    },
    //////////////////////////////////////////////////////////////////

    //编辑事件
    async handleEdit(scope) {
      scope._self.$refs[`popover-${scope.$index}`].doClose();
      this.form.NGNum = this.form.NGNum || "0";

      this.operation = "update";
      let stu = "0";
      let TotalCheckNum =
        parseInt(scope.row.TotalCheckNum) + parseInt(this.form.CheckNum); //质检总计

      if (TotalCheckNum > parseInt(scope.row.ActualNumber)) {
        alert("质检数量大于待检数量！");
        return;
      }

      this.id = scope.row._id;
      if (parseInt(scope.row.ActualNumber) === TotalCheckNum) {
        stu = "1";
      }
      if (parseInt(scope.row.ActualNumber) < TotalCheckNum) {
        stu = "1";
      }
      let fs = {
        TotalCheckNum: TotalCheckNum,
        CheckNum: this.form.CheckNum,
        NGNum: this.form.NGNum,
        CheckRemarks: this.form.CheckRemarks,
        status: stu,
        Checker: sessionStorage.getItem("loginName"),
        creatdate: getTime(),
      };

      await this.update(fs); //修改检验数据
      ////////////////////////////////////////////////////////////
      //增加材料入库单

      let rkdata = JSON.parse(JSON.stringify(scope.row));

      let nusd = parseInt(this.form.CheckNum) - parseInt(this.form.NGNum);

      if (nusd > 0) {
        rkdata.TotalCheckNum = TotalCheckNum;
        rkdata.CheckNum = this.form.CheckNum;
        rkdata.NGNum = this.form.NGNum;
        rkdata.CheckRemarks = this.form.CheckRemarks;
        rkdata.OKNumber = nusd + "";
        rkdata.FirmOKNumber = "0";
        rkdata.status = "0";
        rkdata.Checker = sessionStorage.getItem("loginName");
        rkdata.creatdate = getTime();
        this.$delete(rkdata, "_id");
        this.rkinsert(rkdata); //入库
      }

      //增加退货单
      if (this.form.NGNum > 0) {
        let thdata = JSON.parse(JSON.stringify(scope.row));
        thdata.TNumber = this.form.NGNum; //退货数量
        thdata.RNumbers = "0"; //还货总计
        thdata.RNumber = "0"; //本次还货数量
        thdata.status = "0";
        thdata.Checker = sessionStorage.getItem("loginName"); //质检人
        thdata.creatdate = getTime();
        thdata.CheckerRemarks = this.form.CheckRemarks; //质检结果
        this.$delete(thdata, "_id");
        console.log("退货资料:", thdata);
        this.thinsert(thdata); //添加退货单
      }
      /////this.form.NGNum

      this.findOrderNumber();
      this.newview();
      //进入推单模式
      this.getProcessState(scope.row.OrderNumber, "IncomingCheck", "1", "7");
    },
    findOrderNumber() {
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "IncomingCheck",
          where: { CheckNumber: this.CheckNumber, status: "0" },
          sortJson: { _id: -1 },
        },
      })
        .then((res) => {
          this.tableData1 = res;
          console.log(this.tableData1);
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
          table: "salesOrder",
          where: { OrderNumber: orderNumber },
        },
      })
        .then((res) => {
          if (parseInt(res[0].processCode) < parseInt(processCode)) {
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
                this.find();
                this.tableData1 = [];
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
    //退货插入
    thinsert(v) {
      this.$https({
        method: "post",
        url: "/api/apiModel/insert",
        data: {
          table: "ReturnOrder",
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
    //入库单插入
    rkinsert(v) {
      this.$https({
        method: "post",
        url: "/api/apiModel/insert",
        data: {
          table: "Warehousing",
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
    //数据修改
    async update(v) {
      //if (this.auth()) return;
      await this.$https({
        method: "post",
        url: "/api/apiModel/update",
        data: {
          table: "IncomingCheck",
          form: v,
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
</style>
