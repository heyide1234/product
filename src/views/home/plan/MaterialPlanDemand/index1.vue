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
        <el-step title="订单材料明细"></el-step>&nbsp;&nbsp;&nbsp;<font>{{
          OrderNumbers
        }}</font>
      </el-steps>
      <el-table
        ref="tableselectData"
        class="table"
        height="500"
        :data="tableData1"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column
          property="OrderNumber"
          label="订单编号"
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

        <el-table-column property="Number" label="数量"></el-table-column>

        <el-table-column property="Company" label="单位"></el-table-column>

        <el-table-column property="Enclosure" label="附件"></el-table-column>
        <el-table-column property="Remarks" label="备注"></el-table-column>

        <el-table-column label="操作" min-width="90" fixed="right">
          <template slot="header">
            <!-- <el-button
              type="success"
              icon="el-icon-office-building"
              plain
              circle
              size="mini"
              v-preventReClick  @click="hb"
            ></el-button> -->
            <el-button
              type="success"
              icon="el-icon-position"
              circle
              plain
              size="mini"
              v-preventReClick
              @click="ts"
            ></el-button>
          </template>
          <!-- <template slot-scope="scope">
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              v-preventReClick  @click="handleDelete(scope.row,scope.$index)"
            ></el-button>
          </template> -->
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { jsNums } from "common/utils/content";
export default {
  data() {
    return {
      pagenums: 0,
      OrderNumbers: "",
      dts: [],
      form: {
        OrderNumber: "", //订单编号
        MaterialNumber: "", //产品编号
        MaterialName: "", //产品名称
        MaterialPrice: "", //产品价格
        Number: "", //产品数量
        CustomerMaterialNumber: "", //客户物料编号
        CustomerMaterialName: "", //客户物料名称
        status: "", //状态
        creater: "", //创建人
        creatdate: "", //创建时间
      },
      form1: {
        MaterialNumber: "", //物料编号
        MaterialName: "", //物料名称
        Thumbnail: "", //缩略图
        MaterialSpec: "", //规格型号
        MaterialTexture: "", //材质
        Remarks: "", //备注
        Enclosure: "", //附件
        Number: "", //数量
        Company: "", //单位
        Parent: "", //父节点物料编号
        creater: "", //创建人
        creatdate: "", //创建时间
      },
      total: 0,
      tableData: [],
      tableData1: [],
      datas: [],
      datas1: [],
      temoData1: [],
      states: false,
    };
  },
  methods: {
    handleDelete(row, index) {
      console.log(row._id);

      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/apiModel/delete",
        data: {
          table: "MaterialDemand",
          id: row._id,
        },
      })
        .then((res) => {
          console.log(res);
          this.tableData1.splice(index, 1);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    async findOrderds(OrderNumber) {
      let temps = [];
      await this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "MaterialDemand",
          where: { OrderNumber: OrderNumber },
        },
      })
        .then((res) => {
          console.log(res);
          temps = res;
        })
        .catch(function (err) {
          console.log(err);
        });
      return temps;
    },
    async ts() {
      let cdsd = await this.findOrderds(this.OrderNumbers);

      if (cdsd.length > 0) return;
      this.updatesalesOrderDetail(this.OrderNumbers); //修改订单明细的状态为2
      for (let i = 0; i < this.tableData1.length; i++) {
        this.$delete(this.tableData1[i], "_id");
        this.tableData1[i].status = "0";
        this.$https({
          //这里是你自己的请求方式、url和data参数
          method: "post",
          url: "/api/apiModel/insert",
          data: {
            table: "MaterialDemand",
            form: this.tableData1[i],
          },
        })
          .then(function (res) {
            console.log(res);
          })
          .catch(function (err) {
            console.log(err);
          });
      }

      //进入推单模式
      this.getProcessState(this.OrderNumbers, "MaterialDemand", "-1", "3");
      this.tableData1 = [];
      this.OrderNumbers = "";
      //this.findByPageNum();
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
                this.update12(); //修改该订单的状态为1（不可编辑）
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
    //获取页面数
    // getpage() {
    //   this.$https({
    //     method: "get",
    //     url: "/api/apiModel/getpage",
    //     params: {
    //       table: "salesOrderDetail"
    //     }
    //   })
    //     .then(res => {
    //       console.log("总页数");
    //       console.log(res);
    //       this.total = res;
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
    //添加事件

    //选择展示页数据
    // handleCurrentChange(val) {
    //   console.log(`当前页: ${val}`);
    //   this.pagenums = (val - 1) * 10;
    //   console.log("---====---", this, this.pagenums);
    //   this.findByPageNum();
    // },

    //刷新界面
    newview() {
      // this.getpage(); //刷新分页
      this.findByPageNum(); //找寻对应页面的数据
    },

    //根据page数查询对应数据
    findByPageNum() {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "salesOrder",
          where: { processCode: "2" },
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
    updatesalesOrderDetail(OrderNumbers) {
      this.$https({
        method: "post",
        url: "/api/apiModel/updateByWhere",
        data: {
          table: "salesOrderDetail",
          where: { OrderNumber: OrderNumbers },
          form: { status: "2" },
        },
      })
        .then(function (res) {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    hb() {
      this.disticts();
    },
    async zk(row) {
      const loading = this.$loading({
        lock: true,
        text: "BOM计算中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      console.log("row====", row);
      this.OrderNumbers = row.OrderNumber;

      let cdew = await this.findsalesOrderByOrderNumber(this.OrderNumbers); //销售订单明细

      this.tableData1 = [];
      this.dts = [];
      for (let i = 0; i < cdew.length; i++) {
        if (cdew[i].Number == "0") continue;
        await this.findnum2(cdew[i].MaterialNumber);
        // console.log("datas1====", this.datas1);
        let cds = cdew[i];
        cds.MaterialSpec = this.datas1[0].MaterialSpec;
        cds.MaterialTexture = this.datas1[0].MaterialTexture;
        cds.Company = this.datas1[0].Company;
        cds.datas1Enclosure = this.datas1[0].datas1Enclosure;
        this.getzk(cds);
      }
      let len = 0;
      let timer = setInterval(() => {
        if (len == this.dts.length) {
          clearInterval(timer);
          this.tableData1 = jsNums(this.dts, "MaterialNumber", "Number");
          this.tableData1.forEach((element) => {
            element.OrderNumber = this.OrderNumbers;
          });
          loading.close();
        } else {
          len = this.dts.length;
        }
      }, 500);
    },
    async findsalesOrderByOrderNumber(v) {
      let code = [];
      await this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "salesOrderDetail",
          where: { OrderNumber: v },
        },
      })
        .then((res) => {
          console.log(res);
          code = res;
        })
        .catch((err) => {
          console.log(err);
        });
      return code;
    },
    findOrderNumber(OrderNumber) {
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "MaterialDemand",
          where: { OrderNumber: OrderNumber },
          sortJson: { _id: -1 },
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async findnum2(productNumber) {
      await this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__basicMaterialList",
          dataBase: "base",
          where: { MaterialNumber: productNumber },
          sortJson: { _id: -1 },
        },
      })
        .then((res) => {
          console.log("res123456===", res);
          this.datas1 = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async findnum(productNumber) {
      await this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__materialDetails",
          dataBase: "base",
          where: { Parent: productNumber },
          sortJson: { _id: -1 },
        },
      })
        .then((res) => {
          this.datas = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //展开BOM
    async getzk(num, n1 = "1") {
      let numc = num;
      let n = parseInt(numc.Number) * parseInt(n1) + ""; //当前数

      await this.findnum(numc.MaterialNumber); //当前产品对应的物料list
      let mums = this.datas;
      if (mums.length > 0) {
        for (let i = 0; i < mums.length; i++) {
          this.getzk(mums[i], n);
        }
      } else {
        numc.Number = n;
        this.dts.push(numc);

        return;
      }
    },
    // //计算数量
    // jsNum(arr, ids, attr) {
    //   if (arr.length == 1) return arr;
    //   // debugger;
    //   arr.sort((a, b) => {
    //     return parseInt(a[ids]) - parseInt(b[ids]);
    //   });
    //   let newArr = [];
    //   let obj = null;
    //   for (let i = 0; i < arr.length; i++) {
    //     if (obj == null) {
    //       obj = arr[i];
    //     } else {
    //       if (obj[ids] == arr[i][ids]) {
    //         obj[attr] = parseInt(obj[attr]) + parseInt(arr[i][attr]) + "";
    //         if (arr.length - 1 == i) newArr.push(obj);
    //       } else {
    //         newArr.push(obj);
    //         obj = arr[i];
    //         if (arr.length - 1 == i) newArr.push(obj);
    //       }
    //     }
    //   }
    //   console.log("计算数组", newArr);
    //   return newArr;
    // },
    async disticts() {
      // console.log(this.tableData1);
      // var array = [];
      // array = JSON.parse(JSON.stringify(this.tableData1));
      // var newArr = [];
      // newArr[0] = JSON.parse(JSON.stringify(array[0]));
      // newArr[0].Number = "0";
      // newArr[0].OrderNumber = this.OrderNumbers;
      // array.forEach(item => {
      //   newArr.forEach((item2, index) => {
      //     if (item.MaterialNumber == item2.MaterialNumber) {
      //       newArr[index].Number =
      //         parseInt(newArr[index].Number) + parseInt(item.Number) + "";
      //     } else {
      //       let flag = true;
      //       newArr.forEach(item21 => {
      //         if (item21.MaterialNumber === item.MaterialNumber) {
      //           flag = false;
      //         }
      //       });
      //       if (flag) {
      //         item.OrderNumber = this.OrderNumbers;
      //         newArr.push(item);
      //       }
      //     }
      //   });
      // });
      // console.log("end==", newArr);
      // this.tableData1 = [];
      // this.tableData1 = newArr;
    },
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
