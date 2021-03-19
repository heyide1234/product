<template>
  <div class="container">
    <div id="bk"></div>
    <el-steps :active="0" finish-status="success" simple style="margin: 5px">
      <el-step title="物料价格审批"></el-step>
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
      placeholder="输入预审批号"
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

      <el-table-column property="ApprovalClass" label="钉钉审批码">
        <template slot-scope="scope">
          <el-upload
            class="upload-demo"
            :action="`http://172.16.1.10:3001/upload?name=wljgspm_${scope.row.MaterialPriceSPNumber}.png`"
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
                :href="`http://172.16.1.10:3001/download?name=wljgspm_${scope.row.MaterialPriceSPNumber}.png`"
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

        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column property="ApprovalClass" label="物料类别">
        </el-table-column>
        <el-table-column
          property="supplierName"
          label="供应商名称"
          v-if="currentstatus == '供应商物料'"
        >
        </el-table-column>
        <el-table-column
          property="CustomerName"
          label="客户名称"
          v-if="currentstatus == '客户物料'"
        >
        </el-table-column>

        <el-table-column property="MaterialNumber" label="物料编码">
        </el-table-column>
        <el-table-column property="MaterialName" label="物料名称">
        </el-table-column>
        <el-table-column
          property="MaterialSpec"
          label="规格型号"
        ></el-table-column>

        <el-table-column property="Company" label="单位"></el-table-column>
        <el-table-column property="Price" label="物料单价"></el-table-column>
        <el-table-column property="Approval" label="审批状态"></el-table-column>
        <el-table-column property="Approver" label="审批人"></el-table-column>
        <el-table-column property="prescription" label="时效"></el-table-column>

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
                @click="Edit(scope)"
                >审批</el-button
              >
              <el-button
                style="float: right; margin: 0 10px"
                @click="scope._self.$refs[`popover-${scope.$index}`].doClose()"
                >取消</el-button
              >

              <el-button
                slot="reference"
                type="success"
                icon="el-icon-unlock"
                style="margin-left: 10px"
                @click="findsupplierNumber(scope)"
                circle
                size="mini"
              ></el-button>
            </el-popover>
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
    </div>
  </div>
</template>

<script>
import { getTime } from "common/time/getTime";
import { getJL } from "business/MeterialClass";
import { DXZH } from "common/utils/content";

