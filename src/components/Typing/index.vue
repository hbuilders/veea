<template>
  <div ref="typedElement" class="typed-element">
    <slot name="content" />
    <div ref="typing" />
  </div>
</template>

<script>
import Typed from 'typed.js'
import { props, getEventHandlers } from './config'
export default {
  name: 'Typing',
  props,
  data() {
    return {
      typed: null
    }
  },
  mounted() {
    this.initTyped()
  },
  destroyed() {
    this.typed.destroy()
  },
  methods: {
    initTyped: function() {
      const $typed = this.$refs.typing
      let config = this.$props
      config.stringsElement = this.$slots.content[0].elm
      config = getEventHandlers(this, config)
      this.typed = new Typed($typed, config)
    }
  }
}
</script>

<style lang="scss">
.typed-element {
  display: flex;
  align-items: center;
  .typed-cursor {
    opacity: 1;
    animation: typedjsBlink 0.7s infinite;
  }
}
@keyframes typedjsBlink {
  50% {
    opacity: 0;
  }
}
</style>
