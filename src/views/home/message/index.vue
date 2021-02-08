<template>
  <div class="content">
    <!-- <div class="xz"><span class="xzs">加载中...</span></div> -->
    <div class="nav">
      <el-badge :value="index1" class="item">
        <el-button size="small" @click="findOrderByProcess('1')"
          >销售订单明细</el-button
        >
      </el-badge>

      <el-badge :value="index2" class="item">
        <el-button size="small" @click="findOrderByProcess('2')"
          >物料计划需求单</el-button
        >
      </el-badge>

      <el-badge :value="index3" class="item">
        <el-button size="small" @click="findOrderByProcess('3')"
          >物料需求单</el-button
        >
      </el-badge>

      <el-badge :value="index4" class="item">
        <el-button size="small" @click="findOrderByProcess('4')"
          >采购单</el-button
        >
      </el-badge>
      <el-badge :value="index5" class="item">
        <el-button size="small" @click="findOrderByProcess('5')"
          >材料到货单</el-button
        >
      </el-badge>

      <el-badge :value="index6" class="item">
        <el-button size="small" @click="findOrderByProcess('6')"
          >来料质检单</el-button
        >
      </el-badge>

      <el-badge :value="index7" class="item">
        <el-button size="small" @click="findOrderByProcess('7')"
          >材料入库单</el-button
        >
      </el-badge>

      <el-badge :value="index8" class="item">
        <el-button size="small">回复</el-button>
      </el-badge>
      <el-badge :value="index9" class="item">
        <el-button size="small">评论</el-button>
      </el-badge>

      <el-badge :value="index10" class="item">
        <el-button size="small">回复</el-button>
      </el-badge>

      <el-badge :value="index11" class="item">
        <el-button size="small">回复</el-button>
      </el-badge>

      <el-badge :value="index12" class="item">
        <el-button size="small">回复</el-button>
      </el-badge>
    </div>

    <el-dialog title="订单表" :visible.sync="dialogTableVisible">
      <el-table :data="tableData">
        <el-table-column type="selection" width="50"></el-table-column>

        <el-table-column
          property="OrderNumber"
          label="订单编号"
        ></el-table-column>
        <el-table-column
          property="CustomerOrderNumber"
          label="客户订单编号"
        ></el-table-column>

        <el-table-column
          property="CustomerNumber"
          label="客户编号"
        ></el-table-column>
        <el-table-column
          property="CustomerName"
          label="客户名称"
        ></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      index1: "",
      index2: "",
      index3: "",
      index4: "",
      index5: "",
      index6: "",
      index7: "",
      index8: "",
      index9: "",
      index10: "",
      index11: "",
      index12: "",
      tableData: [],
      dialogTableVisible: false,
    };
  },
  methods: {
    findOrderByProcess(index) {
      this.dialogTableVisible = true;
      this.findOrder(index);
    },
    async findOrder(index) {
      console.log(index);
      await this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "salesOrder",
          where: { processCode: index },
        },
      })
        .then((res) => {
          console.log("当前数据", res);
          this.tableData = res;
          let len = "";
          if (this.tableData.length > 0) len = this.tableData.length + "";
          console.log(index);
          switch (index) {
            case "1":
              this.index1 = len;
              break;
            case "2":
              this.index2 = len;
              break;
            case "3":
              this.index3 = len;
              break;
            case "4":
              this.index4 = len;
              break;
            case "5":
              this.index5 = len;
              break;
            case "6":
              this.index6 = len;
              break;
            case "7":
              this.index7 = len;
              break;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    for (let i = 0; i < 7; i++) {
      this.findOrder(i + 1 + "");
    }
  },
};
</script>
<style scoped>
.nav {
  display: flex;
  flex-wrap: wrap;
  /* flex-direction: row; */
  /* 多行有效 */
  align-content: flex-start;
  justify-content: space-around;
  /* overflow: auto; */
  padding-top: 10px;
}
.item {
  width: 100px;
  margin: 50px;
}
button {
  width: 100px;
  text-align: center;
  padding: 9px;
}
.content {
  width: 800px;
  height: 500px;
  background: rgba(240, 243, 239, 0.7);
  margin: 100px auto;
}
</style>
