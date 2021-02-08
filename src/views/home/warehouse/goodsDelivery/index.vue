<template>
  <div class="container">
    <el-steps :active="0" finish-status="success" simple style="margin: 5px">
      <el-step title="成品出库单"></el-step>
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
        <h1>四川凯迈新能源有限公司成品出库单</h1>
        <div class="bz">
          <div>出库单号：{{ clckdh }}</div>
          <div>库管员：{{ kgy }}</div>
          <div>接收人：{{ jsr }}</div>
        </div>
        <table id="printTable">
          <thead>
            <tr>
              <th>序号</th>
              <th>产品编码</th>
              <th>产品名称</th>
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
        <el-button type="primary" @click="dys">打 印</el-button>
        <el-button
          type="primary"
          v-print="printTable"
          @click="dy"
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
        <el-table-column
          property="MaterialNumber"
          label="产品编号"
        ></el-table-column>

        <el-table-column
          property="MaterialName"
          label="产品名称"
        ></el-table-column>

        <el-table-column
          property="MaterialPrice"
          label="产品价格"
        ></el-table-column>
        <el-table-column
          property="CustomerMaterialNumber"
          label="客户物料编号"
        ></el-table-column>
        <el-table-column
          property="CustomerMaterialName"
          label="客户物料名称"
        ></el-table-column>
        <el-table-column property="Number" label="出库数"></el-table-column>

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

        <!-- <el-table-column property="SN" label="SN"></el-table-column> -->
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

        <!-- <el-table-column
          property="MaterialTexture"
          label="材质"
        ></el-table-column> -->

        <el-table-column property="Number" label="数量"></el-table-column>

        <el-table-column property="Company" label="单位"></el-table-column>

        <el-table-column property="Enclosure" label="附件"></el-table-column>
        <el-table-column property="Remarks" label="备注"></el-table-column>

        <el-table-column label="操作" min-width="90" fixed="right">
          <template slot="header">
            <el-button
              type="success"
              icon="el-icon-position"
              plain
              circle
              size="mini"
              @click="tsw"
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
import { jsNums } from "common/utils/content";
export default {
  components: {
    VueQr,
  },
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
      seleArr: [],
      seleArrT: [],

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
    async tsw() {
      //打印
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

      this.clckdh = getTime().replace(/[\s+|/|:]/g, "");
      this.kgy = sessionStorage.getItem("loginName"); //库管员
      this.ewmText = this.clckdh;
      this.dialogFormVisible = true;

      //库存存取
      //this.doStore();
    },
    dys() {
      if (confirm("是否开启流程控制！")) this.dy();
      console.log(" this.tableData1==", this.tableData1);
    },
    async dy() {
      this.dialogFormVisible = false;
      this.$myloading({
        show: true,
      });
      this.$https({
        method: "post",
        url: "api/transaction/goodsDeliveryTransaction",
        data: {
          datas: this.tableData1,
          seleArrT: this.seleArrT,
          Proportioner: sessionStorage.getItem("loginName"), //创建人
        },
      })
        .then((res) => {
          if (res.status) {
            this.$myloading({
              show: false,
            });
            this.newview();
            this.tableData1 = [];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async updateZZSN(_SN) {
      await this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/apiModel/updateByWhere",
        data: {
          table: "ManufacturingExecution",
          where: { SN: _SN },
          form: {
            IsDeliverGoods: "2",
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
    //库存操作
    async ts() {
      //库存存取
      //Proportioner: sessionStorage.getItem("loginName")
      // this.doStore(
      //   this.tableData1,
      //   this.seleArrT,
      //   sessionStorage.getItem("loginName")
      // );
      //
    },
    async doStore(datas, seleArrT) {
      for (let j = 0; j < datas.length; j++) {
        const MaterialNumber = datas[j].MaterialNumber;
        const _Number = parseInt(datas[j].rknums); //int,需求数
        await this.updateStore(MaterialNumber, _Number + ""); //修改库存
      }
      //修改表单状态（1，不显示）
      for (let k = 0; k < seleArrT.length; k++) {
        await this.updatecod(seleArrT[k]._id);
      }
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
            // Purpose: "生产制造"
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
    async updatecod(ids) {
      await this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/apiModel/update",
        data: {
          table: "goodsDelivery",
          id: ids,
          form: {
            status: "1",
            Proportioner: sessionStorage.getItem("loginName"),
          },
        },
      })
        .then((res) => {
          console.log(res);
          this.newview();
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
          table: "goodsDelivery",
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
    zk() {
      if (this.$refs.tableselectData.selection.length == 0) return;
      let cdew = this.$refs.tableselectData.selection; //选取数组
      this.seleArrT = cdew; //记录选中的选项
      //去重
      this.tableData1 = jsNums(
        JSON.parse(JSON.stringify(cdew)),
        "MaterialNumber",
        "Number"
      );
    },
    async zk1() {
      if (this.$refs.tableselectData.selection.length == 0) return;
      let cdew = this.$refs.tableselectData.selection; //选取数组
      this.seleArrT = cdew;
      this.jsr = cdew[0].creater;
      const loading = this.$loading({
        lock: true,
        text: "SN计算中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout(() => {
        loading.close();
      }, 1000);

      this.tableData1 = [];
      let _materialNumberArr = []; //存储物料编码
      let tempArr = []; //去重数组--sn分配
      // debugger;
      for (let i = 0; i < cdew.length; i++) {
        if (_materialNumberArr.indexOf(cdew[i].MaterialNumber) === -1) {
          _materialNumberArr.push(cdew[i].MaterialNumber);
        }
      }
      // debugger;
      for (let m = 0; m < _materialNumberArr.length; m++) {
        let num = 0;
        let _obj = null;
        for (let n = 0; n < cdew.length; n++) {
          if (_materialNumberArr[m] == cdew[n].MaterialNumber) {
            _obj = JSON.parse(JSON.stringify(cdew[n]));
            num += parseInt(_obj.Number);
          }
        }
        _obj.Number = num + "";
        tempArr.push(_obj);
      }

      this.seleArr = tempArr;
      console.log("tempArr产品", tempArr);
      let dsd = [];
      for (let k = 0; k < tempArr.length; k++) {
        const _MaterialNumber = tempArr[k].MaterialNumber; //产品编码
        const _Number = tempArr[k].Number; //产品数量
        //1.根据产品编码查询制造SN&&IsDeliverGoods=1(库存)
        let d1 = await this.findByMaterialNumber(_MaterialNumber);
        if (d1.length == 0) {
          this.$notify({
            title: "警告",
            message: "库存不足！【" + _MaterialNumber + "】",
            type: "warning",
            duration: 0,
          });
          return;
        }
        if (d1.length > 0) {
          let nums = parseInt(d1[0].Number) - parseInt(_Number);
          if (nums < 0) {
            this.$notify({
              title: "警告",
              message: "库存不足！【" + _MaterialNumber + "】",
              type: "warning",
              duration: 0,
            });
            return;
          } else {
            //缓存数据
            dsd.push({
              MaterialNumber: d1[0].MaterialNumber, //物料编号
              MaterialName: d1[0].MaterialName, //物料名称
              Thumbnail: d1[0].Thumbnail, //缩略图
              MaterialSpec: d1[0].MaterialSpec, //规格型号
              Enclosure: d1[0].Enclosure, //附件
              Number: tempArr[k].Number, //数量
              Company: d1[0].Company, //单位
              Remarks: d1[0].Remarks, //备注
              rknums: nums,
              creater: tempArr[k].creater, //创建人
              creatdate: tempArr[k].creatdate, //创建时间
            });
          }
        }
      }
      console.log("有效的dsd产品", dsd);
      this.tableData1 = dsd;
    },
    async findByMaterialNumber(_MaterialNumber) {
      let ds = [];
      await this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "stock",
          where: {
            MaterialNumber: _MaterialNumber,
            // Purpose: "生产制造"
          },
        },
      })
        .then((res) => {
          console.log("制造SN数据", res);
          ds = res;
        })
        .catch((err) => {
          console.log(err);
        });
      // await this.$https({
      //   //这里是你自己的请求方式、url和data参数
      //   method: "get",
      //   url: "/api/apiModel/find",
      //   params: {
      //     table: "ManufacturingExecution",
      //     where: { MaterialNumber: _MaterialNumber, IsDeliverGoods: "1" },
      //     sortJson: { SN: 1 },
      //   },
      // })
      //   .then((res) => {
      //     console.log("制造SN数据", res);
      //     ds = res;
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      return ds;
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
