  <template>
  <div class="chidren">
    <div class="recommand">
      <div class="title">今日开眼精选</div>
      <div @click="jump(k.id)"  v-for="k in kaiyanDayhandpick" :key="k.id" class="selected">
        <div class="description">
          <span> <img :src="k.url" />
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
      <div class="banner">
        <div class="bannerTitle">
          <p>每</p>
          <p>日</p>
          <p>咨</p>
          <p>询</p>
        </div>
        <van-swipe :show-indicators="false" :loop="false" :width="200">
          <van-swipe-item v-for="(k, i) in BannerList" :key="i">
            <span> <img :src="k.image" /></span>
          </van-swipe-item>
          <van-swipe-item>
            <img :src="firstimage" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="title">昨日开眼精选</div>
      <div @click="jump(k.id)"  v-for="k in yesterday" :key="k.id" class="selected">
        <div class="description">
          <span> <img :src="k.url" />
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
        <h1>5分钟全新认知</h1>
        <ul>
          <li
            @click="jumpFive(k.id)"
            v-for="(k, index) in fiveMinute"
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
  </div>
</template>
  <script>
export default {
  data() {
    return {
      kaiyanDayhandpick: [], //搜索结果
      minute: "", //视频时长
      secondy: "", //视频时长
      showShare: false, //分享界面
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
      BannerList: [], //轮播图图片
      firstimage: "", //轮播图第一张图片,
      yesterday: [], //昨日精选
      fiveMinute: [], //五分钟认知
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
    this.getMore();
    this.getDayTitle();
    this.getFive();
    this.$emit("success", true);
  },
  methods: {
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
    //5分钟全新认知 视频挑战
    jumpFive(id) {
      this.$router.push({
        path: "/videoSearch",
        query: {
          value: "5分钟认知",
          id: id,
        },
      });
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
    getFive() {
      const discoverLoading = this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
      });
      this.axios
        .get(
          "http://api.kele8.cn/agent/http://baobab.kaiyanapp.com/api/v3/search?query=5分钟认知" +
            "udid=d8e9892b3b214de98f2f9ef7af0ea34d52491958&vc=6030101&vn=6.3.10&size=1080X2294&deviceModel=HD1900&first_channel=oppo&last_channel=oppo&system_version_code=29"
        )
        .then((res) => {
          discoverLoading.clear();
          for (let i = 0; i < res.data.itemList.length; i++) {
            if (res.data.itemList[i].type != "textCard") {
              let time = res.data.itemList[i].data.duration;
              if (time / 60 > 0) {
                this.minute = parseInt(time / 60);
                this.secondy = time - 60 * parseInt(time / 60);
              }
              if (res.data.itemList[i].type == "videoSmallCard") {
                this.fiveMinute.push({
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
          }
        });
    },
    getDayTitle() {
      this.axios
        .get(
          "http://api.kele8.cn/agent/http://baobab.kaiyanapp.com/api/v5/index/tab/feed?udid=d8e9892b3b214de98f2f9ef7af0ea34d52491958&vc=6030101&vn=6.3.10&size=1080X2294&deviceModel=HD1900&first_channel=oppo&last_channel=oppo&system_version_code=30"
        )
        .then((res) => {
          console.log(res.data.itemList.length);
          for (let i = 1; i < 6; i++) {
            let time = res.data.itemList[i].data.content.data.duration;
            if (time / 60 > 0) {
              this.minute = parseInt(time / 60);
              this.secondy = time - 60 * parseInt(time / 60);
            }

            this.kaiyanDayhandpick.push({
              url: res.data.itemList[i].data.content.data.cover.feed,
              icon: res.data.itemList[i].data.content.data.author.icon,
              name: res.data.itemList[i].data.content.data.author.name,
              title: res.data.itemList[i].data.content.data.title,
              category: res.data.itemList[i].data.content.data.category,
              id: res.data.itemList[i].data.content.data.id,
              minute: this.minute,
              secondy: this.secondy,
            });
          }
          for (let i = 0; i < res.data.itemList.length; i++) {
            if (res.data.itemList[i].type == "informationCard") {
              for (
                let j = 0;
                j < res.data.itemList[i].data.bannerList.length;
                j++
              ) {
                console.log(
                  res.data.itemList[i].data.bannerList[j].poster_image
                );
                this.BannerList.push({
                  image: res.data.itemList[i].data.bannerList[j].poster_image,
                });
              }
              this.firstimage =
                res.data.itemList[i].data.bannerList[1].poster_image;
            }
          }

          for (let i = 7; i < res.data.itemList.length; i++) {
            if (res.data.itemList[i].type == "followCard") {
              let time = res.data.itemList[i].data.content.data.duration;
              if (time / 60 > 0) {
                this.minute = parseInt(time / 60);
                this.secondy = time - 60 * parseInt(time / 60);
              }

              this.yesterday.push({
                url: res.data.itemList[i].data.content.data.cover.feed,
                icon: res.data.itemList[i].data.content.data.author.icon,
                name: res.data.itemList[i].data.content.data.author.name,
                title: res.data.itemList[i].data.content.data.title,
                category: res.data.itemList[i].data.content.data.category,
                id: res.data.itemList[i].data.content.data.id,
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
                random: random,
              });
            }
          }
        });
    },
    jump(id){
      this.$router.push({
        path: "/VideoPlay",
        query: {
          id: id,
        },
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
  },
};
</script>
  <style scoped>
.chidren {
  width: 100%;
  height: 100%;
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
.banner {
  width: 95%;
  margin: 0 auto;
  overflow: hidden;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  padding-left: 2rem;
  position: relative;
  border-top: 1px black solid;
  border-bottom: 1px black solid;
  margin-bottom: 0.3rem;
  margin-top: 0.3rem;
}
.bannerTitle {
  position: absolute;
  font-size: 0.6rem;
  font-weight: 600;
  left: 0.8rem;
  top: 0.8rem;
}
.bannerTitle p {
  margin-bottom: 0.2rem;
}
.banner img {
  width: 5rem;
  height: 5rem;
  float: left;
}
.bannerlist {
  border: 1px black solid;
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
.current-list span img{
  width: .4rem;
  height: .4rem;
  position: absolute;
  right: 0;
  top: -.1rem;
}
</style>