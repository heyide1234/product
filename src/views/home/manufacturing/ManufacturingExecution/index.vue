<template>
  <div class="container">
    <!-- <div class="loadbg" v-show="flg"> -->
    <!--<div class="loading">
        <div class="imgdiv"><img src="~assets/title.png" /></div>
        <div class="imgdiv"><img src="~assets/title.png" /></div>
        <div class="imgdiv"><img src="~assets/title.png" /></div>
        <div class="imgdiv"><img src="~assets/title.png" /></div>
        <div class="imgdiv"><img src="~assets/title.png" /></div>
        <div class="imgdiv"><img src="~assets/title.png" /></div>
      </div>-->
    <!-- <div class="xz"><span class="xzs">加载中...</span></div>
    </div> -->
    <el-steps :active="0" finish-status="success" simple style="margin: 5px">
      <el-step title="制造执行单"></el-step>
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

        <el-table-column property="SN" label="SN"></el-table-column>
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
        <el-table-column property="Thumbnail" label="缩略图">
          <template slot-scope="scope">
            <img class="bigImg" :src="scope.row.Thumbnail" alt="" />
          </template>
        </el-table-column>
        <el-table-column
          property="MaterialSpec"
          label="规格型号"
        ></el-table-column>
        <el-table-column property="Number" label="数量"></el-table-column>
        <el-table-column property="Purpose" label="用途"></el-table-column>

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
        <el-table-column label="操作" min-width="90" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="primary"
              style="margin-left: 5px"
              icon="el-icon-reading"
              circle
              size="mini"
              plain
              v-preventReClick
              @click="zks(scope.row)"
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
        <el-step title="子产品明细"></el-step>&nbsp;&nbsp;&nbsp;<font>{{
          SN
        }}</font>
      </el-steps>
      <div class="dddf">
        <div class="ddd">
          <el-tree :data="datas" icon-class="el-icon-star-on"></el-tree>
        </div>
        <el-table
          ref="tableselectData"
          class="table"
          height="300"
          :data="tableData5"
          highlight-current-row
        >
          <el-table-column type="selection" width="50"></el-table-column>

          <el-table-column property="SN" label="SN"></el-table-column>

          <el-table-column
            property="Subsequence"
            label="子序列号"
          ></el-table-column>
          <el-table-column
            property="MaterialNumber"
            label="物料编号"
          ></el-table-column>
          <el-table-column
            property="MaterialName"
            label="物料名称"
          ></el-table-column>

          <el-table-column property="creater" label="创建人"></el-table-column>
          <el-table-column
            property="creatdate"
            label="创建时间"
          ></el-table-column>
          <el-table-column property="status" label="状态">
            <template slot-scope="scope">
              <el-button
                type="primary"
                style="margin-left: 5px; padding: 0; font-size: 28px"
                icon="el-icon-remove-outline"
                v-if="scope.row.status == 0"
                circle
                size="mini"
                plain
                v-preventReClick
                @click="zk(scope.row)"
              ></el-button>
              <el-button
                type="success"
                style="margin-left: 5px; padding: 0; font-size: 28px"
                icon="el-icon-circle-check"
                v-if="scope.row.status == 1"
                circle
                size="mini"
                plain
                v-preventReClick
                @click="zk(scope.row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-steps
        :active="0"
        finish-status="success"
        simple
        style="margin: 40px 5px 5px 5px"
      >
        <el-step title="产品序列明细"></el-step>&nbsp;&nbsp;&nbsp;<font
          >{{ SN }}-{{ MaterialNumber }}</font
        >
      </el-steps>
      <!-- <div class="animation"></div> -->

      <el-table
        ref="tableselectData"
        class="table"
        height="500"
        :data="tableData1"
        highlight-current-row
      >
        <el-table-column type="selection" width="50"></el-table-column>

        <el-table-column property="SN" label="SN"></el-table-column>
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
        <el-table-column property="Number" label="数量"></el-table-column>

        <el-table-column
          property="SupplierCode"
          label="供应商料号"
        ></el-table-column>
        <el-table-column property="Picker" label="领料人"></el-table-column>
        <el-table-column
          property="ConfirmNumber"
          label="确认数量"
        ></el-table-column>
        <el-table-column
          property="ReplenishmentOrderNumber"
          label="补料订单号"
        ></el-table-column>
        <el-table-column
          property="ReplenishmentNumber"
          label="补料数量"
        ></el-table-column>

        <el-table-column property="OP" label="工艺文件号"></el-table-column>
        <el-table-column property="Operator" label="操作员"></el-table-column>
        <el-table-column property="Checker" label="检验员"></el-table-column>

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
        <el-table-column label="确认数量" min-width="90" fixed="right">
          <template slot-scope="scope">
            <el-popover
              placement="left"
              width="300"
              trigger="click"
              :ref="`popover-${scope.$index}`"
            >
              <el-form ref="form" :model="form" label-width="90px">
                <el-form-item label="供应商料号">
                  <el-input v-model="SupplierCode"></el-input>
                </el-form-item>
                <el-form-item label="确认数">
                  <el-input v-model="ConfirmNumber"></el-input>
                </el-form-item>
              </el-form>
              <el-button
                style="float: right"
                type="primary"
                v-preventReClick
                @click="Edits(scope)"
                >确定</el-button
              >
              <el-button
                style="float: right; margin: 0 10px"
                v-preventReClick
                @click="scope._self.$refs[`popover-${scope.$index}`].doClose()"
                >取消</el-button
              >

              <el-button
                :disabled="scope.row.SurplusDistribution == '0'"
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
        <el-table-column label="申请补料" min-width="90" fixed="right">
          <template slot-scope="scope">
            <el-popover
              placement="left"
              width="300"
              trigger="click"
              :ref="`popover-${scope.$index}`"
            >
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="补料数量">
                  <el-input v-model="ReplenishmentNumber"></el-input>
                </el-form-item>
              </el-form>
              <el-button
                style="float: right"
                type="primary"
                v-preventReClick
                @click="Editss(scope)"
                >确定</el-button
              >
              <el-button
                style="float: right; margin: 0 10px"
                v-preventReClick
                @click="scope._self.$refs[`popover-${scope.$index}`].doClose()"
                >取消</el-button
              >

              <el-button
                :disabled="scope.row.SurplusDistribution == '0'"
                slot="reference"
                type="primary"
                icon="el-icon-news"
                plain
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
import { getTime } from "common/time/getTime";
export default {
  data() {
    return {
      datas: [],

      // defaultProps: {
      //   children: "children",
      //   label: "label",
      // },

      ReplenishmentOrderNumber: "", //补料订单号
      ReplenishmentNumber: "", //补料数量
      SupplierCode: "", //供应商编码
      ConfirmNumber: "", //确认数
      MaterialNumber: "", //物料编码
      SN: "", //序列号
      pagenums: 0,
      total: 0,
      LLNumber: "",
      flg: false,
      id: "",
      tableData: [],
      tableData1: [],
      tableData5: [],
      datas1: [],
      options: [],
      pyid: "",
      datatemp: [],
      form: {
        OrderNumber: "", //订单编号

        PurchaseNumber: "", //采购编号
        supplierNumber: "", //供应商编号
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
        status: "", //状态
        creater: "", //创建人
        creatdate: "", //创建时间
      },
    };
  },
  methods: {
    //获取页面数
    getpage() {
      this.$https({
        method: "get",
        url: "/api/apiModel/getpage",
        params: {
          table: "ManufacturingExecution",
          pageWhere: { status: "0" },
        },
      })
        .then((res) => {
          console.log(res);
          this.total = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async Edits1(datas, row, forms) {
      //将信息修改
      await this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/apiModel/update",
        data: {
          table: "ManufacturingExecutionDetail",
          id: row._id,
          form: forms,
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
      let flg = true;

      for (let i = 0; i < datas.length; i++) {
        if (datas.ConfirmNumber == "") {
          flg = false;
        }
      }
      if (flg) {
        //全部确认 修改表单sn状态
        await this.$https({
          //这里是你自己的请求方式、url和data参数
          method: "post",
          url: "/api/apiModel/updateByWhere",
          data: {
            table: "ManufacturingExecution",
            where: { SN: datas[0].SN },
            form: {
              status: "1",
            },
          },
        })
          .then((res) => {
            console.log("修改SN状态", res);
          })
          .catch(function (err) {
            console.log(err);
          });
      }
    },
    //补料操作
    async Editss(scope) {
      scope._self.$refs[`popover-${scope.$index}`].doClose();
      this.$myloading({
        show: true,
      });
      this.$https({
        method: "post",
        url: "api/transaction/ManufacturingPlanBLTransaction",
        data: {
          row: scope.row,
          ReplenishmentNumber: this.ReplenishmentNumber,
          creater: sessionStorage.getItem("loginName"),
          creatdate: getTime(),
        },
      })
        .then((res) => {
          console.log(res);
          if (res.status) {
            this.newview();
            this.findDetail();
            this.$myloading({
              show: false,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
      // this.Editssw(scope.row, this.ReplenishmentNumber);
    },
    // async Editssw(row, ReplenishmentNumber) {
    //   //1.添加订单头
    //   let dt = new Date();
    //   let Y = dt.getFullYear() + "";
    //   let M = dt.getMonth() + 1 + "";
    //   let D = dt.getDate() + "";
    //   if (M.length < 2) M = "0" + M;
    //   if (D.length < 2) D = "0" + D;
    //   let Onumber = "8" + Y + M + D + "000";

    //   let ds = await this.findorders("8" + Y + M + D);
    //   if (ds.length == 1) {
    //     Onumber = ds[0].OrderNumber;
    //   }
    //   if (ds.length > 1) {
    //     for (let i = 0; i < ds.length; i++) {
    //       if (parseInt(ds[i].OrderNumber) > parseInt(Onumber))
    //         Onumber = ds[i].OrderNumber;
    //     }
    //   }
    //   let OrderNumbers = parseInt(Onumber) + 1 + "";
    //   let fors = {
    //     OrderNumber: OrderNumbers, //计算出本次订单编号
    //     processCode: "1", //流程码
    //     Purpose: "制造补料功能需求", //用途
    //     Remarks: "制造补料", //备注
    //     creater: sessionStorage.getItem("loginName"),
    //     creatdate: getTime(),
    //     status: "0",
    //   };
    //   let forss = {
    //     OrderNumber: OrderNumbers, //计算出本次订单编号
    //     MaterialNumber: row.MaterialNumber, //产品编号
    //     MaterialName: row.MaterialNumber, //产品名称
    //     MaterialPrice: "", //产品价格
    //     Thumbnail: "",
    //     MaterialSpec: "",
    //     Number: ReplenishmentNumber, //产品数量
    //     PNum: ReplenishmentNumber, //计划数
    //     jine: "", //金额
    //     tjine: "", //总金额
    //     creater: sessionStorage.getItem("loginName"),
    //     creatdate: getTime(),
    //     status: "0",
    //   };
    //   let flag = false;
    //   let flag1 = false;
    //   await this.$https({
    //     //这里是你自己的请求方式、url和data参数
    //     method: "post",
    //     url: "/api/apiModel/insert",
    //     data: {
    //       table: "salesOrder",
    //       form: fors,
    //     },
    //   })
    //     .then((res) => {
    //       console.log(res);
    //       flag = true;
    //     })
    //     .catch(function (err) {
    //       console.log(err);
    //     });
    //   //2.添加订单明细
    //   await this.$https({
    //     //这里是你自己的请求方式、url和data参数
    //     method: "post",
    //     url: "/api/apiModel/insert",
    //     data: {
    //       table: "salesOrderDetail",
    //       form: forss,
    //     },
    //   })
    //     .then((res) => {
    //       console.log(res);
    //       flag1 = true;
    //     })
    //     .catch(function (err) {
    //       console.log(err);
    //     });
    //   //3.修改补料记录
    //   if (flag && flag1) {
    //     console.log("修改补料记录", OrderNumbers, ReplenishmentNumber, row._id);
    //     this.$https({
    //       method: "post",
    //       url: "/api/apiModel/update",
    //       data: {
    //         table: "ManufacturingExecutionDetail",
    //         form: {
    //           ReplenishmentOrderNumber: OrderNumbers,
    //           ReplenishmentNumber: ReplenishmentNumber,
    //         },
    //         id: row._id,
    //       },
    //     })
    //       .then((res) => {
    //         console.log(res);
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //   }
    // },
    // async findorders(c) {
    //   console.log("当前数据1112==>", c);
    //   let cos = c;
    //   let cdss = { OrderNumber: { $regex: cos } };
    //   let codesq = [];
    //   await this.$https({
    //     //这里是你自己的请求方式、url和data参数
    //     method: "get",
    //     url: "/api/apiModel/find",
    //     params: {
    //       table: "salesOrder",
    //       where: cdss,
    //     },
    //   })
    //     .then((res) => {
    //       console.log("当前数据11==>", res);
    //       codesq = res;
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    //   return codesq;
    // },

    //编辑事件
    async Edits(scope) {
      //this.SupplierCode:"",//供应商编码
      //this.ConfirmNumber:"",//确认数
      scope._self.$refs[`popover-${scope.$index}`].doClose();
      if (this.ConfirmNumber != scope.row.Number) return;
      let forms = {
        ConfirmNumber: scope.row.Number,
      };
      if (this.SupplierCode) forms.SupplierCode = this.SupplierCode;
      scope.row.ConfirmNumber = this.ConfirmNumber;
      scope.row.SupplierCode = this.SupplierCode;
      this.$myloading({
        show: true,
      });
      console.log("-------", this.tableData1);
      this.$https({
        method: "post",
        url: "api/transaction/ManufacturingExecutionTransaction",
        data: {
          datas: this.tableData1,
          row: scope.row,
          forms: forms,
          creater: sessionStorage.getItem("loginName"),
          creatdate: getTime(),
        },
      })
        .then((res) => {
          console.log(res);
          if (res.status) {
            this.findDetail1();
            this.$myloading({
              show: false,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    de(scope) {
      this.LLNumber = scope.row.SurplusNumber;
    },
    //刷新界面
    newview() {
      //this.find(); //找寻对应页面的数据
      this.getpage(); //刷新分页
      this.findByPageNum(); //找寻对应页面的数据
    },
    //根据page数查询对应数据
    async find() {
      await this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "ManufacturingExecution",
          where: {
            status: "0",
          },
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

    zks(row) {
      if (row.BOM && row.BOM.length > 0) {
        this.datas = JSON.parse(row.BOM);
      } else {
        this.datas = [];
      }
      this.MaterialNumber = row.MaterialNumber;
      this.SN = row.SN;
      this.tableData1 = [];
      this.findDetail1();
    },
    async findDetail1() {
      await this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "SubManufacturingExecution",
          where: { SN: this.SN },
        },
      })
        .then((res) => {
          console.log(res);
          this.tableData5 = res;
        })
        .catch(function (err) {
          console.log(err);
        });
    },

    zk(row) {
      this.MaterialNumber = row.MaterialNumber;
      this.SN = row.SN;
      this.tableData1 = [];
      this.findDetail(row);
    },

    async findDetail(row) {
      await this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "ManufacturingExecutionDetail",
          where: { SN: row.SN, Subsequence: row.Subsequence },
        },
      })
        .then((res) => {
          console.log(res);
          this.tableData1 = res;
        })
        .catch(function (err) {
          console.log(err);
        });
    },

    //////////////////////////////////////////////////////////////////

    async findsupplierNumber(scope) {
      this.form.ShouldNumber = scope.row.SurplusDistribution;
      let csd = await this.findGYS(scope.row.MaterialNumber);
      this.$nextTick(() => {
        this.options = csd;
      });
    },
    async findGYS(materialNumber) {
      let dsd = [];
      await this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__supplierMaterial",
          where: { MaterialNumber: materialNumber },
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
    //选择展示页数据
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenums = (val - 1) * 10;
      this.findByPageNum();
    },
    //根据page数查询对应数据
    findByPageNum() {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/findByPageNum",
        params: {
          table: "ManufacturingExecution",
          PageNum: this.pagenums,
          sortJson: { _id: -1 },
          pageWhere: { status: "0" },
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
    //编辑事件
    Edit(scope) {
      // if(scope.row.SurplusDistribution=="0")return;

      this.id = scope.row._id;
      this.form.PlanNumber = scope.row.PlanNumber;
      this.form.MaterialNumber = scope.row.MaterialNumber; //物料编号
      this.form.SurplusDistribution = scope.row.SurplusDistribution;

      let cd =
        parseInt(this.form.SurplusDistribution) -
        parseInt(this.form.ShouldNumber); //剩余分配数

      if (this.options.length > 0) {
        let cdsd = this.options.filter(
          (item) => item.supplierNumber == scope.row.supplierNumber
        );
        this.form.Contacts = cdsd[0].Contacts;
        this.form.ContactsPhone = cdsd[0].ContactsPhone;
      }
      let temp = "0";
      if (cd < 0) {
        this.insertyyb(Math.abs(cd)); //盈余表
      }
      if (cd <= 0) {
        temp = "1";
      }
      let fs = {
        SurplusDistribution: cd > 0 ? cd + "" : "0",
        status: temp,
      };
      console.log("fs....", fs);
      //修改采购单
      this.update(fs);
      ///////////////////////

      let csd = {
        OrderNumber: scope.row.OrderNumber, //订单编号
        MaterialNumber: scope.row.MaterialNumber + "", //物料编号
        PlanNumber: scope.row.PlanNumber,
        ShouldNumber: this.form.ShouldNumber,
        StateNumber: "0", //状态数量
      };
      this.insertyyztb(csd); //盈余状态表
      let tempsd = JSON.parse(JSON.stringify(scope.row));

      tempsd.PurchaseNumber = ""; //采购编号
      tempsd.CheckNumber = ""; //质检单号
      tempsd.supplierNumber = scope.row.supplierNumber; //供应商编号

      tempsd.supplierName = this.form.supplierName; //供应商名称
      tempsd.Contacts = this.form.Contacts; //
      tempsd.ContactsPhone = this.form.ContactsPhone; //

      tempsd.ActualNumber = "";
      tempsd.ActualNumbertotal = "0";
      tempsd.ShouldNumber = this.form.ShouldNumber;
      tempsd.ActualPrice = this.form.ActualPrice;

      tempsd.Monry = "";
      tempsd.tMonry = "";

      tempsd.status = "0";
      tempsd.creatdate = getTime(); //创建时间
      this.$delete(tempsd, "_id");
      console.log("在途。。", tempsd);
      this.ztinsert(tempsd);
      //this.sclljyd(tempsd);

      scope._self.$refs[`popover-${scope.$index}`].doClose();

      this.finddetail();
      //进入推单模式
      this.getProcessState(scope.row.OrderNumber, "PurchaseOrder", "1", "5");
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
            if (res[i].status != statusing) csd = false;
          }
          //修改采购单对应的数据

          if (csd) {
            this.updatecg();

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
                this.find();
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
    async updatecg() {
      //1.查询当天的po单号
      let dt = new Date();
      let Y = dt.getFullYear() + "";
      let M = dt.getMonth() + 1 + "";
      let D = dt.getDate() + "";
      M.padStart(2, "0");
      D.padStart(2, "0");
      let ces = parseInt(Y + M + D + "000"); //初始采购单号

      let cdss = { PurchaseNumber: { $regex: Y + M + D + "" } };
      let cgd = [];
      //查询最高采购单号
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
      cgd = cgd.filter((item) => {
        return item.PurchaseNumber != "";
      });
      // console.log("cgd2:",cgd);//现有采购单号

      if (cgd.length > 0) {
        cgd.sort((a, b) => {
          return parseInt(a.PurchaseNumber) - parseInt(b.PurchaseNumber);
        });
        ces = parseInt(cgd[cgd.length - 1].PurchaseNumber); //最高采购单号
      }
      console.log("采购单号:", cgd);
      console.log("最大采购单号:", ces);

      // debugger
      //该订单号下所有物料明细
      let cgds = [];
      await this.$https({
        method: "get",
        url: "api/apiModel/find",
        params: {
          table: "IntransitOrder",
          where: { OrderNumber: this.OrderNumbers },
        },
      })
        .then((res) => {
          console.log("该订单下所有明细：", res);
          cgds = res;
        })
        .catch((err) => {
          console.log(err);
        });
      let gys = []; //供应商
      //在途信息
      for (let i = 0; i < cgds.length; i++) {
        if (gys.indexOf(cgds[i].supplierNumber) == -1) {
          gys.unshift(cgds[i].supplierNumber);
        }
      }
      console.log("该订单下所有供应商明细：", gys);

      //2根据当前单号计算下次单号开始位置
      let cds = ces + 1;
      console.log("///////////////////////////////////");
      //3修改采购单对应信息
      for (let i = 0; i < gys.length; i++) {
        console.log(cgds, cds + i, gys[i]);
        this.ztupdates(cgds, cds + i, gys[i]);
      }
    },
    async ztupdates(v1, v2, v3) {
      for (let i = 0; i < v1.length; i++) {
        if (v1[i].supplierNumber == v3) {
          //删除增加操作
          await this.delAndInsert(v1[i], v2 + "");
        }
      }
    },
    async delAndInsert(row, PurchaseNumber) {
      let id = row._id;
      this.$delete(row, "_id");
      row.PurchaseNumber = PurchaseNumber;
      await this.$https({
        method: "post",
        url: "/api/apiModel/delete",
        data: {
          table: "IntransitOrder",
          id: id,
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });

      await this.ztinsert(row);
    },
    //在途修改
    ztupdate(v, v2) {
      this.$https({
        method: "post",
        url: "/api/apiModel/updateByWhere",
        data: {
          table: "IntransitOrder",
          form: { PurchaseNumber: v + "" },
          where: { OrderNumbers: this.OrderNumbers, supplierNumber: v2 },
        },
      })
        .then((res) => {
          console.log("修改后mess：", res);
        })
        .catch((err) => {
          console.log(err);
        });
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
    update(v) {
      //   if (this.auth()) return;
      this.$https({
        method: "post",
        url: "/api/apiModel/update",
        data: {
          table: "PurchaseOrder",
          form: v,
          id: this.id,
        },
      })
        .then((res) => {
          console.log(res);
          console.log("insertyyb......");
          //将溢出的采购数插入盈余表中
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //盈余状态表

    insertyyztb(v) {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/apiModel/insert",
        data: {
          table: "PurchaseSurplusState",
          form: v,
        },
      })
        .then(function (res) {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    //盈余表
    async insertyyb(cs) {
      await this.findyy();
      console.log("tempdata...", this.tempdata);
      if (this.tempdata.length > 0) {
        let nu = parseInt(this.tempdata[0].Number) + cs;
        console.log("nu修改:" + nu);
        this.updateyy(nu + "", this.tempdata[0]._id);
      } else {
        console.log("nu插入:");
        this.insertyy(cs + ""); //表数据不存在添加新行
      }
    },
    async findyy() {
      await this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "PurchaseSurplus",
          where: {
            MaterialNumber: this.form.MaterialNumber,
          },
        },
      })
        .then((res) => {
          console.log(res);
          this.tempdata = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    insertyy(cs) {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/apiModel/insert",
        data: {
          table: "PurchaseSurplus",
          form: {
            MaterialNumber: this.form.MaterialNumber,
            Number: cs,
          },
        },
      })
        .then(function (res) {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    updateyy(nu, id) {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/apiModel/update",
        data: {
          table: "PurchaseSurplus",
          form: {
            Number: nu,
          },
          id: id,
        },
      })
        .then(function (res) {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
    },

    //////////////////////////////////////////////////////////////////
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
.dddf {
  display: flex;
}
.ddd::before {
  position: relative;
  display: block;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 30px;
  content: "BOM";
  text-align: center;
  line-height: 30px;
  background-color: rgb(224, 240, 240);
}
.ddd {
  width: 300px;
  height: 300px;
  border: 1px rgb(224, 220, 220) solid;
  box-shadow: 5px 5px 10px rgba(10, 10, 10, 0.2);
  margin: 10px 20px;
  box-sizing: border-box;
  overflow: auto;
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
