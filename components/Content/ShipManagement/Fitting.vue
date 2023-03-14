<template>
  <el-tabs class="no-bg" type="border-card">
    <el-tab-pane
      v-for="item in agent.base.interceptors"
      :key="item.id"
      :label="item.type.type + '_' + item.id"
      :value="item"
    >
      Стоит на вооружении:
      <br /><br />
      <div class="line"
        v-for="(weapon, index) in item.storage.items"
        :key="index"
        :label="weapon.type"
        :value="weapon.type"
      >
        <div class="line">{{ weapon }}</div>
        <el-button
          class="minibutton"
          type="danger"
          @click="unfit(item, weapon)"
          round
          >{{ "X" }}</el-button
        >
      </div>
      <el-button
        class="line"
        type="danger"
        @click="toggle_dialog(item)"
        round
        >{{ "Выбрать вооружение" }}</el-button
      >
    </el-tab-pane>
    <el-dialog
      title="Выбрать вооружение"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span
        ><el-select v-model="chosen_weapon" placeholder="Select">
          <el-option
            v-for="(item, index) in available_weapon_types"
            :key="index"
            :label="item.itemname"
            :value="item.itemname"
          >
          </el-option> </el-select
      ></span>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="success"
          icon="el-icon-check"
          circle
          @click="handle_fit_weapon"
          >Использовать</el-button
        >
      </span>
    </el-dialog>
  </el-tabs>
</template>

<script>
export default {
  data() {
    return {
      world: undefined,
      agent: undefined,
      chosen_weapon: undefined,
      chosen_interceptor: undefined,
      interceptors_to_buy: [],
      weapon_types: [],
      available_weapon_types: [],
      dialogVisible: false,
    };
  },

  methods: {
    toggle_dialog(item) {
      this.chosen_interceptor = item;
      this.dialogVisible = !this.dialogVisible;
    },

    async handle_fit_weapon() {
      let json = {
        interceptor_id: this.chosen_interceptor.id,
        base: this.agent.base.basename,
        weapon: this.chosen_weapon,
      };
      await this.axiosPutItem("interceptors/weapon/fit", json);
    },

    async unfit(interceptor, weapon) {
      let json = {
        interceptor_id: interceptor.id,
        base: this.agent.base.basename,
        weapon: weapon.itemname,
      };
      await this.axiosPutItem("interceptors/weapon/unfit", json);
    },
  },

  async mounted() {
    this.interceptors_to_buy = (await this.axiosGetItem("interceptors")).filter(
      (element) => element.government == "EARTH"
    );
    this.agent = await this.axiosGetItem("character/agents");
    this.agent = this.agent.filter((item) => item.username === "default")[0];
    this.weapon_types = await this.axiosGetItem("interceptors/weapons/type");
    this.weapon_types = this.weapon_types.map((item) => item.itemname);
    this.available_weapon_types = this.agent.base.storage.items
      .filter((item) => this.weapon_types.includes(item.itemname))
      .filter((item) => item.quantity > 0);
    this.world = await this.axiosGetItem("world");
  },
};
</script>

<style scoped>
.line {
  width: 100%;
  white-space: normal;
  word-wrap: break-word;
  display: flex;
  flex-direction: row;
  vertical-align: baseline;
}

.minibutton {
  width: 50px;
  display: flex;
  vertical-align: baseline;
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
  /*background-image: url("../../../assets/grey_bar.jpg");*/
  display: flex;
  flex-direction: row;
}

.internal-1 {
  height: 80%;
  width: 100%;
  border-radius: 25px;
  border: 3px solid #040505;
  padding: 50px;
  /*background-image: url("../../../assets/grey_bar.jpg");*/
  display: flex;
  flex-direction: column;
}
</style>
