<template>
  <div class="container">
    <el-steps :active="0" finish-status="success" simple style="margin: 5px">
      <el-step title="客户列表"></el-step>
      <!--<el-step title="制程"></el-step>
      <el-step title="配料"></el-step>
      <el-step title="领料"></el-step>
      <el-step title="检验"></el-step>-->
    </el-steps>
    <el-dialog
      title="表单"
      :visible.sync="dialogFormVisible2"
      :close-on-click-modal="false"
    >
      <div class="dialogBody" id="dialogBody1">
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
        <h1>四川凯迈新能源有限公司（客户物料价格审批单）</h1>
        <div class="bz">
          <span>预审批号：{{ ewmText }}</span>

          <span style="margin: 0 20px">ID：{{ IDS }}</span>
          <span>申请人：{{ sqr }}</span>
        </div>
        <table id="printTable">
          <thead>
            <tr>
              <th>序号</th>

              <th>客户名称</th>
              <th>物料编码</th>
              <th>物料名称</th>
              <th>规格型号</th>
              <th>物料单价</th>
              <th>单位</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item1, index) in querydata" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ item1.CustomerName }}</td>
              <td>{{ item1.MaterialNumber }}</td>
              <td>{{ item1.MaterialName }}</td>
              <td>{{ item1.MaterialSpec }}</td>
              <td>{{ item1.Price }}</td>
              <td>{{ item1.Company }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button v-preventReClick @click="dialogFormVisible2 = false"
          >取 消</el-button
        >
        <el-button type="primary" v-preventReClick @click="dygxswldsp">
          开启审批流</el-button
        >
        <el-button
          type="primary"
          v-print="printTable1"
          :disabled="spdis"
          v-preventReClick
          @click="dys"
        >
          打 印</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      title="表单"
      :visible.sync="dialogFormVisible1"
      :close-on-click-modal="false"
    >
      <el-input
        size="mini"
        v-model="searchGYS"
        prefix-icon="el-icon-search"
        placeholder="物料查询客户物料价格"
        @change="wuliaogysjg"
      />
      <el-button
        style="margin-top: 10px"
        type="success"
        plain
        size="mini"
        v-preventReClick
        @click="queryIssp('物料')"
        >生成审批单</el-button
      >
      <el-table
        ref="tableselectData"
        class="table"
        height="580"
        :data="tableData2"
      >
        <el-table-column type="selection" width="50"></el-table-column>

        <el-table-column
          property="CustomerNumber"
          label="客户编号"
        ></el-table-column>
        <el-table-column
          property="CustomerName"
          label="客户名称"
        ></el-table-column>

        <el-table-column
          property="MaterialNumber"
          label="物料编码"
          min-width="130"
        >
        </el-table-column>
        <el-table-column
          property="MaterialName"
          label="物料名称"
          min-width="130"
        ></el-table-column>
        <el-table-column
          property="MaterialSpec"
          label="规格型号"
        ></el-table-column>

        <el-table-column property="Price" label="物料单价"></el-table-column>
        <el-table-column property="Approval" label="审批状态"></el-table-column>
        <el-table-column property="Approver" label="审批人"></el-table-column>
        <el-table-column property="prescription" label="时效"></el-table-column>
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
      </el-table>
    </el-dialog>

    <el-dialog
      title="表单"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="form">
        <el-form-item label="联系人">
          <el-select
            v-model="form.Contacts"
            placeholder="请选择"
            style="width: 100%"
            @change="CustomerNumberChange"
          >
            <el-option
              v-for="(item, key) in MaterialInfo"
              :key="key"
              :value="item.Contacts"
            >
              <span style="float: left">{{ item.Contacts }}</span>
              <span
                style="
                  float: right;
                  color: #8492a6;
                  font-size: 13px;
                  margin-right: 20px;
                "
                >{{ item.ContactsPhone }}</span
              >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系人电话">
          <el-input v-model.trim="form.ContactsPhone" disabled></el-input>
        </el-form-item>

        <el-form-item
          label="分类选择"
          :rules="[{ required: true, message: '不能为空' }]"
        >
          <el-cascader
            style="width: 100%"
            v-model="classvalue1"
            :options="newclassDate"
            :props="{ expandTrigger: 'hover' }"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>

        <el-form-item
          label="物料编号"
          :rules="[{ required: true, message: '不能为空' }]"
        >
          <!-- <el-input v-model="form.MaterialNumber"></el-input> -->
          <el-select
            filterable
            v-model="form.MaterialNumber"
            placeholder="请选择"
            style="width: 100%"
            @change="MaterialNumberChange"
          >
            <el-option
              v-for="(item, key) in MaterialInfo2"
              :key="key"
              :value="item.MaterialNumber"
            >
              <span style="float: left">{{ item.MaterialNumber }}</span>

              <span
                style="
                  float: right;
                  color: #8492a6;
                  font-size: 13px;
                  margin-right: 20px;
                "
                >{{ item.Company }}</span
              >

              <span
                style="
                  float: right;
                  color: #8492a6;
                  font-size: 13px;
                  margin-right: 20px;
                "
                >{{ item.MaterialSpec }}</span
              >
              <span
                style="
                  float: right;
                  color: #8492a6;
                  font-size: 13px;
                  margin-right: 20px;
                "
                >{{ item.MaterialName }}</span
              >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="物料单价"
          :rules="[{ required: true, message: '不能为空' }]"
        >
          <el-input type="text" v-model.trim="form.Price"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model.trim="form.Remarks"></el-input>
        </el-form-item>
        <el-form-item label="物料名称">
          <el-input v-model.trim="form.MaterialName" disabled></el-input>
        </el-form-item>
        <el-form-item label="规格型号">
          <el-input v-model.trim="form.MaterialSpec" disabled></el-input>
        </el-form-item>
        <el-form-item label="缩略图">
          <el-input v-model.trim="form.Thumbnail" disabled></el-input>
        </el-form-item>

        <el-form-item label="单位">
          <el-input v-model.trim="form.Company" disabled></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-preventReClick @click="dialogFormVisible = false"
          >取 消</el-button
        >
        <el-button type="primary" v-preventReClick @click="onSubmit"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <div class="tabels">
      <el-table
        class="table"
        height="280"
        :data="tableData1"
        highlight-current-row
      >
        <el-table-column type="selection" width="50"></el-table-column>

        <el-table-column
          property="CustomerNumber"
          label="客户编号"
        ></el-table-column>

        <el-table-column property="CustomerName" label="客户名称">
          <template #header>
            <el-input
              size="mini"
              v-model="search"
              prefix-icon="el-icon-search"
              placeholder="输入客户名称"
              @change="searchs"
            /> </template
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
          <template #header>
            <el-button
              type="primary"
              v-preventReClick
              @click="dialogFormVisible1 = true"
              size="mini"
              >物料查客户物料</el-button
            >
          </template>
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
        <el-step
          :title="'材料明细[' + CustomerNumber + '\t' + CustomerName + ']'"
        ></el-step>
      </el-steps>

      <el-table
        ref="tableselectData"
        class="table"
        height="580"
        :data="tableData"
      >
        <el-table-column type="selection" width="50"></el-table-column>

        <el-table-column
          property="Grade"
          width="50"
          label="序号"
        ></el-table-column>

        <el-table-column
          property="CustomerNumber"
          label="客户编号"
        ></el-table-column>
        <el-table-column
          property="CustomerName"
          label="客户名称"
        ></el-table-column>

        <el-table-column property="Contacts" label="联系人"></el-table-column>
        <el-table-column
          property="ContactsPhone"
          label="联系电话"
        ></el-table-column>
        <el-table-column
          property="MaterialNumber"
          label="物料编码"
          min-width="130"
        >
          <template #header>
            <el-input
              size="mini"
              v-model="search1"
              prefix-icon="el-icon-search"
              placeholder="输入物料编号"
              @change="searchs1"
            />
          </template>
        </el-table-column>
        <el-table-column
          property="MaterialName"
          label="物料名称"
          min-width="130"
          ><template #header>
            <el-input
              size="mini"
              v-model="search2"
              prefix-icon="el-icon-search"
              placeholder="输入物料名称"
              @change="searchs2"
            /> </template
        ></el-table-column>
        <el-table-column
          property="MaterialSpec"
          label="规格型号"
        ></el-table-column>
        <el-table-column property="Thumbnail" label="缩略图">
          <template slot-scope="scope">
            <img class="bigImg" :src="scope.row.Thumbnail" alt="" />
          </template>
        </el-table-column>

        <el-table-column property="Company" label="单位"></el-table-column>
        <el-table-column property="Price" label="物料单价"></el-table-column>
        <el-table-column property="Approval" label="审批状态"></el-table-column>
        <el-table-column property="Approver" label="审批人"></el-table-column>
        <el-table-column property="prescription" label="时效"></el-table-column>
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
        <el-table-column label="操作" min-width="160" fixed="right">
          <template slot="header">
            <el-button
              v-if="!Approvalstat"
              type="success"
              icon="el-icon-document-add"
              plain
              circle
              size="mini"
              v-preventReClick
              @click="handleAdd"
            ></el-button>
            <el-button
              v-if="!Approvalstat"
              type="success"
              plain
              size="mini"
              v-preventReClick
              @click="queryIssp('客户')"
              >生成审批单</el-button
            >
          </template>
          <template slot-scope="scope">
            <!-- <el-button size="mini" v-preventReClick  @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
            <el-button
              v-if="!Approvalstat"
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
              v-preventReClick
              @click="handleEdit(scope.row)"
            ></el-button>
            <el-button
              v-if="!Approvalstat"
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              v-preventReClick
              @click="handleDelete(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getTime } from "common/time/getTime";
import { getJL } from "business/MeterialClass";
import VueQr from "vue-qr";
export default {
  data() {
    return {
      ewmLogo: require("assets/title.png"),
      querydata: [],
      printTable1: {
        id: "dialogBody1",
      },
      ewmText: "",
      sqr: "",
      spdis: true,
      Approvalstat: "", //是否审批人
      N: "",
      Y: "",
      R: "",
      seq: "0",
      MaterialInfo: [],
      MaterialInfo2: [],
      classvalue1: [],
      pagenums: 0,
      OrderNumbers: "",
      CustomerNumber: "",
      CustomerName: "",
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      newclassDate: [],
      form: {
        CustomerNumber: "", //客户编号
        CustomerName: "", //客户名称
        Contacts: "", //联系人
        ContactsPhone: "", //联系人电话
        MaterialNumber: "", //物料编码
        MaterialName: "", //物料名称
        MaterialSpec: "", //规格型号
        Thumbnail: "", //缩略图
        Company: "", //单位
        Price: "", //物料单价
        Remarks: "", //备注
        Grade: "999", //级别
        status: "0",
        Approval: "", //审批状态
        Approver: "", //"审批人
        prescription: "", //时效
        creater: "", //创建人
        creatdate: "", //创建时间
      },

      total: 0,
      tableData: [],
      tableData1: [],
      tableData2: [],
      datas: [],
      datas1: [],
      temoData1: [],
      states: false,
      searchGYS: "",
      temptables: [],
      search: "",
      search1: "",
      search2: "",
      IDS: "",
    };
  },
  components: {
    VueQr,
  },
  methods: {
    dys() {
      for (let k = 0; k < this.querydata.length; k++) {
        this.$https({
          method: "post",
          url: "/api/apiModel/insert",
          data: {
            table: "MaterialPriceSP",
            form: {
              MaterialPriceSPNumber: this.ewmText,
              ApprovalClass: "客户物料",
              CustomerNumber: this.querydata[k].CustomerNumber,
              MaterialNumber: this.querydata[k].MaterialNumber,
              Price: this.querydata[k].Price,
              enclosure: `wljgspm_${this.ewmText}.png`,
              creater: sessionStorage.getItem("loginName"),
              createdate: getTime(),
            },
          },
        })
          .then((res) => {
            console.log(res);
          })
          .catch(function (err) {
            console.log(err);
          });
      }
      this.dialogFormVisible2 = false;
      alert("提交成功！");
    },
    dygxswldsp() {
      if (confirm("是否开启审批流？")) {
        this.spdis = false;
      }
    },
    async findorders(c) {
      console.log("当前数据1112==>", c);
      let cos = c;
      let cdss = { MaterialPriceSPNumber: { $regex: cos } };
      let codesq = [];
      await this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "MaterialPriceSP",
          where: cdss,
        },
      })
        .then((res) => {
          console.log("当前数据11==>", res);
          codesq = res;
        })
        .catch((err) => {
          console.log(err);
        });
      return codesq;
    },
    async queryIssp(ttt) {
      this.spdis = true;

      let dt = new Date();
      let Y = dt.getFullYear() + "";
      let M = dt.getMonth() + 1 + "";
      let D = dt.getDate() + "";
      M = M.padStart(2, "0");
      D = D.padStart(2, "0");
      this.ewmText = Y + M + D + "000";

      let ds = await this.findorders(Y + M + D);

      if (ds.length == 1) {
        this.ewmText = ds[0].MaterialPriceSPNumber;
      }
      if (ds.length > 1) {
        for (let i = 0; i < ds.length; i++) {
          if (parseInt(ds[i].MaterialPriceSPNumber) > parseInt(this.ewmText))
            this.ewmText = ds[i].MaterialPriceSPNumber;
        }
      }

      this.ewmText = parseInt(this.ewmText) + 1 + "";

      this.sqr = sessionStorage.getItem("loginName");
      let tempcoco = {}; //动态条件
      if (ttt == "客户") {
        tempcoco = { CustomerNumber: this.CustomerNumber, Approval: "未审批" };
        this.IDS = this.CustomerName;
      } else {
        tempcoco = { MaterialNumber: this.searchGYS, Approval: "未审批" };
        this.IDS = this.searchGYS;
      }
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__customerMaterial",
          dataBase: "base",
          where: tempcoco,
        },
      })
        .then((res) => {
          console.log("当前数据1", res);
          this.querydata = res;
        })
        .catch((err) => {
          console.log(err);
        });

      this.dialogFormVisible2 = true;
    },

    searchs() {
      console.log(this.search);
      let ccs = {};

      if (this.search == "" || this.search == null) {
        this.findByPageNums(); //找寻对应页面的数据
        return;
      }
      if (this.search != "" && this.search != null) {
        ccs = { CustomerName: { $regex: this.search + "" } };
      }
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__customerManager",
          dataBase: "base",
          where: ccs,
        },
      })
        .then((res) => {
          console.log("当前数据", res);
          this.tableData1 = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    searchs1() {
      console.log(this.search1);
      let ccs = {};

      if (this.search1 == "" || this.search1 == null) {
        ccs = {
          CustomerNumber: this.CustomerNumber,
        };
      }
      if (this.search1 != "" && this.search1 != null) {
        ccs = {
          CustomerNumber: this.CustomerNumber,
          MaterialNumber: { $regex: this.search1 + "" },
        };
      }
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__customerMaterial",
          dataBase: "base",
          where: ccs,
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
    searchs2() {
      console.log(this.search2);
      let ccs = {};

      if (this.search2 == "" || this.search2 == null) {
        ccs = {
          CustomerNumber: this.CustomerNumber,
        };
      }
      if (this.search2 != "" && this.search2 != null) {
        ccs = {
          CustomerNumber: this.CustomerNumber,
          MaterialName: { $regex: this.search2 + "" },
        };
      }
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__customerMaterial",
          dataBase: "base",
          where: ccs,
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
    ////////////////////////
    wuliaogysjg() {
      console.log("search===", this.searchGYS);
      if (this.searchGYS == "" || this.searchGYS == null) {
        this.tableData1 = this.temptables;
      } else {
        this.$https({
          //这里是你自己的请求方式、url和data参数
          method: "get",
          url: "/api/apiModel/find",
          params: {
            table: "__customerMaterial",
            dataBase: "base",
            where: { MaterialNumber: this.searchGYS },
          },
        })
          .then((res) => {
            this.tableData2 = res;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    async findCustomerNumber(scope) {
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
      this.$https({
        method: "post",
        url: "/api/apiModel/update",
        data: {
          table: "__customerMaterial",
          dataBase: "base",
          id: scope.row._id,
          form: sps,
        },
      })
        .then((res) => {
          console.log(res);
          alert("审批完成！");
          scope._self.$refs[`popover-${scope.$index}`].doClose();
          this.findByPageNum();
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    async sorts() {
      await this.$https({
        method: "post",
        url: "/api/apiModel/deleteByWhere",
        data: {
          table: "__customerMaterial",
          dataBase: "base",
          where: { CustomerNumber: this.CustomerNumber },
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
      for (let i = 0; i < this.tableData.length; i++) {
        let t = i + 1;
        this.form.CustomerNumber = this.tableData[i].CustomerNumber;
        this.form.CustomerName = this.tableData[i].CustomerName;
        this.form.Contacts = this.tableData[i].Contacts;
        this.form.ContactsPhone = this.tableData[i].ContactsPhone;
        this.form.MaterialNumber = this.tableData[i].MaterialNumber;
        this.form.MaterialName = this.tableData[i].MaterialName;
        this.form.MaterialSpec = this.tableData[i].MaterialSpec;
        this.form.Thumbnail = this.tableData[i].Thumbnail;
        this.form.Company = this.tableData[i].Company;
        this.form.Remarks = this.tableData[i].Remarks;
        this.form.creater = this.tableData[i].creater;
        this.form.creatdate = this.tableData[i].creatdate;
        this.form.Grade = t + "";

        await this.add();
      }
      this.findByPageNum();
    },

    sort(scope) {
      console.log(this.tableData);
      this.tableData.splice(
        this.seq - 1,
        0,
        this.tableData.splice(scope.$index, 1)[0]
      );
      scope._self.$refs[`popover-${scope.$index}`].doClose();
      console.log(this.tableData);
    },
    CustomerNumberChange() {
      // console.log("change2...");
      let cds2 = this.MaterialInfo.filter((item) => {
        return item.Contacts == this.form.Contacts;
      });
      this.form.ContactsPhone = cds2[0].ContactsPhone;
    },

    // async findOrderds(OrderNumber) {
    //   let temps = [];
    //   await this.$https({
    //     //这里是你自己的请求方式、url和data参数
    //     method: "get",
    //     url: "/api/apiModel/find",
    //     params: {
    //       table: "MaterialDemand",
    //       where: { OrderNumber: OrderNumber },
    //     },
    //   })
    //     .then((res) => {
    //       console.log(res);
    //       temps = res;
    //     })
    //     .catch(function (err) {
    //       console.log(err);
    //     });
    //   return temps;
    // },
    handleChange(value) {
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__basicMaterialList",
          dataBase: "base",
          where: {
            Class1Num: value[0],
            Class2Num: value[1],
            Class3Num: value[2],
            Approval: "已审批",
            prescription: { $gte: getTime() },
          },
        },
      })
        .then((res) => {
          console.log(res);
          this.MaterialInfo2 = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    MaterialNumberChange() {
      console.log("change...");
      let material = this.MaterialInfo2.filter((item) => {
        return item.MaterialNumber == this.form.MaterialNumber;
      });

      this.form.MaterialName = material[0].MaterialName;
      this.form.MaterialSpec = material[0].MaterialSpec;
      this.form.Thumbnail = material[0].Thumbnail;
      this.form.Company = material[0].Company;
    },
    getMaterialList() {
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__materialClass",
          dataBase: "base",
          where: {},
          sortJson: { Class1Num: 1, Class2Num: 1, Class3Num: 1 },
        },
      })
        .then((res) => {
          console.log(res);
          this.classDate = res;
          this.newclassDate = getJL(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // async ts() {
    //   let cdsd=await this.findOrderds(this.OrderNumbers);
    //   if(cdsd.length>0)return;
    //   this.updatesalesOrderDetail(this.OrderNumbers);//修改订单明细的状态为2
    //   for (let i = 0; i < this.tableData1.length; i++) {
    //     this.$delete(this.tableData1[i], "_id");
    //     this.$https({
    //       //这里是你自己的请求方式、url和data参数
    //       method: "post",
    //       url: "/api/apiModel/insert",
    //       data: {
    //         table: "MaterialDemand",
    //         form: this.tableData1[i]
    //       }
    //     })
    //       .then(function(res) {
    //         console.log(res);
    //       })
    //       .catch(function(err) {
    //         console.log(err);
    //       });
    //   }
    //   this.tableData1 = [];
    // },
    //获取页面数
    getpage() {
      this.$https({
        method: "get",
        url: "/api/apiModel/getpage",
        params: {
          table: "salesOrderDetail",
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
    //添加事件

    //刷新界面
    newview() {
      // this.getpage(); //刷新分页
      this.findByPageNums(); //找寻对应页面的数据
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
      this.CustomerNumber = row.CustomerNumber;
      this.CustomerName = row.CustomerName;

      this.finddContacts();
      this.findByPageNum();
    },
    //联系人信息
    finddContacts() {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__customerContacts",
          dataBase: "base",
          where: { CustomerNumber: this.CustomerNumber },
        },
      })
        .then((res) => {
          console.log(res);
          this.MaterialInfo = res;
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
    /////////////////////////////////////////////////////////////////////////////
    //添加事件
    handleAdd() {
      this.operation = "add";
      this.form = {};
      this.dialogFormVisible = true;
    },
    //编辑事件
    handleEdit(row) {
      this.operation = "update";
      this.dialogFormVisible = true;
      this.id = row._id;
      this.name = row.creater;
      this.$delete(row, "_id");
      this.form = row;
    },
    //删除事件
    handleDelete(row) {
      this.id = row._id;
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
          this.id = val[i]._id;
          this.del();
        }
        this.findByPageNum();
      }
    },

    //提交按钮
    async onSubmit() {
      if (!this.form.Price) {
        alert("物料单价必填！");
        return;
      }
      this.form.creater = sessionStorage.getItem("loginName");
      this.form.creatdate = getTime();
      this.form.Approval = "未审批";
      this.form.Approver = ""; //"审批人
      this.form.prescription = ""; //时效
      if (this.operation === "add") {
        this.form.CustomerNumber = this.CustomerNumber;
        this.form.CustomerName = this.CustomerName;
        this.form.Grade = "999";
        await this.add();
      } else {
        this.update();
      }

      this.dialogFormVisible = false;
    },
    /////crud
    // 数据添加
    async add() {
      let stat = false;
      await this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__customerMaterial",
          dataBase: "base",
          where: {
            CustomerNumber: this.CustomerNumber,
            MaterialNumber: this.form.MaterialNumber,
          },
        },
      })
        .then((res) => {
          console.log("当前数据", res);
          if (res.length > 0) {
            alert("该客户物料已存在！");
            stat = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
      if (stat) return;

      await this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/apiModel/insert",
        data: {
          table: "__customerMaterial",
          dataBase: "base",
          form: this.form,
        },
      })
        .then((res) => {
          console.log(res);
          this.findByPageNum();
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    // 数据删除
    del() {
      this.$https({
        method: "post",
        url: "/api/apiModel/delete",
        data: {
          table: "__customerMaterial",
          dataBase: "base",
          id: this.id,
        },
      })
        .then(function (res) {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
      this.findByPageNum();
    },
    //数据修改
    update() {
      this.$https({
        method: "post",
        url: "/api/apiModel/update",
        data: {
          table: "__customerMaterial",
          dataBase: "base",
          id: this.id,
          form: this.form,
        },
      })
        .then((res) => {
          console.log(res);
          this.findByPageNum();
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    findByPageNum() {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__customerMaterial",
          dataBase: "base",
          where: { CustomerNumber: this.CustomerNumber },
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
    // //根据page数查询对应数据
    // findByPageNum() {
    //   this.$https({
    //     //这里是你自己的请求方式、url和data参数
    //     method: "get",
    //     url: "/api/apiModel/findByPageNum",
    //     params: {
    //       table: "__customerMaterial",
    //       PageNum: this.pagenums,
    //       sortJson: { _id: 1 }
    //     }
    //   })
    //     .then(res => {
    //       console.log("当前数据", res);
    //       this.tableData = res;
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
    findByPageNums() {
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__customerManager",
          dataBase: "base",
          where: {},
        },
      })
        .then((res) => {
          console.log("当前数据", res);
          this.tableData1 = res;
          this.temptables = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // getApproval() {
    //   this.Approvalstat = false;
    //   this.$https({
    //     //这里是你自己的请求方式、url和data参数
    //     method: "get",
    //     url: "/api/apiModel/find",
    //     params: {
    //       table: "__comm",
    //       where: { KeyName: "SupplierMaterialApproval" },
    //       dataBase: "base",
    //     },
    //   })
    //     .then((res) => {
    //       let values = res[0].values.split(",");
    //       if (values.indexOf(sessionStorage.getItem("loginName")) > -1)
    //         this.Approvalstat = true;
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
  },
  created() {
    // this.getApproval();
    this.newview();
    this.getMaterialList();
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
.d {
  float: right;
}
.bz {
  font-size: 13px;
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
.dse {
  margin-right: 10px;
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
