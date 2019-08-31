<template>
  <el-scrollbar ref="scrollContainer" noresize :vertical="false" class="scroll-container" @wheel.native.prevent="handleScroll">
    <slot />
  </el-scrollbar>
</template>

<script>
const tagAndTagSpacing = 4 // tagAndTagSpacing

export default {
  name: 'ScrollPane',
  data() {
    return {
      scrollWrapper: null,
      containerWidth: 0
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.containerWidth = this.$refs.scrollContainer.$el.offsetWidth
      this.scrollWrapper = this.$refs.scrollContainer.$refs.wrap
      // 去掉 el-scrollbar 组件多事的 margin-right / margin-bottom
      this.scrollWrapper.style.margin = '0px'
    })
  },
  methods: {
    handleScroll(e) {
      // 滚轮
      const eventDelta = e.wheelDelta || -e.deltaY * 40
      this.scrollWrapper.scrollLeft = this.scrollWrapper.scrollLeft + eventDelta / 4
    },
    // 上一页
    prevScreen(tags) {
      // 减一屏
      const $prefLeft = this.scrollWrapper.scrollLeft - this.containerWidth

      this.$nextTick(() => {
        tags.some(tag => {
          // 查找第一个 tag 在减去一屏后的可视区域内
          if (tag.$el.offsetLeft >= $prefLeft) {
            this.scrollWrapper.scrollTo({
              left: tag.$el.offsetLeft <= 40 ? 0 : tag.$el.offsetLeft - tagAndTagSpacing,
              behavior: 'smooth'
            })
            return true
          }
        })
      })
    },
    // 下一页
    nextScreen(tags) {
      // 加一屏
      const $nextRight = this.scrollWrapper.scrollLeft + this.containerWidth

      this.$nextTick(() => {
        tags.some(tag => {
          // 查找下一屏第一个 tag 可视区域内
          if (tag.$el.offsetLeft + tag.$el.offsetWidth >= $nextRight) {
            this.scrollWrapper.scrollTo({
              left: tag.$el.offsetLeft - tagAndTagSpacing,
              behavior: 'smooth'
            })
            return true
          }
        })
      })
    },
    moveToTarget(tagList, currentTag) {
      let firstTag = null
      let lastTag = null

      // find first tag and last tag
      if (tagList.length > 0) {
        firstTag = tagList[0]
        lastTag = tagList[tagList.length - 1]
      }

      if (firstTag === currentTag) {
        this.scrollWrapper.scrollTo({
          left: 0,
          behavior: 'smooth'
        })
      } else if (lastTag === currentTag) {
        this.scrollWrapper.scrollTo({
          left: this.scrollWrapper.scrollWidth - this.containerWidth,
          behavior: 'smooth'
        })
      } else {
        // find preTag and nextTag
        const currentIndex = tagList.findIndex(item => item === currentTag)
        const prevTag = tagList[currentIndex - 1]
        const nextTag = tagList[currentIndex + 1]

        // the tag's offsetLeft after of nextTag
        const afterNextTagOffsetLeft = nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing

        // the tag's offsetLeft before of prevTag
        const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagAndTagSpacing

        if (afterNextTagOffsetLeft > this.scrollWrapper.scrollLeft + this.containerWidth) {
          this.scrollWrapper.scrollTo({
            left: afterNextTagOffsetLeft - this.containerWidth,
            behavior: 'smooth'
          })
        } else if (beforePrevTagOffsetLeft < this.scrollWrapper.scrollLeft) {
          this.scrollWrapper.scrollTo({
            left: beforePrevTagOffsetLeft,
            behavior: 'smooth'
          })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  /deep/ {
    .el-scrollbar__wrap {
      border-bottom: 1px solid #d8dce5;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06), 0 0 3px 0 rgba(0, 0, 0, 0.04);
      overflow: hidden;
      overflow-x: auto;
      height: auto;
      &::-webkit-scrollbar {
        width: 0;
        height: 0;
      }
    }
    .el-scrollbar__bar {
      bottom: 0px;
      height: 0;
      width: 0;
    }
  }
}
</style>
