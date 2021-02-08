<template>
  <div class="container">
    <el-steps :active="0" finish-status="success" simple style="margin: 5px">
      <el-step title="材料出库单"></el-step>
      <!--<el-step title="制程"></el-step>
      <el-step title="配料"></el-step>
      <el-step title="领料"></el-step>
      <el-step title="检验"></el-step>-->
    </el-steps>
    <el-dialog
      title="表单"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <div class="dialogBody" id="dialogBody">
        <div class="d">
          <vue-qr
            :logoSrc="ewmLogo"
            :logoScale="0.2"
            :size="80"
            :margin="0"
            :auto-color="true"
            :dot-scale="1"
            :text="ewmText"
          />
        </div>
        <h1>四川凯迈新能源有限公司材料出库单</h1>
        <div class="bz">
          <div>出库单号：{{ clckdh }}</div>
          <div>库管员：{{ kgy }}</div>
          <div>接收人：{{ jsr }}</div>
        </div>
        <table id="printTable">
          <thead>
            <tr>
              <th>序号</th>
              <th>物料编码</th>
              <th>物料名称</th>
              <th>规格</th>
              <th>数量</th>
              <th>单位</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item1, index) in querydata" :key="index">
              <td v-for="(item2, key) in item1" :key="key">
                {{ item2 }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="printss">打 印</el-button>
        <el-button
          type="primary"
          v-print="printTable"
          @click="prints"
          v-show="false"
        ></el-button>
      </div>
    </el-dialog>
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

        <el-table-column property="Number" label="数量"></el-table-column>

        <el-table-column property="Company" label="单位"></el-table-column>

        <el-table-column property="Enclosure" label="附件"></el-table-column>
        <el-table-column property="Remarks" label="备注"></el-table-column>

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
          <template slot="header">
            <el-button
              type="primary"
              icon="el-icon-reading"
              circle
              size="mini"
              plain
              @click="zk()"
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
        <el-step title="材料明细"></el-step>&nbsp;&nbsp;&nbsp;<font></font>
      </el-steps>
      <el-table
        ref="tableselectData1"
        class="table"
        height="500"
        :data="tableData1"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column type="index" width="50"> </el-table-column>

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
              @click="hb"
            ></el-button> -->
            <el-button
              type="success"
              icon="el-icon-position"
              circle
              plain
              size="mini"
              @click="ts"
            ></el-button>
          </template>
          <!-- <template slot-scope="scope">
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="handleDelete(scope.row,scope.$index)"
            ></el-button>
          </template> -->
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getTime } from "common/utils/index";
import VueQr from "vue-qr";
// import { jsNums } from "common/utils/content";
export default {
  data() {
    return {
      ewmLogo: require("assets/title.png"),
      ewmText: "",
      querydata: [],
      querydataH: [],
      dialogFormVisible: false,
      printTable: {
        id: "dialogBody",
      },
      clckdh: "", //材料出库单号
      kgy: "", //库管员
      jsr: "", //接收人
      pagenums: 0,
      OrderNumbers: "",
      idArray: [],
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
      temptt: [],
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
    printss() {
      if (confirm("将开启流程控制，是否继续？")) {
        this.prints();
      }
    },
    async ts() {
      //打印
      this.temptt = [];
      for (let i = 0; i < this.tableData1.length; i++) {
        const MaterialNumber = this.tableData1[i].MaterialNumber;
        const Number = parseInt(this.tableData1[i].Number); //int,需求数
        // const Purpose = this.tableData1[i].Purpose;
        let num = 0; //库存数
        //查询商店
        await this.$https({
          method: "get",
          url: "/api/apiModel/find",
          params: {
            table: "stock",
            where: {
              MaterialNumber: MaterialNumber,
            },
          },
        })
          .then((res) => {
            num = parseInt(res[0].Number);
          })
          .catch((err) => {
            console.log(err);
          });
        let n = num - Number;
        this.temptt.push({
          MaterialNumber: MaterialNumber,
          Number: n + "",
        });
      }

      let dd = [];
      let is = 0;
      this.tableData1.forEach((item) => {
        is++;
        let {
          MaterialNumber, //物料编号
          MaterialName, //物料名称
          MaterialSpec, //规格型号
          Number, //数量
          Company, //单位
        } = item;
        dd.push({
          index: is,
          MaterialNumber, //物料编号
          MaterialName, //物料名称
          MaterialSpec, //规格型号
          Number, //数量
          Company, //单位
        });
      });
      this.querydata = dd;
      this.querydataH = Object.keys(this.querydata[0]);
      this.dialogFormVisible = true;
      this.clckdh = getTime().replace(/[\s+|/|:]/g, "");
      this.kgy = sessionStorage.getItem("loginName"); //库管员
      this.ewmText = this.clckdh;

      //库存存取
      //this.doStore();
    },

    prints() {
      this.doStore();
      this.dialogFormVisible = false;
    },
    async doStore() {
      this.$myloading({
        show: true,
      });
      this.$https({
        method: "post",
        url: "api/transaction/materialDeliveryTransaction",
        data: {
          datas: this.tableData1,
          jsr: this.jsr,
          idArray: this.idArray,
          clckdh: this.clckdh,
          Proportioner: sessionStorage.getItem("loginName"),
        },
      })
        .then((res) => {
          if (res.status) {
            this.newview();
            this.tableData1 = [];
            this.$myloading({
              show: false,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
      /////////////////////////////////////

      // let temptt = [];
      // for (let i = 0; i < this.tableData1.length; i++) {
      //   const MaterialNumber = this.tableData1[i].MaterialNumber;
      //   const Number = parseInt(this.tableData1[i].Number); //int,需求数
      //   let num = 0;
      //   //查询商店
      //   await this.$https({
      //     method: "get",
      //     url: "/api/apiModel/find",
      //     params: {
      //       table: "stock",
      //       where: {
      //         MaterialNumber: MaterialNumber,
      //       },
      //     },
      //   })
      //     .then((res) => {
      //       console.log("库存数据", res);
      //       num = parseInt(res[0].Number);
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
      //   let n = num - Number;
      //   temptt.push({
      //     MaterialNumber: MaterialNumber,
      //     Number: n + "",
      //   });
      // }
      // for (let j = 0; j < temptt.length; j++) {
      //   await this.updateStore(temptt[j].MaterialNumber, temptt[j].Number); //修改库存
      // }
      // //修改表单状态（1，不显示）
      // for (let k = 0; k < this.idArray.length; k++) {
      //   await this.updatecod(this.idArray[k], this.clckdh, this.jsr);
      // }
    },
    async updateStore(a, b) {
      await this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/apiModel/updateByWhere",
        data: {
          table: "stock",
          where: {
            MaterialNumber: a,
          },
          form: {
            Number: b,
          },
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    async updatecod(ids, CLCKNumber, jsr) {
      await this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/apiModel/update",
        data: {
          table: "materialDelivery",
          id: ids,
          form: {
            status: "1",
            CLCKNumber: CLCKNumber,
            jsr: jsr,
            Proportioner: sessionStorage.getItem("loginName"),
          },
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
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
          table: "materialDelivery",
          where: { status: "0" },
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
    async zk() {
      if (this.$refs.tableselectData.selection.length == 0) return;
      let cdew = JSON.parse(
        JSON.stringify(this.$refs.tableselectData.selection)
      );
      for (let k = 0; k < cdew.length; k++) {
        this.idArray.push(cdew[k]._id);
      }
      this.$myloading({
        show: true,
      });
      this.$https({
        method: "post",
        url: "api/transaction/materialCKZKTransaction",
        data: {
          productsh: cdew,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.status) {
            this.tableData1 = res.data;
            this.$myloading({
              show: false,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
          console.log("res===", res);
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

    async disticts() {
      console.log(this.tableData1);
      var array = [];
      array = JSON.parse(JSON.stringify(this.tableData1));
      var newArr = [];
      newArr[0] = JSON.parse(JSON.stringify(array[0]));
      newArr[0].Number = "0";
      // newArr[0].OrderNumber = this.OrderNumbers;

      array.forEach((item) => {
        newArr.forEach((item2, index) => {
          if (item.MaterialNumber == item2.MaterialNumber) {
            newArr[index].Number =
              parseInt(newArr[index].Number) + parseInt(item.Number) + "";
          } else {
            let flag = true;
            newArr.forEach((item21) => {
              if (item21.MaterialNumber === item.MaterialNumber) {
                flag = false;
              }
            });
            if (flag) {
              // item.OrderNumber = this.OrderNumbers;
              newArr.push(item);
            }
          }
        });
      });
      console.log("end==", newArr);

      this.tableData1 = newArr;
    },
  },
  created() {
    this.newview();
  },
  // import VueQr from 'vue-qr'
  components: {
    VueQr,
  },
  mounted() {},
};
</script>
<style scoped lang="less">
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
.dialogBody {
  overflow: auto;
  width: 100%;
}
#printTable {
  text-align: center;
  border-collapse: collapse;

  min-width: 100%;
  max-height: 400px;
  border: #000 1px solid;
}
#printTable th,
#printTable td {
  border: #000 1px solid;
  line-height: 30px;
}
.bz {
  display: flex;
  justify-content: space-between;
}
h1 {
  margin: 0 auto;
  height: 50px;
  margin-top: 30px;
  text-align: center;
}
.d {
  float: right;
}
</style>
