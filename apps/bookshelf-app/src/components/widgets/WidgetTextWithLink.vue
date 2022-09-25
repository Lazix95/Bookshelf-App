<template>
  <div :class="[centerClass]">
    <span>
      <slot name="textOne"/>
    </span>
    <span>
      <slot name="link"/>
    </span>
    <span>
      <span name="textTwo"/>
    </span>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"

@Component({
   inheritAttrs: false,
})
export default class WidgetTextWithLink extends Vue {
  @Prop({default: 'start', type: String}) protected align!: 'start' | 'center' | 'end';

  get centerClass(): string {
    if (this.align === 'start') return 'text-start';
    if (this.align === 'center') return 'text-center';
    if (this.align === 'end') return 'text-end';
    return '';
  }
}
</script>
