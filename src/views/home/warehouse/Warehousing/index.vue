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
        <el-step title="材料入库单"></el-step>&nbsp;&nbsp;&nbsp;<font>{{
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

        <el-table-column property="OKNumber" label="待入库数"></el-table-column>
        <el-table-column
          property="FirmOKNumber"
          label="入库数"
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
        <el-table-column label="入库" min-width="90" fixed="right">
          <template slot-scope="scope">
            <!-- <el-button size="mini" v-preventReClick  @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
            <el-popover
              placement="left"
              width="300"
              trigger="click"
              :ref="`popover-${scope.$index}`"
            >
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="入库数量">
                  <el-input v-model="form.FirmOKNumber"></el-input>
                </el-form-item>

                <!-- <el-form-item label="库位">
                  <el-input v-model="form.Location"></el-input>
                </el-form-item>
                <el-form-item label="材料来源">
                  <el-input v-model="form.MaterialSource"></el-input>
                </el-form-item> -->
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
        OrderNumber: "", //订单编号
        PurchaseNumber: "", //采购编号
        CheckNumber: "", //质检编号
        supplierNumber: "", //供应商编号
        supplierName: "", //供应商名称
        Contacts: "", //联系人
        ContactsPhone: "", //联系人电话
        MaterialNumber: "", //物料编号
        MaterialName: "", //物料名称
        MaterialSpec: "", //规格型号
        Thumbnail: "", //缩略图
        OKNumber: "", //待入库数
        FirmOKNumber: "", //入库数量
        Location: "", //库位
        MaterialSource: "", //材料来源
        Status: "", //状态
        checker: "", //检验人
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
          table: "Warehousing",
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
          where: { processCode: { $gt: "0" } },
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
      this.form.FirmOKNumber = this.form.FirmOKNumber || "0";
      this.form.OKNumber = scope.row.OKNumber;
      let drknum =
        parseInt(this.form.OKNumber) - parseInt(this.form.FirmOKNumber);
      if (drknum < 0) {
        alert("不能大于带入库数！");
        return;
      }
      console.log("------", scope.row);
      scope._self.$refs[`popover-${scope.$index}`].doClose();

      this.$myloading({
        show: true,
      });
      this.$https({
        method: "post",
        url: "api/transaction/WarehousingTransaction",
        data: {
          form: this.form,
          row: scope.row,
          Purpose: scope.row.Purpose,
          creater: sessionStorage.getItem("loginName"),
          creatdate: getTime(),
        },
      })
        .then((res) => {
          console.log("返回：", res);
          if (res.status) {
            this.newview();
            this.findOrderNumber();
            this.$myloading({
              show: false,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
      //?
    },
    findOrderNumber() {
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "Warehousing",
          where: { CheckNumber: this.CheckNumber, status: "0" },
          sortJson: { _id: -1 },
        },
      })
        .then((res) => {
          this.tableData1 = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //查询盈余表数据
    async findyyb() {
      // console.log("查询盈余表数据....->",{MaterialNumber:this.form.MaterialNumber})
      // await this.$https({
      //   //这里是你自己的请求方式、url和data参数
      //   method: "get",
      //   url: "/api/apiModel/find",
      //    params:{
      //     table:"PurchaseSurplus",
      //     where:{
      //       MaterialNumber:this.form.MaterialNumber
      //     }
      //   }
      // })
      //   .then(res => {
      //     console.log("查询的盈余表数据:",res);
      //     this.yybdat=res;
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    },
    //更新盈余表数据
    updatepy(v) {
      console.log(v);
      // this.$https({
      //   //这里是你自己的请求方式、url和data参数
      //   method: "post",
      //   url: "/api/apiModel/updateByWhere",
      //   data: {
      //     table: "PurchaseSurplus",
      //     form: { Number: v+"" },
      //     where: {MaterialNumber:this.form.MaterialNumber}
      //   }
      // })
      //   .then(res => {
      //     console.log(res);
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    },
    updateyyzzbs(ids, v) {
      console.log(ids, v);
      // this.$https({
      //   //这里是你自己的请求方式、url和data参数
      //   method: "post",
      //   url: "/api/apiModel/update",
      //   data: {
      //     table: "PurchaseSurplusState",
      //     id:ids+"",
      //     form:v
      //   }
      // })
      //   .then(function(res) {
      //     console.log(res);
      //   })
      //   .catch(function(err) {
      //     console.log(err);
      //   });
    },
    //删除盈余状态表
    deleteyyzzbs(ids) {
      console.log(ids);
      //    this.$https({
      //   //这里是你自己的请求方式、url和data参数
      //   method: "post",
      //   url: "/api/apiModel/delete",
      //   data: {
      //     table: "PurchaseSurplusState",
      //     id:ids+""
      //   }
      // })
      //   .then(function(res) {
      //     console.log(res);
      //   })
      //   .catch(function(err) {
      //     console.log(err);
      //   });
    },
    //找寻盈余状态表
    async findyyztbs() {
      // await this.$https({
      //   methods:"get"
      //   ,url:"api/apiMOdel/find",
      //   params:{
      //     table:"PurchaseSurplusState",
      //     where:{
      //       MaterialNumber:this.form.MaterialNumber,
      //       OrderNumber:this.form.OrderNumber
      //     }
      //   }
      // }).then(res=>{
      //   console.log(res);
      //   this.yyztbdata=res;
      // }).catch(err=>{
      //   console.log(err)
      // })
    },

    async findck(MaterialNumbers) {
      let stsdata = [];
      await this.$https({
        method: "get",
        url: "api/apiModel/find",
        params: {
          table: "stock",
          where: {
            MaterialNumber: MaterialNumbers,
          },
        },
      })
        .then((res) => {
          stsdata = res;
        })
        .catch((err) => {
          console.log(err);
        });
      return stsdata;
    },
    ckupdate(tempd, ids) {
      this.$https({
        method: "post",
        url: "/api/apiModel/update",
        data: {
          table: "stock",
          form: tempd,
          id: ids,
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    ckinsert(v) {
      this.$https({
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
    //数据修改
    update(v, ids) {
      //   if (this.auth()) return;
      this.$https({
        method: "post",
        url: "/api/apiModel/update",
        data: {
          table: "Warehousing",
          form: v,
          id: ids,
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
      // await this.$https({
      //   //这里是你自己的请求方式、url和data参数
      //   method: "get",
      //   url: "/api/apiModel/find",
      //   params: {
      //     table: "PurchaseSurplus",
      //     where: {
      //       MaterialNumber: this.form.MaterialNumber
      //     }
      //   }
      // })
      //   .then(res => {
      //     console.log(res);
      //     this.tempdata = res;
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    },
    insertyy(cs) {
      console.log(cs);
      // this.$https({
      //   //这里是你自己的请求方式、url和data参数
      //   method: "post",
      //   url: "/api/apiModel/insert",
      //   data: {
      //     table: "PurchaseSurplus",
      //     form: {
      //       MaterialNumber: this.form.MaterialNumber,
      //       Number: cs
      //     }
      //   }
      // })
      //   .then(function(res) {
      //     console.log(res);
      //   })
      //   .catch(function(err) {
      //     console.log(err);
      //   });
    },
    updateyy(nu, id) {
      console.log(nu, id);
      // this.$https({
      //   //这里是你自己的请求方式、url和data参数
      //   method: "post",
      //   url: "/api/apiModel/update",
      //   data: {
      //     table: "PurchaseSurplus",
      //     form: {
      //       Number: nu
      //     },
      //     id: id
      //   }
      // })
      //   .then(function(res) {
      //     console.log(res);
      //   })
      //   .catch(function(err) {
      //     console.log(err);
      //   });
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
