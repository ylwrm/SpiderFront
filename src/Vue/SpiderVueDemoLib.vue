<template>
  <div>
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%"
    >
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column property="date" label="Date" width="120">
      </el-table-column>
      <el-table-column property="name" label="Name" width="120">
      </el-table-column>
      <el-table-column property="address" label="Address"> </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="setCurrent(tableData[1])">Select second row</el-button>
      <el-button @click="setCurrent()">Clear selection</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-02",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-04",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
      ],
      currentRow: null,
    };
  },
  methods: {
    setCurrent: function(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentChange: function(val) {
      this.currentRow = val;
    },
  },
};
</script>
