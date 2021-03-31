<template>
  <div class="container">
    <el-steps :active="0" finish-status="success" simple style="margin: 5px">
      <el-step title="内部需求用途维护表"></el-step>
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
        <el-form-item label="单位名称">
          <el-input v-model="form.orderPurposeName" type="text"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark" type="text"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-preventReClick @click="dialogFormVisible = false"
          >取 消</el-button
        >
        <el-button type="primary" v-preventReClick @click="onSubmit"
          >确 定</el-button
        >
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

        <el-table-column
          property="orderPurposeName"
          label="单位名称"
        ></el-table-column>

        <el-table-column property="remark" label="备注"></el-table-column>

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
              v-preventReClick
              @click="handleAdd"
            ></el-button>
          </template>
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
              p
              v-preventReClick
              @click="handleEdit(scope.row)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              plain
              circle
              size="mini"
              v-preventReClick
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
        orderPurposeName: "", //单位名称
        remark: "", //备注
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
    };
  },
  methods: {
    //获取页面数
    getpage() {
      this.$https({
        method: "get",
        url: "/api/apiModel/getpage",
        params: {
          table: "__orderPurpose",
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
      this.form.unitName = ""; //物料编号
      this.form.remark = ""; //数量
      this.dialogFormVisible = true;
    },
    //编辑事件
    handleEdit(row) {
      this.operation = "update";
      this.dialogFormVisible = true;
      this.id = row._id;
      this.$delete(row, "_id");
      this.form = row;
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
            table: "__orderPurpose",
            where: { unitName: this.form.orderPurposeName },
            dataBase: "base",
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
          alert("已经存在！");
          return;
        }
        ////////////

        this.add();
      } else {
        this.update();
      }

      this.dialogFormVisible = false;
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
          table: "__orderPurpose",
          form: this.form,
          dataBase: "base",
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
          table: "__orderPurpose",
          id: this.id,
          dataBase: "base",
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
          table: "__orderPurpose",
          id: this.id,
          form: this.form,
          dataBase: "base",
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
          table: "__orderPurpose",
          PageNum: this.pagenums,
          sortJson: { orderPurposeName: 1 },
          dataBase: "base",
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
