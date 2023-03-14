<template>
  <div class="bordered-round">
    <div class="grid">
      <div class="character-image">
        <img
          src="../../../assets/2.png"
          width="100%"
          height="100%"
          alt="CharacterImage"
        />
      </div>
      <el-tooltip
        class="item"
        effect="dark"
        :content="armor.armorDescription"
        placement="top-end"
      >
        <div
          class="armor"
          :style="[
            armor.armor != undefined
              ? {
                  'background-image':
                    'url(' + require('@/assets/armor/' + armor.armorLink) + ')',
                }
              : '',
          ]"
          @click="clickedArmor"
        />
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="dark"
        :content="weapon.weaponDescription"
        placement="top-end"
      >
        <div
          class="right-arm"
          :style="[
            weapon.weapon != undefined
              ? {
                  'background-image':
                    'url(' +
                    require('@/assets/weapon/' + weapon.weaponLink) +
                    ')',
                }
              : '',
          ]"
          @click="clickedRight"
        />
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="dark"
        :content="weapon.weaponDescription"
        placement="top-end"
      >
        <div
          class="left-arm"
          :style="[
            weapon.weapon != undefined
              ? {
                  'background-image':
                    'url(' +
                    require('@/assets/weapon/' + weapon.weaponLink) +
                    ')',
                }
              : '',
          ]"
          @click="clickedLeft"
        />
      </el-tooltip>
      <div class="backpack" />
    </div>
    <div class="right_part"></div>
    <el-dialog
      title="Выбрать броню"
      :visible.sync="dialogArmorVisible"
      width="30%"
    >
      <span
        ><el-select v-model="armor_value" placeholder="Select">
          <el-option
            v-for="item in agent.storage.items"
            :key="item.id"
            :label="item.itemname"
            :value="item.itemname"
          >
          </el-option> </el-select
      ></span>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="fail"
          icon="el-icon-check"
          circle
          @click="handleDropArmor"
        ></el-button>
        <el-button
          type="success"
          icon="el-icon-check"
          circle
          @click="handleWearArmor"
        ></el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="Выбрать оружие в правой руке"
      :visible.sync="dialogLeftVisible"
      width="30%"
    >
      <span
        ><el-select v-model="leftValue" placeholder="Select">
          <el-option
            v-for="item in agent.storage.items"
            :key="item.id"
            :label="item.itemname"
            :value="item.itemname"
          >
          </el-option> </el-select
      ></span>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="fail"
          icon="el-icon-check"
          circle
          @click="handleDropWeapon"
        ></el-button>
        <el-button
          type="success"
          icon="el-icon-check"
          circle
          @click="handleWearWeapon"
        ></el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      agent: undefined,
      armor: {
        armorDescription: undefined,
        armorLink: undefined,
      },
      dialogArmorVisible: false,
      armor_value: undefined,
      weapon: {
        weaponDescription: undefined,
        weaponLink: undefined,
      },
      dialogLeftVisible: false,
      dialogRightVisible: false,
      leftValue: undefined,
      rightValue: undefined,
    };
  },

  methods: {
    clickedArmor() {
      this.dialogArmorVisible = true;
    },

    clickedLeft() {
      this.dialogLeftVisible = true;
    },

    clickedRight() {
      this.dialogRightVisible = true;
    },

    async handleDropArmor() {
      this.dialogArmorVisible = false;
      let json = {
        agent: this.agent.agentname,
      };
      await this.axiosPutItem("character/wearArmor", json);
      await this.downloadAgent();
    },

    async handleWearArmor() {
      this.dialogArmorVisible = false;
      let json = {
        agent: this.agent.agentname,
        armor: this.armor_value,
      };
      await this.axiosPutItem("character/wearArmor", json);
      await this.downloadAgent();
    },

    async handleDropWeapon() {
      this.dialogLeftVisible = false;
      this.dialogRightVisible = false;
      let json = {
        agent: this.agent.agentname,
      };
      await this.axiosPutItem("character/wearWeapon", json);
      await this.downloadAgent();
    },

    async handleWearWeapon() {
      this.dialogLeftVisible = false;
      this.dialogRightVisible = false;
      let json = {
        agent: this.agent.agentname,
        weapon: this.leftValue,
      };
      await this.axiosPutItem("character/wearWeapon", json);
      await this.downloadAgent();
    },

    handleCloseDialogs() {
      this.dialogRightVisible = false;
      this.dialogLeftVisible = false;
    },

    async downloadAgent() {
      this.agent = await this.axiosGetItem("character/agents");
      this.agent = this.agent.filter((item) => item.username === "default")[0];
    },
  },

  async mounted() {
    await this.downloadAgent();
  },

  watch: {
    agent: function(agent) {
      this.armor = {
        armorDescription: agent?.armor?.description,
        armorLink: agent?.armor?.link,
        armor: agent?.armor,
      };
      this.weapon = {
        weaponDescription: agent?.weapon?.specials,
        weaponLink: agent?.weapon?.link,
        weapon: agent?.weapon,
      };
    },
  },
};
</script>

<style scoped>
.right_part {
  display: flex;
  flex-direction: column;
  padding: 0px;
  height: 100%;
  flex: 1;
}
.bordered-round {
  display: flex;
  width: 100%;
  height: 100%;
  border-radius: 25px;
  border: 3px solid #040505;
  border-top: none;
  padding: 10px;
  background-image: url("../../../assets/grey_bar.jpg");
}
.grid {
  display: grid;
  flex: 2;
  width: 100%;
  height: 100%;
  grid-template-rows: repeat(100, 1fr);
  grid-template-columns: repeat(100, 1fr);
}
.character-image {
  grid-row: 30 / 100;
  grid-column: 33 / 66;
  border-radius: 25px;
  border: 0px solid #040505;
}
.right-arm {
  grid-row: 33 / 66;
  grid-column: 1 / 30;
  border-radius: 25px;
  border: 3px solid #040505;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  z-index: 1;
}
.left-arm {
  grid-row: 33 / 66;
  grid-column: 69 / 99;
  border-radius: 25px;
  border: 3px solid #040505;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  z-index: 1;
}
.backpack {
  grid-row: 1 / 25;
  grid-column: 1 / 100;
  border-radius: 25px;
  border: 3px solid #040505;
}
.armor {
  grid-row: 38 / 65;
  grid-column: 37 / 60;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 25px;
  border: 3px solid #040505;
  z-index: 1;
}
.item1 {
  grid-area: 11;
  width: 100%;
  height: 100%;
  background-color: black;
}

.platform {
  display: block;
  background: url("../../../assets/platform_transparent.png") 60px 685px;
  background-repeat: no-repeat;
  background-size: 80% 200px;
}
</style>
