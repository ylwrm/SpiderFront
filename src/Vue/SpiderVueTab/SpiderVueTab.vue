<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane v-for="tab in tabs" :label="tab.title">{{tab.name}}</el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" src="./SpiderVueTab.ts">
</script>