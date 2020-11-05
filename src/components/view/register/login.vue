<template>
  <div id="app">
    <div @click="back" class="goback">&lt;</div>
    <div class="register">
      <van-form v-show="!change">
        <h1>登录页面</h1>
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
        />
        <van-field
          v-model="psd"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
        />
        <div style="margin: 16px">
          <van-button
            @click="verify"
            round
            block
            type="info"
            native-type="submit"
          >
            登录
          </van-button>
          <van-button
            @click="change_sign"
            class="signbtn"
            round
            block
            type="info"
            native-type="submit"
          >
            去注册
          </van-button>
        </div>
      </van-form>
      <!-- <div v-show="change" class="sign">
        用户名：<input
          placeholder="登录时用户名"
          v-model="sign_username"
          type="text"
        />
        密码：<input
          placeholder="登录时密码"
          v-model="sign_psd"
          type="password"
        />
        <button @click="set">注册</button>
        <router-link to="/login">
          <button @click="change_login">去登录</button>
        </router-link>
      </div>-->
      <van-form v-show="change">
        <h1>注册页面</h1>
        <van-field
          v-model="sign_username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写注册用户名' }]"
        />
        <van-field
          v-model="sign_psd"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写注册密码' }]"
        />
        <div style="margin: 16px">
          <van-button @click="set" round block type="info" native-type="submit">
            注册
          </van-button>
          <van-button
            @click="change_login"
            class="signbtn"
            round
            block
            type="info"
            native-type="submit"
          >
            去登录
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>
import { Notify } from "vant";
export default {
  data() {
    return {
      username: "",
      psd: "",
      password: "",
      success: false,
      path: "",
      sign_psd: "",
      sign_username: "",
      change: false,
      before_path: "",
    };
  },
  created() {
    if (!this.$route.path) this.$emit("form-login", true);
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      //  这里的vm指的就是vue实例，可以用来当做this使用
      console.log(to);
      vm.before_path = from.path;
      console.log("网页地址" + from.path);
      console.log(vm);
    });
  },
  methods: {
    change_sign() {
      this.change = true;
    },
    change_login() {
      this.change = false;
      console.log(this.before_path);
    },
    verify() {
      if (
        this.username == localStorage.getItem("账号") &&
        this.psd == localStorage.getItem("密码")
      ) {
       Notify({
        message: "登录成功",
        color: 'white',
        background: "skyblue",
      });
        let success = !this.success;
        localStorage.setItem("成功？", success);
        this.$router.go(-1);
      } else {
       Notify({
        message: "账号或密码错误",
        color: "white",
        background: "red",
      });
      }
    },
    set() {
      Notify({
        message: "注册成功",
        color: "#ad0000",
        background: "#ffe1e1",
      });
      this.change = !this.change;
      let username = this.sign_username;
      let psd = this.sign_psd;
      localStorage.setItem("账号", username);
      localStorage.setItem("密码", psd);
      console.log(localStorage);
      this.sign_username = "";
      this.sign_psd = "";
    },
    back() {
      this.$router.go(-1);
      console.log("1");
    },
  },
};
</script>
<style scoped>
#app {
  width: 100%;
  height: 640px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#app h1 {
  text-align: center;
  font-size: 0.5rem;
}
#app .register {
  width: 400px;
  height: 200px;
  margin-top: -200px;
  display: flex;
  justify-content: center;
  position: relative;
}
#app .register input {
  display: block;
}
.updata {
  position: absolute;
}
.signbtn {
  margin-top: 20px;
}
.goback {
  position: absolute;
  z-index: 999;
  color: black;
  font-size: 0.45rem;
  text-align: center;
  line-height: 0.5rem;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 1rem;
  border: 1px black solid;
  background-color: white;
  cursor: pointer;
  top: 100px;
  left: 10px;
}
</style>
