<template>
  <div
    class="items center"
    :style="{ height: itemHight + 'px', width: itemWidth + '%' }"
  >
    <div class="items-content"><slot></slot></div>
  </div>
</template>

<script>
export default {
  props: {
    itemWidth: {
      default: 25,
      type: Number,
    },
    itemHight: {
      default: 50,
      type: Number,
    },
  },
  data() {
    return {};
  },
};
</script>
<style scoped lang="less">
.items {
  width: 25%;
  height: 100px;
  display: flex;
  justify-content: center;
}

.items-content {
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
