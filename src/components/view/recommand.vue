<template>
  <div class="chidren">
    <div class="recommand">
      <div class="title">每日开眼推荐</div>
      <div v-for="(k, index) in searchAll" :key="index" class="selected">
        <div @click="getId(k.id)" class="description">
         <span> <img :src="k.img" />
          <p>
            0:{{ k.minute >= 10 ? k.minute : "0" + k.minute }}:{{
              k.secondy >= 10 ? k.secondy : "0" + k.secondy
            }}
          </p>
         </span>
         
        </div>
        <div class="brief">
          <ul>
            <li>
              <img :src="k.icon" />
            </li>
            <li>
              <h1>{{ k.title }}</h1>
              <p>{{ k.name }}:{{ k.category }}</p>
            </li>
            <li>
              <img @click="share" src="./images/分享 (1).png" />
              <van-share-sheet
                v-model="showShare"
                title="立即分享给好友"
                :options="options"
                @select="share"
              />
            </li>
          </ul>
        </div>
      </div>
      <div class="current-list">
        <h1>每日创意灵感</h1>
        <ul>
          <li
            @click="jumpInnovate(k.id)"
            v-for="(k, index) in dayInnovate"
            :key="index"
          >
            <img :src="k.img" />
            <div class="font-flex">
              <h2>{{ k.title }}</h2>
              <span>{{ k.category }}
                <img src="./images/分享 (1).png"/>
              </span>
              <!-- <p>
                0:{{ k.minute >= 10 ? k.minute : "0" + k.minute }}:{{
                  k.secondy >= 10 ? k.secondy : "0" + k.secondy
                }}
              </p> -->
            </div>
          </li>
        </ul>
      </div>
      <div class="current-list">
        <h1>体育推荐</h1>
        <ul>
          <li
            @click="jumpSports(k.id)"
            v-for="(k, index) in daySports"
            :key="index"
          >
            <img :src="k.img" />
            <div class="font-flex">
              <h2>{{ k.title }}</h2>
              <span>{{ k.category }}
                  <img src="./images/分享 (1).png"/>
              </span>
              <!-- <p>
                0:{{ k.minute >= 10 ? k.minute : "0" + k.minute }}:{{
                  k.secondy >= 10 ? k.secondy : "0" + k.secondy
                }}
              </p> -->
            </div>
          </li>
        </ul>
      </div>
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div class="current-list">
            <h1>更多推荐</h1>
            <ul>
              <li
                @click="jumpRandom(k.id,k.random)"
                v-for="(k, index) in moreSearchAll"
                :key="index"
              >
                <img :src="k.img" />
                <div class="font-flex">
                  <h2>{{ k.title }}</h2>
                  <span>{{ k.category }}
                    <img src="./images/分享 (1).png"/>
                  </span>
                  <!-- <p>
                0:{{ k.minute >= 10 ? k.minute : "0" + k.minute }}:{{
                  k.secondy >= 10 ? k.secondy : "0" + k.secondy
                }}
              </p> -->
                </div>
              </li>
            </ul>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      video: "",
      videoAll: [],
      icon: "",
      title: "",
      name: "",
      category: "",
      attention: "关注",
      currentVideoId: "",
      attetionAll: [],
      attentionType: false,
      showShare: false,
      options: [
        [
          { name: "微信", icon: "wechat" },
          { name: "微博", icon: "weibo" },
          { name: "QQ", icon: "qq" },
        ],
        [
          { name: "复制链接", icon: "link" },
          { name: "分享海报", icon: "poster" },
          { name: "二维码", icon: "qrcode" },
        ],
      ],
      searchAll: [],
      dayInnovate: [], //每日创意灵感
      daySports: [], //体育推荐
      stochastic: [
        "艺术",
        "街头",
        "摄影日常",
        "创意广告",
        "美食",
        "旅行",
        "健身",
        "汽车",
        "黑科技",
      ], //更多推荐
      moreSearchAll: [], //更多推荐渲染数据
      list: 0,
      loading: false,
      finished: false,
      refreshing: false,
    };
  },
  created() {
    if (localStorage.getItem("关注")) {
      this.attetionAll = JSON.parse(localStorage.getItem("关注"));
    }
    this.$emit("success", true);
    this.getRecommand();
    this.getDayInnovate();
    this.getSprots();
    this.getMore();
  },
  methods: {
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }

        for (let i = 0; i < 1; i++) {
          this.list + 1;
          this.getMore();
        }
        this.loading = false;

        if (this.list.length >= 5  ) {
          this.finished = true;
        }
      }, 1000);
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    seek(e, id) {
      console.log(id);
      if (localStorage.getItem("关注") == id) {
        e.target.color = "blue";
        e.target.innerHTML = "取消关注";
      }
      if (e.target.innerHTML == "+关注") {
        e.target.innerHTML = "取消关注";
        e.target.style.color = "blue";
        // localStorage.sidebar("关注的用户",)
        for (let i = 0; i < this.attetionAll.length; i++) {
          if (this.attetionAll[i] == id) {
            this.attetionAll.splice(i, 1);
          }
        }
        this.attetionAll.push(id);
        localStorage.setItem("关注", JSON.stringify(this.attetionAll));
        Toast.success("关注成功");
        this.attentionType = true;
      } else {
        e.target.innerHTML = "+关注";
        Toast.success("已取消关注");
        e.target.style.color = "";
        for (let i = 0; i < this.attetionAll.length; i++) {
          if (this.attetionAll[i] == id) {
            this.attetionAll.splice(i, 1);
          }
          localStorage.setItem("关注", JSON.stringify(this.attetionAll));
        }
        this.attentionType = false;
      }
    },
    getId(id) {
      this.$router.push({
        path: "/videoSearch",
        query: {
          value: "推荐",
          id: id,
        },
      });
      console.log(id);
      this.$emit("success", false);
    },
    share(option) {
      //用于验证是否登录，登录可使用其功能，未登录则跳转登录页面
      //分享功能
      if (localStorage.getItem("成功？")) {
        this.showShare = true;
        console.log(option.name);
        if (this.current_share === false) {
          console.log("分享成功");
          this.current_share = !this.current_share;
        }
        this.active = true;
      } else {
        let option = confirm("请先登录");
        if (option == true) {
          this.$router.push({
            path: "/login",
          });
        }
      }
    },
    getRecommand() {
      const discoverLoading = this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
      });
      this.axios
        .get(
          "http://api.kele8.cn/agent/http://baobab.kaiyanapp.com/api/v3/search?query=" +
            "推荐" +
            "udid=d8e9892b3b214de98f2f9ef7af0ea34d52491958&vc=6030101&vn=6.3.10&size=1080X2294&deviceModel=HD1900&first_channel=oppo&last_channel=oppo&system_version_code=29"
        )
        .then((res) => {
          discoverLoading.clear();
          for (let i = 0; i < res.data.itemList.length - 1; i++) {
            let time = res.data.itemList[i].data.duration;
            if (time / 60 > 0) {
              this.minute = parseInt(time / 60);
              this.secondy = time - 60 * parseInt(time / 60);
            }
            if (res.data.itemList[i].type == "videoSmallCard") {
              console.log(res.data.itemList[i]);
              this.searchAll.push({
                name: res.data.itemList[i].data.author.name,
                img: res.data.itemList[i].data.cover.feed,
                 icon:res.data.itemList[i].data.author.icon,
                category: res.data.itemList[i].data.category,
                description: res.data.itemList[i].data.description,
                duration: res.data.itemList[i].data.duration,
                title: res.data.itemList[i].data.title,
                id: res.data.itemList[i].data.id,
                minute: this.minute,
                secondy: this.secondy,
              });
            }
          }
        });
    },
    getDayInnovate() {
      const discoverLoading = this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
      });
      this.axios
        .get(
          "http://api.kele8.cn/agent/http://baobab.kaiyanapp.com/api/v3/search?query=" +
            "每日创意灵感" +
            "udid=d8e9892b3b214de98f2f9ef7af0ea34d52491958&vc=6030101&vn=6.3.10&size=1080X2294&deviceModel=HD1900&first_channel=oppo&last_channel=oppo&system_version_code=29"
        )
        .then((res) => {
          discoverLoading.clear();
          for (let i = 0; i < res.data.itemList.length - 1; i++) {
            let time = res.data.itemList[i].data.duration;
            if (time / 60 > 0) {
              this.minute = parseInt(time / 60);
              this.secondy = time - 60 * parseInt(time / 60);
            }
            if (res.data.itemList[i].type == "videoSmallCard") {
              console.log(res.data.itemList[i]);
              this.dayInnovate.push({
                name: res.data.itemList[i].data.author.name,
                img: res.data.itemList[i].data.cover.feed,
                category: res.data.itemList[i].data.category,
                description: res.data.itemList[i].data.description,
                duration: res.data.itemList[i].data.duration,
                title: res.data.itemList[i].data.title,
                id: res.data.itemList[i].data.id,
                minute: this.minute,
                secondy: this.secondy,
              });
            }
          }
        });
    },
    getSprots() {
      const discoverLoading = this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
      });
      this.axios
        .get(
          "http://api.kele8.cn/agent/http://baobab.kaiyanapp.com/api/v3/search?query=" +
            "体育推荐" +
            "udid=d8e9892b3b214de98f2f9ef7af0ea34d52491958&vc=6030101&vn=6.3.10&size=1080X2294&deviceModel=HD1900&first_channel=oppo&last_channel=oppo&system_version_code=29"
        )
        .then((res) => {
          discoverLoading.clear();
          for (let i = 0; i < res.data.itemList.length - 1; i++) {
            let time = res.data.itemList[i].data.duration;
            if (time / 60 > 0) {
              this.minute = parseInt(time / 60);
              this.secondy = time - 60 * parseInt(time / 60);
            }
            if (res.data.itemList[i].type == "videoSmallCard") {
              this.daySports.push({
                name: res.data.itemList[i].data.author.name,
                img: res.data.itemList[i].data.cover.feed,
                category: res.data.itemList[i].data.category,
                description: res.data.itemList[i].data.description,
                duration: res.data.itemList[i].data.duration,
                title: res.data.itemList[i].data.title,
                id: res.data.itemList[i].data.id,
                minute: this.minute,
                secondy: this.secondy,
              });
            }
          }
        });
    },
    getMore() {
      let num = Math.floor(Math.random() * 10);
      let random = this.stochastic[num];
      console.log(random);
      this.axios
        .get(
          "http://api.kele8.cn/agent/http://baobab.kaiyanapp.com/api/v3/search?query=" +
            random +
            "udid=d8e9892b3b214de98f2f9ef7af0ea34d52491958&vc=6030101&vn=6.3.10&size=1080X2294&deviceModel=HD1900&first_channel=oppo&last_channel=oppo&system_version_code=29"
        )
        .then((res) => {
          for (let i = 0; i < res.data.itemList.length - 1; i++) {
            let time = res.data.itemList[i].data.duration;
            if (time / 60 > 0) {
              this.minute = parseInt(time / 60);
              this.secondy = time - 60 * parseInt(time / 60);
            }
            if (res.data.itemList[i].type == "videoSmallCard") {
              this.moreSearchAll.push({
                name: res.data.itemList[i].data.author.name,
                img: res.data.itemList[i].data.cover.feed,
                category: res.data.itemList[i].data.category,
                description: res.data.itemList[i].data.description,
                duration: res.data.itemList[i].data.duration,
                title: res.data.itemList[i].data.title,
                id: res.data.itemList[i].data.id,
                minute: this.minute,
                secondy: this.secondy,
                random:random
              });
            }
          }
        });
    },

    jumpInnovate(id) {
      this.$emit("success", false);
      this.$router.push({
        path: "/videoSearch",
        query: {
          value: "每日创意灵感",
          id: id,
        },
      });
    },
    jumpSports(id) {
      this.$emit("success", false);
      this.$router.push({
        path: "/videoSearch",
        query: {
          value: "体育推荐",
          id: id,
        },
      });
    },
     jumpRandom(id,val){
        this.$router.push({
        path: "/videoSearch",
        query: {
          value: val,
          id: id,
        },
      });
    }
  },
};
</script>
<style scoped>
.chidren {
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
}
.chidren .recommand {
  width: 100%;
  height: 100%;
  position: relative;
  top: 1.4rem;
}
.title {
  margin: 0.3rem 0;
  font-size: 0.5rem;
  font-weight: 600;
  margin-left: 0.45rem;
  width: 80%;
}
.selected {
  width: 100%;
  height: 25%;
  margin-bottom: 2.7rem;
}
.selected .attentionType {
  color: red;
}
.description {
  width: 100%;
  height: 120%;
  position: relative;
  overflow: hidden; 
}
.description span img {
  width:100%;
  height: 100%;
  position: absolute;
}
.description span{
  display: block;
  width: 90%;
  height: 100%;
  margin: 0 auto;
  position: relative;
}
.description p {
  position: absolute;
  z-index: 999;
  right: 0;
  bottom: 0;
  color: white;
  font-weight: 600;
  font-size: 0.2rem;
  background-color: black;
}
.brief {
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: space-around;
}
.brief ul {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.brief ul li {
  width: 100%;
}
.brief ul li:nth-child(2) {
  margin-left: -1rem;
  color: #4b4b4b;
}
.brief ul li:nth-child(2) h1 {
  width: 5.5rem;
  margin-bottom: 0.1rem;
  color: black;
  font-weight: 600;
  font-size: 0.2rem;
}
.brief ul li img {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  margin-left: 0.4rem;
}
.brief ul li:last-child {
  display: flex;
  justify-content: center;
}
.brief ul li:last-child img {
  width: 0.5rem;
  height: 0.5rem;
}
.current-list {
  width: 95%;
  margin: 0 auto;
}
.current-list h1 {
  padding: 0.2rem 0.2rem;
  font-weight: 600;
  font-size: 0.4rem;
}
.current-list img {
  width: 40%;
  height: 20%;
}
.current-list ul {
  width: 100%;
  height: 100%;
  padding-left: 0.2rem;
}
.current-list ul li {
  width: 100%;
  margin-bottom:.3rem;
  position: relative;
  cursor: pointer;
}
.current-list h2 {
  position: absolute;
  left: 45%;
  top: 10%;
  font-weight: 600;
  font-size: 0.3rem;
}
.current-list span {
  position: absolute;
  color: #cbcbcb;
  left: 45%;
  top: 85%;
  display: inline-block;
  font-weight: 600;
  font-size: 0.2rem;
  width: 50%;
}
.current-list span img{
  width: .4rem;
  height: .4rem;
  position: absolute;
  right: 0;
  top: -.1rem;
}
</style>