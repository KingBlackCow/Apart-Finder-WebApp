<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col cols = "4">
        <h2>아파트 매매 정보</h2>
      </b-col>
      <b-col>
        <apt-search-bar />
      </b-col>
    </b-row>
    <b-row>
      <b-col cols = "6">
        <gmap />
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
import AptList from '@/components/apt/AptList.vue';
import AptDetail from '@/components/apt/AptDetail.vue';
import Gmap from '@/components/apt/Gmap.vue';

export default {
  name: 'Apt',
  components: {
    AptSearchBar,
    AptList,
    AptDetail,
    Gmap,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped></style>
