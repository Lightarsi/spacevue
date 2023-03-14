<template>
  <div class="bordered-round">
    <el-table
      class="table-typical"
      :data="tableData"
      stripe
      style="width: 100%"
    >
      <el-table-column prop="chr" label="Характеристики" width="180" fit="true">
      </el-table-column>
      <el-table-column prop="armor" label="Броня" fit="true"> </el-table-column>
      <el-table-column prop="abilities" label="Навыки" fit="true">
      </el-table-column>
      <el-table-column prop="items" label="Вещи" fit="true"> </el-table-column>
      <el-table-column prop="expAdd" label="За опыт" fit="true">
      </el-table-column>
      <el-table-column prop="basic" label="База" fit="true"> </el-table-column>
      <el-table-column prop="sum" label="Общее" fit="true"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableDataExample: [
        {
          chr: "STR",
          armor: "1",
          abilities: "1",
          items: "1",
          expAdd: "1",
          basic: "1",
          sum: "1",
        },
      ],
      tableData: [],
      attrs: [
        "STR",
        "AGI",
        "AIM",
        "T",
        "HP",
        "WP",
        "FA",
        "RA",
        "FSv",
        "RSv",
        "FHHSv",
        "RHHSv",
      ],
      basicChars: {
        STR: 1,
        AGI: 1,
        AIM: 1,
        T: 2,
        HP: 1,
        WP: 1,
        FA: 0,
        RA: 0,
        FSv: 6,
        RSv: 6,
        FHHSv: 4,
        RHHSv: 4,
      },

      agent: undefined,
      abilities: [],
    };
  },

  methods: {
    updateTable() {
      let minusAttrs = ["FSv", "RSv", "FHHSv", "RHHSv"];
      this.tableData = [];
      this.attrs.forEach((item) => {
        let row = {
          chr: item,
          armor: this.agent?.armor?.attribute[item] ?? 0,
          abilities: this.agent.abilities.reduce((prev, next) => prev + (next.attribute[item] ?? 0), 0),
          items: 0,
          expAdd: 0,//this.agent.attrs[item],
          basic: this.basicChars[item] ?? -999999,
          get sum() {
            if (minusAttrs.includes(this.chr)) {
              return (
                (Number(this.basic) -
                Number(this.armor) -
                Number(this.abilities) -
                Number(this.items) -
                Number(this.expAdd)).toString() + "+"
              );
            }
            return (
              Number(this.armor) +
              Number(this.abilities) +
              Number(this.items) +
              Number(this.expAdd) +
              Number(this.basic)
            );
          },
        };
        this.tableData.push(row);
      });
    },

    async downloadAgent() {
      this.agent = await this.axiosGetItem("character/agents");
      this.agent = this.agent.filter(
        (item) => item.username === "default"
      )[0];
    },
  },
  async mounted() {
    await this.downloadAgent();
    this.updateTable();
  },
};
</script>

<style scoped>
.el-table {
  border: 0px;
  background-color: rgba(0, 0, 0, 0);
}

.bordered-round {
  border-radius: 25px;
  border: 3px solid #18afb9;
  border-top: none;
  padding-bottom: 10px;
  background-image: url("../../../assets/grey_bar.jpg");
}

.el-table::before {
  height: 0px;
}

.el-table--border::after {
  width: 0px;
}

.table-typical {
  padding-left: 10px;
  padding-right: 10px;
}
</style>
