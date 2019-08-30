<script>
import ElDialog from 'element-ui/lib/dialog'
export default {
  name: 'UiDialog',
  extends: ElDialog,

  props: {
    drag: {
      type: Boolean,
      default: true
    },
    height: {
      type: String,
      default: '50%'
    }
  },
  computed: {
    style() {
      const style = {}
      if (!this.fullscreen) {
        if (this.width) {
          style.width = this.width
        }
        if (this.height) {
          style.height = this.height
        }
      }
      return style
    }
  },
  mounted() {
    if (this.drag && !this.fullscreen) {
      this.$nextTick(function() {
        const dialogHeaderEl = this.$el.querySelector('.el-dialog__header')
        const dragDom = this.$el.querySelector('.el-dialog')
        dialogHeaderEl.style.cssText += ';cursor:move;'
        dragDom.style.cssText += ';top:0px;'

        // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
        const getStyle = (function() {
          if (window.document.currentStyle) {
            return (dom, attr) => dom.currentStyle[attr]
          } else {
            return (dom, attr) => getComputedStyle(dom, false)[attr]
          }
        })()

        dialogHeaderEl.onmousedown = e => {
          // 鼠标按下，计算当前元素距离可视区的距离
          const disX = e.clientX - dialogHeaderEl.offsetLeft
          const disY = e.clientY - dialogHeaderEl.offsetTop

          const dragDomWidth = dragDom.offsetWidth
          const dragDomHeight = dragDom.offsetHeight

          const screenWidth = document.body.clientWidth
          const screenHeight = document.body.clientHeight

          const minDragDomLeft = dragDom.offsetLeft
          const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth

          const minDragDomTop = dragDom.offsetTop
          const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomHeight

          // 获取到的值带px 正则匹配替换
          let styL = getStyle(dragDom, 'left')
          let styT = getStyle(dragDom, 'top')

          if (styL.includes('%')) {
            styL = +document.body.clientWidth * (+styL.replace(/\%/g, '') / 100)
            styT = +document.body.clientHeight * (+styT.replace(/\%/g, '') / 100)
          } else {
            styL = +styL.replace(/\px/g, '')
            styT = +styT.replace(/\px/g, '')
          }

          dragDom.onmousemove = (e) => {
            // 通过事件委托，计算移动的距离
            let left = e.clientX - disX
            let top = e.clientY - disY

            // 边界处理
            if (-left > minDragDomLeft) {
              left = -minDragDomLeft
            } else if (left > maxDragDomLeft) {
              left = maxDragDomLeft
            }

            if (-top > minDragDomTop) {
              top = -minDragDomTop
            } else if (top > maxDragDomTop) {
              top = maxDragDomTop
            }

            // 移动当前元素
            dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`

            // emit onDrag event
            this.$emit('drag')
          }

          dragDom.onmouseup = (e) => {
            dragDom.onmousemove = null
            dragDom.onmouseup = null
            this.$emit('drag')
          }
        }
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.el-dialog__wrapper {
  display: flex;
  align-items: center;
  .el-dialog {
    display: flex;
    text-align: left;
    flex-direction: column;
    .el-dialog__header {
      text-align: left;
      padding: 10px 15px;
      .el-dialog__title {
        font-size: 16px;
      }
      .el-dialog__headerbtn {
        top: 13px;
        right: 15px;
      }
    }
    .el-dialog__body {
      flex: 1;
      padding: 0;
      overflow: auto;
    }
    /deep/ .el-dialog__footer {
      padding: 0;
      text-align: left;
      .el-button {
        padding: 7px 15px;
      }
      > div {
        display: flex;
        align-items: center;
        min-height: 36px;
        padding: 0 10px;
        > div:first-child {
          flex: 1;
        }
      }
    }
  }
}
</style>
