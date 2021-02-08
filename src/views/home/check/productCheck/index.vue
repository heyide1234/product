<template>
  <div class="container">
    <div class="loadbg" v-show="flg">
      <div class="loading">
        <div class="imgdiv"><img src="~assets/title.png" /></div>
        <div class="imgdiv"><img src="~assets/title.png" /></div>
        <div class="imgdiv"><img src="~assets/title.png" /></div>
        <div class="imgdiv"><img src="~assets/title.png" /></div>
        <div class="imgdiv"><img src="~assets/title.png" /></div>
        <div class="imgdiv"><img src="~assets/title.png" /></div>
      </div>
    </div>
    <el-dialog
      title="表单"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <el-form ref="form" label-width="80px">
        <el-form-item label="外观检查">
          <el-radio-group v-model="form1.VisualCheck">
            <el-radio label="合格"></el-radio>
            <el-radio label="不合格"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="标识贴">
          <el-radio-group v-model="form1.Label">
            <el-radio label="合格"></el-radio>
            <el-radio label="不合格"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="备注">
          <el-input type="textarea" v-model="form1.Remarks"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <el-steps :active="0" finish-status="success" simple style="margin: 5px">
      <el-step title="产品序列号"></el-step>
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
              @click="zk(scope.row)"
            ></el-button>
            <el-button
              type="success"
              icon="el-icon-position"
              circle
              plain
              size="mini"
              @click="ts(scope.row)"
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
        <el-step title="成品检验单"></el-step>&nbsp;&nbsp;&nbsp;<font>{{
          SN
        }}</font>
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

        <el-table-column property="VisualCheck" label="外观检查">
          <template slot="header">
            <span style="color: #00ccff">外观检查</span>
          </template>
        </el-table-column>
        <el-table-column property="Label" label="标识贴">
          <template slot="header">
            <span style="color: #00ccff">标识贴</span>
          </template>
        </el-table-column>
        <el-table-column property="Remarks" label="备注">
          <template slot="header">
            <span style="color: #00ccff">备注</span>
          </template>
        </el-table-column>

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

        <el-table-column>
          <template slot="header">
            <el-button
              type="success"
              icon="el-icon-document-add"
              plain
              circle
              size="mini"
              @click="handleAdd"
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
      dialogFormVisible: false,
      SupplierCode: "", //供应商编码
      ConfirmNumber: "", //确认数
      MaterialNumber: "", //物料编码
      SN: "", //序列号
      LLNumber: "",
      flg: false,
      id: "",
      total: 0,
      tableData: [],
      tableData1: [],
      datas1: [],
      options: [],
      pyid: "",
      datatemp: [],
      form1: {
        VisualCheck: "", //外观检查
        Label: "", //标签
        Remarks: "", //备注
      },
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
    ts(row) {
      if (confirm("是否开启流程转发！")) {
        this.$https({
          //这里是你自己的请求方式、url和data参数
          method: "post",
          url: "/api/apiModel/update",
          data: {
            table: "ManufacturingExecution",
            id: row._id,
            form: {
              status: "2",
            },
          },
        })
          .then((res) => {
            console.log(res);
            this.find();
          })
          .catch(function (err) {
            console.log(err);
          });
      }
    },
    onSubmit() {
      console.log("checkItem===", this.form1);
      let tempform = this.form1;
      let dt = this.tableData.filter((item) => {
        return item.SN == this.SN;
      });
      tempform.SN = this.SN;
      tempform.OrderNumber = dt[0].OrderNumber;
      tempform.MaterialNumber = dt[0].MaterialNumber;
      tempform.MaterialName = dt[0].MaterialName;
      tempform.Thumbnail = dt[0].Thumbnail;
      tempform.MaterialSpec = dt[0].MaterialSpec;

      tempform.creater = sessionStorage.getItem("loginName");
      tempform.creatdate = getTime();

      this.addzjd(tempform);
      this.findDetail();

      this.dialogFormVisible = false;
    },
    async addzjd(v) {
      await this.$https({
        method: "post",
        url: "/api/apiModel/insert",
        data: {
          table: "productCheck",
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
    handleAdd() {
      this.dialogFormVisible = true;
      this.form1 = {};
    },
    //编辑事件
    async Edits(scope) {
      //this.SupplierCode:"",//供应商编码
      //this.ConfirmNumber:"",//确认数
      let ids = scope.row._id;
      let v = {
        ConfirmNumber: scope.row.Number,
      };
      if (this.ConfirmNumber != scope.row.Number) return;

      if (this.SupplierCode) {
        v.SupplierCode = this.SupplierCode;
      }
      //将信息修改
      await this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/apiModel/update",
        data: {
          table: "ManufacturingExecutionDetail",
          id: ids,
          form: v,
        },
      })
        .then((res) => {
          console.log(res);
          scope.row.ConfirmNumber = this.ConfirmNumber;
        })
        .catch(function (err) {
          console.log(err);
        });
      let flg = true;
      for (let i = 0; i < this.tableData1.length; i++) {
        if (this.tableData1[i].ConfirmNumber == "") {
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
            where: { SN: this.tableData1[0].SN },
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

      scope._self.$refs[`popover-${scope.$index}`].doClose();
    },
    de(scope) {
      this.LLNumber = scope.row.SurplusNumber;
    },
    //刷新界面
    newview() {
      this.find(); //找寻对应页面的数据
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
            status: "1",
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
      this.MaterialNumber = row.MaterialNumber;
      this.SN = row.SN;
      this.tableData1 = [];
      this.findDetail();
    },

    async findDetail() {
      await this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "productCheck",
          where: { SN: this.SN },
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
