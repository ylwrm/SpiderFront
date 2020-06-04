<template>
  <div style="height:100%"
       class="tableParent"
       ref="container">
    <el-table :data="tBodyList"
              class="table"
              stripe
              height="250"
              ref="table"
              v-loading="loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              @row-click="RowClicked"
              @expand-change="toggleRowExpansion"
              @selection-change="GetChecked"
              @sort-change="SortChange"
              v-el-table-infinite-scroll="load">
      <el-table-column type="expand"
                       v-if="isExpand"
                       width="50"
                       :fixed="isFixed >= 1 ? true : false">
        <div slot-scope="scope"
             :ref="scope.row.order"
             :style="{ height: expandHeight }"></div>
      </el-table-column>
      <el-table-column type="selection"
                       v-if="isShowCheckBox"
                       width="50"
                       align="center"
                       header-align="center"
                       :fixed="isFixed >= 2 ? true : false"></el-table-column>
      <el-table-column prop="order"
                       label="序号"
                       width="50"
                       v-if="isShowOrder"
                       align="center"
                       header-align="center"
                       :fixed="isFixed >= 3 ? true : false"></el-table-column>
      <el-table-column show-overflow-tooltip
                       v-for="(item, index) in tHeadList"
                       :key="index"
                       :align="index != tHeadList.length - 1 ? 'left' : 'right'"
                       :header-align="index != tHeadList.length - 1 ? 'left' : 'right'"
                       :fixed="index < isFixed - fixNum ? true : false"
                       :prop="item.列字段"
                       :label="item.列名称"
                       :width="item.列宽度"
                       :sortable="item.排序 ? 'custom' : false">
        <template slot="header">
          <span>{{ item.列名称 }}</span>
        </template>
        <template slot-scope="scope">
          {{
            scope.row[
              tableColumn.indexOf(scope.column.property) === -1
                ? scope.column.property
                : ''
            ]
          }}
          <el-progress type="line"
                       :stroke-width="10"
                       v-if="tableProgressList.indexOf(scope.column.property) >= 0"
                       :percentage="scope.row[scope.column.property]"></el-progress>
          <img :src="'../Resource/table/' + tableLinkImage"
               v-if="
              tableLinkList.indexOf(scope.column.property) >= 0 &&
                tableLinkImage
            "
               class="tableImage"
               alt />
          <el-link type="primary"
                   v-if="tableLinkList.indexOf(scope.column.property) >= 0"
                   @click.stop="LinkClicked(scope.row)">{{ scope.row[scope.column.property] }}</el-link>
          <el-input v-if="tableInputList.indexOf(scope.column.property) >= 0"
                    v-model="scope.row[scope.column.property]">{{ scope.row[scope.column.property] }}</el-input>
          <el-checkbox v-if="tableCheckedList.indexOf(scope.column.property) >= 0"
                       v-model="scope.row[scope.column.property]"></el-checkbox>
          <el-badge is-dot
                    class="item"
                    v-if="tableBadgeList.indexOf(scope.column.property) >= 0">{{ scope.row[scope.column.property] }}</el-badge>
          <span v-if="tableLanguageImageList.indexOf(scope.column.property) >= 0"
                align="left">
            <!-- 根据图标数组中的下标与显示图标列数组中的下标相同显示的图标 -->
            <img v-for="(item, index) in tableLanguageImage"
                 class="tableImage"
                 :key="index"
                 :src="'../Resource/table/' + item"
                 v-show="
                index === tableLanguageImageList.indexOf(scope.column.property)
              "
                 alt />
            {{ scope.row[scope.column.property] }}
          </span>
          <img v-if="tableImageList.indexOf(scope.column.property) >= 0"
               class="warn"
               :src="
              '../Resource/table/' + scope.row[scope.column.property] + '.png'
            "
               alt />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="tableCurrentPage"
                   :pager-count="5"
                   v-if="isPagination"
                   :page-size="tablePageSize"
                   layout="total, prev, pager, next"
                   :total="tableTotal"
                   class="pagination"
                   ref="pagination"></el-pagination>
  </div>
</template>

<script lang="ts" src="./SpiderVueTable.ts" />
<style lang="css" src="./SpiderVueTable.css" />
