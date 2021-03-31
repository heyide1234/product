<template>
  <div class="container">
    <el-steps :active="0" finish-status="success" simple style="margin: 5px">
      <el-step title="采购单号"></el-step>
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
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="10"
          layout=" prev, pager, next"
          :total="total"
        ></el-pagination>
      </div>
      <el-steps
        :active="0"
        finish-status="success"
        simple
        style="margin: 40px 5px 5px 5px"
      >
        <el-step title="在途单"></el-step>&nbsp;&nbsp;&nbsp;<font>{{
          PurchaseNumber
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

        <el-table-column property="Thumbnail" label="缩略图">
          <template slot-scope="scope">
            <img class="bigImg" :src="scope.row.Thumbnail" alt="" />
          </template>
        </el-table-column>

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
        <!-- <el-table-column
          property="PlanNumber"
          label="计划采购数量"
        ></el-table-column> -->
        <el-table-column
          property="ShouldNumber"
          label="采购应到数量"
        ></el-table-column>
        <el-table-column
          property="ActualNumbertotal"
          label="实到总数"
        ></el-table-column>
        <el-table-column property="SYtotal" label="剩余数"></el-table-column>

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
import { jsNums } from "common/utils/content";
export default {
  data() {
    return {
      PurchaseNumber: "",
      total: 0,
      pagenums: 0,
      OrderNumberArr: [],
      tableData: [],
      tableData1: [],
      pyid: "",
      tempdata: [],
      form: {
        CheckNumber: "", //质检单号
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
        SYtotal: "", //剩余数量
        ActualPrice: "", //采购单价
        status: "", //状态
        creater: "", //创建人
        creatdate: "", //创建时间
      },
    };
  },
  methods: {
    newview() {
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "salesOrder",
          where: { processCode: { $gte: "5" } },
        },
      })
        .then((res) => {
          console.log(res);
          res.map((item) => {
            this.OrderNumberArr.push(item.OrderNumber);
          });
          this.getpage(this.OrderNumberArr);
          this.findHead(this.OrderNumberArr);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //选择展示页数据
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenums = (val - 1) * 10;
      console.log("---====---", this, this.pagenums);
      this.findHead(this.OrderNumberArr);
    },
    //获取页面数
    getpage(OrderNumberArr) {
      this.$https({
        method: "get",
        url: "/api/apiModel/getpage",
        params: {
          table: "CGDhead",
          pageWhere: { OrderNumber: { $in: OrderNumberArr } },
        },
      })
        .then((res) => {
          console.log("总页数");
          console.log(res);
          this.total = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    findHead(OrderNumberArr) {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/findByPageNum",
        params: {
          table: "CGDhead",
          PageNum: this.pagenums,
          sortJson: { OrderNumber: -1 },
          pageWhere: { OrderNumber: { $in: OrderNumberArr } },
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
    //刷新界面
    async _newview() {
      this.tableData = [];
      this.tempdata = [];
      // let d = [];
      let dts = await this.find(); //找寻对应页面的数据
      if (dts.length > 0) {
        //将该流程的所有信息查询

        for (let i = 0; i < dts.length; i++) {
          let orderNumber = dts[i].OrderNumber; //订单编号
          await this.$https({
            method: "get",
            url: "/api/apiModel/find",
            params: {
              table: "IntransitOrder",
              where: { OrderNumber: orderNumber },
              sortJson: { _id: -1 },
            },
          })
            .then((res) => {
              this.tempdata.push(...res);
              //d.apply(d,res);
            })
            .catch((err) => {
              console.log(err);
            });
        }
        //this.tempdata = d; //存储该流程的在途信息
        console.log("在途信息。。", this.tempdata);
        this.tempdata.forEach((element) => {
          console.log("..。", element.MaterialNumber, element.supplierName);
        });
        let po = []; //PO
        this.tempdata.filter((item) => {
          if (po.indexOf(item.PurchaseNumber) == -1) {
            po.push(item.PurchaseNumber);
          }
        });
        console.log("po", po);
        let tdd = [];
        for (let j = 0; j < po.length; j++) {
          for (let k = 0; k < this.tempdata.length; k++) {
            let item = this.tempdata[k];

            if (item.PurchaseNumber == po[j]) {
              let temps = {
                OrderNumber: item.OrderNumber, //订单编号
                PurchaseNumber: item.PurchaseNumber, //采购编号
                supplierNumber: item.supplierNumber, //供应商编号
                supplierName: item.supplierName, //供应商名称
                Contacts: item.Contacts, //联系人
                ContactsPhone: item.ContactsPhone, //联系人电话
              };

              tdd.push(temps);
              break;
            }
          }
        }
        console.log("tdd", tdd);
        this.tableData = tdd;
      }
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
          where: { processCode: { $gte: "5" } },
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
      this.PurchaseNumber = row.PurchaseNumber;
      this.tableData1 = [];
      this.finddetail();
    },
    finddetail() {
      //过滤数据
      // let ds = [];
      // ds = this.tempdata.filter((item) => {
      //   return item.PurchaseNumber == this.PurchaseNumber;
      // });
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "IntransitOrder",
          where: { PurchaseNumber: this.PurchaseNumber },
          sortJson: { MaterialNumber: 1 },
        },
      })
        .then((res) => {
          this.tableData1 = jsNums(res, "MaterialNumber", "ShouldNumber");
          this.tableData1 = res;
          // console.log(this.tableData1);
        })
        .catch((err) => {
          console.log(err);
        });

      // ds.sort((a, b) => {
      //   return a.MaterialNumber - b.MaterialNumber;
      // });

      // this.tableData1 = this.jsNum(
      //   JSON.parse(JSON.stringify(ds)),
      //   "MaterialNumber",
      //   "ShouldNumber"
      // );

      //this.tableData1 = ds;
    },
    //计算数量
    jsNum(arr, ids, attr) {
      // debugger;
      let newArr = [];
      let obj = null;
      if (arr.length == 1) return arr;
      for (let i = 0; i < arr.length; i++) {
        if (obj == null) {
          obj = arr[i];
        } else {
          if (obj[ids] == arr[i][ids]) {
            obj[attr] = parseInt(obj[attr]) + parseInt(arr[i][attr]) + "";
            if (arr.length - 1 == i) newArr.push(obj);
          } else {
            newArr.push(obj);
            obj = arr[i];
          }
        }
      }
      console.log(newArr);
      return newArr;
    },
    //////////////////////////////////////////////////////////////////

    async getCheckNumber(yyr) {
      let checkNum = "";
      let ces = parseInt(yyr + "000"); //初始采购单
      let cdss = { CheckNumber: { $regex: yyr } };
      let cgd = [];
      //查询最高采购单号
      await this.$https({
        method: "get",
        url: "api/apiModel/find",
        params: {
          table: "IncomingCheck",
          where: cdss,
        },
      })
        .then((res) => {
          cgd = res;
        })
        .catch((err) => {
          console.log(err);
        });
      cgd = cgd.filter((item) => {
        return item.CheckNumber != "";
      });

      if (cgd.length > 0) {
        cgd.sort((a, b) => {
          return parseInt(a.CheckNumber) - parseInt(b.CheckNumber);
        });
        ces = parseInt(cgd[cgd.length - 1].CheckNumber); //最高采购单号
      }

      checkNum = ces + 1 + "";
      return checkNum;
    },
    async handleEdit1(row) {},
    //编辑事件
    async handleEdit(scope) {
      this.id = scope.row._id;

      let CheckNumber = scope.row.CheckNumber;
      if (CheckNumber == "" || CheckNumber == null) {
        //查询质检单号
        let dt = new Date();
        let Y = dt.getFullYear() + "";
        let M = dt.getMonth() + 1 + "";
        let D = dt.getDate() + "";
        M = M.padStart(2, "0");
        D = D.padStart(2, "0");
        let yyr = Y + M + D + "";
        CheckNumber = await this.getCheckNumber(yyr);
      }
      let tempsd = JSON.parse(JSON.stringify(scope.row));
      tempsd.CheckNumber = CheckNumber; //质检单号
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
      //修改数量
      let cfd =
        parseInt(scope.row.ActualNumbertotal) +
        parseInt(this.form.ActualNumber);
      let stu = "0";
      let SYtotals = 0;
      if (scope.row.ShouldNumber <= cfd) {
        stu = "1";
      }
      if (scope.row.ShouldNumber > cfd) {
        SYtotals = parseInt(scope.row.ShouldNumber) - parseInt(cfd);
      }
      let fs = {
        ActualNumbertotal: cfd + "", //实到总数量
        ActualNumber: this.form.ActualNumber, //该次到货数量
        CheckNumber: CheckNumber,
        SYtotal: SYtotals + "",
        status: stu,
      };
      let fsf = {
        PurchaseNumber: scope.row.PurchaseNumber,
        MaterialNumber: scope.row.MaterialNumber,
      };
      console.log("fs....", fsf);
      //修改在途单
      this.update(fs, fsf);

      scope._self.$refs[`popover-${scope.$index}`].doClose();
      //进入推单模式
      this.getProcessState(tempsd.OrderNumber, "IntransitOrder", "1", "6");
    },
    findOrderNumber() {
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "IntransitOrder",
          where: { PurchaseNumber: this.PurchaseNumber },
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
    getProcessState(orderNumber, processCode) {
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
    async update(v, v2) {
      //   if (this.auth()) return;
      this.$https({
        method: "post",
        url: "/api/apiModel/updateByWhere",
        data: {
          table: "IntransitOrder",
          form: v,
          where: v2,
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      this.newview();
      this.finddetail();
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
