<template>
  <div>
    <el-table
      class="table-typical"
      :data="tableData"
      stripe
      style="width: 100%"
    >
      <el-table-column prop="id" label="id" width="150px">
      </el-table-column>
      <el-table-column prop="rank" label="Звание" fit="true">
        <template slot-scope="scope">
          <el-input
            size="small"
            style="text-align:center"
            v-model="scope.row.rank"
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
          rank: "no data",
        },
      ],
      tableData: this.noData,
      row_index: -1,
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
      const promise = this.$database.axios.get("http://localhost:8081/admin/rank");
      const dataPromise = promise.then((resp) => resp.data);
      return dataPromise;
    },

    axiosPost(obj) {
      const promise = this.$database.axios.post("http://localhost:8081/admin/rank", obj);
      return promise;
    },

    axiosDelete(index) {
      const promise = this.$database.axios.delete("http://localhost:8081/admin/rank", {
        params: {
          id: index,
        },
      });
      return promise;
    },

    axiosPut(obj) {
      const promise = this.$database.axios.put("http://localhost:8081/admin/rank", obj);
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
