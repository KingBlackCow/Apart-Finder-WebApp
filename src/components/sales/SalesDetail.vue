<template>
  <b-container v-if="salesapt.id" class="bv-example-row">
    <b-row>
      <b-col
        ><h2>{{ salesapt.complex_name }}</h2></b-col
      >
    </b-row>
    <b-row class="mb-2 mt-1">
      <b-col><p ><img style="width:100%" :src="salesapt.img_url" alt=""></p></b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant=""><h3>{{ salesapt.complex_name }}</h3></b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant=""><h3>{{ salesapt.selling_type_str }} {{ salesapt.price_title }}</h3></b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant=""><h3>{{ salesapt.room_desc }}</h3></b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant="">
            태그 
            <div v-for="(tag, index) in salesapt.hash_tags" :key="index">#{{tag}}</div>
        </b-alert>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'AptDetail',
  data() {
    return {
      isColor: false,
    }
  },
  computed: {
    ...mapState(['salesapt']),
  },
  filters: {
    price(value) {
      if (!value) return value;
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
};
</script>

<style></style>
