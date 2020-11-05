<template>
  <div class="discover">
    <router-view />
    <van-pull-refresh
      v-model="isLoading"
      success-text="刷新成功"
      @refresh="onRefresh"
    >
      <div class="banner">
        <van-swipe class="my-swipe" :autoplay="3000">
          <van-swipe-item v-for="(k, index) in BannerImg" :key="index">
            <li>
              <img :src="k.img" />
            </li>
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="advertiser-video">
        <h1>随机精选视频</h1>
        <video autoplay="true" ref="video"></video>
      </div>
      <div class="classtifyImg">
        <h1>全部分类</h1>
        <ul>
          <li v-for="(k, i) in classtifyImg" :key="i">
            <img :src="k.img" />
            <h2>{{ k.title }}</h2>
          </li>
        </ul>
      </div>
      <div class="current-list">
        <h1>本周榜单</h1>
        <ul>
          <li
            :currentVideoId="currentVideoId"
            v-for="(k, index) in list"
            :key="index"
            @click="getId(index)"
          >
            <img :src="k.img" />
            <div class="font-flex">
              <h2>{{ k.content }}</h2>
              <span
                >{{ k.title }}
                <img src="./images/分享 (1).png" />
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
    </van-pull-refresh>
  </div>
</template>
<script>
import { Loading } from "vant";
export default {
  components: {
    [Loading.name]: Loading,
  },
  data() {
    return {
      isLoading: false,
      BannerImg: [],
      is_moving: false,
      screex: 0,
      finally_X: 0,
      finally_Y: 0,
      mousedownX: 0,
      mousedownY: 0,
      advertisingImg: [],
      classtifyImg: [],
      videoAll: [],
      video: null,
      specialTitle: [],
      columnImg: "",
      list: [],
      pageChang: false,
      currentVideoId: "",
      videoPlayTime: [],
      minute: "",
      secondy: "",
      count: "",
    };
  },
  mounted() {
    if (this.$route.path == "/") {
      this.$emit("success", true);
    }
  },
  created() {
    if (this.$route.path == "/") {
      this.$emit("success", true);
    }
    this.getBannerImage();
    this.getVideoMessage();
    this.gethotMessage();
    this.getSpecialTitleImg();
    this.getCurrentList();
  },
  methods: {
    onRefresh() {
      this.getVideoMessage();
      console.log("下拉了");
      setTimeout(() => {
        this.isLoading = false;
        this.count++;
      }, 1000);
    },
    getBannerImage() {
      const discoverLoading = this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
      });
      this.axios.get(" /api/discovery").then((res) => {
        discoverLoading.clear();
        let img = res.data.itemList[0].data.itemList;
        console.log(img);
        for (let i = 0; i < img.length - 1; i++) {
          this.BannerImg.push({
            img: img[i].data.image,
          });
        }
      });
    },
    gethotMessage() {
      this.axios.get(" /api/discovery").then((res) => {
        for (
          let i = 0;
          i < res.data.itemList[1].data.itemList.length - 1;
          i++
        ) {
          this.classtifyImg.push({
            img: res.data.itemList[1].data.itemList[i].data.image,
            title: res.data.itemList[1].data.itemList[i].data.title,
          });
        }
        let img = res.data.itemList[1].data.itemList;
        for (let i = 0; i < img.length - 1; i++) {
          this.advertisingImg.push({
            img: res.data.itemList[1].data.itemList[i].data.image,
            title: res.data.itemList[1].data.itemList[i].data.title,
          });
        }
      });
    },
    getVideoMessage() {
      this.axios.get(" /api/selected").then((res) => {
        for (let i = 0; i < res.data.itemList.length - 1; i++) {
          if (res.data.itemList[i].type == "video") {
            this.videoAll.push({
              url: res.data.itemList[i].data.playUrl,
            });
          }
        }
        let number = Math.floor(Math.random() * 10);
        this.video = this.videoAll[number].url;
        this.$refs.video.src = this.video;
      });
    },
    getSpecialTitleImg() {
      // this.axios.get("/api/discovery?start=0&num=5").then((res)=>{
      this.axios.get("api/discovery").then((res) => {
        let img = res.data.itemList[1].data.itemList;
        for (let i = 0; i < img.length - 1; i++) {
          this.specialTitle.push({
            img: res.data.itemList[4].data.itemList[i].data.image,
            id: res.data.itemList[4].data.itemList[i].data.id,
          });
        }
      });
    },

    getCurrentList() {
      this.axios.get("/api/selected").then((res) => {
        for (let i = 0; i < res.data.itemList.length - 1; i++) {
          if (res.data.itemList[i].type == "video") {
            let time = res.data.itemList[i].data.duration;
            if (time / 60 > 0) {
              this.minute = parseInt(time / 60);
              this.secondy = time - 60 * parseInt(time / 60);
            }
            if (res.data.itemList[i].data.author) {
              this.list.push({
                img: res.data.itemList[i].data.cover.detail,
                title: res.data.itemList[i].data.author.name,
                content: res.data.itemList[i].data.title,
                id: res.data.itemList[i].data.id,
                releaseTime: res.data.itemList[i].releaseTime,
                duration: res.data.itemList[i].data.duration,
                minute: this.minute,
                secondy: this.secondy,
              });
            }
          }
        }
        // console.log(this.videoPlayTime);
      });
    },
    getId(index) {
      this.currentVideoId = this.list[index].id;
      console.log(this.currentVideoId);
      this.$router.push({
        path: "/videoPlay",
        query: { id: this.currentVideoId },
      });
      this.$emit("success", false);
    },
  },
};
</script>
<style scoped>
.discover {
  width: 100%;
  max-height: 100%;
  filter: brightness(0.6);
  overflow-y: scroll;
}
.banner {
  width: 95%;
  height: 100%;
  margin: 0 auto;
  margin-top: 1.6rem;
}
.banner img {
  width: 100%;
  height: 100%;
}
.classtifyImg ul {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}
.classtifyImg {
  width: 95%;
  height: 100%;
  margin: 0 auto;
  margin-bottom: 0.2rem;
}
.classtifyImg h2 {
  position: absolute;
  top: 45%;
  left: 37%;
  color: white;
}
.classtifyImg ul li {
  width: 31%;
  height: 31%;
  position: relative;
  margin-right: 0.2rem;
  margin-bottom: 0.2rem;
}
.classtifyImg ul li img {
  width: 100%;
  height: 100%;
  filter: brightness(0.6);
}
.classtifyImg ul span {
  position: relative;
  left: -58%;
  top: -72px;
  font-size: 20px;
  font-weight: 600;
  color: white;
}
.advertiser-video {
  width: 95%;
  height: 100%;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 10px;
}
h1 {
  font-weight: 600;
  margin-bottom: 0.2rem;
  font-size: 0.4rem;
}
.advertiser-video video {
  width: 100%;
}
.current-list {
  width: 95%;
  height: 100%;
  margin: 0 auto;
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
  margin-bottom: 0.45rem;
  position: relative;
  cursor: pointer;
}
.current-list ul li:last-child span {
  top: 1.8rem;
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
/* .current-list p {
  background-color: #474747;
  color: white;
  position: absolute;
  top: 90%;
  left: 3%;
  border-radius: 20%;
  display: flex;
  justify-content: center;
  font-size: 0.15rem;
} */
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  text-align: center;
  margin-top: -20px;
}
</style>