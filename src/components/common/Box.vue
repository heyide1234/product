<template>
  <div class="item">
    <slot></slot>
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
  display: flex;
  /* flex: 1; */
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  min-height: 1px;

  /* flex-direction: row; */
}
</style>
