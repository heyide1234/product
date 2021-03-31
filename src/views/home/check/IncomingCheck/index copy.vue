<template>
  <div class="container">
    <el-steps :active="0" finish-status="success" simple style="margin: 5px">
      <el-step title="来料检验单"></el-step>
    </el-steps>
    <el-dialog
      title="表单"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="form">
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
      <div slot="footer" class="dialog-footer">
        <el-button v-preventReClick @click="dialogFormVisible = false"
          >取 消</el-button
        >
        <el-button type="primary" v-preventReClick @click="onSubmit"
          >确 定</el-button
        >
      </div>
    </el-dialog>

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
          property="PurchaseNumber"
          label="采购单号"
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
      operation: "", //当前操作切换
      pagenums: 0,
      form: {
        OrderNumber: "", //订单编号
        MaterialNumber: "", //物料编号
        MaterialName: "", //物料名称
        Thumbnail: "", //缩略图
        MaterialSpec: "", //规格型号
        MaterialTexture: "", //材质
        Company: "", //单位
        Remarks: "", //备注
        Enclosure: "", //附件
        PlanNumber: "", //计划采购数量
        ShouldNumber: "", //应到数量
        ActualNumbertotal: "",
        ActualNumber: "", //实际采购数量
        ActualPrice: "", //采购单价
        CheckNum: "", //质检数量
        NGNum: "", //不合格数
        CheckRemarks: "", //检验结果
        creater: "", //质检人
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
    };
  },
  methods: {
    searchs() {
      console.log(".....input", this.search);
      this.findOrderNumber();
    },
    findOrderNumber() {
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "IncomingCheck",
          where: { OrderNumber: this.search },
          sortJson: { _id: -1 },
        },
      })
        .then((res) => {
          //res.PlanNumber = "";
          this.tableData = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //计算物料实际需求数量
    async handleJS(row) {
      console.log(row);
      let newrow = JSON.parse(JSON.stringify(row));
      let nus = "0";
      console.log(row.MaterialNumber, row.Number);
      await this.MaterialNumberNumber(row.MaterialNumber);
      console.log("mums=" + this.mums);
      nus = parseInt(row.Number) - parseInt(this.mums) + "";
      console.log("nus=" + nus);

      newrow.PlanNumber = nus; //计划采购数量
      newrow.ActualNumber = ""; //实际采购数量
      newrow.ActualPrice = ""; //采购单价
      this.$delete(newrow, "_id");
      this.$delete(newrow, "Parent");

      console.log(newrow);
      this.add(newrow);
    },
    //20200927001
    async MaterialNumberNumber(MaterialNumber) {
      let number1 = "";
      let number2 = "";
      await this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "stock",
          where: { MaterialNumber: MaterialNumber },
        },
      })
        .then((res) => {
          console.log(res);
          number1 = res.Number;
          if (res.length == 0) {
            number1 = "0";
          }
        })
        .catch((err) => {
          console.log(err);
        });
      await this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "PurchaseSurplus",
          where: { MaterialNumber: MaterialNumber },
        },
      })
        .then((res) => {
          console.log(res);
          number2 = res.Number;
          if (res.length == 0) {
            number2 = "0";
          }
        })
        .catch((err) => {
          console.log(err);
        });
      console.log("number1 + number2 =" + number1 + "  " + number2);
      this.mums = parseInt(number1) + parseInt(number2) + "";
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

    //添加事件
    handleAdd() {
      this.operation = "add";
      this.form = {};
      this.dialogFormVisible = true;
    },
    //编辑事件
    handleEdit(scope) {
      this.operation = "update";
      let stu = "0";
      let TotalCheckNum =
        parseInt(scope.row.TotalCheckNum) + parseInt(this.form.CheckNum); //质检总计
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

      console.log("fs....", fs);
      this.update(fs); //修改检验数据
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
        thdata.Checker = sessionStorage.getItem("loginName"); //质检人
        thdata.CheckerRemarks = this.form.CheckRemarks; //质检结果
        this.$delete(thdata, "_id");
        console.log("退货资料:", thdata);
        this.thinsert(thdata); //添加退货单
      }
      /////this.form.NGNum

      scope._self.$refs[`popover-${scope.$index}`].doClose();
      this.findOrderNumber();
      //进入推单模式
      this.getProcessState(scope.row.OrderNumber, "IncomingCheck", "1", "7");
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
            if (res[i].status != statusing) csd = false;
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
    update(v) {
      //if (this.auth()) return;
      this.$https({
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
    //盈余表
    async insertyyb() {
      //实际数量减去计划数量
      let cs =
        parseInt(this.form.ActualNumber) - parseInt(this.form.PlanNumber);
      if (cs > 0) {
        await this.findyy();

        if (this.tempdata.length > 0) {
          let nu = parseInt(this.tempdata[0].Number) + cs;

          this.updateyy(nu + "", this.tempdata[0]._id);
        } else {
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
    //删除事件
    handleDelete(row) {
      this.id = { id: row._id };
      this.name = row.creater;
      this.del();
      this.newview();
    },
    //选择展示页数据
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenums = (val - 1) * 10;
      console.log("---====---", this, this.pagenums);
      this.findByPageNum();
    },
    //多选
    yc() {
      if (this.$refs.tableselectData.selection.length > 0) {
        let val = this.$refs.tableselectData.selection;
        for (let i = 0; i < val.length; i++) {
          this.id = { id: val[i]._id };
          this.del();
        }
        this.newview();
      }
    },
    //刷新界面
    newview() {
      this.getpage(); //刷新分页
      this.findByPageNum(); //找寻对应页面的数据
    },
    //提交按钮
    onSubmit() {
      this.dialogFormVisible = false;
      this.form.SerialNumber =
        this.form.MaterielNum + "-" + this.form.ManufactureSN;
      this.form.creater = sessionStorage.getItem("loginName");
      this.form.creatdate = getTime();
      if (this.operation === "add") {
        this.add(this.form);
      } else {
        let updform = { forms: this.form, id: this.id };
        this.update(updform);
      }
      this.newview();
    },
    /////crud

    // 数据删除
    del() {
      if (this.auth()) return;
      this.$https({
        method: "post",
        // url: "/api/workOrderHead/delete",
        url: "/api/apiModel/delete",
        data: this.id,
      })
        .then(function (res) {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
    },

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
  created() {},
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
