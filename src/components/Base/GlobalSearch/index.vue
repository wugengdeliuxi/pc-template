<template>
  <div class="global-search">
    <h4>查询条件</h4>
    <div class="content">
      <slot name="operate" />
      <el-button icon="el-icon-delete" size="mini">删除</el-button>
      <el-button icon="el-icon-upload2" size="mini">导出</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GlobalSearch',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    search() {}
  }
}
</script>

<style lang="scss">
.global-search {
  background: $bgwhite;
  padding: 0 16px;
  margin-bottom: 12px;
  box-shadow: 0px 0px 8px 2px rgba(223, 223, 223, 0.3);
  .content {
    border-top: 1px solid #dbeafa;
    padding: 20px 0;
  }
}
</style>
