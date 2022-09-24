<template>
  <v-form ref="form" @submit.prevent.stop="handleSubmit">
    <slot/>
  </v-form>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator"

@Component({
   inheritAttrs: false,
})
export default class BaseForm extends Vue {
  protected validate(): boolean {
    const form = this.$refs.form as any; /* TODO: Find out how to use types for Vuetify components */
    if (form && form.validate) return form.validate();
    return false;
  }

  protected handleSubmit(): void {
    if (!this.validate()) return;
    this.$emit('submit');
  }
}
</script>
