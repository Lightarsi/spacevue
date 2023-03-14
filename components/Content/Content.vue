<template>
  <div class="content">
        <el-tabs class="no-bg" type="border-card">
          <el-tab-pane label="Characteristics"
            ><Complex-table-agent /> <Complex-table-agent-characteristics
          /></el-tab-pane>
          <el-tab-pane label="Primary Class"
            ><Complex-table-class
          /></el-tab-pane>
          <el-tab-pane label="Secondary Class"
            ><Complex-table-class
          /></el-tab-pane>
          <el-tab-pane label="Items" class="max_height"
            ><CharacterInventory
          /></el-tab-pane>
        </el-tabs>
  </div>
</template>

<script>
import ComplexTableAgentCharacteristics from "./Character/ComplexTableAgentCharacteristics.vue";
import ComplexTableAgent from "./Character/ComplexTableAgentInfo.vue";
import ComplexTableClass from "./Character/ComplexTableClass.vue";
import CharacterInventory from "./Character/CharacterInventory.vue";

export default {
  components: {
    ComplexTableAgent,
    ComplexTableAgentCharacteristics,
    ComplexTableClass,
    CharacterInventory,
  },

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bordered-round_x {
  border-radius: 25px;
  border: 2px solid #73ad21;
  border-top: 0px;
  border-bottom: 0px;
}

.max_height {
  height: 1000px;
}

.snav {
  height: 100%; /* 100% Full-height */
  width: 15; /* 0 width - change this with JavaScript */
}

.td2-transform {
  transform: perspective(3000px) rotateX(10deg) rotateY(-10deg) rotateZ(2deg);
}

.no-bg {
  padding-left: 0px;
  padding-right: 0px;
  background: rgb(0, 0, 0, 0);
  border: none;
  opacity: 0.85;
}
</style>
