<template>
  <div>
    <div class="container">
      <el-input
        size="small"
        style="text-align:center"
        v-model="current_cycle"
        controls-position="left"
      ></el-input>

      <el-button size="mini" @click="handleGenerate()"
        >Сгенерировать миссию</el-button
      >
    </div>
    <el-table
      class="table-typical"
      :data="tableData"
      stripe
      style="width: 100%"
    >
      <el-table-column prop="id" label="id" width="50px"> </el-table-column>
      <el-table-column prop="cycle" label="Цикл" width="60px">
      </el-table-column>
      <el-table-column prop="mission.name" label="Имя" width="150px">
      </el-table-column>
      <el-table-column prop="mission.description" label="Описание" fit="true">
      </el-table-column>
      <el-table-column prop="mission.score" label="Ценность" fit="true">
      </el-table-column>
      <el-table-column prop="country.title" label="Страна" fit="true">
      </el-table-column> 
      <el-table-column prop="country.region.title" label="Регион" fit="true">
      </el-table-column>
      <el-table-column align="left">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="handleSuccess(scope.$index, scope.row)"
            >Выполнена</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleFail(scope.$index, scope.row)"
            >Провалена</el-button
          >
        </template>
      </el-table-column>
      <el-table-column align="center" fit="true">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Удалить</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      noData: [
        {
          id: "no data",
          difficulty: "no data",
        },
      ],
      tableData: this.exampleData,
      exampleData: [
        {
          country: {
            startFinance: 281,
            id: 33,
            region: {
              id: 8,
              countries: null,
              title: "Арабские государства",
            },
            title: "Иран",
          },
          mission: {
            negativeRating: false,
            XCOM: false,
            score: 150,
            UFOs: null,
            tier: 1,
            subs: null,
            plot: false,
            name: "Сбор ресурсов",
            description: "Сбор ресурсов",
            restrictions: [],
            id: 2,
          },
          success: false,
          finished: false,
          id: 1,
          cycle: 1,
        },
      ],

      row_index: -1,
      current_cycle: "1",
    };
  },
  methods: {
    async handleSuccess(index, row) {
      await this.axiosGetSuccess(row.id);
      this.handleUpdate();
    },
    async handleFail(index, row) {
      await this.axiosGetFail(row.id);
      this.handleUpdate();
    },
    async handleDelete(index, row) {
      let data = await this.axiosDelete(row.id);
      console.log(data);
      this.handleUpdate();
    },
    async handleUpdate() {
      let data = await this.axiosGetHistories();
      this.tableData = data;
    },

    async handleGenerate() {
      console.log("generate");
      await this.axiosGetGenerateMission(this.current_cycle);
      this.handleUpdate();
    },

    axiosGetSuccess(id) {
      const promise = this.$database.axios
        .get(
          "http://localhost:8081/admin/history/finish_success/" + id.toString())
        .catch(function() {
          console.log("Error on Authentication");
        });
      const dataPromise = promise.then((resp) => resp.data);
      return dataPromise;
    },

    axiosGetFail(id) {
      const promise = this.$database.axios.get(
        "http://localhost:8081/admin/history/finish_fail/" + id.toString());
      const dataPromise = promise.then((resp) => resp.data);
      return dataPromise;
    },

    axiosGetHistories() {
      const promise = this.$database.axios.get(
        "http://localhost:8081/admin/history/active");
      const dataPromise = promise.then((resp) => resp.data);
      return dataPromise;
    },

    axiosGetGenerateMission(cycle) {
      const promise = this.$database.axios.get(
        "http://localhost:8081/admin/history/generate/" + cycle);
      const dataPromise = promise.then((resp) => resp.data);
      return dataPromise;
    },

    axiosPost(obj) {
      const axios = require("axios");
      const promise = axios.post(
        "http://localhost:8081/admin/difficulty",
        obj,
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
        {
          auth: {
            username: "admin",
            password: "lightars",
          },
        }
      );
      return promise;
    },

    axiosDelete(index) {
      const axios = require("axios");
      const promise = axios.delete(
        "http://localhost:8081/admin/history",
        {
          params: {
            id: index,
          },
        },
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
        {
          auth: {
            username: "admin",
            password: "lightars",
          },
        }
      );
      return promise;
    },

    axiosPut(obj) {
      const axios = require("axios");
      const promise = axios.put(
        "http://localhost:8081/admin/difficulty",
        obj,
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
        {
          auth: {
            username: "admin",
            password: "lightars",
          },
        }
      );
      return promise;
    },
  },
  mounted() {
    this.tableData = this.noData;
    this.handleUpdate();
  },
};
</script>

<style scoped>
.el-table {
  border: 0px;
  background-color: rgba(0, 0, 0, 0);
}

.container {
  display: flex;
  padding: 10px;
}

.bordered-round {
  border-radius: 25px;
  border: 3px solid #18afb9;
  border-top: none;
  padding-bottom: 10px;
  background-image: url("../../assets/grey_bar.jpg");
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
