<template>
  <div class="Message">
    <div class="title">
      <ul>
        <li @click="goback">取消</li>
        <li>编辑个人信息</li>
        <li @click="save">保存</li>
      </ul>
    </div>
    <div class="background">
      <img src="../images//f6969e51a5867bff779e32ef1fdb0b2.jpg" />
      <img src="../images/head.jpg" />
    </div>
    <div class="information">
      <ul>
        <li>名字<input v-model="name" type="text" /></li>
        <li>
          性别
          <select v-model="sex">
            <option disabled value="点击设置">点击设置</option>
            <option value="男">男</option>
            <option value="女">女</option>
          </select>
        </li>
        <li>
          生日<input
            @click="brithday"
            type="text"
            :placeholder="this.currentBrithday"
          />
          <van-datetime-picker
            cancel-button-text="取消"
            @cancel="cancel"
            @confirm="confirm(currentDate)"
            v-show="selectDay"
            v-model="currentDate"
            type="date"
            title="选择年月日"
            :min-date="minDate"
            :max-date="maxDate"
          />
        </li>
        <li>简介<input type="text" v-model="brief" /></li>
        <li>爱好<input type="text" v-model="hobby" /></li>
      </ul>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      minDate: new Date(1960, 0, 1), //最小日期选择
      maxDate: new Date(2025, 10, 1), //最大日期选择
      currentDate: new Date(), //选择的当前日期
      selectDay: false, //日期的显示
      currentBrithday: "", //当前的日期
      name: "", //名字
      sex: "", //性别
      brief: "", //简介
      hobby: "", //爱好
    };
  },
  created() {
    const loading = this.$toast.loading({
      message: "加载中",
    });
    setTimeout(() => {
      this.name = localStorage.getItem("用户名");
      this.sex = localStorage.getItem("性别");
      this.brief = localStorage.getItem("简介");
      this.hobby = localStorage.getItem("爱好");
      this.currentBrithday = localStorage.getItem("生日");
      loading.clear();
    }, 500);
  },
  methods: {
    brithday() {
      this.selectDay = !this.selectDay;
    },
    cancel() {
      this.selectDay = false;
    },
    confirm(value) {
      console.log(JSON.parse(JSON.stringify(value)));
      this.Day = JSON.parse(JSON.stringify(value).slice(9, 11));
      this.currentBrithday =
        JSON.stringify(value).slice(1, 8) + "-" + (this.Day + 1);
      console.log(this.Day + 1);
      console.log(this.currentBrithday + 1);
      this.selectDay = false;
    },
    goback() {
      this.$router.go(-1);
    },
    save() {
      localStorage.setItem("用户名", this.name);
      localStorage.setItem("性别", this.sex);
      localStorage.setItem("生日", this.currentBrithday);
      localStorage.setItem("简介", this.brief);
      localStorage.setItem("爱好", this.hobby);
      Toast.success("保存成功");
      setTimeout(() => {
        this.$router.go(-1);
      }, 1000);
    },
  },
};
</script>
<style scoped>
.Message {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.Message .title {
  width: 100%;
  height: 8%;
  background-color: #f7f7f7;
}
.title ul {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.title ul li {
  width: 100%;
  color: #4b4b4b;
}
.title ul li:nth-child(2) {
  font-size: 0.5rem;
  font-weight: 600;
  color: black;
}
.title ul li:nth-child(3) {
  text-align: end;
}
.background {
  width: 100%;
  height: 20%;
  position: relative;
}
.background img:nth-child(1) {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 99;
}
.background img:nth-child(2) {
  width: 1.7rem;
  height: 1.7rem;
  left: 0.3rem;
  border-radius: 50%;
  position: absolute;
  z-index: 999;
  bottom: -20px;
}
.information {
  width: 100%;
  height: 62%;
  margin-top: 0.7rem;
  display: flex;
  padding-left: 0.5rem;
}
.information ul {
  width: 100%;
  height: 100%;
  line-height: 0.6rem;
}
.information ul li {
  color: #4b4b4b;
  font-size: 0.4rem;
  height: 8%;
  border-bottom: 1px #d6d6d6 solid;
  margin-top: 0.3rem;
}
.information ul li input {
  border: 0px;
  margin-left: 0.5rem;
  color: black;
  font-size: 0.4rem;
  font-weight: 600;
}
.information ul li select {
  border: 0;
  width: 80%;
  background-color: white;
  margin-left: 0.5rem;
  position: relative;
  appearance: none;
  color: black;
  font-size: 0.4rem;
  font-weight: 600;
}
.information ul li option {
  outline: none;
  border: 0;
  appearance: none;
}
</style>