<template>
  <div class="container">
    <!-- <div class="loadbg" v-show="flg">
  
      <div class="xz"><span class="xzs">加载中...</span></div>
    </div> -->

    <el-steps :active="0" finish-status="success" simple style="margin: 5px">
      <el-step title="系统订单"></el-step>
      <!--<el-step title="制程"></el-step>
      <el-step title="配料"></el-step>
      <el-step title="领料"></el-step>
      <el-step title="检验"></el-step>-->
    </el-steps>
    <el-dialog
      title="供应商选择"
      :visible.sync="gysDialog"
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="供应商号">
          <el-select
            v-model="supplierNumbercode"
            placeholder="请选择"
            @change="getContacts"
            filterable
          >
            <el-option
              v-for="(item, key) in options"
              :key="key"
              :value="item.supplierNumbercode"
            >
              {{ item.supplierNumbercode }}
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="联系人">
          <el-select
            v-model="form.Contacts"
            placeholder="请选择"
            @change="getContacts1"
          >
            <el-option
              v-for="(item, key) in options1"
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
        <el-form-item label="供应商合同号">
          <el-input v-model="form.GYSHTH" style="width: 220px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-preventReClick @click="gysDialog = false">取 消</el-button>
        <el-button type="primary" v-preventReClick @click="showGYSInfo"
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
        <el-step title="预购单"></el-step>&nbsp;&nbsp;&nbsp;<font>{{
          OrderNumbers
        }}</font>
      </el-steps>
      <div class="animation"></div>

      <el-table
        ref="tableselectData"
        class="table"
        height="500"
        :data="
          tableData1.filter(
            (data) =>
              !search ||
              data.MaterialName.toLowerCase().includes(search.toLowerCase())
          )
        "
        highlight-current-row
      >
        <el-table-column type="selection" width="50"></el-table-column>
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
          min-width="150"
        >
          <template slot="header">
            <el-input v-model="search" size="mini" placeholder="物料搜索" />
          </template>
        </el-table-column>

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
        <el-table-column property="Number" label="额定数量"></el-table-column>
        <el-table-column
          property="PlanNumber"
          label="计划采购数"
        ></el-table-column>
        <el-table-column
          property="SurplusDistribution"
          label="剩余分配数"
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
        <el-table-column label="生成在采购单" min-width="90" fixed="right">
          <template slot="header">
            <el-button
              type="warning"
              plain
              size="mini"
              v-preventReClick
              @click="opengysDialog"
              >供应商分配</el-button
            >
          </template>
          <template slot-scope="scope">
            <el-popover
              placement="left"
              width="300"
              trigger="click"
              :ref="`popover-${scope.$index}`"
            >
              <el-form ref="form" :model="form" label-width="90px">
                <!-- <el-form-item label="采购单号">
                  <el-input v-model="form.PurchaseNumber" disabled></el-input>
                </el-form-item>
                <el-form-item label="供应商编号">
                  <el-input v-model="form.supplierNumber" disabled></el-input>
                </el-form-item>
                <el-form-item label="供应商名称">
                  <el-input v-model="form.supplierName" disabled></el-input>
                </el-form-item>
                <el-form-item label="联系人">
                  <el-input v-model="form.Contacts" disabled></el-input>
                </el-form-item>
                <el-form-item label="联系人电话">
                  <el-input v-model="form.ContactsPhone" disabled></el-input>
                </el-form-item> -->
                <div class="ttt">
                  <p>
                    <span class="tl">采购单号:</span>{{ form.PurchaseNumber }}
                  </p>
                  <p>
                    <span class="tl">供应商编号:</span>{{ form.supplierNumber }}
                  </p>
                  <p><span class="tl">供应商合同号:</span>{{ form.GYSHTH }}</p>

                  <p>
                    <span class="tl">供应商名称:</span>{{ form.supplierName }}
                  </p>
                  <p><span class="tl">联系人:</span>{{ form.Contacts }}</p>
                  <p>
                    <span class="tl">联系人电话:</span>{{ form.ContactsPhone }}
                  </p>
                  <p>
                    <span class="tl">物料时效:</span
                    ><span class="sx">{{ sx }}</span>
                  </p>
                </div>
                <el-form-item
                  label="采购数量"
                  :rules="[{ required: true, message: '不能为空' }]"
                >
                  <el-input v-model="form.PlanNumber"></el-input>
                </el-form-item>
                <el-form-item
                  label="采购单价"
                  :rules="[{ required: true, message: '不能为空' }]"
                >
                  <el-input v-model="form.ActualPrice" disabled></el-input>
                </el-form-item>
                <el-form-item
                  label="计划交期"
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
                >确定</el-button
              >
              <el-button
                style="float: right; margin: 0 10px"
                v-preventReClick
                @click="scope._self.$refs[`popover-${scope.$index}`].doClose()"
                >取消</el-button
              >

              <el-button
                :disabled="scope.row.status == '1'"
                slot="reference"
                type="primary"
                icon="el-icon-edit"
                v-preventReClick
                @click="findsupplierNumber(scope)"
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
import { getTime } from "common/utils/index";
export default {
  data() {
    return {
      sx: "",
      gysDialog: false,
      N: "",
      Y: "",
      R: "",
      OrderNumbers: "",
      flg: false,
      id: "",
      total: 0,
      pagenums: 0,
      tableData: [],
      tableData1: [],
      options: [],
      options1: [],
      pyid: "",
      Purpose: "", //用途
      supplierNumbercode: "",
      search: "",
      form: {
        OrderNumber: "", //订单编号
        PurchaseNumber: "", //采购编号
        supplierNumber: "", //供应商编号
        GYSHTH: "", //供应商合同号
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
        SurplusDistribution: "", //剩余分配数

        ShouldNumber: "", //采购应到数量
        ActualPrice: "", //采购单价
        PlannedDeliveryDate: "", //计划交期
        status: "", //状态
        creater: "", //创建人
        creatdate: "", //创建时间
      },
    };
  },
  methods: {
    //选择展示页数据
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenums = (val - 1) * 10;
      console.log("---====---", this, this.pagenums);
      this.findByPageNum();
    },
    //获取页面数
    getpage() {
      this.$https({
        method: "get",
        url: "/api/apiModel/getpage",
        params: {
          table: "salesOrder",
          pageWhere: { processCode: { $gte: "4" } },
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
    opengysDialog() {
      this.form.PurchaseNumber = "";
      this.form.Contacts = "";
      this.form.ContactsPhone = "";
      this.gysDialog = true;
    },
    async showGYSInfo() {
      this.gysDialog = false;
      this.$https({
        method: "post",
        url: "api/transaction/JSCGDNOTransaction",
        data: {},
      })
        .then((res) => {
          if (res.status) {
            this.form.PurchaseNumber = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
      //  this.form.PurchaseNumber = await this.updatecg();

      //查询出采购单号 PurchaseNumber
    },
    //刷新界面
    newview() {
      this.getpage(); //刷新分页
      this.find(); //找寻对应页面的数据
    },
    //根据page数查询对应数据
    find() {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/findByPageNum",
        params: {
          table: "salesOrder",
          PageNum: this.pagenums,
          sortJson: { OrderNumber: -1 },
          pageWhere: { processCode: { $gte: "4" } },
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
    getContacts() {
      console.log("....", this.supplierNumbercode);
      let trs = this.options.filter((item) => {
        return this.supplierNumbercode == item.supplierNumbercode;
      });
      console.log("....", trs);
      this.form.supplierNumber = trs[0].supplierNumber;
      this.form.supplierName = trs[0].supplierName;
      // this.options1
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__supplierContacts",
          dataBase: "base",
          where: { supplierNumber: this.form.supplierNumber },
        },
      })
        .then((res) => {
          console.log(res);
          this.options1 = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getContacts1() {
      this.form.Contacts; //当前联系人编号
      let trs = this.options1.filter((item) => {
        return this.form.Contacts == item.Contacts;
      });
      this.form.ContactsPhone = trs[0].ContactsPhone;
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
      // this.flg = true;

      this.Purpose = row.Purpose;
      this.OrderNumbers = row.OrderNumber;
      // this.form.Contacts = row.Contacts;
      // this.form.ContactsPhone = row.ContactsPhone;
      this.tableData1 = [];
      this.finddetail();
    },
    finddetail() {
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "PurchaseOrder",
          where: { OrderNumber: this.OrderNumbers },
          sortJson: { MaterialName: 1 },
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
    //////////////////////////////////////////////////////////////////

    async findsupplierNumber(scope) {
      this.N = new Date().getFullYear();
      this.form.ShouldNumber = scope.row.SurplusDistribution;
      this.form.PlanNumber = "";
      this.Y = "";
      this.R = "";
      this.form.ActualPrice = "";
      /////////////////
      this.sx = "已过期或不存在";
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__supplierMaterial",
          dataBase: "base",
          where: {
            MaterialNumber: scope.row.MaterialNumber,
            supplierName: this.form.supplierName,
            Approval: "已审批",
            prescription: { $gte: getTime() },
          },
        },
      })
        .then((res) => {
          console.log("查询结果", res);

          if (res.length > 0) {
            this.form.ActualPrice = res[0].Price;
            this.sx = res[0].prescription;
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    async findgysf() {
      let csd1 = await this.findGYS();
      let csd = csd1.map((item) => {
        item.supplierNumbercode = item.supplierNumber + "-" + item.supplierName;
        return item;
      });
      this.$nextTick(() => {
        this.options = csd;
      });
    },
    async findGYS() {
      let dsd = [];
      await this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__supplierManager",
          dataBase: "base",

          // Approver: "heyi",
          // prescription: "2021/09/09",
          where: { Approval: "已审批", prescription: { $gte: getTime() } },
        },
      })
        .then((res) => {
          console.log(res);
          dsd = res;
        })
        .catch(function (err) {
          console.log(err);
        });
      return dsd;
    },
    async Edit1(form, row, Purpose, time) {
      let cd = parseInt(form.SurplusDistribution) - parseInt(form.PlanNumber); //剩余分配数
      let temp = "0";
      if (cd < 0) {
        this.updateyyb(form.MaterialNumber, Math.abs(cd)); //盈余表
      }
      if (cd <= 0) {
        temp = "1";
      }
      let fs = {
        PlanNumber: form.PlanNumber,
        SurplusDistribution: cd > 0 ? cd + "" : "0",
        status: temp,
      };

      //修改采购单
      await this.update(fs, row._id);
      ///////////////////////

      let tempsd = JSON.parse(JSON.stringify(row));

      tempsd.PurchaseNumber = form.PurchaseNumber; //采购编号
      tempsd.CheckNumber = ""; //质检单号
      tempsd.supplierNumber = form.supplierNumber; //供应商编号
      tempsd.PlannedDeliveryDate = form.PlannedDeliveryDate; //计划交期
      tempsd.supplierName = form.supplierName; //供应商名称
      tempsd.Contacts = form.Contacts; //
      tempsd.ContactsPhone = form.ContactsPhone; //
      tempsd.Purpose = Purpose;
      tempsd.ActualNumber = "";
      tempsd.ActualNumbertotal = "0";
      tempsd.ShouldNumber = form.PlanNumber;
      tempsd.ActualPrice = form.ActualPrice;
      tempsd.SYtotal = form.PlanNumber;
      tempsd.Monry = "";
      tempsd.tMonry = "";
      tempsd.freight = "";

      tempsd.status = "0";
      tempsd.creatdate = time; //创建时间
      this.$delete(tempsd, "PlanNumber");
      this.$delete(tempsd, "_id");
      //在途插入
      this.ztinsert(tempsd);
      //采购单头添加
      this.insertPurshHead(tempsd, time);

      //进入推单模式
      this.getProcessState(row.OrderNumber, "PurchaseOrder", "1", "5");
    },
    //编辑事件
    async Edit(scope) {
      if (scope.row.SurplusDistribution == "0") return;
      if (
        !this.N ||
        !this.Y ||
        !this.R ||
        !this.form.PlanNumber ||
        !this.form.ActualPrice
      ) {
        console.log(
          this.N +
            "/" +
            this.Y +
            "/" +
            this.R +
            "-" +
            this.form.PlanNumber +
            "-" +
            this.form.ActualPrice
        );
        alert("必填项不能为空！");
        return;
      }
      this.$myloading({
        show: true,
      });
      scope._self.$refs[`popover-${scope.$index}`].doClose();
      // this.form.PlanNumber = scope.row.PlanNumber;
      this.form.MaterialNumber = scope.row.MaterialNumber; //物料编号
      this.form.SurplusDistribution = scope.row.SurplusDistribution;
      this.form.PlannedDeliveryDate =
        String(this.N).padStart(4, "0") +
        "/" +
        String(this.Y).padStart(2, "0") +
        "/" +
        String(this.R).padStart(2, "0");
      this.$https({
        method: "post",
        url: "api/transaction/SCCGDTransaction",
        data: {
          form: this.form,
          row: scope.row,
          Purpose: this.Purpose,
          creater: sessionStorage.getItem("loginName"),
          time: getTime(),
        },
      })
        .then((res) => {
          console.log("返回：", res);
          if (res.status) {
            this.finddetail();
            this.$myloading({
              show: false,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    insertPurshHead(tempsd, time) {
      let tempsC = {
        OrderNumber: tempsd.OrderNumber, //订单编号
        PurchaseNumber: tempsd.PurchaseNumber, //采购编号
        supplierNumber: tempsd.supplierNumber, //供应商编号
        supplierName: tempsd.supplierName, //供应商名称
        Contacts: tempsd.Contacts, //联系人
        ContactsPhone: tempsd.ContactsPhone, //联系人电话
        TotalAmount: "", //总金额
        creatdate: time, //创建时间
      };

      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "CGDhead",
          where: { PurchaseNumber: tempsd.PurchaseNumber },
        },
      })
        .then((res) => {
          console.log(res);
          if (res.length == 0) {
            this.$https({
              method: "post",
              url: "/api/apiModel/insert",
              data: {
                table: "CGDhead",
                form: tempsC,
              },
            })
              .then((res) => {
                console.log(res);
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
    getProcessState(orderNumber, table, statusing, processCode) {
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
    async updatecg() {
      //1.查询当天的po单号
      let dt = new Date();
      let Y = dt.getFullYear() + "";
      let M = dt.getMonth() + 1 + "";
      let D = dt.getDate() + "";
      M = M.padStart(2, "0");
      D = D.padStart(2, "0");
      let ces = parseInt(Y + M + D + "000"); //初始采购单号
      let cdss = { PurchaseNumber: { $regex: Y + M + D + "" } };
      let cgd = [];
      //查询当天最高采购单号
      await this.$https({
        method: "get",
        url: "api/apiModel/find",
        params: {
          table: "IntransitOrder",
          where: cdss,
        },
      })
        .then((res) => {
          console.log(res);
          cgd = res;
        })
        .catch((err) => {
          console.log(err);
        });
      //去掉无效的采购单号
      cgd = cgd.filter((item) => {
        return item.PurchaseNumber != "";
      });
      if (cgd.length > 0) {
        cgd.sort((a, b) => {
          return parseInt(a.PurchaseNumber) - parseInt(b.PurchaseNumber);
        });
        ces = parseInt(cgd[cgd.length - 1].PurchaseNumber); //最高采购单号
      }
      console.log("最大采购单号:", ces);
      return ces + 1 + "";
    },
    //在途单插入
    async ztinsert(v) {
      await this.$https({
        method: "post",
        url: "/api/apiModel/insert",
        data: {
          table: "IntransitOrder",
          form: v,
        },
      })
        .then((res) => {
          console.log(res);
          //将溢出的采购数插入盈余表中
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //数据修改
    async update(v, ids) {
      //   if (this.auth()) return;
      await this.$https({
        method: "post",
        url: "/api/apiModel/update",
        data: {
          table: "PurchaseOrder",
          form: v,
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

    //盈余表
    async updateyyb(materialNumber, num) {
      let pynum = await this.goYYB(materialNumber); //盈余表当前物料数量
      let yynum = pynum + num; //修改为当前数量
      this.updateYYB(materialNumber, yynum + "");
    },
    // 根据物料编码修改数量
    updateYYB(materialNumber, num) {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/apiModel/updateByWhere",
        data: {
          table: "YYB",
          form: { Number: num },
          where: { MaterialNumber: materialNumber },
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //算出盘盈数
    async goYYB(materialNumber) {
      let tempNum = 0;
      await this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "YYB",
          where: { MaterialNumber: materialNumber },
        },
      })
        .then((res) => {
          if (res.length > 0) {
            tempNum = parseInt(res[0].Number);
          } else {
            this.$https({
              //这里是你自己的请求方式、url和data参数
              method: "post",
              url: "/api/apiModel/insert",
              data: {
                table: "YYB",
                form: {
                  MaterialNumber: materialNumber, //物料编号
                  Number: "0", //数量
                },
              },
            })
              .then(function (res) {
                console.log(res);
              })
              .catch(function (err) {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
      return tempNum;
    },

    //////////////////////////////////////////////////////////////////
  },
  created() {
    this.newview();
    this.findgysf(); //供应商查询
  },
  mounted() {},
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
  margin: 0;
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

body {
  perspective: 900px;
}
.loadbg {
  height: 100%;
  width: 100%;
  background-color: rgba(10, 10, 10, 0.2);
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 999;
}
.xz {
  margin-top: 100px;
  position: absolute;
  left: 50%;
  top: 30%;
  width: 100px;
  height: 100px;
  /* transform: translate(-50%, -50%); */
  margin-left: -50px;
  border-radius: 50%;
  box-sizing: border-box;
  color: white;
  border: 2px solid transparent;
  border-left: 2px solid rgb(247, 243, 243);
  box-shadow: 0 0 25px rgba(37, 37, 37, 0.5);
  background-color: rgb(0, 0, 0);
  animation: loadxz 2s infinite linear;
}
.xzs {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  height: 60px;
  width: 60px;
  line-height: 60px;
  text-align: center;
  color: rgb(251, 253, 251);
  font-size: 12px;
  transform-origin: center;
  animation: loadxzs 2s infinite linear;
}
.ttt {
  margin-bottom: 5px;
}
.tl {
  display: inline-block;
  width: 90px;
  text-align: end;
  margin-right: 5px;
  line-height: 25px;
}
.ttt > p {
  margin: 0;
  color: rgb(18, 221, 11);
  font-size: 13px;
}
@keyframes loadxz {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes loadxzs {
  0% {
    transform: rotate(360deg);
    margin: -25px 0 0 -25px;
  }
  100% {
    transform: rotate(0deg);
    margin: -25px 0 0 -25px;
  }
}

.loadbg {
  height: 100%;
  width: 100%;
  background-color: rgba(10, 10, 10, 0.2);
  position: absolute;
  z-index: 999;
}
.loading {
  height: 40px;
  width: 40px;
  position: absolute;
  background-color: silver;
  left: 50%;
  top: 40%;
  transform: translateX(-50%) translateY(-50%);
  text-align: center;
  font-weight: bold;
  transform-style: preserve-3d;
  animation: xz 5s infinite linear;
}

.loading .imgdiv {
  height: 40px;
  width: 40px;
  opacity: 0.7;
  position: absolute;
  background-color: rgb(94, 88, 88);
}
.loading .imgdiv:nth-child(1) {
  transform: rotateY(90deg) translateZ(20px);
}
.loading .imgdiv:nth-child(2) {
  transform: rotateY(-90deg) translateZ(20px);
}
.loading .imgdiv:nth-child(3) {
  transform: rotateX(90deg) translateZ(20px);
}
.loading .imgdiv:nth-child(4) {
  transform: rotateX(-90deg) translateZ(20px);
}
.loading .imgdiv:nth-child(5) {
  transform: rotateY(180deg) translateZ(20px);
}
.loading .imgdiv:nth-child(6) {
  transform: rotateY(0deg) translateZ(20px);
}

.loading .imgdiv img {
  height: 40px;
  width: 40px;
  vertical-align: top;
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
.sx {
  color: rgb(241, 180, 47);
}

@keyframes xz {
  from {
    transform: rotateX(0) rotateZ(0);
  }
  to {
    transform: rotateX(1turn) rotateZ(1turn);
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
