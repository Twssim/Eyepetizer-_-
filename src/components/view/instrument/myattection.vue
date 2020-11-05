<template>
  <div id="collect">
    <div class="title">
      <div @click="back" class="goback">&lt;</div>
      <ul>
        <li>我的关注</li>
      </ul>
    </div>
    <h1 v-show="!title">无关注用户</h1>
    <!-- <div class="current-list">
      <ul>
        <li @click="getId(index)" v-for="(k, index) in video_img" :key="index">
          <van-swipe-cell>
            <img :src="k.img" />
            <h2>{{ k.title }}</h2>
            <span class="current-title">{{ k.category }}</span>

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
    </div> -->
    <div v-for="(k, index) in video_img" :key="index" class="brief">
      <ul>
        <li>
          <img :src="k.icon" />
        </li>
        <li>
          <h1>{{ k.title }}</h1>
          <p>{{ k.name }}:{{ k.category }}</p>
        </li>
        <li>
          <p @click="cancel(k.id)">取消关注</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      video_img: [],
      minute: "",
      secondy: "",
      currentVideoId: "",
      title: false,
      obj: [],
    };
  },
  created() {
    const collectLoading = this.$toast.loading({
      message: "加载中...",
      forbidClick: true,
      loadingType: "spinner",
    });
    if (localStorage.getItem("关注")) {
      this.obj = JSON.parse(localStorage.getItem("关注"));
    }
    if (localStorage.getItem("关注")) {
      if (localStorage.getItem("成功？")) {
        this.VideoMessage = JSON.parse(localStorage.getItem("关注"));
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
                  icon: res.data.itemList[i].data.author.icon,
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
  methods: {
    movevideo(id) {
      console.log(id);
      console.log(localStorage.getItem("关注"));
      for (let i = 0; i < this.obj.length; i++) {
        if (this.obj[i] == id) {
          this.obj.splice(i, 1);
        }
      }
      localStorage.setItem("关注", JSON.stringify(this.obj));
      location.reload();
    },
    back() {
      this.$router.go(-1);
    },
    cancel(id){
      console.log(id);
      console.log(localStorage.getItem("关注"));
      for (let i = 0; i < this.obj.length; i++) {
        if (this.obj[i] == id) {
          this.obj.splice(i, 1);
        }
      }
      localStorage.setItem("关注", JSON.stringify(this.obj));
      location.reload();
    }
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
.brief {
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-bottom: .5rem;
  border-bottom: 1px #64564f solid;
  padding-bottom: .2rem;
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
  margin-left: -0.4rem;
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
  width: 1.3rem;
  height: 1.3rem;
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
.brief ul li:last-child p {
  color:skyblue;
  cursor: pointer;
}
</style>