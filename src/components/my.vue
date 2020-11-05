<template>
  <div v-show="show" id="my-page">
    <router-view @from-mycollect="a" @from-login="text" />
    <div class="register">
      <div class="username">
        <img @click="up" v-show="!head" src="../images/yonghu.png" />
        <img @click="up" v-show="head" src="../images//head.jpg" />
        <p @click="up" v-show="!updata">点击登录</p>
        <p @click="up" class="red" v-show="updata">{{Username}}</p>
        <p v-show="updata">查看个人主页></p>
        <div @click="more" class="more">
          <img src="../images/更多.png" />
        </div>
      </div>
      <div class="instrument">
        <div @click="collect_click" class="collect">
          <img src="../images/收 藏-产品详情.png" />
          <span @click="text">收藏</span>
        </div>
        <div class="line">|</div>
        <div class="donwload">
          <img src="../images/download.png" />
          <span>下载</span>
        </div>
      </div>
      <div class="option">
        <ul>
          <li @click="jumpAim">我的关注</li>
          <li @click="jumpRecord">观看记录</li>
          <li @click="test">我的徽章</li>
          <li @click="test">功能设置</li>
          <li @click="test">成为作者</li>
          <li @click="test">意见反馈</li>
          <li>感谢您的支持,version 6.3.8 build 2020-10-17</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      show: true,
      updata: false,
      page: false,
      head: false,
      loading: "",
      Username:''
    };
  },
  created() {
   this.Username=localStorage.getItem("用户名")
    this.loading = this.$toast.loading({
      message: "加载中...",
      forbidClick: true,
      loadingType: "spinner",
    });
    if (localStorage.getItem("成功？")) {
      this.updata = true;
      this.show = true;
      this.head = true;
    }
  },
  mounted() {
    this.loading.clear();
    if (this.$route.path == "/my") {
      this.$emit("MyComponentDestroyed", true);
    }
  },
  destroyed() {
    console.log("组件被卸载");
    this.$emit("MyComponentDestroyed", false);
  },
  methods: {
    a(data) {
      console.log(data);
      console.log("1");
    },
    text(data) {
      console.log(localStorage.getItem("id"));
      this.show = data;
      console.log(data);
    },
    up() {
      if (localStorage.getItem("成功？")) {
        // let updata = confirm("是否确认退出当前账号？");
        // if (updata == true) {
        //   localStorage.removeItem("账号");
        //   localStorage.removeItem("密码");
        //   localStorage.removeItem("成功？");
        //   location.reload();
        // } else {
        //   return;
        // }
        this.$router.push({
          path: "/HomePage",
        });
      } else {
        this.$router.push({
          path: "/login",
        });
      }
      this.$emit("from-my", this.page);
      if (localStorage.getItem("成功？")) {
        console.log("1");
      } else {
        console.log("2");
      }
    },
    collect_click() {
      if (localStorage.getItem("成功？")) {
        this.$router.push({
          path: "/mycollect",
        });
      } else {
        this.$dialog
          .confirm({
            title: "未登录",
            message: "是否前去登录？",
          })
          .then(() => {
            this.$router.push({
              path: "/login",
            });
          })
          .catch(() => {
            console.log("点击取消");
          });
      }
      // if (!localStorage.getItem("成功？")) {
      //   let sure = confirm("您还没有登录");
      //   if (sure === true) {
      //     this.$router.push({
      //       path: "/login",
      //     });
      //   }
      // }
    },
    more() {
      if (localStorage.getItem("成功？")) {
        this.$router.push({
          path: "/person",
        });
      } else {
        this.$dialog
          .confirm({
            title: "未登录",
            message: "是否前去登录？",
          })
          .then(() => {
            this.$router.push({
              path: "/login",
            });
          })
          .catch(() => {
            console.log("点击取消");
          });
      }
    },
    test() {
      Toast.success("功能开发中，尽请期待");
    },
    jumpAim() {
      if (localStorage.getItem("成功？")) {
        this.$router.push({
        path: "/attection",
      });
      } else {
        this.$dialog
          .confirm({
            title: "未登录",
            message: "是否前去登录？",
          })
          .then(() => {
            this.$router.push({
              path: "/login",
            });
          })
          .catch(() => {
            console.log("点击取消");
          });
      }
    },
    jumpRecord() {
       if (localStorage.getItem("成功？")) {
       this.$router.push({
        path: "/record",
      });
      } else {
        this.$dialog
          .confirm({
            title: "未登录",
            message: "是否前去登录？",
          })
          .then(() => {
            this.$router.push({
              path: "/login",
            });
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
#my-page {
  width: 100%;
 height: 100%;
}
#my-page .register {
  width: 100%;
}
#my-page .register .username {
  width: 100%;
  background-color: #f8f8f8;
  justify-content: center;
  text-align: center;
  display: flex;
}
#my-page .register .username img {
  width: 2rem;
  height: 2rem;
  margin-top: 1.2rem;
  margin-bottom: 1.2rem;
  border-radius: 50%;
}
#my-page .register .username p {
  font-size: 0.1rem;
  font-weight: 600;
  position: absolute;
  top: 3.6rem;
}
#my-page .register .username .more img {
  position: absolute;
  top: 0;
  right: .3rem;
  width: 0.4rem;
  height: 0.4rem;
}
#my-page .register .username p:nth-child(5) {
  top: 4rem;
}
.instrument {
  display: flex;
  justify-content: space-around;
  background-color: #f8f8f8;
  color: #4b4b4b;
  width: 100%;
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid grey;
}
.instrument span {
  vertical-align: middle;
}
.instrument img {
  width: 20px;
  height: 20px;
  vertical-align: middle;
  margin-right: 20px;
}
.red {
  color: red;
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
  font-size: 0.4rem;
  color: #4b4b4b;
  line-height: 1.5rem;
  text-align: center;
}
.option li:last-child {
  font-size: 0.2rem;
}
</style>