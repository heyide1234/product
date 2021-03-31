<template>
  <div class="container">
    <div id="bk"></div>
    <el-steps :active="0" finish-status="success" simple style="margin: 5px">
      <el-step title="销售订单"></el-step>
      <!--<el-step title="制程"></el-step>
      <el-step title="配料"></el-step>
      <el-step title="领料"></el-step>
      <el-step title="检验"></el-step>-->
    </el-steps>
    <el-dialog
      title="附件上传"
      :visible.sync="dialogFormVisible2"
      :close-on-click-modal="false"
    >
      <input
        type="file"
        name="file"
        id="img_upload_file"
        multiple="multiple"
        @change="filechange"
      />

      <img id="img_upload_show" :src="fujian" />
    </el-dialog>
    <el-dialog
      title="表单"
      :visible.sync="dialogFormVisible1"
      :close-on-click-modal="false"
    >
      <el-form ref="form1" :model="form1">
        <el-form-item
          label="单号"
          :rules="[{ required: true, message: '不能为空' }]"
        >
          <el-input v-model="form1.OddNumbers" disabled></el-input>
        </el-form-item>
        <el-form-item
          label="期号"
          :rules="[{ required: true, message: '不能为空' }]"
        >
          <el-input v-model="form1.IssueNumber"></el-input>
        </el-form-item>
        <el-form-item
          label="计划金额"
          :rules="[{ required: true, message: '不能为空' }]"
        >
          <el-input v-model="form1.PlannedAmount"></el-input>
        </el-form-item>
        <el-form-item
          label="约定时间"
          :rules="[{ required: true, message: '不能为空' }]"
        >
          <el-date-picker
            v-model="form1.AppointedTime"
            style="width: 100%"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="备注">
          <el-input
            type="textarea"
            v-model="form1.Remarks"
            :rows="2"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-preventReClick @click="dialogFormVisible1 = false"
          >取 消</el-button
        >
        <el-button type="primary" v-preventReClick @click="onSubmit1"
          >确 定</el-button
        >
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
        <el-table-column label="发票状态">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.fpenclosure == undefined"
              type="info"
              icon="el-icon-paperclip"
              circle
              size="mini"
              plain
              slot="reference"
              v-preventReClick
            ></el-button>
            <el-button
              v-if="scope.row.fpenclosure != undefined"
              type="success"
              icon="el-icon-paperclip"
              circle
              size="mini"
              slot="reference"
              v-preventReClick
            ></el-button>
          </template>
        </el-table-column>

        <el-table-column label="操作" min-width="90" fixed="right">
          <template slot-scope="scope">
            <!-- <el-button size="mini" v-preventReClick  @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
            <el-button
              type="primary"
              icon="el-icon-document-copy"
              circle
              size="mini"
              plain
              v-preventReClick
              @click="findDetail(scope.row)"
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
        <el-step title="发票信息"></el-step>&nbsp;&nbsp;&nbsp;<font>{{
          OddNumbers
        }}</font>
      </el-steps>
      <el-table class="table1" height="100" :data="tableData2">
        <el-table-column
          property="OrderNumber"
          label="订单编号"
        ></el-table-column>
        <el-table-column property="FPH" label="发票号"></el-table-column>

        <el-table-column property="KDDH" label="快递单号"></el-table-column>
        <el-table-column property="KJSJ" label="开具时间"></el-table-column>

        <el-table-column label="发票附件">
          <template slot-scope="scope">
            <el-popover
              placement="left"
              width="300"
              trigger="click"
              :ref="`popover-${scope.$index}`"
            >
              <el-form ref="form2" :model="form2">
                <el-form-item label="发票号">
                  <el-input type="text" v-model="form2.FPH"></el-input>
                </el-form-item>
                <el-form-item label="快递单号">
                  <el-input type="text" v-model="form2.KDDH"></el-input>
                </el-form-item>
                <el-form-item label="开具时间">
                  <el-input type="text" v-model="form2.KJSJ"></el-input>
                </el-form-item>
              </el-form>
              <el-upload
                class="upload-demo"
                :action="`${uploadURLs}/upload?name=salefp_${salesOrder}.pdf`"
                :on-success="successHandlel1"
                :limit="1"
                :file-list="fileList1"
              >
                <el-button
                  type="primary"
                  icon="el-icon-upload2"
                  size="mini"
                  plain
                  >上传</el-button
                >
                <div slot="tip" class="el-upload__tip">
                  <a
                    target="_blank"
                    :href="`http://172.16.1.18:3001/download?name=${scope.row.fpenclosure}`"
                    >下载模板</a
                  >
                </div>
              </el-upload>

              <el-button
                v-if="
                  scope.row.fpenclosure == undefined ||
                  scope.row.fpenclosure == null
                "
                type="info"
                icon="el-icon-paperclip"
                circle
                size="mini"
                plain
                slot="reference"
                v-preventReClick
                @click="scfj1(scope.row)"
              ></el-button>
              <el-button
                v-if="
                  scope.row.fpenclosure != undefined &&
                  scope.row.fpenclosure != null
                "
                type="success"
                icon="el-icon-paperclip"
                circle
                size="mini"
                slot="reference"
                v-preventReClick
                @click="scfj1(scope.row)"
              ></el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>

      <el-steps
        :active="0"
        finish-status="success"
        simple
        style="margin: 40px 5px 5px 5px"
      >
        <el-step title="销售收款计划"></el-step>&nbsp;&nbsp;&nbsp;<font>{{
          OddNumbers
        }}</font>
      </el-steps>
      <el-table
        class="table1"
        height="300"
        :data="tableData1"
        :style="{ display: tableVisible }"
      >
        <el-table-column property="DepClass" label="类别"></el-table-column>

        <el-table-column property="OddNumbers" label="单号"></el-table-column>
        <el-table-column property="IssueNumber" label="期号"></el-table-column>

        <el-table-column
          property="PlannedAmount"
          label="计划金额"
        ></el-table-column>
        <el-table-column
          property="AppointedTime"
          label="约定时间"
        ></el-table-column>

        <el-table-column label="关于" min-width="80">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>创建人: {{ scope.row.creater }}</p>
              <p>创建日期: {{ scope.row.creatdate }}</p>
              <p>备注: {{ scope.row.Remarks }}</p>

              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">...</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="100" fixed="right">
          <template slot="header">
            <el-button
              type="success"
              icon="el-icon-document-add"
              plain
              circle
              size="mini"
              v-preventReClick
              @click="handleAdd1"
            ></el-button>
          </template>
          <template slot-scope="scope">
            <!-- <el-button size="mini" v-preventReClick  @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
            <el-button
              :disabled="scope.row.status === '1'"
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
              v-preventReClick
              @click="handleEdit1(scope.row)"
            ></el-button>
            <el-button
              type="primary"
              icon="el-icon-paperclip"
              circle
              size="mini"
              v-preventReClick
              @click="scfj(scope.row)"
            ></el-button>

            <el-button
              :disabled="scope.row.status === '1'"
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              v-preventReClick
              @click="handleDelete1(scope.row)"
            ></el-button>
            <!-- <el-button
  
              type="success"
              icon="el-icon-position"
              circle
              plain
              size="mini"
            
            ></el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <!-- ////////////////------////////////// -->
    </div>
  </div>
