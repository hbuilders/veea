<template>
  <div class="page-container">
    <div class="d-grow d-flex xy-center">
      <div style="width:50%">
        <typing loop smart-backspace @onStringTyped="onStop">
          <div slot="content">
            <div>npm install typed.js</div>
            <div>yarn add typed.js</div>
            <div>bower install typed.js</div>
          </div>
        </typing>
      </div>
    </div>
  </div>
</template>
<script>
import Typing from '@/components/Typing'
export default {
  components: { Typing },
  methods: {
    onStop(data) {
      console.log(data)
    }
  }
}
</script>
