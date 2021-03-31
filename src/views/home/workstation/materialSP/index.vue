<template>
  <div class="container">
    <div id="bk"></div>
    <el-steps :active="0" finish-status="success" simple style="margin: 5px">
      <el-step title="物料准入审核"></el-step>
      <!--<el-step title="制程"></el-step>
      <el-step title="配料"></el-step>
      <el-step title="领料"></el-step>
      <el-step title="检验"></el-step>-->
    </el-steps>

    <el-input
      style="margin: 10px"
      size="small"
      v-model="search"
      prefix-icon="el-icon-search"
      placeholder="输入物料号"
      @change="searchs"
    />

    <el-table
      ref="tableselectData"
      class="table"
      height="150"
      :data="dsSP"
      highlight-current-row
    >
      <el-table-column type="selection" width="50"></el-table-column>

      <el-table-column type="index" width="50" label="序号"></el-table-column>

      <el-table-column label="钉钉审批码">
        <template slot-scope="scope">
          <el-upload
            class="upload-demo"
            :action="`${uploadURLs}/upload?name=wlzrsh_${scope.row.MaterialNumber}.png`"
            :on-success="successHandlel"
            :limit="1"
            :file-list="fileList"
          >
            <el-button type="primary" icon="el-icon-upload2" size="mini" plain
              >上传</el-button
            >
            <div slot="tip" class="el-upload__tip">
              <a
                target="_blank"
                :href="`${uploadURLs}/download?name=wlzrsh_${scope.row.MaterialNumber}.png`"
                >下载模板</a
              >
            </div>
          </el-upload>
        </template>
      </el-table-column>
    </el-table>
    <div class="tabels">
      <el-table
        ref="tableselectData"
        class="table"
        height="500"
        :data="tableData"
        highlight-current-row
      >
        <el-table-column type="selection" width="50"></el-table-column>

        <el-table-column property="MaterialNumber" label="物料编号">
        </el-table-column>

        <el-table-column property="MaterialName" label="物料名称">
        </el-table-column>

        <el-table-column property="Thumbnail" label="缩略图">
          <template slot-scope="scope">
            <img class="bigImg" :src="scope.row.Thumbnail" alt="" />
          </template>
        </el-table-column>

        <el-table-column property="MaterialSpec" label="规格型号">
        </el-table-column>

        <el-table-column
          property="MaterialTexture"
          label="材质"
        ></el-table-column>
        <el-table-column property="Company" label="单位"></el-table-column>

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
          <template slot="header"> </template>
          <template slot-scope="scope">
            <el-popover
              placement="left"
              width="300"
              trigger="click"
              :ref="`popover-${scope.$index}`"
            >
              <el-form ref="form" :model="form" label-width="90px">
                <el-form-item
                  label="时效"
                  :rules="[{ required: true, message: '不能为空' }]"
                >
                  <div class="jq">
                    <el-input v-model="N" placeholder="年"></el-input>
                    年
                    <el-input v-model="Y" placeholder="月"></el-input>
                    月
                    <el-input v-model="R" placeholder="日"></el-input>
                    日
                  </div>
                </el-form-item>
              </el-form>
              <el-button
                style="float: right"
                type="primary"
                v-preventReClick
                @click="Edit(scope)"
                >审批</el-button
              >
              <el-button
                style="float: right; margin: 0 10px"
                v-preventReClick
                @click="scope._self.$refs[`popover-${scope.$index}`].doClose()"
                >取消</el-button
              >

              <el-button
                slot="reference"
                type="success"
                icon="el-icon-unlock"
                style="margin-left: 10px"
                v-preventReClick
                @click="findsupplierNumber(scope)"
                circle
                size="mini"
              ></el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <div class="df"></div>
    </div>
  </div>
</template>

