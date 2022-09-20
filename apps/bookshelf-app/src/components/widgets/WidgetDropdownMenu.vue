<template>
  <v-menu offset-y nudge-bottom='10px'>
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon medium>list</v-icon>
      </v-btn>
    </template>
    <v-list>
      <slot></slot>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator"

@Component({
   inheritAttrs: false,
})
export default class WidgetDropdownMenu extends Vue {

}
</script>