</template>

<script>
import { getTime } from "common/utils/index";
import { DXZH } from "common/utils/content";
import { uploadURL } from "../../../../network/urlConfig";
export default {
  data() {
    return {
      uploadURLs: "",
      fileList1: [], //上传
      fujian: "",
      pictureUpload: {
        width: 0,
        height: 0,
      },
      fileList: [],
      CustomerInfo: [],
      CustomerInfo2: [],
      operation: "", //当前操作切换
      operation1: "",
      pagenums: 0,
      newclassDate: [],
      OrderNumbers: "",
      classvalue1: [],

      OddNumbers: "",

      form: {
        OrderNumber: "", //订单编号
        CustomerOrderNumber: "", //客户订单编号
        CustomerNumber: "", //客户编号
        CustomerName: "", //客户名称
        CustomerClass: "", //客户分类
        CustomerRemarks: "", //客户备注
        TIN: "", //纳税人识别号(Taxpayer identification number)
        Bank: "", //开户行
        Account: "", //账户
        Address: "", //地址
        CompanyPhone: "", //公司电话
        Contacts: "", //联系人
        ContactsPhone: "", //联系人电话
        ContactsAddress: "", //联系人地址
        ContactsEmail: "", //联系人邮箱
        ContactsRemarks: "", //联系人备注
        processCode: "0", //流程码
        creater: "", //创建人
        creatdate: "", //创建时间
      },
      form1: {
        // CollectionAndPaymentPlan//表名
        DepClass: "", //类别（CG/XS）
        OddNumbers: "", //单号
        IssueNumber: "", //期号
        TotalAmount: "", //总金额
        PlannedAmount: "", //计划金额
        AppointedTime: "", //约定时间
        Remarks: "", //备注
        creater: "", //创建人
        creatdate: "", //创建时间
        status: "",
        fujian: "",
      },
      form2: {
        FPH: "",
        KDDH: "",
        KJSJ: "",
      },
      st: false,
      total: 0,
      id: {},
      id1: "",
      name: "",
      name1: "",
      search: "",

      dialogFormVisible1: false,
      dialogFormVisible2: false,

      tableVisible: "none",
      tableData: [],
      tableData1: [],
      tableData2: [],
      MaterialInfo: [],
      SYAmount: 0.0,
      TotalAmount: 0,
      salesOrder: "",
    };
  },
  methods: {
    scfj1(row) {
      this.salesOrder = row.OrderNumber;
      if (row.fpenclosure) {
        this.fileList1 = [{ name: "" }];
        this.fileList1[0].name = row.fpenclosure;
      } else {
        this.fileList1 = [];
      }
    },
    successHandlel1(response, file, fileList1) {
      console.log(response, file, fileList1);
      console.log("上传成功！", file.name);
      this.$https({
        method: "post",
        url: "/api/apiModel/updateByWhere",
        data: {
          table: "salesOrder",
          where: { OrderNumber: this.salesOrder },
          form: {
            fpenclosure: "salefp_" + this.salesOrder + ".pdf",
            FPH: this.form2.FPH,
            KDDH: this.form2.KDDH,
            KJSJ: this.form2.KJSJ,
          },
        },
      })
        .then((res) => {
          console.log(res);
          this.newview();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    filechange() {
      var file = document.getElementById("img_upload_file").files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file); //调用自带方法进行转换
      var that = this;
      reader.onload = async function () {
        that.fujian = this.result;
        await that
          .$https({
            method: "post",
            url: "/api/apiModel/update",
            data: {
              table: "CollectionAndPaymentPlan",
              id: that.id1,
              form: { fujian: that.fujian, status: "1" },
            },
          })
          .then(function (res) {
            console.log(res);
            alert("上传成功！");
          })
          .catch(function (err) {
            console.log(err);
          });
      };
    },
    handleChange(file) {
      console.log(file.name);
    },
    getWidth(file) {
      // 获取文件尺寸
      let _this = this;
      return new Promise(function (resolve) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (theFile) {
          let image = new Image();
          image.src = theFile.target.result;
          image.onload = function () {
            console.log(`${this.width}*${this.height}`);
            console.log(this.width, this.height);
            console.log(_this.fileList);
            _this.pictureUpload.width = this.width;
            _this.pictureUpload.height = this.height;
            resolve(file);
          };
        };
      });
    },

    //上传附件
    scfj(row) {
      console.log(row);
      this.dialogFormVisible2 = true;
      this.fujian = row.fujian;
      this.id1 = row._id;
    },
    //明细添加
    handleAdd1() {
      this.operation1 = "add";
      this.form1.IssueNumber = "";
      this.form1.AppointedTime = "";
      this.form1.Remarks = "";

      this.form1.OddNumbers = this.OddNumbers;

      this.SYAmount = 0.0;
      this.tableData1.forEach((item) => {
        this.SYAmount += parseFloat(item.PlannedAmount);
      });
      this.SYAmount = this.TotalAmount - this.SYAmount + "";

      this.form1.PlannedAmount = this.SYAmount + "";
      this.dialogFormVisible1 = true;
    },
    //明细编辑
    handleEdit1(row) {
      this.operation1 = "update";
      this.dialogFormVisible1 = true;
      this.id1 = row._id;
      this.$delete(row, "_id");
      this.form1 = row;
    },
    //明细删除
    async handleDelete1(row) {
      this.id1 = row._id;
      await this.del1();
      this.newview1();
    },
    //明细数据查询
    findDetail(row) {
      this.tableVisible = "block";
      this.TotalAmount = parseFloat(row.TotalAmount);
      this.OddNumbers = row.OrderNumber;

      this.find1();
      this.tableData2 = [];
      this.tableData2.push({
        _id: row._id,
        FPH: row.FPH,
        OrderNumber: row.OrderNumber,
        KDDH: row.KDDH,
        KJSJ: row.KJSJ,
        fpenclosure: row.fpenclosure,
      });
    },
    //明细请求
    find1() {
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "CollectionAndPaymentPlan",
          where: { DepClass: "XS", OddNumbers: this.OddNumbers },
        },
      })
        .then((res) => {
          console.log(res);
          this.tableData1 = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //获取页面数
    getpage() {
      this.$https({
        method: "get",
        url: "/api/apiModel/getpage",
        params: {
          table: "salesOrder",
          pageWhere: { Purpose: { $regex: "生产制造" } },
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

    //选择展示页数据
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenums = (val - 1) * 10;
      console.log("---====---", this, this.pagenums);
      this.findByPageNum();
    },

    //刷新界面
    newview() {
      this.getpage(); //刷新分页
      this.findByPageNum(); //找寻对应页面的数据
    },
    newview1() {
      this.find1();
    },

    //提交按钮
    async onSubmit1() {
      // CollectionAndPaymentPlan//表名

      if (
        !this.form1.OddNumbers ||
        !this.form1.IssueNumber ||
        !this.form1.PlannedAmount ||
        !this.form1.AppointedTime
      ) {
        alert("必填内容不能为空");
        return;
      }
      if (parseFloat(this.form1.PlannedAmount) > this.SYAmount) {
        alert("计划金额不能大于剩余分配金额！");
        this.form1.PlannedAmount = this.SYAmount;
        return;
      }
      this.form1.AppointedTime = getTime(this.form1.AppointedTime).split(
        " "
      )[0];
      this.form1.creater = sessionStorage.getItem("loginName");
      this.form1.TotalAmount = this.TotalAmount + "";
      this.form1.DepClass = "XS";
      this.form1.fujian = "";
      this.form1.status = "0";
      this.form1.creatdate = getTime();
      this.dialogFormVisible1 = false;

      if (this.operation1 === "add") {
        await this.add1();
      } else {
        await this.update1();
      }
      this.newview1();
    },

    async add1() {
      //  if (this.auth()) return;

      await this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/apiModel/insert",
        data: {
          table: "CollectionAndPaymentPlan",
          form: this.form1,
        },
      })
        .then(function (res) {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
    },

    async del1() {
      await this.$https({
        method: "post",
        url: "/api/apiModel/delete",
        data: {
          table: "CollectionAndPaymentPlan",
          id: this.id1,
        },
      })
        .then(function (res) {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
    },

    async update1() {
      // if (this.auth()) return;

      await this.$https({
        method: "post",
        url: "/api/apiModel/update",
        data: {
          table: "CollectionAndPaymentPlan",
          id: this.id1,
          form: this.form1,
        },
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
        url: "/api/apiModel/findByPageNum",
        params: {
          table: "salesOrder",
          PageNum: this.pagenums,
          sortJson: { OrderNumber: -1 },
          pageWhere: { Purpose: { $regex: "生产制造" } },
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
  },
  filters: {
    DX(v) {
      return DXZH(v);
    },
  },
  created() {
    this.newview();
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
</style>
