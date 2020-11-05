<template>
  <div class="homepage">
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
      @select="share"
    />
    <div class="BackAndShare">
      <div @click="back" class="goback">&lt;</div>
      <img @click="share($event)" src="./images//分享.png" />
    </div>

    <div class="titleImg"></div>
    <div class="headPortrait">
      <img src="./images//head.jpg" />
    </div>
    <div class="Message">
      <div class="personTitle">
        <h1>{{Username}}</h1>
        <p>{{ currentBrithday }}</p>
      </div>
      <div class="changeMessagge">
        <router-link to="/ChangeMessage">
          <button>编辑信息</button>
        </router-link>
      </div>
      <router-link to="/introduce">
        <div class="seek">&lt;</div>
      </router-link>
    </div>
    <div class="MessageInstrument">
      <ul>
        <li>0
          <p>作品</p>
        </li>
        <li>
          {{ AimNum  }}
          <p>关注</p>
        </li>
        <li>0
          <p>粉丝</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showShare: false,
      options: [
        { name: "微信", icon: "wechat" },
        { name: "微博", icon: "weibo" },
        { name: "复制链接", icon: "link" },
        { name: "分享海报", icon: "poster" },
      ],
      currentBrithday: "",
      numone: "",
      numtwo: "",
      numthree: "",
      Username:'',
      AimNum:'',
    };
  },
  created() {
   this.AimNum= JSON.parse(localStorage.getItem("关注")).length
    this.Username=localStorage.getItem("用户名")
    const loading = this.$toast.loading({
      message: "加载中",
    });
    setTimeout(() => {
      this.currentBrithday = localStorage.getItem("生日");
      loading.clear();
      this.numone = Math.floor(Math.random() * 10);
      this.numtwo = this.numone+1;
      this.numthree = this.numtwo+2;
    }, 500);
  },
  methods: {
    back() {
      this.$router.go(-1);
      console.log("1");
    },
    share(option) {
      //用于验证是否登录，登录可使用其功能，未登录则跳转登录页面
      //分享功能
      this.showShare = true;
      console.log(option.name);
    },
  },
};
</script>
<style scoped>
.homepage {
  width: 100%;
  height: 640px;
  position: relative;
}
a {
  color: black;
}
.BackAndShare {
  width: 100%;
  height: 5%;
  position: relative;
  z-index: 999;
}
.goback {
  position: absolute;
  z-index: 999;
  color: white;
  font-size: 0.8rem;
  text-align: center;
  line-height: 1rem;
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 1rem;
  cursor: pointer;
  bottom: 0;
  left: 0;
}
.BackAndShare img {
  width: 0.7rem;
  height: 0.7rem;
  position: absolute;
  right: 0;
  bottom: 0;
}
.homepage .titleImg {
  position: absolute;
  width: 100%;
  height: 15%;
  overflow: hidden;
  top: 0;
  background: url("./images//f6969e51a5867bff779e32ef1fdb0b2.jpg") no-repeat
    left top;
}
.homepage .titleImg img {
  width: 100%;
  height: 10%;
  position: absolute;
}
.homepage .headPortrait {
  width: 95%;
  height: 10%;
  margin: 0 auto;
  position: relative;
  margin-top: 0.4rem;
}
.homepage .headPortrait img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: absolute;
  bottom: 0;
}
.homepage .Message {
  width: 95%;
  height: 6%;
  margin: 0 auto;
  position: relative;
  margin-bottom: 0.5rem;
}
.homepage .Message .personTitle {
  width: 95%;
  height: 100%;
  position: absolute;
  left: 0;
}
.homepage .Message .personTitle h1 {
  font-weight: 600;
  font-size: 0.5rem;
}
.homepage .Message .personTitle p {
  color: #4b4b4b;
}
.homepage .Message .changeMessagge {
  position: absolute;
  right: 0;
}
.homepage .Message .seek {
  color: #4b4b4b;
  position: absolute;
  right: 0;
  bottom: 0;
  transform: rotate(180deg);
}
.MessageInstrument {
  width: 100%;
  height: 8%;
  background-color: #f8f8f8;
}
.MessageInstrument ul {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.MessageInstrument ul li {
  width: 100%;
  color: #4b4b4b;
  text-align: center;
  font-size: 0.5rem;
  font-weight: 600;
}
.MessageInstrument ul li p {
  font-weight: 500;
  font-size: 0.3rem;
}
</style>
