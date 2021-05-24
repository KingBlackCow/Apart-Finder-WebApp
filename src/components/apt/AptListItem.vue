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
      <p v-if="selectedImage"><img style="width:100%" :src="selectedImage" alt=""></p>
    </b-col>
    <b-col cols="10"> [{{ this.apt.일련번호 }}] {{ this.apt.아파트 }}</b-col>
  </b-row>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'AptListItem',
  data() {
    return {
      isColor: false,
      images: [
      'https://i.postimg.cc/T30Z4F1x/apt1.jpg',
      'https://i.postimg.cc/3N2qCbVP/apt2.jpg',
      'https://i.postimg.cc/Ls3fFkfj/apt3.jpg'
      ],
    
    };
  },
  props: {
    apt: Object,
    selectedImage: Object
  },
  methods: {
    // chooseApt() {
    //   // this.$emit('select-apt', this.apt);
    //   this.$store.dispatch('selectApt', this.apt);
    // },
    ...mapActions(['selectApt','selectAptImg']),
    chooseApt() {
      this.selectApt(this.apt);
      this.selectAptImg(this.selectedImage);
    },
    colorChange(flag) {
      this.isColor = flag;
    },
    randomItem (items) {
      return items[Math.floor(Math.random()*items.length)];
    }
    
  },
  created(){
    this.selectedImage = this.randomItem(this.images)
  },
  updated() {
    this.selectedImage = this.randomItem(this.images)
  }
  
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
