<template>
  <div class="content">
    <div class="bordered-round">
      <div class="grid">
        <div
          v-for="item in techs"
          :key="item.id"
          :class="[prev_techs.includes(item) ? activeClass : 'cell']"
          :style="item.grid"
          @mouseover="mouseOver(item)"
          @mouseleave="mouseLeave()"
        >
          <span>{{ item.name }} ({{ item.progress }}%)</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      prev_techs: [],
      techs: [],
      base: 1,
      activeClass: "active_cell",
    };
  },

  methods: {
    async updateScience() {
      let getter = await this.axiosGetItem("science/" + this.base);
      this.techs = getter.map((item) => {
        let grid = {
          gridRow: item.level * 10 + "/" + (item.level * 10 + 5),
          gridColumn: (item.id - 1) * 20 + 1 + "/" + ((item.id - 1) * 20 + 10),
        };
        let next = Object.assign(item);
        next.grid = grid;
        return next;
      });
    },

    mouseOver(item) {
      this.getPrevTechs(item);
    },

    mouseLeave() {
      this.prev_techs = [];
    },

    getPrevTechs(tech) {
      this.prev_techs = this.techs.filter((item) => {
        return item.id == tech.parent;
      });
    },
  },

  async mounted() {
    await this.updateScience();
  },
};
</script>

<style scoped>
.bordered-round {
  height: 80%;
  border-radius: 25px;
  border: 3px solid #040505;
  padding: 50px;
  background-image: url("../../assets/grey_bar.jpg");
}

.cell {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: rgba(28, 196, 202, 0.5);
  box-shadow: 0 0 0 1pt rgba(32, 149, 179, 0.3);
}

.cell:hover {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: rgba(102, 255, 0, 0.5);
  box-shadow: 0 0 0 1pt rgba(102, 255, 0, 0.5);
}
.active_cell {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: rgba(179, 164, 32, 0.5);
  box-shadow: 0 0 0 1pt rgba(179, 164, 32, 0.5);
}

.grid {
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-rows: repeat(100, 1fr);
  grid-template-columns: repeat(100, 1fr);
}
</style>
