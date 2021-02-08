<template>
  <div>
    <el-carousel
      :interval="5000"
      arrow="always"
      :height="clientHeight + 'px'"
      :width="clientWidth + 'px'"
    >
      <el-carousel-item class="tems">
        <myv :data="zdt"></myv>
      </el-carousel-item>
      <el-carousel-item class="tems">
        <myw :data="dt1" v-for="item in 8" :key="item" class="mbd"></myw>
        <myw :data="dt2"></myw>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dt1: {
        title: "工序一",
        lh: ["料号1", "料号2", "料号3", "料号4", "料号5", "料号6", "料号7"],
        zj: [393, 438, 485, 631, 689, 824, 600],
        sj: [10, 100, 200, 300, 400, 500, 600],
      },
      // dt2: {
      //   title: "工序二",
      //   lh: [
      //     "料号1",
      //     "料号2",
      //     "料号3",
      //     "料号4",
      //     "料号5",
      //     "料号6",
      //     "料号7",
      //     "料号8",
      //     "料号9",
      //     "料号10",
      //     "料号11",
      //     "料号12",
      //     "料号13",
      //     "料号14",
      //     "料号15",
      //     "料号1",
      //     "料号2",
      //     "料号3",
      //     "料号4",
      //     "料号5",
      //     "料号6",
      //     "料号7",
      //     "料号8",
      //     "料号9",
      //     "料号10",
      //     "料号11",
      //     "料号12",
      //     "料号13",
      //     "料号14",
      //     "料号15",
      //     "料号1",
      //     "料号2",
      //     "料号3",
      //     "料号4",
      //     "料号5",
      //     "料号6",
      //     "料号7",
      //     "料号8",
      //     "料号9",
      //     "料号10",
      //     "料号11",
      //     "料号12",
      //     "料号13",
      //     "料号14",
      //     "料号15",
      //     "料号1",
      //     "料号2",
      //     "料号3",
      //     "料号4",
      //     "料号5",
      //     "料号6",
      //     "料号7",
      //     "料号8",
      //     "料号9",
      //     "料号10",
      //     "料号11",
      //     "料号12",
      //     "料号13",
      //     "料号14",
      //     "料号15",
      //   ],
      //   zj: [
      //     393,
      //     438,
      //     485,
      //     631,
      //     689,
      //     689,
      //     824,
      //     987,
      //     393,
      //     438,
      //     485,
      //     631,
      //     689,
      //     824,
      //     987,
      //     393,
      //     438,
      //     485,
      //     631,
      //     689,
      //     689,
      //     824,
      //     987,
      //     393,
      //     438,
      //     485,
      //     631,
      //     689,
      //     824,
      //     987,
      //     393,
      //     438,
      //     485,
      //     631,
      //     689,
      //     689,
      //     824,
      //     987,
      //     393,
      //     438,
      //     485,
      //     631,
      //     689,
      //     824,
      //     987,
      //     393,
      //     438,
      //     485,
      //     631,
      //     689,
      //     689,
      //     824,
      //     987,
      //     393,
      //     438,
      //     485,
      //     631,
      //     689,
      //     824,
      //     987,
      //   ],
      //   sj: [
      //     10,
      //     100,
      //     200,
      //     300,
      //     689,
      //     400,
      //     500,
      //     600,
      //     10,
      //     100,
      //     200,
      //     300,
      //     400,
      //     500,
      //     600,
      //     393,
      //     438,
      //     485,
      //     631,
      //     689,
      //     689,
      //     824,
      //     987,
      //     393,
      //     438,
      //     485,
      //     631,
      //     689,
      //     824,
      //     987,
      //     393,
      //     438,
      //     485,
      //     631,
      //     689,
      //     689,
      //     824,
      //     987,
      //     393,
      //     438,
      //     485,
      //     631,
      //     689,
      //     824,
      //     987,
      //     393,
      //     438,
      //     485,
      //     631,
      //     689,
      //     689,
      //     824,
      //     987,
      //     393,
      //     438,
      //     485,
      //     631,
      //     689,
      //     824,
      //     987,
      //   ],
      // },
      // zdt: {
      //   gx: [
      //     "工序一",
      //     "工序二",
      //     "工序三",
      //     "工序四",
      //     "工序五",
      //     "工序一",
      //     "工序二",
      //     "工序三",
      //     "工序四",
      //     "工序五",
      //     "工序一",
      //     "工序二",
      //     "工序三",
      //     "工序四",
      //     "工序五",
      //   ],
      //   dc: [
      //     {
      //       value: 0,
      //     },
      //     {
      //       value: 16,
      //     },
      //     {
      //       value: 10,
      //     },
      //     {
      //       value: 6,
      //     },
      //     {
      //       value: 8,
      //     },
      //     {
      //       value: 0,
      //     },
      //     {
      //       value: 16,
      //     },
      //     {
      //       value: 10,
      //     },
      //     {
      //       value: 6,
      //     },
      //     {
      //       value: 8,
      //     },
      //     {
      //       value: 0,
      //     },
      //     {
      //       value: 16,
      //     },
      //     {
      //       value: 10,
      //     },
      //     {
      //       value: 6,
      //     },
      //     {
      //       value: 8,
      //     },
      //   ],
      //   pl: [
      //     {
      //       value: 0,
      //     },
      //     {
      //       value: 26,
      //     },
      //     {
      //       value: 10,
      //     },
      //     {
      //       value: 6,
      //     },
      //     {
      //       value: 8,
      //     },
      //     {
      //       value: 0,
      //     },
      //     {
      //       value: 26,
      //     },
      //     {
      //       value: 10,
      //     },
      //     {
      //       value: 6,
      //     },
      //     {
      //       value: 8,
      //     },
      //     {
      //       value: 0,
      //     },
      //     {
      //       value: 26,
      //     },
      //     {
      //       value: 10,
      //     },
      //     {
      //       value: 6,
      //     },
      //     {
      //       value: 8,
      //     },
      //   ],
      //   ll: [
      //     {
      //       value: 1,
      //     },
      //     {
      //       value: 36,
      //     },
      //     {
      //       value: 10,
      //     },
      //     {
      //       value: 6,
      //     },
      //     {
      //       value: 8,
      //     },
      //     {
      //       value: 0,
      //     },
      //     {
      //       value: 26,
      //     },
      //     {
      //       value: 10,
      //     },
      //     {
      //       value: 6,
      //     },
      //     {
      //       value: 8,
      //     },
      //     {
      //       value: 0,
      //     },
      //     {
      //       value: 26,
      //     },
      //     {
      //       value: 10,
      //     },
      //     {
      //       value: 6,
      //     },
      //     {
      //       value: 8,
      //     },
      //   ],
      //   wc: [
      //     {
      //       value: 100,
      //     },
      //     {
      //       value: 46,
      //     },
      //     {
      //       value: 10,
      //     },
      //     {
      //       value: 6,
      //     },
      //     {
      //       value: 8,
      //     },
      //     {
      //       value: 0,
      //     },
      //     {
      //       value: 26,
      //     },
      //     {
      //       value: 10,
      //     },
      //     {
      //       value: 6,
      //     },
      //     {
      //       value: 8,
      //     },
      //     {
      //       value: 0,
      //     },
      //     {
      //       value: 26,
      //     },
      //     {
      //       value: 10,
      //     },
      //     {
      //       value: 6,
      //     },
      //     {
      //       value: 8,
      //     },
      //   ],
      // },
    };
  },
  methods: {},
  mounted() {},
  computed: {
    clientHeight() {
      // return document.body.clientHeight / 10;
      return window.screen.availHeight - 135;
    },
    clientWidth() {
      // return document.body.clientHeight / 10;
      return window.screen.availWidth;
    },
  },
  components: {
    myv: () => import("./1"),
    // myw: () => import("./2"),
  },
};
</script>
<style scoped>
.tems {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-content: flex-start;
  overflow: auto;
}
.mbd {
  margin-bottom: -1px;
}

.bg {
  min-height: 25px;
  min-width: 100px;

  background: rgba(0, 0, 0, 0.5);
  border-radius: 1px;
  color: #fff;
  position: fixed;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  z-index: 9999;
  text-align: center;
  padding: 5px;
  line-height: 25px;
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
