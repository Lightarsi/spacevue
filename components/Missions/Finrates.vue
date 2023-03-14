<template>
  <div class="bordered-round">
    <el-button size="mini" type="success" class="button" @click="handleUpdate()"
      >Обновить</el-button
    >
    <el-table class="table-typical" :data="tableData" style="width: 100%">
      <el-table-column
        prop="title"
        label="Страна"
        width="100px"
      ></el-table-column>
      <el-table-column
        prop="map.1.economy"
        label="Эко1"
        width="fit"
      ></el-table-column>
      <el-table-column
        prop="map.1.rate"
        label="Рейт1"
        width="fit"
      ></el-table-column>
      <el-table-column
        prop="map.2.economy"
        label="Эко2"
        width="fit"
      ></el-table-column>
      <el-table-column
        prop="map.2.rate"
        label="Рейт2"
        width="fit"
      ></el-table-column>
      <el-table-column
        prop="map.3.economy"
        label="Эко3"
        width="fit"
      ></el-table-column>
      <el-table-column
        prop="map.3.rate"
        label="Рейт3"
        width="fit"
      ></el-table-column>
      <el-table-column
        prop="map.4.economy"
        label="Эко4"
        width="fit"
      ></el-table-column>
      <el-table-column
        prop="map.4.rate"
        label="Рейт4"
        width="fit"
      ></el-table-column>
      <el-table-column
        prop="map.5.economy"
        label="Эко5"
        width="fit"
      ></el-table-column>
      <el-table-column
        prop="map.5.rate"
        label="Рейт5"
        width="fit"
      ></el-table-column>
      <el-table-column
        prop="map.6.economy"
        label="Эко6"
        width="fit"
      ></el-table-column>
      <el-table-column
        prop="map.6.rate"
        label="Рейт6"
        width="fit"
      ></el-table-column>
      <el-table-column
        prop="map.7.economy"
        label="Эко7"
        width="fit"
      ></el-table-column>
      <el-table-column
        prop="map.7.rate"
        label="Рейт7"
        width="fit"
      ></el-table-column>
      <el-table-column
        prop="map.8.economy"
        label="Эко8"
        width="fit"
      ></el-table-column>
      <el-table-column
        prop="map.8.rate"
        label="Рейт8"
        width="fit"
      ></el-table-column>
      <el-table-column
        prop="map.9.economy"
        label="Эко9"
        width="fit"
      ></el-table-column>
      <el-table-column
        prop="map.9.rate"
        label="Рейт9"
        width="fit"
      ></el-table-column>
      <el-table-column
        prop="map.10.economy"
        label="Эко10"
        width="fit"
      ></el-table-column>
      <el-table-column
        prop="map.10.rate"
        label="Рейт10"
        width="fit"
      ></el-table-column>
      <el-table-column
        prop="map.11.economy"
        label="Эко11"
        width="fit"
      ></el-table-column>
      <el-table-column
        prop="map.11.rate"
        label="Рейт11"
        width="fit"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    async handleUpdate() {
      let data = await this.axiosGetFinrates();
      this.tableData = data;
    },

    axiosGetFinrates() {
      const promise = this.$database.axios
        .get(
          "http://localhost:8081/admin/rating")
        .catch(function() {
          console.log("Error on Authentication");
        });
      const dataPromise = promise.then((resp) => resp.data);
      console.log(dataPromise);
      return dataPromise;
    },

    axiosGetFinratesTest() {
      const promise = this.$database.axios.get("http://localhost:8081/admin/rating");
      const dataPromise = promise.then((resp) => resp.data);
      return dataPromise;
    },
  },
  async mounted() {
    await this.handleUpdate();
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
  background-image: url("../../assets/grey_bar.jpg");
  display: flex;
  flex-flow: column wrap;
}

.table-typical {
  padding-left: 10px;
  padding-right: 10px;
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  border: 3px solid green;
}
</style>
