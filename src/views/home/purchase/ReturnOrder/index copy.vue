<template>
  <div class="container">
    <el-steps :active="0" finish-status="success" simple style="margin: 5px">
      <el-step title="退货单"></el-step>
    </el-steps>
    <el-dialog
      title="表单"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="form">
        <el-table-column
          property="supplierNumber"
          label="供应商编号"
        ></el-table-column>
        <el-table-column
          property="supplierName"
          label="供应商名称"
        ></el-table-column>
        <el-form-item label="订单编号">
          <el-input v-model="form.OrderNumber"></el-input>
        </el-form-item>
        <el-form-item label="物料编号">
          <el-input v-model="form.MaterialNumber"></el-input>
        </el-form-item>
        <el-form-item label="物料名称">
          <el-input v-model="form.MaterialName"></el-input>
        </el-form-item>
        <el-form-item label="规格型号">
          <el-input v-model="form.SpecModel"></el-input>
        </el-form-item>
        <el-form-item label="缩略图">
          <el-input v-model="form.Thumbnail"></el-input>
        </el-form-item>
        <el-form-item label="材质">
          <el-input v-model="form.MaterialTexture"></el-input>
        </el-form-item>

        <el-form-item label="单位">
          <el-input v-model="form.Company"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.Remarks"></el-input>
        </el-form-item>
        <el-form-item label="说明">
          <el-input type="textarea" v-model="form.Enclosure"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
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

        <el-table-column property="TNumber" label="退货数量"></el-table-column>
        <el-table-column property="RNumbers" label="还货总数"></el-table-column>
        <el-table-column property="RNumber" label="还货数量"></el-table-column>
        <el-table-column property="Checker" label="质检人"></el-table-column>
        <el-table-column
          property="CheckerRemarks"
          label="质检结果"
        ></el-table-column>

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
        <el-table-column label="操作" min-width="90" fixed="right">
          <template slot-scope="scope">
            <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
            <el-popover
              placement="left"
              width="300"
              trigger="click"
              :ref="`popover-${scope.$index}`"
            >
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="还货数量">
                  <el-input v-model="form.RNumber"></el-input>
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
        TNumber: "", //退货数量
        RNumbers: "", //还货总计
        RNumber: "", //还货数量
        Checker: "", //质检人
        CheckerRemarks: "", //质检结果
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
          table: "ReturnOrder",
          where: { OrderNumber: this.search },
          sortJson: { _id: -1 },
        },
      })
        .then((res) => {
          res.PlanNumber = "";
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

      this.id = scope.row._id;
      this.form.RNumbers =
        parseInt(scope.row.RNumbers) + parseInt(this.form.RNumber);
      let vo = "0";
      if (
        parseInt(this.form.RNumbers) > parseInt(scope.row.TNumber) ||
        parseInt(this.form.RNumbers) == parseInt(scope.row.TNumber)
      ) {
        vo = "1";
      }
      let fs = {
        RNumbers: this.form.RNumbers,
        RNumber: this.form.RNumber,
        status: vo,
      };

      console.log("fs....", fs);
      this.update(fs); //修改当前记录

      //生成质检单
      let tempsd = JSON.parse(JSON.stringify(scope.row));
      tempsd.status = "0";
      tempsd.Checker = ""; //质检人

      tempsd.TotalCheckNum = "0"; //检验总数
      tempsd.CheckNum = "0"; //质检数量
      tempsd.NGNum = "0"; //不合格数
      tempsd.CheckRemarks = ""; //检验结果

      tempsd.ShouldNumber = scope.row.TNumber;
      tempsd.ActualNumbertotal = this.form.RNumbers;
      tempsd.ActualNumber = this.form.RNumber;

      this.$delete(tempsd, "_id");
      this.$delete(tempsd, "TNumber");
      this.$delete(tempsd, "RNumbers");
      this.$delete(tempsd, "RNumber");
      this.zjdinsert(tempsd); //

      scope._self.$refs[`popover-${scope.$index}`].doClose();
      this.findOrderNumber();
    },

    //质检单插入
    zjdinsert(v) {
      this.$https({
        method: "post",
        url: "/api/apiModel/insert",
        data: {
          table: "IncomingCheck",
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
      //   if (this.auth()) return;
      this.$https({
        method: "post",
        url: "/api/apiModel/update",
        data: {
          table: "ReturnOrder",
          form: v,
          id: this.id,
        },
      })
        .then((res) => {
          console.log(res);
          //将溢出的采购数插入盈余表中
          this.insertyyb();
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
    findreturn() {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "ReturnOrder",
          where: {},
        },
      })
        .then((res) => {
          console.log("退货单信息：", res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.findreturn();
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
