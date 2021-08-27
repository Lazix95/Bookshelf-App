<template>
  <MainView>

  </MainView>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import MainView from '../../views/MainView/MainView.vue';

@Component({
  components: { MainView }
})
export default class Home extends Vue {

}
</script>
