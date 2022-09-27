<template>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-card-title class="text-h5 lighten-2" v-html="title || 'Confirm'" />

      <v-card-text>
        {{message}}
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="handleClose"> Close </v-btn>
        <v-btn color="red" text @click="confirm" :loading="isLoading"> {{ confirmText }} </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';

@Component
export default class WidgetConfirmDialog extends Vue {
  @Prop({default: false, type: Boolean}) protected isLoading!: boolean;
  @Prop({default: false, type: Boolean}) protected closeAfterLoading!: boolean;
  @Prop({default: 'Confirm', type: String}) protected confirmText!: string;

  protected dialog = false;
  protected message = '';
  protected title = '';
  protected prop: unknown = null;

  @Watch('isLoading') protected watchForIsLoading(isLoading: boolean, oldIsLoading: boolean): void {
    if (oldIsLoading && !isLoading) this.close();
  }

  public open(payload: { title?: string; message?: string; prop?: unknown; }): void {
    if (payload.title) this.title = payload.title;
    if (payload.message) this.message = payload.message;
    this.prop = payload.prop;
    this.dialog = true;
  }

  public close(): void {
    this.dialog = false;
    setTimeout(() => {
      this.title = '';
      this.message = '';
      this.prop = null;
    }, 300);
  }

  protected handleClose(): void {
    this.close();
    this.$emit('close');
  }

  protected confirm(): void {
    this.$emit('confirm', this.prop);
    if (!this.closeAfterLoading) this.close();
  }
}

export type WidgetConfirmDialogRef = InstanceType<typeof WidgetConfirmDialog>;
</script>