export default {
  data() {
    return {
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
      // this.$https({
      //   method: "post",
      //   url: "/api/apiModel/updateByWhere",
      //   data: {
      //     table: "salesOrder",
      //     where: { OrderNumber: this.salesOrder },
      //     form: { enclosure: this.salesOrder + ".png" },
      //   },
      // })
      //   .then((res) => {
      //     console.log(res);
      //     this.newview();
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },
    async searchs() {
      let ds = [];
      await this.$https({
        method: "get",
        url: "api/apiModel/find",
        params: {
          table: "MaterialPriceSP",
          where: { MaterialPriceSPNumber: this.search },
        },
      })
        .then((res) => {
          ds = res;
        })
        .catch((err) => {
          console.log(err);
        });
      if (ds.length == 0) return;
      this.tableData = [];
      this.enclosure = ds[0].enclosure;
      this.currentstatus = ds[0].ApprovalClass;
      this.dsSP = [ds[0]];

      if (ds[0].ApprovalClass == "供应商物料") {
        for (let i = 0; i < ds.length; i++) {
          this.$https({
            method: "get",
            url: "/api/apiModel/find",
            params: {
              table: "__supplierMaterial",
              dataBase: "base",
              where: {
                supplierNumber: ds[i].supplierNumber,
                MaterialNumber: ds[i].MaterialNumber,
                Approval: "未审批",
              },
            },
          })
            .then((res) => {
              console.log("当前数据", res);
              res[0].ApprovalClass = ds[0].ApprovalClass;
              this.tableData.push(res[0]);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
      if (ds[0].ApprovalClass == "客户物料") {
        for (let i = 0; i < ds.length; i++) {
          this.$https({
            method: "get",
            url: "/api/apiModel/find",
            params: {
              table: "__customerMaterial",
              dataBase: "base",
              where: {
                CustomerNumber: ds[i].CustomerNumber,
                MaterialNumber: ds[i].MaterialNumber,
                Approval: "未审批",
              },
            },
          })
            .then((res) => {
              console.log("当前数据", res);
              res[0].ApprovalClass = ds[0].ApprovalClass;
              this.tableData.push(res[0]);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }

      if (this.enclosure) {
        this.fileList = [{ name: "" }];
        this.fileList[0].name = this.enclosure;
      } else {
        this.fileList = [];
      }
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
      if (scope.row.ApprovalClass == "供应商物料") {
        this.$https({
          method: "post",
          url: "/api/apiModel/update",
          data: {
            table: "__supplierMaterial",
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
      }
      if (scope.row.ApprovalClass == "客户物料") {
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
            this.searchs();
          })
          .catch(function (err) {
            console.log(err);
          });
      }
      ////////////
    },

    // 计算金额
    async jsNum() {
      let temp = 0;

      let td = [...this.tableData1];

      for (let i = 0; i < td.length; i++) {
        let temcpc =
          parseFloat(td[i].Number || "0") *
          parseFloat(td[i].MaterialPrice || "0");
        temp += temcpc;
        td[i].Money = temcpc.toFixed(2) + "";
      }

      for (let j = 0; j < td.length; j++) {
        await this.updated(td[j].Money, temp.toFixed(2) + "", td[j]._id);
      }
      //修改采购单绑定金额
      this.updateXSDZJE(this.form1.OrderNumber, temp.toFixed(2) + "");
      this.tableData1 = [];
      this.finddetail();
    },
    updateXSDZJE(OrderNumber, TotalAmount) {
      this.$https({
        method: "post",
        url: "/api/apiModel/updateByWhere",
        data: {
          table: "salesOrder",
          where: { OrderNumber: OrderNumber },
          form: { TotalAmount: TotalAmount },
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    prints() {
      this.dialogFormVisible = false;
    },
    async updated(Moneys, tMonrys, ids) {
      console.log(Moneys, tMonrys, ids);
      // DB.update(data.table, { _id: DB.getObjectID(data.id) }, data.form)
      await this.$https({
        method: "post",
        url: "/api/apiModel/update",
        data: {
          table: "salesOrderDetail",
          id: ids,
          form: { jine: Moneys, tjine: tMonrys },
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async finddetail() {
      //过滤数据
      let ds = [];
      // ds = this.tempdata.filter((item) => {
      //   return item.PurchaseNumber == this.PurchaseNumber;
      // });
      // ds.sort((a, b) => {
      //   return a.MaterialNumber - b.MaterialNumber;
      // });
      await this.$https({
        method: "get",
        url: "api/apiModel/find",
        params: {
          table: "salesOrderDetail",
          where: { OrderNumber: this.form1.OrderNumber },
        },
      })
        .then((res) => {
          ds = res;
        })
        .catch((err) => {
          console.log(err);
        });

      this.tableData1 = ds;
      //jsNums(ds, "MaterialNumber", "ShouldNumber"); //?

      //this.tableData1 = ds;
    },

    async handleCirculationstate() {
      if (!this.flagst) return;
      //开启流程
      if (this.tableData1.length == 0 || this.tableData1[0].status == "1")
        return;
      /////////////////////
      if (confirm("是否开启推单模式，下次将不可再次开启！")) {
        this.$myloading({
          show: true,
        });
        this.$https({
          method: "post",
          url: "api/transaction/materialRequisitionTransaction",
          data: {
            datas: this.tableData1,
            Purpose: this.Purpose,
            creater: sessionStorage.getItem("loginName"),
            creatdate: getTime(),
          },
        })
          .then((res) => {
            if (res.status) {
              this.$myloading({
                show: false,
              });
              this.tableData1 = [];
              this.OrderNumbers = "";
              this.newview();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    findByPageNums() {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__customerManager",
          dataBase: "base",
          where: {},
          sortJson: { _id: 1 },
        },
      })
        .then((res) => {
          console.log(res);
          this.CustomerInfo = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    findByPageNums2() {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__basicMaterialList",
          where: { CustomerNumber: this.form.CustomerNumber },
          sortJson: { _id: 1 },
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

    CustomerNumberChange() {
      let cds = this.CustomerInfo.filter((res) => {
        return this.form.CustomerNumber == res.CustomerNumber;
      });
      this.form.CustomerNumber = cds[0].CustomerNumber;
      this.form.CustomerName = cds[0].CustomerName;
      this.form.CustomerClass = cds[0].CustomerClass; //行业类别
      this.form.CustomerRemarks = cds[0].CustomerRemarks; //客户备注
      this.form.TIN = cds[0].TIN; //纳税人识别号(Taxpayer identification number)
      this.form.Bank = cds[0].Bank; //开户行
      this.form.Account = cds[0].Account; //账户
      this.form.Address = cds[0].Address; //地址
      this.form.CompanyPhone = cds[0].CompanyPhone; //公司电话

      //  this.form.Contacts = "";
      this.form.ContactsPhone = "";
      this.form.ContactsAddress = ""; //联系人地址
      this.form.ContactsEmail = ""; //联系人邮箱
      this.form.ContactsRemarks = ""; //联系人备注

      this.findByPageNums2();
    },

    CustomerNumberChange2() {
      let cds = this.CustomerInfo2.filter((res) => {
        return this.form.Contacts == res.Contacts;
      });
      this.form.ContactsPhone = cds[0].ContactsPhone;
      this.form.ContactsAddress = cds[0].ContactsAddress; //联系人地址
      this.form.ContactsEmail = cds[0].ContactsEmail; //联系人邮箱
      this.form.ContactsRemarks = cds[0].ContactsRemarks; //联系人备注
    },
    MaterialNumberChange() {
      let cd = this.MaterialInfo.filter((res) => {
        return res.MaterialNumber == this.form1.MaterialNumber;
      });

      this.form1.MaterialName = cd[0].MaterialName;
      this.form1.Thumbnail = cd[0].Thumbnail;
      this.form1.MaterialSpec = cd[0].MaterialSpec;
    },
    //级联
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
    handleChange(value) {
      // this.form.Class1Num = value[0];
      // this.form.Class2Num = value[1];
      // this.form.Class3Num = value[2];
      this.parents = this.form.Parent;
      this.form.Parent = "";
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
          },
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

    //状态
    handleCirculation(row) {
      this.id1 = { id: row._id };
      this.$delete(row, "_id");
      row.status = "1";
      row.creater = sessionStorage.getItem("loginName");
      row.creatdate = getTime();
      this.form1 = row;
      ///////////////////////////
      ///////////////////////////////
      this.$myloading({
        show: true,
      });
      this.$https({
        method: "post",
        url: "api/transaction/materialRequisitionTransaction",
        data: {
          row: row,
          ids: this.id1.id,
        },
      })
        .then((res) => {
          if (res.status) {
            this.$myloading({
              show: false,
            });
            this.newview();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async getProcessState(orderNumber, table, statusing, processCode) {
      await this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: table,
          where: { OrderNumber: orderNumber },
        },
      })
        .then((res) => {
          console.log(res);
          console.log(statusing);
          let csd = true;
          // for (let i = 0; i < res.length; i++) {
          //   if (res[i].status == statusing) csd = false;
          // }
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

    //明细添加
    handleAdd1() {
      // alert("this.st" + this.st);
      if (!this.flagst) return;
      this.operation1 = "add";

      this.form1.MaterialNumber = ""; //产品编号
      this.form1.MaterialName = ""; //产品名称
      this.form1.MaterialPrice = ""; //产品价格
      this.form1.Number = ""; //产品数量
      this.form1.CustomerMaterialNumber = ""; //客户物料编号
      this.form1.CustomerMaterialName = ""; //客户物料名称
      this.dialogFormVisible1 = true;
    },
    //明细编辑
    handleEdit1(row) {
      this.operation1 = "update";
      this.dialogFormVisible1 = true;
      this.id1 = { id: row._id };
      this.name1 = row.creater;
      this.$delete(row, "_id");
      this.form1 = row;
    },
    //明细删除
    handleDelete1(row) {
      this.id1 = { id: row._id };
      this.name1 = row.creater;
      this.del1();
      this.newview1();
    },
    //明细数据查询
    findDetail(row) {
      this.flagst = true;
      if (row.processCode != "1") {
        this.flagst = false;
      }
      this.tableVisible = "block";
      this.Purpose = row.Purpose;
      this.ddbh = row.CustomerOrderNumber; //客户订单编号
      this.xf = row.CustomerName; //需方
      this.xfdz = row.Address; //需方地址
      this.xflxr = row.Contacts; //需方联系人
      this.xfxlxrdz = row.ContactsAddress;
      this.gflxr = sessionStorage["loginName"];

      if (row.processCode != "1") this.st = true;
      if (row.processCode == "1") this.st = false;
      // alert("this.st=====" + row.status);
      this.form1.OrderNumber = row.OrderNumber;
      this.find1();
    },
    //明细请求
    find1() {
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "salesOrderDetail",
          where: { OrderNumber: this.form1.OrderNumber },
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
    //打印
    print() {
      let dd = [];
      let is = 0;
      this.tableData1.forEach((item) => {
        is++;
        let {
          MaterialNumber, //物料编号
          MaterialName, //物料名称
          MaterialSpec, //规格型号
          Number, //数量

          MaterialPrice,
          jine,
        } = item;
        let tds = {
          index: is,
          MaterialNumber, //物料编号
          MaterialName, //物料名称
          MaterialSpec, //规格型号
          Number, //数量

          MaterialPrice,
          jine,
        };
        tds.Company = "pcs";
        dd.push(tds);
      });
      this.querydata = dd;
      this.zj = this.tableData1[0].tjine;
      this.findr(this.form1.OrderNumber);
      this.dialogFormVisible2 = true;
    },
    findr(v) {
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "CollectionAndPaymentPlan",
          where: { DepClass: "XS", OddNumbers: v },
        },
      })
        .then((res) => {
          console.log("/////", res, v);
          this.tableData2 = res.sort((a, b) => {
            return parseInt(a.IssueNumber) - parseInt(b.IssueNumber);
          });
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
          pageWhere: { Purpose: { $regex: "功能" } },
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
    async getsoccess(orderNumber) {
      let flag = 0;
      await this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "salesOrder",
          where: { OrderNumber: orderNumber },
        },
      })
        .then((res) => {
          console.log(res);
          flag = res[0].processCode;
        })
        .catch((err) => {
          console.log(err);
        });
      return flag;
    },
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
      this.id = { id: row._id };
      this.name = row.creater;
      this.$delete(row, "_id");
      this.form = row;
    },
    //删除事件
    async handleDelete(row) {
      if ((await this.getsoccess(row.orderNumber)) != "1") return;
      this.id = { id: row._id };
      this.name = row.creater;
      this.del();
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
      this.find1();
    },

    async findorders(c) {
      console.log("当前数据1112==>", c);
      let cos = c;
      let cdss = { OrderNumber: { $regex: cos } };
      let codesq = [];
      await this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "salesOrder",
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
    //提交按钮
    async onSubmit() {
      if (!this.form.Purpose) {
        alert("用途必填！");
        return;
      }
      this.dialogFormVisible = false;
      let dt = new Date();
      let Y = dt.getFullYear() + "";
      let M = dt.getMonth() + 1 + "";
      let D = dt.getDate() + "";
      if (M.length < 2) M = "0" + M;
      if (D.length < 2) D = "0" + D;
      let Onumber = "8" + Y + M + D + "000";

      let ds = await this.findorders("8" + Y + M + D);
      if (ds.length == 1) {
        Onumber = ds[0].OrderNumber;
      }
      if (ds.length > 1) {
        for (let i = 0; i < ds.length; i++) {
          if (parseInt(ds[i].OrderNumber) > parseInt(Onumber))
            Onumber = ds[i].OrderNumber;
        }
      }
      /////////////////?
      this.form.OrderNumber = parseInt(Onumber) + 1 + ""; //计算出本次订单编号
      /////////////////////

      this.form.creater = sessionStorage.getItem("loginName");
      this.form.creatdate = getTime();
      this.form.status = "0";

      if (this.operation === "add") {
        this.form.processCode = "1";
        this.add();
      } else {
        this.update();
      }
    },
    //提交按钮
    onSubmit1() {
      // document.querySelector("#bk").style.display = "block";
      // setTimeout(() => {
      //   document.querySelector("#bk").style.display = "none";
      // }, 3000);

      if (
        !this.form1.MaterialName ||
        !this.form1.MaterialPrice ||
        !this.form1.Number
      ) {
        alert("必填内容不能为空");
        return;
      }
      this.dialogFormVisible1 = false;
      this.form1.creater = sessionStorage.getItem("loginName");

      this.form1.creatdate = getTime();
      this.form1.tjine = "";
      this.form1.jine = "";
      this.form1.PNum = this.form1.Number;

      if (this.operation1 === "add") {
        this.form1.status = "0";
        this.add1();
      } else {
        this.update1();
      }
    },
    /////crud
    // 数据添加
    add() {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/apiModel/insert",
        data: {
          table: "salesOrder",
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
      //  if (this.auth()) return;
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/apiModel/insert",
        data: {
          table: "salesOrderDetail",
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
    del() {
      this.$https({
        method: "post",
        url: "/api/apiModel/delete",
        data: {
          table: "salesOrder",
          id: this.id.id,
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
    del1() {
      //   if (this.auth()) return;
      this.$https({
        method: "post",
        url: "/api/apiModel/delete",
        data: {
          table: "salesOrderDetail",
          id: this.id1.id,
        },
      })
        .then(function (res) {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    //数据修改
    update12() {
      this.$https({
        method: "post",
        url: "/api/apiModel/updateByWhere",
        data: {
          table: "salesOrder",
          where: { OrderNumber: this.form1.OrderNumber },
          form: { status: "1" },
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    //数据修改
    update() {
      if (this.auth()) return;
      this.$https({
        method: "post",
        url: "/api/apiModel/update",
        data: {
          table: "salesOrder",
          id: this.id.id,
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
    updateTO(row, ids) {
      // if (this.auth()) return;
      this.$https({
        method: "post",
        url: "/api/apiModel/update",
        data: {
          table: "salesOrderDetail",
          id: ids,
          form: row,
        },
      })
        .then(function (res) {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    update1() {
      // if (this.auth()) return;
      this.$https({
        method: "post",
        url: "/api/apiModel/update",
        data: {
          table: "salesOrderDetail",
          id: this.id1.id,
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

      // this.$https({
      //   method: "post",
      //   url: "/api/apiModel/insert",
      //   data: {
      //     table: "MaterialDemand",
      //     form: this.form1
      //   }
      // })
      //   .then(function(res) {
      //     console.log(res);
      //   })
      //   .catch(function(err) {
      //     console.log(err);
      //   });
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
          pageWhere: { Purpose: { $regex: "功能" } },
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
  filters: {
    DX(v) {
      return DXZH(v);
    },
  },
  created() {
    // this.newview();
    //this.getMaterialList(); //级联
    // this.findByPageNums();
    // this.getorderPurpose();
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
