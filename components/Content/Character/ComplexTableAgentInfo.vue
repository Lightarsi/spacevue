<template>
  <div class="bordered-round">
    <el-table class="table-typical" :data="tableData" style="width: 100%">
      <el-table-column label="Имя персонажа">
        <el-table-column label="Звание">
          <el-table-column label="Уровень сложности"></el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column :label="agent_name">
        <el-table-column :label="rank">
          <el-table-column :label="difficulty"></el-table-column>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      agent: undefined,
      agent_name: "no_data",
      rank: "no data",
      difficulty: "no data",
    };
  },
  methods: {
    navigate(value) {
      this.index = value;
    },

    async downloadAgent() {
      this.agent = await this.axiosGetItem("character/agents");
      this.agent = this.agent.filter((item) => item.username === "default");
      this.agent_name = this.agent[0].agentname;
      this.rank = this.agent[0].rank;
      this.difficulty = this.agent[0].difficulty;
    },
  },
  async mounted() {
    await this.downloadAgent();
  },
};
</script>

<style scoped>
.el-table {
  background-color: rgba(0, 0, 0, 0);
}

.el-table::before {
  height: 0px;
}

.el-table--border::after {
  width: 0px;
}

.el-table--border,
.el-table--group {
  border: 0px solid #ebeef5;
}

.bordered-round {
  border-radius: 25px;
  border: 3px solid #18afb9;
  border-bottom: none;
  padding-top: 10px;
  background-image: url("../../../assets/grey_bar.jpg");
}

.table-typical {
  padding-left: 10px;
  padding-right: 10px;
}
</style>
