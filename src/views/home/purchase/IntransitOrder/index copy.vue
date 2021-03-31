<template>
  <div class="container">
    <el-steps :active="0" finish-status="success" simple style="margin: 5px">
      <el-step title="在途单"></el-step>
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
        <el-table-column property="Number" label="数量"></el-table-column>
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
          label="实到总数"
        ></el-table-column>

        <el-table-column
          property="ActualNumber"
          label="本次实到数量"
        ></el-table-column>

        <el-table-column
          property="ActualPrice"
          label="采购单价"
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
            <!-- <el-button size="mini" v-preventReClick  @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
            <el-popover
              placement="left"
              width="300"
              trigger="click"
              :ref="`popover-${scope.$index}`"
            >
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="本次到数">
                  <el-input v-model="form.ActualNumber"></el-input>
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
            <!-- <el-button
              calss="popovers"
              type="success"
              icon="el-icon-position"
              circle
              plain
              size="mini"
              v-preventReClick  @click="sclljyd(scope.row)"
            ></el-button> -->
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
        ShouldNumber: "", //采购应到数量
        ActualNumbertotal: "", //采购总数
        ActualNumber: "", //本次采购数量
        ActualPrice: "", //采购单价
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
          table: "IntransitOrder",
          where: { OrderNumber: this.search },
          sortJson: { _id: -1 },
        },
      })
        .then((res) => {
          this.tableData = res;
          console.log(this.tableData);
        })
        .catch((err) => {
          console.log(err);
        });
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
    handleEdit(scope) {
      this.id = scope.row._id;
      let cfd =
        parseInt(scope.row.ActualNumbertotal) +
        parseInt(this.form.ActualNumber);
      let stu = "0";
      if (scope.row.ShouldNumber <= cfd) {
        stu = "1";
      }
      let fs = {
        ActualNumbertotal: cfd + "", //实到总数量
        ActualNumber: this.form.ActualNumber, //该次到货数量
        status: stu,
      };
      console.log("fs....", fs);
      //修改在途单
      this.update(fs);

      let tempsd = JSON.parse(JSON.stringify(scope.row));

      tempsd.ActualNumber = this.form.ActualNumber;
      tempsd.ActualNumbertotal = cfd + "";
      tempsd.status = "0";
      tempsd.TotalCheckNum = "0"; //检验总数
      tempsd.CheckNum = "0"; //质检数量
      tempsd.NGNum = "0"; //不合格数
      tempsd.CheckRemarks = ""; //检验结果
      tempsd.Checker = ""; //质检人
      tempsd.creatdate = getTime(); //创建时间
      this.$delete(tempsd, "_id");
      this.zjdinsert(tempsd); //新增质检
      scope._self.$refs[`popover-${scope.$index}`].doClose();
      this.findOrderNumber();

      //进入推单模式
      this.getProcessState(tempsd.OrderNumber, "IntransitOrder", "1", "6");
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
          table: "IntransitOrder",
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

    // async findyy() {
    //   await this.$https({
    //     //这里是你自己的请求方式、url和data参数
    //     method: "get",
    //     url: "/api/apiModel/find",
    //     params: {
    //       table: "PurchaseSurplus",
    //       where: {
    //         MaterialNumber: this.form.MaterialNumber
    //       }
    //     }
    //   })
    //     .then(res => {
    //       console.log(res);
    //       this.tempdata = res;
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
    // insertyy(cs) {
    //   this.$https({
    //     //这里是你自己的请求方式、url和data参数
    //     method: "post",
    //     url: "/api/apiModel/insert",
    //     data: {
    //       table: "PurchaseSurplus",
    //       form: {
    //         MaterialNumber: this.form.MaterialNumber,
    //         Number: cs
    //       }
    //     }
    //   })
    //     .then(function(res) {
    //       console.log(res);
    //     })
    //     .catch(function(err) {
    //       console.log(err);
    //     });
    // },
    // updateyy(nu, id) {
    //   this.$https({
    //     //这里是你自己的请求方式、url和data参数
    //     method: "post",
    //     url: "/api/apiModel/update",
    //     data: {
    //       table: "PurchaseSurplus",
    //       form: {
    //         Number: nu
    //       },
    //       id: id
    //     }
    //   })
    //     .then(function(res) {
    //       console.log(res);
    //     })
    //     .catch(function(err) {
    //       console.log(err);
    //     });
    // },

    // //同时生成来料检验单
    // sclljyd(rows) {
    //   console.log(rows);
    //   this.$https({
    //     //这里是你自己的请求方式、url和data参数
    //     method: "post",
    //     url: "/api/apiModel/insert",
    //     data: {
    //       table: "IncomingCheck",
    //       form: rows
    //     }
    //   })
    //     .then(function(res) {
    //       console.log("生成材料检验单", res);
    //     })
    //     .catch(function(err) {
    //       console.log(err);
    //     });
    // },

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
