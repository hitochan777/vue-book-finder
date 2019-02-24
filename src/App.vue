<template>
  <div id="app">
    <h1>BOOK FINDER</h1>
    <Search />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator'
import Search from './components/Search.vue'
import { MockSearchService, SearchService } from './service/search_service'

@Component({
  components: {
    Search,
  },
})
export default class App extends Vue {
  @Provide() searchService: SearchService = new MockSearchService()
}
</script>

<style lang="scss">
h1 {
  text-decoration: uppercase;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
