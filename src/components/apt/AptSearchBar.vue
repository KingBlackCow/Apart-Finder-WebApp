<template>
  <b-row class="mt-4 mb-4">

    <!-- 아파트 주소 검색 -->
    <b-col class="sm-4" align="left">
      <template #first>
        <b-form-select-option :value="null" disabled>-- Please select an option --</b-form-select-option>
      </template>
      <b-form-select v-model="city" :options="cityList" @change="getGuList(city)" style="color: black;background-color:white"></b-form-select>
      <b-form-select v-model="gu" size="sm-6" :options="guList" @change="getDongList({city, gu})" style="color: black;background-color:white"></b-form-select>
      <b-form-select v-model="dong" size="sm-6" :options="dongList" @change="getAdd([city, gu, dong]);setTheme(gu);setComm();" style="color: black;background-color:white"></b-form-select>
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'SearchBar',
  data() {
    return {
      dongCode: '',
      city: '서울특별시',
      gu: '종로구',
      dong: '청운동',
    };
  },
  computed: {
    ...mapGetters([
      'cityList',
      'guList',
      'dongList',
    ]),
  },
  methods: {
    ...mapActions([
      'getAptList',
      'getCityList',
      'getGuList',
      'getDongList',
      'getAdd',
      'setHos',
      'setClinic',
      'setTheme',
      'setComm',
    ]),
  },
  created() {
    this.getCityList();
  },
  mounted() {
    this.getAdd([city, gu, dong]);
  }
};
</script>

<style>
  b-form-select{
    color: red;
  }
</style>
