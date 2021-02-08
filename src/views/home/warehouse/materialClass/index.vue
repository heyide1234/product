<template>
  <div class="container">
    <el-steps :active="0" finish-status="success" simple style="margin: 5px">
      <el-step title="物料分类表"></el-step>
      <a @click="reloads" class="reload">刷新</a>
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
        <el-form-item label="一级分类编号">
          <el-select
            v-model.trim="form.Class1Num"
            placeholder="请选择"
            style="width: 100%"
            @change="findsName"
            filterable
            allow-create
            default-first-option
          >
            <el-option v-for="(item, key) in csd1" :key="key" :value="item">
              <span style="float: left">{{ item }}</span>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="一级分类名称">
          <el-input v-model.trim="form.Class1Name"></el-input>
        </el-form-item>
        <el-form-item label="二级分类编号">
          <el-select
            v-model.trim="form.Class2Num"
            placeholder="请选择"
            style="width: 100%"
            @change="findsName1"
            filterable
            allow-create
            default-first-option
          >
            <el-option v-for="(item, key) in csd2" :key="key" :value="item">
              <span style="float: left">{{ item }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类名称">
          <el-input v-model.trim="form.Class2Name"></el-input>
        </el-form-item>
        <el-form-item label="三级分类编号">
          <el-input v-model.trim="form.Class3Num"></el-input>
        </el-form-item>
        <el-form-item label="三级分类名称">
          <el-input v-model.trim="form.Class3Name"></el-input>
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
        height="580"
        :data="tableData"
      >
        <el-table-column type="selection" width="50"></el-table-column>

        <el-table-column
          property="Class1Num"
          sortable
          label="一级分类编号"
        ></el-table-column>
        <el-table-column
          property="Class1Name"
          label="一级分类名称"
        ></el-table-column>
        <el-table-column
          property="Class2Num"
          sortable
          label="二级分类编号"
        ></el-table-column>
        <el-table-column
          property="Class2Name"
          label="二级分类名称"
        ></el-table-column>
        <el-table-column
          property="Class3Num"
          sortable
          label="三级分类编号"
        ></el-table-column>
        <el-table-column
          property="Class3Name"
          label="三级分类名称"
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
              @click="handleAdd"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete-solid"
              plain
              circle
              size="mini"
              @click="yc"
            ></el-button>
          </template>
          <template slot-scope="scope">
            <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
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
              circle
              size="mini"
              @click="handleDelete(scope.row)"
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
    </div>
  </div>
</template>

<script>
import { getTime } from "common/time/getTime";
export default {
  inject: ["reload"],
  data() {
    return {
      operation: "", //当前操作切换
      pagenums: 0,
      form: {
        Class1Num: "", //一级分类编号
        Class1Name: "", //一级分类名称
        Class2Num: "", //二级分类编号
        Class2Name: "", //二级分类名称
        Class3Num: "", //三级分类编号
        Class3Name: "", //三级分类名称
        creater: "", //创建人
        creatdate: "", //创建时间
      },
      total: 0,
      id: {},
      name: "",
      search: "",
      dialogFormVisible: false,
      tableData: [],
      csd1: [],
      csd2: [],
    };
  },
  methods: {
    reloads() {
      this.reload();
    },
    //获取页面数
    getpage() {
      this.$https({
        method: "get",
        url: "/api/apiModel/getpage",
        params: {
          table: "__materialClass",
          dataBase: "base",
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
      //this.getpage(); //刷新分页
      //this.findByPageNum(); //找寻对应页面的数据
      this.findB();
    },
    //提交按钮
    async onSubmit() {
      this.dialogFormVisible = false;

      this.form.creater = sessionStorage.getItem("loginName");
      this.form.creatdate = getTime();
      if (this.operation === "add") {
        await this.add();
      } else {
        this.update();
      }
      this.newview();
    },
    /////crud
    // 数据添加
    async add() {
      //  if (this.auth()) return;
      if ((await this.findBht()) === 1) {
        alert("该分类已存在！");
        return;
      }
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/apiModel/insert",
        data: {
          table: "__materialClass",
          dataBase: "base",
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
          table: "__materialClass",
          dataBase: "base",
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
          table: "__materialClass",
          dataBase: "base",
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
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/findByPageNum",
        params: {
          table: "__materialClass",
          dataBase: "base",
          PageNum: this.pagenums,
          sortJson: { _id: 1 },
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
    async findBht() {
      let vds = 0;
      await this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__materialClass",
          dataBase: "base",
          where: {
            Class1Num: this.form.Class1Num,
            Class2Num: this.form.Class2Num,
            Class3Num: this.form.Class3Num,
          },
        },
      })
        .then((res) => {
          console.log(res);
          if (res.length > 0) {
            console.log("res1===1");
            vds = 1;
          }
        })
        .catch((err) => {
          console.log(err);
        });
      return vds;
    },
    //根据page数查询对应数据
    findB() {
      this.$https({
        //这里是你自己的请求方式、url和data参数
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
          console.log("当前数据", res);
          this.tableData = res;
          let csqw = JSON.parse(JSON.stringify(this.tableData));
          this.csd1 = [];
          csqw.filter((item) => {
            if (this.csd1.indexOf(item.Class1Num) === -1) {
              this.csd1.push(item.Class1Num);
            }
          });
          console.log(this.csd1);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    findsName() {
      this.csd2 = [];
      this.tableData.filter((item) => {
        if (item.Class1Num === this.form.Class1Num) {
          this.form.Class1Name = item.Class1Name;
          if (this.csd2.indexOf(item.Class2Num) === -1) {
            this.csd2.push(item.Class2Num);
          }
        }
      });
      console.log(this.csd2);
    },
    findsName1() {
      this.csd2 = [];
      this.tableData.filter((item) => {
        if (
          item.Class1Num === this.form.Class1Num &&
          item.Class2Num === this.form.Class2Num
        ) {
          this.form.Class2Name = item.Class2Name;
        }
      });
      console.log(this.csd2);
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
  max-height: 600px;
  /* max-height: 470px; */
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
.reload {
  font-size: 11px;
}
</style>
