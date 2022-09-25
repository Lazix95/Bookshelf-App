<template>
  <v-text-field dense outlined :type="type" :hide-details="hideDetails" v-model="propValue" :label="label" :rules="rules" v-on="$listeners" v-bind="$attrs" />
</template>

<script lang="ts">
import {Component, Prop, VModel, Vue} from "vue-property-decorator"

@Component({
   inheritAttrs: false,
})
export default class BaseTextField extends Vue {
  @VModel({ type: String }) propValue!: string | number;
  @Prop({default: '', type: String}) protected label!: string;
  @Prop({default: 'text', type: String}) protected type!: string;
  @Prop({default: false, type: Boolean}) protected hideDetails!: boolean;
  @Prop({default: () => [], type: Array}) protected rules!: Array<unknown>;
}
</script>
