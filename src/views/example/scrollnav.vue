<template>
  <div class="page-container">
    <el-alert type="success">
      <div class="lh20">
        <div><b>使用 directive 实现的 scrollNav 功能</b></div>
        <div>内容区域填充高度,以便最后一个node可以显示在顶部</div>
        <div>导航区域可以横向,纵向布局,溢出滚动,这些都可以自行CSS控制,支持hover|click事件</div>
        <div>导航node数与内容node数相等即可</div>
      </div>
    </el-alert>
    <div v-scrollNav:hover="20" class="scroll-panel">
      <div ref="scroll-to-container" class="scroll-body">
        <div v-for="(item, index) in dataset" :key="index" class="scroll-group scroll-to-flow">
          <el-divider content-position="left">{{ item.letter }}</el-divider>
          <div class="scroll-items">
            {{ item.content }}
          </div>
        </div>
      </div>
      <div ref="scroll-to-navbar" class="scroll-navigation">
        <a v-for="(item, index) in letter" :key="index">{{ item }}</a>
      </div>
    </div>
    <div class="page-footer">
      <div>使用方法后期补上</div>
    </div>
  </div>
</template>
<script>
import { mockApi } from '@/api/table'
import scrollNav from '@/directive/scrollNav'
export default {
  directives: { scrollNav },
  data() {
    return {
      letter: ['热门', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'],
      dataset: [],
      loading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      mockApi.scrollData().then(res => {
        this.dataset = res.data.dataset
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.scroll-panel {
  display: flex;
  width: 100%;
  height: 100%;
  .scroll-navigation {
    width: 40px;
    display: -webkit-box;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 0px;
    }
    a {
      text-align: center;
      width: 100%;
      display: block;
      color: #999;
      padding: 0 0 0 10px;
      line-height: 20px;
      transition: all 0.3s;
      &.active {
        background: #f26a85;
        color: #fff;
        padding: 0 10px 0 0;
      }
    }
  }
  .scroll-body {
    flex: 1;
    overflow: auto;
    border-right: 1px solid #f5f5f5;
    &::-webkit-scrollbar {
      width: 0px;
    }
    .scroll-group {
      margin: 20px 0 0;
      .el-divider {
        margin: 0;
        transition: all 0.3s;
        .el-divider__text {
          border: 1px solid transparent;
          transition: all 0.3s;
        }
      }
      .scroll-items {
        padding: 15px 10px;
      }
      &.active {
        background: rgb(247, 251, 255);
        .el-divider {
          background: #f26a85;
          .el-divider__text {
            color: #f26a85;
            border-radius: 10%;
            border: 1px solid #f26a85;
          }
        }
      }
    }
  }
}
</style>
