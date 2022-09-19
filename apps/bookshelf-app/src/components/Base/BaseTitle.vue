<template>
  <component :is="`H${level}`">
    <slot>
      {{value}}
    </slot>
  </component>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"

@Component({
   inheritAttrs: false,
})
export default class BaseTitle extends Vue {
  @Prop({default: '', type: String}) value!: string;
  @Prop({default: 1, type: [Number, String]}) protected level!: 1 | 2 | 3 | 4 | 5 | 6;
}
</script>
