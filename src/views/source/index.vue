<template>
  <div class="source">
    <global-search></global-search>
    <global-table :table-head="tableHeaders" :table-data="tableData"></global-table>
  </div>
</template>

<script>
export default {
  name: 'Source',
  data() {
    return {
      tableHeaders: [
        { prop: 'code0', label: '案件编号', minwidth: '160px' },
        { prop: 'code1', label: '案件编号', minwidth: '160px' },
        { prop: 'code2', label: '案件编号', minwidth: '160px' },
        { prop: 'code3', label: '案件编号', minwidth: '160px' },
        { prop: 'code4', label: '案件编号', minwidth: '160px' },
        { prop: 'code5', label: '案件编号', minwidth: '160px' },
        { prop: 'code6', label: '案件编号', minwidth: '160px' }
      ],
      tableData: [
        { code0: 111 },
        {
          code1: 111
        },
        {
          code2: 111
        },
        {
          code3: 111
        },
        {
          code4: 111
        },
        {
          code5: 111
        },
        {
          code6: 111
        },
        {
          code1: 111
        },
        {
          code2: 111
        },
        {
          code6: 111
        }
      ]
    }
  }
}
</script>

<style scoped></style>