<script>
import { uploadURL } from "../../../../network/urlConfig";
export default {
  data() {
    return {
      uploadURLs: "",
      fileList: [],
      N: "",
      Y: "",
      R: "",
      ddbh: "", //客户订单编号
      xf: "", //需方
      xfdz: "", //需方地址
      xflxr: "", //需方联系人
      xfxlxrdz: "", //需方联系人地址
      gflxr: "", //供方联系人
      zj: "", //总计
      querydata: [],
      printTable: {
        id: "dialogBody",
      },
      CustomerInfo: [],
      CustomerInfo2: [],
      operation: "", //当前操作切换
      operation1: "",
      pagenums: 0,
      newclassDate: [],
      OrderNumbers: "",
      classvalue1: [],
      Purpose: "",
      form: {
        OrderNumber: "", //订单编号
        processCode: "0", //流程码
        Purpose: "", //用途
        Remarks: "", //备注
        creater: "", //申请人
        creatdate: "", //创建时间
      },
      form1: {
        OrderNumber: "", //订单编号
        MaterialNumber: "", //产品编号
        MaterialName: "", //产品名称
        MaterialPrice: "", //产品价格
        Number: "", //产品数量
        PNum: "", //计划数
        Thumbnail: "",
        MaterialSpec: "",
        jine: "", //金额
        tjine: "", //总金额
        status: "", //状态
        creater: "", //创建人
        creatdate: "", //创建时间
      },
      st: false,
      total: 0,
      id: {},
      id1: {},
      name: "",
      name1: "",
      search: "",
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      tableVisible: "none",
      tableData: [],
      tableData1: [],
      MaterialInfo: [],
      tableData2: [],
      flagst: false,
      orderPurpose: [],
      ApprovalClass: "",
      dsSP: [],
      currentstatus: "",
    };
  },
  methods: {
    successHandlel(response, file, fileList) {
      console.log(response, file, fileList);
      console.log("上传成功！", file.name);
      this.searchs();
    },
    async searchs() {
      //////////////////////
      let tt = 13345;
      this.dsSP = [];
      await this.$https({
        method: "get",
        url: "api/apiModel/find",
        params: {
          table: "__basicMaterialList",
          dataBase: "base",
          where: { MaterialNumber: this.search, Approval: "未审批" },
        },
      })
        .then((res) => {
          this.tableData = res;
          if (this.tableData.length > 0) {
            this.dsSP = [this.tableData[0]];
            this.fileList = [{ name: "" }];
            this.fileList[0].name =
              "wlzrsh_" + this.dsSP[0].MaterialNumber + ".png";
          } else {
            this.fileList = [];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async findsupplierNumber(scope) {
      console.log(scope);
      this.N = new Date().getFullYear();
      this.Y = "";
      this.R = "";
    },
    //编辑事件
    async Edit(scope) {
      if (!this.N || !this.Y || !this.R) {
        alert("必填项不能为空！");
        return;
      }

      console.log(scope, this.N + "/" + this.Y + "/" + this.R);
      let sps = {
        Approval: "已审批", //审批状态
        Approver: sessionStorage.getItem("loginName"), //"审批人
        ////时效
        prescription:
          String(this.N).padStart(4, "0") +
          "/" +
          String(this.Y).padStart(2, "0") +
          "/" +
          String(this.R).padStart(2, "0"),
        // status: "1", //表单状态
      };
      /////

      this.$https({
        method: "post",
        url: "/api/apiModel/update",
        data: {
          table: "__basicMaterialList",
          dataBase: "base",
          id: scope.row._id,
          form: sps,
        },
      })
        .then((res) => {
          console.log(res);
          alert("审批完成！");
          scope._self.$refs[`popover-${scope.$index}`].doClose();
          this.searchs();
        })
        .catch(function (err) {
          console.log(err);
        });

      ////////////
    },
  },

  created() {
    // this.newview();
    //this.getMaterialList(); //级联
    // this.findByPageNums();
    // this.getorderPurpose();
    this.uploadURLs = uploadURL;
  },
};
</script>
<style scoped lang="less">
#bk {
  height: 100%;
  width: 100%;
  background-color: rgba(10, 10, 10, 0.3);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  display: none;
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
  font: 10px;
  font-family: SimSun;
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
.htbh {
  display: flex;
  justify-content: flex-end;
  width: 95%;
  margin: 0 auto;
  font-size: 9px;
  font-family: SimSun;
  line-height: 30px;
}
.cont {
  width: 90%;
  margin: 0 auto;
}

.title-content {
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
  div {
    width: 45%;
    height: 30px;
    line-height: 35px;
  }
  .text {
    border-bottom: black 1px solid;
    display: inline-block;
    width: 100%;
    height: 100%;
    font-family: SimSun;
    font-size: 10px;
  }
  .texts {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  .t {
    font-size: 10px;
    font-family: SimSun;
  }
}
#jhe {
  span {
    float: left;
    margin-right: 30px;
  }
}
.top-buttom {
  line-height: 30px;
}
.xzY {
  display: inline-block;
  height: 10px;
  width: 10px;
  margin: 1px 2px -1px 2px;
  background-color: black;
  border: black 1px solid;
}
.xzN {
  display: inline-block;
  height: 10px;
  width: 10px;
  margin: 1px 2px -1px 2px;
  border: black 1px solid;
}
.xkx {
  border-bottom: 1px black solid;
  display: inline-block;
  height: 20px;

  padding: 0px 10px;
}
table {
  font-size: 10px;
  font-family: SimSun;
}
.fl {
  text-align: start;
}
h2 {
  margin: 0 auto;

  text-align: center;
}
p {
  line-height: 22px;
  margin: 0px;
  font-family: SimSun;
  font-size: 10px;
}
.tr {
  margin-top: 20px;
}
.ttt {
  margin-left: 50px;
}
.te {
  margin-top: -10px;
}
.jq {
  display: flex;
}
.jq .el-input {
  margin: 0 2px;
}
.jq .el-input:nth-of-type(1) {
  width: 280px;
}
</style>
