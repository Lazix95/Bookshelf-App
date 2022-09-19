<template>
  <component :is='component'>
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
}
</script>
