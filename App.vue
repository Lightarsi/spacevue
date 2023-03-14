<template>
  <el-container class="background">
    <el-aside class="el-aside-main" width="260px">
      <SideNav @onNavigate="navigate" />
    </el-aside>
    <el-container>
      <el-header class="header">
        <Head />
      </el-header>
      <el-main v-if="this.index === '1'">
        <Content />
      </el-main>
      <el-main v-if="this.index === '2'">
        <Radars />
      </el-main>
      <el-main v-if="this.index === '3'">
        <ShipManagement />
      </el-main>
      <el-main v-if="this.index === '4'">
        <Messages />
      </el-main>
      <el-main v-if="this.index === '5'">
        <Local-storage />
      </el-main>
      <el-main v-if="this.index === '6'">
        <Geosphere />
      </el-main>
      <el-main v-if="this.index === '7'">
        <Constructions />
      </el-main>
      <el-main v-if="this.index === '8'">
        <Market />
      </el-main>
      <el-main v-if="this.index === '9'">
        <AdministrationPage />
      </el-main>
      <el-main v-if="this.index === '10'">
        <Missions />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Head from "./components/Content/Header.vue";
import SideNav from "./components/Content/SideNav.vue";
import Content from "./components/Content/Content.vue";
import Radars from "./components/Content/Radars.vue";
import ShipManagement from "./components/Content/ShipManagement.vue";
import LocalStorage from "./components/Content/LocalStorage.vue";
import Market from "./components/Content/Market.vue";
import Messages from "./components/Content/Messages.vue";
import Constructions from "./components/Content/Construction.vue";
// import Science from "./components/Content/Science.vue";
import AdministrationPage from "./components/AdministrationPage.vue";
import Missions from "./components/Missions.vue";
import Geosphere from "./components/Content/Geosphere.vue";

export default {
  name: "App",
  data() {
    return {
      index: "1",
    };
  },
  components: {
    Head,
    SideNav,
    Content,
    Radars,
    ShipManagement,
    LocalStorage,
    Market,
    Messages,
    Constructions,
    //Science,
    AdministrationPage,
    Missions,
    Geosphere,
  },
  async mounted() {
    this.index = 1;
    this.$database.axios = require("axios");
    this.$database.axios = this.$database.axios.create({
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      auth: {
        username: "admin",
        password: "lightars",
      },
    });
    this.$database.classes = await this.downloadClasses();
    this.$database.ranks = await this.downloadRanks();
    this.$database.difficulties = await this.downloadDifficulties();
    this.$database.abilities = await this.downloadAbilities();
  },
  methods: {
    navigate(value) {
      this.index = value;
    },
  },
};
</script>

<style>
.content {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-left: 50px;
  padding-right: 200px;
  padding-bottom: 10%;
  padding-top: 100px;
}

.el-select {
  display: block;
  padding-right: 10px;
}
</style>

<style>
.el-table__empty-block {
  display: none !important;
}
.no-bg .el-tabs__header {
  background: none;
  border-bottom: 0px;
}
.canvas {
  background-color: rgb(0, 0, 0, 0);
  width: 100%;
  height: 100%;
  border: 0px solid black;
  margin: 0px;
  padding: 0px;
  margin-left: auto;
  margin-right: auto;
}
.wd100 {
  width: 100%;
  box-sizing: border-box;
}
.wd100 .el-transfer-panel {
  width: 45%;
  box-sizing: border-box;
}
.wd100 .el-transfer__buttons {
  width: 10%;
  box-sizing: border-box;
  text-align: center;
}
.wd100 .el-transfer__buttons .el-button {
  box-sizing: border-box;
  margin: 0px;
}
</style>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
img {
  -khtml-user-select: none;
  -o-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}

.header {
  padding: 0 0;
}

.el-main {
  padding: 0;
}
.el-aside-main {
  overflow-y: auto;
  overflow-x: hidden;
  height: 100vh;
  display: block;
}

.background {
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("https://cdn.suwalls.com/wallpapers/games/xcom-enemy-unknown-15999-1920x1080.jpg");
}
</style>
