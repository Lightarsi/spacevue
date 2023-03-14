<template>
  <div class="content">
    <div class="bordered-round">
      <el-transfer
        filter-placeholder="Фильтр"
        class="wd100"
        v-model="value"
        :data="data"
        :titles="['Локальное хранилице', 'Склад']"
        @change="onChange"
        @left-check-change="onLeftCheck"
        @right-check-change="onRightCheck"
      >
      <span slot-scope="{ option }">{{ option.quantity }} - {{ option.label }}</span>
      </el-transfer>
    </div>
    <el-dialog title="Перенос" :visible.sync="dialogVisible" width="30%">
      <div v-for="(item, index) in checkedItems" :key="index">
        <span class="demonstration">{{ item.label }}</span>
        <el-slider
          v-model="slider_value"
          :max="data[item.key].quantity"
          :min="0"
        ></el-slider>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Отменить</el-button>
        <el-button type="primary" @click="confirmTransfer"
          >Подтвердить</el-button
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
      data: [],
      checkedItemsLeft: [],
      checkedItemsRight: [],
      checkedItems: [],
      direction: undefined,
      dialogVisible: false,
      value: [],
      slider_value: 1,
    };
  },

  methods: {
    // eslint-disable-next-line no-unused-vars
    onChange(value, direction, movedKeys) {
      this.transferItems(direction);
      this.updateStorage();
    },

    onLeftCheck(param1) {
      this.checkedItemsLeft = param1;
    },

    onRightCheck(param1) {
      this.checkedItemsRight = param1;
    },

    transferItems(direction) {
      if (direction == "left") {
        let keys = this.checkedItemsRight.slice();
        this.checkedItems = this.data.filter((item) => {
          return keys.includes(item.key);
        });
        this.dialogVisible = true;
        this.direction = direction;
      } else {
        let keys = this.checkedItemsLeft.slice();
        this.checkedItems = this.data.filter((item) => {
          return keys.includes(item.key);
        });
        this.dialogVisible = true;
        this.direction = direction;
      }
    },

    async confirmTransfer() {
      if (this.direction == "left") {
        let json = this.checkedItems.map((it) => {
          return {
            "typeFrom": "base",
            "from": this.agent.base.basename,
            "typeTo": "agent",
            "to": this.agent.agentname,
            "item": it.itemname,
            "quantity": this.slider_value,
          };
        });
        console.log(json);
        await this.axiosPutItem("storage/transfer", json);
      } else {
        let json = this.checkedItems.map((it) => {
          return {
            "typeTo": "base",
            "to": this.agent.base.basename,
            "typeFrom": "agent",
            "from": this.agent.agentname,
            "item": it.itemname,
            "quantity": this.slider_value,
          };
        });
        console.log(json);
        await this.axiosPutItem("storage/transfer", json);
      }
      this.updateStorage();
      this.dialogVisible = false;
    },

    async updateStorage() {
      await this.downloadAgent();
      this.data = [];
      this.value = [];
      let local = this.agent.storage.items;
      let full = this.agent.base.storage.items;
      let count = 0;
      for(let i=0; i<local.length; i++) {
        this.data.push({
          key: i,
          label: local[i].itemname + " " + local[i].quantity,
          itemname: local[i].itemname,
          quantity: local[i].quantity,
          disabled: false,
        })
        count++;
      }
      for(let i=count; i<full.length + count; i++) {
        this.data.push({
          key: i,
          label: full[i-count].itemname + " " + full[i-count].quantity,
          itemname: full[i-count].itemname,
          quantity: full[i-count].quantity,
          disabled: false,
        })
        this.value.push(i);
      }
    },

    async downloadAgent() {
      this.agent = await this.axiosGetItem("character/agents");
      this.agent = this.agent.filter(
        (item) => item.username === "default"
      )[0];
    },
  },

  async mounted() {
    await this.updateStorage();
  },
};
</script>

<style scoped>
.bordered-round {
  border-radius: 25px;
  border: 3px solid #040505;
  border-top: none;
  padding: 10px;
  background-image: url("../../assets/grey_bar.jpg");
}
</style>
