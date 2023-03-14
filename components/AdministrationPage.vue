<template>
  <div class="content">
    <div class="bordered-round">
      <el-tabs class="no-bg" type="border-card">
        <el-tab-pane label="Agents">
          <Agent />
        </el-tab-pane>
        <el-tab-pane label="Armors"><Armor /></el-tab-pane>
        <el-tab-pane label="Items"></el-tab-pane>
        <el-tab-pane label="Classes">
          <Classes />
        </el-tab-pane>
        <el-tab-pane label="Abilities"> <Abilities /> </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Abilities from "./Administration/Abilities.vue";
import Agent from "./Administration/Agent.vue";
import Armor from "./Administration/Armor.vue";
import Classes from "./Administration/Classes.vue";

export default {
  components: {
    Classes,
    Abilities,
    Armor,
    Agent,
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
