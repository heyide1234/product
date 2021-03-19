<template>
  <div class="container">
    <el-steps :active="0" finish-status="success" simple style="margin: 5px">
      <el-step title="物料基础资料"></el-step>
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
        <el-form-item label="物料编号">
          <br />
          <div class="dsr">
            <el-input
              v-model="startcode"
              :disabled="disa"
              class="dsrs"
              type="text"
            ></el-input>
            <el-input
              v-model="lastcode"
              class="dsrs"
              @change="codeschage"
              type="text"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="分类选择">
          <el-cascader
            :disabled="operation === 'update' ? true : false"
            style="width: 100%"
            v-model="classvalue"
            :options="newclassDate"
            :props="{ expandTrigger: 'hover' }"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>

        <el-form-item label="物料名称" @change="specchage">
          <el-input
            v-model="form.MaterialName"
            :disabled="operation === 'update' ? true : false"
            type="text"
          ></el-input>
        </el-form-item>
        <span>缩略图 &nbsp;</span>
        <!-- <el-input v-model="form.Thumbnail" type="text"></el-input> -->
        <input
          type="file"
          id="img_upload_file"
          @change="filechange"
          placeholder="ddd"
        />

        <img id="img_upload_show" :src="form.Thumbnail" />

        <el-form-item label="规格型号">
          <el-input
            v-model="form.MaterialSpec"
            @change="specchage"
            :disabled="operation === 'update' ? true : false"
          ></el-input>
        </el-form-item>
        <el-form-item label="材质">
          <el-input v-model="form.MaterialTexture" type="text"></el-input>
        </el-form-item>
        <el-form-item label="单位">
          <el-select v-model="form.Company" style="width: 100%">
            <el-option
              v-for="(item, key) in units"
              :key="key"
              :value="item.unitName"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.Remarks" type="text"></el-input>
        </el-form-item>
        <el-form-item label="附件">
          <el-input v-model="form.Enclosure" type="text"></el-input>
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

        <el-table-column property="MaterialNumber" label="物料编号">
          <template #header>
            <el-input
              size="mini"
              v-model="search"
              prefix-icon="el-icon-search"
              placeholder="输入物料编号"
            />
          </template>
        </el-table-column>

        <!-- <el-table-column
          property="Class1Num"
          label="一级分类编号"
        ></el-table-column>
       
        <el-table-column
          property="Class2Num"
          label="二级分类编号"
        ></el-table-column>
    
        <el-table-column
          property="Class3Num"
          label="三级分类编号"
        ></el-table-column> -->

        <el-table-column property="MaterialName" label="物料名称">
          <template #header>
            <div id="s1" @click="des1()">
              <el-button plain icon="el-icon-search" class="wh1"
                >物料名称</el-button
              >
            </div>
            <el-input
              size="mini"
              v-model="MaterialNamew"
              ref="ss"
              style="display: none"
              prefix-icon="el-icon-search"
              placeholder="输入物料编号"
              @change="changew1"
            />
          </template>
        </el-table-column>

        <el-table-column property="Thumbnail" label="缩略图">
          <template slot-scope="scope">
            <img class="bigImg" :src="scope.row.Thumbnail" alt="" />
          </template>
        </el-table-column>

        <el-table-column property="MaterialSpec" label="规格型号">
          <template #header>
            <div id="s11" @click="des2()">
              <el-button plain icon="el-icon-search" class="wh1"
                >规格型号</el-button
              >
            </div>

            <el-input
              size="mini"
              v-model="MaterialSpecg"
              ref="ss1"
              style="display: none"
              prefix-icon="el-icon-search"
              placeholder="输入规格型号"
              @change="changew2"
            />
          </template>
        </el-table-column>

        <el-table-column
          property="MaterialTexture"
          label="材质"
        ></el-table-column>
        <el-table-column property="Company" label="单位"></el-table-column>

        <el-table-column property="Remarks" label="备注"></el-table-column>

        <el-table-column property="Approval" label="审批状态"></el-table-column>
        <el-table-column property="Approver" label="审批人"></el-table-column>
        <el-table-column property="prescription" label="时效"></el-table-column>

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
//import {delay} from "common/debounce/Utils";
import { delay } from "common/utils/index";
import { getJL } from "business/MeterialClass";
export default {
  data() {
    return {
      disa: true,
      operation: "", //当前操作切换
      pagenums: 0,
      startcode: "",
      lastcode: "",
      MaterialSpecg: "",
      MaterialNamew: "",
      units: [],
      form: {
        MaterialNumber: "", //物料编号
        Class1Num: "", //一级分类编号
        //Class1NName: "", //一级分类名称
        Class2Num: "", //二级分类编号
        //Class2NName: "", //二级分类名称
        Class3Num: "", //三级分类编号
        //Class3Name: "", //三级分类名称
        MaterialName: "", //物料名称
        Thumbnail: "", //缩略图
        MaterialSpec: "", //规格型号
        MaterialTexture: "", //材质
        Company: "", //单位
        Remarks: "", //备注
        Approval: "未审批", //审批状态
        Approver: "", //"审批人
        prescription: "", ////时效
        creater: "", //创建人
        creatdate: "", //创建时间
      },
      total: 0,
      id: {},
      name: "",
      search: "",
      dialogFormVisible: false,
      tableData: [],
      classDate: [],
      newclassDate: [],
      classvalue: [],
      temparr: [],
      tempcode: 0,
    };
  },
  methods: {
    getunits() {
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__unit",
          dataBase: "base",
          where: {},
        },
      })
        .then((res) => {
          console.log("res===", res);
          this.units = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    filechange() {
      var file = document.getElementById("img_upload_file").files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file); //调用自带方法进行转换
      var that = this;
      reader.onload = async function () {
        that.form.Thumbnail = this.result;
      };
    },
    specchage() {
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__basicMaterialList",
          dataBase: "base",
          where: {
            MaterialSpec: this.form.MaterialSpec,
            MaterialName: this.form.MaterialName,
          },
        },
      })
        .then((res) => {
          if (res.length > 0) {
            this.$myalert({
              content: "物料名称和规格型号重复！",
              closed: true,
              // type:"success"
            });
            this.$nextTick(() => {
              this.form.MaterialSpec = "";
              this.form.MaterialName = "";
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    codeschage() {
      let dvs = this.lastcode + "";
      if (dvs.length != 4) {
        this.$myalert({
          content: "物料编码流水号长度必须为4！",
          closed: true,
          // type:"success"
        });
        this.$nextTick(() => {
          this.lastcode = "";
        });
      }
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__basicMaterialList",
          dataBase: "base",
          where: { MaterialNumber: this.startcode + this.lastcode },
        },
      })
        .then((res) => {
          if (res.length > 0) {
            this.$myalert({
              content: "物料编码重复！",
              closed: true,
              // type:"success"
            });
            this.$nextTick(() => {
              this.lastcode = "";
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async handleChange(value) {
      this.form.Class1Num = value[0];
      this.form.Class2Num = value[1];
      this.form.Class3Num = value[2];
      if (this.form.Class1Num == "6") {
        this.disa = false;
      } else {
        this.disa = true;
      }
      this.startcode =
        this.form.Class1Num + this.form.Class2Num + this.form.Class3Num;
      await this.querycurrendt(); //计算出当前的最后一项物料编号值
      // console.log("res000========", this.tempcode + 1);
      let temsd = this.tempcode + 1 + "";
      this.lastcode = temsd.substring(6);
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
          console.log(getJL(res));
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
    serchsdog() {
      console.log("---->", this.MaterialSpecg);
      let cos = this.MaterialSpecg;
      let cdss = { MaterialSpec: { $regex: cos + "" } };
      if (this.MaterialSpecg == "") {
        this.findByPageNum();
        return;
      }
      this.$https({
        method: "get",
        url: "api/apiModel/find",
        params: {
          table: "__basicMaterialList",
          dataBase: "base",
          where: cdss,
        },
      })
        .then((res) => {
          console.log(res);
          this.tableData = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    serchsdow() {
      console.log("---->", this.MaterialNamew);
      let cos = this.MaterialNamew;
      let cdss = { MaterialName: { $regex: cos + "" } };
      if (this.MaterialNamew == "") {
        this.findByPageNum();
        return;
      }
      this.$https({
        method: "get",
        url: "api/apiModel/find",
        params: {
          table: "__basicMaterialList",
          dataBase: "base",
          where: cdss,
        },
      })
        .then((res) => {
          console.log(res);
          this.tableData = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    serchsdo() {
      console.log("---->", this.search);
      let cos = this.search;
      let cdss = { MaterialNumber: { $regex: cos + "" } };
      if (this.search == "") {
        this.findByPageNum();
        return;
      }
      this.$https({
        method: "get",
        url: "api/apiModel/find",
        params: {
          table: "__basicMaterialList",
          dataBase: "base",
          where: cdss,
        },
      })
        .then((res) => {
          console.log(res);
          this.tableData = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //添加事件
    handleAdd() {
      this.operation = "add";

      this.dialogFormVisible = true;

      this.form.MaterialNumber = ""; //物料编号
      this.form.MaterialName = ""; //物料名称
      this.form.Thumbnail = ""; //缩略图
      this.form.MaterialSpec = ""; //规格型号
      this.form.MaterialTexture = ""; //材质
      this.form.Company = ""; //单位
      this.form.Remarks = ""; //备注
      this.form.Enclosure = ""; //附件
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
    //获取当前有的编码
    async querycurrendt() {
      await this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__basicMaterialList",
          dataBase: "base",
          where: {
            Class1Num: this.form.Class1Num,
            Class2Num: this.form.Class2Num,
            Class3Num: this.form.Class3Num,
          },
        },
      })
        .then((res) => {
          if (res.length === 0) {
            this.tempcode = parseInt(
              this.form.Class1Num +
                this.form.Class2Num +
                this.form.Class3Num +
                "0000"
            );
          } else {
            this.tempcode = parseInt(res[0].MaterialNumber);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //提交按钮
    async onSubmit() {
      this.dialogFormVisible = false;
      // this.form.MaterialNumber =
      //   this.form.Class1Num + this.form.Class2Num + this.form.Class3Num;

      this.form.creater = sessionStorage.getItem("loginName");
      this.form.creatdate = getTime();
      if (this.operation === "add") {
        this.form.MaterialNumber = this.startcode + this.lastcode;

        this.add();
      } else {
        this.update();
      }
      this.newview();
    },
    /////crud
    // 数据添加
    add() {
      this.form.MaterialNumber += "";
      this.form.Approval = "未审批";
      this.form.Approver == "";
      this.form.prescription = "";
      //  if (this.auth()) return;
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/apiModel/insert",
        data: {
          table: "__basicMaterialList",
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
          table: "__basicMaterialList",
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
      this.form.Approval = "未审批";
      this.$https({
        method: "post",
        url: "/api/apiModel/update",
        data: {
          table: "__basicMaterialList",
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
          table: "__basicMaterialList",
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
    changew1() {
      document.getElementById("s1").style.display = "block";
      this.$refs.ss.$el.style.display = "none";
    },
    changew2() {
      document.getElementById("s11").style.display = "block";
      this.$refs.ss1.$el.style.display = "none";
    },

    des1() {
      document.getElementById("s1").style.display = "none";
      this.$refs.ss.$el.style.display = "block";
    },
    des2() {
      document.getElementById("s11").style.display = "none";
      this.$refs.ss1.$el.style.display = "block";
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
  watch: {
    search: function (v) {
      if (v) {
        delay(() => {
          this.serchsdo();
        }, 2000);
      }
    },
    MaterialNamew: function (v) {
      if (v) {
        delay(() => {
          this.serchsdow();
        }, 2000);
      }
    },
    MaterialSpecg: function (v) {
      if (v) {
        delay(() => {
          this.serchsdog();
        }, 2000);
      }
    },
  },
  created() {
    this.newview();
    this.getMaterialList();
    this.getunits();
  },
  filters: {
    //过滤数据进行级联
    filterJL(v) {
      let code = "[";
      let classcode1 = [];
      v.filter((item) => {
        if (classcode1.indexOf(item.Class1Num) > -1) return;
        classcode1.push(item.Class1Num);
        let it1 = item.Class1Num;
        code += "{";
        code += '"value":"' + item.Class1Num + '"';
        code += ',"label":"' + item.Class1Num + "_" + item.Class1Name + '"';
        code += ',"children": [';
        let classcode2 = [];
        v.filter((item1) => {
          if (classcode2.indexOf(item1.Class2Num) > -1) return;
          classcode2.push(item1.Class2Num);
          if (item1.Class1Num === it1) {
            let it2 = item1.Class2Num;
            code += '{"value":"' + item1.Class2Num + '"';
            code +=
              ',"label":"' + item1.Class2Num + "_" + item1.Class2Name + '"';
            code += ',"children": [';
            v.filter((item2) => {
              if (item2.Class1Num === it1 && item2.Class2Num === it2) {
                code += '{"value":"' + item2.Class3Num + '"';
                code +=
                  ',"label":"' + item2.Class3Num + "_" + item2.Class3Name + '"';
                code += "},";
              }
            });
            code += "]";
            code += "},";
          }
        });
        code += "]";
        code += "},";
      });
      code += "]";
      code = code.replace(/},]/g, "}]");
      code = code.replace(/},}/g, "}}");
      // this.newclassDate = JSON.parse(code);
      return JSON.parse(code);
    },
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
  max-height: 700px; /*  470px */
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
.dsr {
  display: flex;
  justify-content: space-between;
}
.dsrs {
  width: 49%;
}
.desa {
  max-width: 10px;
}
.wh1 {
  border: none;
  font-weight: 700;
  color: #979b9f;
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
