<template>
  <div>
    <el-table
      class="table-typical"
      :data="tableData"
      stripe
      style="width: 100%"
    >
      <el-table-column prop="id" label="id" width="70px"> </el-table-column>
      <el-table-column prop="agentname" label="Имя агента" fit="true">
        <template slot-scope="scope">
          <el-input
            size="small"
            style="text-align:center"
            v-model="scope.row.agentname"
            controls-position="right"
            :disabled="row_index != scope.$index"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="Класс" fit="true">
        <template slot-scope="scope">
          <el-select
            v-model="tableData[scope.$index].clazz['classname']"
            size="small"
            filterable
            remote
            reserve-keyword
            no-data-text="no data"
            placeholder="Please enter a keyword"
            :loading="loading"
            loading-text="loading"
            :disabled="row_index != scope.$index"
          >
            <el-option
              v-for="item in class_options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="rank" label="Ранг" fit="true">
        <template slot-scope="scope">
          <el-select
            v-model="tableData[scope.$index].rank"
            size="small"
            filterable
            remote
            reserve-keyword
            no-data-text="no data"
            placeholder="Please enter a keyword"
            :loading="loading"
            loading-text="loading"
            :disabled="row_index != scope.$index"
          >
            <el-option
              v-for="item in rank_options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="difficulty" label="сложность" fit="true">
        <template slot-scope="scope">
          <el-select
            v-model="tableData[scope.$index].difficulty"
            size="small"
            filterable
            remote
            reserve-keyword
            no-data-text="no data"
            placeholder="Please enter a keyword"
            :loading="loading"
            loading-text="loading"
            :disabled="row_index != scope.$index"
          >
            <el-option
              v-for="item in difficulties_options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="level" label="Уровень" fit="true">
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
      <el-table-column prop="experience" label="Опыт" fit="true">
        <template slot-scope="scope">
          <el-input
            size="small"
            style="text-align:center"
            v-model="scope.row.experience"
            controls-position="right"
            :disabled="row_index != scope.$index"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="abilities_code" label="Код способностей" fit="true">
        <template slot-scope="scope">
          <el-input
            size="small"
            style="text-align:center"
            v-model="scope.row.abilities_code"
            controls-position="right"
            :disabled="row_index != scope.$index"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="backpack" label="Рюкзак" fit="true">
        <template slot-scope="scope">
          <el-input
            size="small"
            style="text-align:center"
            v-model="scope.row.backpack"
            controls-position="right"
            :disabled="row_index != scope.$index"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="armor_id" label="Броня" fit="true">
        <template slot-scope="scope">
          <el-select
            v-model="tableData[scope.$index].armor_id"
            size="small"
            filterable
            remote
            reserve-keyword
            no-data-text="no data"
            placeholder="Please enter a keyword"
            :loading="loading"
            loading-text="loading"
            :disabled="row_index != scope.$index"
          >
            <el-option
              v-for="item in armor_options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
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
                  v-model="scope.row.attribute.STR"
                  controls-position="right"
                  :disabled="row_index != scope.$index"
                ></el-input>
              </th>
              <th>
                <el-input
                  size="small"
                  style="text-align:center"
                  v-model="scope.row.attribute.AGI"
                  controls-position="right"
                  :disabled="row_index != scope.$index"
                ></el-input>
              </th>
              <th>
                <el-input
                  size="small"
                  style="text-align:center"
                  v-model="scope.row.attribute.AIM"
                  controls-position="right"
                  :disabled="row_index != scope.$index"
                ></el-input>
              </th>
              <th>
                <el-input
                  size="small"
                  style="text-align:center"
                  v-model="scope.row.attribute.T"
                  controls-position="right"
                  :disabled="row_index != scope.$index"
                ></el-input>
              </th>
              <th>
                <el-input
                  size="small"
                  style="text-align:center"
                  v-model="scope.row.attribute.HP"
                  controls-position="right"
                  :disabled="row_index != scope.$index"
                ></el-input>
              </th>
              <th>
                <el-input
                  size="small"
                  style="text-align:center"
                  v-model="scope.row.attribute.WP"
                  controls-position="right"
                  :disabled="row_index != scope.$index"
                ></el-input>
              </th>
              <th>
                <el-input
                  size="small"
                  style="text-align:center"
                  v-model="scope.row.attribute.FA"
                  controls-position="right"
                  :disabled="row_index != scope.$index"
                ></el-input>
              </th>
              <th>
                <el-input
                  size="small"
                  style="text-align:center"
                  v-model="scope.row.attribute.RA"
                  controls-position="right"
                  :disabled="row_index != scope.$index"
                ></el-input>
              </th>
              <th>
                <el-input
                  size="small"
                  style="text-align:center"
                  v-model="scope.row.attribute.FSv"
                  controls-position="right"
                  :disabled="row_index != scope.$index"
                ></el-input>
              </th>
              <th>
                <el-input
                  size="small"
                  style="text-align:center"
                  v-model="scope.row.attribute.RSv"
                  controls-position="right"
                  :disabled="row_index != scope.$index"
                ></el-input>
              </th>
              <th>
                <el-input
                  size="small"
                  style="text-align:center"
                  v-model="scope.row.attribute.FHHSv"
                  controls-position="right"
                  :disabled="row_index != scope.$index"
                ></el-input>
              </th>
              <th>
                <el-input
                  size="small"
                  style="text-align:center"
                  v-model="scope.row.attribute.RHHSv"
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
          id: "-1",
          owner: "-1",
          agentname: "no data",
          clazz: "-1",
          rank: "-1",
          difficulty: "-1",
          level: "-1",
          experience: "-1",
          abilities_code: "-1",
          backpack: "-1",
          attribute: {
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
      armor_options: [],
      class_options: [],
      rank_options: [],
      users_options: [],
      difficulties_options: [],
    };
  },
  methods: {
    handleEdit(index) {
      this.row_index = index;
    },
    async handleApply(index, row) {
      if (row.id == -1) {
        let data = await this.axiosPost(this.tableData[index]);
        console.log(data);
        this.handleUpdate();
      }
      this.row_index = -1;
      await this.axiosPutItem("character/agents", row);
      this.handleUpdate();
    },
    async handleDelete(index, row) {
      let data = await this.axiosDelete(row.id);
      console.log(data);
      this.handleUpdate();
    },
    async handleUpdate() {
      let data = await this.axiosGetItem("character/agents");
      this.tableData = data;
    },

    async handleCreate() {
      this.tableData.push(this.noData[0]);
      /*console.log(this.tableData[0]);
      let data = await this.axiosPost(this.noData[0]);
      console.log(data);
      this.handleUpdate();*/
    },

    

    axiosPost(obj) {
      const promise = this.$database.axios.post("http://localhost:8081/admin/agent", obj);
      return promise;
    },

    axiosDelete(index) {
      const promise = this.$database.axios.delete("http://localhost:8081/admin/agent", {
        params: {
          id: index,
        },
      });
      return promise;
    },

    axiosPut(obj) {
      const promise = this.$database.axios.put("http://localhost:8081/admin/agent", obj);
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
