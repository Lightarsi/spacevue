<template>
  <div class="content">
    <div class="bordered-round">
      <el-transfer
        class="wd100"
        v-model="value"
        :data="data"
        :titles="['Локальное хранилице', 'Склад']"
      >
      </el-transfer>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          key: "1",
          label: "Элериум",
          num: 100,
        },
        {
          key: "2",
          label: "Сплавы Чужих",
          num: 100,
        },
        {
          key: "3",
          label: "Аквапластики",
          num: 100,
        },
        {
          key: "4",
          label: "Источник Энергии НЛО",
          num: 100,
        },
      ],
      value: [1, 4],
    };
  },
};
</script>

<style scoped>
.bordered-round {
  border-radius: 25px;
  border: 3px solid #040505;
  border-top: none;
  padding: 10px;
  background-image: url("../../assets/grey_bar.jpg");
}
</style>
