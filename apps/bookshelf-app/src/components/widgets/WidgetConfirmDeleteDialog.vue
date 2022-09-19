<template>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-card-title class="text-h5 lighten-2" v-html="title || 'Confirm'" />

      <v-card-text
        v-html="message || 'Are you sure you want to delete this item ?'"
      />

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="handleClose"> Close </v-btn>
        <v-btn color="red" text @click="confirm"> Delete </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class WidgetConfirmDeleteDialog extends Vue {
  protected dialog = false;
  protected message = '';
  protected title = '';
  protected prop: unknown = null;

  public open(payload: {
    title?: string;
    message?: string;
    prop?: unknown;
  }): void {
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
    this.close();
  }
}

export type WidgetConfirmDeleteDialogRef = InstanceType<
  typeof WidgetConfirmDeleteDialog
>;
</script>
