<template>
  <div>
    <el-table
      class="table-typical"
      :data="tableData"
      stripe
      style="width: 100%"
    >
      <el-table-column prop="id" label="id" width="70px">
      </el-table-column>
      <el-table-column prop="classname" label="Базовый класс" fit="true">
        <template slot-scope="scope">
          <el-input
            size="small"
            style="text-align:center"
            v-model="scope.row.classname"
            controls-position="right"
            :disabled="row_index != scope.row.id"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="Описание" fit="true">
        <template slot-scope="scope">
          <el-input
            size="small"
            style="text-align:center"
            v-model="scope.row.description"
            controls-position="right"
            :disabled="row_index != scope.row.id"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="slot" label="Слоты" fit="true">
        <template slot-scope="scope">
          <el-input
            size="small"
            style="text-align:center"
            v-model="scope.row.slot"
            controls-position="right"
            :disabled="row_index != scope.row.id"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="weapon" label="Профильное оружие" fit="true">
        <template slot-scope="scope">
          <el-input
            size="small"
            style="text-align:center"
            v-model="scope.row.weapon"
            controls-position="right"
            :disabled="row_index != scope.row.id"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="passive"
        label="Пассивная способность"
        fit="true"
      >
        <template slot-scope="scope">
          <el-input
            size="small"
            style="text-align:center"
            v-model="scope.row.passive"
            controls-position="right"
            :disabled="row_index != scope.row.id"
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
            @click="handleEdit(scope.$index, scope.row)"
            v-if="row_index != scope.row.id"
            >Edit</el-button
          >
          <el-button
            size="mini"
            @click="handleApply(scope.$index, scope.row)"
            v-if="row_index == scope.row.id"
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
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      noData: [
        {
          id: null,
          classname: "no data",
          basic: "2",
          description: "no data",
          slot: "no data",
          weapon: "no data",
          passive: "no data",
        },
      ],
      tableData: this.noData,
      row_index: 0,
    };
  },
  methods: {
    handleEdit(index, row) {
      this.row_index = row.id;
    },
    async handleApply(index, row) {
      this.row_index = 0;
      await this.axiosPut(row);
      this.handleUpdate();
    },
    async handleDelete(index, row) {
      let data = await this.axiosDelete(row.id);
      console.log(data);
      this.handleUpdate();
    },
    async handleUpdate() {
      let data = await this.axiosGet();
      this.tableData = data;
    },

    async handleCreate() {
      console.log(this.tableData[0]);
      let data = await this.axiosPost(this.noData[0]);
      console.log(data);
      this.handleUpdate();
    },

    axiosGet() {
      const promise = this.$database.axios.get("http://localhost:8081/admin/classes");
      const dataPromise = promise.then((resp) => resp.data);
      return dataPromise;
    },

    axiosPost(obj) {
      const promise = this.$database.axios.put("http://localhost:8081/admin/classes", obj);
      return promise;
    },

    axiosDelete(index) {
      const promise = this.$database.axios.delete("http://localhost:8081/admin/classes", {
        params: {
          id: index,
        },
      });
      return promise;
    },

    axiosPut(obj) {
      const promise = this.$database.axios.put("http://localhost:8081/admin/classes", obj);
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
