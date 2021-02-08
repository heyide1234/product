<template>
  <div id="app">
    <router-view v-if="isRoterAlive" />
  </div>
</template>

<script>
export default {
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRoterAlive: true,
    };
  },
  methods: {
    reload() {
      this.isRoterAlive = false;
      this.$nextTick(function () {
        this.isRoterAlive = true;
      });
    },
  },
  mounted: function () {
    this.$router.push({ name: "status" });
  },
};
</script>
<style>
html,
body {
  height: 100%;
  width: 100%;
  margin: 0px;
  padding: 0px;
  font-family: Nunito, sans-serif;

  font-weight: 400;
  line-height: 1.5;
  color: #6c757d;
  text-align: left;
  background-color: #fafbfe;
}
a:hover {
  cursor: pointer;
}
#app {
  height: 100%;
  width: 100%;
}
/* 表头右侧空隙 */
body .el-table th.gutter {
  display: table-cell !important;
}
::-webkit-scrollbar {
  width: 2px;
  height: 10px;
}

::-webkit-scrollbar-thumb {
  background-color: #cfd2da;
  border-radius: 2px;
}
.el-table--scrollable-x .el-table__body-wrapper {
  overflow-x: hidden !important;
}
.el-table--scrollable-x .el-table__body-wrapper:hover {
  overflow-x: auto !important;
}
.selected_search {
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  outline: none !important;
}
.selected_search select {
  background: transparent !important;
  border: none !important;
  outline: none !important;
}

/* 适应小屏幕 */
.el-dialog {
  min-width: 300px;
}
.el-dialog__body {
  max-height: 300px;
  overflow: auto;
}

.el-transfer-panel {
  width: 250px !important;
}
.el-table__body tr.current-row > td {
  background-color: #eff3f7 !important;

  /* color: #f19944; */ /* 设置文字颜色，可以选择不设置 */
}
</style>
