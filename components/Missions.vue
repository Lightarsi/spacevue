<template>
  <div class="content">
    <div class="bordered-round">
      <el-tabs class="no-bg" type="border-card">
        <el-tab-pane label="Missions">
          <Histories />
        </el-tab-pane>
        <el-tab-pane label="Finrates"><Finrates /></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Finrates from "./Missions/Finrates.vue";
import Histories from "./Missions/Histories.vue";

export default {
  components: {
    Histories,
    Finrates,
  },
};
</script>

<style scoped>
.bordered-round {
  border-radius: 25px;
  border: 3px solid #040505;
  border-top: none;
  padding: 10px;
  background-image: url("../assets/grey_bar.jpg");
}
</style>
