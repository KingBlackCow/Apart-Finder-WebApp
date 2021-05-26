<template>
  <b-row class="mt-4 mb-4">

    <!-- 아파트 주소 검색 -->
    <b-col class="sm-4" align="left">
      <template #first>
        <b-form-select-option :value="null" disabled>-- Please select an option --</b-form-select-option>
      </template>
      <b-form-select v-model="city" :options="cityList" @change="getGuList(city)" class="custom" style="color: black;background-color:white"></b-form-select>
      <b-form-select v-model="gu" size="sm-6" :options="guList" @change="getDongList({city, gu})" class="custom" style="color: black;background-color:white"></b-form-select>
      <b-form-select v-model="dong" size="sm-6" :options="dongList" @change="getAdd([city, gu, dong]);getSales();" class="custom" style="color: black;background-color:white"></b-form-select>
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
      'getSales',
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
  .custom {
    font-family: sans-serif;
    border-style: solid;
    -webkit-writing-mode: horizontal-tb !important;
    text-rendering: auto;
    color: -internal-light-dark(black, white);
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    appearance: auto;
    box-sizing: border-box;
    align-items: center;
    white-space: pre;
    -webkit-rtl-ordering: logical;
    background-color: -internal-light-dark(rgb(255, 255, 255), rgb(59, 59, 59));
    cursor: default;
    margin: 0em;
    font: 400 15px Arial;
    border-radius: 0px;
    border-width: 1px;
    border-style: solid;
    border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
    border-image: initial;
  }
</style>
