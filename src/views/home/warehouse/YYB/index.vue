<template>
  <div class="container">
    <el-steps :active="0" finish-status="success" simple style="margin: 5px">
      <el-step title="盈余表"></el-step>
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
        <el-form-item label="物料编码">
          <el-input
            v-model="form.MaterialNumber"
            type="text"
            :disabled="operation == 'update'"
          ></el-input>
        </el-form-item>
        <el-form-item label="历史数量">
          <el-input v-model="currentNum" type="text" disabled></el-input>
        </el-form-item>

        <el-form-item label="数量">
          <el-input v-model="form.Number" type="text"></el-input>
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

        <el-table-column property="MaterialNumber" label="物料编号">
          <template #header>
            <el-input
              size="mini"
              v-model="search"
              prefix-icon="el-icon-search"
              placeholder="输入物料编号"
              @change="searchs"
            />
          </template>
        </el-table-column>

        <el-table-column property="Number" label="数量"></el-table-column>

        <!-- <el-table-column label="关于" min-width="80">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>创建人: {{ scope.row.creater }}</p>
              <p>创建日期: {{ scope.row.creatdate }}</p>

              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">...</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column> -->
        <el-table-column label="操作" min-width="90" fixed="right">
          <template slot="header">
            <el-button
              type="success"
              icon="el-icon-document-add"
              plain
              circle
              size="mini"
              @click="handleAdd"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-sold-out"
              plain
              circle
              size="mini"
              @click="ressdd"
            ></el-button>
          </template>
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
              p
              @click="handleEdit(scope.row)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              plain
              circle
              size="mini"
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
    </div>
  </div>
</template>

<script>
// import { getTime } from "common/time/getTime";
export default {
  data() {
    return {
      operation: "", //当前操作切换
      pagenums: 0,
      form: {
        MaterialNumber: "", //物料编号
        Number: "", //数量
        // creater: "", //创建人
        // creatdate: "", //创建时间
      },
      total: 0,
      id: "",
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
      currentNum: "0",
    };
  },
  methods: {
    searchs() {
      console.log(this.search);
      let ccs = {};

      if (this.search == "" || this.search == null) {
        this.findByPageNum(); //找寻对应页面的数据
        return;
      }
      if (this.search != "" && this.search != null) {
        ccs = { MaterialNumber: this.search };
      }
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "YYB",
          where: ccs,
        },
      })
        .then((res) => {
          this.tableData = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //复制库存
    async ressdd() {
      this.$myloading({
        show: true,
      });
      this.$https({
        method: "post",
        url: "api/transaction/YYBREFTransaction",
        data: {},
      })
        .then((res) => {
          console.log(res);
          if (res.status) {
            this.newview();
            this.$myloading({
              show: false,
            });
          }
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
          table: "YYB",
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
      this.form.Number = ""; //数量
      this.dialogFormVisible = true;
      this.currentNum = "0";
    },
    //编辑事件
    handleEdit(row) {
      this.operation = "update";
      this.dialogFormVisible = true;
      this.id = row._id;
      this.$delete(row, "_id");
      this.form = row;
      this.currentNum = row.Number;
    },
    //删除事件
    async handleDelete(row) {
      this.id = row._id;
      await this.del();
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
      if (this.operation === "add") {
        ///////////
        let fdr = [];
        await this.$https({
          method: "get",
          url: "/api/apiModel/find",
          params: {
            table: "YYB",
            where: { MaterialNumber: this.form.MaterialNumber },
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
          alert("物料已经存在！");
          return;
        }
      }
      ////

      this.$myloading({
        show: true,
      });
      this.$https({
        method: "post",
        url: "api/transaction/yybTransaction",
        data: {
          form: this.form,
          currentNum: this.currentNum,
          operation: this.operation,
          ids: this.id,
        },
      })
        .then((res) => {
          if (res.status) {
            this.$myloading({
              show: false,
            });
            if (!res.data) {
              alert("修改库存失败！");
            }
            this.newview();
          }
        })
        .catch((err) => {
          console.log(err);
        });
      // let nums = parseInt(this.form.Number) - parseInt(this.currentNum); //记录当前的差额数，用于实际库存增减
      // ///库存管理增减
      // let flag = await this.findstorck(this.form.MaterialNumber, nums);
      // if (flag) {
      //   if (this.operation === "add") {
      //     this.add();
      //   } else {
      //     this.update();
      //   }
      // }

      ////
      this.dialogFormVisible = false;
    },
    async findstorck(MaterialNumber, num) {
      let temps = [];
      await this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "stock",
          where: { MaterialNumber: MaterialNumber },
        },
      })
        .then((res) => {
          console.log(res);
          temps = res;
        })
        .catch((err) => {
          console.log(err);
        });
      if (temps.length == 0) {
        return false;
      } else {
        let nu = parseInt(num) + parseInt(temps[0].Number);
        let synu = parseInt(num) + parseInt(temps[0].SYNumber);
        if (nu < 0 || synu < 0) {
          return false;
        } else {
          console.log(num);
          this.$https({
            method: "post",
            url: "/api/apiModel/update",
            data: {
              table: "stock",
              id: temps[0]._id,
              form: { Number: nu, SYNumber: synu },
            },
          })
            .then((res) => {
              console.log(res);
              return true;
            })
            .catch(function (err) {
              console.log(err);
            });
        }
      }
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
          table: "YYB",
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
    // 数据删除
    async del() {
      //   if (this.auth()) return;
      await this.$https({
        method: "post",
        url: "/api/apiModel/delete",
        data: {
          table: "YYB",
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
    //数据修改
    update() {
      this.$https({
        method: "post",
        url: "/api/apiModel/update",
        data: {
          table: "YYB",
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
    //根据page数查询对应数据
    findByPageNum() {
      console.log("数据查询。。" + this.pagenums);
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/findByPageNum",
        params: {
          table: "YYB",
          PageNum: this.pagenums,
          sortJson: { MaterialNumber: 1 },
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
