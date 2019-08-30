<template>
  <div class="page-container">
    <div class="d-grow d-flex xy-center">
      <div ref="resize" class="resize-element">
        调整大小
      </div>
    </div>
    <div class="page-footer">
      <div>宽:{{ recordOldValue.width }} 高:{{ recordOldValue.height }} 变化:{{ recordOldValue.nums }} 次</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      observer: null,
      recordOldValue: {
        // 记录下旧的宽高数据，避免重复触发回调函数
        width: '0',
        height: '0',
        nums: 0
      }
    }
  },
  mounted() {
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
    const element = this.$refs.resize
    this.observer = new MutationObserver((mutationList) => {
      const width = getComputedStyle(element).getPropertyValue('width')
      const height = getComputedStyle(element).getPropertyValue('height')
      if (width === this.recordOldValue.width && height === this.recordOldValue.height) return
      this.recordOldValue.width = width
      this.recordOldValue.height = height
      this.recordOldValue.nums += 1
    })
    this.observer.observe(element, { attributes: true, attributeFilter: ['style'], attributeOldValue: true })
  },
  beforeDestroyed() {
    if (this.observer) {
      this.observer.disconnect()
      this.observer.takeRecords()
      this.observer = null
    }
  }
}
</script>

<style lang="scss" scoped>
.resize-element {
  display: flex;
  height: 200px;
  width: 200px;
  resize: both;
  overflow: hidden;
  text-align: center;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 1px 1px #3361d8;
}
</style>
