<template>
  <div class="content">
    <div class="bordered-round">
      <div class="internal-1">
        <ul>
          <li v-for="region in regions" :key="region.id">
            <el-button type="text" @click="change_region_focus(region.title)">{{
              region.title
            }}</el-button>
          </li>
        </ul>
      </div>
      <div class="internal-2">
        <ul>
          <li v-for="fleet in region_fleet" :key="fleet.id">
            <div class="line">
              Миссия: <br />
              {{ fleet.history.mission.description }}<br /><br />
              <el-button
                class="line"
                type="danger"
                round
                @click="toggle_dialog(fleet, true)"
                >{{
                  fleet.status == "FLY" ? "Перехват" : "Выслать транспорт"
                }}</el-button
              >
              <br />
            </div>
          </li>
        </ul>
      </div>
    </div>
    <el-dialog
      title="Выбрать вооружение"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-select v-model="chosen_base" placeholder="Select">
        <el-option
          v-for="item in world.bases"
          :key="item.id"
          :label="item.basename"
          :value="item"
        >
        </el-option>
      </el-select>
      <el-transfer v-model="chosen_interceptors" :data="free_interceptors">
      </el-transfer>
       <el-button
          type="send"
          icon="el-icon-check"
          circle
          @click="send_fleet"
          >Отправить истребители</el-button
        >
    </el-dialog>
    <el-dialog
      title="Результаты"
      :visible.sync="dialog2Visible"
      width="30%"
    >
     {{ message }}
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      world: undefined,
      radars: [],
      regions: [],
      fleets: [],
      region_fleet: [],
      dialogVisible: false,
      dialog2Visible: false,
      chosen_base: undefined,
      free_interceptors: [],
      chosen_interceptors: [],
      chosen_enemy_fleet: undefined,
      message: undefined,
    };
  },

  methods: {
    change_region_focus(title) {
      this.region_fleet = this.fleets.filter(
        (fleet) => fleet.history.region == title
      );
    },

    toggle_dialog(fleet, b) {
      this.chosen_enemy_fleet = fleet;
      this.dialogVisible = b;
    },

    async send_fleet() {
      let json = {
        interceptorIds: this.chosen_interceptors,
        enemyFleetId: this.chosen_enemy_fleet.id,
        baseName: this.chosen_base.basename,
      };
      let answer = await this.axiosPutItem("battles/start", json);
      this.message = answer.data;
      this.dialog2Visible = true;
    }
  },

  async mounted() {
    this.regions = await this.axiosGetItem("region");
    this.world = await this.axiosGetItem("world");
    this.fleets = this.world.alienFleets.filter((x) => x.status == "FLY");
  },

  watch: {
    chosen_base: function(chosen_base) {
      console.log(chosen_base);
      this.free_interceptors = [];
      chosen_base.interceptors.forEach(interceptor => {
        this.free_interceptors.push( {
          label: interceptor.basename + ":" + interceptor.type.type,
          key: interceptor.id,
        })
      })
      
    },
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

.bordered-round {
  height: 80%;
  width: 100%;
  border-radius: 25px;
  border: 3px solid #040505;
  padding: 50px;
  background-image: url("../../assets/grey_bar.jpg");
  display: flex;
  flex-direction: row;
}

.internal-1 {
  height: 80%;
  width: 30%;
  border-radius: 25px;
  border: 3px solid #040505;
  padding: 50px;
  background-image: url("../../assets/grey_bar.jpg");
  display: flex;
  flex-direction: row;
}

.internal-2 {
  height: 80%;
  width: 60%;
  border-radius: 25px;
  border: 3px solid #040505;
  padding: 50px;
  background-image: url("../../assets/grey_bar.jpg");
  display: flex;
  flex-direction: row;
  overflow-wrap: anywhere;
}
</style>
