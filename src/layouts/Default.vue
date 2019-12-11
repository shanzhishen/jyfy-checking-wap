<template>
  <div class="container">
    <div class="container1">
      <q-layout view="hHh Lpr fFf">
        <q-header elevated class="bg-primary">
          <q-toolbar class="bg-primary glossy text-white">
            <q-btn flat @click="back" round dense icon="fas fa-angle-left"/>
            <q-toolbar-title>考核系统</q-toolbar-title>

            <!-- <q-fab text-color="white" icon="fas fa-bars" push flat direction="down">
              <q-fab-action  text-color="black" icon="mail"/>
              <q-fab-action text-color="black"  icon="alarm"/>
            </q-fab> -->
          </q-toolbar>
        </q-header>
        <q-page-container>
          <router-view/>
        </q-page-container>
      </q-layout>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    back() {
      if (window.history.length <= 1) {
        this.$router.push({ path: "/" });
        return false;
      } else {
        this.$router.go(-1);
      }
    }
  },
  beforeMount() {}
};
</script>
<style lang="stylus" scoped>
.container {
  position: relative;
  height: 100%;
  width: 100%;
  margin: 0 auto;
}

.container::before {
  content: '';
  background: url('../assets/images/background.jpg');
  opacity: 0.25;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  z-index: -1;
  -webkit-filter: blur(1px);
  filter: blur(1px);
}
</style>
