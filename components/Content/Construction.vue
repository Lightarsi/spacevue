<template>
  <div class="content">
    <div class="bordered-round">
      <div class="grid" :key="key">
        <div
          v-for="(item, index) in pattern"
          :key="'pattern' + index"
          :class="item.class"
          :style="item.grid"
          @mousemove="mousemove(item)"
        ></div>
        <div
          v-for="item in constructions"
          :key="'construction ' + item.id"
          :class="item.class"
          :style="{
            gridArea: item.gridArea,
            backgroundImage: 'url(' + require('@/assets/'+ item.link)  + ')',
          }"
        ></div>
        <div
          :class= "['cell', 'active']"
          :style="{
            gridArea: active_grid_area,
            backgroundImage: 'url(' + require('@/assets/'+ activeBuilding.link)  + ')',
          }"
          @click="clickedGrid($event)"
        ></div>
      </div>
      <div class="right_part">
        <div
          v-for="item in buildings"
          :key="item.id"
          class="building"
          @click="clicked(item)"
        >
          <div class="image">
            <span class="center_text">{{ item.structureName }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cell {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: 0 0 0 1pt rgba(32, 149, 179, 0.3);
}

.construction {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: 0 0 0 1pt rgba(32, 149, 179, 0.3);
}

.active {
  position: relative;
  box-shadow: 0 0 0 2pt blue;
  z-index: 2;
}

.building {
  display: flex;
  background-color: white;
  border: 3px solid #040505;
  flex: 1;
}

.building:hover {
  background-color: white;
  border: 3px solid green;
  flex: 1;
}

.image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../../assets/grey_bar.jpg");
}

.center_text {
  font-size: 2vw;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}

.bordered-round {
  display: flex;
  width: 100%;
  height: 100%;
  border-radius: 25px;
  border: 3px solid #040505;
  border-top: none;
  padding: 10px;
  background-image: url("../../assets/grey_bar.jpg");
}

.grid {
  display: grid;
  flex: 2;
  height: 100%;
  grid-template-rows: repeat(10, 1fr);
  grid-template-columns: repeat(12, 1fr);
}
.right_part {
  display: flex;
  flex-direction: column;
  padding: 0px;
  height: 100%;
  flex: 1;
}
</style>

<script>
export default {
  data() {
    return {
      agent: undefined,
      buildings: undefined,
      constructions: undefined,
      pattern: undefined,
      activeId: 11,
      activeBuilding: {
        xSize: 1,
        ySize: 1,
      },
      level: 2,
      base: 1,
      key: 0,
      active_x: 1,
      active_y: 1,
      active_grid_area: "2 / 2 / 2 / 2",
    };
  },
  methods: {
    clicked(item) {
      this.activeBuilding = item;
    },

    async createBuilding() {
      let json = {
        x: this.active_x,
        y: this.active_y,
        structure: this.activeBuilding?.structureName,
        base: "default",
      };
      console.log(json);
      await this.axiosPostItem("constructions/create", json);
      await this.updateConstructions();
    },

    async clickedGrid(item) {
      await this.createBuilding(item);
    },

    updateActive() {
      this.pattern.forEach((item) => {
        if (item.id == this.activeId) {
          if (this.activeBuilding.link == undefined) {
            return;
          }
          item.active = true;
          item.link = this.activeBuilding.link;
        } else {
          item.active = false;
        }
      });
    },

    mousemove(pattern) {
      let j = pattern.x;
      let i = pattern.y;
      this.active_grid_area = `${i} / ${j} / ${i +
        this.activeBuilding.xSize} / ${j + this.activeBuilding.ySize}`;
      this.active_x = j;
      this.active_y = i;
    },

    async downloadAgent() {
      this.agent = await this.axiosGetItem("character/agents");
      this.agent = this.agent.filter((item) => item.username === "default")[0];
    },

    async updateConstructions() {
      this.constructions = await this.axiosGetItem("constructions");
      this.constructions = this.constructions.map((construction) => {
        return {
          gridArea: `${construction.y} / ${construction.x} / ${construction.y +
            construction.structure.ySize} / ${construction.x +
            construction.structure.xSize}`,
          class: "construction",
          link: construction.structure.link,
          id: construction.id,
        };
      });
    },
  },

  async mounted() {
    await this.downloadAgent();
    this.buildings = await this.axiosGetItem("structures");
    this.pattern = [];
    for (let i = 1; i <= 10; i++) {
      for (let j = 1; j <= 12; j++) {
        if (i >= 5 && j <= 8) {
          continue;
        }
        this.pattern.push({
          class: "cell",
          x: j,
          y: i,
          grid: {
            gridArea: `${i} / ${j} / ${i} / ${j}`,
          },
        });
      }
    }
    this.activeBuilding = this.buildings[0];
    await this.updateConstructions();
  },
};
</script>
