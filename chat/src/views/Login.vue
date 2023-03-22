<template>
  <div class="Login">
    <div class="popup">
      <img class="left" src="http://cdn.xxoutman.cn/left-1677943396668.png?1677943397070" alt="" />
      <img class="right" src="http://cdn.xxoutman.cn/right-1677943417084.png?1677943417244" alt="" />
      <div class="content">
        <div class="title">请输入暗号</div>
        <div class="tip">天王盖地虎下一句是什么?</div>
        <input type="text" v-model="cipher" ref="ipt" />
        <button class="btn" @click="submit">ChatXP GO!</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      cipher: "", //暗号
    };
  },
  methods: {
    submit() {
      if (["徐瑶", "肖攀", "小鸡炖蘑菇", "陈盈锐", "宝塔镇河妖", "上山打老虎", "chatxp"].includes(this.cipher.toLocaleLowerCase())) {
        this.$message({
          showClose: true,
          message: "暗号核对成功!",
          duration: 1000,
          type: "success",
        });
        localStorage.setItem("cipher", this.cipher); //本地保存 暗号
        setTimeout(() => {
          this.$router.push({ path: "/index" });
        }, 1000);
      } else {
        this.$message({
          showClose: true,
          message: "暗号有误,请重新输入!",
          duration: 1000,
          type: "error",
        });
      }
    },
    // 监听回车事件
    enterKeyup() {
      document.addEventListener("keyup", this.enterKey);
    },
    enterKey(e) {
      if (e.key == "Enter") {
        this.submit();
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
.Login {
  position: relative;
  width: 700px;
  height: 100vh;
  margin: 0 auto;
  /* background-color: #fff; */
  /* background: url("http://cdn.xxoutman.cn/image-1677934109474.png?1677934109965") no-repeat; */
  background-size: cover;

  .popup {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 820px;
    height: 430px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 5px;
    overflow: hidden;
    .left {
      width: 150px;
      position: absolute;
      bottom: 0;
    }
    .right {
      width: 150px;
      position: absolute;
      bottom: 0;
      right: 0;
    }
    .content {
      display: flex;
      height: 430px;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .title {
        font-size: 50px;
        font-family: "xp";
        margin-bottom: 10px;
        overflow: hidden;
      }
      .tip {
        color: #555;
        font-weight: 700;
        font-family: "consolas";
      }
      input {
        width: 50%;
        height: 48px;
        border: 0;
        background-color: rgba(0, 0, 0, 0.3);
        outline: none;
        font-size: 24px;
        font-family: "xp";
        margin: 20px 0 40px 0;
        color: #fff;
        letter-spacing: 0.12em;
        box-shadow: 0 0 3px #ccc inset;
      }
      .btn {
        display: inline-block;
        width: 150px;
        height: 48px;
        padding: 10px 20px;
        background-color: #4caf50;
        color: white;
        font-size: 20px;
        border: none;
        border-radius: 5px;
        transition: background-color 0.3s ease;
        cursor: pointer;
        font-family: "consolas";
      }

      .btn:hover {
        background-color: #3e8e41;
      }
    }
  }
}
</style>
