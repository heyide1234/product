<template>
  <div class="container">
    <el-steps :active="0" finish-status="success" simple style="margin: 5px">
      <el-step title="库存管理"></el-step>
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
        <el-form-item label="分类选择">
          <el-cascader
            style="width: 100%"
            v-model="classvalue"
            :options="newclassDate"
            :props="{ expandTrigger: 'hover' }"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>

        <el-form-item label="物料编号">
          <el-select
            v-model="form.MaterialNumber"
            style="width: 100%"
            @change="chag"
          >
            <el-option
              v-for="(item, index) in MaterialInfo"
              :key="index"
              :value="item.MaterialNumber"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数量">
          <el-input v-model="form.Number"></el-input>
        </el-form-item>
        <el-form-item label="物料名称">
          <el-input v-model="form.MaterialName" type="text" disabled></el-input>
        </el-form-item>
        <!-- <el-form-item label="缩略图">
          <el-input v-model="form.Thumbnail" type="text" disabled></el-input>
        </el-form-item> -->

        <el-form-item label="规格型号">
          <el-input v-model="form.MaterialSpec" disabled></el-input>
        </el-form-item>

        <el-form-item label="计划剩余数">
          <el-input v-model="form.SYNumber" type="text" disabled></el-input>
        </el-form-item>
        <el-form-item label="库位">
          <el-input v-model="form.Location" type="text" disabled></el-input>
        </el-form-item>
        <el-form-item label="计划剩余数">
          <el-input v-model="form.SYNumber" type="text" disabled></el-input>
        </el-form-item>

        <el-form-item label="用途">
          <el-input v-model="form.Purpose" type="text" disabled></el-input>
        </el-form-item>
        <el-form-item label="单位">
          <el-input v-model="form.Company" type="text" disabled></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-preventReClick @click="dialogFormVisible = false"
          >取 消</el-button
        >
        <el-button type="primary" v-preventReClick @click="add"
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
          property="MaterialNumber"
          label="物料编号"
        ></el-table-column>

        <el-table-column property="MaterialName" label="物料名称">
          <template slot-scope="scope">
            <span :title="scope.row.MaterialName">{{
              scope.row.MaterialName
            }}</span>
          </template>
        </el-table-column>

        <el-table-column property="Thumbnail" label="缩略图">
          <template slot-scope="scope">
            <img class="bigImg" :src="scope.row.Thumbnail" alt="" />
          </template>
        </el-table-column>

        <el-table-column
          property="MaterialSpec"
          label="规格型号"
        ></el-table-column>

        <el-table-column property="Number" label="数量"></el-table-column>

        <el-table-column
          property="SYNumber"
          label="计划剩余数"
        ></el-table-column>
        <el-table-column property="Company" label="单位"></el-table-column>

        <el-table-column property="Location" label="库位"></el-table-column>
        <el-table-column
          property="MaterialSource"
          label="材料来源"
        ></el-table-column>
        <el-table-column property="Purpose" label="用途"></el-table-column>

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
            <!-- <el-button
              type="success"
              icon="el-icon-document-add"
              plain
              circle
              size="mini"
              v-preventReClick  @click="handleAdd"
            ></el-button> -->
            <el-button
              type="danger"
              icon="el-icon-cpu"
              plain
              circle
              size="mini"
              title="同步物料基础信息"
              v-preventReClick
              @click="tb"
            ></el-button>
          </template>
          <!-- <template slot-scope="scope">
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              v-preventReClick  @click="handleDelete(scope.row)"
            ></el-button>
          </template> -->
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
import { getJL } from "business/MeterialClass";
export default {
  name: "stock",
  data() {
    return {
      operation: "", //当前操作切换
      pagenums: 0,
      form: {
        MaterialNumber: "", //物料编号
        MaterialName: "", //物料名称
        MaterialSpec: "", //规格型号
        Thumbnail: "", //缩略图
        Number: "", //数量
        Location: "", //库位
        MaterialSource: "", //材料来源
        SYNumber: "", //剩余数
        Company: "",
        Status: "0", //状态
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
        url: "api/transaction/RefreshKCTransaction",
        data: {},
      })
        .then((res) => {
          console.log(res);
          if (res.status) {
            this.newview();
            this.$myloading({
              show: false,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    chag() {
      let res = this.MaterialInfo.filter((item) => {
        return item.MaterialNumber == this.form.MaterialNumber;
      });
      // this.form.MaterialNumber=res[0].MaterialNumber; //物料编号
      this.form.MaterialName = res[0].MaterialName; //物料名称
      this.form.MaterialSpec = res[0].MaterialSpec; //规格型号
      this.form.Thumbnail = res[0].Thumbnail; //缩略图
      this.form.Number = res[0].Number; //数量
      this.form.Location = res[0].Location; //库位
      this.form.MaterialSource = res[0].MaterialSource; //材料来源
      // this.form.SYNumber=res[0].MaterialNumber; //剩余数
      this.form.Company = res[0].Company;
    },
    add() {
      this.dialogFormVisible = false;
      this.form.SYNumber = this.form.Number; //剩余数
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/apiModel/insert",
        data: {
          table: "stock",
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
          this.MaterialInfo = res;
          console.log(" this.MaterialInfo==", this.MaterialInfo);
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
          table: "stock",
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
      this.dialogFormVisible = true;

      this.form.MaterialNumber = ""; //物料编号
      this.form.MaterialName = ""; //物料名称
      this.form.MaterialSpec = ""; //规格型号
      this.form.Thumbnail = ""; //缩略图
      this.form.Number = ""; //数量
      this.form.Location = ""; //库位
      this.form.MaterialSource = ""; //材料来源
      this.form.SYNumber = ""; //剩余数
      this.form.Company = "";
      this.form.Status = "0"; //状态
      this.form.creater = ""; //创建人
      this.form.creatdate = ""; //创建时间
    },

    //删除事件
    handleDelete(row) {
      this.id = row._id;
      this.del();
    },
    //选择展示页数据
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenums = (val - 1) * 10;
      this.findByPageNum();
    },

    //刷新界面
    newview() {
      this.getpage(); //刷新分页
      this.findByPageNum(); //找寻对应页面的数据
    },

    /////crud
    // 数据添加

    // 数据删除
    del() {
      this.$https({
        method: "post",
        url: "/api/apiModel/delete",
        data: {
          table: "stock",
          id: this.id,
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
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/findByPageNum",
        params: {
          table: "stock",
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
  },
  created() {
    this.newview();
    this.getMaterialList();
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
        code += ',"label":"' + item.Class1Name + '"';
        code += ',"children": [';
        let classcode2 = [];
        v.filter((item1) => {
          if (classcode2.indexOf(item1.Class2Num) > -1) return;
          classcode2.push(item1.Class2Num);
          if (item1.Class1Num === it1) {
            let it2 = item1.Class2Num;
            code += '{"value":"' + item1.Class2Num + '"';
            code += ',"label":"' + item1.Class2Name + '"';
            code += ',"children": [';
            v.filter((item2) => {
              if (item2.Class1Num === it1 && item2.Class2Num === it2) {
                code += '{"value":"' + item2.Class3Num + '"';
                code += ',"label":"' + item2.Class3Name + '"';
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
