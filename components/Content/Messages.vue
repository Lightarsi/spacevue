<template>
  <div class="content">
    <div class="bordered-round">
      <Chat />
    </div>
  </div>
</template>

<script>
import Chat from "../Chat.vue";

export default {
  components: {
    Chat,
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
