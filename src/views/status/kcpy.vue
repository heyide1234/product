<template>
  <div class="container">
    <div class="table-head">
      <table>
        <colgroup>
          <col />
          <col />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th v-for="(value, index) in dataH" :key="index">
              {{ value }}
            </th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="table-body">
      <table>
        <colgroup>
          <col />
          <col />
          <col />
          <col />
        </colgroup>
        <tbody>
          <tr v-for="(items, key) in dataB" :key="key">
            <td v-for="(value, key, index) in items" :key="index">
              {{ value }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: ["dataH", "dataB"],
  data() {
    return {};
  },
};
</script>
<style scoped>
table {
  width: 100%;
  text-align: center;
  background-color: #02164c;
  border-collapse: collapse;
  color: rgb(219, 223, 226);
  /* font-size: ; */
  font-size: 12px;
}
table,
td,
th {
  border: 1px solid #092e55;
}
td,
th {
  height: 25px;
}
colgroup > col:nth-child(1) {
  width: 12%;
}
colgroup > col:nth-child(2) {
  width: 25%;
}
colgroup > col:nth-child(3) {
  width: 38%;
}
colgroup > col:nth-child(4) {
  width: 25%;
}
.container {
  height: 80%;
  width: 96%;
  /* overflow-y: auto; */
  margin: 0 auto;
  background-color: #02164c;
}
/* .table-head {
  padding-right: 1px;
} */
.table-body {
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100% - 25px);
}
::-webkit-scrollbar {
  width: 0px;
  height: 10px;
}

::-webkit-scrollbar-thumb {
  background-color: #092e55;
  border-radius: px;
}
.el-table--scrollable-x .el-table__body-wrapper {
  overflow-x: hidden !important;
}
.el-table--scrollable-x .el-table__body-wrapper:hover {
  overflow-x: auto !important;
}
</style>
