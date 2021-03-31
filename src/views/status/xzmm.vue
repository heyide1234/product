<style scoped lang="less">
body {
  /* perspective: 900px; */
}

.contaner {
  perspective: 900px;
  height: 100%;
  width: 100%;
  /* background-color: #5c3a13; */
  position: relative;
  /* transform-origin: center; */
}

.xzdiv {
  position: absolute;
  /* background-color: rgb(245, 6, 6); */
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  margin: auto;
  height: 100px;
  width: 150px;
  text-align: center;
  font-weight: bold;
  transform-style: preserve-3d;
  animation: xz 25s infinite linear;
}
.xzdiv:hover {
  animation-play-state: paused;
}

.xzdiv > .as {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.95;
  cursor: pointer;
  border-radius: 2px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  // animation: colorchange 10s infinite;
}
.xzdiv > .as > img {
  height: 100px;
  width: 100px;
  display: inline-block;
  font-size: 50px;
}
// @keyframes colorchange {
//   form {
//     filter: hue-rotate(0deg);
//   }
//   to {
//     filter: hue-rotate(360deg);
//   }
// }

.xzdiv > .as:nth-of-type(1) {
  transform: rotateY(60deg) translateZ(200px);
  -webkit-transform: rotateY(60deg) translateZ(200px);
  /* background-color: chartreuse; */
  background-color: #c14c39;
  &:focus {
    background-color: #7c3025;
    .trs {
      background-color: red;
    }
  }
}
.xzdiv > .as:nth-of-type(2) {
  transform: rotateY(120deg) translateZ(200px);
  -webkit-transform: rotateY(120deg) translateZ(200px);
  /* background-color: rgb(255, 187, 0); */
  background-color: #6e9c72;
  &:focus {
    background-color: #425e45;
  }
}
.xzdiv > .as:nth-of-type(3) {
  transform: rotateY(180deg) translateZ(200px);
  -webkit-transform: rotateY(180deg) translateZ(200px);
  /* background-color: rgb(255, 187, 0); */
  background-color: #5e5f7a;
  &:focus {
    background-color: #2c2c38;
  }
}
.xzdiv > .as:nth-of-type(4) {
  transform: rotateY(240deg) translateZ(200px);
  -webkit-transform: rotateY(240deg) translateZ(200px);
  /* background-color: rgb(255, 187, 0); */
  background-color: #f5eb98;
  &:focus {
    background-color: #807b4f;
  }
}
.xzdiv > .as:nth-of-type(5) {
  transform: rotateY(300deg) translateZ(200px);
  -webkit-transform: rotateY(300deg) translateZ(200px);
  /* background-color: rgb(111, 0, 255); */
  background-color: #50a3bc;
  &:focus {
    background-color: #2c5b69;
  }
}
.xzdiv > .as:nth-of-type(6) {
  transform: rotateY(360deg) translateZ(200px);
  -webkit-transform: rotateY(360deg) translateZ(200px);
  /* background-color: rgb(255, 0, 98); */
  background-color: #f9a99a;
  &:focus {
    background-color: #8d615a;
  }
}
/* .xzdiv > .as:hover {
  background-color: rgb(51, 255, 0);
} */
.xzdiv > .as {
  -webkit-box-reflect: below 5px
    linear-gradient(transparent 20%, rgba(255, 255, 255, 0.3));

  /* -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(50%, transparent), to(rgba(250, 250, 250, 0.1))); */
}

@keyframes xz {
  0% {
    transform: rotateY(0deg);
  }
  /* 50% {
    transform: rotateY(180deg) rotateX(1deg);
  } */
  100% {
    transform: rotateY(360deg);
  }
}
.menuList {
  // position: fixed;
  // z-index: 99999;
  // left: 50%;
  // top: 50%;
  // height: 0px;
  // width: 0px;
  // background-color: red;
}
</style>


<template>
  <div class="contaner">
    <div class="xzdiv">
      <div class="as" tabindex="1">
        <img
          src="~assets/ifont/atm-away.png"
          v-preventReClick
          @click="dohome($event)"
        />
      </div>
      <div class="as" tabindex="2">
        <img
          src="~assets/ifont/calculator.png"
          v-preventReClick
          @click="dohome($event)"
        />
      </div>
      <div class="as" tabindex="3">
        <img
          src="~assets/ifont/calendar-fill.png"
          v-preventReClick
          @click="dohome($event)"
        />
      </div>
      <div class="as" tabindex="4">
        <img
          src="~assets/ifont/integral.png"
          v-preventReClick
          @click="dohome($event)"
        />
      </div>
      <div class="as" tabindex="5">
        <img
          src="~assets/ifont/product.png"
          v-preventReClick
          @click="dohome($event)"
        />
      </div>
      <div class="as" tabindex="6">
        <img
          src="~assets/ifont/similar-product.png"
          v-preventReClick
          @click="dohome($event)"
        />
      </div>
    </div>
    <div class="menuList"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    dohome(e) {
      console.log(e.currentTarget);
      // this.$router.push({ path: "/message" });
      // let tarele = document.querySelector(".menuList");
      // tarele.style.width = "1000px";
      // tarele.style.height = "500px";
    },
  },
};
</script>

