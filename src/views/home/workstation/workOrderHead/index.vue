<template>
  <div class="container">
    <el-steps :active="0" finish-status="success" simple style="margin: 5px">
      <el-step title="清单头"></el-step>
      <el-step title="制程"></el-step>
      <el-step title="配料"></el-step>
      <el-step title="领料"></el-step>
      <el-step title="检验"></el-step>
    </el-steps>
    <el-dialog
      title="表单"
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisible"
    >
      <el-form ref="form" :model="form">
        <el-form-item label="产品编码">
          <el-select
            v-model="form.MaterialNumber"
            placeholder="请选择"
            style="width: 100%"
            @change="findMaterial"
          >
            <el-option
              v-for="(item, key) in MaterialInfo"
              :key="key"
              :value="item"
            >
              <span style="float: left">{{ item }}</span>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="制造SN">
          <el-input v-model="form.ManufactureSN"></el-input>
        </el-form-item>
        <el-form-item label="说明">
          <el-input type="textarea" v-model="form.Remark"></el-input>
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
        :data="
          tableData.filter(
            (data) =>
              !search ||
              data.SerialNumber.toLowerCase().includes(search.toLowerCase())
          )
        "
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column label="序列号" min-width="150">
          <template slot="header">
            <el-input
              size="mini"
              v-model="search"
              prefix-icon="el-icon-search"
              placeholder="输入序列号"
            />
          </template>
          <template slot-scope="scope">
            <i class="el-icon-paperclip"></i>
            <span style="margin-left: 10px">{{ scope.row.SerialNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column
          property="MaterialName"
          label="产品名称"
        ></el-table-column>
        <el-table-column
          property="SpecModel"
          label="规格型号"
        ></el-table-column>
        <el-table-column
          property="MaterialNumber"
          label="产品编码"
        ></el-table-column>
        <el-table-column
          property="ManufactureSN"
          label="制作SN"
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
            <el-button
              type="danger"
              icon="el-icon-delete-solid"
              plain
              circle
              size="mini"
              v-preventReClick
              @click="yc"
            ></el-button>
          </template>
          <template slot-scope="scope">
            <!-- <el-button size="mini" v-preventReClick  @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
              p
              v-preventReClick
              @click="handleEdit(scope.row)"
            ></el-button>
            <!-- <el-button 
            size="mini" 
            type="danger" 
            v-preventReClick  @click="handleDelete(scope.$index, scope.row)"
            >删除
            </el-button>-->
            <el-button
              type="danger"
              icon="el-icon-delete"
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
import { getTime } from "common/time/getTime";
export default {
  data() {
    return {
      operation: "", //当前操作切换
      pagenums: 0,
      form: {
        SerialNumber: "", //序列号
        MaterialName: "", //产品名称
        SpecModel: "", //规格型号
        MaterialNumber: "", //产品编号
        ManufactureSN: "", //制作SN
        Remark: "", //说明
        creater: "", //创建人
        creatdate: "", //创建时间
      },
      total: 0,
      id: {},
      name: "",
      search: "",
      dialogFormVisible: false,
      tableData: [],
      MaterialInfo: [], //根据材料明细表算出
      materialdata: [],
    };
  },
  methods: {
    //获取页面数
    getpage() {
      this.$https({
        method: "get",
        url: "/api/workOrderHead/getpage",
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
    findMaterial() {
      this.$https({
        method: "get",
        // url: "/api/workOrderHead/delete",

        url: "/api/apiModel/find",
        params: {
          table: "__basicMaterialList",
          dataBase: "base",
          where: { MaterialNumber: this.form.MaterialNumber },
        },
      })
        .then((res) => {
          console.log(res);
          this.materialdata = res;
          this.form.MaterialName = res[0].MaterialName;
          this.form.SpecModel = res[0].MaterialSpec;
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
      this.getpage(); //刷新分页
      this.findByPageNum(); //找寻对应页面的数据
    },
    //提交按钮
    onSubmit() {
      this.dialogFormVisible = false;
      this.form.SerialNumber =
        this.form.MaterialNumber + "-" + this.form.ManufactureSN;
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
    // 数据添加
    add(v) {
      //  if (this.auth()) return;
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/workOrderHead/insert",
        data: v,
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
        // url: "/api/workOrderHead/delete",

        url: "/api/apiModel/delete",
        data: {
          table: "workOrderHead",
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
    //根据page数查询对应数据
    findByPageNum() {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/findByPageNum",
        params: {
          table: "workOrderHead",
          PageNum: this.pagenums,
          sortJson: { _id: 1 },
        },
      })
        .then((res) => {
          console.log("....", res);
          this.tableData = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //材料明细表查询
    findclmx() {
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__materialDetails",
          dataBase: "base",
          where: {},
        },
      })
        .then((res) => {
          let codes = [];
          res.filter((item) => {
            if (codes.length === 0) codes.push(item.Parent);
            if (codes.length > 0) {
              if (codes.indexOf(item.Parent) === -1) {
                codes.push(item.Parent);
              }
            }
          });
          this.MaterialInfo = codes;
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
    this.newview();
    this.findclmx(); //算出下拉框?
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
.el-steps {
  /* box-shadow: rgba(0, 0, 0, 0.01) 0px 1px 1px, rgba(0, 0, 0, 0.08) 0px 10px 30px; */
}
</style>
