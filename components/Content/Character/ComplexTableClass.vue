<template>
  <div class="bordered-round">
    <el-table class="table-typical" style="width: 100%">
      <el-table-column label="Базовый класс:" width="250"> </el-table-column>
      <el-table-column :label="classname" fit="true"> </el-table-column>
    </el-table>
    <el-table class="table-typical" style="width: 100%">
      <el-table-column label="Классовые навыки:" width="250"> </el-table-column>
      <el-table-column :label="description" fit="true"> </el-table-column>
    </el-table>
    <el-table class="table-bottom" :data="tableData" stripe style="width: 100%">
      <el-table-column prop="level" label="Уровень" width="180">
      </el-table-column>
      <el-table-column prop="description" label="Описание" fit="true">
        <template slot-scope="scope">
          <el-select
            v-model="tableData[scope.$index].abilityname"
            placeholder="Select"
            no-data-text="no data"
            style="text-align:center"
            controls-position="right"
            width="500"
            @change="chooseAbility($event)"
          >
            <el-option
              v-for="item in options.get(scope.$index + 1)"
              :key="item.id"
              :label="item.abilityname"
              :value="item.id"
              :disabled="item.level > agent.level"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      agent: undefined,
      clazz: "no_data",
      description: "no_data",
      classname: "no_data",
      options: new Map(),
      tableData: [
        {
          level: "Уровень 1",
          abilityname: "Крепкие кости. +1 Т",
        },
        {
          level: "Уровень 2",
          abilityname: "Уклонение. +2 Sv в рукопашном бою.",
        },
        {
          level: "Уровень 3",
          abilityname:
            "Люблю хорошую драку! Доп. действие инициации боя. Применяется только последним.",
        },
        {
          level: "Уровень 4",
          abilityname:
            "Бегать и стрелять. Стрельба после двух действий движения раз в два хода.",
        },
        {
          level: "Уровень 5",
          abilityname:
            "Ты! Эй, ты! Да я тебя. WP+2d6 против WP+d6 противника. При успехе враг не может атаковать никого, кроме персонажа.",
        },
        {
          level: "Уровень 6",
          abilityname:
            "Не поможет!. Стрельба из дробовика игнорирует незначительное и слабое укрытие. +2 к STR оружия при стрельбе по цели без укрытия или в упор. ",
        },
        {
          level: "Уровень 7",
          abilityname:
            "Берсерк. х2 таймеры ранений. Встает на пределе сил с полными ОД и без потерь характеристик.",
        },
        {
          level: "Уровень 8",
          abilityname:
            "Мастер клинка. Рукопашное оружие персонажа понижает Sv противника на свой показатель АР до максимума в -3.",
        },
      ],
    };
  },
  methods: {
    async downloadAgent() {
      this.agent = await this.axiosGetItem("character/agents");
      this.agent = this.agent.filter(
        (item) => item.username === "default"
      )[0];
      //class
      this.clazz = this.agent.clazz;
      this.classname = this.clazz.classname;
      this.description = this.clazz.description;
    },

    async chooseAbility(event) {
      var path = "character/choose_ability/" + this.agent.agentid + "/" + event;
      await this.axiosGetItem(path);
      console.log(path);
    },

    async updateTable() {
      this.tableData = [];
      this.agent.abilities.sort((prev, next) => prev.level < next.level).forEach(element => {
        this.tableData.push(element);
      });
      while(this.tableData.length < 8) {
        this.tableData.push({
          level: this.tableData.length + 1,
          abilityname: "Не выбран",
        });
      }
      this.clazz.abilities.sort((prev, next) => prev.level < next.level).forEach(element => {
        var arr = this.options.get(element.level) ?? [];
        arr.push(element);
        this.options.set(element.level, arr);
      });
    },
  },

  async mounted() {
    await this.downloadAgent();
    this.updateTable()
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
  padding-top: 10px;
  background-image: url("../../../assets/grey_bar.jpg");
}

.table-typical {
  padding-left: 10px;
  padding-right: 10px;
}

.table-bottom {
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
}
</style>
