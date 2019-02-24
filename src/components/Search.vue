<template>
  <div class="search">
    <div class="search-box">
      <input v-model="keyword" placeholder="Type something here to search!" />
      <button @click="search(keyword)">Search</button>
    </div>
      <ul class="search-result">
        <li v-for="book in books">
          {{book.id}}
          </li>
        </ul>
  </div>
</template>

<script lang="ts">
import {Component, Inject, Vue} from 'vue-property-decorator';
import { SearchService } from '../service/search_service'
import {Book} from '../book'

@Component
export default class Search extends Vue {
    books: Book[] = []
    keyword: string = ""
    @Inject() searchService!: SearchService
    public async search(keyword: string) {
      const books = await this.searchService.search(keyword)
      this.books = books
      console.log(books)
    }
}

</script>

<style scoped></style>
