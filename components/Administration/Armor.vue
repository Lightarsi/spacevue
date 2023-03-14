<template>
  <div>
    <el-table
      class="table-typical"
      :data="tableData"
      stripe
      style="width: 100%"
    >
      <el-table-column prop="id" label="id" width="70px"> </el-table-column>
      <el-table-column prop="armorname" label="Название" fit="true">
        <template slot-scope="scope">
          <el-input
            size="small"
            style="text-align:center"
            v-model="scope.row.armorname"
            controls-position="right"
            :disabled="row_index != scope.$index"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="tier" label="Тир" fit="true">
        <template slot-scope="scope">
          <el-input
            size="small"
            style="text-align:center"
            v-model="scope.row.tier"
            controls-position="right"
            :disabled="row_index != scope.$index"
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
            :disabled="row_index != scope.$index"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="features" label="Особенности" fit="true">
        <template slot-scope="scope">
          <el-input
            size="small"
            style="text-align:center"
            v-model="scope.row.features"
            controls-position="right"
            :disabled="row_index != scope.$index"
          ></el-input>
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
          id: null,
          armorname: "no data",
          tier: "-1",
          description: "-1",
          features: null,
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
      const promise = this.$database.axios("http://localhost:8081/admin/armor");
      let dataPromise = promise.then((resp) =>  {
        let res = resp.data;
        
        res.map(data => data.attributes = JSON.parse(data.attribute));
        res.map(data => data.attribute = null);
        res.map(data => data.features = JSON.stringify(data.features));
        return res;
      });
      return dataPromise;
    },

    axiosPost(obj) {
      const promise = this.$database.axios.put(
        "http://localhost:8081/admin/armor",
        obj
      );
      return promise;
    },

    axiosDelete(index) {
      const promise = this.$database.axios.delete(
        "http://localhost:8081/admin/armor",
        {
          params: {
            id: index,
          },
        }
      );
      return promise;
    },

    axiosPut(obj) {
      const promise = this.$database.axios.put(
        "http://localhost:8081/admin/armor",
        obj
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
.table {
  width: 100%;
}

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
