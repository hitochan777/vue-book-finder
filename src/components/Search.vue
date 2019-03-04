<template>
  <div class="search">
    <div class="search-box">
      <input type="search" class="search-box search-box--input" v-model="keyword" placeholder="Type something here to search!" />
      <button class="search-box search-box--button" @click="search(keyword)">Search</button>
    </div>
    <ul v-if="!searching" class="search-result">
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
    <span v-if="searching">Searching...</span>
    <span class="error" v-if="errorMessage.length > 0 && !searching">{{
      errorMessage
    }}</span>
    <span v-if="errorMessage.length === 0 && !searching && books.length === 0"
      >😣Nothing here yet! Try another query!</span
    >
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
  private books: BookItem[] = []
  private keyword: string = ''
  private searching: boolean = false
  private errorMessage: string = ''
  @Inject() private searchService!: SearchService
  public async search(keyword: string) {
    if (keyword.length === 0) {
      this.errorMessage = 'You need to type something to query!'
      return
    }
    this.searching = true
    try {
      const books = await this.searchService.search(keyword)
      this.books = books
      this.errorMessage = ''
    } catch (error) {
      this.errorMessage = 'There was some error during the query'
    }
    this.searching = false
  }
}
</script>

<style scoped lang="scss">
$search-box-height: 2rem;
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

.error {
  color: red;
}

.search-box {
    height: $search-box-height;
    font-size: 1rem;
    font-family: san-serif;
}

.search-box--input {
    width: 30%;
    border-radius: 5px;
    &:focus {
        border-color: lightgreen;
    }
}

.search-box--button {
    background-color: lightgreen;
    border: 0px;
    color: white;
    font-weight: bold;
    margin-left: 5px;
    border-radius: 5px;
    vertical-align: top;
}
</style>

