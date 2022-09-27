<template>
  <v-btn :color="color" :loading="loading" :type="type" v-on="$listeners" v-bind="$attrs">
    <slot>
      {{text}}
    </slot>
  </v-btn>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"

@Component({
   inheritAttrs: false,
})
export default class BaseButton extends Vue {
  @Prop({default: 'primary', type: String}) protected color!: string;
  @Prop({default: false, type: Boolean}) protected loading!: boolean;
  @Prop({default: '', type: String}) protected text!: string;
  @Prop({default: false, type: Boolean}) protected submit!: string;

  get type(): string {
    if (this.submit) return 'submit';
    return 'text';
  }
}
</script>
