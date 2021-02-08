<template>
  <div class="box">
    <div class="container">
      <div class="header"></div>
      <div class="contents">
        电量
        <br />
        {{ElectricityQuantity}}%
      </div>
      <div class="battery" :style="{background:color1}" v-show="ElectricityQuantity<10"></div>
      <div
        class="battery"
        :style="{background:color2}"
        v-show="ElectricityQuantity<20&&ElectricityQuantity>=10"
      ></div>
      <div class="battery" :style="{background:color3}" v-show="ElectricityQuantity>=20"></div>
      <div class="battery-copy">
        <div class="g-wave" :style="{bottom:ElectricityQuantity+'%'}"></div>
        <div class="g-wave" :style="{bottom:ElectricityQuantity+'%'}"></div>
        <div class="g-wave" :style="{bottom:ElectricityQuantity+'%'}"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    ElectricityQuantity: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      color1: "red",
      color2: "#E6A23C",
      color3: "green"
    };
  }
};
</script>
<style scoped>
.box {
  width: 180px;
  height: 245px;
  display: flex;
  background: rgb(226, 229, 231);
}
.contents {
  position: absolute;
  top: 55px;
  left: 53px;
  text-align: center;
  z-index: 100;
  font-weight: bold;
  color: rgb(7, 82, 82);
}
.container {
  position: relative;
  width: 140px;
  margin: auto;
}

.header {
  position: absolute;
  width: 26px;
  height: 10px;
  left: 50%;
  top: 0;
  transform: translate(-50%, -10px);
  border-radius: 5px 5px 0 0;
  background: rgba(255, 255, 255, 0.88);
}

.battery-copy {
  position: absolute;
  top: 0;
  left: 0;
  height: 220px;
  width: 140px;
  border-radius: 15px 15px 5px 5px;
  overflow: hidden;
}

.battery {
  position: relative;
  height: 220px;
  box-sizing: border-box;
  border-radius: 15px 15px 5px 5px;
  box-shadow: 0 0 5px 2px rgba(255, 255, 255, 0.22);
  background: #2196f3;
  z-index: 1;
}

.battery::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 80%;

  border-radius: 0px 0px 5px 5px;
  box-shadow: 0 14px 28px rgba(33, 150, 243, 0),
    0 10px 10px rgba(9, 188, 215, 0.08);
  animation: charging 10s linear infinite;
  filter: hue-rotate(90deg);
}

.g-wave {
  position: absolute;
  width: 300px;
  height: 300px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 45% 47% 44% 42%;

  left: 50%;
  transform: translate(-50%, 0);
  z-index: 1;
  animation: move 10s linear infinite;
}

@keyframes move {
  100% {
    transform: translate(-50%, 10px) rotate(720deg);
  }
}
</style>
