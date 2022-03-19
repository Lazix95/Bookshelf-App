<template>
  <v-col cols='12' sm='6' md='4' lg='3' xl='2'>
    <v-card class='BookListItem text-center pa-4'>
      <span class='d-block' style='margin-top: -15px'>{{ publisher || 'Unknown Publisher' }}</span>
      <v-img v-if='src' height='300' class="ma-auto" :lazy-src="src"
        :src="src"
      ></v-img>
      <div v-else class='NoCoverAvailable d-flex fill-height text-center'>
        <v-row align='center' justify='center'>
          <v-col cols='12'>
            <span>No Cover Available</span>
          </v-col>
        </v-row>
      </div>
      <v-divider style='margin-top: 10px'/>
      <span>{{ name || 'Unknown Name' }}</span>
      <v-divider/>
      <span>{{ Author || 'Unknown Author' }}</span>
    </v-card>
  </v-col>
</template>

<script lang='ts'>
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class BookListItem extends Vue {
  @Prop(String) readonly src: string | undefined;
  @Prop(String) readonly name: string | undefined;
  @Prop(String) readonly author: string | undefined;
  @Prop(String) readonly publisher: string | undefined;
}
</script>

<style lang='scss' scoped>
  .BookListItem {
    height: 100%;
    width: 100%;
    border: var(--border-regular);
    font-family: var(--systemFontStack);
    font-size: 15px;
    font-weight: 600;
  }

  .NoCoverAvailable {
    height: 300px;
    width: 100%;
    border: 8px solid var(--transparent-05);
    border-radius: 20px !important;
    span {
      color: var(--transparent-10);
      font-family: cursive;
    }
  }
</style>
