<template>
  <div class="container">
    <el-steps :active="0" finish-status="success" simple style="margin: 5px">
      <el-step title="材料入库单"></el-step>
    </el-steps>
    <el-dialog
      title="表单"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="form">
        <el-form-item label="产品名称">
          <el-input v-model="form.ProductName"></el-input>
        </el-form-item>
        <el-form-item label="规格型号">
          <el-input v-model="form.SpecModel"></el-input>
        </el-form-item>

        <el-form-item label="物料号">
          <el-input v-model="form.MaterielNum"></el-input>
        </el-form-item>
        <el-form-item label="制造SN">
          <el-input v-model="form.ManufactureSN"></el-input>
        </el-form-item>
        <el-form-item label="说明">
          <el-input type="textarea" v-model="form.Remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <div class="tabels">
      <el-table
        ref="tableselectData"
        class="table"
        height="500"
        :data="tableData"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column label="订单编号" min-width="150">
          <template #header>
            <el-input
              size="mini"
              v-model="search"
              @change="searchs"
              prefix-icon="el-icon-search"
              placeholder="输入订单编号"
            />
          </template>
          <template slot-scope="scope">
            <i class="el-icon-paperclip"></i>
            <span style="margin-left: 10px">{{ scope.row.OrderNumber }}</span>
          </template>
        </el-table-column>

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

        <el-table-column
          property="MaterialTexture"
          label="材质"
        ></el-table-column>

        <el-table-column property="Company" label="单位"></el-table-column>

        <el-table-column property="Enclosure" label="附件"></el-table-column>

        <el-table-column property="OKNumber" label="待入库数"></el-table-column>
        <el-table-column
          property="FirmOKNumber"
          label="入库数"
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
        <el-table-column label="入库" min-width="90" fixed="right">
          <template slot-scope="scope">
            <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
            <el-popover
              placement="left"
              width="300"
              trigger="click"
              :ref="`popover-${scope.$index}`"
            >
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="入库数量">
                  <el-input v-model="form.FirmOKNumber"></el-input>
                </el-form-item>

                <!-- <el-form-item label="库位">
                  <el-input v-model="form.Location"></el-input>
                </el-form-item>
                <el-form-item label="材料来源">
                  <el-input v-model="form.MaterialSource"></el-input>
                </el-form-item> -->
              </el-form>
              <el-button
                style="float: right"
                type="primary"
                @click="handleEdit(scope)"
                >确定</el-button
              >
              <el-button
                style="float: right; margin: 0 10px"
                @click="scope._self.$refs[`popover-${scope.$index}`].doClose()"
                >取消</el-button
              >
              <el-button
                :disabled="scope.row.status === '1'"
                slot="reference"
                type="primary"
                icon="el-icon-edit"
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
      operation: "", //当前操作切换
      pagenums: 0,
      form: {
        OrderNumber: "", //订单编号
        MaterialNumber: "", //物料编号
        MaterialName: "", //物料名称
        MaterialSpec: "", //规格型号
        Thumbnail: "", //缩略图
        OKNumber: "", //待入库数量
        FirmOKNumber: "", //入库数量
        Location: "", //库位
        MaterialSource: "", //材料来源
        Status: "", //状态
        checker: "", //检验人
        creater: "", //创建人
        creatdate: "", //创建时间
      },
      total: 0,
      id: "",
      name: "",
      search: "",
      dialogFormVisible: false,
      tableData: [],
      mums: "",
      tempdata: [],
      stsdata: [],
      yyztbdata: [],
      yybdat: [],
    };
  },
  methods: {
    searchs() {
      console.log(".....input", this.search);
      this.findOrderNumber();
    },
    findOrderNumber() {
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "Warehousing",
          where: { OrderNumber: this.search },
          sortJson: { _id: -1 },
        },
      })
        .then((res) => {
          this.tableData = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //计算物料实际需求数量
    async handleJS(row) {
      console.log(row);
      let newrow = JSON.parse(JSON.stringify(row));
      let nus = "0";
      console.log(row.MaterialNumber, row.Number);
      await this.MaterialNumberNumber(row.MaterialNumber);
      console.log("mums=" + this.mums);
      nus = parseInt(row.Number) - parseInt(this.mums) + "";
      console.log("nus=" + nus);

      newrow.PlanNumber = nus; //计划采购数量
      newrow.ActualNumber = ""; //实际采购数量
      newrow.ActualPrice = ""; //采购单价
      this.$delete(newrow, "_id");
      this.$delete(newrow, "Parent");

      console.log(newrow);
      this.add(newrow);
    },
    //20200927001
    async MaterialNumberNumber(MaterialNumber) {
      let number1 = "";
      let number2 = "";
      await this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "stock",
          where: { MaterialNumber: MaterialNumber },
        },
      })
        .then((res) => {
          console.log(res);
          number1 = res.Number;
          if (res.length == 0) {
            number1 = "0";
          }
        })
        .catch((err) => {
          console.log(err);
        });
      await this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "PurchaseSurplus",
          where: { MaterialNumber: MaterialNumber },
        },
      })
        .then((res) => {
          console.log(res);
          number2 = res.Number;
          if (res.length == 0) {
            number2 = "0";
          }
        })
        .catch((err) => {
          console.log(err);
        });
      console.log("number1 + number2 =" + number1 + "  " + number2);
      this.mums = parseInt(number1) + parseInt(number2) + "";
    },
    // 数据添加
    add(v) {
      //  if (this.auth()) return;
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/apiModel/insert",
        data: {
          table: "PurchaseOrder",
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

    //添加事件
    handleAdd() {
      this.operation = "add";
      this.form = {};
      this.dialogFormVisible = true;
    },
    //编辑事件
    async handleEdit(scope) {
      this.operation = "update";
      //?
      this.id = scope.row._id;
      this.form.PlanNumber = scope.row.PlanNumber;
      this.form.MaterialNumber = scope.row.MaterialNumber; //物料编号
      this.form.OrderNumber = scope.row.OrderNumber; //订单编号
      let fs = {
        FirmOKNumber: this.form.FirmOKNumber,
        status: "0",
      };
      console.log("fs....", fs);
      this.update(fs);
      //插入仓库
      //1.找寻仓库是否存在

      await this.findck(scope.row.MaterialNumber);
      if (this.stsdata.length == 0) {
        let dt = {
          MaterialNumber: scope.row.MaterialNumber, //物料编号
          MaterialName: scope.row.MaterialName, //物料名称
          MaterialSpec: scope.row.MaterialSpec, //规格型号
          Thumbnail: scope.row.Thumbnail, //缩略图
          Number: this.form.FirmOKNumber, //数量
          Location: scope.row.Location, //库位
          MaterialSource: scope.row.MaterialSource, //材料来源
          Company: scope.row.Company,
          Status: "0", //状态
          creater: sessionStorage.getItem("loginName"), //创建人
          creatdate: getTime(), //创建时间
        };
        this.ckinsert(dt);
      } else {
        let tempd = JSON.parse(JSON.stringify(this.stsdata[0]));
        let ids = tempd._id;
        tempd.Number =
          parseInt(tempd.Number) + parseInt(this.form.FirmOKNumber);
        this.$delete(tempd, "_id");
        this.ckupdate(tempd, ids);
      }
      /////////////////////
      //PurchaseSurplusState盈余表 根据订单号和物料编码对应的数量进行相减，负值为减去盈余表的数量
      //?
      await this.findyyztbs();
      if (this.yyztbdata.length > 0) {
        let idTemp = this.yyztbdata[0]._id;
        let PlanNumberTemp = parseInt(this.yyztbdata[0].PlanNumber); //计划数
        let shouldNumberTemp = parseInt(this.yyztbdata[0].ShouldNumber); //合同应到数
        let numberTemp = parseInt(this.yyztbdata[0].StateNumber); //状态数
        let jsnumber = numberTemp + parseInt(this.form.FirmOKNumber); //计算

        if (jsnumber > PlanNumberTemp) {
          let newstate = 0;
          console.log(
            "jsnumber<shouldNumberTemp==",
            jsnumber,
            shouldNumberTemp
          );
          if (jsnumber < shouldNumberTemp) {
            if (numberTemp < PlanNumberTemp) {
              newstate =
                parseInt(this.form.FirmOKNumber) -
                (PlanNumberTemp - numberTemp);
            } else {
              newstate = parseInt(this.form.FirmOKNumber);
            }
            console.log(
              "jsnumber,shouldNumberTemp,numberTemp==",
              jsnumber,
              shouldNumberTemp,
              numberTemp
            );
            this.updateyyzzbs(idTemp, { StateNumber: jsnumber });
          } else {
            console.log("delete...==");
            newstate = shouldNumberTemp - numberTemp;
            //删除该项
            this.deleteyyzzbs(idTemp);
          }

          //查询数量
          console.log("盈余表查询：");
          await this.findyyb();
          console.log("盈余表查询end：");
          let nums = "0";
          if (this.yybdat.length > 0) {
            nums = this.yybdat[0].Number;
          }
          console.log(
            "盈余表数量：" +
              nums +
              ",计算后的数量:" +
              (parseInt(nums) - newstate)
          );
          //根据数量。盈余表的数量
          this.updatepy(parseInt(nums) - newstate);
        } else {
          this.updateyyzzbs(idTemp, { StateNumber: jsnumber });
        }
      }
      /////////
      scope._self.$refs[`popover-${scope.$index}`].doClose();
      this.findOrderNumber();
    },
    //查询盈余表数据
    async findyyb() {
      console.log("查询盈余表数据....->", {
        MaterialNumber: this.form.MaterialNumber,
      });
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
          console.log("查询的盈余表数据:", res);

          this.yybdat = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //更新盈余表数据
    updatepy(v) {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/apiModel/updateByWhere",
        data: {
          table: "PurchaseSurplus",
          form: { Number: v + "" },
          where: { MaterialNumber: this.form.MaterialNumber },
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateyyzzbs(ids, v) {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/apiModel/update",
        data: {
          table: "PurchaseSurplusState",
          id: ids + "",
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
    //删除盈余状态表
    deleteyyzzbs(ids) {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/apiModel/delete",
        data: {
          table: "PurchaseSurplusState",
          id: ids + "",
        },
      })
        .then(function (res) {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    //找寻盈余状态表
    async findyyztbs() {
      await this.$https({
        methods: "get",
        url: "api/apiMOdel/find",
        params: {
          table: "PurchaseSurplusState",
          where: {
            MaterialNumber: this.form.MaterialNumber,
            OrderNumber: this.form.OrderNumber,
          },
        },
      })
        .then((res) => {
          console.log(res);
          this.yyztbdata = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async findck(MaterialNumbers) {
      await this.$https({
        method: "get",
        url: "api/apiModel/find",
        params: {
          table: "stock",
          where: {
            MaterialNumber: MaterialNumbers,
          },
        },
      })
        .then((res) => {
          console.log("寻找仓库：", res);
          this.stsdata = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    ckupdate(tempd, ids) {
      this.$https({
        method: "post",
        url: "/api/apiModel/update",
        data: {
          table: "stock",
          form: tempd,
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
    ckinsert(v) {
      this.$https({
        method: "post",
        url: "/api/apiModel/insert",
        data: {
          table: "stock",
          form: v,
        },
      })
        .then((res) => {
          console.log(res);
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
          table: "Warehousing",
          form: v,
          id: this.id,
        },
      })
        .then((res) => {
          console.log(res);
          //将溢出的采购数插入盈余表中
          this.insertyyb();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //盈余表
    async insertyyb() {
      //实际数量减去计划数量
      let cs =
        parseInt(this.form.ActualNumber) - parseInt(this.form.PlanNumber);
      if (cs > 0) {
        await this.findyy();

        if (this.tempdata.length > 0) {
          let nu = parseInt(this.tempdata[0].Number) + cs;

          this.updateyy(nu + "", this.tempdata[0]._id);
        } else {
          this.insertyy(cs + ""); //表数据不存在添加新行
        }
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
    //删除事件
    handleDelete(row) {
      this.id = { id: row._id };
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
    //提交按钮
    onSubmit() {
      this.dialogFormVisible = false;
      this.form.SerialNumber =
        this.form.MaterielNum + "-" + this.form.ManufactureSN;
      this.form.creater = sessionStorage.getItem("loginName");
      this.form.creatdate = getTime();
      if (this.operation === "add") {
        this.add(this.form);
      } else {
        let updform = { forms: this.form, id: this.id };
        this.update(updform);
      }
      this.newview();
    },
    /////crud

    // 数据删除
    del() {
      if (this.auth()) return;
      this.$https({
        method: "post",
        // url: "/api/workOrderHead/delete",
        url: "/api/apiModel/delete",
        data: this.id,
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
        url: "/api/workOrderHead/findByPageNum",
        params: {
          UserName:
            sessionStorage.getItem("loginName") === null
              ? {}
              : { creater: sessionStorage.getItem("loginName") },
          PageNum: this.pagenums,
        },
      })
        .then((res) => {
          console.log(res);
          this.tableData = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //权限
    auth() {
      if (sessionStorage.getItem("loginName") == null) {
        this.$message("请先登陆");
        this.$router.push({ path: "/login" });
        return true;
      }
      if (this.name === sessionStorage.getItem("loginName")) {
        return false;
      } else {
        this.$message("权限不足");
        return true;
      }
    },
    findWarehousing() {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "Warehousing",
          where: {},
        },
      })
        .then((res) => {
          console.log("入库单信息：", res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.findWarehousing();
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
