<template>
  <div class="container">
    <el-steps :active="0" finish-status="success" simple style="margin: 5px">
      <el-step title="供应商管理表"></el-step>
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
        <el-form-item label="供应商编号">
          <el-input v-model.trim="form.supplierNumber"></el-input>
        </el-form-item>
        <el-form-item label="供应商名称">
          <el-input v-model.trim="form.supplierName"></el-input>
        </el-form-item>
        <el-form-item label="行业类别">
          <el-input v-model.trim="form.Class"></el-input>
        </el-form-item>
        <el-form-item label="供应商备注">
          <el-input v-model.trim="form.supplierRemarks"></el-input>
        </el-form-item>
        <el-form-item label="纳税人识别号">
          <el-input v-model.trim="form.TIN"></el-input>
        </el-form-item>
        <el-form-item label="开户行">
          <el-input v-model.trim="form.Bank"></el-input>
        </el-form-item>
        <el-form-item label="账户">
          <el-input v-model.trim="form.Account"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model.trim="form.Address"></el-input>
        </el-form-item>
        <el-form-item label="公司电话">
          <el-input v-model.trim="form.CompanyPhone"></el-input>
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
        :data="
          tableData.filter(
            (data) =>
              !search ||
              data.supplierName.toLowerCase().includes(search.toLowerCase())
          )
        "
      >
        <el-table-column type="selection" width="50"></el-table-column>

        <el-table-column property="supplierNumber" label="供应商编号">
        </el-table-column>
        <el-table-column property="supplierName" label="供应商名称"
          ><template #header>
            <el-input
              size="mini"
              v-model="search"
              prefix-icon="el-icon-search"
              placeholder="供应商名称"
            /> </template
        ></el-table-column>
        <el-table-column property="Class" label="行业类别"></el-table-column>
        <el-table-column
          property="supplierRemarks"
          label="供应商备注"
        ></el-table-column>
        <el-table-column property="TIN" label="纳税人识别号"></el-table-column>
        <el-table-column property="Bank" label="开户行"></el-table-column>
        <el-table-column property="Account" label="账户"></el-table-column>
        <el-table-column property="Address" label="地址"></el-table-column>
        <el-table-column
          property="CompanyPhone"
          label="公司电话"
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
  data() {
    return {
      operation: "", //当前操作切换
      pagenums: 0,
      form: {
        supplierNumber: "", //供应商编号
        supplierName: "", //供应商名称
        Class: "", //行业类别
        supplierRemarks: "", //供应商备注
        TIN: "", //纳税人识别号(Taxpayer identification number)
        Bank: "", //开户行
        Account: "", //账户
        Address: "", //地址
        CompanyPhone: "", //公司电话
        creater: "", //创建人
        creatdate: "", //创建时间
      },
      total: 0,
      id: "",
      name: "",
      search: "",
      dialogFormVisible: false,
      tableData: [],
      csd1: [],
      csd2: [],
    };
  },
  methods: {
    //获取页面数
    getpage() {
      this.$https({
        method: "get",
        url: "/api/apiModel/getpage",
        params: {
          table: "__supplierManager",
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
      this.id = row._id;
      this.name = row.creater;
      this.$delete(row, "_id");
      this.form = row;
    },
    //删除事件
    handleDelete(row) {
      this.id = row._id;
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
          this.id = val[i]._id;
          this.del();
        }
        this.newview();
      }
    },
    //刷新界面
    newview() {
      /// this.getpage(); //刷新分页
      this.findByPageNums(); //找寻对应页面的数据
      //this.findB();
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
        alert("已存在！");
        return;
      }
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/apiModel/insert",
        data: {
          table: "__supplierManager",
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
          table: "__supplierManager",
          dataBase: "base",
          id: this.id,
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
          table: "__supplierManager",
          dataBase: "base",
          id: this.id,
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
          table: "__supplierManager",
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
    findByPageNums() {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__supplierManager",
          dataBase: "base",
          where: {},
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
          table: "__supplierManager",
          dataBase: "base",
          where: { supplierNumber: this.form.supplierNumber },
        },
      })
        .then((res) => {
          console.log(res);
          if (res.length > 0) {
            vds = 1;
          }
        })
        .catch((err) => {
          console.log(err);
        });
      return vds;
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
</style>
