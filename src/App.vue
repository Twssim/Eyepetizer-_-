<template>
  <div id="app">
    <router-view
      :video_collect="video_collect"
      @from-my="test"
      @form-child="text"
      @MyComponentDestroyed="MyComponentDestroyed"
    />
    <div v-show="show" class="footer">
      <ul>
        <li @click="change">
          <router-link to="/">
            <img src="./images/首页.png" />
            <p @click="home" :class="{ light: light }">首页</p>
          </router-link>
        </li>
        <li @click="changeMy">
          <router-link to="/my">
            <img src="./images/我的.png" />
            <p @click="my" :class="{ light: !light }">我的</p></router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Loading } from "vant";
export default {
  components: {
    [Loading.name]: Loading,

    // Discover,
  },
  data() {
    return {
      show: true,
      video_collect: [],
      light: "",
    };
  },
  created() {
    if (this.$route.path == "/my") {
      this.light = false;
    } else {
      this.light = true;
    }
    this.text();
    this.test();
    this.MyComponentDestroyed();
  },
  methods: {
    my() {
      this.light = false;
    },
    home() {
      this.light = true;
    },
    text(data) {
      this.show = data;
    },
    test(data) {
      this.show = data;
    },
    MyComponentDestroyed(data) {
      console.log(data);
      this.show = data;
    },
    change() {
      this.light = true;
    },
    changeMy() {
      this.light = false;
    },
  },
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
}
#app {
  max-width: 100%;
  height: 600px;
  margin: 0 auto;
  position: relative;
}
.footer {
  width: 100%;
  height: 0.2rem;
  text-align: center;
  position: relative;
}
.footer img {
  width: 0.5rem;
  vertical-align: middle;
}
.footer ul {
  justify-content: space-around;
  display: flex;
}
.footer ul li {
  cursor: pointer;
}
#app a {
  color: #4b4b4b;
  opacity: 0.5;
}
.light {
  color: black;
  font-weight: 600;
  opacity: 1;
}
</style>