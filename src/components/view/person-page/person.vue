<template>
  <div class="person">
    <div @click="back" class="goback">&lt;</div>
    <div class="title">更多</div>
    <div class="option">
      <ul>
        <li><router-link to="/userAgreement">用户协议</router-link></li>
        <li><router-link to="/privacyPolicy">隐私政策</router-link></li>
        <li>
          <router-link to="/VIdeoFeatureStatment">视频功能声明</router-link>
        </li>
        <li @click="up">退出登录</li>
        <li>让每个人开眼，开了又开</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    back() {
      this.$router.go(-1);
      console.log("1");
    },
    up() {
      if (localStorage.getItem("成功？")) {
        this.$dialog
          .confirm({
            message: "是否退出登录？",
          })
          .then(() => {
            localStorage.removeItem("成功？");
            this.$router.go(-1);
          })
          .catch(() => {
            console.log("点击取消");
          });
      }
    },
  },
};
</script>
<style scoped>
.person {
  width: 100%;
  height: 100%;
}
.goback {
  position: absolute;
  z-index: 999;
  transform: rotate(0deg);
  color: black;
  font-size: 0.8rem;
  text-align: center;
  line-height: 1rem;
  width: 1rem;
  height: 1rem;
  border-radius: 1rem;
  cursor: pointer;
}
.person .title {
  text-align: center;
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  font-size: 0.5rem;
  font-weight: 600;
  background-color: #f7f7f7;
}
.option {
  width: 100%;
  height: 100%;
  position: relative;
}
.option ul {
  width: 100%;
  height: 100%;
}
.option li {
  width: 100%;
  height: 1.3rem;
  font-size: 0.6rem;
  line-height: 1.5rem;
  text-align: center;
}
.option li a {
  color: #4b4b4b;
}
.active {
  font-size: 0.6rem;
}
.option li:last-child {
  font-size: 0.2rem;
}
</style>