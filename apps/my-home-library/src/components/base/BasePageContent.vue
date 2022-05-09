<template>
  <v-container v-if='!loading'>
    <v-row v-if='title' justify='center'>
      <v-col class='text-center mt-5'>
        <h2>{{ title }}</h2>
      </v-col>
    </v-row>
    <slot></slot>
  </v-container>
  <v-container class='mt-15' v-else>
    <WidgetSpinner/>
  </v-container>
</template>

<script lang='ts'>
import {Component, Prop, Vue} from 'vue-property-decorator';
import WidgetSpinner from '../widgets/WidgetSpinner.vue';

@Component({
  components: { WidgetSpinner }
})
export default class BasePageContent extends Vue {
  @Prop({type: Boolean, default: false}) loading!: boolean;
  @Prop({type: String, default: ''}) title!: string;
}
</script>
