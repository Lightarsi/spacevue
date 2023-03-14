<template>
  <div>
    <div
      v-for="item in weapons"
      :key="item.id"
      :label="item.itemname"
      :value="item.itemname"
    >
      {{ item.itemname + " quantity=" + item.quantity }}
    </div>
    <br /><br />
    <el-button class="line" type="danger" @click="toggle_dialog" round>{{
      "Купить вооружение"
    }}</el-button>
    <el-dialog
      title="Выбрать вооружение"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span
        ><el-select v-model="chosen_weapon" placeholder="Select">
          <el-option
            v-for="(item, index) in weapon_types"
            :key="index"
            :label="item"
            :value="item"
          >
          </el-option> </el-select
      ></span>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="success"
          icon="el-icon-check"
          circle
          @click="handleBuyWeapon"
          >Купить</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      agent: undefined,
      weapon_types: [],
      weapons: [],
      dialogVisible: false,
      chosen_weapon: undefined,
    };
  },

  methods: {
    toggle_dialog() {
      this.dialogVisible = !this.dialogVisible;
    },

    async buy_interceptor(chosen) {
      let json = {
        base: this.agent.base.basename,
        interceptor: chosen.type,
      };
      await this.axiosPutItem("interceptors/buy", json);
    },

    async handleBuyWeapon() {
      let json = {
        base: this.agent.base.basename,
        weapon: this.chosen_weapon,
      };
      await this.axiosPutItem("interceptors/weapon/buy", json);
      this.toggle_dialog();
    },
  },

  async mounted() {
    this.agent = await this.axiosGetItem("character/agents");
    this.agent = this.agent.filter((item) => item.username === "default")[0];
    this.weapon_types = await this.axiosGetItem("interceptors/weapons/type");
    this.weapon_types = this.weapon_types.map((item) => item.itemname);
    this.weapons = this.agent.base.storage.items
      .filter((item) => this.weapon_types.includes(item.itemname))
      .filter((item) => item.quantity > 0);
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
