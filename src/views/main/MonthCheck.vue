<template>
  <div>
    <q-layout
      view="hHh Lpr fff"
      container
      :style="{height: innerHeight + 'px'}"
      class="shadow-2 rounded-borders"
    >
      <!-- <q-footer class="bg-primary glossy">
        <q-toolbar>
          <q-toolbar-title></q-toolbar-title>
          <q-btn flat @click="drawerRight = !drawerRight" round dense icon="fas fa-users"/>
        </q-toolbar>
      </q-footer>-->

      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="fas fa-users" color="primary" @click="drawerRight = !drawerRight"/>
      </q-page-sticky>

      <q-drawer
        side="right"
        v-model="drawerRight"
        bordered
        :width="200"
        :breakpoint="500"
        content-class="bg-grey-5"
      >
        <q-scroll-area class="fit">
          <div class="q-pa-sm">
            <q-list dense bordered padding class="rounded-borders" separator>
              <q-item
                v-for="(item, index) in monthScore"
                :key="index"
                clickable
                v-ripple
                @click="chooseUser(index)"
                :class="{'text-red': item.state === 0, 'bg-blue-grey-5': index===thisIndex }"
              >
                <q-item-section>
                  <div>
                    <span>{{index + 1}}, {{ item.userName }}</span> 
                    <span style="text-align: right;float:right;" v-if="item.state === 1">{{ item.total }}</span>
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <div class="q-gutter-md">
          <q-select
            filled
            v-model="checkInfo"
            :options="checkList"
            @input="checkChange"
            :option-value="opt => opt === null ? null : opt.checkId"
            :option-label="opt => opt === null ? '- Null -' : opt.checkName"
          />
          <q-card
            :class="{'my-card':true,  'text-white':true, 'bg-blue-8':model.state === 1, 'bg-red': model.state === 0}"
          >
            <q-card-section>
              <div class="text-h6">{{thisIndex + 1}} {{model.checkedName}}</div>
              <div class="text-subtitle2">总分： {{model.total}}</div>
            </q-card-section>
            <q-separator/>
            <q-card-actions>
              <q-btn flat style="width:45%" @click="changeUser(-1)">上一位</q-btn>
              <q-btn flat style="width:45%" @click="changeUser(1)">下一位</q-btn>
            </q-card-actions>
          </q-card>

          <q-input
            v-model.number="model.comPoints"
            type="number"
            outlined
            label="综合评分(10分)"
            color="teal"
            @input="comInput"
          />
          <q-input
            v-model.number="model.basicPoints"
            type="number"
            outlined
            label="基础评分(50分)"
            color="teal"
            @input="basicInput"
          />

          <q-btn
            color="positive"
            class="full-width q-mt-md"
            style="width:80%"
            rounded
            label="保 存"
            @click="saveUserScore"
            :disable="checkInfo.state !== 1"
          />
        </div>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import common from "../../assets/js/common";
export default {
  data() {
    return {
      drawerRight: false,
      innerHeight: window.innerHeight - 60,
      checkInfo: {},
      monthScore: [],
      thisIndex: 0,
      model: {
        checkId: null,
        basicPoints: 0,
        comPoints: 0,
        total: 0,
        checkedJnum: "",
        checkedName: "",
        leaderJnum: "",
        leaderName: "",
        state: null
      },
      checkList: []
    };
  },
  methods: {
    checkChange(v) {
      this.model.checkId = v.checkId;
      this.loadMonthScore();
    },
    comInput(val) {
      if (val !== null && val !== "" && !isNaN(val)) {
        if (val >= 0 && val <= 10) {
        } else if (val < 0) {
          this.model.comPoints = 0;
        } else {
          this.model.comPoints = 10;
        }
      } else {
        this.model.comPoints = 0;
      }

      this.model.total = this.model.comPoints + this.model.basicPoints;
    },
    basicInput(val) {
      if (val !== null && val !== "" && !isNaN(val)) {
        if (val >= 0 && val <= 50) {
        } else if (val < 0) {
          this.model.basicPoints = 0;
        } else {
          this.model.basicPoints = 50;
        }
      } else {
        this.model.basicPoints = 0;
      }
      this.model.total = this.model.comPoints + this.model.basicPoints;
    },
    saveUserScore() {
      var param = this.model;
      var callback = res => {
        var msg = common.getMsg(res, this);
        if (msg === "error" || msg == null) {
          return;
        }
        this.$q.notify({
          message: msg,
          color: "grey-6"
        });

        this.monthScore[this.thisIndex].state = 1;
        this.monthScore[this.thisIndex].basicPoints = this.model.basicPoints;
        this.monthScore[this.thisIndex].comPoints = this.model.comPoints;
        this.monthScore[this.thisIndex].total = this.model.total;
        this.changeUser(1);
      };

      common.post("monthChecking/addOne", param, callback);
    },
    loadCheckInfo() {
      var callback = res => {
        var data = common.handerData(res, this);
        if (data === "error") {
          return;
        }
        this.checkList = data.records;
        if (typeof this.checkList != "undefined" && this.checkList.length > 0) {
          this.checkInfo = this.checkList[0];
          this.model.checkId = this.checkInfo.checkId;
          this.loadMonthScore();
        }
      };
      common.get("checkInfo/getList", {}, callback);
    },
    loadMonthScore() {
      var param = {
        checkId: this.checkInfo.checkId
      };
      var callback = res => {
        var data = common.handerData(res);
        if (data === "error") {
          return;
        }
        this.monthScore = data;
        this.thisIndex = 0;
        this.confModel();
      };
      common.get("monthChecking/get", param, callback);
    },
    confModel() {
      var userScore = this.monthScore[this.thisIndex];
      this.model.basicPoints = userScore.basicPoints;
      this.model.comPoints = userScore.comPoints;
      this.model.checkedJnum = userScore.jnum;
      this.model.checkedName = userScore.userName;
      this.model.total = userScore.total;
      this.model.state = userScore.state;
    },
    changeUser(val) {
      var ind = this.thisIndex + val;
      if (ind < 0) {
        this.$q.notify({
          message: "已经是第一位了",
          color: "warning"
        });
        return;
      } else if (ind >= this.monthScore.length) {
        this.$q.notify({
          message: "已经是最后一位了",
          color: "warning"
        });
        return;
      } else {
        this.thisIndex = ind;
        this.confModel();
      }
    },
    chooseUser(index) {
      this.thisIndex = index;
      this.confModel();
      this.drawerRight = !this.drawerRight;
    }
  },
  mounted() {
    var user = this.$q.sessionStorage.getItem("userWap");
    if (user === null) {
      this.$router.push({ path: "/" });
      return;
    }
    this.model.leaderJnum = user.jnum;
    this.model.leaderName = user.name;

    this.loadCheckInfo();
  }
};
</script>

<style lang="stylus" scoped>

</style>

