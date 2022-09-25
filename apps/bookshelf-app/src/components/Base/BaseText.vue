<template>
  <component :is='component' :style="[sizeStyle]">
    <slot>
      {{ value }}
    </slot>
    <br v-if='br'/>
  </component>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"

@Component({
   inheritAttrs: false,
})
export default class BaseText extends Vue {
  @Prop({default: '', type: String}) value!: string;
  @Prop({default: false, type: Boolean}) br!: boolean;
  @Prop({default: 'span', type: String}) protected component!: string;
  @Prop({default: null}) protected size!: number | string;

  get sizeStyle(): Record<string, string> {
    if (this.size) {
      return {fontSize: `${this.size}px`};
    }
    return {};
  }
}
</script>
