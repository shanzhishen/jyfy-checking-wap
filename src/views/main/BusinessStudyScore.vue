<template>
  <div>
    <q-layout
      view="hHh Lpr fff"
      container
      :style="{height: innerHeight + 'px'}"
      class="shadow-2 rounded-borders"
    >
      <q-page-container>
        <div class="q-gutter-md">
          <q-select
            filled
            v-model="studyInfo"
            :options="studyList"
            @input="studyChange"
            :option-value="opt => opt === null ? null : opt.id"
            :option-label="opt => opt === null ? '- Null -' : opt.title"
          />
          <q-card :class="{'my-card':true,  'text-white':true, 'bg-blue-8':modelState, 'bg-red': !modelState}">
            <q-card-section>
              <div class="text-h6">{{studyInfo.title}}</div>
              <div class="text-subtitle2">主讲人： {{studyInfo.speakerName}}</div>
              <div class="text-subtitle2">日期： {{studyInfo.speakDate}}</div>
              <div
                class="text-subtitle2"
              >得分： {{model.score1 + model.score2 + model.score3+ model.score4 || 0}}</div>
            </q-card-section>
            <q-separator />
            <!-- <q-card-actions>
              <q-btn flat style="width:45%" @click="changeUser(-1)">上一位</q-btn>
              <q-btn flat style="width:45%" @click="changeUser(1)">下一位</q-btn>
            </q-card-actions>-->
          </q-card>
          <q-form ref="scoreForm">
            <q-input
              v-model.number="model.score1"
              type="number"
              outlined
              label="主讲内容(40分)"
              color="teal"
              :rules="[ val => val >= 0 && val <= 40 || '分数范围：0-40']"
            />
            <q-input
              v-model.number="model.score2"
              type="number"
              outlined
              label="个人风格(15分)"
              color="teal"
              :rules="[ val => val >= 0 && val <=15 || '分数范围：0-15']"
            />
            <q-input
              v-model.number="model.score3"
              type="number"
              outlined
              label="效果评价(30分)"
              color="teal"
              :rules="[ val => val >= 0 && val <=30 || '分数范围：0-30']"
            />
            <q-input
              v-model.number="model.score4"
              type="number"
              outlined
              label="综合素质(15分)"
              color="teal"
              :rules="[ val => val >= 0 && val <=15 || '分数范围：0-15']"
            />
          </q-form>

          <q-btn
            color="positive"
            class="full-width q-mt-md"
            style="width:80%"
            rounded
            label="保 存"
            @click="saveStudyScore"
            :disable="studyInfo.state === 10"
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
      studyList: [],
      studyInfo: {
        id: "",
        title: "",
        speakerJnum: "",
        speakerName: "",
        speakDate: "",
        remark: "",
        state: ""
      },
      model: {
        studyId: "",
        score1: "",
        score2: "",
        score3: "",
        score4: ""
      },
      modelState: false,
      innerHeight: window.innerHeight - 60
    };
  },
  methods: {
    studyChange(v) {
      console.log(v);
      this.getOneDetail(v.id);
    },
    loadStudyList() {
      var param = {};
      var callback = res => {
        var data = common.handerData(res, this);
        this.studyList = data.records;
        console.log(this.studyList);
        if (this.studyList.length > 0) {
          this.studyInfo = this.studyList[0];
          this.getOneDetail(this.studyInfo.id);
        }
      };
      common.get("businessStudy/getList", {}, callback);
    },
    // 上传
    saveStudyScore() {
      this.$refs.scoreForm.validate().then(success => {
        if (success) {
          var callback = res => {
            var msg = common.getMsg(res, this);
            this.$q.notify({ color: "success", message: "保存成功" });
            this.getOneDetail(this.model.studyId)
          };
          common.post("businessStudy/addOneScore", this.model, callback);
        } else {
          console.log(success);
        }
      });
    },
    getOneDetail(id) {
      var param = {
        id: id
      };
      var callback = res => {
        var data = common.handerData(res);
        console.log(data);
        if (data == null) {
          this.modelState = false;
          this.model = {
            studyId: id,
            score1: "",
            score2: "",
            score3: "",
            score4: ""
          };
          this.$refs.scoreForm.resetValidation();
        } else {
          this.modelState = true;
          this.model = {
            studyId: id,
            score1: data.score1,
            score2: data.score2,
            score3: data.score3,
            score4: data.score4
          };
        }
      };
      common.get("businessStudy/getOneScore", param, callback);
    }
  },
  mounted() {
    this.loadStudyList();
  }
};
</script>

<style lang="stylus" scoped></style>