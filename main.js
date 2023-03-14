import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import * as THREE from "three";

Vue.use(ElementUI);
Vue.use(THREE);

Vue.prototype.$database = {
  classes: [],
  ranks: [],
  difficulties: [],
  abilities: [],
  user_id: 1,
};

Vue.mixin({
  methods: {
    axiosGetItem(item) {
      const promise = this.$database.axios.get("http://localhost:8081/admin/" + item,
      {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        auth: {
          username: "admin",
          password: "lightars",
        },
      });
      const dataPromise = promise.then((resp) => resp.data);
      return dataPromise;
    },

    axiosPostItem(path, obj) {
      const promise = this.$database.axios.post("http://localhost:8081/admin/" + path, obj);
      return promise;
    },

    axiosPutItem(path, obj) {
      const promise = this.$database.axios.put("http://localhost:8081/admin/" + path, obj, {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        auth: {
          username: "admin",
          password: "lightars",
        },
      });
      return promise;
    },

    async downloadUsers() {
      let data = await this.axiosGetItem("users");
      let result;
      setTimeout(() => {
        result = data.map((obj) => {
          return {
            id: obj.id,
            name: obj.name,
          };
        });
      }, 200);
      return result;
    },

    async downloadClasses() {
      let data = await this.axiosGetItem("classes");
      let result = data.map((obj) => {
        return {
          id: obj.class_id,
          name: obj.class_name,
          description: obj.class_description,
        };
      });
      this.loading = false;
      return result;
    },

    async downloadRanks() {
      let data = await this.axiosGetItem("rank");
      let result = data.map((obj) => {
        return {
          id: obj.id,
          name: obj.rank,
        };
      });
      return result;
    },

    async downloadDifficulties() {
      let data = await this.axiosGetItem("difficulty");
      let result = data.map((obj) => {
        return {
          id: obj.id,
          name: obj.difficulty,
        };
      });
      return result;
    },

    async downloadAbilities() {
      let data = await this.axiosGetItem("abilities");
      let result = data.map((obj) => {
        return {
          id: obj.id,
          name: obj.ability_name,
          clazz_id: obj.class_id,
          level: obj.ability_level,
          attributes: obj.attributes,
          choice: obj.choice,
        };
      });
      return result;
    },
  },
});

new Vue({
  el: "#app",
  render: (h) => h(App),
});
