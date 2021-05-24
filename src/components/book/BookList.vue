<template>
  <div>
    <br>
    <br>
    <h1 class="underline">게시글</h1>
    <div style="text-align: right">
      <button @click="movePage">글 등록</button>
    </div>
    <div v-if="books.length">
      <table id="book-list">
        <colgroup>
          <col style="width: 10%" />
          
          <col style="width: 45%" />
          <col style="width: 25%" />
          <col style="width: 20%" />
        </colgroup>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>글쓴이</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          <list-row
            v-for="(book, index) in books"
            :key="index"
            :isbn="book.isbn"
            :no="`${index + 1}`"
            :title="book.title"
            :author="book.author"
            :price= "book.Number"
            :joindate="book.joindate"
          />
        </tbody>
      </table>
    </div>
    <div v-else class="text-center">게시글이 없습니다.</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ListRow from "@/components/book/include/ListRow.vue";

export default {
  name: "booklist",
  components: {
    ListRow
  },
  computed: {
    ...mapGetters(["books"])
  },
  created() {
    this.$store.dispatch("getBooks");
  },
  methods: {
    movePage() {
      this.$router.push({ name: "book-create" });
    }
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
