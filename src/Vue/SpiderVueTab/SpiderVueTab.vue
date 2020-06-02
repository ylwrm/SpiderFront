<template>
  <el-tabs style="width:100%;height:100%;overflow:hidden"
    @tab-click="handleClick">
    <el-tab-pane
      v-for="tab in ComponentInstance.setting.config.tabs"
      :key="tab.name"
      :label="tab.title">
      <div :ref="tab.name" style="width:100%;height:100%;overflow:hidden">

      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" src="./SpiderVueTab.ts">
</script>

<style lang="css">
.el-tabs__content {
    height: calc(100% - 15px - 40px);
}
.el-tab-pane{
    height: 100%;
}
</style>