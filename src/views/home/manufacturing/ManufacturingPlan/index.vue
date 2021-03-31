<template>
  <div class="container">
    <!-- <div class="loadbg" v-show="flg">
      <div class="xz"><span class="xzs">加载中...</span></div>
    </div> -->

    <el-steps :active="0" finish-status="success" simple style="margin: 5px">
      <el-step title="制造计划单"></el-step>
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
        <el-table-column property="Purpose" label="用途"></el-table-column>

        <el-table-column
          property="SYNumber"
          label="仓库可分配数"
        ></el-table-column>
        <el-table-column property="Number" label="产品数量"></el-table-column>
        <el-table-column
          property="SurplusNumber"
          label="剩余分配数量"
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
        <el-table-column label="领料" min-width="90" fixed="right">
          <template slot-scope="scope">
            <!-- <el-button size="mini" v-preventReClick  @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
            <el-popover
              placement="left"
              width="300"
              trigger="click"
              :ref="`popover-${scope.$index}`"
            >
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="领料数量">
                  <el-input v-model="LLNumber"></el-input>
                </el-form-item>
              </el-form>
              <el-button
                style="float: right"
                type="primary"
                v-preventReClick
                @click="handleEdit(scope)"
                >确定</el-button
              >
              <el-button
                style="float: right; margin: 0 10px"
                v-preventReClick
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
                v-preventReClick
                @click="de(scope)"
              ></el-button>
            </el-popover>
            <el-button
              type="primary"
              style="margin-left: 5px"
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
        <el-step title="产品SN"></el-step>&nbsp;&nbsp;&nbsp;<font>{{
          MaterialNumber
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
      </el-table>
    </div>
  </div>
</template>

<script>
import { getTime } from "common/time/getTime";
export default {
  data() {
    return {
      MaterialNumber: "",
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
    async getCKnum(datas) {
      this.$myloading({
        show: true,
      });
      for (let i = 0; i < datas.length; i++) {
        await this.$https({
          method: "post",
          url: "api/transaction/MaterialZK",
          data: {
            row: datas[i],
          },
        })
          .then((res) => {
            if (res.status) {
              datas[i].SYNumber = res.data;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
      this.tableData = datas;
      this.$myloading({
        show: false,
      });
    },
    de(scope) {
      this.LLNumber = scope.row.SurplusNumber;
    },
    //刷新界面
    newview() {
      this.find(); //找寻对应页面的数据
    },
    //根据page数查询对应数据
    find() {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "ManufacturingPlan",
          where: {
            status: "0",
          },
        },
      })
        .then((res) => {
          console.log("当前数据", res);
          // this.getstorc(res);
          this.getCKnum(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getstorc(res1) {
      console.log("res1............", res1);
      for (let i = 0; i < res1.length; i++) {
        let dews = await this.findckNum(res1[i].MaterialNumber);
        if (dews.length > 0) res1[i].SYNumber = dews[0].SYNumber;
      }
      this.tableData = res1;
    },
    async findckNum(MaterialNumber) {
      let tem = [];
      await this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "stock",
          where: {
            MaterialNumber: MaterialNumber,
          },
        },
      })
        .then((res) => {
          tem = res;
        })
        .catch((err) => {
          console.log(err);
        });
      return tem;
    },
    //编辑事件
    async handleEdit(scope) {
      scope._self.$refs[`popover-${scope.$index}`].doClose();
      if (scope.row.SYNumber == undefined) {
        alert("请分配仓库参考数");
        return;
      }
      // if (parseInt(this.LLNumber) > parseInt(scope.row.SYNumber)) {
      //   alert("库存不足！");
      //   return;
      // }
      let saveNum = parseInt(scope.row.SurplusNumber) - parseInt(this.LLNumber); //剩余分配数-当前领料数
      if (saveNum < 0) {
        alert("不能大于剩余分配数！");
        return;
      }
      if (parseInt(this.LLNumber) > scope.row.SYNumber) {
        alert("不能大于仓库剩余分配数！");
        return;
      }
      console.log("-----", scope.row.SYNumber == undefined);

      //////////////////////////////////
      this.$myloading({
        show: true,
      });
      this.$https({
        method: "post",
        url: "api/transaction/ManufacturingPlanTransaction",
        data: {
          row: scope.row,
          Purpose: scope.row.Purpose,
          saveNum: saveNum,
          LLNumber: this.LLNumber,
          OrderNumber: scope.row.OrderNumber,
          creater: sessionStorage.getItem("loginName"),
          creatdate: getTime(),
        },
      })
        .then((res) => {
          console.log(res);
          if (res.status) {
            this.newview();
            this.findDetail();
            // this.$myloading({
            //   show: false,
            // });
          }
          this.$myloading({
            show: false,
          });
        })
        .catch((err) => {
          console.log(err);
        });
      /////
      // saveNum:saveNum
      // row:scope.row
      // LLNumber:this.LLNumber
      // creater: sessionStorage.getItem("loginName"), //创建人
      // creatdate: getTime(), //创建时间
      /////////////////
      // if (saveNum > 0) {
      //   //修改剩余值 SurplusNumber=cc
      //   this.updateSY(saveNum + "", scope.row._id, "0");
      // } else if (saveNum == 0) {
      //   //修改剩余值 SurplusNumber="0"
      //   this.updateSY("0", scope.row._id, "1");
      // }

      // //制造执行单->生成模板
      // await this.getzzModel(scope.row);
    },

    updateSY(code, ids, status) {
      // DB.update(data.table, { _id: DB.getObjectID(data.id) }, data.form);
      this.$https({
        method: "post",
        url: "/api/apiModel/update",
        data: {
          table: "ManufacturingPlan",
          id: ids,
          form: { SurplusNumber: code, status: status },
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    findDetail() {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "ManufacturingExecution",
          where: { MaterialNumber: this.MaterialNumber + "", status: "0" },
        },
      })
        .then((res) => {
          console.log("当前数据000", res);
          this.tableData1 = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async insetByManufacturingExecution(v) {
      await this.$https({
        method: "post",
        url: "/api/apiModel/insert",
        data: {
          table: "ManufacturingExecution",
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
    async getSn() {
      let dt = new Date();
      let Y = dt.getFullYear() + "";
      let M = dt.getMonth() + 1 + "";
      let D = dt.getDate() + "";
      if (M.length < 2) M = "0" + M;
      if (D.length < 2) D = "0" + D;
      let nyr = Y + M + D;
      let ces = parseInt(nyr + "000"); //初始SN

      let cdss = { SN: { $regex: nyr + "" } };
      let cgd = [];
      //查询当天存在相同料号SN
      await this.$https({
        method: "get",
        url: "api/apiModel/find",
        params: {
          table: "ManufacturingExecution",
          where: cdss,
        },
      })
        .then((res) => {
          cgd = res;
        })
        .catch((err) => {
          console.log(err);
        });
      if (cgd.length > 0) {
        cgd.sort((a, b) => {
          return parseInt(a.SN) - parseInt(b.SN);
        });
        ces = parseInt(cgd[cgd.length - 1].SN); //最高SN
      }
      let SN = ces + 1;
      return SN;
    },

    //展开BOM
    async getzk(num, n1 = "1") {
      let numc = num;
      let n = parseInt(numc.Number) * parseInt(n1) + ""; //当前数

      await this.findnum(numc.MaterialNumber); //当前产品对应的物料list

      let mums = this.datas;

      if (mums.length > 0) {
        for (let i = 0; i < mums.length; i++) {
          this.getzk(mums[i], n);
        }
      } else {
        numc.Number = n;
        this.datatemp.push(numc);

        return;
      }
    },

    async disticts() {
      var array = [];
      array = this.datatemp;
      this.datatemp = [];
      var newArr = [];
      //算出
      array.filter((item) => {
        if (newArr.indexOf(item.MaterialNumber) == -1) {
          newArr.push(item.MaterialNumber);
        }
      });
      for (let i = 0; i < newArr.length; i++) {
        let temp = {}; //用于累加物料数
        let count = 0;
        for (let j = 0; j < array.length; j++) {
          if (newArr[i] == array[j].MaterialNumber) {
            temp = array[j];
            count += parseInt(array[j].Number);
          }
        }
        temp.Number = count + "";
        this.datatemp.push(temp);
      }
    },

    async findnum(productNumber) {
      await this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__materialDetails",
          dataBase: "base",
          where: { Parent: productNumber },
          sortJson: { _id: -1 },
        },
      })
        .then((res) => {
          this.datas = res;
          console.log("res===", res);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async getzzModel(row) {
      // this.MaterialNumber = scope.row.MaterialNumber;
      let datas1 = await this.findnum2(row.MaterialNumber);

      let cds = {};
      cds.MaterialNumber = datas1[0].MaterialNumber;
      cds.MaterialName = datas1[0].MaterialName;
      cds.MaterialSpec = datas1[0].MaterialSpec;
      cds.MaterialTexture = datas1[0].MaterialTexture;
      cds.Number = "1";
      cds.Company = datas1[0].Company;
      cds.datas1Enclosure = datas1[0].datas1Enclosure;
      this.datatemp = []; //?

      await this.getzk(cds);
      //等待几秒后在执行
      setTimeout(async () => {
        await this.disticts();

        //////

        console.log("当前计算出的模板数据为==", this.datatemp);
        let dataModel = this.datatemp; //产品模板
        //SN--》
        let t = await this.getSn(); //typeOf int
        let df = {
          SN: "", //SN
          OrderNumber: row.OrderNumber, //订单编号
          MaterialNumber: row.MaterialNumber, //产品编号
          MaterialName: row.MaterialName, //产品名称
          Thumbnail: row.Thumbnail, //
          MaterialSpec: row.MaterialSpec, //
          Number: "1", //产品数量
          status: "0", //状态
          creater: sessionStorage.getItem("loginName"), //创建人
          creatdate: getTime(), //创建时间
        };
        for (let i = 0; i < parseInt(this.LLNumber); i++) {
          df.SN = t + i + "";
          df.IsDeliverGoods = "0";
          await this.insetByManufacturingExecution(df);

          await this.insertByManufactringExecutionDetail(
            dataModel,
            df.SN,
            row.OrderNumber
          );
        }
        this.$myloading({
          show: false,
        });
      }, 5000);
      let df1 = {
        OrderNumber: row.OrderNumber, //订单编号
        Purpose: "生产制造",
        MaterialNumber: row.MaterialNumber, //产品编号
        MaterialName: row.MaterialName, //产品名称

        Number: this.LLNumber, //产品数量
        Proportioner: "", //配料人
        CLCKNumber: "", //材料出库单号
        status: "0", //状态
        creater: sessionStorage.getItem("loginName"), //创建人
        creatdate: getTime(), //创建时间
      };
      //插入材料出库单
      this.insertccrkd(df1);
      //修改库存数状态
      this.updateStoreSYNum(row);
    },
    async updateStoreSYNum(row) {
      let d = await this.findckNum(row.MaterialNumber);
      if (d.length > 0) {
        let v = parseInt(d[0].SYNumber) - parseInt(this.LLNumber) + "";
        this.$https({
          //这里是你自己的请求方式、url和data参数
          method: "post",
          url: "/api/apiModel/updateByWhere",
          data: {
            table: "stock",
            where: { MaterialNumber: row.MaterialNumber },
            form: { SYNumber: v },
          },
        })
          .then((res) => {
            console.log(res);
          })
          .catch(function (err) {
            console.log(err);
          });
      }
    },
    //库存查询
    async findstock(MaterialNumber) {
      let dt = [];
      await this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "stock",
          where: {
            MaterialNumber: MaterialNumber,
          },
        },
      })
        .then((res) => {
          dt = res;
        })
        .catch((err) => {
          console.log(err);
        });
      return dt;
    },
    //插入材料出库单v
    insertccrkd(v) {
      this.$https({
        method: "post",
        url: "/api/apiModel/insert",
        data: {
          table: "materialDelivery",
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
    async insertByManufactringExecutionDetail(dataModel, SN, OrderNumber) {
      let d = dataModel;
      for (let i = 0; i < d.length; i++) {
        this.$delete(d[i], "_id");
        d[i].SupplierCode = "";
        d[i].ConfirmNumber = "";
        d[i].Picker = sessionStorage.getItem("loginName") || "未登陆";
        d[i].OP = "";
        d[i].Operator = "";
        d[i].Checker = "";
        d[i].Remark = "";
        d[i].status = "0";
        /////////////////////////
        d[i].SN = SN;
        d[i].OrderNumber = OrderNumber;
        //插入执行明细
        await this.$https({
          method: "post",
          url: "/api/apiModel/insert",
          data: {
            table: "ManufacturingExecutionDetail",
            form: d[i],
          },
        })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    async findnum2(productNumber) {
      let datas1 = [];
      await this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__basicMaterialList",
          dataBase: "base",
          where: { MaterialNumber: productNumber },
          sortJson: { _id: -1 },
        },
      })
        .then((res) => {
          datas1 = res;
        })
        .catch((err) => {
          console.log(err);
        });
      return datas1;
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
      this.tableData1 = [];
      this.findDetail();
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
    findckZKNum() {},

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

/* .loading {
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
} */
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
