<template>
  <div class="container">
    <el-steps :active="0" finish-status="success" simple style="margin: 5px">
      <el-step title="供应商物料表"></el-step>
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
          <el-select
            v-model="form.supplierNumber"
            placeholder="请选择"
            style="width: 100%"
            @change="supplierNumberChange"
          >
            <el-option
              v-for="(item, key) in MaterialInfo"
              :key="key"
              :value="item.supplierNumber"
            >
              <span style="float: left">{{ item.supplierNumber }}</span>
              <span
                style="
                  float: right;
                  color: #8492a6;
                  font-size: 13px;
                  margin-right: 20px;
                "
                >{{ item.supplierName }}</span
              >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="供应商名称">
          <el-input v-model.trim="form.supplierName" disabled></el-input>
        </el-form-item>

        <el-form-item label="联系人">
          <el-select
            v-model="form.Contacts"
            placeholder="请选择"
            style="width: 100%"
            @change="supplierNumberChange2"
          >
            <el-option
              v-for="(item, key) in MaterialInfo2"
              :key="key"
              :value="item.Contacts"
            >
              <span style="float: left">{{ item.Contacts }}</span>
              <span
                style="
                  float: right;
                  color: #8492a6;
                  font-size: 13px;
                  margin-right: 20px;
                "
                >{{ item.ContactsPhone }}</span
              >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系人电话">
          <el-input v-model.trim="form.ContactsPhone" disabled></el-input>
        </el-form-item>

        <el-form-item
          label="分类选择"
          :rules="[{ required: true, message: '不能为空' }]"
        >
          <el-cascader
            style="width: 100%"
            v-model="classvalue1"
            :options="newclassDate"
            :props="{ expandTrigger: 'hover' }"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>

        <el-form-item
          label="物料编号"
          :rules="[{ required: true, message: '不能为空' }]"
        >
          <!-- <el-input v-model="form.MaterialNumber"></el-input> -->
          <el-select
            v-model="form.MaterialNumber"
            placeholder="请选择"
            style="width: 100%"
            @change="MaterialNumberChange"
          >
            <el-option
              v-for="(item, key) in MaterialInfo3"
              :key="key"
              :value="item.MaterialNumber"
            >
              <span style="float: left">{{ item.MaterialNumber }}</span>

              <span
                style="
                  float: right;
                  color: #8492a6;
                  font-size: 13px;
                  margin-right: 20px;
                "
                >{{ item.Company }}</span
              >
              <span
                style="
                  float: right;
                  color: #8492a6;
                  font-size: 13px;
                  margin-right: 20px;
                "
                >{{ item.Thumbnail }}</span
              >
              <span
                style="
                  float: right;
                  color: #8492a6;
                  font-size: 13px;
                  margin-right: 20px;
                "
                >{{ item.MaterialSpec }}</span
              >
              <span
                style="
                  float: right;
                  color: #8492a6;
                  font-size: 13px;
                  margin-right: 20px;
                "
                >{{ item.MaterialName }}</span
              >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model.trim="form.Remarks"></el-input>
        </el-form-item>
        <el-form-item label="物料名称">
          <el-input v-model.trim="form.MaterialName" disabled></el-input>
        </el-form-item>
        <el-form-item label="规格型号">
          <el-input v-model.trim="form.MaterialSpec" disabled></el-input>
        </el-form-item>
        <el-form-item label="缩略图">
          <el-input v-model.trim="form.Thumbnail" disabled></el-input>
        </el-form-item>

        <el-form-item label="单位">
          <el-input v-model.trim="form.Company" disabled></el-input>
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
        height="580"
        :data="tableData"
      >
        <el-table-column type="selection" width="50"></el-table-column>

        <el-table-column
          property="supplierNumber"
          label="供应商编号"
        ></el-table-column>
        <el-table-column
          property="supplierName"
          label="供应商名称"
        ></el-table-column>

        <el-table-column property="Contacts" label="联系人"></el-table-column>
        <el-table-column
          property="ContactsPhone"
          label="联系电话"
        ></el-table-column>
        <el-table-column
          property="MaterialNumber"
          label="物料编码"
        ></el-table-column>
        <el-table-column
          property="MaterialName"
          label="物料名称"
        ></el-table-column>
        <el-table-column
          property="MaterialSpec"
          label="规格型号"
        ></el-table-column>
        <el-table-column property="Thumbnail" label="缩略图"></el-table-column>

        <el-table-column property="Company" label="单位"></el-table-column>

        <el-table-column label="关于" min-width="80">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>创建人: {{ scope.row.creater }}</p>
              <p>创建日期: {{ scope.row.creatdate }}</p>
              <p>备注: {{ scope.row.Remarks }}</p>

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
              v-preventReClick
              @click="handleEdit(scope.row)"
            ></el-button>
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
import { getJL } from "common/MeterialClass";
export default {
  data() {
    return {
      newclassDate: [],
      MaterialInfo3: [],
      MaterialInfo2: [],
      MaterialInfo: [],
      classvalue1: [],
      operation: "", //当前操作切换
      pagenums: 0,
      form: {
        //supplierMaterial//表名
        supplierNumber: "", //供应商编号
        supplierName: "", //供应商名称
        Contacts: "", //联系人
        ContactsPhone: "", //联系人电话
        MaterialNumber: "", //物料编码
        MaterialName: "", //物料名称
        MaterialSpec: "", //规格型号
        Thumbnail: "", //缩略图
        Company: "", //单位
        Remarks: "", //备注
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
    MaterialNumberChange() {
      console.log("change...");
      let material = this.MaterialInfo3.filter((item) => {
        return item.MaterialNumber == this.form.MaterialNumber;
      });

      this.form.MaterialName = material[0].MaterialName;
      this.form.MaterialSpec = material[0].MaterialSpec;
      this.form.Thumbnail = material[0].Thumbnail;
      this.form.Company = material[0].Company;
    },
    handleChange(value) {
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
          this.MaterialInfo3 = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //级联
    getMaterialList() {
      this.$https({
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
          console.log(res);
          this.classDate = res;
          this.newclassDate = getJL(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    supplierNumberChange2() {
      // console.log("change2...");
      let cds2 = this.MaterialInfo2.filter((item) => {
        return item.Contacts == this.form.Contacts;
      });
      this.form.ContactsPhone = cds2[0].ContactsPhone;
    },
    supplierNumberChange() {
      console.log("change...");
      let cds = this.MaterialInfo.filter((item) => {
        return item.supplierNumber == this.form.supplierNumber;
      });
      this.form.supplierName = cds[0].supplierName;
      this.finddContacts();
    },
    //通过供应商查询联系人信息
    finddContacts() {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__supplierContacts",
          dataBase: "base",
          where: { supplierNumber: this.form.supplierNumber },
        },
      })
        .then((res) => {
          console.log(res);
          this.MaterialInfo2 = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //查询供应商信息
    finddSupplier() {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__supplierManager",
          dataBase: "base",
          where: {},
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
    //获取页面数
    getpage() {
      this.$https({
        method: "get",
        url: "/api/apiModel/getpage",
        params: {
          table: "__supplierMaterial",
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
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/apiModel/insert",
        data: {
          table: "__supplierMaterial",
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
          table: "__supplierMaterial",
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
          table: "__supplierMaterial",
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
          table: "__supplierMaterial",
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
          table: "__supplierMaterial",
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
    this.finddSupplier();
    this.getMaterialList(); //级联
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
