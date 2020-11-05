<template>
  <div class="result">
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <div v-show="!show" class="hot">
      <ul>
        <h1>搜索历史</h1>
        <p @click="clear">清空记录</p>
        <li @click="title(k.title)" v-for="(k, i) in history" :key="i">
          {{ k.title }}
        </li>
      </ul>
    </div>
    <div v-show="!show" class="hot">
      <ul>
        <h1>最近热搜</h1>
        <li @click="title(k.title)" v-for="(k, i) in hotTitle" :key="i">
          {{ k.title }}
        </li>
      </ul>
    </div>
    <!-- <div v-show="show" class="current-list">
      <h1>{{ searchAll.length > 0 ? "搜索结果" : "" }}</h1>
      <ul>
        <li @click="jump(k.id)" v-for="(k, index) in searchAll" :key="index">
            <img :src="k.img" />
            <p>
              0:{{ k.minute >= 10 ? k.minute : "0" + k.minute }}:{{
                k.secondy >= 10 ? k.secondy : "0" + k.secondy
              }}
            </p>
            <h2>{{ k.title }}</h2>
            <p>{{ k.category }}</p>
            <p>{{ k.name }}</p>
        </li>
      </ul>
    </div> -->
    <div v-show="show" class="current-list">
      <h1>{{ searchAll.length > 0 ? "搜索结果" : "" }}</h1>
      <ul>
        <li @click="jump(k.id)" v-for="(k, index) in searchAll" :key="index">
          <img :src="k.img" />
          <div class="font-flex">
            <h2>{{ k.title }}</h2>
            <span>{{ k.category }}
              <img src="./images/分享 (1).png">
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
    <van-pull-refresh v-show="show" v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="current-list">
          <h1>{{ searchAll.length > 0 ? "相关推荐" : "" }}</h1>
          <ul>
            <li
              @click="jumpRandom(k.id, k.random)"
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
</template>
<script>
export default {
  data() {
    return {
      isLoading: false,
      value: "", //输入框输入的值
      hotTitle: [], //热门标题
      show: false, //热门标题是否展示
      searchAll: [], //搜索内容的视频信息
      beforeVal: "",
      likeSearchAll: [], //相似内容
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
      common: "",
      history: [], //搜索历史
    };
  },
  destroyed() {
    this.beforeVal = this.value;
    console.log("摧毁前", this.beforeVal);
  },
  created() {
    if(localStorage.getItem("搜索历史")){
      this.history=JSON.parse(localStorage.getItem("搜索历史"))
    }
    console.log("创建前", this.beforeVal);
    //热搜
    this.hot();
  },
  watch: {
    value(afther, old) {
      console.log(old);
      if (!afther) {
        this.show = false;
        this.searchAll = [];
        this.moreSearchAll = [];
      }
      if (afther) {
        this.show = true;
        this.history.push(afther);
      }
    },
  },
  methods: {
    hot() {
      const discoverLoading = this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
      });
      this.axios
        .get(
          " http://api.kele8.cn/agent/http://baobab.kaiyanapp.com/api/v3/queries/hot?udid=d8e9892b3b214de98f2f9ef7af0ea34d52491958&vc=6030101&vn=6.3.10&size=1080X2294&deviceModel=HD1900&first_channel=oppo&last_channel=oppo&system_version_code=29"
        )
        .then((res) => {
          discoverLoading.clear();
          for (let i = 0; i < res.data.length; i++) {
            this.hotTitle.push({
              title: res.data[i],
            });
          }
        });
      //热搜请求结束
      //搜索内容渲染层
    },
    onSearch(val) {
      this.show = true;
      this.searchAll = [];
      this.moreSearchAll = [];
      console.log(val);
      for (let i = 0; i < this.history.length; i++) {
        if (this.history[i].title == this.value) {
          this.history.splice(i, 1);
        }
      }
      this.history.push({
        title: this.value,
      });
      this.axios
        .get(
          "http://api.kele8.cn/agent/http://baobab.kaiyanapp.com/api/v3/search?query=" +
            this.value +
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
              this.searchAll.push({
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
    onCancel() {
      console.log("点击取消");
      this.$router.go(-1);
    },
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

        if (this.list.length >= 5) {
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
    title(title) {
      console.log(title);
      this.value = title;
      for (let i = 0; i < this.history.length; i++) {
        if (this.history[i].title == this.value) {
          this.history.splice(i, 1);
        }
      }
      this.history.push({
        title: this.value,
      });
        localStorage.setItem("搜索历史", JSON.stringify(this.history));
      this.axios
        .get(
          "http://api.kele8.cn/agent/http://baobab.kaiyanapp.com/api/v3/search?query=" +
            title +
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
              this.searchAll.push({
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
    jump(id) {
      console.log(this.value);
      console.log(id);
      this.$router.push({
        path: "/videoSearch",
        query: {
          value: this.value,
          id: id,
        },
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
                random: random,
              });
            }
          }
        });
    },
    jumpRandom(id, val) {
      this.$router.push({
        path: "/videoSearch",
        query: {
          value: val,
          id: id,
        },
      });
    },
    clear(){
      localStorage.removeItem("搜索历史")
      location.reload()
    },
  },
};
</script>
<style scoped>
.result {
  width: 100%;
  max-height: 100%;
  overflow: hidden;
  overflow-y: scroll;
}
.hot {
  width: 100%;
  height: 80%;
  position: relative;
}
.hot ul h1 {
  margin-bottom: 0.5rem;
  font-weight: 600;
  font-size: 0.5rem;
}
.hot p{
  position: absolute;
  right: .3rem;
  top: .6rem;
  color: skyblue;
  font-weight: 600;
}
.hot ul {
  width: 100%;
  height: 100%;
  padding-top: 0.5rem;
  padding-left: 0.5rem;
}
.hot ul li {
  width: 100%;
  margin-bottom: 0.3rem;
  font-size: 0.4rem;
  color: skyblue;
}
.current-list {
  width: 95%;
  margin:0 auto;
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
  margin-bottom: .2rem;
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
.current-list span img {
  width: 0.4rem;
  height: 0.4rem;
  position: absolute;
  right: 0;
  top: -0.1rem;
}
</style>