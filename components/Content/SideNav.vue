<template>
  <div class="snav">
    <div class="text">
      <h1></h1>
    </div>
    <div class="text">
      <h1></h1>
    </div>
    <el-menu
      default-active="1"
      class="el-menu-vertical"
      @open="handleOpen"
      @close="handleClose"
      @select="getIndex"
      background-color="rgb(255,255,255,0)"
      text-color="rgb(255,255,255,1)"
      active-text-color="gold"
    >
      <el-menu-item index="1">
        <i class="el-icon-setting"></i>
        <span class="null_opacity">Character</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-setting"></i>
        <span>Radars</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-setting"></i>
        <span>Ship Management</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span>Messages</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-setting"></i>
        <span>Storage</span>
      </el-menu-item>
      <el-menu-item index="6">
        <i class="el-icon-setting"></i>
        <span>Science</span>
      </el-menu-item>
      <el-menu-item index="7">
        <i class="el-icon-setting"></i>
        <span>Сonstruction</span>
      </el-menu-item>
      <el-menu-item index="8">
        <i class="el-icon-setting"></i>
        <span>Market</span>
      </el-menu-item>
      <el-menu-item index="9">
        <i class="el-icon-setting"></i>
        <span>Administration Page</span>
      </el-menu-item>
      <el-menu-item index="10">
        <i class="el-icon-setting"></i>
        <span>Missions</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    getIndex(key) {
      this.index = key;
      this.$emit('onNavigate', this.index); 
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.snav .el-menu .el-menu-item {
  font-size: 22px;
  font-weight: bold;
  padding-left: 30px;
}

.null_opacity {
  opacity: 1;
}

.el-menu {
  border-right: 0;
  background-color: rgb(84, 82, 100, 0.2);
  opacity: 0.4;
}

.text {
  height: 60px;
  font-size: 22px;
  width: 100%;
  color: white;
  opacity: 1;
  display: flex;
  text-align: center;
}

.text h1 {
  margin: auto;
  line-height: 50px;
  vertical-align: middle;
}
</style>
