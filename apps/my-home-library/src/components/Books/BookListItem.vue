<template>
  <v-col cols='12' sm='6' md='4' lg='3' xl='2'>
    <v-card class='BookListItem p-relative text-center pa-4'>
      <span class='d-block' style='margin-top: -15px'>{{ publisher || 'Unknown Publisher' }}</span>
      <v-img v-if='src' class="ma-auto" :lazy-src="src" style='min-height: 300px'
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
      <span>{{ author || 'Unknown Author' }}</span>

      <div class='p-absolute d-flex align-center justify-center wh-100 BookListItem--overlay'>
        <v-row>
          <v-col cols='12'>
            <v-btn elevation='2' color="primary" @click.stop.prevent='goToBook'>
              Update
            </v-btn>
          </v-col>
          <v-col cols='12'>
            <v-btn elevation='2' color="red" @click.stop.prevent='deleteBook'>
              Delete
            </v-btn>
          </v-col>
        </v-row>
      </div>
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

  protected goToBook(): void {
    this.$emit('goToBook');
  }

  protected deleteBook(): void {
    this.$emit('deleteBook');
  }
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
    transition: 0.1s box-shadow;

    &--overlay {
      top: 0;
      left: 0;
      opacity: 0;
      transition: 0.3s opacity;
      background-color: var(--overlay-light);
    }

    &:hover {
      box-shadow: 0 5px 3px 1px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);

      .BookListItem--overlay {
        opacity: 1;
      }
    }
  }

  .NoCoverAvailable {
    height: 318px;
    width: 100%;
    border: 8px solid var(--transparent-05);
    border-radius: 20px !important;
    span {
      color: var(--transparent-10);
      font-family: cursive;
    }
  }
</style>
