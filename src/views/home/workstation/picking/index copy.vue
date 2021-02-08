<template>
  <div>
    <el-dialog title="条件筛选" :visible.sync="dialogFormVisible">
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
              v-for="item of SerialNumberList"
              :key="item.SerialNumber"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工序名称">
          <el-select placeholder="请选择工序名称" v-model="form.ProcessName">
            <el-option
              :value="item.ProcessName"
              v-for="item of ProcessNameList"
              :key="item.ProcessName"
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
    <el-steps :active="3" finish-status="success" simple style="margin: 20px">
      <el-step title="清单头"></el-step>
      <el-step title="制程清单"></el-step>
      <el-step title="配料"></el-step>
      <el-step title="领料"></el-step>
      <el-step title="检验"></el-step>
    </el-steps>
    <div class="tables">
      <el-card class="tablediv">
        <el-input placeholder="扫描物料号" :disabled="true"></el-input>

        <el-table
          ref="tableselectData1"
          :data="tableData"
          height="450"
          style="width: 100%"
        >
          <el-table-column
            type="index"
            width="50"
            label="N0."
          ></el-table-column>
          <el-table-column
            property="SerialNumber"
            label="序列号"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="ProcessName"
            label="工序名称"
            width="150"
          ></el-table-column>
          <el-table-column
            property="MaterialNumber"
            label="物料编号"
          ></el-table-column>
        </el-table>
      </el-card>
      <el-card class="tablediv">
        <el-input placeholder="扫描物料号" @input="wlhcg"></el-input>

        <el-table
          ref="tableselectData"
          :data="tableData2"
          height="450"
          style="width: 100%"
        >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column
            type="index"
            width="50"
            label="N0."
          ></el-table-column>
          <el-table-column
            property="SerialNumber"
            label="序列号"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="ProcessName"
            label="工序名称"
            width="150"
          ></el-table-column>
          <el-table-column
            property="MaterialNumber"
            label="物料编号"
          ></el-table-column>
        </el-table>
        <el-button type="primary" size="small" class="yc" @click="yc"
          >移除</el-button
        >
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      SerialNumberList: [],
      ProcessNameList: [],
      va: "",
      SerialNumber: "",
      ProcessName: "",
      form: {
        SerialNumber: "",
        ProcessName: "",
        MaterialNumber: "",
        creater1: "",
        creater2: "",
      },
      dialogFormVisible: true,
      tableData: [],
      tableData2: [],
    };
  },
  methods: {
    getserinumber() {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/workOrderHead/getSerialNumber",
      })
        .then((res) => {
          this.SerialNumberList = res;
          // this.tableData = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    vchange(v) {
      console.log("change", v, this.form.SerialNumber);
      this.$https({
        method: "get",
        url: "/api/processList/find",
        params: { SerialNumber: this.form.SerialNumber },
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
      this.get();
    },

    yc() {
      if (this.$refs.tableselectData.selection.length > 0) {
        let val = this.$refs.tableselectData.selection;
        for (let i = 0; i < val.length; i++) {
          this.del(val[i]._id);
        }
      }
    },
    //领料
    async add() {
      //  console.log(this.form.SerialNumber,this.form.ProcessName,v)
      //       this.form.creater = sessionStorage.getItem("loginName");
      this.$https({
        url: "/api/batching/findBySerialNumberAndProcessName",
        params: {
          SerialNumber: this.form.SerialNumber,
          ProcessName: this.form.ProcessName,
          MaterialNumber: this.form.MaterialNumber,
          status: "0",
        },
      })
        .then((res) => {
          console.log(res[0]._id);
          this.update({
            where: { _id: res[0]._id },
            set: { creater2: this.form.creater2, status: "1" },
          });
        })
        .catch((err) => {
          console.log(err);
        });

      // this.update({where:{_id:id},set:{status:1}})
    },

    get() {
      this.$https({
        url: "/api/batching/findBySerialNumberAndProcessName",
        params: {
          SerialNumber: this.form.SerialNumber,
          ProcessName: this.form.ProcessName,
        },
      })
        .then((res) => {
          this.tableData = res.filter((item) => {
            return item.status == "3";
          });
          this.tableData2 = res.filter((item) => {
            return item.status == 1;
          });
          console.log(this.tableData);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    del(id) {
      this.update({
        where: { _id: id },
        set: { creater2: this.form.creater2, status: 0 },
      });
    },
    async update(dt) {
      await this.$https({
        method: "post",
        url: "/api/batching/updateStatus",
        data: dt,
      })
        .then(function (res) {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
      this.get();
    },
    wlhcg(val) {
      console.log("输入框改变" + val);
      this.form.MaterialNumber = val;
      this.form.creater2 = sessionStorage.getItem("loginName");

      this.add(val);
    },
  },
  created() {
    this.getserinumber();
  },
};
</script>
<style scoped>
.el-select {
  width: 100%;
}
.tablediv {
  margin: 0 auto;
  width: 48%;
  margin-bottom: 30px;
}
.el-table {
  font-size: 13px;
}
.yc {
  margin: 20px 0;
}
.tables {
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
}
</style>
