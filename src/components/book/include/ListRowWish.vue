<template>
  <tr>
    <td>{{ no }}</td>
    <td>{{ name }}</td>
    <td>{{ dong }}</td>
    <td>{{ floor }}</td>
    <td>{{ price }}</td>
    <td><b-button variant="danger" @click.prevent="delete1">제거</b-button></td>
  </tr>
</template>

<script>
import { createInstance } from "@/api/index.js";
export default {
  name: "listRowWish",
  props: {
    no: String,
    name: String,
    dong: String,
    floor: String,
    price: String,
  },
  
};
</script>
<style scope>
td {
  text-align: center;
  border-bottom: 1px solid #ddd;
  height: 30px;
  width: 70px;
}
</style>
