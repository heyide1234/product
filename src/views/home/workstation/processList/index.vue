<template>
  <div class="container">
    <el-steps :active="1" finish-status="success" simple style="margin: 5px">
      <el-step title="清单头"></el-step>
      <el-step title="制程"></el-step>
      <el-step title="配料"></el-step>
      <el-step title="领料"></el-step>
      <el-step title="检验"></el-step>
    </el-steps>
    <el-dialog
      title="表单"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <el-form>
        <el-form-item label="序列号">
          <el-input v-model="form.SerialNumber" disabled></el-input>
        </el-form-item>
        <el-form-item label="工序名称">
          <el-input v-model="form.ProcessName"></el-input>
        </el-form-item>

        <el-form-item label="物料编号">
          <el-select
            v-model="form.MaterialNumber"
            placeholder="请选择"
            style="width: 100%"
            @change="getdatas"
          >
            <el-option
              v-for="(item, key) in optionsq"
              :key="key"
              :value="item.MaterialNumber"
            ></el-option>
          </el-select>
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
        <el-table-column
          type="selection"
          width="50"
          :selectable="selectable"
        ></el-table-column>
        <el-table-column label="序列号" min-width="100">
          <template #header>
            <el-select
              v-model="form.SerialNumber"
              filterable
              placeholder="选择序列号"
              size="mini"
              @change="getdata"
            >
              <el-option
                v-for="(item, key) in options"
                :key="key"
                :value="item.SerialNumber"
              ></el-option>
            </el-select>
          </template>
          <template slot-scope="scope">
            <i class="el-icon-paperclip"></i>
            <span style="margin-left: 10px">{{ scope.row.SerialNumber }}</span>
          </template>
        </el-table-column>

        <el-table-column
          property="ProcessName"
          label="工序名称"
        ></el-table-column>
        <el-table-column
          property="MaterialName"
          label="物料名称"
        ></el-table-column>
        <el-table-column property="MaterialNumber" label="物料编号">
        </el-table-column>
        <el-table-column
          property="MaterialSpec"
          label="物料规格"
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
        <el-table-column label="操作" min-width="90">
          <template slot="header">
            <el-button
              type="success"
              icon="el-icon-document-add"
              plain
              size="mini"
              @click="lld"
              >生成领料单</el-button
            >
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
              :disabled="scope.row.status != '0'"
              @click="handleEdit(scope.row)"
            ></el-button>
            <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              :disabled="scope.row.status != '0'"
              @click="handleDelete(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div class="df">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="10"
          layout=" prev, pager, next"
          :total="total"
        ></el-pagination>
      </div>-->
    </div>
  </div>
</template>

