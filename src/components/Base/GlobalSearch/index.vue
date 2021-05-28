<template>
  <div class="global-search">
    <div v-if="isTitle" class="title"><h4>查询条件</h4></div>
    <div class="content">
      <slot name="operate" />
      <template v-for="(item, index) in searchData">
        <el-button v-if="item.type == 'button'" :icon="item.icon" :size="item.size" :key="index">
          {{ item.title }}
        </el-button>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GlobalSearch',
  components: {},
  props: {
    isTitle: {
      type: Boolean,
      default: true
    },
    searchData: {
      type: Array,
      default: () => []
    }
  },
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
  font-size: 14px;
  color: $wordcolor2;
  .title {
    border-bottom: 1px solid #dbeafa;
  }
  .content {
    padding: 20px 0;
  }
}
</style>
