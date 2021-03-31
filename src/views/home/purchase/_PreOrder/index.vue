<template>
  <div class="container">
    <el-steps :active="0" finish-status="success" simple style="margin: 5px">
      <el-step title="预采购单"></el-step>
    </el-steps>

    <div class="animation"></div>
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
        <el-table-column property="Number" label="数量"></el-table-column>

        <!-- <el-table-column property="supplierName" label="供应商名称"></el-table-column> -->

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
        <el-table-column label="生成采购单" min-width="90" fixed="right">
          <template slot="header">
            <el-button
              type="danger"
              icon="el-icon-refresh-left"
              circle
              plain
              size="mini"
              v-preventReClick
              @click="handleJS"
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
      pagenums: 0,
      form: {
        //PurchaseOrder//表名
        OrderNumber: "", //订单编号
        MaterialNumber: "", //物料编号
        MaterialName: "", //物料名称
        Thumbnail: "", //缩略图
        MaterialSpec: "", //规格型号
        MaterialTexture: "", //材质
        Company: "", //单位
        Remarks: "", //备注
        Enclosure: "", //附件
        supplierNumber: "", //供应商编号
        supplierName: "", //供应商名称
        status: "", //状态
        PlanNumber: "", //计划采购数量
        ActualNumber: "", //实际采购数量
        ActualPrice: "", //采购单价
        creater: "", //创建人
        creatdate: "", //创建时间
      },
      total: 0,
      id: {},
      name: "",
      search: "",
      dialogFormVisible: false,
      tableData: [],
      mums: "",
      pyid: "",
      supplierSeqData: "",
      options: [],
    };
  },
  methods: {
    //
    async rfr(scope) {
      scope.row.status = "1";
      console.log(scope);
      let csd = await this.findGYS(scope.row.MaterialNumber);
      this.$nextTick(() => {
        this.options = csd;
      });

      console.log("options-------", this.options);
    },
    vfs(scope) {
      let vf = scope.row.supplierNumber.join(",");
      scope.row.status = "0";
      console.log("options-------", vf);

      this.$https({
        method: "post",
        url: "/api/apiModel/update",
        data: {
          table: "MaterialDemand",
          id: scope.row._id,
          form: { supplierNumber: vf },
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //寻找供应商
    // async handleGYS(){
    //   console.log("寻找供应商、、、");
    //  // await this.finds();

    //     for(let i=0;i<this.tableData.length;i++){
    //       //物料编码
    //       let csd=await this.findGYS(this.tableData[i].MaterialNumber);
    //         console.log("供应商物料===",csd.length);

    //         //let vfs=[];
    //         // for(let j=0;j<csd.length;j++){
    //         //    console.log(csd[j].Grade);
    //         //    vfs.push({

    //         //    })

    //         // }

    //     }
    //     console.log(this.tableData)
    // },
    // //通过物料编码查询对应的供应商
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
    async finds() {
      await this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "supplierSeq",
          where: {},
        },
      })
        .then((res) => {
          console.log(res);
          this.supplierSeqData = res[0].Seq;
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    searchs() {
      console.log(".....input", this.search);
      this.findOrderNumber(this.search);
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
          this.tableData = res;
          //this.tableData[1].supplierNumber="1234,345"
          //this.tableData[1].supplierNumber=(this.tableData[1].supplierNumber || "").split(",")
          for (let i = 0; i < this.tableData.length; i++) {
            if (!this.tableData[i].supplierNumber)
              this.tableData[i].supplierNumber = [];
            else
              this.tableData[i].supplierNumber = this.tableData[
                i
              ].supplierNumber.split(",");
          }
          console.log(this.tableData);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //更新盈余表数据
    updatepy(v, wheres) {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/apiModel/updateByWhere",
        data: {
          table: "PurchaseSurplus",
          form: { Number: v },
          where: { MaterialNumber: wheres },
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //计算物料实际需求数量
    async handleJS() {
      for (let i = 0; i < this.tableData.length; i++) {
        let row = this.tableData[i];

        let newrow = JSON.parse(JSON.stringify(row));
        let nus = "0";

        //计算仓库数和盈余数之和
        await this.MaterialNumberNumber(row.MaterialNumber);
        console.log("盈余数量=", parseInt(this.mums));
        nus = parseInt(row.Number) - parseInt(this.mums);
        let csd = "0";

        if (nus > 0) {
          csd = nus + "";
          //this.updatepy("0",parseInt(row.MaterialNumber));
          if (this.pyid != "0") this.deleteyy(this.pyid);
        }
        //需求小于等于盈余不做采购
        if (nus < 0) {
          let c = Math.abs(nus) + "";
          this.updatepy(c, parseInt(row.MaterialNumber)); //genxin
          return;
        }
        if (nus == 0) {
          //this.updatepy("0",parseInt(row.MaterialNumber)); //genxin
          if (this.pyid != "0") this.deleteyy(this.pyid);
          return;
        }

        newrow.PlanNumber = csd; //计划采购数量
        newrow.ShouldNumber = ""; //采购应到数量
        newrow.ActualNumbertotal = ""; //实际采购总数
        newrow.ActualNumber = ""; //实际采购数量
        newrow.ActualPrice = ""; //采购单价
        (newrow.SurplusDistribution = csd),
          (newrow.supplierNumber = ""),
          (newrow.supplierName = ""),
          (newrow.status = "0");
        this.$delete(newrow, "_id");
        this.$delete(newrow, "Parent");

        this.add(newrow); //添加到采购订单
      }
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
          if (res.length == 0) {
            number1 = "0";
          } else {
            number1 = res[0].Number;
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
          if (res.length == 0) {
            number2 = "0";
            this.pyid = "0";
          } else {
            number2 = res[0].Number;
            this.pyid = res[0]._id;
          }
        })
        .catch((err) => {
          console.log(err);
        });
      console.log("number1 + number2 =" + number1 + "  " + number2);
      this.mums = parseInt(number1) + parseInt(number2) + "";
    },

    deleemt(v) {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/apiModel/deleteByWhere",
        data: {
          table: "PurchaseOrder",
          where: v,
        },
      })
        .then(function (res) {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
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
    handleEdit(row) {
      this.operation = "update";
      this.dialogFormVisible = true;
      this.id = { id: row._id };
      this.name = row.creater;
      this.$delete(row, "_id");
      this.form = row;
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
    //数据修改
    update(v) {
      if (this.auth()) return;
      this.$https({
        method: "post",
        url: "/api/workOrderHead/update",
        data: v,
      })
        .then(function (res) {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    deleteyy(ids) {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/apiModel/delete",
        data: {
          table: "PurchaseSurplus",
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
  },
  created() {
    var ua = navigator.userAgent;
    console.log(ua);
    if (/opr/i.test(ua)) {
      console.log("欧朋浏览器。");
    } else if (/chrome/i.test(ua)) {
      console.log("谷歌浏览器。");
    } else if (/firefox/i.test(ua)) {
      console.log("火狐浏览器。");
    } else if (/msie/i.test(ua)) {
      console.log("IE浏览器。");
    } else if ("ActiveXObject" in window) {
      console.log("IE11浏览器。");
    }
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
.animation {
  padding: 0;
  margin: 0;
  position: relative;
  border-radius: 50%;
  height: 15px;
  width: 15px;
  background: #00ff00;
  animation: mymove 1.5s infinite;
  -webkit-animation: mymove 1.5s infinite ease-out alternate;
}
.animation:hover {
  animation-play-state: paused;
  -webkit-animation-play-state: paused;
}
@keyframes mymove {
  0% {
    left: 10px;
    top: 0px;
    background: #015e01;
  }
  100% {
    left: 10px;
    top: -40px;
    background: #00ffcc;
  }
}
@-webkit-keyframes mymove {
  0% {
    left: 10px;
    top: 0px;
    background: #015e01;
  }
  100% {
    left: 10px;
    top: -40px;
    background: #00ffcc;
  }
}
</style>
