import { debounce } from 'throttle-debounce'
/**
 * @title 指令-scrollNav
 *
 * @author 黄先生 337805@qq.com
 * @description 实现滚动到锚点,滚动事件监听节点
 *
 * @code
 * <div v-scrollTo="内容节点margin-top值:Number">
 *  <div title="滚动容器" ref="scroll-to-container">
 *    <div class="scroll-to-flow">内容节点A</div>
 *    <div class="scroll-to-flow">内容节点B</div>
 *  </div>
 *  <div title="导航容器" ref="scroll-to-navbar">
 *    <a>A</a>
 *    <a>B</a>
 *  </div>
 * </div>
 * <script>
 * import scrollTo from '@/directive/ScrollTo';
 * export default {
 *   directives: { scrollTo }
 * }
 * </script>
 * @endcode
 */

const service = {
  event: 'click',
  offset: 0,
  container: {}, // 滚动容器
  navbar: [], // 导航容器
  flowNode: [], // 内容节点
  btnNode: [], // 导航节点
  debounceListener: null,
  start(el, binding, vnode) {
    this.event = binding.arg === 'hover' ? 'mouseover' : 'click'
    this.offset = binding.value || 0
    this.container = vnode.context.$refs['scroll-to-container']
    this.navbar = vnode.context.$refs['scroll-to-navbar']
    this.flowNode = [...this.container.querySelectorAll('.scroll-to-flow')]
    this.btnNode = [...this.navbar.children]
    // 创建一个空的元素,撑开[滚动容器]高度,以便能够滚动到最后一个节
    this.emptyEl = document.createElement('div')
    this.lastFlowHeight = this.flowNode[this.flowNode.length - 1].getBoundingClientRect().height
    this.emptyEl.classList.add('scroll-to-empty')
    this.emptyEl.style.height = `${this.container.clientHeight - this.lastFlowHeight - this.offset / 2}px`
    this.container.appendChild(this.emptyEl)
    // 设置[滚动容器] position='relative' 使 offsetTop 属性相对于[滚动容器]
    this.container.style.position = 'relative'

    this.debounceListener = debounce(3, this.scrollListener).bind(this)

    // 监听滚动事件
    this.container.addEventListener('scroll', this.debounceListener, false)
    window.addEventListener('resize', this.debounceListener, false)

    // 导航事件
    this.btnNode.map((btn, index) => {
      btn.addEventListener(this.event, this.navbarListener.bind(this, btn, index), false)
    })
  },
  scrollAnimation(targetY) {
    // behavior: smooth(平滑滚动),instant|auto(瞬间滚动)
    this.container.scrollTo({
      top: targetY - this.offset + 1,
      behavior: 'smooth'
    })
  },
  scrollListener(event) {
    if (event.type === 'resize') {
      this.emptyEl.style.height = `${this.container.clientHeight - this.lastFlowHeight - this.offset / 2}px`
    } else {
      this.flowNode.map((flow, index) => {
        const scrollTop = this.container.scrollTop + this.offset // [滚动容器] 滚动距离
        const offsetTop = flow.offsetTop // 元素相对于 [滚动容器] Y 距离
        // 元素高 添加1像素 避免两个节点同时选中
        const height = flow.getBoundingClientRect().height + this.offset - 1
        // 如果滚动距离 >= offsetTop 且 在元素高度范围内滚动时 设置为当前节点
        if (scrollTop >= offsetTop && scrollTop - offsetTop < height) {
          this.btnNode[index].classList.add('active')
          flow.classList.add('active')
        } else {
          this.btnNode[index].classList.remove('active')
          flow.classList.remove('active')
        }
      })
    }
  },
  navbarListener(btn, index) {
    this.flowNode[index].classList.add('active')
    btn.classList.add('active')
    this.scrollAnimation(this.flowNode[index].offsetTop)
  },
  destroy() {
    this.container.removeEventListener('scroll', this.debounceListener)
    window.removeEventListener('resize', this.debounceListener)
    this.btnNode.map(btn => {
      btn.removeEventListener(this.event, this.navbarListener)
    })
  }
}

const scrollNav = {
  componentUpdated(el, binding, vnode) {
    service.start(el, binding, vnode)
  },
  unbind() {
    service.destroy()
  }
}

const install = function(Vue) {
  Vue.directive('scrollNav', scrollNav)
}

if (window.Vue) {
  window.scrollNav = scrollNav
  // eslint-disable-next-line no-undef
  Vue.use(install)
}

scrollNav.install = install
export default scrollNav
