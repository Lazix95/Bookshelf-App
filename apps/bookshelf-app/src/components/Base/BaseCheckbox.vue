<template>
  <v-checkbox :hide-details="hideDetails" :label="label" v-on="$listeners" v-bind="$attrs"/>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"

@Component({
   inheritAttrs: false,
})
export default class BaseCheckbox extends Vue {
  @Prop({default: '', type: String}) protected label!: string;
  @Prop({default: false, type: Boolean}) protected hideDetails!: boolean;
}
</script>
