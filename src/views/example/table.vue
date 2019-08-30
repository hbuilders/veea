<template>
  <div class="page-container">
    <el-table v-loading="loading" height="100%" :data="dataset" border fit>
      <el-table-column label="ID" prop="id" width="95" align="center" />
      <el-table-column label="image">
        <template slot-scope="{row}">
          <el-image :src="row.image" />
        </template>
      </el-table-column>
      <el-table-column label="name" prop="name" width="110" align="center" />
      <el-table-column label="email" prop="email" width="200" align="center" />
      <el-table-column label="phone" prop="phone" width="110" align="center" />
      <el-table-column label="mobile" prop="mobile" width="110" align="center" />
      <el-table-column label="title" prop="title" width="300" />
      <el-table-column label="nums" prop="nums" width="110" align="center" />
      <el-table-column label="price" prop="price" width="110" align="center" />
      <el-table-column label="status" prop="status" width="110" align="center" />
      <el-table-column label="region" prop="region" width="280" align="center" />
      <el-table-column label="created_at" prop="created_at" width="200" align="center" />
      <el-table-column label="操作" fixed="right" width="100" align="center">
        <template>
          <el-link>编辑</el-link>
          <el-link>删除</el-link>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-footer">
      <div>
        <ui-pager :pager="pager" @change="fetchData" />
      </div>
    </div>
  </div>
</template>

<script>
import { mockApi } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      pager: {},
      param: {},
      dataset: null,
      loading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData(page) {
      this.loading = true
      this.param.page = page || 1
      mockApi.getList(this.param).then(res => {
        this.dataset = res.data.dataset
        this.pager = res.data.pager
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>
