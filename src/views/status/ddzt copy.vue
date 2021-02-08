<template>
  <div class="container">
    <table>
      <thead>
        <tr>
          <th>序号</th>
          <th>订单号</th>
          <th>销售订单明细</th>
          <th>物料计划需求</th>
          <th>物料需求</th>
          <th>采购单</th>
          <th>材料到货</th>
          <th>来料质检</th>
          <th>材料入库</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(items, key) in dataB" :key="key">
          <!-- <td v-for="(value, key, index) in items" :key="index"> -->
          <!-- {{ value }} -->
          <td>{{ key + 1 }}</td>
          <td>{{ items.OrderNumber }}</td>
          <td>
            <div class="N" :class="{ Y: items.processCode == '1' }"></div>
          </td>
          <td>
            <div class="N" :class="{ Y: items.processCode == '2' }"></div>
          </td>
          <td>
            <div class="N" :class="{ Y: items.processCode == '3' }"></div>
          </td>
          <td>
            <div class="N" :class="{ Y: items.processCode == '4' }"></div>
          </td>
          <td>
            <div class="N" :class="{ Y: items.processCode == '5' }"></div>
          </td>
          <td>
            <div class="N" :class="{ Y: items.processCode == '6' }"></div>
          </td>
          <td>
            <div class="N" :class="{ Y: items.processCode == '7' }"></div>
          </td>

          <!-- <div class="N" :class="{ Y: temp }"></div> -->
          <!-- </td> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      temp: true,
      dataB: [],
    };
  },
  methods: {
    querydata() {
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "salesOrder",
          where: {},
        },
      })
        .then((res) => {
          this.dataB = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.querydata();
  },
};
</script>
<style scoped>
.N {
  background-color: rgb(150, 137, 137);
  border: none;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}
.Y {
  background-color: red;
  animation: sd 2s infinite steps(2);
}
@keyframes sd {
  0% {
    background-color: red;
  }
  50% {
    background-color: yellow;
  }
}
table {
  width: 100%;
  text-align: center;
  background-color: #02164c;
  border-collapse: collapse;
  color: rgb(219, 223, 226);
  /* font-size: ; */
  font-size: 12px;
}
table thead {
  position: absolute;
  /* display: table-cell; */
  width: 100%;
}
table,
td,
th {
  border: 1px solid #092e55;
}
td,
th {
  height: 25px;
  /* width: 33.3%; */
}
.container {
  height: 80%;
  width: 96%;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 0 auto;
  background-color: #02164c;
}

::-webkit-scrollbar {
  width: 0px;
  height: 10px;
}

::-webkit-scrollbar-thumb {
  background-color: #092e55;
  border-radius: 0px;
}
.el-table--scrollable-x .el-table__body-wrapper {
  overflow-x: hidden !important;
}
.el-table--scrollable-x .el-table__body-wrapper:hover {
  overflow-x: auto !important;
}
</style>


