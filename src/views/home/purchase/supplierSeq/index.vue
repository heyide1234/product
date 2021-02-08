<template>
  <div class="container">
    <el-steps :active="0" finish-status="success" simple style="margin: 5px">
      <el-step title="基础物料信息"></el-step>
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
            filterable
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
            @change="supplierNumberChange1"
          >
            <el-option
              v-for="(item, key) in MaterialInfo1"
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
        height="300"
        :data="tableData"
        highlight-current-row
      >
        <el-table-column type="selection" width="50"></el-table-column>

        <el-table-column property="MaterialNumber" label="物料编号">
        </el-table-column>
        <el-table-column property="MaterialName" label="物料名称">
        </el-table-column>

        <el-table-column property="Thumbnail" label="缩略图">
          <template slot-scope="scope">
            <img class="bigImg" :src="scope.row.Thumbnail" alt="" />
          </template>
        </el-table-column>

        <el-table-column property="MaterialSpec" label="规格型号">
        </el-table-column>

        <el-table-column
          property="MaterialTexture"
          label="材质"
        ></el-table-column>
        <el-table-column property="Company" label="单位"></el-table-column>

        <el-table-column property="Remarks" label="备注"></el-table-column>

        <el-table-column property="Enclosure" label="附件"></el-table-column>

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
          <template slot-scope="scope">
            <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->

            <el-button
              type="primary"
              icon="el-icon-reading"
              circle
              size="mini"
              plain
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
      <el-steps
        :active="0"
        finish-status="success"
        simple
        style="margin: 40px 5px 5px 5px"
      >
        <el-step title="物料供应商"></el-step>&nbsp;&nbsp;&nbsp;<font>{{
          MaterialNumbers
        }}</font>
      </el-steps>
      <div class="animation"></div>

      <el-table
        ref="tableselectData"
        class="table"
        height="500"
        :data="tableData1"
      >
        <el-table-column type="selection" width="50"></el-table-column>

        <el-table-column
          property="Grade"
          width="50"
          label="序号"
        ></el-table-column>

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
        <el-table-column property="Thumbnail" label="缩略图">
          <template slot-scope="scope">
            <img class="bigImg" :src="scope.row.Thumbnail" alt="" />
          </template>
        </el-table-column>

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
              @click="handleAdd"
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
      dialogFormVisible: false,
      MaterialInfo: [],
      MaterialInfo1: [],
      MaterialNumbers: "",
      id: "",
      total: 0,
      tableData: [],
      tableData1: [],
      options: [],
      pyid: "",
      rows: {},
      form: {
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
        Grade: "999", //级别
        creater: "", //创建人
        creatdate: "", //创建时间
      },
    };
  },
  methods: {
    //选择展示页数据
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenums = (val - 1) * 10;
      this.find();
    },
    //刷新界面
    newview() {
      this.getpage();
      this.find(); //找寻对应页面的数据
    },
    //根据page数查询对应数据
    find() {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/findByPageNum",
        params: {
          table: "__basicMaterialList",
          dataBase: "base",
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

    zk(row) {
      this.rows = row;
      this.MaterialNumbers = row.MaterialNumber;
      this.tableData1 = [];
      this.finddetail();
    },
    finddetail() {
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__supplierMaterial",
          where: { MaterialNumber: this.MaterialNumbers },
        },
      })
        .then((res) => {
          console.log(res);
          this.tableData1 = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //////////////////////////////////////////////////////////////////

    supplierNumberChange() {
      let cd = this.MaterialInfo.filter((item) => {
        return item.supplierNumber == this.form.supplierNumber;
      });
      this.form.supplierName = cd[0].supplierName;
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__supplierContacts",
          dataBase: "base",
          where: { supplierNumber: this.form.supplierNumber },
        },
      })
        .then((res) => {
          console.log("联系人：", res);
          this.MaterialInfo1 = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    supplierNumberChange1() {
      let cd = this.MaterialInfo1.filter((item) => {
        return item.Contacts == this.form.Contacts;
      });
      console.log("cd", cd);
      this.form.ContactsPhone = cd[0].ContactsPhone;
    },

    getSupplierNumber() {
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__supplierManager",
          dataBase: "base",
          where: {},
        },
      })
        .then((res) => {
          console.log("供应商：", res);
          this.MaterialInfo = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleAdd() {
      this.form = {};
      this.dialogFormVisible = true;
    },
    //提交按钮
    async onSubmit() {
      this.dialogFormVisible = false;

      this.form.creater = sessionStorage.getItem("loginName");
      this.form.creatdate = getTime();

      await this.add();

      this.finddetail();
    },
    async add() {
      this.form.MaterialNumber = this.rows.MaterialNumber; //物料编码
      this.form.MaterialName = this.rows.MaterialName; //物料名称
      this.form.MaterialSpec = this.rows.MaterialSpec; //规格型号
      this.form.Thumbnail = this.rows.Thumbnail; //缩略图
      this.form.Company = this.rows.Company; //单位
      this.form.Remarks = this.rows.Remarks; //备注
      (this.form.Grade = "999"), //级别
        await this.$https({
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
    //获取页面数
    getpage() {
      this.$https({
        method: "get",
        url: "/api/apiModel/getpage",
        params: {
          table: "__basicMaterialList",
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

    //////////////////////////////////////////////////////////////////
  },
  created() {
    this.newview();
    this.getSupplierNumber();
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
.table1 {
  width: 98%;
  margin: 0 auto;
}
.yc {
  margin: 4px;
}
.container {
  width: 100%;
  margin: 0;
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
font {
  color: rgb(77, 150, 3);
  font-weight: bold;
  animation: ss 5s infinite;
}
@keyframes ss {
  from {
    color: rgb(205, 226, 12);
  }
  to {
    color: rgb(247, 4, 4);
  }
}

.loading {
  height: 100px;
  width: 100px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateY(-200%) translateX(-50%);
  background-color: rgb(43, 44, 43);
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.7);
  text-align: center;
  line-height: 50px;
  font-weight: bold;
  color: #ffffff;
  animation: xz 2s infinite;
}
.loadbg {
  height: 100%;
  width: 100%;
  position: fixed;
  /* background-color: rgba(0, 0, 0, 0.3); */
  z-index: 999;
}
.loading .imgdiv {
  height: 50px;
  width: 50px;
  margin: 30px auto;
  opacity: 0.4;
}
.loading .imgdiv img {
  transform: rotateZ(90deg) translateX(100px);
}
.bigImg {
  height: 20px;
  width: 20px;
}
.bigImg:hover {
  height: 280px;
  width: 280px;
  background-color: teal;
  position: absolute;
  z-index: 9999;
  border: 3px solid rgb(45, 228, 8);
}
</style>
