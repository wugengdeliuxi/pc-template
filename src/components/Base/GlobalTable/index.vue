<template>
  <div v-loading="loading" class="global-table">
    <h4>查询列表</h4>
    <el-table
      ref="table"
      :header-cell-class-name="headercolor"
      :data="tableData"
      stripe
      :max-height="setHeight"
      style="width: 100%"
      :border="border"
      :cell-style="cellStyle"
      :header-cell-style="headerCellStyle"
      :row-key="getRowKey"
      size="medium"
      @sort-change="sortChange"
      @selection-change="handleSelectionChange"
      @row-click="rowClick"
    >
      <slot name="first-columns" />
      <template v-for="item in tableHead">
        <!-- labelCustomize 是否开启单元格内容自定义，用 getLabel 回调传入，开启 labelIsHtml 可传入 html 结构；
             columnsShowCustomize 是否开启展示列自定义功能，开启后需传入要展示的列名 columnShowList
         -->
        <el-table-column
          v-if="
            item.labelCustomize &&
            (!columnsShowCustomize || columnShowList.indexOf(item.label) != -1)
          "
          :key="item.prop"
          :width="item.width"
          :prop="item.prop"
          :fixed="item.fixed"
          :resizable="item.resizable || false"
          show-overflow-tooltip
          :min-width="item.minwidth"
          :sortable="item.sortable"
          :label="item.label"
        >
          <template slot-scope="scope">
            <div v-if="item.labelIsHtml" v-html="item.getLabel(scope.row || {})" />
            <span v-else>{{ item.getLabel(scope.row || {}) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="!columnsShowCustomize || columnShowList.indexOf(item.label) != -1"
          :key="item.prop"
          :width="item.width"
          :prop="item.prop"
          :fixed="item.fixed"
          :resizable="item.resizable || false"
          show-overflow-tooltip
          :min-width="item.minwidth"
          :sortable="item.sortable"
          :label="item.label"
        />
      </template>
      <slot name="last-columns" />
    </el-table>
    <div v-if="isPage" style="margin-top: 10px; text-align: right">
      <el-pagination
        v-if="!loading"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
        @size-change="sizeChange"
        @current-change="currentChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'GlobalTable',
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    border: {
      type: Boolean,
      default: false
    },
    tableHead: {
      type: Array,
      default: () => []
    },
    setHeight: {
      type: [Number, String],
      default: '100%'
    },
    loading: {
      type: Boolean,
      default: false
    },
    isPage: {
      type: Boolean,
      default: true
    },
    currentPage: {
      type: [Number, String],
      default: 1
    },
    pageSize: {
      type: [Number, String],
      default: 10
    },
    total: {
      type: [Number, String],
      default: 0
    },
    columnsShowCustomize: {
      type: Boolean,
      default: false
    },
    columnShowList: {
      type: Array,
      default: () => []
    },
    headerCellStyle: {
      type: Object,
      default: () => {}
    },
    cellStyle: {
      type: Object,
      default: () => {}
    },
    headercolor: {
      type: String,
      default: 'headercolor'
    }
  },
  methods: {
    sortChange() {},
    handleSelectionChange(selection) {
      this.$emit('selection-change', selection)
    },
    sizeChange(size) {
      this.$emit('size-change', size)
    },
    currentChange(page) {
      this.$emit('current-change', page)
    },
    rowClick(row) {
      this.$emit('rowClick', row)
    },
    getRowKey(row) {
      return row.id
    }
  }
}
</script>

<style>
/* .el-table--medium td {
  padding: 0;
  height: 46px;
} */
/* .el-table--medium th, .el-table--medium td {
  text-align: center;
} */
.el-table__empty-text {
  width: 100%;
  box-sizing: border-box;
}
.global-table {
  padding: 0 16px 28px 16px;
  background: #fff;
}
.global-table .headercolor {
  background-color: rgba(62, 91, 197, 0.1);
  color: #424754;
}
</style>
