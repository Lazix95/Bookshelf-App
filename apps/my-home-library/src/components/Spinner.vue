<template>
<v-container class='Spinner__container d-flex fill-height text-center'>
  <v-row align='center' justify='center'>
    <v-col cols='12'>
      <v-progress-circular indeterminate color="primary"/>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
 import { Component, Vue } from 'vue-property-decorator';

 @Component
 export default class Spinner extends Vue {

 }
</script>

<style lang='scss' scoped>

</style>
