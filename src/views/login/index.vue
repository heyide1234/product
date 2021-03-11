<template>
  <div class="content">
    <div class="login-box">
      <div>
        <div>
          <div class="img" v-if="!modes">
            <img src="~assets/logo.png" alt="" />
          </div>
          <div class="img" v-if="modes">
            <img src="~assets/logose.png" alt="" />
          </div>
          <p class="p1">在需要时厘清思路</p>
          <p class="p2">利用云杉（Spruce）让团队成员发现数据中隐藏的见解</p>
        </div>
      </div>
      <div>
        <h2>用户登录</h2>
        <form>
          <div class="user-box">
            <input type="text" name required v-model="form.username" />
            <label>用户名</label>
          </div>
          <div class="user-box">
            <input
              type="password"
              required
              v-model="form.password"
              @keyup="enterListerner($event)"
            />
            <label>密码</label>
          </div>
          <a href="javascript:void(0);" @click.prevent="login">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            登录
          </a>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modes: false,
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    enterListerner(e) {
      if (e.keyCode == 13) this.login();
    },
    login() {
      this.$https({
        method: "get",
        url: "/api/apiModel/find",
        params: {
          table: "__user",
          dataBase: "base",
          where: {
            UserName: this.form.username,
            Password: this.form.password,
          },
        },
      })
        .then((res) => {
          if (res.length > 0) {
            sessionStorage.setItem("loginName", res[0].UserName);
            sessionStorage.setItem("loginNames", res[0].Name);

            this.$router.push({ name: "status" });
          } else {
            alert("用户名或密码错误！");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onsizeclientwidth() {
      if (document.body.clientWidth < 420) {
        this.modes = true;
      } else {
        this.modes = false;
      }
    },
  },
  mounted() {
    this.onsizeclientwidth();
    // 监听窗口大小
    window.onresize = () => {
      this.onsizeclientwidth();
    };
  },
};
</script>
<style scoped>
.content {
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background: linear-gradient(#141e30, #243b55);
  background-color: rgb(250, 249, 248);
}

.login-box {
  position: absolute;
  display: flex;
  top: 50%;
  left: 50%;
  width: 80%;
  min-width: 300px;
  max-width: 500px;
  padding: 40px 0px;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px;

  /* background-color: brown; */
}
.login-box .img {
  height: 34px;
  margin-top: -22px;
  /* background-color: brown; */
  text-align: center;
  width: 100%;
}
.login-box .img img {
  height: 34px;
}
.login-box > div:nth-child(1) {
  width: 47%;
  padding: 20px 0px;
  box-sizing: border-box;
  border-right: 1px solid rgb(212, 205, 205);
}
.login-box > div:nth-child(2) {
  width: 53%;
  margin: 0 30px 0 20px;
}
.p1 {
  font-size: 17px;
  color: rgb(209, 212, 206);
  margin-top: 40px;
  padding: 0px 20px 0px 30px;
  font-family: "华文行楷";
}
.p2 {
  font-size: 12px;
  padding: 0px 20px 0px 30px;
  color: rgb(209, 212, 206);
  font-family: "华文行楷";
}

.login-box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
  font-size: 22px;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}
.login-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 14px;
  color: rgb(202, 194, 194);
  pointer-events: none;
  transition: 0.5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -30px;
  left: 0;
  color: #03e9f4;
  font-size: 12px;
}

.login-box form a {
  position: relative;
  display: inline-block;
  padding: 5px 20px;
  color: #03e9f4;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: 0.5s;
  margin-top: 0px;
  letter-spacing: 4px;
  border: 1px solid #03e9f4;
}

.login-box a:hover {
  background: #03e9f4;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
    0 0 100px #03e9f4;
}

/*.login-box a span {
  position: absolute;
  display: block;
}

 .login-box a span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #03e9f4);
  animation: btn-anim1 4s linear infinite;
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }
  50%,
  100% {
    left: 100%;
  }
}

.login-box a span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #03e9f4);
  animation: btn-anim2 4s linear infinite;
  animation-delay: 1s;
}

@keyframes btn-anim2 {
  0% {
    top: -100%;
  }
  50%,
  100% {
    top: 100%;
  }
}

.login-box a span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #03e9f4);
  animation: btn-anim3 4s linear infinite;
  animation-delay: 2s;
}

@keyframes btn-anim3 {
  0% {
    right: -100%;
  }
  50%,
  100% {
    right: 100%;
  }
}

.login-box a span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #03e9f4);
  animation: btn-anim4 4s linear infinite;
  animation-delay: 3s;
}

@keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }
  50%,
  100% {
    bottom: 100%;
  }
} */
</style>
