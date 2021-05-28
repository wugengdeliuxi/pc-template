<template>
  <div class="source">
    <global-search>
      <template #operate>
        <span style="margin-right: 8px">指标类型</span>
        <el-select v-model="dataSource" placeholder="请选择" clearable style="margin-right: 32px">
          <el-option label="实际解决" value="实际解决" />
          <el-option label="解释说明" value="解释说明" />
          <el-option label="参考备案" value="参考备案" />
        </el-select>
        <el-button type="primary" @click="newBuild">新建</el-button>
        <el-button icon="el-icon-delete">删除</el-button>
        <el-button icon="el-icon-upload2" style="margin-right: 32px">导出</el-button>
        <el-input
          placeholder="根据任务名称和描述筛选"
          style="width: 200px"
          suffix-icon="el-icon-search"
          v-model="filterName"
        >
        </el-input>
      </template>
    </global-search>
    <global-table
      v-loading="loading"
      :columns="columns"
      :data="tableData"
      :total="total"
      :current-page="currentPage"
      :page-size="pageSize"
      @current-change="currentChange"
      @size-change="sizeChange"
      @handle-selection-change="selectChange"
    ></global-table>
    <global-dialog
      title="新建指标"
      :visible.sync="visibleDialog"
      @confirm="handleConfirm"
      @cancel="visibleDialog = false"
    >
    </global-dialog>
  </div>
</template>

<script>
export default {
  name: 'Source',
  data() {
    return {
      columns: Object.freeze([
        { prop: 'title', label: '标题' },
        { prop: 'type', label: '业务口径' },
        { prop: 'group', label: '分组' },
        { prop: 'status', label: '状态' },
        { prop: 'function', label: '聚合函数' },
        { prop: 'field', label: '字段' },
        { prop: 'number', label: '应用次数' },
        { prop: 'time', label: '创建时间' },
        { prop: 'creater', label: '创建人' },
        {
          label: '操作',
          actions: [
            {
              id: 'edit',
              text: '编辑',
              // 可以通过before控制按钮是否显示，比如下面年龄四十岁的才会显示编辑按钮
              before(row) {
                return row.age < 40
              },
              click: this.$_handleEdit
            },
            {
              id: 'delete',
              text: '删除',
              icon: 'el-icon-delete',
              disabled(row) {
                return row.sex === 0
              },
              // 为了拿到this,这里需要用箭头函数
              click: () => {
                this.$alert('女生被禁止删除了')
              }
            }
          ]
        }
      ]),
      dataSource: '',
      filterName: '',
      visibleDialog: false,
      tableData: [],
      // 当前页码
      currentPage: 1,
      // 每页条数
      pageSize: 10,
      // 总条数
      total: 0,
      loading: false
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    // 加载表格数据
    loadData() {
      this.loading = true
      setTimeout(() => {
        this.total = 40
        const { currentPage, pageSize } = this
        this.tableData = new Array(pageSize).fill({}).map((item, index) => {
          return {
            title: `这是标题${currentPage}${index}`,
            type: `这是业务口径`,
            group: `这是分组`,
            status: `这是状态`,
            function: `这是聚合函数`,
            field: `这是字段`,
            number: `这是应用次数`,
            time: `这是创建时间`,
            creater: `这是创建人`
          }
        })
        this.loading = false
      }, 1000)
    },
    handleConfirm() {},
    currentChange(page) {
      this.currentPage = page
      this.loadData()
    },
    sizeChange(size) {
      this.pageSize = size
      this.loadData()
    },
    newBuild() {
      this.visibleDialog = true
    },
    selectChange(val) {
      console.log(val)
    }
  }
}
</script>

<style scoped></style>
