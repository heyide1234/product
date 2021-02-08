<template>
  <transition name="fade">
    <div class="bk" v-if="show">
      <div class="bg" v-if="show" @mouseover="de" @mouseleave="des">
        <div v-if="type == 'success'">
          <font style="color: #bf6">{{ content }}</font>
        </div>
        <div v-else-if="type == 'warning'">
          <font style="color: #fba">{{ content }}</font>
        </div>
        <div v-else>
          {{ content }}
        </div>

        <el-button v-if="close" @click="closeed" plain :type="type" size="mini"
          >x</el-button
        >
      </div>
    </div>
  </transition>
</template>

<script>
let timeout = null;
export default {
  data() {
    return {
      show: false,
      content: "",
      closed: false,
      close: false,
      type: "info",
    };
  },
  mounted() {
    if (!timeout) this.fd();
  },
  methods: {
    fd() {
      this.show = true;
      if (!closed) {
        timeout = setTimeout(() => {
          this.show = false;
          clearTimeout(timeout);
          timeout = null;
        }, 2000);
      }
    },
    de() {
      timeout && clearTimeout(timeout);
      this.show = true;
    },
    des() {
      timeout && clearTimeout(timeout);
      timeout = setTimeout(() => {
        this.show = false;
        timeout && clearTimeout(timeout);
      }, 1000);
    },
    closeed() {
      this.show = false;
    },
  },
  computed: {},
};
</script>
<style scoped>
.bg {
  box-shadow: 10px 10px 5px #888888;
  /* border: 1px solid rgba(22, 22, 22, 0.5); */
  /* transition: 0.3s; */

  min-height: 25px;
  min-width: 100px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 1px;
  color: #fff;
  position: fixed;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  /* display: inline-block;
  vertical-align: middle; */

  z-index: 9999;
  text-align: center;
  padding: 5px 10px;
  line-height: 25px;
}
/* .bg::after {
  display: inline-block;
  height: 100%;
  width: 100px;
  content: "ninninini";
  background-color: blue;
  vertical-align: middle;
} */
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.dc {
  background: green;
}
.bk {
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.3);
  height: 100%;
  width: 100%;
  z-index: 99999;
}
/* .main {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
} */
</style>
