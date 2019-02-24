import { Book } from '../book'
import { mockData } from '../mock_books'

export interface SearchService {
  search: (query: string) => Promise<Book[]>
}

export class HttpSearchService implements SearchService {
  private endpoint: string
  constructor(
    endpoint: string = 'https://www.googleapis.com/books/v1/volumes'
  ) {
    this.endpoint = endpoint
  }

  public search(query: string): Promise<Book[]> {
    // TODO: to implement
    return Promise.resolve([])
  }
}

export class MockSearchService implements SearchService {
  public async search(query: string): Promise<Book[]> {
    await new Promise( resolve => {
      setTimeout( () => {resolve()}, 1000)
    })
    const books = await Promise.resolve(mockData)
    // return books.filter(book => book.title.includes(query))
    return books
  }
}
