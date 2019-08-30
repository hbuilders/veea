<template>
  <div class="page-container">
    <div class="d-grow d-flex xy-center">
      <div>
        名称: {{ name }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>
