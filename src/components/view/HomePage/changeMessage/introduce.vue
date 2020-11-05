<template>
  <div class="Message">
    <div class="title">
      <ul>
        <li class="goback" @click="goback">&lt;</li>
        <li>编辑个人信息</li>
        <li @click="jump">编辑</li>
      </ul>
    </div>
    <div class="personMessage">
      <ul>
        <li>用户名:{{ name }}</li>
        <li>性别：{{ sex }}</li>
        <li>爱好：{{ hobby }}</li>
        <li>生日：{{ currentBrithday }}</li>
        <li>简介：{{ brief }}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      sex: "",
      hobby: "",
      currentBrithday: "",
      brief: "",
    };
  },
  created() {
    const loading = this.$toast.loading({
      message: "加载中",
    });
    setTimeout(() => {
      this.name = localStorage.getItem("用户名");
      this.sex = localStorage.getItem("性别");
      this.brief = localStorage.getItem("简介");
      this.hobby = localStorage.getItem("爱好");
      this.currentBrithday = localStorage.getItem("生日");
      loading.clear();
    }, 500);
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    jump(){
      this.$router.push({
        path:'/ChangeMessage'
      })
    }
  },
};
</script>
<style scoped>
.Message {
  width: 100%;
  height: 100%;
  background-image: url("../images//brife-background.jpg");
}
.Message .goback {
  color: white;
  font-size: 1rem;
}
.Message .title {
  width: 100%;
  height: 8%;
}
.title ul {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.title ul li {
  width: 100%;
  color: white;
}
.title ul li:nth-child(2) {
  font-size: 0.5rem;
  font-weight: 600;
  color: black;
}
.title ul li:nth-child(3) {
  text-align: end;
  font-size: 0.5rem;
}
.personMessage {
  color: #e2e0e3;
  padding: 1rem;
}
.personMessage ul li {
  margin-bottom: 1rem;
}
.personMessage ul li:last-child {
  font-size: 0.5rem;
}
</style>