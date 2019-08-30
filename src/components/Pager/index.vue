<template>
  <el-pagination layout="total, prev, pager, next, jumper" background small :page-sizes="[20, 30, 50, 100, 200]" hide-on-single-page :current-page="pager.page" :page-size="pager.limit" :total="pager.total" @current-change="searchHandle" />
</template>
<script>
export default {
  name: 'UiPager',
  props: {
    pager: {
      type: Object,
      default: () => {
        return {
          prev: 1,
          next: 1,
          last: 1,
          pages: 0,
          page: 1,
          limit: 20,
          total: 0
        }
      }
    }
  },
  methods: {
    searchHandle(page) {
      this.$emit('change', page)
    }
  }
}
</script>
