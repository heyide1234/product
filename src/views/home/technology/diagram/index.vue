<template>
  <div
    :style="{ height: clientHeight + 'px', width: clientWidth + 'px' }"
    class="des"
  >
    <el-input @change="ikd" v-model="num" type="text"></el-input>
    <!-- <div ref="main" id="mainS">

    </div> -->
    <myv :datas="zdt"></myv>
    <!-- <myv :data="option"></myv> -->
  </div>
</template>

<script>
// var echarts = require("echarts");
// var myChart = "";

// var getdata=function
export default {
  data() {
    return {
      num: "",
      tempdata: "",
      tempdatas: [],
      zdt: [],
    };
  },
  methods: {
    ikd() {
      this.findsas(this.num);
    },
    async findnum(productNumber) {
      await this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__materialDetails",
          dataBase: "base",
          where: { Parent: productNumber },
          sortJson: { _id: -1 },
        },
      })
        .then((res) => {
          this.datas = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async findsas(MaterialNumber) {
      this.$myloading({
        show: true,
      });
      this.$https({
        method: "post",
        url: "api/transaction/diagram",
        data: {
          MaterialNumber: MaterialNumber,
        },
      })
        .then((res) => {
          if (res.status) {
            this.zdt = [];
            this.zdt = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
      this.$myloading({
        show: false,
      });
      //////////////////////////////////
      // await this.getzk(MaterialNumber);
      // // this.tempdata = `[` + this.tempdata + `]`;
      // // let cods = this.tempdata.replace(/\[,{/g, "[{");
      // // this.tempdatas = JSON.parse(cods);
      // // this.tempdata = "";
      // this.zdt = [];
      // this.zdt = this.tempdatas;
    },
    //展开BOM

    async getzk(MaterialNumber, n1 = 1) {
      this.tempdata +=
        `,{"name": ` + MaterialNumber + `,"value": ` + n1 + `,"children":[`;

      await this.findnum(MaterialNumber); //当前产品对应的物料list
      //  console.log("datas===", this.datas);
      let mums = this.datas;
      if (mums.length > 0) {
        for (let i = 0; i < mums.length; i++) {
          await this.getzk(mums[i].MaterialNumber, mums[i].Number * n1);
        }
      }
      this.tempdata += `]}`;
    },
  },
  mounted() {},

  destroyed() {},
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

  created() {
    //this.$nextTick(()=>{
    // document.querySelector("#mainS").style.width="500px";
    //  document.querySelector("#mainS").style.height="500px";
    //});
  },
  components: {
    myv: () => import("./1"),
  },
};
</script>
<style scoped>
#mainS {
  background-color: "#05224d";
  height: 100%;
  width: 100%;
}
</style>
