<template>
  <div class="column q-pa-md" id="allDiv">
    <div class="col-4 logo">
      <img src="../assets/images/logo2.png" style="height: 130px" />
    </div>
    <div class="col-auto">
      <q-card>
        <q-tabs v-model="tab" class="bg-primary text-white" align="justify" narrow-indicator>
          <!-- <q-tab name="mails" label="月查考核"/>
          <q-tab name="alarms" label="Alarms"/>
          <q-tab name="movies" label="Movies"/>-->
          <q-tab
            v-for="(item, index) in menuList"
            :key="index"
            :label="item.name"
            :name="item.menuId"
          ></q-tab>
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated class="bg-purple-1 text-center">
          <q-tab-panel :name="item.menuId" v-for="(item, index) in menuList" :key="index">
            <div class="q-pa-md q-gutter-md">
              <q-btn
                icon="fas fa-book"
                :label="m.name"
                :to="m.url"
                size="1.3em"
                color="primary"
                v-for="(m, i) in item.children"
                :key="i"
                class="full-width"
              />
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>
<script>
import common from "../assets/js/common";
export default {
  data() {
    return {
      innerHeight: window.innerHeight - 50,
      tab: "",
      menuList: []
    };
  },
  mounted() {
    var user = this.$q.sessionStorage.getItem("userWap");
    if (user == null || typeof user === "undefined") {
      // this.$q.notify({
      //   message: "未登陆，请重新登陆",
      //   color: "warning"
      // });
      this.$router.push("/Login");
      return;
    }

    // loadMenu
    this.loadMenuData();
  },
  methods: {
    clickSubMenu(v) {
      this.$router.push({ path: v });
    },
    loadMenuData() {
      var callback = res => {
        var data = common.handerData(res, this);
        if (data === "error") {
          return;
        }
        if (typeof data === "undefined" || data.length === 0) {
          this.$q
            .dialog({
              title: "提示",
              message: "暂时还没有您能使用的功能！"
            })
            // .onOk(() => {
            //   console.log("OK");
            // })
            // .onCancel(() => {
            //   console.log("Cancel");
            // })
            .onDismiss(() => {
              var callback = res => {
                this.$q.sessionStorage.remove("userWap");
                this.$router.push("/Login");
              };
              common.get("logout", {}, callback);
            });
          return;
        }
        this.menuList = this.convertToTreeData(data, 0);
        this.tab = this.menuList[0].menuId;
      };

      common.get("getMenu", {}, callback);
    },
    // 递归查询到的menu转为树形
    convertToTreeData(data, pid) {
      const result = [];
      let temp = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].pid === pid) {
          const obj = {
            menuId: data[i].menuId,
            name: data[i].name,
            url: data[i].url,
            img: data[i].img
          };
          temp = this.convertToTreeData(data, data[i].menuId);
          if (temp.length > 0) {
            obj.children = temp;
          }
          result.push(obj);
        }
      }
      return result;
    }
  },
  watch: {
    $route(to, from) {}
  },
  created() {
    var clientHeight =
      document.documentElement.clientHeight || document.body.clientHeight;
    window.onresize = function() {
      var nowClientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      if (clientHeight - nowClientHeight > 60) {
        //因为ios有自带的底部高度
        //键盘弹出的事件处理
        document.getElementById("allDiv").classList.add("focusState");
      } else {
        //键盘收起的事件处理
        document.getElementById("allDiv").classList.remove("focusState");
      }
    };
  }
};
</script>
<style lang="stylus" scoped>
.main {
  background-color: rgba(41, 182, 240, 0.61);
}

.logo {
  text-align: center;
  margin-bottom: 30px;
}

.focusState {
  position: absolute;
}
</style>