<script>
import { getTime } from "common/time/getTime";
export default {
  data() {
    return {
      options: [],

      operation: "", //当前操作切换
      optionsq: [],
      pagenum: 0,
      form: {
        Company: "",
        Thumbnail: "",
        SerialNumber: "", //序列号
        ProcessName: "-", //工序名称
        MaterialName: "-", //物料名称
        MaterialNumber: "-", //物料编号
        MaterialSpec: "-", //物料规格
        Number: "0", //数量
        Numberfirm: "0", //到货数量
        status: "0",
        Remark: "-",
        creater: "-", //创建人
        creater1: "-", //库料人
        creater2: "-", //领料人
        creater3: "-", //加工人
        creatdate: "-", //创建时间
      },
      td: {
        SerialNumber: "-", //序列号
        ProcessName: "-", //工序名称
        MaterialName: "-", //物料名称
        MaterialNumber: "-", //物料编号
        MaterialSpec: "-", //物料规格
        Number: "0", //数量
        Numberfirm: "0", //到货数量
        status: "0",
        Remark: "-",
        creater: "-", //创建人
        creater1: "-", //库料人
        creater2: "-", //领料人
        creater3: "-", //加工人
        creatdate: "-", //创建时间
      },
      total: 0,
      id: {},
      name: "",
      search: "",
      dialogFormVisible: false,
      tableData: [],
    };
  },
  methods: {
    selectable(row) {
      return row.status === "0"; // isHidden 0-否 1-是 返回false不可选
    },
    //获取页面数
    // getpage() {
    //   this.$https({
    //     method: "get",
    //     url: "/api/workOrderHead/getpage",
    //   })
    //     .then((res) => {
    //       console.log(res);
    //       this.total = res;
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    //动态获取数据
    getdata() {
      this.find();
      this.findMaterial(); //找寻物料基础信息。
    },
    getdatas() {
      console.log("下拉框？？");
      this.form.MaterialName = "";
      this.form.MaterialSpec = "";
      this.form.Number = "";
      let items = this.optionsq.filter((item) => {
        if (item.MaterialNumber === this.form.MaterialNumber) {
          return item;
        }
      });

      this.form.MaterialName = items[0].MaterialName;
      this.form.MaterialSpec = items[0].MaterialSpec;
      this.form.Number = items[0].Number;
      this.form.status = "0";
      this.form.Company = items[0].Company;
      this.form.Thumbnail = items[0].Thumbnail;
    },
    findMaterial() {
      let cod = this.form.SerialNumber.substring(
        0,
        this.form.SerialNumber.indexOf("-")
      );
      console.log(cod);
      this.findMaterials(cod);
    },
    findMaterials(co) {
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__materialDetails",
          dataBase: "base",
          where: { Parent: co },
        },
      })
        .then((res) => {
          console.log(res);
          this.optionsq = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleAdd() {
      this.operation = "add";
      this.form = { SerialNumber: this.form.SerialNumber };
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
    // handleCurrentChange(val) {
    //   console.log(`当前页: ${val}`);
    //   this.pagenum = (val - 1) * 10;
    //   this.findByPageNum(this.pagenum);
    // },
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
      // this.getpage(); //刷新分页
      // this.findByPageNum(this.pagenum); //找寻对应页面的数据
      this.find();
    },
    //提交按钮
    onSubmit() {
      this.dialogFormVisible = false;
      this.form.creater = sessionStorage.getItem("loginName");
      this.form.creatdate = getTime();
      if (this.operation === "add") {
        this.add();
      } else {
        let updform = { table: "processList", form: this.form, id: this.id.id };
        this.update(updform);
      }
      this.newview();
      this.find();
    },
    /////crud
    // 数据添加
    add() {
      console.log("form...", this.form);
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/apiModel/insert",
        data: {
          table: "processList",
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
      console.log(this.id.id);
      this.$https({
        method: "post",
        url: "/api/apiModel/delete",
        data: {
          table: "processList",
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
    update(v) {
      if (this.auth()) return;
      this.$https({
        method: "post",
        url: "/api/apiModel/update",
        data: v,
      })
        .then(function (res) {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    lld() {
      this.$https({
        method: "post",
        url: "/api/apiModel/updateByWhere",
        data: {
          table: "processList",
          where: { SerialNumber: this.form.SerialNumber, status: "0" },
          form: { status: "1" },
        },
      })
        .then(function (res) {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });

      //修改当前状态为1
    },
    //查询
    find() {
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "processList",
          where: {
            creater: sessionStorage.getItem("loginName"),
            SerialNumber: this.form.SerialNumber,
          },
        },
      })
        .then((res) => {
          this.tableData = res;
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //权限
    auth(code) {
      // console.log(sessionStorage.getItem("loginName"), this.name);
      // if (sessionStorage.getItem("loginName") == null) {
      //   this.$message("请先登陆");
      //   this.$router.push({ path: "/login" });
      //   return true;
      // }
      // if (code === 0) return;
      // if (this.name === sessionStorage.getItem("loginName")) {
      //   return false;
      // } else {
      //   this.$message("权限不足");
      //   return true;
      // }
      console.log(code);
      return false;
    },
    //获取序列号
    getSerialNumber() {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: { table: "workOrderHead", where: {} },
      })
        .then((res) => {
          console.log(res);
          this.options = res;
          // this.tableData = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    // this.newview();
    this.getSerialNumber();
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
