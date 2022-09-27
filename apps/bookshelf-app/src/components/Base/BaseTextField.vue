<template>
  <v-text-field dense outlined :hide-details="hideDetails" v-model="propValue" :label="label" :type="implicatedType" :rules="predefinedRules" v-on="$listeners" v-bind="$attrs" />
</template>

<script lang="ts">
import {Component, Prop, VModel, Vue} from "vue-property-decorator"
import {
  ruleFieldRequiredMinMax,
  ruleEmailRequiredAndValid,
  ruleAtLeastOneUppercase, ruleAtLeastOneNumber
} from '../../validation-rules/text-validations';

@Component({
   inheritAttrs: false,
})
export default class BaseTextField extends Vue {
  @VModel({ type: String }) propValue!: string | number;
  @Prop({default: '', type: String}) protected label!: string;
  @Prop({default: 'text', type: String}) protected type!: string;
  @Prop({default: false, type: Boolean}) protected required!: boolean;
  @Prop({default: false, type: Boolean}) protected email!: boolean;
  @Prop({default: false, type: Boolean}) protected password!: boolean;
  @Prop({default: false, type: Boolean}) protected hideDetails!: boolean;
  @Prop({default: () => [], type: Array}) protected rules!: Array<unknown>;
  @Prop({default: true, type: Boolean}) protected autoSetRules!: boolean;

  private requiredTextFiledRules = [...ruleFieldRequiredMinMax(this.label, 3, 150)];
  private emailRules = [...ruleEmailRequiredAndValid()];
  private passwordRules = [...ruleFieldRequiredMinMax(this.label, 0, 150)];

  get predefinedRules(): Array<unknown> {
    return [
      ...this.rules,
      ...(this.required && this.autoSetRules ? this.requiredTextFiledRules : []),
      ...(this.email && this.autoSetRules ? this.emailRules : []),
      ...(this.password && this.autoSetRules ? this.passwordRules : []),
    ]
  }

  get implicatedType(): string {
    if (this.type !== 'text') return this.type;
    if (this.email) return 'email';
    if (this.password) return 'password'
    return 'text'
  }
}
</script>
