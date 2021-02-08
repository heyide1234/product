<template>
  <div class="container">
    <el-steps :active="0" finish-status="success" simple style="margin: 5px">
      <el-step title="供应商列表"></el-step>
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
        <el-form-item label="联系人">
          <el-select
            v-model="form.Contacts"
            placeholder="请选择"
            style="width: 100%"
            @change="supplierNumberChange"
          >
            <el-option
              v-for="(item, key) in MaterialInfo"
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
              v-for="(item, key) in MaterialInfo2"
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
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <div class="tabels">
      <el-table
        class="table"
        height="280"
        :data="tableData1"
        highlight-current-row
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
        <el-step
          :title="'材料明细[' + supplierNumber + '\t' + supplierName + ']'"
        ></el-step>
      </el-steps>

      <el-table
        ref="tableselectData"
        class="table"
        height="580"
        :data="tableData"
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
            <el-button
              type="danger"
              icon="el-icon-delete-solid"
              plain
              circle
              size="mini"
              @click="yc"
            ></el-button>
            <el-button
              slot="reference"
              type="primary"
              icon="el-icon-sort"
              circle
              plain
              size="mini"
              @click="sorts"
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
            <el-popover
              placement="left"
              width="300"
              trigger="click"
              :ref="`popover-${scope.$index}`"
            >
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="序列号">
                  <el-input v-model="seq"></el-input>
                </el-form-item>
              </el-form>
              <el-button
                style="float: right"
                type="primary"
                @click="sort(scope)"
                >确定</el-button
              >
              <el-button
                style="float: right; margin: 0 10px"
                @click="scope._self.$refs[`popover-${scope.$index}`].doClose()"
                >取消</el-button
              >

              <el-button
                slot="reference"
                type="primary"
                icon="el-icon-sort"
                style="margin-left: 10px"
                circle
                size="mini"
              ></el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getTime } from "common/time/getTime";
