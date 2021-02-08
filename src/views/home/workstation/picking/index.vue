<template>
  <div class="container">
    <el-steps :active="2" finish-status="success" simple style="margin: 5px">
      <el-step title="清单头"></el-step>
      <el-step title="制程"></el-step>
      <el-step title="配料"></el-step>
      <el-step title="领料"></el-step>
      <el-step title="检验"></el-step>
    </el-steps>
    <el-dialog
      title="条件筛选"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="序列号">
          <el-select
            placeholder="请选择序列号"
            filterable
            v-model="form.SerialNumber"
            @change="vchange"
          >
            <el-option
              :value="item.SerialNumber"
              v-for="(item, key) of options"
              :key="key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工序名称">
          <el-select placeholder="请选择工序名称" v-model="form.ProcessName">
            <el-option
              :value="item.ProcessName"
              v-for="(item, key) of ProcessNameList"
              :key="key"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisiblefirm"
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
        <el-table-column label="序列号" min-width="100">
          <template #header>
            <el-select
              v-model="form.SerialNumber"
              filterable
              placeholder="选择序列号"
              size="mini"
              @change="getdata"
              disabled
            >
              <el-option
                v-for="(item, key) in options"
                value="item.SerialNumber"
                :key="key"
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
        <el-table-column
          property="MaterialNumber"
          label="物料编号"
        ></el-table-column>
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
              <p>发料人: {{ scope.row.creater1 }}</p>
              <p>说明: {{ scope.row.Remark }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">...</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column label="领料确认" min-width="150" fixed="right">
          <template slot-scope="scope">
            <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->

            <el-button
              type="success"
              icon="el-icon-document-add"
              plain
              size="mini"
              @click="sc(scope.row)"
              >领料</el-button
            >
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
      options: [{}],
      SerialNumberList: [],
      ProcessNameList: [],
      operation: "", //当前操作切换
      pagenum: 0,
      form: {
        SerialNumber: "", //序列号
        ProcessName: "", //工序名称
        MaterialName: "", //物料名称
        MaterialNumber: "", //物料编号
        MaterialSpec: "", //物料规格
        Number: "0", //数量
        Numberfirm: "0", //到货数量
        status: "0",
        Remark: "",
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
      dialogFormVisible: true,
      tableData: [],
    };
  },
  methods: {
    // getserinumber() {
    //        this.$https({
    //       //这里是你自己的请求方式、url和data参数
    //       method: "get",
    //       url: "/api/workOrderHead/getSerialNumber"
    //     })
    //       .then((res) => {
    //         this.SerialNumberList = res;
    //        // this.tableData = res;
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //   },
    vchange(v) {
      console.log("change", v, this.form.SerialNumber);
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "processList",
          where: { SerialNumber: this.form.SerialNumber, status: "2" },
        },
      })
        .then((res) => {
          this.ProcessNameList = res;
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    dialogFormVisiblefirm() {
      this.dialogFormVisible = false;
      console.log(this.form.SerialNumber, this.form.ProcessName);
      this.find();
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
    },
    handleAdd() {
      this.operation = "add";
      this.form = { SerialNumber: this.form.SerialNumber };
      this.dialogFormVisible = true;
    },
    sc(row) {
      console.log(row);
      this.lld(row._id);
      this.find();
    },
    //编辑事件
    handleEdit(row) {
      console.log(row);
      // this.operation = "update";
      // this.dialogFormVisible = true;
      // this.id = { id: row._id };
      // this.name = row.creater;
      // this.$delete(row, "_id");
      // this.form = row;
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
        let updform = { forms: this.form, id: this.id };
        this.update(updform);
      }
      this.newview();
      this.find();
    },
    /////crud
    // 数据添加
    add() {
      this.td.SerialNumber =
        typeof this.form.SerialNumber == "undefined"
          ? ""
          : this.form.SerialNumber;
      this.td.ProcessName =
        typeof this.form.ProcessName == "undefined"
          ? ""
          : this.form.ProcessName;
      this.td.MaterialName =
        typeof this.form.MaterialName == "undefined"
          ? ""
          : this.form.MaterialName;
      this.td.MaterialNumber =
        typeof this.form.MaterialNumber == "undefined"
          ? ""
          : this.form.MaterialNumber;
      this.td.MaterialSpec =
        typeof this.form.MaterialSpec == "undefined"
          ? ""
          : this.form.MaterialSpec;
      this.td.Number =
        typeof this.form.Number == "undefined" ? "" : this.form.Number;
      this.td.status =
        typeof this.form.status == "undefined" ? "0" : this.form.status;
      this.td.Remark =
        typeof this.form.Remark == "undefined" ? "" : this.form.Remark;
      this.td.creater =
        typeof this.form.creater == "undefined" ? "" : this.form.creater;
      this.td.creatdate =
        typeof this.form.creatdate == "undefined" ? "" : this.form.creatdate;

      if (this.auth(0)) return;
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/processList/insert",
        data: this.td,
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
        url: "/api/processList/delete",
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
        url: "/api/processList/update",
        data: v,
      })
        .then(function (res) {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    lld(id) {
      this.$https({
        method: "post",
        url: "/api/apiModel/update",
        data: {
          table: "processList",
          id: id,
          form: { status: "3", creater2: sessionStorage.getItem("loginName") },
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
            status: "2",
            SerialNumber: this.form.SerialNumber,
            ProcessName: this.form.ProcessName,
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
      if (sessionStorage.getItem("loginName") == null) {
        this.$message("请先登陆");
        this.$router.push({ path: "/login" });
        return true;
      }
      if (code === 0) return;
      if (this.name === sessionStorage.getItem("loginName")) {
        return false;
      } else {
        this.$message("权限不足");
        return true;
      }
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
.cs {
  width: 50px;
}
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
