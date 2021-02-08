<template>
  <div class="container">
    <div class="table-head">
      <table>
        <colgroup>
          <col />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th>序号</th>
            <th>完成率</th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="table-body">
      <table>
        <colgroup>
          <col />
          <col />
        </colgroup>
        <tbody>
          <tr v-for="(items, key) in dataB" :key="key">
            <td>{{ key + 1 }}</td>
            <td>
              <div class="tdfloat">
                <div>
                  {{ items.OddNumbers }}
                </div>
                <div>
                  <el-progress
                    class="progresss"
                    :percentage="items.completeLv"
                    :color="customColorMethod"
                  ></el-progress>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: ["dataB"],
  data() {
    return {
      temp: true,
      dataBs: [],
    };
  },
  methods: {
    customColorMethod(percentage) {
      if (percentage < 30) {
        return "#909399";
      } else if (percentage < 70) {
        return "#e6a23c";
      } else {
        return "#67c23a";
      }
    },
  },
  created() {},
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
  /* width: 33.3%; */
  font-size: 11px;
}
.tdfloat {
  display: flex;
  width: 100%;
}
.tdfloat > div:nth-of-type(1) {
  width: 35%;
}
.tdfloat > div:nth-of-type(2) {
  width: 62%;
}
colgroup > col:nth-child(1) {
  width: 15%;
}
colgroup > col:nth-child(2) {
  width: 85%;
}
.container {
  height: 80%;
  width: 96%;
  /* overflow-y: auto;
  overflow-x: hidden; */
  margin: 0 auto;
  background-color: #02164c;
}
.table-body {
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100% - 25px);
}
.el-progress {
  display: flex;
  align-items: center;
}

::-webkit-scrollbar {
  width: 0px;
  height: 10px;
  background-color: #02164c;
}

::-webkit-scrollbar-thumb {
  background-color: #02164c;
  /* border-radius: 0px; */
}
.el-table--scrollable-x .el-table__body-wrapper {
  overflow-x: hidden !important;
}
.el-table--scrollable-x .el-table__body-wrapper:hover {
  /* overflow-x: auto !important; */
  overflow-x: hidden !important;
}
</style>


