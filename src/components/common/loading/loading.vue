<template>
  <div class="loadbg" v-if="show">
    <div class="xz">
      <span class="xzs">{{ loadContent }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      loadContent: "loading...",
    };
  },
  mounted() {},
  methods: {},
  computed: {},
};
</script>
<style scoped>
.loadbg {
  height: 100%;
  width: 100%;
  background-color: rgba(10, 10, 10, 0.2);
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 999;
}
.xz {
  margin-top: 100px;
  position: absolute;
  left: 50%;
  top: 30%;
  width: 100px;
  height: 100px;
  /* transform: translate(-50%, -50%); */
  margin-left: -50px;
  border-radius: 50%;
  box-sizing: border-box;
  color: white;
  border: 2px solid transparent;
  border-left: 2px solid rgb(247, 243, 243);
  box-shadow: 0 0 25px rgba(37, 37, 37, 0.5);
  background-color: rgb(0, 0, 0);
  animation: loadxz 2s infinite linear;
}
.xzs {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  height: 60px;
  width: 60px;
  line-height: 60px;
  text-align: center;
  color: rgb(251, 253, 251);
  font-size: 12px;
  transform-origin: center;
  animation: loadxzs 2s infinite linear;
}
@keyframes loadxz {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes loadxzs {
  0% {
    transform: rotate(360deg);
    margin: -25px 0 0 -25px;
  }
  100% {
    transform: rotate(0deg);
    margin: -25px 0 0 -25px;
  }
}
</style>
