<template>
  <div class="card">
    <!-- <div class="title">open</div> -->
    <div class="title" :style="{height:(titleheight)+'%'}">
      <slot name="top"></slot>
    </div>
    <div class="contents" :style="{height:(100-titleheight)+'%'}">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titleheight: {
      type: Number,
      default: 40
    }
  },
  data() {
    return {};
  }
};
</script>
<style scoped>
.card {
  /* width: 100px;
  height: 70px; */

  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  transition: 0.3s;
  border-radius: 4px;
  overflow: hidden;
  text-align: center;
}

.title {
  font-weight: bold;
  font-size: 12px;
  color: #95aac9;
  font-family: "Cerebri Sans", sans-serif;
  margin: 0px;
  padding: 0px;

  line-height: 30px;
}

.contents {
  font-weight: bold;
  font-size: 20px;
  font-family: "Cerebri Sans", sans-serif;
  margin: 0px;
  padding: 0px;
}
</style>
