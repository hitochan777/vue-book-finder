<template>
  <div class="search">
    <div class="search-box">
      <input v-model="keyword" placeholder="Type something here to search!" />
      <button @click="search(keyword)">Search</button>
    </div>
    <ul class="search-result">
      <Book
        v-for="book in books"
        :key="book.id"
        :authors="book.authors"
        :title="book.title"
        :thumbnail="book.thumbnail"
        :publisher="book.publisher"
        :infoLink="book.infoLink"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Inject, Vue } from 'vue-property-decorator'
import { SearchService } from '../service/search_service'
import { Book as BookItem } from '../book'
import Book from './Book.vue'

@Component({
  components: {
    Book,
  },
})
export default class Search extends Vue {
  books: BookItem[] = []
  keyword: string = ''
  @Inject() searchService!: SearchService
  public async search(keyword: string) {
    const books = await this.searchService.search(keyword)
    this.books = books
    console.log(books)
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

.search-result {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  flex-basis: auto;
}
</style>