import { getJL } from "business/MeterialClass";
export default {
  data() {
    return {
      seq: "0",
      MaterialInfo: [],
      MaterialInfo2: [],
      classvalue1: [],
      pagenums: 0,
      OrderNumbers: "",
      supplierNumber: "",
      supplierName: "",
      dialogFormVisible: false,
      newclassDate: [],
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

      total: 0,
      tableData: [],
      tableData1: [],
      datas: [],
      datas1: [],
      temoData1: [],
      states: false,
    };
  },
  methods: {
    async sorts() {
      await this.$https({
        method: "post",
        url: "/api/apiModel/deleteByWhere",
        data: {
          table: "__supplierMaterial",
          where: { supplierNumber: this.supplierNumber },
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
      for (let i = 0; i < this.tableData.length; i++) {
        let t = i + 1;
        this.form.supplierNumber = this.tableData[i].supplierNumber;
        this.form.supplierName = this.tableData[i].supplierName;
        this.form.Contacts = this.tableData[i].Contacts;
        this.form.ContactsPhone = this.tableData[i].ContactsPhone;
        this.form.MaterialNumber = this.tableData[i].MaterialNumber;
        this.form.MaterialName = this.tableData[i].MaterialName;
        this.form.MaterialSpec = this.tableData[i].MaterialSpec;
        this.form.Thumbnail = this.tableData[i].Thumbnail;
        this.form.Company = this.tableData[i].Company;
        this.form.Remarks = this.tableData[i].Remarks;
        this.form.creater = this.tableData[i].creater;
        this.form.creatdate = this.tableData[i].creatdate;
        this.form.Grade = t + "";

        await this.add();
      }
      this.findByPageNum();
    },

    sort(scope) {
      console.log(this.tableData);
      this.tableData.splice(
        this.seq - 1,
        0,
        this.tableData.splice(scope.$index, 1)[0]
      );
      scope._self.$refs[`popover-${scope.$index}`].doClose();
      console.log(this.tableData);
    },
    supplierNumberChange() {
      // console.log("change2...");
      let cds2 = this.MaterialInfo.filter((item) => {
        return item.Contacts == this.form.Contacts;
      });
      this.form.ContactsPhone = cds2[0].ContactsPhone;
    },

    async findOrderds(OrderNumber) {
      let temps = [];
      await this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "MaterialDemand",
          where: { OrderNumber: OrderNumber },
        },
      })
        .then((res) => {
          console.log(res);
          temps = res;
        })
        .catch(function (err) {
          console.log(err);
        });
      return temps;
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
          this.MaterialInfo2 = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    MaterialNumberChange() {
      console.log("change...");
      let material = this.MaterialInfo2.filter((item) => {
        return item.MaterialNumber == this.form.MaterialNumber;
      });

      this.form.MaterialName = material[0].MaterialName;
      this.form.MaterialSpec = material[0].MaterialSpec;
      this.form.Thumbnail = material[0].Thumbnail;
      this.form.Company = material[0].Company;
    },
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
    // async ts() {
    //   let cdsd=await this.findOrderds(this.OrderNumbers);
    //   if(cdsd.length>0)return;
    //   this.updatesalesOrderDetail(this.OrderNumbers);//修改订单明细的状态为2
    //   for (let i = 0; i < this.tableData1.length; i++) {
    //     this.$delete(this.tableData1[i], "_id");
    //     this.$https({
    //       //这里是你自己的请求方式、url和data参数
    //       method: "post",
    //       url: "/api/apiModel/insert",
    //       data: {
    //         table: "MaterialDemand",
    //         form: this.tableData1[i]
    //       }
    //     })
    //       .then(function(res) {
    //         console.log(res);
    //       })
    //       .catch(function(err) {
    //         console.log(err);
    //       });
    //   }
    //   this.tableData1 = [];
    // },
    //获取页面数
    getpage() {
      this.$https({
        method: "get",
        url: "/api/apiModel/getpage",
        params: {
          table: "salesOrderDetail",
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

    //刷新界面
    newview() {
      // this.getpage(); //刷新分页
      this.findByPageNums(); //找寻对应页面的数据
    },

    updatesalesOrderDetail(OrderNumbers) {
      this.$https({
        method: "post",
        url: "/api/apiModel/updateByWhere",
        data: {
          table: "salesOrderDetail",
          where: { OrderNumber: OrderNumbers },
          form: { status: "2" },
        },
      })
        .then(function (res) {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    hb() {
      this.disticts();
    },
    async zk(row) {
      this.supplierNumber = row.supplierNumber;
      this.supplierName = row.supplierName;

      this.finddContacts();
      this.findByPageNum();
    },
    //联系人信息
    finddContacts() {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__supplierContacts",
          dataBase: "base",
          where: { supplierNumber: this.supplierNumber },
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
    findOrderNumber(OrderNumber) {
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "MaterialDemand",
          where: { OrderNumber: OrderNumber },
          sortJson: { _id: -1 },
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /////////////////////////////////////////////////////////////////////////////
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
        this.findByPageNum();
      }
    },

    //提交按钮
    async onSubmit() {
      this.dialogFormVisible = false;

      this.form.creater = sessionStorage.getItem("loginName");
      this.form.creatdate = getTime();
      if (this.operation === "add") {
        this.form.supplierNumber = this.supplierNumber;
        this.form.supplierName = this.supplierName;
        this.form.Grade = "999";
        await this.add();
      } else {
        this.update();
      }
      this.findByPageNum();
    },
    /////crud
    // 数据添加
    async add() {
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
    // 数据删除
    del() {
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
      this.findByPageNum();
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
    findByPageNum() {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__supplierMaterial",
          where: { supplierNumber: this.supplierNumber },
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
    // //根据page数查询对应数据
    // findByPageNum() {
    //   this.$https({
    //     //这里是你自己的请求方式、url和data参数
    //     method: "get",
    //     url: "/api/apiModel/findByPageNum",
    //     params: {
    //       table: "__supplierMaterial",
    //       PageNum: this.pagenums,
    //       sortJson: { _id: 1 }
    //     }
    //   })
    //     .then(res => {
    //       console.log("当前数据", res);
    //       this.tableData = res;
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
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
          this.tableData1 = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.newview();
    this.getMaterialList();
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
.dse {
  margin-right: 10px;
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
