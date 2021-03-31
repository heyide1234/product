<template>
  <div class="ds">
    <el-input type="textarea" v-model="mess"></el-input>
    <el-button v-preventReClick @click="FBmess">发布消息</el-button>
  </div>
</template>

<script>
import { getTime } from "common/time/getTime";
export default {
  name: "messContent",
  data() {
    return {
      mess: "",
      isFirstEnter: true,
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
  created() {
    this.isFirstEnter = true;
  },
  activated() {
    //第一次加载不管是否为后退，都要加载数据this.isFirstEnter=true
    //第1+次this.isFirstEnter===false，根据isBack判断是否为后退标记
    if (!this.$route.meta.isBack || this.isFirstEnter) {
      console.log(
        "消息页面  加载初始数据！",
        !this.$route.meta.isBack,
        this.isFirstEnter
      );
    }
    this.$route.meta.isBack = false; //始终改为false，在beforeRouteEnter中修改是否为true
    this.isFirstEnter = false;
  },
  deactivated() {
    console.log("消息页面beactivated加载");
  },
  beforeRouteEnter(to, from, next) {
    console.log("消息页面  beforeRouteEnter加载", from.name, to.name);
    //根据跳转前的路由名决定跳转后的路由是否启用isback不刷新
    if (from.name == "stock") {
      to.meta.isBack = true; //设置为true说明你是返回到这个页面，而不是通过跳转从其他页面进入到这个页面
      to.meta.keepAlive = false;
    }
    next();
  },
};
</script>
<style scoped>
.ds {
  display: flex;
}
</style>
