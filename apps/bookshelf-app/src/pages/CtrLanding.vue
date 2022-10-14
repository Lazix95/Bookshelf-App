<template>
 <BasePageContent style="background: var(--background-poop); height: 100%" full-screen>
   <v-container class="fill-height">
     <v-row align="center" justify="center" class="fill-height">
       <v-col align-self="center" cols="auto">
         <h1 class="coming_soon mb-0">Landing Page</h1>
         <h1 class="coming_soon">Coming Soon</h1>
         <router-link class="float-end u-font-18 u-font-bold" :to="{name: 'Books'}">Join Us</router-link>
       </v-col>
     </v-row>
   </v-container>
 </BasePageContent>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator"
import BasePageContent from '../components/Base/BasePageContent.vue';

@Component({
  components: { BasePageContent },
  inheritAttrs: false,
})
export default class CtrLanding extends Vue {

}
</script>

<style lang="scss" scoped>
.coming_soon {
  font-size: 85px;
  color: #fff;
  text-shadow: #000000 0px -1px 4px;
  -webkit-font-smoothing: antialiased;
}
</style>
