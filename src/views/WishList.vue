<template>
  <div style="padding:30px">
    <h1 class="underline">WishList</h1>
    
    <div v-if="wishapts.length">
      <table id="book-list">
        <colgroup>
          <col style="width: 10%" />
          <col style="width: 30%" />
          <col style="width: 20%" />
          <col style="width: 20%" />
          <col style="width: 20%" />
        </colgroup>
        <thead>
          <tr>
            <th>번지수</th>
            <th>아파트이름</th>
            <th>법정동</th>
            <th>층수</th>
            <th>가격</th>
          </tr>
        </thead>
        <tbody>
          <list-row-wish
            v-for="(apt, index) in wishapts"
            :key="index"
            :no="apt.no"
            :name="apt.name"
            :dong="apt.dong"
            :floor="apt.floor"
            :price= "apt.price"
          />
          </tbody>
      </table>
    </div>
    <div v-else class="text-center">게시글이 없습니다.</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ListRowWish from "@/components/book/include/ListRowWish.vue";

export default {
  name: "wishlist",
  components: {
    ListRowWish
  },
  computed: {
    ...mapGetters(["wishapts"])
  },
  created() {
    this.$store.dispatch("getWishLists");
  },
  methods: {
    
  }
};
</script>

<style scoped>
#book-list {
  border-collapse: collapse;
  width: 100%;
}

#book-list thead {
  font-weight: bold;
}

#book-list td,
#book-list th {
  text-align: center;
  border-bottom: 1px solid #ddd;
  height: 50px;
}


</style>
