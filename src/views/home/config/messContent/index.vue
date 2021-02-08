<template>
  <div class="ds">
    <el-input type="textarea" v-model="mess"></el-input>
    <el-button @click="FBmess">发布消息</el-button>
  </div>
</template>

<script>
import { getTime } from "common/time/getTime";
export default {
  data() {
    return {
      mess: "",
    };
  },
  methods: {
    FBmess() {
      this.$https({
        //这里是你自己的请求方式、url和data参数
        method: "post",
        url: "/api/apiModel/updateByWhere",
        data: {
          table: "__messContent",
          where: { Flag: "1" },
          form: { Content: this.mess, creatdate: getTime() },
          dataBase: "base",
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
.ds {
  display: flex;
}
</style>
