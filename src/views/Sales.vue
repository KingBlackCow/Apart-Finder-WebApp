<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col cols = "4">
        <h2>아파트 매물 정보</h2>
      </b-col>
      <b-col>
        <apt-search-bar />
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="6" align="left">
        <apt-list />
      </b-col>
      <b-col cols="6">
        <apt-detail />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import AptSearchBar from '@/components/apt/AptSearchBar.vue';
import AptList from '@/components/sales/SalesList.vue';
import AptDetail from '@/components/sales/SalesDetail.vue';

export default {
  name: 'Apt',
  components: {
    AptSearchBar,
    AptList,
    AptDetail,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped></style>
