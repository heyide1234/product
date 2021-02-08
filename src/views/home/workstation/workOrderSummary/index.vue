<template>
  <div class="ct">
    <div class="container" id="printTest">

      <div class="form-top">
        <h1>产品制造工单</h1>
        <Box>
          <BoxItem :itemHight="150" :itemWidth="16">
            <!-- <input /> -->
            <div class="input-lable">产品名称：</div>
            <input v-model="top.ProductName" />
          </BoxItem>
          <BoxItem :itemHight="150" :itemWidth="16">
            <!-- <input /> -->
            <div class="input-lable">规格型号：</div>
            <input v-model="top.SpecModel" />
          </BoxItem>
          <BoxItem :itemHight="150" :itemWidth="16">
            <!-- <input /> -->
            <div class="input-lable">物料号：</div>
            <input v-model="top.MaterielNum" />
          </BoxItem>
          <BoxItem :itemHight="150" :itemWidth="16">
            <!-- <input /> -->
            <div class="input-lable">制造SN：</div>
            <input v-model="top.ManufactureSN" />
          </BoxItem>
          <BoxItem :itemHight="150" :itemWidth="24">
            <!-- <input /> -->
            <div class="input-lable">序列号：</div>

            <select v-model="SerialNumber" @change="selechange">
              <option v-for="(item,index) of SerialNumberList" :key="index">{{item.SerialNumber}}</option>
            </select>
          </BoxItem>
          <BoxItem :itemHight="50" :itemWidth="6">
            <div class="ewm">
              <canvas id="msg"></canvas>
            </div>
          </BoxItem>
          <!-- <input /> -->
          <!-- // 用于输入内容的input -->

          <!-- // 将获取到的信息画到画布上 -->
        </Box>
      </div>
      <el-table :data="tableData" border style="width: 96%" class="top-table">
        <el-table-column type="index" label="No." width="50"></el-table-column>
        <el-table-column label="制程清单">
          <el-table-column prop="ProcessName" label="工序名称" width="150"></el-table-column>
          <el-table-column prop="MaterialName" label="物料名称" width="150"></el-table-column>

          <el-table-column prop="MaterialNumber" label="物料编号" width="120"></el-table-column>
          <el-table-column prop="MaterialSpec" label="物料规格" width="120"></el-table-column>
          <el-table-column prop="Number" label="数量" width="50"></el-table-column>
          <el-table-column prop="creater" label="制程人" width="60"></el-table-column>
        </el-table-column>
        <el-table-column label="配料">
          <el-table-column prop="batchingCode" label="配料扫码" width="100"></el-table-column>
          <el-table-column prop="creater1" label="配料人" width="60"></el-table-column>
        </el-table-column>
        <el-table-column label="制造任务执行">
          <el-table-column prop="creater2" label="领料人" width="60"></el-table-column>
          <el-table-column prop="ProcedureNumber" label="工序号"></el-table-column>
          <el-table-column prop="operator" label="操作员" width="60"></el-table-column>
          <el-table-column prop="inspector" label="检验员" width="60"></el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <el-button v-print="'#printTest'" ref="print" v-show="false">打印</el-button>
  </div>
</template>

