<template>
  <li class="book">
    <div class="inner-book">
      <div class="left">
        <img class="thumbnail" :src="thumbnail" alt="picture" />
      </div>
      <div class="right">
        <h2>{{ title }}</h2>
        <span class="publisher">Published by {{ publisher }}</span>
        <span class="authors">Authors: {{ formattedAuthors(authors) }}</span>
        <a :href="infoLink" class="see-more">See this book</a>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Book extends Vue {
  @Prop({ default: [] }) private authors!: string[]
  @Prop() private title!: string
  @Prop({ default: undefined }) private publisher!: string | undefined
  @Prop({ default: 'http://placehold.jp/128x195.png?text=Not Found' })
  private thumbnail!: string
  @Prop({ default: undefined }) private infoLink!: string | undefined

  public formattedAuthors(authors: string[]): string {
    return authors.join(', ')
  }
}
</script>

<style lang="scss" scoped>
ul {
  list-style-type: none;
}

.book {
  position: relative;
  background-color: #f0f0f0;
  width: 400px;
  margin: 1rem;
  padding: 0;
}
@media only screen and (max-width: 768px) {
  .book {
    width: 100%;
    margin: 5px;
  }
}

.title {
  color: grey;
}

.publisher {
  display: block;
}

.authors {
  display: block;
}

.left {
  width: 40%;
}

.right {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  justify-content: space-evenly;
  width: 60%;
  overflow-wrap: anywhere;
}

.inner-book {
  display: flex;
  min-height: 100%;
}

.see-more {
  display: block;
  height: 2rem;
  line-height: 2rem;
  width: 200px;
  background-color: green;
  border-radius: 10px;
  color: white;
  text-decoration: none;
  transition: 1s;
  border: 2px solid green;
  &:hover {
    color: green;
    background-color: white;
    border: 2px solid black;
  }
  margin: 0 auto;
}
</style>
