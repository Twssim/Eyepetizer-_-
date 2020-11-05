<template>
  <div class="video">
    <div @click="back" class="goback">
      <img src="../images/后退 (1).png"/>
    </div>
    <div class="videotype">
      <video ref="Myvideo" :src="videoUrl" controls></video>
      <p v-show="definition" @click="changeLine_click">
        {{ current_definition === "标清" ? definition_high : "无" }}
      </p>
      <p v-show="video_definition" @click="current_click">
        {{ current_definition ? current_definition : "标清" }}
      </p>
    </div>

    <!--后退箭头 !-->
    <!-- 视频层结束!-->
    <!-- <div class="descirtion">
      <img :src="feedImg" />
    </div> -->
    <div class="video_style">
      <h2>{{ videoTitle }}</h2>
      <!--视频标题 !-->
      <span class="videoTime">{{ videoPlay_category }} /</span
      ><!--视频描述 !-->
      <span class="videoTime"
        >{{
          videoPlay_minute > 10 ? videoPlay_minute : "0" + videoPlay_minute
        }}:{{ videoPlay_secondly }} /</span
      ><!--视频时长 !-->
      <span>{{ videoPlay_authorName }}</span
      ><!--视频作者名字 !-->
      <p>{{ videdeScription }}</p>
      <!-- 视频注释!-->
      <div class="instrument">
        <!--收藏 下载 喜欢 分享层 !-->
        <ul>
          <li :class="{ light: light }">
            <img src="../images/star.png" />
            <span @click="collect($event)">{{
              light ? "已收藏" : "未收藏"
            }}</span>
          </li>
          <li>
            <img src="../images/NMStubiao-.png" />
            <span @click="download($event)">下载</span>
          </li>
          <li>
            <img src="../images/fenxiang.png" />
            <span @click="share($event)">分享</span>
            <van-share-sheet
              v-model="showShare"
              title="立即分享给好友"
              :options="options"
              @select="share"
            />
          </li>
          <li>
            <img src="../images/xihuan.png" />
            <span @click="like($event)">喜欢</span>
          </li>
        </ul>
      </div>
      <div class="brief">
        <ul>
          <li>
            <img :src="icon" />
          </li>
          <li>
            <h1>{{ title }}</h1>
            <p>{{ name }}:{{ category }}系列</p>
          </li>
          <li>
            <p :class="{ attetion: attetion }" @click="seek">
              {{ attetion ? "取消关注" : "+关注" }}
            </p>
          </li>
        </ul>
      </div>
      <div id="comment" class="comment">
        <h1>最新评论</h1>
        <ul>
          <li v-for="(k, id) in commentAll" :key="id">
            <img :src="k.imgleft" />
            <span class="message">
              <p>{{ k.user }}</p>
              <p>{{ k.content }}</p>
              <p>{{ k.replay }}</p>
            </span>
            <img :class="{ good: good }" @click="well($event)" :src="k.good" />
          </li>
        </ul>
      </div>
    </div>
    <!--收藏 下载 喜欢 分享层结束 !-->
    <div class="footer">
      <ul>
        <li>
          <img src="../images/yonghu.png" />
        </li>
        <li>
          <input v-model="ipt" type="text" placeholder="点击发表你的评论···" />
        </li>
        <li>
          <a @click="inputFun" href="#comment">
            <img src="../images/message.png" />
            <p>{{ commentAll.length }}</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  props: {
    video_collect: Array,
  },
  data() {
    return {
      videoUrl: "", //当前播放视频的路径
      videoTitle: "", //视频的标题
      videdeScription: "", //视频的注释
      videoPlay_hour: "", //视频时长（小时）
      videoPlay_minute: "", //视频时长（分钟）
      videoPlay_secondly: "", //视频时长（描述）
      videoPlay_category: "", //视频种类
      videoPlay_authorName: "", //视频的作者名字
      definition_show: true, //用于切换视频标高清的显示
      definition_standard: "", //当前为标清
      definition_high: "", //当前为高清
      definition_standard_url: "", //标清的视频路径
      definition_high_url: "", //高清的视频路径
      definition: false, //默认清晰度为无
      current_definition: "", //当前视频清晰度
      currentTime_video: "", //当前视频播放的时间
      lastvideo_time: "", //切换路径时，上一个视频的播放时间
      icon: "", //视频作者头像
      description: "", //描述
      light: "", //收藏的高亮
      current_collect: false, //是否收藏
      current_share: false, //是否分享
      current_download: false, //是否下载
      current_like: false, //是否喜欢
      active: false, //高亮
      video_definition: true, //显示清晰度规格
      feedImg: "", //背景图片
      collectVideo: [], //收藏的视频id
      obj: [], //用于存储id信息
      isLoading: false, //加载
      showShare: false, //分享
      currentId: "", //当前视频id
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
      title: "",
      name: "",
      category: "",
      ipt: "",
      aim: true,
      commentAll: [
        {
          imgleft: require("../images/yonghu.png"),
          user: "匿名用户",
          content: "作品很感人，十分的好看！！",
          replay: "回复",
          good: require("../images/点赞 (1).png"),
        },
        {
          imgleft: require("../images/yonghu.png"),
          user: "不知名网友",
          content: "这部作品强力推荐！真的很好看",
          replay: "回复",
          good: require("../images/点赞 (1).png"),
        },
        {
          imgleft: require("../images/yonghu.png"),
          user: "作者",
          content: "感谢各位的支持，我以后会发布类似作品",
          replay: "回复",
          good: require("../images/点赞 (1).png"),
        },
      ],
      attetionAll: [],
      attetion: false,
      good: false, //点赞图标是否高亮
      record: [], //观看记录
    };
  },
  created() {
    //关注id
    if (localStorage.getItem("关注")) {
      this.attetionAll = JSON.parse(localStorage.getItem("关注"));
    }
    for (let i = 0; i < this.attetionAll.length; i++) {
      if (this.attetionAll[i] == this.$route.query.id) {
        this.attetion = true;
      }
    }
    //关注的id结束 

    //观看视频的记录id
    if (localStorage.getItem("观看视频的记录")) {
      this.record = JSON.parse(localStorage.getItem("观看视频的记录"));
    }
    for (let i = 0; i < this.record.length; i++) {
      if (this.record[i] == this.$route.query.id) {
        this.record.splice(i, 1);
      }
    }
    this.record.push(this.$route.query.id)
    localStorage.setItem("观看视频的记录", JSON.stringify(this.record));
    //观看视频记录结束层

    if (localStorage.getItem("videoAll")) {
      this.obj = JSON.parse(localStorage.getItem("videoAll"));
    }
    for (let i = 0; i < this.obj.length; i++) {
      if (this.obj[i] == this.$route.query.id) {
        this.light = true;
        this.current_collect = true;
      }
    }
    console.log("当前页面id", this.$route.query.id);
    //如果当前视频的id匹配到收藏夹中的视频id 则收藏文字高亮
    //跨域请求数据
    const VideoPlayLoading = this.$toast.loading({
      message: "加载中...",
      forbidClick: true,
      loadingType: "spinner",
    });
    this.axios.get("/api/selected").then((res) => {
      VideoPlayLoading.clear();

      for (let i = 0; i < res.data.itemList.length - 1; i++) {
        //显示当前点击的视频信息
        // if (res.data.itemList[i].type == "video") {
        //   console.log(res.data.itemList[i])
        // }
        if (res.data.itemList[i].data.id == this.$route.query.id) {
          console.log(res.data.itemList[i].data);
          // this.icon = res.data.itemList[i].data.author.icon;
          // this.description = res.data.itemList[i].data.author.description;
          this.videoUrl = res.data.itemList[i].data.playUrl; //获取视频路径
          this.videoTitle = res.data.itemList[i].data.title; //获取视频标题
          this.videdeScription = res.data.itemList[i].data.description; //获取视频注释
          this.videoPlay_category = res.data.itemList[i].data.category; //获取视频种类
          this.icon = res.data.itemList[i].data.author.icon;
          this.name = res.data.itemList[i].data.author.name;
          this.category = res.data.itemList[i].data.category;
          this.title = res.data.itemList[i].data.title;
          this.currentId = res.data.itemList[i].data.id;
          // this.videoPlay_authorName = res.data.itemList[i].data.author.name;
          let time = res.data.itemList[i].data.duration; //获取视频时间差
          this.feedImg = res.data.itemList[i].data.cover.feed; //获取视频图片
          //当前视频的播放长度
          if (time % 60 > 0) {
            let secondly = parseInt(time / 60);
            this.videoPlay_secondly = time - 60 * secondly;
            this.videoPlay_minute = parseInt(time / 60);
            if (this.videoPlay_minute > 60) {
              this.videoPlay_hour = parseInt(this.videoPlay_minute / 60);
              this.videoPlay_minute = parseInt(this.videoPlay_minute % 60);
            }
          } else {
            this.videoPlay_secondly = time;
          }
          let length = res.data.itemList[i].data.playInfo.length;
          if (length > 0) {
            for (let j = 0; j < length; j++) {
              if (res.data.itemList[i].data.playInfo[j].name == "标清") {
                this.definition_standard =
                  res.data.itemList[i].data.playInfo[j].name;
                this.definition_standard_url =
                  res.data.itemList[i].data.playInfo[j].url; //获取标清视频的路径
              }
              if (res.data.itemList[i].data.playInfo[j].name == "高清") {
                this.definition_high =
                  res.data.itemList[i].data.playInfo[j].name;
                this.definition_high_url =
                  res.data.itemList[i].data.playInfo[j].url; //获取高清视频的路径
              }
            }
          }
          console.log(res.data.itemList[i]);
        }
      }
      if (this.definition_standard && this.definition_high) {
        this.current_definition = "标清"; //如果当前视频有高清和标清的视频路径，默认显示标清路径优先
      } else if (this.definition_standard) {
        this.current_definition = this.definition_standard; //如果只有高清路径，只显示高清
      } else if (this.definition_high) {
        this.current_definition = this.definition_high; //如果只有标清路径，只显示标清  
      }
    });
  },
  watch: {
    //监听当前视频播放时间，用于切换标高清时还能从上一个视频路径播放时间开始播放 避免重新播放
    currentTime_video(newTime) {
      this.lastvideo_time = newTime;
    },
  },
  methods: {
    seek() {
      // console.log(id)
      if (this.attetion == false) {
        for (let i = 0; i < this.attetionAll.length; i++) {
          if (this.attetionAll[i] == this.$route.query.id) {
            this.attetionAll.splice(i, 1);
          }
        }
        this.attetion = true;
        // localStorage.sidebar("关注的用户",)
        this.attetionAll.push(this.$route.query.id);
        localStorage.setItem("关注", JSON.stringify(this.attetionAll));
        Toast.success("关注成功");
      } else {
        Toast.success("已取消关注");
        for (let i = 0; i < this.attetionAll.length; i++) {
          if (this.attetionAll[i] == this.$route.query.id) {
            this.attetionAll.splice(i, 1);
          }
          localStorage.setItem("关注", JSON.stringify(this.attetionAll));
        }
        this.attetion = false;
      }
    },
    current_click() {
      //用于切换文字标高清
      this.standrad = true;
      this.definition = !this.definition;
      // this.videoUrl = this.definition_standard_url;
    },
    changeLine_click(e) {
      //用于切换视频标高清路径
      if (e.target.innerHTML == "高清") {
        this.current_definition = e.target.innerHTML;
        if (this.definition_high) {
          this.videoUrl = this.definition_high_url;
        }
        if (this.definition_standard) {
          e.target.innerHTML = "标清";
        } else {
          e.target.innerHTML = "高清";
        }
      } else if (e.target.innerHTML == "标清") {
        this.current_definition = e.target.innerHTML;
        if (this.definition_standard) {
          this.videoUrl = this.definition_standard_url;
        }
        if (this.definition_high) {
          e.target.innerHTML = "高清";
        }
      }
      this.definition = false;
      this.standrad = false;
      // this.videoUrl = this.definition_high_url;
      this.currentTime_video = this.$refs.Myvideo.currentTime;
      setTimeout(() => {
        this.$refs.Myvideo.currentTime = this.lastvideo_time;
      }, 100);
    },
    back() {
      this.$router.go(-1);
      console.log("1");
    },
    collect() {
      //用于验证是否登录，登录可使用其功能，未登录则跳转登录页面
      //收藏功能
      if (localStorage.getItem("成功？")) {
        this.video_num + 1;
        if (this.current_collect === false) {
          this.$toast.success("收藏成功");
          this.light = true;
          for (let i = 0; i < this.obj.length; i++) {
            if (this.obj[i] == this.$route.query.id) {
              this.obj.splice(i, 1);
            }
          }
          this.obj.push(this.$route.query.id);
          localStorage.setItem("id", this.$route.query.id);
          localStorage.setItem("videoAll", JSON.stringify(this.obj));
          console.log(this.obj);
          this.current_collect = !this.current_collect;
        } else if (this.current_collect === true) {
          this.$toast.success("取消收藏");
          for (let i = 0; i < this.obj.length; i++) {
            if (this.obj[i] == this.$route.query.id) {
              this.obj.splice(i, 1);
            }
          }
          localStorage.setItem("videoAll", JSON.stringify(this.obj));
          this.light = false;
          this.current_collect = !this.current_collect;
          localStorage.removeItem("id", this.$route.query.id);
        }
        this.active = true;
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
    download() {
      //用于验证是否登录，登录可使用其功能，未登录则跳转登录页面
      //下载功能
      if (localStorage.getItem("成功？")) {
        if (this.current_download === false) {
          console.log("下载成功");
          this.current_download = !this.current_download;
        } else if (this.current_download === true) {
          console.log("取消下载");
          this.current_download = !this.current_download;
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
    like() {
      //用于验证是否登录，登录可使用其功能，未登录则跳转登录页面
      //喜欢功能
      if (localStorage.getItem("成功？")) {
        if (this.current_like === false) {
          console.log("喜欢成功");
          this.current_like = !this.current_like;
        } else if (this.current_like === true) {
          console.log("取消喜欢");
          this.current_like = !this.current_like;
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
    inputFun() {
      console.log(this.ipt);
      if (this.ipt) {
        this.commentAll.push({
          imgleft: require("../images/yonghu.png"),
          user: "开眼用户",
          content: this.ipt,
          replay: "回复",
          good: require("../images/点赞 (1).png"),
        });
      }
      this.ipt = "";
      console.log(this.commentAll);
    },
    well(e) {
      console.log(this.good);
      console.log(e.target.style);
      e.target.style.backgroundColor = "yellow";
      Toast.success("点赞成功");
    },
  },
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.video_style {
  width: 100%;
  height: 9rem;
  overflow-y: scroll;
}
.video_style .videoTime {
  color: white;
}
.goback {
  position: absolute;
  z-index: 999;
  color: white;
  font-size: 0.8rem;
  width: 1rem;
  height: 1rem;
  border-radius: 1rem;
  cursor: pointer;
  top: 0;
  left: 0;
}
.goback img{
  width: 100%;
  height: 100%;
}
.videotype {
  width: 100%;
  height: 36%;
  overflow: hidden;
  background-color: black;
  /* display: flex;
  justify-content: center; */
}
video {
  width: 100%;
  height: 100%;
}
.video {
  position: relative;
  width: 100%;
  height: 100%;
  top: 0px;
  position: relative;
  overflow-y: scroll;
  background: url("./view/HomePage/images/brife-background.jpg");
}
.videotype p {
  width: 1.2rem;
  height: 0.7rem;
  font-weight: 600; 
  position: absolute;
  cursor: pointer;
  color: white;
  right: 0;
  top: 0;
  z-index: 999;
}
.videotype p:nth-child(2) {
  top: 5%;
}
.video h2 {
  font-weight: 600;
  color: white;
  font-size: 0.38rem;
  padding-left: 10px;
  padding-top: 10px;
}
.video span {
  color: skyblue;
  font-size: 0.25rem; 
  font-weight: 600;
  padding-left: 10px;
  padding-top: 10px;
  display: inline-block;
}
.video p {
  padding-left: 10px;
  padding-top: 10px;
  font-size: 0.4rem;
    color: #4b4b4b;
    line-height: .5rem;
  font-weight: 600;
}
.instrument {
  margin-top: 0.1rem;
  width: 100%;
  height: 1rem;
}
.instrument span {
  color: white;
}
.instrument ul {
  display: flex;
  justify-content: space-around;
}
.instrument ul li {
  cursor: pointer;
}
.instrument ul li img {
  width: 20px;
  height: 20px;
}
.brief {
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: space-around;
  margin-bottom: 0.7rem;
}
.brief ul {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px grey solid;
  padding: 1rem 0;
}
.brief ul li {
  width: 100%;
}
.brief ul li:nth-child(2) {
  margin-left: -0.4rem;
  color: #4b4b4b;
}
.brief ul li:nth-child(2) h1 {
  width: 6rem;
  margin-bottom: 0.1rem;
  color: white;
  font-weight: 600;
  font-size: 0.3rem;
}
.brief ul li:nth-child(2) p {
  width: 6rem;
  margin-bottom: 0.1rem;
  color: grey;
  font-weight: 600;
  font-size: 0.1rem;
  margin-left: -0.3rem;
}
.brief ul li img {
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 50%;
  margin-left: 0.4rem;
}
.brief ul li:last-child p {
  text-align: center;
}
.brief .attetion {
  color: skyblue;
}
.comment {
  width: 100%;
  height: 5rem;
  padding-left: 0.7rem;
}
.comment h1 {
  color: #e9e2da;
  font-weight: 600;
}
.comment ul {
  width: 100%;
  height: 100%;
}
.comment ul li {
  padding-bottom: 0.5rem;
  width: 100%;
  height: 40%;
  border-bottom: 1px #64564f solid;
  display: flex;
  align-items: center;
  position: relative;
}
.comment ul li img {
  width: 0.7rem;
  height: 0.7rem;
  background-color: white;
  border-radius: 50%;
}
.comment ul li span p:nth-child(1) {
  font-size: 0.3rem;
  color: #e9e2da;
}
.comment ul li span p:nth-child(2) {
  font-size: 0.2rem;
  color: grey;
}
.comment ul li span p:nth-child(3) {
  font-size: 0.1rem;
  color: gray;
}
.comment ul li img:last-child {
  position: absolute;
  right: 0;
  background-color: grey;
}
.footer {
  width: 100%;
  height: 9.8%;
  padding-top: 0.3rem;
}
.footer ul {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
.footer ul li {
  width: 100%;
  height: 70%;
}
.footer ul li:nth-child(1) img {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: white;
}
.footer ul li:nth-child(2) input {
  width: 7.5rem;
  height: 0.9rem;
  border: 0;
  /* opacity: 0.1; */
  background-color: rgba(62, 53, 36, 0.5);
  font-weight: 600;
  color: white;
}
.footer ul li:nth-child(3) {
  position: relative;
}
.footer ul li:nth-child(3) img {
  width: 0.7rem;
  height: 0.7rem;
  position: absolute;
  left: 0;
  vertical-align: middle;
  top: 15%;
  cursor: pointer;
}
.footer ul li:nth-child(3) p {
  font-size: 0.4rem;
  position: absolute;
  left: 0.5rem;
  font-weight: 600;
  color: white;
}
.light span {
  color: skyblue;
}
</style>