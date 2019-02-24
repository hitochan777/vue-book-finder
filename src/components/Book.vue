<template>
  <li class="book">
    <div class="inner-book">
      <div class="left">
        <img class="thumbnail" :src="thumbnail" alt="picture" />
      </div>
      <div class="right">
        <a :href="infoLink" class="title"
          ><h2>{{ title }}</h2></a
        >
        <span class="publisher">Published by {{ publisher }}</span>
        <span class="authors">Authors: {{ formattedAuthors(authors) }}</span>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Book extends Vue {
  @Prop({ default: [] }) authors!: string[]
  @Prop() title!: string
  @Prop({ default: undefined }) publisher!: string | undefined
  @Prop({ default: 'http://placehold.jp/128x195.png?text=Not Found' })
  thumbnail!: string
  @Prop({ default: undefined }) infoLink!: string | undefined

  public formattedAuthors(authors: string[]): string {
    return authors.join(', ')
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
}

.book {
  position: relative;
  background-color: #f0f0f0;
  border: 5px solid black;
  width: 20%;
  margin: 1rem 0;
  padding: 0;
}
@media only screen and (max-width: 768px) {
  .book {
    width: 100%;
  }
}

.title {
  text-decoration: none;
  color: grey;
}

.publisher {
  display: block;
}

.authors {
  display: block;
}
</style>
