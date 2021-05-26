<template>
  <b-row
    class="m-2"
    @click="chooseApt"
    @mouseover="colorChange(true)"
    @mouseout="colorChange(false)"
    :class="{ 'mouse-over-bgcolor': isColor }"
  >
    <b-col cols="2" class="text-center">
      <!-- <img src="@/assets/apt.png" class="img-list" alt="" /> -->
      <p><img style="width:100%" :url="this.salesApt.img_url" alt=""></p>
    </b-col>
    <b-col cols="10"> {{ this.salesApt.complex_name }} </b-col>
    <b-col cols="10"> {{ this.salesApt.title }}</b-col>
  </b-row>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'AptListItem',
  data() {
    return {
      isColor: false,
    };
  },
  props: {
    salesApt: Object,
  },
  methods: {
    ...mapActions(['selectsalesApt']),
    chooseApt() {
      this.selectsalesApt(this.salesApt);
    },
    colorChange(flag) {
      this.isColor = flag;
    },
  },
  
};
</script>

<style scoped>
.img-list {
  width: 50px;
}
.mouse-over-bgcolor {
  background-color: lightblue;
}
</style>
