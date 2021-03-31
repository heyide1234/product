<template>
  <div class="container">
    <el-steps :active="0" finish-status="success" simple style="margin: 5px">
      <el-step title="成品入库单"></el-step>
      <!--<el-step title="制程"></el-step>
      <el-step title="配料"></el-step>
      <el-step title="领料"></el-step>
      <el-step title="检验"></el-step>-->
    </el-steps>

    <div class="tabels">
      <el-table
        ref="tableselectData"
        class="table"
        height="500"
        :data="tableData"
      >
        <el-table-column type="selection" width="50"></el-table-column>

        <el-table-column
          property="MaterialNumber"
          label="产品编号"
        ></el-table-column>

        <el-table-column
          property="MaterialName"
          label="产品名称"
        ></el-table-column>

        <el-table-column property="Thumbnail" label="缩略图"></el-table-column>

        <el-table-column
          property="MaterialSpec"
          label="规格型号"
        ></el-table-column>

        <el-table-column property="Company" label="单位"></el-table-column>
        <el-table-column property="Number" label="数量"></el-table-column>

        <el-table-column
          property="ConfirmNumer"
          label="入库数量"
        ></el-table-column>

        <el-table-column label="关于" min-width="80">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>创建人: {{ scope.row.creater }}</p>
              <p>创建日期: {{ scope.row.creatdate }}</p>
              <p>备注: {{ scope.row.Remark }}</p>

              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">...</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="入库" min-width="90" fixed="right">
          <template slot-scope="scope">
            <!-- <el-button size="mini" v-preventReClick  @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
            <el-popover
              placement="left"
              width="300"
              trigger="click"
              :ref="`popover-${scope.$index}`"
            >
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="入库数">
                  <el-input v-model="form.ConfirmNumer"></el-input>
                </el-form-item>
              </el-form>
              <el-button
                style="float: right"
                type="primary"
                v-preventReClick
                @click="handleEdits(scope)"
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
export default {
  data() {
    return {
      operation: "", //当前操作切换
      pagenums: 0,
      form: {
        MaterialNumber: "", //产品编号
        MaterialName: "", //产品名称
        MaterialSpec: "", //规格型号
        Thumbnail: "", //缩略图
        Company: "", //单位
        Number: "0", //数量
        ConfirmNumer: "0", //入库数量
        Remark: "", //备注
        status: "0", //状态
        creater: "", //创建人
        creatdate: "", //创建时间
      },
      templatdt: [],
      total: 0,
      id: {},
      name: "",
      search: "",
      dialogFormVisible: false,
      tableData: [],
      classDate: [],
      newclassDate: [],
      classvalue: [],
      temparr: [],
      tempcode: 0,
      MaterialInfo: [],
    };
  },
  methods: {
    async handleEdits(scope) {
      if (this.form.ConfirmNumer != scope.row.Number) return;
      let ford = scope.row;
      ford.ConfirmNumer = this.form.ConfirmNumer;
      ford.creater = sessionStorage.getItem("loginName");
      ford.creatdate = getTime();
      console.log(ford);

      scope._self.$refs[`popover-${scope.$index}`].doClose();
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
    updategoodsDelivery(cod) {
      this.$https({
        method: "post",
        url: "/api/apiModel/update",
        data: {
          table: "goodsWarehousing",
          form: cod,
          id: this.id,
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //查询库存数
    async findStockNum(v) {
      await this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "stock",
          where: { MaterialNumber: v },
        },
      })
        .then((res) => {
          console.log(res);
          this.templatdt = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //更新库存数
    updateStockNum(v, n) {
      this.$https({
        method: "post",
        url: "/api/apiModel/updateByWhere",
        data: {
          table: "stock",
          form: { Number: v },
          where: { MaterialNumber: n },
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    findsMateria() {
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__basicMaterialList",
          dataBase: "base",
          where: {
            MaterialNumber: this.form.MaterialNumber,
          },
        },
      })
        .then((res) => {
          this.form.MaterialName = res[0].MaterialName;
          this.form.MaterialSpec = res[0].MaterialSpec;
          this.form.Thumbnail = res[0].Thumbnail;
          this.form.Company = res[0].Company;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleChange(value) {
      // this.form.Class1Num = value[0];
      // this.form.Class2Num = value[1];
      // this.form.Class3Num = value[2];
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
    //级联
    // getMaterialList() {
    //   this.$https({
    //     method: "get",
    //     url: "/api/apiModel/find",
    //     params: {
    //       table: "__materialClass",dataBase: "base",
    //       where: {}
    //     }
    //   })
    //     .then(res => {
    //       console.log(res);
    //       this.classDate = res;
    //       this.newclassDate = res;
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },

    //获取页面数
    getpage() {
      this.$https({
        method: "get",
        url: "/api/apiModel/getpage",
        params: {
          table: "goodsWarehousing",
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
    handleAdd() {
      this.operation = "add";
      this.form.MaterialNumber = ""; //物料编号
      this.form.MaterialName = ""; //物料名称
      this.form.Thumbnail = ""; //缩略图
      this.form.MaterialSpec = ""; //规格型号
      this.form.Number = ""; //数量

      this.form.Location = ""; //库位
      this.form.MaterialSource = ""; //材料来源
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
    async onSubmit() {
      this.dialogFormVisible = false;
      // this.form.MaterialNumber =
      //   this.form.Class1Num + this.form.Class2Num + this.form.Class3Num;

      this.form.creater = sessionStorage.getItem("loginName");
      this.form.creatdate = getTime();
      if (this.operation === "add") {
        this.add();
      } else {
        this.update();
      }
      this.newview();
    },
    /////crud
    // 数据添加
    add() {
      console.log("form....", this.form);
      //  if (this.auth()) return;
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/apiModel/insert",
        data: {
          table: "stock",
          form: this.form,
        },
      })
        .then(function (res) {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    // 数据删除
    del() {
      if (this.auth()) return;
      this.$https({
        method: "post",
        url: "/api/apiModel/delete",
        data: {
          table: "stock",
          id: this.id.id,
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
    update() {
      if (this.auth()) return;
      this.$https({
        method: "post",
        url: "/api/apiModel/update",
        data: {
          table: "stock",
          id: this.id.id,
          form: this.form,
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
      console.log("数据查询。。" + this.pagenums);
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "ManufacturingExecution",
          where: { status: "2" },
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
  },
  filters: {
    //过滤数据进行级联
    filterJL(v) {
      let code = "[";
      let classcode1 = [];
      v.filter((item) => {
        if (classcode1.indexOf(item.Class1Num) > -1) return;
        classcode1.push(item.Class1Num);
        let it1 = item.Class1Num;
        code += "{";
        code += '"value":"' + item.Class1Num + '"';
        code += ',"label":"' + item.Class1Name + '"';
        code += ',"children": [';
        let classcode2 = [];
        v.filter((item1) => {
          if (classcode2.indexOf(item1.Class2Num) > -1) return;
          classcode2.push(item1.Class2Num);
          if (item1.Class1Num === it1) {
            let it2 = item1.Class2Num;
            code += '{"value":"' + item1.Class2Num + '"';
            code += ',"label":"' + item1.Class2Name + '"';
            code += ',"children": [';
            v.filter((item2) => {
              if (item2.Class1Num === it1 && item2.Class2Num === it2) {
                code += '{"value":"' + item2.Class3Num + '"';
                code += ',"label":"' + item2.Class3Name + '"';
                code += "},";
              }
            });
            code += "]";
            code += "},";
          }
        });
        code += "]";
        code += "},";
      });
      code += "]";
      code = code.replace(/},]/g, "}]");
      code = code.replace(/},}/g, "}}");
      // this.newclassDate = JSON.parse(code);
      return JSON.parse(code);
    },
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
