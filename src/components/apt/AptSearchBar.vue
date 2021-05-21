<template>
  <b-row class="mt-4 mb-4">

    <!-- 아파트 주소 검색 -->
    <b-col class="sm-3" align="left">
      <b-form-select v-model="city" :options="cityList" @change="getGuList(city)" style="background-color: blue"></b-form-select>
      <b-form-select v-model="gu" :options="guList" @change="getDongList({city, gu})" style="background-color: blue"></b-form-select>
      <b-form-select v-model="dong" :options="dongList" @change="getAdd([city, gu, dong])" style="background-color: blue"></b-form-select>
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
      city: null,
      gu: null,
      dong: null,
    };
  },
  computed: {
    ...mapGetters([
      'cityList',
      'guList',
      'dongList',
      'address',
    ]),
  },
  methods: {
    ...mapActions([
      'getAptList',
      'getCityList',
      'getGuList',
      'getDongList',
      'getAdd',
    ]),
    getApart() {
      this.getAdd([this.city, this.gu, this.dong]);
      // this.getAdd({city, gu, dong}).then({
      //   this.getAptList(address.dongCode);
      // });
    },
    // sendKeyword() {
    //   if (address.dongCode) this.getAptList(address.dongCode);
    //   this.dongCode = '';
    // },
  },
  created() {
    this.getCityList();
  }
};
</script>

<style>
  b-form-select{
    color: red;
  }
</style>
