<template>
  <div id="app">
    <router-view v-if="isRoterAlive" />
    <!-- <keep-alive >
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" /> -->
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
      includeList: [],
      isRoterAlive: true,
    };
  },
  // watch: {
  //   $route(to, from) {
  //     // 如果要to(进入)的页面是需要keepAlive缓存的，把name push进include数组中
  //     console.log("this.includeList==", this.includeList);
  //     console.log(
  //       " !this.includeList.includes(to.name)==",
  //       !this.includeList.includes(to.name)
  //     );
  //     if (to.meta.keepAlive) {
  //       !this.includeList.includes(to.name) && this.includeList.push(to.name);
  //     }
  //     console.log("this.includeList==", this.includeList);
  //     // if (from.meta.keepAlive) {
  //     //   const index = this.includeList.indexOf(from.name);
  //     //   index !== -1 && this.includeList.splice(index, 1);
  //     // }
  //   },
  // },
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
  /* font-family: Nunito, sans-serif; */
  font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
  font-size: 12px;

  font-weight: 400;
  line-height: 1.5;
  color: #6c757d;
  text-align: left;
  background-color: #fafbfe;
  -webkit-text-size-adjust: none;
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
