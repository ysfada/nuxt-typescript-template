<script lang="ts">
import { defineComponent, h } from '@nuxtjs/composition-api'
import { VNode } from 'vue'

export default defineComponent({
  name: 'About',

  setup(_props, _context) {
    return (): VNode =>
      h('div', { class: 'about' }, [
        h('h1', 'About page'),
        h('p', 'Resize page to see color changing (scss mixins)'),
      ])
  },
})
</script>

<style lang="scss" scoped>
.about {
  color: #000;
  @include lt-sm {
    color: $colorPrimary;
  }
  @include gt-sm {
    color: $colorSecondary;
  }
}
</style>
