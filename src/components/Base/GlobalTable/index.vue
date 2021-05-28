<template>
  <div class="global-table" :style="{ height: tableContainerHeight }">
    <slot name="title" v-if="isTitle">
      <h4>查询列表</h4>
    </slot>
    <el-table
      ref="table"
      :header-cell-class-name="headercolor"
      :data="data"
      max-height="100%"
      :row-key="getRowKey"
      size="medium"
      stripe
      v-bind="$attrs"
      v-on="$listeners"
      @sort-change="sortChange"
      @selection-change="handleSelectionChange"
      @row-click="rowClick"
    >
      <el-table-column type="selection" width="55" v-if="selectable"> </el-table-column>
      <slot name="first-columns" />
      <template v-for="item in columns">
        <el-table-column
          v-if="item.actions && item.actions.length"
          :key="item.prop"
          :width="item.width"
          :fixed="item.fixed"
          :resizable="item.resizable || false"
          :min-width="item.minwidth"
          :sortable="item.sortable"
          :label="item.label"
        >
          <template v-slot="">
            <template v-for="(btnInfo, index) in item.actions">
              <el-button :key="btnInfo.id" type="text" @click.stop="btnInfo.click">{{
                btnInfo.text
              }}</el-button>
              <el-divider
                direction="vertical"
                :key="btnInfo.id"
                v-if="index < item.actions.length - 1"
              ></el-divider>
            </template>
          </template>
        </el-table-column>
        <!-- labelCustomize 是否开启单元格内容自定义，用 getLabel 回调传入，开启 labelIsHtml 可传入 html 结构-->
        <el-table-column
          v-else-if="item.labelCustomize"
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
          <template v-slot="scope">
            <div v-if="item.labelIsHtml" v-html="item.getLabel(scope.row || {})" />
            <span v-else>{{ item.getLabel(scope.row || {}) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-else
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
    <div v-if="pagination" style="margin-top: 10px; text-align: right">
      <el-pagination
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
import { throttle } from 'lodash'

export default {
  name: 'GlobalTable',
  props: {
    // 表格数据
    data: {
      type: Array,
      default: () => []
    },
    /**
     * 字段列信息
     *  {
     *    label: '名称',
     *    prop: '字段属性',
     *    // 表头嵌套
     *    nests: [],
     *    editable: 是否可编辑,
     *    field: {}// 编辑的字段属性,
     *    beforeEdit: (row,column,cellValue,index) => true 编辑前触发，返回true可编辑
     *  }
     *
     */
    columns: {
      type: Array,
      default: () => []
    },
    /**
     * 默认表格的高度是充满父容器的
     * 如果height 设置为 'auto',则表格高度将会根据内容自动撑起来
     */
    height: {
      type: [Number, String],
      default: '100%'
    },
    // 是否可分页
    pagination: {
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
    // 是否显示复选框
    selectable: {
      type: Boolean,
      default: true
    },
    // 头部栏的class名字，用于修改颜色等样式
    headercolor: {
      type: String,
      default: 'headercolor'
    },
    // 是否需要一个标题
    isTitle: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      innerHeight: 0
    }
  },
  computed: {
    // 计算表格区域高度
    tableHeight() {
      const { height, innerHeight } = this
      if (height) {
        let customHeight = height
        if (typeof customHeight === 'string') {
          if (customHeight.endsWith('px')) {
            customHeight = parseFloat(customHeight)
          }
        }
        if (typeof customHeight === 'number') {
          return customHeight
        }
        return customHeight
      }
      return innerHeight
    },
    tableContainerHeight() {
      const { height } = this
      if (height) {
        if (typeof height === 'number') {
          return `${height}px`
        }
        return height
      }
      return '100%'
    }
  },
  // 当表格所在页面存在keepalive时，需要在页面显示时重新布局表格
  activated() {
    // this.doLayout()
  },
  mounted() {
    // 如果没有设置高度，则自动计算高度
    // if (!this.height) {
    //   this.innerHeight = this.$refs.table.$el.parentElement.offsetHeight
    //   this.listenerResize()
    // }
  },
  methods: {
    // 监听表格尺寸变化
    listenerResize() {
      const listenerResize = throttle(() => {
        this.innerHeight = this.$refs.table.$el.parentElement.offsetHeight
        console.log(this.innerHeight)
      }, 200)
      window.addEventListener('resize', listenerResize)
      // 渲染完成之后立即执行一次，保证不会出现滚动条
      this.$nextTick(() => {
        listenerResize()
      })
      // 销毁时候释放监听的事件
      this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('resize', listenerResize)
      })
    },
    // 重新布局表格
    doLayout() {
      this.$refs.table.doLayout()
      this.listenerResize()
    },
    // 当表格的排序条件发生变化的时候会触发该事件
    sortChange() {},
    // 当选择项发生变化时会触发该事件
    handleSelectionChange(selection) {
      this.$emit('handle-selection-change', selection)
    },
    sizeChange(size) {
      this.$emit('size-change', size)
    },
    currentChange(page) {
      this.$emit('current-change', page)
    },
    // 当某一行被点击时会触发该事件
    rowClick(row) {
      console.log(111)
      this.$emit('row-click', row)
    },
    // 行数据的 Key，用来优化 Table 的渲染；
    getRowKey(row) {
      return row.id
    }
  }
}
</script>

<style scoped lang="scss">
.global-table {
  padding: 0 16px 28px 16px;
  background: $bgwhite;
}
</style>

<style lang="scss">
.el-table__empty-text {
  width: 100%;
  box-sizing: border-box;
}
.global-table .headercolor {
  @include themeBgRgba(0.1);
  color: $wordcolor3;
}
</style>
