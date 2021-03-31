<template>
  <div class="container">
    <el-steps :active="0" finish-status="success" simple style="margin: 5px">
      <el-step title="售后工单"></el-step>
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
      <el-form ref="form" :model="form">
        <el-form-item label="工单号">
          <el-input
            v-model="form.WorkOrderNumber"
            type="text"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="客户名称">
          <el-select
            v-model="form.CustomerName"
            filterable
            placeholder="请选择"
            style="width: 100%"
            @change="CustomerNumberChange"
          >
            <el-option
              v-for="(item, key) in CustomerInfo"
              :key="key"
              :value="item.CustomerName"
            >
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                item.CustomerNumber
              }}</span>
              <span style="float: left; margin-right: 20px">{{
                item.CustomerName
              }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户编号">
          <el-input v-model="form.CustomerNumber" type="text"></el-input>
        </el-form-item>
        <el-form-item label="客户联系人">
          <!-- <el-input v-model="form.CustomerContact" type="text"> -->
          <el-select
            v-model="form.CustomerContact"
            placeholder="请选择"
            style="width: 100%"
            @change="CustomerNumberChange2"
          >
            <el-option
              v-for="(item, key) in CustomerInfo2"
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
        <el-form-item label="联系电话">
          <el-input v-model="form.ContactNumber" type="text"></el-input>
        </el-form-item>
        <el-form-item label="联系人备注">
          <el-input v-model="form.ContactRemarks" type="text"></el-input>
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
    <el-dialog
      title="表单"
      :visible.sync="dialogFormVisible1"
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="form1">
        <el-form-item label="工单号">
          <el-input
            v-model="form1.WorkOrderNumber"
            type="text"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="产品编号">
          <el-input v-model="form1.ProductNumber" type="text"></el-input>
        </el-form-item>
        <el-form-item label="产品名称">
          <el-input v-model="form1.ProductName" type="text"></el-input>
        </el-form-item>
        <el-form-item label="产品序列号">
          <el-input v-model="form1.ProductSN" type="text"></el-input>
        </el-form-item>
        <el-form-item label="产品类别">
          <el-select
            v-model="form1.ProductClass"
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option
              v-for="(item, key) in ProductClassInfo"
              :key="key"
              :value="item.ProductClass"
            >
              {{ item.ProductClass }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车辆信息">
          <el-input v-model="form1.VehicleInfo" type="text"></el-input>
        </el-form-item>
        <el-form-item label="行驶里程">
          <el-input v-model="form1.Mileage" type="text"></el-input>
        </el-form-item>
        <el-form-item label="软硬件版本">
          <el-input v-model="form1.SHVersion" type="text"></el-input>
        </el-form-item>
        <el-form-item label="是否质保期">
          <el-input v-model="form1.IsWarranty" type="text"></el-input>
        </el-form-item>
        <el-form-item label="物流快递单号">
          <el-input v-model="form1.CourierNumber" type="text"></el-input>
        </el-form-item>
        <el-form-item label="收货人">
          <el-input v-model="form1.Consignee" type="text"></el-input>
        </el-form-item>

        <el-form-item label="故障类别">
          <!-- <el-input v-model="form1.FaultCategory" type="text"></el-input> -->
          <el-select
            v-model="form1.FaultCategory"
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option
              v-for="(item, key) in FaultCategoryInfo"
              :key="key"
              :value="item.FaultCategory"
            >
              {{ item.FaultCategory }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="故障描述">
          <el-input v-model="form1.FaultDes" type="text"></el-input>
        </el-form-item>
        <el-form-item label="原因分析">
          <el-input v-model="form1.CauseAnalysis" type="text"></el-input>
        </el-form-item>
        <el-form-item label="处理方式">
          <!-- <el-input v-model="form1.TreatmentMethod" type="text"></el-input> -->
          <el-select
            v-model="form1.TreatmentMethod"
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option
              v-for="(item, key) in TreatmentMethodInfo"
              :key="key"
              :value="item.TreatmentMethod"
            >
              {{ item.TreatmentMethod }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="接收人">
          <el-input v-model="form1.Receiver" type="text"></el-input>
        </el-form-item>

        <el-form-item label="客户件号">
          <el-input v-model="form1.CustomerPartNumber" type="text"></el-input>
        </el-form-item>
        <el-form-item label="客户物流快递单号">
          <el-input
            v-model="form1.CustomerExpressNumber"
            type="text"
          ></el-input>
        </el-form-item>
        <el-form-item label="客户签收完成">
          <el-input
            v-model="form1.CustomerSignInCompleted"
            type="text"
          ></el-input>
        </el-form-item>
        <el-form-item label="签收确认">
          <el-input v-model="form1.SignForConfirmation" type="text"></el-input>
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
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column
          property="WorkOrderNumber"
          label="工单号"
        ></el-table-column>
        <el-table-column
          property="CustomerName"
          label="客户名称"
        ></el-table-column>
        <el-table-column
          property="CustomerNumber"
          label="客户编号"
        ></el-table-column>
        <el-table-column
          property="CustomerContact"
          label="客户联系人"
        ></el-table-column>
        <el-table-column
          property="ContactNumber"
          label="联系电话"
        ></el-table-column>
        <el-table-column
          property="ContactRemarks"
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
          <template slot="header">
            <el-button
              type="success"
              icon="el-icon-document-add"
              plain
              circle
              size="mini"
              v-preventReClick
              @click="handleAdd"
            ></el-button>
          </template>
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-document-copy"
              circle
              size="mini"
              plain
              v-preventReClick
              @click="findDetail(scope.row)"
            ></el-button>
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
              :disabled="scope.row.status != '0'"
              v-preventReClick
              @click="handleEdit(scope.row)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              plain
              circle
              size="mini"
              :disabled="scope.row.status != '0'"
              v-preventReClick
              @click="handleDelete(scope.row)"
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
        <el-step title="售后工单明细"></el-step>&nbsp;&nbsp;&nbsp;<font>{{
          form.WorkOrderNumber
        }}</font>
      </el-steps>
      <el-table
        ref="tableselectData"
        class="table"
        height="300"
        :data="tableData1"
      >
        <el-table-column type="selection" width="50"></el-table-column>

        <el-table-column
          property="WorkOrderNumber"
          label="工单号"
        ></el-table-column>
        <el-table-column
          property="ProductNumber"
          label="产品编号"
        ></el-table-column>
        <el-table-column
          property="ProductName"
          label="产品名称"
        ></el-table-column>
        <el-table-column
          property="ProductSN"
          label="产品序列号"
        ></el-table-column>
        <el-table-column
          property="ProductClass"
          label="产品类别"
        ></el-table-column>

        <el-table-column
          property="VehicleInfo"
          label="车辆信息"
        ></el-table-column>
        <el-table-column property="Mileage" label="行驶里程"></el-table-column>

        <el-table-column
          property="SHVersion"
          label="软硬件版本"
        ></el-table-column>
        <el-table-column
          property="IsWarranty"
          label="是否质保期"
        ></el-table-column>
        <el-table-column
          property="CourierNumber"
          label="物流快递单号"
        ></el-table-column>
        <el-table-column property="Consignee" label="收货人"></el-table-column>

        <el-table-column
          property="FaultCategory"
          label="故障类别"
        ></el-table-column>
        <el-table-column property="FaultDes" label="故障描述"></el-table-column>
        <el-table-column
          property="CauseAnalysis"
          label="原因分析"
        ></el-table-column>
        <el-table-column
          property="TreatmentMethod"
          label="处理方式"
        ></el-table-column>
        <el-table-column property="Receiver" label="接收人"></el-table-column>

        <el-table-column
          property="CustomerPartNumber"
          label="客户件号"
        ></el-table-column>
        <el-table-column
          property="CustomerExpressNumber"
          label="客户物流快递单号"
        ></el-table-column>
        <el-table-column
          property="CustomerSignInCompleted"
          label="客户签收完成"
        ></el-table-column>
        <el-table-column
          property="SignForConfirmation"
          label="签收确认"
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
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
              :disabled="scope.row.status != '0'"
              v-preventReClick
              @click="handleEdit1(scope.row)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              plain
              circle
              size="mini"
              :disabled="scope.row.status != '0'"
              v-preventReClick
              @click="handleDelete1(scope.row)"
            ></el-button>
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
      operation1: "", //当前操作切换
      pagenums: 0,
      form: {
        WorkOrderNumber: "", //工单号
        CustomerName: "", //客户名称
        CustomerNumber: "", //客户编号
        CustomerContact: "", //客户联系人
        ContactNumber: "", //联系电话
        ContactRemarks: "", //联系人备注
        status: "",
        creater: "", //创建人
        creatdate: "", //创建时间
      },
      form1: {
        WorkOrderNumber: "", //工单号
        ProductNumber: "", //产品编号
        ProductName: "", //物料名称
        ProductSN: "", //产品序列号
        ProductClass: "", //产品类别
        VehicleInfo: "", //车辆信息
        Mileage: "", //行驶里程
        SHVersion: "", //软硬件版本
        IsWarranty: "", //是否质保期
        CourierNumber: "", //物流快递单号
        Consignee: "", //收货人
        FaultCategory: "", //故障类别
        FaultDes: "", //故障描述
        CauseAnalysis: "", //原因分析
        TreatmentMethod: "", //处理方式
        Receiver: "", //接收人
        CustomerPartNumber: "", //客户件号
        CustomerExpressNumber: "", //客户物流快递单号
        CustomerSignInCompleted: "", //客户签收完成
        SignForConfirmation: "", //签收确认
        status: "",
        creater: "", //创建人
        creatdate: "", //创建时间
      },
      total: 0,
      id: "",
      name: "",
      search: "",
      dialogFormVisible: false,
      dialogFormVisible1: false,
      tableData: [],
      tableData1: [],
      classDate: [],
      newclassDate: [],
      classvalue: [],
      temparr: [],
      tempcode: 0,
      MaterialInfo: [],
      CustomerInfo: [],
      CustomerInfo2: [],
      ProductClassInfo: [],
      FaultCategoryInfo: [],
      TreatmentMethodInfo: [],
    };
  },
  methods: {
    //获取页面数
    getpage() {
      this.$https({
        method: "get",
        url: "/api/apiModel/getpage",
        params: {
          table: "SHWorkOrder",
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
    CustomerNumberChange() {
      let cds = this.CustomerInfo.filter((res) => {
        return this.form.CustomerName == res.CustomerName;
      });
      this.form.CustomerNumber = cds[0].CustomerNumber;
      this.findByPageNums2();
    },
    CustomerNumberChange2() {
      let cds = this.CustomerInfo2.filter((res) => {
        return this.form.CustomerContact == res.Contacts;
      });
      this.form.ContactNumber = cds[0].ContactsPhone;
    },
    findByPageNums2() {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__customerContacts",
          dataBase: "base",
          where: { CustomerNumber: this.form.CustomerNumber },
        },
      })
        .then((res) => {
          console.log(res);
          this.CustomerInfo2 = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    findselectList() {
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
          console.log(res);
          this.CustomerInfo = res;
        })
        .catch((err) => {
          console.log(err);
        });
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__SHProductClass",
          where: {},
          dataBase: "base",
        },
      })
        .then((res) => {
          console.log(res);
          this.ProductClassInfo = res;
        })
        .catch((err) => {
          console.log(err);
        });
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__SHFaultCategory",
          where: {},
          dataBase: "base",
        },
      })
        .then((res) => {
          console.log(res);
          this.FaultCategoryInfo = res;
        })
        .catch((err) => {
          console.log(err);
        });
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__SHTreatmentMethod",
          where: {},
          dataBase: "base",
        },
      })
        .then((res) => {
          console.log(res);
          this.TreatmentMethodInfo = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    findDetail(row) {
      this.form.WorkOrderNumber = row.WorkOrderNumber;
      this.newview1();
    },
    //添加事件
    handleAdd() {
      this.operation = "add";
      this.form.WorkOrderNumber = ""; //工单号
      this.form.CustomerName = ""; //客户名称
      this.form.CustomerNumber = ""; //客户编号
      this.form.CustomerContact = ""; //客户联系人
      this.form.ContactNumber = ""; //联系电话
      this.form.ContactRemarks = ""; //联系人备注
      this.form.status = "0"; //状态
      this.dialogFormVisible = true;
    },
    //添加事件
    handleAdd1() {
      this.operation1 = "add";
      this.form1.WorkOrderNumber = this.form.WorkOrderNumber; //工单号
      this.form1.ProductNumber = ""; //产品编号
      this.form1.ProductName = ""; //物料名称
      this.form1.ProductSN = ""; //产品序列号
      this.form1.ProductClass = ""; //产品类别
      this.form1.VehicleInfo = ""; //车辆信息
      this.form1.Mileage = ""; //行驶里程
      this.form1.SHVersion = ""; //软硬件版本
      this.form1.IsWarranty = ""; //是否质保期
      this.form1.CourierNumber = ""; //物流快递单号
      this.form1.Consignee = ""; //收货人
      this.form1.FaultCategory = ""; //故障类别
      this.form1.FaultDes = ""; //故障描述
      this.form1.CauseAnalysis = ""; //原因分析
      this.form1.TreatmentMethod = ""; //处理方式
      this.form1.Receiver = ""; //接收人
      this.form1.CustomerPartNumber = ""; //客户件号
      this.form1.CustomerExpressNumber = ""; //客户物流快递单号
      this.form1.CustomerSignInCompleted = ""; //客户签收完成
      this.form1.SignForConfirmation = ""; //签收确认
      this.form1.status = "0"; //状态
      this.dialogFormVisible1 = true;
    },
    //编辑事件
    handleEdit(row) {
      this.operation = "update";
      this.dialogFormVisible = true;
      this.id = row._id;
      this.$delete(row, "_id");
      this.form = row;
    },
    //编辑事件
    handleEdit1(row) {
      this.operation1 = "update";
      this.dialogFormVisible1 = true;
      this.id = row._id;
      this.$delete(row, "_id");
      this.form1 = row;
    },
    //删除事件
    async handleDelete(row) {
      this.id = row._id;
      this.del();
    },
    async handleDelete1(row) {
      this.id = row._id;
      this.del1();
    },
    //选择展示页数据
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenums = (val - 1) * 10;
      this.findByPageNum();
    },
    //多选
    yc() {
      if (this.$refs.tableselectData.selection.length > 0) {
        let val = this.$refs.tableselectData.selection;
        for (let i = 0; i < val.length; i++) {
          this.id = { id: val[i]._id };
          this.del();
        }
        this.newview();
      }
    },
    //刷新界面
    newview() {
      this.getpage(); //刷新分页
      this.findByPageNum(); //找寻对应页面的数据
    },
    newview1() {
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "SHWorkOrderList",
          where: { WorkOrderNumber: this.form.WorkOrderNumber },
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

    //提交按钮
    async onSubmit() {
      this.form.creater = sessionStorage.getItem("loginName"); //创建人
      this.form.creatdate = getTime(); //创建时间
      if (this.operation === "add") {
        ///////////
        let dt = new Date();
        let Y = dt.getFullYear() + "";
        let M = dt.getMonth() + 1 + "";
        let D = dt.getDate() + "";
        M = M.padStart(2, "0");
        D = D.padStart(2, "0");
        let Onumber = "7" + Y + M + D + "000";

        let ds = await this.findorders("7" + Y + M + D);

        if (ds.length == 1) {
          Onumber = ds[0].WorkOrderNumber;
        }
        if (ds.length > 1) {
          for (let i = 0; i < ds.length; i++) {
            if (parseInt(ds[i].WorkOrderNumber) > parseInt(Onumber))
              Onumber = ds[i].WorkOrderNumber;
          }
        }
        this.form.WorkOrderNumber = parseInt(Onumber) + 1 + "";
        ///////////
        let fdr = [];
        await this.$https({
          method: "get",
          url: "/api/apiModel/find",
          params: {
            table: "SHWorkOrder",
            where: { WorkOrderNumber: this.form.WorkOrderNumber },
          },
        })
          .then((res) => {
            console.log(res);
            fdr = res;
          })
          .catch((err) => {
            console.log(err);
          });
        if (fdr.length > 0) {
          alert("已经存在！");
          return;
        }
        ////////////

        this.add();
      } else {
        this.update();
      }

      this.dialogFormVisible = false;
    },
    async findorders(c) {
      console.log("当前数据1112==>", c);
      let cos = c;
      let cdss = { WorkOrderNumber: { $regex: cos } };
      let codesq = [];
      await this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "SHWorkOrder",
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
    async onSubmit1() {
      this.form1.creater = sessionStorage.getItem("loginName"); //创建人
      this.form1.creatdate = getTime(); //创建时间
      if (this.operation1 === "add") {
        this.add1();
      } else {
        this.update1();
      }

      this.dialogFormVisible1 = false;
    },
    /////crud
    // 数据添加
    add() {
      console.log("form add....", this.form);
      //  if (this.auth()) return;
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/apiModel/insert",
        data: {
          table: "SHWorkOrder",
          form: this.form,
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
    add1() {
      console.log("form add....", this.form1);
      //  if (this.auth()) return;
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/apiModel/insert",
        data: {
          table: "SHWorkOrderList",
          form: this.form1,
        },
      })
        .then((res) => {
          console.log(res);
          this.newview1();
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    // 数据删除
    async del() {
      //   if (this.auth()) return;
      await this.$https({
        method: "post",
        url: "/api/apiModel/delete",
        data: {
          table: "SHWorkOrder",
          id: this.id,
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
    async del1() {
      //   if (this.auth()) return;
      await this.$https({
        method: "post",
        url: "/api/apiModel/delete",
        data: {
          table: "SHWorkOrderList",
          id: this.id,
        },
      })
        .then((res) => {
          console.log(res);
          this.newview1();
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    //数据修改
    update() {
      this.$https({
        method: "post",
        url: "/api/apiModel/update",
        data: {
          table: "SHWorkOrder",
          id: this.id,
          form: this.form,
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
    update1() {
      this.$https({
        method: "post",
        url: "/api/apiModel/update",
        data: {
          table: "SHWorkOrderList",
          id: this.id,
          form: this.form1,
        },
      })
        .then((res) => {
          console.log(res);
          this.newview1();
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    //根据page数查询对应数据
    findByPageNum() {
      console.log("数据查询。。" + this.pagenums);
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/findByPageNum",
        params: {
          table: "SHWorkOrder",
          PageNum: this.pagenums,
          sortJson: { WorkOrderNumber: -1 },
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
  },
  created() {
    this.newview();
    this.findselectList();
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
