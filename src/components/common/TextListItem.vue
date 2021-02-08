<template>
  <div class="textList-item-my" :style="{ width: widthLength + '%' }">
    <span class="spancontent-my left" :style="{ width: leftLength + '%' }">
      <slot name="left"></slot>
    </span>
    <span :class="{isshowF:isshowFs}">：</span>

    <span class="spancontent-my right" :style="{ width: rightLength + '%' }">
      <slot name="right"></slot>
    </span>
  </div>
</template>
<script>
export default {
  props: {
    widthLength: {
      type: Number,
      default: 25
    },
    leftLength: {
      type: Number,
      default: 40
    },
    rightLength: {
      type: Number,
      default: 60
    },
    isshowFs: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  methods: {},
  computed: {},
  mounted() {
    console;
  }
};
</script>
<style>
.isshowF {
  display: none;
}
.textList-item-my {
  line-height: 50px;

  overflow: hidden;

  display: inline-block;

  text-overflow: ellipsis;
  white-space: nowrap;
}
.left {
  text-align: right;
  display: inline-block;
  font-size: 15px;
  margin-right: 5px;
}
.right {
  text-align: left;
  display: inline-block;
  margin-left: 5px;
}
</style>
