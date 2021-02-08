<template>
  <div class="item">
    <div class="items center">
      <div class="item-content">订单编号:<el-input></el-input></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
<style scoped lang="less">
.item {
  background-color: rgb(241, 231, 231);
  display: flex;
  /* flex: 1; */
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  min-height: 1px;

  /* flex-direction: row; */
}
.items {
  background-color: rgb(216, 232, 238);
  width: 25%;
  height: 100px;
  display: flex;
  justify-content: center;
}

.item-content {
  min-height: 1px;
  display: flex;
  justify-content: center;
}

.center {
  display: -webkit-box;
  -webkit-box-orient: horizontal;
  -webkit-box-pack: center;
  -webkit-box-align: center;

  display: -moz-box;
  -moz-box-orient: horizontal;
  -moz-box-pack: center;
  -moz-box-align: center;

  display: -o-box;
  -o-box-orient: horizontal;
  -o-box-pack: center;
  -o-box-align: center;

  display: -ms-box;
  -ms-box-orient: horizontal;
  -ms-box-pack: center;
  -ms-box-align: center;

  display: box;
  box-orient: horizontal;
  box-pack: center;
  box-align: center;
}
</style>
