<template>
  <div id="app">
    
    <router-view @success="text" />
    <div class="title">
      <ul>
        <li>
          <img src="../images/日期 (1).png" />
        </li>
        <li>
          <router-link to="/">发现</router-link>
          <router-link to="/recommand">推荐</router-link>
          <router-link to="/dayreport">日报</router-link>
        </li>
        <li @click="jumpSearch">
          <img src="../images/搜索.png" />
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
  methods: {
    text(data) {
      console.log(data);
      this.$emit("form-child", data);
    },
    jumpSearch() {
      this.$emit("form-child", false);
      this.$router.push({
        path: "/search",
      });
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
  width: 100%;
  height: 100%;
  margin: 0 auto;
  position: relative;
}
.title {
  width: 100%;
  margin: 0 auto;
  opacity: 0.9;
  position: absolute;
  background-color: rgba(244, 244, 244, 1);
  top: 0;
}
.title ul {
  width: 95%;
  list-style: none;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
}
li {
  float: left;
}
.title ul li {
  line-height: 50px;
  cursor: pointer;
  color: #4b4b4b;
}
.title ul li a {
  font-size: 0.1rem;
}
.title ul li:nth-child(1) {
  width: 20%;
  height: 100%;
  display: flex;
  align-items: center;
  margin: 0.3rem auto;
}
.title ul li:nth-child(1) img {
  width: 0.5rem;
  height: 0.5rem;
  position: absolute;
  top: 30%;
}
.title ul li:nth-child(1) a {
  height: 100%;
  display: flex;
  align-items: center;
}
.title ul li:nth-child(2) {
  flex: 1;
  display: flex;
  justify-content: space-around;
}
.title ul li:nth-child(2) a {
  font-size: .35rem;
  display: inline-block;
  color: #4b4b4b;
  opacity: 0.5;
}
.title ul li:last-child {
  width: 20%;
  height: 100%;
  display: flex;
  align-items: center;
  margin: 0.3rem auto;
}
.title ul li:last-child img {
  width: 0.5rem;
  height: 0.5rem;
  position: absolute;
  top: 30%;
  right: 0.4rem;
}

#app .title a.router-link-exact-active {
  color: black;
  font-weight: 600;
  border-bottom: 2px black solid;
  opacity: 1;
}
</style>