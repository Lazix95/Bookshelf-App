<template>
  <v-container v-if="!loading" :fluid='fullScreen' style='padding: 24px' :class="{'pl-0 pr-0': !fullScreen}">
    <slot name='header'>
      <v-row v-if="title" justify="center">
        <slot name='breadcrumbs'>
          <v-col cols='3'>
            <!-- TODO: Add Component for Breadcrumbs -->
          </v-col>
        </slot>
         <slot name='title'>
           <v-col cols='6' class="text-center">
             <BaseTitle level='2' :value='title'/>
           </v-col>
         </slot>
          <v-col cols='3' align='end'>
            <slot name='button'/>
          </v-col>
      </v-row>
    </slot>

    <slot/>
  </v-container>
  <v-container class="mt-15" v-else>
    <WidgetSpinner />
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import WidgetSpinner from '../widgets/WidgetSpinner.vue';
import BaseTitle from './BaseTitle.vue';

@Component({
  components: { BaseTitle, WidgetSpinner },
})
export default class BasePageContent extends Vue {
  @Prop({ type: Boolean, default: false }) loading!: boolean;
  @Prop({ type: Boolean, default: false }) fullScreen!: boolean;
  @Prop({ type: String, default: '' }) title!: string;
}
</script>
