<template>
  <div id="collect">
    <div class="title">
      <div @click="back" class="goback">&lt;</div>
      <ul>
        <li>我的收藏</li>
      </ul>
    </div>
    <h1 v-show="!title">收藏夹为空</h1>
    <div class="current-list">
      <ul>
        <li @click="getId(index)" v-for="(k, index) in video_img" :key="index">
          <van-swipe-cell>
            <img :src="k.img" />
            <h2>{{ k.title }}</h2>
            <span class="current-title">{{ k.category }}</span>
            <!-- <span>
            0:{{ k.minute >= 10 ? k.minute : "0" + k.minute }}:{{
                k.secondy >= 10 ? k.secondy : "0" + k.secondy
            }}</span
          > -->
            <template #right>
              <van-button
                @click="movevideo(k.id)"
                square
                text="移除"
                type="danger"
                class="delete-button"
              />
            </template>
          </van-swipe-cell>
        </li>
      </ul>
    </div>
    <div class="current-list">
      <ul>
        <li
          @click="jump(k.id, k.value)"
          v-for="(k, index) in SearchVideoRecord"
          :key="index"
        >
          <van-swipe-cell>
            <img :src="k.img" />
            <h2>{{ k.title }}</h2>
            <span class="current-title">{{ k.category }}</span>
            <!-- <span>
            0:{{ k.minute >= 10 ? k.minute : "0" + k.minute }}:{{
                k.secondy >= 10 ? k.secondy : "0" + k.secondy
            }}</span
          > -->
            <template #right>
              <van-button
                @click="movevideo(k.id)"
                square
                text="删除记录"
                type="danger"
                class="delete-button"
              />
            </template>
          </van-swipe-cell>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    video_collect: Array,
  },
  data() {
    return {
      video_img: [],
      minute: "",
      secondy: "",
      currentVideoId: "",
      title: false,
      obj: [],
      SearchVideoRecord: [],
      kaiyanDayhandpick:{}
    };
  },
  created() {
    this.getVideoRecordFromSearch();
    this.getVideoMessage();
    if (localStorage.getItem("videoAll")) {
      this.obj = JSON.parse(localStorage.getItem("videoAll"));
    }
  },
  methods: {
    movevideo(id) {
      console.log(id);
      console.log(localStorage.getItem("videoAll"));
      for (let i = 0; i < this.obj.length; i++) {
        if (this.obj[i] == id) {
          this.obj.splice(i, 1);
        }
      }
      localStorage.setItem("videoAll", JSON.stringify(this.obj));
      location.reload();
    },
    back() {
      this.$router.go(-1);
    },
    getId(index) {
      this.currentVideoId = this.video_img[index].id;
      console.log(this.currentVideoId);
      this.$router.push({
        path: "/videoPlay",
        query: { id: this.currentVideoId },
      });
      this.$emit("success", false);
    },
    jump(id, value) {
      this.$router.push({
        path: "/videoSearch",
        query: {
          value: value,
          id: id,
        },
      });
    },
    getVideoMessage() {
      const collectLoading = this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
      });
      if (localStorage.getItem("videoAll")) {
        if (localStorage.getItem("成功？")) {
          this.VideoMessage = JSON.parse(localStorage.getItem("videoAll"));
          this.axios.get(" /api/selected").then((res) => {
            collectLoading.clear();
            for (let i = 0; i < res.data.itemList.length - 1; i++) {
              for (let j = 0; j < this.VideoMessage.length; j++) {
                if (this.VideoMessage[j] == res.data.itemList[i].data.id) {
                  this.title = true;
                  console.log("成功");
                  let time = res.data.itemList[i].data.duration;
                  if (time / 60 > 0) {
                    this.minute = parseInt(time / 60);
                    this.secondy = time - 60 * parseInt(time / 60);
                  }
                  this.video_img.push({
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
        }
      }
    },
    getVideoRecordFromSearch() {
      const collectLoading = this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
      });
      if (localStorage.getItem("搜索api数据")) {
        this.title = true;
        this.SearchApi = JSON.parse(localStorage.getItem("搜索api数据"));
        for (let i = 0; i < this.SearchApi.length - 1; i++) {
          this.axios
            .get(
              "http://api.kele8.cn/agent/http://baobab.kaiyanapp.com/api/v3/search?query=" +
                this.SearchApi[i] +
                "udid=d8e9892b3b214de98f2f9ef7af0ea34d52491958&vc=6030101&vn=6.3.10&size=1080X2294&deviceModel=HD1900&first_channel=oppo&last_channel=oppo&system_version_code=29"
            )
            .then((res) => {
              collectLoading.clear();
              let Message = this.SearchApi[i];
              for (let i = 0; i < res.data.itemList.length - 1; i++) {
                for (let j = 0; j < this.obj.length; j++) {
                  if (this.obj[j] == res.data.itemList[i].data.id) {
                    console.log("搜索api的id被找到了");
                    this.SearchVideoRecord.push({
                      img: res.data.itemList[i].data.cover.feed,
                      category: res.data.itemList[i].data.category,
                      title: res.data.itemList[i].data.title,
                      id: res.data.itemList[i].data.id,
                      value: Message,
                    });
                  }
                }
              }
            });
        }
      }
    },
    getVideoRecordFromDayreport() {
      if (localStorage.getItem("搜索api数据")) {
        this.title = true;
        this.SearchApi = JSON.parse(localStorage.getItem("搜索api数据"));
        for (let i = 0; i < this.SearchApi.length - 1; i++) {
          this.axios;
          this.axios
            .get(
              "http://api.kele8.cn/agent/http://baobab.kaiyanapp.com/api/v5/index/tab/feed?udid=d8e9892b3b214de98f2f9ef7af0ea34d52491958&vc=6030101&vn=6.3.10&size=1080X2294&deviceModel=HD1900&first_channel=oppo&last_channel=oppo&system_version_code=30"
            )
            .then((res) => {
              for (let i = 0; i < res.data.itemList.length - 1; i++) {
                for (let j = 0; j < this.obj.length; j++) {
                  if (this.obj[j] == res.data.itemList[i].data.id) {
                    console.log("搜索api的id被找到了");

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
                }
              }
            });
        }
      }
    },
  },
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
}
#collect {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  position: relative;
}
.title {
  width: 100%;
  height: 50px;
  background: #f7f7f7;
  position: relative;
  margin-bottom: 10px;
  top: 0;
}
.title ul {
  list-style: none;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
}
li {
  float: left;
}
.title ul li {
  margin-right: 20px;
  font-size: 0.4rem;
  line-height: 50px;
  cursor: pointer;
}
.current-list {
  width: 100%;
}
.current-list img {
  width: 40%;
  height: 20%;
}
.current-list ul {
  width: 100%;
  height: 1000%;
}
.current-list ul li {
  width: 100%;
  margin-bottom: 20px;
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
.current-list .current-title {
  position: absolute;
  color: #cbcbcb;
  left: 45%;
  top: 85%;
  display: inline-block;
  font-size: 0.2rem;
  width: 1rem;
  height: 0.5rem;
}
/* .current-list span:nth-child(3){
  position: absolute;
  left: 2.9rem;
  color: white;
  font-weight: 600;
} */
.current-list p {
  width: 80px;
  text-align: center;
  color: white;
  position: absolute;
  top: 85%;
  left: 26%;
  border-radius: 20%;
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
.goods-card {
  vertical-align: middle;
  background-color: white;
}

.delete-button {
  height: 100%;
}
</style>