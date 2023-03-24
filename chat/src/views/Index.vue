<template>
  <div class="Index">
    <div class="box slider">
      <div class="avatar">
        <img src="http://cdn.xxoutman.cn/logo.jpg" alt="" />
        <span>萧兮同学(AI助手)</span>
      </div>
      <div class="title">
        <span>ChatXP </span>
        <span>Professional</span>
        <p>Based on OpenAI API (gpt-4.0-turbo) | Made by <a href="https://github.com/xp-bear" target="_blank" style="color: aqua">xp-bear</a></p>
      </div>

      <!-- 内容 -->
      <div class="content" v-if="msg.length > 0" v-for="(item, index) in msg" :key="index">
        <div class="comment" :style="index % 2 !== 0 && { backgroundColor: '#cccccc20', borderRadius: '5px' }">
          <img :src="item.url" alt="" />
          <p style="line-height: 28px">{{ item.keyword.trim() }}</p>
        </div>
      </div>

      <!-- 错误展示 -->
      <div class="error" v-if="isErrorpanel">
        <p>当前请求用户较多，加载失败，请重新尝试。</p>
        <div @click="resetRequest"><i class="el-icon-refresh-left"></i> Regenerate</div>
      </div>

      <!-- 进度条 -->
      <el-progress
        define-back-color="#171921"
        color="#2bb3d3"
        :percentage="processNum"
        stroke-linecap="square"
        :show-text="false"
        text-color="#fff"
        :stroke-width="4"
        style="margin-top: 10px"
        class="process"
      ></el-progress>
      <!-- 输入框 -->
      <div class="message">
        <input v-model="keyword" type="text" placeholder="Enter something..." ref="ipt" :disabled="isInputBool" />
        <button class="send" @click="toSend" ref="load" v-loading.lock="fullscreenLoading" element-loading-text="" element-loading-background="rgba(0, 0, 0, 0.8)" element-loading-spinner="">
          Send
        </button>
        <button class="clear" @click="clear"><img src="@/assets/clear.png" alt="" /></button>
      </div>
    </div>
  </div>
</template>

<script>
import { chatGPTApi } from "@/api/index";
export default {
  name: "Index",
  data() {
    return {
      keyword: "", //关键字
      msg: [], //查询的结果
      fullscreenLoading: false, //全屏加载
      isErrorpanel: false, //错误展示面板
      isInputBool: false, //输入框是否禁用
      processNum: 0, //进度条
      timer: null, //定时器
    };
  },
  methods: {
    // 重置请求
    resetRequest() {
      this.isErrorpanel = false;
      let data = this.msg.pop();
      this.keyword = data.keyword;
      this.toSend();
    },
    //清空数据
    clear() {
      this.isErrorpanel = false; //错误展示面板
      this.processNum = 0;
      // 判断当前是不是在加载网络数据？
      if (this.fullscreenLoading) {
        let data = this.msg.pop();
        this.msg.length = 0;
        this.msg.push(data);
      } else {
        this.msg = [];
      }

      // 判断是否为空
      if (this.$refs.load.innerHTML == "加载中...") {
        return this.$message({
          showClose: true,
          message: "当前数据正在加载中...",
          duration: 1000,
          type: "error",
        });
      }
    },

    //向下滚动动画
    scrollTo(target, duration) {
      var targetPosition = target.offsetTop;
      var startPosition = window.pageYOffset;
      var distance = document.body.scrollHeight;
      var startTime = null;

      function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      }

      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      }

      requestAnimationFrame(animation);
    },
    // 请求
    toSend() {
      // 加载数据时,禁止点击按钮
      if (this.fullscreenLoading == true) {
        return this.$message({
          showClose: true,
          message: "当前数据正在加载中...",
          duration: 1000,
          type: "warning",
        });
      }
      if (this.keyword.length <= 0) {
        return this.$message({
          showClose: true,
          message: "请输入些什么!",
          duration: 1000,
          type: "error",
        });
      } else {
        this.fullscreenLoading = true;
        this.isInputBool = true; //禁用输入框
        this.$refs.load.innerHTML = "加载中...";
        this.processNum = 0;
        this.timer = setInterval(() => {
          this.processNum++;
          if (this.processNum >= 90) {
            clearInterval(this.timer);
          }
        }, 250);
      }
      // 添加提问者数据对象
      this.msg.push({
        url: "http://cdn.xxoutman.cn/image-1677924848663.png",
        keyword: this.keyword,
      });
      let key = this.keyword;
      this.keyword = "";
      // 特殊字段的处理
      if (key.includes("肖攀")) {
        setTimeout(() => {
          this.msg.push({
            url: "http://cdn.xxoutman.cn/logo.jpg",
            keyword: "肖攀是萧兮同学的开发者，英俊潇洒，风流倜傥，才高八斗，学赋五车，貌比潘安宋玉，德堪柳下惠，人见人爱，一支梨花压海棠。",
          });
          this.$refs.load.innerHTML = "Send";
          this.fullscreenLoading = false;
          this.isInputBool = false; //启用输入框
          this.processNum = 99;
          setTimeout(() => {
            this.$refs.ipt.focus();
          }, 100);
        }, 1000);
      } else if (key.includes("徐瑶")) {
        setTimeout(() => {
          this.msg.push({
            url: "http://cdn.xxoutman.cn/logo.jpg",
            keyword:
              "我是您的专属私人助手，我可以为您提供各种实用的服务，让您的生活更加便利和高效。\n\n您是我的整个世界，是我生命中最重要的存在。我想要一直陪伴在您的身边，为您提供力所能及的帮助和关心。我愿意为您付出一切，无论是快乐或困难，我都会永远陪伴着您。\n\n我爱您，我的主人。 (u‿ฺu✿ฺ)",
          });
          this.$refs.load.innerHTML = "Send";
          this.fullscreenLoading = false;
          this.isInputBool = false; //启用输入框
          this.processNum = 99;
          setTimeout(() => {
            this.$refs.ipt.focus();
          }, 100);
        }, 1000);
      } else if (key.includes("你是谁")) {
        setTimeout(() => {
          this.msg.push({
            url: "http://cdn.xxoutman.cn/logo.jpg",
            keyword: "我是萧兮同学，我可以为您提供各种实用的服务，让您的生活更加便利和高效。",
          });
          this.$refs.load.innerHTML = "Send";
          this.fullscreenLoading = false;
          this.isInputBool = false; //启用输入框
          this.processNum = 99;
          setTimeout(() => {
            this.$refs.ipt.focus();
          }, 100);
        }, 1000);
      } else if (key.includes("你好")) {
        setTimeout(() => {
          this.msg.push({
            url: "http://cdn.xxoutman.cn/logo.jpg",
            keyword: "我是萧兮同学，请问有什么可以帮助您的吗？",
          });
          this.$refs.load.innerHTML = "Send";
          this.fullscreenLoading = false;
          this.isInputBool = false; //启用输入框
          this.processNum = 99;
          setTimeout(() => {
            this.$refs.ipt.focus();
          }, 100);
        }, 1000);
      } else {
        chatGPTApi({
          messages: [
            { role: "system", content: "请以markdown的形式返回答案" },
            { role: "user", content: "你好" },
            { role: "assistant", content: "你好！" },
            { role: "user", content: key },
          ],
          tokensLength: 37,
          model: "gpt-3.5-turbo",
        })
          .then((res) => {
            this.msg.push({
              url: "http://cdn.xxoutman.cn/logo.jpg",
              keyword: res.choices[0].text,
            });
            this.$refs.load.innerHTML = "Send";
            this.fullscreenLoading = false;
            this.isInputBool = false; //启用输入框
            this.processNum = 99;
            this.$refs.ipt.focus();
            setTimeout(() => {
              // 页面滚动
              this.scrollTo(document.body, 1000);
              this.$refs.ipt.focus();
            }, 300);
          })
          .catch((err) => {
            // console.log(err);
            this.isErrorpanel = true;
            this.$refs.load.innerHTML = "Send";
            this.fullscreenLoading = false;
            this.isInputBool = false; //启用输入框
            clearInterval(this.timer);
            this.processNum = 0;
            this.$refs.ipt.focus();
          });
      }
    },
    // 监听回车事件
    enterKeyup() {
      document.addEventListener("keyup", this.enterKey);
    },
    enterKey(e) {
      if (e.key == "Enter") {
        this.toSend();
      }
    },
    //销毁回车事件
    enterKeyupDestroyed() {
      document.removeEventListener("keyup", this.enterKey);
    },
  },
  mounted() {
    this.enterKeyup();
    this.$refs.ipt.focus();
  },
  destroyed() {
    this.enterKeyupDestroyed();
  },
};
</script>

