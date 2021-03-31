<template>
  <div>
    <el-dialog title="表单" :visible.sync="dialog">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="角色名称">
          <el-col :span="11">
            <el-input v-model.trim="form.RoleName" :disabled="ds"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <el-transfer
        v-model="value"
        :data="data"
        @change="des"
        class="transfer-class"
      ></el-transfer>
    </el-dialog>

    <el-table
      ref="tableselectData"
      class="table"
      height="500"
      :data="tableData"
    >
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column
        property="RoleName"
        label="角色名"
        width="250"
      ></el-table-column>
      <el-table-column property="Role_Auth" label="角色权限">
        <template slot-scope="scope">
          <div
            v-for="(item, key) in scope.row.Role_Auth.split(',')"
            :key="key"
            class="desd"
          >
            <el-tag
              type="success"
              style="float: left"
              v-if="item.charAt(item.length - 1) === 'r'"
              >{{ item }}</el-tag
            >
            <el-tag
              type="warning"
              style="float: left"
              v-if="item.charAt(item.length - 1) === 'w'"
              >{{ item }}</el-tag
            >
          </div>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="90" fixed="right">
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
          <!-- <el-button size="mini" v-preventReClick  @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
          <el-button
            :disabled="scope.row.status === '0' ? true : false"
            type="primary"
            icon="el-icon-edit"
            circle
            size="mini"
            v-preventReClick
            @click="handleEdit(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getTime } from "common/time/getTime";
export default {
  data() {
    return {
      data: [],
      value: [],
      tableData: [],
      authdata: [],
      dialog: false,
      ds: false,
      op: "",
      form: {
        RoleName: "", //用户名
        Role_Auth: "", //角色权限（权限之间用逗号分隔的字符串）
        status: "1", //状态
        creater: "", //创建人
        creatdate: "", //创建时间
      },
    };
  },
  methods: {
    handleEdit(row) {
      this.op = "update";
      this.form.RoleName = row.RoleName;
      this.form.Role_Auth = row.Role_Auth;
      this.ds = true;
      this.value = row.Role_Auth.split(",");
      this.dialog = true;
    },
    handleAdd() {
      this.value = [];
      this.op = "insert";
      this.ds = false;
      this.dialog = true;
    },
    des() {
      console.log("数据发生改变！");
      var ssa = "";
      for (let i = 0; i < this.value.length; i++) {
        if (i == 0) {
          ssa += this.value[i] + "";
          continue;
        }
        ssa += "," + this.value[i];
      }
      this.form.creater = sessionStorage.getItem("loginName");
      this.form.creatdate = getTime();
      this.form.Role_Auth = ssa;
      if (this.op == "update") {
        this.update();
      } else {
        this.insert();
      }
      this.find();
    },
    find() {
      this.$https({
        url: "api/apiModel/find",
        method: "get",
        params: {
          table: "__role",
          where: {},
          dataBase: "base",
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
    insert() {
      this.$https({
        url: "api/apiModel/insert",
        method: "post",
        data: {
          table: "__role",
          form: this.form,
          dataBase: "base",
        },
      })
        .then((res) => {
          console.log(res);
          this.dialog = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //修改权限
    update() {
      this.$https({
        url: "api/apiModel/updateByWhere",
        method: "post",
        data: {
          table: "__role",
          where: { RoleName: this.form.RoleName },
          form: this.form,
          dataBase: "base",
        },
      })
        .then((res) => {
          console.log(res);
          this.authdata = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取全部权限
    async getAuth() {
      const datas = [];
      await this.$https({
        url: "api/apiModel/find",
        method: "get",
        params: {
          table: "__auth",
          where: {},
          dataBase: "base",
        },
      })
        .then((res) => {
          console.log(res);
          this.authdata = res;
        })
        .catch((err) => {
          console.log(err);
        });
      for (let i = 0; i < this.authdata.length; i++) {
        datas.push({
          key: this.authdata[i].GroupName + "-" + this.authdata[i].AuthName,
          label: this.authdata[i].GroupName + "-" + this.authdata[i].AuthName,
          disabled: false,
        });
      }
      this.data = datas;
    },
  },
  created() {
    this.getAuth();
    this.find();
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

.desd {
  width: 100%;
}
.el-tag {
  margin-left: 5px;
}
.el-transfer {
  display: flex;
  align-items: center;
}
</style>
