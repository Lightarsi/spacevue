<template>
  <div class="content">
    <div class="internal-1">
      <el-tabs class="no-bg" type="border-card">
        <el-tab-pane label="Build ship">
          <el-select v-model="chosen_interceptor" placeholder="Select">
            <el-option
              v-for="item in interceptors_to_buy"
              :key="item.id"
              :label="item.type"
              :value="item"
            >
            </el-option>
          </el-select>
          <div class="frame">
            price:
            {{
              this.chosen_interceptor != undefined
                ? chosen_interceptor.price
                : ""
            }}
          </div>
          <div class="button">
            <el-button class="line" type="danger" round @click="buy_interceptor(chosen_interceptor)" >{{ "Купить корабль"  }}</el-button>
            <el-button class="line" type="danger" round @click="buy_interceptor(chosen_interceptor)" >{{ "Построить корабль"  }}</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Ship Management">
          <Fitting />
        </el-tab-pane>
        <el-tab-pane label="Interceptor Weapon Storage">
          <InterceptorWeaponStorage />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Fitting from "./ShipManagement/Fitting.vue";
import InterceptorWeaponStorage from "./ShipManagement/InterceptorWeaponStorage.vue";

export default {
  
  data() {
    return {
      world: undefined,
      agent: undefined,
      chosen_interceptor: undefined,
      interceptors_to_buy: [],
    };
  },

  components: {
    Fitting,
    InterceptorWeaponStorage, 
  },

  methods: {
    async buy_interceptor(chosen) {
      let json = {
        base: this.agent.base.basename,
        interceptor: chosen.type,
      };
      await this.axiosPutItem("interceptors/buy", json);
    },

    async downloadAgent() {
      this.agent = await this.axiosGetItem("character/agents");
      this.agent = this.agent.filter((item) => item.username === "default")[0];
    },
  },

  async mounted() {
    this.interceptors_to_buy = (await this.axiosGetItem("interceptors")).filter(
      (element) => element.government == "EARTH"
    );
    this.downloadAgent();
  },
};
</script>

<style scoped>
.line {
  width: 100%;
  white-space: normal;
  word-wrap: break-word;
  display: flex;
  flex-direction: column;
}

.frame {
  padding: 10px;
}

.button {
  width: 200px;
  display: flex;
}

.bordered-round {
  height: 80%;
  width: 100%;
  border-radius: 25px;
  border: 3px solid #040505;
  padding: 50px;
  /*background-image: url("../../assets/grey_bar.jpg");*/
  display: flex;
  flex-direction: row;
}

.internal-1 {
  height: 80%;
  width: 100%;
  border-radius: 25px;
  border: 3px solid #040505;
  padding: 50px;
  /*background-image: url("../../assets/grey_bar.jpg");*/
  display: flex;
  flex-direction: column;
}
</style>
