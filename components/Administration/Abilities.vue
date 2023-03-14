<template>
  <div>
    <el-table
      class="table-typical"
      :data="tableData"
      stripe
      style="width: 100%"
    >
      <el-table-column prop="id" label="id" width="70px"> </el-table-column>
      <el-table-column
        prop="abilityname"
        label="Название способности"
        fit="true"
      >
        <template slot-scope="scope">
          <el-input
            size="small"
            style="text-align:center"
            v-model="scope.row.abilityname"
            controls-position="right"
            :disabled="row_index != scope.$index"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="Класс" fit="true">
        <template slot-scope="scope">
          <el-select
            v-model="tableData[scope.$index].class_id"
            size="small"
            filterable
            remote
            reserve-keyword
            no-data-text="no data"
            placeholder="Please enter a keyword"
            :remote-method="downloadClasses"
            :loading="loading"
            loading-text="loading"
            :disabled="row_index != scope.$index"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        prop="level"
        label="Уровень способности"
        fit="true"
      >
        <template slot-scope="scope">
          <el-input
            size="small"
            style="text-align:center"
            v-model="scope.row.level"
            controls-position="right"
            :disabled="row_index != scope.$index"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="choice" label="Вариант" fit="true">
        <template slot-scope="scope">
          <el-input
            size="small"
            style="text-align:center"
            v-model="scope.row.choice"
            controls-position="right"
            :disabled="row_index != scope.$index"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column align="center">
        <template slot="header">
          <el-button size="mini" @click="handleCreate()">Create</el-button>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index)"
            v-if="row_index != scope.$index"
            >Edit</el-button
          >
          <el-button
            size="mini"
            @click="handleApply(scope.$index, scope.row)"
            v-if="row_index == scope.$index"
            >Apply</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
      <el-table-column type="expand">
        <template slot-scope="scope">
          <table class="table">
            <tr>
              <th>STR</th>
              <th>AGI</th>
              <th>AIM</th>
              <th>T</th>
              <th>HP</th>
              <th>WP</th>
              <th>FA</th>
              <th>RA</th>
              <th>FSv</th>
              <th>RSv</th>
              <th>FHHSv</th>
              <th>RHHSv</th>
            </tr>
            <tr>
              <th>
                <el-input
                  size="small"
                  style="text-align:center"
                  v-model="scope.row.attributes.STR"
                  controls-position="right"
                  :disabled="row_index != scope.$index"
                ></el-input>
              </th>
              <th>
                <el-input
                  size="small"
                  style="text-align:center"
                  v-model="scope.row.attributes.AGI"
                  controls-position="right"
                  :disabled="row_index != scope.$index"
                ></el-input>
              </th>
              <th>
                <el-input
                  size="small"
                  style="text-align:center"
                  v-model="scope.row.attributes.AIM"
                  controls-position="right"
                  :disabled="row_index != scope.$index"
                ></el-input>
              </th>
              <th>
                <el-input
                  size="small"
                  style="text-align:center"
                  v-model="scope.row.attributes.T"
                  controls-position="right"
                  :disabled="row_index != scope.$index"
                ></el-input>
              </th>
              <th>
                <el-input
                  size="small"
                  style="text-align:center"
                  v-model="scope.row.attributes.HP"
                  controls-position="right"
                  :disabled="row_index != scope.$index"
                ></el-input>
              </th>
              <th>
                <el-input
                  size="small"
                  style="text-align:center"
                  v-model="scope.row.attributes.WP"
                  controls-position="right"
                  :disabled="row_index != scope.$index"
                ></el-input>
              </th>
              <th>
                <el-input
                  size="small"
                  style="text-align:center"
                  v-model="scope.row.attributes.FA"
                  controls-position="right"
                  :disabled="row_index != scope.$index"
                ></el-input>
              </th>
              <th>
                <el-input
                  size="small"
                  style="text-align:center"
                  v-model="scope.row.attributes.RA"
                  controls-position="right"
                  :disabled="row_index != scope.$index"
                ></el-input>
              </th>
              <th>
                <el-input
                  size="small"
                  style="text-align:center"
                  v-model="scope.row.attributes.FSv"
                  controls-position="right"
                  :disabled="row_index != scope.$index"
                ></el-input>
              </th>
              <th>
                <el-input
                  size="small"
                  style="text-align:center"
                  v-model="scope.row.attributes.RSv"
                  controls-position="right"
                  :disabled="row_index != scope.$index"
                ></el-input>
              </th>
              <th>
                <el-input
                  size="small"
                  style="text-align:center"
                  v-model="scope.row.attributes.FHHSv"
                  controls-position="right"
                  :disabled="row_index != scope.$index"
                ></el-input>
              </th>
              <th>
                <el-input
                  size="small"
                  style="text-align:center"
                  v-model="scope.row.attributes.RHHSv"
                  controls-position="right"
                  :disabled="row_index != scope.$index"
                ></el-input>
              </th>
            </tr>
          </table>
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
          id: 1,
          abilityname: "no data",
          class_id: "-1",
          level: "-1",
          choice: "-1",
          attributes: {
            STR: -1,
            AGI: -1,
            AIM: -1,
            T: -1,
            HP: -1,
            WP: -1,
            FA: -1,
            RA: -1,
            FSv: -1,
            RSv: -1,
            FHHSv: -1,
            RHHSv: -1,
          },
        },
      ],
      tableData: this.noData,
      row_index: -1,
      loading: false,
      options: [],
    };
  },
  methods: {
    handleEdit(index) {
      this.row_index = index;
    },
    async handleApply(index, row) {
      this.row_index = -1;
      await this.axiosPut(row);
      this.handleUpdate();
    },
    async handleDelete(index, row) {
      let data = await this.axiosDelete(row.id);
      console.log(data);
      this.handleUpdate();
    },
    async handleUpdate() {
      let data = await this.axiosGetItem("abilities");
      this.tableData = data;
    },

    async handleCreate() {
      console.log(this.tableData[0]);
      let data = await this.axiosPost(this.noData[0]);
      console.log(data);
      this.handleUpdate();
    },

    async downloadClasses(query) {
      let data = await this.axiosGetItem("classes");
      if (query === "" || query == undefined) {
        this.options = data.map((obj) => {
          return {
            id: obj.class_id,
            name: obj.class_name,
          };
        });
        this.loading = false;
      } else {
        this.loading = true;
        setTimeout(() => {
          this.options = data
            .filter((data) => data.class_name.includes(query))
            .map((obj) => {
              return {
                id: obj.class_id,
                name: obj.class_name,
              };
            });
          this.loading = false;
        }, 200);
      }
    },

    axiosPost(obj) {
      const promise = this.$database.axios.put("http://localhost:8081/admin/abilities", obj);
      return promise;
    },

    axiosDelete(index) {
      const promise = this.$database.axios.delete("http://localhost:8081/admin/abilities", {
        params: {
          id: index,
        },
        
      });
      return promise;
    },

    axiosPut(obj) {
      const promise = this.$database.axios.put("http://localhost:8081/admin/abilities", obj);
      return promise;
    },
  },

  mounted() {
    this.tableData = this.noData;
    this.handleUpdate();
    this.downloadClasses("");
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
