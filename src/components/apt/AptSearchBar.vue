<template>
  <b-row class="mt-4 mb-4">
    <b-col class="sm-3" align="left">
      <b-form-input
        v-model.trim="dongCode"
        placeholder="동코드 입력...(예 : 11110)"
        @keypress.enter="sendKeyword"
      ></b-form-input>
    </b-col>
    <b-col class="sm-3" align="left">
      <b-button variant="outline-primary" @click="sendKeyword">검색</b-button>
    </b-col>

    <!-- 아파트 주소 검색 -->
    <b-col class="sm-3" align="left">
      <b-form-select v-model="city" :options="cityList" @change="getGuList(city)"></b-form-select>
      <b-form-select v-model="gu" :options="guList" @change="getDongList({city, gu})"></b-form-select>
      <b-form-select v-model="dong" :options="dongList"></b-form-select>
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
    ])
  },
  methods: {
    ...mapActions([
      'getAptList',
      'getCityList',
      'getGuList',
      'getDongList',
    ]),
    sendKeyword() {
      // this.$emit('send-keyword', this.dongCode);
      if (this.dongCode) this.getAptList(this.dongCode);
      // this.$store.dispatch('getAptList', this.dongCode);
      this.dongCode = '';
    },
  },
  created() {
    this.getCityList();
  }
};
</script>

<style></style>
