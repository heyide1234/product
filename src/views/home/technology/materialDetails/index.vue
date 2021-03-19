<template>
  <div class="container">
    <el-steps :active="0" finish-status="success" simple style="margin: 5px">
      <el-step title="材料明细表"></el-step>
      <el-step></el-step>

      <el-step></el-step>
    </el-steps>
    <div class="cc">
      <span>{{ parents }}</span>
      <el-button
        type="primary"
        icon="el-icon-search"
        size="small"
        @click="dialogFormVisible1 = true"
        >产品选择</el-button
      >
    </div>

    <el-dialog
      title="产品选择"
      :visible.sync="dialogFormVisible1"
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="form">
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
          label="产品编号"
          :rules="[{ required: true, message: '不能为空' }]"
        >
          <!-- <el-input v-model="form.MaterialNumber"></el-input> -->
          <el-select
            filterable
            v-model="parents"
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option
              v-for="(item, key) in MaterialInfo"
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
              <!-- <span
                style="
                  float: right;
                  color: #8492a6;
                  font-size: 13px;
                  margin-right: 20px;
                "
                >{{ item.Thumbnail }}</span
              > -->

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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit1">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :title="operation"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="form">
        <el-form-item label="分类选择">
          <el-cascader
            style="width: 100%"
            v-model="classvalue2"
            :options="newclassDate"
            :props="{ expandTrigger: 'hover' }"
            @change="handleChange1"
          ></el-cascader>
        </el-form-item>

        <el-form-item label="明细编号">
          <!-- <el-input v-model="form.MaterialNumber"></el-input> -->
          <el-select
            filterable
            v-model="form.MaterialNumber"
            placeholder="请选择"
            style="width: 100%"
            @change="findsMateria"
          >
            <el-option
              v-for="(item, key) in MaterialInfo"
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
                >{{ item.Enclosure }}</span
              >

              <span
                style="
                  float: right;
                  color: #8492a6;
                  font-size: 13px;
                  margin-right: 20px;
                "
                >{{ item.Remarks }}</span
              >
              <span
                style="
                  float: right;
                  color: #8492a6;
                  font-size: 13px;
                  margin-right: 20px;
                "
                >{{ item.MaterialTexture }}</span
              >
              <!-- <span
                style="
                  float: right;
                  color: #8492a6;
                  font-size: 13px;
                  margin-right: 20px;
                "
                >{{ item.Thumbnail }}</span
              > -->
              <span
                style="
                  float: right;
                  color: #8492a6;
                  font-size: 13px;
                  margin-right: 20px;
                "
                >{{ item.MaterialSpec }}</span
              >
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                item.MaterialName
              }}</span>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="数量">
          <el-input v-model="form.Number"></el-input>
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
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column
          property="MaterialNumber"
          label="物料编号"
        ></el-table-column>

        <el-table-column
          property="MaterialName"
          label="物料名称"
        ></el-table-column>

        <el-table-column property="Thumbnail" label="缩略图">
          <template slot-scope="scope">
            <img class="bigImg" :src="scope.row.Thumbnail" alt="" />
          </template>
        </el-table-column>

        <el-table-column
          property="MaterialSpec"
          label="规格型号"
        ></el-table-column>

        <el-table-column
          property="MaterialTexture"
          label="材质"
        ></el-table-column>

        <el-table-column property="Number" label="数量"></el-table-column>

        <el-table-column property="Company" label="单位"></el-table-column>
        <el-table-column property="Parent" label="产品编号"></el-table-column>
        <el-table-column property="Enclosure" label="附件"></el-table-column>
        <el-table-column property="Remarks" label="备注"></el-table-column>

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
            <el-button
              type="danger"
              icon="el-icon-cpu"
              plain
              circle
              size="mini"
              @click="tb"
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
import { getJL } from "business/MeterialClass";
export default {
  data() {
    return {
      operation: "", //当前操作切换
      pagenums: 0,
      parents: "",
      form: {
        MaterialNumber: "", //物料编号
        MaterialName: "", //物料名称
        Thumbnail: "", //缩略图
        MaterialSpec: "", //规格型号
        MaterialTexture: "", //材质
        Remarks: "", //备注
        Enclosure: "", //附件
        Number: "", //数量
        Company: "", //单位
        Parent: "", //父节点物料编号
        creater: "", //创建人
        creatdate: "", //创建时间
      },
      total: 0,
      id: {},
      name: "",
      search: "",
      dialogFormVisible: false,
      dialogFormVisible1: false,
      tableData: [],
      classDate: [],
      newclassDate: [],
      newclassDate1: "",
      classvalue1: [],
      classvalue2: [],
      temparr: [],
      tempcode: 0,
      MaterialInfo: [],
    };
  },
  methods: {
    tb() {
      this.$myloading({
        show: true,
      });
      this.$https({
        method: "post",
        url: "api/transaction/materialDetailsReflesh",
        data: {
          table: "__materialDetails",
        },
      })
        .then((res) => {
          console.log(res);
          if (res.status) {
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

          this.form.MaterialTexture = res[0].MaterialTexture;
          this.form.Remarks = res[0].Remarks;
          this.form.Enclosure = res[0].Enclosure;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleChange(value) {
      // this.parents = this.form.Parent;
      // this.form.Parent = "";
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
            Approval: "已审批",
            prescription: { $gte: getTime() },
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
    handleChange1(value) {
      // this.form.Class1Num = value[0];
      // this.form.Class2Num = value[1];
      // this.form.Class3Num = value[2];
      // this.parents = this.form.Parent;
      // this.form.Parent = "";
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
            Approval: "已审批",
            prescription: { $gte: getTime() },
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

    //获取页面数
    getpage() {
      this.$https({
        method: "get",
        url: "/api/apiModel/getpage",
        params: {
          table: "__materialDetails",
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
      this.operation = "新增";
      this.form.MaterialNumber = ""; //物料编号
      this.form.MaterialName = ""; //物料名称
      this.form.Thumbnail = ""; //缩略图
      this.form.MaterialSpec = ""; //规格型号
      this.form.Number = ""; //数量

      this.form.Location = ""; //库位
      this.form.MaterialSource = ""; //材料来源
      this.dialogFormVisible = true;
    },
    //编辑事件
    handleEdit(row) {
      this.operation = "修改";
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
      // this.getpage(); //刷新分页()
      this.tableData = [];
      this.total = 1;
      //this.findByPageNum(); //找寻对应页面的数据
      this.find();
    },

    //提交按钮
    async onSubmit() {
      this.dialogFormVisible = false;
      this.classvalue2 = [];
      this.form.creater = sessionStorage.getItem("loginName");
      this.form.creatdate = getTime();
      this.form.Parent = this.parents;
      if (this.form.Parent == "" || this.form.Parent == null) {
        alert("产品未选择！");
        return;
      }
      if (this.form.Parent == this.form.MaterialNumber) {
        alert("产品不能和从属物料相同！");
        return;
      }
      if (this.operation === "新增") {
        this.add();
      } else {
        this.update();
      }
    },
    //选择产品编号
    async onSubmit1() {
      this.dialogFormVisible1 = false;
      this.classvalue1 = [];
      console.log("你选择的产品编号是11：" + this.parents);
      this.find();
    },

    find() {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__materialDetails",
          dataBase: "base",
          where: {
            Parent: this.parents,
          },
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
    /////crud
    // 数据添加
    async add() {
      await this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/apiModel/insert",
        data: {
          table: "__materialDetails",
          dataBase: "base",
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
      this.find();
    },
    // 数据删除
    async del() {
      // if (this.auth()) return;
      await this.$https({
        method: "post",
        url: "/api/apiModel/delete",
        data: {
          table: "__materialDetails",
          dataBase: "base",
          id: this.id.id,
        },
      })
        .then((res) => {
          console.log(res);
          this.newview();
        })
        .catch(function (err) {
          console.log(err);
        });
      this.find();
    },
    //数据修改
    async update() {
      // if (this.auth()) return;
      await this.$https({
        method: "post",
        url: "/api/apiModel/update",
        data: {
          table: "__materialDetails",
          dataBase: "base",
          id: this.id.id,
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
      this.find();
    },
    //根据page数查询对应数据
    findByPageNum() {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/findByPageNum",
        params: {
          table: "__materialDetails",
          dataBase: "base",
          PageNum: this.pagenums,
          sortJson: { _id: -1 },
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
    //this.newview(); this.total = 1;
    //this.total = this.getpage();
    this.total = 1;
    //this.findByPageNum();
    this.getMaterialList(); //级联
  },
  filters: {
    //过滤数据进行级联
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
  /* max-height: 470px; */
  max-height: 600px;
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
.cc {
  display: flex;
  justify-content: space-between;
  padding: 0px 40px;
  margin: 5px 20px;
  font-size: 15px;
  color: blue;
}
.el-input {
  margin: 0;
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