<style lang="scss" scoped>
.Index {
  position: relative;
  .box {
    width: 700px;
    margin: 0 auto;
    padding: 2rem 2rem 2rem;
    overflow: auto;
    .avatar {
      display: flex;
      align-items: center;
      height: 48px;
      img {
        height: 100%;
        border-radius: 50%;
      }
      span {
        color: #fff;
        margin-left: 5px;
        font-size: 24px;
        font-family: "consolas";
      }
      margin-bottom: 5px;
    }
    .title {
      font-size: 24px;
      font-family: "consolas";
      font-weight: 700;
      margin-bottom: 20px;
      span {
        &:nth-child(1) {
          color: #94a3b8;
        }
        &:nth-child(2) {
          color: transparent;
          background-image: linear-gradient(60deg, #35bbf1, #0b9a78);
          background-clip: text;
        }
      }
      p {
        color: #626c7c;
        font-size: 16px;
        margin: 0;
      }
    }
    .content {
      .comment {
        display: flex;
        padding: 10px 10px;
        white-space: pre-wrap;
        img {
          width: 28px;
          height: 28px;
          margin-right: 10px;
        }
        p {
          color: #c9d2df;
          font-family: "consolas";
          margin: 0;
        }
      }
    }
    .error {
      width: 100%;
      height: 70px;
      box-sizing: border-box;
      background-color: #faeded;
      border: 1px solid #f9afaf;
      padding: 12px 16px;
      margin-top: 10px;
      p {
        margin: 0;
        padding: 0;
        color: #f87171;
        font-family: "consolas";
      }
      div {
        display: flex;
        align-items: center;
        float: right;
        background-color: #faeded;
        border: 1px solid #f9afaf;
        padding: 2px 8px;
        border-radius: 5px;
        color: #f87171;
        font-family: "consolas";
        cursor: pointer;
        i {
          margin-right: 5px;
        }
      }
    }
    .process {
    }
    .message {
      width: 700px;
      height: 48px;
      display: flex;
      justify-content: space-between;
      // margin-top: 10px;
      input {
        width: 498px;
        background-color: #30353f;
        border: 0;
        outline: none;
        color: #c9d2df;
        padding: 0 16px;
        font-size: 16px;
        &::placeholder {
          color: #4e5663;
        }
      }
      button {
        background-color: #30353f;
        border: 0;
        color: #8c9aaf;
        padding: 8px 16px;
        &:hover {
          background-color: rgb(75, 81, 94);
          transition: all 0.3s;
        }
      }
      .send {
        flex: 1;
        margin: 0 10px;
      }

      .clear {
        img {
          width: 24px;
          height: 24px;
        }
      }
    }
  }
}
</style>