<script>
import QRCode from "qrcode";
export default {
  data() {
    return {
      SerialNumberList: "",
      top: {
        ProductName: "",
        SpecModel: "",
        MaterielNum: "",
        ManufactureSN: ""
      },

      SerialNumber: "",
      Proportioner: "汪小菲",

      tableData: [
        // {
        //   No: "255",
        //   ProcessName: "隔热棉安装",
        //   MaterialName: "隔热棉",
        //   MaterialNumber: "4040030001",
        //   MaterialSpec: "960x370x350mm",
        //   Number: "123",
        //   ProcessEngineer: "张晓伟",
        //   batchingCode: "255sdf-12324",
        //   Proportioner: "张晓伟",
        //   MaterialCollector: "张晓伟",
        //   ProcedureNumber: "dsadervvd-2321sw",
        //   operator: "张晓伟",
        //   inspector: "张晓伟"
        // },
        // {
        //   No: "255",
        //   ProcessName: "隔热棉安装",
        //   MaterialName: "隔热棉",
        //   MaterialNumber: "4040030001",
        //   MaterialSpec: "960x370x350mm",
        //   Number: "123",
        //   ProcessEngineer: "张晓伟",
        //   batchingCode: "255sdf-12324",
        //   Proportioner: "张晓伟",
        //   MaterialCollector: "张晓伟",
        //   ProcedureNumber: "dsadervvd-2321sw",
        //   operator: "张晓伟",
        //   inspector: "张晓伟"
        // },
        // {
        //   No: "255",
        //   ProcessName: "隔热棉安装",
        //   MaterialName: "隔热棉",
        //   MaterialNumber: "4040030001",
        //   MaterialSpec: "960x370x350mm",
        //   Number: "123",
        //   ProcessEngineer: "张晓伟",
        //   batchingCode: "255sdf-12324",
        //   Proportioner: "张晓伟",
        //   MaterialCollector: "张晓伟",
        //   ProcedureNumber: "dsadervvd-2321sw",
        //   operator: "张晓伟",
        //   inspector: "张晓伟"
        // },
        // {
        //   No: "255",
        //   ProcessName: "隔热棉安装",
        //   MaterialName: "隔热棉",
        //   MaterialNumber: "4040030001",
        //   MaterialSpec: "960x370x350mm",
        //   Number: "123",
        //   ProcessEngineer: "张晓伟",
        //   batchingCode: "255sdf-12324",
        //   Proportioner: "张晓伟",
        //   MaterialCollector: "张晓伟",
        //   ProcedureNumber: "dsadervvd-2321sw",
        //   operator: "张晓伟",
        //   inspector: "张晓伟"
        // }
      ]
    };
  },
  components: {
    Box: () => import("components/common/Box"),
    BoxItem: () => import("components/common/BoxItem")
  },
  methods: {

    //getSummaries(param) {
    // const {
    //   columns,
    //   // , data
    // } = param;
    // const sums = [];
    // columns.forEach((column, index) => {
    //   if (index === 0) {
    //     sums[index] = "";
    //     return;
    //   }
    //   sums[0] = "";
    //   //   const values = data.map(item => Number(item[column.property]));
    //   //   if (!values.every(value => isNaN(value))) {
    //   //     sums[index] = values.reduce((prev, curr) => {
    //   //       const value = Number(curr);
    //   //       if (!isNaN(value)) {
    //   //         return prev + curr;
    //   //       } else {
    //   //         return prev;
    //   //       }
    //   //     }, 0);
    //   //     sums[index] = " ";
    //   //   } else {
    //   //     sums[index] = "";
    //   //   }
    // });
    // sums[6] = "配料人：" + 1;
    // return sums;
    //},
    selechange() {
      this.findhead();
      this.getData();
    },
    findhead() {
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "workOrderHead",
          where: {
            SerialNumber: this.SerialNumber
          }
        }
      })
        .then(res => {
          console.log(res);
          this.top = res[0];
        })
        .catch(err => {
          console.log(err);
        });
    },
    getData() {
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "processList",
          where: {
            SerialNumber: this.SerialNumber
          }
        }
      })
        .then(res => {
          this.tableData = res;
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getserinumber() {
      this.$https({
        url: "/api/apiModel/find",
        params: {
          table: "workOrderHead",
          where: {}
        }
      })
        .then(res => {
          this.SerialNumberList = res;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  mounted() {
    // var msg = document.getElementById("msg");
    // //将获取到的数据（val）画到msg（canvas）上
    // console.log(this.MaterielNum + "-" + this.ManufactureSN);
    // QRCode.toCanvas(msg, this.MaterielNum + "-" + this.ManufactureSN, function(
    //   error
    // ) {
    //   console.log(error);
    // });
  },

  created() {
    this.$bus.$on("print", () => {
      if (this.$refs.print) {
        this.$refs.print.$el.click();
      }
    });

    this.getserinumber();
  },
  computed: {},
  watch: {
    //通过监听获取数据
    SerialNumber(val) {
      // 打印获取到的数据
      // console.log(val);
      // 获取页面的canvas
      var msg = document.getElementById("msg");
      // 将获取到的数据（val）画到msg（canvas）上
      QRCode.toCanvas(msg, val, function() {
        // console.log(error);
      });
    }
  }
};
</script>
<style scoped lang="less">
option:after {
  content: "";
  width: 14px;
  height: 8px;

  /*通过定位将图标放在合适的位置*/
  position: absolute;
  right: 20px;
  top: 41%;
  /*给自定义的图标实现点击下来功能*/
  pointer-events: none;
}
// select {
//   border: 0;
//   border-bottom: 1px solid #e2e6f1;
//   box-sizing: border-box;
//   display: block;
//   position: relative;
//   min-height: 1.146667rem;
//   line-height: 1.146667rem;
//   white-space: nowrap;
//   width: 100%;
//   overflow: hidden;
//   padding-right: 0.6rem;
//   background-color: transition;
//   background: transparent;
//   appearance: none;
//   -moz-appearance: none; /* Firefox */
//   -webkit-appearance: none; /* Safari 和 Chrome */
// }

.tps {
  width: 100%;
  height: 30px;
}
.el-table {
  margin: -40px auto !important;
  font-size: 13px;
}
.ewm {
  margin-top: -20px;
}
#msg {
  width: 100px !important;
  height: 100px !important;
  // margin-top: -70px;
  // margin-left: 100px;
  // position: absolute;
}
.ct {
  width: 1200px;
  min-height: 1px;
  margin: 0 auto;
}
.input-lable {
  float: left;
  width: 130px;
  height: 40px;
  line-height: 40px;
  text-align: right;
}
//纸张
.container {
  width: 100%;
  height: 1000px;
  margin: 0 auto;
  position: relative;
  background-color: white;
}

input,
select {
  border: 0; // 去除未选中状态边框
  outline: none; // 去除选中状态边框
  background-color: transparent; // 透明背景
  -webkit-appearance: none;
  background-image: none;
  border-radius: 0px;
  border-bottom: 1px solid #e2e6f1;
  box-sizing: border-box;
  // color: #a9aeb8;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
.form-top {
  width: 96%;
  margin-left: 15px;
}
.form-bottom {
  margin-top: 30px;
}
/*outline: medium;*/

// .item {
//   background-color: rgb(241, 231, 231);
//   display: flex;
//   /* flex: 1; */
//   justify-content: flex-start;
//   flex-wrap: wrap;
//   width: 100%;
//   min-height: 1px;

//   /* flex-direction: row; */
// }
// .items {
//   background-color: rgb(216, 232, 238);
//   width: 25%;
//   height: 100px;
//   display: flex;
//   justify-content: center;
// }
// .items-left {
//   width: 40%;
//   height: 100%;
//   background-color: deeppink;
// }
// .items-right {
//   width: 40%;
//   height: 100%;
//   background-color: rgb(203, 228, 210);
// }
// .item-content {
//   min-height: 1px;
//   display: flex;
//   justify-content: center;
// }

// .center {
//   display: -webkit-box;
//   -webkit-box-orient: horizontal;
//   -webkit-box-pack: center;
//   -webkit-box-align: center;

//   display: -moz-box;
//   -moz-box-orient: horizontal;
//   -moz-box-pack: center;
//   -moz-box-align: center;

//   display: -o-box;
//   -o-box-orient: horizontal;
//   -o-box-pack: center;
//   -o-box-align: center;

//   display: -ms-box;
//   -ms-box-orient: horizontal;
//   -ms-box-pack: center;
//   -ms-box-align: center;

//   display: box;
//   box-orient: horizontal;
//   box-pack: center;
//   box-align: center;
// }
</style>
