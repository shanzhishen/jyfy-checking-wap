<template>
  <div class="column container" id="loginDiv" :style="{height: innerHeight}">
    <div class="col-auto">
      <img src="@/assets/images/logo.png" style="height: 260px"/>
    </div>

    <div class="col-5 main">
      <div class="q-gutter-md loginForm">
        <q-form ref="loginForm" style="margin-right: 16px">
          <q-input
            v-model="jnum"
            label="请输入您的工号"
            lazy-rules
            :rules="[ val => val && val.length > 0 || '请输入您的工号']"
            ref="jnum"
            no-error-icon
            @focus="focus"
          >
            <template v-slot:prepend>
              <i class="fas fa-user"></i>
            </template>
          </q-input>
          <q-input
            v-model="pwd"
            type="password"
            label="请输入您的密码"
            lazy-rules
            :rules="[ val => val && val.length > 0 || '请输入您的密码']"
            ref="pwd"
            no-error-icon
          >
            <template v-slot:prepend>
              <i class="fas fa-key"></i>
            </template>
          </q-input>
          <div>
            <q-btn
              label="登陆"
              type="submit"
              color="primary"
              class="full-width q-mt-md"
              @click="login"
            />
          </div>
        </q-form>
      </div>
    </div>
    <div class="col"></div>
  </div>
</template>
<script>
import common from "../assets/js/common";
export default {
  data() {
    return {
      jnum: "",
      pwd: "",
      innerHeight: window.innerHeight - 50
    };
  },
  methods: {
    login() {
      if (this.$refs.jnum.validate() && this.$refs.pwd.validate()) {
        var data = {
          jnum: this.jnum,
          pwd: this.pwd
        };
        var callback = res => {
          var data = common.handerData(res, this);
          if (data === "error") {
            return;
          }
          this.$q.sessionStorage.set("userWap", data);
          this.$router.push("/");
        };
        common.post("login", data, callback);
      } else {
        this.$q.notify({
          color: "negative",
          message: "请填写完整信息"
        });
      }
    },
    focus(e) {
      this.innerHeight = this.innerHeight + 300;
    }
  },
  created() {
    var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    window.onresize = function() {
      var nowClientHeight = document.documentElement.clientHeight || document.body.clientHeight;
      if (clientHeight - nowClientHeight > 60) {
        //因为ios有自带的底部高度
        //键盘弹出的事件处理
        document.getElementById("loginDiv").classList.add("focusState");
      } else {
        //键盘收起的事件处理
        document.getElementById("loginDiv").classList.remove("focusState");
      }
    };
  }
};
</script>
<style lang="stylus" scoped>
.container {
  position: fixed;
  height: 100%;
  min-height: 600px;
  width: 100%;
  text-align: center;
  background-image: url('../assets/images/background.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0px 0px;
  margin: 0 auto;
}

.loginForm {
  width: 300px;
  margin: 0px auto;
  border-radius: 3px 4px 5px 6px;
}

.loginForm > * > q-input {
  margin: 20px;
  width: 260px;
}

.main {
  background-color: rgba(236, 230, 230, 0.596);
  margin: 0px auto;
  height: 400px;
  border-radius: 6px 6px 6px 6px;
}

.focusState {
  position: absolute;
}
</style>


