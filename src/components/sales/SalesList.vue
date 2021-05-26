<template>
  <b-container v-if="salesApts && salesApts.length != 0" class="bv-example-row mt-3">
    <apt-list-item v-for="(salesApt, index) in salesApts" :key="index" :salesApt="salesApt" />
  </b-container>
  <b-container v-else class="bv-example-row mt-3">
    <b-row>
      <b-col><b-alert show>아파트 목록이 없습니다.</b-alert></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex';
import AptListItem from '@/components/sales/SalesListItem.vue';

export default {
  name: 'AptList',
  components: {
    AptListItem,
  },
  computed: {
    ...mapGetters(['salesApts']),
  },
};
</script>

<style></style>
